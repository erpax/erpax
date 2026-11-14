import type { Field } from 'payload'

/**
 * ISO 3166-1 alpha-2 country code as a text field with the standard
 * description + indexing. Recurs across 20+ collections (legal-entities,
 * customers, vendors, tax-jurisdictions, tracking-events, customs-
 * declarations, etc.).
 *
 * Validation against the canonical alpha-2 set lives in
 * `src/utilities/iso/3166/1/validate/index.ts`; collections SHOULD invoke it
 * from a `validate` hook when strict checking is needed.
 *
 * @standard ISO 3166-1:2020 country-codes
 */
export const countryCodeField = (
  opts: { name?: string; required?: boolean; description?: string } = {},
): Field => ({
  name: opts.name ?? 'countryCode',
  type: 'text',
  ...(opts.required ? { required: true } : {}),
  index: true,
  admin: {
    description:
      opts.description ?? 'ISO 3166-1 alpha-2 country code (e.g. BG, DE, RO).',
  },
});
