/**
 * Public-read tenant ID cache — supports anonymous read across tenants flagged
 * `allowPublicRead = true`. TTL minimizes D1 row-reads on cold paths.
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.3 information-access-restriction
 * @rfc 9110 §13 caching
 * @compliance GDPR Art.5(1)(c) data-minimization
 * @see docs/STANDARDS.md §4.4
 */

import type { Payload } from 'payload'

type Cached = { ids: number[]; expiresAt: number }

let cached: Cached | null = null

/** Longer TTL ⇒ fewer D1 reads on anonymous traffic (D1 bills by rows read). */
const TTL_MS = 300_000

function normalizeTenantIds(rows: { id: unknown }[]): number[] {
  return rows
    .map((r) => (typeof r.id === 'number' ? r.id : Number(r.id)))
    .filter((id) => Number.isFinite(id))
}

/**
 * Tenant ids whose storefront/API may expose published content to anonymous callers.
 * Cached briefly — invalidate automatically via TTL when tenants toggle {@link Tenant.allowPublicRead}.
 */
export async function getAllowPublicReadTenantIds(payload: Payload): Promise<number[]> {
  const now = Date.now()
  if (cached && cached.expiresAt > now) {
    return cached.ids
  }

  const result = await payload.find({
    collection: 'tenants',
    depth: 0,
    limit: 500,
    overrideAccess: true,
    pagination: false,
    select: { id: true },
    where: {
      allowPublicRead: {
        equals: true,
      },
    },
  })

  const ids = normalizeTenantIds(result.docs as { id: unknown }[])
  cached = { expiresAt: now + TTL_MS, ids }
  return ids
}

/** For tests or admin flows after toggling allowPublicRead */
export function clearAllowPublicReadTenantIdsCache(): void {
  cached = null
}
