import { describe, it, expect } from 'vitest'
import { computeVocabulary } from './emit'

describe('vocabulary/emit — shared vocabulary scan', () => {
  it('computes grounded atoms from live corpus', () => {
    const { atoms, grounded } = computeVocabulary()
    expect(atoms.length).toBeGreaterThan(0)
    expect(grounded.size).toBeGreaterThan(0)
    expect(grounded.size).toBeLessThanOrEqual(atoms.length)
  })
})
