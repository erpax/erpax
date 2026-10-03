import { describe, expect, it } from 'vitest'
import type { Cross } from '@/conjecture'
import { buildGateTools, crossGate, crossGates } from './index'

const tools = buildGateTools()
const byName = new Map(tools.map((t) => [t.name, t]))
const call = async (name: string, args: Record<string, unknown>): Promise<Record<string, unknown>> => {
  const t = byName.get(name)
  if (!t) throw new Error(`no tool ${name}`)
  const out = (await t.handler(args, {} as never)) as { content: { text: string }[] }
  return JSON.parse(out.content[0]!.text) as Record<string, unknown>
}

const sets = new Map<string, ReadonlySet<string>>([
  ['copy', new Set(['a.ts', 'b.ts', 'c.ts'])],
  ['cycle', new Set(['b.ts', 'c.ts', 'd.ts', 'e.ts'])],
  ['mirror', new Set(['x.ts'])],
  ['unfolded', new Set<string>()],
])
const prose: Cross[] = [
  { a: 'copy', b: 'cycle', citedA: 14, citedB: 28, together: 1, bits: 1.1, live: true },
  { a: 'copy', b: 'mirror', citedA: 14, citedB: 7, together: 0, bits: 2.3, live: true },
]

describe('mcp/tool/gate', () => {
  it('carries the erpax.gate.* prefix the barrel convention requires', () => {
    expect(tools.map((t) => t.name).sort()).toEqual(['erpax.gate.coil', 'erpax.gate.cross', 'erpax.gate.crosses', 'erpax.gate.ratchet', 'erpax.gate.verdicts'])
    for (const t of tools) expect(t.description.length).toBeGreaterThan(40)
  })

  it('a cross is the files BOTH laws flag, with the lift that says whether that is more than chance', () => {
    const c = crossGate(sets, prose, 'cycle', 'copy')
    expect([c.a, c.b]).toEqual(['copy', 'cycle']) // order-free: the pair is a set
    expect(c.files).toEqual(['b.ts', 'c.ts'])
    expect(c.shared).toBe(2)
    expect(c.live).toBe(true)
    expect(c.theorem).toBe(false)
    expect(c.prose).toEqual({ citedA: 14, citedB: 28, together: 1, bits: 1.1 })
    // 2 shared is EXACTLY what independence predicts over this 6-file universe (3·4/6 = 2): a raw
    // shared count is not evidence, and the lift says so by reading 1.
    expect(c.lift).toBeCloseTo(1, 9)
  })

  it('an empty intersection over two NON-EMPTY parents is a theorem at zero; over an empty parent it is nothing', () => {
    expect(crossGate(sets, prose, 'copy', 'mirror').theorem).toBe(true)
    const dead = crossGate(sets, prose, 'copy', 'unfolded')
    expect(dead.live).toBe(false)
    expect(dead.theorem).toBe(false) // a cross between a satisfied law and anything finds nothing, and proves nothing
    expect(crossGate(sets, prose, 'cycle', 'mirror').prose).toBeNull() // never written about: prose is null, not invented
  })

  it('crosses ranks every pair, lift first, and names the theorems', () => {
    const all = crossGates(sets, prose)
    expect(all).toHaveLength(6)
    expect(all[0]!.lift).toBeGreaterThanOrEqual(all[1]!.lift)
    expect(all.filter((c) => c.theorem).map((c) => `${c.a}×${c.b}`)).toEqual(['copy×mirror', 'cycle×mirror'])
  })

  it('refuses an unmeasured law and a cross of a law with itself, before any scan runs', async () => {
    await expect(call('erpax.gate.cross', { a: 'copy', b: 'copy' })).rejects.toThrow(/two different laws/)
    await expect(call('erpax.gate.cross', { a: 'copy', b: 'telepathy' })).rejects.toThrow(/not a measured law/)
  })
})
