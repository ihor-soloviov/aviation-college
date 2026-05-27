'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'

// Слухає postMessage від Payload-адмінки і робить router.refresh(),
// щоб RSC-сторінка перемальовувалась на льоту під час редагування блоків.
export function LivePreviewListener() {
    const router = useRouter()
    return (
        <RefreshRouteOnSave
            serverURL={typeof window !== 'undefined' ? window.location.origin : ''}
            apiRoute="/api/payload"
            refresh={() => router.refresh()}
        />
    )
}
