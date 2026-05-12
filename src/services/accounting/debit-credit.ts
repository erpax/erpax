/**
 * Canonical Debit/Credit module — single source of truth for double-entry rules.
 *
 * Core principle:
 *   Debit  = increase in Assets/Expenses, decrease in Liabilities/Equity
 *   Credit = decrease in Assets/Expenses, increase in Liabilities/Equity
 *
 * Every A/R, A/P, GL, and Accounting site references this module.
 *
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS Conceptual-Framework recognition-derecognition
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 * @accounting US-GAAP ASC-810 consolidation
 * @audit ISO-19011:2018 audit-trail double-entry-invariant
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.2
 */

export type AccountType = 'asset' | 'liability' | 'equity' | 'income' | 'expense' | 'cogs'

export interface DebitCreditRule {
  accountType: AccountType
  normal: 'debit' | 'credit' // Normal balance side
  increasesSide: 'debit' | 'credit' // Side that increases account
  decreasesSide: 'debit' | 'credit' // Side that decreases account
}

export interface JournalEntryLine {
  accountCode: string
  accountType: AccountType
  debit: number // cents
  credit: number // cents
  description?: string
}

export interface ValidatedEntry {
  lines: JournalEntryLine[]
  totalDebits: number
  totalCredits: number
  balanced: boolean
  variance: number
}

/**
 * CANONICAL DEBIT/CREDIT RULES
 * Source: Accounting fundamentals (double-entry bookkeeping)
 */
export class DebitCreditLogic {
  /**
   * Account type rules (fundamental accounting equation)
   *
   * Assets:        Normal = Debit (increased by debit, decreased by credit)
   * Liabilities:   Normal = Credit (increased by credit, decreased by debit)
   * Equity:        Normal = Credit (increased by credit, decreased by debit)
   * Income:        Normal = Credit (increased by credit, decreased by debit)
   * Expense:       Normal = Debit (increased by debit, decreased by credit)
   * COGS:          Normal = Debit (increased by debit, decreased by credit)
   */
  private static readonly RULES: Record<AccountType, DebitCreditRule> = {
    asset: {
      accountType: 'asset',
      normal: 'debit',
      increasesSide: 'debit',
      decreasesSide: 'credit',
    },
    liability: {
      accountType: 'liability',
      normal: 'credit',
      increasesSide: 'credit',
      decreasesSide: 'debit',
    },
    equity: {
      accountType: 'equity',
      normal: 'credit',
      increasesSide: 'credit',
      decreasesSide: 'debit',
    },
    income: {
      accountType: 'income',
      normal: 'credit',
      increasesSide: 'credit',
      decreasesSide: 'debit',
    },
    expense: {
      accountType: 'expense',
      normal: 'debit',
      increasesSide: 'debit',
      decreasesSide: 'credit',
    },
    cogs: {
      accountType: 'cogs',
      normal: 'debit',
      increasesSide: 'debit',
      decreasesSide: 'credit',
    },
  }

  /**
   * Get rule for account type
   */
  static getRule(accountType: AccountType): DebitCreditRule {
    const rule = this.RULES[accountType]
    if (!rule) {
      throw new Error(`Unknown account type: ${accountType}`)
    }
    return rule
  }

  /**
   * Get normal balance side for account type
   * Example: Assets normally have debit balance
   */
  static getNormalBalance(accountType: AccountType): 'debit' | 'credit' {
    return this.getRule(accountType).normal
  }

  /**
   * Which side increases an account?
   * Example: Asset increases on debit side
   */
  static getIncreasesSide(accountType: AccountType): 'debit' | 'credit' {
    return this.getRule(accountType).increasesSide
  }

  /**
   * Which side decreases an account?
   * Example: Asset decreases on credit side
   */
  static getDecreasesSide(accountType: AccountType): 'debit' | 'credit' {
    return this.getRule(accountType).decreasesSide
  }

  /**
   * Create increase entry for account
   * Automatically uses correct debit/credit side based on account type
   */
  static createIncreaseEntry(
    accountCode: string,
    accountType: AccountType,
    amount: number // cents
  ): JournalEntryLine {
    const side = this.getIncreasesSide(accountType)

    return {
      accountCode,
      accountType,
      debit: side === 'debit' ? amount : 0,
      credit: side === 'credit' ? amount : 0,
    }
  }

  /**
   * Create decrease entry for account
   * Automatically uses correct debit/credit side based on account type
   */
  static createDecreaseEntry(
    accountCode: string,
    accountType: AccountType,
    amount: number // cents
  ): JournalEntryLine {
    const side = this.getDecreasesSide(accountType)

    return {
      accountCode,
      accountType,
      debit: side === 'debit' ? amount : 0,
      credit: side === 'credit' ? amount : 0,
    }
  }

