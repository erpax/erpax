/**
 * erpax product pages — marketing seed for monetization.
 *
 * One canonical Page per business cycle, nested under `/products/<slug>`.
 * Each page pitches a wired capability with the standards backing,
 * what's implemented, an SEO meta block, and a CTA. Use this seed to
 * bootstrap the marketing surface of a tenant in one call:
 *
 *   await seedErpaxProductPages(payload, { tenantId, parentSlug: 'products' })
 *
 * Pages produced (12 total):
 *   /products                       — index (matrix of all capabilities)
 *   /products/quote-to-cash         — Sales / order management
 *   /products/procure-to-pay        — Purchasing / vendor bills
 *   /products/subscription-billing  — SaaS recurring revenue (IFRS 15 / ASC 606)
 *   /products/multi-currency        — FX, revaluation, IAS 21 / ASC 830
 *   /products/multi-tenant          — ISO 27001 A.5.23 cloud-service isolation
 *   /products/inventory             — IAS 2 / ASC 330 stock & COGS
 *   /products/period-close          — SOX §404 close workflow
 *   /products/audit-trail           — ISO 19011 evidence on every write
 *   /products/tax-engine            — Per-country tax (VAT / GST / Sales Tax)
 *   /products/financial-reporting   — IFRS / US-GAAP statement generation
 *   /products/international         — Country/currency/locale cascade
 *
 * @standard schema.org Product
 * @standard schema.org WebSite breadcrumb
 * @standard ISO-25010 usability marketing-content
 * @compliance WCAG-2.1 level-AA accessible-marketing-pages
 * @audit ISO-19011:2018 audit-trail seed-provenance
 * @see docs/ARCHITECTURE_MAP.md
 */

import type { Payload, RequiredDataFromCollectionSlug } from 'payload'

// ─── Rich-text builders (DRY) ──────────────────────────────────────────────

interface LexNode {
  type: string
  children?: LexNode[]
  text?: string
  tag?: string
  version?: number
  detail?: number
  format?: number | string
  mode?: string
  style?: string
  direction?: string
  indent?: number
  textFormat?: number
  fields?: Record<string, unknown>
}

const text = (s: string, format: number = 0): LexNode => ({
  type: 'text',
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text: s,
  version: 1,
})

const heading = (level: 'h1' | 'h2' | 'h3', s: string): LexNode => ({
  type: 'heading',
  children: [text(s)],
  direction: 'ltr',
  format: '',
  indent: 0,
  tag: level,
  version: 1,
})

