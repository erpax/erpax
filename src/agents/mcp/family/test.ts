import { describe, expect, it } from 'vitest'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { clearCache } from '@/syntax/cache'
import { buildFamilyTools, declareOps, declareRoles, familiesOf, shapeRoles, trinityReport } from './index'

const tool = (name: string, role?: 'measure' | 'involute' | 'act') => ({ name, role })

describe('agents/mcp/family — trinity families, from declared roles', () => {
  it('groups by the erpax.<area>. prefix and ignores names outside it', () => {
    const f = familiesOf([tool('erpax.gate.verdicts', 'measure'), tool('erpax.gate.cross', 'involute'), tool('erpax.frontier.next', 'measure'), tool('other.thing')])
    expect([...f.keys()].sort()).toEqual(['frontier', 'gate'])
    expect(f.get('gate')).toHaveLength(2)
  })

  it('a family with all three legs is a trinity; one missing a leg names the leg; an undeclared tool is unplaced', () => {
    const r = trinityReport([
      tool('erpax.frontier.next', 'measure'),
      tool('erpax.frontier.involute', 'involute'),
      tool('erpax.frontier.develop', 'act'),
      tool('erpax.gate.verdicts', 'measure'),
      tool('erpax.gate.cross', 'involute'),
      tool('erpax.kv.get'),
    ])
    const frontier = r.find((f) => f.area === 'frontier')!
    const gate = r.find((f) => f.area === 'gate')!
    const kv = r.find((f) => f.area === 'kv')!
    expect(frontier.trinity).toBe(true)
    expect(frontier.missing).toEqual([])
    expect(gate.trinity).toBe(false)
    expect(gate.missing).toEqual(['act'])
    expect(kv.undeclared).toEqual(['erpax.kv.get'])
    expect(kv.missing).toEqual(['measure', 'involute', 'act'])
    // trinities first, then by how much is missing
    expect(r.map((f) => f.area)).toEqual(['frontier', 'gate', 'kv'])
  })

  it('the live surface: the frontier family is a trinity, and every family with declared tools either is one or names its missing legs', async () => {
    const { buildErpaxMcpTools } = await import('@/agents/mcp/tool-defs')
    const { agentRegistry } = await import('@/agent')
    const r = trinityReport(buildErpaxMcpTools(agentRegistry))
    const frontier = r.find((f) => f.area === 'frontier')!
    expect(frontier.trinity).toBe(true)
    expect(frontier.legs.act).toContain('erpax.frontier.develop')
    for (const f of r) expect(f.trinity || f.missing.length > 0).toBe(true)
    // the gate family measures and involutes and has no act yet — the computed next tool of that family
    expect(r.find((f) => f.area === 'gate')!.missing).toEqual(['act'])
  }, 120_000)

  it('offers erpax.family.trinities as the measure leg of its own family', () => {
    const t = buildFamilyTools().find((x) => x.name === 'erpax.family.trinities')
    expect(t!.name).toBe('erpax.family.trinities')
    expect(t!.role).toBe('measure')
    expect(t!.description).toMatch(/trinit/i)
  })
})

describe('agents/mcp/family — the involute and act legs: roles from the body, declared by manifest', () => {
  const plant = (): string => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-family-'))
    const dir = join(root, 'src', 'agents', 'mcp', 'tool', 'x')
    mkdirSync(dir, { recursive: true })
    writeFileSync(
      join(dir, 'index.ts'),
      [
        "export const tools = [",
        "  {",
        "    name: 'erpax.x.count',",
        "    description: 'reads',",
        "    parameters: {},",
        "    async handler() { return { content: [] } },",
        "  },",
        "  {",
        "    name: 'erpax.x.seed',",
        "    role: 'measure',",
        "    description: 'claims to read',",
        "    parameters: {},",
        "    async handler(_a: unknown, req: { payload: { create(x: unknown): unknown } }) { await req.payload.create({}); return { content: [] } },",
        "  },",
        "  {",
        "    name: 'erpax.x.apply',",
        "    role: 'act',",
        "    description: 'writes',",
        "    parameters: {},",
        "    async handler() { writeFileSync('a', 'b'); return { content: [] } },",
        "  },",
        "  { name: `erpax.x.${'generated'}`, description: 'a template is a family, declared at its generator', parameters: {}, async handler() { return { content: [] } } },",
        "]",
        "declare function writeFileSync(a: string, b: string): void",
      ].join('\n'),
    )
    return root
  }

  it('a body that writes is an act, a body that reads is a measure, a declared measure that writes is a lie, a template name is skipped', () => {
    const root = plant()
    try {
      clearCache()
      const rows = shapeRoles(root)
      expect(rows.map((r) => [r.name, r.declared, r.shape, r.lie])).toEqual([
        ['erpax.x.apply', 'act', 'act', false],
        ['erpax.x.count', null, 'measure', false],
        ['erpax.x.seed', 'measure', 'act', true],
      ])
      const ops = declareOps(rows, root)
      expect(ops).toHaveLength(1)
      expect(ops[0]!.find).toBe("    name: 'erpax.x.count',")
      expect(ops[0]!.replace).toBe("    name: 'erpax.x.count',\n    role: 'measure',")
      const d = declareRoles(root, true)
      expect(d.applied).toBe(true)
      clearCache()
      expect(shapeRoles(root).find((r) => r.name === 'erpax.x.count')!.declared).toBe('measure')
      expect(d.lies.map((l) => l.name)).toEqual(['erpax.x.seed'])
    } finally {
      clearCache()
      rmSync(root, { recursive: true, force: true })
    }
  })

  it('on the live tree: every literal-named tool is placed by a shape the scalpel can plan without refusal, and no declared measure writes', () => {
    const d = declareRoles(process.cwd(), false)
    expect(d.plan.refused).toBe(0)
    expect(d.lies).toEqual([])
  }, 120_000)

  it('the family is itself a trinity: trinities (measure) · roles (involute) · declare (act)', () => {
    const t = buildFamilyTools()
    expect(t.map((x) => [x.name, x.role])).toEqual([
      ['erpax.family.roles', 'involute'],
      ['erpax.family.declare', 'act'],
      ['erpax.family.trinities', 'measure'],
    ])
    expect(trinityReport(t)[0]!.trinity).toBe(true)
  })
})
