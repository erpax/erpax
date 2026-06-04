/**
 * Feature Registry — canonical catalog of every gated ERPax feature
 * + its inclusion in the standard subscription tiers.
 *
 * Slice VVV (2026-05-10): added so ERPax can be truly **agnostic**
 * (freelancer → enterprise) — every collection / hook / endpoint that
 * isn't core can be gated behind a feature, and every feature maps to
 * one or more pricing tiers. The accounting plugin's collection
 * registration list AND the runtime hooks consult this registry to
 * decide whether to expose / execute for a given tenant.
 *
 * Tier ladder (low → high):
 *   - **free**       — solo bookkeeping, ≤ 50 invoices/yr, no e-signing
 *   - **solo**       — single freelancer, unlimited invoicing + payments
 *   - **team**       — small business, multi-user + multi-currency
 *   - **business**   — SME, full accounting + payroll + inventory
 *   - **enterprise** — full ERP — manufacturing + leases + consolidation
 *                      + intercompany + customs
 *
 * Per the existing `subscriptionGates.ts` infrastructure, each
 * `subscriptionPlans.limits.<feature>` boolean / number value is the
 * runtime check (see `checkFeatureAccess(req, feature)` and
 * `getFeatureLimit(req, feature)`). This registry is the **catalog**;
 * `subscriptionPlans.limits` is the **per-plan switch**.
 *
 * @standard ISO/IEC 25010:2023 quality-model functional-suitability
 * @standard NIST INCITS-359-2012 role-based-access-control
 * @security ISO-27001 A.5.15 access-control
 * @security ISO-27002 §5.15 access-control feature-entitlement
 * @accounting IFRS IFRS-15 §22 performance-obligations
 * @accounting IFRS IFRS-15 §B16 usage-based-revenue
 * @compliance SOC-2 CC6.1 logical-access-controls
 * @see ./subscriptionGates.ts
 * @see src/collections/SubscriptionPlans/
 */

/**
 * Canonical tier identifiers. Plans declare which tier they belong to
 * via `subscriptionPlans.tier`; runtime gates look up the tier and
 * compare against the feature's `tiers` array.
 */
export const TIERS = ['free', 'solo', 'team', 'business', 'enterprise'] as const
export type Tier = (typeof TIERS)[number]

/**
 * Categories group features for the admin UI + the pricing-page
 * comparison matrix on the marketing site.
 */
export const FEATURE_CATEGORIES = [
  'core',           // always included — no feature flag, just for taxonomy
  'invoicing',      // invoice/quote/credit-memo issuance
  'banking',        // bank-accounts, bank-statements, reconciliation
  'tax',            // tax-codes, tax-jurisdictions, tax-returns, e-invoicing
  'inventory',      // items, warehouse, inventory-movements
  'payroll',        // employees, time-entries, payroll-runs
  'manufacturing',  // BOMs, work-orders, production-receipts
  'logistics',      // carriers, tracking, customs
  'leasing',        // IFRS-16 leases + period postings
  'consolidation',  // intercompany + eliminations
  'compliance',     // KYC, UBO, GDPR DSR
  'evidence',       // PAdES signing, attestations, audit
  'integrations',   // PSD2 banks, Stripe, country tax APIs
] as const
export type FeatureCategory = (typeof FEATURE_CATEGORIES)[number]

export interface Feature {
  /** Stable feature identifier — matches `subscriptionPlans.limits.<id>`. */
  readonly id: string
  /** Human-readable label for admin UI / pricing page. */
  readonly label: string
  /** Feature category for grouping. */
  readonly category: FeatureCategory
  /** Tiers this feature is included in (lowest tier inclusive). */
  readonly tiers: ReadonlyArray<Tier>
  /** Optional: this feature is metered (limit is a number, not boolean). */
  readonly metered?: boolean
  /** Optional: standard(s) this feature implements (for citation). */
  readonly standards?: ReadonlyArray<string>
  /** Optional: collection slugs this feature gates (for admin-UI hide). */
  readonly collections?: ReadonlyArray<string>
}

/**
 * Single source of truth — every gated feature in ERPax with its
 * tier inclusion. New collections that should be plan-gated MUST add
 * an entry here; collections without an entry are CORE (always
 * available).
 */
