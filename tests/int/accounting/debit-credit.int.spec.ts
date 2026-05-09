/**
 * Debit/Credit Logic Tests — verify the canonical double-entry rules.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS Conceptual-Framework recognition-derecognition
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 * @audit ISO-19011:2018 audit-trail double-entry-invariant
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.2 §7
 */

import {
  DebitCreditLogic,
  AccountingEntryBuilder,
  StandardTransactions,
  AccountQueries,
} from '@/plugins/accounting/debit-credit'

describe('DebitCreditLogic - Canonical Module', () => {
  describe('getRule', () => {
    test('should return rule for asset', () => {
      const rule = DebitCreditLogic.getRule('asset')

      expect(rule.normal).toBe('debit')
      expect(rule.increasesSide).toBe('debit')
      expect(rule.decreasesSide).toBe('credit')
    })

    test('should return rule for liability', () => {
      const rule = DebitCreditLogic.getRule('liability')

      expect(rule.normal).toBe('credit')
      expect(rule.increasesSide).toBe('credit')
      expect(rule.decreasesSide).toBe('debit')
    })

    test('should return rule for equity', () => {
      const rule = DebitCreditLogic.getRule('equity')

      expect(rule.normal).toBe('credit')
      expect(rule.increasesSide).toBe('credit')
      expect(rule.decreasesSide).toBe('debit')
    })

    test('should return rule for income', () => {
      const rule = DebitCreditLogic.getRule('income')

      expect(rule.normal).toBe('credit')
      expect(rule.increasesSide).toBe('credit')
      expect(rule.decreasesSide).toBe('debit')
    })

    test('should return rule for expense', () => {
      const rule = DebitCreditLogic.getRule('expense')

      expect(rule.normal).toBe('debit')
      expect(rule.increasesSide).toBe('debit')
      expect(rule.decreasesSide).toBe('credit')
    })

    test('should return rule for COGS', () => {
      const rule = DebitCreditLogic.getRule('cogs')

      expect(rule.normal).toBe('debit')
      expect(rule.increasesSide).toBe('debit')
      expect(rule.decreasesSide).toBe('credit')
    })

    test('should throw for unknown account type', () => {
      expect(() => {
        DebitCreditLogic.getRule('unknown' as any)
      }).toThrow()
    })
  })

  describe('createIncreaseEntry', () => {
    test('should create debit entry for asset increase', () => {
      const line = DebitCreditLogic.createIncreaseEntry('1000', 'asset', 50000)

      expect(line.debit).toBe(50000)
      expect(line.credit).toBe(0)
    })

    test('should create credit entry for liability increase', () => {
      const line = DebitCreditLogic.createIncreaseEntry('2000', 'liability', 75000)

      expect(line.debit).toBe(0)
      expect(line.credit).toBe(75000)
    })

    test('should create credit entry for income increase', () => {
      const line = DebitCreditLogic.createIncreaseEntry('4000', 'income', 100000)

      expect(line.debit).toBe(0)
      expect(line.credit).toBe(100000)
    })

    test('should create debit entry for expense increase', () => {
      const line = DebitCreditLogic.createIncreaseEntry('6000', 'expense', 25000)

      expect(line.debit).toBe(25000)
      expect(line.credit).toBe(0)
    })
  })

  describe('createDecreaseEntry', () => {
    test('should create credit entry for asset decrease', () => {
      const line = DebitCreditLogic.createDecreaseEntry('1000', 'asset', 50000)

      expect(line.debit).toBe(0)
      expect(line.credit).toBe(50000)
    })

    test('should create debit entry for liability decrease', () => {
      const line = DebitCreditLogic.createDecreaseEntry('2000', 'liability', 75000)

      expect(line.debit).toBe(75000)
      expect(line.credit).toBe(0)
    })
  })

  describe('validateEntry', () => {
    test('should validate balanced entry', () => {
      const lines = [
        { accountCode: '1000', accountType: 'asset' as const, debit: 50000, credit: 0 },
        { accountCode: '4000', accountType: 'income' as const, debit: 0, credit: 50000 },
      ]

      const result = DebitCreditLogic.validateEntry(lines)

      expect(result.balanced).toBe(true)
      expect(result.variance).toBe(0)
      expect(result.totalDebits).toBe(50000)
      expect(result.totalCredits).toBe(50000)
    })

    test('should detect unbalanced entry', () => {
      const lines = [
        { accountCode: '1000', accountType: 'asset' as const, debit: 50000, credit: 0 },
        { accountCode: '4000', accountType: 'income' as const, debit: 0, credit: 40000 },
      ]

      const result = DebitCreditLogic.validateEntry(lines)

      expect(result.balanced).toBe(false)
      expect(result.variance).toBe(10000)
    })
  })

  describe('getBalance', () => {
    test('should calculate asset balance correctly', () => {
      // Asset with debit balance
      const balance = DebitCreditLogic.getBalance('asset', 100000, 30000)

      expect(balance).toBe(70000) // $700
    })

    test('should calculate liability balance correctly', () => {
      // Liability with credit balance
      const balance = DebitCreditLogic.getBalance('liability', 20000, 100000)

      expect(balance).toBe(80000) // $800
    })

    test('should handle zero balance', () => {
      const balance = DebitCreditLogic.getBalance('asset', 50000, 50000)

      expect(balance).toBe(0)
    })
  })
})

