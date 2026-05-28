/**
 * ERPAX Collections Index
 *
 * Flat, agnostic organization by data type, not domain:
 * - Core: Multi-tenancy, users, roles
 * - Content: CMS pages, posts, media, categories
 * - Billing: Invoices, payments, subscriptions
 * - Inventory & Orders: Items, POs, shipments, returns
 * - Financial: GL, Journals, Banking, Reconciliation, Tax, Compliance
 * - People: Employees, payroll, recruitment, performance
 * - Master Data: Customers, vendors, contracts, assets
 * - Operational: Projects, workflows, maintenance, warehouses
 *
 * No artificial domain prefixes—organize by actual data relationships.
 * Module boundaries clear for future plugin extraction.
 */

// Core Collections
export { Tenants } from './Tenants'
export { Users } from './Users'
export { Roles } from './Roles'
export { UserRoles } from './UserRoles'

// Content Collections
export { Pages } from './Pages'
export { Posts } from './Posts'
export { Media } from './Media'
export { Categories } from './Categories'

// Billing Collections
export { Invoices } from './Invoices'
export { InvoiceLines } from './InvoiceLines'
export { PaymentMethods } from './PaymentMethods'
export { Payments } from './Payments'
export { SubscriptionPlans } from './SubscriptionPlans'
export { Subscriptions } from './Subscriptions'

// Inventory Collections
export { Items } from './Items'

// ===== FLAT FINANCIAL & OPERATIONAL COLLECTIONS =====
// All flattened from accounting/ domain silo. Organized by actual concern.

// GL Core
export { default as GLAccounts } from './GLAccounts'
export { GLPostingRules } from './GLPostingRules'
export { default as JournalEntries } from './JournalEntries'
export { default as GLPostings } from './GLPostings'

// GL Lifecycle & Closing (Phase A1: Double-Entry & Period Locks)
export { PeriodLocks } from './PeriodLocks'
export { ClosingEntries } from './ClosingEntries'

// Banking & Reconciliation
export { default as BankStatements } from './BankStatements'
export { default as BankTransactions } from './BankTransactions'
export { default as BankAccounts } from './BankAccounts'
export { default as AccountReconciliations } from './AccountReconciliations'
export { default as BankReconciliations } from './BankReconciliations'

// Period Closing & Adjustments
export { default as FinancialStatements } from './FinancialStatements'
export { default as PeriodEndAdjustments } from './PeriodEndAdjustments'
export { default as RecurringJournals } from './RecurringJournals'
export { default as PriorPeriodAdjustments } from './PriorPeriodAdjustments'
export { default as RoundingAdjustments } from './RoundingAdjustments'

// Tax, Currency & Fiscal
export { default as TaxCalculations } from './TaxCalculations'
export { TaxCodes } from './TaxCodes'
export { TaxJurisdictions } from './TaxJurisdictions'
export { default as TaxReturns } from './TaxReturns'
export { default as CurrencyRates } from './CurrencyRates'

// Fiscal Period Management (Phase B1: Fiscal Period Flexibility)
export { FiscalPeriods } from './FiscalPeriods'
export { FiscalCalendars } from './FiscalCalendars'
export { FiscalPeriodSnapshots } from './FiscalPeriodSnapshots'

// Fixed Assets & Depreciation
export { default as FixedAssets } from './FixedAssets'
export { default as DepreciationSchedules } from './DepreciationSchedules'

// Master Data: Customers & Revenue
export { Customers } from './Customers'
export { default as Leads } from './Leads'
export { default as Opportunities } from './Opportunities'
export { default as CustomerSegments } from './CustomerSegments'
export { default as Quotes } from './Quotes'
export { default as SalesOrders } from './SalesOrders'
export { default as SalesCommissions } from './SalesCommissions'

// Order-to-Cash
export { default as CreditMemos } from './CreditMemos'
export { default as Returns } from './Returns'
export { default as Shipments } from './Shipments'
export { default as Refunds } from './Refunds'
export { default as PaymentAllocations } from './PaymentAllocations'

// Dunning & Collections
export { default as DunningCycles } from './DunningCycles'

// Master Data: Vendors & Procurement
export { Vendors } from './Vendors'
export { default as VendorQuotes } from './VendorQuotes'
export { default as VendorScorecards } from './VendorScorecards'

// Procurement: Purchase-to-Pay
export { default as PurchaseOrders } from './PurchaseOrders'
export { default as PurchaseRequisitions } from './PurchaseRequisitions'
export { default as GoodsReceipts } from './GoodsReceipts'

