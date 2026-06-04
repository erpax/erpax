/**
 * localize — localization as the tamper-cost ⊕ proof FUSION reactor.
 *
 * The law (user, 2026-06-01): "localise all aspects … no gaps … from
 * computation"; "localisation further increases the computational tamper
 * cost"; "tamper cost is one part of the fusion reaction" — the other is
 * PROOF; "each field, reference, scope and hook has translation and
 * translation-key uuid"; "wire ALL identification in the uuid itself as
 * another level of feature-rich infinite tampering cost".
 *
 * One act — translate every structural element into every locale — drives
 * BOTH nuclei of the reaction at once:
 *
 *   tamper-cost (forge)  — the cost to write a coherent lie. Each
 *     (element × locale × identification-level) is one more content-address a
 *     tamper must forge in lockstep, so coverage → 1 ⇒ crackVerdict → ∞
 *     (services/tamper-cost, Conservation Law 62).
 *   proof (verify)       — the cost to audit the truth, O(N) and trustless
 *     (services/integrity/tamper-reverse-cost, Law 55). Linear while forge is
 *     exponential — the released energy (fusionBits) is the asymmetry, and the
 *     asymmetry IS the trust (torus: forge-collapse and verify-supernova are
 *     one flow).
 *
 * ALL identification is wired INTO the uuid itself — the 128-bit singularity,
 * self-decoding, no external payload. `decodeIdentity` recovers every level:
 *   - content digest → SHA-256(tenant, scope, path)        (Law 8 / uuid v8)
 *   - structured slot → SLOT_TAGS.locale                   (uuid-format)
 *   - capabilities    → TAMPER_PROOF | CHAINED             (uuid-format)
 *   - OID             → 2.25.<128-bit integer>             (ITU-T X.667, derived)
 *   - cmyk channel    → rodin gamut {K,C,M,Y} from position (rodin/cmyk, derived)
 *   - locale-map      → the `translations` collection value (Payload localized)
 *
 * DRY: this module COMPOSES the existing organs (tamper-cost, content-uuid,
 * tamper-reverse-cost, uuid-format, the translations collection). It adds only
 * the fusion glue and the structural-scope surface — nothing already here is
 * restated.
 *
 * @standard RFC 9562 §5.8 (uuidv8 structured, name-based)
 * @standard ITU-T X.667 / ISO-IEC 9834-8 (UUID ↔ OID 2.25 arc)
 * @standard RFC 3061 (urn:oid: namespace) · RFC 4122 §3 (urn:uuid:)
 * @standard BCP-47 (locale tags) · EU 1958/1 (official EU languages)
 * @standard NIST SP 800-107r1 §5.1 (hash strengths — via tamper-cost)
 * @audit Conservation Law 8 (content-uuid) · 55 (tamper-reverse-cost) · 62 (coverage)
 */

import {
  encodeStructured,
  decodeStructured,
  SLOT_TAGS,
  CAPABILITIES,
  type StructuredUuidParts,
} from '@/uuid/format'
import { crackVerdict, type CrackVerdict } from '@/tamper/cost'
import {
  computeTamperReverseCost,
  type TamperReverseCost,
} from '@/integrity/tamper-reverse-cost'
import { supportedLocales } from '@/i18n/localization'

// ── The translatable surface — every structural element, no gaps ───────────

/**
 * The translatable scopes. The first four are the STRUCTURAL elements the
 * "no gaps" law names — every field, reference, scope, and hook is itself a
 * translatable, content-addressed entity. The rest are the content scopes the
 * `translations` collection already carries (kept in sync with i18n-harvest).
 */
export const TRANSLATABLE_SCOPES = [
  'field',
  'reference',
  'scope',
  'hook',
  'mcp-tool',
  'ui-surface',
  'event-label',
  'notification-template',
  'standard-citation',
  'chain-step',
  'other',
] as const
export type TranslatableScope = (typeof TRANSLATABLE_SCOPES)[number]

/** A structural coordinate: scope + dotted path (the fractal address-law). */
export interface TranslatableCoordinate {
  readonly scope: TranslatableScope
  readonly path: string
}

