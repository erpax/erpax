import { describe, it, expect } from 'vitest'
import type { PayloadRequest } from 'payload'
import { involuteLeads } from '@/self/involute'
import type { InternalLead } from '@/self/sufficient'
import { buildFrontierTools, frontierDuals } from './index'

const req = {} as PayloadRequest

const lead = (source: string, target: string, scope: InternalLead['scope'] = 'atom'): InternalLead => ({
  source,
  scope,
  target,
  intent: `${source} ${target}`,
  evidence: target,
})

describe('frontierDuals — the cross formulas, hermetic', () => {
  it('a red count whose law names members holds; one whose law names none is refuted; one with no population is silent', () => {
    const duals = frontierDuals({ populations: new Map([['copy', 3], ['mirror', 0]]) })
    const tags = involuteLeads(
      [lead('guardian', 'copy', 'axis'), lead('guardian', 'mirror', 'axis'), lead('guardian', 'skill-face', 'axis')],
      duals,
    ).map((t) => t.tag)
    expect(tags).toEqual(['theorem', 'lie', 'manipulation'])
  })

  it('accounting-wave ⊗ unreached: a gap path is explained by an unreached atom at or under it, or the wave lied', () => {
    const unreached = ['gl/accounts/bank', 'payable']
    const gaps = ['gl/accounts', 'gl/accounts/bank', 'legal/entities']
    const explained = frontierDuals({ unreached, gaps, populations: new Map() })
    const tags = involuteLeads(
      [lead('guardian', 'accounting-wave', 'axis'), ...gaps.map((g) => lead('law:accounting-wave', g))],
      explained,
    ).map((t) => `${t.target}:${t.tag}`)
    expect(tags).toEqual(['accounting-wave:theorem', 'gl/accounts:theorem', 'gl/accounts/bank:theorem', 'legal/entities:lie'])
    // without the unreached scan the cross cannot be asked — silent, so manipulation, never a guess
    const blind = frontierDuals({ gaps, populations: new Map() })
    expect(involuteLeads([lead('guardian', 'accounting-wave', 'axis'), lead('law:accounting-wave', 'gl/accounts')], blind).map((t) => t.tag)).toEqual(['manipulation', 'manipulation'])
    // and a wave none of whose paths an unreached atom explains is a red count that lied about its cause
    const unexplained = frontierDuals({ unreached: ['payable'], gaps: ['legal/entities'], populations: new Map() })
    expect(involuteLeads([lead('guardian', 'accounting-wave', 'axis')], unexplained)[0]!.tag).toBe('lie')
  })

  it('bypass-math ⊗ slack: the emitted ratchet and the live balance agree on the axis, or the complaint is refuted', () => {
    const agree = frontierDuals({ bypass: [{ axis: 'index-cross' }], moved: new Set(['index-cross']) })
    const disagree = frontierDuals({ bypass: [{ axis: 'index-cross' }], moved: new Set() })
    const artefact = frontierDuals({ bypass: [{ axis: 'artifact' }], moved: new Set() })
    const g = lead('guardian', 'bypass-math', 'axis')
    expect(involuteLeads([g], agree)[0]!.tag).toBe('theorem')
    expect(involuteLeads([g], disagree)[0]!.tag).toBe('lie')
    expect(involuteLeads([g], artefact)[0]!.tag).toBe('theorem') // a hand-maintained file is itself the member
  })

  it('unreached ⊗ referrers and cross ⊗ lift', () => {
    const duals = frontierDuals({ unreached: ['a', 'b'], referred: new Set(['b']), lifts: new Map([['copy × cycle — 3 shared', 2.5], ['copy × mirror — 9 shared', 0.9]]) })
    const tags = involuteLeads(
      [lead('unreached', 'a'), lead('unreached', 'b'), lead('cross', 'copy × cycle — 3 shared', 'cross'), lead('cross', 'copy × mirror — 9 shared', 'cross'), lead('guardian', 'unreached', 'axis')],
      duals,
    ).map((t) => t.tag)
    expect(tags).toEqual(['theorem', 'lie', 'theorem', 'lie', 'theorem'])
  })

  it('a population member at an address the tree does not have is a lie about WHERE', () => {
    const duals = frontierDuals({ populations: new Map([['concentration', 2]]), addressable: (t) => t === 'fiscal/period/resolver' })
    const tags = involuteLeads([lead('law:concentration', 'fiscal/period/resolver'), lead('law:concentration', '../fiscal/period/resolver')], duals).map((t) => t.tag)
    expect(tags).toEqual(['theorem', 'lie'])
  })

  it('no evidence at all: one dual, silent on everything — every lead a manipulation, none untagged', () => {
    const tagged = involuteLeads([lead('guardian', 'x', 'axis'), lead('unreached', 'y'), lead('boundary', 'z', 'boundary')], frontierDuals({}))
    expect(tagged.map((t) => t.tag)).toEqual(['manipulation', 'manipulation', 'manipulation'])
  })
})

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
    // Only bypass-math carries its own members (the axes it names), so it alone may hold here.
    expect(body.manipulations.guardian ?? 0).toBeGreaterThanOrEqual(body.leads - 1)
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
