/**
 * Генерація src/payload-types.ts без payload CLI (CLI падає на loadEnvConfig
 * через несумісність @next/env). Запуск:
 *   node_modules/.bin/tsx src/scripts/generate-types.ts
 */
import { generateTypes } from 'payload/node'
import configPromise from '../../payload.config'

async function main() {
    const config = await configPromise
    await generateTypes(config)
    console.log('✓ payload-types.ts згенеровано')
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
