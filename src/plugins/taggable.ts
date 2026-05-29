/**
 * Taggable plugin — makes EVERY collection taggable (anything is taggable).
 *
 * Mirrors `contentUuidPlugin`: one injector, all collections. It:
 *   1. Sets `taggings.taggable` to a polymorphic relationship whose
 *      `relationTo` is every taggable collection slug (computed from the
 *      config — the one place that knows them all), so the single
 *      `taggings` join links tags to ANY record.
 *   2. Injects a virtual `tags` **join** field into every taggable
 *      collection (reverse of `taggings.taggable`) — zero stored
 *      columns, so taggable collections keep their schema clean.
 *
 * This is the position-8 (`queries`) merge operator of the [[sequence]]:
 * categories / statuses / types and deep nested groups collapse into
 * `(context, tag)` filtering over one space ("less collections, more
 * features"). See the `tags` skill.
 *
 * LIMIT (Payload — verify with `payload generate:types`): the `join`
 * field over a POLYMORPHIC `on` target. If a Payload version rejects
 * it, pass `joinField: false` — querying `taggings` directly via
 * `taggedWith` is unaffected.
 *
 * @standard RFC-4122 §4.3 uuid
 * @see ../collections/Tags.ts
 * @see ../collections/Taggings.ts
 * @see ../services/tags/taggedWith.ts
 */
import type { Config, Field, Plugin } from 'payload'

/** Not taggable: the tag system itself + Payload internals. */
const NON_TAGGABLE = new Set<string>([
  'tags',
  'taggings',
  'payload-migrations',
  'payload-jobs',
  'payload-locked-documents',
  'payload-preferences',
])

export interface TaggablePluginOptions {
  /** Disable entirely. */
  readonly enabled?: boolean
  /** Inject the reverse `tags` join field into every collection (default true). */
  readonly joinField?: boolean
  /** Extra slugs excluded from being taggable. */
  readonly exclude?: ReadonlyArray<string>
}

const hasField = (fields: Field[] | undefined, name: string): boolean =>
  (fields ?? []).some((f) => 'name' in f && (f as { name?: string }).name === name)

export const taggablePlugin =
  (opts: TaggablePluginOptions = {}): Plugin =>
  (config: Config): Config => {
    if (opts.enabled === false) return config
    const injectJoin = opts.joinField !== false
    const exclude = new Set<string>([...NON_TAGGABLE, ...(opts.exclude ?? [])])

    const collections = config.collections ?? []
    const taggableSlugs = collections
      .map((c) => c.slug)
      .filter((slug): slug is string => typeof slug === 'string' && !exclude.has(slug))

    return {
      ...config,
      collections: collections.map((collection) => {
        // 1. taggings.taggable → polymorphic relationship over every slug.
        if (collection.slug === 'taggings') {
          if (hasField(collection.fields, 'taggable')) return collection
          const taggable = {
            name: 'taggable',
            type: 'relationship',
            relationTo: taggableSlugs,
            required: true,
            index: true,
            admin: { description: 'The tagged record — any taggable collection (polymorphic).' },
          } as unknown as Field
          return { ...collection, fields: [...(collection.fields ?? []), taggable] }
        }

        // 2. Reverse `tags` join on every taggable collection.
        if (!injectJoin || exclude.has(collection.slug) || hasField(collection.fields, 'tags')) {
          return collection
        }
        const tagsJoin = {
          name: 'tags',
          type: 'join',
          collection: 'taggings',
          on: 'taggable',
          admin: { description: 'Taggings on this record (reverse of taggings.taggable).' },
        } as unknown as Field
        return { ...collection, fields: [...(collection.fields ?? []), tagsJoin] }
      }),
    }
  }
