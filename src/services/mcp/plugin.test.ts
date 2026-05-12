/**
 * mcpPlugin() wiring tests — Slice GGGGGGGGG (2026-05-11).
 *
 * Pins the Payload `Plugin` contract: the factory returns a function
 * that takes the incoming Payload config and returns a new config
 * with:
 *
 *   - `McpSettingsGlobal` added to `globals` (Slice DDDDDDDDD).
 *   - The three `/api/mcp/*` endpoints added to `endpoints` (Slice DDDDDDDDD).
 *   - `<McpNavLinks/>` injected into `admin.components.beforeNavLinks`.
 *   - The four admin views registered under `admin.components.views`
 *     (Slice FFFFFFFFF-cut4) with the right `path` + `Component`
 *     reference strings:
 *       /mcp/tools         → ToolBrowser
 *       /mcp/invoke        → ToolInvoker
 *       /mcp/status        → ConsistencyStatus
 *       /mcp/translations  → TranslationsEditor
 *
 *   - When `enableAdminUi: false`, none of the admin additions appear.
 *
 * @standard ISO/IEC 25010:2023 §5.7 modularity
 * @audit Conservation Law 23 erpax-observes-self (admin UI is part of the corpus)
 */
import { describe, it, expect } from 'vitest'
import type { Config } from 'payload'
import { mcpPlugin } from './index'

/** Minimal incoming Config skeleton — Payload tolerates partials at plugin time. */
function baseConfig(): Config {
  return {
    collections: [],
    globals: [],
    endpoints: [],
    secret: 'test',
    admin: { components: {} },
  } as unknown as Config
}

describe('mcpPlugin()', () => {
  it('returns a function that transforms a Payload Config', () => {
    const plugin = mcpPlugin()
    expect(typeof plugin).toBe('function')
  })

  it('appends McpSettingsGlobal to globals (does not replace existing globals)', () => {
    const existing = { slug: 'existing-global' } as unknown
    const cfg = baseConfig()
    cfg.globals = [existing as never]
    const out = mcpPlugin()(cfg) as Config
    expect(out.globals!.length).toBe(2)
    expect(out.globals![0]).toBe(existing)
    // The added global has slug 'mcp-settings'.
    const added = out.globals![1] as unknown as { slug: string }
    expect(added.slug).toBe('mcp-settings')
  })

  it('appends three MCP endpoints to endpoints', () => {
    const out = mcpPlugin()(baseConfig()) as Config
    const paths = (out.endpoints ?? []).map((e: { path: string }) => e.path)
    expect(paths).toContain('/api/mcp/catalog')
    expect(paths).toContain('/api/mcp/invoke/:toolName')
    expect(paths).toContain('/api/mcp/status')
  })

  it('injects <McpNavLinks/> into admin.components.beforeNavLinks', () => {
    const out = mcpPlugin()(baseConfig()) as Config
    const nav = out.admin?.components?.beforeNavLinks ?? []
    expect(nav.some((n) => typeof n === 'string' && n.includes('McpNavLinks'))).toBe(true)
  })

  it('registers all four admin views with correct paths', () => {
    const out = mcpPlugin()(baseConfig()) as Config
    const views = out.admin?.components?.views as Record<string, { Component: string; path: string }>
    expect(views).toBeDefined()
    const byPath = Object.fromEntries(
      Object.values(views).map((v) => [v.path, v.Component]),
    )
    expect(byPath['/mcp/tools']).toMatch(/ToolBrowser/)
    expect(byPath['/mcp/invoke']).toMatch(/ToolInvoker/)
    expect(byPath['/mcp/status']).toMatch(/ConsistencyStatus/)
    expect(byPath['/mcp/translations']).toMatch(/TranslationsEditor/)
  })

  it('still registers globals + endpoints when enableAdminUi is false but skips admin UI additions', () => {
    const out = mcpPlugin({ enableAdminUi: false })(baseConfig()) as Config
    expect(out.globals!.some((g: { slug: string }) => g.slug === 'mcp-settings')).toBe(true)
    expect((out.endpoints ?? []).map((e: { path: string }) => e.path)).toContain('/api/mcp/catalog')
    // admin.components.views should NOT contain MCP entries (they live behind enableAdminUi).
    const views = out.admin?.components?.views as Record<string, { path: string }> | undefined
    if (views) {
      const mcpPaths = Object.values(views).map((v) => v.path).filter((p) => p?.startsWith('/mcp/'))
      expect(mcpPaths).toHaveLength(0)
    }
  })

  it('does not mutate the incoming config (returns a new object)', () => {
    const cfg = baseConfig()
    const before = JSON.stringify({
      globalsLen: (cfg.globals ?? []).length,
      endpointsLen: (cfg.endpoints ?? []).length,
    })
    mcpPlugin()(cfg)
    const after = JSON.stringify({
      globalsLen: (cfg.globals ?? []).length,
      endpointsLen: (cfg.endpoints ?? []).length,
    })
    expect(before).toBe(after)
  })
})
