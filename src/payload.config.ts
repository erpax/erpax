import fs from 'fs'
import path from 'path'
import { PHASE_PRODUCTION_BUILD } from 'next/constants'
import { sqliteD1Adapter } from '@payloadcms/db-d1-sqlite'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import type { CloudflareContext } from '@opennextjs/cloudflare'
import { GetPlatformProxyOptions } from 'wrangler'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { importExportPlugin } from '@payloadcms/plugin-import-export'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { searchPlugin } from '@payloadcms/plugin-search'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { r2Storage } from '@payloadcms/storage-r2'
import { contentUuidPlugin } from '@/plugins/contentUuid'
import { taggablePlugin } from '@/plugins/taggable'
import { uuidNamesPlugin } from '@/plugins/naming'
import { collapseApiKeyScopes } from '@/plugins/mcpScopes'
import { versionsPlugin } from '@/plugins/versions'
import { skillRouterPlugin } from '@/skill/router/plugin'
// Accounting plugin removed: all collections now flat in src/collections/
import { getTenantFromCookie } from '@payloadcms/plugin-multi-tenant/utilities'
import { translations as multiTenantTranslations } from '@payloadcms/plugin-multi-tenant/translations/languages/all'
import { translations as importExportTranslations } from '@payloadcms/plugin-import-export/translations/languages/all'
import { translations as ecommerceTranslations } from '@payloadcms/plugin-ecommerce/translations/languages/all'
import { ar } from '@payloadcms/translations/languages/ar'
import { bg } from '@payloadcms/translations/languages/bg'
import { cs } from '@payloadcms/translations/languages/cs'
import { da } from '@payloadcms/translations/languages/da'
import { de } from '@payloadcms/translations/languages/de'
import { en } from '@payloadcms/translations/languages/en'
import { es } from '@payloadcms/translations/languages/es'
import { et } from '@payloadcms/translations/languages/et'
import { fr } from '@payloadcms/translations/languages/fr'
import { hr } from '@payloadcms/translations/languages/hr'
import { hu } from '@payloadcms/translations/languages/hu'
import { is } from '@payloadcms/translations/languages/is'
import { it } from '@payloadcms/translations/languages/it'
import { ja } from '@payloadcms/translations/languages/ja'
import { lt } from '@payloadcms/translations/languages/lt'
import { lv } from '@payloadcms/translations/languages/lv'
import { nb } from '@payloadcms/translations/languages/nb'
import { nl } from '@payloadcms/translations/languages/nl'
import { pl } from '@payloadcms/translations/languages/pl'
import { pt } from '@payloadcms/translations/languages/pt'
import { ro } from '@payloadcms/translations/languages/ro'
import { ru } from '@payloadcms/translations/languages/ru'
import { sk } from '@payloadcms/translations/languages/sk'
import { sl } from '@payloadcms/translations/languages/sl'
import { sv } from '@payloadcms/translations/languages/sv'
import { uk } from '@payloadcms/translations/languages/uk'

