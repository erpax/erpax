/**
 * Multi-Currency types — FX rate, conversion, gain/loss, revaluation.
 *
 * `Currency` is derived from {@link SUPPORTED_CURRENCIES} in
 * `@/config/regional-defaults` — single source of truth for the
 * supported ISO 4217 vocabulary and its ordering invariant
 * (EUR first, USD last). Add a new currency there and this type
 * widens automatically.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time rate-date
 * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates functional-currency
 * @accounting IFRS IAS-29 financial-reporting-in-hyperinflationary-economies
 * @accounting US-GAAP ASC-830 foreign-currency-matters reporting-currency
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.1 §4.2
 * @see src/config/regional-defaults.ts
 */

export type { Currency } from '@/config/regional-defaults';
import type { Currency } from '@/config/regional-defaults';

export interface ExchangeRate {
  id: string;
  tenantId: string;
  fromCurrency: Currency;
  toCurrency: Currency;
  rate: number;
  rateDate: Date;
  source: 'manual' | 'api' | 'import';
  createdAt: Date;
  updatedAt: Date;
}

export interface CurrencyPair {
  from: Currency;
  to: Currency;
}

export interface CurrencyConfig {
  tenantId: string;
  baseCurrency: Currency; // Functional currency for reporting
  supportedCurrencies: Currency[];
  unrealizedGainAccountId: string; // For currency gain/loss
  realizedGainAccountId: string;
  exchangeRateSource: 'manual' | 'api';
  rateUpdateFrequency: 'daily' | 'weekly' | 'monthly';
  status: 'active' | 'inactive';
}

export interface MultiCurrencyJournalLine {
  accountId: string;
  description: string;
  debit: number;
  credit: number;
  currency: Currency;
  originalCurrency: Currency; // Transaction currency
  originalAmount: number; // Amount in transaction currency
  exchangeRate: number; // Rate used for conversion
  exchangeRateDate: Date;
}

export interface CurrencyGainLoss {
  id: string;
  tenantId: string;
  transactionDate: Date;
  accountId: string; // AR, AP, Cash account
  originalCurrency: Currency;
  baseCurrency: Currency;
  originalBalance: number;
  originalRate: number;
  currentRate: number;
  gainOrLoss: number; // Positive = gain, negative = loss
  type: 'realized' | 'unrealized';
  glEntryId?: string;
  status: 'posted' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

export interface MonthEndCurrencyAdjustment {
  tenantId: string;
  adjustmentDate: Date;
  baseCurrency: Currency;
  adjustments: CurrencyGainLoss[];
  totalGain: number;
  totalLoss: number;
  journalEntryId?: string;
  status: 'draft' | 'posted' | 'approved';
  createdAt: Date;
  updatedAt: Date;
}

export interface ConversionResult {
  originalAmount: number;
  originalCurrency: Currency;
  baseCurrency: Currency;
  exchangeRate: number;
  rateDate: Date;
  convertedAmount: number;
  precision: number; // Decimal places
}

export interface CurrencyAccount {
  accountId: string;
  accountName: string;
  currency: Currency;
  balance: number;
  balanceDate: Date;
  nativeCurrencyBalance?: number; // Balance in base currency
  exchangeRate?: number;
}

export interface MultiCurrencyTrialBalance {
  tenantId: string;
  reportDate: Date;
  baseCurrency: Currency;
  accounts: CurrencyAccount[];
  accountsInBaseCurrency: Array<{
    accountId: string;
    currency: Currency;
    originalBalance: number;
    exchangeRate: number;
    balanceInBaseCurrency: number;
  }>;
  totalDebitsOriginal: number;
  totalCreditsOriginal: number;
  totalDebitsBase: number;
  totalCreditsBase: number;
  balancedInOriginal: boolean;
  balancedInBase: boolean;
}

export interface CurrencyRevaluation {
  id: string;
  tenantId: string;
  revaluationDate: Date;
  baseCurrency: Currency;
  accountCurrencies: {
    accountId: string;
    currency: Currency;
    oldRate: number;
    newRate: number;
    balanceAtOldRate: number;
    balanceAtNewRate: number;
    revaluationAmount: number;
  }[];
  totalRevaluation: number;
  journalEntryId?: string;
  status: 'draft' | 'posted';
  createdAt: Date;
  updatedAt: Date;
}

export interface ExchangeRateHistory {
  currencyPair: CurrencyPair;
  rates: Array<{
    date: Date;
    rate: number;
  }>;
  periodStart: Date;
  periodEnd: Date;
  averageRate: number;
  highRate: number;
  lowRate: number;
}

export interface MultiCurrencyReportPackage {
  tenantId: string;
  reportDate: Date;
  baseCurrency: Currency;
  periodStart: Date;
  periodEnd: Date;
  companyName: string;

  trialBalance: MultiCurrencyTrialBalance;
  balanceSheet: Record<string, unknown>; // Same structure, all values in base currency
  incomeStatement: Record<string, unknown>; // Same structure, all values in base currency

  currencyGainLosses: CurrencyGainLoss[];
  revaluations: CurrencyRevaluation[];

  exchangeRatesUsed: Map<string, number>; // Pair → rate mapping
  notes: string[];
  preparedBy: string;
  preparedAt: Date;
  approved: boolean;
}
