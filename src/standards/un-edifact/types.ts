/**
 * Canonical UN/EDIFACT message types — semantic structure only.
 *
 * The wire format (segment delimiters, composite separators) lives in
 * a future serializer. This module gives consumers typed access to
 * the segment + composite shapes so projection / validation can
 * happen before serialisation.
 *
 * @standard UN-EDIFACT D.96A invoice-message
 * @standard ISO-9735:2002 edifact-syntax-rules
 * @audit ISO-19011:2018 audit-trail
 * @see ./README.md
 */

// ─── Envelope ─────────────────────────────────────────────────────────

/**
 * Syntax identifier (ISO 9735).
 *
 *   UNOA — alphanumeric Latin-1 (most common)
 *   UNOB — extended Latin-1
 *   UNOC — extended Latin-1 with national characters
 *   UNOY — Unicode UTF-8
 *
 * @standard ISO-9735:2002 syntax-identifier
 */
export type EdifactSyntaxId = 'UNOA' | 'UNOB' | 'UNOC' | 'UNOD' | 'UNOY'

/**
 * Top-level message types this module covers.
 *
 * @standard UN-EDIFACT message-types
 */
export type EdifactMessageType = 'INVOIC' | 'DESADV' | 'PAYMUL'

/**
 * Interchange header — UNB segment.
 *
 *   UNB+UNOA:4+SENDER+RECEIVER+260509:1500+REF001'
 *
 * @standard UN-EDIFACT D.96A UNB interchange-header
 */
export interface EdifactUNB {
  syntaxIdentifier: EdifactSyntaxId
  syntaxVersion: number
  /** Sender id + qualifier (e.g. '14' = EAN, 'ZZZ' = mutually defined). */
  sender: { id: string; qualifier?: string }
  receiver: { id: string; qualifier?: string }
  /** YYMMDD:HHMM. */
  preparationDate: string
  preparationTime: string
  /** Interchange control reference — must match UNZ. */
  interchangeControlReference: string
}

/**
 * Message header — UNH segment.
 *
 *   UNH+1+INVOIC:D:96A:UN'
 *
 * @standard UN-EDIFACT D.96A UNH message-header
 */
export interface EdifactUNH {
  /** Message reference number — must match UNT. */
  messageReferenceNumber: string
  messageType: EdifactMessageType
  /** D.96A → version='D', release='96A', controllingAgency='UN'. */
  version: string
  release: string
  controllingAgency: string
}

/**
 * Message trailer — UNT segment.
 *
 *   UNT+11+1'
 *
 * @standard UN-EDIFACT D.96A UNT message-trailer
 */
export interface EdifactUNT {
  numberOfSegments: number
  /** Must match UNH.messageReferenceNumber. */
  messageReferenceNumber: string
}

/**
 * Interchange trailer — UNZ segment.
 *
 *   UNZ+1+REF001'
 *
 * @standard UN-EDIFACT D.96A UNZ interchange-trailer
 */
export interface EdifactUNZ {
  numberOfMessages: number
  /** Must match UNB.interchangeControlReference. */
  interchangeControlReference: string
}

// ─── INVOIC d96a ──────────────────────────────────────────────────────

/**
 * BGM — Beginning of message (the document identification).
 *
 *   BGM+380+2026-001+9'
 *
 * `380` = commercial invoice (UN/CEFACT 1001).
 *
 * @standard UN-EDIFACT D.96A BGM beginning-of-message
 */
export interface EdifactBGM {
  /** UN/CEFACT 1001 document name code. */
  documentNameCode: string
  /** Document number. */
  documentNumber: string
  /**
   * Message function code:
   *   `9`  = original
   *   `4`  = duplicate
   *   `7`  = added
   *   `13` = correction
   *   `31` = copy
   */
  messageFunctionCode: string
}

/**
 * DTM — Date / time / period.
 *
 *   DTM+137:20260509:102'   — 137 = document/message date, 102 = CCYYMMDD
 *
 * @standard UN-EDIFACT D.96A DTM date-time-period
 */
export interface EdifactDTM {
  /** UN/CEFACT 2005 — qualifier (137 = doc date, 35 = delivery, etc.). */
  qualifier: string
  value: string
  /** UN/CEFACT 2379 — format code (102 = CCYYMMDD, 203 = CCYYMMDDHHMM). */
  formatQualifier: string
}

/**
 * NAD — Name and address.
 *
 *   NAD+SE+++Acme Lda::PT500000000+Av. da Liberdade 100+Lisboa+++1250-145+PT'
 *
 * @standard UN-EDIFACT D.96A NAD name-and-address
 */
export interface EdifactNAD {
  /**
   * Party qualifier:
   *   `SE` = seller
   *   `BY` = buyer
   *   `IV` = invoicee
   *   `DP` = delivery party
   *   `CN` = consignee
   *   `CZ` = consignor
   */
  partyQualifier: 'SE' | 'BY' | 'IV' | 'DP' | 'CN' | 'CZ' | string
  /** Optional party id + scheme. */
  partyId?: { id: string; codeListAgency?: string; codeListIdentifier?: string }
  name: string
  /** Tax id. */
  taxId?: string
  street?: string
  city?: string
  country?: string
  postalCode?: string
}

/**
 * LIN — Line item identification.
 *
 *   LIN+1++WIDGET-1:GTIN'
 *
 * The `+1+` is the line number; the trailing composite carries the
 * item id + scheme (GTIN / SKU / NA).
 *
 * @standard UN-EDIFACT D.96A LIN line-item
 */
