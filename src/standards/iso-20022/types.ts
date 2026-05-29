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
  readonly domain: string
  /** Family — e.g. `'RCDT'` (received credit transfer), `'ICDT'` (issued credit transfer). */
  readonly family: string
  /** Subfamily — e.g. `'BOOK'` (interbank book transfer), `'SALA'` (salary). */
  readonly subFamily: string
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
  readonly streetName?: string
  readonly buildingNumber?: string
  readonly postCode?: string
  readonly townName?: string
  /** Country subdivision (region / state / Bundesland) if applicable. */
  readonly countrySubDivision?: string
  /** Two-letter ISO 3166-1 alpha-2. */
  readonly country: string
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
  readonly name?: string
  readonly postalAddress?: PostalAddress
  /** BIC (ISO 9362) when known. */
  readonly bic?: string
  /** LEI (ISO 17442) when known. */
  readonly lei?: string
  /** Free-text organisation / private identifier (issuer + id). */
  readonly otherIdIssuer?: string
  readonly otherId?: string
}

/**
 * Account identification — IBAN (ISO 13616) is the primary key in SEPA;
 * proprietary numbers fall back where IBAN doesn't apply.
 *
 * @standard ISO-13616-1:2020 iban
 */
export interface AccountIdentification {
  /** IBAN — primary id in SEPA. */
  readonly iban?: string
  /** Country-specific account number when IBAN doesn't apply. */
  readonly otherId?: string
  /** Currency of the account (ISO 4217). */
  readonly currency?: string
}

// ─── Remittance information ────────────────────────────────────────────

/**
 * Structured creditor reference — ISO 11649 RF-prefixed.
 *
 * @standard ISO-11649:2009 financial-services-creditor-reference
 */
export interface CreditorReference {
  /** Reference — typically prefixed `"RF"` per ISO 11649. */
  readonly reference: string
  /**
   * Type code — `'SCOR'` (structured creditor reference), `'CINV'`
   * (commercial invoice), `'CREF'` (credit memo), etc.
   */
  readonly typeCode?: string
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
  readonly unstructured?: string
  readonly structured?: {
    readonly creditorReference?: CreditorReference
    /** Referred document(s) — invoice numbers, etc. */
    readonly referredDocumentNumbers?: readonly string[]
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
  readonly accountServicerReference?: string
  /** End-to-end identification echoed from the originating instruction. */
  readonly endToEndId?: string

  /** BookingDate — when the entry hit the ledger. */
  readonly bookingDate: Date
  /** ValueDate — when the funds become available (≠ booking for FX, holds). */
  readonly valueDate?: Date

  /** Amount, integer cents. */
  readonly amount: number
  /** Currency (ISO 4217). */
  readonly currency: string
  /** Direction (Credit / Debit). */
  readonly creditDebitIndicator: CreditDebitIndicator

  /** Booking status. Most reconciliable items are 'BOOK'. */
  readonly status: BookingStatus

  /** 3-tuple bank transaction classification. */
  readonly bankTransactionCode?: BankTransactionCode

  /** Counterparty — when it's a credit, this is the debtor; vice versa. */
  readonly counterparty?: PartyIdentification
  readonly counterpartyAccount?: AccountIdentification

  /** Charge / fee detail when applicable. */
  readonly charges?: ReadonlyArray<{ readonly amount: number; readonly currency: string; readonly type?: string }>
  readonly chargeBearer?: ChargeBearerCode

  /** Remittance info — may be structured or unstructured. */
  readonly remittanceInformation?: RemittanceInformation
}

/**
 * camt.053 statement (subset of `BkToCstmrStmt` → `Stmt`).
 *
 * @standard ISO-20022 BankToCustomerStatementV08
 */
export interface Camt053Statement {
  /** `Stmt/Id` — statement identifier. */
  readonly id: string
  /** `Stmt/CreDtTm` — when the statement was generated. */
  readonly createdAt: Date
  /** `Stmt/Acct` — the account being statemented. */
  readonly account: AccountIdentification
  /** `Stmt/Acct/Ownr` — account owner. */
  readonly owner?: PartyIdentification

  /** `Stmt/FrToDt/FrDtTm` — period start. */
  readonly fromDateTime: Date
  /** `Stmt/FrToDt/ToDtTm` — period end. */
  readonly toDateTime: Date

  /** Opening balance (booked). */
  readonly openingBalance: number
  /** Closing balance (booked). */
  readonly closingBalance: number
  /** Currency of the statement (ISO 4217). */
  readonly currency: string

  /** All transaction entries in the period. */
  readonly transactions: readonly Camt053Transaction[]
}

// ─── pain.001 — Customer credit transfer initiation ────────────────────

/**
 * pain.001 — `CstmrCdtTrfInitn` envelope (subset).
 *
 * @standard ISO-20022 CustomerCreditTransferInitiationV09
 */
export interface Pain001Initiation {
  /** `MsgId` — message id. Unique per message, idempotency key. */
  readonly messageId: string
  /** `CreDtTm` — message creation timestamp. */
  readonly creationDateTime: Date
  /** Number of transactions in the message (= `payments.length`). */
  readonly numberOfTransactions: number
  /** Sum of all amounts (control total). */
  readonly controlSum: number

