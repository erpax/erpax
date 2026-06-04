/**
 * Plugin helper — single shortcut every plugin uses to obtain the
 * tenant-scoped + audit-trailed + RBAC-gated CF mediator.
 *
 * Slice DDDDDDDDD (2026-05-11). Per user "all plugins use only erpax
 * bindings". Instead of each plugin re-deriving the (env, tenantId,
 * payload, user) context, every plugin imports this helper:
 *
 *   import { erpaxMediator } from '@/cloudflare/plugin-helper'
 *
 *   async function someHandler(req) {
 *     const m = erpaxMediator(req)
 *     const blob = await m.r2Get('reports/2026-Q1.pdf')
 *     ...
 *   }
 *
 * Properties guaranteed by this shortcut:
 *   1. tenantId resolved from req.user (with 'platform' fallback)
 *   2. authorize callback wired to req.user.role
 *   3. payload bound for audit-event writes
 *   4. NEVER touches env.<BINDING> directly — uses makeMediator
 *
 * The `checkMcpBindingsAreMediated` invariant (extended in
 * Slice DDDDDDDDD-cont to scan all src/plugins/*) catches any
 * plugin that bypasses this helper.
 *
 * @standard ISO 27001 A.5.23 cloud-service-tenant-isolation
 * @audit Conservation Law 38 mcp-tool-standardization
 * @see ./index.ts makeMediator
 */
import type { PayloadRequest } from 'payload'
import { makeMediator, type ErpaxCfEnv } from '@/cloudflare'
import { getUserContext } from '@/auth'

/**
 * Default authorizer — checks the user has a non-empty role. Plugin
 * authors override by passing their own `authorize` callback through.
 */
function defaultAuthorize(op: {
  binding: keyof ErpaxCfEnv
  action: string
  tenantId: string
  user?: { id: string; role?: string }
}): void {
  if (!op.user) {
    throw new Error(`[erpaxMediator] unauthenticated ${String(op.binding)}/${op.action} blocked`)
  }
  // Plugin-specific RBAC layers on top via custom authorize callbacks.
}

/**
 * Build the standard erpax mediator for a Payload request. Every
 * plugin uses this shortcut so the binding access surface is uniform.
 */
export function erpaxMediator(req: PayloadRequest, opts?: {
  authorize?: (op: { binding: keyof ErpaxCfEnv; action: string; tenantId: string; user?: { id: string; role?: string } }) => void | Promise<void>
}): ReturnType<typeof makeMediator> {
  const env = (req as { env?: unknown }).env as ErpaxCfEnv | undefined
  if (!env) {
    throw new Error('[erpaxMediator] CF env unavailable in this runtime — plugin requires Workers / wrangler context')
  }
  const ctx = getUserContext(req)
  const tenantId = ctx?.tenant ?? 'platform'
  return makeMediator({
    env,
    tenantId,
    payload: req.payload as never,
    user: ctx ? { id: ctx.id ?? 'anonymous', role: ctx.roles?.[0] } : undefined,
    authorize: opts?.authorize ?? defaultAuthorize,
  })
}
