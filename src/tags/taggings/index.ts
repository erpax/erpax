/**
 * Taggings — THE key to "less collections, infinite features".
 *
 * The polymorphic join (port of `acts_as_taggable_on`'s `taggings`):
 * ONE table links a `tag` to ANY record (`taggable`, polymorphic) in a
 * named `context`, optionally by a `tagger` (provenance). Because a
 * single join serves every collection, variation no longer needs new
 * collections or nested field-groups — it becomes a `(context, tag)`
 * row here. `tags` is just the vocabulary; taggings is the engine.
 *
 * The `taggable` polymorphic `relationTo` (every taggable slug) and the
 * reverse `tags` join on each collection are injected by
 * `taggablePlugin` — it alone knows every slug at config time. This
 * file declares the `tag` / `context` / `tagger` columns; the plugin
 * wires the rest.
 *
 * Identity / dedup: the row's content-uuid hashes (tag, taggable,
 * context, tagger) (+ tenant), so the gem's UNIQUE composite index
 * `[tag, taggable_type, taggable_id, context, tagger]` becomes
 * AUTOMATIC — the same (tag, target, context, tagger) is the same id ⇒
 * a tagging cannot be stored twice ("dry storage"); see the `identity`
 * skill.
 *
 * `context` is a free string ⇒ UNLIMITED label-sets with zero schema —
 * the "infinite presentations" lever. categories / statuses / types
 * collapse into `(context:'category'|'status'|'type', tag)`. Slice by
 * filtering, link across collections by sharing a tag. See the `tags`
 * skill; query via `services/tags/taggedWith`.
 *
 * @standard ISO-25964-1:2011 thesauri associative-relationships
 * @standard RFC-4122 §4.3 uuid content-addressed-dedup
 * @audit ISO-19011:2018 audit-trail tagging-provenance
 * @compliance SOX §404 internal-controls
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Tags.ts
 * @see ../plugins/taggable.ts (injects `taggable` + the reverse `tags` join)
 * @see ../services/tags/taggedWith.ts
 */
import type { CollectionConfig } from 'payload'
import { standardCollectionHooks } from '@/standard/collection/hook'
import { accountingCollectionAccess } from '@/auth'
import { auditFields } from '@/base/accounting/field'
import { taggingCounterAfterChange, taggingCounterAfterDelete } from '@/tags/taggings/counter'

const Taggings: CollectionConfig = {
  slug: 'taggings',
  labels: { singular: 'Tagging', plural: 'Taggings' },
  admin: {
    useAsTitle: 'context',
    defaultColumns: ['tag', 'context', 'taggable', 'tagger'],
    description:
      'Polymorphic join (tag × taggable × context × tagger). One table tags every collection; content-uuid makes each (tag, target, context, tagger) unique automatically.',
  },
  access: accountingCollectionAccess(),
  fields: [
    {
      name: 'tag',
      type: 'relationship',
      relationTo: 'tags',
      required: true,
      index: true,
      admin: { description: 'The label applied.' },
    },
    // `taggable` (polymorphic `relationTo: [...every slug]`) is injected
    // by taggablePlugin — only it knows all collection slugs at config time.
    {
      name: 'context',
      type: 'text',
      required: true,
      defaultValue: 'tags',
      index: true,
      admin: {
        description:
          "Tag context / namespace (e.g. 'category', 'status', 'segment'). Free string ⇒ unlimited contexts, zero schema — the infinite-features lever.",
      },
    },
    {
      name: 'tagger',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      index: true,
      admin: { description: 'Optional owner / provenance — who applied the tag (acts_as_tagger).' },
    },
    ...auditFields(),
  ],
  hooks: {
    // The counter cache rides the spine: a create bumps the tag's taggingsCount
    // (afterChange), a delete drops it (afterDelete) — the gem's counter_cache.
    ...standardCollectionHooks('taggings', { afterChange: [taggingCounterAfterChange] }),
    afterDelete: [taggingCounterAfterDelete],
  },
  timestamps: true,
}

export default Taggings
