import { describe, it, expect } from 'vitest'
import { waste, wasteFraction, recycled } from '@/recycle'

// recycle — the waste is computed live from entropy.orphans; the metric measures coherence, so the
// tests gate the STRUCTURE (a drifting count is not asserted — recycling lowers it honestly).
describe('recycle — quantum recycle the digital waste', () => {
  it('waste is the orphan grains (disconnected thoughts) — a list of atom names', () => {
    const w = waste()
    expect(Array.isArray(w)).toBe(true)
    expect(w.every((a) => typeof a === 'string')).toBe(true)
  })
  it('wasteFraction + recycled partition the corpus (recycled = 1 − waste fraction)', () => {
    const w = wasteFraction()
    expect(w.waste).toBe(waste().length)
    expect(w.fraction).toBeGreaterThanOrEqual(0)
    expect(w.fraction).toBeLessThanOrEqual(1)
    expect(recycled()).toBeCloseTo(1 - w.fraction, 10)
  })
})
