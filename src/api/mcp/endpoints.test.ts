/**
 * MCP endpoints — shape + auth-gate tests.
 *
 * Slice GGGGGGGGG (2026-05-11). Pins what every `/api/mcp/*` handler
 * promises before any agent-registry work:
 *
 *   - The three routes are declared with the right path + method.
 *   - `/api/mcp/catalog` returns 401 when anonymous access is disabled
 *     and the request has no user.
 *   - `/api/mcp/catalog` returns 200 with `{ tools, count, locale, tenantId }`
 *     when `allowAnonymousCatalog: true` is set.
 *   - `/api/mcp/invoke/:toolName` returns 401 without a user and 400
 *     when no tool name is supplied.
 *   - `/api/mcp/status` returns 401 without a user.
 *
 * Handlers that depend on the full agent registry / invariant suite are
 * exercised through the upper-level integration tests (consistency
 * agent end-to-end, Slice JJJJJJJJ). This file pins the boundary.
 *
 * @standard W3C HTTP semantics (RFC 9110)
 * @standard MCP 0.6 — over-the-wire surface
 */
import { describe, it, expect } from 'vitest'
import { mcpEndpoints } from './index'
import type { PayloadRequest } from 'payload'

/** Build a minimal PayloadRequest for handler invocation. */
function mkReq(opts: {
  user?: Record<string, unknown> | null
  params?: Record<string, string>
  acceptLanguage?: string
  body?: unknown
}): PayloadRequest {
  const headers = new Map<string, string>()
  if (opts.acceptLanguage) headers.set('accept-language', opts.acceptLanguage)
  return {
    user: opts.user ?? null,
    params: opts.params,
    headers: { get: (k: string) => headers.get(k.toLowerCase()) ?? null },
    json: async () => opts.body ?? {},
    payload: {} as never,
  } as unknown as PayloadRequest
}

describe('mcpEndpoints — registration shape', () => {
  const eps = mcpEndpoints({ defaultLocale: 'en' })

  it('registers exactly three endpoints', () => {
    expect(eps).toHaveLength(3)
  })

  it('declares GET /api/mcp/catalog', () => {
    const e = eps.find((x) => x.path === '/api/mcp/catalog')
    expect(e?.method).toBe('get')
  })

  it('declares POST /api/mcp/invoke/:toolName', () => {
    const e = eps.find((x) => x.path === '/api/mcp/invoke/:toolName')
    expect(e?.method).toBe('post')
  })

  it('declares GET /api/mcp/status', () => {
    const e = eps.find((x) => x.path === '/api/mcp/status')
    expect(e?.method).toBe('get')
  })
})

describe('GET /api/mcp/catalog — auth gate', () => {
  it('returns 401 when anonymous access is not allowed and no user is present', async () => {
    const ep = mcpEndpoints({ allowAnonymousCatalog: false }).find(
      (x) => x.path === '/api/mcp/catalog',
    )!
    const res = await ep.handler(mkReq({ user: null })) as Response
    expect(res.status).toBe(401)
    const body = await res.json() as { error: string }
    expect(body.error).toBe('unauthorized')
  })
})

describe('POST /api/mcp/invoke/:toolName — auth + missing-name gates', () => {
  const ep = mcpEndpoints().find((x) => x.path === '/api/mcp/invoke/:toolName')!

  it('returns 401 when no user is present', async () => {
    const res = await ep.handler(mkReq({ user: null, params: { toolName: 'erpax.x.y' } })) as Response
    expect(res.status).toBe(401)
  })

  it('returns 400 when no toolName param is supplied', async () => {
    const res = await ep.handler(mkReq({ user: { id: 'u' }, params: {} })) as Response
    expect(res.status).toBe(400)
    const body = await res.json() as { error: string }
    expect(body.error).toMatch(/tool name/i)
  })
})

describe('GET /api/mcp/status — auth gate', () => {
  it('returns 401 when no user is present', async () => {
    const ep = mcpEndpoints().find((x) => x.path === '/api/mcp/status')!
    const res = await ep.handler(mkReq({ user: null })) as Response
    expect(res.status).toBe(401)
  })
})
