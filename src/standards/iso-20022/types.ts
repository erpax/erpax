/**
 * Canonical ISO 20022 types — semantic shapes for the four message
 * families this codebase touches: camt.053 (statement), pain.001 (credit
 * transfer), pain.008 (direct debit), pacs.004 (payment return).
 *
 * Intentionally not the full XSD-validated wire payload — only the
 * fields consumers actually carry. Money is integer cents.
 *
 * @standard ISO-20022:2022 universal-financial-industry-message-scheme
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @audit ISO-19011:2018 audit-trail
 * @see ./README.md
 */

// ─── Cross-cutting code lists ──────────────────────────────────────────

/**
 * Bank Transaction Code Set — 3-tuple that classifies every bank
 * transaction (replaces proprietary bank codes). Used by camt.053
 * `BkTxCd` and pacs.* `LclInstrm`.
 *
 * @standard ISO-20022 ExternalBankTransactionDomain1Code
 * @standard ISO-20022 ExternalBankTransactionFamily1Code
 * @standard ISO-20022 ExternalBankTransactionSubFamily1Code
 */
export interface BankTransactionCode {
  /** Top-level domain — e.g. `'PMNT'` (payments), `'CAMT'` (cash management). */
  domain: string
  /** Family — e.g. `'RCDT'` (received credit transfer), `'ICDT'` (issued credit transfer). */
  family: string
  /** Subfamily — e.g. `'BOOK'` (interbank book transfer), `'SALA'` (salary). */
  subFamily: string
}

/**
 * camt.053 ReportEntry status codes.
 *
 * @standard ISO-20022 EntryStatus2Code
 */
export type BookingStatus = 'BOOK' | 'PDNG' | 'INFO' | 'FUTR'

/**
 * Credit / Debit indicator — every monetary message carries one.
 *
 * @standard ISO-20022 CreditDebitCode
 */
export type CreditDebitIndicator = 'CRDT' | 'DBIT'

/**
 * Charge bearer code (BT-19 in EN 16931's payment instructions, mapped
 * to ISO-20022 `ChargeBearerType1Code`).
 *
 * @standard ISO-20022 ChargeBearerType1Code
 */
export type ChargeBearerCode = 'DEBT' | 'CRED' | 'SHAR' | 'SLEV'

// ─── Party identification ──────────────────────────────────────────────

/**
 * Postal address — subset of ISO-20022 `PostalAddress24` (sufficient
 * for the project's KYC / bank statement / payment-instruction needs).
 *
 * @standard ISO-20022 PostalAddress24
 */
export interface PostalAddress {
  streetName?: string
  buildingNumber?: string
  postCode?: string
  townName?: string
  /** Country subdivision (region / state / Bundesland) if applicable. */
  countrySubDivision?: string
  /** Two-letter ISO 3166-1 alpha-2. */
  country: string
}

/**
 * Party identification — `Name`, `PstlAdr`, plus an optional `Id` block
 * (BIC, LEI, or organisation/private id).
 *
 * @standard ISO-20022 PartyIdentification135
 * @standard ISO-9362:2022 bic
 * @standard ISO-17442-1:2020 lei
 */
export interface PartyIdentification {
  name?: string
  postalAddress?: PostalAddress
  /** BIC (ISO 9362) when known. */
  bic?: string
  /** LEI (ISO 17442) when known. */
  lei?: string
  /** Free-text organisation / private identifier (issuer + id). */
  otherIdIssuer?: string
  otherId?: string
}

/**
 * Account identification — IBAN (ISO 13616) is the primary key in SEPA;
 * proprietary numbers fall back where IBAN doesn't apply.
 *
 * @standard ISO-13616-1:2020 iban
 */
export interface AccountIdentification {
  /** IBAN — primary id in SEPA. */
  iban?: string
  /** Country-specific account number when IBAN doesn't apply. */
  otherId?: string
  /** Currency of the account (ISO 4217). */
  currency?: string
}

// ─── Remittance information ────────────────────────────────────────────

/**
 * Structured creditor reference — ISO 11649 RF-prefixed.
 *
 * @standard ISO-11649:2009 financial-services-creditor-reference
 */
