/**
 * Naming plugin — every INTERNAL DB identifier is a content-uuid of its
 * own path. Names are never invented; they are DERIVED.
 *
 * The law (per user): a multi-word name is a sentence pretending to be an
 * identifier — it smears meaning into the address, and on deep paths it
 * overflows SQLite/Drizzle's 63-char table/enum limit
 * (`enum_<collection>_<group>_<field>`). The cure is position-0 identity
 * at the schema layer: the name IS a uuid — fixed length, so it can NEVER
 * overflow ("the size will always be the same"). One walker replaces every
 * hand-crafted `dbName`.
 *
 * Scope — only NON-REFERENCE identifiers collapse to a uuid:
 *   - select / radio  → the enum name
 *   - array / blocks  → the sub-table name
 * Collection slugs and field/column names stay readable: they are
 * REFERENCES (relationships, the API, URLs navigate by them) and so earn
 * their words. Everything that is not navigated by a human becomes one
 * token. `createTableName` (in @payloadcms/drizzle) replaces the whole
 * identifier with `dbName` (enum) / sub-table name, so the value must be
 * globally unique — the logical path guarantees it. An existing `dbName`
 * is always respected.
 *
 * Mirrors `contentUuidPlugin` / `taggablePlugin`: one walker, all
 * collections, no per-field hand-naming. See the `database` + `identity`
 * skills.
 *
 * @standard RFC 9562 §5.8 name-based UUID (the digest source)
 * @audit Conservation Law 8 content-uuid (schema identifiers are uuids too)
 * @see ../services/integrity/content-uuid.ts (nameUuid — the primitive)
 */
import type { Config, Field, Plugin } from 'payload'
import { uuid } from '@/services/integrity/content-uuid'

/** Fixed-length DB identifier (33 chars): `e` + the path's content-uuid as 32 hex. The leading letter keeps it a valid unquoted SQL identifier (a uuid may start with a digit). */
const uuidName = (path: string): string => 'e' + uuid(path).replace(/-/g, '')

interface WalkableField {
  name?: string
  type?: string
  dbName?: unknown
  hasMany?: boolean
  fields?: Field[]
  tabs?: Array<{ name?: string; fields: Field[] }>
  blocks?: Array<{ slug: string; dbName?: unknown; fields: Field[] }>
}

/** Presentational containers — their children share the parent column space (no path segment). */
const TRANSPARENT = new Set(['row', 'collapsible'])

const walk = (fields: Field[] | undefined, prefix: string): Field[] =>
  (fields ?? []).map((raw): Field => {
    const field = raw as WalkableField
    const { type } = field
    const seg = field.name ? `${prefix}.${field.name}` : prefix

    if ((type === 'select' || type === 'radio') && field.dbName === undefined) {
      return { ...raw, dbName: uuidName(seg) } as unknown as Field
    }
    if (type === 'array') {
      return {
        ...raw,
        dbName: field.dbName ?? uuidName(seg),
        fields: walk(field.fields, seg),
      } as unknown as Field
    }
    if (type === 'blocks') {
      const blocks = (field.blocks ?? []).map((b) => ({
        ...b,
        dbName: b.dbName ?? uuidName(`${seg}.${b.slug}`),
        fields: walk(b.fields, `${seg}.${b.slug}`),
      }))
      return { ...raw, blocks } as unknown as Field
    }
    if (type === 'group') {
      return { ...raw, fields: walk(field.fields, seg) } as unknown as Field
    }
    if (type === 'tabs') {
      const tabs = (field.tabs ?? []).map((t) => ({
        ...t,
        fields: walk(t.fields, t.name ? `${prefix}.${t.name}` : prefix),
      }))
      return { ...raw, tabs } as unknown as Field
    }
    if (type && TRANSPARENT.has(type)) {
      return { ...raw, fields: walk(field.fields, prefix) } as unknown as Field
    }
    return raw
  })

export const uuidNamesPlugin =
  (): Plugin =>
  (config: Config): Config => ({
    ...config,
    collections: (config.collections ?? []).map((collection) => ({
      ...collection,
      fields: walk(collection.fields, collection.slug),
    })),
  })
