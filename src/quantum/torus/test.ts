import { describe, expect, it } from 'vitest'

import { describeRegister } from '@/agents/mcp/tool/quantum'
import { type Register, entangled, normaliseAmplitudes, normalised, weights, total, run, register, apply } from '@/quantum/register'
import { canonical, generators, orbit, orbitDeterminant, referrerPerspectives, ring } from './index'

const asRegister = (s: { amplitudes: readonly bigint[]; halvings: number }, qubits: number): Register => ({
  qubits,
  amplitudes: s.amplitudes,
  halvings: s.halvings,
})

describe('quantum/torus — every superposition the basis can reach', () => {
  it('one qubit reaches exactly the four ring states, and nothing else', () => {
    const o = orbit(1)
    expect(o.states.map((s) => s.key).sort()).toEqual([...ring()].sort())
    expect(o.closed).toBe(true)
    expect(o.allNormalised).toBe(true)
    expect(o.entangled).toBe(0)
  })

  it('two qubits: the orbit is closed under every generator, and every state is normalised', () => {
    const o = orbit(2)
    expect(o.closed).toBe(true)
    expect(o.allNormalised).toBe(true)
    const keys = new Set(o.states.map((s) => s.key))
    for (const s of o.states) {
      for (const g of generators(2)) expect(keys.has(canonical(apply(asRegister(s, 2), g)).key)).toBe(true)
    }
    expect(o.states.length).toBe(o.product + o.entangled)
    expect(o.entangled).toBeGreaterThan(0)
  })

  it('the double torus: the product states tile the 4 × 4 grid of ring pairs exactly once each', () => {
    const o = orbit(2)
    const cells = o.states.filter((s) => s.product).map((s) => s.torus!.join('⊗'))
    expect(o.product).toBe(ring().length * ring().length)
    expect(new Set(cells).size).toBe(16)
    for (const a of ring()) for (const b of ring()) expect(cells).toContain(`${a}⊗${b}`)
  })

  it('off the torus: every entangled state has a non-zero determinant, every product state zero', () => {
    const o = orbit(2)
    for (const s of o.states) {
      const d = orbitDeterminant(s)
      if (s.product) expect(d).toBe(0n)
      else expect(d).not.toBe(0n)
      expect(entangled(asRegister(s, 2))).toBe(!s.product)
    }
  })

  it('the orbit is a fixpoint: a depth-two walk from any state stays inside it, and the receipt is stable', () => {
    const a = orbit(2)
    const b = orbit(2)
    expect(a.receipt).toBe(b.receipt)
    const keys = new Set(a.states.map((s) => s.key))
    for (const s of a.states.slice(0, 12)) {
      for (const g1 of generators(2)) for (const g2 of generators(2)) {
        expect(keys.has(canonical(run(asRegister(s, 2), [g1, g2])).key)).toBe(true)
      }
    }
  })
})

describe('quantum/torus — cross-developed from every referrer perspective', () => {
  const o = orbit(2)

  it('superposition / dimension / trading — the one Float normaliser agrees with the exact weights on EVERY state', () => {
    for (const s of o.states) {
      const r = asRegister(s, 2)
      const amp = Object.fromEntries(r.amplitudes.map((a, i) => [String(i), Number(a)])) as Record<string, number>
      const f = normaliseAmplitudes(amp, 'torus')
      const w = weights(r)
      const t = Number(total(r))
      for (let i = 0; i < 4; i++) expect(f[String(i)]! ** 2).toBeCloseTo(Number(w[i]) / t, 12)
    }
  })

  it('entanglement — the Bell witness holds on exactly the off-torus states', () => {
    expect(o.states.filter((s) => entangled(asRegister(s, 2))).length).toBe(o.entangled)
  })

  it('mcp/tool/quantum — every state crosses the wire as decimal strings and comes back whole', () => {
    for (const s of o.states) {
      const d = describeRegister(asRegister(s, 2))
      expect((d.amplitudes as string[]).map((x) => BigInt(x))).toEqual([...s.amplitudes])
      expect(d.normalised).toBe(true)
      expect(normalised(asRegister(s, 2))).toBe(true)
    }
  })

  it('the referrers are read from the grammar, each with the standards it cites — its perspective', () => {
    const refs = referrerPerspectives()
    const files = refs.map((r) => r.file)
    for (const f of ['src/superposition/index.ts', 'src/quantum/dimension/index.ts', 'src/trading/quantum/index.ts', 'src/quantum/entanglement/index.ts', 'src/agents/mcp/tool/quantum/index.ts']) {
      expect(files).toContain(f)
    }
    for (const r of refs) expect(Array.isArray(r.standards)).toBe(true)
    // the physics referrer reads the register through its cited standard, not through a bare import
    expect(refs.find((r) => r.file === 'src/quantum/entanglement/index.ts')!.standards.length).toBeGreaterThan(0)
  })

  it('a product state is the tensor of its two ring factors — the torus coordinate is not a label', () => {
    const plus = run(register(2), [{ name: 'h', q: 0 }])
    const s = o.states.find((x) => x.key === canonical(plus).key)!
    expect(s.product).toBe(true)
    expect(s.torus).toEqual(['1,1/1', '1,0/0'])
  })
})