export interface CreditorReference {
  /** Reference — typically prefixed `"RF"` per ISO 11649. */
  reference: string
  /**
   * Type code — `'SCOR'` (structured creditor reference), `'CINV'`
   * (commercial invoice), `'CREF'` (credit memo), etc.
   */
  typeCode?: string
}

/**
 * camt.053 `RmtInf` / pain.001 `RmtInf` — payment narrative.
 * Per the spec, callers SHOULD prefer `structured.creditorReference`
 * over `unstructured` so reconciliation auto-matches.
 *
 * @standard ISO-20022 RemittanceInformation16
 */
export interface RemittanceInformation {
  /** Free-text narrative (used when structured isn't available). */
  unstructured?: string
  structured?: {
    creditorReference?: CreditorReference
    /** Referred document(s) — invoice numbers, etc. */
    referredDocumentNumbers?: string[]
  }
}

// ─── camt.053 — Bank-to-customer statement ─────────────────────────────

/**
 * One transaction line on a camt.053 statement (`Ntry` →
 * `NtryDtls` → `TxDtls`).
 *
 * @standard ISO-20022 ReportEntry10
 * @standard ISO-20022 EntryTransaction10
 */
export interface Camt053Transaction {
  /** Account servicer reference (bank's unique tx id). */
  accountServicerReference?: string
  /** End-to-end identification echoed from the originating instruction. */
  endToEndId?: string

  /** BookingDate — when the entry hit the ledger. */
  bookingDate: Date
  /** ValueDate — when the funds become available (≠ booking for FX, holds). */
  valueDate?: Date

  /** Amount, integer cents. */
  amount: number
  /** Currency (ISO 4217). */
  currency: string
  /** Direction (Credit / Debit). */
  creditDebitIndicator: CreditDebitIndicator

  /** Booking status. Most reconciliable items are 'BOOK'. */
  status: BookingStatus

  /** 3-tuple bank transaction classification. */
  bankTransactionCode?: BankTransactionCode

  /** Counterparty — when it's a credit, this is the debtor; vice versa. */
  counterparty?: PartyIdentification
  counterpartyAccount?: AccountIdentification

  /** Charge / fee detail when applicable. */
  charges?: Array<{ amount: number; currency: string; type?: string }>
  chargeBearer?: ChargeBearerCode

  /** Remittance info — may be structured or unstructured. */
  remittanceInformation?: RemittanceInformation
}

/**
 * camt.053 statement (subset of `BkToCstmrStmt` → `Stmt`).
 *
 * @standard ISO-20022 BankToCustomerStatementV08
 */
export interface Camt053Statement {
  /** `Stmt/Id` — statement identifier. */
  id: string
  /** `Stmt/CreDtTm` — when the statement was generated. */
  createdAt: Date
  /** `Stmt/Acct` — the account being statemented. */
  account: AccountIdentification
  /** `Stmt/Acct/Ownr` — account owner. */
  owner?: PartyIdentification

  /** `Stmt/FrToDt/FrDtTm` — period start. */
  fromDateTime: Date
  /** `Stmt/FrToDt/ToDtTm` — period end. */
  toDateTime: Date

  /** Opening balance (booked). */
  openingBalance: number
  /** Closing balance (booked). */
  closingBalance: number
  /** Currency of the statement (ISO 4217). */
  currency: string

  /** All transaction entries in the period. */
  transactions: Camt053Transaction[]
}

// ─── pain.001 — Customer credit transfer initiation ────────────────────

/**
 * pain.001 — `CstmrCdtTrfInitn` envelope (subset).
 *
 * @standard ISO-20022 CustomerCreditTransferInitiationV09
 */
export interface Pain001Initiation {
  /** `MsgId` — message id. Unique per message, idempotency key. */
  messageId: string
  /** `CreDtTm` — message creation timestamp. */
  creationDateTime: Date
  /** Number of transactions in the message (= `payments.length`). */
  numberOfTransactions: number
  /** Sum of all amounts (control total). */
  controlSum: number

  /** Initiating party (debtor in the simple case). */
  initiatingParty: PartyIdentification

  /** Payments — typically one batch but spec allows N. */
  payments: Pain001Payment[]
}

/**
 * pain.001 / `PmtInf` — payment-information block within an initiation.
 *
 * @standard ISO-20022 PaymentInstruction30
 */
