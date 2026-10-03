import { describe, expect, it } from 'vitest'
import { buildFamilyTools, familiesOf, trinityReport } from './index'

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
    const [t] = buildFamilyTools()
    expect(t!.name).toBe('erpax.family.trinities')
    expect(t!.role).toBe('measure')
    expect(t!.description).toMatch(/trinit/i)
  })
})
