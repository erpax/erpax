import { describe, it, expect } from 'vitest'
import type { CollectionAfterChangeHook, CollectionBeforeValidateHook, CollectionConfig, Field } from 'payload'
import { incotermsPair, lineNetOf, onDocument, onSide, requisitionStages, typeOf, vendorQuoteStages, orderFields, orderPresets, ordersOverride, orderStages, orderStatusOptions, purchaseStages, quoteStages, sideOf, totalsFromLines } from '@/components/ecommerce/orders'

// The plugin's orders collection, reduced to what the override reads.
const plugin = (): CollectionConfig => ({
  slug: 'orders',
  fields: [
    { name: 'items', type: 'array', fields: [{ name: 'quantity', type: 'number' }] },
    { name: 'customer', type: 'relationship', relationTo: 'users' },
    { name: 'status', type: 'select', defaultValue: 'processing', options: [
      { label: 'Processing', value: 'processing' }, { label: 'Completed', value: 'completed' },
      { label: 'Cancelled (plugin)', value: 'cancelled' }, { label: 'Refunded', value: 'refunded' },
    ] },
  ],
  hooks: { afterChange: [() => undefined] },
})
const named = (fields: Field[]) => new Map(fields.flatMap((f) => ('name' in f ? [[f.name, f] as const] : [])))

describe('orders — the sales-order register folded into the e-commerce plugin order', () => {
  it('keeps the plugin collection and its own fields', async () => {
    const folded = await ordersOverride({ defaultCollection: plugin() })
    expect(folded.slug).toBe('orders')
    const fields = named(folded.fields)
    expect((fields.get('customer') as { relationTo?: string }).relationTo).toBe('users') // the plugin's customer stands
    expect(fields.has('items')).toBe(true)
  })

  it('adds the register under names that do not collide with the plugin', async () => {
    const pluginNames = new Set(named(plugin().fields).keys())
    for (const name of named(orderFields()).keys()) expect(pluginNames.has(name), name).toBe(false)
    const fields = named((await ordersOverride({ defaultCollection: plugin() })).fields)
    expect((fields.get('party') as { relationTo?: unknown }).relationTo).toEqual(['parties', 'addresses', 'tenants'])
    for (const name of ['orderNumber', 'lines', 'shipTo', 'billTo', 'totalAmount', 'accessToken', 'approvedBy']) expect(fields.has(name), name).toBe(true)
  })

  it('the order number is not required — the plugin creates a web order without one', () => {
    const number = named(orderFields()).get('orderNumber') as { required?: boolean; unique?: boolean }
    expect(number.required).toBe(false)
    expect(number.unique).toBe(true)
    // nothing the register adds may be required: every one of them is absent at checkout
    for (const f of orderFields()) expect('required' in f && f.required === true, 'name' in f ? f.name : '').toBe(false)
  })

  it('status is ONE lifecycle — the plugin values first, then every register stage it lacks', () => {
    const options = orderStatusOptions(plugin().fields.flatMap((f) => ('name' in f && f.name === 'status' && f.type === 'select' ? f.options : [])))
    const values = options.map((o) => (typeof o === 'string' ? o : o.value))
    expect(values.slice(0, 4)).toEqual(['processing', 'completed', 'cancelled', 'refunded'])
    expect(values.filter((v) => v === 'cancelled')).toHaveLength(1) // shared value, the plugin's label wins
    expect(options.find((o) => typeof o !== 'string' && o.value === 'cancelled')).toMatchObject({ label: 'Cancelled (plugin)' })
    for (const stage of ['draft', ...quoteStages(), ...orderStages()]) expect(values, stage).toContain(stage)
  })

  it('refuses a plugin that lost its status select (an upgrade must not drop the stages silently)', () => {
    const broken = { ...plugin(), fields: plugin().fields.filter((f) => !('name' in f && f.name === 'status')) }
    expect(() => ordersOverride({ defaultCollection: broken })).toThrow(/status/)
  })

  it('appends its hooks after the plugin\'s own', async () => {
    const before = plugin().hooks?.afterChange?.length ?? 0
    const folded = await ordersOverride({ defaultCollection: plugin() })
    expect(folded.hooks?.afterChange?.length).toBe(before + 13)
    expect(folded.hooks?.beforeValidate).toContain(totalsFromLines)
    expect(folded.enableQueryPresets).toBe(true)
  })
})

