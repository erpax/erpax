import { describe, expect, it } from 'vitest'
import { buildStaffingTools } from './index'

const tools = buildStaffingTools()
const byName = new Map(tools.map((t) => [t.name, t]))
const call = async (name: string, args: Record<string, unknown>): Promise<Record<string, unknown>> => {
  const t = byName.get(name)
  if (!t) throw new Error(`no tool ${name}`)
  const out = (await t.handler(args, {} as never)) as { content: { text: string }[] }
  return JSON.parse(out.content[0]!.text) as Record<string, unknown>
}

describe('mcp/tool/staffing', () => {
  it('carries the erpax.staffing.* prefix the barrel convention requires', () => {
    expect(tools.length).toBeGreaterThan(0)
    for (const t of tools) expect(t.name.startsWith('erpax.staffing.')).toBe(true)
  })

  it('every tool declares parameters and a description a caller can act on', () => {
    for (const t of tools) {
      expect(t.description.length).toBeGreaterThan(40)
      expect(Object.keys(t.parameters).length).toBeGreaterThan(0)
    }
  })

  it('two inputs, five derived faces', async () => {
    const r = await call('erpax.staffing.position', {
      position: { title: 'Bank teller', harmonic: 1, level: 2, function: 'financial services' },
      required: [{ competency: 'kyc', minProficiency: 3, mandatory: true }],
      held: [{ competency: 'kyc', proficiency: 1 }],
      capability: 'write',
      anchor: 25,
    })
    expect((r.description as { title: string }).title).toBe('Bank teller')
    expect((r.cost as { hourly: number }).hourly).toBe(25)
    expect(r.proficient).toBe(false)
    expect((r.plan as unknown[]).length).toBe(1)
  })
})
