import { describe, it, expect } from 'vitest'
import { appsOf, buyerTenant, grantApps, justCompleted, productsOf } from '@/hooks/collections/orders/grantApps'
import { grant, type App } from '@/packages/engine'

const apps: App[] = [{ slug: 'admin', title: 'Admin', anchors: [], required: true }, { slug: 'sales', title: 'Sales', anchors: [] }, { slug: 'ledger', title: 'Ledger', anchors: [] }, { slug: 'people', title: 'People', anchors: [] }]

describe('grant — adding apps to what a tenant has', () => {
  it('adds to a chosen list, in the apps\' own order, once each', () => {
    expect(grant(['ledger'], ['sales', 'ledger'], apps)).toEqual(['sales', 'ledger'])
  })
  it('a tenant with nothing chosen has every app already, and stays that way', () => {
    expect(grant([], ['sales'], apps)).toEqual([])
    expect(grant(null, ['sales'], apps)).toEqual([])
    expect(grant(undefined, ['sales'], apps)).toEqual([])
  })
  it('ignores an app that does not exist, and does not list a required one', () => {
    expect(grant(['ledger'], ['gone', 'admin'], apps)).toEqual(['ledger'])
  })
})

describe('grantApps — a completed sale of an app switches it on for the buyer', () => {
  it('the buyer is the counterparty when it is a tenant', () => {
    expect(buyerTenant({ party: { relationTo: 'tenants', value: 't1' } })).toBe('t1')
    expect(buyerTenant({ party: { relationTo: 'tenants', value: { id: 't2' } } })).toBe('t2')
    expect(buyerTenant({ party: { relationTo: 'parties', value: 'p1' } })).toBe(undefined)
    expect(buyerTenant({})).toBe(undefined)
  })
  it('reads the products on the order, once each, populated or not', () => {
    expect(productsOf({ items: [{ product: 'a' }, { product: { id: 'b' } }, { product: 'a' }, { product: null }, null] })).toEqual(['a', 'b'])
    expect(productsOf({})).toEqual([])
  })
  it('the apps of a set of products are their union', () => {
    expect(appsOf([{ apps: ['sales'] }, { apps: ['ledger', 'sales'] }, { apps: null }, {}])).toEqual(['ledger', 'sales'])
  })
  it('fires on the write that takes the order to completed, and not again', () => {
    expect(justCompleted({ status: 'completed' }, { status: 'processing' })).toBe(true)
    expect(justCompleted({ status: 'completed' }, undefined)).toBe(true)
    expect(justCompleted({ status: 'completed' }, { status: 'completed' })).toBe(false)
    expect(justCompleted({ status: 'processing' }, { status: 'draft' })).toBe(false)
  })
  const run = async (doc: object, previousDoc: object, tenantApps: string[] | null, productApps: string[]) => {
    const writes: unknown[] = []
    const payload = {
      find: async () => ({ docs: [{ id: 'p', apps: productApps }] }),
      findByID: async () => ({ id: 't1', apps: tenantApps }),
      update: async (args: { data: unknown }) => void writes.push(args.data),
    }
    await (grantApps as unknown as (args: unknown) => Promise<unknown>)({ doc, previousDoc, req: { payload } })
    return writes
  }
  const sale = { status: 'completed', party: { relationTo: 'tenants', value: 't1' }, items: [{ product: 'p' }] }
  it('adds the apps to the buying tenant', async () => {
    expect(await run(sale, { status: 'processing' }, ['ledger'], ['sales'])).toEqual([{ apps: ['sales', 'ledger'] }])
  })
  it('writes nothing when the tenant already has them, has everything, or the product grants none', async () => {
    expect(await run(sale, { status: 'processing' }, ['sales'], ['sales'])).toEqual([])
    expect(await run(sale, { status: 'processing' }, null, ['sales'])).toEqual([])
    expect(await run(sale, { status: 'processing' }, ['ledger'], [])).toEqual([])
  })
  it('does nothing for an order that is not completed, was already completed, or is not to a tenant', async () => {
    expect(await run({ ...sale, status: 'processing' }, { status: 'draft' }, ['ledger'], ['sales'])).toEqual([])
    expect(await run(sale, { status: 'completed' }, ['ledger'], ['sales'])).toEqual([])
    expect(await run({ ...sale, party: { relationTo: 'parties', value: 'p1' } }, { status: 'processing' }, ['ledger'], ['sales'])).toEqual([])
  })
})
