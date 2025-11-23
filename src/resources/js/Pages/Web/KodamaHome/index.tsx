import React from 'react'
import WebLayout from '@/Layouts/WebLayout'
import Button from '@/Components/Button'
import { useKodamaHome } from './hooks'
import { usePage } from '@inertiajs/react'

type AuthUser = {
    id: number
    name: string
    email: string
} | null

export const KodamaHome = React.memo(function KodamaHome() {
    const { handleMockLogin, goGarden } = useKodamaHome()
    const page = usePage<{ auth: { user: AuthUser } }>()
    const isLoggedIn = Boolean(page.props.auth?.user)

    return (
        <WebLayout page="ma">
            <div className="space-y-12 px-4 py-8">
                <section className="rounded-2xl bg-gradient-to-br from-theme-dark to-theme p-8 text-white shadow-lg">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                        <div className="flex-1 space-y-4">
                            <p className="text-sm uppercase tracking-widest text-white/80">KODAMA mini</p>
                            <h1 className="text-3xl font-bold leading-tight md:text-4xl">
                                箱庭にタネを植えて歩くと、音が変わる。 <br /> こだま的音体験をブラウザで。
                            </h1>
                            <p className="text-white/90">
                                会場のQRでタネを集めて、マイにわに配置。プレイヤー点を動かすと距離に応じて音量やパンが変わります。
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Button variant="blue" onClick={goGarden}>
                                    マイにわへ
                                </Button>
                                {!isLoggedIn && (
                                    <Button variant="default" onClick={handleMockLogin}>
                                        Googleでログイン（デモ）
                                    </Button>
                                )}
                            </div>
                        </div>
                        <div className="flex w-full max-w-md justify-center">
                            <div className="aspect-square w-full rounded-2xl bg-white/10 p-4 shadow-inner backdrop-blur">
                                <div className="flex h-full items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 text-5xl">
                                    ●
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-6 md:grid-cols-3">
                    <Card title="タネを集める" body="会場のQRコードを読み取り、/seed?code=xxxx にアクセスするとタネを取得できます。" />
                    <Card title="箱庭に植える" body="マイにわで未配置のタネを選び、フィールドをタップして好きな場所に植えます。" />
                    <Card title="歩くと音が変化" body="プレイヤー点を十字キーや矢印キーで動かすと、距離に応じて音量とパンが変わります。" />
                </section>

                <section className="grid gap-6 md:grid-cols-2">
                    <Callout
                        title="デモログイン"
                        description="OAuth未設定の環境向けに、Googleログイン相当のデモユーザーを用意しています。"
                        actionLabel="デモユーザーで入る"
                        onAction={handleMockLogin}
                        disabled={isLoggedIn}
                    />
                    <Callout
                        title="マイにわを開く"
                        description="獲得済みのタネ一覧と配置状況、プレイヤー点の操作がここから行えます。"
                        actionLabel="マイにわへ"
                        onAction={goGarden}
                    />
                </section>
            </div>
        </WebLayout>
    )
})

const Card = ({ title, body }: { title: string, body: string }) => (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">{body}</p>
    </div>
)

const Callout = ({
    title,
    description,
    actionLabel,
    onAction,
    disabled = false
}: {
    title: string
    description: string
    actionLabel: string
    onAction: () => void
    disabled?: boolean
}) => (
    <div className="flex flex-col gap-3 rounded-2xl border border-theme/30 bg-theme/5 p-6">
        <div>
            <p className="text-sm uppercase tracking-widest text-theme-dark/70">Action</p>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
        <div>
            <Button variant="blue" onClick={onAction} disabled={disabled}>
                {actionLabel}
            </Button>
        </div>
    </div>
)

export default KodamaHome
