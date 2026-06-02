import type { Payload } from 'payload'

import { describe, expect, it } from 'vitest'

import { hasRoleOn, partiesOf, PARTY_ROLES, type ResourceRef, rolesScopedTo } from './rolify'

const INVOICE: ResourceRef = { relationTo: 'invoices', id: 'inv-1' }

const mockPayload = (opts: {
  roles?: Array<{ id: string; name: string; resource?: { relationTo: string; value: string } }>
  assignments?: Array<{ role: string; user: string }>
}): Payload =>
  ({
    find: async ({ collection }: { collection: string }) => {
      if (collection === 'roles') return { docs: opts.roles ?? [] }
      if (collection === 'user-roles') return { docs: opts.assignments ?? [] }
      return { docs: [] }
    },
  }) as unknown as Payload

describe('rolify — party-roles on documents (the Rolify port)', () => {
  it('defines the canonical party-role vocabulary (EN-16931 / UBL), each with skillRoutes', () => {
    const names = PARTY_ROLES.map((r) => r.name)
    expect(names).toContain('seller')
    expect(names).toContain('buyer')
    expect(PARTY_ROLES.every((r) => r.skillRoutes.length > 0)).toBe(true)
  })

  it('partiesOf / rolesScopedTo return only the roles bound to THIS document', async () => {
    const payload = mockPayload({
      roles: [
        { id: 'r1', name: 'seller', resource: { relationTo: 'invoices', value: 'inv-1' } },
        { id: 'r2', name: 'buyer', resource: { relationTo: 'invoices', value: 'inv-1' } },
        { id: 'r3', name: 'seller', resource: { relationTo: 'invoices', value: 'inv-2' } }, // a different doc
      ],
    })
    expect([...(await partiesOf(payload, INVOICE))].sort()).toEqual(['buyer', 'seller'])
    expect((await rolesScopedTo(payload, INVOICE, 'seller')).map((r) => r.id)).toEqual(['r1'])
  })

  it('hasRoleOn: true when the user is assigned to a document-scoped role; false otherwise', async () => {
    const bound = [{ id: 'r1', name: 'seller', resource: { relationTo: 'invoices', value: 'inv-1' } }]
    expect(
      await hasRoleOn(mockPayload({ roles: bound, assignments: [{ role: 'r1', user: 'u-1' }] }), {
        userId: 'u-1',
        name: 'seller',
        resource: INVOICE,
      }),
    ).toBe(true)
    // role bound to the doc, but the user is not assigned
    expect(
      await hasRoleOn(mockPayload({ roles: bound, assignments: [] }), {
        userId: 'u-1',
        name: 'seller',
        resource: INVOICE,
      }),
    ).toBe(false)
    // no seller role bound to this doc at all
    expect(
      await hasRoleOn(mockPayload({ roles: [], assignments: [{ role: 'r1', user: 'u-1' }] }), {
        userId: 'u-1',
        name: 'seller',
        resource: INVOICE,
      }),
    ).toBe(false)
  })
})
