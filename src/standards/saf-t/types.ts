/**
 * Canonical OECD SAF-T 2.0 types — audit-file projection.
 *
 * Tax-authority audit files (PT / NO / LU / RO / etc.) all derive from
 * the OECD SAF-T 2.0 baseline. This module defines the canonical
 * shapes; country-specific extensions (saf-t-pt, saf-t-no, ...) layer
 * national tax codes and required tables on top.
 *
 * Money is integer cents per the project's `_money` standard. Dates
 * are ISO 8601 strings (the SAF-T XSD expects xs:date / xs:dateTime).
 *
 * @standard OECD SAF-T 2.0 standard-audit-file-for-tax
 * @standard ISO-3166-1:2020 country-codes
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-205 presentation
 * @audit ISO-19011:2018 audit-trail tax-authority-audit-file
 * @compliance SOX §404 internal-controls
 * @see ./README.md
 */

// ─── Cross-cutting structures ──────────────────────────────────────────

/**
 * Postal address (subset of OECD SAF-T `AddressStructure`).
 *
 * @standard OECD SAF-T 2.0 AddressStructure
 */
export interface SafTAddressStructure {
  buildingNumber?: string
  streetName?: string
  addressDetail?: string
  city: string
  postalCode: string
  region?: string
  /** ISO 3166-1 alpha-2. */
  country: string
}

/**
 * Party identification (Customer / Supplier / Company).
 *
 * @standard OECD SAF-T 2.0 PartyInfoStructure
 */
export interface SafTPartyId {
  /** Tax registration id (e.g. NIF in PT, CIF in RO). */
  taxRegistrationNumber?: string
  /** Country of issue for the tax id. ISO 3166-1 alpha-2. */
  taxRegistrationCountry?: string
  /** Counterparty name (legal entity name). */
  companyName: string
  /** Optional contact person. */
  contact?: string
  billingAddress: SafTAddressStructure
  shipToAddress?: SafTAddressStructure
}

/**
 * Amount with currency + optional exchange rate (when functional currency
 * differs from transaction currency).
 *
 * @standard OECD SAF-T 2.0 AmountStructure
 */
export interface SafTAmountStructure {
  /** Amount in the document's currency, integer cents. */
  amount: number
  /** ISO 4217 currency code. Required when ≠ functional currency. */
  currencyCode?: string
  /** Exchange rate to functional currency (decimal). */
  exchangeRate?: number
  /** Amount restated in functional currency (integer cents). */
  amountInFunctionalCurrency?: number
}

/**
 * Tax information attached to a line / document.
 *
 * @standard OECD SAF-T 2.0 TaxInformationStructure
 */
export interface SafTTaxInformation {
  /** Tax type (e.g. 'IVA', 'VAT', 'GST'). */
  taxType: string
  /** Country of the tax. ISO 3166-1 alpha-2. */
  taxCountryRegion: string
  /** Tax code (national catalogue, e.g. PT 'NOR' / 'INT' / 'RED' / 'ISE'). */
  taxCode: string
  /** Tax percentage (decimal, e.g. 23 for 23%). */
  taxPercentage?: number
  /** Tax amount in document currency. */
  taxAmount: SafTAmountStructure
  /** Exemption reason code (national catalogue). Required when amount = 0 and code differs from standard. */
  taxExemptionReason?: string
  taxExemptionCode?: string
}

// ─── 1. Header ─────────────────────────────────────────────────────────

/**
 * SAF-T file header — identifies the file, the reporting entity, and the
 * tax period covered.
 *
 * @standard OECD SAF-T 2.0 Header
 */
