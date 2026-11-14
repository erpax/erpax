import { describe, it, expect } from 'vitest'
import type { CollectionBeforeValidateHook, CollectionConfig, Field } from 'payload'
import { lineNetOf, orderFields, orderPresets, ordersOverride, orderStages, orderStatusOptions, quoteStages, totalsFromLines } from '@/components/ecommerce/orders'

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
    expect((fields.get('party') as { relationTo?: string }).relationTo).toBe('parties')
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
    expect(folded.hooks?.afterChange?.length).toBe(before + 7)
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

describe('orders — the two saved lists', () => {
  it('Quotes and Orders are lists over `orders`, split by status', () => {
    const [quotes, orders] = orderPresets()
    expect(quotes).toMatchObject({ title: 'Quotes', relatedCollection: 'orders', where: { status: { in: quoteStages() } } })
    expect(orders).toMatchObject({ title: 'Orders', relatedCollection: 'orders', where: { status: { in: orderStages() } } })
    expect(quoteStages().some((s) => orderStages().includes(s))).toBe(false)
  })
})
