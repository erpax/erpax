import { describe, it, expect } from 'vitest'
import type { CollectionConfig, Field } from 'payload'
import * as barrel from '@/collections'
import { PROVIDERS, coverage, hasPath, resolve, totals, wanted, type Provider } from '@/packages/admin/providers'
import { effective, installationProviders, serving, tenantProviders } from '@/packages/admin/providers/settings'
import { na } from '@/packages/admin/providers/types'

const collections = (Object.values(barrel) as CollectionConfig[]).filter((c) => typeof c?.slug === 'string')

const fields: Field[] = [
  { name: 'title', type: 'text' },
  { type: 'row', fields: [{ name: 'inRow', type: 'text' }] },
  { type: 'collapsible', label: 'More', fields: [{ name: 'list', type: 'array', fields: [{ name: 'value', type: 'text' }] }] },
  { type: 'tabs', tabs: [{ label: 'Plain', fields: [{ name: 'inTab', type: 'text' }] }, { name: 'named', fields: [{ name: 'deep', type: 'text' }] }] },
  { name: 'box', type: 'group', fields: [{ name: 'inner', type: 'text' }] },
  { name: 'parent', type: 'relationship', relationTo: 'things' } as unknown as Field,
]
const things = { slug: 'things', fields }
const people = { slug: 'people', auth: true, fields: [{ name: 'name', type: 'text' } as Field] }

describe('hasPath — a dotted path through Payload fields', () => {
  it('finds named fields, descends groups and arrays, and sees through unnamed containers', () => {
    for (const path of ['title', 'inRow', 'list', 'list.value', 'inTab', 'named', 'named.deep', 'box.inner']) expect(hasPath(fields, path)).toBe(true)
    for (const path of ['missing', 'title.x', 'box.missing', 'deep', 'inner']) expect(hasPath(fields, path)).toBe(false)
  })
})

describe('resolve — where a mapping points', () => {
  it('present for a field, for what Payload adds, and for a standard plugin collection', () => {
    expect(resolve('things.title', [things])).toBe('present')
    expect(resolve('things.createdAt', [things])).toBe('present')
    expect(resolve('things.breadcrumbs', [things])).toBe('present') // points at itself through parent
    expect(resolve('things.tenant', [things])).toBe('present')
    expect(resolve('people.email', [people])).toBe('present')
    expect(resolve('addresses.city', [])).toBe('present')
  })
  it('wanted for a path that does not exist yet; unknown for a collection that does not exist', () => {
    expect(resolve('things.colour', [things])).toBe('wanted')
    expect(resolve('things.email', [things])).toBe('wanted') // not an auth collection
    expect(resolve('people.breadcrumbs', [people])).toBe('wanted')
    expect(resolve('nowhere.title', [things])).toBe('unknown')
  })
})

describe('coverage — a provider against the collections', () => {
  const provider: Provider = {
    slug: 'demo',
    title: 'Demo',
    source: 'test',
    ignore: ['etag'],
    schemas: { Thing: { properties: { etag: {}, label: {}, shade: {}, legacy: {}, extra: {} } }, Gone: { properties: { a: {}, b: {} } } },
    resources: [
      { schema: 'Thing', fields: { label: 'things.title', shade: 'things.colour', ...na('retired', 'legacy'), ghost: 'things.title' } },
      { schema: 'Gone', na: 'out of scope', fields: {} },
    ],
  }
  it('sorts every property into present, wanted, not applicable or undecided', () => {
    const [thing, gone] = coverage(provider, [things])
    expect(thing).toMatchObject({ resource: 'Thing', total: 4, present: 1, wanted: ['things.colour'], notApplicable: 1, undecided: ['extra'] })
    expect(gone).toMatchObject({ total: 2, notApplicable: 2, present: 0 })
  })
  it('reports a mapping entry for a property the provider does not have', () => {
    expect(coverage(provider, [things])[0]!.unknown).toEqual(['ghost'])
  })
  it('covered = present over everything that applies', () => {
    expect(totals(provider, [things])).toMatchObject({ total: 6, present: 1, wanted: 1, notApplicable: 3, undecided: 1 })
    expect(totals(provider, [things]).covered).toBe(1 / 3)
  })
  it('ranks the wanted paths by how many providers ask', () => {
    const second: Provider = { ...provider, slug: 'other', resources: [{ schema: 'Thing', fields: { shade: 'things.colour', label: 'things.size' } }] }
    expect(wanted([provider, second], [things])).toEqual([{ path: 'things.colour', providers: ['demo', 'other'] }, { path: 'things.size', providers: ['other'] }])
  })
})

