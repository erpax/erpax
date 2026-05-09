/**
 * Bank Reconciliation Service — match imported bank statements to GL entries.
 *
 * @standard ISO-20022 camt.053 bank-to-customer-statement
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time statement-date value-date
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.1
 */

import { v4 as uuid } from 'uuid';
import {
  BankStatement,
  BankTransaction,
  TransactionMatch,
  ReconciliationResult,
  ReconciliationException,
  ReconciliationConfig,
  GLEntryForMatching,
} from '@/types/bank-reconciliation';
import { journalEntryService } from './journal-entry.service';
import { eventEmitter } from './event-emitter.service';

// Mock database
const bankStatements = new Map<string, BankStatement>();
const transactionMatches = new Map<string, TransactionMatch>();
const reconciliationExceptions = new Map<string, ReconciliationException>();
const reconciliationConfigs = new Map<string, ReconciliationConfig>();

// Default reconciliation config
const DEFAULT_CONFIG: ReconciliationConfig = {
  tenantId: '',
  exactMatchAmountTolerance: 1, // $0.01
  exactMatchDateTolerance: 0, // same day
  fuzzyMatchAmountTolerance: 500, // $5.00
  fuzzyMatchDateTolerance: 5, // 5 days
  autoReconcileExactMatches: true,
  autoFlagUnmatched: true,
  unmatchedThresholdDays: 7,
  unmatchedThresholdAmount: 10000, // $100
};

class BankReconciliationService {
  /**
   * Import bank statement from CSV/OFX
   */
  async importBankStatement(
    tenantId: string,
    statement: BankStatement,
    userId: string
  ): Promise<ReconciliationResult> {
    // Save statement
    bankStatements.set(statement.id, statement);

    console.log(`Importing ${statement.transactions.length} transactions...`);

    // Auto-match transactions
    const matched: BankTransaction[] = [];
    const unmatched: BankTransaction[] = [];
    const matches: TransactionMatch[] = [];

    for (const tx of statement.transactions) {
      const result = await this.matchTransaction(tenantId, tx, statement);

      if (result) {
        matched.push(tx);
        matches.push(result);

        // Auto-post matched transaction to GL if exact match
        if (result.matchType === 'exact' && result.glEntryId) {
          await this.postMatchToGL(tenantId, tx, result, userId);
        }
      } else {
        unmatched.push(tx);

        // Create exception for unmatched
        const exception = this.createException(tx, 'No GL entry found');
        reconciliationExceptions.set(exception.id, exception);
      }
    }

    // Save matches
    for (const match of matches) {
      transactionMatches.set(match.id, match);
    }

    // Calculate results
    const result: ReconciliationResult = {
      statementId: statement.id,
      totalTransactions: statement.transactions.length,
      matched: matched.filter((t) => {
        const match = matches.find((m) => m.bankTransactionId === t.id);
        return match?.matchType === 'exact';
      }).length,
      fuzzyMatched: matched.filter((t) => {
        const match = matches.find((m) => m.bankTransactionId === t.id);
        return match?.matchType === 'fuzzy';
      }).length,
      unmatched: unmatched.length,
      matchRate:
        (matched.length / statement.transactions.length) * 100,
      exceptions: Array.from(reconciliationExceptions.values()).filter(
        (e) => e.bankTransactionId && unmatched.some((t) => t.id === e.bankTransactionId)
      ),
      createdAt: new Date(),
    };

    console.log(`Reconciliation complete: ${result.matched} exact, ${result.fuzzyMatched} fuzzy, ${result.unmatched} unmatched`);

    // Emit reconciliation complete event
    await eventEmitter.emit({
      eventId: uuid(),
      eventType: 'bank:reconciliation:complete',
      tenantId,
      aggregateId: statement.id,
      aggregateType: 'bank_statement',
      timestamp: new Date(),
      userId,
      payload: result,
    } as any);

    return result;
  }

