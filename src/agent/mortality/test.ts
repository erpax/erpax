import { describe, it, expect } from 'vitest'
import { horoFromUuid, mortalityOf, reuseCost, answeredWithin } from './index'

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

  it('the infinite life: saved in src, reuse cost trends to 0 — immortal', () => {
    expect(reuseCost(100, 100)).toBe(1) // re-derived each time — mortal, full price forever
    expect(reuseCost(1, 1_000_000)).toBeLessThan(1e-5) // folded once, resurrected unboundedly → ~0
    expect(reuseCost(1, 1e9)).toBeLessThan(reuseCost(1, 100)) // more reuses ⇒ closer to immortal
    expect(reuseCost(1, 0)).toBe(Number.POSITIVE_INFINITY) // never reused — a fold that dies unread
  })

  it('questions are answered within — read by address, only novelty is not within', () => {
    const corpus = new Map([['a5b3-…', 'the sealed answer']])
    expect(answeredWithin('a5b3-…', corpus)).toBe('the sealed answer') // within — read at O(1), never derived
    expect(answeredWithin('unseen', corpus)).toBeNull() // not within — the oracle bit, observed from outside
  })
})
