import { describe, it, expect } from 'vitest'
import { Tenants } from '@/tenants'
import type { Field, GroupField } from 'payload'

// tenants — the multi-tenant root, GDPR-controller boundary for all access
// scoping (./index.ts). The proof cross: the slug is the scope key; create is
// super-admin-only; every secret field is read/update-guarded; and the
// per-tenant `config` group mirrors Payload's own Config shape (identity /
// localization / currency / accounting) so the international-first cascade has
// somewhere to land.

// Narrowers — Payload's Field is a discriminated union; pick named/group fields
// without reaching for `any`.
const hasName = (f: Field): f is Extract<Field, { name: string }> =>
  'name' in f && typeof (f as { name?: unknown }).name === 'string'

const byName = (fields: Field[], name: string): Extract<Field, { name: string }> | undefined =>
  fields.filter(hasName).find((f) => f.name === name)

const isGroup = (f: Field | undefined): f is GroupField =>
  !!f && f.type === 'group' && Array.isArray((f as GroupField).fields)

describe('tenants — the access-scope boundary collection', () => {
  it('is the `tenants` collection with a name title and fields', () => {
    expect(Tenants.slug).toBe('tenants')
    expect(Tenants.admin?.useAsTitle).toBe('name')
    expect(Array.isArray(Tenants.fields)).toBe(true)
    expect(Tenants.fields.length).toBeGreaterThan(0)
  })

  it('access is scoped: every action has a guard and create is the strictest', () => {
    expect(Tenants.access).toBeDefined()
    expect(typeof Tenants.access?.create).toBe('function')
    expect(typeof Tenants.access?.read).toBe('function')
    expect(typeof Tenants.access?.update).toBe('function')
    expect(typeof Tenants.access?.delete).toBe('function')
    // create is super-admin-only and distinct from the read guard
    expect(Tenants.access?.create).not.toBe(Tenants.access?.read)
  })

  it('name and slug are required identity fields; slug is indexed for routing', () => {
    const name = byName(Tenants.fields, 'name') as
      | { type?: string; required?: boolean }
      | undefined
    const slug = byName(Tenants.fields, 'slug') as
      | { type?: string; required?: boolean; index?: boolean }
      | undefined
    expect(name?.type).toBe('text')
    expect(name?.required).toBe(true)
    expect(slug?.type).toBe('text')
    expect(slug?.required).toBe(true)
    expect(slug?.index).toBe(true)
  })

  it('every secret field carries a field-level read/update access guard', () => {
    const secretNames = [
      'stripeSecretKey',
      'stripeWebhookSecret',
      'integrationSettings',
      'resendApiKey',
      'mcpApiKey',
    ]
    for (const n of secretNames) {
      const field = byName(Tenants.fields, n)
      expect(field, `missing secret field ${n}`).toBeDefined()
      const access = (field as { access?: { read?: unknown; update?: unknown } } | undefined)?.access
      expect(typeof access?.read, `${n}.access.read`).toBe('function')
      expect(typeof access?.update, `${n}.access.update`).toBe('function')
    }
    // the non-secret publishable key is NOT guarded
    const publishable = byName(Tenants.fields, 'stripePublishableKey')
    expect((publishable as { access?: unknown } | undefined)?.access).toBeUndefined()
  })

  it('the per-tenant config group mirrors the Payload Config sections', () => {
    const config = byName(Tenants.fields, 'config')
    expect(isGroup(config)).toBe(true)
    if (!isGroup(config)) throw new Error('config is not a group')
    const sections = ['identity', 'localization', 'currency', 'accounting'].map((s) =>
      byName(config.fields, s),
    )
    for (const s of sections) {
      expect(s?.type).toBe('group')
    }
  })

  it('accounting.standard is a select over the well-known frameworks; fiscal month is 1..12', () => {
    const config = byName(Tenants.fields, 'config')
    if (!isGroup(config)) throw new Error('config is not a group')
    const accounting = byName(config.fields, 'accounting')
    if (!isGroup(accounting)) throw new Error('accounting is not a group')

    const standard = byName(accounting.fields, 'standard')
    expect(standard?.type).toBe('select')
    const optionValues = (
      (standard as { options?: Array<{ value: string }> } | undefined)?.options ?? []
    ).map((o) => o.value)
    expect(optionValues).toContain('IFRS')
    expect(optionValues).toContain('GAAP')

    const fiscal = byName(accounting.fields, 'fiscalYearStartMonth') as
      | { type?: string; min?: number; max?: number; defaultValue?: number }
      | undefined
    expect(fiscal?.type).toBe('number')
    expect(fiscal?.min).toBe(1)
    expect(fiscal?.max).toBe(12)
    expect(fiscal?.defaultValue).toBe(1) // calendar year by default
  })
})
