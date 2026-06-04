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
export { Tenants } from '@/tenants'
export { Users } from '@/users'
export { Roles } from '@/roles'
export { UserRoles } from '@/roles/user/roles'

// Content Collections
export { Pages } from '@/pages'
export { Posts } from '@/posts'
export { Media } from '@/media'
export { Categories } from '@/categories'

// Billing Collections
export { Invoices } from '@/invoices'
export { InvoiceLines } from '@/invoices/invoice/lines'
export { PaymentMethods } from '@/payment/methods'
export { Payments } from '@/invoices/payments'
export { SubscriptionPlans } from '@/subscription/plans'
export { Subscriptions } from '@/subscription/plans/subscriptions'

// Inventory Collections
export { Items } from '@/items'

// ===== FLAT FINANCIAL & OPERATIONAL COLLECTIONS =====
// All flattened from accounting/ domain silo. Organized by actual concern.

// GL Core
export { default as GLAccounts } from '@/gl/accounts'
export { GLPostingRules } from '@/gl/posting/rules'
export { default as JournalEntries } from '@/journal/entries'
export { default as GLPostings } from '@/journal/entries/gl/postings'

// GL Lifecycle & Closing (Phase A1: Double-Entry & Period Locks)
export { PeriodLocks } from '@/period/locks'
export { ClosingEntries } from '@/legal/entities/closing/entries'

// Banking & Reconciliation
export { default as BankStatements } from '@/gl/accounts/bank/statements'
export { default as BankTransactions } from '@/bank/accounts/bank/transactions'
export { default as BankAccounts } from '@/bank/accounts'
export { default as AccountReconciliations } from '@/gl/accounts/account/reconciliations'
export { default as BankReconciliations } from '@/bank/accounts/bank/reconciliations'

// Period Closing & Adjustments
export { default as FinancialStatements } from '@/financial/statements'
export { default as PeriodEndAdjustments } from '@/gl/accounts/period/end/adjustments'
export { default as RecurringJournals } from '@/gl/accounts/recurring/journals'
export { default as PriorPeriodAdjustments } from '@/fiscal/periods/prior/period/adjustments'
export { default as RoundingAdjustments } from '@/journal/entries/rounding/adjustments'

// Tax, Currency & Fiscal
export { default as TaxCalculations } from '@/gl/accounts/tax/calculations'
export { TaxCodes } from '@/tax/jurisdictions/tax/codes'
export { TaxJurisdictions } from '@/tax/jurisdictions'
export { default as TaxReturns } from '@/tax/jurisdictions/tax/returns'
export { default as CurrencyRates } from '@/currency/rates'

// Fiscal Period Management (Phase B1: Fiscal Period Flexibility)
export { FiscalPeriods } from '@/fiscal/periods'
export { FiscalCalendars } from '@/legal/entities/fiscal/calendars'
export { FiscalPeriodSnapshots } from '@/fiscal/periods/fiscal/period/snapshots'

// Fixed Assets & Depreciation
export { default as FixedAssets } from '@/fixed/assets'
export { default as DepreciationSchedules } from '@/fixed/assets/depreciation/schedules'

// Master Data: Customers & Revenue
export { Customers } from '@/customers'
export { default as Leads } from '@/leads'
export { default as Opportunities } from '@/leads/opportunities'
export { default as CustomerSegments } from '@/customer/segments'
export { default as Quotes } from '@/customers/quotes'
export { default as SalesOrders } from '@/customers/sales/orders'
export { default as SalesCommissions } from '@/employees/sales/commissions'

// Order-to-Cash
export { default as CreditMemos } from '@/invoices/credit/memos'
export { default as Returns } from '@/customers/sales/orders/returns'
export { default as Shipments } from '@/customers/sales/orders/shipments'
export { default as Refunds } from '@/invoices/credit/memos/refunds'
export { default as PaymentAllocations } from '@/invoices/payments/payment/allocations'

// Dunning & Collections
export { default as DunningCycles } from '@/invoices/dunning/cycles'

// Master Data: Vendors & Procurement
export { Vendors } from '@/vendors'
export { default as VendorQuotes } from '@/vendors/vendor/quotes'
export { default as VendorScorecards } from '@/vendors/vendor/scorecards'

