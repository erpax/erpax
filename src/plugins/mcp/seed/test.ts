import { describe, expect, it } from 'vitest'

import {
  MCP_GATEWAY_SEED_SLUGS,
  mcpCollectionsConfig,
  mcpExtraSlugs,
  mcpGlobalsConfig,
  mcpSeedCollectionSlugs,
  mcpSeedMode,
} from '@/plugins/mcp/seed'
import { SEED_COLLECTION_SLUGS } from '@/seed/slugs'
import { z } from 'zod'
import { customToolsEnabled, gatewayTools, wireName, WIRE_NAME, type CorpusTool } from '@/plugins/mcp/seed'

describe('plugins/mcp/seed — self-computable Worker surface', () => {
  it('production defaults to seed; ERPAX_MCP_SEED=0 restores full', () => {
    expect(mcpSeedMode({ NODE_ENV: 'production' })).toBe('seed')
    expect(mcpSeedMode({ NODE_ENV: 'production', ERPAX_MCP_SEED: '0' })).toBe('full')
    expect(mcpSeedMode({ NODE_ENV: 'development' })).toBe('full')
    expect(mcpSeedMode({ NODE_ENV: 'development', ERPAX_MCP_SEED: '1' })).toBe('seed')
  })

  it('seed slugs = gateway atoms by default (CMS opt-in)', () => {
    const slugs = mcpSeedCollectionSlugs({})
    for (const s of MCP_GATEWAY_SEED_SLUGS) expect(slugs).toContain(s)
    expect(slugs).not.toContain('pages')
    const withCms = mcpSeedCollectionSlugs({ ERPAX_MCP_INCLUDE_CMS: '1' })
    for (const s of SEED_COLLECTION_SLUGS) expect(withCms).toContain(s)
    expect(new Set(withCms).size).toBe(withCms.length)
  })

  it('ERPAX_MCP_EXTRA appends when registered', () => {
    expect(mcpExtraSlugs({ ERPAX_MCP_EXTRA: ' invoices , orders ' })).toEqual([
      'invoices',
      'orders',
    ])
    const cfg = mcpCollectionsConfig(
      [{ slug: 'users' }, { slug: 'invoices' }, { slug: 'pages' }],
      { NODE_ENV: 'production', ERPAX_MCP_EXTRA: 'invoices,missing' },
    )
    expect(cfg.invoices).toEqual({ enabled: true })
    expect(cfg.users).toEqual({ enabled: true })
    expect(cfg.pages).toBeUndefined()
    // 'missing' is deliberately NOT a CollectionSlug — the point of the assertion is that an
    // unregistered slug never appears, so it must be read off the record, not off the type.
    expect((cfg as Record<string, unknown>).missing).toBeUndefined()
  })

  it('full mode enables every registered slug; globals stay seed-derived', () => {
    const registered = [{ slug: 'a' }, { slug: 'b' }]
    const cfg = mcpCollectionsConfig(registered, { ERPAX_MCP_SEED: 'full' })
    expect(Object.keys(cfg).sort()).toEqual(['a', 'b'])
    expect(mcpGlobalsConfig({ ERPAX_MCP_SEED: 'full' })).toEqual({
      header: { enabled: true },
      footer: { enabled: true },
    })
    expect(mcpGlobalsConfig({ NODE_ENV: 'production' })).toEqual({
      header: { enabled: true },
      footer: { enabled: true },
    })
  })
})

const tool = (name: string): CorpusTool => ({
  name,
  description: `d ${name}`,
  parameters: { x: z.string().optional() },
  handler: async (args) => ({ content: [{ text: JSON.stringify(args), type: 'text' }] }),
})

describe('plugins/mcp/seed — the families handed to the gateway', () => {
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
