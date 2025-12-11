import React from 'react'
import type { Seed } from '../../hooks'
import Button from '@/Components/Button'

type Props = {
    seeds: Seed[]
    selectedSeedId: number | null
    onSelect: (seedId: number) => void
}

export const SeedList = React.memo(function SeedList({ seeds, selectedSeedId, onSelect }: Props) {
    if (seeds.length === 0) {
        return (
            <div className="rounded-xl border border-gray-100 bg-white p-4 text-sm text-gray-600">
                未配置のタネはありません。QRコードで新しいタネを取得してください。
            </div>
        )
    }

    return (
        <div className="grid gap-3 md:grid-cols-2">
            {seeds.map((seed) => {
                const isSelected = seed.id === selectedSeedId
                return (
                    <div key={seed.id} className={`rounded-xl border p-4 shadow-sm ${isSelected ? 'border-theme-dark bg-theme/10' : 'border-gray-100 bg-white'}`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase text-gray-500">Seed #{seed.id}</p>
                                <p className="text-sm font-semibold text-gray-800">{seed.seedType}</p>
                            </div>
                            <Button variant="blue" onClick={() => onSelect(seed.id)}>
                                {isSelected ? '選択中' : '植える'}
                            </Button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
})

export default SeedList
