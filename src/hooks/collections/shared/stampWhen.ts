import type { FieldHook } from 'payload'

/**
 * The moment an array row (or group) reached a status, kept by the server: a date field's `beforeChange`
 * hook that sets the time when the row first has one of the statuses, keeps it while the row does, and
 * clears it when the row leaves them. Whatever a caller sends is ignored. The row-level sibling of
 * `autoSetTimestamp`, which does this for a document's own status.
 */
export const stampWhen =
  (status: string | readonly string[], statusField = 'status'): FieldHook =>
  ({ siblingData, previousSiblingDoc, previousValue }) => {
    const statuses = typeof status === 'string' ? [status] : status
    const has = (row: unknown): boolean => statuses.includes((row as Record<string, unknown> | undefined)?.[statusField] as string)
    if (!has(siblingData)) return null
    const kept = has(previousSiblingDoc) ? previousValue : undefined
    return kept ?? new Date().toISOString()
  }
