import { describe, it, expect } from 'vitest'
import { reciprocity, entropy, orphans } from '@/entropy'
import { entanglement } from '@/quantum'

// entropy computed on the live matrix (./index.ts). Asserts RELATIONS, never a
// magic number: slack ∈ [0,1], the reciprocal fraction equals quantum's two
// ways (entangled consistency), orphans deterministic across calls.
describe('entropy: the borrowed disorder computed on the live uuid-matrix', () => {
  it('entropy() is a fraction in [0,1] — borrowed slack', () => {
    const s = entropy()
    expect(s).toBeGreaterThanOrEqual(0)
    expect(s).toBeLessThanOrEqual(1)
  })
  it('entropy() === 1 - reciprocity().fraction (slack is the complement of symmetry)', () => {
    expect(entropy()).toBe(1 - reciprocity().fraction)
  })
  it('reciprocity().fraction === quantum.entanglement().reciprocal/edges (same number, two views)', () => {
    const e = entanglement()
    expect(reciprocity().fraction).toBe(e.reciprocal / e.edges)
  })
  it('orphans() is deterministic across two calls', () => {
    expect(orphans()).toEqual(orphans())
  })
})
