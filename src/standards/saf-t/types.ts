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
  readonly buildingNumber?: string
  readonly streetName?: string
  readonly addressDetail?: string
  readonly city: string
  readonly postalCode: string
  readonly region?: string
  /** ISO 3166-1 alpha-2. */
  readonly country: string
}

/**
 * Party identification (Customer / Supplier / Company).
 *
 * @standard OECD SAF-T 2.0 PartyInfoStructure
 */
export interface SafTPartyId {
  /** Tax registration id (e.g. NIF in PT, CIF in RO). */
  readonly taxRegistrationNumber?: string
  /** Country of issue for the tax id. ISO 3166-1 alpha-2. */
  readonly taxRegistrationCountry?: string
  /** Counterparty name (legal entity name). */
  readonly companyName: string
  /** Optional contact person. */
  readonly contact?: string
  readonly billingAddress: SafTAddressStructure
  readonly shipToAddress?: SafTAddressStructure
}

/**
 * Amount with currency + optional exchange rate (when functional currency
 * differs from transaction currency).
 *
 * @standard OECD SAF-T 2.0 AmountStructure
 */
export interface SafTAmountStructure {
  /** Amount in the document's currency, integer cents. */
  readonly amount: number
  /** ISO 4217 currency code. Required when ≠ functional currency. */
  readonly currencyCode?: string
  /** Exchange rate to functional currency (decimal). */
  readonly exchangeRate?: number
  /** Amount restated in functional currency (integer cents). */
  readonly amountInFunctionalCurrency?: number
}

/**
 * Tax information attached to a line / document.
 *
 * @standard OECD SAF-T 2.0 TaxInformationStructure
 */
export interface SafTTaxInformation {
  /** Tax type (e.g. 'IVA', 'VAT', 'GST'). */
  readonly taxType: string
  /** Country of the tax. ISO 3166-1 alpha-2. */
  readonly taxCountryRegion: string
  /** Tax code (national catalogue, e.g. PT 'NOR' / 'INT' / 'RED' / 'ISE'). */
  readonly taxCode: string
  /** Tax percentage (decimal, e.g. 23 for 23%). */
  readonly taxPercentage?: number
  /** Tax amount in document currency. */
  readonly taxAmount: SafTAmountStructure
  /** Exemption reason code (national catalogue). Required when amount = 0 and code differs from standard. */
  readonly taxExemptionReason?: string
  readonly taxExemptionCode?: string
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
  readonly auditFileVersion: string
  readonly companyID: string
  /** Tax registration number (NIF / CIF / VAT id). */
  readonly taxRegistrationNumber: string
  /** ISO 4217 currency code of the entity's functional / reporting currency. */
  readonly taxAccountingBasis: 'F' | 'C' | 'I' | 'P' | 'R' | 'S' | 'T' | 'O'
  readonly companyName: string
  readonly businessName?: string
  readonly companyAddress: SafTAddressStructure
  /** Fiscal year being audited. */
  readonly fiscalYear: number
  /** Period start (ISO 8601). */
  readonly startDate: string
  /** Period end (ISO 8601). */
  readonly endDate: string
  /** ISO 4217 functional currency. */
  readonly currencyCode: string
  /** ISO 8601 date the file was generated. */
  readonly dateCreated: string
  /** Software house name + version (the entity that produced the file). */
  readonly productCompanyTaxID?: string
  readonly softwareCertificateNumber?: number
  readonly productID: string
  readonly productVersion: string
  readonly headerComment?: string
}

// ─── 2. MasterFiles ────────────────────────────────────────────────────

/**
 * General ledger account (a row in the chart of accounts).
 *
 * @standard OECD SAF-T 2.0 GeneralLedgerAccounts
 */
export interface SafTGeneralLedgerAccount {
  /** Account id (e.g. '1100' or '11.01.001'). */
  readonly accountID: string
  readonly accountDescription: string
  /** Standard account taxonomy id (e.g. PT-SNC '11', '21', '71'). */
  readonly standardAccountID?: string
  /**
   * Account taxonomy code — `M` (movement / transactional),
   * `A` (analytical / sub-ledger), `S` (synthesis / roll-up).
   */
  readonly accountType: 'M' | 'A' | 'S'
  /**
   * Opening / closing balance flag — the file carries debit + credit
   * opening balances (year-start) and closing balances (period-end).
   */
  readonly openingDebitBalance?: number
  readonly openingCreditBalance?: number
  readonly closingDebitBalance?: number
  readonly closingCreditBalance?: number
  /** Parent account in the synthesis hierarchy. */
  readonly groupingCategory?: string
  readonly groupingCode?: string
}

