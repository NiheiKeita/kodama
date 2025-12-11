import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios'

export type Seed = {
    id: number
    seedType: string
    status: 'acquired' | 'planted'
    posX: number | null
    posY: number | null
}

export type GardenState = {
    seeds: Seed[]
    player: { x: number, y: number }
}

type AudioNodes = {
    gain: GainNode
    panner: StereoPannerNode
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

const useAudioEngine = () => {
    const audioContextRef = useRef<AudioContext | null>(null)
    const seedNodesRef = useRef<Map<number, AudioNodes>>(new Map())

    useEffect(() => {
        return () => {
            seedNodesRef.current.forEach(({ gain }) => gain.disconnect())
            audioContextRef.current?.close()
        }
    }, [])

    const ensureContext = () => {
        if (typeof window === 'undefined' || !(window as any).AudioContext) {
            return null
        }
        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext()
        }
        return audioContextRef.current
    }

    const ensureNode = (seedId: number, seedType: string) => {
        const ctx = ensureContext()
        if (!ctx) return null
        if (seedNodesRef.current.has(seedId)) {
            return seedNodesRef.current.get(seedId)!
        }
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.value = getFrequency(seedType)

        const gain = ctx.createGain()
        gain.gain.value = 0

        const panner = ctx.createStereoPanner()
        osc.connect(gain).connect(panner).connect(ctx.destination)
        osc.start()

        const nodes = { gain, panner }
        seedNodesRef.current.set(seedId, nodes)
        return nodes
    }

    const updateVolumes = (seeds: Seed[], levels: Record<number, { volume: number, pan: number }>) => {
        Object.entries(levels).forEach(([id, level]) => {
            const seedId = Number(id)
            const target = ensureNode(seedId, seeds.find(s => s.id === seedId)?.seedType ?? 'default')
            if (!target) return
            target.gain.gain.value = level.volume
            target.panner.pan.value = level.pan
        })
    }

    return { updateVolumes }
}

const getFrequency = (seedType: string) => {
    switch (seedType) {
        case 'bell':
            return 660
        case 'wind':
            return 520
        case 'water':
            return 420
        default:
            return 480
    }
}

export const useKodamaGarden = (initialSeeds: Seed[]) => {
    const [state, setState] = useState<GardenState>({
        seeds: initialSeeds,
        player: { x: 0.5, y: 0.5 }
    })
    const [selectedSeedId, setSelectedSeedId] = useState<number | null>(null)
    const [message, setMessage] = useState<string>('タネを選んでフィールドをタップすると植えられます。')
    const audio = useAudioEngine()

    const volumes = useMemo(() => {
        const level: Record<number, { volume: number, pan: number }> = {}
        const maxDistance = 0.5
        state.seeds.forEach((seed) => {
            if (seed.posX === null || seed.posY === null) return
            const dx = seed.posX - state.player.x
            const dy = seed.posY - state.player.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const volume = dist >= maxDistance ? 0 : Number((1 - dist / maxDistance).toFixed(3))
            const pan = Math.max(-1, Math.min(1, (seed.posX - 0.5) * 2))
            level[seed.id] = { volume, pan }
        })
        return level
    }, [state.player.x, state.player.y, state.seeds])

    useEffect(() => {
        audio.updateVolumes(state.seeds, volumes)
    }, [audio, state.seeds, volumes])

    const move = useCallback((dx: number, dy: number) => {
        setState((prev) => ({
            ...prev,
            player: {
                x: clamp01(prev.player.x + dx),
                y: clamp01(prev.player.y + dy),
            },
        }))
    }, [])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault()
            }
            switch (e.key) {
                case 'ArrowUp':
                    move(0, -0.04)
                    break
                case 'ArrowDown':
                    move(0, 0.04)
                    break
                case 'ArrowLeft':
                    move(-0.04, 0)
                    break
                case 'ArrowRight':
                    move(0.04, 0)
                    break
            }
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [move])

    const handleSelectSeed = (seedId: number) => {
        setSelectedSeedId(seedId)
        setMessage('フィールドをタップして植える場所を選んでください。')
    }

    const handlePlace = async (x: number, y: number) => {
        if (selectedSeedId === null) {
            setMessage('先にタネを選択してください。')
            return
        }
        const posX = clamp01(x)
        const posY = clamp01(y)
        try {
            await axios.post(route('kodama.api.garden.place'), {
                user_seed_id: selectedSeedId,
                pos_x: posX,
                pos_y: posY,
            })

            setState((prev) => ({
                ...prev,
                seeds: prev.seeds.map((seed) =>
                    seed.id === selectedSeedId ? { ...seed, posX, posY, status: 'planted' } : seed
                ),
            }))
            setSelectedSeedId(null)
            setMessage('植え付けが完了しました。プレイヤーを動かして音の変化を確かめましょう。')
        } catch (error) {
            setMessage('植え付けに失敗しました。もう一度お試しください。')
        }
    }

    return {
        state,
        selectedSeedId,
        message,
        volumes,
        move,
        handleSelectSeed,
        handlePlace,
    }
}
