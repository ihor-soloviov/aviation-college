'use client'

import { useEffect } from 'react'
import { RefreshCw, ServerCrash } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Аварійна межа для всього frontend-сегмента. Рендериться всередині layout
 * (хедер/футер лишаються), тож будь-яка непіймана помилка серверного
 * компонента (напр. недоступна БД у місці, яке ми не обгорнули явно) показує
 * дружній екран замість падіння всієї сторінки.
 */
export default function FrontendError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('[frontend error boundary]', error)
    }, [error])

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-24 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
                <ServerCrash className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-xl font-semibold mb-2">Ведуться технічні роботи</h1>
            <p className="text-muted-foreground max-w-md mb-6">
                Сталася тимчасова помилка під час завантаження сторінки. Спробуйте ще
                раз за кілька хвилин.
            </p>
            <Button variant="outline" onClick={reset}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Спробувати ще раз
            </Button>
        </div>
    )
}