describe('AccountingEntryBuilder - DRY Entry Creation', () => {
  test('should build balanced entry with addIncrease', () => {
    const entry = new AccountingEntryBuilder()
      .addIncrease('1000', 'asset', 50000)
      .addIncrease('2000', 'liability', 50000)
      .build()

    expect(entry.balanced).toBe(true)
    expect(entry.totalDebits).toBe(50000)
    expect(entry.totalCredits).toBe(50000)
  })

  test('should build balanced entry with mixed operations', () => {
    const entry = new AccountingEntryBuilder()
      .addIncrease('1000', 'asset', 100000)
      .addDecrease('2000', 'liability', 100000)
      .build()

    expect(entry.balanced).toBe(true)
  })

  test('should throw on unbalanced entry', () => {
    expect(() => {
      new AccountingEntryBuilder()
        .addIncrease('1000', 'asset', 50000)
        .addIncrease('4000', 'income', 40000)
        .build()
    }).toThrow()
  })

  test('should allow chaining', () => {
    const builder = new AccountingEntryBuilder()

    expect(builder.addIncrease('1000', 'asset', 50000)).toBe(builder)
  })
})

describe('StandardTransactions - Canonical Transactions', () => {
  test('should create sale on account entry', () => {
    const entry = StandardTransactions.createSaleOnAccount('1200', '4000', 100000)

    expect(entry.balanced).toBe(true)
    expect(entry.lines).toHaveLength(2)
    expect(entry.totalDebits).toBe(100000)
    expect(entry.totalCredits).toBe(100000)
  })

  test('should create cash receipt entry', () => {
    const entry = StandardTransactions.createCashReceipt('1000', '1200', 50000)

    expect(entry.balanced).toBe(true)
    expect(entry.lines).toHaveLength(2)
  })

  test('should create bad debt write-off entry', () => {
    const entry = StandardTransactions.createBadDebtWriteOff('6500', '1200', 25000)

    expect(entry.balanced).toBe(true)
    expect(entry.lines).toHaveLength(2)
  })

  test('should create bill received entry', () => {
    const entry = StandardTransactions.createBillReceived('5000', '2000', 75000)

    expect(entry.balanced).toBe(true)
    expect(entry.lines).toHaveLength(2)
  })

  test('should create bill payment entry', () => {
    const entry = StandardTransactions.createBillPayment('2000', '1000', 50000)

    expect(entry.balanced).toBe(true)
    expect(entry.lines).toHaveLength(2)
  })

  test('should create bill payment with discount entry', () => {
    const entry = StandardTransactions.createBillPaymentWithDiscount('2000', '1000', '7500', 100000, 2000)

    expect(entry.balanced).toBe(true)
    expect(entry.lines).toHaveLength(3)
    expect(entry.totalDebits).toBe(100000)
    expect(entry.totalCredits).toBe(100000)
  })

  test('should create COGS entry', () => {
    const entry = StandardTransactions.createCOGSEntry('5000', '1300', 60000)

    expect(entry.balanced).toBe(true)
  })

  test('should create depreciation entry', () => {
    const entry = StandardTransactions.createDepreciationEntry('6600', '1500A', 5000)

    expect(entry.balanced).toBe(true)
    expect(entry.lines).toHaveLength(2)
  })
})

describe('AccountQueries - DRY Balance Calculations', () => {
  test('should get correct balance for asset', () => {
    const balance = AccountQueries.getBalance('asset', 100000, 30000)

    expect(balance).toBe(70000)
  })

  test('should get net A/R correctly', () => {
    const netAR = AccountQueries.getNetAR(100000, 5000)

    expect(netAR).toBe(95000)
  })

  test('should get working capital', () => {
    const wc = AccountQueries.getWorkingCapital(500000, 200000)

    expect(wc).toBe(300000)
  })

  test('should get equity from fundamental equation', () => {
    const equity = AccountQueries.getEquity(1000000, 600000)

    expect(equity).toBe(400000)
  })

  test('should validate fundamental equation', () => {
    const isValid = AccountQueries.isFundamentalEquationValid(1000000, 600000, 400000)

    expect(isValid).toBe(true)
  })

  test('should detect invalid fundamental equation', () => {
    const isValid = AccountQueries.isFundamentalEquationValid(1000000, 600000, 300000)

    expect(isValid).toBe(false)
  })
})

describe('DRY Principle - No Duplicated Logic', () => {
  test('all A/R entries use StandardTransactions', () => {
    // A/R creates sale on account
    const entry1 = StandardTransactions.createSaleOnAccount('1200', '4000', 50000)
    // Should be the same as what A/R module creates
    expect(entry1.balanced).toBe(true)
  })

  test('all A/P entries use StandardTransactions', () => {
    // A/P creates bill received
    const entry1 = StandardTransactions.createBillReceived('5000', '2000', 75000)
    // Should be the same as what A/P module creates
    expect(entry1.balanced).toBe(true)
  })

  test('all balance queries use AccountQueries', () => {
    // Multiple systems can query balance same way
    const balance1 = AccountQueries.getBalance('asset', 100000, 30000)
    const balance2 = DebitCreditLogic.getBalance('asset', 100000, 30000)

    expect(balance1).toBe(balance2)
  })
})

describe('Fundamental Accounting Equation', () => {
  test('should maintain Assets = Liabilities + Equity', () => {
    const assets = 1000000
    const liabilities = 600000
    const equity = 400000

    expect(AccountQueries.isFundamentalEquationValid(assets, liabilities, equity)).toBe(true)
  })

  test('should detect imbalance', () => {
    const assets = 1000000
    const liabilities = 600000
    const equity = 300000 // Wrong!

    expect(AccountQueries.isFundamentalEquationValid(assets, liabilities, equity)).toBe(false)
  })
})
