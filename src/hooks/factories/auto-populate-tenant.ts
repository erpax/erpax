/**
 * Auto-populate Tenant Hook Factory
 *
 * Factory pattern: returns collection-specific hook.
 * REPLACES inline `autoPopulateTenant` with typed, collection-aware version.
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 § 5.15 access-control
 * @audit ISO-19011:2018 audit-trail before-validate-hooks
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 */

import type { CollectionBeforeValidateHook } from 'payload'
import { getTenantContext } from '@/plugins/auth/context'

/**
 * Create auto-populate tenant hook for a collection.
 *
 * Derives tenant from `req.user.tenants[0]?.tenant` and sets on document.
 * If user has no tenant, hook throws error (caught by Payload validation).
 *
 * @param collectionSlug Payload collection slug (inferred at compile time)
 * @returns Hook that auto-populates tenant field
 */
export const createAutoPopulateTenantHook = <
  TSlug extends string = string
>(): CollectionBeforeValidateHook<TSlug> =>
  async ({ data, req }) => {
    if (!req.user || !data) return data

    try {
      const ctx = getTenantContext(req)
      return { ...data, tenant: ctx.tenantId }
    } catch (err) {
      // getTenantContext throws if user has no tenant
      throw err
    }
  }