describe('orders — totals follow from the lines', () => {
  type Args = Parameters<CollectionBeforeValidateHook>[0]
  it('line net = quantity × unit price − discount', () => {
    expect(lineNetOf({ quantity: 3, unitPrice: 10, discount: 5 })).toBe(25)
    expect(lineNetOf({})).toBe(0)
  })
  it('recomputes each line and the header from the lines', () => {
    const data = { taxAmount: 7, lines: [{ quantity: 2, unitPrice: 10 }, { quantity: 1, unitPrice: 5, discount: 1 }] as Array<Record<string, number>> }
    void totalsFromLines({ data } as unknown as Args)
    expect(data.lines.map((l) => l.lineNet)).toEqual([20, 4])
    expect(data).toMatchObject({ subTotalAmount: 24, totalAmount: 31 })
  })
  it('leaves an order without lines alone (a web checkout carries only the plugin items)', () => {
    const data: Record<string, unknown> = { amount: 1999 }
    void totalsFromLines({ data } as unknown as Args)
    expect(data).toEqual({ amount: 1999 })
  })
})

describe('orders — the five saved lists', () => {
  it('each former collection is a list over `orders`, by side and document type', () => {
    const [quotes, orders, purchases, vendorQuotes, requisitions] = orderPresets()
    const sale = { side: { not_equals: 'purchase' } }
    const anOrder = { documentType: { not_in: ['quote', 'requisition'] } }
    expect(quotes).toMatchObject({ title: 'Quotes', relatedCollection: 'orders', where: { and: [sale, { status: { in: quoteStages() } }] } })
    expect(orders).toMatchObject({ title: 'Orders', relatedCollection: 'orders', where: { and: [sale, { status: { in: orderStages() } }] } })
    expect(purchases).toMatchObject({ title: 'Purchase orders', relatedCollection: 'orders', where: { and: [{ side: { equals: 'purchase' } }, anOrder] } })
    expect(vendorQuotes).toMatchObject({ title: 'Vendor quotes', relatedCollection: 'orders', where: { documentType: { equals: 'quote' } } })
    expect(requisitions).toMatchObject({ title: 'Purchase requisitions', relatedCollection: 'orders', where: { documentType: { equals: 'requisition' } } })
    expect(orderPresets()).toHaveLength(5)
    expect(quoteStages().some((s) => orderStages().includes(s))).toBe(false)
  })
  it('a purchase order "sent to vendor" is not listed as a sales quote', () => {
    // `sent` is a quote stage on the sale side and a purchase stage on the other; only the side filter keeps them apart.
    expect(quoteStages()).toContain('sent')
    const [quotes] = orderPresets()
    expect(JSON.stringify(quotes?.where)).toContain('"not_equals":"purchase"')
  })
})

describe('orders — the purchase side (the folded purchase-orders collection)', () => {
  type After = Parameters<CollectionAfterChangeHook>[0]
  type Before = Parameters<CollectionBeforeValidateHook>[0]

  it('an order is a sale unless it says purchase — a web checkout sets no side', () => {
    expect(sideOf({})).toBe('sale')
    expect(sideOf({ side: 'sale' })).toBe('sale')
    expect(sideOf({ side: 'purchase' })).toBe('purchase')
    expect(sideOf(null)).toBe('sale')
    const side = named(orderFields()).get('side') as { defaultValue?: unknown }
    expect(side.defaultValue).toBe('sale')
  })

  it('the counterparty is ONE polymorphic relationship — a partner, an address or another tenant', () => {
    const fields = named(orderFields())
    expect(fields.get('party')).toMatchObject({ type: 'relationship', relationTo: ['parties', 'addresses', 'tenants'] })
    expect(fields.has('vendor')).toBe(false) // a purchase order's vendor IS the party, on the purchase side
    // exactly one counterparty field among everything the register adds
    const counterparties = orderFields().filter((f) => f.type === 'relationship' && [f.relationTo].flat().some((t) => t === 'parties' || t === 'addresses'))
    expect(counterparties.map((f) => ('name' in f ? f.name : '')).sort()).toEqual(['billTo', 'party', 'shipTo'])
  })

  it('carries delivery terms, the receipt join and the per-line GL account', () => {
    const fields = named(orderFields())
    expect(fields.get('receipts')).toMatchObject({ type: 'join', collection: 'goods-receipts', on: 'purchaseOrder' })
    expect(fields.get('invoice')).toMatchObject({ type: 'relationship', relationTo: 'invoices' })
    const lines = fields.get('lines')
    const lineNames = lines?.type === 'array' ? lines.fields.map((f) => ('name' in f ? f.name : '')) : []
    expect(lineNames).toEqual(expect.arrayContaining(['glAccount', 'quantityReceived']))
  })

  it('the purchase stages join the one status lifecycle', () => {
    const values = orderStatusOptions([]).map((o) => (typeof o === 'string' ? o : o.value))
    for (const stage of purchaseStages()) expect(values, stage).toContain(stage)
  })

  it('an event hook runs only for its own side', async () => {
    let ran = 0
    const hook: CollectionAfterChangeHook = ({ doc }) => { ran++; return doc }
    const purchase = { id: 'po1', side: 'purchase', status: 'cancelled' }
    // cancelling a purchase order must not run the sale side's hooks (they post revenue reversals)
    expect(await onSide('sale', hook)({ doc: purchase } as unknown as After)).toBe(purchase)
    expect(ran).toBe(0)
    await onSide('purchase', hook)({ doc: purchase } as unknown as After)
    expect(ran).toBe(1)
    await onSide('sale', hook)({ doc: { id: 'web1', status: 'processing' } } as unknown as After) // no side ⇒ sale
    expect(ran).toBe(2)
  })

  it('delivery terms and their named place go together', () => {
    const check = (data: Record<string, unknown>) => incotermsPair({ data } as unknown as Before)
    expect(() => check({ deliveryTerms: 'CIF' })).toThrow(/incotermsLocation is required/)
    expect(() => check({ incotermsLocation: 'Burgas Port' })).toThrow(/deliveryTerms is required/)
    expect(() => check({ deliveryTerms: 'CIF', incotermsLocation: 'CIF Burgas Port' })).not.toThrow()
    expect(() => check({})).not.toThrow() // a sale, or a web checkout, has neither
  })
})

