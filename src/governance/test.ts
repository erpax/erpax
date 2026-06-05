import { describe, it, expect } from 'vitest'
import { tally } from '@/governance'

const rule = { quorum: 0.5, threshold: 0.6 } // ≥50% turnout, ≥60% approval

describe('governance — society manages erpax (the binding decision)', () => {
  it('ratifies when quorum AND threshold are met', () => {
    const v = tally(
      [{ voter: 'a', vote: 'for' }, { voter: 'b', vote: 'for' }, { voter: 'c', vote: 'for' }, { voter: 'd', vote: 'against' }],
      6, rule, // 4/6 turnout = 0.67 ≥ 0.5; approval 3/4 = 0.75 ≥ 0.6
    )
    expect(v.ratified).toBe(true)
    expect(v.approval).toBeCloseTo(0.75)
  })

  it('fails on insufficient quorum even with unanimous support', () => {
    const v = tally([{ voter: 'a', vote: 'for' }, { voter: 'b', vote: 'for' }], 10, rule) // 2/10 = 0.2 < 0.5
    expect(v.ratified).toBe(false)
    expect(v.reason).toBe('quorum not met')
  })

  it('fails when approval is below threshold', () => {
    const v = tally(
      [{ voter: 'a', vote: 'for' }, { voter: 'b', vote: 'against' }, { voter: 'c', vote: 'against' }, { voter: 'd', vote: 'for' }],
      4, rule, // turnout 1.0; approval 2/4 = 0.5 < 0.6
    )
    expect(v.ratified).toBe(false)
    expect(v.reason).toBe('approval below threshold')
  })

  it('one voter, one vote — ballot stuffing is foreclosed (a re-vote replaces, never doubles)', () => {
    const v = tally(
      [{ voter: 'a', vote: 'against' }, { voter: 'a', vote: 'for' }, { voter: 'a', vote: 'for' }, { voter: 'b', vote: 'against' }],
      2, rule, // 'a' counts ONCE (last = for); for 1, against 1 → approval 0.5
    )
    expect(v.for).toBe(1)
    expect(v.against).toBe(1)
  })

  it('abstentions count for turnout but not for approval', () => {
    const v = tally(
      [{ voter: 'a', vote: 'for' }, { voter: 'b', vote: 'for' }, { voter: 'c', vote: 'abstain' }],
      3, rule, // turnout 1.0; approval = 2/2 = 1.0 (abstain excluded from decisive)
    )
    expect(v.abstain).toBe(1)
    expect(v.approval).toBe(1)
    expect(v.ratified).toBe(true)
  })
})
