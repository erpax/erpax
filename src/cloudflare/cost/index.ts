/**
 * cloudflare/cost — erpax's real Cloudflare billable surface, priced, fed into the one efficiency law.
 *
 * Every binding in `wrangler.jsonc` is a billable dimension (Workers, D1, R2, KV, Vectorize, Workers AI, Queues,
 * Durable Objects, Analytics Engine). This computes the monthly $ from a usage profile and plugs the total into
 * [[cost]]'s efficiency law (`output / cost`) as `kind: 'money'` — so Cloudflare spend is measured against the
 * SAME law as tokens, energy, and labour, and `moreEfficient` compares a tuning against the current bill.
 *
 * HONEST BOUNDARY — two of them, and both matter:
 *   1. The PRICES are the refutable INPUT; the bill is the truth. DEFAULT_CF_PRICING is Cloudflare's PUBLISHED
 *      pricing as of ~2024–2025 (a knowledge boundary), and CF changes prices — VERIFY every rate against the
 *      current pricing page / your dashboard before trusting a magnitude. The STRUCTURE (which dimensions bill,
 *      which levers move them) is the contribution; the cents are a pluggable parameter you must check.
 *   2. The MAGNITUDES need real telemetry (wrangler analytics / the CF dashboard) this repo does NOT contain.
 *      `cloudflareCost` computes $ as a FUNCTION of the profile; only the dashboard supplies the profile. No
 *      cost figure here is a claim about erpax's actual spend — it is arithmetic awaiting real inputs.
 *
 * @invariant R2 egress is priced at 0 — free egress is a real Cloudflare lever, not an approximation
 * @invariant below a dimension's included tier, its billable cost is exactly 0
 * @invariant cloudflareCost total feeds efficiency() unchanged — one law for every cost kind
 *
 * Composes [[cloudflare]] · [[cost]] · [[law]].
 */
import { efficiency, type Ledger, type Output } from '@/cost'

/** Rate for one metered dimension: `included` free per month, then `rate` per `per` units above it. */
export interface Rate {
  readonly included: number
  readonly per: number
  readonly rate: number
  readonly unit: string
}

/** Cloudflare's published pricing surface for erpax's actual bindings. VERIFY against current CF pricing. */
export interface CfPricing {
  readonly workersBaseUsd: number
  readonly workersRequests: Rate
  readonly workersCpuMs: Rate
  readonly d1RowsRead: Rate
  readonly d1RowsWritten: Rate
  readonly d1StorageGb: Rate
  readonly r2StorageGb: Rate
  readonly r2ClassA: Rate
  readonly r2ClassB: Rate
  readonly r2EgressGb: Rate
  readonly kvReads: Rate
  readonly kvWrites: Rate
  readonly vectorizeQueriedDims: Rate
  readonly aiNeurons: Rate
  readonly queueOps: Rate
  readonly doGbSeconds: Rate
  readonly analyticsDataPoints: Rate
}

/**
 * Cloudflare published pricing, ~2024–2025. THE REFUTABLE INPUT — verify each rate against the live pricing page.
 * Notable, and real: R2 egress is $0 (rate 0), and Workers cost is driven by CPU-ms, not wall time.
 */
export const DEFAULT_CF_PRICING: CfPricing = {
  workersBaseUsd: 5,
  workersRequests: { included: 10_000_000, per: 1_000_000, rate: 0.3, unit: 'requests' },
  workersCpuMs: { included: 30_000_000, per: 1_000_000, rate: 0.02, unit: 'CPU-ms' },
  d1RowsRead: { included: 25_000_000_000, per: 1_000_000, rate: 0.001, unit: 'rows read' },
  d1RowsWritten: { included: 50_000_000, per: 1_000_000, rate: 1.0, unit: 'rows written' },
  d1StorageGb: { included: 5, per: 1, rate: 0.75, unit: 'GB-mo' },
  r2StorageGb: { included: 10, per: 1, rate: 0.015, unit: 'GB-mo' },
  r2ClassA: { included: 1_000_000, per: 1_000_000, rate: 4.5, unit: 'Class-A ops' },
  r2ClassB: { included: 10_000_000, per: 1_000_000, rate: 0.36, unit: 'Class-B ops' },
  r2EgressGb: { included: 0, per: 1, rate: 0, unit: 'GB egress (FREE)' },
  kvReads: { included: 10_000_000, per: 1_000_000, rate: 0.5, unit: 'KV reads' },
  kvWrites: { included: 1_000_000, per: 1_000_000, rate: 5.0, unit: 'KV writes' },
  vectorizeQueriedDims: { included: 30_000_000, per: 1_000_000, rate: 0.01, unit: 'queried vector-dims' },
  aiNeurons: { included: 300_000, per: 1_000, rate: 0.011, unit: 'neurons' },
  queueOps: { included: 1_000_000, per: 1_000_000, rate: 0.4, unit: 'queue ops' },
  doGbSeconds: { included: 400_000, per: 1_000_000, rate: 12.5, unit: 'DO GB-s' },
  analyticsDataPoints: { included: 10_000_000, per: 1_000_000, rate: 0.25, unit: 'data points' },
}

