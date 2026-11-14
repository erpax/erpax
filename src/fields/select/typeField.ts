import type { Field } from 'payload'

type Option = { label: string; value: string }
const toOptions = (xs: ReadonlyArray<Option | string>): Option[] =>
  xs.map((x) => (typeof x === 'string' ? { label: x, value: x } : x))
/**
 * `typeField` — the flat STI `type` discriminator (the runtime mirror of the
 * `Sti<Base, Variants>` union in `src/types/sti/index.ts`). One collection, many
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
