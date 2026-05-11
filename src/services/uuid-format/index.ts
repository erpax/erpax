/**
 * Structured uuidv8 — uuid carries its own features.
 *
 * Slice UUUUUUUUU-cut1 (2026-05-11). Per user 'adding also the
 * capacity of the uuid format to store data in itself usable for
 * adding features or infinities so all becomes fusion and thus
 * untamperrable with'.
 *
 * The fusion: identity + verification + features + version collapse
 * into a single 128-bit primitive. Looking at the uuid tells you
 * what kind of thing it is, what capabilities it has, what schema
 * version, AND verifies its content — all without a side-table
 * lookup. Tampering with any feature flag changes the uuid → cascades
 * through the signature + chain (Law 55) → exponential cost.
 *
 * RFC 9562 §6.4 reserves uuidv8 (`ver = 8`) for implementation-
 * defined custom formats. We use the 122 free bits as:
 *
 *   bits  0..47   contentDigest_high  (48 bits)
 *   bits 48..51   version = 8         (RFC 9562 mandatory)
 *   bits 52..63   contentDigest_mid   (12 bits)
 *   bits 64..65   variant = 0b10      (RFC 4122 mandatory)
 *   bits 66..69   slot tag            (4 bits — 16 categories)
 *   bits 70..77   capability flags    (8 bits — 256 combinations)
 *   bits 78..81   schema version      (4 bits — 16 schema revisions)
 *   bits 82..127  contentDigest_low   (46 bits)
 *
 * Total content-binding bits: 48 + 12 + 46 = 106 bits of sha-256
 * truncation. Vastly more collision-resistant than ERPax's scale
 * needs (10^9 rows × 10^9 tenants × all-history = ~10^25 distinct
 * uuids ≪ 2^53, while the structured form provides 2^106 search
 * space for collision resistance).
 *
 * **Conservation Law 61 (uuid carries its own features):** the uuid
 * is no longer just a hash handle. It's a self-describing structured
 * artefact whose bits encode the entity's category, capabilities,
 * and schema version. All four properties verify simultaneously when
 * the chain recomputes the uuid (Law 60). No external table is
 * needed to know what a uuid "is".
 *
 * Composition with prior laws:
 *   - Law 8 + 47 — content-uuid + type-brand: structured uuid is
 *                  both, with type-level Tag + Capabilities phantom.
 *   - Law 53 + 54 — identity element: slot tag identifies the
 *                  category; the blank-value uuid uses capability=0.
 *   - Law 55 — tamper cost: every bit of slot/capability/version is
 *              part of the chain leaf payload; flipping one bit
 *              cascades the chain reverse-cost.
 *   - Law 57 — kv-binding: structured uuid maps key→value with the
 *              capability bits acting as transparent annotations.
 *   - Law 58 — self-protection: the format itself is enumerable
 *              (capability bit positions are documented constants).
 *   - Law 60 — blockchain: chain leaves are structured uuids whose
 *              slot tag = CHAIN_LEAF.
 *
 * @standard RFC 9562 §6.4 uuidv8 (custom formats)
 * @standard RFC 4122 §4.1.2 variant bits
 * @standard NIST FIPS 180-4 SHA-256 (the truncated digest source)
 * @standard ITU-T X.667 / ISO/IEC 9834-8 (uuid registration)
 * @audit Conservation Law 61 uuid-carries-features
 * @feature uuid_format
 * @see ../integrity/content-uuid.ts (computeContentUuid — the digest source)
 * @see ../uuid-kv/index.ts (KvBinding — keys + values can be structured)
 * @see ../uuid-chain/index.ts (ChainLink — leaves can be structured)
 */

import { createHash } from 'node:crypto'

/**
 * Slot tags — 4 bits, 16 categories.
 *
 * Slice AAAAAAAAAA-cut1 (2026-05-11) — `error` (0xf) replaces the
 * placeholder `reserved` slot. Per user "error handling is also
 * part of the uuid": errors are first-class structured uuid entities
 * that flow through the chain alongside auditEvents and chainLeaves.
 * Conservation Law 64.
 */
