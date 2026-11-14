import type { Field } from 'payload'

/**
 * Reference to the IFRS-10 §B86 reporting legal entity. Recurs across
 * accounting / consolidation / ESG / TP collections; should always be
 * the same shape so consolidation can join unambiguously.
 */
export const legalEntityField = (
  opts: { required?: boolean; description?: string } = {},
): Field => ({
  name: 'legalEntity',
  type: 'relationship',
  relationTo: 'legal-entities',
  ...(opts.required ? { required: true } : {}),
  admin: {
    description:
      opts.description ??
      'Reporting legal entity per IFRS-10 §B86 (distinct from `tenants` DB partition).',
  },
});