export interface EdifactLIN {
  lineNumber: number
  /** Optional item id + qualifier (NA / SA / SRV / GTIN / SK). */
  itemId?: { id: string; codeListIdentifier?: string }
}

/**
 * IMD — Item description.
 *
 *   IMD+F++:::Widget Pro 2026'
 *
 * Description format `F` = free-form text. Use `B` for coded.
 *
 * @standard UN-EDIFACT D.96A IMD item-description
 */
export interface EdifactIMD {
  /** Description format code (F / A / B / C / E / S / X). */
  descriptionFormat: 'F' | 'A' | 'B' | 'C' | 'E' | 'S' | 'X'
  description: string
}

/**
 * QTY — Quantity.
 *
 *   QTY+47:10'   — 47 = invoiced quantity, 10 units
 *
 * @standard UN-EDIFACT D.96A QTY quantity
 */
export interface EdifactQTY {
  /** UN/CEFACT 6063 — qualifier (47 = invoiced, 12 = despatched, 21 = ordered). */
  qualifier: string
  value: number
  /** Unit code (UN/ECE Rec 20 — EA, KGM, LTR, etc.). */
  unitCode?: string
}

/**
 * PRI — Price.
 *
 *   PRI+AAA:100.00'
 *
 * `AAA` = calculation net (per unit, after item discounts).
 *
 * @standard UN-EDIFACT D.96A PRI price-details
 */
export interface EdifactPRI {
  /** Price qualifier (AAA = calculation net, AAB = calculation gross). */
  qualifier: 'AAA' | 'AAB' | 'AAE' | string
  value: number
}

/**
 * MOA — Monetary amount.
 *
 *   MOA+125:1000.00'   — 125 = invoiced amount net
 *   MOA+9:1200.00'     — 9 = total amount due
 *
 * @standard UN-EDIFACT D.96A MOA monetary-amount
 */
export interface EdifactMOA {
  /** UN/CEFACT 5025 (9 = total payable, 125 = net invoiced, 124 = tax). */
  qualifier: string
  value: number
  currency?: string
}

/**
 * TAX — Tax / duty / fee details.
 *
 *   TAX+7+VAT+++:::20+S'   — 7 = tax type, 20% standard
 *
 * @standard UN-EDIFACT D.96A TAX tax-duty-fee
 */
export interface EdifactTAX {
  /** Function qualifier (7 = tax). */
  functionQualifier: '7' | string
  type: 'VAT' | 'GST' | 'IVA' | string
  rate?: number
  /** UN/CEFACT 5305 category code (S/Z/E/AE/K/G/O/L/M). */
  categoryCode?: string
}

/**
 * INVOIC line group (LIN + IMD + QTY + PRI + MOA + TAX).
 *
 * @standard UN-EDIFACT D.96A invoic-line
 */
export interface EdifactInvoicLine {
  lin: EdifactLIN
  description?: EdifactIMD
  quantity: EdifactQTY
  price: EdifactPRI
  lineNetAmount: EdifactMOA
  tax?: EdifactTAX
}

/**
 * Top-level INVOIC message body.
 *
 * @standard UN-EDIFACT D.96A INVOIC invoice
 */
export interface EdifactInvoic {
  unh: EdifactUNH
  bgm: EdifactBGM
  dates: EdifactDTM[]
  parties: EdifactNAD[]
  currency?: { code: string; qualifier: '4' | '11' }
  lines: EdifactInvoicLine[]
  documentTotals: { netAmount: EdifactMOA; taxAmount: EdifactMOA; grossAmount: EdifactMOA; amountDue: EdifactMOA }
  unt: EdifactUNT
}

// ─── DESADV (despatch advice) ─────────────────────────────────────────

/**
 * Top-level DESADV message body — minimal structure.
 *
 * @standard UN-EDIFACT D.96A DESADV despatch-advice
 */
export interface EdifactDesadv {
  unh: EdifactUNH
  bgm: EdifactBGM
  dates: EdifactDTM[]
  parties: EdifactNAD[]
  /** Each line carries a LIN + QTY (despatched 12 / received 13). */
  lines: Array<{ lin: EdifactLIN; quantity: EdifactQTY }>
  unt: EdifactUNT
}

// ─── PAYMUL (multiple-payment instruction) ────────────────────────────

/**
 * Top-level PAYMUL message body — minimal structure for treasury bulk
 * payment leg. Modern flows use ISO 20022 pain.001 instead; this
 * exists for legacy bank gateways still on UN/EDIFACT.
 *
 * @standard UN-EDIFACT D.96A PAYMUL multiple-payment-order
 */
export interface EdifactPaymul {
  unh: EdifactUNH
  bgm: EdifactBGM
  dates: EdifactDTM[]
  /** Each leg carries a payee NAD + monetary amount + remittance ref. */
  legs: Array<{
    payee: EdifactNAD
    amount: EdifactMOA
    paymentMeans: { code: string }
    remittanceReference?: string
  }>
  unt: EdifactUNT
}

// ─── Top-level interchange ────────────────────────────────────────────

/**
 * Complete UN/EDIFACT interchange — 1..N messages between UNB/UNZ.
 *
 * @standard UN-EDIFACT D.96A interchange
 */
export interface EdifactInterchange {
  unb: EdifactUNB
  messages: Array<EdifactInvoic | EdifactDesadv | EdifactPaymul>
  unz: EdifactUNZ
}
