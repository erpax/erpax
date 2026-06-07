import { describe, it, expect } from 'vitest'
import { Tenants } from '@/tenants'

describe('tenants', () => {
  it('has the correct slug', () => {
    expect(Tenants.slug).toBe('tenants')
  })

  it('uses name as the admin title field', () => {
    expect(Tenants.admin?.useAsTitle).toBe('name')
  })

  it('exposes create, read, update, delete access functions', () => {
    const { create, read, update, delete: del } = Tenants.access ?? {}
    expect(typeof create).toBe('function')
    expect(typeof read).toBe('function')
    expect(typeof update).toBe('function')
    expect(typeof del).toBe('function')
  })

  const fieldNames = (fields: unknown[]): string[] =>
    (fields as Array<{ name: string }>).map((f) => f.name)

  it('declares the expected top-level fields', () => {
    const names = fieldNames(Tenants.fields)
    expect(names).toContain('name')
    expect(names).toContain('domain')
    expect(names).toContain('slug')
    expect(names).toContain('locales')
    expect(names).toContain('config')
    expect(names).toContain('allowPublicRead')
    expect(names).toContain('stripeSecretKey')
    expect(names).toContain('stripeWebhookSecret')
    expect(names).toContain('integrationSettings')
    expect(names).toContain('resendApiKey')
    expect(names).toContain('mcpApiKey')
  })

  it('marks name and slug as required', () => {
    const fields = Tenants.fields as Array<{ name: string; required?: boolean }>
    const nameField = fields.find((f) => f.name === 'name')
    const slugField = fields.find((f) => f.name === 'slug')
    expect(nameField?.required).toBe(true)
    expect(slugField?.required).toBe(true)
  })

  it('indexes domain, slug and allowPublicRead for fast lookup', () => {
    const fields = Tenants.fields as Array<{ name: string; index?: boolean }>
    const indexed = fields.filter((f) => f.index).map((f) => f.name)
    expect(indexed).toContain('domain')
    expect(indexed).toContain('slug')
    expect(indexed).toContain('allowPublicRead')
  })

  it('defaults allowPublicRead to false', () => {
    const fields = Tenants.fields as Array<{ name: string; defaultValue?: unknown }>
    const field = fields.find((f) => f.name === 'allowPublicRead')
    expect(field?.defaultValue).toBe(false)
  })

  it('defaults locales to an empty array', () => {
    const fields = Tenants.fields as Array<{ name: string; defaultValue?: unknown }>
    const field = fields.find((f) => f.name === 'locales')
    expect(field?.defaultValue).toEqual([])
  })

  it('config group contains identity, localization, currency, accounting sub-groups', () => {
    const fields = Tenants.fields as Array<{ name: string; fields?: unknown[] }>
    const configGroup = fields.find((f) => f.name === 'config')
    expect(configGroup).toBeDefined()
    const subNames = fieldNames(configGroup!.fields ?? [])
    expect(subNames).toContain('identity')
    expect(subNames).toContain('localization')
    expect(subNames).toContain('currency')
    expect(subNames).toContain('accounting')
  })

  it('accounting.standard select has IFRS and GAAP options', () => {
    const fields = Tenants.fields as Array<{ name: string; fields?: unknown[] }>
    const configGroup = fields.find((f) => f.name === 'config')!
    const subFields = configGroup.fields as Array<{ name: string; fields?: unknown[] }>
    const accountingGroup = subFields.find((f) => f.name === 'accounting')!
    const accountingFields = accountingGroup.fields as Array<{
      name: string
      options?: Array<{ value: string }>
    }>
    const standardField = accountingFields.find((f) => f.name === 'standard')
    const values = (standardField?.options ?? []).map((o) => o.value)
    expect(values).toContain('IFRS')
    expect(values).toContain('GAAP')
    expect(values).toContain('FRS')
    expect(values).toContain('JGAAP')
    expect(values).toContain('ASBE')
    expect(values).toContain('INDAS')
  })

  it('fiscalYearStartMonth defaults to 1 with min=1 max=12', () => {
    const fields = Tenants.fields as Array<{ name: string; fields?: unknown[] }>
    const configGroup = fields.find((f) => f.name === 'config')!
    const subFields = configGroup.fields as Array<{ name: string; fields?: unknown[] }>
    const accountingGroup = subFields.find((f) => f.name === 'accounting')!
    const accountingFields = accountingGroup.fields as Array<{
      name: string
      min?: number
      max?: number
      defaultValue?: unknown
    }>
    const fyField = accountingFields.find((f) => f.name === 'fiscalYearStartMonth')
    expect(fyField?.defaultValue).toBe(1)
    expect(fyField?.min).toBe(1)
    expect(fyField?.max).toBe(12)
  })

  it('secret fields carry access guards (not open to all)', () => {
    const fields = Tenants.fields as Array<{ name: string; access?: unknown }>
    const secrets = ['stripeSecretKey', 'stripeWebhookSecret', 'integrationSettings', 'resendApiKey', 'mcpApiKey']
    for (const name of secrets) {
      const field = fields.find((f) => f.name === name)
      expect(field?.access, `${name} should have an access guard`).toBeDefined()
    }
  })
})
