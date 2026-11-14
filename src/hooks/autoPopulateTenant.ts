/**
 * Auto-populate the multi-tenant `tenant` field from the request user.
 *
 * Slice CCC: schema migration to canonical `req.user.tenants[]` shape.
 * Slice HHH (2026-05-10): file + symbol renamed (legacy `autoPopulateHost`
 * → `autoPopulateTenant`); no backward compat (per maintainer decision the
 * "host" alias is fully retired in favour of the canonical `tenant` term).
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation auto-populate-tenant
 * @security ISO-27002 §5.15 access-control
 * @audit ISO-19011:2018 audit-trail before-validate-hooks
 * @compliance SOC-2 CC4.1 monitoring-and-evaluation
 * @see docs/STANDARDS.md §4.4
 */

import type { CollectionBeforeValidateHook } from 'payload'

export const autoPopulateTenant: CollectionBeforeValidateHook = async ({ data, req }) => {
  if (req.user && data) {
    const tenantsArr = (req.user as unknown as { tenants?: Array<{ tenant?: number | string }> }).tenants
    const firstTenantRef = tenantsArr?.[0]?.tenant
    if (firstTenantRef !== undefined && firstTenantRef !== null) {
      ;(data as Record<string, unknown>).tenant = firstTenantRef
    }
  }
  return data
}
