/**
 * Tenant guards for MCP tool handlers — Slice BBBBBBBBBB-cut3 (2026-05-11).
 *
 * Slice BBBBBBBBBB-cut1 wired six orphaned namespaces (kv / security /
 * share / format / governance / error + integrity-extensions) into the
 * live MCP surface. Those handlers accept a caller-asserted
 * `tenantId: z.string()` parameter without verifying it matches the
 * authenticated request, opening cross-tenant exploits:
 *
 *   - `erpax.share.grant`   — self-grant admin role on any tenant's targets
 *   - `erpax.share.revoke`  — DoS legitimate shares across tenant boundary
 *   - `erpax.audit.writeEvent` — forge chain-linked audit events into another tenant's trail (SOX §404 forgery)
 *   - `erpax.format.encode` — forge structured uuids with TAMPER_PROOF / SEALED capabilities never earned
 *   - `erpax.governance.*`  — declare self-governance for foreign entities
 *   - `erpax.error.*`       — manufacture ErrorUuids that federation peers trust by uuid equality
 *
 * This module provides two guards:
 *
 *   - `assertTenantMatch(args.tenantId, req)` — caller's authenticated
 *     tenant must equal the claimed tenantId. Super-admin bypasses.
 *     Unauthenticated context (no req.user — boot, cron, in-process
 *     agent runtime) is treated as trusted internal context.
 *
 *   - `assertAdminOnTenant(args.tenantId, req)` — additionally requires
 *     an admin role. Used for state-mutating tools.
 *
 * Handlers must call the appropriate guard at the TOP of the body,
 * before any service call. Failure throws — the in-process client
 * surfaces this as a tool error; the over-the-wire MCP layer
 * converts it into an MCP error response.
 *
 * @standard ISO 27001 A.5.10 access-control-policy
 * @standard ISO 27002 §5.4 segregation-of-duties (per-tenant boundary)
 * @standard NIST SP 800-162 ABAC
 * @audit Conservation Law 58 uuid-self-protection (tenant-scope branch)
 */
import type { PayloadRequest } from 'payload'
import { actorFromRequest, mcpAdminMutateVerdict, mcpTenantVerdict } from '@/access'

/**
 * Assert that the caller's authenticated tenant equals the claimed
 * tenantId. Super-admin bypasses. Internal context (no req.user) is
 * trusted and bypasses.
 *
 * Throws on mismatch — message includes both tenants for audit logs
 * but does NOT include any caller-supplied content (no log injection).
 */
export function assertTenantMatch(claimedTenantId: string, req: PayloadRequest): void {
  const v = mcpTenantVerdict(actorFromRequest(req), claimedTenantId)
  if (!v.allowed) {
    throw new Error(`tenant guard (Slice BBBBBBBBBB-cut3): ${sanitize(v.reason ?? 'denied')}`)
  }
}

/**
 * Tenant guard PLUS an admin-role requirement. Used for state-mutating
 * tools that persist rows (share.grant, share.revoke, audit.writeEvent).
 *
 * Bypasses on internal context (no req.user). Super-admin always
 * passes. Otherwise the caller must hold one of: admin, tenant-admin,
 * or auditor (for audit.writeEvent specifically — auditors write
 * audit events as part of their declared surface).
 */
export function assertAdminOnTenant(claimedTenantId: string, req: PayloadRequest): void {
  const v = mcpAdminMutateVerdict(actorFromRequest(req), claimedTenantId)
  if (!v.allowed) {
    throw new Error(`tenant guard (Slice BBBBBBBBBB-cut3): ${sanitize(v.reason ?? 'denied')}`)
  }
}

/** Strip non-printable + length-cap for safe inclusion in error messages. */
function sanitize(s: string): string {
  return String(s).replace(/[^\w.:-]/g, '?').slice(0, 64)
}

/**
 * Slice IIIIIIIIII (2026-05-11) — wrap an MCP tool array with the
 * tenant + admin guards. Extracted from `buildErpaxMcpTools` so the
 * wrapping policy is unit-testable in isolation.
 *
 * Behaviour:
 *
 *   - Tools whose `parameters` object lacks a `tenantId` key are
 *     returned unchanged.
 *   - Tools whose `name` is in `mutatingTools` get `assertAdminOnTenant`.
 *   - All other tenantId-bearing tools get `assertTenantMatch`.
 *   - Optional `tenantId` (empty string / missing) skips the guard so
 *     each tool's own opt-in policy applies.
 *
 * The wrapped tool preserves `name`, `description`, and `parameters`
 * verbatim — every readiness / standardization invariant sees an
 * unchanged surface.
 *
 * @standard ISO 27001 A.5.10 access-control-policy
 */
export interface WrappableTool {
  readonly name: string
  readonly description: string
  readonly parameters: Record<string, unknown>
  readonly handler: (args: Record<string, unknown>, req: PayloadRequest) => Promise<{ content: ReadonlyArray<{ readonly type: 'text'; readonly text: string }> }>
}

export function wrapToolsWithTenantGuard<T extends WrappableTool>(
  tools: ReadonlyArray<T>,
  options: { readonly mutatingTools: ReadonlySet<string> },
): T[] {
  const mutating = options.mutatingTools
  return tools.map((t) => {
    if (!('tenantId' in t.parameters)) return t
    const orig = t.handler.bind(t)
    const guard = mutating.has(t.name) ? assertAdminOnTenant : assertTenantMatch
    const wrapped: WrappableTool = {
      name: t.name,
      description: t.description,
      parameters: t.parameters,
      async handler(args, req) {
        const tid = args.tenantId
        if (typeof tid === 'string' && tid.length > 0) {
          guard(tid, req)
        }
        return orig(args, req)
      },
    }
    return wrapped as T
  })
}
