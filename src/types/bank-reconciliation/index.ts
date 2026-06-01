/**
 * Bank Reconciliation types — match bank statements to GL entries.
 *
 * @standard ISO-20022 camt.053 bank-to-customer-statement
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.1
 */

export type BankTransactionType = 'debit' | 'credit';
export type MatchType = 'exact' | 'fuzzy' | 'none';
export type ReconciliationStatus = 'pending' | 'matched' | 'unmatched' | 'reconciled' | 'exception';

/**
 * Bank Transaction from statement
 */
export interface BankTransaction {
  id: string;
  tenantId: string;
  accountNumber: string;
  transactionDate: Date;
  description: string;
  amount: number;
  type: BankTransactionType;
  balance: number;
  referenceNumber?: string;
  statementId: string;
}

/**
 * Bank Statement (CSV/OFX import)
 */
export interface BankStatement {
  id: string;
  tenantId: string;
  accountNumber: string;
  accountName: string;
  statementDate: Date;
  statementPeriodStart: Date;
  statementPeriodEnd: Date;
  openingBalance: number;
  closingBalance: number;
  currencyCode: string;
  transactions: BankTransaction[];
  importedAt: Date;
  importedBy: string;
  fileName: string;
}

/**
 * GL Entry for matching (simplified for reconciliation)
 */
export interface GLEntryForMatching {
  id: string;
  entryNumber: string;
  entryDate: Date;
  description: string;
  amount: number;
  type: BankTransactionType;
  sourceId: string;
  sourceType: string;
  reconciled: boolean;
}

/**
 * Match between bank transaction and GL entry
 */
export interface TransactionMatch {
  id: string;
  bankTransactionId: string;
  glEntryId: string;
  matchType: MatchType;
  matchScore: number; // 0-100 for fuzzy matches
  amountDifference: number;
  dateDifference: number; // days
  matchedAt: Date;
  matchedBy: string;
}

/**
 * Reconciliation result
 */
export interface ReconciliationResult {
  statementId: string;
  totalTransactions: number;
  matched: number;
  fuzzyMatched: number;
  unmatched: number;
  matchRate: number; // percentage
  exceptions: ReconciliationException[];
  createdAt: Date;
}

/**
 * Unmatched transaction flagged for review
 */
export interface ReconciliationException {
  id: string;
  bankTransactionId: string;
  reason: string;
  severity: 'info' | 'warning' | 'error';
  flaggedAt: Date;
  flaggedBy: string;
  reviewed: boolean;
  reviewedAt?: Date;
  reviewedBy?: string;
  resolution?: string;
}

/**
 * Reconciliation configuration per tenant
 */
export interface ReconciliationConfig {
  tenantId: string;
  exactMatchAmountTolerance: number; // cents, e.g., 1 = $0.01
  exactMatchDateTolerance: number; // days
  fuzzyMatchAmountTolerance: number; // cents
  fuzzyMatchDateTolerance: number; // days
  autoReconcileExactMatches: boolean;
  autoFlagUnmatched: boolean;
  unmatchedThresholdDays: number;
  unmatchedThresholdAmount: number;
}

/**
 * Matching rule (for fuzzy matching)
 */
export interface MatchingRule {
  id: string;
  tenantId: string;
  name: string;
  pattern: RegExp; // Bank description pattern
  glAccountId?: string;
  priority: number;
  enabled: boolean;
}

/**
 * Bank reconciliation report — canonical "balance per bank" / "balance per
 * GL" two-column format that resolves to a $0.00 difference for closure.
 *
 * Mirrors the textbook layout in finance:reconciliation skill:
 *   Balance per bank statement
 *   + Deposits in transit
 *   - Outstanding checks
 *   ± Bank errors
 *   = Adjusted bank balance
 *
 *   Balance per general ledger
 *   + Interest / credits not recorded
 *   - Bank fees not recorded
 *   ± GL errors
 *   = Adjusted GL balance
 *
 *   Difference (must be 0 to sign off)
 *
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @audit ISO-19011:2018 audit-trail bank-reconciliation
 * @compliance SOX §404 internal-controls
 */
export interface OutstandingItem {
  id: string;
  description: string;
  amount: number;
  /** Date the item originated (issue date for checks, deposit date for DITs). */
  originatedAt: Date;
  /** GL entry id (for outstanding checks / DITs already in GL). */
  glEntryId?: string;
  /** Bank transaction id (for unrecorded bank items). */
  bankTransactionId?: string;
}

export interface BankSideAdjustments {
  depositsInTransit: OutstandingItem[];
  outstandingChecks: OutstandingItem[];
  bankErrors: OutstandingItem[];
}

export interface GLSideAdjustments {
  unrecordedInterest: OutstandingItem[];
  unrecordedFees: OutstandingItem[];
  glErrors: OutstandingItem[];
}

export interface BankReconciliationReport {
  tenantId: string;
  accountNumber: string;
  asOfDate: Date;
  currencyCode: string;

  // Bank side
  balancePerBank: number;
  bankAdjustments: BankSideAdjustments;
  adjustedBankBalance: number;

  // GL side
  balancePerGL: number;
  glAdjustments: GLSideAdjustments;
  adjustedGLBalance: number;

  // Closure check — must be 0 (within rounding tolerance) for sign-off.
  difference: number;
  reconciled: boolean;

  generatedAt: Date;
}

/**
 * Outstanding-item aging bucket counts (per skill: 0-30 / 31-60 / 61-90 / 90+).
 *
 * @audit ISO-19011:2018 audit-trail aging-of-reconciling-items
 */
export interface OutstandingItemsAging {
  tenantId: string;
  accountNumber: string;
  asOfDate: Date;
  buckets: {
    current: { count: number; amount: number };          // 0-30 days
    aging: { count: number; amount: number };            // 31-60 days
    overdue: { count: number; amount: number };          // 61-90 days
    stale: { count: number; amount: number };            // 90+ days
  };
  totalCount: number;
  totalAmount: number;
}

/**
 * Adjustment kinds the canonical Category-2 (adjusting JE required)
 * helper supports. Each maps to a fixed JE shape:
 *   • bank_fee       — Dr Bank Fee Expense   / Cr Cash
 *   • interest_income — Dr Cash               / Cr Interest Income
 *   • interest_expense — Dr Interest Expense  / Cr Cash
 *   • returned_check  — Dr Accounts Receivable / Cr Cash
 *
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting US-GAAP ASC-310 receivables returned-checks
 */
export type BankAdjustmentKind =
  | 'bank_fee'
  | 'interest_income'
  | 'interest_expense'
  | 'returned_check';

/**
 * Bank reconciliation statistics
 */
export interface ReconciliationStats {
  tenantId: string;
  accountNumber: string;
  totalStatements: number;
  totalTransactions: number;
  totalMatched: number;
  totalUnmatched: number;
  averageMatchRate: number;
  lastReconciliationDate: Date;
  outstandingAmount: number;
  outstandingDays: number;
}