describe('the five shipped providers, against the real collections', () => {
  it('there are five, each with its own published schema', () => {
    expect(PROVIDERS.map((p) => p.slug)).toEqual(['google', 'microsoft', 'okta', 'jumpcloud', 'scim'])
    for (const provider of PROVIDERS) expect(Object.keys(provider.schemas).length).toBeGreaterThan(0)
  })
  it('no mapping lies: every mapped property exists in the provider schema and every target names a real collection', () => {
    for (const provider of PROVIDERS) for (const row of coverage(provider, collections)) expect(row.unknown).toEqual([])
  })
  it('SCIM — the provider-neutral baseline — is covered in full', () => {
    expect(totals(PROVIDERS.find((p) => p.slug === 'scim')!, collections)).toMatchObject({ wanted: 0, undecided: 0, covered: 1 })
  })
  it('every provider is at least two-thirds covered, and coverage may only rise', () => {
    for (const provider of PROVIDERS) expect(totals(provider, collections).covered).toBeGreaterThan(0.66)
  })
  it('nothing two providers ask for is missing, except what needs behaviour first', () => {
    const shared = wanted(PROVIDERS, collections).filter((entry) => entry.providers.length >= 2).map((entry) => entry.path)
    expect(shared).toEqual(['groups.membershipRule', 'users.mustChangePassword'])
  })
})

describe('provider settings — installation and tenant', () => {
  const installation = { providers: [{ provider: 'google', enabled: true, clientId: 'app', clientSecret: 's' }, { provider: 'okta', enabled: false }, { provider: 'microsoft', enabled: true }] }
  it('serves a tenant only when the installation offers the provider and the tenant switched it on', () => {
    expect(effective(installation, { providers: [{ provider: 'google', enabled: true, account: 'C01', domain: 'a.test', directory: true }] }, 'google')).toEqual({
      provider: 'google', clientId: 'app', clientSecret: 's', account: 'C01', domain: 'a.test', directory: true, registration: 'installation',
    })
    expect(effective(installation, { providers: [{ provider: 'google', enabled: false }] }, 'google')).toBe(undefined)
    expect(effective(installation, { providers: [{ provider: 'okta', enabled: true }] }, 'okta')).toBe(undefined) // switched off for the installation
    expect(effective(installation, { providers: [{ provider: 'scim', enabled: true }] }, 'scim')).toBe(undefined) // not offered
    expect(effective(installation, { providers: [] }, 'google')).toBe(undefined)
    expect(effective(null, null, 'google')).toBe(undefined)
  })
  it("the tenant's own app registration wins; with none anywhere it says so", () => {
    expect(effective(installation, { providers: [{ provider: 'google', clientId: 'own', clientSecret: 'mine' }] }, 'google')).toMatchObject({ clientId: 'own', clientSecret: 'mine', registration: 'tenant' })
    expect(effective(installation, { providers: [{ provider: 'microsoft' }] }, 'microsoft')).toEqual({ provider: 'microsoft', directory: false, registration: 'none' })
  })
  it('lists the providers that serve a tenant', () => {
    const tenant = { providers: [{ provider: 'google' }, { provider: 'okta' }, { provider: 'microsoft' }] }
    expect(serving(installation, tenant).map((e) => e.provider)).toEqual(['google', 'microsoft'])
  })
  it('both levels offer the same providers, and keep the secret behind the access they are given', () => {
    const secret = { create: () => false, read: () => false, update: () => false }
    const options = [{ slug: 'google', title: 'Google Workspace' }]
    for (const list of [installationProviders(options, secret), tenantProviders(options, secret)]) {
      expect(list.name).toBe('providers')
      const names = list.fields.map((f) => ('name' in f ? f.name : ''))
      expect(names.slice(0, 2)).toEqual(['provider', 'enabled'])
      expect(names).toContain('clientSecret')
      expect(list.fields.find((f) => 'name' in f && f.name === 'clientSecret')).toMatchObject({ access: secret })
    }
    expect(tenantProviders(options, secret).fields.map((f) => ('name' in f ? f.name : ''))).toContain('account')
  })
})
