/**
 * Enforce segregation of duties — the user who created a document cannot
 * also be the user who approves it ("four-eyes principle").
 *
 * Apply on `beforeChange`. Throws when `data[approverField]` equals the
 * document's `createdBy` (either pre-existing or being set in this same
 * write). Configurable for collections that name the fields differently.
 *
 * @security ISO-27002 §5.4 segregation-of-duties
 * @compliance SOX §404 internal-controls four-eyes-principle
 * @compliance SOC-2 CC6.3 logical-access-controls
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.4
 */

import type { CollectionBeforeChangeHook } from 'payload'

export function enforceSegregationOfDuties(
  approverField: string = 'approvedBy',
  creatorField: string = 'createdBy',
  errorMessage?: string,
): CollectionBeforeChangeHook {
  return async ({ data, originalDoc }) => {
    const approver = data?.[approverField]
    if (approver === undefined || approver === null) return data
    const creator = data?.[creatorField] ?? originalDoc?.[creatorField]
    if (creator !== undefined && creator !== null && String(creator) === String(approver)) {
      throw new Error(
        errorMessage ||
          `Segregation of duties violation: the creator (${creator}) cannot also approve this record. ISO 27002 §5.4 / SOX §404.`,
      )
    }
    return data
  }
}
