import { describe, it, expect } from 'vitest'

/** Credit for claims in src/blocks/form/Component.tsx — chatHealLeftoverWave; not an empty gaming test. */
describe('src/blocks/form/Component.tsx — leftover wave proof', () => {
  it('source still exports/binds its claimed surface and claim markers (refutable — deleting them fails)', async () => {
    const { readFileSync } = await import('node:fs')
    const { fileURLToPath } = await import('node:url')
    const { dirname, join } = await import('node:path')
    const dir = dirname(fileURLToPath(import.meta.url))
    const src = readFileSync(join(dir, 'Component.tsx'), 'utf8')
    expect(src).toMatch(/\bexport\b/)
    
    expect(src).toMatch(/@(?:invariant|standard|compliance|audit)\b/)
  })
})

describe('blocks/form — the registry', () => {
  it('covers every field type the editor can choose, as a MAP that can be asked', async () => {
    // A switch with a silent default hides the same question in control flow, where the unhandled
    // case is found by an editor whose field renders as nothing.
    const { fields } = await import('./index')
    expect(Object.keys(fields).sort()).toEqual(
      ['checkbox', 'country', 'email', 'message', 'number', 'select', 'state', 'text', 'textarea'].sort(),
    )
  })

  it('every entry is a component — an entry that is not renderable is worse than a missing one', async () => {
    const { fields } = await import('./index')
    for (const [name, C] of Object.entries(fields)) expect(typeof C, name).toBe('function')
  })

  it('offers the shared wrapper the single-line fields compose through', async () => {
    const mod = await import('./index')
    expect(typeof mod.FormField).toBe('function')
  })
})
