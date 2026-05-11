/**
 * Accounting Plugin for Payload CMS — `accountingPlugin()` factory.
 *
 * Registers the accounting collections with the parent Payload config. The 20
 * accounting collections live in `./collections/`; this file is the
 * registration / wiring layer, not a citation index.
 *
 * For the full standards surface this plugin commits to, see the master
 * citation index in `./index.ts`. The most load-bearing tags here:
 *
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 * @accounting OECD SAF-T 2.0 standard-audit-file-tax
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @security ISO-27002 §5.4 segregation-of-duties
 * @see docs/STANDARDS.md §2 §4.2
 * @see ./index.ts for master citation index
 */

import type { Plugin, CollectionConfig } from 'payload';
// Import accounting plugin's collections
import {
  // Write-targets (double-entry)
  GLAccounts,
  JournalEntries,
  GLPostings,
  // Banking
  BankAccounts,
  BankStatements,
  // Closing-side
  FinancialStatements,
  PeriodEndAdjustments,
  // Tax / currency masters
  TaxCalculations,
  CurrencyRates,
  // Real entities
  FixedAssets,
  BudgetPlanning,
  // ERP master data (live in this plugin per Payload convention — accounting concepts)
  Customers,
  Vendors,
  TaxJurisdictions,
  TaxCodes,
  FiscalPeriods,
  // Sprint ZZ Round 1 — standards-required normalised collections
  AuditEvents,
  CreditMemos,
  PurchaseOrders,
  GoodsReceipts,
  Quotes,
  Refunds,
  // Sprint ZZ Round 2 — 16 more standards-required normalised collections
  Returns,
  Shipments,
  Contracts,
  PerformanceObligations,
  DepreciationSchedules,
  ConsentRecords,
  DataSubjectRequests,
  DataProcessingActivities,
  AuditFindings,
  ControlTests,
  KycChecks,
  BeneficialOwners,
  TaxReturns,
  // External-API + evidence-pack landing collections (the merged schema
  // every wired API client persists into).
  ApiAuditEvents,
  EvidenceAttestations,
  WarehouseLocations,
  InventoryMovements,
  BankTransactions,
  // ERP-completeness round (IFRS-16 / ISO-20022 / IFRS-9 / IFRS-8)
  Leases,
  PaymentRuns,
  SepaMandates,
  DunningCycles,
  CostCenters,
  // Reconciliation evidence pack
  AccountReconciliations,
  // Payroll cycle (IAS 19 / ASC 710 / ASC 715 / GDPR Art.9)
  Employees,
  TimeEntries,
  PayrollRuns,
  // IFRS 16 / ASC 842 lease period evidence
  LeasePeriodPostings,
  // Slice TTT — gap-fill collections discovered during the NNN audit
  BankReconciliations,
  IntercompanyTransactions,
  ConsolidationEliminations,
  PriorPeriodAdjustments,
  RoundingAdjustments,
  TransactionFailures,
  FxTransactions,
  PaymentAllocations,
  // Slice UUU — core ERP per first-principles standards walk
  BillsOfMaterials,
  WorkOrders,
  ProductionReceipts,
  CostVariances,
  QualityInspections,
  Carriers,
  TrackingEvents,
  CustomsDeclarations,
  // Slice VVV — metered-billing event log
  UsageRecords,
  // Slice WWW — Cloudflare AI audit trail (GDPR Art.22 + EU AI Act + SOX)
  AiSuggestions,
  // Slice ZZZ — IFRS-10 §B86 reporting entity (distinct from tenants)
  LegalEntities,
  // Slice AAAA — IFRS-15 §35 over-time-recognition project block
  Projects,
  ProjectTasks,
  ProjectMilestones,
  WipSnapshots,
  // Slice BBBB — period-end mandatory recognition
  RecurringJournals,
  Provisions,
  CommitmentsAndContingencies,
  GovernmentGrants,
  // Slice CCCC — ESG + transfer pricing
  CsrdDisclosures,
  CarbonEmissions,
  TransferPricingFiles,
  // Slice DDDD — IFRS-16 §44-46 lease modifications
  LeaseModifications,
  // Slice EEEE — CRM block (5 collections)
  Leads,
  Opportunities,
  Activities,
  CustomerSegments,
  SalesCommissions,
  // Slice FFFF — procurement extensions
  PurchaseRequisitions,
  VendorQuotes,
  VendorScorecards,
  // Slice GGGG — HR extensions
  JobPositions,
  RecruitingPipeline,
  PerformanceReviews,
  ExpenseReports,
  LeaveRequests,
  // Slice HHHH — workflow engine
  WorkflowDefinitions,
  WorkflowInstances,
  // Slice ZZZZ — Consignations + Bookings + Facility Management (9 collections)
  ConsignmentArrangements,
  ConsignmentInventory,
  ConsignmentSales,
  BookableResources,
  Bookings,
  Properties,
  Spaces,
  MaintenanceRequests,
  MaintenanceWorkOrders,
  // Slice BBBBB-prep — IFRS 100% coverage gap-fill (12 collections)
  DeferredTaxItems,
  ShareBasedPayments,
  BusinessCombinations,
  HeldForSaleClassifications,
  FairValueMeasurements,
  InvestmentProperties,
  BiologicalAssets,
  EarningsPerShare,
  InsuranceContracts,
  MineralResourceAssets,
  RegulatoryDeferralAccounts,
  PostBalanceSheetEvents,
} from './collections';