import { isSuperAdmin, isSuperAdminAccess } from '@/is/super/admin'
// All 145+ collections come from canonical src/collections/* locations (flat, agnostic organization).
// No domain silos: organizing by actual data type/concern, not business domain.
// Collections are self-contained with clear boundaries for future plugin extraction.
import * as allCollections from '@/collections'
const {
  // Core
  Tenants,
  Users,
  Roles,
  UserRoles,
  // Content (CMS)
  Categories,
  Media,
  Pages,
  Posts,
  // Billing
  Invoices,
  InvoiceLines,
  PaymentMethods,
  Payments,
  SubscriptionPlans,
  Subscriptions,
  // Inventory
  Items,
  // Financial & Operational (145+ collections total)
  GLAccounts,
  GLPostingRules,
  JournalEntries,
  GLPostings,
  // GL Lifecycle & Closing (Phase A1: Double-Entry & Period Locks)
  PeriodLocks,
  ClosingEntries,
  BankStatements,
  BankTransactions,
  BankAccounts,
  AccountReconciliations,
  BankReconciliations,
  FinancialStatements,
  PeriodEndAdjustments,
  RecurringJournals,
  PriorPeriodAdjustments,
  RoundingAdjustments,
  TaxCalculations,
  TaxCodes,
  TaxJurisdictions,
  TaxReturns,
  CurrencyRates,
  // Fiscal Period Management (Phase B1: Fiscal Period Flexibility)
  FiscalPeriods,
  FiscalCalendars,
  FiscalPeriodSnapshots,
  FixedAssets,
  DepreciationSchedules,
  Customers,
  Leads,
  Opportunities,
  CustomerSegments,
  Quotes,
  SalesOrders,
  SalesCommissions,
  CreditMemos,
  Returns,
  Shipments,
  Refunds,
  PaymentAllocations,
  DunningCycles,
  Vendors,
  VendorQuotes,
  VendorScorecards,
  PurchaseOrders,
  PurchaseRequisitions,
  GoodsReceipts,
  InventoryMovements,
  WarehouseLocations,
  CostCenters,
  BudgetPlanning,
  CostVariances,
  IntercompanyTransactions,
  ConsolidationEliminations,
  FxTransactions,
  Contracts,
  PerformanceObligations,
  CommitmentsAndContingencies,
  Leases,
  LeaseModifications,
  LeasePeriodPostings,
  PaymentRuns,
  SepaMandates,
  PayrollRuns,
  Employees,
  Connections,
  Sectors,
  JobPositions,
  TimeEntries,
  LeaveRequests,
  PerformanceReviews,
  ExpenseReports,
  RecruitingPipeline,
  Activities,
  Projects,
  ProjectTasks,
  ProjectMilestones,
  WorkOrders,
  WorkflowDefinitions,
  WorkflowInstances,
  BillsOfMaterials,
  Batches,
  ProductionReceipts,
  WorkCenters,
  WorkShifts,
  Operations,
  Routings,
  OperationRuns,
  QualityInspections,
  WipSnapshots,
  Properties,
  Spaces,
  MaintenanceRequests,
  MaintenanceWorkOrders,
  BookableResources,
  Bookings,
  Carriers,
  TrackingEvents,
  CustomsDeclarations,
  ConsignmentArrangements,
  ConsignmentInventory,
  ConsignmentSales,
  AuditEvents,
  ApiAuditEvents,
  EvidenceAttestations,
  // Access-control: uuid-based RBAC share bindings (Conservation Law 59)
  Shares,
  // New Phase 1-5 Compliance & Audit Framework (28 collections)
  EntityTypes,
  TaxingJurisdictions,
  EntityLegalStructures,
  ComplianceFrameworks,
  ComplianceRequirements,
  InternalControls,
  ControlTests,
  AuditSamples,
  ComplianceGaps,
  AuditEvidence,
  AuditFindings,
  Cases,
  RemediationPlans,
  AuditCommittees,
  AuditCommitteeMembers,
  BoardActions,
  ManagementCertifications,
  RegulatoryReports,
  InternalPolicies,
  StatutoryReportTemplates,
  StatutoryFieldMappings,
  PolicyVersions,
  PolicyAcknowledgments,
  ComplianceDeadlines,
  ComplianceNotifications,
  ReportingStandards,
  ReportingMappings,
  // Phase 6: Risk, Disclosure & Audit Extension (8 collections)
  RelatedPartyTransactions,
  ManagementAssessmentICFR,
  DisclosureChecklists,
  AuditCommitteeMinutes,
  RiskRegister,
  DebtSchedule,
  InternalAuditFunction,
  SegmentReporting,
  ConsentRecords,
  DataSubjectRequests,
  DataProcessingActivities,
  KycChecks,
  BeneficialOwners,
  Packages,
  Messages,
  Chat,
  CsrdDisclosures,
  CarbonEmissions,
  BiologicalAssets,
  MineralResourceAssets,
  InvestmentProperties,
  Provisions,
  GovernmentGrants,
  DeferredTaxItems,
  ShareBasedPayments,
  BusinessCombinations,
  HeldForSaleClassifications,
  FairValueMeasurements,
  EarningsPerShare,
  InsuranceContracts,
  RegulatoryDeferralAccounts,
  PostBalanceSheetEvents,
  TransactionFailures,
  TransferPricingFiles,
  Standards,
  Memories,
  McpToolMetadata,
  Translations,
  commitments,
  contractAmendments,
  contractPerformance,
  contractSignatures,
  LegalEntities,
  AiSuggestions,
  UsageRecords,
  // Tagging system (anything is taggable)
  Tags,
  Taggings,
  // Close-side analysis & compliance (wired-in orphans)
  Consolidations,
  TaxPeriods,
  AuditReports,
  TransferPricingAdjustments,
  PostCloseAnalyticsReports,
  // Fiscal sales core (Наредба Н-18)
  FiscalDevices,
  Sales,
  Receipts,
  Operators,
  Terminals,
  AuditSubmissions,
} = allCollections
import type { CollectionSlug, CollectionConfig } from 'payload'
import { Footer } from '@/footer/config'
import { Header } from '@/header/config'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { searchDocField, searchFields } from '@/search/fieldOverrides'
import { defaultLexical } from '@/default/lexical'
import { createEcommercePlugin } from '@/ecommerce/configureEcommercePlugin'
import {
  deriveSecretFromPayloadSecret,
  internalSecretPurpose,
} from '@/nist/sp/800/108'
import { getServerSideURL } from '@/rfc/3986/get-url'
import { getUserTenantIDs } from '@/get/user/tenant/i/ds'
import { tenantAwareResendEmailAdapter } from '@/email/tenantAwareResendEmailAdapter'
import localization from '@/i18n/localization'
import {
  defaultLocale,
  localeRecord,
  nestedMessages,
  supportedLocales,
  type SupportedLocale,
} from '@/i18n'

import type { Config } from '@/payload-types'

/** `buildConfig({ logger })` type — used so Workers can supply a non-pino logger without `any`. */
type PayloadBuildConfigLogger = NonNullable<Parameters<typeof buildConfig>[0]['logger']>

/** Finnish, Greek, Irish, Maltese — no `@payloadcms/translations` pack; reuse English UI. */
const payloadUiFallback = en

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const realpath = (value: string) => (fs.existsSync(value) ? fs.realpathSync(value) : undefined)

const isCLI = process.argv.some((value) => {
  const resolved = realpath(value)
  return resolved?.endsWith(path.join('payload', 'bin.js')) ?? false
})
const isProduction = process.env.NODE_ENV === 'production'

// PAYLOAD_SECRET underpins password hashing + field encryption. Refuse to boot at
// runtime with an empty / zero-entropy secret (a silent KDF-defeating fallback).
// Build & CLI phases carry no runtime secrets, so an inert placeholder is tolerated
// there only — it is never used for any cryptographic operation.
const payloadSecret = process.env.PAYLOAD_SECRET
if (!payloadSecret && !isCLI && process.env.NEXT_PHASE !== PHASE_PRODUCTION_BUILD) {
  throw new Error(
    'PAYLOAD_SECRET is required and must not be empty. Generate one with: openssl rand -hex 32',
  )
}

