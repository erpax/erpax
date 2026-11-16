/**
 * quantum — the exact register and its Lean twin, Register.lean.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { apply, distribution, entangled, ket, run, SUPPORT_LIMIT, weight, zero, type Gate } from '@/utilities/quantum'

const h = (q: number): Gate => ({ gate: 'h', qubits: [q] })
const x = (q: number): Gate => ({ gate: 'x', qubits: [q] })
const cnot = (c: number, t: number): Gate => ({ gate: 'cnot', qubits: [c, t] })
const amps = (r: ReturnType<typeof run>) => Object.fromEntries([...r.amp].map(([i, a]) => [i.toString(), a]))

describe('quantum — the twin of Register.lean', () => {
  const lean = readFileSync(join(import.meta.dirname, '..', 'verify', 'lean', 'Register.lean'), 'utf8')

  it('names the theorems it mirrors', () => {
    for (const name of ['bell_amplitudes', 'bell_normalised', 'bell_entangled', 'plus_is_product', 'interfere', 'flip_involution', 'x_involution'])
      expect(lean, name).toMatch(new RegExp(`theorem ${name}\\b`))
  })

  it('bell_amplitudes, bell_normalised, bell_entangled: H₀·CNOT₀₁ gives ⟨1,0,0,1⟩, weight 2, entangled', () => {
    const bell = run(2, [h(0), cnot(0, 1)])
    expect(amps(bell)).toEqual({ '0': 1n, '3': 1n })
    expect(bell.halvings).toBe(1)
    expect(weight(bell)).toBe(2n)
    expect(entangled(bell, 0)).toBe(true)
  })

  it('plus_is_product: H₀·H₁ gives ⟨1,1,1,1⟩, weight 4, a product state', () => {
    const plus = run(2, [h(0), h(1)])
    expect(amps(plus)).toEqual({ '0': 1n, '1': 1n, '2': 1n, '3': 1n })
    expect(weight(plus)).toBe(4n)
    expect(entangled(plus, 0)).toBe(false)
  })

  it('interfere: H₀·H₀ returns all weight to |0⟩, and H·Z·H is X', () => {
    expect(amps(run(1, [h(0), h(0)]))).toEqual({ '0': 2n })
    expect(amps(run(1, [h(0), { gate: 'z', qubits: [0] }, h(0)]))).toEqual({ '1': 2n })
  })

  it('x_involution at any width: X twice on qubit 999 of a 1000-qubit register is the identity', () => {
    const r = run(1000, [x(999)])
    expect([...r.amp.keys()]).toEqual([1n << 999n])
    expect([...apply(r, x(999)).amp.keys()]).toEqual([0n])
  })
})

describe('quantum — limited by memory, not by a textbook width', () => {
  it('holds a 1000-qubit GHZ state in two amplitudes', () => {
    const ghz = run(1000, [h(0), ...Array.from({ length: 999 }, (_, i) => cnot(i, i + 1))])
    expect(ghz.amp.size).toBe(2)
    expect(distribution(ghz).map((d) => d.state)).toEqual([0n, (1n << 1000n) - 1n])
    expect(entangled(ghz, 0)).toBe(true)
    expect(ket(ghz, 0n)).toBe(`|${'0'.repeat(1000)}⟩`)
  })

  it('runs Toffoli, the gate that with H is universal over real amplitudes', () => {
    expect([...run(3, [x(0), x(1), { gate: 'ccx', qubits: [0, 1, 2] }]).amp.keys()]).toEqual([7n])
    expect([...run(3, [x(0), { gate: 'ccx', qubits: [0, 1, 2] }]).amp.keys()]).toEqual([1n])
  })

  it('holds 2^18 amplitudes in superposition and refuses the 19th doubling with the reason', () => {
    expect(SUPPORT_LIMIT).toBe(2 ** 18)
    const full = run(40, Array.from({ length: 18 }, (_, q) => h(q)))
    expect(full.amp.size).toBe(SUPPORT_LIMIT)
    expect(() => apply(full, h(18))).toThrow(/memory/)
  }, 30_000)

  it('refuses a malformed gate', () => {
    expect(() => apply(zero(2), { gate: 'cnot', qubits: [0] })).toThrow(/2 qubit/)
    expect(() => apply(zero(2), x(2))).toThrow(/outside/)
    expect(() => apply(zero(2), cnot(1, 1))).toThrow(/distinct/)
    expect(() => zero(0)).toThrow()
  })
})
