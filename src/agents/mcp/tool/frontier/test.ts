import { describe, it, expect } from 'vitest'
import type { PayloadRequest } from 'payload'
import { buildFrontierTools } from './index'

const req = {} as PayloadRequest

describe('erpax.self tools — the factory', () => {
  it('offers the two tools, with the params a caller needs to bound the cost', () => {
    const tools = buildFrontierTools()
    expect(tools.map((t) => t.name)).toEqual(['erpax.frontier.next', 'erpax.frontier.involute'])
    expect(Object.keys(tools[0]!.parameters).sort()).toEqual(['limit', 'sources'])
    expect(Object.keys(tools[1]!.parameters).sort()).toEqual(['limit', 'sources', 'tag'])
  })

  it('names the cost in its description, because every source is a full scan', () => {
    for (const t of buildFrontierTools()) expect(t.description).toMatch(/COST|ЦЕНА|KOSTEN|COÛT/)
  })
})

/**
 * A factory test is not a surface test.
 *
 * Measured earlier in this corpus: 8 of 8 tool atoms tested their own factory and NONE tested that
 * the tools reached the live surface — so `buildOutwardTools` was exported, fully tested, and wired
 * nowhere, and every one of its tests passed. This is the assertion that would have caught it.
 */
describe('erpax.self tools — the live surface', () => {
  it('LIVES on the surface the agent actually sees, not just in its own factory', async () => {
    const { toolsLiveUnder } = await import('@/agents/mcp')
    expect(await toolsLiveUnder('erpax.frontier.')).toBe(true)
  }, 300_000)
})

describe('erpax.frontier.next — the answer', () => {
  it('answers from measurement with no argument at all, and ranks what it found', async () => {
    const tool = buildFrontierTools()[0]!
    const out = await tool.handler({}, req)
    const body = JSON.parse(out.content[0]!.text) as {
      asked: string[]; leads: number; next: { rank: number; intent: string } | null
      corroborated: unknown[]; orthogonal: string[]
    }
    expect(body.asked).toEqual(['guardians']) // the cheap default, not every scan
    expect(body.leads).toBeGreaterThan(0) // red axes exist, so a frontier exists
    expect(body.next).not.toBeNull()
    expect(body.next!.rank).toBeGreaterThan(0) // an unrankable next move cannot be acted on
  }, 600_000)
})

describe('erpax.frontier — every lead tagged by its involution', () => {
  it('tags every lead, and the three counts sum to the lead count', async () => {
    const tool = buildFrontierTools()[0]!
    const out = await tool.handler({ sources: ['guardians'] }, req)
    const body = JSON.parse(out.content[0]!.text) as {
      leads: number
      tags: { theorem: number; lie: number; manipulation: number }
      ranked: { tag: string }[]
      manipulations: Record<string, number>
    }
    expect(body.tags.theorem + body.tags.lie + body.tags.manipulation).toBe(body.leads)
    for (const r of body.ranked) expect(['theorem', 'lie', 'manipulation']).toContain(r.tag)
    // A red count asked alone has no members to be cross-examined on — one witness, and it says so.
    expect(body.tags.manipulation).toBe(body.leads)
    expect(body.manipulations.guardian).toBe(body.leads)
  }, 600_000)

  it('erpax.frontier.involute filters by tag and names the duals it asked', async () => {
    const tool = buildFrontierTools()[1]!
    const out = await tool.handler({ sources: ['guardians'], tag: 'lie' }, req)
    const body = JSON.parse(out.content[0]!.text) as {
      tags: { theorem: number; lie: number; manipulation: number }
      duals: { source: string; instrument: string }[]
      leads: { tag: string; formula: string }[]
    }
    expect(body.duals).toEqual([{ source: 'guardian', instrument: 'members' }])
    expect(body.leads.every((l) => l.tag === 'lie')).toBe(true)
    expect(body.leads).toHaveLength(body.tags.lie)
  }, 600_000)
})
