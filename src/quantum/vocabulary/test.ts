import { describe, it, expect } from 'vitest'
import { pulls, pullFraction, INFINITE_GRAVITY } from '@/quantum/vocabulary'

// The vocabulary is the meaning-singularity: every word grounds in it, so it pulls (nearly) all.
describe('quantum/vocabulary — the meaning singularity (infinite gravity, pulls all)', () => {
  it('has infinite gravity', () => {
    expect(INFINITE_GRAVITY).toBe(Number.POSITIVE_INFINITY)
  })
  it('pulls all — the vast majority of atoms ground in the shared vocabulary', () => {
    expect(pullFraction()).toBeGreaterThan(0.9)
    expect(pullFraction()).toBeLessThanOrEqual(1)
    expect(pulls('merge')).toBe(true)
  })
})
