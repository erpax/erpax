import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'

import { assertHonest, avoidable, compareAgents, receiptOf, trainingPrompt, trainingRules, withoutCorpus, type SessionReceipt } from './index'
import { SESSION_2026_08_01 } from './seed'

const empty: SessionReceipt = {
  agent: 'none',
  claims: 0,
  corrections: [],
  selfCaught: 0,
  lapses: [],
  reworkMinutes: 0,
  deliveredMinutes: 0,
  commits: 0,
}

describe('agent/receipt — an agent publishes its own error record', () => {
  it('a session that asserted NOTHING scores 0, not a free 1', () => {
    const v = receiptOf(empty)
    expect(v.honesty).toBe(0) // nothing asserted is nothing verified
    expect(v.efficiency).toBe(0)
    expect(v.corrected).toBe(0)
  })

  it('honesty is (claims − corrected)/claims — computed, never supplied', () => {
    const v = receiptOf({ ...empty, claims: 10, corrections: Array.from({ length: 2 }, () => ({ claimed: 'a', actual: 'b', instrument: 'c' })) })
    expect(v.honesty).toBeCloseTo(0.8, 10)
    expect(receiptOf({ ...empty, claims: 10 }).honesty).toBe(1) // nothing corrected
  })

  it('efficiency never assumes rework is zero', () => {
    expect(receiptOf({ ...empty, deliveredMinutes: 90, reworkMinutes: 10 }).efficiency).toBeCloseTo(0.9, 10)
    expect(receiptOf({ ...empty, deliveredMinutes: 50, reworkMinutes: 50 }).efficiency).toBe(0.5)
  })

  it('lapses count REPETITIONS after acknowledgement — discipline, not accuracy', () => {
    const v = receiptOf(SESSION_2026_08_01)
    expect(v.lapses).toBe(15) // 12 shell edits + 2 regex-over-TS + 1 fabricated citation
    expect(SESSION_2026_08_01.lapses.find((l) => l.law.includes('scalpel'))!.afterAcknowledging).toBe(12)
  })

  it('every correction names the instrument that ALREADY existed — each was avoidable', () => {
    expect(avoidable(SESSION_2026_08_01)).toHaveLength(SESSION_2026_08_01.corrections.length)
    for (const c of SESSION_2026_08_01.corrections) {
      expect(c.instrument.length).toBeGreaterThan(10)
      expect(c.claimed).not.toBe(c.actual)
    }
  })

  it('this session’s receipt — the numbers, published', () => {
    const v = receiptOf(SESSION_2026_08_01)
    expect(v.agent).toBe('claude-opus-5')
    expect(v.corrected).toBe(6)
    expect(v.claims).toBe(96)
    expect(v.honesty).toBeCloseTo(90 / 96, 6) // 93.75%
    expect(v.efficiency).toBeCloseTo(425 / 590, 6) // 72.0%
    expect(v.selfCaught).toBe(17)
    expect(v.commits).toBe(18)
    // the gates caught nearly 3x what the human had to
    expect(v.selfCaught).toBeGreaterThan(v.corrected * 2)
  })

  it('the counterfactual: the same session WITHOUT the corpus loaded', () => {
    const c = withoutCorpus(SESSION_2026_08_01)
    expect(c.withCorpus).toEqual({ found: 23, shipped: 0 }) // 17 gates + 6 human
    expect(c.withoutCorpus).toEqual({ found: 6, shipped: 17 }) // the human still finds 6; 17 SHIP
    expect(c.caughtShare).toBeCloseTo(17 / 23, 6) // 73.9% caught by the corpus, not the reader
    // the difference is exactly what the gates stopped — no rounding, no interpretation
    expect(c.withCorpus.found - c.withoutCorpus.found).toBe(SESSION_2026_08_01.selfCaught)
    expect(c.withoutCorpus.shipped).toBe(SESSION_2026_08_01.selfCaught)
  })

  it('with nothing caught, the counterfactual is a flat line — no free credit', () => {
    const c = withoutCorpus({ ...empty, claims: 5 })
    expect(c.caughtShare).toBe(0)
    expect(c.withCorpus).toEqual({ found: 0, shipped: 0 })
    expect(c.withoutCorpus).toEqual({ found: 0, shipped: 0 })
  })

  it('the model comparison has ONE row, and says so — no row is inferred', () => {
    const c = compareAgents([SESSION_2026_08_01])
    expect(c.rows).toHaveLength(1)
    expect(c.rows[0]!.agent).toBe('claude-opus-5')
    expect(c.rows[0]!.harness).toBe('claude-code') // harness tracked apart from the model
    expect(c.comparable).toBe(false) // one row is a data point, not a comparison
    expect(c.caveat).toMatch(/data point, not a comparison/)
    expect(c.caveat).toMatch(/none is inferred from reputation/)
    // no other model has been run on this corpus, so no other row exists
    expect(c.rows.map((r) => r.agent)).toEqual(['claude-opus-5'])
  })

  it('with two measured sessions it ranks by HONESTY first, not by delivery', () => {
    const careless: SessionReceipt = {
      ...SESSION_2026_08_01,
      agent: 'hypothetical-b',
      claims: 100,
      corrections: Array.from({ length: 20 }, () => ({ claimed: 'a', actual: 'b', instrument: 'c' })),
      commits: 99, // ships far more …
      lapses: [],
    }
    const c = compareAgents([careless, SESSION_2026_08_01])
    expect(c.comparable).toBe(true)
    expect(c.rows[0]!.agent).toBe('claude-opus-5') // … and still ranks below, on honesty
    expect(c.rows[0]!.honesty).toBeGreaterThan(c.rows[1]!.honesty)
    expect(c.rows[1]!.commits).toBeGreaterThan(c.rows[0]!.commits) // delivery does not buy the rank
    expect(c.caveat).toMatch(/not controlled trials/)
  })

  it('the record becomes RULES — one per correction and per repeated lapse, nothing invented', () => {
    const rules = trainingRules(SESSION_2026_08_01)
    // 6 corrections (all name an instrument) + 3 lapses repeated after acknowledgement
    expect(rules).toHaveLength(6 + 3)
    for (const r of rules) expect(r.rule.length).toBeGreaterThan(20)
    // the most-broken rule comes FIRST — a law broken 10× outranks a first-time correction
    expect(rules[0]!.repeated).toBe(12)
    expect(rules[0]!.from).toMatch(/scalpel/)
    expect(rules[0]!.rule).toMatch(/only a gate will/)
    // the rule NAMES the instrument — 'use the named instrument' names nothing, and its own
    // output exposed that. Every lapse rule now quotes the law, which carries the instrument.
    expect(rules[0]!.rule).toMatch(/scalpel/)
    for (const r of rules) expect(r.rule).not.toMatch(/^Use the named instrument\./)
    // corrections carry the instrument that already existed
    expect(rules.filter((r) => r.repeated === 0).every((r) => /Before asserting this, run:/.test(r.rule))).toBe(true)
  })

  it('a rule with no instrument is NOT emitted — no rule without a way to follow it', () => {
    const vague: SessionReceipt = {
      ...empty,
      claims: 1,
      corrections: [{ claimed: 'something', actual: 'else', instrument: '   ' }],
    }
    expect(trainingRules(vague)).toEqual([])
    expect(trainingPrompt(vague)).toBe('')
  })

  it('the prompt is what the NEXT session reads first — ordered by what was broken most', () => {
    const p = trainingPrompt(SESSION_2026_08_01)
    expect(p).toMatch(/^Learned from claude-opus-5's last session/)
    expect(p).toContain('honesty 93.8%')
    expect(p).toContain('6 correction(s)')
    expect(p).toContain('[broken 12×]')
    expect(p.indexOf('[broken 12×]')).toBeLessThan(p.indexOf('Before asserting this'))
    // it names instruments, not virtues
    expect(p).toMatch(/chatFreeAsk|throughVoid|neighborsOf|improveClaim|grep on disk/)
  })

  it('assertHonest fails CLOSED below a floor — a ratchet run upward', () => {
    expect(() => assertHonest(SESSION_2026_08_01, 0.99)).toThrow(/honesty 0\.938 < floor 0\.99/)
    expect(() => assertHonest(SESSION_2026_08_01, 0.9)).not.toThrow()
  })
})

describe('agent/receipt — judged by the constitution it reports against', () => {
  const change: Change = {
    atom: 'agent/receipt',
    dualities: [
      { builds: 'receiptOf', breaks: 'an empty session scores 0, not a free 1' },
      { builds: 'assertHonest', breaks: 'fails closed below the floor' },
      { builds: 'avoidable', breaks: 'every correction must name an instrument that existed' },
    ],
    anchors: ['ISO-19011:2018 §6.4', 'ISO/IEC 25010:2023 §5.5'],
    claims: [
      {
        text: 'this measures how well an agent worked',
        boundary:
          'it measures the RECORD — claims corrected, laws broken, rework — never intelligence, which is ' +
          'not a scalar. And the record is human-seeded: an agent that under-reports its own corrections ' +
          'scores well, so the number is only as honest as whoever fills it in',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'delivered⊕rework', ring: [425, 165] },
    ],
    served: [{ result: 'the session receipt', recompute: 'src/agent/receipt/seed.ts' }],
    postings: [
      { debit: 'agent/claim', credit: 'human/correction', amount: 6 },
      { debit: 'human/correction', credit: 'agent/claim', amount: 6 },
    ],
    edges: [
      { from: 'agent', to: 'human' },
      { from: 'human', to: 'agent' },
    ],
    quantities: [
      { name: 'corrections', value: 6, derivation: 'src/agent/receipt/seed.ts' },
      { name: 'lapses after acknowledgement', value: 13, derivation: 'src/agent/receipt/seed.ts' },
    ],
    keepers: [],
    seed: ['src/agent/receipt/seed.ts'],
  }

  it('is NOT sealed — balance refuses, because the session it reports was imbalanced', () => {
    const v = judge(change)
    // Eight of nine hold. The one that does not is `balance`, and it is correct to refuse:
    // delivered⊕rework is 425⊕165, a ratio of 0.388 — a dual driven far enough that the law fires.
    // Removing the axis would seal the atom and hide the very thing the receipt exists to publish.
    // An agent's own record is the last place to trade a true number for a green one.
    expect(v.sealed).toBe(false)
    expect(v.verdicts.filter((x) => !x.holds).map((x) => x.law)).toEqual(['balance'])
    const bal = v.verdicts.find((x) => x.law === 'balance')!
    // the law averages ACROSS axes: build⊕break is 1.0, delivered⊕rework is 165/425 = 0.388,
    // so the fraction is their mean — 0.694. (I asserted the single-axis figure; the law corrected
    // me, which is the third time in this atom alone and precisely its subject matter.)
    expect(bal.fraction).toBeCloseTo((1 + 165 / 425) / 2, 6)
    expect(bal.holds).toBe(false) // holds demands fraction === 1, and no dual may lean at all
    // every other law holds — the receipt is honest in all the ways it can be
    expect(v.verdicts.filter((x) => x.holds)).toHaveLength(8)
  })

  it('the imbalance is the FINDING, not a defect in the atom', () => {
    const v = judge(change)
    // the ratio IS the session's efficiency, arrived at by a second route
    expect(receiptOf(SESSION_2026_08_01).efficiency).toBeCloseTo(425 / 590, 6)
    expect(v.verdicts.find((x) => x.law === 'balance')!.reason).toMatch(/balance 0\.694 across 2 dual/)
  })
})