const createLog =
  (level: string, fn: typeof console.log) => (objOrMsg: object | string, msg?: string) => {
    if (typeof objOrMsg === 'string') {
      fn(JSON.stringify({ level, msg: objOrMsg }))
    } else {
      fn(JSON.stringify({ level, ...objOrMsg, msg: msg ?? (objOrMsg as { msg?: string }).msg }))
    }
  }

const cloudflareLogger = {
  level: process.env.PAYLOAD_LOG_LEVEL || 'info',
  trace: createLog('trace', console.debug),
  debug: createLog('debug', console.debug),
  info: createLog('info', console.log),
  warn: createLog('warn', console.warn),
  error: createLog('error', console.error),
  fatal: createLog('fatal', console.error),
  silent: () => {},
} as unknown as PayloadBuildConfigLogger

let _cloudflare: CloudflareContext | undefined
let _cloudflareInit = false

async function getCloudflare(): Promise<CloudflareContext> {
  if (_cloudflareInit) return _cloudflare!

  const isNextProductionBuild = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD

  if (isCLI || !isProduction || isNextProductionBuild) {
    _cloudflare = await getCloudflareContextFromWrangler()
  } else {
    const { getCloudflareContext } = await import('@opennextjs/cloudflare')
    _cloudflare = await getCloudflareContext({ async: true })
  }

  _cloudflareInit = true
  return _cloudflare
}

let sharp: typeof import('sharp') | undefined
if (process.env.PAYLOAD_DISABLE_SHARP !== 'true') {
  try {
    sharp = (await import('sharp')).default
  } catch {
    sharp = undefined
  }
}

// Merge plugin translations with the project's own nested messages so the
// Payload admin UI has a single, complete translation map per locale.
function pluginTranslationsForLocale(
  pack: Record<string, Record<string, unknown>> | undefined,
  locale: SupportedLocale,
): Record<string, unknown> {
  return (pack?.[locale] as Record<string, unknown> | undefined) ?? {}
}

const adminTranslations = Object.fromEntries(
  supportedLocales.map((locale) => [
    locale,
    {
      ...pluginTranslationsForLocale(
        multiTenantTranslations as Record<string, Record<string, unknown>>,
        locale,
      ),
      ...pluginTranslationsForLocale(
        importExportTranslations as Record<string, Record<string, unknown>>,
        locale,
      ),
      ...pluginTranslationsForLocale(
        ecommerceTranslations as Record<string, Record<string, unknown>>,
        locale,
      ),
      ...nestedMessages[locale],
    },
  ]),
)

