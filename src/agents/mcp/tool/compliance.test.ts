import { describe, expect, it } from 'vitest'
import { buildAmlTools, buildFloatTools, buildKycTools, buildRiskTools, buildStaffingTools } from '@/agents/mcp/tool'

const tools = [...buildKycTools(), ...buildAmlTools(), ...buildRiskTools(), ...buildFloatTools(), ...buildStaffingTools()]
const byName = new Map(tools.map((t) => [t.name, t]))
const call = async (name: string, args: Record<string, unknown>): Promise<Record<string, unknown>> => {
  const t = byName.get(name)
  if (!t) throw new Error(`no tool ${name}`)
  const out = (await t.handler(args, {} as never)) as { content: { text: string }[] }
  return JSON.parse(out.content[0]!.text) as Record<string, unknown>
}

describe('mcp/compliance — the atoms reach the surface', () => {
  it('registers a tool for each atom that had none', () => {
    expect([...byName.keys()].sort()).toEqual([
      'erpax.aml.report',
      'erpax.float.reconcile',
      'erpax.kyc.diligence',
      'erpax.risk.concentration',
      'erpax.staffing.position',
    ])
  })

  it('every tool declares parameters and a description', () => {
    for (const t of tools) {
      expect(typeof t.description).toBe('string')
      expect(t.description.length).toBeGreaterThan(40)
      expect(Object.keys(t.parameters).length).toBeGreaterThan(0)
    }
  })
})

describe('mcp/compliance — the refusals survive the crossing', () => {
  it('kyc: enhanced dominates over the wire, as it does in the atom', async () => {
    const r = await call('erpax.kyc.diligence', { politicallyExposed: true, lowRiskProduct: true })
    expect(r.level).toBe('enhanced')
    expect(r.diligenceRequired).toBe(true)
  })

  it('kyc: names the missing evidence rather than a bare verdict', async () => {
    const r = await call('erpax.kyc.diligence', { ongoingRelationship: true, evidenceProduced: ['identity'] })
    expect(r.level).toBe('standard')
    expect(r.evidenceMissing).toEqual(['address', 'beneficial-owner', 'purpose'])
    expect(r.complete).toBe(false)
  })

  it('aml: a NONE verdict carries its boundary across the wire', async () => {
    const r = await call('erpax.aml.report', { movements: [{ amount: 40, at: 1 }], threshold: 10000 })
    expect(r.reportOwed).toBe('none')
    expect(String(r.boundary)).toContain('NOT a finding')
  })

  it('aml: structuring reports suspicious and holds the movement', async () => {
    const r = await call('erpax.aml.report', {
      movements: [{ amount: 9500, at: 0 }, { amount: 9500, at: 3600000 }],
      threshold: 10000,
    })
    expect(r.reportOwed).toBe('suspicious')
    expect(r.holdBeforeExecuting).toBe(true)
  })

  it('risk: aggregates connected clients BEFORE testing, over the wire', async () => {
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

  it('float: the total is derived from the count — no total can be supplied', async () => {
    const t = byName.get('erpax.float.reconcile')!
    expect(Object.keys(t.parameters)).not.toContain('total')
    const r = await call('erpax.float.reconcile', {
      opening: 10000,
      movements: [{ amount: 5000 }],
      counted: { 10000: 1, 5000: 1 },
      units: [10000, 5000],
    })
    expect(r.state).toBe('balanced')
    expect(r.counted).toBe(15000)
  })

  it('float: an illegal unit voids the count even when it totals right', async () => {
    const r = await call('erpax.float.reconcile', {
      opening: 2500,
      movements: [],
      counted: { 2500: 1 },
      units: [10000, 5000],
    })
    expect(r.variance).toBe(0)
    expect(r.illegal).toEqual([2500])
  })

  it('staffing: two inputs, five derived faces', async () => {
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
