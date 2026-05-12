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

// Reconciliation evidence pack — IAS-7 sign-off + GL-to-subledger + intercompany
export { default as AccountReconciliations } from './AccountReconciliations'

// Closing-side
export { default as FinancialStatements } from './FinancialStatements'
export { default as PeriodEndAdjustments } from './PeriodEndAdjustments'

// Tax + currency masters
export { default as TaxCalculations } from './TaxCalculations'
export { default as CurrencyRates } from './CurrencyRates'

// Real entities
export { default as FixedAssets } from './FixedAssets'
export { default as BudgetPlanning } from './BudgetPlanning'

// Slice QQQQQQQQ (2026-05-11) — Standards collection backs the 12
// erpax.standards.* MCP tools with a persistent data layer (per-tenant
// citation graph + conflict / supersession trail). Conservation Laws
// 27 + 28 + 38.
export { default as Standards } from './Standards'

// Slice RRRRRRRR (2026-05-11) — Memories collection: generic
// persistence for MCP tool + DomainAgent in-memory state (proposals,
// strategy decisions, drift snapshots, emerging gaps, observations).
// Conservation Laws 8 (content-uuid) + 10 (relatedTo graph).
export { default as Memories } from './Memories'

// Slice ZZZZZZZZ (2026-05-11) — McpToolMetadata: localized + tenant-
// extensible overlay for every erpax.* MCP tool. Translators fill
// description.<locale> via the admin UI; the catalog overlays at
// request time. Per user "in payload even data is translatable so
// translations are automatic".
export { default as McpToolMetadata } from './McpToolMetadata'

// Slice AAAAAAAAA (2026-05-11) — Translations: per-tenant override
// layer ABOVE McpToolMetadata. Resolution order:
//   tenant translation > mcp-tool-metadata > code default.
// Per user "tenants may override app translations using the
// translations collection".
export { default as Translations } from './Translations'

// ─── ERP Master Data (referenced from Invoices/Payments/etc.) ────────
// Slice EEEEEEEE-fix (2026-05-11) — Addresses NOT exported.
// @payloadcms/plugin-ecommerce already registers an `addresses`
// collection at the same slug; registering our richer version causes
// `DuplicateCollection: Collection slug already in use: "addresses"`
// at config-load. The 23+ relationTo: 'addresses' refs resolve against
// the plugin's collection. If the GDPR-erasure fields are ever needed,
// either:
//   (a) override the ecommerce plugin's addresses via its collectionOverride
//       hook in configureEcommercePlugin.ts, OR
//   (b) rename our slug to 'accounting-addresses' + update all consumers.
// The source file is retained for the (b) path; barrel export is suppressed.
// export { default as Addresses } from './Addresses'
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
// SalesOrders — Slice XXXXXXXX-c (2026-05-11) — closes the O2C gap.
// Quote → SalesOrder → Shipment → Invoice (distinct from purchase-orders
// which is P2P / vendor-side). Owns the 'sales-orders' slug; 4 consumers
// (Quotes.convertedToOrder, Returns.order, Shipments.order, Refunds.order)
// retargeted from the orphan 'orders' slug to this canonical target.
export { default as SalesOrders } from './SalesOrders'
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
// External-API + evidence-pack landing collections — the merged schema
// every wired API client persists into. Generic `ApiAuditEvents` absorbs
// every `ApiResult<T>` from the EU-fallback resolvers; `EvidenceAttestations`
// indexes the signed PDF cover sheets the e2e walk-throughs produce.
export { default as ApiAuditEvents } from './ApiAuditEvents'
export { default as EvidenceAttestations } from './EvidenceAttestations'
export { default as WarehouseLocations } from './WarehouseLocations'
export { default as InventoryMovements } from './InventoryMovements'
export { default as BankTransactions } from './BankTransactions'

// ─── ERP-completeness round — IFRS-16 / ISO-20022 / IFRS-9 / IFRS-8 ────
// Leases (IFRS 16 / ASC 842 ROU + liability)
// PaymentRuns (ISO 20022 pain.001 / pain.008 batch)
// SepaMandates (pain.008 mandate register)
// DunningCycles (IFRS 9 / ASC 326 CECL collection trail)
// CostCenters (IAS 1 §99 / IFRS 8 / ASC 280 segment dimension)
export { default as Leases } from './Leases'
export { default as PaymentRuns } from './PaymentRuns'
export { default as SepaMandates } from './SepaMandates'
export { default as DunningCycles } from './DunningCycles'
export { default as CostCenters } from './CostCenters'