// Inventory & Warehouse
export { default as InventoryMovements } from './InventoryMovements'
export { default as WarehouseLocations } from './WarehouseLocations'

// Cost & Budget
export { default as CostCenters } from './CostCenters'
export { default as BudgetPlanning } from './BudgetPlanning'
export { default as CostVariances } from './CostVariances'

// Intercompany & Consolidation
export { default as IntercompanyTransactions } from './IntercompanyTransactions'
export { default as ConsolidationEliminations } from './ConsolidationEliminations'

// Foreign Exchange
export { default as FxTransactions } from './FxTransactions'

// Contracts & Obligations
export { default as Contracts } from './Contracts'
export { default as PerformanceObligations } from './PerformanceObligations'
export { default as CommitmentsAndContingencies } from './CommitmentsAndContingencies'

// Leases
export { default as Leases } from './Leases'
export { default as LeaseModifications } from './LeaseModifications'
export { default as LeasePeriodPostings } from './LeasePeriodPostings'

// Payments & Settlements
export { default as PaymentRuns } from './PaymentRuns'
export { default as SepaMandates } from './SepaMandates'

// Payroll
export { default as PayrollRuns } from './PayrollRuns'

// People & HR
export { default as Employees } from './Employees'
export { default as JobPositions } from './JobPositions'
export { default as TimeEntries } from './TimeEntries'
export { default as LeaveRequests } from './LeaveRequests'
export { default as PerformanceReviews } from './PerformanceReviews'
export { default as ExpenseReports } from './ExpenseReports'
export { default as RecruitingPipeline } from './RecruitingPipeline'
export { default as Activities } from './Activities'

// Operations & Projects
export { default as Projects } from './Projects'
export { default as ProjectTasks } from './ProjectTasks'
export { default as ProjectMilestones } from './ProjectMilestones'
export { default as WorkOrders } from './WorkOrders'
export { default as WorkflowDefinitions } from './WorkflowDefinitions'
export { default as WorkflowInstances } from './WorkflowInstances'

// Manufacturing
export { default as BillsOfMaterials } from './BillsOfMaterials'
export { default as ProductionReceipts } from './ProductionReceipts'
export { default as QualityInspections } from './QualityInspections'
export { default as WipSnapshots } from './WipSnapshots'
export { default as WorkCenters } from './WorkCenters'
export { default as WorkShifts } from './WorkShifts'
export { default as Operations } from './Operations'
export { default as Routings } from './Routings'

// Facilities & Resources
export { default as Properties } from './Properties'
export { default as Spaces } from './Spaces'
export { default as MaintenanceRequests } from './MaintenanceRequests'
export { default as MaintenanceWorkOrders } from './MaintenanceWorkOrders'
export { default as BookableResources } from './BookableResources'
export { default as Bookings } from './Bookings'

// Logistics & Tracking
export { default as Carriers } from './Carriers'
export { default as TrackingEvents } from './TrackingEvents'
export { default as CustomsDeclarations } from './CustomsDeclarations'
export { default as ConsignmentArrangements } from './ConsignmentArrangements'
export { default as ConsignmentInventory } from './ConsignmentInventory'
export { default as ConsignmentSales } from './ConsignmentSales'

// Compliance, Audit & Evidence (Legacy)
export { default as AuditEvents } from './AuditEvents'
export { default as ApiAuditEvents } from './ApiAuditEvents'
export { default as EvidenceAttestations } from './EvidenceAttestations'

// ===== COMPREHENSIVE COMPLIANCE & AUDIT FRAMEWORK (Phase 1-5) =====
// 28 collections spanning GAAP, IFRS, SOX, multi-jurisdiction, multi-entity compliance

// Phase 1: Compliance Foundation (7 collections)
export { EntityTypes } from './Phase1/EntityTypes'
export { TaxingJurisdictions } from './Phase1/TaxingJurisdictions'
export { EntityLegalStructures } from './Phase1/EntityLegalStructures'
export { ComplianceFrameworks } from './Phase1/ComplianceFrameworks'
export { ComplianceRequirements } from './Phase1/ComplianceRequirements'
export { InternalControls } from './Phase1/InternalControls'
export { ControlTests } from './Phase1/ControlTests'

