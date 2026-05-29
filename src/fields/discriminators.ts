/**
 * The two discriminators the collapse reveals — position 1 ([[fields]]) of the
 * `1·2·4·8` build arc. Every collection that sprawled into bespoke columns
 * folds back through exactly two context-keys on the content-uuid:
 *
 *   `type`  — what a thing IS   → STI subtype discriminator   (see [[sti]])
 *   `role`  — how a thing RELATES → party-role context         (see [[party]], [[tags]])
 *
 * Both are reusable field-factories applied uniformly, never re-rolled per
 * collection — the matter-twin of the `sti`/`party` skills.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @quality ISO-25010 maintainability single-discriminator-vocabulary
 * @see src/types/sti.ts (the typed-STI discriminated-union overlay)
 * @see .claude/skills/sti/SKILL.md · .claude/skills/party/SKILL.md
 */

import type { CollectionSlug, Field } from 'payload'

type Option = { label: string; value: string }
const toOptions = (xs: ReadonlyArray<Option | string>): Option[] =>
  xs.map((x) => (typeof x === 'string' ? { label: x, value: x } : x))

/**
 * `typeField` — the flat STI `type` discriminator (the runtime mirror of the
 * `Sti<Base, Variants>` union in `src/types/sti.ts`). One collection, many
 * behavioral subtypes; branch on `doc.type` (use `matchStiType` for exhaustive
 * dispatch). Flat + indexed so the discriminator's address is always `doc.type`.
 * Keep distinct from any standards/wire code (e.g. EN-16931 invoiceTypeCode).
 */
export const typeField = (
  types: ReadonlyArray<Option | string>,
  opts: { defaultValue?: string; required?: boolean; description?: string } = {},
): Field => ({
  name: 'type',
  type: 'select',
  index: true,
  required: opts.required ?? true,
  options: toOptions(types),
  ...(opts.defaultValue !== undefined ? { defaultValue: opts.defaultValue } : {}),
  admin: {
    description:
      opts.description ?? 'STI subtype discriminator — branch on `type` (see src/types/sti.ts).',
  },
})

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
      relationTo: opts.relationTo ?? ['addresses', 'customers', 'vendors', 'carriers'],
    },
  ],
})
