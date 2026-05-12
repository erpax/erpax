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
import AccountReconciliations from './accountreconciliations'
import BankReconciliations from './bankreconciliations'
import BankStatements from './bankstatements'
import BankAccounts from './bankaccounts'
import BankTransactions from './banktransactions'

// Close-side & Period-End
import FinancialStatements from './financialstatements'
import PeriodEndAdjustments from './periodendadjustments'
import RecurringJournals from './recurringjournals'
import Provisions from './provisions'
import CommitmentsAndContingencies from './commitmentsandcontingencies'
import GovernmentGrants from './governmentgrants'

// Tax & Currency
import TaxCalculations from './taxcalculations'
import CurrencyRates from './currencyrates'

// Masters & Real Entities
import FixedAssets from './fixedassets'
import BudgetPlanning from './budgetplanning'
import Customers from './receivables/customers'
import Vendors from './vendors'
import TaxJurisdictions from './taxjurisdictions'
import TaxCodes from './taxcodes'
import FiscalPeriods from './fiscalperiods'
import CostCenters from './costcenters'
import LegalEntities from './legalentities'

// Infrastructure
import Standards from './standards'
import Memories from './memories'
import McpToolMetadata from './mcptoolmetadata'
import Translations from './translations'

// O2C (Order to Cash)
import AuditEvents from './auditevents'
import CreditMemos from './receivables/creditmemos'
import Quotes from './quotes'
import SalesOrders from './salesorders'
import Returns from './returns'
import Shipments from './shipments'
import Refunds from './refunds'

// P2P & Three-way Match
import PurchaseOrders from './purchaseorders'
import GoodsReceipts from './goodsreceipts'
import PurchaseRequisitions from './purchaserequisitions'
import VendorQuotes from './vendorquotes'
import VendorScorecards from './vendorscorecards'

// Master Banking & Payments
import PaymentRuns from './paymentruns'
import SepaMandates from './sepamandates'
import DunningCycles from './receivables/dunningcycles'
import PaymentAllocations from './receivables/paymentallocations'
import Leases from './leases'

// Revenue Contracts
import Contracts from './contracts'
import PerformanceObligations from './performanceobligations'

// PP&E
import DepreciationSchedules from './deprecationschedules'

// GDPR
import ConsentRecords from './consentrecords'
import DataSubjectRequests from './datasubjectrequests'
import DataProcessingActivities from './dataprocessingactivities'

// SOX §404
import AuditFindings from './auditfindings'
import ControlTests from './controltests'

// AML/KYC
import KycChecks from './kycchecks'
import BeneficialOwners from './beneficialowners'

// Tax Filing
import TaxReturns from './taxreturns'

// Inventory
import WarehouseLocations from './warehouselocationss'
import InventoryMovements from './inventorymovements'

// API & Evidence
import ApiAuditEvents from './apiauditevents'
import EvidenceAttestations from './evidenceattestations'

// Payroll
import Employees from './employees'
import TimeEntries from './timeentries'
import PayrollRuns from './payrollruns'

// IFRS 16
import LeasePeriodPostings from './leaseperiodpostings'

// Intercompany & Consolidation
import IntercompanyTransactions from './intercompanytransactions'
import ConsolidationEliminations from './consolidationeliminations'
import PriorPeriodAdjustments from './priorperiodadjustments'
import RoundingAdjustments from './roundingadjustments'

// FX & Transactions
import FxTransactions from './fxtransactions'
import TransactionFailures from './transactionfailures'

// Manufacturing & Logistics
import BillsOfMaterials from './billsofmaterials'
import WorkOrders from './workorders'
import ProductionReceipts from './productionreceipts'
import CostVariances from './costvariances'
import QualityInspections from './qualityinspections'
import Carriers from './carriers'
import TrackingEvents from './trackingevents'
import CustomsDeclarations from './customsdeclarations'

// Billing Infrastructure
import UsageRecords from './usagerecords'

// AI Audit Trail
import AiSuggestions from './aisuggestions'

// Group Structure
import Projects from './projects'
import ProjectTasks from './projecttasks'
import ProjectMilestones from './projectmilestones'
import WipSnapshots from './wipsnapshots'

// ESG & Transfer Pricing
import CsrdDisclosures from './csrddisclosures'
import CarbonEmissions from './carbonemissions'
import TransferPricingFiles from './transferpricingfiles'

// IFRS 16 Extensions
import LeaseModifications from './leasemodifications'

// CRM
import Leads from './receivables/leads'
import Opportunities from './receivables/opportunities'
import Activities from './activities'
import CustomerSegments from './receivables/customersegments'
import SalesCommissions from './receivables/salescommissions'

// HR Extensions
import JobPositions from './jobpositions'
import RecruitingPipeline from './recruitingpipeline'
import PerformanceReviews from './performancereviews'
import ExpenseReports from './expensereports'
import LeaveRequests from './leaverequests'

// Workflow Engine
import WorkflowDefinitions from './workflowdefinitions'
import WorkflowInstances from './workflowinstances'

// IFRS 100% Gap-Fill
import DeferredTaxItems from './deferredtaxitems'
import ShareBasedPayments from './sharebasedpayments'
import BusinessCombinations from './businesscombinations'
import HeldForSaleClassifications from './heldforsaleclassifications'
import FairValueMeasurements from './fairvaluemeasurements'
import InvestmentProperties from './investmentproperties'
import BiologicalAssets from './biologicalassets'
import EarningsPerShare from './earningsperShare'
import InsuranceContracts from './insurancecontracts'
import MineralResourceAssets from './mineralresourceassets'
import RegulatoryDeferralAccounts from './regulatorydeferralaccounts'
import PostBalanceSheetEvents from './postbalancesheetevents'

// Consignments & Facility Management
import ConsignmentArrangements from './consignmentarrangements'
import ConsignmentInventory from './consignmentinventory'
import ConsignmentSales from './consignmentsales'
import BookableResources from './bookableresources'
import Bookings from './bookings'
import Properties from './properties'
import Spaces from './spaces'
import MaintenanceRequests from './maintenancerequests'
import MaintenanceWorkOrders from './maintenanceworkorders'

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
