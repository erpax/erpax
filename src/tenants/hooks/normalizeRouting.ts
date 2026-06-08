/**
 * Tenants routing collapse — normalise slug and domain before validation so
 * tenant-domain lookup and multi-tenant routing observe a single canonical value.
 *
 * @audit ISO-19011:2018 audit-trail routing-identity
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 */
import type { FieldHook } from 'payload'

/** Lower-case URL-safe tenant slug: trim, collapse hyphens, strip invalid chars. */
export function normalizeTenantSlugValue(raw: unknown): unknown {
  if (typeof raw !== 'string') return raw
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/** Lower-case host/domain: trim, strip scheme and trailing slash. */
export function normalizeTenantDomainValue(raw: unknown): unknown {
  if (typeof raw !== 'string') return raw
  let v = raw.trim().toLowerCase()
  v = v.replace(/^https?:\/\//, '')
  v = v.replace(/\/.*$/, '')
  return v
}

export const normalizeTenantSlug: FieldHook = ({ value }) => normalizeTenantSlugValue(value)

export const normalizeTenantDomain: FieldHook = ({ value }) => normalizeTenantDomainValue(value)
