import type { Field } from 'payload'

/**
 * Approval fields: who approved the document, and when.
 *
 * The creator is Payload 4's own authorship (`createdBy`), added to every collection when the config
 * is sanitized: stamped from the request's user on the first write, closed to client writes, cleared
 * on duplicate. Pass `{ readOnly: true }` for collections that show the approval to the admin UI (the
 * approver should *see* who/when, just not edit it).
 *
 * @standard ISO-19011:2018 audit-trail
 * @security ISO-27002 §5.3 segregation-of-duties approver-visibility
 */
export const auditFields = (
  options: {
    /** Show `approvedBy` / `approvedAt` as readOnly in admin UI instead of disabled. */
    readOnly?: boolean;
  } = {},
): Field[] => [
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