export const SLOT_TAGS = {
  currency:        0x0,
  locale:          0x1,
  country:         0x2,
  user:            0x3,
  tenant:          0x4,
  role:            0x5,
  chainLeaf:       0x6,
  share:           0x7,
  auditEvent:      0x8,
  query:           0x9,
  rateQuote:       0xa,
  signature:       0xb,
  envelope:        0xc,
  kvBinding:       0xd,
  collectionRow:   0xe,
  error:           0xf,   // Slice AAAAAAAAAA — was 'reserved'
} as const

export type SlotTag = (typeof SLOT_TAGS)[keyof typeof SLOT_TAGS]
export type SlotName = keyof typeof SLOT_TAGS

/** Capability flags — 8 bits, each a power of two for bitwise composition. */
export const CAPABILITIES = {
  SIGNED:             1 << 0,  // SignedUuid envelope exists (Slice HHHHHHHHH)
  SEALED:             1 << 1,  // chain leaf is at a stream pause point
  ENCRYPTED:          1 << 2,  // CipherEnvelope wraps the payload
  FEDERATED:          1 << 3,  // exported / known by federation peers
  ANCHORED_BLOCKCHAIN:1 << 4,  // anchored to a public blockchain (Slice BBBBBB)
  CHAINED:            1 << 5,  // participates in a uuid-chain (Law 60)
  SHARED:             1 << 6,  // a share grant binds this uuid (Slice SSSSSSSSS)
  TAMPER_PROOF:       1 << 7,  // member of TAMPER_PROOF_COLLECTIONS_REGISTRY
} as const

export type CapabilityFlag = (typeof CAPABILITIES)[keyof typeof CAPABILITIES]

/** Decoded view of a structured uuid. */
export interface StructuredUuidParts {
  readonly slotTag: SlotTag
  readonly slotName: SlotName
  readonly capabilities: number    // bitfield of CapabilityFlag
  readonly capabilityNames: ReadonlyArray<keyof typeof CAPABILITIES>
  readonly schemaVersion: number   // 0..15
  /** Hex string of the 106-bit content digest assembled from the three regions. */
  readonly contentDigestHex: string
  /** The full uuid in canonical 8-4-4-4-12 form. */
  readonly uuid: string
}

// ─── Encoding ─────────────────────────────────────────────────────────

function slotNameFor(tag: SlotTag): SlotName {
  for (const [name, t] of Object.entries(SLOT_TAGS)) {
    if (t === tag) return name as SlotName
  }
  return 'error'
}

/** Hex helpers for the 16-byte buffer. */
function toHex(b: Uint8Array, start: number, count: number): string {
  let out = ''
  for (let i = start; i < start + count; i++) {
    out += b[i]!.toString(16).padStart(2, '0')
  }
  return out
}

function formatUuid(b: Uint8Array): string {
  return `${toHex(b, 0, 4)}-${toHex(b, 4, 2)}-${toHex(b, 6, 2)}-${toHex(b, 8, 2)}-${toHex(b, 10, 6)}`
}

function parseUuid(uuid: string): Uint8Array {
  const hex = uuid.replace(/-/g, '')
  if (hex.length !== 32) throw new Error(`parseUuid: '${uuid}' is not a 32-hex uuid`)
  const b = new Uint8Array(16)
  for (let i = 0; i < 16; i++) b[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16)
  return b
}

/**
 * Encode a structured uuid carrying (slotTag, capabilities,
 * schemaVersion) + a content digest computed from `content` under
 * `tenantId`. The capability bits influence the resulting uuid —
 * tampering with any flag produces a different uuid (which then
 * fails to match the stored value in the chain).
 *
 *   encodeStructured({
 *     slotTag: SLOT_TAGS.share,
 *     capabilities: CAPABILITIES.SIGNED | CAPABILITIES.SEALED | CAPABILITIES.SHARED,
 *     schemaVersion: 1,
 *     content: { grantee, target, role },
 *     tenantId: 'tenant-1',
 *   })
 */