/** A monthly usage profile — supplied by the CF dashboard / wrangler analytics, never invented here. */
export interface CfProfile {
  readonly workersRequests?: number
  readonly workersCpuMs?: number
  readonly d1RowsRead?: number
  readonly d1RowsWritten?: number
  readonly d1StorageGb?: number
  readonly r2StorageGb?: number
  readonly r2ClassA?: number
  readonly r2ClassB?: number
  readonly r2EgressGb?: number
  readonly kvReads?: number
  readonly kvWrites?: number
  readonly vectorizeQueriedDims?: number
  readonly aiNeurons?: number
  readonly queueOps?: number
  readonly doGbSeconds?: number
  readonly analyticsDataPoints?: number
}

export interface LineItem {
  readonly dimension: string
  readonly used: number
  readonly billable: number
  readonly unit: string
  readonly usd: number
}

export interface CfBill {
  readonly lines: readonly LineItem[]
  readonly monthlyUsd: number
}

/** Meter one dimension: nothing billable below the included tier, linear above it. Never negative. */
function meter(dimension: string, used: number, r: Rate): LineItem {
  const billable = Math.max(0, used - r.included)
  const usd = (billable / r.per) * r.rate
  return { dimension, used, billable, unit: r.unit, usd: Math.round(usd * 100) / 100 }
}

/**
 * The monthly Cloudflare bill for a usage profile, dimension by dimension. Arithmetic over a verifiable price
 * table and a dashboard-supplied profile — no magnitude is a claim about erpax's real spend.
 */
export function cloudflareCost(profile: CfProfile, p: CfPricing = DEFAULT_CF_PRICING): CfBill {
  const g = (n?: number): number => n ?? 0
  const lines: LineItem[] = [
    { dimension: 'workers.base', used: 1, billable: 1, unit: 'plan/mo', usd: p.workersBaseUsd },
    meter('workers.requests', g(profile.workersRequests), p.workersRequests),
    meter('workers.cpuMs', g(profile.workersCpuMs), p.workersCpuMs),
    meter('d1.rowsRead', g(profile.d1RowsRead), p.d1RowsRead),
    meter('d1.rowsWritten', g(profile.d1RowsWritten), p.d1RowsWritten),
    meter('d1.storageGb', g(profile.d1StorageGb), p.d1StorageGb),
    meter('r2.storageGb', g(profile.r2StorageGb), p.r2StorageGb),
    meter('r2.classA', g(profile.r2ClassA), p.r2ClassA),
    meter('r2.classB', g(profile.r2ClassB), p.r2ClassB),
    meter('r2.egressGb', g(profile.r2EgressGb), p.r2EgressGb),
    meter('kv.reads', g(profile.kvReads), p.kvReads),
    meter('kv.writes', g(profile.kvWrites), p.kvWrites),
    meter('vectorize.queriedDims', g(profile.vectorizeQueriedDims), p.vectorizeQueriedDims),
    meter('ai.neurons', g(profile.aiNeurons), p.aiNeurons),
    meter('queues.ops', g(profile.queueOps), p.queueOps),
    meter('durableObjects.gbSeconds', g(profile.doGbSeconds), p.doGbSeconds),
    meter('analyticsEngine.dataPoints', g(profile.analyticsDataPoints), p.analyticsDataPoints),
  ]
  const monthlyUsd = Math.round(lines.reduce((s, l) => s + l.usd, 0) * 100) / 100
  return { lines, monthlyUsd }
}

/** Cloudflare spend as `kind: 'money'` in the one efficiency law — output per dollar, comparable to any cost. */
export function cloudLedger(output: Output, profile: CfProfile, p: CfPricing = DEFAULT_CF_PRICING): Ledger {
  return { kind: 'money', output, cost: cloudflareCost(profile, p).monthlyUsd }
}

