import { describe, expect, it } from 'vitest'
import { buildMillenniumTools } from './index'

const tools = buildMillenniumTools()
const byName = new Map(tools.map((t) => [t.name, t]))
const call = async (name: string, args: Record<string, unknown>): Promise<Record<string, unknown>> => {
  const t = byName.get(name)
  if (!t) throw new Error(`no tool ${name}`)
  const out = (await t.handler(args, {} as never)) as { content: { text: string }[] }
  return JSON.parse(out.content[0]!.text) as Record<string, unknown>
}

describe('mcp/tool/millennium', () => {
  it('carries the erpax.millennium.* prefix the barrel convention requires', () => {
    expect(tools.map((t) => t.name).sort()).toEqual(['erpax.millennium.data', 'erpax.millennium.perspectives'])
    for (const t of tools) expect(t.description.length).toBeGreaterThan(40)
  })

  it('perspectives: every problem, no coverage gap, corpusSolves false — no network', async () => {
    const r = await call('erpax.millennium.perspectives', {})
    expect(r.corpusSolves).toBe(false)
    expect(r.coverageGaps).toEqual([])
    expect((r.perspectives as unknown[]).length).toBe(7)
    const one = await call('erpax.millennium.perspectives', { problem: 'Riemann Hypothesis' })
    expect((one.perspectives as { problem: string; tested: boolean }[]).map((p) => [p.problem, p.tested])).toEqual([['Riemann Hypothesis', true]])
  })
})
