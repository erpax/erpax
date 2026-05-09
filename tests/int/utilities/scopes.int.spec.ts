/**
 * Scopes tests — collection-scope predicates and version-status filters.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.15 access-control
 * @security ISO-27002 §8.3 information-access-restriction
 * @see docs/STANDARDS.md §4.4 §7
 */

import { describe, it, expect } from 'vitest'

import { APP_COLLECTION_SLUGS } from '@/config/appCollections'
import { VersionStatus, VERSION_STATUS_FIELD, TENANT_FIELD } from '@/utilities/scopes/constants'
import { SCOPE_BY_COLLECTION } from '@/utilities/scopes/collectionScopes'
import { wherePublished, wherePublishedAnd } from '@/utilities/scopes/filters'

describe('scopes', () => {
  describe('constants', () => {
    it('uses Payload version status field name', () => {
      expect(VERSION_STATUS_FIELD).toBe('_status')
      expect(VersionStatus.published).toBe('published')
      expect(VersionStatus.draft).toBe('draft')
    })

    it('names tenant column from multi-tenant plugin', () => {
      expect(TENANT_FIELD).toBe('tenant')
    })
  })

  describe('filters', () => {
    it('wherePublished matches published rows only', () => {
      expect(wherePublished).toEqual({
        _status: { equals: 'published' },
      })
    })

    it('wherePublishedAnd nests tenant constraints', () => {
      const tenantFilter = { tenant: { in: [1, 2] } }
      expect(wherePublishedAnd(tenantFilter)).toEqual({
        and: [wherePublished, tenantFilter],
      })
    })
  })

  describe('collectionScopes', () => {
    it('covers every first-party collection slug', () => {
      expect(Object.keys(SCOPE_BY_COLLECTION).sort()).toEqual([...APP_COLLECTION_SLUGS].sort())
    })

    it('marks versioned content with lifecycle + schedule flags', () => {
      expect(SCOPE_BY_COLLECTION.posts.lifecycle).toBe('payloadVersions')
      expect(SCOPE_BY_COLLECTION.posts.schedulePublish).toBe(true)
      expect(SCOPE_BY_COLLECTION.pages.schedulePublish).toBe(true)
    })

    it('marks permission-role collections', () => {
      expect(SCOPE_BY_COLLECTION.roles.permissions).toBe('definitions')
      expect(SCOPE_BY_COLLECTION.user_roles.permissions).toBe('assignments')
    })
  })
})
