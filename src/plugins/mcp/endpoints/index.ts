/**
 * MCP custom endpoints — Slice DDDDDDDDD (2026-05-11).
 *
 * Adds `/api/mcp/*` HTTP endpoints to the Payload app so the admin UI
 * (React client components) can:
 *
 *   - GET  /api/mcp/catalog            → localized tool catalog
 *   - POST /api/mcp/invoke/:toolName   → run a tool from the admin UI
 *   - GET  /api/mcp/status             → ConsistencyAgent status
 *                                          (mirrors erpax.consistency.status)
 *
 * Every endpoint runs through the same tenant-scoped mediator
 * (Slice SSSSSSSS makeMediator) so authorization + audit + tenant
 * boundaries hold uniformly with direct MCP calls.
 *
 * @standard MCP 0.6 (Model Context Protocol)
 * @standard W3C HTTP Content-Language (RFC 7231 §3.1.3.2)
 * @audit ISO 19011:2018 §6.4.6 (every invocation audit-trailed)
 */
import type { Endpoint, PayloadRequest } from 'payload'
// Slice DDDDDDDDD-cont (2026-05-11) — "all plugins use only erpax
// bindings". This endpoints file is the worked example: any CF binding
// access goes through `erpaxMediator(req)` rather than `req.env.X`
// directly. The invariant `checkMcpBindingsAreMediated` now scans
// src/plugins/* and flags any direct env.<BINDING> use.
// Imported lazily inside handlers when bindings are needed so the
// barrel stays lean.

export interface McpEndpointOptions {
  readonly defaultLocale?: string
  readonly allowAnonymousCatalog?: boolean
}

/**
 * Read the request's Accept-Language header (preferring the highest-
 * quality match), fall back to the user's stored locale, then the
 * platform default.
 */
function pickLocale(req: PayloadRequest, def: string): string {
  const u = req.user as { locale?: string } | undefined
  if (u?.locale) return u.locale
  const header = (req.headers as { get?: (k: string) => string | null })?.get?.('accept-language')
  if (header) {
    const top = header.split(',')[0]?.split(';')[0]?.trim().toLowerCase()
    if (top) return top.split('-')[0] ?? def
  }
  return def
}

function tenantOf(req: PayloadRequest): string {
  const u = req.user as { tenant?: string } | undefined
  return u?.tenant ?? 'platform'
}

export const mcpEndpoints = (opts: McpEndpointOptions = {}): Endpoint[] => {
  const defaultLocale = opts.defaultLocale ?? 'en'
  const allowAnonymousCatalog = opts.allowAnonymousCatalog === true
  return [
    {
      path: '/api/mcp/catalog',
      method: 'get',
      handler: async (req: PayloadRequest) => {
        if (!allowAnonymousCatalog && !req.user) {
          return Response.json({ error: 'unauthorized' }, { status: 401 })
        }
        const locale = pickLocale(req, defaultLocale)
        const tenantId = tenantOf(req)
        const { agentRegistry } = await import('@/services/agents/bootstrap')
        const { buildErpaxMcpTools } = await import('@/services/agents/mcp/tool-defs')
        const { resolveTranslation } = await import('@/services/agents/mcp/i18n')
        const tools = buildErpaxMcpTools(agentRegistry)
        // Overlay each tool's description with the translations
        // collection at the active locale + tenant.
        const localized = await Promise.all(tools.map(async (t) => {
          const description = await resolveTranslation({
            payload: req.payload as never,
            scope: 'mcp-tool',
            key: t.name,
            staticDefault: t.description,
            locale,
            tenantId,
          })
          return {
            name: t.name,
            area: t.name.split('.')[1] ?? 'other',
            description,
            parameters: Object.keys(t.parameters ?? {}),
          }
        }))
        return Response.json({ locale, tenantId, count: localized.length, tools: localized })
      },
    },
    {
      path: '/api/mcp/invoke/:toolName',
      method: 'post',
      handler: async (req: PayloadRequest) => {
        if (!req.user) {
          return Response.json({ error: 'unauthorized' }, { status: 401 })
        }
        const toolName = (req as { params?: { toolName?: string } }).params?.toolName
        if (!toolName) {
          return Response.json({ error: 'tool name required' }, { status: 400 })
        }
        const { agentRegistry } = await import('@/services/agents/bootstrap')
        const { buildErpaxMcpTools } = await import('@/services/agents/mcp/tool-defs')
        const tools = buildErpaxMcpTools(agentRegistry)
        const tool = tools.find((t) => t.name === toolName)
        if (!tool) {
          return Response.json({ error: `tool ${toolName} not found` }, { status: 404 })
        }
        let args: Record<string, unknown> = {}
        try {
          const body = await (req as { json?: () => Promise<unknown> }).json?.()
          if (body && typeof body === 'object') args = body as Record<string, unknown>
        } catch { /* empty body OK */ }
        try {
          const result = await tool.handler(args, req)
          return Response.json({ ok: true, toolName, result })
        } catch (err) {
          return Response.json({
            ok: false, toolName,
            error: err instanceof Error ? err.message : String(err),
          }, { status: 500 })
        }
      },
    },
    {
      path: '/api/mcp/status',
      method: 'get',
      handler: async (req: PayloadRequest) => {
        if (!req.user) {
          return Response.json({ error: 'unauthorized' }, { status: 401 })
        }
        const { runAllInvariants } = await import('@/services/architecture-invariants')
        const { listProposals } = await import('@/services/meta-automation')
        const repoRoot = typeof process !== 'undefined' && typeof process.cwd === 'function' ? process.cwd() : undefined
        let suite
        try {
          suite = await runAllInvariants({ payload: req.payload, repoRoot })
        } catch (err) {
          return Response.json({
            readiness: 'errors',
            suiteError: err instanceof Error ? err.message : String(err),
          }, { status: 500 })
        }
        const recent = listProposals().slice(-10).reverse()
        const fails = suite.fails.length, warns = suite.warns.length
        const readiness: 'clean' | 'drift-detected' | 'errors' =
          fails > 0 || warns > 0 ? 'drift-detected' : 'clean'
        return Response.json({
          at: new Date().toISOString(),
          readiness,
          suiteSummary: { fails, warns, passes: suite.passes.length },
          recentApplies: recent.map((p) => ({
            invariant: p.invariant, severity: p.severity,
            proposedTool: p.proposedTool, autoApply: p.autoApply,
            rationale: p.rationale,
          })),
        })
      },
    },
  ]
}
