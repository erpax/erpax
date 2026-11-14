import { describe, it, expect } from 'vitest'
import type { CollectionAfterChangeHook } from 'payload'
import { assignBuyerParty } from '@/hooks/collections/orders/assignBuyerParty'

type Args = Parameters<CollectionAfterChangeHook>[0]
/** A payload that records what the role engine writes. */
const world = () => {
  const roles: Array<Record<string, unknown>> = []
  const user: { id: string; roleAssignments: unknown[] } = { id: 'u1', roleAssignments: [] }
  const payload = {
    find: async () => ({ docs: [], hasNextPage: false }),
    findByID: async () => user,
    create: async ({ data }: { data: Record<string, unknown> }) => { const doc = { id: `r${roles.length + 1}`, ...data }; roles.push(doc); return doc },
    update: async ({ data }: { data: { roleAssignments: unknown[] } }) => Object.assign(user, data),
    logger: { warn: () => undefined },
  }
  const run = (doc: Record<string, unknown>, operation: 'create' | 'update' = 'create') => assignBuyerParty({ doc, operation, req: { payload } } as unknown as Args)
  return { roles, user, run }
}

describe('assignBuyerParty — the checkout customer becomes the buyer on their order', () => {
  it('a new sale with a customer gives that user the buyer role ON the order', async () => {
    const w = world()
    const doc = { id: 'o1', customer: 'u1' }
    expect(await w.run(doc)).toBe(doc)
    expect(w.roles).toEqual([expect.objectContaining({ name: 'buyer', binding: 'document', resource: { relationTo: 'orders', value: 'o1' } })])
    expect(w.user.roleAssignments).toEqual(['r1'])
  })
  it('reads the customer whether it arrived as an id or populated', async () => {
    const w = world()
    await w.run({ id: 'o1', customer: { id: 'u1', email: 'x' } })
    expect(w.user.roleAssignments).toEqual(['r1'])
  })
  it('does nothing on update, without a customer, or for a purchase, a quote or a requisition', async () => {
    const w = world()
    await w.run({ id: 'o1', customer: 'u1' }, 'update')
    await w.run({ id: 'o2' })
    await w.run({ id: 'o3', customer: 'u1', side: 'purchase' })
    await w.run({ id: 'o4', customer: 'u1', documentType: 'quote' })
    await w.run({ id: 'o5', customer: 'u1', documentType: 'requisition' })
    expect(w.roles).toEqual([])
  })
  it('is best-effort: a failure to assign does not undo the order', async () => {
    const doc = { id: 'o1', customer: 'u1' }
    const failing = { find: async () => { throw new Error('db down') }, logger: { warn: () => undefined } }
    await expect(assignBuyerParty({ doc, operation: 'create', req: { payload: failing } } as unknown as Args)).resolves.toBe(doc)
  })
})
