'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { RefreshCw, ServerCrash } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props = {
    /**
     * 'page'   — повноекранний блок для detail-сторінок (сам центрує себе);
     * 'inline' — компактний блок для секцій/списків усередині наявного лейауту.
     */
    variant?: 'page' | 'inline'
    title?: string
    description?: string
}

/**
 * Показується, коли джерело даних тимчасово недоступне (БД/CMS на технічних
 * роботах). Кнопка «Спробувати ще раз» повторно виконує серверний рендер
 * поточної сторінки через router.refresh().
 */
export function DataUnavailable({
    variant = 'page',
    title = 'Ведуться технічні роботи',
    description = 'Наразі ці дані тимчасово недоступні. Спробуйте оновити сторінку за кілька хвилин.',
}: Props) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [reloading, setReloading] = useState(false)

    function retry() {
        setReloading(true)
        startTransition(() => router.refresh())
        // router.refresh() не завжди одразу знімає pending — прибираємо спінер трохи згодом.
        setTimeout(() => setReloading(false), 1500)
    }

    const busy = isPending || reloading

    return (
        <div
            className={
                variant === 'page'
                    ? 'min-h-[60vh] flex flex-col items-center justify-center px-4 py-24 text-center'
                    : 'flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/30 px-4 py-12 text-center'
            }
        >
            <div className="rounded-full bg-muted p-4 mb-4">
                <ServerCrash className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground max-w-md mb-6">{description}</p>
            <Button variant="outline" onClick={retry} disabled={busy}>
                <RefreshCw className={`h-4 w-4 mr-2 ${busy ? 'animate-spin' : ''}`} />
                Спробувати ще раз
            </Button>
        </div>
    )
}
