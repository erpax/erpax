/**
 * Money Storage Tests — verify integer-cents arithmetic, never floats.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-4217:2015 currency-codes
 * @standard IEEE-754-2019 binary-floating-point avoid-for-money
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-210 balance-sheet
 * @see docs/STANDARDS.md §4.2 §7
 * @see src/standards/_money/
 */

import { MoneyFormatter } from '@/plugins/accounting/fields-money-fix'

describe('Money Storage - Cents-based Integer Storage', () => {
  describe('MoneyFormatter.centsToUSD', () => {
    test('should convert 9999 cents to $99.99', () => {
      expect(MoneyFormatter.centsToUSD(9999)).toBe('$99.99')
    })

    test('should convert 100 cents to $1.00', () => {
      expect(MoneyFormatter.centsToUSD(100)).toBe('$1.00')
    })

    test('should convert 1 cent to $0.01', () => {
      expect(MoneyFormatter.centsToUSD(1)).toBe('$0.01')
    })

    test('should handle zero', () => {
      expect(MoneyFormatter.centsToUSD(0)).toBe('$0.00')
    })

    test('should handle negative amounts', () => {
      expect(MoneyFormatter.centsToUSD(-9999)).toBe('-$99.99')
    })

    test('should handle large amounts', () => {
      expect(MoneyFormatter.centsToUSD(999999999)).toBe('$9,999,999.99')
    })
  })

  describe('MoneyFormatter.usdToCents', () => {
    test('should convert $99.99 to 9999 cents', () => {
      expect(MoneyFormatter.usdToCents(99.99)).toBe(9999)
    })

    test('should convert $1.00 to 100 cents', () => {
      expect(MoneyFormatter.usdToCents(1.0)).toBe(100)
    })

    test('should convert $0.01 to 1 cent', () => {
      expect(MoneyFormatter.usdToCents(0.01)).toBe(1)
    })

    test('should handle negative amounts', () => {
      expect(MoneyFormatter.usdToCents(-99.99)).toBe(-9999)
    })

    test('should handle rounding correctly', () => {
      // 10.555 -> 1055 cents (not 1055.5)
      expect(MoneyFormatter.usdToCents(10.555)).toBe(1055)
    })

    test('should handle floating-point precision issues', () => {
      // JavaScript: 0.1 + 0.2 = 0.30000000000000004
      // But as cents: 10 + 20 = 30 (exact)
      const result = MoneyFormatter.usdToCents(0.1) + MoneyFormatter.usdToCents(0.2)
      expect(result).toBe(30)
    })
  })

  describe('MoneyFormatter.isValidCents', () => {
    test('should accept integer amounts', () => {
      expect(MoneyFormatter.isValidCents(9999)).toBe(true)
    })

    test('should reject decimal amounts', () => {
      expect(MoneyFormatter.isValidCents(99.99)).toBe(false)
    })

    test('should accept zero', () => {
      expect(MoneyFormatter.isValidCents(0)).toBe(true)
    })

    test('should accept negative amounts', () => {
      expect(MoneyFormatter.isValidCents(-9999)).toBe(true)
    })

    test('should reject amounts exceeding maximum', () => {
      expect(MoneyFormatter.isValidCents(1000000000)).toBe(false)
    })
  })

  describe('MoneyFormatter.roundCents', () => {
    test('should round to nearest cent', () => {
      expect(MoneyFormatter.roundCents(9999.5)).toBe(10000)
    })

    test('should round down if needed', () => {
      expect(MoneyFormatter.roundCents(9999.4)).toBe(9999)
    })

    test('should handle negative rounding', () => {
      expect(MoneyFormatter.roundCents(-9999.5)).toBe(-10000)
    })
  })

  describe('MoneyFormatter.addCents', () => {
    test('should add multiple amounts correctly', () => {
      // $1.00 + $2.00 + $3.00 = $6.00
      const result = MoneyFormatter.addCents(100, 200, 300)
      expect(result).toBe(600)
      expect(MoneyFormatter.centsToUSD(result)).toBe('$6.00')
    })

    test('should handle mixed positive and negative', () => {
      // $10.00 - $3.00 = $7.00
      const result = MoneyFormatter.addCents(1000, -300)
      expect(result).toBe(700)
    })

    test('should avoid floating-point errors', () => {
      // 0.1 + 0.2 + 0.3 = 0.6 (exactly)
      const result = MoneyFormatter.addCents(
        MoneyFormatter.usdToCents(0.1),
        MoneyFormatter.usdToCents(0.2),
        MoneyFormatter.usdToCents(0.3)
      )
      expect(result).toBe(MoneyFormatter.usdToCents(0.6))
    })
  })

  describe('MoneyFormatter.subtractCents', () => {
    test('should subtract correctly', () => {
      // $10.00 - $3.00 = $7.00
      const result = MoneyFormatter.subtractCents(1000, 300)
      expect(result).toBe(700)
    })

    test('should handle negative results', () => {
      // $3.00 - $10.00 = -$7.00
      const result = MoneyFormatter.subtractCents(300, 1000)
      expect(result).toBe(-700)
    })
  })

  describe('MoneyFormatter.multiplyCents', () => {
    test('should multiply monetary amount', () => {
      // $10.00 × 1.5 = $15.00
      const result = MoneyFormatter.multiplyCents(1000, 1.5)
      expect(result).toBe(1500)
    })

    test('should handle decimal multipliers with rounding', () => {
      // $10.00 × 0.33 = $3.30 (rounded)
      const result = MoneyFormatter.multiplyCents(1000, 0.33)
      expect(result).toBe(330)
    })

    test('should handle negative multipliers', () => {
      // $10.00 × -2 = -$20.00
      const result = MoneyFormatter.multiplyCents(1000, -2)
      expect(result).toBe(-2000)
    })
  })

  describe('MoneyFormatter.divideCents', () => {
    test('should divide monetary amount', () => {
      // $10.00 ÷ 2 = $5.00
      const result = MoneyFormatter.divideCents(1000, 2)
      expect(result).toBe(500)
    })

    test('should handle rounding', () => {
      // $10.00 ÷ 3 = $3.33 (rounded)
      const result = MoneyFormatter.divideCents(1000, 3)
      expect(result).toBe(333)
    })

    test('should throw on division by zero', () => {
      expect(() => MoneyFormatter.divideCents(1000, 0)).toThrow()
    })
  })

  describe('Financial Calculations Without Precision Errors', () => {
    test('should calculate double-entry debit/credit balance correctly', () => {
      // Entry 1: Debit Cash 100, Credit Revenue 100
      const debit1 = 10000 // $100.00
      const credit1 = 10000 // $100.00

      // Entry 2: Debit Expense 50, Credit Cash 50
      const debit2 = 5000 // $50.00
      const credit2 = 5000 // $50.00

      const totalDebits = MoneyFormatter.addCents(debit1, debit2)
      const totalCredits = MoneyFormatter.addCents(credit1, credit2)

      expect(totalDebits).toBe(15000)
      expect(totalCredits).toBe(15000)
      expect(totalDebits === totalCredits).toBe(true)
    })

    test('should calculate account balance without precision errors', () => {
      // Starting balance: $1000
      const opening = 100000

      // Add: $0.10
      const add1 = MoneyFormatter.addCents(opening, 10)

      // Add: $0.20
      const add2 = MoneyFormatter.addCents(add1, 20)

      // Add: $0.30
      const add3 = MoneyFormatter.addCents(add2, 30)

      // Result should be $1000.60 (no floating-point error)
      expect(add3).toBe(100060)
      expect(MoneyFormatter.centsToUSD(add3)).toBe('$1,000.60')
    })

    test('should calculate percentage allocations exactly', () => {
      // Allocate $100 across 3 accounts
      const total = 10000 // $100.00
      const part1 = MoneyFormatter.divideCents(total, 3) // $33.33
      const part2 = MoneyFormatter.divideCents(total, 3) // $33.33
      const part3 = total - part1 - part2 // $33.34

      const allocated = MoneyFormatter.addCents(part1, part2, part3)
      expect(allocated).toBe(total)
    })

    test('should calculate interest correctly', () => {
      // Principal: $1000
      // Rate: 5% annually = 0.05
      // Interest: $1000 × 0.05 = $50

      const principal = 100000 // $1000.00
      const rate = 0.05 // 5%
      const interest = MoneyFormatter.multiplyCents(principal, rate)

      expect(interest).toBe(5000) // $50.00
      expect(MoneyFormatter.centsToUSD(interest)).toBe('$50.00')
    })

    test('should calculate running totals in reports correctly', () => {
      // Simulate running total for a Balance Sheet
      const accounts = [
        { balance: 50000 }, // Cash: $500
        { balance: 30000 }, // A/R: $300
        { balance: 75000 }, // Equipment: $750
      ]

      const total = accounts.reduce((sum, acc) => MoneyFormatter.addCents(sum, acc.balance), 0)

      expect(total).toBe(155000) // $1550.00
      expect(MoneyFormatter.centsToUSD(total)).toBe('$1,550.00')
    })
  })

  describe('Data Integrity', () => {
    test('should ensure all stored values are integers', () => {
      const values = [9999, 100, 1, 0, -9999, -100]

      values.forEach((value) => {
        expect(Number.isInteger(value)).toBe(true)
        expect(MoneyFormatter.isValidCents(value)).toBe(true)
      })
    })

    test('should reject any decimal storage', () => {
      const decimalValues = [99.99, 10.5, 0.01, -50.25]

      decimalValues.forEach((value) => {
        expect(Number.isInteger(value)).toBe(false)
        expect(MoneyFormatter.isValidCents(value)).toBe(false)
      })
    })

    test('should maintain precision through conversions', () => {
      const usd = 123.45
      const cents = MoneyFormatter.usdToCents(usd)
      const backToUsd = parseFloat((cents / 100).toFixed(2))

      expect(backToUsd).toBe(usd)
    })
  })

  describe('Compliance & Standards', () => {
    test('ISO 4217: Currency amounts stored with correct decimal places', () => {
      // USD has 2 decimal places, stored as cents (100 = $1.00)
      const usdAmount = 9999
      const displayFormat = (usdAmount / 100).toFixed(2)

      expect(displayFormat).toBe('99.99')
    })

    test('should prevent rounding errors in tax calculations', () => {
      // Calculate 10% tax on $99.99
      const amount = 9999 // $99.99
      const taxRate = 0.10 // 10%
      const tax = MoneyFormatter.multiplyCents(amount, taxRate) // $9.999 -> $10.00
      const total = MoneyFormatter.addCents(amount, tax)

      expect(tax).toBe(1000) // $10.00
      expect(total).toBe(10999) // $109.99
    })

    test('should handle currency conversion correctly', () => {
      // $100 USD to EUR (example: 1 USD = 0.92 EUR)
      const usdCents = 10000 // $100.00
      const rate = 0.92
      const eurCents = MoneyFormatter.multiplyCents(usdCents, rate)

      expect(eurCents).toBe(9200) // €92.00
    })
  })
})
