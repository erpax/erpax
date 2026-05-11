/**
 * Content-addressable UUID — Law 8 of the conservation suite.
 *
 * Slice RRRRR (2026-05-11). Per user insight: if an object's `uuid`
 * field is deterministically computed from its content, the uuid
 * itself becomes a tamper detector — any in-place edit to the
 * object's fields produces a different uuid when recomputed. This
 * provides Byzantine fault tolerance against privileged database
 * access (admin runs `UPDATE invoices SET amount = 999 WHERE id =
 * …`; recomputed uuid no longer matches stored uuid → flagged).
 *
 * Together with the QQQQ Merkle audit chain (which proves the
 * HISTORY of transitions is intact), content-addressable uuids
 * prove the CURRENT STATE matches what was committed:
 *
 *   Merkle audit chain   → "this transition happened, in order"
 *   Content-uuid (Law 8) → "this row's current bytes match what
 *                          the transition was supposed to produce"
 *
 * The two together are complementary; neither alone is sufficient.
 *
 * Algorithm (deterministic across runtimes / locales / DB engines):
 *
 *   1. Strip the `uuid` field from the object (no self-reference).
 *   2. Strip Payload-managed timestamps (`createdAt`, `updatedAt`)
 *      because they reflect storage events, not content.
 *   3. JSON-canonicalize the remainder per RFC 8785 (sorted keys,
 *      tight whitespace, deterministic number serialization).
 *   4. SHA-256 the canonical bytes (FIPS 180-4).
 *   5. Format as UUIDv5 (RFC 4122 §4.3) using a per-tenant
 *      namespace UUID derived from `tenantId`.
 *
 * The branded type `ContentUuid<T>` carries the source-shape
 * statically so consumers can tell "this uuid is derived from T",
 * not just "this is a uuid".
 *
 * @standard RFC 4122 §4.3 name-based UUID (version 5)
 * @standard RFC 8785 JSON Canonicalization Scheme (JCS)
 * @standard ISO/IEC 10118 hash functions
 * @standard NIST FIPS 180-4 SHA-256
 * @audit ISO 19011:2018 §6.4.6 audit-evidence
 * @compliance SOX §404 internal-controls (Byzantine tamper detection)
 */

import { createHash } from 'node:crypto'
import { encodeStructured, SLOT_TAGS, CAPABILITIES } from '@/services/uuid-format'

/**
 * Branded uuid type: a string that's STATICALLY known to be the
 * content-uuid of T. Mismatched uses become type errors:
 *
 *   const u: ContentUuid<Invoice> = computeContentUuid(invoice, ...)
 *   const v: ContentUuid<Payment> = u  // type error — different brand
 */
export type ContentUuid<T> = string & { readonly __contentUuidOf: T }

/** Fields excluded from the content hash (storage-managed, not content). */
export const NON_CONTENT_FIELDS: ReadonlySet<string> = new Set([
  'uuid', 'id', 'createdAt', 'updatedAt',
  // Payload's revision/version metadata if used:
  '_status', '_version', 'autosave',
])

/**
 * RFC 8785 JSON Canonicalization Scheme — minimal implementation:
 *   - sort object keys lexicographically
 *   - no whitespace
 *   - numbers serialize via ECMA-404 Number.prototype.toString
 *     (sufficient for integers + finite floats; NaN/Infinity rejected)
 *   - strings escape per RFC 8259 §7
 *
 * Rejects `undefined`, functions, and non-finite numbers — these
 * cannot survive a deterministic round-trip.
 */
export function jcsCanonicalize(value: unknown): string {
  if (value === null) return 'null'
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new Error('jcsCanonicalize: non-finite number')
    return JSON.stringify(value)
  }
  if (typeof value === 'string') return JSON.stringify(value)
  if (Array.isArray(value)) {
    return '[' + value.map(jcsCanonicalize).join(',') + ']'
  }
  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>
    const keys = Object.keys(obj).filter((k) => obj[k] !== undefined).sort()
    return '{' + keys.map((k) => JSON.stringify(k) + ':' + jcsCanonicalize(obj[k])).join(',') + '}'
  }
  throw new Error(`jcsCanonicalize: unsupported value type ${typeof value}`)
}

/**
 * Strip non-content fields (uuid, id, timestamps, version metadata)
 * before hashing. Pure function — does not mutate the input.
 */
