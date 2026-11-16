/**
 * Enforce segregation of duties — the user who created a document cannot
 * also be the user who approves it ("four-eyes principle").
 *
 * Apply on `beforeChange`. Throws when `data[approverField]` equals the
 * document's `createdBy` (either pre-existing or being set in this same
 * write). Configurable for collections that name the fields differently.
 *
 * @security ISO-27002 §5.3 segregation-of-duties
 * @compliance SOX §404 internal-controls four-eyes-principle
 * @compliance SOC-2 CC6.3 logical-access-controls
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.4
 */

import type { CollectionBeforeChangeHook } from 'payload'

/**
 * The id behind a reference: a plain id, a populated doc (`{ id }`), or Payload 4's built-in authorship
 * (`{ relationTo, value }`). Comparing the raw values made `[object Object]` of the last, so the rule
 * never matched a creator kept by Payload.
 */
export const idOf = (ref: unknown): string | undefined => {
  if (ref === undefined || ref === null || ref === '') return undefined
  if (typeof ref !== 'object') return String(ref)
  const r = ref as { id?: unknown; value?: unknown }
  return r.value !== undefined ? idOf(r.value) : r.id !== undefined ? idOf(r.id) : undefined
}

export function enforceSegregationOfDuties(
  approverField: string = 'approvedBy',
  creatorField: string = 'createdBy',
  errorMessage?: string,
): CollectionBeforeChangeHook {
  return async ({ data, originalDoc, operation, req }) => {
    const approver = idOf(data?.[approverField])
    if (approver === undefined) return data
    // The stored creator wins. On create, Payload's authorship stamps createdBy in a field hook that runs
    // after collection hooks, so the creator is the request's user unless a trusted caller supplied one.
    const creator = idOf(originalDoc?.[creatorField] ?? data?.[creatorField] ?? (operation === 'create' ? req?.user?.id : undefined))
    if (creator !== undefined && creator === approver) {
      throw new Error(
        errorMessage ||
          `Segregation of duties violation: the creator (${creator}) cannot also approve this record. ISO 27002 §5.3 / SOX §404.`,
      )
    }
    return data
  }
}
