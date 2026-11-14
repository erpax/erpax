/**
 * Naming plugin — tables and enums keep PAYLOAD'S OWN NAMES; a `dbName` is set only where Payload's
 * name would not fit.
 *
 * Payload names an array's table `<collection>_<path>` and a select's enum `enum_<collection>_<path>`,
 * and refuses any identifier longer than 63 characters. Its own answer to a long name is a
 * `dbName` on the field. This plugin applies exactly that answer, mechanically: it walks every
 * collection, works out the LONGEST identifier Payload would derive for each array, block, select
 * and radio (the versions variant, `enum__<collection>_v_version_<path>`, plus a `_locales`
 * suffix), and sets a `dbName` only when that would exceed the limit. Everything else is left
 * for Payload to name.
 *
 * It replaces an earlier rule that renamed EVERY such table and enum to a 33-character content
 * hash (332 of 937 tables), which made the schema unreadable beside stock Payload and was the
 * largest single drift from it. A field's explicit `dbName` is always respected.
 *
 * The `dbName` it sets is readable — the head of the path, then 8 hex characters of the path's
 * content address so two long paths can never collide: `<collection>_<path…>_<8 hex>`.
 *
 * @standard RFC 9562 §5.8 name-based UUID (the digest source)
 * @audit Conservation Law 8 content-uuid (schema identifiers are uuids too)
 * @see https://payloadcms.com/docs/fields/array (`dbName`) · https://payloadcms.com/docs/fields/select (`dbName` · `enumName`)
 */
import type { Config, Field, Plugin } from 'payload'
import { uuid } from '@/utilities/integrity'

/** Payload's limit on a table or enum identifier. */
export const MAX_IDENTIFIER = 63

/** The longest affixes Payload wraps around a field's own name: `enum__` … `_v_version_` … `_locales`. */
const WORST_CASE_AFFIXES = 'enum__'.length + '_v_version_'.length + '_locales'.length

/** What is left for a `dbName` once Payload has added its own affixes to it (`enum__<dbName>_v_locales`). */
export const MAX_DB_NAME = MAX_IDENTIFIER - ('enum__'.length + '_v'.length + '_locales'.length)

/** Payload's snake case for a slug or field name: `lotWorkPhases` · `lot-work-phases` → `lot_work_phases`. */
export const snake = (name: string): string =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase()

/** The name Payload derives from a path, without its affixes: `<collection>_<segment>_<segment>`. */
export const payloadName = (path: readonly string[]): string => path.map(snake).join('_')

/** Would Payload's own identifier for this path fit, in its longest variant? */
export const fits = (path: readonly string[]): boolean => payloadName(path).length + WORST_CASE_AFFIXES <= MAX_IDENTIFIER

/** A readable `dbName` for a path whose Payload name is too long: its head, then 8 hex of its content address. */
export const shortName = (path: readonly string[]): string => {
  const tag = uuid(path.join('.')).replace(/-/g, '').slice(0, 8)
  const head = payloadName(path).slice(0, MAX_DB_NAME - tag.length - 1).replace(/_+$/, '')
  return `${head}_${tag}`
}

interface WalkableField {
  name?: string
  type?: string
  dbName?: unknown
  fields?: Field[]
  tabs?: Array<{ name?: string; fields: Field[] }>
  blocks?: Array<{ slug: string; dbName?: unknown; fields: Field[] }>
}

/** Presentational containers — their children share the parent column space (no path segment). */
const TRANSPARENT = new Set(['row', 'collapsible'])

/** Leave the field for Payload to name; set a `dbName` only when Payload's name would not fit. */
const named = <T extends object>(raw: T, path: readonly string[], explicit: unknown): T =>
  explicit !== undefined || fits(path) ? raw : ({ ...raw, dbName: shortName(path) } as T)

const walk = (fields: Field[] | undefined, path: readonly string[]): Field[] =>
  (fields ?? []).map((raw): Field => {
    const field = raw as WalkableField
    const { type } = field
    const here = field.name ? [...path, field.name] : path

    if (type === 'select' || type === 'radio') return named(raw, here, field.dbName)
    if (type === 'array') return { ...named(raw, here, field.dbName), fields: walk(field.fields, here) } as unknown as Field
    if (type === 'blocks') {
      const blocks = (field.blocks ?? []).map((block) => {
        const at = [...here, block.slug]
        return { ...named(block, at, block.dbName), fields: walk(block.fields, at) }
      })
      return { ...raw, blocks } as unknown as Field
    }
    if (type === 'group') return { ...raw, fields: walk(field.fields, here) } as unknown as Field
    if (type === 'tabs') {
      const tabs = (field.tabs ?? []).map((tab) => ({ ...tab, fields: walk(tab.fields, tab.name ? [...path, tab.name] : path) }))
      return { ...raw, tabs } as unknown as Field
    }
    if (type && TRANSPARENT.has(type)) return { ...raw, fields: walk(field.fields, path) } as unknown as Field
    return raw
  })

export const longNamesPlugin =
  (): Plugin =>
  (config: Config): Config => ({
    ...config,
    collections: (config.collections ?? []).map((collection) => ({
      ...collection,
      fields: walk(collection.fields, [collection.slug]),
    })),
  })
