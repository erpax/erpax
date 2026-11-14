/**
 * Shared field names and enum-like values for versioned documents and
 * multi-tenant rows.
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @audit ISO-19011:2018 audit-trail draft-vs-published
 * @see ./filters.ts
 */

export const TENANT_FIELD = 'tenant' as const

/** Draft / published column when `versions.drafts` is enabled (Payload). */
export const VERSION_STATUS_FIELD = '_status' as const

export const VersionStatus = {
  draft: 'draft',
  published: 'published',
} as const

export type VersionStatusValue = (typeof VersionStatus)[keyof typeof VersionStatus]