const paragraph = (children: LexNode[]): LexNode => ({
  type: 'paragraph',
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

const bullet = (s: string): LexNode => ({
  type: 'listitem',
  children: [text(s)],
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

const list = (items: string[]): LexNode => ({
  type: 'list',
  children: items.map(bullet),
  direction: 'ltr',
  format: '',
  indent: 0,
  tag: 'ul',
  version: 1,
})

const richText = (children: LexNode[]) => ({
  root: {
    type: 'root',
    children,
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
})

// ─── Per-page builder ──────────────────────────────────────────────────────

interface ProductPageSpec {
  slug: string
  title: string
  tagline: string
  pitch: string
  standards: string[]
  wired: string[]
  cta: { label: string; url: string }
  metaDescription: string
}

function buildPage(
  spec: ProductPageSpec,
  parentId?: string | number,
  tenantId?: string | number,
): RequiredDataFromCollectionSlug<'pages'> {
  const layout: RequiredDataFromCollectionSlug<'pages'>['layout'] = [
    {
      blockName: 'Pitch',
      blockType: 'content',
      columns: [
        {
          richText: richText([
            heading('h1', spec.title),
            paragraph([text(spec.tagline)]),
            paragraph([text(spec.pitch)]),
            heading('h2', 'What erpax ships out of the box'),
            list(spec.wired),
            heading('h2', 'Standards backing'),
            list(spec.standards),
          ]),
          size: 'full',
        },
      ],
    },
    {
      blockName: 'CTA',
      blockType: 'cta',
      richText: richText([
        heading('h2', 'Ready to see it?'),
        paragraph([text(spec.cta.label)]),
      ]),
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: spec.cta.label,
            url: spec.cta.url,
          },
        },
      ],
    },
  ] as RequiredDataFromCollectionSlug<'pages'>['layout']

  const data = {
    slug: spec.slug,
    _status: 'published' as const,
    title: spec.title,
    layout,
    meta: {
      title: `${spec.title} — erpax`,
      description: spec.metaDescription,
    },
  } as RequiredDataFromCollectionSlug<'pages'>

  if (parentId !== undefined) {
    ;(data as Record<string, unknown>).parent = parentId
  }
  if (tenantId !== undefined) {
    ;(data as Record<string, unknown>).tenant = tenantId
  }
  return data
}

// ─── Canonical product-page specs ──────────────────────────────────────────

const PRODUCT_INDEX: ProductPageSpec = {
  slug: 'products',
  title: 'erpax products',
  tagline: 'A canonical, multi-tenant ERP wired to international standards.',
  pitch:
    'Every cycle below ships with hooks, events, GL postings, audit trails, and segregation of duties — backed by IFRS, US-GAAP, ISO, and SOX citations in code.',
  standards: [
    'ISO 27001 A.5.23 cloud-service tenant isolation',
    'SOX §302 disclosure controls + §404 internal controls',
    'IFRS 15 / ASC 606 revenue recognition',
    'IFRS IAS-1 / US-GAAP ASC-205 statement presentation',
    'OECD SAF-T 2.0 (planned) for tax-authority audit files',
    'WCAG 2.1 AA (planned) for the admin and customer surfaces',
  ],
  wired: [
    'Quote-to-Cash — Order activation → revenue + COGS in one transaction',
    'Procure-to-Pay — Vendor bills with three-way-match (planned)',
    'Subscription Billing — IFRS 15 deferred-revenue + recognition',
    'Multi-Currency — IAS 21 / ASC 830 FX revaluation',
    'Multi-Tenant — Per-tenant config sandbox (currency/locale/standard)',
    'Inventory — IAS 2 / ASC 330 cost flow + COGS recognition',
    'Period Close — SOX §404 lock workflow with four-eyes',
    'Audit Trail — ISO 19011 structured event on every write',
    'Tax Engine — Per-country jurisdiction lookup (planned per-country adapters)',
    'Financial Reporting — Trial Balance, Balance Sheet, Income Statement, Cash Flow',
    'International — Country drives currency, locale, accounting framework',
  ],
  cta: { label: 'Talk to us', url: '/contact' },
  metaDescription:
    'erpax — a canonical multi-tenant ERP. Standards-backed, audit-ready, internationally aware out of the box.',
}

const PRODUCT_PAGES: ProductPageSpec[] = [
  {
    slug: 'quote-to-cash',
    title: 'Quote-to-Cash',
    tagline: 'From order to cash, every cent posted to the GL on the same transaction.',
    pitch:
      'When an order activates, erpax books AR, Revenue, Sales Tax Payable, COGS, and Inventory in a single balanced journal entry — no nightly reconciliation, no out-of-band postings.',
    standards: [
      'IFRS 15 §38b — point-in-time revenue recognition for shipped goods',
      'US-GAAP ASC 606-10-25-30c — control transfer at delivery',
      'IAS 2 / ASC 330 — COGS recognition on sale',
      'ISO 19011 — every state transition emits an audit-trail event',
    ],
    wired: [
      'order:activated → Dr AR / Cr Revenue / Cr Sales Tax / Dr COGS / Cr Inventory',
      'order:cancelled → reverses the activation entry',
      'order:refunded → Dr Revenue / Cr Refunds Payable',
      'Audit-trail emission on every status change',
      'Five lifecycle events: activated, shipped, completed, cancelled, refunded',
    ],
    cta: { label: 'See a demo cycle', url: '/contact' },
    metaDescription:
      'Quote-to-Cash by erpax — every order activation books revenue + COGS in one balanced transaction, IFRS 15 / ASC 606 compliant.',
  },
  {
    slug: 'procure-to-pay',
    title: 'Procure-to-Pay',
    tagline: 'Vendor bills, three-way-match, and AP that never drifts from the GL.',
    pitch:
      'Every vendor bill activation books expense + AP atomically. Payment runs draw from AP and credit cash, with audit-trail evidence at each step.',
    standards: [
      'IFRS IAS-37 provisions and contingent liabilities',
      'US-GAAP ASC 405 liabilities — accounts payable',
      'SOX §404 — three-way-match (PO ↔ receipt ↔ invoice) (planned)',
      'ISO 19011 audit-trail',
    ],
    wired: [
      'bill:activated → Dr Expense / Cr AP / Dr Input Tax Asset',
      'bill:paid → Dr AP / Cr Cash',
      'bill:reversed → reversal entry on cancel',
      'payment:sent → cash-out posting',
      'Three-way-match enforcement (TBD)',
    ],
    cta: { label: 'Contact us', url: '/contact' },
    metaDescription:
      'Procure-to-Pay by erpax — vendor bills with atomic GL postings and three-way-match readiness.',
  },
  {
    slug: 'subscription-billing',
    title: 'Subscription Billing',
    tagline: 'Recurring revenue with deferred-revenue mechanics built in.',
    pitch:
      'Subscriptions activate as contract liabilities (deferred revenue), recognise as revenue when each period invoices, and reverse cleanly on cancellation. Stripe webhooks emit the events; the GL receives them.',
    standards: [
      'IFRS 15 §31 — performance obligation + contract liability',
      'IFRS 15 §35 — revenue recognition over time',
      'IFRS 15 §B22 / §B47 — refunds and cancellations',
      'US-GAAP ASC 606-10-25 — transfer of control',
      'US-GAAP ASC 340-40 — deferred contract costs',
    ],
    wired: [
      'subscription:activated → Dr AR / Cr Deferred Revenue',
      'subscription:invoiced → Dr Deferred Revenue / Cr Subscription Revenue',
      'subscription:cancelled → reverses unrecognised liability + books refund',
      'subscription:refunded → settles the refund liability against cash',
      'Stripe webhook → emits subscription:invoiced automatically',
    ],
    cta: { label: 'See it in action', url: '/contact' },
    metaDescription:
      'Subscription Billing by erpax — IFRS 15 / ASC 606 deferred-revenue mechanics, Stripe-webhook driven, audit-ready.',
  },
  {
    slug: 'multi-currency',
    title: 'Multi-Currency',
    tagline: 'Any ISO 4217 code. FX revaluation. Realised + unrealised gains posted to the GL.',
    pitch:
      'Every tenant picks a reporting currency; users pick a display currency. FX rates flow from any source (manual, ECB, bank API). Period-end revaluation books unrealised gains/losses to the GL automatically.',
    standards: [
      'ISO 4217:2015 §5 alphabetic currency codes — any code accepted',
      'IFRS IAS 21 — effects of changes in foreign exchange rates',
      'IFRS IAS 29 — financial reporting in hyperinflationary economies',
      'US-GAAP ASC 830 — foreign currency matters',
      'ISO 8601-1:2019 — rate-date stamping',
    ],
    wired: [
      'CurrencyRates collection with from/to/rate/date/source',
      'multi-currency.service: convert, revalue, period-end adjust',
      'Trial balance in original + base currency',
      'Inverse-rate auto-calc',
      'Per-tenant baseCurrency in tenant.config.currency.reportingCurrency',
    ],
    cta: { label: 'Multi-currency walkthrough', url: '/contact' },
    metaDescription:
      'Multi-Currency by erpax — ISO 4217 universal, IAS 21 / ASC 830 compliant, FX revaluation auto-posted.',
  },
  {
    slug: 'multi-tenant',
    title: 'Multi-Tenant',
    tagline: 'Per-tenant Payload-config sandbox. Tenant isolation enforced at every hook.',
    pitch:
      'Each tenant carries its own currency, locale, country, accounting standard, and feature flags. Cross-tenant data leakage is prevented by `autoPopulateHost` + `scopedAccess` on every collection.',
    standards: [
      'ISO 27001 A.5.23 — cloud-service tenant isolation',
      'ISO 27002 §5.15 — access control',
      'ISO 27002 §8.3 — information access restriction',
      'GDPR Art.5(1)(f) — integrity and confidentiality',
      'SOC 2 CC6.1 — logical access controls',
    ],
    wired: [
      'tenant.config = Payload-shaped sandbox (identity, localization, currency, accounting)',
      'user.config = same shape, narrowed to presentation',
      'resolveRequestConfig(req) — single canonical cascade resolver',
      'scopedAccess() / roleScopedAccess() / tenantAdmin — three-tier access',
      'autoPopulateHost on every multi-tenant collection',
    ],
    cta: { label: 'Architecture details', url: '/contact' },
    metaDescription:
      'Multi-Tenant by erpax — Payload-shaped per-tenant sandbox config, ISO 27001 / SOC 2 isolation enforced at every hook.',
  },
  {
    slug: 'inventory',
    title: 'Inventory',
    tagline: 'IAS 2 / ASC 330 cost flow. COGS posted on every sale.',
    pitch:
      'Items track quantity + cost. Stock movements emit inventory:purchased and inventory:sold events; the GL books the matching Inventory + COGS entries. Cost flow methods (FIFO/LIFO/Weighted Average) are configurable at tenant level.',
    standards: [
      'IFRS IAS 2 — inventories and cost-of-inventories formulas',
      'US-GAAP ASC 330 — inventory and cost-flow assumptions',
      'IAS 36 — impairment of assets',
      'ASC 360 — property, plant and equipment',
    ],
    wired: [
      'inventory:purchased → Dr Inventory / Cr AP',
      'inventory:sold → Dr COGS / Cr Inventory',
      'Items collection with cost + quantity',
      'FixedAssets collection with depreciation schedule',
      'Item afterChange hook posts to GL automatically',
    ],
    cta: { label: 'See the inventory cycle', url: '/contact' },
    metaDescription:
      'Inventory by erpax — IAS 2 / ASC 330 cost flow with auto-COGS recognition on every sale.',
  },
  {
    slug: 'period-close',
    title: 'Period Close',
    tagline: 'Open → Closed → Locked. Four-eyes principle on every transition.',
    pitch:
      'Fiscal periods follow a strict lifecycle: open → closed → locked. The user who created a period cannot close it; the user who closed it cannot lock it. Every transition emits an audit-trail event for SOX §404 evidence.',
    standards: [
      'SOX §404 — period-close integrity',
      'ISO 27002 §5.4 — segregation of duties',
      'IFRS IAS-8 — accounting policies, changes and errors',
      'US-GAAP ASC 250 — accounting changes',
      'ISO 19011 — audit-trail evidence preservation',
    ],
    wired: [
      'FiscalPeriods collection with open/closed/locked status',
      'enforceSegregationOfDuties on closedBy ≠ createdBy',
      'enforceSegregationOfDuties on lockedBy ≠ createdBy',
      'Auto-stamp closedAt / lockedAt / reopenedAt',
      'validateNotLocked rejects back-dated edits inside locked periods',
      'auditTrailAfterChange on every status change',
    ],
    cta: { label: 'Compliance walkthrough', url: '/contact' },
    metaDescription:
      'Period Close by erpax — SOX §404 lock workflow with four-eyes principle and structured audit trail.',
  },
  {
    slug: 'audit-trail',
    title: 'Audit Trail',
    tagline: 'Every write. Every transition. Structured events to your log aggregator.',
    pitch:
      'The auditTrailAfterChange hook fires on every collection write — invoice, payment, journal entry, period close. Events carry collection, operation, document ID, user ID, tenant ID, previous status, next status, and timestamp. Stream to Loki / Datadog / CloudWatch.',
    standards: [
      'ISO 19011:2018 — audit-trail change-event-emission',
      'SOC 2 CC4.1 — monitoring and evaluation',
      'SOX §404 — internal controls evidence preservation',
      'GDPR Art.30 — records of processing activities',
    ],
    wired: [
      'auditTrailAfterChange(slug) — drop-in afterChange hook',
      'Wired on 8+ collections (Slice ZZ)',
      'Structured req.payload.logger.info events with audit:true',
      'Per-event provenance (sources field on resolved config)',
    ],
    cta: { label: 'See an audit-trail demo', url: '/contact' },
    metaDescription:
      'Audit Trail by erpax — structured ISO 19011 / SOC 2 / SOX §404 events on every collection write.',
  },
  {
    slug: 'tax-engine',
    title: 'Tax Engine',
    tagline: 'Per-country VAT, GST, Sales Tax, HST, CGST+SGST. Right rate at order time.',
    pitch:
      'Tax codes and jurisdictions are first-class collections. The tax engine looks up the right rate at order activation based on customer + seller country + product category. Tax authority audit files (SAF-T family) export from the same data.',
    standards: [
      'EN 16931:2017 §BG-23 — VAT breakdown',
      'OECD SAF-T 2.0 — tax-authority audit file (planned)',
      'ISO 3166-1 alpha-2 — country codes for jurisdiction',
      'ISO 3166-2 — subdivisions for state-level tax',
    ],
    wired: [
      'TaxCodes collection with rate + category',
      'TaxJurisdictions collection per ISO 3166',
      'TaxCalculations with computed liability snapshots',
      'autoSetTimestamp on filed/paid status transitions',
      'auditTrailAfterChange on every recalc',
    ],
    cta: { label: 'Tax compliance walkthrough', url: '/contact' },
    metaDescription:
      'Tax Engine by erpax — per-country VAT/GST/Sales Tax with EN 16931 + OECD SAF-T 2.0 backing.',
  },
  {
    slug: 'financial-reporting',
    title: 'Financial Reporting',
    tagline: 'Trial Balance, Balance Sheet, Income Statement, Cash Flow. PDF + Excel.',
    pitch:
      'Statement generators run from the GL. PDF (ISO 32000) and Excel (ISO/IEC 29500) outputs ship out of the box. Per-standard adapters (IFRS vs US-GAAP layout) are wired through the tenant config.',
    standards: [
      'IFRS IAS-1 — presentation of financial statements',
      'IFRS IAS-7 — statement of cash flows',
      'US-GAAP ASC 205 — presentation of financial statements',
      'US-GAAP ASC 230 — statement of cash flows',
      'ISO 32000-2:2020 — PDF',
      'ISO/IEC 29500:2016 — Office Open XML xlsx',
    ],
    wired: [
      'TrialBalanceGenerator, BalanceSheetGenerator, IncomeStatementGenerator, CashFlowStatementGenerator',
      'PDFExporter (Puppeteer-driven)',
      'ExcelExporter (ExcelJS-driven)',
      'Per-standard adapter dispatch via getCountryAccountingStandard()',
      'Multi-currency translation in trial balance',
    ],
    cta: { label: 'Sample report', url: '/contact' },
    metaDescription:
      'Financial Reporting by erpax — IFRS / US-GAAP statement generators with PDF and Excel export.',
  },
  {
    slug: 'international',
    title: 'International',
    tagline: 'Country drives currency, locale, accounting framework, and document format.',
    pitch:
      'erpax welcomes any ISO 3166-1 country and any ISO 4217 currency. Documents look different per country — invoice formats, postal-address layouts, balance-sheet ordering — automatically. Set tenant.config.identity.country and the rest cascades.',
    standards: [
      'ISO 3166-1:2020 — alpha-2 country codes (any code accepted)',
      'ISO 4217:2015 — alphabetic currency codes (any code accepted)',
      'BCP 47 — language tags',
      'ECMA 402 — internationalization API',
      'ISO 19160-4:2017 / UPU S42 — international postal addressing',
      'ISO 8601-1:2019 — date and time',
    ],
    wired: [
      'COUNTRY_PROFILES table for 15 well-known countries',
      'address-formats.ts with per-country line ordering + postcode regex',
      'resolveRequestConfig(req) — single cascade for currency/locale/country/accounting',
      'getTenantDefaults(country) — accept any ISO 3166-1 code',
      'isIso4217Currency vs isSupportedCurrency — broad vs curated checks',
    ],
    cta: { label: 'Per-country walkthrough', url: '/contact' },
    metaDescription:
      'International by erpax — multi-tenant SaaS where every tenant\'s country drives currency, locale, accounting framework, and document format.',
  },
]

// ─── Public seed entry point ──────────────────────────────────────────────

export interface SeedErpaxProductPagesOptions {
  /** Tenant to attach the pages to (omitted for the deployment-default tenant). */
  tenantId?: string | number
  /** Override the parent slug (default `'products'`). */
  parentSlug?: string
  /** Skip pages whose slug already exists for this tenant (default `true`). */
  skipExisting?: boolean
}

export interface SeedErpaxProductPagesResult {
  parentId: string | number
  created: string[]
  skipped: string[]
}

/**
 * Seed the product/marketing pages tree under `/products/<slug>`.
 *
 * Idempotent: skips slugs that already exist for the same tenant.
 */
export async function seedErpaxProductPages(
  payload: Payload,
  options: SeedErpaxProductPagesOptions = {},
): Promise<SeedErpaxProductPagesResult> {
  const { tenantId, parentSlug = 'products', skipExisting = true } = options
  const created: string[] = []
  const skipped: string[] = []

  // 1. Index page (becomes parent for all sub-pages).
  const indexSpec: ProductPageSpec = { ...PRODUCT_INDEX, slug: parentSlug }
  let parentId: string | number
  const existingIndex = await payload.find({
    collection: 'pages',
    where: {
      and: [
        { slug: { equals: parentSlug } },
        ...(tenantId !== undefined ? [{ tenant: { equals: tenantId } }] : []),
      ],
    },
    limit: 1,
  })
  if (existingIndex.docs.length > 0 && skipExisting) {
    parentId = existingIndex.docs[0].id
    skipped.push(parentSlug)
  } else {
    const indexDoc = await payload.create({
      collection: 'pages',
      data: buildPage(indexSpec, undefined, tenantId),
    })
    parentId = indexDoc.id
    created.push(parentSlug)
  }

  // 2. Each product page nested under the index.
  for (const spec of PRODUCT_PAGES) {
    const existing = await payload.find({
      collection: 'pages',
      where: {
        and: [
          { slug: { equals: spec.slug } },
          ...(tenantId !== undefined ? [{ tenant: { equals: tenantId } }] : []),
        ],
      },
      limit: 1,
    })
    if (existing.docs.length > 0 && skipExisting) {
      skipped.push(spec.slug)
      continue
    }
    await payload.create({
      collection: 'pages',
      data: buildPage(spec, parentId, tenantId),
    })
    created.push(spec.slug)
  }

  return { parentId, created, skipped }
}