export function encodeStructured(args: {
  slotTag: SlotTag
  capabilities: number   // bitfield
  schemaVersion: number  // 0..15
  content: unknown
  tenantId: string
}): string {
  const { slotTag, capabilities, schemaVersion, content, tenantId } = args
  if (slotTag < 0 || slotTag > 0xf) throw new Error(`encodeStructured: slotTag ${slotTag} out of range (0..15)`)
  if (capabilities < 0 || capabilities > 0xff) throw new Error(`encodeStructured: capabilities ${capabilities} out of range (0..255)`)
  if (schemaVersion < 0 || schemaVersion > 0xf) throw new Error(`encodeStructured: schemaVersion ${schemaVersion} out of range (0..15)`)

  // SHA-256 of (tenantId, slotTag, capabilities, schemaVersion, content)
  // so any change — including a capability flip — produces a new digest.
  // The capability bits are also placed at fixed positions in the uuid;
  // matching them at decode time confirms the encoded flags equal the
  // flags used at encode time.
  const json = JSON.stringify({
    tenantId,
    slotTag,
    capabilities,
    schemaVersion,
    content,
  })
  const digest = new Uint8Array(createHash('sha256').update(json).digest())

  // Build the 16-byte uuid.
  const b = new Uint8Array(16)
  // Bits 0..47 ← digest[0..5] (48 bits)
  for (let i = 0; i < 6; i++) b[i] = digest[i]!
  // Bits 48..51 = version 8; bits 52..63 ← digest_mid (12 bits)
  // Byte 6 high nibble = version; low nibble + byte 7 = 12 bits of digest_mid.
  const digestMid12 = ((digest[6]! << 4) | (digest[7]! >> 4)) & 0xfff
  b[6] = (0x8 << 4) | ((digestMid12 >> 8) & 0xf)
  b[7] = digestMid12 & 0xff
  // Bits 64..65 = variant 0b10; bits 66..69 = slotTag; bits 70..77 = capabilities; bits 78..81 = schemaVersion
  // Byte 8 high 2 bits = variant, next 4 bits = slotTag, low 2 bits = top 2 of capabilities.
  b[8] = (0b10 << 6) | ((slotTag & 0xf) << 2) | ((capabilities >> 6) & 0b11)
  // Byte 9: low 6 bits of capabilities + high 2 of schemaVersion
  b[9] = ((capabilities & 0b111111) << 2) | ((schemaVersion >> 2) & 0b11)
  // Bits 82..127 (46 bits) split across byte 10..15
  // First 2 bits of byte 10 are low 2 of schemaVersion; remaining 46 bits = digest_low (digest[8..14]+top 6 of digest[15])
  const digestLow6 = digest[8]!
  const digestLow7 = digest[9]!
  const digestLow8 = digest[10]!
  const digestLow9 = digest[11]!
  const digestLow10 = digest[12]!
  const digestLow11 = digest[13]!   // 7 bytes total but we only have 46 bits = 5 bytes + 6 bits
  b[10] = ((schemaVersion & 0b11) << 6) | ((digestLow6 >> 2) & 0b111111)
  // Continue packing: each subsequent byte holds 2 bits carry from previous + 6 of next
  b[11] = ((digestLow6 & 0b11) << 6) | ((digestLow7 >> 2) & 0b111111)
  b[12] = ((digestLow7 & 0b11) << 6) | ((digestLow8 >> 2) & 0b111111)
  b[13] = ((digestLow8 & 0b11) << 6) | ((digestLow9 >> 2) & 0b111111)
  b[14] = ((digestLow9 & 0b11) << 6) | ((digestLow10 >> 2) & 0b111111)
  b[15] = ((digestLow10 & 0b11) << 6) | ((digestLow11 >> 2) & 0b111111)

  return formatUuid(b)
}

