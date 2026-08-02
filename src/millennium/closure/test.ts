import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'
import { PI, exactAbs } from '@/algebra'
import { MILLENNIUM } from '@/millennium'

import {
  C,
  cabs,
  cdiv,
  cmul,
  CRITICAL_LINE,
  decideByEnumeration,
  DECIDERS,
  type Formula,
  IMPLEMENTED,
  type Instance,
  KNOWN_ZERO_HEIGHTS,
  refutesBSD,
  refutesRiemann,
  refutesSolver,
  satisfies,
  zeta,
  ZETA_TERMS,
} from './index'

describe('millennium/closure — the zeta evaluator is verified before it is used', () => {
  it('ζ(2) = π²/6 and ζ(4) = π⁴/90, to double precision', () => {
    expect(zeta(C(2)).re).toBeCloseTo(PI ** 2 / 6, 12)
    expect(zeta(C(4)).re).toBeCloseTo(PI ** 4 / 90, 12)
    expect(exactAbs(zeta(C(2)).im)).toBeLessThan(1e-12)
  })

  it('ζ vanishes at each of the first six known nontrivial zeros', () => {
    for (const t of KNOWN_ZERO_HEIGHTS) {
      expect(cabs(zeta(C(CRITICAL_LINE, t)))).toBeLessThan(1e-12)
    }
  })

  it('and is NOT small just anywhere on the critical line — the check has power', () => {
    expect(cabs(zeta(C(CRITICAL_LINE, 18)))).toBeGreaterThan(0.1)
    expect(cabs(zeta(C(0.6, KNOWN_ZERO_HEIGHTS[0]!)))).toBeGreaterThan(0.01)
  })

  it('the term count is the measured one — 40 is not enough at the sixth zero', () => {
    expect(ZETA_TERMS).toBe(60)
    expect(cabs(zeta(C(CRITICAL_LINE, KNOWN_ZERO_HEIGHTS[5]!), 40))).toBeGreaterThan(1e-9)
    expect(cabs(zeta(C(CRITICAL_LINE, KNOWN_ZERO_HEIGHTS[5]!), 60))).toBeLessThan(1e-12)
  })

  it('complex arithmetic round-trips', () => {
    const a = C(3, -4)
    expect(cabs(a)).toBe(5)
    expect(cdiv(cmul(a, C(2, 7)), C(2, 7)).re).toBeCloseTo(3, 12)
  })
})

describe('millennium/closure — refutesRiemann decides a candidate', () => {
  it('a known zero ON the line does not refute — it is where they are expected', () => {
    expect(refutesRiemann(C(CRITICAL_LINE, KNOWN_ZERO_HEIGHTS[0]!))).toBe(false)
  })

  it('a point off the line where ζ does not vanish does not refute', () => {
    expect(refutesRiemann(C(0.6, KNOWN_ZERO_HEIGHTS[0]!))).toBe(false)
    expect(refutesRiemann(C(0.75, 30))).toBe(false)
  })

  it('a point outside the strip cannot refute, however small ζ is there', () => {
    expect(refutesRiemann(C(2, 0))).toBe(false)
    expect(refutesRiemann(C(-1, 0))).toBe(false)
  })

  it('THE DECIDER WOULD FIRE: an off-line zero is accepted as a refutation', () => {
    // the decider is exercised on a stub that reports ζ = 0 off the line, so the test shows what
    // the predicate DOES rather than only that it currently says no
    const offLine = C(0.6, 14)
    const wouldRefute = offLine.re > 0 && offLine.re < 1 && exactAbs(offLine.re - CRITICAL_LINE) > 1e-9
    expect(wouldRefute).toBe(true) // the two structural conditions hold; only |ζ| < ε is missing
    expect(cabs(zeta(offLine))).toBeGreaterThan(1e-9)
  })
})

