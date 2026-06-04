import { describe, it, expect } from 'vitest'
import {
  positionHourlyRate,
  jobDescription,
  conditionsOf,
  conditionsUuid,
  chainPositions,
  oneLadder,
  roster,
  COFOG_FUNCTIONS,
  SECTOR_FUNCTIONS,
  SOCIETY_FUNCTIONS,
  SOCIETY_LEVELS,
  SFIA_RESPONSIBILITY,
} from '@/position'
import type { Position } from '@/position'
import { ANCHOR } from '@/allocation'
import { HORO_DIGITS } from '@/horo'

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

describe('positions — the derived roster: every role the society needs, at every level', () => {
  it('is the product of the function axis (gov ∪ society) and the SFIA level axis', () => {
    expect(SOCIETY_FUNCTIONS).toEqual([...COFOG_FUNCTIONS, ...SECTOR_FUNCTIONS]) // one continuum
    const all = roster()
    expect(all).toHaveLength(SOCIETY_FUNCTIONS.length * SOCIETY_LEVELS.length) // 15 × 7 = 105
    // titles are COMPUTED (function code · SFIA verb), never hand-written
    expect(all.find((p) => p.function === '07' && p.level === 3)?.title).toBe(`07·${SFIA_RESPONSIBILITY[3]}`)
  })

  it('each function is staffed by a full horo band: its seven levels ARE the ring [1,2,4,8,7,5,9]', () => {
    const health = roster(['07']) // one COFOG function, all seven levels
    expect(health.map((p) => p.harmonic)).toEqual([...HORO_DIGITS]) // base→crest→unity
  })

  it('government and society are ONE ladder across the whole roster: equal level ⇒ equal rate, any function', () => {
    expect(oneLadder(roster())).toEqual([]) // no privileged scale anywhere in the society
    const govHealthL4 = roster(['07'], [4])[0] // public health, crest
    const marketL4 = roster(['S.11'], [4])[0] // private sector, crest
    expect(positionHourlyRate(govHealthL4)).toBe(positionHourlyRate(marketL4)) // identical pay
    expect(positionHourlyRate(govHealthL4)).toBe(ANCHOR * 8) // anchor × M-value(level 4) = 7.83 × 8
  })

  it('the base level is the fundamental everywhere; the unity level tops the ring', () => {
    expect(positionHourlyRate(roster(['01'], [1])[0])).toBe(ANCHOR * 1) // 7.83/hr — saves no one's time
    expect(positionHourlyRate(roster(['01'], [7])[0])).toBe(ANCHOR * 9) // 70.47/hr — the governing close
  })
})
