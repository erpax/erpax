/**
 * Auto-populate the multi-tenant `tenant` field from the request user.
 *
 * Slice CCC: derives `data.tenant` from the canonical
 * `req.user.tenants[0]?.tenant` (multi-tenant plugin convention) rather
 * than the fictional `req.user.host` field that was used pre-Slice-CCC.
 * Name kept as `autoPopulateHost` for callsite stability; the field it
 * sets is now `tenant` to match post-Slice-CCC schemas.
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation auto-populate-tenant
 * @security ISO-27002 §5.15 access-control
 * @audit ISO-19011:2018 audit-trail before-validate-hooks
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @see docs/STANDARDS.md §4.4
 */

import type { CollectionBeforeValidateHook } from 'payload'

export const autoPopulateHost: CollectionBeforeValidateHook = async ({ data, req }) => {
  if (req.user && data) {
    const tenantsArr = (req.user as unknown as { tenants?: Array<{ tenant?: number | string }> }).tenants
    const firstTenantRef = tenantsArr?.[0]?.tenant
    if (firstTenantRef !== undefined && firstTenantRef !== null) {
      ;(data as Record<string, unknown>).tenant = firstTenantRef
    }
  }
  return data
}
