import { APIError, type CollectionBeforeChangeHook } from 'payload'

import type { PartyRole } from '@/collections/parties'

/**
 * The rows a party keeps as evidence — its SEPA mandates (EPC130-08 keeps mandate records) and its
 * vendor scorecards (ISO 9001 §8.4.1 retains evaluation results) — are never removed: a mandate is
 * revoked or cancelled, a scorecard closed. And each belongs to one side of the party: a mandate to
 * a customer (the debtor), a scorecard to a vendor.
 */

interface Row {
  id?: string | null
}

const KEPT: readonly { field: string; role: PartyRole; noun: string }[] = [
  { field: 'mandates', role: 'customer', noun: 'SEPA mandate' },
  { field: 'scorecards', role: 'vendor', noun: 'scorecard' },
]

/** Every stored row is still there (matched by id). */
export const rowsKeptError = (stored: readonly Row[], incoming: readonly Row[], noun: string): string | true => {
  const ids = new Set(incoming.map((row) => row.id).filter(Boolean))
  return stored.every((row) => !row.id || ids.has(row.id)) ? true : `A stored ${noun} is never removed.`
}

/** A party carrying these rows holds the role they belong to. */
export const roleError = (rows: readonly Row[], roles: readonly string[], role: PartyRole, noun: string): string | true =>
  rows.length === 0 || roles.includes(role) ? true : `A ${noun} belongs to a ${role}: give the party the ${role} role.`

export const partyRows: CollectionBeforeChangeHook = ({ data, originalDoc }) => {
  if (!data) return data
  const record = data as Record<string, unknown>
  const original = (originalDoc ?? {}) as Record<string, unknown>
  const roles = ((record.roles ?? original.roles ?? []) as string[]).map(String)
  for (const { field, role, noun } of KEPT) {
    const stored = (original[field] ?? []) as Row[]
    const rows = (record[field] ?? stored) as Row[]
    for (const error of [rowsKeptError(stored, rows, noun), roleError(rows, roles, role, noun)]) {
      if (error !== true) throw new APIError(error, 400)
    }
  }
  return data
}