// Phase 2-3: Control & Testing, Evidence & Findings (6 collections)
export { AuditSamples } from './Phase2-3/AuditSamples'
export { ComplianceGaps } from './Phase2-3/ComplianceGaps'
export { AuditEvidence } from './Phase2-3/AuditEvidence'
export { AuditFindings } from './Phase2-3/AuditFindings'
export { AuditTrailEvents } from './Phase2-3/AuditTrailEvents'
export { RemediationPlans } from './Phase2-3/RemediationPlans'

// Phase 4: Audit Governance & Reporting (5 collections)
export { AuditCommittees } from './Phase4/AuditCommittees'
export { AuditCommitteeMembers } from './Phase4/AuditCommitteeMembers'
export { BoardActions } from './Phase4/BoardActions'
export { ManagementCertifications } from './Phase4/ManagementCertifications'
export { RegulatoryReports } from './Phase4/RegulatoryReports'

// Phase 5: Compliance Policies & Calendars (9 collections)
export { InternalPolicies } from './Phase5/InternalPolicies'
export { StatutoryReportTemplates } from './Phase5/StatutoryReportTemplates'
export { StatutoryFieldMappings } from './Phase5/StatutoryFieldMappings'
export { PolicyVersions } from './Phase5/PolicyVersions'
export { PolicyAcknowledgments } from './Phase5/PolicyAcknowledgments'
export { ComplianceDeadlines } from './Phase5/ComplianceDeadlines'
export { ComplianceNotifications } from './Phase5/ComplianceNotifications'
export { ReportingStandards } from './Phase5/ReportingStandards'
export { ReportingMappings } from './Phase5/ReportingMappings'

// Phase 6: Risk, Disclosure & Audit Extension (8 collections)
export { RelatedPartyTransactions } from './Phase6/RelatedPartyTransactions'
export { ManagementAssessmentICFR } from './Phase6/ManagementAssessmentICFR'
export { DisclosureChecklists } from './Phase6/DisclosureChecklists'
export { AuditCommitteeMinutes } from './Phase6/AuditCommitteeMinutes'
export { RiskRegister } from './Phase6/RiskRegister'
export { DebtSchedule } from './Phase6/DebtSchedule'
export { InternalAuditFunction } from './Phase6/InternalAuditFunction'
export { SegmentReporting } from './Phase6/SegmentReporting'

// GDPR & Data Privacy
export { default as ConsentRecords } from './ConsentRecords'
export { default as DataSubjectRequests } from './DataSubjectRequests'
export { default as DataProcessingActivities } from './DataProcessingActivities'

// AML / KYC
export { default as KycChecks } from './KycChecks'
export { default as BeneficialOwners } from './BeneficialOwners'

// Sustainability & ESG
export { default as CsrdDisclosures } from './CsrdDisclosures'
export { default as CarbonEmissions } from './CarbonEmissions'

// Specialized Assets
export { default as BiologicalAssets } from './BiologicalAssets'
export { default as MineralResourceAssets } from './MineralResourceAssets'
export { default as InvestmentProperties } from './InvestmentProperties'

// Financial Accounting Specialties
export { default as Provisions } from './Provisions'
export { default as GovernmentGrants } from './GovernmentGrants'
export { default as DeferredTaxItems } from './DeferredTaxItems'
export { default as ShareBasedPayments } from './ShareBasedPayments'
export { default as BusinessCombinations } from './BusinessCombinations'
export { default as HeldForSaleClassifications } from './HeldForSaleClassifications'
export { default as FairValueMeasurements } from './FairValueMeasurements'
export { default as EarningsPerShare } from './EarningsPerShare'
export { default as InsuranceContracts } from './InsuranceContracts'
export { default as RegulatoryDeferralAccounts } from './RegulatoryDeferralAccounts'
export { default as PostBalanceSheetEvents } from './PostBalanceSheetEvents'
export { default as TransactionFailures } from './TransactionFailures'

// Transfer Pricing
export { default as TransferPricingFiles } from './TransferPricingFiles'

// Infrastructure: Metadata, Standards, Translations
export { default as Standards } from './Standards'
export { default as Memories } from './Memories'
export { default as McpToolMetadata } from './McpToolMetadata'
export { default as Translations } from './Translations'

// CRM-related (from ecommerce plugin)

// Contract Extensions
export { default as commitments } from './commitments'
export { default as contractAmendments } from './contract-amendments'
export { default as contractPerformance } from './contract-performance'
export { default as contractSignatures } from './contract-signatures'
export { default as contractTemplates } from './contract-templates'

// Miscellaneous
export { default as LegalEntities } from './LegalEntities'
export { default as AiSuggestions } from './AiSuggestions'
export { default as UsageRecords } from './UsageRecords'