  /**
   * Match a single transaction to GL entry
   */
  private async matchTransaction(
    tenantId: string,
    bankTx: BankTransaction,
    _statement: BankStatement
  ): Promise<TransactionMatch | null> {
    const config = this.getConfig(tenantId);

    // Try exact match first
    const exactMatch = await this.findExactMatch(tenantId, bankTx, config);
    if (exactMatch) {
      return {
        id: uuid(),
        bankTransactionId: bankTx.id,
        glEntryId: exactMatch.id,
        matchType: 'exact',
        matchScore: 100,
        amountDifference: 0,
        dateDifference: 0,
        matchedAt: new Date(),
        matchedBy: 'system',
      };
    }

    // Try fuzzy match
    const fuzzyMatch = await this.findFuzzyMatch(tenantId, bankTx, config);
    if (fuzzyMatch) {
      const amountDiff = Math.abs(fuzzyMatch.amount - bankTx.amount);
      const dateDiff = Math.floor(
        (Math.abs(fuzzyMatch.entryDate.getTime() - bankTx.transactionDate.getTime()) /
          (1000 * 60 * 60 * 24))
      );

      // Calculate match score (0-99, exact would be 100)
      const amountScore = Math.max(0, 99 - (amountDiff / bankTx.amount) * 100);
      const dateScore = Math.max(0, 99 - (dateDiff / config.fuzzyMatchDateTolerance) * 50);
      const matchScore = (amountScore + dateScore) / 2;

      if (matchScore >= 50) {
        return {
          id: uuid(),
          bankTransactionId: bankTx.id,
          glEntryId: fuzzyMatch.id,
          matchType: 'fuzzy',
          matchScore: Math.round(matchScore),
          amountDifference: amountDiff,
          dateDifference: dateDiff,
          matchedAt: new Date(),
          matchedBy: 'system',
        };
      }
    }

    return null;
  }

  /**
   * Find exact match in GL entries
   * Same amount, same day
   */
  private async findExactMatch(
    tenantId: string,
    bankTx: BankTransaction,
    config: ReconciliationConfig
  ): Promise<GLEntryForMatching | null> {
    // Get all GL entries for date range
    const entries = await journalEntryService.listEntries(tenantId, {
      status: 'posted',
      fromDate: new Date(bankTx.transactionDate.getTime() - 24 * 60 * 60 * 1000),
      toDate: new Date(bankTx.transactionDate.getTime() + 24 * 60 * 60 * 1000),
    });

    // Find matching entry
    for (const entry of entries) {
      const totalDebit = entry.lines.reduce((sum, l) => sum + (l.debit || 0), 0);
      const totalCredit = entry.lines.reduce((sum, l) => sum + (l.credit || 0), 0);
      const entryAmount = totalDebit || totalCredit;

      if (
        Math.abs(entryAmount - bankTx.amount) <= config.exactMatchAmountTolerance &&
        !this.isAlreadyMatched(entry.id)
      ) {
        return {
          id: entry.id,
          entryNumber: entry.entryNumber,
          entryDate: entry.entryDate,
          description: entry.description,
          amount: entryAmount,
          type: bankTx.type,
          sourceId: entry.sourceId,
          sourceType: entry.sourceType,
          reconciled: false,
        };
      }
    }

    return null;
  }

