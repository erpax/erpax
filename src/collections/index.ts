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
export { UserRoles } from './Roles/UserRoles'

// Content Collections
export { Pages } from './Pages'
export { Posts } from './Posts'
export { Media } from './Media'
export { Categories } from './Categories'

// Billing Collections
export { Invoices } from './Invoices'
export { InvoiceLines } from './Invoices/InvoiceLines'
export { PaymentMethods } from './PaymentMethods'
export { Payments } from './Invoices/Payments'
export { SubscriptionPlans } from './SubscriptionPlans'
export { Subscriptions } from './SubscriptionPlans/Subscriptions'

// Inventory Collections
export { Items } from './Items'

// ===== FLAT FINANCIAL & OPERATIONAL COLLECTIONS =====
// All flattened from accounting/ domain silo. Organized by actual concern.

// GL Core
export { default as GLAccounts } from './GLAccounts'
export { GLPostingRules } from './GLPostingRules'
export { default as JournalEntries } from './JournalEntries'
export { default as GLPostings } from './JournalEntries/GLPostings'

// GL Lifecycle & Closing (Phase A1: Double-Entry & Period Locks)
export { PeriodLocks } from './PeriodLocks'
export { ClosingEntries } from './LegalEntities/ClosingEntries'

// Banking & Reconciliation
export { default as BankStatements } from './GLAccounts/BankStatements'
export { default as BankTransactions } from './BankAccounts/BankTransactions'
export { default as BankAccounts } from './BankAccounts'
export { default as AccountReconciliations } from './GLAccounts/AccountReconciliations'
export { default as BankReconciliations } from './BankAccounts/BankReconciliations'

// Period Closing & Adjustments
export { default as FinancialStatements } from './FinancialStatements'
export { default as PeriodEndAdjustments } from './GLAccounts/PeriodEndAdjustments'
export { default as RecurringJournals } from './GLAccounts/RecurringJournals'
export { default as PriorPeriodAdjustments } from './FiscalPeriods/PriorPeriodAdjustments'
export { default as RoundingAdjustments } from './JournalEntries/RoundingAdjustments'

// Tax, Currency & Fiscal
export { default as TaxCalculations } from './GLAccounts/TaxCalculations'
export { TaxCodes } from './TaxJurisdictions/TaxCodes'
export { TaxJurisdictions } from './TaxJurisdictions'
export { default as TaxReturns } from './TaxJurisdictions/TaxReturns'
export { default as CurrencyRates } from './CurrencyRates'

// Fiscal Period Management (Phase B1: Fiscal Period Flexibility)
export { FiscalPeriods } from './FiscalPeriods'
export { FiscalCalendars } from './LegalEntities/FiscalCalendars'
export { FiscalPeriodSnapshots } from './FiscalPeriods/FiscalPeriodSnapshots'

// Fixed Assets & Depreciation
export { default as FixedAssets } from './FixedAssets'
export { default as DepreciationSchedules } from './FixedAssets/DepreciationSchedules'

// Master Data: Customers & Revenue
export { Customers } from './Customers'
export { default as Leads } from './Leads'
export { default as Opportunities } from './Leads/Opportunities'
export { default as CustomerSegments } from './CustomerSegments'
export { default as Quotes } from './Customers/Quotes'
export { default as SalesOrders } from './Customers/SalesOrders'
export { default as SalesCommissions } from './Employees/SalesCommissions'

// Order-to-Cash
export { default as CreditMemos } from './Invoices/CreditMemos'
export { default as Returns } from './Customers/SalesOrders/Returns'
export { default as Shipments } from './Customers/SalesOrders/Shipments'
export { default as Refunds } from './Invoices/CreditMemos/Refunds'
export { default as PaymentAllocations } from './Invoices/Payments/PaymentAllocations'

// Dunning & Collections
export { default as DunningCycles } from './Invoices/DunningCycles'

// Master Data: Vendors & Procurement
export { Vendors } from './Vendors'
export { default as VendorQuotes } from './Vendors/VendorQuotes'
export { default as VendorScorecards } from './Vendors/VendorScorecards'

