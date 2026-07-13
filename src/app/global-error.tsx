'use client'

import { useEffect } from 'react'

/**
 * Останній рубіж: ловить помилки навіть у кореневому layout (напр. якщо впаде
 * читання навігації без fallback). Замінює весь документ, тож рендерить власні
 * <html>/<body> і не покладається на стилі застосунку.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('[global error boundary]', error)
    }, [error])

    return (
        <html lang="uk">
            <body
                style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    padding: '2rem',
                    textAlign: 'center',
                    fontFamily: 'system-ui, sans-serif',
                    background: '#f8fafc',
                    color: '#0f172a',
                }}
            >
                <h1 style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                    Ведуться технічні роботи
                </h1>
                <p style={{ maxWidth: '28rem', color: '#475569' }}>
                    Сайт тимчасово недоступний. Спробуйте оновити сторінку за кілька
                    хвилин.
                </p>
                <button
                    onClick={reset}
                    style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #cbd5e1',
                        background: 'white',
                        cursor: 'pointer',
                    }}
                >
                    Спробувати ще раз
                </button>
            </body>
        </html>
    )
}
