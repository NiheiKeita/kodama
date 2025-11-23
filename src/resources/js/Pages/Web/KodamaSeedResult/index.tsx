import React from 'react'
import WebLayout from '@/Layouts/WebLayout'
import Button from '@/Components/Button'
import { router } from '@inertiajs/react'

type Seed = {
    id: number
    seedType: string
    status: string
    posX: number | null
    posY: number | null
} | null

type Props = {
    code: string
    success: boolean
    message: string
    needsAuth: boolean
    seed: Seed
}

export const KodamaSeedResult = React.memo(function KodamaSeedResult(props: Props) {
    const goHome = () => router.visit(route('kodama.home'))
    const goGarden = () => router.visit(route('kodama.garden'))
    const goLogin = () => router.post(route('kodama.auth.mock'))

    return (
        <WebLayout page="ma">
            <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-12">
                <div className={`rounded-2xl border p-8 shadow-sm ${props.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <p className="text-sm text-gray-500">code: {props.code || 'N/A'}</p>
                    <h1 className="text-2xl font-bold text-gray-800">{props.message}</h1>
                    {props.seed && (
                        <div className="mt-4 space-y-1 text-sm text-gray-700">
                            <p>タネID: {props.seed.id}</p>
                            <p>タイプ: {props.seed.seedType}</p>
                            <p>状態: {props.seed.status}</p>
                        </div>
                    )}
                    {props.needsAuth && (
                        <p className="mt-4 text-sm text-gray-700">ログインするとタネを受け取れます。（デモ環境では「Googleでログイン（デモ）」を使ってください）</p>
                    )}
                </div>
                <div className="flex flex-wrap gap-3">
                    <Button variant="blue" onClick={goGarden} disabled={!props.success}>マイにわへ</Button>
                    <Button variant="default" onClick={goHome}>ホームへ</Button>
                    {props.needsAuth && (
                        <Button variant="blue" onClick={goLogin}>Googleでログイン（デモ）</Button>
                    )}
                </div>
            </div>
        </WebLayout>
    )
})

export default KodamaSeedResult
