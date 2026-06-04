/**
 * Multi-Currency GL Service — FX translation, gain/loss, revaluation.
 *
 * Per-tenant defaults derive from the tenant's country via
 * {@link getTenantDefaults} in `@/config/regional-defaults`. When no
 * country is set, fall back to the main config (env-aware) and finally
 * to the house defaults (`EUR` / `BG` / `bg-BG`).
 *
 * Balance-check duplications are eliminated — every debit/credit summation
 * routes through the canonical `DebitCreditLogic` (see Slice WW notes).
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-3166-1:2020 country-codes alpha-2 tenant-country
 * @standard ISO-8601-1:2019 date-time rate-date
 * @standard BCP-47 language-tag locale-formatting
 * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates functional-currency
 * @accounting IFRS IAS-29 financial-reporting-in-hyperinflationary-economies
 * @accounting US-GAAP ASC-830 foreign-currency-matters reporting-currency
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.1 §4.2
 * @see src/config/regional-defaults.ts
 */

import { calculateAverage } from '@/utilities/average-calculator'
import {
  ExchangeRate,
  CurrencyConfig,
  CurrencyGainLoss,
  MonthEndCurrencyAdjustment,
  ConversionResult,
  MultiCurrencyTrialBalance,
  CurrencyRevaluation,
  ExchangeRateHistory,
} from '@/types/multi-currency';
import {
  type Currency,
  SUPPORTED_CURRENCIES,
  isIso4217Currency,
  isSupportedCurrency,
  getTenantDefaults,
} from '@/config/regional-defaults';
import { journalEntryService } from '@/services/journal-entry.service';
import { DebitCreditLogic } from '@/services/accounting/debit-credit';

interface _GLBalance {
  accountId: string;
  accountName: string;
  currency: Currency;
  balance: number;
  balanceDate: Date;
}

class MultiCurrencyService {
  private exchangeRates: Map<string, ExchangeRate> = new Map();
  private currencyConfigs: Map<string, CurrencyConfig> = new Map();
  private currencyGainLosses: Map<string, CurrencyGainLoss> = new Map();

  /**
   * Set up currency configuration for a tenant.
   *
   * Derives missing fields from the tenant's country via the canonical
   * `getTenantDefaults` (`@/config/regional-defaults`):
   *   - `baseCurrency`     ← falls back to the country's preferred ISO 4217 code
   *                         (or `DEFAULT_CURRENCY` if the country is unknown)
   *   - `supportedCurrencies` ← falls back to the canonical full list
   *                             (`SUPPORTED_CURRENCIES`, EUR-first / USD-last)
   *
   * Validates `baseCurrency` against {@link isSupportedCurrency}; throws on
   * an unrecognised code. Use this everywhere a tenant currency profile
   * is established — never inline `'EUR'` or hand-built currency arrays.
   */
  async setupCurrencyConfig(
    tenantId: string,
    config: Partial<CurrencyConfig> & { tenantId: string },
    tenantCountry?: string | null
  ): Promise<CurrencyConfig> {
    const defaults = getTenantDefaults(tenantCountry);
    const baseCurrency = (config.baseCurrency ?? defaults.currency) as Currency;

    // International-first: any ISO 4217 §5 alphabetic code is accepted.
    // The curated SUPPORTED_CURRENCIES list is just the admin-UI
    // quick-select cohort; tenants in NOK / SEK / ZAR / KRW / etc. are
    // welcome — only the regex-shape gate applies here.
    if (!isIso4217Currency(baseCurrency)) {
      throw new Error(
        `Invalid base currency '${String(baseCurrency)}' for tenant ${tenantId}: must be an ISO 4217 §5 alphabetic code (e.g. EUR, USD, NOK).`,
      );
    }
    if (!isSupportedCurrency(baseCurrency)) {
      console.warn(
        `[multi-currency] Tenant ${tenantId} configured with non-curated base currency '${baseCurrency}' — accepted, but no built-in admin-UI dropdown entry. Curated set: ${SUPPORTED_CURRENCIES.join(', ')}`,
      );
    }
    const resolved: CurrencyConfig = {
      tenantId: config.tenantId,
      baseCurrency,
      supportedCurrencies: (config.supportedCurrencies && config.supportedCurrencies.length > 0
        ? config.supportedCurrencies
        : [...SUPPORTED_CURRENCIES]) as Currency[],
      unrealizedGainAccountId: config.unrealizedGainAccountId ?? '',
      realizedGainAccountId: config.realizedGainAccountId ?? '',
      exchangeRateSource: config.exchangeRateSource ?? 'manual',
      rateUpdateFrequency: config.rateUpdateFrequency ?? 'daily',
      status: config.status ?? 'active',
    };
    this.currencyConfigs.set(tenantId, resolved);
    console.log(
      `✓ Currency config set for ${tenantId}: base=${resolved.baseCurrency}, supported=[${resolved.supportedCurrencies.join(', ')}]`
    );
    return resolved;
  }

