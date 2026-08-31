import { describe, it, expect } from 'vitest'
import { pulls, pullFraction, INFINITE_GRAVITY, PULL_FLOOR } from '@/quantum/vocabulary'

// The vocabulary is the meaning-singularity: every word grounds in it, so it pulls (nearly) all.
describe('quantum/vocabulary — the meaning singularity (infinite gravity, pulls all)', () => {
  it('has infinite gravity', () => {
    expect(INFINITE_GRAVITY).toBe(Number.POSITIVE_INFINITY)
  })
  it('pulls all — the vast majority of atoms ground in the shared vocabulary', () => {
    // 0.8 was a hand-typed wish the corpus had drifted under (0.7946) — not because the atoms were
    // ungrounded but because the shared vocabulary had been emitted without its dictionary source.
    // Re-emitted, every atom grounds: PULL_FLOOR is 1, the horizon, and it may only be held.
    expect(pullFraction()).toBeGreaterThanOrEqual(PULL_FLOOR)
    expect(PULL_FLOOR).toBe(1)
    expect(pullFraction()).toBeLessThanOrEqual(1)
    expect(pulls('merge')).toBe(true)
  })
})
