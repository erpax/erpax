import { describe, expect, it } from 'vitest'
import { buildRiskTools } from './index'

const tools = buildRiskTools()
const byName = new Map(tools.map((t) => [t.name, t]))
const call = async (name: string, args: Record<string, unknown>): Promise<Record<string, unknown>> => {
  const t = byName.get(name)
  if (!t) throw new Error(`no tool ${name}`)
  const out = (await t.handler(args, {} as never)) as { content: { text: string }[] }
  return JSON.parse(out.content[0]!.text) as Record<string, unknown>
}

describe('mcp/tool/risk', () => {
  it('carries the erpax.risk.* prefix the barrel convention requires', () => {
    expect(tools.length).toBeGreaterThan(0)
    for (const t of tools) expect(t.name.startsWith('erpax.risk.')).toBe(true)
  })

  it('every tool declares parameters and a description a caller can act on', () => {
    for (const t of tools) {
      expect(t.description.length).toBeGreaterThan(40)
      expect(Object.keys(t.parameters).length).toBeGreaterThan(0)
    }
  })

  it('aggregates connected clients BEFORE testing, over the wire', async () => {
    const r = await call('erpax.risk.concentration', {
      exposures: [
        { client: 'a-1', group: 'alpha', amount: 12_000_000 },
        { client: 'a-2', group: 'alpha', amount: 9_000_000 },
        { client: 'a-3', group: 'alpha', amount: 8_000_000 },
      ],
      tier1: 100_000_000,
    })
    expect((r.parties as unknown[]).length).toBe(1)
    expect((r.breaches as { counterparty: string }[])[0]!.counterparty).toBe('alpha')
  })
})