// ─── Payroll cycle — IAS 19 / ASC 710 / ASC 715 / GDPR Art.9 ───────────
// Employees (workforce master)
// TimeEntries (per-day per-task)
// PayrollRuns (batch gross-to-net + pain.001 disbursement)
export { default as Employees } from './Employees'
export { default as TimeEntries } from './TimeEntries'
export { default as PayrollRuns } from './PayrollRuns'

// ─── IFRS 16 / ASC 842 lease period evidence ─────────────────────────
// LeasePeriodPostings — one row per (lease × period). Mirrors
// DepreciationSchedules for fixed assets. Hook fires on status →
// posted to book the canonical interest-accretion + ROU-amortisation
// JE.
export { default as LeasePeriodPostings } from './LeasePeriodPostings'

// ─── Slice TTT (2026-05-10) — gap-fill collections ────────────────────
// Discovered missing during the NNN audit cycle: the
// SEED_VALIDATION_REGISTRY declared these slugs but no Payload schema
// existed. Each closes a specific standards-cited gap:
//
//   BankReconciliations       — IAS-7 §44 / SOX §404 TOM-CSH-01 cash-balance proof
//   IntercompanyTransactions  — IFRS 10 §B86 / ASC 810 paired source documents
//   ConsolidationEliminations — IFRS 10 §B86(c) elimination JEs at consolidation
//   PriorPeriodAdjustments    — IAS-8 §42 retrospective error corrections
//   RoundingAdjustments       — IAS-1 §51(e) presentation-rounding plugs
//   TransactionFailures       — SOX §404 TOM-FAIL-01 retry / disposition trail
export { default as BankReconciliations } from './BankReconciliations'
export { default as IntercompanyTransactions } from './IntercompanyTransactions'
export { default as ConsolidationEliminations } from './ConsolidationEliminations'
export { default as PriorPeriodAdjustments } from './PriorPeriodAdjustments'
export { default as RoundingAdjustments } from './RoundingAdjustments'
export { default as TransactionFailures } from './TransactionFailures'
export { default as FxTransactions } from './FxTransactions'
export { default as PaymentAllocations } from './PaymentAllocations'

// ─── Slice UUU (2026-05-10) — core ERP modules per first-principles
// standards walk (manufacturing + logistics).
//
// Why missed for so long: prior audits only checked the
// SEED_VALIDATION_REGISTRY for declared-but-unimplemented slugs.
// They never asked "what does a real ERP per the standards need
// that nobody has even thought of?" Slice UUU fixes that with a
// first-principles walk against IAS-2 §10-14 (cost of conversion),
// ISA-95 §B.4-B.5 (manufacturing), INCOTERMS 2020, WCO HS, and EU
// UCC.
//
// Manufacturing (IAS-2 §10-14, ISA-95 §B.5):
//   BillsOfMaterials   — IAS-2 §10 cost-of-conversion components
//   WorkOrders         — production-order header
//   ProductionReceipts — finished-good receipt at absorbed cost
//   CostVariances      — IAS-2 §21 standard-vs-actual variances
//   QualityInspections — ISO 9001 §8.7 nonconformance evidence
//
// Logistics (INCOTERMS 2020, WCO HS, EU UCC):
//   Carriers             — first-class carrier master per tenant
//   TrackingEvents       — per-leg shipment status (camt-style for shipping)
//   CustomsDeclarations  — WCO HS-coded export/import declarations
export { default as BillsOfMaterials } from './BillsOfMaterials'
export { default as WorkOrders } from './WorkOrders'
export { default as ProductionReceipts } from './ProductionReceipts'
export { default as CostVariances } from './CostVariances'
export { default as QualityInspections } from './QualityInspections'
export { default as Carriers } from './Carriers'
export { default as TrackingEvents } from './TrackingEvents'
export { default as CustomsDeclarations } from './CustomsDeclarations'

// ─── Slice VVV (2026-05-10) — agnostic billing infrastructure ─────────
// UsageRecords closes the gap between "ERPax has all features" and
// "every tenant gets exactly what they pay for". Each metered event
// (invoice issued, country-bundle connected, PAdES sealed, …) is one
// row here; the billing job aggregates by `(tenant, feature,
// billingPeriod)` and emits IFRS-15 §B16 usage-based invoice lines.
export { default as UsageRecords } from './UsageRecords'

// ─── Slice WWW (2026-05-10) — Cloudflare AI audit trail ───────────────
// Mandatory per GDPR Art.22(3) right-to-human-intervention + EU AI Act
// transparency + SOX §404 ai-assisted-decision evidence. Every Workers
// AI inference run from the `src/services/ai/` entry-point lands one
// row here with input / output / model / risk-class / human-decision.
export { default as AiSuggestions } from './AiSuggestions'