  /** Initiating party (debtor in the simple case). */
  readonly initiatingParty: PartyIdentification

  /** Payments — typically one batch but spec allows N. */
  readonly payments: readonly Pain001Payment[]
}

/**
 * pain.001 / `PmtInf` — payment-information block within an initiation.
 *
 * @standard ISO-20022 PaymentInstruction30
 */
export interface Pain001Payment {
  readonly paymentInformationId: string
  /**
   * Payment method — `'TRF'` (credit transfer) or `'CHK'` (cheque).
   * Most callers always emit `'TRF'`.
   */
  readonly paymentMethod: 'TRF' | 'CHK'
  /** Requested execution date. */
  readonly requestedExecutionDate: Date

  readonly debtor: PartyIdentification
  readonly debtorAccount: AccountIdentification
  /** Debtor agent (BIC). */
  readonly debtorAgentBic?: string

  /** One or more credit transfer transactions. */
  readonly creditTransfers: readonly Pain001CreditTransfer[]
}

/**
 * pain.001 / `CdtTrfTxInf` — single credit-transfer line.
 *
 * @standard ISO-20022 CreditTransferTransaction34
 */
export interface Pain001CreditTransfer {
  readonly endToEndId: string
  readonly amount: number
  readonly currency: string

  readonly creditor: PartyIdentification
  readonly creditorAccount: AccountIdentification
  readonly creditorAgentBic?: string

  readonly remittanceInformation?: RemittanceInformation
  readonly chargeBearer?: ChargeBearerCode
}

// ─── pain.008 — Customer direct debit initiation ───────────────────────

/**
 * pain.008 — `CstmrDrctDbtInitn` envelope.
 *
 * @standard ISO-20022 CustomerDirectDebitInitiationV08
 */
export interface Pain008Initiation {
  readonly messageId: string
  readonly creationDateTime: Date
  readonly numberOfTransactions: number
  readonly controlSum: number

  /** Initiating party (creditor in the SEPA SDD case). */
  readonly initiatingParty: PartyIdentification

  readonly payments: readonly Pain008Payment[]
}

/**
 * pain.008 / `PmtInf` — direct-debit payment-information block.
 *
 * @standard ISO-20022 PaymentInstruction23
 */
export interface Pain008Payment {
  readonly paymentInformationId: string
  /** Direct-debit always `'DD'`. */
  readonly paymentMethod: 'DD'
  readonly requestedCollectionDate: Date

  /**
   * Local instrument — `'CORE'` (B2C SDD), `'B2B'` (B2B SDD), `'COR1'`
   * (legacy core, deprecated).
   */
  readonly localInstrument?: 'CORE' | 'B2B' | 'COR1'
  /**
   * Sequence type — `'FRST'` (first), `'RCUR'` (recurring), `'OOFF'`
   * (one-off), `'FNAL'` (final).
   */
  readonly sequenceType: 'FRST' | 'RCUR' | 'OOFF' | 'FNAL'

  readonly creditor: PartyIdentification
  readonly creditorAccount: AccountIdentification
  readonly creditorAgentBic?: string

  readonly directDebits: readonly Pain008DirectDebit[]
}

/**
 * pain.008 / `DrctDbtTxInf` — single direct-debit transaction.
 *
 * @standard ISO-20022 DirectDebitTransactionInformation23
 */
export interface Pain008DirectDebit {
  readonly endToEndId: string
  readonly amount: number
  readonly currency: string

  /** Mandate identification — primary key into the SDD mandate register. */
  readonly mandateId: string
  /** Date the mandate was originally signed. */
  readonly dateOfSignature: Date

  readonly debtor: PartyIdentification
  readonly debtorAccount: AccountIdentification
  readonly debtorAgentBic?: string

  readonly remittanceInformation?: RemittanceInformation
}

// ─── pacs.004 — Payment return ─────────────────────────────────────────

/**
 * pacs.004 — `PmtRtr` envelope (subset). Used by the Refunds collection
 * to record incoming returns / reversals.
 *
 * @standard ISO-20022 PaymentReturnV09
 */
export interface Pacs004Return {
  readonly messageId: string
  readonly creationDateTime: Date
  readonly numberOfTransactions: number
  readonly controlSum: number
  /**
   * One or more return transactions referencing the original
   * pacs.008 / pain.001.
   */
  readonly returns: readonly Pacs004ReturnTransaction[]
}

/**
 * pacs.004 / `TxInf` — single return-transaction record.
 *
 * @standard ISO-20022 PaymentTransaction109
 */
export interface Pacs004ReturnTransaction {
  /** Return-side end-to-end id (new). */
  readonly endToEndId: string
  /** Original end-to-end id (the payment being returned). */
  readonly originalEndToEndId?: string
  readonly amount: number
  readonly currency: string

  /**
   * Return reason code — `ExternalReturnReason1Code` (e.g. `AC01`
   * incorrect account number, `AM04` insufficient funds, `MD06`
   * refund request by debtor, `BE05` unrecognised initiating party).
   */
  readonly reasonCode?: string
  readonly reasonAdditionalInformation?: string
}
