import type { FieldHook } from 'payload'

/**
 * The moment an array row reached a status, kept by the server: a date field's `beforeChange` hook
 * that sets the time when the row first has the status, keeps it while the row does, and clears it
 * when the row leaves. Whatever a caller sends is ignored. The row-level sibling of
 * `autoSetTimestamp`, which does this for a document's own status.
 */
export const stampWhen =
  (status: string, statusField = 'status'): FieldHook =>
  ({ siblingData, previousSiblingDoc, previousValue }) => {
    if ((siblingData as Record<string, unknown> | undefined)?.[statusField] !== status) return null
    const kept = (previousSiblingDoc as Record<string, unknown> | undefined)?.[statusField] === status ? previousValue : undefined
    return kept ?? new Date().toISOString()
  }
