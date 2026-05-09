/**
 * Canonical EN 16931 semantic data model — types only.
 *
 * Covers the BG / BT element groups consumers in this codebase need:
 * BG-25 invoice line, BG-23 VAT breakdown, BG-20 / BG-21 document-level
 * allowances and charges, BG-22 document totals. Plus the three external
 * code lists EN 16931 references (UN/CEFACT 1001 invoice type, UN/CEFACT
 * 5305 VAT category, UN/CEFACT 4461 payment means).
 *
 * Money is integer cents (per the project's `_money` standard); quantity
 * uses `number` for unit-quantity decimals.
 *
 * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @see ./README.md
 */

// ─── Code lists referenced by EN 16931 (BT-3, BT-151, BT-81) ───────────

/**
 * Invoice / credit-note type — BT-3. Subset of UN/CEFACT 1001 that EN 16931
 * references. Adding a code here implies the consumer accepts the
 * corresponding accounting and legal treatment.
 *
 * @standard EN-16931:2017 BT-3 invoice-type-code
 * @standard UN-CEFACT 1001 document-name-code
 */
export type InvoiceTypeCode =
  | '326' // Partial invoice
  | '380' // Commercial invoice (most common)
  | '381' // Credit note
  | '384' // Corrected invoice
  | '386' // Prepayment invoice
  | '388' // Tax invoice
  | '389' // Self-billed invoice
  | '393' // Factored invoice
  | '395' // Consignment invoice
  | '751' // Invoice information for accounting purposes (DE / Buchhaltungsbeleg)

/**
 * VAT category code — BT-151. Subset of UN/CEFACT 5305 covering the
 * categories EN 16931 admits in the EU; non-EU jurisdictions may model
 * their tax categories under separate standards modules.
 *
 * @standard EN-16931:2017 BT-151 vat-category-code
 * @standard UN-CEFACT 5305 duty-tax-fee-category-code
 */
export type VatCategoryCode =
  | 'S'  // Standard rate
  | 'Z'  // Zero rated goods
  | 'E'  // Exempt from VAT
  | 'AE' // Reverse charge (recipient liable)
  | 'K'  // Intra-community supply (Article 138 of the VAT Directive)
  | 'G'  // Export outside the EU (Article 146 of the VAT Directive)
  | 'O'  // Out of scope of VAT
  | 'L'  // Canary Islands IGIC tax
  | 'M'  // Ceuta and Melilla tax (IPSI)

/**
 * Payment means code — BT-81. Subset of UN/CEFACT 4461 that EN 16931 admits.
 *
 * @standard EN-16931:2017 BT-81 payment-means-type-code
 * @standard UN-CEFACT 4461 payment-means
 */
export type PaymentMeansCode =
  | '10'  // In cash
  | '20'  // Cheque
  | '30'  // Credit transfer (BG-17)
  | '42'  // Payment to bank account
  | '48'  // Bank card
  | '49'  // Direct debit (BG-19)
  | '57'  // Standing agreement
  | '58'  // SEPA credit transfer
  | '59'  // SEPA direct debit
  | '97'  // Clearing between partners

// ─── BG-29 — Price details ──────────────────────────────────────────────

/**
 * Item price details (BG-29) — the line's gross / net unit price, base
 * quantity, and any item-level allowance.
 *
 * @standard EN-16931:2017 BG-29 price-details
 */
export interface ItemPriceDetails {
  /** BT-146 — Item net price (after item discount, before line discount). */
  itemNetPrice: number
  /** BT-148 — Item gross price (before any discount). */
  itemGrossPrice?: number
  /** BT-147 — Item price discount, integer cents. */
  itemPriceDiscount?: number
  /** BT-149 — Base quantity at which the price is fixed. */
  baseQuantity?: number
  /** BT-150 — Base unit of measure code (UN/ECE Recommendation 20). */
  baseUnitCode?: string
}

// ─── BG-30 — Line VAT info ─────────────────────────────────────────────

/**
 * Line-level VAT information (BG-30).
 *
 * @standard EN-16931:2017 BG-30 line-vat-information
 */
export interface LineVatInformation {
  /** BT-151 — VAT category code. */
  categoryCode: VatCategoryCode
  /** BT-152 — VAT rate (percent, e.g. 20 for 20%). */
  rate?: number
  /** BT-121 — VAT exemption reason code, when applicable. */
  exemptionReasonCode?: string
  /** BT-120 — VAT exemption reason free text. */
  exemptionReason?: string
}

// ─── BG-25 — Invoice line ──────────────────────────────────────────────

/**
 * Invoice line (BG-25) — one occurrence per item or service line.
 *
 * @standard EN-16931:2017 BG-25 invoice-line
 */
export interface InvoiceLine {
  /** BT-126 — Invoice line identifier (line number). */
  id: string
  /** BT-127 — Invoice line note (free text). */
  note?: string
  /**
   * BT-128 — Invoice line object identifier (e.g. ItemId, GTIN, sales-order
   * line ref). Carries the buyer / seller cross-reference.
   */
  objectIdentifier?: string
  /** BT-129 — Invoiced quantity. */
  quantity: number
  /** BT-130 — Invoiced quantity unit of measure code (UN/ECE Rec 20). */
  unitCode: string
  /** BT-131 — Invoice line net amount, integer cents. Required. */
  netAmount: number

  /** Free-text description (often falls under BT-153 item name in the BG-31 group). */
  description?: string