// Procurement: Purchase-to-Pay
export { default as PurchaseOrders } from './Items/PurchaseOrders'
export { default as PurchaseRequisitions } from './CostCenters/PurchaseRequisitions'
export { default as GoodsReceipts } from './Items/PurchaseOrders/GoodsReceipts'

// Inventory & Warehouse
export { default as InventoryMovements } from './Items/InventoryMovements'
export { default as WarehouseLocations } from './WarehouseLocations'

// Cost & Budget
export { default as CostCenters } from './CostCenters'
export { default as BudgetPlanning } from './BudgetPlanning'
export { default as CostVariances } from './Items/BillsOfMaterials/WorkOrders/CostVariances'

// Intercompany & Consolidation
export { default as IntercompanyTransactions } from './LegalEntities/IntercompanyTransactions'
export { default as ConsolidationEliminations } from './ConsolidationEliminations'

// Foreign Exchange
export { default as FxTransactions } from './FxTransactions'

// Contracts & Obligations
export { default as Contracts } from './Customers/Contracts'
export { default as PerformanceObligations } from './Customers/Contracts/PerformanceObligations'
export { default as CommitmentsAndContingencies } from './CommitmentsAndContingencies'

// Leases
export { default as Leases } from './Leases'
export { default as LeaseModifications } from './Leases/LeaseModifications'
export { default as LeasePeriodPostings } from './Leases/LeasePeriodPostings'

// Payments & Settlements
export { default as PaymentRuns } from './BankAccounts/PaymentRuns'
export { default as SepaMandates } from './Media/SepaMandates'

// Payroll
export { default as PayrollRuns } from './BankAccounts/PayrollRuns'

// People & HR
export { default as Employees } from './Employees'
export { default as Competencies } from './Competencies'
export { default as Connections } from './Connections'
export { default as Sectors } from './Sectors'
export { default as JobPositions } from './CostCenters/JobPositions'
export { default as TimeEntries } from './Employees/TimeEntries'
export { default as LeaveRequests } from './Employees/LeaveRequests'
export { default as PerformanceReviews } from './Employees/PerformanceReviews'
export { default as ExpenseReports } from './Employees/ExpenseReports'
export { default as RecruitingPipeline } from './CostCenters/JobPositions/RecruitingPipeline'
export { default as Activities } from './Activities'

// Operations & Projects
export { default as Projects } from './Customers/Projects'
export { default as ProjectTasks } from './Customers/Projects/ProjectTasks'
export { default as ProjectMilestones } from './Customers/Projects/ProjectMilestones'
export { default as WorkOrders } from './Items/BillsOfMaterials/WorkOrders'
export { default as WorkflowDefinitions } from './WorkflowDefinitions'
export { default as WorkflowInstances } from './WorkflowDefinitions/WorkflowInstances'

// Manufacturing
export { default as BillsOfMaterials } from './Items/BillsOfMaterials'
export { default as Batches } from './Items/Batches'
export { default as ProductionReceipts } from './Items/BillsOfMaterials/WorkOrders/ProductionReceipts'
export { default as QualityInspections } from './Items/QualityInspections'
export { default as WipSnapshots } from './Customers/Projects/WipSnapshots'
export { default as WorkCenters } from './WorkCenters'
export { default as WorkShifts } from './Employees/WorkShifts'
export { default as Operations } from './WorkCenters/Operations'
export { default as Routings } from './Items/BillsOfMaterials/WorkOrders/Routings'
export { default as OperationRuns } from './Items/BillsOfMaterials/WorkOrders/OperationRuns'

// Tagging system (anything is taggable — less collections, more features)
export { default as Tags } from './Tags'
export { default as Taggings } from './Tags/Taggings'

// Facilities & Resources
export { default as Properties } from './Properties'
export { default as Spaces } from './Properties/Spaces'
export { default as MaintenanceRequests } from './MaintenanceRequests'
export { default as MaintenanceWorkOrders } from './MaintenanceWorkOrders'
export { default as BookableResources } from './BookableResources'
export { default as Bookings } from './BookableResources/Bookings'

