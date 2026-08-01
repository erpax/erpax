import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'

import {
  classify,
  integrity,
  manifest,
  UndeclaredSurface,
  verdictHolds,
  type Claim,
  type Evidence,
  type MeasureRun,
} from './index'

const VERDICT: Claim = { property: 'root-signing', measuredBy: 'src/anchor/test.ts' }
const COMPASS: Claim = { property: 'fn-dsa', closedBy: 'FIPS 206 final + KATs', owner: 'security' }

/** A run that reports real evidence — what it touched and what would break it. */
const realRun: MeasureRun = (m) =>
  m === 'src/anchor/test.ts'
    ? { exercised: 'signed a root, flipped one byte', wouldFailIf: 'verification accepted the mutated byte', passed: true }
    : undefined

describe('convention/discern — a claim is a verdict or a compass, and nothing else', () => {
  it('classifies by SHAPE, never by a label the author supplies', () => {
    expect(classify(VERDICT)).toBe('verdict')
    expect(classify(COMPASS)).toBe('compass')
  })

  it('a claim that is NEITHER throws — it asserts what nothing can contradict', () => {
    expect(() => classify({ property: 'quantum-safe' } as Claim)).toThrow(/neither a verdict nor a compass/)
  })

  it('a verdict wearing a hedge is REFUSED, not resolved', () => {
    // both measuredBy and closedBy means the author has not decided whether it is proven
    expect(() =>
      classify({ property: 'x', measuredBy: 't', closedBy: 'later', owner: 'me' } as unknown as Claim),
    ).toThrow(/verdict wearing a hedge/)
  })

  it('a compass without an owner is a WISH', () => {
    expect(() => classify({ property: 'hqc', closedBy: 'HQC final standard' } as Claim)).toThrow(/nobody owns/)
  })

  it('a verdict naming a test that does not exist FAILS — a name is not a measurement', () => {
    const v = verdictHolds({ property: 'p', measuredBy: 'nowhere.ts' }, realRun)
    expect(v.holds).toBe(false)
    expect(v.reason).toMatch(/does not exist/)
  })

  it('THE SUBTLE ONE: a test that returns no evidence is a tautology under a heading', () => {
    // `expect(true).toBe(true)` under a security heading passes, and proves nothing. A run that
    // cannot say what it exercised, or what would break it, is exactly that.
    const tautology: MeasureRun = () => ({ exercised: '', wouldFailIf: '', passed: true } as Evidence)
    const v = verdictHolds(VERDICT, tautology)
    expect(v.holds).toBe(false)
    expect(v.reason).toMatch(/tautology under a heading/)
  })

  it('a verdict that ran, exercised the property and passed HOLDS — with its breaker named', () => {
    const v = verdictHolds(VERDICT, realRun)
    expect(v.holds).toBe(true)
    expect(v.reason).toMatch(/breaks if verification accepted the mutated byte/)
  })

  it('a compass never holds as a verdict — a direction is not a proof', () => {
    expect(verdictHolds(COMPASS, realRun).holds).toBe(false)
  })

  it('manifest partitions an atom, and an UNDECLARED surface throws', () => {
    const m = manifest('anchor', [VERDICT, COMPASS], ['root-signing', 'fn-dsa'])
    expect(m.verdicts.map((v) => v.property)).toEqual(['root-signing'])
    expect(m.compasses.map((c) => c.property)).toEqual(['fn-dsa'])

    // a surface with no claim is not "assumed safe" — it is undeclared
    expect(() => manifest('anchor', [VERDICT], ['root-signing', 'channel-keying'])).toThrow(UndeclaredSurface)
    expect(() => manifest('anchor', [VERDICT], ['root-signing', 'channel-keying'])).toThrow(/Silence is not a claim of safety/)
  })

  it('INTEGRITY is passing verdicts over TOTAL claims — a compass dilutes it, as it should', () => {
    const m = manifest('anchor', [VERDICT, COMPASS], ['root-signing', 'fn-dsa'])
    expect(integrity([m], realRun)).toBeCloseTo(0.5, 10) // 1 passing verdict of 2 claims
    // closing the compass into a tested verdict is the ONLY thing that raises it
    const closed = manifest('anchor', [VERDICT, { property: 'fn-dsa', measuredBy: 'src/anchor/test.ts' }], ['root-signing', 'fn-dsa'])
    expect(integrity([closed], realRun)).toBe(1)
  })

  it('an atom with NO claims scores 0, never 1 — nothing declared is nothing proven', () => {
    expect(integrity([manifest('empty', [], [])], realRun)).toBe(0)
  })
})

describe('convention/discern — judged by the constitution', () => {
  const change: Change = {
    atom: 'convention/discern',
    dualities: [
      { builds: 'classify', breaks: 'a claim that is neither, and a verdict wearing a hedge, both throw' },
      { builds: 'verdictHolds', breaks: 'an absent test, and a run with no evidence, both fail' },
      { builds: 'manifest', breaks: 'an undeclared surface throws' },
    ],
    anchors: ['ISO/IEC 25010:2023 §5.5', 'ISO-19011:2018 §6.4'],
    claims: [
      {
        text: 'this makes a security claim provable',
        boundary:
          'it makes a claim DECLARED and its measurement CHECKABLE — never that the property is ' +
          'true. A verdict proves its test exercised something and would break under a named ' +
          'mutation; whether that mutation is the one an attacker would make is a human judgement ' +
          'this cannot reach',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'verdict⊕compass', ring: [1, 1] },
    ],
    served: [{ result: 'the integrity ratio', recompute: 'src/convention/discern/index.ts' }],
    postings: [
      { debit: 'claim/asserted', credit: 'claim/measured', amount: 2 },
      { debit: 'claim/measured', credit: 'claim/asserted', amount: 2 },
    ],
    edges: [
      { from: 'discern', to: 'constitution' },
      { from: 'constitution', to: 'discern' },
    ],
    quantities: [{ name: 'claim kinds', value: 2, derivation: 'src/convention/discern/index.ts' }],
    keepers: [],
    seed: ['src/convention/discern/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})
