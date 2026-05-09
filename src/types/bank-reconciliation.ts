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
 * Reconciliation configuration per host
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