// Procurement: Purchase-to-Pay
export { default as PurchaseOrders } from '@/items/purchase/orders'
export { default as PurchaseRequisitions } from '@/cost/centers/purchase/requisitions'
export { default as GoodsReceipts } from '@/items/purchase/orders/goods/receipts'

// Inventory & Warehouse
export { default as InventoryMovements } from '@/items/inventory/movements'
export { default as WarehouseLocations } from '@/warehouse/locations'

// Cost & Budget
export { default as CostCenters } from '@/cost/centers'
export { default as BudgetPlanning } from '@/budget/plannings'
export { default as CostVariances } from '@/items/bills/of/materials/work/orders/cost/variances'

// Intercompany & Consolidation
export { default as IntercompanyTransactions } from '@/legal/entities/intercompany/transactions'
export { default as ConsolidationEliminations } from '@/consolidation/eliminations'

// Foreign Exchange
export { default as FxTransactions } from '@/fx/transactions'

// Contracts & Obligations
export { default as Contracts } from '@/customers/contracts'
export { default as PerformanceObligations } from '@/customers/contracts/performance/obligations'
export { default as CommitmentsAndContingencies } from '@/commitments/and/contingencies'

// Leases
export { default as Leases } from '@/leases'
export { default as LeaseModifications } from '@/leases/lease/modifications'
export { default as LeasePeriodPostings } from '@/leases/lease/period/postings'

// Payments & Settlements
export { default as PaymentRuns } from '@/bank/accounts/payment/runs'
export { default as SepaMandates } from '@/media/sepa/mandates'

// Payroll
export { default as PayrollRuns } from '@/bank/accounts/payroll/runs'

// People & HR
export { default as Employees } from '@/employees'
export { default as Connections } from '@/connections'
export { default as Sectors } from '@/sectors'
export { default as JobPositions } from '@/cost/centers/job/positions'
export { default as TimeEntries } from '@/employees/time/entries'
export { default as LeaveRequests } from '@/employees/leave/requests'
export { default as PerformanceReviews } from '@/employees/performance/reviews'
export { default as ExpenseReports } from '@/employees/expense/reports'
export { default as RecruitingPipeline } from '@/cost/centers/job/positions/recruiting/pipelines'
export { default as Activities } from '@/activities'

// Operations & Projects
export { default as Projects } from '@/customers/projects'
export { default as ProjectTasks } from '@/customers/projects/project/tasks'
export { default as ProjectMilestones } from '@/customers/projects/project/milestones'
// Work orders — the etrima execution leaf (2.05M rows; `units = Σ(options)` double-entry,
// derived horo lifecycle, the forward! conveyor, piece-rate wage). Supersedes the former
// 2-field idealized MRP stub; carries the canonical slug `work-orders`.
export { default as WorkOrders } from '@/workorders'
export { default as WorkflowDefinitions } from '@/workflow/definitions'
export { default as WorkflowInstances } from '@/workflow/definitions/workflow/instances'

// Manufacturing
export { default as BillsOfMaterials } from '@/items/bills/of/materials'
export { default as Batches } from '@/items/batches'
export { default as ProductionReceipts } from '@/items/bills/of/materials/work/orders/production/receipts'
export { default as QualityInspections } from '@/items/quality/inspections'
export { default as WipSnapshots } from '@/customers/projects/wip/snapshots'
export { default as WorkCenters } from '@/work/centers'
// Work shifts — the etrima per-actor-day labour aggregate (376K rows; the efficiency + wage
// AUTHORITY: wage = Σ(produced·unitSeconds·payPerHour/3600/mpw), verified €4.68M). Supersedes
// the former idealized per-order stub; carries the canonical slug `work-shifts`.
export { default as WorkShifts } from '@/workshifts'
export { default as Operations } from '@/work/centers/operations'
export { default as Routings } from '@/items/bills/of/materials/work/orders/routings'
export { default as OperationRuns } from '@/items/bills/of/materials/work/orders/operation/runs'

// Manufacturing — the lot funnel (production order → variant roll-up → routing chain → phase catalog)
export { default as Lots } from '@/lots'
export { default as LotVariants } from '@/lotvariants'
export { default as LotWorkPhases } from '@/lotworkphases'
export { default as WorkPhases } from '@/workphases'
// The dispatch layer — cartons + their lines (etrima packs/pack_items, 119k/201k rows)
export { default as Packs } from '@/packs'
export { default as PackItems } from '@/packitems'

