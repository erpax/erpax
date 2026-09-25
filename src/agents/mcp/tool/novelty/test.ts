import { describe, it, expect } from 'vitest'
import { buildNoveltyTools } from '@/agents/mcp/tool/novelty'
import type { PayloadRequest } from 'payload'

const req = {} as PayloadRequest
const parse = async (name: string, args: Record<string, unknown>): Promise<Record<string, unknown>> => {
  const tool = buildNoveltyTools().find((t) => t.name === name)
  if (tool === undefined) throw new Error(`no such tool: ${name}`)
  const r = await tool.handler(args, req)
  return JSON.parse(r.content[0]!.text) as Record<string, unknown>
}

describe('erpax.novelty — the cross enumerator on the public surface', () => {
  it('lists both tools, and each carries a localized description', () => {
    const tools = buildNoveltyTools()
    expect(tools.map((t) => t.name)).toEqual(['erpax.novelty.crosses', 'erpax.novelty.measure'])
    for (const t of tools) expect(t.description.length).toBeGreaterThan(80)
  })

  it('crosses returns C(n,2) pairs and carries its own caveat', async () => {
    const r = await parse('erpax.novelty.crosses', { limit: 3 })
    const laws = r.laws as number
    expect(r.pairs).toBe((laws * (laws - 1)) / 2)
    expect(r.drawn as number).toBeGreaterThan(0)
    // the tool tells the caller its ranking did not predict findings
    expect(String(r.caveat)).toMatch(/PROSE/)
    expect(String(r.caveat)).toMatch(/measured empty/)
    expect((r.crosses as unknown[]).length).toBe(3)
  }, 300_000)

  it('and reports `live` as null where nothing was measured, never as true', async () => {
    const r = await parse('erpax.novelty.crosses', { limit: 5 })
    for (const c of r.crosses as Array<{ live: unknown; together: number }>) {
      expect(c.live).toBeNull() // unmeasured is not a fact
      expect(c.together).toBe(0) // undrawn by default
    }
  }, 300_000)

  it('measure intersects real populations and names the orthogonal laws', async () => {
    const r = await parse('erpax.novelty.measure', { laws: ['copy', 'concentration'] })
    const scanned = r.scanned as Record<string, number>
    expect(Object.keys(scanned).sort()).toEqual(['concentration', 'copy'])
    expect(scanned.copy).toBeGreaterThan(0)
    // concentration meets nothing — the prose ranking's top live pick is provably empty
    expect(r.orthogonal).toContain('concentration')
    expect(String(r.reading)).toMatch(/DIRECTIONAL/)
  }, 300_000)
})