// Logistics & Tracking
export { default as Carriers } from './Carriers'
export { default as TrackingEvents } from './Customers/SalesOrders/Shipments/TrackingEvents'
export { default as CustomsDeclarations } from './Customers/SalesOrders/Shipments/CustomsDeclarations'
export { default as ConsignmentArrangements } from './WarehouseLocations/ConsignmentArrangements'
export { default as ConsignmentInventory } from './WarehouseLocations/ConsignmentArrangements/ConsignmentInventory'
export { default as ConsignmentSales } from './WarehouseLocations/ConsignmentArrangements/ConsignmentSales'

// Compliance, Audit & Evidence (Legacy)
export { default as AuditEvents } from './AuditEvents'
export { default as ApiAuditEvents } from './ApiAuditEvents'
export { default as EvidenceAttestations } from './EvidenceAttestations'

// ===== COMPREHENSIVE COMPLIANCE & AUDIT FRAMEWORK (Phase 1-5) =====
// 28 collections spanning GAAP, IFRS, SOX, multi-jurisdiction, multi-entity compliance

// Phase 1: Compliance Foundation (7 collections)
export { EntityTypes } from './EntityTypes'
export { TaxingJurisdictions } from './TaxingJurisdictions'
export { EntityLegalStructures } from './TaxingJurisdictions/EntityLegalStructures'
export { ComplianceFrameworks } from './ComplianceFrameworks'
export { ComplianceRequirements } from './ComplianceFrameworks/ComplianceRequirements'
export { InternalControls } from './InternalControls'
export { ControlTests } from './InternalControls/ControlTests'

// Phase 2-3: Control & Testing, Evidence & Findings (6 collections)
export { AuditSamples } from './InternalControls/ControlTests/AuditSamples'
export { ComplianceGaps } from './ComplianceFrameworks/ComplianceRequirements/ComplianceGaps'
export { AuditEvidence } from './Media/AuditEvidence'
export { AuditFindings } from './InternalControls/AuditFindings'
export { AuditTrailEvents } from './AuditTrailEvents'
export { RemediationPlans } from './InternalControls/AuditFindings/RemediationPlans'

// Phase 4: Audit Governance & Reporting (5 collections)
export { AuditCommittees } from './LegalEntities/AuditCommittees'
export { AuditCommitteeMembers } from './LegalEntities/AuditCommittees/AuditCommitteeMembers'
export { BoardActions } from './LegalEntities/BoardActions'
export { ManagementCertifications } from './LegalEntities/ManagementCertifications'
export { RegulatoryReports } from './LegalEntities/RegulatoryReports'

// Phase 5: Compliance Policies & Calendars (9 collections)
export { InternalPolicies } from './InternalPolicies'
export { StatutoryReportTemplates } from './TaxingJurisdictions/StatutoryReportTemplates'
export { StatutoryFieldMappings } from './TaxingJurisdictions/StatutoryReportTemplates/StatutoryFieldMappings'
export { PolicyVersions } from './InternalPolicies/PolicyVersions'
export { PolicyAcknowledgments } from './InternalPolicies/PolicyAcknowledgments'
export { ComplianceDeadlines } from './LegalEntities/ComplianceDeadlines'
export { ComplianceNotifications } from './LegalEntities/ComplianceDeadlines/ComplianceNotifications'
export { ReportingStandards } from './TaxingJurisdictions/ReportingStandards'
export { ReportingMappings } from './TaxingJurisdictions/ReportingStandards/ReportingMappings'

// Phase 6: Risk, Disclosure & Audit Extension (8 collections)
export { RelatedPartyTransactions } from './LegalEntities/RelatedPartyTransactions'
export { ManagementAssessmentICFR } from './LegalEntities/ManagementAssessmentICFR'
export { DisclosureChecklists } from './LegalEntities/DisclosureChecklists'
export { AuditCommitteeMinutes } from './LegalEntities/AuditCommittees/AuditCommitteeMinutes'
export { RiskRegister } from './LegalEntities/RiskRegister'
export { DebtSchedule } from './LegalEntities/DebtSchedule'
export { InternalAuditFunction } from './LegalEntities/InternalAuditFunction'
export { SegmentReporting } from './LegalEntities/SegmentReporting'