/**
 * Accounting Plugin
 *
 * Registers 48 accounting-domain collections (15 original + 7 Round 1 +
 * 16 Round 2 + 10 ERP-completeness):
 *   - Persistent audit / control evidence (AuditEvents, AuditFindings, ControlTests)
 *   - Double-entry GL (GLAccounts, JournalEntries, GLPostings)
 *   - Banking (BankAccounts, BankStatements, BankTransactions)
 *   - Closing (FinancialStatements, PeriodEndAdjustments, FiscalPeriods, DepreciationSchedules)
 *   - Tax (TaxCalculations, TaxReturns, TaxJurisdictions, TaxCodes, CurrencyRates)
 *   - PP&E + budgets (FixedAssets, BudgetPlanning)
 *   - Order-to-Cash (Quotes, Contracts, PerformanceObligations, CreditMemos, Refunds, Returns, Shipments)
 *   - Procure-to-Pay (PurchaseOrders, GoodsReceipts)
 *   - Inventory (WarehouseLocations, InventoryMovements)
 *   - GDPR data layer (ConsentRecords, DataSubjectRequests, DataProcessingActivities)
 *   - AML / KYC (KycChecks, BeneficialOwners)
 *   - Party masters (Customers, Vendors)
 *   - Leases — IFRS 16 / ASC 842 (Leases, LeasePeriodPostings)
 *   - Bank-side payment (SepaMandates, PaymentRuns, AccountReconciliations)
 *   - AR risk (DunningCycles)
 *   - Analytical dim (CostCenters)
 *   - Payroll — IAS 19 / ASC 710 / GDPR (Employees, TimeEntries, PayrollRuns)
 *
 * Following Payload's collection-design guidance, derived/aggregate data is NOT
 * a write-collection — those are service-generated DTOs (see
 * `services/reports.ts`). The retired report collections (TrialBalance,
 * ARAgingReport, APAgingReport, AllowanceForDoubtfulAccounts, FinancialRatios,
 * CashFlowForecast, TrendAnalysis, BudgetVariance, InventoryCostFlow,
 * COGSCalculation) remain as inert stubs in `collections/` to keep
 * `payload-types.ts` regeneration clean — they're not registered here.
 */
