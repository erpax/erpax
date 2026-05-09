import type { Access } from 'payload'

import { getAllowPublicReadTenantIds } from '@/access/allowPublicReadTenants'
import { wherePublishedAnd } from '@/utilities/scopes'

/**
 * Tenant-scoped read access predicates — categories, media, etc.
 *
 * Authenticated: full read subject to `@payloadcms/plugin-multi-tenant`
 * scoping. Anonymous: only rows whose tenant has `allowPublicRead = true`.
 * Blocks cross-tenant enumeration via open REST/GraphQL.
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.3 information-access-restriction
 * @compliance GDPR Art.5(1)(f) integrity-and-confidentiality
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see docs/STANDARDS.md §4.4
 */
export const tenantScopedCollectionReadAccess: Access = async ({ req }) => {
  if (req.user) {
    return true
  }

  const ids = await getAllowPublicReadTenantIds(req.payload)
  if (ids.length === 0) return false

  return {
    tenant: {
      in: ids,
    },
  }
}

/**
 * Versioned tenant content (posts): anonymous users only see **published** docs for tenants
 * that opted into public catalog/read ({@link Tenant.allowPublicRead}).
 *
 * Authenticated users keep full read rules from the multi-tenant plugin (membership viewers
 * remain read-only on mutations via separate access).
 */
export const tenantScopedPostsReadAccess: Access = async ({ req }) => {
  if (req.user) {
    return true
  }

  const ids = await getAllowPublicReadTenantIds(req.payload)
  if (ids.length === 0) return false

  return wherePublishedAnd({
    tenant: {
      in: ids,
    },
  })
}