// ─── Decoding ─────────────────────────────────────────────────────────

/**
 * Decode a structured uuid. Returns the embedded slotTag, capability
 * flags, schema version, and the 106-bit content digest hex.
 *
 * Throws if the uuid isn't uuidv8 or the variant bits don't match
 * RFC 4122 §4.1.2 — both invariants the encoder upholds.
 */
export function decodeStructured(uuid: string): StructuredUuidParts {
  const b = parseUuid(uuid)
  // Version is high nibble of byte 6.
  const version = (b[6]! >> 4) & 0xf
  if (version !== 8) {
    throw new Error(`decodeStructured: expected uuidv8 (version=8) but got version=${version}`)
  }
  // Variant is high 2 bits of byte 8 — must be 0b10.
  const variant = (b[8]! >> 6) & 0b11
  if (variant !== 0b10) {
    throw new Error(`decodeStructured: expected RFC 4122 variant 0b10 but got 0b${variant.toString(2).padStart(2, '0')}`)
  }
  // Extract fields.
  const slotTag = ((b[8]! >> 2) & 0xf) as SlotTag
  const capabilities = ((b[8]! & 0b11) << 6) | ((b[9]! >> 2) & 0b111111)
  const schemaVersion = ((b[9]! & 0b11) << 2) | ((b[10]! >> 6) & 0b11)

  // Assemble digest hex from the three regions.
  const digestHigh = toHex(b, 0, 6)
  const digestMid12 = ((b[6]! & 0xf) << 8) | b[7]!
  // Reverse the bit-packing for digestLow.
  const digestLowBytes: number[] = []
  for (let i = 10; i < 16; i++) {
    digestLowBytes.push(((b[i]! & 0b111111) << 2) | (i < 15 ? ((b[i + 1]! >> 6) & 0b11) : 0))
  }
  const digestLow = digestLowBytes.map((n) => n.toString(16).padStart(2, '0')).join('')

  const contentDigestHex = `${digestHigh}${digestMid12.toString(16).padStart(3, '0')}${digestLow}`

  // Capability names — every set bit maps to its name.
  const capabilityNames: Array<keyof typeof CAPABILITIES> = []
  for (const [name, bit] of Object.entries(CAPABILITIES)) {
    if ((capabilities & bit) !== 0) capabilityNames.push(name as keyof typeof CAPABILITIES)
  }

  return {
    slotTag,
    slotName: slotNameFor(slotTag),
    capabilities,
    capabilityNames,
    schemaVersion,
    contentDigestHex,
    uuid,
  }
}

// ─── Capability helpers ──────────────────────────────────────────────

/** Compose capability flags via OR. */
export function withCapabilities(...flags: ReadonlyArray<CapabilityFlag>): number {
  let acc = 0
  for (const f of flags) acc |= f
  return acc & 0xff
}

/** True iff the uuid has the given capability flag set. */
export function hasCapability(uuid: string, flag: CapabilityFlag): boolean {
  const parts = decodeStructured(uuid)
  return (parts.capabilities & flag) !== 0
}

/**
 * Verify that a uuid was encoded from a specific (content, tenantId,
 * slotTag, capabilities, schemaVersion) tuple. Re-encodes from the
 * inputs and compares — equivalent to `verifyContentUuid` for the
 * structured format.
 */
export function verifyStructured(args: {
  uuid: string
  slotTag: SlotTag
  capabilities: number
  schemaVersion: number
  content: unknown
  tenantId: string
}): boolean {
  const expected = encodeStructured({
    slotTag: args.slotTag,
    capabilities: args.capabilities,
    schemaVersion: args.schemaVersion,
    content: args.content,
    tenantId: args.tenantId,
  })
  return expected === args.uuid
}