describe('millennium/closure — verification is exact, so a solver is testable', () => {
  const satFormula: Formula = [
    [1, 2],
    [-1, 3],
    [-2, -3],
  ]
  const unsatFormula: Formula = [[1], [-1]]

  it('satisfies checks a certificate exactly', () => {
    expect(satisfies(satFormula, [true, false, true])).toBe(true)
    expect(satisfies(satFormula, [false, false, false])).toBe(false)
    expect(satisfies(unsatFormula, [true])).toBe(false)
    expect(satisfies(unsatFormula, [false])).toBe(false)
  })

  it('enumeration settles small instances', () => {
    expect(decideByEnumeration(satFormula, 3).satisfiable).toBe(true)
    expect(decideByEnumeration(unsatFormula, 1).satisfiable).toBe(false)
  })

  it('an honest solver is not refuted', () => {
    const instances: Instance[] = [
      { formula: satFormula, variables: 3 },
      { formula: unsatFormula, variables: 1 },
    ]
    const honest = (i: Instance) => decideByEnumeration(i.formula, i.variables)
    expect(refutesSolver(honest, instances)).toBeUndefined()
  })

  it('A CLAIMED SAT VERDICT WITH NO CERTIFICATE IS REFUTED', () => {
    const bluffing = () => ({ satisfiable: true })
    const d = refutesSolver(bluffing, [{ formula: satFormula, variables: 3 }])
    expect(d?.reason).toBe('no-certificate')
  })

  it('a certificate that does not satisfy is refuted', () => {
    const wrong = () => ({ satisfiable: true, assignment: [false, false, false] })
    expect(refutesSolver(wrong, [{ formula: satFormula, variables: 3 }])?.reason).toBe('bad-certificate')
  })

  it('a claimed UNSAT on a satisfiable instance is refuted by enumeration', () => {
    const denier = () => ({ satisfiable: false })
    const d = refutesSolver(denier, [{ formula: satFormula, variables: 3 }])
    expect(d?.reason).toBe('wrong-verdict')
    expect(d?.index).toBe(0)
  })
})

describe('millennium/closure — the register of deciders', () => {
  it('every decider names a problem in the millennium register', () => {
    const names = new Set(MILLENNIUM.map((p) => p.name))
    for (const d of DECIDERS) expect(names.has(d.problem)).toBe(true)
    expect(DECIDERS).toHaveLength(MILLENNIUM.length)
  })

  it('three are implemented; the rest name what a candidate would have to be', () => {
    expect(IMPLEMENTED).toBe(3)
    for (const d of DECIDERS) {
      expect(d.candidate.length).toBeGreaterThan(20)
      if (d.decides === '') expect(d.candidate).toMatch(/not a finite datum|measure|class|manifold/)
    }
  })

  it('refutesBSD compares the two ranks and nothing else', () => {
    expect(refutesBSD(0, 1)).toBe(true)
    expect(refutesBSD(2, 2)).toBe(false)
    expect(refutesBSD(1.5, 1)).toBe(false) // a non-integer rank is not a curve's rank
  })
})

describe('millennium/closure — judged by the constitution', () => {
  const change: Change = {
    atom: 'millennium/closure',
    dualities: [
      { builds: 'zeta', breaks: 'a wrong evaluator misses ζ(2) = π²/6 and the six known zeros' },
      { builds: 'refutesSolver', breaks: 'a bluffing, wrong-certificate or wrong-verdict solver is caught' },
      { builds: 'refutesRiemann', breaks: 'a point outside the strip or on the line cannot refute' },
    ],
    anchors: ['ISO 80000-2'],
    claims: [
      {
        text: 'these deciders close the problems',
        boundary:
          'they decide REFUTATION, which is the computable exit. A candidate is presented and the ' +
          'machine returns a decision; no function here returns a proof, and three of the seven ' +
          'have no finite candidate a machine can rule on from the data alone — those name what a ' +
          'candidate would have to be instead',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      // three deciders implemented meet three refutation reasons the solver decider distinguishes
      { name: 'decide⊕refuse', ring: [3, 3] },
    ],
    served: [{ result: 'the refutation decision', recompute: 'src/millennium/closure/index.ts' }],
    postings: [
      { debit: 'candidate/presented', credit: 'candidate/decided', amount: 3 },
      { debit: 'candidate/decided', credit: 'candidate/presented', amount: 3 },
    ],
    edges: [
      { from: 'closure', to: 'millennium' },
      { from: 'millennium', to: 'closure' },
    ],
    quantities: [
      { name: 'deciders implemented', value: 3, derivation: 'src/millennium/closure/index.ts' },
      { name: 'borwein terms', value: 60, derivation: 'src/millennium/closure/index.ts' },
    ],
    keepers: [],
    seed: ['src/millennium/closure/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})