  /**
   * Validate journal entry (debits = credits)
   */
  static validateEntry(lines: JournalEntryLine[]): ValidatedEntry {
    const totalDebits = lines.reduce((sum, line) => sum + line.debit, 0)
    const totalCredits = lines.reduce((sum, line) => sum + line.credit, 0)
    const variance = totalDebits - totalCredits

    return {
      lines,
      totalDebits,
      totalCredits,
      balanced: variance === 0,
      variance,
    }
  }

  /**
   * Get balance for account (considering normal balance)
   * Asset with $1000 debit = +1000 balance
   * Liability with $1000 credit = +1000 balance (not -1000)
   */
  static getBalance(accountType: AccountType, debits: number, credits: number): number {
    const normal = this.getNormalBalance(accountType)

    if (normal === 'debit') {
      return debits - credits
    } else {
      return credits - debits
    }
  }

  /**
   * Get display balance (signed correctly for account type)
   * For display: Assets, Liabilities, Equity all shown as positive if > 0
   */
  static getDisplayBalance(accountType: AccountType, debits: number, credits: number): number {
    return Math.abs(this.getBalance(accountType, debits, credits))
  }
}

/**
 * DRY Accounting Entry Builder
 * Ensures all entries are created correctly with debit/credit logic
 * Used by A/R, A/P, GL, and all other systems
 */
export class AccountingEntryBuilder {
  private lines: JournalEntryLine[] = []

  /**
   * Add line that increases an account
   */
  addIncrease(accountCode: string, accountType: AccountType, amount: number): this {
    const line = DebitCreditLogic.createIncreaseEntry(accountCode, accountType, amount)
    this.lines.push(line)
    return this
  }

  /**
   * Add line that decreases an account
   */
  addDecrease(accountCode: string, accountType: AccountType, amount: number): this {
    const line = DebitCreditLogic.createDecreaseEntry(accountCode, accountType, amount)
    this.lines.push(line)
    return this
  }

  /**
   * Add debit line (raw)
   */
  addDebit(accountCode: string, accountType: AccountType, amount: number): this {
    this.lines.push({
      accountCode,
      accountType,
      debit: amount,
      credit: 0,
    })
    return this
  }

  /**
   * Add credit line (raw)
   */
  addCredit(accountCode: string, accountType: AccountType, amount: number): this {
    this.lines.push({
      accountCode,
      accountType,
      debit: 0,
      credit: amount,
    })
    return this
  }

  /**
   * Build and validate entry
   */
  build(): ValidatedEntry {
    const entry = DebitCreditLogic.validateEntry(this.lines)

    if (!entry.balanced) {
      throw new Error(
        `Unbalanced entry: Debits ($${(entry.totalDebits / 100).toFixed(2)}) ≠ Credits ($${(entry.totalCredits / 100).toFixed(2)})`
      )
    }

    return entry
  }
}

/**
 * COMMON ACCOUNTING TRANSACTIONS
 * DRY implementations of standard journal entries
 * All systems use these instead of reimplementing debit/credit logic
 */
export class StandardTransactions {
  /**
   * Sale on account (A/R created)
   * Debit: Accounts Receivable (asset increase)
   * Credit: Revenue (income increase)
   */
  static createSaleOnAccount(
    arAccountCode: string,
    revenueAccountCode: string,
    amount: number // cents
  ): ValidatedEntry {
    return new AccountingEntryBuilder()
      .addIncrease(arAccountCode, 'asset', amount)
      .addIncrease(revenueAccountCode, 'income', amount)
      .build()
  }

  /**
   * Cash receipt (A/R reduction)
   * Debit: Cash (asset increase)
   * Credit: Accounts Receivable (asset decrease)
   */
  static createCashReceipt(
    cashAccountCode: string,
    arAccountCode: string,
    amount: number // cents
  ): ValidatedEntry {
    return new AccountingEntryBuilder()
      .addIncrease(cashAccountCode, 'asset', amount)
      .addDecrease(arAccountCode, 'asset', amount)
      .build()
  }

  /**
   * Bad debt write-off
   * Debit: Bad Debt Expense (expense increase)
   * Credit: Accounts Receivable (asset decrease)
   */
  static createBadDebtWriteOff(
    badDebtAccountCode: string,
    arAccountCode: string,
    amount: number // cents
  ): ValidatedEntry {
    return new AccountingEntryBuilder()
      .addIncrease(badDebtAccountCode, 'expense', amount)
      .addDecrease(arAccountCode, 'asset', amount)
      .build()
  }