export interface SafTHeader {
  /** Schema version — '2.00' for OECD baseline; PT '1.04', NO '1.10', etc. */
  auditFileVersion: string
  companyID: string
  /** Tax registration number (NIF / CIF / VAT id). */
  taxRegistrationNumber: string
  /** ISO 4217 currency code of the entity's functional / reporting currency. */
  taxAccountingBasis: 'F' | 'C' | 'I' | 'P' | 'R' | 'S' | 'T' | 'O'
  companyName: string
  businessName?: string
  companyAddress: SafTAddressStructure
  /** Fiscal year being audited. */
  fiscalYear: number
  /** Period start (ISO 8601). */
  startDate: string
  /** Period end (ISO 8601). */
  endDate: string
  /** ISO 4217 functional currency. */
  currencyCode: string
  /** ISO 8601 date the file was generated. */
  dateCreated: string
  /** Software house name + version (the entity that produced the file). */
  productCompanyTaxID?: string
  softwareCertificateNumber?: number
  productID: string
  productVersion: string
  headerComment?: string
}

// ─── 2. MasterFiles ────────────────────────────────────────────────────

/**
 * General ledger account (a row in the chart of accounts).
 *
 * @standard OECD SAF-T 2.0 GeneralLedgerAccounts
 */
export interface SafTGeneralLedgerAccount {
  /** Account id (e.g. '1100' or '11.01.001'). */
  accountID: string
  accountDescription: string
  /** Standard account taxonomy id (e.g. PT-SNC '11', '21', '71'). */
  standardAccountID?: string
  /**
   * Account taxonomy code — `M` (movement / transactional),
   * `A` (analytical / sub-ledger), `S` (synthesis / roll-up).
   */
  accountType: 'M' | 'A' | 'S'
  /**
   * Opening / closing balance flag — the file carries debit + credit
   * opening balances (year-start) and closing balances (period-end).
   */
  openingDebitBalance?: number
  openingCreditBalance?: number
  closingDebitBalance?: number
  closingCreditBalance?: number
  /** Parent account in the synthesis hierarchy. */
  groupingCategory?: string
  groupingCode?: string
}

/**
 * Customer master record.
 *
 * @standard OECD SAF-T 2.0 Customer
 */
export interface SafTCustomer {
  customerID: string
  /** SAF-T `AccountID` — the AR control account or sub-account. */
  accountID: string
  /** Country of the customer's tax id. */
  party: SafTPartyId
  /** Tax-relevant flag — false = self-billing prohibited. */
  selfBillingIndicator: 0 | 1
}

/**
 * Supplier master record.
 *
 * @standard OECD SAF-T 2.0 Supplier
 */
export interface SafTSupplier {
  supplierID: string
  accountID: string
  party: SafTPartyId
  selfBillingIndicator: 0 | 1
}

/**
 * Product / service master record.
 *
 * @standard OECD SAF-T 2.0 Product
 */
export interface SafTProduct {
  productCode: string
  productGroup?: string
  productDescription: string
  /** Code list: `P` (product), `S` (service), `O` (other), `I` (impostos). */
  productType: 'P' | 'S' | 'O' | 'I'
  productNumberCode?: string
  /** Default unit of measure (UN/ECE Rec 20). */
  unitOfMeasure?: string
}

/**
 * Tax table row — a single tax code's definition + rate.
 *
 * @standard OECD SAF-T 2.0 TaxTableEntry
 */
export interface SafTTaxTableEntry {
  taxType: string
  taxCountryRegion: string
  taxCode: string
  description: string
  taxExpirationDate?: string
  /** Either taxPercentage OR taxAmount is set, not both. */
  taxPercentage?: number
  taxAmount?: number
}

/**
 * Top-level MasterFiles section.
 *
 * @standard OECD SAF-T 2.0 MasterFiles
 */
export interface SafTMasterFiles {
  generalLedgerAccounts: SafTGeneralLedgerAccount[]
  customers: SafTCustomer[]
  suppliers: SafTSupplier[]
  products: SafTProduct[]
  taxTable: SafTTaxTableEntry[]
}

// ─── 3. GeneralLedgerEntries ───────────────────────────────────────────