// GDPR & Data Privacy
export { default as ConsentRecords } from './ConsentRecords'
export { default as DataSubjectRequests } from './DataSubjectRequests'
export { default as DataProcessingActivities } from './DataProcessingActivities'

// AML / KYC
export { default as KycChecks } from './Customers/KycChecks'
export { default as BeneficialOwners } from './LegalEntities/BeneficialOwners'

// Logistics & packing
export { default as Packages } from './Items/Packages'

// Treasury & disbursement controls
export { default as PaymentRequests } from './Vendors/PaymentRequests'

// Integrations & messaging
export { default as GatewayEvents } from './GatewayEvents'
export { default as Messages } from './Messages'

// Sustainability & ESG
export { default as CsrdDisclosures } from './CsrdDisclosures'
export { default as CarbonEmissions } from './FiscalPeriods/CarbonEmissions'

// Specialized Assets
export { default as BiologicalAssets } from './BiologicalAssets'
export { default as MineralResourceAssets } from './MineralResourceAssets'
export { default as InvestmentProperties } from './Properties/InvestmentProperties'

// Financial Accounting Specialties
export { default as Provisions } from './FiscalPeriods/Provisions'
export { default as GovernmentGrants } from './GovernmentGrants'
export { default as DeferredTaxItems } from './TaxJurisdictions/DeferredTaxItems'
export { default as ShareBasedPayments } from './Employees/ShareBasedPayments'
export { default as BusinessCombinations } from './LegalEntities/BusinessCombinations'
export { default as HeldForSaleClassifications } from './HeldForSaleClassifications'
export { default as FairValueMeasurements } from './FairValueMeasurements'
export { default as EarningsPerShare } from './FiscalPeriods/EarningsPerShare'
export { default as InsuranceContracts } from './InsuranceContracts'
export { default as RegulatoryDeferralAccounts } from './RegulatoryDeferralAccounts'
export { default as PostBalanceSheetEvents } from './FiscalPeriods/PostBalanceSheetEvents'
export { default as TransactionFailures } from './TransactionFailures'

// Transfer Pricing
export { default as TransferPricingFiles } from './LegalEntities/TransferPricingFiles'

// Infrastructure: Metadata, Standards, Translations
export { default as Standards } from './Standards'
export { default as Memories } from './Memories'
export { default as McpToolMetadata } from './McpToolMetadata'
export { default as Translations } from './Translations'

// CRM-related (from ecommerce plugin)

// Contract Extensions
export { default as commitments } from './commitments'
export { default as contractAmendments } from './Customers/Contracts/contract-amendments'
export { default as contractPerformance } from './Customers/Contracts/contract-performance'
export { default as contractSignatures } from './Customers/Contracts/contract-signatures'
export { default as contractTemplates } from './contract-templates'

// Miscellaneous
export { default as LegalEntities } from './LegalEntities'
export { default as AiSuggestions } from './AiSuggestions'
export { default as UsageRecords } from './SubscriptionPlans/Subscriptions/UsageRecords'

// Fiscal sales core (Наредба Н-18 compliant)
export { default as FiscalDevices } from './FiscalDevices'
export { default as Sales } from './FiscalDevices/Sales'
export { default as Receipts } from './Receipts'
export { default as Operators } from './Operators'
export { default as Terminals } from './Terminals'
export { default as AuditSubmissions } from './AuditSubmissions'

// Close-side analysis & compliance (named exports)
export { Consolidations } from './LegalEntities/Consolidations'
export { TaxPeriods } from './FiscalPeriods/TaxPeriods'
export { AuditReports } from './LegalEntities/Consolidations/AuditReports'
export { TransferPricingAdjustments } from './FiscalPeriods/TaxPeriods/TransferPricingAdjustments'
export { PostCloseAnalyticsReports } from './LegalEntities/Consolidations/AuditReports/PostCloseAnalyticsReports'
