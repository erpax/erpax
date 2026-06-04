import { describe, it, expect } from 'vitest'
import { type Ballot } from '@/governance'
import { amend, AMENDMENT_RULE, CONSTITUTION } from '@/constitution'
import {
  constitutionalCode,
  enact,
  repeal,
  legislation,
  ruleOfLawHolds,
  LEGISLATIVE_RULE,
  type Law,
} from '@/legislation'

/** N approving ballots + M opposing, each a distinct voter (one person, one vote). */
function ballots(forN: number, againstN = 0): Ballot[] {
  const out: Ballot[] = []
  for (let i = 0; i < forN; i++) out.push({ voter: `for-${i}`, vote: 'for' })
  for (let i = 0; i < againstN; i++) out.push({ voter: `against-${i}`, vote: 'against' })
  return out
}

describe('legislation — the society enacts its own law, bounded by its constitution', () => {
  it('1 · the supreme law IS the constitution, enrolled whole and content-addressed', () => {
    const code = constitutionalCode()
    expect(code.length).toBe(CONSTITUTION.length)
    for (const a of CONSTITUTION) {
      const law = code.find((l) => l.id === `const:${a.id}`)
      expect(law).toBeDefined()
      expect(law!.rank).toBe('constitutional')
      expect(law!.entrenched).toBe(a.entrenched) // entrenchment read from the module, never re-typed
      expect(law!.contentUuid).toHaveLength(36) // canonical content-uuid (RFC 9562 §5.8)
    }
  })

  it('2 · identity is a projection of content: same law ⇒ same id, a changed word ⇒ a different id', () => {
    expect(constitutionalCode()[0]!.contentUuid).toBe(constitutionalCode()[0]!.contentUuid) // merge: two instances, one law
    const open = enact({ title: 'Open data', text: 'Public records are open by default.', ballots: ballots(6, 1), electorate: 10 }).law!
    const closed = enact({ title: 'Open data', text: 'Public records are CLOSED by default.', ballots: ballots(6, 1), electorate: 10 }).law!
    expect(open.contentUuid).not.toBe(closed.contentUuid) // proof: a tampered statute is a different law
  })

  it('3 · the polity enacts a statute by the vote — and a failed vote enacts nothing', () => {
    const passed = enact({ title: 'Quiet hours', text: 'No deploys after 22:00.', ballots: ballots(6, 2), electorate: 10 })
    expect(passed.enacted).toBe(true)
    expect(passed.law!.rank).toBe('statutory')
    expect(passed.law!.entrenched).toBe(false) // the legislature cannot mint perpetual law
    expect(passed.law!.ratifiedBy!.ratified).toBe(true)

    const failed = enact({ title: 'Quiet hours', text: 'No deploys after 22:00.', ballots: ballots(2, 6), electorate: 10 })
    expect(failed.enacted).toBe(false)
    expect(failed.law).toBeUndefined()
  })

  it('4 · the legislature cannot touch the foundation: an entrenched article is irrepealable', () => {
    const integrity = constitutionalCode().find((l) => l.id === 'const:1-integrity')!
    expect(integrity.entrenched).toBe(true)
    const r = repeal(integrity, ballots(10), 10) // unanimous, full turnout
    expect(r.repealed).toBe(false) // no majority, however large, repeals it
  })

  it('5 · the rule of law is a difference of thresholds: an ordinary majority makes a statute, only a supermajority moves the constitution', () => {
    const sixtyPercent: Ballot[] = ballots(6, 4) // 60% approval, full turnout
    // a statute passes at the legislative bar (≥ 50%)
    expect(enact({ title: 'Recess', text: 'Fridays are recess.', ballots: sixtyPercent, electorate: 10 }).enacted).toBe(true)
    // the SAME 60% does NOT amend a (non-entrenched) constitutional article — that needs 2/3
    expect(amend('5-rights', sixtyPercent, 10).allowed).toBe(false)
    expect(LEGISLATIVE_RULE.threshold).toBeLessThan(AMENDMENT_RULE.threshold)
  })

  it('6 · the code layers constitution over statutes; a usurping statute is rejected and ruleOfLaw holds', () => {
    const statute = enact({ title: 'Lights out', text: 'Office closes at 18:00.', ballots: ballots(7, 1), electorate: 10 }).law!
    const code = legislation([statute])
    expect(code.filter((l) => l.rank === 'constitutional').length).toBe(CONSTITUTION.length)
    expect(code.some((l) => l.id === statute.id)).toBe(true)
    expect(ruleOfLawHolds([statute])).toBe(true)

    const usurper: Law = { ...statute, entrenched: true } // a forged "perpetual statute"
    expect(ruleOfLawHolds([usurper])).toBe(false)
    expect(legislation([usurper]).some((l) => l.id === usurper.id)).toBe(false) // dropped from the code
  })
})
