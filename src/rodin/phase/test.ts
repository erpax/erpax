import { describe, expect, it } from 'vitest'

import { judge, type Change } from '@/constitution'
import { PI } from '@/algebra'

import {
  assertPhaseClaim,
  cartesian,
  type Eisenstein,
  hexagonRatio,
  KISSING_NUMBER,
  multiply,
  norm,
  PhaseOverClaim,
  REFUTED,
  rotate,
  rotate60,
  TURN_ORDER,
  units,
} from './index'

const ONE: Eisenstein = { a: 1, b: 0 }
const OMEGA: Eisenstein = { a: 0, b: 1 }

describe('rodin/phase — the 60° turn closes over ℤ[ω]', () => {
  it('ω² = ω − 1 — the single substitution the whole ring rests on', () => {
    expect(multiply(OMEGA, OMEGA)).toEqual({ a: -1, b: 1 })
  })

  it('CLOSURE: products of lattice points are lattice points — integers in, integers out', () => {
    for (let a = -6; a <= 6; a += 1) {
      for (let b = -6; b <= 6; b += 1) {
        const p = multiply({ a, b }, { a: b - 3, b: a + 2 })
        expect(Number.isInteger(p.a)).toBe(true)
        expect(Number.isInteger(p.b)).toBe(true)
      }
    }
  })

  it('the 60° turn is multiplication by ω, and has order exactly 6', () => {
    expect(rotate60(ONE)).toEqual(OMEGA)
    expect(rotate(ONE, TURN_ORDER)).toEqual(ONE) // ω⁶ = 1
    for (let n = 1; n < TURN_ORDER; n += 1) expect(rotate(ONE, n)).not.toEqual(ONE)
  })

  it('the norm is an INTEGER at every lattice point — the precise form of "no decimals"', () => {
    for (let a = -8; a <= 8; a += 1) {
      for (let b = -8; b <= 8; b += 1) {
        const n = norm({ a, b })
        expect(Number.isInteger(n)).toBe(true)
        expect(n).toBeGreaterThanOrEqual(0)
        expect(n).toBe(a * a + a * b + b * b)
      }
    }
  })

  it('THE KISSING NUMBER IS COMPUTED, not quoted: exactly 6 points at norm 1', () => {
    const u = units()
    expect(u).toHaveLength(KISSING_NUMBER)
    // and they are the six turns of 1 — the unit group is cyclic of order 6
    const orbit = [0, 1, 2, 3, 4, 5].map((n) => rotate(ONE, n))
    for (const o of orbit) expect(u).toContainEqual(o)
    // rotation preserves the norm, which is why the orbit IS the unit circle of the lattice
    for (const o of orbit) expect(norm(o)).toBe(1)
  })
})

describe('rodin/phase — what the turn does NOT do', () => {
  it('THE BASIS IS THE WHOLE CLAIM: exact in ω, irrational in Cartesian', () => {
    const turned = rotate60(ONE) // exact: {a:0, b:1}
    expect(Number.isInteger(turned.a) && Number.isInteger(turned.b)).toBe(true)
    const { x, y } = cartesian(turned) // the same point, Cartesian: (1/2, √3/2)
    expect(x).toBe(0.5)
    expect(y * y).toBeCloseTo(0.75, 12) // y = √3/2
    // √3 is irrational (Euclid): no integers p, q with p² = 3q² except 0. A bounded search is
    // EVIDENCE, never the proof — the proof is cited, and this only shows the search finds nothing.
    let witness: [number, number] | undefined
    for (let q = 1; q <= 2000 && !witness; q += 1) {
      for (let p = 1; p <= 3500; p += 1) if (p * p === 3 * q * q) witness = [p, q]
    }
    expect(witness).toBeUndefined()
  })

  it('π does NOT become 3 — but the HEXAGON’s ratio is exactly 3, with no limit taken', () => {
    const h = hexagonRatio()
    expect(h.perimeter / h.diameter).toBe(3)
    expect(h.ratio).toBe(3)
    expect(PI).not.toBe(3) // transcendental (Lindemann 1882) — it is no rational at all
    // the true statement is smaller than the claim, and exact: 6r / 2r
    expect(h.perimeter).toBe(6)
    expect(h.diameter).toBe(2)
  })

  it('the declared over-claims are REFUSED, each with the theorem that refutes it', () => {
    expect(() => assertPhaseClaim('after the switch π measures exactly 3')).toThrow(PhaseOverClaim)
    expect(() => assertPhaseClaim('rotating by 60° eliminates decimals')).toThrow(/basis-dependent/)
    expect(() => assertPhaseClaim('entropy falls to zero and time becomes symmetric')).toThrow(/Landauer/)
    expect(REFUTED.every((r) => r.refutedBy.length > 20)).toBe(true)
  })

  it('the TRUE statements are not refused — the gate names claims, not vocabulary', () => {
    expect(() => assertPhaseClaim('the hexagon perimeter-to-diameter ratio is exactly 3')).not.toThrow()
    expect(() => assertPhaseClaim('the 60° turn closes over the Eisenstein integers')).not.toThrow()
  })
})

describe('rodin/phase — judged by the constitution', () => {
  const change: Change = {
    atom: 'rodin/phase',
    dualities: [
      { builds: 'rotate60', breaks: 'a 7th turn is not the identity; only the 6th is' },
      { builds: 'units', breaks: 'a 7th unit does not exist — the count is computed, not quoted' },
      { builds: 'assertPhaseClaim', breaks: 'π = 3, no-decimals and zero-entropy all throw' },
    ],
    anchors: ['ISO 80000-2'],
    claims: [
      {
        text: 'the 60° turn gives exact integer arithmetic',
        boundary:
          'it does — in the ω-basis of ℤ[ω], where closure, order 6 and the kissing number are ' +
          'computed here. In the Cartesian basis the SAME turn yields √3/2, so the claim is ' +
          'basis-dependent and states nothing without its basis. π stays transcendental; the exact ' +
          '3 belongs to the inscribed hexagon, and a reversible change of basis destroys no entropy',
      },
    ],
    axes: [
      { name: 'build⊕break', ring: [3, 3] },
      { name: 'exact⊕irrational', ring: [1, 1] },
    ],
    served: [{ result: 'the kissing number and the hexagon ratio', recompute: 'src/rodin/phase/index.ts' }],
    postings: [
      { debit: 'claim/asserted', credit: 'claim/proven', amount: 4 },
      { debit: 'claim/proven', credit: 'claim/asserted', amount: 4 },
    ],
    edges: [
      { from: 'phase', to: 'rodin' },
      { from: 'rodin', to: 'phase' },
    ],
    quantities: [
      { name: 'kissing number', value: 6, derivation: 'src/rodin/phase/index.ts' },
      { name: 'rotation order', value: 6, derivation: 'src/rodin/phase/index.ts' },
    ],
    keepers: [],
    seed: ['src/rodin/phase/index.ts'],
  }

  it('is SEALED under all nine laws', () => {
    const v = judge(change)
    expect(v.verdicts.filter((x) => !x.holds)).toEqual([])
    expect(v.sealed).toBe(true)
  })
})