// ─── Slice ZZZ (2026-05-10) — IFRS-10 group structure ─────────────────
// LegalEntities separates the **DB partition (`tenants`)** from the
// **reporting legal entity** (subsidiary / associate / joint-venture /
// head). One tenant may own many legal entities; consolidation +
// intercompany pairings target the entity, not the tenant.
//
//   LegalEntities — IFRS-10 §B86 + ASC 810-10-45 reporting unit
export { default as LegalEntities } from './LegalEntities'

// ─── Slice AAAA (2026-05-10) — IFRS-15 §35 over-time recognition ──────
// Projects + ProjectTasks + ProjectMilestones + WipSnapshots close the
// gap between `contracts` / `performance-obligations` (the revenue side)
// and `time-entries` / `purchase-orders` (the cost side). WIP
// snapshots are the period-end frozen evidence the cost-to-cost JE
// (IFRS-15 §B18) lands against.
export { default as Projects } from './Projects'
export { default as ProjectTasks } from './ProjectTasks'
export { default as ProjectMilestones } from './ProjectMilestones'
export { default as WipSnapshots } from './WipSnapshots'

// ─── Slice BBBB (2026-05-10) — period-end mandatory recognition ───────
// RecurringJournals      — IAS-1 §27 accrual-basis automation
// Provisions             — IAS-37 §14 + ASC 450 recognised liabilities
// CommitmentsAndContingencies — IAS-37 §86-92 + IFRS-15 §B50 disclosure
// GovernmentGrants       — IAS-20 + ASC 958-605 / ASC 832
export { default as RecurringJournals } from './RecurringJournals'
export { default as Provisions } from './Provisions'
export { default as CommitmentsAndContingencies } from './CommitmentsAndContingencies'
export { default as GovernmentGrants } from './GovernmentGrants'

// ─── Slice CCCC (2026-05-10) — ESG + transfer pricing ─────────────────
// CsrdDisclosures        — EU CSRD 2022/2464 + ESRS 1/2/E-S-G structured disclosure
// CarbonEmissions        — GHG Protocol Scope 1/2/3 register (ESRS E1)
// TransferPricingFiles   — OECD BEPS Action 13 Master / Local / CbCR
export { default as CsrdDisclosures } from './CsrdDisclosures'
export { default as CarbonEmissions } from './CarbonEmissions'
export { default as TransferPricingFiles } from './TransferPricingFiles'

// ─── Slice DDDD (2026-05-10) — IFRS-16 §44-46 lease modifications ─────
// LeaseModifications     — separate-lease vs not-separate-lease vs (full / partial) termination
export { default as LeaseModifications } from './LeaseModifications'

// ─── Slice EEEE (2026-05-10) — CRM block ──────────────────────────────
// Leads             — pre-customer pipeline
// Opportunities     — sales-pipeline weighted forecast
// Activities        — calls / emails / meetings log
// CustomerSegments  — pricing / portfolio buckets (IFRS-15 §4)
// SalesCommissions  — IFRS-15 §91-94 incremental costs
export { default as Leads } from './Leads'
export { default as Opportunities } from './Opportunities'
export { default as Activities } from './Activities'
export { default as CustomerSegments } from './CustomerSegments'
export { default as SalesCommissions } from './SalesCommissions'

// ─── Slice FFFF (2026-05-10) — procurement extensions ─────────────────
// PurchaseRequisitions — SOX §404 + ISO 27002 §5.4 four-eyes pre-PO
// VendorQuotes         — RFQ responses (BEPS Action 13 + SOX §404)
// VendorScorecards     — ISO 9001 §8.4 supplier evaluation
export { default as PurchaseRequisitions } from './PurchaseRequisitions'
export { default as VendorQuotes } from './VendorQuotes'
export { default as VendorScorecards } from './VendorScorecards'

// ─── Slice GGGG (2026-05-10) — HR extensions ──────────────────────────
// JobPositions       — open positions + org chart
// RecruitingPipeline — candidate funnel (GDPR Art.6(1)(b))
// PerformanceReviews — annual / quarterly review records
// ExpenseReports     — employee expense claims (IAS-19)
// LeaveRequests      — vacation / sick / parental leave (IAS-19 §13-16)
export { default as JobPositions } from './JobPositions'
export { default as RecruitingPipeline } from './RecruitingPipeline'
export { default as PerformanceReviews } from './PerformanceReviews'
export { default as ExpenseReports } from './ExpenseReports'
export { default as LeaveRequests } from './LeaveRequests'

// ─── Slice HHHH (2026-05-10) — workflow engine ────────────────────────
// WorkflowDefinitions — BPMN-style multi-step approval template
// WorkflowInstances   — running execution per (definition × document)
// Service shell at src/services/workflow/index.ts
export { default as WorkflowDefinitions } from './WorkflowDefinitions'
export { default as WorkflowInstances } from './WorkflowInstances'

