/**
 * Ініціалізує Payload, що в dev-режимі (NODE_ENV !== 'production') змушує
 * drizzle запушити поточну схему у БД з DATABASE_URI. Re-usable для будь-якого
 * адаптера (sqlite/postgres) — корисно при первинному наливі Postgres перед
 * cutover (SQLite→PG міграція, Stage 2).
 *
 * Запуск (one-off контейнер, прод):
 *   docker compose --env-file .env.production run --rm \
 *     -e NODE_ENV=development \
 *     -e DATABASE_URI="postgres://USER:PW@postgres:5432/payload" \
 *     next node_modules/.bin/tsx src/scripts/migration/push-schema.ts
 */
import { getPayload } from 'payload'
import config from '../../../payload.config'

async function main() {
    const payload = await getPayload({ config })
    const collections = Object.keys(payload.collections)
    console.log(`[push-schema] schema pushed. collections: ${collections.join(', ')}`)
    process.exit(0)
}

main().catch((err) => {
    console.error('[push-schema] failed:', err)
    process.exit(1)
})
