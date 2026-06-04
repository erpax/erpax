/**
 * Runtime guards for Peppol BIS Billing 3.0 identifier types.
 *
 * @standard Peppol-BIS-3.0 billing
 * @standard ISO-6523-1:1998 participant-identifier-scheme
 * @see ./types.ts
 */

import type {
  PeppolParticipantIdentifierScheme,
  PeppolDocumentTypeId,
  PeppolProfileId,
  PeppolParticipantIdentifier,
} from '@/peppol/bis/3/types'

const SCHEMES = new Set<PeppolParticipantIdentifierScheme>([
  '0007',
  '0009',
  '0088',
  '0096',
  '0097',
  '0184',
  '0192',
  '0193',
  '0204',
  '0211',
  '9906',
  '9914',
  '9920',
  '9925',
  '9930',
  '9933',
  '9938',
  '9944',
  '9946',
  '9952',
  '9956',
  '9957',
])

const DOC_TYPES = new Set<PeppolDocumentTypeId>([
  'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2::Invoice##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1',
  'urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2::CreditNote##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1',
])

const PROFILE_IDS = new Set<PeppolProfileId>([
  'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0',
  'urn:fdc:peppol.eu:2017:poacc:billing:02:1.0',
])

/** Type-narrowing guard for {@link PeppolParticipantIdentifierScheme}. */
export const isPeppolParticipantIdentifierScheme = (
  s: unknown,
): s is PeppolParticipantIdentifierScheme =>
  typeof s === 'string' && SCHEMES.has(s as PeppolParticipantIdentifierScheme)

/** Type-narrowing guard for {@link PeppolDocumentTypeId}. */
export const isPeppolDocumentTypeId = (s: unknown): s is PeppolDocumentTypeId =>
  typeof s === 'string' && DOC_TYPES.has(s as PeppolDocumentTypeId)

/** Type-narrowing guard for {@link PeppolProfileId}. */
export const isPeppolProfileId = (s: unknown): s is PeppolProfileId =>
  typeof s === 'string' && PROFILE_IDS.has(s as PeppolProfileId)

/**
 * Format a {@link PeppolParticipantIdentifier} as the canonical
 * `<scheme>:<value>` string used on the wire.
 *
 *   { scheme: '9930', value: 'DE123456789' } → 'iso6523-actorid-upis::9930:DE123456789'
 *
 * The `iso6523-actorid-upis::` prefix is the Peppol Identifier Scheme
 * for Participant Identifiers — included for full SMP-compatible form.
 */
export const formatPeppolParticipantId = (
  id: PeppolParticipantIdentifier,
): string => `iso6523-actorid-upis::${id.scheme}:${id.value}`

/**
 * Parse a wire-format participant id back into the structured form.
 * Accepts both the `iso6523-actorid-upis::` prefixed form and the
 * bare `<scheme>:<value>` shorthand. Returns null on malformed input
 * or unknown scheme.
 */
export const parsePeppolParticipantId = (
  s: unknown,
): PeppolParticipantIdentifier | null => {
  if (typeof s !== 'string') return null
  const stripped = s.replace(/^iso6523-actorid-upis::/, '')
  const match = stripped.match(/^(\d{4}):(.+)$/)
  if (!match) return null
  const [, scheme, value] = match
  if (!isPeppolParticipantIdentifierScheme(scheme)) return null
  return { scheme, value }
}
