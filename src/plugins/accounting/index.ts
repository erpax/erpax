/**
 * Accounting Plugin — public API.
 *
 * Structure:
 *   collections/  — 10 write-target + 5 master collections (no derived/report collections)
 *   services/     — service-generated DTOs (trial balance, balance sheet, P&L, aging)
 *   hooks/        — domain hooks + hook factories
 *   fields/       — reusable field factories
 *   factories/    — collection / field factory patterns
 *   utilities/    — calculations, period-lock helpers
 *   middleware/   — multi-tenancy + request-context utilities
 *   plugin.ts     — `accountingPlugin()` registers the collections
 *
 * Master citation index — every standard the accounting plugin's modules cite.
 *
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-2 inventories
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @accounting IFRS IAS-8 accounting-policies-changes-and-errors
 * @accounting IFRS IAS-16 property-plant-and-equipment
 * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
 * @accounting IFRS IAS-29 financial-reporting-in-hyperinflationary-economies
 * @accounting IFRS IAS-36 impairment-of-assets
 * @accounting IFRS IAS-37 provisions-contingent-liabilities
 * @accounting IFRS IFRS-9 financial-instruments
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @accounting US-GAAP ASC-210 balance-sheet
 * @accounting US-GAAP ASC-230 statement-of-cash-flows
 * @accounting US-GAAP ASC-250 accounting-changes-and-error-corrections
 * @accounting US-GAAP ASC-270 interim-reporting
 * @accounting US-GAAP ASC-310 receivables
 * @accounting US-GAAP ASC-326 credit-losses-cecl
 * @accounting US-GAAP ASC-330 inventory
 * @accounting US-GAAP ASC-340-40 deferred-contract-costs
 * @accounting US-GAAP ASC-360 property-plant-and-equipment
 * @accounting US-GAAP ASC-405 liabilities
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-830 foreign-currency-matters
 * @accounting OECD SAF-T 2.0 standard-audit-file-tax
 * @standard ISO-3166-1:2020 country-codes
 * @standard ISO-3166-2:2020 subdivision-codes
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-17442-1:2020 lei
 * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
 * @standard ISO-20022 pain.008 customer-direct-debit-initiation
 * @standard ISO-20022 pacs.008 fi-to-fi-customer-credit-transfer
 * @standard ISO-20022 camt.053 bank-to-customer-statement
 * @standard EN-16931:2017 semantic-data-model-electronic-invoice
 * @standard Peppol-BIS-3.0 billing
 * @standard UBL-2.1 universal-business-language
 * @standard UN-EDIFACT INVOIC d96a
 * @standard UN-CEFACT-5305 tax-category-codes
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §302 disclosure-controls
 * @compliance SOX §404 internal-controls
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.4 segregation-of-duties
 * @see docs/STANDARDS.md §2 §4.1 §4.2
 */

// Collections (15 — see plugin.ts comment)
export * from './collections'

// Reports / DTOs (replaces the retired report-shaped collections)
export * from './services'

// Hook factories + domain hooks
export * from './hooks'

// Reusable field factories
export * from './fields'

// Collection / field factory patterns
export * from './factories'

// Calculations + period-lock helpers
export * from './utilities'

// Multi-tenancy + request-context utilities — Slice PPP+SSS:
// `./middleware` (host-scope) had zero callers (PP) and was queued for
// deletion, so the re-export is gone. Use `@/plugins/auth/access.ts`
// `getUserContext` for the canonical request-tenant derivation.

// Plugin entry point
export { accountingPlugin } from './plugin'
