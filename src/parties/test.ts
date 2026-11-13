import { describe, it, expect } from 'vitest'
import type { Field } from 'payload'
import Parties, { loadPartyPresets, partyPresets, whereRole } from '@/parties'

const top = (name: string) => Parties.fields.find((f): f is Field => 'name' in f && f.name === name)
const inGroup = (group: string, name: string) => {
  const g = top(group) as { fields?: Field[] } | undefined
  return g?.fields?.find((f) => 'name' in f && f.name === name) as { admin?: { condition?: (d: unknown, s: unknown, c: unknown) => boolean } } | undefined
}
const shown = (group: string, name: string, roles: string[]) => inGroup(group, name)!.admin!.condition!({ roles }, {}, {})

describe('parties — one master, customer and vendor as roles', () => {
  it('is the parties collection, with a role a party can hold more than once', () => {
    expect(Parties.slug).toBe('parties')
    const roles = top('roles') as { type?: string; hasMany?: boolean; required?: boolean; options?: { value: string }[] }
    expect(roles.type).toBe('select')
    expect(roles.hasMany).toBe(true)
    expect(roles.required).toBe(true)
    expect(roles.options!.map((o) => o.value)).toEqual(['customer', 'vendor'])
  })

  it('keeps every field either side had', () => {
    for (const [g, n] of [
      ['addresses', 'billingAddress'], ['addresses', 'shippingAddress'], ['addresses', 'remitToAddress'],
      ['tax', 'taxExemptionCertificate'], ['tax', 'vendor1099Eligible'], ['tax', 'withholdingRate'],
      ['commercial', 'creditLimit'], ['commercial', 'priceList'], ['commercial', 'preferredPaymentMethod'],
      ['bank', 'bankIban'], ['ledger', 'defaultReceivableAccount'], ['ledger', 'defaultPayableAccount'],
    ] as const) {
      expect(inGroup(g, n), `${g}.${n}`).toBeDefined()
    }
  })

  it('shows a role-specific field only to the role it belongs to — and both to a party that is both', () => {
    expect(shown('commercial', 'creditLimit', ['customer'])).toBe(true)
    expect(shown('commercial', 'creditLimit', ['vendor'])).toBe(false)
    expect(shown('ledger', 'defaultPayableAccount', ['vendor'])).toBe(true)
    expect(shown('ledger', 'defaultPayableAccount', ['customer'])).toBe(false)
    expect(shown('commercial', 'creditLimit', ['customer', 'vendor'])).toBe(true)
    expect(shown('ledger', 'defaultPayableAccount', ['customer', 'vendor'])).toBe(true)
  })

  it('lets saved lists be defined on it', () => {
    expect(Parties.enableQueryPresets).toBe(true)
  })
})

describe('parties — the two lists are saved filters, not tables', () => {
  it('one preset per role, each filtering by that role over this collection', () => {
    const presets = partyPresets()
    expect(presets.map((p) => p.title)).toEqual(['Customers', 'Vendors'])
    expect(presets.every((p) => p.relatedCollection === 'parties' && p.isShared)).toBe(true)
    expect(presets[0]!.where).toEqual(whereRole('customer'))
    expect(presets[1]!.where).toEqual(whereRole('vendor'))
  })

  it('shows each side the columns it cares about', () => {
    const [customers, vendors] = partyPresets()
    expect(customers!.columns.map((c) => c.accessor)).toContain('commercial.creditLimit')
    expect(vendors!.columns.map((c) => c.accessor)).toContain('commercial.preferredPaymentMethod')
  })

  it('loads idempotently — a second load creates nothing', async () => {
    const rows: Record<string, unknown>[] = []
    const payload = {
      find: async ({ where }: { where: { and: [{ title: { equals: string } }, unknown] } }) => ({
        docs: rows.filter((r) => r.title === where.and[0].title.equals),
      }),
      create: async ({ data }: { data: Record<string, unknown> }) => { rows.push(data); return data },
    } as unknown as Parameters<typeof loadPartyPresets>[0]
    expect(await loadPartyPresets(payload)).toEqual({ created: 2, unchanged: 0 })
    expect(await loadPartyPresets(payload)).toEqual({ created: 0, unchanged: 2 })
    expect(rows).toHaveLength(2)
  })
})