  /** BG-29 — Price details. */
  priceDetails?: ItemPriceDetails

  /** BG-30 — Line VAT info (the VAT applicable to this line). */
  vat: LineVatInformation

  /**
   * BG-27 + BG-28 — Line-level allowances (discounts) and charges
   * (surcharges). Net amount is post-allowance/charge already; these
   * are carried for the audit trail and the invoice document layout.
   */
  allowances?: LineAllowance[]
  charges?: LineCharge[]

  /**
   * Item cost — BT-127 extension carried for COGS. Not part of the
   * EN 16931 wire format but the GL posting needs it; left optional
   * so credit notes / service lines can omit.
   */
  costAmount?: number
  /** Item identifier in the seller's catalog (e.g. SKU). */
  itemId?: string
}

/**
 * BG-27 — Line allowance.
 *
 * @standard EN-16931:2017 BG-27 invoice-line-allowances
 */
export interface LineAllowance {
  /** BT-136 — Allowance amount. */
  amount: number
  /** BT-138 — Allowance reason code. */
  reasonCode?: string
  /** BT-139 — Allowance reason free text. */
  reason?: string
}

/**
 * BG-28 — Line charge.
 *
 * @standard EN-16931:2017 BG-28 invoice-line-charges
 */
export interface LineCharge {
  /** BT-141 — Charge amount. */
  amount: number
  /** BT-145 — Charge reason code. */
  reasonCode?: string
  /** BT-144 — Charge reason free text. */
  reason?: string
}

// ─── BG-20 / BG-21 — Document-level allowances / charges ───────────────

/**
 * Document-level allowance (BG-20) — applies to the whole invoice.
 *
 * @standard EN-16931:2017 BG-20 document-level-allowances
 */
export interface DocumentLevelAllowance {
  /** BT-92 — Document-level allowance amount, integer cents. */
  amount: number
  /** BT-93 — Document-level allowance base amount (used when percentage). */
  baseAmount?: number
  /** BT-94 — Document-level allowance percentage. */
  percentage?: number
  /** BT-95 — VAT category code applicable to the allowance. */
  vatCategoryCode?: VatCategoryCode
  /** BT-96 — VAT rate. */
  vatRate?: number
  /** BT-97 — Reason free text. */
  reason?: string
  /** BT-98 — Reason code. */
  reasonCode?: string
}

/**
 * Document-level charge (BG-21).
 *
 * @standard EN-16931:2017 BG-21 document-level-charges
 */
export interface DocumentLevelCharge {
  /** BT-99 — Document-level charge amount. */
  amount: number
  baseAmount?: number
  percentage?: number
  vatCategoryCode?: VatCategoryCode
  vatRate?: number
  reason?: string
  reasonCode?: string
}

// ─── BG-23 — VAT breakdown ─────────────────────────────────────────────

/**
 * VAT breakdown (BG-23) — one row per VAT category × rate combination.
 *
 * @standard EN-16931:2017 BG-23 vat-breakdown
 */
export interface VatBreakdown {
  /** BT-116 — VAT category taxable amount. */
  taxableAmount: number
  /** BT-117 — VAT category tax amount. */
  taxAmount: number
  /** BT-118 — VAT category code. */
  categoryCode: VatCategoryCode
  /** BT-119 — VAT category rate. */
  rate?: number
  /** BT-120 — Exemption reason free text. */
  exemptionReason?: string
  /** BT-121 — Exemption reason code. */
  exemptionReasonCode?: string
}

// ─── BG-22 — Document totals ───────────────────────────────────────────

/**
 * Invoice document totals (BG-22) — the BT-106..BT-115 totals chain.
 *
 * @standard EN-16931:2017 BG-22 document-totals
 */
export interface DocumentTotals {
  /** BT-106 — Sum of invoice line net amounts. */
  lineNetTotal: number
  /** BT-107 — Sum of allowances on document level. */
  allowancesTotal?: number
  /** BT-108 — Sum of charges on document level. */
  chargesTotal?: number
  /** BT-109 — Invoice total amount without VAT. */
  taxExclusiveTotal: number
  /** BT-110 — Invoice total VAT amount (sum of BG-23 BT-117). */
  vatTotal?: number
  /** BT-111 — Invoice total VAT amount in accounting currency. */
  vatTotalInAccountingCurrency?: number
  /** BT-112 — Invoice total amount with VAT. */
  taxInclusiveTotal: number
  /** BT-113 — Paid amount (prepayment). */
  prepaidAmount?: number
  /** BT-114 — Rounding amount. */
  roundingAmount?: number
  /** BT-115 — Amount due for payment. */
  amountDue: number
}

// ─── BG-1 — Top-level invoice (lightweight) ────────────────────────────

/**
 * Lightweight invoice header (subset of BG-1 + BG-22) — covers what
 * project events / DTOs need to carry. Full BG group (parties, addresses,
 * payment instructions) is left for collections / serializers.
 *
 * @standard EN-16931:2017 BG-1 invoice
 */
export interface InvoiceHeader {
  /** BT-1 — Invoice number. */
  invoiceNumber: string
  /** BT-2 — Invoice issue date. */
  issueDate: Date | string
  /** BT-3 — Invoice type code. */
  typeCode: InvoiceTypeCode
  /** BT-5 — Invoice currency code. */
  currencyCode: string
  /** BT-9 — Payment due date. */
  dueDate?: Date | string
  /** BT-10 — Buyer reference (often required for B2G). */
  buyerReference?: string
}
