import React from 'react'
import WebLayout from '@/Layouts/WebLayout'
import { useKodamaGarden, type Seed } from './hooks'
import GardenField from './components/GardenField'
import CrossPad from './components/CrossPad'
import SeedList from './components/SeedList'

type Props = {
    seeds: Seed[]
}

export const KodamaGarden = React.memo(function KodamaGarden({ seeds }: Props) {
    const {
        state,
        selectedSeedId,
        message,
        volumes,
        move,
        handleSelectSeed,
        handlePlace
    } = useKodamaGarden(seeds)

    const unplaced = state.seeds.filter((seed) => seed.posX === null || seed.posY === null)

    return (
        <WebLayout page="ma">
            <div className="space-y-6 px-4 py-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-xs uppercase text-gray-500">KODAMA mini</p>
                        <h1 className="text-2xl font-bold text-gray-800">マイにわ</h1>
                        <p className="text-sm text-gray-600">{message}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                        操作: 十字キー / キーボード矢印キー
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="md:col-span-2">
                        <GardenField seeds={state.seeds} player={state.player} onPlace={handlePlace} volumes={volumes} />
                    </div>
                    <div className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-800">プレイヤー操作</h2>
                        <CrossPad onMove={move} />
                        <div className="rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
                            近いタネほど音量が上がり、左右の位置でパンが変化します。丸の中の数字は現在の音量(%)です。
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800">未配置のタネ</h2>
                        <p className="text-sm text-gray-500">{unplaced.length} 件</p>
                    </div>
                    <div className="mt-4">
                        <SeedList seeds={unplaced} selectedSeedId={selectedSeedId} onSelect={handleSelectSeed} />
                    </div>
                </div>
            </div>
        </WebLayout>
    )
})

export default KodamaGarden
