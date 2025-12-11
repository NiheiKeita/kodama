import React from 'react'
import type { Seed } from '../../hooks'

type Props = {
    seeds: Seed[]
    player: { x: number, y: number }
    onPlace: (x: number, y: number) => void
    volumes: Record<number, { volume: number, pan: number }>
}

const toPercent = (value: number) => `${(value * 100).toFixed(1)}%`

export const GardenField = React.memo(function GardenField({ seeds, player, onPlace, volumes }: Props) {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        onPlace(x, y)
    }

    return (
        <div
            className="relative aspect-square w-full overflow-hidden rounded-2xl border border-theme/30 bg-gradient-to-br from-theme-backgroundColor to-white"
            onClick={handleClick}
        >
            {seeds.filter((s) => s.posX !== null && s.posY !== null).map((seed) => (
                <div
                    key={seed.id}
                    className="absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-theme text-xs text-white shadow"
                    style={{ left: toPercent(seed.posX ?? 0), top: toPercent(seed.posY ?? 0) }}
                    title={seed.seedType}
                >
                    <div className="flex h-full w-full items-center justify-center">
                        {Math.round((volumes[seed.id]?.volume ?? 0) * 100)}
                    </div>
                </div>
            ))}
            <div
                className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 shadow"
                style={{ left: toPercent(player.x), top: toPercent(player.y) }}
                title="player"
            />
            <div className="absolute left-2 top-2 rounded bg-white/70 px-2 py-1 text-xs text-gray-700 shadow">
                プレイヤー位置: x {player.x.toFixed(2)} / y {player.y.toFixed(2)}
            </div>
        </div>
    )
})

export default GardenField
