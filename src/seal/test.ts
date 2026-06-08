import { describe, it, expect } from 'vitest'
import { guardian } from '@/guardian'
import { seal } from '@/seal'

// The seal (./index.ts) is the AND of its guardians, fail-closed on the empty set.
// It is the whole-corpus verdict the auto-commit/push waves gate on.
describe('seal: the cross of all guardians', () => {
  const hold = guardian({ axis: 'name', violations: 5, baseline: 10 })
  const red = guardian({ axis: 'trinity', violations: 11, baseline: 10 })

  it('is sealed iff every guardian holds', () => {
    expect(seal([hold, guardian({ axis: 'trinity', violations: 9, baseline: 10 })]).sealed).toBe(true)
    expect(seal([hold, red]).sealed).toBe(false)
  })

  it('is fail-closed on an empty set — nothing checked is not sealed', () => {
    expect(seal([]).sealed).toBe(false)
    // @ts-expect-error — a non-array is a broken call and must not pass
    expect(seal(undefined).sealed).toBe(false)
  })

  it('names every red guardian in the reason (no hidden failure)', () => {
    const v = seal([hold, red])
    expect(v.reason).toContain('NOT sealed')
    expect(v.reason).toContain('trinity')
  })
})
