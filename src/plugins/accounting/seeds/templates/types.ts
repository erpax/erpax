/**
 * Industry-template surface for seeds — keeps fixture data structured around
 * the same charts of accounts, fiscal calendars, and transaction patterns
 * real customers actually use, rather than ad-hoc literals scattered across
 * test files.
 *
 * Adding a template (`SAAS`, `RETAIL`, `SERVICE`, …) gives every seed level a
 * consistent shape to instantiate against; pinning each template to the
 * standards that govern it (IFRS, US-GAAP, IAS-1, ASC-606, …) keeps the
 * fixtures auditable and traceable to the source rules.
 *
 * @standard ISO/IEC-29119:2022 software-testing test-fixture
 * @standard ISO-4217:2015 currency-codes reporting-currency
 * @standard ISO-3166-1:2020 country-codes legal-jurisdiction
 * @standard ISO-8601-1:2019 date-time fiscal-period
 * @accounting IFRS IAS-1 §54 minimum-line-items
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 * @audit ISO-19011:2018 audit-trail seed-evidence
 * @see docs/STANDARDS.md §4.2
 */

/** GL account element type (IFRS IAS-1 §54 / GAAP ASC-105). */
export type GlAccountType = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';

/**
 * Accounting framework the template targets. Mirrors the value space that
 * appears across `COUNTRY_PROFILES` in `src/config/regional-defaults.ts` —
 * widening this is preferable to letting per-country bundles down-cast to
 * a narrower type at the boundary.
 *
 * The string type carries any value the country-profile registry assigns
 * (`'IFRS'`, `'US-GAAP'`, `'FRS'`, `'JGAAP'`, …) without forcing a parallel
 * enum to track every framework.
 */
export type AccountingStandard = string;

/** Single line in a chart-of-accounts template. */
export interface ChartOfAccountsEntry {
  /** Numeric account code (e.g. `'1000'`). */
  readonly accountNumber: string;
  /** Human-readable account name (e.g. `'Cash and cash equivalents'`). */
  readonly accountName: string;
  /** IFRS IAS-1 §54 element classification. */
  readonly accountType: GlAccountType;
}

/** Tenant-level defaults captured by every template. */
export interface TenantTemplateDefaults {
  /** Slug-style code used in `MINIMAL_TENANT_DATA.code` and audit references. */
  readonly code: string;
  /** Display name shown in admin UI. */
  readonly name: string;
  /** Accounting framework (IFRS / US-GAAP). */
  readonly accountingStandard: AccountingStandard;
  /** Fiscal year start month, 1–12 (1 = January, 4 = April for UK gov etc.). */
  readonly fiscalYearStartMonth: number;
  /** ISO-4217 reporting currency. */
  readonly reportingCurrency: string;
  /** ISO-3166-1 alpha-2 jurisdiction. */
  readonly country: string;
}

/**
 * Sample posted-journal entry the template suggests for Level-2/Level-3
 * seeds. Optional — most templates only define the chart + tenant defaults
 * and let the seeds choose the transaction mix.
 */
export interface SampleTransaction {
  /** Reference / human label (e.g. `'Subscription invoice'`). */
  readonly reference: string;
  /** Free-form description for the audit trail. */
  readonly description: string;
  /** Account-name lookup into `chartOfAccounts` (resolved at seed time). */
  readonly debitAccountName: string;
  /** Account-name lookup into `chartOfAccounts` (resolved at seed time). */
  readonly creditAccountName: string;
  /** Amount in cents. */
  readonly amount: number;
}

/**
 * Compliance posture a tenant inherits from its country. Resolved by
 * `resolveCountryContext` (`src/services/country-context.ts`) and mirrored
 * here so a template can declare which compliance levers it pre-wires
 * (e-invoicing mandate, statutory CoA reference, official API kinds the
 * seed should populate, etc.).
 */
export interface TenantCompliance {
  /** ISO-3166-1 alpha-2 country (drives every other lookup). */
  readonly country: string;
  /** Statutory accounting framework (IFRS / US-GAAP / local PCG / SKR). */
  readonly accountingStandard: AccountingStandard;
  /** Reporting currency (ISO-4217). */
  readonly reportingCurrency: string;
  /** Statutory chart-of-accounts reference name (e.g. `'PCG-2014'`, `'SKR-04'`, `null` for IFRS-only). */
  readonly statutoryChartReference: string | null;
  /** B2G / B2B e-invoicing mandate flag (per EU 2014/55 / per-country regulation). */
  readonly eInvoicingMandate: boolean;
  /**
   * Official-API kinds the tenant's compliance posture expects to be wired.
   * Mirror of `CountryApi['kind']` — kept as string for portability so the
   * templates module doesn't have to import from `@/config/country-apis`.
   */
  readonly officialApiKinds: ReadonlyArray<string>;
}

/**
 * Industry-vertical template — a coherent bundle of (tenant defaults,
 * compliance posture, chart of accounts, sample transactions) keyed off
 * `id` so seeds can pick the template by name and tests can pin against
 * the same source of truth.
 */
export interface IndustryTemplate {
  /** Stable identifier (e.g. `'ifrs-minimum'`, `'ifrs-saas'`). */
  readonly id: string;
  /** Short display label. */
  readonly label: string;
  /** Two-line summary of what the template represents. */
  readonly description: string;
  /** Standards / regulations this template conforms to (citation strings). */
  readonly standards: ReadonlyArray<string>;
  readonly tenant: TenantTemplateDefaults;
  /** Per-country compliance posture pre-wired into this template. */
  readonly compliance: TenantCompliance;
  readonly chartOfAccounts: ReadonlyArray<ChartOfAccountsEntry>;
  readonly sampleTransactions?: ReadonlyArray<SampleTransaction>;
}
