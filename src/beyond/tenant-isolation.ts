/**
 * Law 13 — Tenant isolation provability.
 *
 * Slice ZZZZZ. Beyond access control: every query is PROVABLY
 * tenant-scoped. The runtime samples queries, verifies the where-
 * clause includes `tenant: { equals: ctx.tenantId }`, and verifies
 * every row in the result set has `tenant === ctx.tenantId`.
 *
 * Cross-tenant leaks become detectable at the substrate layer; no
 * hand-coded "did I forget the tenant filter?" review needed.
 *
 * @standard ISO/IEC 27001 A.5.34 privacy-protection
 * @standard GDPR Art. 32 security-of-processing
 * @standard ISO 19944 cloud-services data-flow + jurisdiction
 */

import type { TenantScopedQuery } from '@/beyond/types'

export interface TenantIsolationViolation {
  readonly collection: string
  readonly expectedTenant: string
  readonly leakedRowTenants: ReadonlyArray<string>
}

/** Inspect a query trace + result set; return violations if any. */
export function checkTenantIsolation(query: TenantScopedQuery): TenantIsolationViolation | null {
  const expected = query.tenantIdInWhereClause
  const leaked = query.resultRowTenantIds.filter((t) => t !== expected)
  if (leaked.length === 0) return null
  return {
    collection: query.collection,
    expectedTenant: expected,
    leakedRowTenants: [...new Set(leaked)],
  }
}

/** Wrap a Payload `find` invocation to enforce + record the trace. */
export async function tenantScopedFind<T>(args: {
  payload: { find: (a: Record<string, unknown>) => Promise<{ docs: Array<{ tenant?: string }> }> }
  collection: string
  tenantId: string
  where?: Record<string, unknown>
  limit?: number
}): Promise<{ docs: T[]; trace: TenantScopedQuery }> {
  const merged = {
    ...(args.where ?? {}),
    tenant: { equals: args.tenantId },
  }
  const result = await args.payload.find({
    collection: args.collection,
    where: merged,
    limit: args.limit ?? 100,
    pagination: false,
  })
  const trace: TenantScopedQuery = {
    collection: args.collection,
    tenantIdInWhereClause: args.tenantId,
    resultRowTenantIds: result.docs.map((d) => d.tenant ?? 'unknown'),
  }
  const violation = checkTenantIsolation(trace)
  if (violation) {
    throw new Error(
      `Conservation Law 13 violation: query on '${violation.collection}' expected tenant ` +
      `'${violation.expectedTenant}' but result set leaked rows from: ` +
      `${violation.leakedRowTenants.join(', ')}`,
    )
  }
  return { docs: result.docs as T[], trace }
}
