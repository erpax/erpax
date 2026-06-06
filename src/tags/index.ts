/**
 * Tags — the universal label primitive (anything is taggable).
 *
 * Port of Rails `acts_as_taggable_on`'s `Tag`. A single shared label
 * collection that, with `taggings`, lets ANY collection be sliced and
 * linked in infinite ways by filtering `(context, tag)` — replacing
 * bespoke category/status/type collections and deep nested groups
 * (`categories` → `context:'category'`, etc.). "Less collections, more
 * features." See the `tags` skill.
 *
 * Identity: the row's `uuid` (injected by `uuidPlugin`) is the
 * content-uuid of its content — derived from `name` (+ tenant) — so the
 * same tag name is the same id on every instance. That single fact
 * REPLACES the gem's `find_or_create_all_with_like_by_name` +
 * name-uniqueness validation + `DuplicateTagError` race-retry: identical
 * content ⇒ identical id ⇒ automatic dedup and seamless federation (see
 * the `identity` skill). `name` is normalised (trim + lower-case) on
 * write so that content-uuid is stable and matching is exact — required
 * because D1/SQLite cannot case-fold multibyte text (see [[database]]).
 *
 * @standard ISO-25964-1:2011 thesauri-and-interoperability controlled-vocabulary
 * @standard RFC-4122 §4.3 uuid content-addressed-id
 * @audit ISO-19011:2018 audit-trail label-changes
 * @compliance SOX §404 internal-controls
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see ./Taggings.ts
 * @see ../plugins/taggable.ts
 */
import type { CollectionConfig } from 'payload'
import { autoPopulateTenant } from '@/auto/populate/tenant'
import { autoPopulateCreatedBy } from '@/auto/populate/created/by'
import { auditTrailAfterChange } from '@/audit/trail/after/change'
import { accountingCollectionAccess } from '@/auth'
import { auditFields, notesField } from '@/base/accounting/field'

const Tags: CollectionConfig = {
  slug: 'tags',
  labels: { singular: 'Tag', plural: 'Tags' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'taggingsCount'],
    description:
      'Universal label. Filter (context, tag) to present any collection infinitely; id = content-uuid(name) ⇒ same tag = same id everywhere.',
  },
  access: accountingCollectionAccess(),
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      index: true,
      admin: {
        description:
          'Tag name. Normalised (trim + lower-case) on write so the content-uuid is stable and matching is exact (D1 cannot case-fold).',
      },
      hooks: {
        beforeValidate: [
          ({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value),
        ],
      },
    },
    {
      name: 'taggingsCount',
      type: 'number',
      defaultValue: 0,
      index: true,
      admin: {
        description: 'Denormalised use-count (counter cache) — drives most/least-used and tag clouds.',
      },
    },
    ...auditFields(),
    notesField(),
  ],
  hooks: {
    beforeValidate: [autoPopulateTenant],
    beforeChange: [autoPopulateCreatedBy],
    afterChange: [auditTrailAfterChange('tags')],
  },
  timestamps: true,
}

export default Tags
