/**
 * Search:read access tests: the index of every collection is whole only to a super-admin.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @security ISO-27001 A.5.15 access-control
 */

import type { Access } from 'payload'

import { describe, expect, it } from 'vitest'

import { PUBLIC_COLLECTIONS, searchReadAccess } from '@/access/collections/search/readAccess'

const args = (user: unknown): Parameters<Access>[0] => ({ req: { user } }) as unknown as Parameters<Access>[0]
const publicRows = { 'doc.relationTo': { in: [...PUBLIC_COLLECTIONS] } }

describe('searchReadAccess', () => {
  it('gives an anonymous visitor only the rows of the public collections', () => {
    expect(searchReadAccess(args(undefined))).toEqual(publicRows)
    expect(searchReadAccess(args(null))).toEqual(publicRows)
  })

  it('gives a tenant member, a tenant admin included, only the public rows: a row carries no tenant', () => {
    expect(searchReadAccess(args({ id: 'u', roles: ['user'], tenants: [{ tenant: 't' }] }))).toEqual(publicRows)
    expect(searchReadAccess(args({ id: 'a', roles: ['admin'], tenants: [{ tenant: 't' }] }))).toEqual(publicRows)
  })

  it('gives a super-admin (admin with no tenant) every row', () => {
    expect(searchReadAccess(args({ id: 's', roles: ['admin'], tenants: [] }))).toBe(true)
  })

  it('names the public site collections, and only them', () => {
    expect([...PUBLIC_COLLECTIONS]).toEqual(['pages', 'posts', 'products'])
  })
})
