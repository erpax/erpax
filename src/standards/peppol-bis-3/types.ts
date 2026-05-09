/**
 * Canonical Peppol BIS Billing 3.0 types — envelope around EN-16931.
 *
 * The semantic invoice model lives in `@/standards/en-16931`. This
 * module carries the Peppol-specific envelope (CustomizationID +
 * ProfileID + ParticipantIdentifier + EndpointID) and the BIS 3.0
 * billing-process profile ids.
 *
 * @standard Peppol-BIS-3.0 billing
 * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
 * @standard UBL-2.1 universal-business-language
 * @standard ISO-6523-1:1998 participant-identifier-scheme
 * @audit ISO-19011:2018 audit-trail
 * @see ./README.md
 */

import type { InvoiceHeader, InvoiceLine, DocumentTotals, VatBreakdown } from '@/standards/en-16931'

// ─── Customization + Profile ids ──────────────────────────────────────

/**
 * The CustomizationID Peppol BIS Billing 3.0 mandates on the wire.
 * EN 16931 syntax-binding + Peppol customization marker.
 *
 * @standard Peppol-BIS-3.0 customization-id
 */
export const PEPPOL_BIS_3_CUSTOMIZATION_ID =
  'urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0' as const

/**
 * The ProfileID — the BIS billing process identifier. `01:1.0` is the
 * standard invoice-response process; `02:1.0` is invoice-only (no
 * application response expected).
 *
 * @standard Peppol-BIS-3.0 profile-id
 */
export type PeppolProfileId =
  | 'urn:fdc:peppol.eu:2017:poacc:billing:01:1.0'
  | 'urn:fdc:peppol.eu:2017:poacc:billing:02:1.0'

/**
 * Document type identifier for an invoice. The credit-note variant
 * uses CreditNote-2 instead of Invoice-2.
 *
 * @standard Peppol-BIS-3.0 document-type-id
 */
export type PeppolDocumentTypeId =
  | 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2::Invoice##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1'
  | 'urn:oasis:names:specification:ubl:schema:xsd:CreditNote-2::CreditNote##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1'

// ─── Participant identifier ───────────────────────────────────────────

/**
 * ISO 6523 participant identifier scheme codes (cited subset).
 *
 * @standard ISO-6523-1:1998 organization-identification-scheme
 * @standard Peppol-BIS-3.0 participant-identifier-scheme
 */
export type PeppolParticipantIdentifierScheme =
  | '0007' // SE Organisation Number
  | '0009' // FR SIRENE
  | '0088' // GS1 GLN
  | '0096' // DK P-number
  | '0097' // FTI Codice Fiscale (IT)
  | '0184' // DK CVR
  | '0192' // NO Organisation Number
  | '0193' // UBL.BE party identifier (BE)
  | '0204' // Leitweg-ID (DE B2G)
  | '0211' // IT codice univoco
  | '9906' // IT VAT
  | '9914' // AT VAT
  | '9920' // ES VAT
  | '9925' // BE VAT
  | '9930' // DE VAT
  | '9933' // FI Y-tunnus
  | '9938' // LU VAT
  | '9944' // NL VAT
  | '9946' // PT VAT
  | '9952' // GR VAT
  | '9956' // BG VAT
  | '9957' // FR VAT

/**
 * A complete Peppol participant identifier — `<scheme>:<value>`.
 *
 * Examples:
 *   { scheme: '9930', value: 'DE123456789' }
 *   { scheme: '0088', value: '7300010000001' }
 *
 * @standard Peppol-BIS-3.0 EndpointID
 */
export interface PeppolParticipantIdentifier {
  scheme: PeppolParticipantIdentifierScheme
  value: string
}

/**
 * Endpoint id Peppol's Service Metadata Publisher (SMP) advertises for
 * a participant. Convention: same shape as `PeppolParticipantIdentifier`.
 *
 * @standard Peppol-BIS-3.0 EndpointID
 */
export type PeppolEndpointId = PeppolParticipantIdentifier

// ─── Envelope ─────────────────────────────────────────────────────────

/**
 * Peppol envelope wrapping a UBL document. Composes the BIS-specific
 * ids with the EN 16931 semantic body.
 *
 * @standard Peppol-BIS-3.0 envelope
 */
export interface PeppolEnvelope {
  customizationId: typeof PEPPOL_BIS_3_CUSTOMIZATION_ID
  profileId: PeppolProfileId
  documentTypeId: PeppolDocumentTypeId
  /** Sender (the seller's Peppol participant). */
  senderParticipantId: PeppolParticipantIdentifier
  /** Receiver (the buyer's Peppol participant). */
  receiverParticipantId: PeppolParticipantIdentifier
  /** Sender endpoint as advertised on the SMP. */
  senderEndpointId: PeppolEndpointId
  /** Receiver endpoint as advertised on the SMP. */
  receiverEndpointId: PeppolEndpointId
}

/**
 * A complete Peppol billing message — envelope + EN 16931 body.
 *
 * @standard Peppol-BIS-3.0 billing
 * @standard EN-16931:2017 semantic-model-electronic-invoice
 */
export interface PeppolBillingMessage {
  envelope: PeppolEnvelope
  invoice: InvoiceHeader
  lines: InvoiceLine[]
  totals: DocumentTotals
  vatBreakdown: VatBreakdown[]
}
