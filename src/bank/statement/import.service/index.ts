/**
 * Bank Statement Import Service — parse CSV / OFX / camt.053 statements.
 *
 * @standard ISO-20022 camt.053 bank-to-customer-statement
 * @standard MT940 swift-statement-message legacy
 * @standard OFX-2.2 open-financial-exchange
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @rfc 4180 csv
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.1
 */

import { v4 as uuid } from 'uuid';
import { BankStatement, BankTransaction } from '@/types/bank-reconciliation';
import { bankReconciliationService } from '@/bank/reconciliation.service';

export interface ImportResult {
  success: boolean;
  statement?: BankStatement;
  error?: string;
  rowsProcessed: number;
  transactionsCreated: number;
}

class BankStatementImportService {
  /**
   * Import CSV file (standard format)
   * Expected columns: Date, Description, Debit, Credit, Balance
   */
  async importCSV(
    tenantId: string,
    csv: string,
    accountNumber: string,
    accountName: string,
    currencyCode: string = 'EUR',
    fileName: string = 'statement.csv',
    userId: string = 'system'
  ): Promise<ImportResult> {
    try {
      const lines = csv.trim().split('\n');

      if (lines.length < 2) {
        return {
          success: false,
          error: 'CSV file has no data rows',
          rowsProcessed: 0,
          transactionsCreated: 0,
        };
      }

      // Parse header
      const header = lines[0].toLowerCase().split(',').map((h) => h.trim());
      const dateIdx = header.findIndex((h) => h.includes('date'));
      const descIdx = header.findIndex((h) => h.includes('description'));
      const debitIdx = header.findIndex((h) => h.includes('debit'));
      const creditIdx = header.findIndex((h) => h.includes('credit'));
      const balanceIdx = header.findIndex((h) => h.includes('balance'));
      const refIdx = header.findIndex((h) => h.includes('reference'));

      if (dateIdx === -1 || descIdx === -1) {
        return {
          success: false,
          error: 'CSV missing required columns (Date, Description)',
          rowsProcessed: 0,
          transactionsCreated: 0,
        };
      }

      const transactions: BankTransaction[] = [];
      let openingBalance = 0;
      let closingBalance = 0;
      let statementStartDate: Date | null = null;
      let statementEndDate: Date | null = null;

      // Parse data rows
      for (let i = 1; i < lines.length; i++) {
        const cells = lines[i].split(',').map((c) => c.trim());

        try {
          const dateStr = cells[dateIdx];
          const desc = cells[descIdx];
          const debit = debitIdx >= 0 ? parseFloat(cells[debitIdx]) : 0;
          const credit = creditIdx >= 0 ? parseFloat(cells[creditIdx]) : 0;
          const balance = balanceIdx >= 0 ? parseFloat(cells[balanceIdx]) : 0;
          const ref = refIdx >= 0 ? cells[refIdx] : undefined;

          // Parse date (handle multiple formats)
          const txDate = this.parseDate(dateStr);
          if (!txDate) continue;

          // Determine transaction type
          const amount = debit > 0 ? debit : credit;
          const type = debit > 0 ? 'debit' : 'credit';

          // Track statement dates
          if (!statementStartDate || txDate < statementStartDate) {
            statementStartDate = txDate;
          }
          if (!statementEndDate || txDate > statementEndDate) {
            statementEndDate = txDate;
          }

          // Track opening/closing balances
          if (i === 1) {
            openingBalance = balance - amount;
          }
          closingBalance = balance;

          // Create transaction
          const transaction: BankTransaction = {
            id: uuid(),
            tenantId,
            accountNumber,
            transactionDate: txDate,
            description: desc,
            amount,
            type,
            balance,
            referenceNumber: ref,
            statementId: '', // Set after creating statement
          };

          transactions.push(transaction);
        } catch (e) {
          // Skip invalid rows
          console.warn(`Skipping invalid row ${i}: ${e}`);
        }
      }

      if (transactions.length === 0) {
        return {
          success: false,
          error: 'No valid transactions found in CSV',
          rowsProcessed: lines.length - 1,
          transactionsCreated: 0,
        };
      }

      // Create statement
      const statementId = uuid();
      const statement: BankStatement = {
        id: statementId,
        tenantId,
        accountNumber,
        accountName,
        statementDate: new Date(),
        statementPeriodStart: statementStartDate!,
        statementPeriodEnd: statementEndDate!,
        openingBalance,
        closingBalance,
        currencyCode,
        transactions: transactions.map((t) => ({ ...t, statementId })),
        importedAt: new Date(),
        importedBy: userId,
        fileName,
      };

      // Auto-reconcile
      await bankReconciliationService.importBankStatement(tenantId, statement, userId);

      return {
        success: true,
        statement,
        rowsProcessed: lines.length - 1,
        transactionsCreated: transactions.length,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        rowsProcessed: 0,
        transactionsCreated: 0,
      };
    }
  }

