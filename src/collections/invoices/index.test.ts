import { randomUUID } from 'node:crypto'
import { getTableColumns } from '@payloadcms/db-d1-sqlite/drizzle'
import type { Payload } from 'payload'
import { beforeAll, describe, expect, it } from 'vitest'
import { Invoices } from '@/collections/invoices'

// Unified-node invariant test for the `invoices` collection.
describe('invoices collection node', () => {
  it('exports a valid collection config', () => {
    expect(Invoices.slug).toBe('invoices')
    expect(Array.isArray(Invoices.fields)).toBe(true)
    expect(Invoices.fields.length).toBeGreaterThan(0)
  })
})

// D1 allows 100 bound parameters per statement. `invoices` is the widest collection, so it is where
// the limit bites first: an update rewrites the row as one upsert, and a create binds every column.
describe('invoices on D1 — one row fits one statement', () => {
  let payload: Payload

  beforeAll(async () => {
    const { getPayload } = await import('payload')
    payload = await getPayload({ config: (await import('@payload-config')).default })
  })

  it('every table can take a single-row insert: at most 100 columns', () => {
    const tables = (payload.db as unknown as { tables: Record<string, Parameters<typeof getTableColumns>[0]> }).tables
    const wide = Object.entries(tables)
      .map(([name, table]) => [name, Object.keys(getTableColumns(table)).length] as const)
      .filter(([, columns]) => columns > 100)
    expect(wide).toEqual([])
  })

  it('an invoice updates (the upsert binds each column once — patched until payloadcms/payload#18239 ships)', async () => {
    const run = randomUUID().slice(0, 8)
    const tenant = await payload.create({ overrideAccess: true, collection: 'tenants', data: { name: `D1 ${run}`, slug: `d1-${run}` } as never })
    const address = (company: string) =>
      payload.create({ overrideAccess: true, collection: 'addresses', data: { tenant: tenant.id, company, addressLine1: '1 Main St', city: 'Sofia', postalCode: '1000', country: 'BG' } as never })
    const [seller, buyer] = [await address('Seller'), await address('Buyer')]
    const invoice = await payload.create({
      collection: 'invoices',
      data: {
        tenant: tenant.id,
        typeStatus: { invoiceType: 'invoice' },
        parties: { seller: seller.id, buyer: buyer.id },
        amounts: { itemTotal: 120, totalAmount: 120, totalDue: 120 },
        billingTax: { currencyCode: 'EUR' },
      } as never,
    })
    try {
      const updated = await payload.update({ overrideAccess: true, collection: 'invoices', id: invoice.id, data: { amounts: { itemTotal: 150, totalAmount: 150, totalDue: 150 } } as never })
      expect(updated.amounts?.totalDue).toBe(150)
    } finally {
      await payload.delete({ overrideAccess: true, collection: 'invoices', id: invoice.id })
      await payload.delete({ overrideAccess: true, collection: 'addresses', where: { id: { in: [seller.id, buyer.id] } } })
      await payload.delete({ overrideAccess: true, collection: 'tenants', id: tenant.id })
    }
  })
})
