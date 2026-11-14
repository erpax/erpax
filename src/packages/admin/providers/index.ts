/**
 * Providers — the outside directories erpax can speak to, each as an ADAPTER onto Payload.
 *
 * The schema is Payload's: `users`, `groups`, `org-units`, `roles`, `tenants` keep Payload's own
 * field names and shapes (`email`, `name`, a relationship, an array, nested docs). A provider —
 * Google Workspace, Microsoft Entra, Okta, JumpCloud, or anything that speaks SCIM — never renames a field.
 * It contributes a MAPPING: for each property of each of its resources, the Payload path that
 * holds it, or the reason it does not apply. A new provider is a new folder here and nothing else.
 *
 * So coverage is measured, not claimed. `coverage` reads a provider's own published schema
 * (vendored beside its mapping) and says, property by property:
 *   present        mapped to a path that exists in the collections
 *   wanted         mapped to a path that does not exist yet — a field the schema should gain
 *   not applicable decided, with the reason written down
 *   undecided      not mapped — nobody has looked
 *   unknown        the mapping names a property the provider's schema does not have (a lie)
 * and `wanted` ranks the missing paths by how many providers ask for them: that list is how the
 * schema is determined.
 *
 * Where a provider is switched on: once for the installation (the `providers` global) and per
 * tenant (`tenants.providers`) — see ./settings.
 *
 * @standard RFC-7643 SCIM core schema · RFC-7644 SCIM protocol — the provider-neutral baseline
 * @standard ISO/IEC-25010:2011 §4.2.3 interoperability
 * @see ./google · ./microsoft · ./okta · ./jumpcloud · ./scim (one adapter each) · ./settings
 */
import type { CollectionConfig, Field } from 'payload'
import { google } from '@/packages/admin/providers/google'
import { jumpcloud } from '@/packages/admin/providers/jumpcloud'
import { microsoft } from '@/packages/admin/providers/microsoft'
import { okta } from '@/packages/admin/providers/okta'
import { scim } from '@/packages/admin/providers/scim'
import type { Provider, Target } from '@/packages/admin/providers/types'

export type { Provider, Resource, Target } from '@/packages/admin/providers/types'

/** The providers erpax carries an adapter for. */
export const PROVIDERS: readonly Provider[] = [google, microsoft, okta, jumpcloud, scim]

type Shape = Pick<CollectionConfig, 'slug' | 'fields'> & { auth?: unknown }

/** Fields Payload gives every collection, and the ones `auth` adds. */
const ALWAYS = ['id', 'createdAt', 'updatedAt']
const AUTH = ['email', 'password', 'loginAttempts', 'lockUntil']
/** The collections that are not split by tenant. */
const SPINE = ['tenants', 'users', 'roles']

/**
 * Collections a standard Payload plugin brings, with the fields a mapping may point at. They are
 * not in erpax's own list of collections, so they are named here.
 */
export const PLUGIN_COLLECTIONS: Readonly<Record<string, readonly string[]>> = {
  // @payloadcms/plugin-ecommerce — a user's addresses are documents of this collection
  addresses: ['addressLine1', 'addressLine2', 'city', 'state', 'postalCode', 'country', 'company', 'firstName', 'lastName', 'phone', 'title', 'customer'],
}

const childrenOf = (field: Field): Field[] => {
  const f = field as unknown as { fields?: Field[]; tabs?: Array<{ name?: string; fields: Field[] }> }
  return f.fields ?? []
}

/** Does this dotted path exist in a list of fields? Unnamed containers (row, collapsible, tabs) are transparent. */
export const hasPath = (fields: readonly Field[], path: string): boolean => {
  const [head, ...rest] = path.split('.')
  for (const raw of fields) {
    const field = raw as unknown as { type: string; name?: string; tabs?: Array<{ name?: string; fields: Field[] }> }
    if (field.type === 'tabs') {
      for (const tab of field.tabs ?? []) {
        if (tab.name === undefined ? hasPath(tab.fields, path) : tab.name === head && (rest.length === 0 || hasPath(tab.fields, rest.join('.')))) return true
      }
      continue
    }
    if (field.name === undefined) {
      if (hasPath(childrenOf(raw), path)) return true
      continue
    }
    if (field.name === head) return rest.length === 0 || hasPath(childrenOf(raw), rest.join('.'))
  }
  return false
}

