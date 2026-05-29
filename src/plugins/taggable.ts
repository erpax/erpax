/**
 * Taggable plugin — makes EVERY record taggable by content-uuid.
 *
 * "Anything is taggable" is realised the same way as "anything is accountable"
 * (see the `identity` skill): the tagged record is referenced by its
 * **content-uuid** — ONE `text` column (`taggable`) plus its collection slug
 * (`taggableType`) — NOT a Payload polymorphic `relationTo:[…all]`.
 *
 * WHY (D1 100-column cap): a polymorphic relationship materialises one FK
 * column per target collection in `taggings_rels`; with 200+ collections that
 * is 200+ columns, past **D1's hard 100-column-per-table limit** — the schema
 * becomes un-creatable (`payload migrate` → `D1_ERROR: too many columns on
 * taggings_rels`). The content-uuid column is ONE column for all targets and
 * federates (same content ⇒ same id everywhere; see the `identity` skill).
 * Verify with `pnpm d1:audit`.
 *
 * Reverse lookup ("tags on this record") is a query, not a stored join field:
 * `taggedWith(payload, slug, …)` filters `taggings` by `(taggableType, tag,
 * context)` — see ../services/tags/taggedWith.ts and the `tags` skill.
 *
 * @standard RFC-4122 §4.3 uuid
 * @see ../collections/Taggings.ts · ../services/tags/taggedWith.ts · the `tags` skill
 */
import type { Config, Field, Plugin } from 'payload'

export interface TaggablePluginOptions {
  /** Disable entirely. */
  readonly enabled?: boolean
}

const hasField = (fields: Field[] | undefined, name: string): boolean =>
  (fields ?? []).some((f) => 'name' in f && (f as { name?: string }).name === name)

export const taggablePlugin =
  (opts: TaggablePluginOptions = {}): Plugin =>
  (config: Config): Config => {
    if (opts.enabled === false) return config
    const collections = config.collections ?? []

    return {
      ...config,
      collections: collections.map((collection) => {
        if (collection.slug !== 'taggings') return collection
        if (hasField(collection.fields, 'taggable')) return collection
        // Polymorphic-by-content-uuid: ONE text column for ALL targets, vs a
        // `relationTo:[…all]` _rels table with one FK column per collection
        // (200+ cols → over D1's 100-col cap; see the file banner).
        const taggable: Field = {
          name: 'taggable',
          type: 'text',
          required: true,
          index: true,
          admin: { description: 'The tagged record, by content-uuid (any collection — polymorphic via uuid).' },
        }
        const taggableType: Field = {
          name: 'taggableType',
          type: 'text',
          index: true,
          admin: { description: "The tagged record's collection slug (the polymorphic context)." },
        }
        return { ...collection, fields: [...(collection.fields ?? []), taggable, taggableType] }
      }),
    }
  }
