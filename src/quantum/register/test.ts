import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { atomAddress } from '@/atom/address'
import {
  type Gate,
  type Register,
  apply,
  atomPath,
  basisCnot,
  basisSwap,
  basisX,
  bell,
  determinant,
  entangled,
  ghz,
  isProductAt,
  normaliseAmplitudes,
  normalised,
  register,
  run,
  shots,
  support,
  total,
  weights,
} from '@/quantum/register'

const amps = (r: Register): number[] => r.amplitudes.map(Number)

describe('quantum/register — the Bell+CNOT pattern, on the basis index', () => {
  it('atomPath', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })

  it('|00⟩ → X₀ → |01⟩ → CNOT₀₁ → |11⟩: qpu\'s (0 ^^^ 1) ^^^ 2 = 3, and one more CNOT is the GHZ path', () => {
    expect(basisX(0, 0)).toBe(1)
    expect(basisCnot(0, 1, basisX(0, 0))).toBe(3)
    expect(basisCnot(1, 2, basisCnot(0, 1, basisX(0, 0)))).toBe(7)
  })

  it('X, CNOT and SWAP are involutions on every 2-qubit index — the bit-flip channel twice is identity', () => {
    for (let i = 0; i < 4; i++) {
      expect(basisX(0, basisX(0, i))).toBe(i)
      expect(basisCnot(0, 1, basisCnot(0, 1, i))).toBe(i)
      expect(basisSwap(0, 1, basisSwap(0, 1, i))).toBe(i)
    }
    expect(basisSwap(0, 1, 1)).toBe(2)
    expect(basisCnot(0, 1, 2)).toBe(2) // control clear: nothing moves
  })
})

describe('quantum/register — the amplitudes are integers and the normalisation is an identity', () => {
  it('bell() is [1,0,0,1] at one halving: Σ amp² = 2 = 2¹, support {0,3}', () => {
    const b = bell()
    expect(amps(b)).toEqual([1, 0, 0, 1])
    expect(b.halvings).toBe(1)
    expect(total(b)).toBe(2n)
    expect(weights(b)).toEqual([1n, 0n, 0n, 1n])
    expect(normalised(b)).toBe(true)
    expect(support(b)).toEqual([0, 3])
  })

  it('bell is entangled — the determinant 1·1 − 0·0 is not zero (qpu: entangle)', () => {
    expect(determinant(bell())).toBe(1n)
    expect(entangled(bell())).toBe(true)
    expect(isProductAt(bell(), 1)).toBe(false)
  })

  it('|++⟩ is [1,1,1,1] at two halvings and a PRODUCT state — determinant 1·1 − 1·1 = 0', () => {
    const plus = run(register(2), [{ name: 'h', q: 0 }, { name: 'h', q: 1 }])
    expect(amps(plus)).toEqual([1, 1, 1, 1])
    expect(plus.halvings).toBe(2)
    expect(normalised(plus)).toBe(true)
    expect(determinant(plus)).toBe(0n)
    expect(entangled(plus, 0)).toBe(false)
    expect(entangled(plus, 1)).toBe(false)
    expect(support(plus)).toEqual([0, 1, 2, 3])
  })

  it('interference is exact: H·H|0⟩ cancels |1⟩ to 0 and restores |0⟩ to 2 — never 1e-17 and 1.999', () => {
    const hh = run(register(1), [{ name: 'h', q: 0 }, { name: 'h', q: 0 }])
    expect(amps(hh)).toEqual([2, 0])
    expect(hh.halvings).toBe(2)
    expect(normalised(hh)).toBe(true)
  })

  it('ghz(3) has support {0,7} and is entangled across every cut', () => {
    const g = ghz(3)
    expect(support(g)).toEqual([0, 7])
    expect(g.halvings).toBe(1)
    expect(normalised(g)).toBe(true)
    for (const q of [0, 1, 2]) expect(entangled(g, q)).toBe(true)
  })

  it('every gate preserves Σ amp² = 2^halvings — checked after each step of a mixed circuit', () => {
    const circuit: readonly Gate[] = [
      { name: 'h', q: 0 },
      { name: 'cnot', c: 0, t: 1 },
      { name: 'z', q: 1 },
      { name: 'x', q: 2 },
      { name: 'h', q: 2 },
      { name: 'swap', a: 0, b: 2 },
      { name: 'cnot', c: 2, t: 1 },
      { name: 'h', q: 1 },
    ]
    let r = register(3)
    expect(normalised(r)).toBe(true)
    for (const g of circuit) {
      r = apply(r, g)
      expect(normalised(r)).toBe(true)
    }
    expect(r.halvings).toBe(3)
    expect(total(r)).toBe(8n)
  })

  it('determinant is a 2-qubit witness and refuses any other width', () => {
    expect(() => determinant(ghz(3))).toThrow(/2-qubit/)
  })
})