/**
 * Customer master record.
 *
 * @standard OECD SAF-T 2.0 Customer
 */
export interface SafTCustomer {
  readonly customerID: string
  /** SAF-T `AccountID` — the AR control account or sub-account. */
  readonly accountID: string
  /** Country of the customer's tax id. */
  readonly party: SafTPartyId
  /** Tax-relevant flag — false = self-billing prohibited. */
  readonly selfBillingIndicator: 0 | 1
}

/**
 * Supplier master record.
 *
 * @standard OECD SAF-T 2.0 Supplier
 */
export interface SafTSupplier {
  readonly supplierID: string
  readonly accountID: string
  readonly party: SafTPartyId
  readonly selfBillingIndicator: 0 | 1
}

/**
 * Product / service master record.
 *
 * @standard OECD SAF-T 2.0 Product
 */
export interface SafTProduct {
  readonly productCode: string
  readonly productGroup?: string
  readonly productDescription: string
  /** Code list: `P` (product), `S` (service), `O` (other), `I` (impostos). */
  readonly productType: 'P' | 'S' | 'O' | 'I'
  readonly productNumberCode?: string
  /** Default unit of measure (UN/ECE Rec 20). */
  readonly unitOfMeasure?: string
}

/**
 * Tax table row — a single tax code's definition + rate.
 *
 * @standard OECD SAF-T 2.0 TaxTableEntry
 */
export interface SafTTaxTableEntry {
  readonly taxType: string
  readonly taxCountryRegion: string
  readonly taxCode: string
  readonly description: string
  readonly taxExpirationDate?: string
  /** Either taxPercentage OR taxAmount is set, not both. */
  readonly taxPercentage?: number
  readonly taxAmount?: number
}

/**
 * Top-level MasterFiles section.
 *
 * @standard OECD SAF-T 2.0 MasterFiles
 */
export interface SafTMasterFiles {
  readonly generalLedgerAccounts: readonly SafTGeneralLedgerAccount[]
  readonly customers: readonly SafTCustomer[]
  readonly suppliers: readonly SafTSupplier[]
  readonly products: readonly SafTProduct[]
  readonly taxTable: readonly SafTTaxTableEntry[]
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
  readonly recordID: string
  readonly accountID: string
  /** ISO 8601 line-level posting date (may differ from transaction date). */
  readonly systemEntryDate: string
  /** `D` (debit) or `C` (credit). */
  readonly debitCreditIndicator: 'D' | 'C'
  readonly amount: SafTAmountStructure
  readonly description?: string
  /** Optional reference to the source document (invoice / payment). */
  readonly sourceDocumentID?: string
  readonly taxInformation?: SafTTaxInformation
  /** Customer / supplier id when the line touches a sub-ledger. */
  readonly customerID?: string
  readonly supplierID?: string
}

/**
 * Single transaction (= one balanced JE).
 *
 * @standard OECD SAF-T 2.0 Transaction
 */
export interface SafTTransaction {
  readonly transactionID: string
  /** Transaction period (e.g. '2026-04'). */
  readonly period: string
  /** ISO 8601. */
  readonly transactionDate: string
  readonly sourceID: string
  readonly description: string
  /**
   * `S` = Sales, `P` = Purchases, `R` = Receipts, `M` = Manual,
   * `C` = Closing, `O` = Opening, `J` = Adjustment.
   */
  readonly documentType?: string
  readonly documentNumber?: string
  readonly systemEntryDate: string
  readonly customerID?: string
  readonly supplierID?: string
  readonly lines: readonly SafTLine[]
}

/**
 * Journal — groups transactions of a kind (sales, purchases, manual, etc.).
 *
 * @standard OECD SAF-T 2.0 Journal
 */
export interface SafTJournal {
  readonly journalID: string
  readonly description: string
  readonly transactions: readonly SafTTransaction[]
}

/**
 * Top-level GeneralLedgerEntries section.
 *
 * @standard OECD SAF-T 2.0 GeneralLedgerEntries
 */
export interface SafTGeneralLedgerEntries {
  readonly numberOfEntries: number
  readonly totalDebit: number
  readonly totalCredit: number
  readonly journals: readonly SafTJournal[]
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
  readonly lineNumber: number
  readonly productCode?: string
  readonly productDescription: string
  readonly quantity: number
  readonly unitOfMeasure?: string
  readonly unitPrice: number
  readonly taxBase: number
  readonly description: string
  /** Pre-tax line amount (cents). */
  readonly creditAmount?: number
  readonly debitAmount?: number
  readonly taxInformation: SafTTaxInformation
  /** Reference to the originating order / shipment. */
  readonly references?: readonly Array<{ readonly reference: string; readonly reason?: string }>
}