export const FEATURE_REGISTRY: Readonly<Record<string, Feature>> = {
  // ─── Invoicing ──────────────────────────────────────────────────────
  invoicing_unlimited: {
    id: 'invoicing_unlimited',
    label: 'Unlimited invoices / quotes / credit memos',
    category: 'invoicing',
    tiers: ['solo', 'team', 'business', 'enterprise'],
    standards: ['EN-16931:2017'],
    collections: ['invoices', 'invoice-lines', 'quotes', 'credit-memos'],
  },
  invoicing_metered: {
    id: 'invoicing_metered',
    label: 'Invoices issued (metered, e.g. ≤ 50/year on free)',
    category: 'invoicing',
    tiers: ['free'],
    metered: true,
    standards: ['EN-16931:2017'],
  },
  einvoicing_peppol: {
    id: 'einvoicing_peppol',
    label: 'Peppol BIS 3 e-invoicing (EU B2B/B2G submission)',
    category: 'tax',
    tiers: ['business', 'enterprise'],
    standards: ['Peppol BIS 3', 'EN-16931:2017'],
  },

  // ─── Banking ────────────────────────────────────────────────────────
  banking_psd2: {
    id: 'banking_psd2',
    label: 'PSD2 / Berlin Group bank-API integrations',
    category: 'banking',
    tiers: ['team', 'business', 'enterprise'],
    standards: ['Berlin Group NextGenPSD2 v1.3', 'PSD2 RTS'],
    collections: ['bank-accounts', 'bank-transactions'],
  },
  banking_reconciliation: {
    id: 'banking_reconciliation',
    label: 'Bank reconciliation pack (SOX §404 TOM-CSH-01)',
    category: 'banking',
    tiers: ['team', 'business', 'enterprise'],
    standards: ['IAS-7 §44', 'SOX §404'],
    collections: ['bank-reconciliations', 'account-reconciliations'],
  },

  // ─── Multi-currency / FX ───────────────────────────────────────────
  multi_currency: {
    id: 'multi_currency',
    label: 'Multi-currency + IAS-21 FX revaluation',
    category: 'core',
    tiers: ['team', 'business', 'enterprise'],
    standards: ['ISO-4217:2015', 'IAS-21 §28-29'],
    collections: ['currency-rates', 'fx-transactions'],
  },

  // ─── Inventory ─────────────────────────────────────────────────────
  inventory_basic: {
    id: 'inventory_basic',
    label: 'Item master + warehouse + movements (IAS-2 §10)',
    category: 'inventory',
    tiers: ['business', 'enterprise'],
    standards: ['IFRS IAS-2 §10', 'US-GAAP ASC-330'],
    collections: ['items', 'warehouse-locations', 'inventory-movements', 'goods-receipts'],
  },

  // ─── Payroll ───────────────────────────────────────────────────────
  payroll_basic: {
    id: 'payroll_basic',
    label: 'Employees + time entries + payroll runs',
    category: 'payroll',
    tiers: ['business', 'enterprise'],
    standards: ['IAS-19', 'ASC-710', 'national labour codes'],
    collections: ['employees', 'time-entries', 'payroll-runs'],
  },

  // ─── Manufacturing (Slice UUU collections) ─────────────────────────
  manufacturing: {
    id: 'manufacturing',
    label: 'Manufacturing — BOM, work orders, cost variances, QC',
    category: 'manufacturing',
    tiers: ['enterprise'],
    standards: ['IFRS IAS-2 §10-14', 'ISA-95:2013', 'ISO 9001:2015'],
    collections: [
      'bills-of-materials',
      'work-orders',
      'production-receipts',
      'cost-variances',
      'quality-inspections',
    ],
  },

  // ─── Logistics (Slice UUU collections) ─────────────────────────────
  logistics: {
    id: 'logistics',
    label: 'Carriers + tracking + customs (INCOTERMS / WCO HS / EU UCC)',
    category: 'logistics',
    tiers: ['business', 'enterprise'],
    standards: ['INCOTERMS 2020', 'WCO HS Convention', 'EU UCC 952/2013'],
    collections: ['carriers', 'tracking-events', 'customs-declarations', 'shipments', 'returns'],
  },

  // ─── Leasing (IFRS-16) ─────────────────────────────────────────────
  leasing: {
    id: 'leasing',
    label: 'IFRS-16 / ASC-842 lease accounting',
    category: 'leasing',
    tiers: ['business', 'enterprise'],
    standards: ['IFRS IFRS-16', 'US-GAAP ASC-842'],
    collections: ['leases', 'lease-period-postings', 'lease-modifications'],
  },

  // ─── Group consolidation (IFRS-10) ─────────────────────────────────
  consolidation: {
    id: 'consolidation',
    label: 'Intercompany + group consolidation (IFRS-10 §B86)',
    category: 'consolidation',
    tiers: ['enterprise'],
    standards: ['IFRS IFRS-10 §B86', 'US-GAAP ASC-810', 'OECD BEPS Action 13'],
    collections: ['intercompany-transactions', 'consolidation-eliminations', 'legal-entities'],
  },

  // ─── Compliance (KYC / UBO / GDPR DSR) ──────────────────────────────
  compliance_aml: {
    id: 'compliance_aml',
    label: 'AML / KYC / UBO register (FATF + EU AMLD5)',
    category: 'compliance',
    tiers: ['business', 'enterprise'],
    standards: ['FATF R.10', 'FATF R.24', 'EU AMLD5'],
    collections: ['kyc-checks', 'beneficial-owners'],
  },
  compliance_gdpr_dsr: {
    id: 'compliance_gdpr_dsr',
    label: 'GDPR Data Subject Request workflow',
    category: 'compliance',
    tiers: ['team', 'business', 'enterprise'],
    standards: ['GDPR Art.15-22', 'ISO/IEC 27701:2019'],
    collections: ['data-subject-requests', 'consent-records', 'data-processing-activities'],
  },

  // ─── Evidence / signing (eIDAS) ─────────────────────────────────────
  eidas_signing: {
    id: 'eidas_signing',
    label: 'eIDAS qualified signatures + PAdES attestations',
    category: 'evidence',
    tiers: ['enterprise'],
    standards: ['EU 910/2014', 'ETSI EN 319 142-1'],
    collections: ['evidence-attestations'],
  },

  // ─── Audit / SOX ─────────────────────────────────────────────────────
  sox_audit_trail: {
    id: 'sox_audit_trail',
    label: 'SOX §404 audit trail + control tests + findings',
    category: 'evidence',
    tiers: ['business', 'enterprise'],
    standards: ['SOX §404', 'ISO 19011:2018'],
    collections: ['audit-events', 'audit-findings', 'control-tests'],
  },

  // ─── Project accounting (Slice AAAA collections) ────────────────────
  project_accounting: {
    id: 'project_accounting',
    label: 'Project accounting — projects + tasks + milestones + WIP (IFRS-15 §35)',
    category: 'core',
    tiers: ['business', 'enterprise'],
    standards: ['IFRS IFRS-15 §35', 'IFRS IFRS-15 §B14-B19', 'US-GAAP ASC-606-10-25-27'],
    collections: ['projects', 'project-tasks', 'project-milestones', 'wip-snapshots'],
  },

  // ─── Period-end / closing ───────────────────────────────────────────
  period_end_closing: {
    id: 'period_end_closing',
    label: 'Period-end accruals + adjustments + prior-period restatement + post-balance-sheet events',
    category: 'core',
    tiers: ['team', 'business', 'enterprise'],
    standards: ['IAS-1 §27', 'IAS-8 §42', 'IAS-10 §3', 'IAS-10 §8', 'IAS-10 §10', 'SOX §404'],
    collections: ['period-end-adjustments', 'prior-period-adjustments', 'rounding-adjustments', 'post-balance-sheet-events'],
  },

  // ─── AI features (Cloudflare Workers AI + AI Gateway + Vectorize) ───
  // All AI features are gated by GDPR Art.22 + EU AI Act + ISO 42001
  // and audited per-inference via the `ai-suggestions` collection.
  ai_invoice_ocr: {
    id: 'ai_invoice_ocr',
    label: 'AI invoice / receipt OCR (extract EN-16931 fields from scans)',
    category: 'integrations',
    tiers: ['business', 'enterprise'],
    metered: true,
    standards: ['EN-16931:2017', 'GDPR Art.5(1)(c)', 'EU AI Act limited-risk'],
    collections: ['ai-suggestions'],
  },
  ai_bank_matching: {
    id: 'ai_bank_matching',
    label: 'AI bank-transaction → invoice matching (semantic)',
    category: 'integrations',
    tiers: ['team', 'business', 'enterprise'],
    metered: true,
    standards: ['ISO 20022 camt.053', 'IAS-7', 'EU AI Act limited-risk'],
    collections: ['ai-suggestions'],
  },
  ai_anomaly_detection: {
    id: 'ai_anomaly_detection',
    label: 'AI journal-entry anomaly detection (SOX §404 control)',
    category: 'integrations',
    tiers: ['business', 'enterprise'],
    metered: true,
    standards: ['SOX §404', 'ISO 27002 §8.16', 'EU AI Act limited-risk'],
    collections: ['ai-suggestions'],
  },
  ai_sanctions_screening: {
    id: 'ai_sanctions_screening',
    label: 'AI sanctions / PEP fuzzy-match (FATF + EU CFSP)',
    category: 'integrations',
    tiers: ['business', 'enterprise'],
    metered: true,
    standards: ['FATF R.7', 'FATF R.12', 'EU CFSP', 'EU AI Act high-risk'],
    collections: ['ai-suggestions'],
  },
  ai_tax_classification: {
    id: 'ai_tax_classification',
    label: 'AI VAT category-code suggestion (UN/CEFACT 5305)',
    category: 'integrations',
    tiers: ['business', 'enterprise'],
    metered: true,
    standards: ['EN-16931 BT-151', 'UN/CEFACT 5305', 'EU AI Act limited-risk'],
    collections: ['ai-suggestions'],
  },
  ai_hs_code_suggestion: {
    id: 'ai_hs_code_suggestion',
    label: 'AI HS-code suggestion (WCO HS Convention)',
    category: 'integrations',
    tiers: ['enterprise'],
    metered: true,
    standards: ['WCO HS Convention', 'EU AI Act limited-risk'],
    collections: ['ai-suggestions'],
  },
  ai_document_classification: {
    id: 'ai_document_classification',
    label: 'AI document classification (invoice / contract / bank-statement)',
    category: 'integrations',
    tiers: ['team', 'business', 'enterprise'],
    metered: true,
    standards: ['EU AI Act minimal-risk', 'WCAG 2.1 AA'],
    collections: ['ai-suggestions'],
  },
  ai_semantic_search: {
    id: 'ai_semantic_search',
    label: 'AI semantic search across invoices / contracts / journal-entries (Vectorize)',
    category: 'integrations',
    tiers: ['team', 'business', 'enterprise'],
    metered: true,
    standards: ['ISO 27002 §5.15 access-control', 'EU AI Act minimal-risk'],
    collections: ['ai-suggestions'],
  },
  ai_audit_summarisation: {
    id: 'ai_audit_summarisation',
    label: 'AI audit-trail summarisation (SOX §404 walk-through)',
    category: 'integrations',
    tiers: ['enterprise'],
    metered: true,
    standards: ['ISO 19011 §6.4.6', 'SOX §404', 'EU AI Act limited-risk'],
    collections: ['ai-suggestions'],
  },

  // ─── ESG / sustainability reporting (Slice CCCC collections) ────────
  esg_reporting: {
    id: 'esg_reporting',
    label: 'EU CSRD / ESRS sustainability + GHG Protocol carbon emissions',
    category: 'compliance',
    tiers: ['enterprise'],
    standards: ['EU CSRD 2022/2464', 'EU ESRS 1/2/E1', 'GHG Protocol', 'IFRS S1 S2'],
    collections: ['csrd-disclosures', 'carbon-emissions'],
  },

  // ─── Transfer pricing (Slice CCCC) ──────────────────────────────────
  transfer_pricing: {
    id: 'transfer_pricing',
    label: 'OECD BEPS Action 13 transfer-pricing files (Master / Local / CbCR)',
    category: 'compliance',
    tiers: ['enterprise'],
    standards: ['OECD BEPS Action 13', 'OECD TPG 2022', 'EU DAC-4', 'OECD Pillar Two'],
    collections: ['transfer-pricing-files'],
  },

  // ─── Workflow engine (Slice HHHH collections) ──────────────────────
  workflow_engine: {
    id: 'workflow_engine',
    label: 'BPMN-style workflow definitions + instances (SOX §404 multi-step approval)',
    category: 'core',
    tiers: ['business', 'enterprise'],
    standards: ['ISO/IEC 19510:2013 BPMN-2.0', 'SOX §404', 'ISO 27002 §5.4'],
    collections: ['workflow-definitions', 'workflow-instances'],
  },

  // ─── CRM (Slice EEEE collections) ──────────────────────────────────
  crm: {
    id: 'crm',
    label: 'CRM — leads, opportunities, activities, segments, commissions',
    category: 'core',
    tiers: ['team', 'business', 'enterprise'],
    standards: ['IFRS IFRS-15 §9 §91-94', 'GDPR Art.5 Art.6'],
    collections: ['leads', 'opportunities', 'activities', 'customer-segments', 'sales-commissions'],
  },

  // ─── Country bundles (per-tenant choice) ────────────────────────────
  country_bundles: {
    id: 'country_bundles',
    label: 'Per-country API bundles (БНБ / НАП / VIES / ECB / etc.)',
    category: 'integrations',
    tiers: ['team', 'business', 'enterprise'],
    standards: ['per-country', 'EU CFSP'],
    metered: true, // 1 included per plan, additional countries metered
  },

  // ─── Slice BBBBB-prep — IFRS 100% coverage gap-fill (12 gates) ──────
  deferred_tax: {
    id: 'deferred_tax',
    label: 'Deferred tax assets / liabilities (IAS 12)',
    category: 'core',
    tiers: ['business', 'enterprise'],
    standards: ['IFRS IAS-12 §15', 'IFRS IAS-12 §34', 'IFRS IAS-12 §47', 'US-GAAP ASC-740'],
    collections: ['deferred-tax-items'],
  },
  share_based_payments: {
    id: 'share_based_payments',
    label: 'Share-based payment grants — IFRS 2 (options / RSU / PSU / ESPP / SAR)',
    category: 'core',
    tiers: ['business', 'enterprise'],
    standards: ['IFRS IFRS-2 §10', 'IFRS IFRS-2 §15', 'IFRS IFRS-2 §30', 'US-GAAP ASC-718'],
    collections: ['share-based-payments'],
  },
  business_combinations: {
    id: 'business_combinations',
    label: 'Business combinations + PPA + goodwill — IFRS 3',
    category: 'core',
    tiers: ['business', 'enterprise'],
    standards: ['IFRS IFRS-3 §10', 'IFRS IFRS-3 §32', 'IFRS IFRS-3 §45', 'US-GAAP ASC-805'],
    collections: ['business-combinations'],
  },
  held_for_sale: {
    id: 'held_for_sale',
    label: 'Held-for-sale + discontinued operations — IFRS 5',
    category: 'core',
    tiers: ['business', 'enterprise'],
    standards: ['IFRS IFRS-5 §6', 'IFRS IFRS-5 §15', 'IFRS IFRS-5 §31', 'US-GAAP ASC-205-20', 'US-GAAP ASC-360-10'],
    collections: ['held-for-sale-classifications'],
  },
  fair_value_measurements: {
    id: 'fair_value_measurements',
    label: 'Fair-value Level 1/2/3 hierarchy register — IFRS 13',
    category: 'core',
    tiers: ['business', 'enterprise'],
    standards: ['IFRS IFRS-13 §72', 'IFRS IFRS-13 §76', 'IFRS IFRS-13 §81', 'IFRS IFRS-13 §86', 'IFRS IFRS-13 §93', 'US-GAAP ASC-820'],
    collections: ['fair-value-measurements'],
  },
  investment_property: {
    id: 'investment_property',
    label: 'Investment property — IAS 40 (rentals / capital appreciation)',
    category: 'core',
    tiers: ['business', 'enterprise'],
    standards: ['IFRS IAS-40 §5', 'IFRS IAS-40 §30', 'IFRS IAS-40 §33', 'IFRS IAS-40 §56', 'IFRS IAS-40 §74'],
    collections: ['investment-properties'],
  },
  agriculture: {
    id: 'agriculture',
    label: 'Biological assets — IAS 41 (livestock / crops / forestry / aquaculture)',
    category: 'core',
    tiers: ['business', 'enterprise'],
    standards: ['IFRS IAS-41 §10', 'IFRS IAS-41 §12', 'IFRS IAS-41 §13', 'IFRS IAS-41 §26', 'IFRS IAS-41 §40'],
    collections: ['biological-assets'],
  },
  earnings_per_share: {
    id: 'earnings_per_share',
    label: 'Earnings per share — IAS 33 (basic + diluted)',
    category: 'core',
    tiers: ['business', 'enterprise'],
    standards: ['IFRS IAS-33 §10', 'IFRS IAS-33 §11', 'IFRS IAS-33 §31', 'IFRS IAS-33 §66', 'US-GAAP ASC-260'],
    collections: ['earnings-per-share'],
  },
  insurance_contracts: {
    id: 'insurance_contracts',
    label: 'Insurance contracts — IFRS 17 (GMM / PAA / VFA)',
    category: 'core',
    tiers: ['enterprise'],
    standards: ['IFRS IFRS-17 §3', 'IFRS IFRS-17 §32', 'IFRS IFRS-17 §38', 'IFRS IFRS-17 §53', 'IFRS IFRS-17 §B100', 'IFRS IFRS-17 §93'],
    collections: ['insurance-contracts'],
  },
  extractive_industries: {
    id: 'extractive_industries',
    label: 'Mineral-resource exploration & evaluation — IFRS 6',
    category: 'core',
    tiers: ['enterprise'],
    standards: ['IFRS IFRS-6 §3', 'IFRS IFRS-6 §8', 'IFRS IFRS-6 §17', 'IFRS IFRS-6 §18'],
    collections: ['mineral-resource-assets'],
  },
  rate_regulated_activities: {
    id: 'rate_regulated_activities',
    label: 'Regulatory deferral accounts — IFRS 14 (utilities / telcos under price-cap)',
    category: 'core',
    tiers: ['enterprise'],
    standards: ['IFRS IFRS-14 §3', 'IFRS IFRS-14 §16', 'IFRS IFRS-14 §27'],
    collections: ['regulatory-deferral-accounts'],
  },

  // ─── Slice ZZZZ — Consignations + Bookings + Facility Management ────
  consignment_inventory: {
    id: 'consignment_inventory',
    label: 'Consignment inventory + sales (IFRS-15 §B77-B78)',
    category: 'core',
    tiers: ['business', 'enterprise'],
    standards: ['IFRS IFRS-15 §B77-B78', 'IFRS IFRS-15 §38', 'IFRS IAS-2 §6', 'US-GAAP ASC-606-10-55-79'],
    collections: ['consignment-arrangements', 'consignment-inventory', 'consignment-sales'],
  },
  resource_bookings: {
    id: 'resource_bookings',
    label: 'Resource bookings (rooms / vehicles / equipment / time slots)',
    category: 'core',
    tiers: ['team', 'business', 'enterprise'],
    standards: ['ISO 18513:2021', 'IFRS IFRS-15 §35', 'IFRS IFRS-15 §38', 'IFRS IFRS-15 §B40', 'rfc-5545'],
    collections: ['bookable-resources', 'bookings'],
  },
  facility_management: {
    id: 'facility_management',
    label: 'Facility management — properties + spaces + maintenance (ISO 41001 / ISO 55000)',
    category: 'core',
    tiers: ['business', 'enterprise'],
    standards: ['ISO 41001:2018', 'ISO 41011:2017', 'ISO 41013:2017', 'ISO 55000:2014', 'ISO 14224:2016', 'EN 13306:2017', 'EN 15221-6:2011', 'ISO 19650-1:2018'],
    collections: ['properties', 'spaces', 'maintenance-requests', 'maintenance-work-orders'],
  },
} as const

export type FeatureId = keyof typeof FEATURE_REGISTRY

/**
 * Returns the set of features included in a given tier.
 * Free tier gets the smallest superset; enterprise gets every feature.
 */
export function featuresForTier(tier: Tier): ReadonlyArray<Feature> {
  return Object.values(FEATURE_REGISTRY).filter((f) => f.tiers.includes(tier))
}

/**
 * Returns all features that gate a given collection slug.
 * A collection may be gated by 0 (always-available CORE) or 1+ features.
 */
export function featuresForCollection(slug: string): ReadonlyArray<Feature> {
  return Object.values(FEATURE_REGISTRY).filter((f) =>
    f.collections?.includes(slug),
  )
}

/**
 * Returns true if a collection is "core" (no feature gates) — available
 * on every tier including free.
 */
export function isCoreCollection(slug: string): boolean {
  return featuresForCollection(slug).length === 0
}
