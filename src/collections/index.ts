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
export { Tenants } from '@/collections/tenants'
export { Users } from '@/collections/users'
export { Roles } from '@/collections/roles'
export { UserRoles } from '@/collections/user-roles'

// Content Collections
export { Pages } from '@/collections/pages'
export { Posts } from '@/collections/posts'
export { Media } from '@/collections/media'
export { Categories } from '@/collections/categories'

// Billing Collections
export { Invoices } from '@/collections/invoices'
export { InvoiceLines } from '@/collections/invoice-lines'
export { PaymentMethods } from '@/collections/payment-methods'
export { Payments } from '@/collections/payments'
export { SubscriptionPlans } from '@/collections/subscription-plans'
export { Subscriptions } from '@/collections/subscriptions'

// Inventory Collections
export { Items } from '@/collections/items'

// ===== FLAT FINANCIAL & OPERATIONAL COLLECTIONS =====
// All flattened from accounting/ domain silo. Organized by actual concern.

// GL Core
export { default as GLAccounts } from '@/collections/gl-accounts'
export { GLPostingRules } from '@/collections/gl-posting-rules'
export { default as JournalEntries } from '@/collections/journal-entries'
export { default as GLPostings } from '@/collections/gl-postings'

// GL Lifecycle & Closing (Phase A1: Double-Entry & Period Locks)
export { PeriodLocks } from '@/collections/period-locks'
export { ClosingEntries } from '@/collections/closing-entries'

// Banking & Reconciliation
export { default as BankStatements } from '@/collections/bank-statements'
export { default as BankTransactions } from '@/collections/bank-transactions'
export { default as BankAccounts } from '@/collections/bank-accounts'
export { default as AccountReconciliations } from '@/collections/account-reconciliations'
export { default as BankReconciliations } from '@/collections/bank-reconciliations'

// Period Closing & Adjustments
export { default as FinancialStatements } from '@/collections/financial-statements'
export { default as PeriodEndAdjustments } from '@/collections/period-end-adjustments'
export { default as RecurringJournals } from '@/collections/recurring-journals'
export { default as PriorPeriodAdjustments } from '@/collections/prior-period-adjustments'
export { default as RoundingAdjustments } from '@/collections/rounding-adjustments'

// Tax, Currency & Fiscal
export { default as TaxCalculations } from '@/collections/tax-calculations'
export { TaxCodes } from '@/collections/tax-codes'
export { TaxJurisdictions } from '@/collections/tax-jurisdictions'
export { default as TaxReturns } from '@/collections/tax-returns'
export { default as CurrencyRates } from '@/collections/currency-rates'

// Fiscal Period Management (Phase B1: Fiscal Period Flexibility)
export { FiscalPeriods } from '@/collections/fiscal-periods'
export { FiscalCalendars } from '@/collections/fiscal-calendars'
export { FiscalPeriodSnapshots } from '@/collections/fiscal-period-snapshots'

// Fixed Assets & Depreciation
export { default as FixedAssets } from '@/collections/fixed-assets'
export { default as DepreciationSchedules } from '@/collections/depreciation-schedules'

// Master Data: Customers & Revenue
// Customers and vendors are roles of one party — see @/parties.
export { default as Parties } from '@/collections/parties'
export { default as Leads } from '@/collections/leads'
export { default as Opportunities } from '@/collections/opportunities'
export { default as CustomerSegments } from '@/collections/customer-segments'
export { default as SalesOrders } from '@/collections/sales-orders'
export { default as SalesCommissions } from '@/collections/sales-commissions'

// Order-to-Cash
export { default as CreditMemos } from '@/collections/credit-memos'
export { default as Returns } from '@/collections/returns'
export { default as Shipments } from '@/collections/shipments'
export { default as PaymentAllocations } from '@/collections/payment-allocations'

// Dunning & Collections
export { default as DunningCycles } from '@/collections/dunning-cycles'

// Master Data: Vendors & Procurement
export { default as VendorQuotes } from '@/collections/vendor-quotes'
export { default as VendorScorecards } from '@/collections/vendor-scorecards'