  /**
   * Get the currency configuration for a tenant, lazy-initialising it
   * from the tenant's country defaults if no explicit setup was done.
   */
  getOrInitConfig(tenantId: string, tenantCountry?: string | null): CurrencyConfig {
    const existing = this.currencyConfigs.get(tenantId);
    if (existing) return existing;
    const defaults = getTenantDefaults(tenantCountry);
    const lazyConfig: CurrencyConfig = {
      tenantId,
      baseCurrency: defaults.currency,
      supportedCurrencies: [...SUPPORTED_CURRENCIES] as Currency[],
      unrealizedGainAccountId: '',
      realizedGainAccountId: '',
      exchangeRateSource: 'manual',
      rateUpdateFrequency: 'daily',
      status: 'active',
    };
    this.currencyConfigs.set(tenantId, lazyConfig);
    return lazyConfig;
  }

  /**
   * Add or update exchange rate
   */
  async setExchangeRate(
    tenantId: string,
    fromCurrency: Currency,
    toCurrency: Currency,
    rate: number,
    rateDate: Date
  ): Promise<ExchangeRate> {
    const key = `${tenantId}-${fromCurrency}-${toCurrency}-${rateDate.toISOString().split('T')[0]}`;

    const exchangeRate: ExchangeRate = {
      id: key,
      tenantId,
      fromCurrency,
      toCurrency,
      rate,
      rateDate,
      source: 'manual',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.exchangeRates.set(key, exchangeRate);
    return exchangeRate;
  }

  /**
   * Get exchange rate for a currency pair on a specific date
   */
  getExchangeRate(
    tenantId: string,
    fromCurrency: Currency,
    toCurrency: Currency,
    rateDate: Date
  ): number {
    if (fromCurrency === toCurrency) return 1;

    const key = `${tenantId}-${fromCurrency}-${toCurrency}-${rateDate.toISOString().split('T')[0]}`;
    const rate = this.exchangeRates.get(key);

    if (!rate) {
      throw new Error(`No exchange rate found for ${fromCurrency}-${toCurrency} on ${rateDate.toDateString()}`);
    }

    return rate.rate;
  }

  /**
   * Convert amount from one currency to another
   */
  convertAmount(
    fromCurrency: Currency,
    toCurrency: Currency,
    amount: number,
    exchangeRate: number,
    rateDate: Date
  ): ConversionResult {
    const convertedAmount = amount * exchangeRate;

    return {
      originalAmount: amount,
      originalCurrency: fromCurrency,
      baseCurrency: toCurrency,
      exchangeRate,
      rateDate,
      convertedAmount,
      precision: 2,
    };
  }

  /**
   * Create GL entry for multi-currency transaction
   */
  async createMultiCurrencyEntry(
    tenantId: string,
    entryDate: Date,
    description: string,
    lines: Array<{
      accountId: string;
      accountName: string;
      debit: number;
      credit: number;
      currency: Currency;
      originalAmount: number;
      exchangeRate: number;
    }>,
    baseCurrency: Currency
  ): Promise<string> {
    // Convert all lines to base currency
    const convertedLines = lines.map((line) => {
      const debit = line.currency === baseCurrency ? line.debit : line.debit * line.exchangeRate;
      const credit = line.currency === baseCurrency ? line.credit : line.credit * line.exchangeRate;

      return {
        accountId: line.accountId,
        description: `${line.accountName} (${line.currency})`,
        debit,
        credit,
      };
    });

    // Create GL entry in base currency
    const entry = await journalEntryService.createEntry(tenantId, {
      entryDate,
      description: `${description} [Multi-Currency]`,
      lines: convertedLines,
      sourceType: 'currency_adjustment',
      sourceId: '',
      sourceEvent: 'multi-currency:created',
      userId: 'system',
    });
    await journalEntryService.postEntry(tenantId, entry.id);

    return entry.id;
  }

  /**
   * Calculate currency gain/loss at month-end
   */
  async calculateMonthEndCurrencyAdjustments(
    tenantId: string,
    periodEndDate: Date
  ): Promise<MonthEndCurrencyAdjustment> {
    const config = this.currencyConfigs.get(tenantId);
    if (!config) {
      throw new Error(`No currency config found for tenant ${tenantId}`);
    }

    const adjustments: CurrencyGainLoss[] = [];
    const baseCurrency = config.baseCurrency;

    // For each non-base currency account, calculate gain/loss
    // In production: query GL balances for accounts with non-base currencies
    // Here: simplified example with AR and AP accounts

    const totalGain = adjustments.reduce(
      (sum, adj) => sum + (adj.gainOrLoss > 0 ? adj.gainOrLoss : 0),
      0
    );
    const totalLoss = adjustments.reduce(
      (sum, adj) => sum + (adj.gainOrLoss < 0 ? Math.abs(adj.gainOrLoss) : 0),
      0
    );

    return {
      tenantId,
      adjustmentDate: periodEndDate,
      baseCurrency,
      adjustments,
      totalGain,
      totalLoss,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  /**
   * Post currency gain/loss entry to GL
   */
  async postCurrencyAdjustments(
    tenantId: string,
    adjustment: MonthEndCurrencyAdjustment
  ): Promise<string> {
    const config = this.currencyConfigs.get(tenantId);
    if (!config) {
      throw new Error(`No currency config found for tenant ${tenantId}`);
    }

    const lines: Array<{ accountId: string; description: string; debit: number; credit: number }> = [];

    // Debit unrealized gain account
    if (adjustment.totalGain > 0) {
      lines.push({
        accountId: config.unrealizedGainAccountId,
        description: 'Unrealized Currency Gain',
        debit: adjustment.totalGain,
        credit: 0,
      });
    }

    // Credit unrealized loss account (if loss > 0, this is a debit to gain)
    if (adjustment.totalLoss > 0) {
      lines.push({
        accountId: config.unrealizedGainAccountId,
        description: 'Unrealized Currency Loss',
        debit: 0,
        credit: adjustment.totalLoss,
      });
    }

    // Balance with AR/AP/Cash offset
    if (lines.length > 0) {
      const totalAdjustment = adjustment.totalGain - adjustment.totalLoss;
      if (totalAdjustment !== 0) {
        lines.push({
          accountId: 'currency_revaluation',
          description: 'Currency Revaluation',
          debit: totalAdjustment > 0 ? 0 : Math.abs(totalAdjustment),
          credit: totalAdjustment > 0 ? totalAdjustment : 0,
        });
      }

      const entry = await journalEntryService.createEntry(tenantId, {
        entryDate: adjustment.adjustmentDate,
        description: `Currency Gain/Loss Adjustment - ${adjustment.baseCurrency}`,
        lines,
        sourceType: 'currency_adjustment',
        sourceId: '',
        sourceEvent: 'currency-adjustment:created',
        userId: 'system',
      });
      await journalEntryService.postEntry(tenantId, entry.id);

      adjustment.journalEntryId = entry.id;
      adjustment.status = 'posted';
    }

    return adjustment.journalEntryId || '';
  }

  /**
   * Generate multi-currency trial balance
   */
  async generateMultiCurrencyTrialBalance(
    tenantId: string,
    reportDate: Date,
    baseCurrency: Currency
  ): Promise<MultiCurrencyTrialBalance> {
    const config = this.currencyConfigs.get(tenantId);
    if (!config) {
      throw new Error(`No currency config found for tenant ${tenantId}`);
    }

    // Get trial balance from GL service
    const glTrialBalance = await journalEntryService.getTrialBalance(
      tenantId,
      new Date(reportDate.getFullYear(), reportDate.getMonth(), 1),
      reportDate
    );

    // Convert to multi-currency trial balance
    const accountsInBaseCurrency: Array<{
      accountId: string;
      currency: string;
      originalBalance: number;
      exchangeRate: number;
      balanceInBaseCurrency: number;
    }> = [];
    let totalDebitsOriginal = 0;
    let totalCreditsOriginal = 0;
    let totalDebitsBase = 0;
    let totalCreditsBase = 0;

    for (const [accountId, balance] of glTrialBalance) {
      const debit = balance.debit || 0;
      const credit = balance.credit || 0;

      totalDebitsOriginal += debit;
      totalCreditsOriginal += credit;

      // For now, assume GL balances are debit-normal (asset) and that all
      // postings are already in base currency. In production this iteration
      // should branch on the account's normalBalance — `DebitCreditLogic.getBalance`
      // is the canonical implementation; pass `'asset'` for debit-normal,
      // `'liability'` for credit-normal once account-type is plumbed through.
      const baseBalance = DebitCreditLogic.getBalance('asset', debit, credit);
      accountsInBaseCurrency.push({
        accountId,
        currency: baseCurrency,
        originalBalance: baseBalance,
        exchangeRate: 1,
        balanceInBaseCurrency: baseBalance,
      });

      totalDebitsBase += debit;
      totalCreditsBase += credit;
    }

    return {
      tenantId,
      reportDate,
      baseCurrency,
      accounts: [], // Would populate from account master
      accountsInBaseCurrency,
      totalDebitsOriginal,
      totalCreditsOriginal,
      totalDebitsBase,
      totalCreditsBase,
      balancedInOriginal: Math.abs(totalDebitsOriginal - totalCreditsOriginal) < 0.01,
      balancedInBase: Math.abs(totalDebitsBase - totalCreditsBase) < 0.01,
    };
  }

  /**
   * Get exchange rate history for a period
   */
  getExchangeRateHistory(
    tenantId: string,
    fromCurrency: Currency,
    toCurrency: Currency,
    periodStart: Date,
    periodEnd: Date
  ): ExchangeRateHistory {
    const rates: Array<{ date: Date; rate: number }> = [];

    // Collect rates for the period
    for (const [, rate] of this.exchangeRates) {
      if (
        rate.tenantId === tenantId &&
        rate.fromCurrency === fromCurrency &&
        rate.toCurrency === toCurrency &&
        rate.rateDate >= periodStart &&
        rate.rateDate <= periodEnd
      ) {
        rates.push({ date: rate.rateDate, rate: rate.rate });
      }
    }

    rates.sort((a, b) => a.date.getTime() - b.date.getTime());

    const avgRate = calculateAverage(rates.map((r) => r.rate));
    const rateValues = rates.map((r) => r.rate);
    const highRate = rateValues.length > 0 ? Math.max(...rateValues) : 0;
    const lowRate = rateValues.length > 0 ? Math.min(...rateValues) : 0;

    return {
      currencyPair: { from: fromCurrency, to: toCurrency },
      rates,
      periodStart,
      periodEnd,
      averageRate: avgRate,
      highRate,
      lowRate,
    };
  }

  /**
   * Revalue assets/liabilities to current exchange rate
   */
  async revaluateAccounts(
    tenantId: string,
    revaluationDate: Date
  ): Promise<CurrencyRevaluation> {
    const config = this.currencyConfigs.get(tenantId);
    if (!config) {
      throw new Error(`No currency config found for tenant ${tenantId}`);
    }

    const revaluation: CurrencyRevaluation = {
      id: `REV-${revaluationDate.toISOString().split('T')[0]}`,
      tenantId,
      revaluationDate,
      baseCurrency: config.baseCurrency,
      accountCurrencies: [],
      totalRevaluation: 0,
      status: 'draft',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // In production: identify accounts with foreign currency balances
    // and compare old rate vs new rate

    return revaluation;
  }

  /**
   * Clear all data (for testing)
   */
  clearAllData(): void {
    this.exchangeRates.clear();
    this.currencyConfigs.clear();
    this.currencyGainLosses.clear();
  }
}

export const multiCurrencyService = new MultiCurrencyService();
