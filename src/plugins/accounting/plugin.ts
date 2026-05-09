/**
 * Accounting Plugin for Payload CMS — `accountingPlugin()` factory.
 *
 * Registers the accounting collections with the host Payload config. The 20
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
    ];

    return {
      ...incomingConfig,
      collections: [...(incomingConfig.collections ?? []), ...accountingCollections],
    };
  };
};