// Procurement: Purchase-to-Pay
export { default as PurchaseOrders } from '@/collections/purchase-orders'
export { default as PurchaseRequisitions } from '@/collections/purchase-requisitions'
export { default as GoodsReceipts } from '@/collections/goods-receipts'

// Inventory & Warehouse
export { default as InventoryMovements } from '@/collections/inventory-movements'
export { default as WarehouseLocations } from '@/collections/warehouse-locations'

// Cost & Budget
export { default as CostCenters } from '@/collections/cost-centers'
export { default as BudgetPlanning } from '@/collections/budget-planning'
export { default as CostVariances } from '@/collections/cost-variances'

// Intercompany & Consolidation
export { default as IntercompanyTransactions } from '@/collections/intercompany-transactions'
export { default as ConsolidationEliminations } from '@/collections/consolidation-eliminations'

// Foreign Exchange
export { default as FxTransactions } from '@/collections/fx-transactions'

// Contracts & Obligations
export { default as Contracts } from '@/collections/contracts'
export { default as PerformanceObligations } from '@/collections/performance-obligations'

// Leases
export { default as Leases } from '@/collections/leases'
export { default as LeaseModifications } from '@/collections/lease-modifications'
export { default as LeasePeriodPostings } from '@/collections/lease-period-postings'

// Payments & Settlements
export { default as PaymentRuns } from '@/collections/payment-runs'
export { default as SepaMandates } from '@/collections/sepa-mandates'

// Payroll
export { default as PayrollRuns } from '@/collections/payroll-runs'

// People & HR
export { default as Employees } from '@/collections/employees'
export { default as Connections } from '@/collections/connections'
export { default as Sectors } from '@/collections/sectors'
export { default as JobPositions } from '@/collections/job-positions'
export { default as TimeEntries } from '@/collections/time-entries'
export { default as LeaveRequests } from '@/collections/leave-requests'
export { default as PerformanceReviews } from '@/collections/performance-reviews'
export { default as ExpenseReports } from '@/collections/expense-reports'
export { default as RecruitingPipeline } from '@/collections/recruiting-pipeline'
export { default as Activities } from '@/collections/activities'

// Operations & Projects
export { default as Projects } from '@/collections/projects'
export { default as ProjectTasks } from '@/collections/project-tasks'
export { default as ProjectMilestones } from '@/collections/project-milestones'
// Work orders — the etrima execution leaf (2.05M rows; `units = Σ(options)` double-entry,
// derived horo lifecycle, the forward! conveyor, piece-rate wage). Supersedes the former
// 2-field idealized MRP stub; carries the canonical slug `work-orders`.
export { default as WorkOrders } from '@/collections/work-orders'
export { default as WorkflowDefinitions } from '@/collections/workflow-definitions'
export { default as WorkflowInstances } from '@/collections/workflow-instances'

// Manufacturing
export { default as BillsOfMaterials } from '@/collections/bills-of-materials'
export { default as Batches } from '@/collections/batches'
export { default as ProductionReceipts } from '@/collections/production-receipts'
export { default as QualityInspections } from '@/collections/quality-inspections'
export { default as WipSnapshots } from '@/collections/wip-snapshots'
export { default as WorkCenters } from '@/collections/work-centers'
// Work shifts — the etrima per-actor-day labour aggregate (376K rows; the efficiency + wage
// AUTHORITY: wage = Σ(produced·unitSeconds·payPerHour/3600/mpw), verified €4.68M). Supersedes
// the former idealized per-order stub; carries the canonical slug `work-shifts`.
export { default as WorkShifts } from '@/collections/work-shifts'
export { default as Operations } from '@/collections/operations'
export { default as Routings } from '@/collections/routings'
export { default as OperationRuns } from '@/collections/operation-runs'

// Manufacturing — the lot funnel (production order → variant roll-up → routing chain → phase catalog)
export { default as Lots } from '@/collections/lots'
export { default as LotVariants } from '@/collections/lot-variants'
export { default as LotWorkPhases } from '@/collections/lot-work-phases'
export { default as WorkPhases } from '@/collections/work-phases'
// The dispatch layer — cartons + their lines (etrima packs/pack_items, 119k/201k rows)
export { default as Packs } from '@/collections/packs'
export { default as PackItems } from '@/collections/pack-items'

