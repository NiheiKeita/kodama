import React from 'react'
import Button from '@/Components/Button'

type Props = {
    onMove: (dx: number, dy: number) => void
}

export const CrossPad = React.memo(function CrossPad({ onMove }: Props) {
    return (
        <div className="grid grid-cols-3 gap-2">
            <div />
            <Button variant="default" onClick={() => onMove(0, -0.04)}>▲</Button>
            <div />
            <Button variant="default" onClick={() => onMove(-0.04, 0)}>◀</Button>
            <div className="flex items-center justify-center text-xs text-gray-500">Move</div>
            <Button variant="default" onClick={() => onMove(0.04, 0)}>▶</Button>
            <div />
            <Button variant="default" onClick={() => onMove(0, 0.04)}>▼</Button>
            <div />
        </div>
    )
})

export default CrossPad
