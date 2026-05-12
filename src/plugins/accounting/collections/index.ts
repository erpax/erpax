/**
 * Accounting plugin collections — Payload collection definitions.
 *
 * All 122 accounting collections migrated from canonical src/collections/accounting/
 * to plugin structure in Phase 2.1-2.9.
 *
 * @standard SAF-T:2.0 master-data
 * @standard ISO-20022:2013 financial-messaging
 * @accounting IFRS-16 general-ledger
 */

// GL Core
import GLAccounts from './gl-accounts'
import JournalEntries from './journal-entries'
import GLPostings from './gl-postings'

// Banking & Reconciliation
import AccountReconciliations from './account-reconciliations'
import BankReconciliations from './bank-reconciliations'
import BankStatements from './bank-statements'
import BankAccounts from './bank-accounts'
import BankTransactions from './bank-transactions'

// Close-side & Period-End
import FinancialStatements from './financial-statements'
import PeriodEndAdjustments from './period-end-adjustments'
import RecurringJournals from './recurring-journals'
import Provisions from './provisions'
import CommitmentsAndContingencies from './commitments-and-contingencies'
import GovernmentGrants from './government-grants'

// Tax & Currency
import TaxCalculations from './tax-calculations'
import CurrencyRates from './currency-rates'

// Masters & Real Entities
import FixedAssets from './fixed-assets'
import BudgetPlanning from './budget-planning'
import Customers from './receivables/customers'
import Vendors from './vendors'
import TaxJurisdictions from './tax-jurisdictions'
import TaxCodes from './tax-codes'
import FiscalPeriods from './fiscal-periods'
import CostCenters from './cost-centers'
import LegalEntities from './legal-entities'

// Infrastructure
import Standards from './standards'
import Memories from './memories'
import McpToolMetadata from './mcp-tool-metadata'
import Translations from './translations'

// O2C (Order to Cash)
import AuditEvents from './audit-events'
import CreditMemos from './receivables/credit-memos'
import Quotes from './quotes'
import SalesOrders from './sales-orders'
import Returns from './returns'
import Shipments from './shipments'
import Refunds from './refunds'

// P2P & Three-way Match
import PurchaseOrders from './purchase-orders'
import GoodsReceipts from './goods-receipts'
import PurchaseRequisitions from './purchase-requisitions'
import VendorQuotes from './vendor-quotes'
import VendorScorecards from './vendor-scorecards'

// Master Banking & Payments
import PaymentRuns from './payment-runs'
import SepaMandates from './sepa-mandates'
import DunningCycles from './receivables/dunning-cycles'
import PaymentAllocations from './receivables/payment-allocations'
import Leases from './leases'

// Revenue Contracts
import Contracts from './contracts'
import PerformanceObligations from './performance-obligations'

// PP&E
import DepreciationSchedules from './depreciation-schedules'

// GDPR
import ConsentRecords from './consent-records'
import DataSubjectRequests from './data-subject-requests'
import DataProcessingActivities from './data-processing-activities'

// SOX §404
import AuditFindings from './audit-findings'
import ControlTests from './control-tests'

// AML/KYC
import KycChecks from './kyc-checks'
import BeneficialOwners from './beneficial-owners'

// Tax Filing
import TaxReturns from './tax-returns'

// Inventory
import WarehouseLocations from './warehouse-locations'
import InventoryMovements from './inventory-movements'

// API & Evidence
import ApiAuditEvents from './api-audit-events'
import EvidenceAttestations from './evidence-attestations'

// Payroll
import Employees from './employees'
import TimeEntries from './time-entries'
import PayrollRuns from './payroll-runs'

// IFRS 16
import LeasePeriodPostings from './lease-period-postings'

// Intercompany & Consolidation
import IntercompanyTransactions from './intercompany-transactions'
import ConsolidationEliminations from './consolidation-eliminations'
import PriorPeriodAdjustments from './prior-period-adjustments'
import RoundingAdjustments from './rounding-adjustments'

// FX & Transactions
import FxTransactions from './fx-transactions'
import TransactionFailures from './transaction-failures'