// Tagging system (anything is taggable — less collections, more features)
export { default as Tags } from '@/collections/tags'
export { default as Taggings } from '@/collections/taggings'

// Facilities & Resources
export { default as Properties } from '@/collections/properties'
export { default as Spaces } from '@/collections/spaces'
export { default as MaintenanceWorkOrders } from '@/collections/maintenance-work-orders'
export { default as BookableResources } from '@/collections/bookable-resources'
export { default as Bookings } from '@/collections/bookings'

// Logistics & Tracking
export { default as Carriers } from '@/collections/carriers'
export { default as TrackingEvents } from '@/collections/tracking-events'
export { default as CustomsDeclarations } from '@/collections/customs-declarations'
export { default as ConsignmentArrangements } from '@/collections/consignment-arrangements'
export { default as ConsignmentInventory } from '@/collections/consignment-inventory'
export { default as ConsignmentSales } from '@/collections/consignment-sales'

// Compliance, Audit & Evidence (Legacy)
export { default as AuditEvents } from '@/collections/audit-events'
export { default as ApiAuditEvents } from '@/collections/api-audit-events'
export { default as EvidenceAttestations } from '@/collections/evidence-attestations'

// Public Order — the justice docket (COFOG-03): adjudication as a balanced state-machine
export { Cases } from '@/collections/cases'

// Access-control: uuid-based RBAC share bindings (Conservation Law 59)
export { default as Shares } from '@/collections/shares'

// ===== COMPREHENSIVE COMPLIANCE & AUDIT FRAMEWORK (Phase 1-5) =====
// 28 collections spanning GAAP, IFRS, SOX, multi-jurisdiction, multi-entity compliance

// Phase 1: Compliance Foundation (7 collections)
export { EntityTypes } from '@/collections/entity-types'
export { TaxingJurisdictions } from '@/collections/taxing-jurisdictions'
export { EntityLegalStructures } from '@/collections/entity-legal-structures'
export { ComplianceFrameworks } from '@/collections/compliance-frameworks'
export { ComplianceRequirements } from '@/collections/compliance-requirements'
export { InternalControls } from '@/collections/internal-controls'
export { ControlTests } from '@/collections/control-tests'

// Phase 2-3: Control & Testing, Evidence & Findings (6 collections)
export { AuditSamples } from '@/collections/audit-samples'
export { ComplianceGaps } from '@/collections/compliance-gaps'
export { AuditEvidence } from '@/collections/audit-evidence'
export { AuditFindings } from '@/collections/audit-findings'
export { RemediationPlans } from '@/collections/remediation-plans'

// Phase 4: Audit Governance & Reporting (5 collections)
export { AuditCommittees } from '@/collections/audit-committees'
export { AuditCommitteeMembers } from '@/collections/audit-committee-members'
export { BoardActions } from '@/collections/board-actions'
export { ManagementCertifications } from '@/collections/management-certifications'
export { RegulatoryReports } from '@/collections/regulatory-reports'

// Phase 5: Compliance Policies & Calendars (9 collections)
export { InternalPolicies } from '@/collections/internal-policies'
export { StatutoryReportTemplates } from '@/collections/statutory-report-templates'
export { StatutoryFieldMappings } from '@/collections/statutory-field-mappings'
export { PolicyVersions } from '@/collections/policy-versions'
export { PolicyAcknowledgments } from '@/collections/policy-acknowledgments'
export { ComplianceDeadlines } from '@/collections/compliance-deadlines'
export { ComplianceNotifications } from '@/collections/compliance-notifications'
export { ReportingStandards } from '@/collections/reporting-standards'
export { ReportingMappings } from '@/collections/reporting-mappings'