export interface Pain001Payment {
  paymentInformationId: string
  /**
   * Payment method — `'TRF'` (credit transfer) or `'CHK'` (cheque).
   * Most callers always emit `'TRF'`.
   */
  paymentMethod: 'TRF' | 'CHK'
  /** Requested execution date. */
  requestedExecutionDate: Date

  debtor: PartyIdentification
  debtorAccount: AccountIdentification
  /** Debtor agent (BIC). */
  debtorAgentBic?: string

  /** One or more credit transfer transactions. */
  creditTransfers: Pain001CreditTransfer[]
}

/**
 * pain.001 / `CdtTrfTxInf` — single credit-transfer line.
 *
 * @standard ISO-20022 CreditTransferTransaction34
 */
export interface Pain001CreditTransfer {
  endToEndId: string
  amount: number
  currency: string

  creditor: PartyIdentification
  creditorAccount: AccountIdentification
  creditorAgentBic?: string

  remittanceInformation?: RemittanceInformation
  chargeBearer?: ChargeBearerCode
}

// ─── pain.008 — Customer direct debit initiation ───────────────────────

/**
 * pain.008 — `CstmrDrctDbtInitn` envelope.
 *
 * @standard ISO-20022 CustomerDirectDebitInitiationV08
 */
export interface Pain008Initiation {
  messageId: string
  creationDateTime: Date
  numberOfTransactions: number
  controlSum: number

  /** Initiating party (creditor in the SEPA SDD case). */
  initiatingParty: PartyIdentification

  payments: Pain008Payment[]
}

/**
 * pain.008 / `PmtInf` — direct-debit payment-information block.
 *
 * @standard ISO-20022 PaymentInstruction23
 */
export interface Pain008Payment {
  paymentInformationId: string
  /** Direct-debit always `'DD'`. */
  paymentMethod: 'DD'
  requestedCollectionDate: Date

  /**
   * Local instrument — `'CORE'` (B2C SDD), `'B2B'` (B2B SDD), `'COR1'`
   * (legacy core, deprecated).
   */
  localInstrument?: 'CORE' | 'B2B' | 'COR1'
  /**
   * Sequence type — `'FRST'` (first), `'RCUR'` (recurring), `'OOFF'`
   * (one-off), `'FNAL'` (final).
   */
  sequenceType: 'FRST' | 'RCUR' | 'OOFF' | 'FNAL'

  creditor: PartyIdentification
  creditorAccount: AccountIdentification
  creditorAgentBic?: string

  directDebits: Pain008DirectDebit[]
}

/**
 * pain.008 / `DrctDbtTxInf` — single direct-debit transaction.
 *
 * @standard ISO-20022 DirectDebitTransactionInformation23
 */
export interface Pain008DirectDebit {
  endToEndId: string
  amount: number
  currency: string

  /** Mandate identification — primary key into the SDD mandate register. */
  mandateId: string
  /** Date the mandate was originally signed. */
  dateOfSignature: Date

  debtor: PartyIdentification
  debtorAccount: AccountIdentification
  debtorAgentBic?: string

  remittanceInformation?: RemittanceInformation
}

// ─── pacs.004 — Payment return ─────────────────────────────────────────

/**
 * pacs.004 — `PmtRtr` envelope (subset). Used by the Refunds collection
 * to record incoming returns / reversals.
 *
 * @standard ISO-20022 PaymentReturnV09
 */
export interface Pacs004Return {
  messageId: string
  creationDateTime: Date
  numberOfTransactions: number
  controlSum: number
  /**
   * One or more return transactions referencing the original
   * pacs.008 / pain.001.
   */
  returns: Pacs004ReturnTransaction[]
}

/**
 * pacs.004 / `TxInf` — single return-transaction record.
 *
 * @standard ISO-20022 PaymentTransaction109
 */
export interface Pacs004ReturnTransaction {
  /** Return-side end-to-end id (new). */
  endToEndId: string
  /** Original end-to-end id (the payment being returned). */
  originalEndToEndId?: string
  amount: number
  currency: string

  /**
   * Return reason code — `ExternalReturnReason1Code` (e.g. `AC01`
   * incorrect account number, `AM04` insufficient funds, `MD06`
   * refund request by debtor, `BE05` unrecognised initiating party).
   */
  reasonCode?: string
  reasonAdditionalInformation?: string
}