/** Efficiency = output / monthly Cloudflare $ — a tuning is better iff it raises this (moreEfficient). */
export function cloudEfficiency(output: Output, profile: CfProfile, p: CfPricing = DEFAULT_CF_PRICING): number {
  return efficiency(cloudLedger(output, profile, p))
}

/**
 * The fine-tune levers — DECLARED (transparent, arguable), each aimed at a real billable dimension and grounded
 * in an in-repo fact, never a guess. Ranked by leverage; the bundle is first because it taxes EVERY cold start.
 */
export const LEVERS: readonly { readonly lever: string; readonly dimension: string; readonly why: string; readonly evidence: string }[] = [
  {
    lever: 'shrink/externalise the 80MB skills.index.ts bundle',
    dimension: 'workers.cpuMs',
    why: 'a Worker parses its bundle on every cold start; 80MB of inline JSON is cold-start CPU-ms billed at $0.02/M, and CPU-ms is the Workers cost driver — not wall time',
    evidence: 'src/skill/router/skills.index.ts is 80MB; vitest.config.mts already externalises it because SWC "blows up" transforming it',
  },
  {
    lever: 'prerender/ISR static routes so ASSETS serves them, not the Worker',
    dimension: 'workers.requests',
    why: 'a request served from the ASSETS binding costs no Worker request and no CPU-ms; OpenNext prerender moves hits off the priced path',
    evidence: 'wrangler.jsonc binds ASSETS to .open-next/assets; open-next.config.ts controls prerender',
  },
  {
    lever: 'raise the AI_CACHE hit-rate so repeat inferences cost 0 neurons',
    dimension: 'ai.neurons',
    why: 'Workers AI bills in neurons; a KV cache hit returns the prior inference for a KV read (~$0.50/M) instead of a fresh neuron spend',
    evidence: 'wrangler.jsonc binds KV AI_CACHE; src/ai/cloudflare-ai.ts is the single mediated call site',
  },
  {
    lever: 'serve uploads/large assets from R2 (egress is $0), never proxied through Worker CPU',
    dimension: 'r2.egressGb',
    why: 'R2 egress is free — the one dimension priced at 0; bytes streamed from R2 avoid both egress and Worker CPU-ms',
    evidence: 'wrangler.jsonc binds R2; DEFAULT_CF_PRICING.r2EgressGb.rate === 0',
  },
  {
    lever: 'cut D1 rows-READ with narrow SELECTs + indexes (reads dwarf writes in volume)',
    dimension: 'd1.rowsRead',
    why: 'D1 bills rows read; a SELECT * or a missing index reads far more rows than needed, and rows-read is the dimension that scales with traffic',
    evidence: 'wrangler.jsonc binds D1 remote; 231 collections back every admin/query path',
  },
  {
    lever: 'hibernate idle Durable Objects to stop GB-seconds accruing',
    dimension: 'durableObjects.gbSeconds',
    why: 'a DO holding state in memory accrues GB-seconds even when idle; hibernation drops that to 0 until the next event',
    evidence: 'wrangler.jsonc declares ERPAX_DO (rate-limit + tenant-quota state)',
  },
]

if (import.meta.url === 'file://' + process.argv[1]) {
  // A SAMPLE profile — placeholder magnitudes, NOT erpax's real spend. Replace with wrangler analytics.
  const sample: CfProfile = {
    workersRequests: 50_000_000,
    workersCpuMs: 120_000_000,
    d1RowsRead: 40_000_000_000,
    d1RowsWritten: 80_000_000,
    r2StorageGb: 50,
    aiNeurons: 5_000_000,
  }
  const bill = cloudflareCost(sample)
  console.log('cloudflare/cost — SAMPLE profile (placeholder magnitudes, verify prices + supply real telemetry)\n')
  for (const l of bill.lines) if (l.usd !== 0) console.log(`  ${l.dimension.padEnd(28)} ${l.usd.toFixed(2).padStart(9)}  (${l.billable.toLocaleString()} ${l.unit} billable)`)
  console.log(`\n  monthly total (SAMPLE): $${bill.monthlyUsd}\n`)
  console.log('  fine-tune levers, ranked (declared, grounded in-repo):')
  for (const [i, l] of LEVERS.entries()) console.log(`  ${i + 1}. ${l.lever}  → ${l.dimension}`)
  console.log('\n  the prices are the refutable input; the bill is the truth. magnitudes need the CF dashboard.')
}