// Phase 6: Risk, Disclosure & Audit Extension (8 collections)
export { RelatedPartyTransactions } from '@/collections/related-party-transactions'
export { ManagementAssessmentICFR } from '@/collections/management-assessment-icfr'
export { DisclosureChecklists } from '@/collections/disclosure-checklists'
export { AuditCommitteeMinutes } from '@/collections/audit-committee-minutes'
export { RiskRegister } from '@/collections/risk-register'
export { DebtSchedule } from '@/collections/debt-schedule'
export { InternalAuditFunction } from '@/collections/internal-audit-function'
export { SegmentReporting } from '@/collections/segment-reporting'

// GDPR & Data Privacy
export { default as ConsentRecords } from '@/collections/consent-records'
export { default as DataSubjectRequests } from '@/collections/data-subject-requests'
export { default as DataProcessingActivities } from '@/collections/data-processing-activities'

// AML / KYC
export { default as KycChecks } from '@/collections/kyc-checks'
export { default as BeneficialOwners } from '@/collections/beneficial-owners'

// Logistics & packing
export { default as Packages } from '@/collections/packages'


// Integrations & messaging
export { default as Messages } from '@/collections/messages'
// Agent-society room — the chat built on Payload (content-addressed events)
export { default as Chat } from '@/collections/chat'

// Sustainability & ESG
export { default as CsrdDisclosures } from '@/collections/csrd-disclosures'
export { default as CarbonEmissions } from '@/collections/carbon-emissions'

// Specialized Assets
export { default as BiologicalAssets } from '@/collections/biological-assets'
export { default as MineralResourceAssets } from '@/collections/mineral-resource-assets'
export { default as InvestmentProperties } from '@/collections/investment-properties'

// Financial Accounting Specialties
export { default as Provisions } from '@/collections/provisions'
export { default as GovernmentGrants } from '@/collections/government-grants'
export { default as DeferredTaxItems } from '@/collections/deferred-tax-items'
export { default as ShareBasedPayments } from '@/collections/share-based-payments'
export { default as BusinessCombinations } from '@/collections/business-combinations'
export { default as HeldForSaleClassifications } from '@/collections/held-for-sale-classifications'
export { default as FairValueMeasurements } from '@/collections/fair-value-measurements'
export { default as EarningsPerShare } from '@/collections/earnings-per-share'
export { default as InsuranceContracts } from '@/collections/insurance-contracts'
export { default as RegulatoryDeferralAccounts } from '@/collections/regulatory-deferral-accounts'
export { default as PostBalanceSheetEvents } from '@/collections/post-balance-sheet-events'
export { default as TransactionFailures } from '@/collections/transaction-failures'

// Transfer Pricing
export { default as TransferPricingFiles } from '@/collections/transfer-pricing-files'

// Infrastructure: Metadata, Standards, Translations
export { default as Standards } from '@/collections/standards'
export { default as Memories } from '@/collections/memories'
export { default as Translations } from '@/collections/translations'

// CRM-related (from ecommerce plugin)

// Contract Extensions
export { default as commitments } from '@/collections/commitments'
export { default as contractAmendments } from '@/collections/contract-amendments'
export { default as contractPerformance } from '@/collections/contract-performance'
export { default as contractSignatures } from '@/collections/contract-signatures'

// Miscellaneous
export { default as LegalEntities } from '@/collections/legal-entities'
export { default as AiSuggestions } from '@/collections/ai-suggestions'
export { default as UsageRecords } from '@/collections/usage-records'

// Fiscal sales core (Наредба Н-18 compliant)
export { default as FiscalDevices } from '@/collections/fiscal-devices'
export { default as Sales } from '@/collections/sales'
export { default as Receipts } from '@/collections/receipts'
export { default as Operators } from '@/collections/operators'
export { default as Terminals } from '@/collections/terminals'
export { default as AuditSubmissions } from '@/collections/audit-submissions'

// Close-side analysis & compliance (named exports)
export { Consolidations } from '@/collections/consolidations'
export { TaxPeriods } from '@/collections/tax-periods'
export { AuditReports } from '@/collections/audit-reports'
export { TransferPricingAdjustments } from '@/collections/transfer-pricing-adjustments'
export { PostCloseAnalyticsReports } from '@/collections/post-close-analytics-reports'
