import { describe, it, expect } from 'vitest'
import type { CollectionConfig, Config, Field } from 'payload'
import { MAX_DB_NAME, MAX_IDENTIFIER, fits, longNamesPlugin, payloadName, shortName, snake } from '@/plugins/naming'

const apply = (collections: CollectionConfig[]): CollectionConfig[] => (longNamesPlugin()({ collections } as Config) as Config).collections ?? []
const fieldAt = (fields: Field[], ...names: string[]): Record<string, unknown> => {
  let current: Field[] = fields
  let found: Record<string, unknown> = {}
  for (const name of names) {
    found = current.find((f) => 'name' in f && f.name === name) as unknown as Record<string, unknown>
    current = (found.fields as Field[] | undefined) ?? []
  }
  return found
}

describe('naming — Payload names its own tables', () => {
  it('snake-cases a slug or a field name the way Payload does', () => {
    expect(snake('lotWorkPhases')).toBe('lot_work_phases')
    expect(snake('lot-work-phases')).toBe('lot_work_phases')
    expect(payloadName(['users', 'roles'])).toBe('users_roles')
    expect(payloadName(['work-orders', 'options'])).toBe('work_orders_options')
  })
  it('a name that fits is left alone — no dbName at all', () => {
    const [users] = apply([{ slug: 'users', fields: [{ name: 'roles', type: 'select', hasMany: true, options: ['admin'] }, { name: 'tenants', type: 'array', fields: [{ name: 'roles', type: 'select', options: ['a'] }] }] }])
    expect(fieldAt(users!.fields, 'roles')).not.toHaveProperty('dbName')
    expect(fieldAt(users!.fields, 'tenants')).not.toHaveProperty('dbName')
    expect(fieldAt(users!.fields, 'tenants', 'roles')).not.toHaveProperty('dbName')
  })
  it('an explicit dbName is always respected', () => {
    const [c] = apply([{ slug: 'a-very-long-collection-name-for-the-purpose', fields: [{ name: 'aVeryLongFieldNameIndeedForATest', type: 'array', dbName: 'mine', fields: [] }] }])
    expect(fieldAt(c!.fields, 'aVeryLongFieldNameIndeedForATest').dbName).toBe('mine')
  })
})

describe('naming — a dbName only where Payload\'s name would not fit', () => {
  const long = ['management-assessment-icfr', 'significantDeficiencies', 'remediationStatus']
  it('measures the longest identifier Payload would derive (the versions enum, with a locales suffix)', () => {
    expect(fits(['users', 'roles'])).toBe(true)
    expect(fits(long)).toBe(false)
    // exactly at the limit fits; one more does not
    const room = MAX_IDENTIFIER - 'enum__'.length - '_v_version_'.length - '_locales'.length
    expect(fits(['a'.repeat(room)])).toBe(true)
    expect(fits(['a'.repeat(room + 1)])).toBe(false)
  })
  it('the short name is readable, deterministic, unique per path, and leaves room for Payload\'s affixes', () => {
    const name = shortName(long)
    expect(name).toMatch(/^management_assessment_icfr_[a-z_]+_[0-9a-f]{8}$/)
    expect(name.length).toBeLessThanOrEqual(MAX_DB_NAME)
    expect(`enum__${name}_v_locales`.length).toBeLessThanOrEqual(MAX_IDENTIFIER)
    expect(shortName(long)).toBe(name)
    expect(shortName([...long.slice(0, 2), 'remediationStatuz'])).not.toBe(name)
  })
  it('sets it on a nested select, an array and a block whose names are too long, and only on those', () => {
    const [c] = apply([{
      slug: 'management-assessment-icfr',
      fields: [
        { name: 'status', type: 'select', options: ['a'] },
        { name: 'significantDeficiencies', type: 'array', fields: [{ name: 'remediationStatus', type: 'select', options: ['open'] }] },
        { name: 'details', type: 'group', fields: [{ name: 'supportingDocumentationReferences', type: 'array', fields: [] }] },
      ],
    }])
    expect(fieldAt(c!.fields, 'status')).not.toHaveProperty('dbName')
    expect(fieldAt(c!.fields, 'significantDeficiencies', 'remediationStatus').dbName).toBe(shortName(long))
    expect(fieldAt(c!.fields, 'details', 'supportingDocumentationReferences').dbName).toBe(shortName(['management-assessment-icfr', 'details', 'supportingDocumentationReferences']))
  })
  it('walks rows, collapsibles and tabs without adding a path segment for an unnamed container', () => {
    const [c] = apply([{ slug: 'x', fields: [{ type: 'row', fields: [{ type: 'tabs', tabs: [{ label: 'T', fields: [{ name: 'kind', type: 'radio', options: ['a'] }] }] }] }] }])
    const row = c!.fields[0] as { fields: Array<{ tabs: Array<{ fields: Field[] }> }> }
    expect(row.fields[0]!.tabs[0]!.fields[0]).not.toHaveProperty('dbName') // `x_kind` fits
  })
})
