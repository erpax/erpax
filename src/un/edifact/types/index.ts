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
  readonly syntaxIdentifier: EdifactSyntaxId
  readonly syntaxVersion: number
  /** Sender id + qualifier (e.g. '14' = EAN, 'ZZZ' = mutually defined). */
  readonly sender: { readonly id: string; readonly qualifier?: string }
  readonly receiver: { readonly id: string; readonly qualifier?: string }
  /** YYMMDD:HHMM. */
  readonly preparationDate: string
  readonly preparationTime: string
  /** Interchange control reference — must match UNZ. */
  readonly interchangeControlReference: string
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
  readonly messageReferenceNumber: string
  readonly messageType: EdifactMessageType
  /** D.96A → version='D', release='96A', controllingAgency='UN'. */
  readonly version: string
  readonly release: string
  readonly controllingAgency: string
}

/**
 * Message trailer — UNT segment.
 *
 *   UNT+11+1'
 *
 * @standard UN-EDIFACT D.96A UNT message-trailer
 */
export interface EdifactUNT {
  readonly numberOfSegments: number
  /** Must match UNH.messageReferenceNumber. */
  readonly messageReferenceNumber: string
}

/**
 * Interchange trailer — UNZ segment.
 *
 *   UNZ+1+REF001'
 *
 * @standard UN-EDIFACT D.96A UNZ interchange-trailer
 */
export interface EdifactUNZ {
  readonly numberOfMessages: number
  /** Must match UNB.interchangeControlReference. */
  readonly interchangeControlReference: string
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
  readonly documentNameCode: string
  /** Document number. */
  readonly documentNumber: string
  /**
   * Message function code:
   *   `9`  = original
   *   `4`  = duplicate
   *   `7`  = added
   *   `13` = correction
   *   `31` = copy
   */
  readonly messageFunctionCode: string
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
  readonly qualifier: string
  readonly value: string
  /** UN/CEFACT 2379 — format code (102 = CCYYMMDD, 203 = CCYYMMDDHHMM). */
  readonly formatQualifier: string
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
  readonly partyQualifier: 'SE' | 'BY' | 'IV' | 'DP' | 'CN' | 'CZ' | string
  /** Optional party id + scheme. */
  readonly partyId?: { readonly id: string; readonly codeListAgency?: string; readonly codeListIdentifier?: string }
  readonly name: string
  /** Tax id. */
  readonly taxId?: string
  readonly street?: string
  readonly city?: string
  readonly country?: string
  readonly postalCode?: string
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
  readonly lineNumber: number
  /** Optional item id + qualifier (NA / SA / SRV / GTIN / SK). */
  readonly itemId?: { readonly id: string; readonly codeListIdentifier?: string }
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
  readonly descriptionFormat: 'F' | 'A' | 'B' | 'C' | 'E' | 'S' | 'X'
  readonly description: string
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
  readonly qualifier: string
  readonly value: number
  /** Unit code (UN/ECE Rec 20 — EA, KGM, LTR, etc.). */
  readonly unitCode?: string
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
  readonly qualifier: 'AAA' | 'AAB' | 'AAE' | string
  readonly value: number
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
  readonly qualifier: string
  readonly value: number
  readonly currency?: string
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
  readonly functionQualifier: '7' | string
  readonly type: 'VAT' | 'GST' | 'IVA' | string
  readonly rate?: number
  /** UN/CEFACT 5305 category code (S/Z/E/AE/K/G/O/L/M). */
  readonly categoryCode?: string
}

/**
 * INVOIC line group (LIN + IMD + QTY + PRI + MOA + TAX).
 *
 * @standard UN-EDIFACT D.96A invoic-line
 */
export interface EdifactInvoicLine {
  readonly lin: EdifactLIN
  readonly description?: EdifactIMD
  readonly quantity: EdifactQTY
  readonly price: EdifactPRI
  readonly lineNetAmount: EdifactMOA
  readonly tax?: EdifactTAX
}

/**
 * Top-level INVOIC message body.
 *
 * @standard UN-EDIFACT D.96A INVOIC invoice
 */
export interface EdifactInvoic {
  readonly unh: EdifactUNH
  readonly bgm: EdifactBGM
  readonly dates: readonly EdifactDTM[]
  readonly parties: readonly EdifactNAD[]
  readonly currency?: { readonly code: string; readonly qualifier: '4' | '11' }
  readonly lines: readonly EdifactInvoicLine[]
  readonly documentTotals: { readonly netAmount: EdifactMOA; readonly taxAmount: EdifactMOA; readonly grossAmount: EdifactMOA; readonly amountDue: EdifactMOA }
  readonly unt: EdifactUNT
}

// ─── DESADV (despatch advice) ─────────────────────────────────────────

/**
 * Top-level DESADV message body — minimal structure.
 *
 * @standard UN-EDIFACT D.96A DESADV despatch-advice
 */
export interface EdifactDesadv {
  readonly unh: EdifactUNH
  readonly bgm: EdifactBGM
  readonly dates: readonly EdifactDTM[]
  readonly parties: readonly EdifactNAD[]
  /** Each line carries a LIN + QTY (despatched 12 / received 13). */
  readonly lines: ReadonlyArray<{ readonly lin: EdifactLIN; readonly quantity: EdifactQTY }>
  readonly unt: EdifactUNT
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
  readonly unh: EdifactUNH
  readonly bgm: EdifactBGM
  readonly dates: readonly EdifactDTM[]
  /** Each leg carries a payee NAD + monetary amount + remittance ref. */
  readonly legs: ReadonlyArray<{
    readonly payee: EdifactNAD
    readonly amount: EdifactMOA
    readonly paymentMeans: { readonly code: string }
    readonly remittanceReference?: string
  }>
  readonly unt: EdifactUNT
}

// ─── Top-level interchange ────────────────────────────────────────────

/**
 * Complete UN/EDIFACT interchange — 1..N messages between UNB/UNZ.
 *
 * @standard UN-EDIFACT D.96A interchange
 */
export interface EdifactInterchange {
  readonly unb: EdifactUNB
  readonly messages: ReadonlyArray<EdifactInvoic | EdifactDesadv | EdifactPaymul>
  readonly unz: EdifactUNZ
}
