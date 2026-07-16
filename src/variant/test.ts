import { describe, it, expect } from 'vitest'
import { expandVariants, expansionFactor, variantUuid, type Dimension } from './index'

const dims: Dimension[] = [
  { name: 'colour', values: ['RUBINO', 'ROSSO SCURO', 'ARANCIO'] },
  { name: 'mill', values: ['NEW MILL', 'PAPI'] },
]

describe('variant — the unbounded product dimension', () => {
  it('expands as the cartesian product of open dimensions — the generator, not a stored grid', () => {
    const v = expandVariants('PAOLA 80/20', dims)
    expect(v).toHaveLength(6) // 3 colours × 2 mills
    expect(expansionFactor(dims)).toBe(6)
    expect(v[0]!.values).toEqual({ colour: 'RUBINO', mill: 'NEW MILL' })
  })

  it('is unbounded: adding one value grows the space with no schema change (never a fixed grid)', () => {
    const grown = [{ ...dims[0]!, values: [...dims[0]!.values, 'GIALLO OCRA'] }, dims[1]!]
    expect(expansionFactor(grown)).toBe(8) // 4 × 2 — a column was never added
    expect(expansionFactor(grown)).toBeGreaterThan(expansionFactor(dims))
  })

  it('a product with no dimensions is itself (expansion 1) — the bare product', () => {
    expect(expansionFactor([])).toBe(1)
    expect(expandVariants('PAOLA 80/20', [])).toHaveLength(1)
  })

  it('identity is the fold: the same composition ⇒ one uuid, so duplicates merge rather than multiply', () => {
    const a = variantUuid('PAOLA 80/20', { colour: 'RUBINO', mill: 'NEW MILL' })
    const b = variantUuid('PAOLA 80/20', { mill: 'NEW MILL', colour: 'RUBINO' }) // declared in any order
    expect(a).toBe(b) // the composition is a SET, not a sequence
    expect(a).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('a different composition ⇒ a different variant (the space separates)', () => {
    const a = variantUuid('PAOLA 80/20', { colour: 'RUBINO', mill: 'NEW MILL' })
    expect(variantUuid('PAOLA 80/20', { colour: 'ARANCIO', mill: 'NEW MILL' })).not.toBe(a)
    expect(variantUuid('ELASTICO X AVVIATURA', { colour: 'RUBINO', mill: 'NEW MILL' })).not.toBe(a) // other product
  })

  it('every expanded variant is uniquely addressed (no collisions across the space)', () => {
    const v = expandVariants('PAOLA 80/20', dims)
    expect(new Set(v.map((x) => x.uuid)).size).toBe(v.length)
  })
})