/**
 * Single posting-line within a transaction. Mirrors the project's
 * JournalEntryLine + adds SAF-T tax fields.
 *
 * @standard OECD SAF-T 2.0 Line
 */
export interface SafTLine {
  /** SAF-T `RecordID` — line sequence within transaction. */
  recordID: string
  accountID: string
  /** ISO 8601 line-level posting date (may differ from transaction date). */
  systemEntryDate: string
  /** `D` (debit) or `C` (credit). */
  debitCreditIndicator: 'D' | 'C'
  amount: SafTAmountStructure
  description?: string
  /** Optional reference to the source document (invoice / payment). */
  sourceDocumentID?: string
  taxInformation?: SafTTaxInformation
  /** Customer / supplier id when the line touches a sub-ledger. */
  customerID?: string
  supplierID?: string
}

/**
 * Single transaction (= one balanced JE).
 *
 * @standard OECD SAF-T 2.0 Transaction
 */
export interface SafTTransaction {
  transactionID: string
  /** Transaction period (e.g. '2026-04'). */
  period: string
  /** ISO 8601. */
  transactionDate: string
  sourceID: string
  description: string
  /**
   * `S` = Sales, `P` = Purchases, `R` = Receipts, `M` = Manual,
   * `C` = Closing, `O` = Opening, `J` = Adjustment.
   */
  documentType?: string
  documentNumber?: string
  systemEntryDate: string
  customerID?: string
  supplierID?: string
  lines: SafTLine[]
}

/**
 * Journal — groups transactions of a kind (sales, purchases, manual, etc.).
 *
 * @standard OECD SAF-T 2.0 Journal
 */
export interface SafTJournal {
  journalID: string
  description: string
  transactions: SafTTransaction[]
}

/**
 * Top-level GeneralLedgerEntries section.
 *
 * @standard OECD SAF-T 2.0 GeneralLedgerEntries
 */
export interface SafTGeneralLedgerEntries {
  numberOfEntries: number
  totalDebit: number
  totalCredit: number
  journals: SafTJournal[]
}

// ─── 4. SourceDocuments ────────────────────────────────────────────────

/**
 * Source document discriminator. Drives the country-specific element
 * structure in the XSD (sales invoices have line-by-line VAT detail;
 * payments have allocations).
 *
 * @standard OECD SAF-T 2.0 SourceDocuments
 */
export type SafTSourceDocumentType =
  | 'sales_invoice'
  | 'purchase_invoice'
  | 'payment'
  | 'movement_of_goods'

/**
 * Sales invoice line.
 *
 * @standard OECD SAF-T 2.0 InvoiceLine
 */
export interface SafTSalesInvoiceLine {
  lineNumber: number
  productCode?: string
  productDescription: string
  quantity: number
  unitOfMeasure?: string
  unitPrice: number
  taxBase: number
  description: string
  /** Pre-tax line amount (cents). */
  creditAmount?: number
  debitAmount?: number
  taxInformation: SafTTaxInformation
  /** Reference to the originating order / shipment. */
  references?: Array<{ reference: string; reason?: string }>
}

/**
 * Sales invoice header + lines.
 *
 * @standard OECD SAF-T 2.0 SalesInvoice
 */
export interface SafTSalesInvoice {
  invoiceNo: string
  /**
   * Invoice type — local catalogue (PT 'FT' = Fatura, 'FS' = Fatura
   * simplificada, 'NC' = Nota de crédito, 'ND' = Nota de débito, etc.).
   */
  invoiceType: string
  /** PT-style hash chain (or empty for OECD baseline). */
  hash?: string
  hashControl?: string
  invoiceDate: string
  systemEntryDate: string
  customerID: string
  shipTo?: SafTAddressStructure
  shipFrom?: SafTAddressStructure
  movementStartTime?: string
  /** Line array. */
  lines: SafTSalesInvoiceLine[]
  /** Total tax amount + total amount with tax. */
  documentTotals: {
    taxPayable: number
    netTotal: number
    grossTotal: number
    /** Currency the invoice was issued in. */
    currency?: { currencyCode: string; currencyAmount: number; exchangeRate: number }
  }
}

