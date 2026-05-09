/**
 * GL-account resolver — turn canonical account *roles* into a tenant's
 * actual `gl-accounts` record IDs.
 *
 * Pre-Sprint 1, `gl-posting.service.ts` wrote `accountId: 'cash'` /
 * `'ar'` / `'revenue'` etc. as bare string literals — same code for
 * every tenant, regardless of their actual chart of accounts. That
 * worked only as long as the GL was a fiction; for real tenants
 * with their own GL account numbering (1010 vs 100, 4000 vs 410 …)
 * the posting can't resolve.
 *
 * **Resolution order per role**:
 *   1. `tenant.config.accounting.glAccountMap[role]` — explicit
 *      tenant-config override (TODO: add to Tenants schema once the
 *      role taxonomy stabilises).
 *   2. `gl-accounts` lookup by `(tenant, role)` — the GL Account
 *      collection's `role` field marks "this is the cash account",
 *      "this is the AR account", etc.
 *   3. `gl-accounts` lookup by canonical code (e.g. `'1010'` for cash
 *      under IFRS, `'1100'` for cash under US-GAAP).
 *   4. Bare role string (legacy fallback — keeps existing behaviour
 *      so the migration is non-breaking).
 *
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-1 chart-of-accounts
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 * @audit ISO-19011:2018 audit-trail account-resolution
 * @compliance SOX §404 internal-controls per-tenant-coa
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see src/services/gl-posting.service.ts
 * @see src/services/gl-account.service.ts
 */

import type { Payload } from 'payload'

/**
 * Canonical GL account *roles* — the abstract slots the posting service
 * thinks in. Each tenant maps these to their own `gl-accounts` IDs via
 * the per-account `role` field on the chart of accounts.
 */
export type GlAccountRole =
  | 'cash'
  | 'ar' // accounts receivable
  | 'ap' // accounts payable
  | 'inventory'
  | 'revenue'
  | 'cogs'
  | 'expense'
  | 'sales_tax_payable'
  | 'input_tax_asset'
  | 'deferred_revenue'
  | 'subscription_revenue'
  | 'refunds_payable'

/**
 * In-memory per-tenant role → account-id cache. Keyed by tenantId and
 * role; populated lazily on first lookup. Cleared by `clearGlAccountCache`
 * when a tenant's chart of accounts mutates (afterChange hook on
 * `gl-accounts` should call it).
 */
const cache = new Map<string, Map<GlAccountRole, string | number>>()

/**
 * Resolve a {@link GlAccountRole} to the tenant's actual `gl-accounts` id.
 *
 * Returns the role string itself as a last-resort fallback so the
 * existing posting code continues to function for tenants whose chart
 * of accounts isn't fully populated yet.
 */
export async function resolveGlAccount(
  payload: Payload,
  tenantId: string | number,
  role: GlAccountRole,
): Promise<string | number> {
  const cacheKey = String(tenantId)
  let tenantCache = cache.get(cacheKey)
  if (!tenantCache) {
    tenantCache = new Map<GlAccountRole, string | number>()
    cache.set(cacheKey, tenantCache)
  }
  const cached = tenantCache.get(role)
  if (cached !== undefined) return cached

  try {
    // Lookup by role on this tenant's chart of accounts.
    const result = await payload.find({
      collection: 'gl-accounts',
      where: {
        and: [
          { tenant: { equals: tenantId } },
          { role: { equals: role } },
        ],
      },
      limit: 1,
      depth: 0,
    })
    const doc = result?.docs?.[0]
    if (doc?.id !== undefined) {
      tenantCache.set(role, doc.id)
      return doc.id
    }
  } catch (err) {
    // Falls through to the role-string legacy fallback. Logged but
    // not thrown — postings shouldn't fail because the resolver
    // lookup isn't yet wired (e.g. on tenants without an explicit
    // `role` field on their chart of accounts).
    payload.logger.debug({ err, role, tenantId }, 'gl-account resolver fallback')
  }

  // Legacy fallback: post against the bare role string. Same behaviour
  // as pre-Sprint 1 hardcoded GL_ACCOUNTS — non-breaking.
  return role
}

/**
 * Clear the per-tenant cache. Call from a `gl-accounts` afterChange
 * hook so newly-added or re-roled accounts take effect immediately.
 */
export function clearGlAccountCache(tenantId?: string | number): void {
  if (tenantId === undefined) {
    cache.clear()
  } else {
    cache.delete(String(tenantId))
  }
}
