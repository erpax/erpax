/**
 * Connections access: the actors on an edge, never a tenant filter.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @security ISO-27001 A.5.15 access-control
 */
import type { Access } from 'payload'
import { describe, expect, it } from 'vitest'

import { connectionAccess } from '@/access/collections/connections'

const args = (user: unknown) => ({ req: { user } }) as unknown as Parameters<Access>[0]
const member = { id: 'u1', roles: ['user'], tenants: [{ tenant: 't1' }] }
const superAdmin = { id: 's', roles: ['admin'], tenants: [] }

describe('connectionAccess', () => {
  it('lets the two users on an edge read it, and only the one who drew it change it', () => {
    expect(connectionAccess.read(args(member))).toEqual({ or: [{ from: { equals: 'u1' } }, { to: { equals: 'u1' } }] })
    expect(connectionAccess.update(args(member))).toEqual({ from: { equals: 'u1' } })
    expect(connectionAccess.delete(args(member))).toEqual({ from: { equals: 'u1' } })
    expect(connectionAccess.create(args(member))).toBe(true)
  })

  it('never filters by a tenant: connections have no tenant field', () => {
    expect(JSON.stringify(connectionAccess.read(args(member)))).not.toContain('tenant')
  })

  it('gives a super-admin every edge and an anonymous caller none', () => {
    expect(connectionAccess.read(args(superAdmin))).toBe(true)
    expect(connectionAccess.read(args(null))).toBe(false)
    expect(connectionAccess.create(args(null))).toBe(false)
  })
})