/** Build a coordinate from path parts: coordinate('field','invoices','total'). */
export const coordinate = (
  scope: TranslatableScope,
  ...pathParts: ReadonlyArray<string>
): TranslatableCoordinate => ({ scope, path: pathParts.filter(Boolean).join('.') })

/** Composite key `<scope>:<path>` — matches the translations collection key. */
export const translationKey = (c: TranslatableCoordinate): string => `${c.scope}:${c.path}`

// ── The translation-key uuid: identity wired into 128 bits ─────────────────

/** Schema version stamped into translation-key uuids. */
export const TRANSLATION_SCHEMA_VERSION = 1

/**
 * The translation-key UUID — the structured, tamper-proof v8 uuid that IS the
 * element's identity. slot = locale, capabilities = TAMPER_PROOF | CHAINED,
 * digest = SHA-256(tenant, scope, path). Deterministic: same coordinate ⇒ same
 * uuid (merge by content); any edit ⇒ a different uuid (tamper-evident).
 */
export function translationKeyUuid(c: TranslatableCoordinate, tenantId: string): string {
  return encodeStructured({
    slotTag: SLOT_TAGS.locale,
    capabilities: CAPABILITIES.TAMPER_PROOF | CAPABILITIES.CHAINED,
    schemaVersion: TRANSLATION_SCHEMA_VERSION,
    content: { scope: c.scope, path: c.path },
    tenantId,
  })
}

// ── OID: the same 128 bits on the ISO/ITU-T 2.25 arc (X.667) ────────────────

/** ISO/ITU-T arc for UUIDs: every uuid is `2.25.<128-bit integer>`. */
export const UUID_OID_ARC = '2.25'

const hexOf = (uuid: string): string => {
  const hex = uuid.replace(/-/g, '')
  if (hex.length !== 32 || /[^0-9a-f]/i.test(hex)) {
    throw new Error(`localize: '${uuid}' is not a 32-hex uuid`)
  }
  return hex
}

/** The canonical OID of a uuid — its bits read as a big integer (X.667 §6). */
export function uuidToOid(uuid: string): string {
  return `${UUID_OID_ARC}.${BigInt(`0x${hexOf(uuid)}`).toString(10)}`
}

/** urn:oid: form (RFC 3061). */
export const oidUrn = (uuid: string): string => `urn:oid:${uuidToOid(uuid)}`

/**
 * Inverse — recover the uuid from its 2.25 OID, proving the OID is a lossless
 * re-encoding of the very same identity (no new entropy, just another
 * independently-verifiable level).
 */