export const accountingPlugin = (): Plugin => {
  return (incomingConfig) => {
    const accountingCollections: CollectionConfig[] = [
      // Persistent audit trail (registered FIRST so other collections can write
      // to it via afterChange hooks without ordering surprises).
      AuditEvents,
      // Tax + fiscal calendar masters (FiscalPeriods must precede GL collections that hook validateNotLocked)
      TaxJurisdictions,
      TaxCodes,
      FiscalPeriods,
      // Party masters
      Customers,
      Vendors,
      // KYC / UBO (party-adjacent, AMLD-5 / US CTA)
      KycChecks,
      BeneficialOwners,
      // Chart of accounts + double-entry write-targets
      GLAccounts,
      JournalEntries,
      GLPostings,
      // Banking — accounts (master) before statements (transactions); BankTransactions normalises camt.053 lines
      BankAccounts,
      BankStatements,
      BankTransactions,
      // Procure-to-Pay (PO must precede GoodsReceipts which join-references it)
      PurchaseOrders,
      GoodsReceipts,
      // Order-to-Cash — Quote → Contract → PerformanceObligation → Order → Shipment → Return
      Quotes,
      Contracts,
      PerformanceObligations,
      Shipments,
      Returns,
      // Inventory (WarehouseLocations master must precede InventoryMovements that reference it)
      WarehouseLocations,
      InventoryMovements,
      // Closing-side
      FinancialStatements,
      PeriodEndAdjustments,
      DepreciationSchedules,
      // Tax + currency calculation masters
      TaxCalculations,
      TaxReturns,
      CurrencyRates,
      // Refund / credit lifecycle
      CreditMemos,
      Refunds,
      // Real entities
      FixedAssets,
      BudgetPlanning,
      // GDPR data-layer (Art.6/Art.15-22/Art.30)
      ConsentRecords,
      DataSubjectRequests,
      DataProcessingActivities,
      // SOX §404 evidence layer (depends on AuditEvents being registered)
      AuditFindings,
      ControlTests,
      // External-API + evidence-pack landing collections (depend on the
      // SOX §404 layer; consumed by the country-API resolvers + the
      // evidence-attestation generator).
      ApiAuditEvents,
      EvidenceAttestations,
      // ─── ERP-completeness round ───────────────────────────────────────
      // CostCenters before anything that references them (analytical dim).
      CostCenters,
      // Leases (IFRS 16) — master before period evidence
      Leases,
      LeasePeriodPostings,
      // Bank-side payment infrastructure (PaymentRuns references SepaMandates)
      SepaMandates,
      PaymentRuns,
      // Reconciliation evidence pack (references BankAccounts + GL accounts)
      AccountReconciliations,
      // AR risk + collections trail (IFRS-9 / CECL)
      DunningCycles,
      // Payroll cycle — Employees first (referenced by TimeEntries + PayrollRuns)
      Employees,
      TimeEntries,
      PayrollRuns,
      // ─── Slice TTT — gap-fill collections (NNN audit findings) ───────
      // Reconciliation pack first (references BankAccounts + BankStatements + JEs)
      BankReconciliations,
      // Group accounting — IntercompanyTransactions before ConsolidationEliminations
      // because eliminations may reference an originating intercompany pair.
      IntercompanyTransactions,
      ConsolidationEliminations,
      // Period-adjustment & error-correction trail
      PriorPeriodAdjustments,
      RoundingAdjustments,
      // Operator-facing failure queue (SOX TOM-FAIL-01 retry / disposition)
      TransactionFailures,
      // IAS-21 FX revaluation evidence (registers each conversion event)
      FxTransactions,
      // SOX §404 TOM-AR-02 — explicit per-invoice allocation table
      // (closes the multi-invoice cash-receipt gap that payment.hook
      // implicitly assumed away by 1-to-1 mapping in Slice LLL).
      PaymentAllocations,
      // ─── Slice UUU — manufacturing (IAS-2 §10-14, ISA-95 §B.5) ──────
      // BOM master before WorkOrders that reference it.
      BillsOfMaterials,
      WorkOrders,
      // ProductionReceipts before CostVariances — variances close on
      // receipt completion.
      ProductionReceipts,
      CostVariances,
      // ISO 9001 nonconformance — references work-orders + items.
      QualityInspections,
      // ─── Slice UUU — logistics (INCOTERMS, WCO HS, EU UCC) ──────────
      // Carriers master before TrackingEvents that reference it.
      Carriers,
      TrackingEvents,
      // CustomsDeclarations references shipments + items (HS code).
      CustomsDeclarations,
      // ─── Slice VVV — agnostic metered billing ────────────────────────
      // Usage events feeding IFRS-15 §B16 usage-based invoice lines
      // (per-tenant entitlement metering for free / solo / team /
      // business / enterprise tiers).
      UsageRecords,
      // ─── Slice WWW — Cloudflare AI audit trail ──────────────────────
      // Mandatory per-inference audit row for every Workers AI call —
      // GDPR Art.22(3) right-to-human-intervention + EU AI Act
      // transparency + SOX §404 ai-assisted-decision evidence.
      AiSuggestions,
      // ─── Slice ZZZ — IFRS-10 §B86 reporting entity ──────────────────
      // LegalEntities separates the DB partition (`tenants`) from the
      // statutory reporting entity. Registered after IntercompanyTransactions
      // / ConsolidationEliminations so those collections (which reference
      // the entity in future migrations) can already see the slug.
      LegalEntities,
      // ─── Slice AAAA — IFRS-15 §35 over-time-recognition ─────────────
      // Projects must precede ProjectTasks/ProjectMilestones/WipSnapshots
      // (those reference the project header). WipSnapshots references
      // `period-end-adjustments` which is already registered above.
      Projects,
      ProjectTasks,
      ProjectMilestones,
      WipSnapshots,
      // ─── Slice BBBB — period-end mandatory recognition ──────────────
      // RecurringJournals references gl-accounts (already registered).
      // Provisions references audit-findings + fiscal-periods (registered).
      // CommitmentsAndContingencies references provisions (so register
      // provisions first). GovernmentGrants references provisions +
      // fixed-assets (both registered).
      RecurringJournals,
      Provisions,
      CommitmentsAndContingencies,
      GovernmentGrants,
      // ─── Slice CCCC — ESG + transfer pricing ────────────────────────
      // CsrdDisclosures references legal-entities + evidence-attestations.
      // CarbonEmissions references legal-entities + fiscal-periods +
      // evidence-attestations. TransferPricingFiles references
      // legal-entities + evidence-attestations.
      CsrdDisclosures,
      CarbonEmissions,
      TransferPricingFiles,
      // ─── Slice DDDD — IFRS-16 §44-46 lease modifications ────────────
      // LeaseModifications references leases + journal-entries +
      // evidence-attestations + fiscal-periods (all registered above).
      LeaseModifications,
      // ─── Slice EEEE — CRM block ─────────────────────────────────────
      // Leads first (Opportunities references it).
      // CustomerSegments before Opportunities (FK reference).
      // Activities references all of the above.
      // SalesCommissions references opportunities + contracts + provisions
      // (provisions registered above; contracts registered above).
      Leads,
      CustomerSegments,
      Opportunities,
      Activities,
      SalesCommissions,
      // ─── Slice FFFF — procurement extensions ────────────────────────
      // PurchaseRequisitions before VendorQuotes (quotes reference PR).
      // VendorQuotes references vendors + purchase-orders (registered).
      // VendorScorecards references vendors (registered).
      PurchaseRequisitions,
      VendorQuotes,
      VendorScorecards,
      // ─── Slice GGGG — HR extensions ─────────────────────────────────
      // JobPositions before RecruitingPipeline (pipeline references position).
      // PerformanceReviews + ExpenseReports + LeaveRequests reference
      // employees (already registered above).
      JobPositions,
      RecruitingPipeline,
      PerformanceReviews,
      ExpenseReports,
      LeaveRequests,
      // ─── Slice HHHH — BPMN-style workflow engine ────────────────────
      // WorkflowDefinitions before WorkflowInstances (instances reference
      // the definition). Both registered last so every collection that
      // could be a workflow target is already on the registry.
      WorkflowDefinitions,
      WorkflowInstances,
      // ─── Slice ZZZZ — Consignations + Bookings + Facility Management ─
      // Order matters for FK resolution at boot:
      //   Properties before Spaces (spaces reference property).
      //   Spaces before BookableResources (resources reference space).
      //   BookableResources before Bookings (bookings reference resource).
      //   ConsignmentArrangements before ConsignmentInventory + Sales.
      //   ConsignmentInventory before ConsignmentSales.
      //   MaintenanceRequests before MaintenanceWorkOrders (WO references request).
      Properties,
      Spaces,
      BookableResources,
      Bookings,
      ConsignmentArrangements,
      ConsignmentInventory,
      ConsignmentSales,
      MaintenanceRequests,
      MaintenanceWorkOrders,
      // ─── Slice BBBBB-prep — IFRS 100% coverage gap-fill ──────────────
      // FairValueMeasurements first because most others FK back to it.
      FairValueMeasurements,
      DeferredTaxItems,
      ShareBasedPayments,
      BusinessCombinations,
      InvestmentProperties,
      BiologicalAssets,
      MineralResourceAssets,
      RegulatoryDeferralAccounts,
      InsuranceContracts,
      HeldForSaleClassifications,
      EarningsPerShare,
      PostBalanceSheetEvents,
    ];

    return {
      ...incomingConfig,
      collections: [...(incomingConfig.collections ?? []), ...accountingCollections],
    };
  };
};
