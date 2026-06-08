/**
 * quantum/request — content-uuid idempotency; compress toward a point; gate still holds.
 *
 * Same content ⇒ same uuid ⇒ external side never billed twice. When cache has seen
 * the uuid, send the hash not the payload.
 *
 *   tsx src/quantum/request/index.ts
 *
 * @audit request id from @/integrity uuid; cache key from quantum/cache
 * @see ../../request — ../cache — ./SKILL.md
 */
import { uuid } from '@/integrity'
import { recordPathVisit, type PathCanonicalEntry } from '@/path'
import { key as cacheKey } from '@/quantum/cache'

/** Content-address the request — the idempotency key and compact identity in one. */
export const requestUuid = (body: unknown): string => uuid(body)

/** Identical calls collapse — replay carries the same uuid. */
export const idempotentReplay = (a: unknown, b: unknown): boolean => requestUuid(a) === requestUuid(b)

/** When cache hit, send hash not payload — squeeze toward a point. */
export function compressedPayload(cached: boolean, body: unknown): string {
  return cached ? requestUuid(body) : JSON.stringify(body)
}

/** Cheapest call still gated — access · broker · receipt. */
export function requestGated(opts: { access: boolean; broker: boolean; receipt: boolean }): boolean {
  return opts.access && opts.broker && opts.receipt
}

/** Cache dedup uses the same content-address as the request identity. */
export const cacheDedupKey = (body: unknown): string => cacheKey(JSON.stringify(body))

/** Canonical ledger hook — record quantum/request path step (append-only). */
export function recordRequestOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('quantum/request', { kind: 'request.step', payload }, at, prevEntryUuid, seq)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const q = { action: 'lookup', hs: '8471' }
  console.log('quantum/request — uuid=' + requestUuid(q) + ' · cached=' + compressedPayload(true, q))
}