/**
 * Sales invoice header + lines.
 *
 * @standard OECD SAF-T 2.0 SalesInvoice
 */
export interface SafTSalesInvoice {
  readonly invoiceNo: string
  /**
   * Invoice type — local catalogue (PT 'FT' = Fatura, 'FS' = Fatura
   * simplificada, 'NC' = Nota de crédito, 'ND' = Nota de débito, etc.).
   */
  readonly invoiceType: string
  /** PT-style hash chain (or empty for OECD baseline). */
  readonly hash?: string
  readonly hashControl?: string
  readonly invoiceDate: string
  readonly systemEntryDate: string
  readonly customerID: string
  readonly shipTo?: SafTAddressStructure
  readonly shipFrom?: SafTAddressStructure
  readonly movementStartTime?: string
  /** Line array. */
  readonly lines: readonly SafTSalesInvoiceLine[]
  /** Total tax amount + total amount with tax. */
  readonly documentTotals: {
    readonly taxPayable: number
    readonly netTotal: number
    readonly grossTotal: number
    /** Currency the invoice was issued in. */
    readonly currency?: { readonly currencyCode: string; readonly currencyAmount: number; readonly exchangeRate: number }
  }
}

/**
 * Payment record (cash receipt / disbursement).
 *
 * @standard OECD SAF-T 2.0 Payment
 */
export interface SafTPayment {
  readonly paymentRefNo: string
  /** PT 'RG' = recibo geral, 'RC' = recibo de caixa, etc. */
  readonly paymentType: string
  readonly hash?: string
  readonly transactionDate: string
  readonly customerID?: string
  readonly supplierID?: string
  readonly paymentMethod: SafTPaymentMethod
  readonly documentStatus: { readonly paymentStatus: 'N' | 'A' | 'F'; readonly paymentStatusDate: string }
  readonly systemEntryDate: string
  /** Allocations to the invoices being settled. */
  readonly lines: readonly Array<{
    readonly lineNumber: number
    readonly sourceDocumentID: string
    readonly creditAmount?: number
    readonly debitAmount?: number
  }>
  readonly documentTotals: {
    readonly taxPayable: number
    readonly netTotal: number
    readonly grossTotal: number
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
  readonly paymentMechanism: SafTPaymentMechanism
  readonly paymentAmount: number
  readonly paymentDate: string
}

/**
 * Movement of goods (stock-ledger entry).
 *
 * @standard OECD SAF-T 2.0 MovementOfGoods
 */
export interface SafTMovementOfGoods {
  readonly documentNumber: string
  /** PT 'GR' = guia de remessa, 'GT' = guia de transporte, etc. */
  readonly movementType: string
  readonly hash?: string
  readonly movementDate: string
  readonly systemEntryDate: string
  /** Locations as ISO 3166-2 subdivision + free-text. */
  readonly shipFrom: SafTAddressStructure
  readonly shipTo: SafTAddressStructure
  readonly customerID?: string
  readonly supplierID?: string
  readonly lines: readonly Array<{
    readonly lineNumber: number
    readonly productCode: string
    readonly productDescription: string
    readonly quantity: number
    readonly unitOfMeasure?: string
    readonly description?: string
  }>
}

/**
 * Top-level SourceDocuments section.
 *
 * @standard OECD SAF-T 2.0 SourceDocuments
 */
export interface SafTSourceDocuments {
  readonly salesInvoices?: {
    readonly numberOfEntries: number
    readonly totalDebit: number
    readonly totalCredit: number
    readonly invoices: readonly SafTSalesInvoice[]
  }
  readonly purchaseInvoices?: {
    readonly numberOfEntries: number
    readonly totalDebit: number
    readonly totalCredit: number
    readonly invoices: readonly SafTSalesInvoice[] // Same shape, different journal
  }
  readonly payments?: {
    readonly numberOfEntries: number
    readonly totalDebit: number
    readonly totalCredit: number
    readonly payments: readonly SafTPayment[]
  }
  readonly movementOfGoods?: {
    readonly numberOfMovementLines: number
    readonly totalQuantityIssued: number
    readonly movements: readonly SafTMovementOfGoods[]
  }
}

// ─── Top-level audit file ──────────────────────────────────────────────

/**
 * Complete SAF-T audit file. Pass to a serializer to render XSD-validated XML.
 *
 * @standard OECD SAF-T 2.0 AuditFile
 */
export interface SafTAuditFile {
  readonly header: SafTHeader
  readonly masterFiles: SafTMasterFiles
  readonly generalLedgerEntries?: SafTGeneralLedgerEntries
  readonly sourceDocuments?: SafTSourceDocuments
}
