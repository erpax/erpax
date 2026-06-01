/**
 * App-collections registry tests — verifies the canonical collection slug list
 * stays in sync with the actual collection exports.
 *
 * @standard ISO/IEC-29119:2022 software-testing configuration-test
 * @audit ISO-19011:2018 audit-trail config-completeness
 * @see docs/STANDARDS.md §3 §7
 */

import { describe, it, expect } from 'vitest'

import { APP_COLLECTION_SLUGS } from '@/config/appCollections'
import { Categories } from '@/collections/Categories'
import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Posts } from '@/collections/Posts'
import { Roles } from '@/collections/Roles'
import { Tenants } from '@/collections/Tenants'
import { UserRoles } from '@/collections/Roles/UserRoles'
import { Users } from '@/collections/Users'
import { SCOPE_BY_COLLECTION } from '@/utilities/scopes/collectionScopes'

/** Mirrors `collections` order in `payload.config.ts` — keep aligned with `APP_COLLECTION_SLUGS`. */
const REGISTERED_COLLECTION_CONFIGS = [
  Tenants,
  Pages,
  Posts,
  Media,
  Categories,
  Roles,
  UserRoles,
  Users,
] as const

describe('app collections registry', () => {
  it('APP_COLLECTION_SLUGS matches registered collection configs (payload Collections array)', () => {
    expect(REGISTERED_COLLECTION_CONFIGS.map((c) => c.slug)).toEqual([...APP_COLLECTION_SLUGS])
  })

  it('SCOPE_BY_COLLECTION covers every APP_COLLECTION_SLUG', () => {
    expect(Object.keys(SCOPE_BY_COLLECTION).sort()).toEqual([...APP_COLLECTION_SLUGS].sort())
  })
})
