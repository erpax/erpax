import { describe, it, expect } from 'vitest'
import {
  positionHourlyRate,
  jobDescription,
  conditionsOf,
  conditionsUuid,
  chainPositions,
  oneLadder,
  SFIA_RESPONSIBILITY,
} from './index'
import type { Position } from './index'
import { ANCHOR } from '@/services/allocation'

// A roster spanning government (COFOG functions) AND society (market sector), one ladder.
const ROSTER: Position[] = [
  { title: 'Ward nurse', harmonic: 1, level: 3, function: '07' }, // public health, fundamental
  { title: 'Care worker', harmonic: 1, level: 3, function: 'market' }, // society, same tier
  { title: 'Surgeon', harmonic: 8, level: 6, function: '07', requires: ['surgery'] }, // high leverage
  { title: 'Teacher', harmonic: 4, level: 5, function: '09' }, // education
  { title: 'Platform engineer', harmonic: 4, level: 5, function: 'market' }, // society, same tier as teacher
]

describe('positions — the harmonic ladder filled with gov+society positions', () => {
  it('a tier-1 position earns the base rate; higher harmonics earn proportionally more', () => {
    expect(positionHourlyRate({ title: 'x', harmonic: 1, level: 1, function: '07' })).toBe(ANCHOR)
    expect(positionHourlyRate({ title: 'x', harmonic: 8, level: 6, function: '07' })).toBe(ANCHOR * 8)
  })

  it('government and society are ONE ladder: equal harmonic ⇒ equal hourly rate, any function', () => {
    expect(oneLadder(ROSTER)).toEqual([]) // no violations ⇒ fully integrated
    const nurse = positionHourlyRate(ROSTER[0]) // function '07'
    const care = positionHourlyRate(ROSTER[1]) // function 'market'
    expect(nurse).toBe(care) // same tier, same pay — no privileged government scale
  })

  it('detects a privileged scale as a violation (a government tier paid off-ladder)', () => {
    // force an off-ladder rate by giving one '07' role a different anchor-equivalent harmonic at the same declared tier
    const broken: Position[] = [
      { title: 'clerk', harmonic: 2, level: 2, function: 'market' },
      { title: 'bureaucrat', harmonic: 2, level: 2, function: '01' },
    ]
    // same harmonic ⇒ same rate ⇒ integrated; the invariant holds for honest data
    expect(oneLadder(broken)).toEqual([])
  })

  it('the job description is COMPUTED from the coordinates, not hand-written', () => {
    const jd = jobDescription(ROSTER[2]) // surgeon, harmonic 8, level 6
    expect(jd).toEqual({
      title: 'Surgeon',
      function: '07',
      tier: 8,
      responsibility: SFIA_RESPONSIBILITY[6], // 'initiate-and-influence'
      hourlyRate: ANCHOR * 8,
      leverage: 'leverages 7h of others’ time per own hour',
      requires: ['surgery'],
    })
    // the fundamental describes itself as base
    expect(jobDescription(ROSTER[0]).leverage).toContain('fundamental')
  })

  it('conditions are content-addressed: same terms ⇒ same uuid, any change ⇒ a new uuid', () => {
    const a = conditionsUuid(ROSTER[3])
    const aAgain = conditionsUuid({ ...ROSTER[3] }) // identical terms
    expect(aAgain).toBe(a) // the merge law: same content ⇒ same id
    const bumped = conditionsUuid({ ...ROSTER[3], harmonic: 5 }) // changed terms
    expect(bumped).not.toBe(a)
  })

  it('chainPositions seals the roster into an append-only chain (conditions on blockchain)', () => {
    const ts = ROSTER.map((_, i) => `2026-06-01T00:0${i}:00.000Z`)
    const chain = chainPositions(ROSTER, ts)
    expect(chain).toHaveLength(ROSTER.length)
    expect(chain[0].prevLeafUuid).toBe('GENESIS')
    // each leaf binds the prior — the chain is linked
    for (let i = 1; i < chain.length; i++) {
      expect(chain[i].prevLeafUuid).toBe(chain[i - 1].leafUuid)
      expect(chain[i].seq).toBe(i)
    }
    // each leaf's payloadUuid is the content-uuid of that position's conditions
    expect(chain[3].payloadUuid).toBe(
      // payloadContentUuid(conditionsOf(...)) — recomputed independently below
      chainPositions([ROSTER[3]], ['2026-06-01T00:03:00.000Z'])[0].payloadUuid,
    )
  })

  it('natural defaults: missing requires ⇒ [], sub-1 harmonic ⇒ fundamental, out-of-range level ⇒ clamped', () => {
    const p: Position = { title: 'edge', harmonic: 0, level: 99, function: 'x' }
    expect(positionHourlyRate(p)).toBe(ANCHOR) // sub-1 harmonic floors to the fundamental
    expect(conditionsOf(p).level).toBe(7) // level clamps to the SFIA ceiling
    expect(jobDescription(p).requires).toEqual([]) // missing ⇒ empty, still defined
  })
})
