#!/usr/bin/env node
// collapse/audit.mjs — the matter-twin of the `collapse` skill.
// Reads every real collection slug from payload-types.ts (the backend's own
// truth — we do not bypass Payload) and audits each against the four canonical
// SINKS, citing the scientific skill that mandates the move. The collapse map,
// COMPUTED not stored (collapse law: "the akashic record holds the list").
//
// Usage:  node src/collapse/audit.mjs [--json] [--plan]
// Sinks:  1 official-payload · 2 trinity-node · 3 lexical-content · 4 dimension

import { readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..') // src/
const TYPES = join(SRC, 'payload-types.ts')

// ── read the backend's slug set (the Config `collections` map) ───────────────
async function slugs() {
  const t = await readFile(TYPES, 'utf8')
  const block = t.match(/collections:\s*\{([\s\S]*?)\n {2}\};/)
  if (!block) return []
  return [...block[1].matchAll(/'([a-z0-9-]+)':/g)].map((m) => m[1])
}

// ── the canonical SURVIVORS: the dense core nodes everything else falls into ──
const SURVIVORS = new Set([
  'tenants', 'users', 'user-roles', 'gl-accounts', 'journal-entries', 'transactions',
  'bank-accounts', 'bank-statements', 'fiscal-periods', 'tax-codes', 'tax-jurisdictions',
  'currency-rates', 'fixed-assets', 'financial-statements', 'contracts', 'parties', 'products',
  'employees', 'projects', 'items', 'invoices', 'gl-posting-rules', 'cost-centers',
  'warehouse-locations', 'work-centers', 'work-orders', 'inventory-movements',
  'compliance-frameworks', 'fiscal-devices', 'budget-planning', 'job-positions',
  'mcp-tool-metadata', 'pages', 'posts', 'media', 'categories',
])

// ── the four sinks, as scientific rules. Each rule: a target node + the skill
// that mandates it + a test over the slug. Order matters (first match wins). ──
const RULES = [
  // SINK 1 — official Payload (framework / plugin / template already provides it)
  { sink: 1, target: 'payload (framework)', skill: 'config', why: 'Payload built-in collection',
    test: (s) => s.startsWith('payload-') },
  { sink: 1, target: 'plugin-form-builder', skill: 'plugins', why: 'form-builder plugin surface',
    test: (s) => s === 'form-submissions' },
  { sink: 1, target: 'plugin-ecommerce / stripe', skill: 'commerce', why: 'ecommerce+stripe plugin surface',
    test: (s) => /^(payment-(methods|allocations|runs|requests)|subscription-plans|usage-records|sepa-mandates|dunning-cycles)$/.test(s) },
  { sink: 4, target: 'events (polymorphic over all)', skill: 'all', why: 'gateway/integration/webhook event — a stream over any source, not only stripe',
    test: (s) => s === 'gateway-events' },
  { sink: 1, target: 'payload jobs queue', skill: 'jobs', why: 'workflow engine = Payload jobs (def+instance)',
    test: (s) => /^(workflow-definitions|workflow-instances|ai-suggestions)$/.test(s) },

  // SINK 2 — trinity node by dimension (one table, a kind/role field)
  { sink: 2, target: 'transactions', skill: 'transaction', why: 'a value-flow = transaction by kind',
    test: (s) => /^(bank-transactions|intercompany-transactions|fx-transactions|credit-memos|transaction-failures|cash-counts|expense-reports|tracking-events)$/.test(s) },
  { sink: 2, target: 'journal-entries', skill: 'accounting', why: 'a ledger posting = journal-entry by kind',
    test: (s) => /^(gl-postings|closing-entries|recurring-journals|prior-period-adjustments|rounding-adjustments|period-end-adjustments|lease-period-postings|consolidation-eliminations)$/.test(s) },
  { sink: 2, target: 'parties', skill: 'commerce', why: 'a party under a role',
    test: (s) => /^(customer-segments|vendor-quotes|vendor-scorecards|beneficial-owners|related-party-transactions|legal-entities|entity-legal-structures|entity-types)$/.test(s) },
  { sink: 2, target: 'reconciliations', skill: 'accounting', why: 'reconciliation node (merge bank/account)',
    test: (s) => /^(account-reconciliations|bank-reconciliations)$/.test(s) },
  { sink: 2, target: 'tax-jurisdictions', skill: 'tax', why: 'divergent-name duplicate → one node',
    test: (s) => s === 'taxing-jurisdictions' },
  { sink: 2, target: 'maintenance-orders', skill: 'manufacturing', why: 'request+work-order = one node by state',
    test: (s) => /^(maintenance-requests|maintenance-work-orders)$/.test(s) },
  { sink: 2, target: 'consignments', skill: 'commerce', why: 'arrangement/inventory/sales = one node by state',
    test: (s) => /^consignment-/.test(s) },
  { sink: 2, target: 'transactions', skill: 'commerce', why: 'order/requisition/payroll = transaction by kind+direction (document chain)',
    test: (s) => /^(sales-orders|purchase-orders|purchase-requisitions|payroll-runs|customs-declarations)$/.test(s) },
  { sink: 2, target: 'fixed-assets', skill: 'standard', why: 'asset measurement-class (IAS-40/41, IFRS-6) = fixed-assets by kind',
    test: (s) => /^(biological-assets|mineral-resource-assets|investment-properties)$/.test(s) },
  { sink: 2, target: 'inventory-movements', skill: 'manufacturing', why: 'receipt/run = stock movement by kind',
    test: (s) => /^(goods-receipts|production-receipts|operation-runs)$/.test(s) },
  { sink: 2, target: 'journal-entries', skill: 'accounting', why: 'lease/TP adjustment = journal-entry by kind',
    test: (s) => /^(lease-modifications|transfer-pricing-adjustments)$/.test(s) },
  { sink: 2, target: 'parties (attribute)', skill: 'commerce', why: 'KYC/profile = a party attribute, not its own table',
    test: (s) => /^(kyc-checks|financial-profiles)$/.test(s) },

  // SINK 3 — Lexical content (notes / templates / checklists / minutes = blocks)
  { sink: 3, target: 'financial-statements (disclosure blocks)', skill: 'standard', why: 'IFRS disclosure note → Lexical block',
    test: (s) => /^(commitments-and-contingencies|post-balance-sheet-events|segment-reporting|earnings-per-share|business-combinations|share-based-payments|held-for-sale-classifications|fair-value-measurements|government-grants|insurance-contracts|regulatory-deferral-accounts|csrd-disclosures|carbon-emissions|deferred-tax-items)$/.test(s) },
  { sink: 3, target: 'policy/compliance (Lexical + versions)', skill: 'versions', why: 'policy/template/checklist doc → Lexical block',
    test: (s) => /^(internal-policies|policy-versions|policy-acknowledgments|disclosure-checklists|statutory-report-templates|statutory-field-mappings|reporting-standards|reporting-mappings|compliance-notifications|compliance-deadlines|internal-controls|control-tests|remediation-plans|risk-register)$/.test(s) },
  { sink: 3, target: 'audit (Lexical narrative)', skill: 'standard', why: 'audit doc/report/minutes → Lexical block',
    test: (s) => /^(audit-committee-minutes|audit-reports|audit-findings|audit-submissions|management-certifications|management-assessment-icfr|board-actions|internal-audit-function|audit-committees|audit-committee-members)$/.test(s) },
  { sink: 3, target: 'contracts (Lexical blocks)', skill: 'standard', why: 'IFRS-15 obligation / contract clause·amendment·signature·template → block',
    test: (s) => /^(performance-obligations|contract-amendments|contract-performance|contract-signatures|contract-templates)$/.test(s) },
  { sink: 3, target: 'transactions (line blocks)', skill: 'transaction', why: 'invoice/document lines = array-block on the node',
    test: (s) => s === 'invoice-lines' },
  { sink: 3, target: 'filings (Lexical doc)', skill: 'standard', why: 'statutory filing/return/report/declaration → document',
    test: (s) => /^(tax-returns|regulatory-reports|transfer-pricing-files|data-processing-activities|customs-declarations|performance-reviews|quality-inspections)$/.test(s) },

  // SINK 4 — dimension / state-band / polymorphic tag of an existing node
  { sink: 4, target: 'fiscal-periods (horo state-band)', skill: 'horo', why: 'per-state aggregate = state-band',
    test: (s) => /(snapshots?|period-locks|post-close-analytics-reports|fiscal-period-snapshots)$/.test(s) },
  { sink: 4, target: 'audit-trail (polymorphic over all)', skill: 'all', why: 'cross-cutting concern → polymorphic, not a table',
    test: (s) => /^(audit-events|api-audit-events|audit-trail-events|audit-evidence|audit-samples|evidence-attestations)$/.test(s) },
  { sink: 4, target: 'computed (calculate, not stored)', skill: 'calculate', why: 'derivable schedule/variance/commission/calculation',
    test: (s) => /^(cost-variances|depreciation-schedules|debt-schedule|tax-calculations|sales-commissions)$/.test(s) },
  { sink: 4, target: 'fiscal-periods (dimension)', skill: 'horo', why: 'tax-period/calendar = a dimension of the period',
    test: (s) => /^(tax-periods|fiscal-calendars)$/.test(s) },
  { sink: 4, target: 'projects (children)', skill: 'whole', why: 'task/milestone = child part of the project',
    test: (s) => /^(project-tasks|project-milestones)$/.test(s) },
  { sink: 4, target: 'products (BOM structure)', skill: 'whole', why: 'bill-of-materials = the product’s part-tree',
    test: (s) => s === 'bills-of-materials' },
  { sink: 4, target: 'compliance-frameworks (dimension)', skill: 'standard', why: 'requirement/gap = a band of the framework',
    test: (s) => /^(compliance-requirements|compliance-gaps)$/.test(s) },
  { sink: 4, target: 'consent (polymorphic over all)', skill: 'all', why: 'GDPR consent/request = a concern over any actor',
    test: (s) => /^(consent-records|data-subject-requests|leave-requests)$/.test(s) },
  { sink: 4, target: 'work-centers (labor dimension)', skill: 'manufacturing', why: 'shift/time/booking = a labor/scheduling dimension',
    test: (s) => /^(work-shifts|time-entries|bookable-resources)$/.test(s) },
  { sink: 4, target: 'recruiting (pipeline states)', skill: 'horo', why: 'pipeline = the state-ring of an application',
    test: (s) => s === 'recruiting-pipeline' },
]

function classify(slug) {
  if (SURVIVORS.has(slug)) return { sink: 0, target: '(core node — survives)', skill: 'whole', why: 'canonical dense node' }
  for (const r of RULES) if (r.test(slug)) return r
  return { sink: null, target: '(REVIEW — unclassified)', skill: '?', why: 'no rule matched — needs a naming decision' }
}

const all = await slugs()
const rows = all.map((s) => ({ slug: s, ...classify(s) }))
const bySink = (n) => rows.filter((r) => r.sink === n)
const collapsed = rows.filter((r) => r.sink && r.sink >= 1)
const review = rows.filter((r) => r.sink === null)

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ total: all.length, survivors: bySink(0).length, collapsed: collapsed.length, review: review.length, rows }, null, 2))
} else {
  const label = { 0: 'CORE (survives)', 1: 'SINK 1 · official Payload', 2: 'SINK 2 · trinity node', 3: 'SINK 3 · Lexical content', 4: 'SINK 4 · dimension/state/tag' }
  console.log(`collapse audit — ${all.length} collections (backend truth)`)
  console.log(`  survives ${bySink(0).length} · collapses ${collapsed.length} · review ${review.length}\n`)
  for (const n of [1, 2, 3, 4]) {
    const g = bySink(n)
    if (!g.length) continue
    console.log(`${label[n]}  (${g.length})`)
    for (const r of g) console.log(`  ${r.slug}  →  ${r.target}   [${r.skill}: ${r.why}]`)
    console.log('')
  }
  if (review.length) {
    console.log(`NEEDS NAMING DECISION (${review.length}):`)
    console.log('  ' + review.map((r) => r.slug).join(' · '))
    console.log('')
  }
  console.log(`tally: ${all.length} → ${bySink(0).length + review.length} kept  (collapses ${collapsed.length}, ${Math.round((collapsed.length / all.length) * 100)}%)`)
}
