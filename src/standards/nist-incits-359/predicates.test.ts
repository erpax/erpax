/**
 * NIST INCITS 359 RBAC predicate tests — role-match predicates.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.18 access-rights
 * @security ISO-27002 §5.15 access-control
 * @see src/standards/nist-incits-359/predicates.ts
 */

import { describe, it, expect } from 'vitest'

import type { RoleDefinition } from '@/standards/nist-incits-359/types'
import { hasAllRoles, hasAnyRole, hasRole, hasStrictRole } from '@/standards/nist-incits-359/predicates'

describe('permission predicates', () => {
  const globalEditor: RoleDefinition = {
    name: 'editor',
    binding: 'global',
    scopedCollection: null,
    resource: null,
  }

  const globalAdmin: RoleDefinition = {
    name: 'admin',
    binding: 'global',
    scopedCollection: null,
    resource: null,
  }

  const postsScoped: RoleDefinition = {
    name: 'moderator',
    binding: 'collection',
    scopedCollection: 'posts',
    resource: null,
  }

  const docScoped: RoleDefinition = {
    name: 'owner',
    binding: 'document',
    scopedCollection: null,
    resource: {
      relationTo: 'posts',
      value: 42,
    },
  }

  describe('hasRole', () => {
    it('matches global role by name only', () => {
      expect(hasRole(globalEditor, 'editor')).toBe(true)
      expect(hasRole(globalEditor, 'admin')).toBe(false)
    })

    it('matches :any when name matches', () => {
      expect(hasRole(globalEditor, 'editor', 'any')).toBe(true)
    })

    it('matches collection-level role against slug', () => {
      expect(hasRole(postsScoped, 'moderator', 'posts')).toBe(true)
      expect(hasRole(postsScoped, 'moderator', 'pages')).toBe(false)
    })

    it('global role satisfies document-level check (non-strict)', () => {
      expect(hasRole(globalEditor, 'editor', 'posts', 99)).toBe(true)
    })

    it('matches document binding with id', () => {
      expect(hasRole(docScoped, 'owner', 'posts', 42)).toBe(true)
      expect(hasRole(docScoped, 'owner', 'posts', 43)).toBe(false)
    })
  })

  describe('hasStrictRole', () => {
    it('global strict matches only global query form', () => {
      expect(hasStrictRole(globalEditor, 'editor')).toBe(true)
      expect(hasStrictRole(globalEditor, 'editor', 'posts')).toBe(false)
    })

    it('collection strict matches collection slug without global shortcut', () => {
      expect(hasStrictRole(postsScoped, 'moderator', 'posts')).toBe(true)
      expect(hasStrictRole(postsScoped, 'moderator', 'posts', 1)).toBe(false)
    })
  })

  describe('hasAnyRole', () => {
    it('is true if any name matches', () => {
      expect(hasAnyRole([globalEditor, postsScoped], ['admin', 'editor'])).toBe(true)
      expect(hasAnyRole([postsScoped], ['editor'])).toBe(false)
    })
  })

  describe('hasAllRoles', () => {
    it('requires every string name to match a global row (name-only form)', () => {
      expect(hasAllRoles([globalEditor, globalAdmin], 'editor', 'admin')).toBe(true)
      expect(hasAllRoles([globalEditor], 'editor', 'admin')).toBe(false)
    })

    it('supports non-global rows via resource specifiers', () => {
      expect(
        hasAllRoles([globalEditor, postsScoped], {
          name: 'moderator',
          resource: 'posts',
        }),
      ).toBe(true)
    })
  })
})
