import { describe, it, expect } from 'vitest'
import { PARTY_ROLES, allPartyRoles, assignParty, partiesOf, partyRolesOf, removeParty } from '@/utilities/party/roles'

type Doc = Record<string, unknown> & { id: string }
/** A payload over `roles` and `users`, enough for the role engine. */
const world = (roles: Doc[] = [], users: Doc[] = [{ id: 'u1', roleAssignments: [] }]) => {
  const matches = (doc: Doc, where: unknown): boolean => {
    if (!where || typeof where !== 'object') return true
    const w = where as Record<string, unknown>
    if (Array.isArray(w.and)) return w.and.every((x) => matches(doc, x))
    if (Array.isArray(w.or)) return w.or.some((x) => matches(doc, x))
    return Object.entries(w).every(([path, op]) => {
      const value = path.split('.').reduce<unknown>((v, k) => (v as Record<string, unknown> | undefined)?.[k], doc)
      const o = op as { equals?: unknown; in?: unknown[] }
      if ('equals' in o) return value === o.equals
      if (Array.isArray(o.in)) return Array.isArray(value) ? value.some((v) => o.in!.includes(typeof v === 'object' && v ? (v as Doc).id : v)) : o.in.includes(value)
      return true
    })
  }
  const table = (collection: string): Doc[] => (collection === 'roles' ? roles : users)
  const payload = {
    find: async ({ collection, where }: { collection: string; where?: unknown }) => ({ docs: table(collection).filter((d) => matches(d, where)), hasNextPage: false }),
    findByID: async ({ collection, id, depth }: { collection: string; id: string; depth?: number }) => {
      const doc = table(collection).find((d) => d.id === id)
      if (!doc || collection !== 'users' || !depth) return doc ?? null
      return { ...doc, roleAssignments: (doc.roleAssignments as string[]).map((rid) => roles.find((r) => r.id === rid) ?? rid) }
    },
    create: async ({ collection, data }: { collection: string; data: Record<string, unknown> }) => { const doc = { id: `r${roles.length + 1}`, ...data } as Doc; table(collection).push(doc); return doc },
    update: async ({ collection, id, data }: { collection: string; id: string; data: Record<string, unknown> }) => Object.assign(table(collection).find((d) => d.id === id)!, data),
  }
  return { payload: payload as never, req: {} as never, roles, users }
}

describe('parties — each document type names its own', () => {
  it('an order has the five parties etrima kept as columns', () => {
    expect(PARTY_ROLES.order).toEqual(['seller', 'buyer', 'supplier', 'consignee', 'forwarder'])
    expect(partyRolesOf('quote')).toEqual(['seller', 'buyer'])
    expect(partyRolesOf('requisition')).toEqual(['requester', 'approver'])
    expect(partyRolesOf(undefined)).toEqual(PARTY_ROLES.order) // a document with no type is an order
    expect(allPartyRoles()).toEqual(['seller', 'buyer', 'supplier', 'consignee', 'forwarder', 'requester', 'approver'])
  })
})

describe('parties — a party is a role held on the document', () => {
  it('assigning a party creates the document-scoped role and gives it to the user', async () => {
    const w = world()
    await assignParty(w.payload, w.req, { userId: 'u1', role: 'buyer', resource: { collection: 'orders', id: 'o1' } })
    expect(w.roles).toEqual([expect.objectContaining({ name: 'buyer', binding: 'document', resource: { relationTo: 'orders', value: 'o1' } })])
    expect(w.users[0]?.roleAssignments).toEqual([w.roles[0]?.id])
  })
  it('the same party on a second document is a second role; assigning twice changes nothing', async () => {
    const w = world()
    const buyer = (id: string) => assignParty(w.payload, w.req, { userId: 'u1', role: 'buyer', resource: { collection: 'orders', id } })
    await buyer('o1'); await buyer('o2'); await buyer('o1')
    expect(w.roles).toHaveLength(2)
    expect(w.users[0]?.roleAssignments).toHaveLength(2)
  })
  it('refuses a role the document type does not have', async () => {
    const w = world()
    await expect(assignParty(w.payload, w.req, { userId: 'u1', role: 'approver', resource: { collection: 'orders', id: 'o1' } })).rejects.toThrow(/not a party to a order/)
    await expect(assignParty(w.payload, w.req, { userId: 'u1', role: 'forwarder', resource: { collection: 'orders', id: 'q1', documentType: 'quote' } })).rejects.toThrow(/not a party to a quote/)
    expect(w.roles).toHaveLength(0)
  })
  it('partiesOf lists who holds which role on the document', async () => {
    const w = world([], [{ id: 'u1', roleAssignments: [] }, { id: 'u2', roleAssignments: [] }])
    await assignParty(w.payload, w.req, { userId: 'u1', role: 'seller', resource: { collection: 'orders', id: 'o1' } })
    await assignParty(w.payload, w.req, { userId: 'u2', role: 'buyer', resource: { collection: 'orders', id: 'o1' } })
    await assignParty(w.payload, w.req, { userId: 'u2', role: 'buyer', resource: { collection: 'orders', id: 'o2' } })
    expect(await partiesOf(w.payload, w.req, { collection: 'orders', id: 'o1' })).toEqual([{ role: 'seller', userIds: ['u1'] }, { role: 'buyer', userIds: ['u2'] }])
  })
})

describe('parties — a party can be removed', () => {
  it('removing a party takes the role off the user and leaves the others', async () => {
    const w = world()
    const on = (id: string) => ({ userId: 'u1', role: 'buyer', resource: { collection: 'orders' as const, id } })
    await assignParty(w.payload, w.req, on('o1'))
    await assignParty(w.payload, w.req, on('o2'))
    await removeParty(w.payload, w.req, on('o1'))
    expect(w.users[0]?.roleAssignments).toEqual([w.roles[1]?.id])
    await removeParty(w.payload, w.req, on('o1')) // not held any more: nothing to do
    expect(w.users[0]?.roleAssignments).toHaveLength(1)
  })
})
