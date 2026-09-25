import { describe, expect, it } from 'vitest'
import { buildKycTools } from './index'

const tools = buildKycTools()
const byName = new Map(tools.map((t) => [t.name, t]))
const call = async (name: string, args: Record<string, unknown>): Promise<Record<string, unknown>> => {
  const t = byName.get(name)
  if (!t) throw new Error(`no tool ${name}`)
  const out = (await t.handler(args, {} as never)) as { content: { text: string }[] }
  return JSON.parse(out.content[0]!.text) as Record<string, unknown>
}

describe('mcp/tool/kyc', () => {
  it('carries the erpax.kyc.* prefix the barrel convention requires', () => {
    expect(tools.length).toBeGreaterThan(0)
    for (const t of tools) expect(t.name.startsWith('erpax.kyc.')).toBe(true)
  })

  it('every tool declares parameters and a description a caller can act on', () => {
    for (const t of tools) {
      expect(t.description.length).toBeGreaterThan(40)
      expect(Object.keys(t.parameters).length).toBeGreaterThan(0)
    }
  })

  it('enhanced dominates over the wire, as it does in the atom', async () => {
    const r = await call('erpax.kyc.diligence', { politicallyExposed: true, lowRiskProduct: true })
    expect(r.level).toBe('enhanced')
    expect(r.diligenceRequired).toBe(true)
  })

  it('names the missing evidence rather than returning a bare verdict', async () => {
    const r = await call('erpax.kyc.diligence', { ongoingRelationship: true, evidenceProduced: ['identity'] })
    expect(r.level).toBe('standard')
    expect(r.evidenceMissing).toEqual(['address', 'beneficial-owner', 'purpose'])
    expect(r.complete).toBe(false)
  })
})