// Manufacturing & Logistics
import BillsOfMaterials from './bills-of-materials'
import WorkOrders from './work-orders'
import ProductionReceipts from './production-receipts'
import CostVariances from './cost-variances'
import QualityInspections from './quality-inspections'
import Carriers from './carriers'
import TrackingEvents from './tracking-events'
import CustomsDeclarations from './customs-declarations'

// Billing Infrastructure
import UsageRecords from './usage-records'

// AI Audit Trail
import AiSuggestions from './ai-suggestions'

// Group Structure
import Projects from './projects'
import ProjectTasks from './project-tasks'
import ProjectMilestones from './project-milestones'
import WipSnapshots from './wip-snapshots'

// ESG & Transfer Pricing
import CsrdDisclosures from './csrd-disclosures'
import CarbonEmissions from './carbon-emissions'
import TransferPricingFiles from './transfer-pricing-files'

// IFRS 16 Extensions
import LeaseModifications from './lease-modifications'

// CRM
import Leads from './receivables/leads'
import Opportunities from './receivables/opportunities'
import Activities from './activities'
import CustomerSegments from './receivables/customer-segments'
import SalesCommissions from './receivables/sales-commissions'

// HR Extensions
import JobPositions from './job-positions'
import RecruitingPipeline from './recruiting-pipeline'
import PerformanceReviews from './performance-reviews'
import ExpenseReports from './expense-reports'
import LeaveRequests from './leave-requests'

// Workflow Engine
import WorkflowDefinitions from './workflow-definitions'
import WorkflowInstances from './workflow-instances'

// IFRS 100% Gap-Fill
import DeferredTaxItems from './deferred-tax-items'
import ShareBasedPayments from './share-based-payments'
import BusinessCombinations from './business-combinations'
import HeldForSaleClassifications from './held-for-sale-classifications'
import FairValueMeasurements from './fair-value-measurements'
import InvestmentProperties from './investment-properties'
import BiologicalAssets from './biological-assets'
import EarningsPerShare from './earnings-per-share'
import InsuranceContracts from './insurance-contracts'
import MineralResourceAssets from './mineral-resource-assets'
import RegulatoryDeferralAccounts from './regulatory-deferral-accounts'
import PostBalanceSheetEvents from './post-balance-sheet-events'

// Consignments & Facility Management
import ConsignmentArrangements from './consignment-arrangements'
import ConsignmentInventory from './consignment-inventory'
import ConsignmentSales from './consignment-sales'
import BookableResources from './bookable-resources'
import Bookings from './bookings'
import Properties from './properties'
import Spaces from './spaces'
import MaintenanceRequests from './maintenance-requests'
import MaintenanceWorkOrders from './maintenance-work-orders'

// Addresses (CRM-related)
import Addresses from './addresses'

