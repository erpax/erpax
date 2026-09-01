/**
 * Monetary Field Storage — integer-cents convention.
 *
 * Every monetary amount stored as smallest-unit integer (`amountCents`),
 * never floating point. Prevents IEEE-754 precision loss
 * (e.g. `0.1 + 0.2 !== 0.3`), accumulated rounding errors, and
 * statement-balance corruption.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard IEEE-754-2019 binary-floating-point avoid-for-money
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-210 balance-sheet
 * @audit ISO-19011:2018 audit-trail integer-only-arithmetic
 * @see docs/STANDARDS.md §4.2
 */

import { exactAbs, exactRound } from '@/algebra'

export const createAmountField = (fieldName: string = 'amount') => {
  return {
    name: fieldName,
    type: 'number',
    required: true,
    admin: {
      description: `Monetary amount in cents (${fieldName} = cents, divide by 100 for display)`,
    },
    validate: (value: number) => {
      if (!Number.isInteger(value)) {
        return 'Amount must be stored as integer cents (e.g., 9999 for $99.99)'
      }
      if (exactAbs(value) > 999999999) {
        return 'Amount exceeds maximum allowed value'
      }
      return true
    },
    hooks: {
      beforeValidate: [
        async ({ data }: { data: Record<string, unknown> }) => {
          // If decimal value is provided, convert to cents
          if (data[fieldName] && typeof data[fieldName] === 'string') {
            const decimal = parseFloat(data[fieldName] as string)
            data[fieldName] = exactRound(decimal * 100)
          }
          return data
        },
      ],
    },
  }
}

/**
 * Utility functions for money conversion
 */
export class MoneyFormatter {
  /**
   * Convert cents to USD display format
   * @param cents - Amount in cents
   * @returns Formatted USD string ($0.00)
   */
  static centsToUSD(cents: number): string {
    const dollars = (cents / 100).toFixed(2)
    return new Intl.NumberFormat('bg-BG', {
      style: 'currency',
      currency: 'EUR',
    }).format(parseFloat(dollars))
  }

  /**
   * Convert USD to cents
   * @param dollars - Amount in dollars
   * @returns Amount in cents as integer
   */
  static usdToCents(dollars: number): number {
    return exactRound(dollars * 100)
  }

  /**
   * Validate monetary amount in cents
   */
  static isValidCents(cents: number): boolean {
    return Number.isInteger(cents) && exactAbs(cents) <= 999999999
  }

  /**
   * Round cents to nearest cent
   */
  static roundCents(cents: number): number {
    return exactRound(cents)
  }

  /**
   * Add monetary amounts
   */
  static addCents(...amounts: number[]): number {
    return amounts.reduce((sum, amount) => sum + amount, 0)
  }

  /**
   * Subtract monetary amounts
   */
  static subtractCents(minuend: number, subtrahend: number): number {
    return minuend - subtrahend
  }

  /**
   * Multiply monetary amount
   */
  static multiplyCents(cents: number, multiplier: number): number {
    return exactRound(cents * multiplier)
  }

  /**
   * Divide monetary amount
   */
  static divideCents(cents: number, divisor: number): number {
    if (divisor === 0) throw new Error('Cannot divide by zero')
    return exactRound(cents / divisor)
  }
}

/**
 * Database migration strategy:
 *
 * From: decimal(10, 2) or similar floating-point
 * To: integer (storing cents)
 *
 * Migration SQL:
 * ALTER TABLE accounts MODIFY balance INT NOT NULL DEFAULT 0;
 * UPDATE accounts SET balance = ROUND(balance * 100);
 *
 * ALTER TABLE entries MODIFY debit INT NOT NULL DEFAULT 0;
 * ALTER TABLE entries MODIFY credit INT NOT NULL DEFAULT 0;
 * UPDATE entries SET debit = ROUND(debit * 100), credit = ROUND(credit * 100);
 */

/** @index-cross.foldback child=accounting/money parent=accounting — this cross folds back into its parent. */
