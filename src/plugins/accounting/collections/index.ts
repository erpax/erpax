/**
 * Accounting Plugin — collections barrel.
 *
 * 10 write-target collections + 5 master collections. Per Payload's
 * collection-design guidance, derived/aggregate data is NOT a write-collection
 * — those become service-generated DTOs (see `services/reports.ts` for trial
 * balance, aging, ratios, etc.).
 *
 * Per-collection standards live in each file's banner. This barrel re-states
 * the union for grep-traceability: a search for `@standard` in this file
 * yields every standard the accounting collections jointly commit to.
 *
 * @standard ISO-3166-1:2020 country-codes
 * @standard ISO-3166-2:2020 subdivision-codes
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-13616-1:2020 iban
 * @standard ISO-9362:2022 bic
 * @standard ISO-17442-1:2020 lei
 * @standard ISO-20022 pain.001 pain.008 pacs.008 camt.053
 * @standard EN-16931:2017 semantic-invoice-model
 * @standard UN-CEFACT-5305 tax-category-codes
 * @accounting IFRS IAS-1 IAS-7 IAS-16 IAS-21 IAS-29 IAS-36 IAS-37 IFRS-9 IFRS-15
 * @accounting US-GAAP ASC-105 ASC-205 ASC-210 ASC-230 ASC-250 ASC-270 ASC-310 ASC-326 ASC-330 ASC-360 ASC-405 ASC-606 ASC-830
 * @accounting OECD SAF-T 2.0 standard-audit-file-tax
 * @compliance SOX §302 §404
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.1 §4.2
 */

// GL write-targets
export { default as GLAccounts } from './GLAccounts'
export { default as JournalEntries } from './JournalEntries'
export { default as GLPostings } from './GLPostings'

// Banking
export { default as BankStatements } from './BankStatements'

// Closing-side
export { default as FinancialStatements } from './FinancialStatements'
export { default as PeriodEndAdjustments } from './PeriodEndAdjustments'

// Tax + currency masters
export { default as TaxCalculations } from './TaxCalculations'
export { default as CurrencyRates } from './CurrencyRates'

// Real entities
export { default as FixedAssets } from './FixedAssets'
export { default as BudgetPlanning } from './BudgetPlanning'

// ─── ERP Master Data (referenced from Invoices/Payments/etc.) ────────
export { Customers } from './Customers'
export { Vendors } from './Vendors'
export { TaxJurisdictions } from './TaxJurisdictions'
export { TaxCodes } from './TaxCodes'
export { FiscalPeriods } from './FiscalPeriods'

// ─── Sprint ZZ Round 1 — standards-required normalised collections ───
// AuditEvents:    persistent ISO 19011 / SOX §404 evidence (was logger-only)
// CreditMemos:    IFRS 15 §B22 contra-revenue (was just a type)
// PurchaseOrders: SOX §404 three-way-match leg 1
// GoodsReceipts:  SOX §404 three-way-match leg 2
// Quotes:         IFRS 15 §10 quote-to-cash entry point
// Refunds:        ISO 20022 pacs.004 cash-out side of CreditMemos
// BankAccounts:   ISO 13616 IBAN / ISO 9362 BIC master (normalised from BankStatements)
export { default as AuditEvents } from './AuditEvents'
export { default as CreditMemos } from './CreditMemos'
export { default as PurchaseOrders } from './PurchaseOrders'
export { default as GoodsReceipts } from './GoodsReceipts'
export { default as Quotes } from './Quotes'
export { default as Refunds } from './Refunds'
export { default as BankAccounts } from './BankAccounts'

// ─── Sprint ZZ Round 2 — 16 standards-required normalised collections ───
// Order-to-Cash: Returns, Shipments
// Revenue contracts: Contracts, PerformanceObligations (IFRS 15 §22)
// PP&E period detail: DepreciationSchedules (IAS 16)
// GDPR data layer: ConsentRecords, DataSubjectRequests, DataProcessingActivities
// SOX §404 evidence layer: AuditFindings, ControlTests
// AML / KYC: KycChecks, BeneficialOwners (AMLD-5 / US CTA)
// Tax filing: TaxReturns (separate from TaxCalculations snapshot)
// Inventory: WarehouseLocations, InventoryMovements (IAS 2 / ASC 330 cost-flow)
// Bank ledger: BankTransactions (ISO 20022 camt.053 line-level)
export { default as Returns } from './Returns'
export { default as Shipments } from './Shipments'
export { default as Contracts } from './Contracts'
export { default as PerformanceObligations } from './PerformanceObligations'
export { default as DepreciationSchedules } from './DepreciationSchedules'
export { default as ConsentRecords } from './ConsentRecords'
export { default as DataSubjectRequests } from './DataSubjectRequests'
export { default as DataProcessingActivities } from './DataProcessingActivities'
export { default as AuditFindings } from './AuditFindings'
export { default as ControlTests } from './ControlTests'
export { default as KycChecks } from './KycChecks'
export { default as BeneficialOwners } from './BeneficialOwners'
export { default as TaxReturns } from './TaxReturns'
export { default as WarehouseLocations } from './WarehouseLocations'
export { default as InventoryMovements } from './InventoryMovements'
export { default as BankTransactions } from './BankTransactions'

// Slice QQQ: retired report-shaped collection re-exports removed.
// Per Payload's "create a collection only when structurally distinct"
// guidance, derived data is service-generated (see
// `services/reports.ts`). The stub files at TrialBalance.ts,
// ARAgingReport.ts, APAgingReport.ts, AllowanceForDoubtfulAccounts.ts,
// InventoryCostFlow.ts, COGSCalculation.ts, BudgetVariance.ts,
// FinancialRatios.ts, CashFlowForecast.ts, TrendAnalysis.ts are queued
// for deletion in `scripts/slice-f-delete-dead-stubs.sh` (Slice F block).
// Removing the re-exports now so the barrel doesn't break when the files
// are deleted, and so nothing in the import graph depends on them.
