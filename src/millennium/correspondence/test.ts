import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'
import { MILLENNIUM } from '@/millennium'

import {
  assertCorrespondenceClaim,
  CorrespondenceOverClaim,
  CORRESPONDENCES,
  HARDNESS_RESTS_ON,
  NO_CORRESPONDENCE,
  producedTheorems,
  securityBearing,
} from './index'

describe('millennium/correspondence — physics predicts; mathematics proves', () => {
  it('every row names a problem that is actually in the register', () => {
    const names = new Set(MILLENNIUM.map((p) => p.name))
    for (const c of CORRESPONDENCES) expect(names.has(c.problem)).toBe(true)
    for (const n of NO_CORRESPONDENCE) expect(names.has(n)).toBe(true)
    // and the two lists partition the seven — no problem is silently unanswered
    expect(new Set([...CORRESPONDENCES.map((c) => c.problem), ...NO_CORRESPONDENCE]).size).toBe(MILLENNIUM.length)
  })

  it('THE GAP IS NEVER EMPTY — a correspondence stated without it reads as a solution', () => {
    for (const c of CORRESPONDENCES) {
      expect(c.notProof.length).toBeGreaterThan(40)
      expect(c.establishes.length).toBeGreaterThan(20)
      expect(c.establishes).not.toBe(c.notProof)
    }
  })

  it('exactly ONE row is physics that produced a proved theorem — and it still does not settle its problem', () => {
    const proved = producedTheorems()
    expect(proved).toHaveLength(1)
    expect(proved[0]!.programme).toContain('mirror symmetry')
    expect(proved[0]!.problem).toBe('Hodge Conjecture')
    // the honest sting: the strongest instance of physics-produces-theorem leaves its own problem open
    expect(MILLENNIUM.find((p) => p.name === 'Hodge Conjecture')?.open).toBe(true)
    expect(proved[0]!.notProof).toContain('untouched')
  })

  it('NO row bears on cryptographic security — the empty set IS the answer', () => {
    expect(securityBearing()).toEqual([])
    expect(CORRESPONDENCES.every((c) => c.bearsOnSecurity === false)).toBe(true)
    // and the refusal names what hardness does rest on, so it is an answer rather than a shrug
    expect(HARDNESS_RESTS_ON.length).toBeGreaterThanOrEqual(4)
    expect(HARDNESS_RESTS_ON.join(' ')).toMatch(/module-LWE/)
  })

  it('a claim that a correspondence SOLVES its problem is refused', () => {
    expect(() => assertCorrespondenceClaim('AdS/CFT proves the Yang–Mills mass gap')).toThrow(CorrespondenceOverClaim)
    expect(() => assertCorrespondenceClaim('string theory solves Navier–Stokes')).toThrow(/predicts; it does not prove/)
    expect(() => assertCorrespondenceClaim('quantum computing settles P vs NP')).toThrow(CorrespondenceOverClaim)
  })

  it('a claim that any of it hardens cryptography is refused, by name', () => {
    expect(() => assertCorrespondenceClaim('use string theory to increase security')).toThrow(/module-LWE/)
    expect(() => assertCorrespondenceClaim('holographic duality makes the cipher unbreakable')).toThrow(CorrespondenceOverClaim)
    // including the seductive near-miss: packing theorems are real, and are not hardness results
    expect(() => assertCorrespondenceClaim('mirror symmetry hardens our crypto')).toThrow(/packing density is not a hardness result/)
  })

  it('the TRUE statements pass — the gate refuses claims, not the subject', () => {
    expect(() => assertCorrespondenceClaim('mirror symmetry predicted the quintic invariants')).not.toThrow()
    expect(() => assertCorrespondenceClaim('lattice gauge theory gives numerical evidence of a mass gap')).not.toThrow()
  })
})

describe('millennium/correspondence — judged by the constitution', () => {
  const change: Change = {
    atom: 'millennium/correspondence',
    dualities: [
      { builds: 'CORRESPONDENCES', breaks: 'every row carries the gap that remains' },
      { builds: 'producedTheorems', breaks: 'the one proved case still leaves its problem open' },
      { builds: 'assertCorrespondenceClaim', breaks: 'solves-it and hardens-crypto both throw' },
    ],
    anchors: ['ISO 80000-2'],
    claims: [
      {
        text: 'string theory bears on the Millennium Problems',
        boundary:
          'it does in one direction only — a duality can PREDICT a statement that mathematics then ' +
          'proves, and mirror symmetry is the real instance (Candelas et al. 1991, proved by ' +
          'Givental 1996 and Lian–Liu–Yau 1997). It settles no Millennium Problem, including the ' +
          'one it touches, and it bears on cryptographic security not at all: hardness rests on ' +
          'module-LWE, factoring, discrete logs and hash preimage resistance, and no result here ' +
          'constrains any of them',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'establishes⊕notProof', ring: [5, 5] },
    ],
    served: [{ result: 'the correspondence register', recompute: 'src/millennium/correspondence/index.ts' }],
    postings: [
      { debit: 'programme/claimed', credit: 'programme/bounded', amount: 5 },
      { debit: 'programme/bounded', credit: 'programme/claimed', amount: 5 },
    ],
    edges: [
      { from: 'correspondence', to: 'millennium' },
      { from: 'millennium', to: 'correspondence' },
    ],
    quantities: [
      { name: 'correspondences registered', value: 5, derivation: 'src/millennium/correspondence/index.ts' },
      { name: 'rows bearing on security', value: 0, derivation: 'src/millennium/correspondence/index.ts' },
    ],
    keepers: [],
    seed: ['src/millennium/correspondence/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})
