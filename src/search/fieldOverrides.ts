import { Field } from 'payload'

import { localeRecord } from '@/i18n'

export const searchFields: Field[] = [
  {
    name: 'slug',
    type: 'text',
    label: localeRecord('search.slug'),
    index: true,
    admin: {
      readOnly: true,
    },
  },
  {
    name: 'meta',
    label: localeRecord('search.meta'),
    type: 'group',
    index: true,
    admin: {
      readOnly: true,
    },
    fields: [
      {
        type: 'text',
        name: 'title',
        label: localeRecord('search.title'),
      },
      {
        type: 'text',
        name: 'description',
        label: localeRecord('search.description'),
      },
      {
        name: 'image',
        label: localeRecord('search.image'),
        type: 'upload',
        relationTo: 'media',
      },
    ],
  },
  {
    label: localeRecord('search.categories'),
    name: 'categories',
    type: 'array',
    admin: {
      readOnly: true,
    },
    fields: [
      {
        name: 'relationTo',
        type: 'text',
        label: localeRecord('search.relationTo'),
      },
      {
        name: 'categoryID',
        type: 'text',
        label: localeRecord('search.categoryID'),
      },
      {
        name: 'title',
        type: 'text',
        label: localeRecord('search.categoryTitle'),
      },
    ],
  },
]

/**
 * The content-uuid collapse of the search plugin's `doc` reference.
 *
 * @payloadcms/plugin-search defaults `doc` to a polymorphic `relationship` across every searched
 * collection. With erpax indexing all ~200 collections that materializes as a `search_rels` table
 * with ONE FK column per collection (208 cols) — past D1's 100-col cap, so `CREATE TABLE search_rels`
 * fails and the whole schema is un-creatable (push/migrate never complete → stale DB, failing tests).
 *
 * Collapse it to the content-uuid cross-reference: a `group` of `relationTo` (a type discriminator —
 * plain text, exactly like `categories.relationTo` above) + `value` (the target's `id`, which under
 * `idType:'uuid'` already IS a content-uuid). A `group` stores as two flat columns on `search` — NOT
 * a `_rels` table — while still answering the plugin's hardcoded `doc.relationTo`/`doc.value` sync +
 * delete queries unchanged. One uuid coordinate addresses any row across every collection: 208
 * name-columns → 2, fractal at every scale, and forge ≫ verify (re-pointing a ref ⇒ break SHA-256).
 */
export const searchDocField: Field = {
  name: 'doc',
  type: 'group',
  admin: {
    position: 'sidebar',
    readOnly: true,
  },
  fields: [
    {
      name: 'relationTo',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'value',
      type: 'text',
      required: true,
      index: true,
    },
  ],
}