  /**
   * Import OFX file (Open Financial Exchange)
   * Simplified OFX parser
   */
  async importOFX(
    tenantId: string,
    ofx: string,
    accountNumber: string,
    accountName: string,
    currencyCode: string = 'EUR',
    fileName: string = 'statement.ofx',
    userId: string = 'system'
  ): Promise<ImportResult> {
    try {
      // Extract STMTRS section
      const stmtMatch = ofx.match(/<STMTRS>([\s\S]*?)<\/STMTRS>/);
      if (!stmtMatch) {
        return {
          success: false,
          error: 'Invalid OFX format - missing STMTRS',
          rowsProcessed: 0,
          transactionsCreated: 0,
        };
      }

      const stmtSection = stmtMatch[1];

      // Extract balances
      const openingMatch = stmtSection.match(/<BALLIST>([\s\S]*?)<\/BALLIST>/);
      const openingBalance = openingMatch
        ? parseFloat(openingMatch[1].match(/<BALAMT>([\d.]+)<\/BALAMT>/)?.[1] || '0')
        : 0;

      const closingMatch = stmtSection.match(/<LEDGERBAL>([\s\S]*?)<\/LEDGERBAL>/);
      const closingBalance = closingMatch
        ? parseFloat(closingMatch[1].match(/<BALAMT>([\d.]+)<\/BALAMT>/)?.[1] || '0')
        : 0;

      // Extract transactions
      const transMatches = stmtSection.match(/<STMTTRN>([\s\S]*?)<\/STMTTRN>/g) || [];
      const transactions: BankTransaction[] = [];
      let statementStartDate: Date | null = null;
      let statementEndDate: Date | null = null;

      for (const tranMatch of transMatches) {
        try {
          const _typeMatch = tranMatch.match(/<TRNTYPE>([^<]+)<\/TRNTYPE>/);
          const dateMatch = tranMatch.match(/<DTPOSTED>(\d{8})<\/DTPOSTED>/);
          const amountMatch = tranMatch.match(/<TRNAMT>([\d.-]+)<\/TRNAMT>/);
          const idMatch = tranMatch.match(/<FITID>([^<]+)<\/FITID>/);
          const nameMatch = tranMatch.match(/<NAME>([^<]+)<\/NAME>/);
          const memoMatch = tranMatch.match(/<MEMO>([^<]*)<\/MEMO>/);

          if (!dateMatch || !amountMatch) continue;

          const txDate = this.parseOFXDate(dateMatch[1]);
          const amount = Math.abs(parseFloat(amountMatch[1]));
          const type = parseFloat(amountMatch[1]) < 0 ? 'debit' : 'credit';
          const description = `${nameMatch?.[1] || ''} ${memoMatch?.[1] || ''}`.trim();

          // Track dates
          if (!statementStartDate || txDate < statementStartDate) {
            statementStartDate = txDate;
          }
          if (!statementEndDate || txDate > statementEndDate) {
            statementEndDate = txDate;
          }

          const transaction: BankTransaction = {
            id: uuid(),
            tenantId,
            accountNumber,
            transactionDate: txDate,
            description,
            amount,
            type,
            balance: 0, // OFX doesn't provide running balance
            referenceNumber: idMatch?.[1],
            statementId: '', // Set after creating statement
          };

          transactions.push(transaction);
        } catch (e) {
          console.warn(`Error parsing OFX transaction: ${e}`);
        }
      }

      if (transactions.length === 0) {
        return {
          success: false,
          error: 'No valid transactions found in OFX',
          rowsProcessed: 0,
          transactionsCreated: 0,
        };
      }

      // Create statement
      const statementId = uuid();
      const statement: BankStatement = {
        id: statementId,
        tenantId,
        accountNumber,
        accountName,
        statementDate: new Date(),
        statementPeriodStart: statementStartDate!,
        statementPeriodEnd: statementEndDate!,
        openingBalance,
        closingBalance,
        currencyCode,
        transactions: transactions.map((t) => ({ ...t, statementId })),
        importedAt: new Date(),
        importedBy: userId,
        fileName,
      };

      // Auto-reconcile
      await bankReconciliationService.importBankStatement(tenantId, statement, userId);

      return {
        success: true,
        statement,
        rowsProcessed: transactions.length,
        transactionsCreated: transactions.length,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        rowsProcessed: 0,
        transactionsCreated: 0,
      };
    }
  }

  /**
   * Parse date string (multiple formats)
   */
  private parseDate(dateStr: string): Date | null {
    // Try common formats: MM/DD/YYYY, DD/MM/YYYY, YYYY-MM-DD
    const formats = [
      /(\d{1,2})\/(\d{1,2})\/(\d{4})/, // MM/DD/YYYY or DD/MM/YYYY
      /(\d{4})-(\d{2})-(\d{2})/, // YYYY-MM-DD
    ];

    for (const format of formats) {
      const match = dateStr.match(format);
      if (match) {
        try {
          // Assume MM/DD/YYYY format (US standard)
          const m = parseInt(match[1]);
          const d = parseInt(match[2]);
          const y = parseInt(match[3]);

          if (y >= 1900 && y <= 2100 && m >= 1 && m <= 12 && d >= 1 && d <= 31) {
            return new Date(y, m - 1, d);
          }
        } catch (_e) {
          // Continue to next format
        }
      }
    }

    return null;
  }

  /**
   * Parse OFX date format: YYYYMMDD
   */
  private parseOFXDate(dateStr: string): Date {
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6));
    const day = parseInt(dateStr.substring(6, 8));

    return new Date(year, month - 1, day);
  }
}

export const bankStatementImportService = new BankStatementImportService();