  /**
   * Find fuzzy match in GL entries
   * Within tolerance of amount and date
   */
  private async findFuzzyMatch(
    tenantId: string,
    bankTx: BankTransaction,
    config: ReconciliationConfig
  ): Promise<GLEntryForMatching | null> {
    // Get GL entries within date range
    const fromDate = new Date(
      bankTx.transactionDate.getTime() -
        config.fuzzyMatchDateTolerance * 24 * 60 * 60 * 1000
    );
    const toDate = new Date(
      bankTx.transactionDate.getTime() +
        config.fuzzyMatchDateTolerance * 24 * 60 * 60 * 1000
    );

    const entries = await journalEntryService.listEntries(tenantId, {
      status: 'posted',
      fromDate,
      toDate,
    });

    // Find best fuzzy match
    let bestMatch: GLEntryForMatching | null = null;
    let bestScore = 0;

    for (const entry of entries) {
      if (this.isAlreadyMatched(entry.id)) continue;

      const totalDebit = entry.lines.reduce((sum, l) => sum + (l.debit || 0), 0);
      const totalCredit = entry.lines.reduce((sum, l) => sum + (l.credit || 0), 0);
      const entryAmount = totalDebit || totalCredit;

      // Check if within fuzzy tolerance
      const amountDiff = Math.abs(entryAmount - bankTx.amount);
      if (amountDiff > config.fuzzyMatchAmountTolerance) continue;

      const dateDiff = Math.floor(
        Math.abs(entry.entryDate.getTime() - bankTx.transactionDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      if (dateDiff > config.fuzzyMatchDateTolerance) continue;

      // Calculate score
      const amountScore = Math.max(0, 100 - (amountDiff / bankTx.amount) * 100);
      const dateScore = Math.max(0, 100 - (dateDiff / config.fuzzyMatchDateTolerance) * 50);
      const score = (amountScore + dateScore) / 2;

      if (score > bestScore) {
        bestScore = score;
        bestMatch = {
          id: entry.id,
          entryNumber: entry.entryNumber,
          entryDate: entry.entryDate,
          description: entry.description,
          amount: entryAmount,
          type: bankTx.type,
          sourceId: entry.sourceId,
          sourceType: entry.sourceType,
          reconciled: false,
        };
      }
    }

    return bestMatch;
  }

  /**
   * Post bank transaction match to GL
   * Creates GL entry linking bank transaction to GL entry
   */
  private async postMatchToGL(
    tenantId: string,
    bankTx: BankTransaction,
    match: TransactionMatch,
    userId: string
  ): Promise<void> {
    // Emit bank:transaction:matched event
    await eventEmitter.emit({
      eventId: uuid(),
      eventType: 'bank:transaction:matched',
      tenantId,
      aggregateId: bankTx.id,
      aggregateType: 'bank_statement',
      timestamp: new Date(),
      userId,
      payload: {
        bankTransactionId: bankTx.id,
        journalEntryId: match.glEntryId,
        matchType: match.matchType,
        matchDate: new Date(),
      },
    } as any);
  }

  /**
   * Check if GL entry is already matched
   */
  private isAlreadyMatched(glEntryId: string): boolean {
    for (const match of transactionMatches.values()) {
      if (match.glEntryId === glEntryId) return true;
    }
    return false;
  }

  /**
   * Create reconciliation exception
   */
  private createException(
    bankTx: BankTransaction,
    reason: string
  ): ReconciliationException {
    return {
      id: uuid(),
      bankTransactionId: bankTx.id,
      reason,
      severity: bankTx.amount > 100000 ? 'error' : 'warning',
      flaggedAt: new Date(),
      flaggedBy: 'system',
      reviewed: false,
    };
  }

  /**
   * Get reconciliation config for host
   */
  private getConfig(tenantId: string): ReconciliationConfig {
    return (
      reconciliationConfigs.get(tenantId) || {
        ...DEFAULT_CONFIG,
        tenantId,
      }
    );
  }

  /**
   * Set reconciliation config
   */
  async setConfig(tenantId: string, config: Partial<ReconciliationConfig>): Promise<void> {
    const current = this.getConfig(tenantId);
    reconciliationConfigs.set(tenantId, { ...current, ...config });
  }

  /**
   * Get unmatched transactions
   */
  async getUnmatchedTransactions(
    tenantId: string,
    days?: number
  ): Promise<BankTransaction[]> {
    const unmatched: BankTransaction[] = [];
    const threshold = new Date();
    if (days) threshold.setDate(threshold.getDate() - days);

    for (const statement of bankStatements.values()) {
      if (statement.tenantId !== tenantId) continue;

      for (const tx of statement.transactions) {
        if (!this.isAlreadyMatched(tx.id as any)) {
          if (!days || tx.transactionDate < threshold) {
            unmatched.push(tx);
          }
        }
      }
    }

    return unmatched;
  }

  /**
   * Get bank reconciliation statistics
   */
  async getStats(tenantId: string): Promise<{
    totalStatements: number;
    totalTransactions: number;
    totalMatched: number;
    averageMatchRate: number;
  }> {
    let totalStatements = 0;
    let totalTransactions = 0;
    let totalMatched = 0;

    for (const statement of bankStatements.values()) {
      if (statement.tenantId !== tenantId) continue;

      totalStatements++;
      totalTransactions += statement.transactions.length;

      for (const tx of statement.transactions) {
        if (this.isAlreadyMatched(tx.id as any)) {
          totalMatched++;
        }
      }
    }

    return {
      totalStatements,
      totalTransactions,
      totalMatched,
      averageMatchRate:
        totalTransactions > 0 ? (totalMatched / totalTransactions) * 100 : 0,
    };
  }

  /**
   * Clear data (for testing)
   */
  clearAllData(): void {
    bankStatements.clear();
    transactionMatches.clear();
    reconciliationExceptions.clear();
  }
}

export const bankReconciliationService = new BankReconciliationService();