export default buildConfig({
  ...(sharp ? { sharp } : {}),
  email: tenantAwareResendEmailAdapter,
  admin: {
    components: {
      beforeLogin: ['@/before/login'],
      beforeDashboard: ['@/before/dashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: localeRecord('livePreview.mobile')[defaultLocale],
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: localeRecord('livePreview.tablet')[defaultLocale],
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: localeRecord('livePreview.desktop')[defaultLocale],
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  // Slice MMMM (2026-05-10) — architecture invariants gate at boot.
  // Runs the 5-axis self-check (standards / expansion / compression /
  // entropy; fallback axis is advisory + skipped at boot). Default is
  // warn-only; set `STRICT_INVARIANTS=1` to refuse boot on failure.
  // @see src/services/architecture-invariants/onInit.ts
  onInit: async (payload) => {
    try {
      const { runInvariantsAtBoot } = await import('@/architecture/invariant/onInit')
      await runInvariantsAtBoot(payload)
    } catch (err) {
      // STRICT_INVARIANTS=1 propagates to refuse boot.
      throw err
    }
    // Slice PPPP — declarative event → notification fan-out.
    // Idempotent; safe on hot reload.
    try {
      const { wireNotificationSubscriber } = await import('@/notification/subscriber')
      wireNotificationSubscriber(payload)
    } catch {
      // Never refuse boot on notification wiring failure.
    }
    // Issue the fiscal receipt (касов бон) on sale:closed (Наредба Н-18).
    try {
      const { wireReceiptSubscriber } = await import('@/sale/receipt-subscriber')
      wireReceiptSubscriber(payload)
    } catch {
      // Never refuse boot on receipt-subscriber wiring failure.
    }
    // Fiscalize a paid ecommerce order into a closed sale on order:activated.
    try {
      const { wireOrderFiscalizationSubscriber } = await import('@/sale/order-fiscalization')
      wireOrderFiscalizationSubscriber(payload)
    } catch {
      // Never refuse boot on order-fiscalization wiring failure.
    }
    // Fiscalize each card-charged subscription period into a касов бон.
    try {
      const { wireSubscriptionFiscalizationSubscriber } = await import('@/sale/subscription-fiscalization')
      wireSubscriptionFiscalizationSubscriber(payload)
    } catch {
      // Never refuse boot on subscription-fiscalization wiring failure.
    }
  },
  db: sqliteD1Adapter({
    binding: (await getCloudflare()).env.D1,
    // Position 0 — identity is the uuid. Text ids so every doc id is a
    // content/oid-addressed uuid (the 0), enabling collision-free merge,
    // federation, and the etrima migration's oidUuid ids. See `identity`.
    // (d1-sqlite arg `idType: 'uuid'` → payloadIDType 'text' → string ids +
    // the DB generates a uuid per row. `'text'` maps to number — use 'uuid'.)
    idType: 'uuid',
    // NODE_ENV=test + non-TTY: Drizzle dev push can hang on interactive column prompts.
    // Vitest runs migrate in vitest.setup.ts; Playwright seeds set PAYLOAD_DEV_PUSH=false.
    push:
      process.env.NODE_ENV !== 'test' && process.env.PAYLOAD_DEV_PUSH !== 'false',
  }),
  // D1 caps tables at 100 columns. Payload's admin document-locking adds a
  // `payload_locked_documents_rels` polymorphic across every lockable collection
  // (one FK column each → 200+ cols → over cap, schema un-creatable on D1).
  // erpax is API-first (admin disabled), so disable locking on every collection;
  // `payload_locked_documents_rels` then shrinks below the cap. See `pnpm d1:audit`.
  collections: ([
    // Core (4)
    Tenants,
    Users,
    Roles,
    UserRoles,
    // Content (4)
    Pages,
    Posts,
    Media,
    Categories,
    // Billing (6)
    Invoices,
    InvoiceLines,
    PaymentMethods,
    Payments,
    SubscriptionPlans,
    Subscriptions,
    // Inventory (1)
    Items,
    // Financial & Operational (130 collections total)
    // GL Core (4)
    GLAccounts,
    GLPostingRules,
    JournalEntries,
    GLPostings,
    // GL Lifecycle & Closing (Phase A1: Double-Entry & Period Locks) (3)
    PeriodLocks,
    ClosingEntries,
    // Banking & Reconciliation (5)
    BankStatements,
    BankTransactions,
    BankAccounts,
    AccountReconciliations,
    BankReconciliations,
    // Period Closing & Adjustments (5)
    FinancialStatements,
    PeriodEndAdjustments,
    RecurringJournals,
    PriorPeriodAdjustments,
    RoundingAdjustments,
    // Tax, Currency (4)
    TaxCalculations,
    TaxCodes,
    TaxJurisdictions,
    TaxReturns,
    CurrencyRates,
    // Fiscal Period Management (Phase B1: Fiscal Period Flexibility) (3)
    FiscalPeriods,
    FiscalCalendars,
    FiscalPeriodSnapshots,
    // Fixed Assets & Depreciation (2)
    FixedAssets,
    DepreciationSchedules,
    // Customers & Revenue (7)
    Customers,
    Leads,
    Opportunities,
    CustomerSegments,
    Quotes,
    SalesOrders,
    SalesCommissions,
    // Order-to-Cash (5)
    CreditMemos,
    Returns,
    Shipments,
    Refunds,
    PaymentAllocations,
    // Dunning & Collections (1)
    DunningCycles,
    // Vendors & Procurement (6)
    Vendors,
    VendorQuotes,
    VendorScorecards,
    PurchaseOrders,
    PurchaseRequisitions,
    GoodsReceipts,
    // Inventory & Warehouse (2)
    InventoryMovements,
    WarehouseLocations,
    // Cost & Budget (3)
    CostCenters,
    BudgetPlanning,
    CostVariances,
    // Intercompany & Consolidation (2)
    IntercompanyTransactions,
    ConsolidationEliminations,
    // Foreign Exchange (1)
    FxTransactions,
    // Contracts & Obligations (3)
    Contracts,
    PerformanceObligations,
    CommitmentsAndContingencies,
    // Leases (3)
    Leases,
    LeaseModifications,
    LeasePeriodPostings,
    // Payments & Settlements (2)
    PaymentRuns,
    SepaMandates,
    // Payroll (1)
    PayrollRuns,
    // People & HR (7)
    Employees,
    Connections,
    Sectors,
    JobPositions,
    TimeEntries,
    LeaveRequests,
    PerformanceReviews,
    ExpenseReports,
    RecruitingPipeline,
    Activities,
    // Operations & Projects (6)
    Projects,
    ProjectTasks,
    ProjectMilestones,
    WorkOrders,
    WorkflowDefinitions,
    WorkflowInstances,
    // Manufacturing (10)
    BillsOfMaterials,
    Batches,
    WorkCenters,
    WorkShifts,
    Operations,
    Routings,
    OperationRuns,
    ProductionReceipts,
    QualityInspections,
    WipSnapshots,
    // Tagging system (anything is taggable — less collections, more features)
    Tags,
    Taggings,
    // Facilities & Resources (6)
    Properties,
    Spaces,
    MaintenanceRequests,
    MaintenanceWorkOrders,
    BookableResources,
    Bookings,
    // Logistics & Tracking (6)
    Carriers,
    TrackingEvents,
    CustomsDeclarations,
    ConsignmentArrangements,
    ConsignmentInventory,
    ConsignmentSales,
    // Compliance, Audit & Evidence (Legacy) (2)
    AuditEvents,
    ApiAuditEvents,
    EvidenceAttestations,
    // Access-control: uuid-based RBAC share bindings (Conservation Law 59)
    Shares,
    // ===== COMPREHENSIVE COMPLIANCE & AUDIT FRAMEWORK (Phase 1-5) (28 collections) =====
    // Phase 1: Compliance Foundation (7)
    EntityTypes,
    TaxingJurisdictions,
    EntityLegalStructures,
    ComplianceFrameworks,
    ComplianceRequirements,
    InternalControls,
    ControlTests,
    // Phase 2-3: Control & Testing, Evidence & Findings (6)
    AuditSamples,
    ComplianceGaps,
    AuditEvidence,
    AuditFindings,
    Cases, // Public Order — the justice docket (COFOG-03)
    RemediationPlans,
    // Phase 4: Audit Governance & Reporting (5)
    AuditCommittees,
    AuditCommitteeMembers,
    BoardActions,
    ManagementCertifications,
    RegulatoryReports,
    // Phase 5: Compliance Policies & Calendars (10)
    InternalPolicies,
    StatutoryReportTemplates,
    StatutoryFieldMappings,
    PolicyVersions,
    PolicyAcknowledgments,
    ComplianceDeadlines,
    ComplianceNotifications,
    ReportingStandards,
    ReportingMappings,
    // Phase 6: Risk, Disclosure & Audit Extension (8)
    RelatedPartyTransactions,
    ManagementAssessmentICFR,
    DisclosureChecklists,
    AuditCommitteeMinutes,
    RiskRegister,
    DebtSchedule,
    InternalAuditFunction,
    SegmentReporting,
    // GDPR & Data Privacy (3)
    ConsentRecords,
    DataSubjectRequests,
    DataProcessingActivities,
    // AML / KYC (3)
    KycChecks,
    BeneficialOwners,
    // Logistics, treasury, integrations & messaging (5)
    Packages,
    Messages,
    Chat,
    // Sustainability & ESG (2)
    CsrdDisclosures,
    CarbonEmissions,
    // Specialized Assets (3)
    BiologicalAssets,
    MineralResourceAssets,
    InvestmentProperties,
    // Financial Accounting Specialties (12)
    Provisions,
    GovernmentGrants,
    DeferredTaxItems,
    ShareBasedPayments,
    BusinessCombinations,
    HeldForSaleClassifications,
    FairValueMeasurements,
    EarningsPerShare,
    InsuranceContracts,
    RegulatoryDeferralAccounts,
    PostBalanceSheetEvents,
    TransactionFailures,
    // Transfer Pricing (1)
    TransferPricingFiles,
    // Infrastructure: Metadata, Standards, Translations (4)
    Standards,
    Memories,
    McpToolMetadata,
    Translations,
    // CRM-related (1)
    // Contract Extensions (5)
    commitments,
    contractAmendments,
    contractPerformance,
    contractSignatures,
    // Miscellaneous (3)
    LegalEntities,
    AiSuggestions,
    UsageRecords,
    // Close-side analysis & compliance (wired-in orphans — referenced by validate* hooks)
    Consolidations,
    TaxPeriods,
    AuditReports,
    TransferPricingAdjustments,
    PostCloseAnalyticsReports,
    // Fiscal sales core (Наредба Н-18)
    FiscalDevices,
    Sales,
    Receipts,
    Operators,
    Terminals,
    AuditSubmissions,
  ] as CollectionConfig[]).map((c) => ({ ...c, lockDocuments: false as const })),
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    r2Storage({
      bucket: (await getCloudflare()).env.R2,
      collections: { media: true },
    }),
    createEcommercePlugin(),
    formBuilderPlugin({}),
    // Official content-surface plugins (see the `redirects` + `search` skills).
    // Registering them is what makes `'redirects'`/`'search'` real CollectionSlugs.
    redirectsPlugin({
      collections: ['pages', 'posts'],
      overrides: { fields: ({ defaultFields }) => defaultFields },
    }),
    searchPlugin({
      // Every collection is searchable — derived from the barrel, not hand-listed
      // (same pattern as the import/export plugin below). `beforeSync` resolves a
      // title across the heterogeneous schema so non-`posts` rows index usefully.
      collections: (Object.values(allCollections) as Array<{ slug: string }>).map(
        (c) => c.slug as CollectionSlug,
      ),
      beforeSync: beforeSyncWithSearch,
      // Collapse the polymorphic `doc` relationship (one FK column per searched collection →
      // `search_rels` at 208 cols, over D1's 100-col cap) to the content-uuid cross-reference
      // (`searchDocField`: a flat group, no `_rels` table). See fieldOverrides.ts for the why.
      searchOverrides: {
        fields: ({ defaultFields }) => [
          ...defaultFields.map((field) => ('name' in field && field.name === 'doc' ? searchDocField : field)),
          ...searchFields,
        ],
      },
    }),
    multiTenantPlugin<Config>({
      collections: {
        // CMS Collections
        pages: {},
        posts: {},
        media: {},
        categories: {},
        // Agent-society room (the chat built on Payload) — per-tenant isolation
        chat: {},
        // Tagging system
        tags: {},
        taggings: {},
        // Ecommerce Collections
        products: {},
        carts: {},
        orders: {},
        addresses: {},
        transactions: {},
        variantTypes: {},
        variants: {},
        variantOptions: {},
        // ===== ACCOUNTING COLLECTIONS — All 122 collections tenant-scoped =====
        // GL Core
        'gl-accounts': {},
        'journal-entries': {},
        'gl-postings': {},
        // Banking & Reconciliation
        'bank-statements': {},
        'account-reconciliations': {},
        'bank-reconciliations': {},
        // Close-side
        'financial-statements': {},
        'period-end-adjustments': {},
        'recurring-journals': {},
        'provisions': {},
        'commitments-and-contingencies': {},
        'government-grants': {},
        // Tax & Currency
        'tax-calculations': {},
        'currency-rates': {},
        // Real entities & Masters
        'fixed-assets': {},
        'budget-planning': {},
        customers: {},
        vendors: {},
        'tax-jurisdictions': {},
        'tax-codes': {},
        'fiscal-periods': {},
        // Infrastructure
        standards: {},
        memories: {},
        'mcp-tool-metadata': {},
        translations: {},
        // O2C
        'audit-events': {},
        // Access-control: uuid-based RBAC share bindings (Law 59)
        'shares': {},
        'credit-memos': {},
        quotes: {},
        'sales-orders': {},
        returns: {},
        shipments: {},
        refunds: {},
        // P2P & Three-way match
        'purchase-orders': {},
        'goods-receipts': {},
        'purchase-requisitions': {},
        'vendor-quotes': {},
        'vendor-scorecards': {},
        // Master Banking & Payments
        'bank-accounts': {},
        'bank-transactions': {},
        leases: {},
        'payment-runs': {},
        'sepa-mandates': {},
        'dunning-cycles': {},
        'payment-allocations': {},
        // Revenue Contracts
        contracts: {},
        'performance-obligations': {},
        // PP&E
        'depreciation-schedules': {},
        // GDPR
        'consent-records': {},
        'data-subject-requests': {},
        'data-processing-activities': {},
        // SOX §404 Evidence
        'audit-findings': {},
        'control-tests': {},
        // AML/KYC
        'kyc-checks': {},
        'beneficial-owners': {},
        // Tax Filing
        'tax-returns': {},
        // Inventory
        'warehouse-locations': {},
        'inventory-movements': {},
        // API & Evidence
        'api-audit-events': {},
        'evidence-attestations': {},
        // Cost Centers
        'cost-centers': {},
        // Payroll
        employees: {},
        'time-entries': {},
        'payroll-runs': {},
        // IFRS 16 Lease Detail
        'lease-period-postings': {},
        // Intercompany & Consolidation
        'intercompany-transactions': {},
        'consolidation-eliminations': {},
        'prior-period-adjustments': {},
        'rounding-adjustments': {},
        // FX & Transactions
        'fx-transactions': {},
        'transaction-failures': {},
        // Manufacturing & Logistics
        'bills-of-materials': {},
        'work-orders': {},
        'work-centers': {},
        'work-shifts': {},
        'operations': {},
        'routings': {},
        'operation-runs': {},
        'production-receipts': {},
        'cost-variances': {},
        'quality-inspections': {},
        carriers: {},
        'tracking-events': {},
        'customs-declarations': {},
        // Billing Infrastructure
        'usage-records': {},
        // AI Audit Trail
        'ai-suggestions': {},
        // Group Structure
        'legal-entities': {},
        // Project Accounting
        projects: {},
        'project-tasks': {},
        'project-milestones': {},
        'wip-snapshots': {},
        // ESG & Transfer Pricing
        'csrd-disclosures': {},
        'carbon-emissions': {},
        'transfer-pricing-files': {},
        // IFRS 16 Extensions
        'lease-modifications': {},
        // CRM
        leads: {},
        opportunities: {},
        activities: {},
        'customer-segments': {},
        'sales-commissions': {},
        // HR Extensions
        'job-positions': {},
        'recruiting-pipeline': {},
        'performance-reviews': {},
        'expense-reports': {},
        'leave-requests': {},
        // Workflow Engine
        'workflow-definitions': {},
        'workflow-instances': {},
        // IFRS 100% Gap-Fill
        'deferred-tax-items': {},
        'share-based-payments': {},
        'business-combinations': {},
        'held-for-sale-classifications': {},
        'fair-value-measurements': {},
        'investment-properties': {},
        'biological-assets': {},
        'earnings-per-share': {},
        'insurance-contracts': {},
        'mineral-resource-assets': {},
        'regulatory-deferral-accounts': {},
        'post-balance-sheet-events': {},
        // Consignments, Bookings, Facility Management
        'consignment-arrangements': {},
        'consignment-inventory': {},
        'consignment-sales': {},
        'bookable-resources': {},
        bookings: {},
        properties: {},
        spaces: {},
        'maintenance-requests': {},
        'maintenance-work-orders': {},
        // ===== COMPREHENSIVE COMPLIANCE & AUDIT FRAMEWORK (Phase 1-5) (28 collections) =====
        // Phase 1: Compliance Foundation
        'entity-types': {},
        'taxing-jurisdictions': {},
        'entity-legal-structures': {},
        'compliance-frameworks': {},
        'compliance-requirements': {},
        'internal-controls': {},
        // Phase 2-3: Control & Testing, Evidence & Findings
        'audit-samples': {},
        'compliance-gaps': {},
        'audit-evidence': {},
        'remediation-plans': {},
        // Phase 4: Audit Governance & Reporting
        'audit-committees': {},
        'audit-committee-members': {},
        'board-actions': {},
        'management-certifications': {},
        'regulatory-reports': {},
        // Phase 5: Compliance Policies & Calendars
        'internal-policies': {},
        'statutory-report-templates': {},
        'statutory-field-mappings': {},
        'policy-versions': {},
        'policy-acknowledgments': {},
        'compliance-deadlines': {},
        'compliance-notifications': {},
        'fiscal-calendars': {},
        'reporting-standards': {},
        'reporting-mappings': {},
        // Phase 6: Risk, Disclosure & Audit Extension
        'related-party-transactions': {},
        'management-assessment-icfr': {},
        'disclosure-checklists': {},
        'audit-committee-minutes': {},
        'risk-register': {},
        'debt-schedule': {},
        'internal-audit-function': {},
        'segment-reporting': {},
        // Billing, GL lifecycle, contracts & period collections (tenant-scoped;
        // previously carried a manual tenant field — now plugin-owned).
        invoices: {},
        'invoice-lines': {},
        payments: {},
        'payment-methods': {},
        subscriptions: {},
        items: {},
        'gl-posting-rules': {},
        'closing-entries': {},
        'period-locks': {},
        'fiscal-period-snapshots': {},
        commitments: {},
        'contract-amendments': {},
        'contract-signatures': {},
        'contract-performance': {},
        // Close-side analysis & compliance (wired-in orphans)
        consolidations: {},
        'tax-periods': {},
        'audit-reports': {},
        'transfer-pricing-adjustments': {},
        'post-close-analytics-reports': {},
        // Fiscal sales core (Наредба Н-18) — tenant-scoped
        'fiscal-devices': {},
        'sales': {},
        'receipts': {},
        'operators': {},
        'terminals': {},
        'audit-submissions': {},
      },
      tenantField: {
        defaultValue: async ({ req }) => {
          const idType = req.payload.collections.tenants?.customIDType ?? req.payload.db.defaultIDType
          const tenantFromCookie = getTenantFromCookie(req.headers, idType === 'number' ? 'number' : 'text')
          if (!tenantFromCookie) return null

          const { totalDocs } = await req.payload.count({
            collection: 'tenants',
            overrideAccess: false,
            req,
            user: req.user,
            where: {
              id: {
                in: [tenantFromCookie],
              },
            },
          })

          return totalDocs > 0 ? tenantFromCookie : null
        },
        access: {
          read: () => true,
          update: ({ req }) => {
            if (isSuperAdmin(req.user)) return true
            return getUserTenantIDs(req.user).length > 0
          },
        },
      },
      tenantsArrayField: {
        includeDefaultField: false,
      },
      userHasAccessToAllTenants: (user) => isSuperAdmin(user),
    }),
    importExportPlugin({
      // Every collection gets CSV/JSON import + export — derived from the
      // barrel, not hand-listed. (The plugin only adds I/O to the slugs it
      // is given; an empty list would disable it everywhere.)
      collections: (Object.values(allCollections) as Array<{ slug: string }>).map((c) => ({
        slug: c.slug as CollectionSlug,
      })),
      overrideExportCollection: ({ collection }) => ({
        ...collection,
        access: {
          ...collection.access,
          create: isSuperAdminAccess,
          read: isSuperAdminAccess,
          delete: isSuperAdminAccess,
        },
      }),
      overrideImportCollection: ({ collection }) => ({
        ...collection,
        access: {
          ...collection.access,
          create: isSuperAdminAccess,
          read: isSuperAdminAccess,
          delete: isSuperAdminAccess,
        },
      }),
    }),
    mcpPlugin({
      // Add ALL collections to the gateway — users and agents are ONE (the
      // actor-merge): the agent wields the full power of erpax exactly as a
      // human, only infinitely faster, so the door opens onto everything a
      // human can reach. Access still gates every call (the cross + the key
      // owner's access, run in the actor's PayloadRequest — never widened).
      // Computed from the collections barrel, never hand-listed
      // (computed-not-hardcoded) — every collection becomes find/create/update/
      // delete tools; the per-key toggles let an admin narrow a given key.
      collections: Object.fromEntries(
        (Object.values(allCollections) as Array<{ slug: string }>).map(
          (c) => [c.slug, { enabled: true }] as const,
        ),
      ) as Partial<Record<CollectionSlug, { enabled: true }>>,
      globals: {
        header: { enabled: true },
        footer: { enabled: true },
      },
      // Collapse the 824-column capability matrix (over D1's 100-col cap) to a
      // compact `scopes` field + virtual afterRead capabilities — the same
      // matrix→cross collapse as access. See src/plugins/mcpScopes.
      overrideApiKeyCollection: (collection) =>
        collapseApiKeyScopes({
          ...collection,
          admin: {
            ...collection.admin,
            group: localeRecord('plugins.mcpGroup'),
          },
          labels: {
            plural: localeRecord('payload-mcp-api-keys.plural'),
            singular: localeRecord('payload-mcp-api-keys.singular'),
          },
        }),
    }),
    // Make every collection taggable — one polymorphic `taggings` join +
    // a reverse `tags` join injected everywhere. Before contentUuidPlugin
    // so the injected `taggable` field is hashed into the tagging's uuid.
    // See the `tags` skill.
    taggablePlugin(),
    // Universal content-addressed identity: inject a content-uuid into
    // every collection. Runs LAST so it covers collections added by the
    // plugins above. See the `identity` + `bindings` skills.
    contentUuidPlugin(),
    // All is versioned: enable NATIVE Payload versioning (history-only, bounded)
    // on every collection — the native `_versions` chain is the persistent store,
    // and restoreVersion works everywhere. Runs after contentUuid so each version
    // row carries the content-uuid (the version leaf), before naming so the `_v`
    // tables get derived names. See the `versions` skill + src/versions/cross.
    versionsPlugin(),
    // Every internal table/enum name is a content-uuid of its path — fixed
    // length, so it can never overflow SQLite's 63-char limit. Names are
    // derived, never invented; references (collection slugs, field names)
    // keep their words. Runs last to cover all assembled fields. See `database`.
    uuidNamesPlugin(),
    // The ONE catch-all — registered LAST so its endpoint is appended last:
    // the fallback of all. A routeless /api path resolves against the skill
    // corpus + serves the requested format. See src/services/skill-router.
    skillRouterPlugin(),
  ],
  secret: payloadSecret || 'INSECURE_BUILD_ONLY_PLACEHOLDER',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  logger: isProduction ? cloudflareLogger : undefined,
  localization,
  i18n: {
    /** Payload's `SupportedLanguages` type omits some ISO codes we ship (fi, el, ga, mt). */
    supportedLanguages: {
      ar,
      bg,
      cs,
      da,
      de,
      el: payloadUiFallback,
      en,
      es,
      et,
      fi: payloadUiFallback,
      fr,
      ga: payloadUiFallback,
      hr,
      hu,
      is,
      it,
      ja,
      lt,
      lv,
      mt: payloadUiFallback,
      nb,
      nl,
      pl,
      pt,
      ro,
      ru,
      sk,
      sl,
      sv,
      uk,
    } as Record<SupportedLocale, typeof en>,
    translations: adminTranslations,
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const secret = deriveSecretFromPayloadSecret(internalSecretPurpose.cron)
        if (!secret) return false
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [
      /**
       * Dunning cycle — past-due → suspend → cancel cascade for subscriptions.
       * Implementation at `src/jobs/dunningJob.ts`. Wired here per Slice ZZ
       * (was orphaned before — see CHANGELOG `[Unreleased]` Slice YY).
       *
       * Reachable via:
       *   • Cloudflare Workers: `POST /api/payload-jobs/run` + a wrangler
       *     `[[triggers]]` cron entry (recommended for the actual deploy).
       *   • Long-lived Node: `PAYLOAD_JOB_AUTORUN=true` + the `autoRun`
       *     block below; runs every 5 minutes from the default queue.
       *
       * @accounting IFRS IFRS-9 impairment-and-credit-losses
       * @accounting US-GAAP ASC-326 measurement-of-credit-losses
       * @standard EN-16931:2017 §BG-3 invoice-status-cascade
       * @audit ISO-19011:2018 audit-trail dunning-cycle
       */
      {
        slug: 'dunning-cycle',
        handler: async ({ req }: { req: PayloadRequest }) => {
          const { processDunningCycle } = await import('@/jobs/dunningJob')
          await processDunningCycle(req.payload)
          return { output: { status: 'completed' } }
        },
      },
      /**
       * BG BNB rates sync — pulls БНБ daily fixing for every BG-resident
       * tenant's reporting-currency pairs and upserts into `currency-rates`.
       * Implementation at `src/jobs/bnbRatesSync.ts`. Cadence: nightly via
       * cron (`0 1 * * *` recommended — БНБ publishes the day's fixing
       * around 16:00 EET, so a 1am UTC run captures the prior business day).
       *
       * @standard ISO-3166-1:2020 BG country-code
       * @standard ISO-4217:2015 currency-codes
       * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
       * @audit ISO-19011:2018 audit-trail external-system-evidence
       */
      {
        slug: 'bg-bnb-rates-sync',
        handler: async ({ req }: { req: PayloadRequest }) => {
          const { processBnbRatesSync } = await import('@/jobs/bnbRatesSync')
          const result = await processBnbRatesSync(req.payload)
          return { output: { status: 'completed', ...result } }
        },
      },
      /**
       * СУПТО monthly audit file — builds each tenant's Наредба Н-18
       * Приложение-38 standardized audit file for the prior calendar month
       * (НАП expects it by the 15th). Submission to НАП rides the mTLS
       * `submitBgSaft` client once the per-deployment cert config is wired.
       * Recommended cron: `0 6 5 * *` (06:00 on the 5th).
       *
       * @standard BG Наредба-Н-18 §Приложение-38 standardized-audit-file
       * @audit ISO-19011:2018 §6.4 audit-evidence
       */
      {
        slug: 'sales-audit-file',
        handler: async ({ req }: { req: PayloadRequest }) => {
          const { processSalesAuditFiles } = await import('@/jobs/salesAuditFileJob')
          const result = await processSalesAuditFiles(req.payload)
          return { output: { status: 'completed', ...result } }
        },
      },
    ],
    /** Dedicated/long-lived Node only. On Cloudflare Workers use `/api/payload-jobs/run` + Schedules/cron. */
    ...(process.env.PAYLOAD_JOB_AUTORUN === 'true'
      ? {
          autoRun: [{ cron: '*/5 * * * *', queue: 'default', limit: 25 }],
          shouldAutoRun: async () => true,
        }
      : {}),
  },
})

function getCloudflareContextFromWrangler(): Promise<CloudflareContext> {
  const isNextProductionBuild = process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD
  /**
   * During `next build`, Miniflare uses a local SQLite D1; parallel workers can hit SQLITE_BUSY.
   * Cloudflare injects `WORKERS_CI=1` (Workers Builds) or `CF_PAGES=1` (Pages) — use remote D1 then.
   * Elsewhere (e.g. GitHub Actions), set `PAYLOAD_BUILD_USE_REMOTE_D1=true`. Opt out: `=false`.
   * @see https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/
   */
  const isCloudflareBuildEnv = process.env.CF_PAGES === '1' || process.env.WORKERS_CI === '1'
  const useRemoteD1InNextBuild =
    process.env.PAYLOAD_BUILD_USE_REMOTE_D1 === 'true' ||
    (isCloudflareBuildEnv && process.env.PAYLOAD_BUILD_USE_REMOTE_D1 !== 'false')
  const remoteBindings =
    isProduction && (!isNextProductionBuild || useRemoteD1InNextBuild)

  return import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
    ({ getPlatformProxy }) =>
      getPlatformProxy({
        environment: process.env.CLOUDFLARE_ENV,
        remoteBindings,
      } satisfies GetPlatformProxyOptions),
  )
}
