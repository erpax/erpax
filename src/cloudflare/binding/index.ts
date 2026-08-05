/**
 * cloudflare/binding — mediator framework for tenant-scoped binding access.
 *
 * Per spec Slice SSSSSSSS (2026-05-11): every binding access in MCP handlers
 * MUST flow through one of these mediator wrappers — never `env.<BINDING>` directly.
 */

import type { MediatorContext as BaseContext, MediatorAuthorizer as BaseAuthorizer } from '../index'
import { auditBindingCall } from './audit'

export type MediatorContext = BaseContext
export type MediatorAuthorizer = BaseAuthorizer

/**
 * Enforce authorization on a binding op — FAIL-CLOSED.
 *
 * Denies when no authorizer is installed, ensuring the only way to touch a binding
 * is to have explicitly wired an authorizer.
 */
export async function enforceAuthorized(
  ctx: MediatorContext,
  op: { binding: string; action: string; tenantId: string; user?: { id: string; role?: string } },
): Promise<void> {
  if (!ctx.authorize) {
    throw new Error(
      `[cloudflare-mediator] DENIED ${op.binding}/${op.action} — no authorizer installed. ` +
      `A MediatorAuthorizer MUST be supplied; binding access cannot proceed un-gated (fail-closed).`,
    )
  }
  await ctx.authorize(op)
}

/**
 * Audit-trail one mediator call. Never swallows failures silently.
 */
export async function auditBindingCall(
  ctx: MediatorContext,
  binding: string,
  action: string,
  detail: Record<string, unknown>,
): Promise<void> {
  if (!ctx.payload) {
    reportAuditDrop({ binding, action, tenantId: ctx.tenantId, reason: 'no-payload-sink' })
    return
  }
  try {
    await ctx.payload.create({
      collection: 'audit-events',
      data: {
        eventType: `cf:${binding.toLowerCase()}:${action}`,
        tenant: ctx.tenantId,
        aggregateType: 'order' as never,
        aggregateId: 'binding-call',
        payload: { binding, action, ...detail },
        userId: ctx.user?.id ?? 'system',
      },
    })
  } catch (err) {
    reportAuditDrop({
      binding,
      action,
      tenantId: ctx.tenantId,
      reason: 'audit-write-failed',
      error: err,
    })
  }
}

/**
 * Surface a dropped audit receipt. NEVER swallows it silently.
 */
export function reportAuditDrop(info: {
  binding: string
  action: string
  tenantId: string
  reason: 'no-payload-sink' | 'audit-write-failed'
  error?: unknown
}): void {
  const msg =
    `[cloudflare-mediator] AUDIT RECEIPT DROPPED — binding=${info.binding} ` +
    `action=${info.action} tenant=${info.tenantId} reason=${info.reason}` +
    (info.error !== undefined ? ` error=${String((info.error as { message?: unknown })?.message ?? info.error)}` : '')
  try {
    console.warn(msg)
  } catch {
    /* console unavailable */
  }
}

/**
 * Convenience builder for MCP handlers.
 *
 * Usage:
 *   const m = makeMediator({ env: req.env, tenantId, payload: req.payload, user: req.user })
 *   await m.kvPut('cache:key', JSON.stringify(value))
 */
export function makeMediator(ctx: MediatorContext) {
  // Delegates to storage for the actual implementations
  return {
    enforceAuthorized: (op: any) => enforceAuthorized(ctx, op),
    auditBindingCall: (binding: string, action: string, detail: Record<string, unknown>) =>
      auditBindingCall(ctx, binding, action, detail),
  }
}
