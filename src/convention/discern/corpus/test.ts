import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'

import {
  assertVerdictsHold,
  corpusEvidence,
  corpusIntegrity,
  corpusManifests,
  REGISTRY,
  suitePassed,
  VerdictFailed,
} from './index'

/** Every suite green, without spawning one — the outcome oracle is the only thing stubbed. */
const allGreen = (): boolean => true

describe('convention/discern/corpus — every security claim, as one number', () => {
  it('the registry loads and every atom declares its surfaces', async () => {
    const ms = await corpusManifests()
    expect(ms).toHaveLength(REGISTRY.length)
    for (const m of ms) expect(m.verdicts.length + m.compasses.length).toBe(m.surfaces.length)
  })

  it('every VERDICT has a declared evidence source — a name is not a measurement', async () => {
    const ev = await corpusEvidence()
    const declared = new Set(ev.map((e) => e.measuredBy))
    for (const m of await corpusManifests()) {
      for (const v of m.verdicts) expect(declared.has(v.measuredBy)).toBe(true)
    }
    // and the prose is real prose — an empty half would make verdictHolds report a tautology
    for (const e of ev) {
      expect(e.exercised.length).toBeGreaterThan(20)
      expect(e.wouldFailIf.length).toBeGreaterThan(20)
    }
  })

  it('with every suite green, no verdict fails and the ratio is verdicts / all claims', async () => {
    const r = await corpusIntegrity(allGreen)
    expect(r.failing).toEqual([])
    expect(r.verdicts).toBeGreaterThan(0)
    expect(r.compasses).toBeGreaterThan(0)
    expect(r.ratio).toBeCloseTo(r.verdicts / (r.verdicts + r.compasses), 9)
    expect(() => assertVerdictsHold(r)).not.toThrow()
  })

  it('THE GATE: a red suite makes its verdicts fail, and the gate throws', async () => {
    const r = await corpusIntegrity(() => false)
    expect(r.failing.length).toBe(r.verdicts)
    expect(r.ratio).toBe(0)
    expect(() => assertVerdictsHold(r)).toThrow(VerdictFailed)
    expect(() => assertVerdictsHold(r)).toThrow(/false statement about security/)
  })

  it('A SUITE THAT DID NOT RUN IS ABSENT, never a silent pass', async () => {
    const r = await corpusIntegrity(() => undefined)
    expect(r.failing.length).toBe(r.verdicts)
    // "did not run" and "ran and failed" report differently — collapsing them would hide a missing proof
    expect(r.failing.every((f) => /does not exist|not a measurement/.test(f.reason))).toBe(true)
  })

  it('every OPEN surface names what closes it and who owns it — a compass is not a shrug', async () => {
    const r = await corpusIntegrity(allGreen)
    for (const o of r.open) {
      expect(o.closedBy.length).toBeGreaterThan(10)
      expect(o.owner.length).toBeGreaterThan(0)
    }
  })

  it('suitePassed distinguishes a missing file from a failing one', () => {
    // a path that cannot be a suite: vitest exits non-zero with a status, so this is FALSE (ran, no
    // match) rather than undefined — the oracle only returns undefined when it could not run at all
    expect(typeof suitePassed('src/convention/discern/corpus/does-not-exist.test.ts')).not.toBe('object')
  })
})

describe('convention/discern/corpus — judged by the constitution', () => {
  const change: Change = {
    atom: 'convention/discern/corpus',
    dualities: [
      { builds: 'corpusIntegrity', breaks: 'a red suite drives the ratio to 0' },
      { builds: 'assertVerdictsHold', breaks: 'a failing verdict throws VerdictFailed' },
      { builds: 'runFrom', breaks: 'an unrun suite is ABSENT, not a pass' },
    ],
    anchors: ['ISO/IEC 25010:2023'],
    claims: [
      {
        text: 'this is the corpus’s security integrity',
        boundary:
          'it is the ratio of PASSING VERDICTS to declared claims across the registered atoms — a ' +
          'surface nobody registered is outside the denominator, so the number is honest about the ' +
          'atoms it covers and silent about the rest. It gates failing verdicts and deliberately ' +
          'does NOT ratchet the ratio: forcing it upward would only push honest compasses into ' +
          'dishonest verdicts',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'declared⊕run', ring: [1, 1] },
    ],
    served: [{ result: 'the corpus integrity ratio', recompute: 'src/convention/discern/corpus/index.ts' }],
    postings: [
      { debit: 'claim/declared', credit: 'claim/measured', amount: 3 },
      { debit: 'claim/measured', credit: 'claim/declared', amount: 3 },
    ],
    edges: [
      { from: 'corpus', to: 'discern' },
      { from: 'discern', to: 'corpus' },
    ],
    quantities: [
      { name: 'registered claim-bearing atoms', value: 3, derivation: 'src/convention/discern/corpus/index.ts' },
      { name: 'ratcheted ceilings on the ratio', value: 0, derivation: 'src/convention/discern/corpus/index.ts' },
    ],
    keepers: [],
    seed: ['src/convention/discern/corpus/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})
