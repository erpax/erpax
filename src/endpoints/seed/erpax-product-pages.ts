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
 * Pages produced (18 total):
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
 *   /products/leases                — IFRS 16 / ASC 842 ROU + lease liability
 *   /products/payment-runs          — ISO 20022 pain.001/008 batch + SEPA mandates
 *   /products/dunning               — IFRS 9 / CECL collections trail
 *   /products/e-invoicing-and-tax-files — EN 16931 / Peppol / EDIFACT / SAF-T / ISO 20022 import + export
 *   /products/payroll               — IAS 19 / ASC 710 + ISO 20022 pain.001 disbursement
 *   /products/cost-centers          — IFRS 8 / ASC 280 segment dimension
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
      '`account-reconciliations` collection — IAS 7 evidence: bank / GL-to-subledger / intercompany with preparer→reviewer signoff and zero-difference enforcement',
      'AccountReconciliationsPanel widget — open / approved / rejected counts + unbalanced-approved alert',
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
  // ─── ERP-completeness round — IFRS-16 / ISO-20022 / IFRS-9 / IFRS-8 ───
  {
    slug: 'leases',
    title: 'Lease Accounting',
    tagline: 'IFRS 16 / ASC 842 — every lease on the balance sheet, no off-book surprises.',
    pitch:
      'erpax models the lessee single-model: a right-of-use (ROU) asset and a lease liability per lease, period-end interest accretion + amortisation posted via the same event-driven GL pattern as depreciation. Recognition exemptions (short-term ≤ 12 months, low-value) and modifications (term extension, scope change, discount-rate reset) are first-class.',
    standards: [
      'IFRS 16 §22-§35 — initial measurement of ROU asset',
      'IFRS 16 §26-§28 — initial measurement of lease liability (PV of unpaid payments)',
      'IFRS 16 §29-§31 — subsequent measurement (cost model)',
      'IFRS 16 §44-§46 — modifications and remeasurement',
      'US-GAAP ASC 842-20 — lessee accounting (finance vs operating)',
      'ISO 19011 audit-trail on every lease lifecycle event',
    ],
    wired: [
      '`leases` collection — master register: term, payments, discount rate, GL accounts',
      'Initial-measurement service — PV of unpaid payments at commencement, plus IDC + prepayments − incentives',
      '`lease-period-postings` collection — one row per (lease × period): interest accretion + principal + ROU amortisation; JE fires on status → posted',
      'Modification handling — scope-increase-not-separate triggers remeasurement at the new IBR',
      'Recognition-exemption flag — short-term + low-value bypass the on-balance treatment',
      'IAS 36 impairment reserve carried on the ROU asset',
      'LeasesPanel widget — active count, on-balance ROU + liability totals, recognition-exempt count',
      'LeasePeriodPostingsPanel widget — Σ interest / principal / amortisation + closing carrying amounts',
    ],
    cta: { label: 'See a lease cycle', url: '/contact' },
    metaDescription:
      'Lease accounting by erpax — IFRS 16 / ASC 842 lessee single-model with ROU asset, lease liability, and modification handling out of the box.',
  },
  {
    slug: 'payment-runs',
    title: 'Payment Runs (SEPA)',
    tagline:
      'ISO 20022 batch — pain.001 to pay vendors, pain.008 to collect from customers, pacs.004 returns auto-handled.',
    pitch:
      'A payment run aggregates AP bills (or AR direct-debit collections) into a single ISO 20022 message, signs off through preparer→authoriser segregation, and settles against the resulting bank statement automatically. SEPA Direct Debit mandates are first-class: every pain.008 transaction references an active mandate id, and the 36-month obsolescence rule is enforced.',
    standards: [
      'ISO 20022 pain.001 — Customer Credit Transfer Initiation',
      'ISO 20022 pain.008 — Customer Direct Debit Initiation',
      'ISO 20022 pacs.004 — Payment Return (auto-applied to Refunds)',
      'EPC114-06 — SEPA Credit Transfer scheme rulebook',
      'EPC130-08 — SEPA Direct Debit scheme rulebook (mandate validity)',
      'IFRS IAS-7 — statement of cash flows',
      'SOX §404 — preparer-authoriser segregation, ISO 27002 §5.4',
    ],
    wired: [
      '`payment-runs` collection — batch shell with status lifecycle (draft → pending_review → approved → exported → submitted → settled)',
      '`sepa-mandates` collection — mandate register with sequence-state (FRST/RCUR/FNAL) and 36-month obsolescence',
      'pain.001 / pain.008 XML generators (next slice) — the export step produces the wire file',
      'pacs.002 ack / pacs.004 return ingest — auto-flips run status + opens Refunds entries',
      'Bank-statement reconciliation auto-matches `payment-runs.transactions[].endToEndId` to camt.053 entries',
      'Preparer / authoriser fields with auto-stamped timestamps — SoD by construction',
    ],
    cta: { label: 'See a SEPA cycle', url: '/contact' },
    metaDescription:
      'Payment Runs by erpax — ISO 20022 SEPA batch payments (pain.001 / pain.008) with mandate register, preparer-authoriser segregation, and end-to-end reconciliation.',
  },
  {
    slug: 'dunning',
    title: 'Dunning & Collections',
    tagline:
      'IFRS 9 / CECL evidence layer — every overdue invoice has a stage, a timeline, and an audit trail.',
    pitch:
      'A scheduled job (Cloudflare cron, 15-minute tick) advances overdue invoices through a five-stage cycle: friendly reminder → first demand → second demand → legal handover → write-off. Each stage transition is appended to the cycle history with the communication sent (email / SMS / postal letter / phone call) — so the auditor querying ECL allowance evidence sees exactly what efforts were made before the bad-debt write-off.',
    standards: [
      'IFRS 9 §5.5 — expected credit loss (simplified approach for trade receivables)',
      'US-GAAP ASC 326-20 — current expected credit loss (CECL)',
      'US-GAAP ASC 310 — receivables (trade)',
      'ISO 19011 audit-trail — every stage entry preserved as evidence',
      'GDPR Art.6(1)(f) — collections under legitimate interest',
      'SOX §404 — bad-debt write-off requires controller approval (segregation of duties)',
    ],
    wired: [
      '`dunning-cycles` collection — one row per overdue invoice with stage history (append-only)',
      'Scheduled job (`dunningJob`, every 15 minutes) advances stages on configured day thresholds',
      'Pause flags — disputed / payment-plan / legal-hold / bankruptcy / manual review',
      'ECL provision linked to each cycle — feeds AllowanceForDoubtfulAccounts',
      'Write-off JE auto-created (Dr Bad Debt Expense / Cr AR or Allowance) and linked to the cycle',
      'DunningCyclesPanel widget — stage breakdown + overdue total',
    ],
    cta: { label: 'See dunning in action', url: '/contact' },
    metaDescription:
      'Dunning & Collections by erpax — IFRS 9 / CECL-grade evidence trail for every overdue invoice, scheduled stage progression, controller-approved write-offs.',
  },
  {
    slug: 'e-invoicing-and-tax-files',
    title: 'E-Invoicing & Tax-Authority Files',
    tagline:
      'EN 16931 / Peppol BIS 3.0 / UN-EDIFACT / OECD SAF-T / ISO 20022 — every wire format the EU + global tax authorities require, with bidirectional parsers + serializers.',
    pitch:
      'erpax ships a unified import/export plugin that handles every standards-bearing wire format your tenants need. Outbound: tenants generate UBL 2.1 invoices for the Peppol network, OECD SAF-T XML for monthly tax-authority submissions (PT / NO / RO / LU), pain.001 + pain.008 SEPA batches for the bank, and legacy EDIFACT INVOIC for trading partners on the old EDI rails. Inbound: incoming Peppol UBL invoices and camt.053 bank statements parse into typed collections so AP automation + bank reconciliation runs without manual data entry.',
    standards: [
      'EN 16931:2017+A1:2019 — semantic data model of the e-invoice (BG-25 line, BG-22 totals, BG-23 VAT)',
      'Peppol BIS Billing 3.0 — UBL 2.1 profile + ISO 6523 participant identifiers (22-scheme catalogue)',
      'OECD SAF-T 2.0 — Header + MasterFiles + GeneralLedgerEntries + SourceDocuments',
      'UN/EDIFACT D.96A — INVOIC + DESADV + PAYMUL with ISO 9735 syntax',
      'ISO 20022 — pain.001 (credit transfer) + pain.008 (direct debit) + camt.053 (statement)',
      'UN/CEFACT 1001 + 5305 + 4461 code lists shared across formats',
      'SOX §404 internal-controls evidence preservation on every export run',
    ],
    wired: [
      '`POST /api/export/standards` — unified outbound: format ∈ saf-t-xml | peppol-ubl | edifact | pain-001-xml | pain-008-xml',
      '`exportStandards(request)` — programmatic dispatcher returning content + RFC 6266 filename + RFC 6838 MIME type',
      '`importStandards(request)` — inbound dispatcher: format ∈ camt.053 | camt.053-multi | peppol-ubl',
      'OECD SAF-T XML: Header / MasterFiles (GL accounts + customers + suppliers + products + tax table) / GeneralLedgerEntries (per-journal grouping by sourceType) / SourceDocuments (sales invoices + purchase invoices + payments + movement of goods)',
      'Peppol UBL: full BG-1/22/23/25 + BG-29/30 + cac:/cbc: namespaces + ClassifiedTaxCategory + 22 ISO 6523 schemes',
      'EDIFACT INVOIC: UNB/UNH/BGM/DTM/NAD/LIN/IMD/QTY/PRI/MOA/TAX/UNS/UNT segments with ISO 9735 escape rules',
      'ISO 20022 pain.001: GrpHdr + PmtInf + CdtTrfTxInf with structured RF (ISO 11649) creditor reference',
      'ISO 20022 pain.008: SEPA SDD with MndtId + DtOfSgntr + LclInstrm CORE/B2B + SeqTp FRST/RCUR/OOFF/FNAL',
      'camt.053 inbound: parses Stmt → Acct + balances + Ntry → BkTxCd triplet + RltdPties + RmtInf',
      'Peppol UBL inbound: round-trips with the outbound serializer; CreditNote-2 vs Invoice-2 derived from invoice type code 380/381',
    ],
    cta: { label: 'See the export catalogue', url: '/contact' },
    metaDescription:
      'E-Invoicing & Tax Files by erpax — bidirectional Peppol BIS 3.0 / EN 16931 / UN-EDIFACT / OECD SAF-T / ISO 20022 with unified import + export plugin.',
  },
  {
    slug: 'payroll',
    title: 'Payroll & Workforce',
    tagline:
      'IAS 19 / ASC 710 — gross-to-net in one cycle, balanced JEs, SEPA batch disbursement.',
    pitch:
      'erpax models the full payroll cycle: a GDPR-classed Employees master, daily TimeEntries with overtime / leave / project allocation, and a PayrollRuns batch that goes gross-to-net (income tax + social security + pension + voluntary deductions), accrues employer-side costs (employer SS + pension + payroll taxes), books the canonical IAS 19 journal entry, and emits a pain.001 SEPA credit-transfer file the bank disburses to employee accounts on the pay date. SOX §404 four-eyes by construction — preparer ≠ authoriser.',
    standards: [
      'IFRS IAS-19 employee benefits (short-term + post-employment)',
      'IFRS IAS-19 §51 defined-contribution vs defined-benefit pension treatment',
      'US-GAAP ASC 710 compensation — general',
      'US-GAAP ASC 715 compensation — retirement benefits',
      'ISO 20022 pain.001 — credit-transfer initiation for net-pay disbursement',
      'GDPR Art.6(1)(b) lawful basis (contract) + Art.30 records of processing + Art.9 special categories of personal data',
      'ISO 27002 §5.34 privacy and protection of PII + §8.11 data masking',
      'SOX §404 — preparer / authoriser segregation by enforceSegregationOfDuties hook',
    ],
    wired: [
      '`employees` collection — workforce master with IAS 19 §51 pension plan classification, IBAN/BIC payroll account, tokenised tax + national-id refs (ISO 27002 §8.11 data-masking)',
      '`time-entries` collection — daily records with 11 leave/work kinds (regular / OT 1.5× / OT 2× / night / holiday / PTO / sick / parental / bereavement / unpaid / training)',
      '`payroll-runs` collection — batch shell with full gross-to-net line items (base + OT + bonus → income tax + SS + pension + other → net), employer-side accruals, and roll-up totals',
      'Cost-center allocation per line — feeds IFRS 8 / ASC 280 segment P&L from labor costs',
      'Status lifecycle: draft → calculated → pending_review → approved → posted (JE booked) → disbursed (pain.001 sent) → settled (bank ack)',
      'Generated pay-slip PDF per line — distributable to employees',
      'EmployeesPanel widget — active vs on-leave count, employment-type mix, IAS 19 §11 PTO accrued liability',
      'PayrollRunsPanel widget — gross / net / employer-accruals roll-up with status filter',
    ],
    cta: { label: 'See a payroll cycle', url: '/contact' },
    metaDescription:
      'Payroll & Workforce by erpax — IAS 19 / ASC 710 gross-to-net with SEPA pain.001 disbursement, GDPR-class personal data handling, and SOX §404 four-eyes by construction.',
  },
  {
    slug: 'cost-centers',
    title: 'Cost Centers & Segments',
    tagline:
      'IFRS 8 / ASC 280 — track every dollar by region, country, BU, department, team, or project.',
    pitch:
      'Cost centers are erpax\'s analytical dimension: a hierarchy that JE lines tag onto without polluting the chart of accounts. Roll-up at any level (region → country → BU → department → team) gives the controller segment P&L for IFRS 8 disclosure and the ops team a project-level burn rate. Cost-pool centers carry allocation rules (headcount / floor area / revenue %) so shared services get pushed onto consumers automatically.',
    standards: [
      'IFRS IAS-1 §99 — statement of comprehensive income (presentation)',
      'IFRS 8 — operating segments',
      'IFRS 8 §13 — 10% revenue / asset / loss reportable-segment threshold',
      'US-GAAP ASC 280 — segment reporting',
      'ISO 19011 audit-trail',
    ],
    wired: [
      '`cost-centers` collection — hierarchical, with kind discriminator (region / country / BU / dept / team / project / cost_pool / profit_center)',
      'Manager assignment — drives approval-routing for cost-center expenses',
      'Revenue / expense / capex flags per center — JE lines validate against allowed kinds',
      'Allocation rules (cost_pool only) — basis (headcount / floor area / revenue %) + percentages',
      'Reportable-segment flag — drives the IFRS 8 / ASC 280 disclosure block',
      'CostCentersPanel widget — hierarchy depth + kind breakdown + reportable count',
    ],
    cta: { label: 'See segment P&L', url: '/contact' },
    metaDescription:
      'Cost Centers & Segments by erpax — hierarchical analytical dimension with allocation rules and IFRS 8 / ASC 280 reportable-segment flagging.',
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
