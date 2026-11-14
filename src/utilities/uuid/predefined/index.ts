/**
 * Predefined — every built-in thing as a uuid program.
 *
 * An app, a provider, a collection, a role, a locale: each is something the installation ships
 * with rather than something a tenant wrote. Each gets the same two uuids a document has, both
 * computed and neither stored:
 *
 *   id     from its kind and name alone — stable for as long as it is called that
 *   uuid   from its kind, name and DEFINITION — changes when the definition changes
 *
 * Both are structured uuids (src/utilities/uuid/format), so the sixteen program bits say what the
 * thing is without a lookup. No new slot is added — the layout has a proof and all sixteen slots
 * are taken — so a predefined thing REUSES the slot nearest to what it is:
 *
 *   app         → tenant         an app is itself a tenant
 *   provider    → kvBinding      a binding to something outside the installation
 *   collection  → collectionRow  the definition its rows follow
 *   role        → role
 *   locale      → locale
 *
 * What tells a predefined thing from a tenant's own data in the same slot is the SCHEMA VERSION
 * bits: predefined things are schema 0, and they are computed under one fixed namespace instead of
 * a tenant. They claim no capability. Because nothing here depends on the installation, the same
 * app or provider has the same uuid everywhere.
 *
 * Pure: definitions in, uuids and handles out.
 *
 * @standard RFC-9562 §5.8 uuid version 8
 * @see src/utilities/uuid/format/index.ts (the layout) · src/plugins/handles (resolving them)
 */
import { decodeStructured, encodeStructured, SLOT_TAGS, type SlotName } from '@/utilities/uuid/format'
import { handleOf } from '@/utilities/uuid/handle'

export type Kind = 'app' | 'provider' | 'collection' | 'role' | 'locale'

/** The slot each predefined kind reuses. */
export const SLOT_OF: Readonly<Record<Kind, SlotName>> = { app: 'tenant', provider: 'kvBinding', collection: 'collectionRow', role: 'role', locale: 'locale' }

/** The schema-version bits that mark a predefined thing. */
export const PREDEFINED_SCHEMA = 0

/** The namespace predefined things are computed under, in place of a tenant. */
export const NAMESPACE = 'erpax:predefined'

export interface Entry {
  readonly kind: Kind
  readonly name: string
  /** From kind and name: stable. */
  readonly id: string
  /** From kind, name and definition: the content. */
  readonly uuid: string
  /** The handle of `id`. */
  readonly handle: string
  readonly definition: unknown
}

const program = (kind: Kind, content: unknown): string =>
  encodeStructured({ slotTag: SLOT_TAGS[SLOT_OF[kind]], capabilities: 0, schemaVersion: PREDEFINED_SCHEMA, content, tenantId: NAMESPACE })

/** The handle tail of a predefined kind — a pseudo-collection name no real collection can have. */
export const tailOf = (kind: Kind): string => `@${kind}`

/** One predefined thing as its two uuids and its handle. */
export const entry = (kind: Kind, name: string, definition: unknown = null): Entry => {
  const id = program(kind, { kind, name })
  return { kind, name, id, uuid: program(kind, { kind, name, definition }), handle: handleOf(id, tailOf(kind)), definition }
}

/** Does this uuid carry a predefined program — schema 0 and no capability, in one of the reused slots? */
export const isPredefined = (uuid: string): boolean => {
  try {
    const parts = decodeStructured(uuid)
    return parts.schemaVersion === PREDEFINED_SCHEMA && parts.capabilities === 0 && Object.values(SLOT_OF).includes(parts.slotName)
  } catch {
    return false
  }
}

/** A collection's definition as the shape its rows follow: every field path with its type, sorted. */
export const shapeOf = (fields: ReadonlyArray<unknown>, prefix = ''): string[] => {
  const out: string[] = []
  for (const raw of fields) {
    const field = raw as { type?: string; name?: string; fields?: unknown[]; tabs?: Array<{ name?: string; fields: unknown[] }>; relationTo?: unknown }
    const path = field.name ? `${prefix}${field.name}` : prefix.replace(/\.$/, '')
    if (field.name) out.push(`${path}:${field.type}${field.relationTo !== undefined ? `→${[field.relationTo].flat().join('|')}` : ''}`)
    if (field.fields) out.push(...shapeOf(field.fields, field.name ? `${path}.` : prefix))
    for (const tab of field.tabs ?? []) out.push(...shapeOf(tab.fields, tab.name ? `${prefix}${tab.name}.` : prefix))
  }
  return prefix === '' ? out.sort() : out
}

export interface Sources {
  readonly apps?: ReadonlyArray<{ slug: string; title: string; anchors: readonly string[]; required?: boolean }>
  readonly providers?: ReadonlyArray<{ slug: string; title: string; source: string }>
  readonly collections?: ReadonlyArray<{ slug: string; fields: ReadonlyArray<unknown>; custom?: Record<string, unknown> }>
  readonly roles?: readonly string[]
  readonly locales?: readonly string[]
}

/** Every predefined thing the sources name. */
export const catalogue = (sources: Sources): Entry[] => [
  ...(sources.apps ?? []).map((app) => entry('app', app.slug, { title: app.title, anchors: [...app.anchors], required: app.required === true })),
  ...(sources.providers ?? []).map((provider) => entry('provider', provider.slug, { title: provider.title, source: provider.source })),
  ...(sources.collections ?? []).map((collection) => entry('collection', collection.slug, { app: (collection.custom as { app?: string } | undefined)?.app ?? null, shape: shapeOf(collection.fields) })),
  ...(sources.roles ?? []).map((role) => entry('role', role)),
  ...(sources.locales ?? []).map((locale) => entry('locale', locale)),
]

/** A catalogue indexed by both uuids of every entry. */
export const indexOf = (entries: readonly Entry[]): Map<string, Entry> => new Map(entries.flatMap((item) => [[item.id, item] as const, [item.uuid, item] as const]))
