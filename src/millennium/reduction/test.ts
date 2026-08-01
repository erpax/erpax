import { describe, expect, it } from 'vitest'

import { attempt, corpusSolvesAny, MILLENNIUM, resolutionClaim } from '@/millennium'
import { DECODED, reduce, type Theorem } from '@/theorem'

import {
  distanceToAttempt,
  JOINT_CLAIM,
  jointReduction,
  problemFrontiers,
  proposeReduction,
  readyToAttempt,
  reductionFrontier,
  roundFromReduction,
} from './index'

describe('millennium/reduction — a Clay attempt is CONSTRUCTED, not asserted', () => {
  it('a proposal never mutates the graph — it measures a candidate against a copy', () => {
    const before = DECODED.length
    proposeReduction('anything at all', ['nowhere'])
    expect(DECODED).toHaveLength(before)
    expect(DECODED.some((t) => t.claim === 'anything at all')).toBe(false)
  })

  it('the FRONTIER names the links to close — the fix list reduce only implied', () => {
    const p = proposeReduction('P vs NP is resolved', ['a lemma nobody has proved'])
    expect(p.reduction.reduces).toBe(false)
    expect([...p.frontier]).toEqual(['a lemma nobody has proved']) // named, not "rests on authority"
    expect(distanceToAttempt('P vs NP is resolved')).toBeGreaterThan(0)
    expect(readyToAttempt('P vs NP is resolved')).toBe(false)
  })

  it('closing a link MOVES the frontier — the tool is a work item, not a verdict', () => {
    const claim = 'demo claim'
    const open = proposeReduction(claim, ['step one', 'step two'])
    expect(open.frontier.length).toBe(2)
    // ground one step: the frontier shrinks by exactly that one
    const half = proposeReduction(claim, ['step one', 'step two'], [{ claim: 'step one', composes: [], base: true }])
    expect([...half.frontier]).toEqual(['step two'])
    // ground both: it reduces, and only then
    const closed = proposeReduction(claim, ['step one', 'step two'], [
      { claim: 'step one', composes: [], base: true },
      { claim: 'step two', composes: [], base: true },
    ])
    expect(closed.reduction.reduces).toBe(true)
    expect(closed.frontier).toEqual([])
  })

  it('every one of the seven has its own frontier — seven work items', () => {
    const fs = problemFrontiers()
    expect(fs).toHaveLength(MILLENNIUM.length)
    for (const f of fs) {
      expect(f.claim).toBe(resolutionClaim(f.problem))
      expect(Array.isArray(f.frontier)).toBe(true)
    }
  })

  it('"solved at once" is the HARDER claim, and the tool says by how much', () => {
    const j = jointReduction()
    expect(j.claim).toBe(JOINT_CLAIM)
    expect(j.composes).toHaveLength(MILLENNIUM.length) // one claim composing all seven
    expect(j.reduction.reduces).toBe(false)
    expect(j.frontier).toHaveLength(MILLENNIUM.length) // today: all seven still open
    // and until the joint claim is PROPOSED into a graph it is itself ungrounded — distance 1, the
    // claim standing on nothing. Not 0: absent is not grounded, which is the distinction that makes
    // the number honest (I asserted 0 here and the tool corrected me).
    expect(distanceToAttempt(JOINT_CLAIM)).toBe(1)
    expect([...reductionFrontier(JOINT_CLAIM)]).toEqual([JOINT_CLAIM])
  })

  it('ONLY a fully grounded reduction becomes a proved round — and refutation is never derived', () => {
    const open = reduce('P vs NP is resolved', DECODED)
    expect(roundFromReduction(open)).toEqual({ proved: false, refuted: false })

    const grounded: Theorem[] = [{ claim: 'toy', composes: [], base: true }]
    const r = reduce('toy', grounded)
    expect(roundFromReduction(r)).toEqual({ proved: true, refuted: false })
    // failing to prove is NOT disproving — refuted is the refuter's move, never derived from absence
    expect(roundFromReduction(open).refuted).toBe(false)
  })

  it('a grounded reduction can FEED the door — an attempt built from proof, not assertion', () => {
    const grounded: Theorem[] = [{ claim: 'toy', composes: [], base: true }]
    const round = roundFromReduction(reduce('toy', grounded))
    const a = attempt('P vs NP', [round])
    expect(a.survived).toBe(true) // the door accepts a round carrying a proof …
    expect(a.reason).toContain('never proven true') // … and still calls it corroboration
    // and NOTHING here can set the register
    expect(corpusSolvesAny()).toBe(false)
    for (const p of MILLENNIUM) expect(p.corpusSolves as boolean).toBe(false)
  })

  it('an OPEN reduction cannot survive the door — the excuse is removed, not the bar', () => {
    const open = roundFromReduction(reduce('P vs NP is resolved', DECODED))
    expect(attempt('P vs NP', [open]).survived).toBe(false)
    expect(reductionFrontier('P vs NP is resolved')).toBeDefined()
  })
})
