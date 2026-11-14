import { describe, it, expect } from 'vitest'
import type { CollectionAfterChangeHook, CollectionBeforeChangeHook, CollectionBeforeValidateHook, CollectionConfig, Field } from 'payload'
import { isRegisterPayment, kindFromInvoice, onRegisterPayment, paymentFields, transactionsOverride, transactionStatusOptions } from '@/components/ecommerce/transactions'

// The plugin's transactions collection, reduced to what the override reads.
const plugin = (): CollectionConfig => ({
  slug: 'transactions',
  fields: [
    { name: 'paymentMethod', type: 'select', options: ['stripe'] },
    { name: 'order', type: 'relationship', relationTo: 'orders' },
    { name: 'amount', type: 'number' },
    { name: 'status', type: 'select', defaultValue: 'pending', options: [
      { label: 'Pending', value: 'pending' }, { label: 'Succeeded', value: 'succeeded' }, { label: 'Failed (plugin)', value: 'failed' },
      { label: 'Cancelled', value: 'cancelled' }, { label: 'Expired', value: 'expired' }, { label: 'Refunded', value: 'refunded' },
    ] },
  ],
})
const named = (fields: Field[]) => new Map(fields.flatMap((f) => ('name' in f ? [[f.name, f] as const] : [])))

describe('transactions — the payment register folded into the e-commerce plugin transaction', () => {
  it('keeps the plugin collection and adds the register beside it', async () => {
    const folded = await transactionsOverride({ defaultCollection: plugin() })
    expect(folded.slug).toBe('transactions')
    const fields = named(folded.fields)
    for (const name of ['paymentMethod', 'order', 'amount', 'status']) expect(fields.has(name), name).toBe(true)
    for (const name of ['transactionNumber', 'paymentKind', 'invoice', 'parties', 'amounts', 'dates', 'authorization', 'payment', 'metadata']) expect(fields.has(name), name).toBe(true)
    expect((fields.get('invoice') as { relationTo?: string; required?: boolean })).toMatchObject({ relationTo: 'invoices' })
    expect((fields.get('invoice') as { required?: boolean }).required).toBeUndefined() // a checkout has no invoice
  })

  it('status is ONE lifecycle — the plugin values first, then every register status it lacks', () => {
    const options = transactionStatusOptions(plugin().fields.flatMap((f) => ('name' in f && f.name === 'status' && f.type === 'select' ? f.options : [])))
    const values = options.map((o) => (typeof o === 'string' ? o : o.value))
    expect(values.slice(0, 6)).toEqual(['pending', 'succeeded', 'failed', 'cancelled', 'expired', 'refunded'])
    expect(values.filter((v) => v === 'failed')).toHaveLength(1)
    for (const status of ['recorded', 'authorised', 'sent', 'received', 'settled', 'reversed']) expect(values, status).toContain(status)
  })

  it('refuses a plugin that lost its status select, or grew a field the register would shadow', () => {
    const noStatus = { ...plugin(), fields: plugin().fields.filter((f) => !('name' in f && f.name === 'status')) }
    expect(() => transactionsOverride({ defaultCollection: noStatus })).toThrow(/status/)
    const shadowed = { ...plugin(), fields: [...plugin().fields, { name: 'invoice', type: 'text' } as Field] }
    expect(() => transactionsOverride({ defaultCollection: shadowed })).toThrow(/invoice/)
  })

  it('paymentKind has no default — the plugin never sets it, so a checkout is not a register payment', () => {
    const kind = named(paymentFields()).get('paymentKind') as { defaultValue?: unknown; required?: boolean }
    expect(kind.defaultValue).toBeUndefined()
    expect(kind.required).toBeUndefined()
  })
})

describe('transactions — THE GUARD: register hooks never run on a checkout transaction', () => {
  it('a register payment is one that names its kind', () => {
    expect(isRegisterPayment({ paymentKind: 'received' })).toBe(true)
    expect(isRegisterPayment({ paymentKind: 'sent' })).toBe(true)
    expect(isRegisterPayment({ status: 'pending', amount: 1999 })).toBe(false) // what the plugin creates at checkout
    expect(isRegisterPayment({ paymentKind: null })).toBe(false)
    expect(isRegisterPayment(null)).toBe(false)
  })

  it('an afterChange register hook is skipped for a checkout and run for a payment', async () => {
    let ran = 0
    const hook: CollectionAfterChangeHook = ({ doc }) => { ran++; return doc }
    const guarded = onRegisterPayment.afterChange(hook)
    type Args = Parameters<CollectionAfterChangeHook>[0]
    const checkout = { id: 't1', status: 'pending', amount: 1999 }
    expect(await guarded({ doc: checkout } as unknown as Args)).toBe(checkout)
    expect(ran).toBe(0)
    await guarded({ doc: { id: 't2', paymentKind: 'received', invoice: 'i1' } } as unknown as Args)
    expect(ran).toBe(1)
  })

  it('a beforeChange register hook (the period lock) is skipped for a checkout and run for a payment', async () => {
    let ran = 0
    const hook: CollectionBeforeChangeHook = ({ data }) => { ran++; return data }
    const guarded = onRegisterPayment.beforeChange(hook)
    type Args = Parameters<CollectionBeforeChangeHook>[0]
    await guarded({ data: { status: 'pending' } } as unknown as Args)
    expect(ran).toBe(0)
    await guarded({ data: { paymentKind: 'sent' } } as unknown as Args)
    expect(ran).toBe(1)
  })

  it('a transaction entered against an invoice with no kind becomes a collection (the register\'s old default)', () => {
    type Args = Parameters<CollectionBeforeValidateHook>[0]
    const kind = (data: Record<string, unknown>) => { void kindFromInvoice({ data } as unknown as Args); return data.paymentKind }
    expect(kind({ invoice: 'i1' })).toBe('received')
    expect(kind({ invoice: 'i1', paymentKind: 'sent' })).toBe('sent') // an explicit kind stands
    expect(kind({ order: 'o1', amount: 1999 })).toBeUndefined() // a checkout stays a checkout
  })
})