// Tagging system (anything is taggable — less collections, more features)
export { default as Tags } from '@/tags'
export { default as Taggings } from '@/tags/taggings'

// Facilities & Resources
export { default as Properties } from '@/properties'
export { default as Spaces } from '@/properties/spaces'
export { default as MaintenanceRequests } from '@/maintenance/requests'
export { default as MaintenanceWorkOrders } from '@/maintenance/work/orders'
export { default as BookableResources } from '@/bookable/resources'
export { default as Bookings } from '@/bookable/resources/bookings'

// Logistics & Tracking
export { default as Carriers } from '@/carriers'
export { default as TrackingEvents } from '@/customers/sales/orders/shipments/tracking/events'
export { default as CustomsDeclarations } from '@/customers/sales/orders/shipments/customs/declarations'
export { default as ConsignmentArrangements } from '@/warehouse/locations/consignment/arrangements'
export { default as ConsignmentInventory } from '@/warehouse/locations/consignment/arrangements/consignment/inventories'
export { default as ConsignmentSales } from '@/warehouse/locations/consignment/arrangements/consignment/sales'

// Compliance, Audit & Evidence (Legacy)
export { default as AuditEvents } from '@/audit/events'
export { default as ApiAuditEvents } from '@/api/audit/events'
export { default as EvidenceAttestations } from '@/evidence/attestations'

// Public Order — the justice docket (COFOG-03): adjudication as a balanced state-machine
export { Cases } from '@/cases'

// Access-control: uuid-based RBAC share bindings (Conservation Law 59)
export { default as Shares } from '@/shares'

// ===== COMPREHENSIVE COMPLIANCE & AUDIT FRAMEWORK (Phase 1-5) =====
// 28 collections spanning GAAP, IFRS, SOX, multi-jurisdiction, multi-entity compliance

// Phase 1: Compliance Foundation (7 collections)
export { EntityTypes } from '@/entity/types'
export { TaxingJurisdictions } from '@/taxing/jurisdictions'
export { EntityLegalStructures } from '@/taxing/jurisdictions/entity/legal/structures'
export { ComplianceFrameworks } from '@/compliance/frameworks'
export { ComplianceRequirements } from '@/compliance/frameworks/compliance/requirements'
export { InternalControls } from '@/internal/controls'
export { ControlTests } from '@/internal/controls/control/tests'

// Phase 2-3: Control & Testing, Evidence & Findings (6 collections)
export { AuditSamples } from '@/internal/controls/control/tests/audit/samples'
export { ComplianceGaps } from '@/compliance/frameworks/compliance/requirements/compliance/gaps'
export { AuditEvidence } from '@/media/audit/evidences'
export { AuditFindings } from '@/internal/controls/audit/findings'
export { RemediationPlans } from '@/internal/controls/audit/findings/remediation/plans'

// Phase 4: Audit Governance & Reporting (5 collections)
export { AuditCommittees } from '@/legal/entities/audit/committees'
export { AuditCommitteeMembers } from '@/legal/entities/audit/committees/audit/committee/members'
export { BoardActions } from '@/legal/entities/board/actions'
export { ManagementCertifications } from '@/legal/entities/management/certifications'
export { RegulatoryReports } from '@/legal/entities/regulatory/reports'

// Phase 5: Compliance Policies & Calendars (9 collections)
export { InternalPolicies } from '@/internal/policies'
export { StatutoryReportTemplates } from '@/taxing/jurisdictions/statutory/report/templates'
export { StatutoryFieldMappings } from '@/taxing/jurisdictions/statutory/report/templates/statutory/field/mappings'
export { PolicyVersions } from '@/internal/policies/policy/versions'
export { PolicyAcknowledgments } from '@/internal/policies/policy/acknowledgments'
export { ComplianceDeadlines } from '@/legal/entities/compliance/deadlines'
export { ComplianceNotifications } from '@/legal/entities/compliance/deadlines/compliance/notifications'
export { ReportingStandards } from '@/taxing/jurisdictions/reporting/standards'
export { ReportingMappings } from '@/taxing/jurisdictions/reporting/standards/reporting/mappings'

