import { describe, it, expect } from 'vitest'
import type { Access } from 'payload'
import { partyAccess } from '@/access/collections/shared/partyAccess'
import { assignParty } from '@/utilities/party/roles'

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

describe('partyAccess — a party reads the documents it is a party to', () => {
  type Args = Parameters<Access>[0]
  it('the read constraint is exactly those documents, for that user', async () => {
    const w = world([], [{ id: 'u1', roleAssignments: [] }, { id: 'u2', roleAssignments: [] }])
    await assignParty(w.payload, w.req, { userId: 'u1', role: 'buyer', resource: { collection: 'orders', id: 'o1' } })
    await assignParty(w.payload, w.req, { userId: 'u1', role: 'consignee', resource: { collection: 'orders', id: 'o2' } })
    await assignParty(w.payload, w.req, { userId: 'u2', role: 'seller', resource: { collection: 'orders', id: 'o3' } })
    const read = (id: string | null) => partyAccess('orders')({ req: { user: id ? { id } : null, payload: w.payload } } as unknown as Args)
    expect(await read('u1')).toEqual({ id: { in: ['o1', 'o2'] } })
    expect(await read('u2')).toEqual({ id: { in: ['o3'] } })
    expect(await read(null)).toBe(false) // signed out
  })
  it('a user who is party to nothing gets no documents — never the whole collection', async () => {
    const w = world()
    expect(await partyAccess('orders')({ req: { user: { id: 'u1' }, payload: w.payload } } as unknown as Args)).toBe(false)
  })
  it('only the roles asked for count', async () => {
    const w = world()
    await assignParty(w.payload, w.req, { userId: 'u1', role: 'forwarder', resource: { collection: 'orders', id: 'o1' } })
    expect(await partyAccess('orders', ['seller', 'buyer'])({ req: { user: { id: 'u1' }, payload: w.payload } } as unknown as Args)).toBe(false)
  })
})
