import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'

import {
  assertNoSweeps,
  isMassEdit,
  manifestCovers,
  sweepViolation,
  sweeps,
  SWEEP_THRESHOLD,
  type Changeset,
} from './index'

const files = (n: number): string[] => Array.from({ length: n }, (_, i) => `src/a${i}/index.ts`)
const reasoned = (n: number): Changeset => ({ files: files(n), reasons: files(n).map((f) => `why ${f} is cut`) })
const blind = (n: number): Changeset => ({ files: files(n), reasons: [] })

describe('rules/manifest — a mass edit without a manifest is a sweep', () => {
  it('a small changeset is never a sweep — the axis is about WIDTH, not about editing', () => {
    for (let n = 1; n < SWEEP_THRESHOLD; n++) {
      expect(isMassEdit(blind(n))).toBe(false)
      expect(sweepViolation(blind(n))).toBeUndefined()
    }
    expect(isMassEdit(blind(SWEEP_THRESHOLD))).toBe(true)
  })

  it('at the threshold, only a covering manifest clears it', () => {
    const n = SWEEP_THRESHOLD
    expect(sweepViolation(blind(n))).toBeDefined()
    expect(sweepViolation(reasoned(n))).toBeUndefined()
    expect(manifestCovers(reasoned(n))).toBe(true)
    expect(manifestCovers(blind(n))).toBe(false)
  })

  it('an EMPTY reason is not a reason — the scalpel’s own refusal, restated', () => {
    const hollow: Changeset = { files: files(10), reasons: Array.from({ length: 10 }, () => '   ') }
    expect(manifestCovers(hollow)).toBe(false)
    expect(sweepViolation(hollow)!.reasons).toBe(0)
    // and a partial manifest does not cover a wider changeset
    expect(manifestCovers({ files: files(10), reasons: ['one good reason'] })).toBe(false)
  })

  it('the violation names the real numbers, so a reviewer sees the gap', () => {
    const v = sweepViolation({ files: files(3184), reasons: [] })!
    expect(v.files).toBe(3184) // the SKILL.md corruption this session actually produced
    expect(v.reasons).toBe(0)
    expect(v.law).toBe('manifest')
    expect(v.reason).toMatch(/3184 files touched with 0 reasoned cut/)
  })

  it('assertNoSweeps fails CLOSED on getting worse, and passes at the ceiling', () => {
    const bad = [blind(50), blind(9), reasoned(20)]
    expect(sweeps(bad)).toHaveLength(2)
    expect(() => assertNoSweeps(bad, 1)).toThrow(/2 sweep\(s\) > ceiling 1/)
    expect(() => assertNoSweeps(bad, 2)).not.toThrow()
    expect(() => assertNoSweeps([reasoned(100)], 0)).not.toThrow() // a planned mass edit is fine at zero
  })
})

describe('rules/manifest — judged by the constitution', () => {
  const change: Change = {
    atom: 'rules/manifest',
    dualities: [
      { builds: 'sweepViolation', breaks: 'a blind 3184-file changeset is caught, with its numbers' },
      { builds: 'manifestCovers', breaks: 'empty and partial manifests both refuse to cover' },
      { builds: 'assertNoSweeps', breaks: 'fails closed above the ceiling' },
    ],
    anchors: ['ISO/IEC 25010:2023 §5.6', 'ISO-19011:2018 §6.4'],
    claims: [
      {
        text: 'a manifest makes a blind sweep impossible',
        boundary:
          'it proves a mass edit was planned and reasoned, never that the plan was wise; and it reads ' +
          'a changeset, so bytes written outside the repo tooling are invisible until they land',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'width⊕reason', ring: [1, 1] },
    ],
    served: [{ result: 'the sweep count', recompute: 'src/rules/manifest/index.ts' }],
    postings: [
      { debit: 'edit/blind', credit: 'edit/reasoned', amount: 1 },
      { debit: 'edit/reasoned', credit: 'edit/blind', amount: 1 },
    ],
    edges: [
      { from: 'rules', to: 'scalpel' },
      { from: 'scalpel', to: 'rules' },
    ],
    quantities: [{ name: 'sweep threshold', value: SWEEP_THRESHOLD, derivation: 'src/rules/manifest/index.ts' }],
    keepers: [],
    seed: ['src/rules/manifest/index.ts'],
  }

  it('is SEALED — the gate that would have prevented this session’s cracks', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})
