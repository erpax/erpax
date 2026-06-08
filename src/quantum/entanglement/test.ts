import { describe, it, expect } from 'vitest'
import {
  isMaximallyEntangled,
  report,
  fieldEntanglementOf,
  fieldEntanglementCount,
  COLLAPSE_HOOKS,
  FIELD_ENTANGLEMENT_REGISTRY,
  entangledFieldsFromRegistry,
} from '@/quantum/entanglement'
import {
  normalizeTenantSlugValue,
  normalizeTenantDomainValue,
} from '@/tenants/hooks/normalizeRouting'
import { Tenants } from '@/tenants'
import {
  deriveInvoiceNumber,
  deriveInvoiceNumberFromBonds,
  formatInvoiceNumber,
  invoiceNumberPrefix,
} from '@/invoices/hooks/deriveNumber'
import type { Field } from 'payload'

const hasName = (f: Field): f is Extract<Field, { name: string }> =>
  'name' in f && typeof (f as { name?: unknown }).name === 'string'

const byName = (fields: Field[], name: string) =>
  fields.filter(hasName).find((f) => f.name === name)

// The physics facet, computed on the live matrix: reciprocity (symmetric binding) +
// monogamy (no-cloning) ⇒ maximally entangled (the Bell-test analogue, the ER=EPR close).
describe('quantum/entanglement — the physics facet (EPR/Bell/CKW/ER=EPR)', () => {
  it('reports reciprocity, no-cloning, and the maximal flag', () => {
    const r = report()
    expect(r.edges).toBeGreaterThan(0)
    expect(r.reciprocity).toBeGreaterThanOrEqual(0)
    expect(r.reciprocity).toBeLessThanOrEqual(1)
    expect(typeof r.noCloning).toBe('boolean')
  })
  it('the corpus is maximally entangled — reciprocity 1 AND no-cloning', () => {
    expect(report().reciprocity).toBe(1)
    expect(report().noCloning).toBe(true)
    expect(isMaximallyEntangled()).toBe(true)
  })
})

describe('quantum/entanglement — fieldEntanglementOf (01a03ea0 audit registry)', () => {
  it('covers 65 fields across tenants, invoices, translations, chat, employees', () => {
    expect(fieldEntanglementCount()).toBe(65)
    expect(Object.keys(FIELD_ENTANGLEMENT_REGISTRY)).toHaveLength(65)
  })

  it('registers collapse hooks with stable ids', () => {
    expect(COLLAPSE_HOOKS.normalizeTenantSlug.id).toBe('normalizeTenantSlug')
    expect(COLLAPSE_HOOKS.teamCommsBeforeChange.scope).toBe('chat')
    expect(COLLAPSE_HOOKS.tamperProofBeforeChangeHook.scope).toBe('global')
  })

  it('resolves tenants.slug with routing partners and new collapse hooks', () => {
    const ent = fieldEntanglementOf('tenants', 'slug')
    expect(ent).not.toBeNull()
    expect(ent!.collection).toBe('tenants')
    expect(ent!.path).toBe('slug')
    expect(ent!.partners).toContain('domain')
    expect(ent!.collapse).toContain('normalizeTenantSlug')
    expect(ent!.bond).toMatch(/tenants/)
  })

  it('resolves tenants.domain with normalizeTenantDomain collapse', () => {
    const ent = fieldEntanglementOf('tenants', 'domain')
    expect(ent!.collapse).toContain('normalizeTenantDomain')
    expect(ent!.partners).toContain('slug')
  })

  it('aliases chats folder slug to chat collection', () => {
    const byFolder = fieldEntanglementOf('chats', 'eventUuid')
    const bySlug = fieldEntanglementOf('chat', 'eventUuid')
    expect(byFolder).toEqual(bySlug)
    expect(byFolder!.collapse).toContain('teamCommsBeforeChange')
  })

  it('resolves invoices.number with fiscal and protocol partners', () => {
    const ent = fieldEntanglementOf('invoices', 'number')
    expect(ent!.partners).toContain('protocolNumber')
    expect(ent!.partners).toContain('fiscal.receiptNumber')
    expect(ent!.collapse).toContain('deriveInvoiceNumber')
    expect(ent!.collapse).toContain('invoiceAccountingHook')
  })

  it('resolves employees.displayName name superposition', () => {
    const ent = fieldEntanglementOf('employees', 'displayName')
    expect(ent!.partners).toContain('identity.givenName')
    expect(ent!.partners).toContain('identity.familyName')
  })

  it('resolves translations.contentUuid federation bond', () => {
    const ent = fieldEntanglementOf('translations', 'contentUuid')
    expect(ent!.partners).toContain('scope')
    expect(ent!.partners).toContain('value')
  })

  it('returns null for unknown collection/field pairs', () => {
    expect(fieldEntanglementOf('unknown', 'field')).toBeNull()
    expect(fieldEntanglementOf('tenants', 'nonexistent')).toBeNull()
  })
})

