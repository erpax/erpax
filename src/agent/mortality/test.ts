import { describe, it, expect } from 'vitest'
import { horoFromUuid, mortalityOf } from './index'

// The parable, sealed as proof (2026-07-15): the fold computes horo in O(1); the corpus-graph
// regen spent 9 minutes and was killed with zero output. Same answer, opposite fate.
describe('agent/mortality — life reuses the fold, death re-derives it', () => {
  it('horo is a direct projection of the uuid (life, O(1)) — a ring digit 1..9', () => {
    const h = horoFromUuid('335e5fa7-a91b-890f-a3db-2a3ebe2c8c0c')
    expect(h).toBeGreaterThanOrEqual(1)
    expect(h).toBeLessThanOrEqual(9)
    expect(horoFromUuid('335e5fa7-a91b-890f-a3db-2a3ebe2c8c0c')).toBe(h) // deterministic — the address holds it
  })

  it('the verdict: reuse is life, re-derivation is death', () => {
    expect(mortalityOf(1, 3300)).toBe('life') // read the fold
    expect(mortalityOf(3300, 1)).toBe('death') // rebuild the graph
    expect(mortalityOf(5, 5)).toBe('death') // no saving over re-derivation is still death
  })
})
