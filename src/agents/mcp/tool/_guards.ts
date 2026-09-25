/**
 * Tenant guards for MCP tool handlers — Slice BBBBBBBBBB-cut3 (2026-05-11). See SKILL.md.
 *
 * @standard ISO 27001 A.5.10 access-control-policy
 * @standard ISO 27002 §5.4 segregation-of-duties (per-tenant boundary)
 * @standard NIST SP 800-162 ABAC
 * @audit Conservation Law 58 uuid-self-protection (tenant-scope branch)
 */
import type { PayloadRequest } from 'payload'
import { actorFromRequest, mcpAdminMutateVerdict, mcpTenantVerdict } from '@/access'

/** Assert that the caller's authenticated tenant equals the claimed tenantId. Super-admin bypasses. See SKILL.md. */
export function assertTenantMatch(claimedTenantId: string, req: PayloadRequest): void {
  const v = mcpTenantVerdict(actorFromRequest(req), claimedTenantId)
  if (!v.allowed) {
    throw new Error(`tenant guard (Slice BBBBBBBBBB-cut3): ${sanitize(v.reason ?? 'denied')}`)
  }
}

/** Tenant guard PLUS an admin-role requirement. Used for state-mutating tools that persist rows (share.grant, share.revoke, audit.writeEvent). See SKILL.md. */
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
 * Slice IIIIIIIIII (2026-05-11) — wrap an MCP tool array with the tenant + admin guards. See SKILL.md.
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
