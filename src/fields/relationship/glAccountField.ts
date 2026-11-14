import type { Field } from 'payload'

/**
 * GL Account reference with denormalized display fields
 */
export const glAccountField = (required = false): Field[] => [
  {
    name: 'glAccount',
    type: 'relationship',
    relationTo: 'gl-accounts',
    required,
  },
  {
    name: 'accountNumber',
    type: 'text',
    admin: { disabled: true },
  },
  {
    name: 'accountName',
    type: 'text',
    admin: { disabled: true },
  },
];
