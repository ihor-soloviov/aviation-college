/**
 * Seed global 'navigation' з поточного статичного меню (src/lib/navigation.ts).
 * Після цього хедер читається з CMS; редактор керує меню в адмінці.
 * Ідемпотентний: завжди перезаписує items на канонічний набір.
 *
 * Запуск: node_modules/.bin/tsx src/scripts/seed/seed-navigation.ts
 */

import { getPayload } from 'payload'
import config from '../../../payload.config'
import { links } from '../../lib/navigation'

async function main() {
    const payload = await getPayload({ config })

    const items = links.map((l) => ({
        label: l.label,
        type: 'url' as const,
        url: l.href,
    }))

    await payload.updateGlobal({
        slug: 'navigation',
        data: { items },
    })

    console.log(`✓ Navigation global заповнено: ${items.length} пунктів`)
    process.exit(0)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