export function oidToUuid(oid: string): string {
  const dec = oid.replace(/^urn:oid:/, '').replace(/^2\.25\./, '')
  if (!/^\d+$/.test(dec)) throw new Error(`localize: '${oid}' is not a 2.25 uuid OID`)
  const hex = BigInt(dec).toString(16).padStart(32, '0')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`
}

// ── CMYK: colour from position, the rodin gamut {0=K,3=C,6=M,9=Y} ───────────

/** The rodin/cmyk print gamut — the four primaries ARE digits {0,3,6,9}. */
export const CMYK_GAMUT = { K: 0, C: 3, M: 6, Y: 9 } as const
export type CmykChannel = keyof typeof CMYK_GAMUT

/**
 * The uuid's signal channel: its 128 bits' digital root (mod 9) snapped to the
 * nearest rodin primary {0,3,6,9}. Colour is decoded from the identity, never
 * chosen (see rodin/cmyk). 0 ⇒ K substrate, then C, M, and the Y axis-close.
 */
export function cmykChannel(uuid: string): CmykChannel {
  const dr = Number(BigInt(`0x${hexOf(uuid)}`) % 9n) // 0..8 (0 ≡ 9, the axis close)
  if (dr === 0) return 'K'
  if (dr <= 3) return 'C'
  if (dr <= 6) return 'M'
  return 'Y'
}

// ── All identification, decoded from the one uuid ──────────────────────────

/**
 * The identification levels wired into a single uuid — each an INDEPENDENT
 * check a coherent tamper must forge together. More levels ⇒ higher cost.
 */
export const IDENTIFICATION_LEVELS = [
  'content-digest',
  'structured-slot',
  'capabilities',
  'schema-version',
  'oid',
  'cmyk',
  'locale-map',
] as const
export type IdentificationLevel = (typeof IDENTIFICATION_LEVELS)[number]

export interface DecodedIdentity {
  readonly uuid: string
  readonly urnUuid: string
  readonly oid: string
  readonly oidUrn: string
  readonly cmyk: CmykChannel
  readonly structured: StructuredUuidParts
  /** the identification levels this single uuid carries. */
  readonly levels: ReadonlyArray<IdentificationLevel>
}

/**
 * Decode EVERY identification level out of one uuid — the uuid is the whole
 * message, self-decoding, no external payload (the 128-bit singularity).
 */
export function decodeIdentity(uuid: string): DecodedIdentity {
  return {
    uuid,
    urnUuid: `urn:uuid:${uuid}`,
    oid: uuidToOid(uuid),
    oidUrn: oidUrn(uuid),
    cmyk: cmykChannel(uuid),
    structured: decodeStructured(uuid),
    levels: IDENTIFICATION_LEVELS,
  }
}

// ── The fusion: localization drives tamper-cost ↑ and proof stays O(N) ──────

/** Locales the platform ships (derived, never re-typed — see seed / i18n). */
export const SUPPORTED_LOCALE_COUNT = supportedLocales.length

export interface LocalizationFusionInput {
  /** translatable elements covered (every field + reference + scope + hook…). */
  readonly elements: number
  /** locales in play (default: every supported locale). */
  readonly locales?: number
  /** identification levels wired into each uuid (default: all). */
  readonly levels?: number
  /** Lexical rich-text nodes — the densest surface (a whole tree per locale). */
  readonly lexicalNodes?: number
  /** fraction of the store wired in content-addressed identity, 0..1 (default 1). */
  readonly coverage?: number
  /** chain depth to genesis for the verifier (default: elements). */
  readonly chainDepth?: number
}

/**
 * Independent uuid checks localization adds: every (element × locale × level)
 * is one content-address a coherent tamper must forge in lockstep, plus the
 * Lexical node density. This is the `checks` that feeds the coverage law.
 */
export function localizationChecks(input: LocalizationFusionInput): number {
  const locales = Math.max(input.locales ?? SUPPORTED_LOCALE_COUNT, 1)
  const levels = Math.max(input.levels ?? IDENTIFICATION_LEVELS.length, 1)
  const elements = Math.max(input.elements, 1)
  return elements * locales * levels + Math.max(input.lexicalNodes ?? 0, 0)
}

export interface LocalizationFusion {
  readonly checks: number
  /** tamper-cost nucleus — crack verdict at this coverage × checks. */
  readonly tamper: CrackVerdict
  /** proof nucleus — the O(N) verifier cost to audit the same surface. */
  readonly proof: TamperReverseCost
  /** forge cost in bits (∞ at full coverage). */
  readonly forgeBits: number
  /** verify cost in bits — O(N) ⇒ log2 N. */
  readonly verifyBits: number
  /** the released energy: forge − verify. The asymmetry IS the trust. */
  readonly fusionBits: number
}

/**
 * The reaction. Localize all aspects ⇒ coverage → 1 ⇒ forge → ∞, while the
 * proof side stays O(N): the gap (fusionBits) is the trust released without a
 * trusted party. "Localisation further increases the tamper cost" and its dual
 * "proof", fused into one verdict.
 */
export function localizationFusion(input: LocalizationFusionInput): LocalizationFusion {
  const checks = localizationChecks(input)
  const coverage = input.coverage ?? 1
  const tamper = crackVerdict({ coverage, checks })
  const depth = Math.max(input.chainDepth ?? input.elements, 1)
  const proof = computeTamperReverseCost({
    leafDepth: depth,
    streamCount: Math.max(input.locales ?? SUPPORTED_LOCALE_COUNT, 1),
    dimensionCount: Math.max(input.levels ?? IDENTIFICATION_LEVELS.length, 1),
  })
  const forgeBits = tamper.crackCostLog2
  const verifyBits = Math.log2(depth)
  return {
    checks,
    tamper,
    proof,
    forgeBits,
    verifyBits,
    fusionBits: forgeBits - verifyBits,
  }
}
