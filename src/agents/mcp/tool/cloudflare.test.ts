/**
 * The Cloudflare MCP tools route every binding op through erpaxMediator (the
 * documented plugin entrypoint), which installs defaultAuthorize. After the
 * mediator was hardened to FAIL-CLOSED, a request without an authenticated user
 * must be DENIED before the binding is touched; an authenticated request passes
 * authorization and proceeds to the binding.
 *
 * @standard ISO 27001 A.9.4.1 access-control-to-information (fail-closed authz)
 * @audit Conservation Law 38 mcp-tool-standardization
 */
import { describe, it, expect } from 'vitest'
import { buildCloudflareTools } from './cloudflare'

const vq = buildCloudflareTools().find((t) => t.name === 'erpax.cloudflare.vectorizeQuery')!

// Minimal Workers-runtime mock: VECTORIZE_DOCS.query is only reached AFTER authz passes;
// payload.create stubs the audit-write so the success path is silent.
const env = { VECTORIZE_DOCS: { query: async () => ({ matches: [] as unknown[] }) } }
const payload = { create: async () => ({}) }
const authedUser = { id: 'u1', tenants: [{ tenant: 't1' }], roles: ['admin'] }

describe('mcp cloudflare tools — fail-closed authorization via erpaxMediator', () => {
  it('DENIES an unauthenticated request (no user → defaultAuthorize throws before the binding)', async () => {
    const req = { env, user: undefined, payload } as never
    await expect(vq.handler({ vector: [0.1, 0.2] }, req)).rejects.toThrow(/unauthenticated|blocked|denied/i)
  })

  it('AUTHORIZES an authenticated request — it proceeds to the binding', async () => {
    const req = { env, user: authedUser, payload } as never
    const res = await vq.handler({ vector: [0.1, 0.2] }, req)
    // It resolved past authorization to the binding (which returned an empty match set) —
    // a tool-result, not a thrown deny.
    expect(res).toHaveProperty('content')
  })
})
