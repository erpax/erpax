import { describe, it, expect } from 'vitest'
import type { PayloadRequest } from 'payload'
import { involuteLeads } from '@/self/involute'
import type { InternalLead } from '@/self/sufficient'
import { buildFrontierTools, dependentSeats, developManifest, frontierDuals } from './index'

const req = {} as PayloadRequest

const lead = (source: string, target: string, scope: InternalLead['scope'] = 'atom'): InternalLead => ({
  source,
  scope,
  target,
  intent: `${source} ${target}`,
  evidence: target,
})

describe('developManifest — the act leg, hermetic', () => {
  const theorem = (source: string, target: string) => ({ ...lead(source, target), tag: 'theorem' as const, instrument: 'x', formula: '' })

  it('a two-file tangle becomes a leaf extraction: template without a word, planned scalpel ops with one', () => {
    const edges = [
      { importer: 'src/gate/index.ts', exporter: 'src/auth/index.ts', names: ['getUserContext'], statement: "import { getUserContext } from '@/auth'", specifier: '@/auth' },
      { importer: 'src/auth/index.ts', exporter: 'src/gate/index.ts', names: ['a', 'b', 'c'], statement: "import { a, b, c } from '@/gate'", specifier: '@/gate' },
    ]
    const tangles = new Map([['subscription/gate', { members: ['src/auth/index.ts', 'src/gate/index.ts'], edges }]])
    const [tpl] = developManifest([theorem('law:cycle', 'subscription/gate')], { tangles }, '/nowhere')
    expect(tpl!.kind).toBe('decision')
    expect(tpl!.steps.join('\n')).toContain("create src/auth/<word>/index.ts with getUserContext") // the smaller side moves
    expect(tpl!.steps.join('\n')).toContain('pass `word`')
    const [dev] = developManifest([theorem('law:cycle', 'subscription/gate')], { tangles, word: 'context' }, '/nowhere')
    expect(dev!.kind).toBe('ops')
    expect(dev!.ops).toEqual([expect.objectContaining({ file: 'src/gate/index.ts', find: "import { getUserContext } from '@/auth'", replace: "import { getUserContext } from '@/auth/context'" })])
    expect(dev!.ops[0]!.reason.length).toBeGreaterThan(20)
    // the scalpel dry-ran it: the file is not under /nowhere, so the plan REFUSES rather than pretending
    expect(dev!.plan!.refused).toBe(1)
    expect(dev!.plan!.verdicts[0]!.state).toBe('missing-file')
  })

  it('a hub, a dead export and a carried atom are decisions carrying their evidence; a wide tangle refuses a leaf', () => {
    const ev = {
      hubs: new Map([['fiscal/period/resolver', { lineCount: 714, exportCount: 2, childAtomCount: 0, concentrationScore: 0.74 }]]),
      exports: new Map([['persist/api/audit/event', [{ name: 'persistApiAuditEvent', file: 'src/persist/api/audit/event/index.ts', sites: 0 }]]]),
      deadReferrers: new Map([['dashboard/nav', ['src/dashboard/index.tsx']]]),
      tangles: new Map([['wave/load', { members: ['a', 'b', 'c'], edges: [] }]]),
    }
    const out = developManifest(
      [theorem('law:concentration', 'fiscal/period/resolver'), theorem('law:unfolded', 'persist/api/audit/event'), theorem('unreached', 'dashboard/nav'), theorem('law:cycle', 'wave/load'), theorem('unreached', 'island')],
      ev,
      '/nowhere',
    )
    expect(out.map((d) => d.kind)).toEqual(['decision', 'decision', 'decision', 'decision', 'decision'])
    expect(out[0]!.steps[1]).toContain('nest the private statics')
    expect(out[1]!.steps[0]).toContain('has no caller')
    expect(out[2]!.steps[0]).toContain('the dead code starts at src/dashboard/index.tsx')
    expect(out[3]!.steps[0]).toContain('a tangle of 3 files')
    expect(out[4]!.steps[0]).toContain('wire it')
  })

  it('a lie and a manipulation are never developed — the fix is the instrument or a dual, and the manifest says so', () => {
    const out = developManifest(
      [{ ...lead('unreached', 'x'), tag: 'lie', instrument: 'referrersOf', formula: '' }, { ...lead('guardian', 'y', 'axis'), tag: 'manipulation', instrument: null, formula: '' }],
      {},
      '/nowhere',
    )
    expect(out.map((d) => d.kind)).toEqual(['none', 'none'])
    expect(out[0]!.steps[0]).toContain('fix the instrument that told it (referrersOf)')
    expect(out[1]!.steps[0]).toContain('wire a dual')
  })
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
  it('offers the trinity — measure · involute · act — with the params a caller needs to bound the cost', () => {
    const tools = buildFrontierTools()
    expect(tools.map((t) => `${t.name}:${t.role}`)).toEqual(['erpax.frontier.next:measure', 'erpax.frontier.involute:involute', 'erpax.frontier.develop:act'])
    expect(Object.keys(tools[0]!.parameters).sort()).toEqual(['limit', 'sources'])
    expect(Object.keys(tools[1]!.parameters).sort()).toEqual(['limit', 'sources', 'tag'])
    expect(Object.keys(tools[2]!.parameters).sort()).toEqual(['limit', 'rotate', 'sources', 'target', 'word'])
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

describe('developManifest — the rosetta turned about each lead', () => {
  const theorem = (source: string, target: string) => ({ ...lead(source, target), tag: 'theorem' as const, instrument: 'x', formula: '' })
  const rotation = (axis: string, seen: Record<string, number>, files: number) => ({
    axis,
    files,
    perspectives: ['copy', 'cycle', 'unfolded', 'unreached'].map((law) => ({ law, seen: seen[law] ?? 0, forward: files ? (seen[law] ?? 0) / files : 0, backward: (seen[law] ?? 0) / 10 })),
    seats: Object.keys(seen).filter((l) => (seen[l] ?? 0) > 0),
    seat: (Object.values(seen).filter((n) => n > 0).length === 0 ? 'unseen' : Object.values(seen).filter((n) => n > 0).length === 1 ? 'single' : 'corroborated') as 'unseen' | 'single' | 'corroborated',
  })

  it('every other seat that sees the lead adds its prescription; the lead\'s own law is not repeated; the seat is carried as evidence', () => {
    const rotations = new Map([['payable', rotation('payable', { unreached: 1, unfolded: 4, cycle: 2 }, 5)]])
    const [d] = developManifest([theorem('unreached', 'payable')], { rotations }, process.cwd())
    expect(d!.evidence.seat).toBe('corroborated')
    expect(d!.evidence.seats).toEqual(['unreached', 'unfolded', 'cycle'])
    const text = d!.steps.join('\n')
    expect(text).toContain('from the unfolded seat (4 of 5 file(s), 40.0% of its population)')
    expect(text).toContain('from the cycle seat')
    expect(text).not.toContain('from the unreached seat') // its own law — the manifest above already is its step
    expect(text).toContain('inline it, delete it, or make it reused') // the unfolded law's own sentence, read from its SKILL
  })

  it('a lead no law holds as files is named a count, not matter; a lead with no rotation is unchanged', () => {
    const rotations = new Map([['stray-ts', rotation('stray-ts', {}, 0)]])
    const [unseen] = developManifest([theorem('guardian', 'stray-ts')], { rotations }, '/nowhere')
    expect(unseen!.evidence.seat).toBe('unseen')
    expect(unseen!.steps.join('\n')).toContain('it is a count, not matter')
    const [plain] = developManifest([theorem('unreached', 'x')], {}, '/nowhere')
    expect(plain!.evidence).toEqual({})
  })
})

describe('developManifest — a dependent seat corroborates nothing', () => {
  const theorem = (source: string, target: string) => ({ ...lead(source, target), tag: 'theorem' as const, instrument: 'x', formula: '' })
  it('unreached seen only by accounting-wave is single, not corroborated — the wave charges what unreached names', () => {
    const rot = {
      axis: 'biometric',
      files: 1,
      perspectives: [
        { law: 'unreached', seen: 1, forward: 1, backward: 1 / 60 },
        { law: 'accounting-wave', seen: 1, forward: 1, backward: 1 / 263 },
      ],
      seats: ['unreached', 'accounting-wave'],
      seat: 'corroborated' as const,
    }
    const [d] = developManifest([theorem('unreached', 'biometric')], { rotations: new Map([['biometric', rot]]) }, '/nowhere')
    expect(d!.evidence.seat).toBe('single')
    expect(d!.evidence.independent).toEqual(['unreached'])
    expect(d!.evidence.seats).toEqual(['unreached', 'accounting-wave'])
    expect(d!.steps.join('\n')).toContain('a dependent seat — it sees this lead because the other law does')
    expect([...dependentSeats('unreached')]).toEqual(['accounting-wave'])
    expect(dependentSeats('copy').size).toBe(0)
  })
})