describe('orders — a status is read per document type (vendor quotes and requisitions folded in)', () => {
  type After = Parameters<CollectionAfterChangeHook>[0]

  it('a document is an order unless it says otherwise — a web checkout sets no type', () => {
    expect(typeOf({})).toBe('order')
    expect(typeOf({ documentType: 'quote' })).toBe('quote')
    expect(typeOf({ documentType: 'requisition' })).toBe('requisition')
    expect(typeOf({ documentType: 'nonsense' })).toBe('order')
    expect((named(orderFields()).get('documentType') as { defaultValue?: unknown }).defaultValue).toBe('order')
  })

  it('the same status word belongs to more than one document type, and all of them are selectable', () => {
    const values = orderStatusOptions([]).map((o) => (typeof o === 'string' ? o : o.value))
    expect(new Set(values).size).toBe(values.length) // each word listed once
    for (const stage of [...vendorQuoteStages(), ...requisitionStages()]) expect(values, stage).toContain(stage)
    // "received" is a vendor-quote stage AND a purchase-order stage; "approved" a requisition stage AND a purchase stage
    expect(vendorQuoteStages()).toContain('received')
    expect(requisitionStages()).toContain('approved')
  })

  it('"received" on a vendor quote fires the quote hook and not the order hooks; on a purchase order the reverse', async () => {
    const ran: string[] = []
    const mark = (name: string): CollectionAfterChangeHook => ({ doc }) => { ran.push(name); return doc }
    const hooks = [onDocument('quote', mark('quote')), onDocument('requisition', mark('requisition')), onSide('purchase', mark('purchase-order')), onSide('sale', mark('sale-order'))]
    const fire = async (doc: Record<string, unknown>) => { ran.length = 0; for (const h of hooks) await h({ doc } as unknown as After); return [...ran] }

    expect(await fire({ documentType: 'quote', side: 'purchase', status: 'received' })).toEqual(['quote'])
    expect(await fire({ documentType: 'order', side: 'purchase', status: 'received' })).toEqual(['purchase-order'])
    expect(await fire({ documentType: 'requisition', side: 'purchase', status: 'approved' })).toEqual(['requisition'])
    expect(await fire({ status: 'processing' })).toEqual(['sale-order']) // a web checkout
  })

  it('a quote and a requisition link to the order family itself', () => {
    const fields = named(orderFields())
    for (const name of ['requisition', 'createdPurchaseOrder', 'awardedQuote']) expect(fields.get(name), name).toMatchObject({ type: 'relationship', relationTo: 'orders' })
    expect(fields.get('approvalChain')?.type).toBe('array')
    const lines = fields.get('lines')
    const lineNames = lines?.type === 'array' ? lines.fields.map((f) => ('name' in f ? f.name : '')) : []
    expect(lineNames).toEqual(expect.arrayContaining(['leadTimeDays', 'preferredVendor']))
  })
})
