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
 *   5. Format as UUIDv8 (RFC 9562 §5.8) using a per-tenant
 *      namespace UUID derived from `tenantId`.
 *
 * A name-based UUID whose digest is SHA-256 is conformant only as a
 * **uuidv8** (RFC 9562 §5.8, custom/vendor layout) — RFC 9562 §5.5
 * uuidv5 mandates SHA-1, so the SHA-256 content hash is stamped as
 * version 8, never version 5.
 *
 * The branded type `ContentUuid<T>` carries the source-shape
 * statically so consumers can tell "this uuid is derived from T",
 * not just "this is a uuid".
 *
 * @standard RFC 9562 §5.8 name-based UUID (version 8, custom layout)
 * @standard RFC 8785 JSON Canonicalization Scheme (JCS)
 * @standard ISO/IEC 10118 hash functions
 * @standard NIST FIPS 180-4 SHA-256
 * @audit ISO 19011:2018 §6.4.6 audit-evidence
 * @compliance SOX §404 internal-controls (Byzantine tamper detection)
 */

import { createHash } from 'node:crypto'
import { encodeStructured, SLOT_TAGS, CAPABILITIES } from '@/uuid/format'

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
 * Format 16 raw bytes as a canonical UUID string (8-4-4-4-12).
 * Caller is responsible for setting the version + variant bits
 * (RFC 9562 §4.1 variant, §5.8 version).
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
 * The raw SHA-256 (FIPS 180-4) over (namespace ∥ name) — the shared root of
 * both projections. `nameUuid` truncates its first 16 bytes to a 128-bit uuid
 * (≈106 binding bits after the version/variant stamp); `nameDigest` keeps all
 * 256. Factored so the two never drift.
 */
function nameHashBytes(namespaceUuid: string, name: string): Buffer {
  // Strip dashes from namespace to recover 16 bytes
  const nsBytes = Buffer.from(namespaceUuid.replace(/-/g, ''), 'hex')
  if (nsBytes.length !== 16) throw new Error(`invalid namespace UUID: ${namespaceUuid}`)
  return createHash('sha256').update(nsBytes).update(Buffer.from(name, 'utf8')).digest()
}

/**
 * RFC 9562 §5.8 name-based UUID (version 8, custom/vendor layout).
 * The digest is SHA-256 (FIPS 180-4) over (namespace ∥ name); the
 * first 16 bytes become the raw UUID, then the version (8) and
 * variant (0b10) bits are stamped. A SHA-256 name hash is conformant
 * only as v8 — RFC 9562 §5.5 v5 mandates SHA-1 — so the version
 * nibble is 8, never 5.
 */
export function nameUuid(namespaceUuid: string, name: string): string {
  const bytes = Buffer.from(nameHashBytes(namespaceUuid, name).subarray(0, 16))
  // Set version (8) in the high nibble of byte 6 (RFC 9562 §5.8)
  bytes[6] = (bytes[6]! & 0x0f) | 0x80
  // Set variant (10xxxxxx, RFC 9562 §4.1) in the high two bits of byte 8
  bytes[8] = (bytes[8]! & 0x3f) | 0x80
  return bytesToUuidString(bytes)
}

/**
 * The FULL 256-bit SHA-256 over (namespace ∥ name), hex — the un-truncated
 * digest the uuid is derived from (RFC 9562 §5.8 keeps only the first 128 bits).
 */
export function nameDigest(namespaceUuid: string, name: string): string {
  return nameHashBytes(namespaceUuid, name).toString('hex')
}

/** Root namespace for ERPax tenant content-uuids — registered ad-hoc. */
export const ERPAX_NAMESPACE_ROOT = '6ba7b810-9dad-11d1-80b4-00c04fd430c8' // RFC 9562 Appendix A (carried from RFC 4122) example DNS namespace

/** Derive a stable per-tenant namespace UUID from the tenantId. */
export function tenantNamespace(tenantId: string): string {
  return nameUuid(ERPAX_NAMESPACE_ROOT, `tenant:${tenantId}`)
}

/**
 * The universal projection: ANY value → its content-uuid, requiring no
 * external state. This is the erpax `String#uuid` — the limit-case of the
 * Rails string projections (`upper`/`code`/`digits`): each derives a
 * canonical reduced form of `self`; `uuid` derives the lossless, fixed-size
 * 128-bit fingerprint. Identity is a pure projection of content — computed
 * on demand, never invented, never stored. Strings hash directly; any other
 * value is JCS-canonicalized first, so `sql.uuid`, `path.uuid`, and
 * `resource.uuid` are all this one call.
 */
export function uuid(value: unknown): string {
  const name = typeof value === 'string' ? value : jcsCanonicalize(value)
  return nameUuid(ERPAX_NAMESPACE_ROOT, name)
}

/**
 * Compute the content-uuid of an object — strips non-content fields,
 * JCS-canonicalizes the rest, hashes with SHA-256, formats as
 * uuidv8 (RFC 9562 §5.8) under the per-tenant namespace.
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
 * The FULL 256-bit content digest (64 hex chars) of an object — the SAME
 * canonical bytes that feed `computeContentUuid`, but WITHOUT the 128-bit
 * truncation. This is the value an external commitment (Merkle leaf / anchor)
 * must bind: the chosen-content collision floor on the full digest is 2^128
 * (birthday on 256 bits), versus only 2^53 for the 106-bit uuid. The uuid stays
 * the addressing / merge key; this digest is the tamper-evidence commitment.
 *
 * @see services/tamper-cost `anchorCommitmentBits` (the collision path this closes)
 */
export function computeContentDigest<T extends Record<string, unknown>>(
  obj: T,
  tenantId: string,
): string {
  const canonical = jcsCanonicalize(stripNonContentFields(obj))
  return nameDigest(tenantNamespace(tenantId), canonical)
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
  // Two uuidv8 (RFC 9562 §5.8) layouts are in use, both version-8:
  //   - collection rows carry the STRUCTURED uuid (Law 61) emitted by
  //     `encodeStructured` (slot=collectionRow + TAMPER_PROOF flag);
  //   - federation envelopes / storage replicas carry the plain
  //     content-hash uuid emitted by `computeContentUuid`.
  // Both share the version nibble, so we try each and accept a match
  // from either. The structured form is reported as `expected` on
  // mismatch since it is the tamper-proof-row default.
  const content = stripNonContentFields(obj)
  const structuredExpected = encodeStructured({
    slotTag: SLOT_TAGS.collectionRow,
    capabilities: CAPABILITIES.TAMPER_PROOF,
    schemaVersion: 1,
    content,
    tenantId,
  })
  if (typeof actual === 'string' && actual === structuredExpected) return { ok: true }
  const hashExpected = computeContentUuid(obj, tenantId)
  if (typeof actual === 'string' && actual === hashExpected) return { ok: true }
  return { ok: false, expected: structuredExpected, actual: typeof actual === 'string' ? actual : undefined }
}
