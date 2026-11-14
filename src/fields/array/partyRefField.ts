import type { CollectionSlug, Field } from 'payload'

type Option = { label: string; value: string }
const toOptions = (xs: ReadonlyArray<Option | string>): Option[] =>
  xs.map((x) => (typeof x === 'string' ? { label: x, value: x } : x))
/**
 * `partyRefField` — one party referenced under many roles. Replaces the ~13
 * bespoke FK columns (seller/buyer/sellerAgent/buyerAgent/supplier/consignee/
 * shippingAgent/packedBy/shippedBy/deliveredBy/authorizedBy/sender/receiver)
 * with a single context-keyed, polymorphic party array — each row is
 * `{ role, party }`. Multi-party by construction; the role is the tag-context;
 * the reference points OUT to whichever party collection holds the entity.
 */
export const partyRefField = (
  roles: ReadonlyArray<Option | string>,
  opts: {
    name?: string
    relationTo?: CollectionSlug[]
    hasMany?: boolean
    description?: string
  } = {},
): Field => ({
  name: opts.name ?? 'parties',
  type: 'array',
  admin: {
    description: opts.description ?? 'Document parties — one entry per (role, party).',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      index: true,
      options: toOptions(roles),
    },
    {
      name: 'party',
      type: 'relationship',
      required: true,
      relationTo: opts.relationTo ?? ['addresses', 'parties', 'carriers'],
    },
  ],
})
