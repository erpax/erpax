/**
 * Per-collection scope rules — declares which collections support
 * versioned drafts, multi-tenancy, scheduled-publish, and role permissions.
 *
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.3 information-access-restriction
 * @audit ISO-19011:2018 audit-trail
 * @see ./constants.ts
 * @see ./filters.ts
 */

import type { AppCollectionSlug } from '@/config/appCollections'

import type { CollectionScope } from '@/scope/types'

/**
 * Which scope features apply per app collection (reference only).
 */
export const SCOPE_BY_COLLECTION = {
  tenants: {
    lifecycle: 'none',
    tenancy: false,
    schedulePublish: false,
    permissions: 'none',
  },
  pages: {
    lifecycle: 'payloadVersions',
    tenancy: true,
    schedulePublish: true,
    permissions: 'none',
  },
  posts: {
    lifecycle: 'payloadVersions',
    tenancy: true,
    schedulePublish: true,
    permissions: 'none',
  },
  media: {
    lifecycle: 'none',
    tenancy: true,
    schedulePublish: false,
    permissions: 'none',
  },
  categories: {
    lifecycle: 'none',
    tenancy: true,
    schedulePublish: false,
    permissions: 'none',
  },
  roles: {
    lifecycle: 'none',
    tenancy: false,
    schedulePublish: false,
    permissions: 'definitions',
  },
  user_roles: {
    lifecycle: 'none',
    tenancy: false,
    schedulePublish: false,
    permissions: 'assignments',
  },
  users: {
    lifecycle: 'none',
    tenancy: true,
    schedulePublish: false,
    permissions: 'none',
  },
} as const satisfies Record<AppCollectionSlug, CollectionScope>

export type CollectionKey = keyof typeof SCOPE_BY_COLLECTION
