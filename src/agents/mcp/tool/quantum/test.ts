import { describe, expect, it } from 'vitest'
import { buildQuantumTools } from './index'

const tools = buildQuantumTools()
const byName = new Map(tools.map((t) => [t.name, t]))
const call = async (name: string, args: Record<string, unknown>): Promise<Record<string, unknown>> => {
  const t = byName.get(name)
  if (!t) throw new Error(`no tool ${name}`)
  const out = (await t.handler(args, {} as never)) as { content: { text: string }[] }
  return JSON.parse(out.content[0]!.text) as Record<string, unknown>
}

describe('mcp/tool/quantum', () => {
  it('carries the erpax.quantum.* prefix the barrel convention requires', () => {
    expect(tools.map((t) => t.name).sort()).toEqual(['erpax.quantum.bell', 'erpax.quantum.run', 'erpax.quantum.shots'])
    for (const t of tools) expect(t.description.length).toBeGreaterThan(40)
  })

  it('bell over the wire: [1,0,0,1], one halving, determinant 1, entangled at both cuts', async () => {
    const r = await call('erpax.quantum.bell', {})
    expect(r.amplitudes).toEqual(['1', '0', '0', '1'])
    expect(r.halvings).toBe(1)
    expect(r.total).toBe('2')
    expect(r.normalised).toBe(true)
    expect(r.support).toEqual([0, 3])
    expect(r.determinant).toBe('1')
    expect((r.entangled as { entangled: boolean }[]).every((e) => e.entangled)).toBe(true)
  })

  it('qubits > 2 is GHZ with support {0, 2^n−1}', async () => {
    const r = await call('erpax.quantum.bell', { qubits: 3 })
    expect(r.state).toBe('ghz')
    expect(r.support).toEqual([0, 7])
    expect(r.determinant).toBeUndefined()
  })

  it('run: |++⟩ is a product state at both cuts and interference is exact', async () => {
    const plus = await call('erpax.quantum.run', { qubits: 2, gates: [{ name: 'h', q: 0 }, { name: 'h', q: 1 }] })
    expect(plus.amplitudes).toEqual(['1', '1', '1', '1'])
    expect((plus.entangled as { product: boolean }[]).every((e) => e.product)).toBe(true)
    const hh = await call('erpax.quantum.run', { qubits: 1, gates: [{ name: 'h', q: 0 }, { name: 'h', q: 0 }] })
    expect(hh.amplitudes).toEqual(['2', '0'])
    expect(hh.halvings).toBe(2)
  })

  it('shots are enumerated: bell for 4 rounds is [0,3,0,3,0,3,0,3] and nothing is sampled', async () => {
    const s = await call('erpax.quantum.shots', { qubits: 2, gates: [{ name: 'h', q: 0 }, { name: 'cnot', c: 0, t: 1 }], rounds: 4 })
    expect(s.outcomes).toEqual([0, 3, 0, 3, 0, 3, 0, 3])
    expect(s.sampled).toBe(false)
    expect(s.enumerated).toBe(true)
    expect(s.counts).toEqual([{ i: 0, w: '1' }, { i: 3, w: '1' }])
  })

  it('refuses a gate that names a qubit the register does not have', async () => {
    await expect(call('erpax.quantum.run', { qubits: 2, gates: [{ name: 'cnot', c: 0, t: 2 }] })).rejects.toThrow(/qubit 2/)
  })
})