export function stripNonContentFields<T extends Record<string, unknown>>(obj: T): Omit<T, 'uuid' | 'id' | 'createdAt' | 'updatedAt'> {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (NON_CONTENT_FIELDS.has(k)) continue
    out[k] = v
  }
  return out as Omit<T, 'uuid' | 'id' | 'createdAt' | 'updatedAt'>
}

/**
 * Format 16 raw bytes as a UUIDv5 string per RFC 4122 §4.1.2.
 * Caller is responsible for setting the version + variant bits.
 */
function bytesToUuidString(bytes: Buffer): string {
  const hex = bytes.toString('hex')
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32),
  ].join('-')
}

/**
 * RFC 4122 §4.3 name-based UUID (version 5, SHA-1 historically, but
 * here SHA-256-truncated for FIPS 180-4 alignment + collision
 * resistance). The first 16 bytes of the SHA-256 are used as the
 * raw UUID; the version (5) and variant (RFC 4122) bits are then
 * stamped per the spec.
 */
function nameUuid(namespaceUuid: string, name: string): string {
  // Strip dashes from namespace to recover 16 bytes
  const nsBytes = Buffer.from(namespaceUuid.replace(/-/g, ''), 'hex')
  if (nsBytes.length !== 16) throw new Error(`invalid namespace UUID: ${namespaceUuid}`)
  const nameBytes = Buffer.from(name, 'utf8')
  const hash = createHash('sha256').update(nsBytes).update(nameBytes).digest()
  const bytes = Buffer.from(hash.subarray(0, 16))
  // Set version (5) in the high nibble of byte 6
  bytes[6] = (bytes[6]! & 0x0f) | 0x50
  // Set variant (10xxxxxx, RFC 4122) in the high two bits of byte 8
  bytes[8] = (bytes[8]! & 0x3f) | 0x80
  return bytesToUuidString(bytes)
}

/** Root namespace for ERPax tenant content-uuids — registered ad-hoc. */
export const ERPAX_NAMESPACE_ROOT = '6ba7b810-9dad-11d1-80b4-00c04fd430c8' // RFC 4122 example DNS namespace

/** Derive a stable per-tenant namespace UUID from the tenantId. */
export function tenantNamespace(tenantId: string): string {
  return nameUuid(ERPAX_NAMESPACE_ROOT, `tenant:${tenantId}`)
}

/**
 * Compute the content-uuid of an object — strips non-content fields,
 * JCS-canonicalizes the rest, hashes with SHA-256, formats as
 * UUIDv5 under the per-tenant namespace.
 *
 * Pure function. Re-running on the same object always yields the
 * same uuid; any field change yields a different uuid.
 */
export function computeContentUuid<T extends Record<string, unknown>>(
  obj: T,
  tenantId: string,
): ContentUuid<T> {
  const stripped = stripNonContentFields(obj)
  const canonical = jcsCanonicalize(stripped)
  const ns = tenantNamespace(tenantId)
  return nameUuid(ns, canonical) as ContentUuid<T>
}

/**
 * Verify an object's stored uuid matches its content. Returns
 * { ok: true } on match; { ok: false, expected, actual } on
 * tamper-detection.
 */
export function verifyContentUuid<T extends Record<string, unknown>>(
  obj: T & { uuid?: string },
  tenantId: string,
): { ok: true } | { ok: false; expected: string; actual: string | undefined } {
  const actual = obj.uuid
  if (typeof actual !== 'string') {
    const expected = computeContentUuid(obj, tenantId)
    return { ok: false, expected, actual }
  }
  // Slice ZZZZZZZZZ-cut1 (2026-05-11) — collection rows now emit RFC
  // 9562 uuidv8 (Law 61). Position 14 in canonical 8-4-4-4-12 is the
  // version nibble. v8 → recompute via encodeStructured; v5 → legacy
  // path. Rows persisted under either format still verify correctly.
  if (actual.charAt(14) === '8') {
    const content = stripNonContentFields(obj)
    const expected = encodeStructured({
      slotTag: SLOT_TAGS.collectionRow,
      capabilities: CAPABILITIES.TAMPER_PROOF,
      schemaVersion: 1,
      content,
      tenantId,
    })
    if (actual === expected) return { ok: true }
    return { ok: false, expected, actual }
  }
  // Legacy uuidv5 path preserved.
  const expected = computeContentUuid(obj, tenantId)
  if (actual === expected) return { ok: true }
  return { ok: false, expected, actual }
}
