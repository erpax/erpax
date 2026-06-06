import { describe, it, expect } from 'vitest'
import { fuse, fusionCost } from '@/dual/torus/fusion'

describe('dual/torus/fusion — the quantum cross (two tori fused into one)', () => {
  it('fuse merges two poles into one identity (deterministic)', () => {
    const f = fuse('a', 'b')
    expect(f).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    expect(fuse('a', 'b')).toBe(f)
  })
  it('fusing to full coverage is the ∞ seal — 1/0, the double torus', () => {
    expect(fusionCost(0)).toBe(Infinity)
    expect(Number.isFinite(fusionCost(0.5))).toBe(true)
  })
})
