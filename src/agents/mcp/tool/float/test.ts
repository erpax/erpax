import { describe, expect, it } from 'vitest'
import { buildFloatTools } from './index'

const tools = buildFloatTools()
const byName = new Map(tools.map((t) => [t.name, t]))
const call = async (name: string, args: Record<string, unknown>): Promise<Record<string, unknown>> => {
  const t = byName.get(name)
  if (!t) throw new Error(`no tool ${name}`)
  const out = (await t.handler(args, {} as never)) as { content: { text: string }[] }
  return JSON.parse(out.content[0]!.text) as Record<string, unknown>
}

describe('mcp/tool/float', () => {
  it('carries the erpax.float.* prefix the barrel convention requires', () => {
    expect(tools.length).toBeGreaterThan(0)
    for (const t of tools) expect(t.name.startsWith('erpax.float.')).toBe(true)
  })

  it('every tool declares parameters and a description a caller can act on', () => {
    for (const t of tools) {
      expect(t.description.length).toBeGreaterThan(40)
      expect(Object.keys(t.parameters).length).toBeGreaterThan(0)
    }
  })

  it('the total is derived from the count — no total can be supplied', async () => {
    const t = byName.get('erpax.float.reconcile')!
    expect(Object.keys(t.parameters)).not.toContain('total')
    const r = await call('erpax.float.reconcile', {
      opening: 10000,
      movements: [{ amount: 5000 }],
      counted: { 10000: 1, 5000: 1 },
      units: [10000, 5000],
    })
    expect(r.state).toBe('balanced')
    expect(r.counted).toBe(15000)
  })

  it('an illegal unit voids the count even when it totals right', async () => {
    const r = await call('erpax.float.reconcile', {
      opening: 2500,
      movements: [],
      counted: { 2500: 1 },
      units: [10000, 5000],
    })
    expect(r.variance).toBe(0)
    expect(r.illegal).toEqual([2500])
  })
})
