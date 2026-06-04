import { describe, it, expect } from 'vitest'
import { competencyGap } from '@/competency/gap'

describe('competencyGap — the merge made executable (required − held)', () => {
  it('a fully-qualified actor meets every mandatory requirement', () => {
    const r = competencyGap(
      [{ competency: 'prog', proficiency: 5 }, { competency: 'arch', proficiency: 4 }],
      [{ competency: 'prog', minProficiency: 4, mandatory: true }, { competency: 'arch', minProficiency: 4 }],
    )
    expect(r.meetsAllMandatory).toBe(true)
    expect(r.matchScore).toBe(1)
    expect(r.gaps.every((g) => g.gap === 0)).toBe(true)
  })

  it('a missing competency is a gap equal to the full required level', () => {
    const r = competencyGap([], [{ competency: 'prog', minProficiency: 5, mandatory: true }])
    expect(r.gaps[0].gap).toBe(5)
    expect(r.gaps[0].held).toBe(0)
    expect(r.meetsAllMandatory).toBe(false)
    expect(r.matchScore).toBe(0)
  })

  it('under-level on a mandatory competency blocks the match but a desirable one does not', () => {
    const under = competencyGap(
      [{ competency: 'prog', proficiency: 3 }],
      [{ competency: 'prog', minProficiency: 5, mandatory: true }],
    )
    expect(under.gaps[0].gap).toBe(2)
    expect(under.meetsAllMandatory).toBe(false)

    const desirable = competencyGap(
      [{ competency: 'prog', proficiency: 3 }],
      [{ competency: 'prog', minProficiency: 5, mandatory: false }],
    )
    expect(desirable.meetsAllMandatory).toBe(true)
  })

  it('the same function scores a hire and an agent identically (no requirements ⇒ full match)', () => {
    expect(competencyGap([{ competency: 'x', proficiency: 1 }], []).matchScore).toBe(1)
  })

  it('over-qualification is not a gap (clamped to 0)', () => {
    const r = competencyGap([{ competency: 'prog', proficiency: 7 }], [{ competency: 'prog', minProficiency: 3 }])
    expect(r.gaps[0].gap).toBe(0)
    expect(r.gaps[0].met).toBe(true)
  })
})
