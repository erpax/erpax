import type { Field } from 'payload'

/**
 * Audit trail fields (who did what and when).
 *
 * Pass `{ readOnly: true }` for collections that expose the approval lifecycle
 * to the admin UI (the approver should *see* who/when, just not edit it).
 * Default keeps the historical hidden/disabled admin UI for fully-system-managed
 * audit columns.
 *
 * @standard ISO-19011:2018 audit-trail
 * @security ISO-27002 §5.4 segregation-of-duties approver-visibility
 */
export const auditFields = (
  options: {
    /** Show `approvedBy` / `approvedAt` as readOnly in admin UI instead of disabled. */
    readOnly?: boolean;
  } = {},
): Field[] => [
  {
    name: 'createdBy',
    type: 'relationship',
    relationTo: 'users',
    admin: { disabled: true },
  },
  {
    name: 'approvedBy',
    type: 'relationship',
    relationTo: 'users',
    ...(options.readOnly ? { admin: { readOnly: true } } : {}),
  },
  {
    name: 'approvedAt',
    type: 'date',
    admin: options.readOnly ? { readOnly: true } : { disabled: true },
  },
];