  /**
   * Allowance for doubtful accounts adjustment
   * Debit: Bad Debt Expense (expense increase)
   * Credit: Allowance account (asset contra - decrease)
   */
  static createAllowanceAdjustment(
    badDebtAccountCode: string,
    allowanceAccountCode: string,
    amount: number // cents
  ): ValidatedEntry {
    return new AccountingEntryBuilder()
      .addIncrease(badDebtAccountCode, 'expense', amount)
      .addDecrease(allowanceAccountCode, 'asset', amount)
      .build()
  }

  /**
   * Bill received (A/P created)
   * Debit: Expense (expense increase)
   * Credit: Accounts Payable (liability increase)
   */
  static createBillReceived(
    expenseAccountCode: string,
    apAccountCode: string,
    amount: number // cents
  ): ValidatedEntry {
    return new AccountingEntryBuilder()
      .addIncrease(expenseAccountCode, 'expense', amount)
      .addIncrease(apAccountCode, 'liability', amount)
      .build()
  }

  /**
   * Bill payment
   * Debit: Accounts Payable (liability decrease)
   * Credit: Cash (asset decrease)
   */
  static createBillPayment(
    apAccountCode: string,
    cashAccountCode: string,
    amount: number // cents
  ): ValidatedEntry {
    return new AccountingEntryBuilder()
      .addDecrease(apAccountCode, 'liability', amount)
      .addDecrease(cashAccountCode, 'asset', amount)
      .build()
  }

  /**
   * Bill payment with early discount
   * Debit: Accounts Payable (liability decrease)
   * Credit: Cash (asset decrease)
   * Credit: Discount Income (income increase)
   */
  static createBillPaymentWithDiscount(
    apAccountCode: string,
    cashAccountCode: string,
    discountAccountCode: string,
    billAmount: number, // cents
    discountAmount: number // cents
  ): ValidatedEntry {
    return new AccountingEntryBuilder()
      .addDecrease(apAccountCode, 'liability', billAmount)
      .addDecrease(cashAccountCode, 'asset', billAmount - discountAmount)
      .addIncrease(discountAccountCode, 'income', discountAmount)
      .build()
  }

  /**
   * COGS (Cost of Goods Sold) entry
   * Debit: COGS (COGS increase)
   * Credit: Inventory (asset decrease)
   */
  static createCOGSEntry(
    cogsAccountCode: string,
    inventoryAccountCode: string,
    amount: number // cents
  ): ValidatedEntry {
    return new AccountingEntryBuilder()
      .addIncrease(cogsAccountCode, 'cogs', amount)
      .addDecrease(inventoryAccountCode, 'asset', amount)
      .build()
  }

  /**
   * Depreciation entry
   * Debit: Depreciation Expense (expense increase)
   * Credit: Accumulated Depreciation (asset contra - decrease)
   */
  static createDepreciationEntry(
    depreciationExpenseCode: string,
    accumulatedDepreciationCode: string,
    amount: number // cents
  ): ValidatedEntry {
    return new AccountingEntryBuilder()
      .addIncrease(depreciationExpenseCode, 'expense', amount)
      .addDecrease(accumulatedDepreciationCode, 'asset', amount)
      .build()
  }
}

/**
 * QUERY HELPERS
 * DRY account balance calculations
 */
export class AccountQueries {
  /**
   * Get account balance considering account type
   * Returns net balance (considering normal balance direction)
   */
  static getBalance(accountType: AccountType, debits: number, credits: number): number {
    return DebitCreditLogic.getBalance(accountType, debits, credits)
  }

  /**
   * Get net accounts receivable (A/R minus allowance)
   */
  static getNetAR(arBalance: number, allowanceBalance: number): number {
    return arBalance - allowanceBalance
  }

  /**
   * Get working capital
   * Current Assets - Current Liabilities
   */
  static getWorkingCapital(currentAssets: number, currentLiabilities: number): number {
    return currentAssets - currentLiabilities
  }

  /**
   * Get equity (fundamental equation)
   * Assets - Liabilities = Equity
   */
  static getEquity(assets: number, liabilities: number): number {
    return assets - liabilities
  }

  /**
   * Validate fundamental equation
   * Assets = Liabilities + Equity
   */
  static isFundamentalEquationValid(
    assets: number,
    liabilities: number,
    equity: number
  ): boolean {
    return Math.abs(assets - (liabilities + equity)) < 1 // Allow 1 cent variance
  }
}