// Phase 6: Risk, Disclosure & Audit Extension (8 collections)
export { RelatedPartyTransactions } from '@/legal/entities/related/party/transactions'
export { ManagementAssessmentICFR } from '@/legal/entities/management/assessment/icfrs'
export { DisclosureChecklists } from '@/legal/entities/disclosure/checklists'
export { AuditCommitteeMinutes } from '@/legal/entities/audit/committees/audit/committee/minutes'
export { RiskRegister } from '@/legal/entities/risk/registers'
export { DebtSchedule } from '@/legal/entities/debt/schedules'
export { InternalAuditFunction } from '@/legal/entities/internal/audit/functions'
export { SegmentReporting } from '@/legal/entities/segment/reportings'

// GDPR & Data Privacy
export { default as ConsentRecords } from '@/consent/records'
export { default as DataSubjectRequests } from '@/data/subject/requests'
export { default as DataProcessingActivities } from '@/data/processing/activities'

// AML / KYC
export { default as KycChecks } from '@/customers/kyc/checks'
export { default as BeneficialOwners } from '@/legal/entities/beneficial/owners'

// Logistics & packing
export { default as Packages } from '@/items/packages'


// Integrations & messaging
export { default as Messages } from '@/messages'
// Agent-society room — the chat built on Payload (content-addressed events)
export { default as Chat } from '@/chats'

// Sustainability & ESG
export { default as CsrdDisclosures } from '@/csrd/disclosures'
export { default as CarbonEmissions } from '@/fiscal/periods/carbon/emissions'

// Specialized Assets
export { default as BiologicalAssets } from '@/biological/assets'
export { default as MineralResourceAssets } from '@/mineral/resource/assets'
export { default as InvestmentProperties } from '@/properties/investment/properties'

// Financial Accounting Specialties
export { default as Provisions } from '@/fiscal/periods/provisions'
export { default as GovernmentGrants } from '@/government/grants'
export { default as DeferredTaxItems } from '@/tax/jurisdictions/deferred/tax/items'
export { default as ShareBasedPayments } from '@/employees/share/based/payments'
export { default as BusinessCombinations } from '@/legal/entities/business/combinations'
export { default as HeldForSaleClassifications } from '@/held/for/sale/classifications'
export { default as FairValueMeasurements } from '@/fair/value/measurements'
export { default as EarningsPerShare } from '@/fiscal/periods/earnings/per/shares'
export { default as InsuranceContracts } from '@/insurance/contracts'
export { default as RegulatoryDeferralAccounts } from '@/regulatory/deferral/accounts'
export { default as PostBalanceSheetEvents } from '@/fiscal/periods/post/balance/sheet/events'
export { default as TransactionFailures } from '@/transaction/failures'

// Transfer Pricing
export { default as TransferPricingFiles } from '@/legal/entities/transfer/pricing/files'

// Infrastructure: Metadata, Standards, Translations
export { default as Standards } from '@/standards'
export { default as Memories } from '@/memories'
export { default as McpToolMetadata } from '@/mcp/tool/metadata'
export { default as Translations } from '@/translations'

// CRM-related (from ecommerce plugin)

// Contract Extensions
export { default as commitments } from '@/commitments'
export { default as contractAmendments } from '@/customers/contracts/contract/amendments'
export { default as contractPerformance } from '@/customers/contracts/contract/performances'
export { default as contractSignatures } from '@/customers/contracts/contract/signatures'

// Miscellaneous
export { default as LegalEntities } from '@/legal/entities'
export { default as AiSuggestions } from '@/ai/suggestions'
export { default as UsageRecords } from '@/subscription/plans/subscriptions/usage/records'

// Fiscal sales core (Наредба Н-18 compliant)
export { default as FiscalDevices } from '@/fiscal/devices'
export { default as Sales } from '@/fiscal/devices/sales'
export { default as Receipts } from '@/receipts'
export { default as Operators } from '@/operators'
export { default as Terminals } from '@/terminals'
export { default as AuditSubmissions } from '@/audit/submissions'

// Close-side analysis & compliance (named exports)
export { Consolidations } from '@/legal/entities/consolidations'
export { TaxPeriods } from '@/fiscal/periods/tax/periods'
export { AuditReports } from '@/legal/entities/consolidations/audit/reports'
export { TransferPricingAdjustments } from '@/fiscal/periods/tax/periods/transfer/pricing/adjustments'
export { PostCloseAnalyticsReports } from '@/legal/entities/consolidations/audit/reports/post/close/analytics/reports'