describe('quantum/register — shots are enumerated, never sampled', () => {
  it('bell for four rounds is [0,3,0,3,0,3,0,3]; the counts ARE the weights', () => {
    const s = shots(bell(), 4)
    expect(s.outcomes).toEqual([0, 3, 0, 3, 0, 3, 0, 3])
    expect(s.shots).toBe(8)
    expect(s.support).toEqual([0, 3])
    expect(s.counts).toEqual([{ i: 0, w: 1n }, { i: 3, w: 1n }])
    expect(s.enumerated).toBe(true)
    expect(s.sampled).toBe(false)
  })

  it('a uniform register enumerates every index once per round — qpu\'s [0,1,2,3,0,1,2,3]', () => {
    const plus = run(register(2), [{ name: 'h', q: 0 }, { name: 'h', q: 1 }])
    expect(shots(plus, 2).outcomes).toEqual([0, 1, 2, 3, 0, 1, 2, 3])
  })

  it('an unequal weight repeats its index by that weight within a round', () => {
    const hh = run(register(1), [{ name: 'h', q: 0 }, { name: 'h', q: 0 }])
    expect(shots(hh).outcomes).toEqual([0, 0, 0, 0])
  })
})

describe('quantum/register — the one Float Born normaliser', () => {
  it('normalises any real amplitudes so Σ|c|² = 1, keeping every key', () => {
    const out = normaliseAmplitudes({ a: 3, b: 4, c: 0 }, 'test')
    expect(out.a).toBeCloseTo(0.6, 12)
    expect(out.b).toBeCloseTo(0.8, 12)
    expect(out.c).toBe(0)
    expect(Object.keys(out)).toEqual(['a', 'b', 'c'])
  })

  it('refuses the zero state, naming the caller — both the old messages survive in the new one', () => {
    expect(() => normaliseAmplitudes({ a: 0 }, 'superposition')).toThrow(/^superposition: zero superposition/)
    expect(() => normaliseAmplitudes({}, 'quantumTradeQuote')).toThrow(/normalisation/)
  })
})

/** The Lean file is the arbiter: every theorem the SKILL leans on must still be there, and no `sorry`. */
describe('quantum/register — the Lean twin', () => {
  const lean = readFileSync(join(process.cwd(), 'src/verify/lean/Register.lean'), 'utf8')

  it('carries both carriers of the pattern as named theorems', () => {
    for (const thm of [
      'bell_path',
      'ghz_path',
      'noise_is_identity',
      'cnot_involution',
      'bell_amplitudes',
      'bell_normalised',
      'bell_entangled',
      'plus_is_product',
      'interfere',
      'hadamard_doubles_weight',
      'cnot_preserves_weight',
    ]) {
      expect(lean).toMatch(new RegExp(`^theorem ${thm}\\b`, 'm'))
    }
    expect(lean).not.toMatch(/\bsorry\b/)
    expect(lean).not.toMatch(/native_decide/)
  })

  it('the TypeScript agrees with the Lean on the states it names', () => {
    expect(lean).toMatch(/theorem bell_amplitudes : bell = ⟨1, 0, 0, 1⟩/)
    expect(amps(bell())).toEqual([1, 0, 0, 1])
    expect(lean).toMatch(/theorem bell_normalised : weight bell = 2/)
    expect(weights(bell()).reduce((s, w) => s + w, 0n)).toBe(2n)
    expect(lean).toMatch(/theorem bell_path : cnot 0 1 \(x 0 0\) = 3/)
    expect(basisCnot(0, 1, basisX(0, 0))).toBe(3)
  })
})
