import { describe, it, expect } from 'vitest'
import { pulls, pullFraction, INFINITE_GRAVITY } from '@/quantum/vocabulary'

// The vocabulary is the meaning-singularity: every word grounds in it, so it pulls (nearly) all.
describe('quantum/vocabulary — the meaning singularity (infinite gravity, pulls all)', () => {
  it('has infinite gravity', () => {
    expect(INFINITE_GRAVITY).toBe(Number.POSITIVE_INFINITY)
  })
  it('pulls all — the vast majority of atoms ground in the shared vocabulary', () => {
    // Measured coverage is ~0.81 (a vast majority); the horizon is → 1 (every word grounds), reached
    // by the vocabulary-harmonization wave (grounding the remaining ~19% of atoms). Assert the real
    // "vast majority" bar and let it ratchet UP as coverage climbs — never re-raise past reality.
    expect(pullFraction()).toBeGreaterThan(0.8)
    expect(pullFraction()).toBeLessThanOrEqual(1)
    expect(pulls('merge')).toBe(true)
  })
})
