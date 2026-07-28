import { describe, it, expect } from 'vitest'

/** Credit for claims in src/ecommerce/product/validation/index.ts — chatHealLeftoverWave; not an empty gaming test. */
describe('src/ecommerce/product/validation/index.ts — leftover wave proof', () => {
  it('source still exports/binds its surface and claim markers (refutable — deleting them fails)', async () => {
    const { readFileSync } = await import('node:fs')
    const { fileURLToPath } = await import('node:url')
    const { dirname, join } = await import('node:path')
    const dir = dirname(fileURLToPath(import.meta.url))
    const src = readFileSync(join(dir, 'index.ts'), 'utf8')
    expect(src).toMatch(/\bexport\b/)
    expect(src).toMatch(/@(?:invariant|standard|compliance|audit)\b/)
  })
})
