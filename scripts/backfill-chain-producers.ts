/**
 * Backfill `producer:` fields in BUSINESS_CHAINS registry — TypeScript.
 *
 * Slice CCCCCCCC (2026-05-11). Per user 'ensure only javascript/typescript'.
 * Replaces the prior Python sibling.
 *
 * For each chain step that declares `emits:` but no `producer:`, infer
 * (onStatus | onCreate, aggregate) from the action verb + collection
 * slug, then rewrite the step inline.
 *
 * Usage (from repo root):
 *   pnpm exec tsx scripts/backfill-chain-producers.ts
 *   pnpm exec tsx scripts/backfill-chain-producers.ts --dry-run
 *
 * Idempotent: a step that already has `producer:` is skipped.
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability — single-source-of-truth wiring
 * @audit ISO 19011:2018 §6.4.6 producer→event traceability
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REG = resolve(__dirname, '..', 'src/services/business-chains/registry.ts')

const ACTION_TO_STATUS: Record<string, string | null> = {
  submit: 'submitted', approve: 'approved', reject: 'rejected',
  cancel: 'cancelled', confirm: 'confirmed', post: 'posted',
  create: null,  // → onCreate: true
  activate: 'activated', complete: 'completed', finish: 'finished',
  materialise: 'materialised', snapshot: 'posted',
  revalue: 'revalued', reconcile: 'reconciled',
  recognise: 'recognised', remeasure: 'remeasured',
  use: 'used', reverse: 'reversed',
  lock: 'locked', generate: 'generated',
  commence: 'commenced', terminate: 'terminated',
  sign: 'signed', send: 'sent', dispatch: 'dispatched',
  deliver: 'delivered', identify: 'identified',
  log: 'logged', open: 'opened', register: 'registered',
  hire: 'hired', apply: 'applied',
  qualify: 'qualified', 'qualify-mql': 'mql',
  run: 'run', release: 'released', catalogue: 'catalogued',
  record: 'recorded', onboard: 'onboarded',
  observe: 'observed', 'observe-domain-event': 'observed',
  finalise: 'finalised',
  enqueue: 'enqueued', process: 'processed', reprocess: 'reprocessed',
  book: 'booked', request: 'requested',
  'check-in': 'checked_in', 'check-out': 'checked_out',
  file: 'filed', assure: 'assured', rollup: 'rolled_up',
  spawn: 'spawned', 'step-decision': 'step_decided',
  'post-leg-a': 'posted', 'post-leg-b': 'posted',
  'post-after-mod': 'posted',
  'ship-to-consignee': 'issued', 'issue-parts': 'issued',
  issue: 'issued',
  'allocate-1': 'posted', 'allocate-2': 'posted', 'allocate-3': 'posted',
  'three-way-match': 'matched', 'mark-paid': 'paid',
  award: 'awarded', receive: 'received',
  'register-property': 'registered', 'register-space': 'registered',
  'register-sub-a': 'registered', 'register-sub-b': 'registered',
  rescreen: 'rescreened', initiate: 'initiated',
  'open-balance': 'on_hand', 'report-sale': 'sold',
  'close-and-post': 'closed',
  'sign-1': 'signed', 'sign-2': 'signed',
  plan: 'planned',
  'reconcile-pair': 'reconciled', 'post-elimination': 'posted',
}

const COLLECTION_AGG: Record<string, string> = {
  'intercompany-transactions': 'invoice',
  provisions: 'invoice',
  bookings: 'order',
  'lease-period-postings': 'fixed_asset',
  'time-entries': 'invoice',
  'inventory-movements': 'inventory_transfer',
  'transaction-failures': 'invoice',
  leads: 'order',
  contracts: 'order',
  'csrd-disclosures': 'invoice',
  'kyc-checks': 'order',
  'payment-allocations': 'payment',
  'maintenance-work-orders': 'order',
  'consolidation-eliminations': 'invoice',
  leases: 'fixed_asset',
  'recruiting-pipeline': 'order',
  'workflow-instances': 'order',
  customers: 'order',
  'legal-entities': 'order',
  'audit-events': 'order',
  invoices: 'invoice',
  'recurring-journals': 'invoice',
  'period-end-adjustments': 'invoice',
  'fx-transactions': 'invoice',
  'bank-reconciliations': 'bank_statement',
  'account-reconciliations': 'bank_statement',
  'rounding-adjustments': 'invoice',
  'prior-period-adjustments': 'invoice',
  'fiscal-periods': 'invoice',
  'financial-statements': 'invoice',
  'job-positions': 'order',
  employees: 'order',
  'expense-reports': 'invoice',
  'performance-reviews': 'order',
  'payroll-runs': 'payment',
  'bills-of-materials': 'inventory_transfer',
  quotes: 'order',
  shipments: 'inventory_transfer',
  'tracking-events': 'inventory_transfer',
  'performance-obligations': 'invoice',
  projects: 'order',
  'project-tasks': 'order',
  activities: 'order',
  opportunities: 'order',
  'sales-commissions': 'payment',
  'audit-findings': 'order',
  'carbon-emissions': 'invoice',
  'evidence-attestations': 'order',
  'beneficial-owners': 'order',
  'consignment-arrangements': 'order',
  'consignment-inventory': 'inventory_transfer',
  'consignment-sales': 'invoice',
  'bookable-resources': 'order',
  properties: 'fixed_asset',
  spaces: 'fixed_asset',
  'wip-snapshots': 'invoice',
  subscriptions: 'subscription',
  payments: 'payment',
  'depreciation-schedules': 'fixed_asset',
  'lease-modifications': 'fixed_asset',
  'purchase-requisitions': 'order',
  'vendor-quotes': 'order',
  'purchase-orders': 'order',
  'goods-receipts': 'inventory_transfer',
  'usage-records': 'subscription',
  'bulk-imports': 'invoice',
  'project-milestones': 'invoice',
  'work-orders': 'inventory_transfer',
  'production-receipts': 'inventory_transfer',
  'quality-inspections': 'inventory_transfer',
}

const STEP_RE =
  /\{\s*collection:\s*'([\w-]+)',\s*action:\s*'([\w-]+)',\s*emits:\s*'([a-z]+:[a-zA-Z_]+)',\s*requires:\s*\[([^\]]*)\]\s*\}/g

function main(): void {
  const dryRun = process.argv.includes('--dry-run')
  let text = readFileSync(REG, 'utf8')
  let patched = 0
  const skippedAction: string[] = []
  const skippedAgg = new Set<string>()
  text = text.replace(STEP_RE, (match, collection: string, action: string, emits: string, _requires: string) => {
    if (match.includes('producer:')) return match
    if (!(action in ACTION_TO_STATUS)) {
      skippedAction.push(`${collection}.${action}`)
      return match
    }
    const agg = COLLECTION_AGG[collection]
    if (!agg) {
      skippedAgg.add(collection)
      return match
    }
    const status = ACTION_TO_STATUS[action]
    const prod = status === null
      ? `producer: { onCreate: true, aggregate: '${agg}' }`
      : `producer: { onStatus: '${status}', aggregate: '${agg}' }`
    patched++
    const inner = match.replace(/\s*\}\s*$/, '')
    return `${inner}, ${prod} }`
  })
  if (!dryRun) writeFileSync(REG, text)
  console.log(`Patched: ${patched} chain steps${dryRun ? ' (dry-run — file not written)' : ''}`)
  if (skippedAction.length > 0) {
    console.log(`Skipped (unknown action): ${skippedAction.length}`)
    for (const s of skippedAction) console.log(`  ${s}`)
  }
  if (skippedAgg.size > 0) {
    console.log(`Skipped (unknown collection→aggregate): ${skippedAgg.size}`)
    for (const s of [...skippedAgg].sort()) console.log(`  ${s}`)
  }
}

main()
