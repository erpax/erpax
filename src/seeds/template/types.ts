/**
 * Industry-template surface — the typed shape of a per-(country × industry)
 * opening chart-of-accounts seed + compliance posture.
 *
 * Nothing here re-types a country fact: `tenant` and `compliance` are *derived*
 * from `resolveCountryContext` at build time (see `./templates.ts`). The five
 * `accountType`s are the IAS-1 §54 element types — the seed vocabulary, distinct
 * from the `gl-accounts` ledger `type` enum (which uses `income`, not `revenue`).
 *
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-1 §54 minimum-line-items
 * @see ./templates.ts
 * @see ./compliance.ts
 */

import type { CountryProfile } from '@/config/regional-defaults'
import type { CountryApiKind } from '@/country/api'

/** The five IAS-1 §54 statement-of-financial-position / P&L element types. */
export type AccountElementType = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense'

/** One line of a seed chart of accounts. */
export interface SeedAccount {
  /** Human key — unique within the template's chart. */
  readonly accountNumber: string
  /** Display name — referenced by `SeedTransaction` debit/credit. */
  readonly accountName: string
  /** IAS-1 §54 element type. */
  readonly accountType: AccountElementType
}

/** An illustrative opening transaction, referencing accounts by name. */
export interface SeedTransaction {
  readonly reference: string
  readonly debitAccountName: string
  readonly creditAccountName: string
  readonly description?: string
}

/** Tenant defaults a fresh tenant starts on, derived from its country. */
export interface TenantSeed {
  /** ISO-3166-1 alpha-2. */
  readonly country: string
  /** ISO-4217 — defaults to the country currency, overridable per tenant. */
  readonly reportingCurrency: string
  /** Per-country accounting framework. */
  readonly accountingStandard: CountryProfile['accountingStandard']
  /** 1..12. */
  readonly fiscalYearStartMonth: number
}

/** Resolved compliance posture for a country (curated or dynamic). */
export interface CompliancePosture {
  /** ISO-3166-1 alpha-2 — matches `TenantSeed.country`. */
  readonly country: string
  /** ISO-4217 — matches `TenantSeed.reportingCurrency`. */
  readonly reportingCurrency: string
  /** Statutory chart-of-accounts reference (e.g. `'BG-NSS'`), `null` when none. */
  readonly statutoryChartReference: string | null
  /** True when the country mandates e-invoicing for this tenant. */
  readonly eInvoicingMandate: boolean
  /** Official-API kinds catalogued for the country (underscore form). */
  readonly officialApiKinds: ReadonlyArray<CountryApiKind>
}

/** A curated opening-books template for one (country × industry). */
export interface IndustryTemplate {
  /** Slug — the human key; matches `/^[a-z][a-z0-9-]+$/`. */
  readonly id: string
  readonly label: string
  readonly description: string
  /** Citation strings — at least one. */
  readonly standards: ReadonlyArray<string>
  /** Opening chart of accounts — covers all five IAS-1 §54 element types. */
  readonly chartOfAccounts: ReadonlyArray<SeedAccount>
  /** Optional illustrative transactions referencing accounts by name. */
  readonly sampleTransactions?: ReadonlyArray<SeedTransaction>
  readonly tenant: TenantSeed
  readonly compliance: CompliancePosture
}
