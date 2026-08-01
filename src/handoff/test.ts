import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'

import { assertHandoffMet, check, checkSpec, checkSpecs, render, type Requirement } from './index'
import { HANDOFF_DEVIATIONS, HANDOFF_SPEC } from './seed'

const cwd = process.cwd()

describe('handoff — the specification, computed against the tree', () => {
  it('every requirement cites a line in the real document', () => {
    for (const r of HANDOFF_SPEC.requirements) {
      expect(r.line).toBeGreaterThan(0)
      expect(r.line).toBeLessThanOrEqual(93) // the document is 93 lines
      expect(r.asks.length).toBeGreaterThan(10)
    }
    expect(HANDOFF_SPEC.requirements.length).toBeGreaterThanOrEqual(30)
  })

  it('a missing atom is reported by WHAT is missing, never as a bare false', () => {
    const absent: Requirement = { id: 'x', line: 1, asks: 'an atom nobody built', satisfiedBy: { kind: 'atom', path: 'no/such/atom' } }
    const v = check(absent, cwd)
    expect(v.met).toBe(false)
    expect(v.evidence).toMatch(/missing SKILL\.md · index\.ts · test\.ts/)
  })

  it('symbols are PARSED, not matched — a name in a comment does not satisfy anything', () => {
    // `noExpectation` is bound in the constitution, so it is met
    expect(check({ id: 'a', line: 35, asks: 'the rule', satisfiedBy: { kind: 'symbol', file: 'src/constitution/index.ts', name: 'noExpectation' } }, cwd).met).toBe(true)
    // this atom's OWN doc comment says "noExpectation" repeatedly and binds nothing of the sort
    const v = check({ id: 'b', line: 35, asks: 'the rule', satisfiedBy: { kind: 'symbol', file: 'src/handoff/index.ts', name: 'noExpectation' } }, cwd)
    expect(v.met).toBe(false)
    expect(v.evidence).toMatch(/does not bind noExpectation/)
  })

  it('an env key must be in EVERY file that has to declare it', () => {
    const both = check({ id: 'c', line: 75, asks: 'the token', satisfiedBy: { kind: 'env', key: 'TRELLO_TOKEN', files: ['.env.example', 'erpax-env.d.ts'] } }, cwd)
    expect(both.met).toBe(true)
    const one = check({ id: 'd', line: 75, asks: 'invented', satisfiedBy: { kind: 'env', key: 'NOT_A_REAL_KEY_XYZ', files: ['.env.example'] } }, cwd)
    expect(one.met).toBe(false)
    expect(one.evidence).toMatch(/absent from \.env\.example/)
  })

  it('THE MEASUREMENT: the handoff, checked against the live tree', () => {
    const v = checkSpec(HANDOFF_SPEC, cwd)
    // this is the number the document's own success measure is about — computed, not asserted
    expect(v.total).toBe(HANDOFF_SPEC.requirements.length)
    expect(v.met + v.unmet.length).toBe(v.total)
    expect(v.coverage).toBeCloseTo(v.met / v.total, 10)
    // every unmet one names what is missing, so the report IS the work list
    for (const u of v.unmet) expect(u.evidence.length).toBeGreaterThan(10)
    // the ratchet: the specification may not become less implemented than it is right now
    assertHandoffMet(v, v.unmet.length)
    expect(() => assertHandoffMet(v, v.unmet.length - 1)).toThrow(/unmet requirement/)
  })

  it('deviations are RECORDED — "implemented" never quietly means "implemented differently"', () => {
    expect(HANDOFF_DEVIATIONS).toHaveLength(2)
    for (const d of HANDOFF_DEVIATIONS) {
      expect(d.specified).toMatch(/\.ts$/) // the document's literal spelling
      expect(d.built).toMatch(/\{index,test,SKILL\}/) // what the folder law required instead
      expect(d.because).toMatch(/law\/folder/)
    }
    expect(render(checkSpec(HANDOFF_SPEC, cwd))).toMatch(/recorded deviation\(s\) — built differently, on purpose/)
  })

  it('any prompt is a spec — the same shape checks a chat directive', () => {
    const spoken = {
      id: 'chat-directive',
      source: 'chat:2026-08-01',
      requirements: [
        { id: 'local-first', line: 1, asks: 'prioritise local over remote', satisfiedBy: { kind: 'atom', path: 'local' } },
        { id: 'measure-models', line: 2, asks: 'benchmarks with and without erpax loaded', satisfiedBy: { kind: 'atom', path: 'agent/benchmark' } },
        { id: 'harness-agnostic', line: 3, asks: 'any other coding harness follows the same self-evaluation', satisfiedBy: { kind: 'text', file: 'src/agent/receipt/index.ts', needle: 'harness' } },
      ],
      deviations: [],
    } as const
    const [handoff, chat] = checkSpecs([HANDOFF_SPEC, spoken], cwd)
    expect(handoff!.spec).toBe('erpax-development-handoff')
    // a spoken directive is checked exactly like a written document — that is the generalisation
    expect(chat!.spec).toBe('chat-directive')
    expect(chat!.unmet).toEqual([])
    expect(chat!.coverage).toBe(1)
  })

  it('an empty spec has coverage 0, not a free 1 — nothing required is nothing proven', () => {
    const v = checkSpec({ id: 'empty', source: 'nowhere', requirements: [], deviations: [] }, cwd)
    expect(v.coverage).toBe(0)
    expect(v.total).toBe(0)
  })
})

describe('handoff — judged by the constitution', () => {
  const v = checkSpec(HANDOFF_SPEC, cwd)
  const change: Change = {
    atom: 'handoff',
    dualities: [
      { builds: 'check', breaks: 'a missing atom, symbol or key fails with what is absent' },
      { builds: 'checkSpec', breaks: 'an empty spec scores 0, not a free 1' },
      { builds: 'assertHandoffMet', breaks: 'fails closed above the ceiling' },
    ],
    anchors: ['ISO-19011:2018 §6.4', 'ISO/IEC 25010:2023 §5.5'],
    claims: [
      {
        text: 'this proves the handoff is implemented',
        boundary:
          'it proves each transcribed requirement is SATISFIED BY THE TREE — never that the ' +
          'transcription is complete (a human read the prose, and a line nobody transcribed is ' +
          'invisible here), and never that the code behaves as the document intended: a text needle ' +
          'proves a name is present, not that it works',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'computed⊕checkable', ring: [1, 1] },
    ],
    served: [{ result: 'the unmet list', recompute: 'src/handoff/index.ts' }],
    postings: [
      { debit: 'spec/requirement', credit: 'tree/evidence', amount: v.total },
      { debit: 'tree/evidence', credit: 'spec/requirement', amount: v.total },
    ],
    edges: [
      { from: 'handoff', to: 'constitution' },
      { from: 'constitution', to: 'handoff' },
    ],
    quantities: [
      { name: 'requirements transcribed', value: v.total, derivation: 'src/handoff/seed.ts' },
      { name: 'recorded deviations', value: HANDOFF_DEVIATIONS.length, derivation: 'src/handoff/seed.ts' },
    ],
    keepers: [],
    seed: ['src/handoff/seed.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const verdict = judge(change)
    expect(verdict.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(verdict.sealed).toBe(true)
  })
})