/**
 * Payment record (cash receipt / disbursement).
 *
 * @standard OECD SAF-T 2.0 Payment
 */
export interface SafTPayment {
  paymentRefNo: string
  /** PT 'RG' = recibo geral, 'RC' = recibo de caixa, etc. */
  paymentType: string
  hash?: string
  transactionDate: string
  customerID?: string
  supplierID?: string
  paymentMethod: SafTPaymentMethod
  documentStatus: { paymentStatus: 'N' | 'A' | 'F'; paymentStatusDate: string }
  systemEntryDate: string
  /** Allocations to the invoices being settled. */
  lines: Array<{
    lineNumber: number
    sourceDocumentID: string
    creditAmount?: number
    debitAmount?: number
  }>
  documentTotals: {
    taxPayable: number
    netTotal: number
    grossTotal: number
  }
}

/**
 * Canonical SAF-T payment method codes.
 *
 * @standard OECD SAF-T 2.0 PaymentMechanism
 */
export type SafTPaymentMechanism =
  | 'CC' // Credit card
  | 'CD' // Debit card
  | 'CH' // Cheque
  | 'CO' // Cash on delivery
  | 'CS' // Settlement of credit balance
  | 'DE' // Electronic money
  | 'LC' // Letter of credit
  | 'MB' // SEPA / multibanco reference
  | 'NU' // Cash
  | 'OU' // Other
  | 'PR' // Permuta (barter)
  | 'TB' // Bank transfer
  | 'TR' // Restaurant / sodexo voucher

export interface SafTPaymentMethod {
  paymentMechanism: SafTPaymentMechanism
  paymentAmount: number
  paymentDate: string
}

/**
 * Movement of goods (stock-ledger entry).
 *
 * @standard OECD SAF-T 2.0 MovementOfGoods
 */
export interface SafTMovementOfGoods {
  documentNumber: string
  /** PT 'GR' = guia de remessa, 'GT' = guia de transporte, etc. */
  movementType: string
  hash?: string
  movementDate: string
  systemEntryDate: string
  /** Locations as ISO 3166-2 subdivision + free-text. */
  shipFrom: SafTAddressStructure
  shipTo: SafTAddressStructure
  customerID?: string
  supplierID?: string
  lines: Array<{
    lineNumber: number
    productCode: string
    productDescription: string
    quantity: number
    unitOfMeasure?: string
    description?: string
  }>
}

/**
 * Top-level SourceDocuments section.
 *
 * @standard OECD SAF-T 2.0 SourceDocuments
 */
export interface SafTSourceDocuments {
  salesInvoices?: {
    numberOfEntries: number
    totalDebit: number
    totalCredit: number
    invoices: SafTSalesInvoice[]
  }
  purchaseInvoices?: {
    numberOfEntries: number
    totalDebit: number
    totalCredit: number
    invoices: SafTSalesInvoice[] // Same shape, different journal
  }
  payments?: {
    numberOfEntries: number
    totalDebit: number
    totalCredit: number
    payments: SafTPayment[]
  }
  movementOfGoods?: {
    numberOfMovementLines: number
    totalQuantityIssued: number
    movements: SafTMovementOfGoods[]
  }
}

// ─── Top-level audit file ──────────────────────────────────────────────

/**
 * Complete SAF-T audit file. Pass to a serializer to render XSD-validated XML.
 *
 * @standard OECD SAF-T 2.0 AuditFile
 */
export interface SafTAuditFile {
  header: SafTHeader
  masterFiles: SafTMasterFiles
  generalLedgerEntries?: SafTGeneralLedgerEntries
  sourceDocuments?: SafTSourceDocuments
}
