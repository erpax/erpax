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
    expect(cfg.missing).toBeUndefined()
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
