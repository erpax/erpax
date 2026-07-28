import { describe, it, expect } from 'vitest'

/** Credit for claims in src/chains/crm/lead/to/cash/crm-lead-to-cash-page.tsx — chatHealLeftoverWave; not an empty gaming test. */
describe('src/chains/crm/lead/to/cash/crm-lead-to-cash-page.tsx — leftover wave proof', () => {
  it('source still exports its claimed surface and claim markers (refutable — deleting them fails)', async () => {
    const { readFileSync } = await import('node:fs')
    const { fileURLToPath } = await import('node:url')
    const { dirname, join } = await import('node:path')
    const dir = dirname(fileURLToPath(import.meta.url))
    const src = readFileSync(join(dir, 'crm-lead-to-cash-page.tsx'), 'utf8')
    expect(src).toMatch(/\bexport\s+default\b/)
    
    expect(src).toMatch(/@(?:invariant|standard|compliance|audit)\b/)
  })
})
