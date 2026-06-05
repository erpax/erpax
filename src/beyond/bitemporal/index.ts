/**
 * Law 14 — Bitemporal queries (system-time × valid-time).
 * Slice ZZZZZ. STUB — full implementation needs a temporal-table
 * extension to Payload's storage layer (TTTTT cross-store will help).
 *
 * @standard SQL:2011 system-versioned + application-time tables
 * @standard ISO/IEC 9075-2:2016 §4.15.10 temporal-tables
 */
import type { BitemporalCoordinates } from '@/beyond/types'

/** Resolve a row's value AS OF (recordedAt, validAt) — pending impl. */
export async function asOf(_args: {
  collection: string
  id: string
  tenantId: string
  coords: BitemporalCoordinates
}): Promise<{ ok: false; reason: string }> {
  return { ok: false, reason: 'Bitemporal query layer pending — needs temporal-table extension to D1' }
}

/** True when the request's recordedAt is in the past (valid bitemporal query). */
export function isHistoricalQuery(coords: BitemporalCoordinates): boolean {
  return new Date(coords.recordedAt).getTime() < Date.now()
}
