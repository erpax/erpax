import { describe, expect, it } from 'vitest'
import { buildAmlTools } from './index'

const tools = buildAmlTools()
const byName = new Map(tools.map((t) => [t.name, t]))
const call = async (name: string, args: Record<string, unknown>): Promise<Record<string, unknown>> => {
  const t = byName.get(name)
  if (!t) throw new Error(`no tool ${name}`)
  const out = (await t.handler(args, {} as never)) as { content: { text: string }[] }
  return JSON.parse(out.content[0]!.text) as Record<string, unknown>
}

describe('mcp/tool/aml', () => {
  it('carries the erpax.aml.* prefix the barrel convention requires', () => {
    expect(tools.length).toBeGreaterThan(0)
    for (const t of tools) expect(t.name.startsWith('erpax.aml.')).toBe(true)
  })

  it('every tool declares parameters and a description a caller can act on', () => {
    for (const t of tools) {
      expect(t.description.length).toBeGreaterThan(40)
      expect(Object.keys(t.parameters).length).toBeGreaterThan(0)
    }
  })

  it('a NONE verdict carries its boundary across the wire', async () => {
    const r = await call('erpax.aml.report', { movements: [{ amount: 40, at: 1 }], threshold: 10000 })
    expect(r.reportOwed).toBe('none')
    expect(String(r.boundary)).toContain('NOT a finding')
  })

  it('structuring reports suspicious and holds the movement', async () => {
    const r = await call('erpax.aml.report', {
      movements: [{ amount: 9500, at: 0 }, { amount: 9500, at: 3600000 }],
      threshold: 10000,
    })
    expect(r.reportOwed).toBe('suspicious')
    expect(r.holdBeforeExecuting).toBe(true)
  })
})
