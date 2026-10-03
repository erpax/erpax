import { describe, expect, it } from 'vitest'
import { z } from 'zod'
import { customToolsEnabled, gatewayTools, wireName, WIRE_NAME, type CorpusTool } from './index'

const tool = (name: string): CorpusTool => ({
  name,
  description: `d ${name}`,
  parameters: { x: z.string().optional() },
  handler: async (args) => ({ content: [{ text: JSON.stringify(args), type: 'text' }] }),
})

describe('plugins/mcp/tools — the families handed to the gateway', () => {
  it('a dotted corpus address crosses the wire with underscores, and the wire grammar is the arbiter', () => {
    expect(wireName('erpax.gate.coil')).toBe('erpax_gate_coil')
    expect(WIRE_NAME.test('erpax.gate.coil')).toBe(false)
    expect(() => wireName('erpax.gate coil')).toThrow(/not expressible/)
  })

  it('full mode carries the families; the lean seed only by opt-in; an explicit 0 refuses', () => {
    expect(customToolsEnabled({ ERPAX_MCP_SEED: '0' })).toBe(true)
    expect(customToolsEnabled({ NODE_ENV: 'production' })).toBe(false)
    expect(customToolsEnabled({ NODE_ENV: 'production', ERPAX_MCP_TOOLS: '1' })).toBe(true)
    expect(customToolsEnabled({ ERPAX_MCP_SEED: '0', ERPAX_MCP_TOOLS: '0' })).toBe(false)
  })

  it('the gateway shape keeps the dotted address in the description and widens the handler to the plugin call', async () => {
    const [g] = gatewayTools([tool('erpax.frontier.next')], { ERPAX_MCP_SEED: '0' })
    expect(g!.name).toBe('erpax_frontier_next')
    expect(g!.description.startsWith('[erpax.frontier.next] ')).toBe(true)
    expect(await g!.handler({ x: '1' }, {} as never, undefined)).toEqual({ content: [{ text: '{"x":"1"}', type: 'text' }] })
    expect(gatewayTools([tool('erpax.frontier.next')], { NODE_ENV: 'production' })).toEqual([])
  })

  it('two addresses collapsing to one wire name are refused, never silently shadowed', () => {
    expect(() => gatewayTools([tool('erpax.a.b'), tool('erpax.a_b')], { ERPAX_MCP_SEED: '0' })).toThrow(/collision/)
  })

  it('every live corpus tool is expressible on the wire — the surface the corpus describes is the surface a client sees', async () => {
    const { erpaxMcpTools } = await import('@/agent/mcp-surface')
    const live = erpaxMcpTools()
    const g = gatewayTools(live, { ERPAX_MCP_SEED: '0' })
    expect(g.length).toBe(live.length)
    expect(g.length).toBeGreaterThan(0)
    for (const t of g) expect(t.name).toMatch(WIRE_NAME)
    for (const area of ['frontier', 'gate', 'family', 'outward', 'novelty']) expect(g.some((t) => t.name.startsWith(`erpax_${area}_`))).toBe(true)
  }, 120_000)
})
