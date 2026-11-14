import { describe, it, expect } from 'vitest'
import type { CollectionConfig, Config, Field } from 'payload'
import { APPS } from '@/packages'
import { appNavigation, appPlugin, appPlugins, collectionsOf, hubsOf, partition, type App } from '@/packages/engine'

/** In a fixture this small a tenth of the collections is one; a hub here is what a third point at. */
const SHARE = 0.3

const ref = (name: string, relationTo: string | string[]): Field => ({ name, type: 'relationship', relationTo }) as Field
const col = (slug: string, ...fields: Field[]): CollectionConfig => ({ slug, fields })

const apps: App[] = [
  { slug: 'sales', title: 'Sales', anchors: ['invoices', 'orders'] },
  { slug: 'ledger', title: 'Ledger', anchors: ['journals'] },
  { slug: 'platform', title: 'Platform', anchors: [] },
]
const collections = [
  col('invoices', ref('tenant', 'tenants')),
  col('journals', ref('tenant', 'tenants')),
  col('invoice-lines', ref('invoice', 'invoices'), ref('tenant', 'tenants')),
  col('postings', ref('journal', 'journals'), ref('journal2', 'journals'), ref('invoice', 'invoices')),
  col('credit-notes', ref('line', 'invoice-lines')), // reaches sales only through a placed neighbour
  col('ties', ref('a', 'invoices'), ref('b', 'journals')),
  col('carts-notes', ref('order', 'orders')), // the anchor belongs to another plugin
  col('tags', ref('tenant', 'tenants')),
  col('labels', ref('tenant', 'tenants')),
  col('notes', ref('tenant', 'tenants')),
  col('locks', ref('tenant', 'tenants')),
  col('files', { name: 'file', type: 'upload', relationTo: 'invoices' } as Field), // an attachment is not a reference
  col('pointed', { name: 'title', type: 'text' }),
  col('pointer', { name: 'rows', type: 'array', fields: [ref('at', 'pointed')] } as Field),
]

describe('partition — which app a collection belongs to, computed', () => {
  const placed = partition(collections, apps, SHARE)
  it('an anchor belongs to its app', () => {
    expect(placed.get('invoices')).toBe('sales')
    expect(placed.get('journals')).toBe('ledger')
  })
  it('a collection takes the app it references most, in either direction', () => {
    expect(placed.get('invoice-lines')).toBe('sales')
    expect(placed.get('postings')).toBe('ledger') // two references to journals beat one to invoices
  })
  it('a tie goes to the app listed first', () => {
    expect(placed.get('ties')).toBe('sales')
    expect(partition(collections, [apps[1]!, apps[0]!, apps[2]!], SHARE).get('ties')).toBe('ledger')
  })
  it('placement spreads round by round from the anchors', () => {
    expect(placed.get('credit-notes')).toBe('sales')
  })
  it('an anchor another plugin owns still pulls its neighbours in', () => {
    expect(placed.get('carts-notes')).toBe('sales')
  })
  it('a hub places nothing: what only points at a hub falls to the last app', () => {
    expect(hubsOf(collections, SHARE)).toEqual(['tenants'])
    expect(placed.get('tags')).toBe('platform')
  })
  it('an upload is an attachment, not a reference', () => {
    expect(placed.get('files')).toBe('platform')
  })
  it('collections tied only to each other, far from any anchor, fall to the last app', () => {
    expect(placed.get('pointer')).toBe('platform')
    expect(placed.get('pointed')).toBe('platform')
  })
  it('is total and puts every collection in exactly one app', () => {
    for (const { slug } of collections) expect(apps.map((a) => a.slug)).toContain(placed.get(slug))
    const sizes = apps.map((app) => collectionsOf(app.slug, collections, apps, SHARE).length)
    expect(sizes.reduce((a, b) => a + b, 0)).toBe(collections.length)
  })
  it('does not depend on the order the collections are given in', () => {
    const reversed = partition([...collections].reverse(), apps, SHARE)
    for (const { slug } of collections) expect(reversed.get(slug)).toBe(placed.get(slug))
  })
  it('the shipped apps end with the one that takes the rest, and no collection anchors two apps', () => {
    expect(APPS[APPS.length - 1]!.anchors).toEqual([])
    const anchors = APPS.flatMap((app) => [...app.anchors])
    expect(new Set(anchors).size).toBe(anchors.length)
  })
})

describe('an app as a Payload plugin', () => {
  const base = { collections: [] } as unknown as Config
  it('adds its collections under the app name and leaves what is already there', () => {
    const existing = { collections: [col('invoices')] } as unknown as Config
    const out = appPlugin(apps[0]!, [col('invoices'), col('invoice-lines')])(existing) as Config
    expect(out.collections!.map((c) => c.slug)).toEqual(['invoices', 'invoice-lines'])
    expect(out.collections![1]!.admin).toMatchObject({ group: 'Sales' })
  })
  it('every app is one plugin, and together they add every collection once', () => {
    const plugins = appPlugins(collections, apps, SHARE)
    expect(plugins.length).toBe(apps.length)
    const out = plugins.reduce((config, plugin) => plugin(config) as Config, base)
    expect(out.collections!.map((c) => c.slug).sort()).toEqual(collections.map((c) => c.slug).sort())
    expect(out.collections!.find((c) => c.slug === 'postings')!.admin).toMatchObject({ group: 'Ledger' })
  })
  it('names the collections other plugins brought, and leaves the rest as they were', () => {
    const brought = { collections: [{ ...col('orders'), admin: { group: 'Ecommerce' } }, { ...col('exports'), admin: { group: 'Tools' } }] } as unknown as Config
    const out = appNavigation(apps)(brought) as Config
    expect(out.collections![0]!.admin).toMatchObject({ group: 'Sales' })
    expect(out.collections![1]!.admin).toMatchObject({ group: 'Tools' })
  })
})