// ─── Slice BBBBB-prep (2026-05-11) — IFRS 100% coverage gap-fill ──
// 9 new collections close the IFRS gap from 24/43 cited (55.8%) to 43/43
// (100%) per the user directive "ensure IFRS is 100% implemented as
// well as the related standards". Each follows AAAAA's 12-rule DRY
// contract from day one.
//
//   DeferredTaxItems              — IAS 12 income-taxes timing differences
//   ShareBasedPayments            — IFRS 2 equity-/cash-settled grants
//   BusinessCombinations          — IFRS 3 acquisitions + PPA + goodwill
//   HeldForSaleClassifications    — IFRS 5 disposal groups + discontinued ops
//   FairValueMeasurements         — IFRS 13 Level 1/2/3 hierarchy register
//   InvestmentProperties          — IAS 40 rental / capital-appreciation properties
//   BiologicalAssets              — IAS 41 livestock / crops / forestry / aquaculture
//   EarningsPerShare              — IAS 33 basic + diluted EPS
//   InsuranceContracts            — IFRS 17 GMM / PAA / VFA register
//   MineralResourceAssets         — IFRS 6 exploration & evaluation
//   RegulatoryDeferralAccounts    — IFRS 14 rate-regulated balances
//   PostBalanceSheetEvents        — IAS 10 adjusting / non-adjusting events
//
// JSDoc-citation extensions (no new collection — added @standard tag to
// existing collection that implements the relevant logic):
//   IAS 32  → FxTransactions (financial-instruments presentation)
//   IFRS 7  → FxTransactions + FinancialStatements (FI disclosures)
//   IFRS 12 → LegalEntities  (disclosure-of-interests-in-other-entities)
//   IAS 27  → LegalEntities  (separate FS)
//   IFRS 18 → LegalEntities + FinancialStatements (presentation, eff. 2027)
//   IAS 26  → PayrollRuns    (retirement-benefit-plan reporting feed)
//   IAS 34  → FinancialStatements (interim FS condensed format)
export { default as DeferredTaxItems } from './DeferredTaxItems'
export { default as ShareBasedPayments } from './ShareBasedPayments'
export { default as BusinessCombinations } from './BusinessCombinations'
export { default as HeldForSaleClassifications } from './HeldForSaleClassifications'
export { default as FairValueMeasurements } from './FairValueMeasurements'
export { default as InvestmentProperties } from './InvestmentProperties'
export { default as BiologicalAssets } from './BiologicalAssets'
export { default as EarningsPerShare } from './EarningsPerShare'
export { default as InsuranceContracts } from './InsuranceContracts'
export { default as MineralResourceAssets } from './MineralResourceAssets'
export { default as RegulatoryDeferralAccounts } from './RegulatoryDeferralAccounts'
export { default as PostBalanceSheetEvents } from './PostBalanceSheetEvents'

// ─── Slice ZZZZ (2026-05-10) — Consignations + Bookings + Facility Mgmt ──
// 9 collections backed by IFRS-15 §B77-B78, ISO 18513, ISO 41001 / 41011
// / 55000, EN 13306, ISO 14224, EN 15221-6, ISO 19650, EU EPBD.
//
// Consignment (3): IFRS-15 §B77-B78 control-passes-on-sale model.
//   ConsignmentArrangements — master agreement w/ consignee
//   ConsignmentInventory    — per-SKU running balance at consignee
//   ConsignmentSales        — sale-by-consignee → revenue + COGS
// Bookings (2): generic resource-reservation primitive (rooms / vehicles
// / equipment / beds / time slots).
//   BookableResources       — catalog of reservable things
//   Bookings                — reservation events w/ status lifecycle
// Facility Management (4): ISO 41001 / 55000 IWMS + CMMS pattern.
//   Properties              — real-estate property master
//   Spaces                  — sub-property zones (room / floor / desk)
//   MaintenanceRequests     — user-raised tickets (ISO 41001 §8.1)
//   MaintenanceWorkOrders   — CMMS execution + cost roll-up (capex/opex)
export { default as ConsignmentArrangements } from './ConsignmentArrangements'
export { default as ConsignmentInventory } from './ConsignmentInventory'
export { default as ConsignmentSales } from './ConsignmentSales'
export { default as BookableResources } from './BookableResources'
export { default as Bookings } from './Bookings'
export { default as Properties } from './Properties'
export { default as Spaces } from './Spaces'
export { default as MaintenanceRequests } from './MaintenanceRequests'
export { default as MaintenanceWorkOrders } from './MaintenanceWorkOrders'

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