/** Is this collection a tree — does it point at itself through `parent` (so nested docs adds `breadcrumbs`)? */
const isTree = (collection: Shape): boolean =>
  collection.fields.some((field) => 'name' in field && field.name === 'parent' && 'relationTo' in field && field.relationTo === collection.slug)

/** `present`, `wanted`, or `unknown` when the target names a collection that does not exist. */
export const resolve = (target: string, collections: readonly Shape[]): 'present' | 'wanted' | 'unknown' => {
  const [slug, ...rest] = target.split('.')
  const path = rest.join('.')
  const plugin = PLUGIN_COLLECTIONS[slug!]
  if (plugin) return plugin.includes(path) || ALWAYS.includes(path) ? 'present' : 'wanted'
  const collection = collections.find((candidate) => candidate.slug === slug)
  if (!collection || path === '') return 'unknown'
  if (ALWAYS.includes(path) || (collection.auth && AUTH.includes(path)) || (path === 'breadcrumbs' && isTree(collection))) return 'present'
  // the multi-tenant plugin gives every collection but the global spine its `tenant`
  if (path === 'tenant' && !SPINE.includes(collection.slug)) return 'present'
  return hasPath(collection.fields, path) ? 'present' : 'wanted'
}

export interface Row {
  readonly provider: string
  readonly resource: string
  readonly total: number
  readonly present: number
  readonly wanted: readonly string[]
  readonly notApplicable: number
  readonly undecided: readonly string[]
  /** Mapping entries that name a property or a collection that does not exist. Must be empty. */
  readonly unknown: readonly string[]
}

const isNa = (target: Target | undefined): target is { readonly na: string } => typeof target === 'object' && target !== null

/** One provider's resources against the collections, property by property. */
export const coverage = (provider: Provider, collections: readonly Shape[]): Row[] =>
  provider.resources.map((resource) => {
    const ignore = new Set(provider.ignore ?? [])
    const properties = Object.keys(provider.schemas[resource.schema]?.properties ?? {}).filter((property) => !ignore.has(property))
    const unknown = Object.keys(resource.fields).filter((property) => !properties.includes(property))
    if (provider.schemas[resource.schema] === undefined) unknown.push(`schema ${resource.schema}`)
    let present = 0
    let notApplicable = 0
    const wanted: string[] = []
    const undecided: string[] = []
    for (const property of properties) {
      const target = resource.na !== undefined ? { na: resource.na } : resource.fields[property]
      if (target === undefined) undecided.push(property)
      else if (isNa(target)) notApplicable++
      else {
        const state = resolve(target, collections)
        if (state === 'present') present++
        else if (state === 'wanted') wanted.push(target)
        else unknown.push(`${property} → ${target}`)
      }
    }
    return { provider: provider.slug, resource: resource.schema, total: properties.length, present, wanted, notApplicable, undecided, unknown }
  })

export interface Totals {
  readonly provider: string
  readonly total: number
  readonly present: number
  readonly wanted: number
  readonly notApplicable: number
  readonly undecided: number
  /** present ÷ (everything that applies), 0–1. */
  readonly covered: number
}

export const totals = (provider: Provider, collections: readonly Shape[]): Totals => {
  const rows = coverage(provider, collections)
  const sum = (pick: (row: Row) => number): number => rows.reduce((total, row) => total + pick(row), 0)
  const total = sum((row) => row.total)
  const present = sum((row) => row.present)
  const notApplicable = sum((row) => row.notApplicable)
  const applies = total - notApplicable
  return { provider: provider.slug, total, present, wanted: sum((row) => row.wanted.length), notApplicable, undecided: sum((row) => row.undecided.length), covered: applies === 0 ? 1 : present / applies }
}

/** The fields the schema should gain: each missing path with the providers that ask for it, most asked first. */
export const wanted = (providers: readonly Provider[], collections: readonly Shape[]): Array<{ path: string; providers: string[] }> => {
  const asked = new Map<string, Set<string>>()
  for (const provider of providers) for (const row of coverage(provider, collections)) for (const path of row.wanted) asked.set(path, (asked.get(path) ?? new Set<string>()).add(provider.slug))
  return [...asked].map(([path, by]) => ({ path, providers: [...by].sort() })).sort((a, b) => b.providers.length - a.providers.length || a.path.localeCompare(b.path))
}