// Export all collections
export {
  GLAccounts, JournalEntries, GLPostings,
  AccountReconciliations, BankReconciliations, BankStatements, BankAccounts, BankTransactions,
  FinancialStatements, PeriodEndAdjustments, RecurringJournals, Provisions, CommitmentsAndContingencies, GovernmentGrants,
  TaxCalculations, CurrencyRates,
  FixedAssets, BudgetPlanning, Customers, Vendors, TaxJurisdictions, TaxCodes, FiscalPeriods, CostCenters, LegalEntities,
  Standards, Memories, McpToolMetadata, Translations,
  AuditEvents, CreditMemos, Quotes, SalesOrders, Returns, Shipments, Refunds,
  PurchaseOrders, GoodsReceipts, PurchaseRequisitions, VendorQuotes, VendorScorecards,
  PaymentRuns, SepaMandates, DunningCycles, PaymentAllocations, Leases,
  Contracts, PerformanceObligations,
  DepreciationSchedules,
  ConsentRecords, DataSubjectRequests, DataProcessingActivities,
  AuditFindings, ControlTests,
  KycChecks, BeneficialOwners,
  TaxReturns,
  WarehouseLocations, InventoryMovements,
  ApiAuditEvents, EvidenceAttestations,
  Employees, TimeEntries, PayrollRuns,
  LeasePeriodPostings,
  IntercompanyTransactions, ConsolidationEliminations, PriorPeriodAdjustments, RoundingAdjustments,
  FxTransactions, TransactionFailures,
  BillsOfMaterials, WorkOrders, ProductionReceipts, CostVariances, QualityInspections, Carriers, TrackingEvents, CustomsDeclarations,
  UsageRecords,
  AiSuggestions,
  Projects, ProjectTasks, ProjectMilestones, WipSnapshots,
  CsrdDisclosures, CarbonEmissions, TransferPricingFiles,
  LeaseModifications,
  Leads, Opportunities, Activities, CustomerSegments, SalesCommissions,
  JobPositions, RecruitingPipeline, PerformanceReviews, ExpenseReports, LeaveRequests,
  WorkflowDefinitions, WorkflowInstances,
  DeferredTaxItems, ShareBasedPayments, BusinessCombinations, HeldForSaleClassifications, FairValueMeasurements,
  InvestmentProperties, BiologicalAssets, EarningsPerShare, InsuranceContracts, MineralResourceAssets,
  RegulatoryDeferralAccounts, PostBalanceSheetEvents,
  ConsignmentArrangements, ConsignmentInventory, ConsignmentSales,
  BookableResources, Bookings, Properties, Spaces, MaintenanceRequests, MaintenanceWorkOrders,
  Addresses,
}

// Collections array for plugin.ts
export const collections = [
  GLAccounts, JournalEntries, GLPostings,
  AccountReconciliations, BankReconciliations, BankStatements, BankAccounts, BankTransactions,
  FinancialStatements, PeriodEndAdjustments, RecurringJournals, Provisions, CommitmentsAndContingencies, GovernmentGrants,
  TaxCalculations, CurrencyRates,
  FixedAssets, BudgetPlanning, Customers, Vendors, TaxJurisdictions, TaxCodes, FiscalPeriods, CostCenters, LegalEntities,
  Standards, Memories, McpToolMetadata, Translations,
  AuditEvents, CreditMemos, Quotes, SalesOrders, Returns, Shipments, Refunds,
  PurchaseOrders, GoodsReceipts, PurchaseRequisitions, VendorQuotes, VendorScorecards,
  PaymentRuns, SepaMandates, DunningCycles, PaymentAllocations, Leases,
  Contracts, PerformanceObligations,
  DepreciationSchedules,
  ConsentRecords, DataSubjectRequests, DataProcessingActivities,
  AuditFindings, ControlTests,
  KycChecks, BeneficialOwners,
  TaxReturns,
  WarehouseLocations, InventoryMovements,
  ApiAuditEvents, EvidenceAttestations,
  Employees, TimeEntries, PayrollRuns,
  LeasePeriodPostings,
  IntercompanyTransactions, ConsolidationEliminations, PriorPeriodAdjustments, RoundingAdjustments,
  FxTransactions, TransactionFailures,
  BillsOfMaterials, WorkOrders, ProductionReceipts, CostVariances, QualityInspections, Carriers, TrackingEvents, CustomsDeclarations,
  UsageRecords,
  AiSuggestions,
  Projects, ProjectTasks, ProjectMilestones, WipSnapshots,
  CsrdDisclosures, CarbonEmissions, TransferPricingFiles,
  LeaseModifications,
  Leads, Opportunities, Activities, CustomerSegments, SalesCommissions,
  JobPositions, RecruitingPipeline, PerformanceReviews, ExpenseReports, LeaveRequests,
  WorkflowDefinitions, WorkflowInstances,
  DeferredTaxItems, ShareBasedPayments, BusinessCombinations, HeldForSaleClassifications, FairValueMeasurements,
  InvestmentProperties, BiologicalAssets, EarningsPerShare, InsuranceContracts, MineralResourceAssets,
  RegulatoryDeferralAccounts, PostBalanceSheetEvents,
  ConsignmentArrangements, ConsignmentInventory, ConsignmentSales,
  BookableResources, Bookings, Properties, Spaces, MaintenanceRequests, MaintenanceWorkOrders,
  Addresses,
]
