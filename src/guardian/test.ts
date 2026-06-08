import { describe, it, expect } from 'vitest'
import { guardian } from '@/guardian'

// The guardian (./index.ts) is the pure, fail-closed, single-axis ratchet the gate
// is built from. Its independence is asserted here: the verdict is a function of
// ONLY this axis' count and baseline — nothing else can mask or excuse a rise.
describe('guardian: one axis, one baseline, fail-closed', () => {
  it('ratchets — under and at baseline pass, over fails', () => {
    expect(guardian({ axis: 'name', violations: 5, baseline: 10 }).ok).toBe(true) // under
    expect(guardian({ axis: 'name', violations: 10, baseline: 10 }).ok).toBe(true) // at
    expect(guardian({ axis: 'name', violations: 11, baseline: 10 }).ok).toBe(false) // over → red
  })

  it('is fail-closed on a broken scan or baseline', () => {
    expect(guardian({ axis: 'x', violations: NaN, baseline: 10 }).ok).toBe(false) // broken scan
    expect(guardian({ axis: 'x', violations: -1, baseline: 10 }).ok).toBe(false) // impossible count
    expect(guardian({ axis: 'x', violations: 5, baseline: NaN }).ok).toBe(false) // broken literal
    expect(guardian({ axis: 'x', violations: 5, baseline: -1 }).ok).toBe(false)
  })

  it('names its axis in every verdict (so a failure is self-locating)', () => {
    expect(guardian({ axis: 'trinity', violations: 11, baseline: 10 }).axis).toBe('trinity')
    expect(guardian({ axis: 'trinity', violations: 11, baseline: 10 }).reason).toContain('trinity')
  })

  it('signals an improvement so the baseline can be ratcheted down', () => {
    const v = guardian({ axis: 'name', violations: 3, baseline: 10 })
    expect(v.ok).toBe(true)
    expect(v.reason).toContain('improved')
  })
})