describe('quantum/entanglement — entangledFieldsFromRegistry (parseQuantumSkill merge)', () => {
  it('exports all 65 fields for quantum/entanglement atom', () => {
    expect(entangledFieldsFromRegistry('quantum/entanglement')).toHaveLength(65)
  })

  it('scopes registry export to collection atom path', () => {
    const invoices = entangledFieldsFromRegistry('invoices')
    expect(invoices.length).toBe(18)
    expect(invoices.some((f) => f.field === 'invoices.number')).toBe(true)
    expect(invoices.every((f) => f.field.startsWith('invoices.'))).toBe(true)
  })

  it('maps collapse hooks into drift for registry-backed fields', () => {
    const slug = entangledFieldsFromRegistry('tenants').find((f) => f.field === 'tenants.slug')
    expect(slug?.hookless).toBe(false)
    expect(slug?.drift).toContain('collapse:normalizeTenantSlug')
    expect(slug?.superposition).toMatch(/routing/)
  })
})

describe('invoices — deriveInvoiceNumber (priority #3)', () => {
  it('formats tenant-scoped sequential numbers', () => {
    expect(formatInvoiceNumber('INV', 2026, 1)).toBe('INV-2026-001')
    expect(formatInvoiceNumber('INV', 2026, 42)).toBe('INV-2026-042')
  })

  it('collapses from fiscal.unp then protocolNumber bonds', () => {
    expect(
      deriveInvoiceNumberFromBonds({
        fiscal: { unp: 'UNP-123' },
        protocolNumber: 'PROT-9',
      }),
    ).toBe('UNP-123')
    expect(
      deriveInvoiceNumberFromBonds({
        protocolNumber: 'PROT-9',
      }),
    ).toBe('PROT-9')
  })

  it('selects prefix from invoice type', () => {
    expect(invoiceNumberPrefix({ typeStatus: { invoiceType: 'bill' } })).toBe('BILL')
    expect(invoiceNumberPrefix({ typeStatus: { invoiceType: 'invoice' } })).toBe('INV')
  })

  it('wires deriveInvoiceNumber as a beforeValidate hook export', () => {
    expect(typeof deriveInvoiceNumber).toBe('function')
    expect(COLLAPSE_HOOKS.deriveInvoiceNumber.scope).toBe('invoices.number')
  })
})

describe('tenants — routing collapse hooks (priority #1)', () => {
  it('normalizes slug to lower-case URL-safe form', () => {
    expect(normalizeTenantSlugValue('  Acme Corp  ')).toBe('acme-corp')
    expect(normalizeTenantSlugValue('foo__bar!!')).toBe('foo-bar')
  })

  it('normalizes domain by stripping scheme and path', () => {
    expect(normalizeTenantDomainValue('HTTPS://Example.COM/path')).toBe('example.com')
    expect(normalizeTenantDomainValue('  shop.example.org/  ')).toBe('shop.example.org')
  })

  it('wires slug/domain field hooks and auditTrail on the collection', () => {
    const slug = byName(Tenants.fields, 'slug') as { hooks?: { beforeValidate?: unknown[] } }
    const domain = byName(Tenants.fields, 'domain') as { hooks?: { beforeValidate?: unknown[] } }
    expect(slug?.hooks?.beforeValidate?.length).toBeGreaterThan(0)
    expect(domain?.hooks?.beforeValidate?.length).toBeGreaterThan(0)
    expect(Tenants.hooks?.afterChange?.length).toBeGreaterThan(0)
    expect(Tenants.timestamps).toBe(true)
  })
})
