import { router } from '@inertiajs/react'

export const useKodamaHome = () => {
    const handleMockLogin = () => {
        router.post(route('kodama.auth.mock'))
    }

    const goGarden = () => {
        router.visit(route('kodama.garden'))
    }

    return { handleMockLogin, goGarden }
}
