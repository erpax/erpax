import ts from 'typescript'
import { join } from 'node:path'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { exactMax, exactRound } from '@/algebra'
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
  const billable = exactMax(0, used - r.included)
  const usd = (billable / r.per) * r.rate
  return { dimension, used, billable, unit: r.unit, usd: exactRound(usd * 100) / 100 }
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
  const monthlyUsd = exactRound(lines.reduce((s, l) => s + l.usd, 0) * 100) / 100
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
export interface Lever {
  readonly lever: string
  readonly dimension: string
  readonly why: string
  /** Reads the tree. A lever whose evidence no longer holds is not a lever — it is a memory. */
  readonly holds: (cwd: string) => boolean
  /** What was seen when the evidence was checked, so a reader need not re-derive it. */
  readonly observed: (cwd: string) => string
}

const bytesOf = (cwd: string, rel: string): number => {
  try {
    return statSync(join(cwd, rel)).size
  } catch {
    return 0
  }
}
const textOf = (cwd: string, rel: string): string => {
  try {
    return readFileSync(join(cwd, rel), 'utf8')
  } catch {
    return ''
  }
}
/**
 * Does any class in `src` actually EXTEND DurableObject?
 *
 * Parsed, never matched. The substring form found a hit immediately — in this file, inside the call
 * that searches for it, and again in the test's own name. A string is data ([[syntax]]), and a
 * detector that reads its own source is the false positive [[rules]]/confine already paid for once.
 */
const hasDurableObjectClass = (cwd: string): boolean => {
  const walk = (d: string): boolean => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = readdirSync(d, { withFileTypes: true })
    } catch {
      return false
    }
    for (const e of entries) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue
      const p = join(d, e.name)
      if (e.isDirectory()) {
        if (walk(p)) return true
        continue
      }
      if (!/\.tsx?$/.test(e.name)) continue
      let text = ''
      try {
        text = readFileSync(p, 'utf8')
      } catch {
        continue
      }
      if (!text.includes('DurableObject')) continue // cheap reject before the parse
      const src = ts.createSourceFile(p, text, ts.ScriptTarget.ESNext, true)
      let found = false
      const visit = (n: ts.Node): void => {
        if (found) return
        if (ts.isClassDeclaration(n)) {
          for (const h of n.heritageClauses ?? []) {
            if (h.token !== ts.SyntaxKind.ExtendsKeyword) continue
            for (const t of h.types) if (/(^|\.)DurableObject$/.test(t.expression.getText())) found = true
          }
        }
        ts.forEachChild(n, visit)
      }
      visit(src)
      if (found) return true
    }
    return false
  }
  return walk(join(cwd, 'src'))
}

/**
 * The fine-tunes, each carrying evidence that READS THE TREE rather than remembering it.
 *
 * The first version stated its evidence as prose, and the top-ranked lever said
 * `skills.index.ts is 80MB`. It is **269 bytes** — a CI stub, folded out of the Worker besides. A
 * corpus optimising against that ranking would have spent its effort on a file that no longer
 * exists at that size, which is worse than having no ranking: it is a confident wrong direction.
 *
 * [[rules]]/drift gates exactly this class — prose stating a byte size an order of scale from the
 * file it names — and could not see it, because that gate reads PROSE files and this claim lived in
 * a TypeScript string. So the fix is not to retype the number. Every lever now carries `holds(cwd)`,
 * and `staleLevers` reports the ones the tree has moved past.
 */
export const LEVERS: readonly Lever[] = [
  {
    lever: 'persist ISR/SSG entries so a repeat hit is not re-rendered in the Worker',
    dimension: 'workers.cpuMs',
    why: 'CPU-ms is the Workers cost driver, and re-rendering an unchanged page is paying for the same render twice; R2 holds the entry and the regional Cache API serves the repeat',
    holds: (cwd) => !/incrementalCache\s*:/.test(textOf(cwd, 'open-next.config.ts')),
    observed: (cwd) =>
      /incrementalCache\s*:/.test(textOf(cwd, 'open-next.config.ts'))
        ? 'open-next.config.ts sets incrementalCache — taken'
        : 'open-next.config.ts sets NO incrementalCache: every ISR hit re-renders',
  },
  {
    lever: 'raise the AI_CACHE hit-rate so repeat inferences cost 0 neurons',
    dimension: 'ai.neurons',
    why: 'Workers AI bills in neurons; a KV cache hit returns the prior inference for a KV read (~$0.50/M) instead of a fresh neuron spend',
    holds: (cwd) => textOf(cwd, 'wrangler.jsonc').includes('AI_CACHE'),
    observed: (cwd) => (textOf(cwd, 'wrangler.jsonc').includes('AI_CACHE') ? 'KV AI_CACHE is bound' : 'no AI_CACHE binding'),
  },
  {
    lever: 'serve uploads and large assets from R2, never proxied through Worker CPU',
    dimension: 'r2.egressGb',
    why: 'R2 egress is the one dimension Cloudflare prices at 0; bytes streamed from R2 avoid both egress and Worker CPU-ms',
    holds: (cwd) => textOf(cwd, 'wrangler.jsonc').includes('"R2"'),
    observed: (cwd) => (textOf(cwd, 'wrangler.jsonc').includes('"R2"') ? 'R2 is bound; egress rate is 0' : 'no R2 binding'),
  },
  {
    lever: 'cut D1 rows-READ with narrow SELECTs and indexes — reads dwarf writes in volume',
    dimension: 'd1.rowsRead',
    why: 'D1 bills rows read, and rows-read is the dimension that scales with traffic; a wide read costs on every request that makes it',
    holds: (cwd) => textOf(cwd, 'wrangler.jsonc').includes('"D1"'),
    observed: (cwd) => (textOf(cwd, 'wrangler.jsonc').includes('"D1"') ? 'D1 is bound and backs every query path' : 'no D1 binding'),
  },
  {
    lever: 'implement or drop the declared Durable Object classes',
    dimension: 'durableObjects.gbSeconds',
    why: 'a namespace whose class does not exist accrues nothing and answers nothing — every call to it fails at runtime, and the boot says so on every start',
    holds: (cwd) => !hasDurableObjectClass(cwd),
    observed: (cwd) =>
      hasDurableObjectClass(cwd)
        ? 'a class extending DurableObject exists in src'
        : 'wrangler.jsonc declares DO namespaces and src defines NO class extending DurableObject',
  },
]

export interface StaleLever {
  readonly lever: string
  readonly observed: string
}

/**
 * Levers the tree has moved past — the ranking's own drift check.
 *
 * A lever that no longer holds must be removed or rewritten, never left ranked: the whole value of
 * an ordered list is that the top of it is where the money is.
 */
export function staleLevers(cwd: string = process.cwd()): StaleLever[] {
  return LEVERS.filter((l) => !l.holds(cwd)).map((l) => ({ lever: l.lever, observed: l.observed(cwd) }))
}

/**
 * The THEORETICAL floor — the economic cost to SERVE one unit, in the same per-unit as the price. A price is
 * `floor × margin`, so `price / floor` reveals the backend: ≈1 is served at cost (commoditised), ≫1 is CF's
 * markup (where YOUR savings live — you pay the margin), ≪1 is a subsidy (exploit it). These are ESTIMATES from
 * public infra economics (commodity SSD $/GB, transit $/GB, amortised core-time, GPU-time), refutable by CF's
 * real undisclosed costs — a lens on the divergence, NEVER a claim to know the backend. The absolute floor is
 * Landauer (`kT ln2` ≈ 2.9e-21 J/bit at 300K): every dimension sits ~10⁹× above it, which proves cost > 0 (it is
 * entropy, [[cost]]'s 'entropy' kind) yet says nothing about price — the ECONOMIC floor is what some prices near.
 */
export interface CostFloor {
  readonly usdPerUnit: number
  readonly basis: string
}

export const THEORETICAL_FLOOR: Record<string, CostFloor> = {
  'workers.requests': { usdPerUnit: 0.02, basis: 'edge dispatch is near-zero marginal; the price recovers fixed cost + margin' },
  'workers.cpuMs': { usdPerUnit: 0.006, basis: 'amortised server core-time × PUE — a core-hour ≈ $0.02 ⇒ ~$0.0056/M CPU-ms' },
  'd1.rowsRead': { usdPerUnit: 0.0003, basis: 'buffer-cache hit + sub-µs CPU per row' },
  'd1.rowsWritten': { usdPerUnit: 0.2, basis: 'durable fsync + replication per write' },
  'd1.storageGb': { usdPerUnit: 0.1, basis: 'replicated, queryable SSD' },
  'r2.storageGb': { usdPerUnit: 0.008, basis: 'erasure-coded commodity disk' },
  'r2.classA': { usdPerUnit: 1.0, basis: 'write-path metadata ops' },
  'r2.classB': { usdPerUnit: 0.1, basis: 'read-path metadata ops' },
  'r2.egressGb': { usdPerUnit: 0.008, basis: 'transit/peering ~$0.005–0.02/GB at scale — priced $0 is a deliberate subsidy vs hyperscaler ~$0.09/GB' },
  'kv.reads': { usdPerUnit: 0.05, basis: 'edge-cached read' },
  'kv.writes': { usdPerUnit: 0.5, basis: 'global replication of the write' },
  'vectorize.queriedDims': { usdPerUnit: 0.002, basis: 'ANN index lookup' },
  'ai.neurons': { usdPerUnit: 0.004, basis: 'amortised GPU-time per neuron-unit' },
  'queues.ops': { usdPerUnit: 0.05, basis: 'durable enqueue/dequeue' },
  'durableObjects.gbSeconds': { usdPerUnit: 5.0, basis: 'pinned memory + single-threaded isolate' },
  'analyticsEngine.dataPoints': { usdPerUnit: 0.02, basis: 'columnar append' },
}

export interface Divergence {
  readonly dimension: string
  readonly priceUsdPerUnit: number
  readonly floorUsdPerUnit: number
  /** price / floor — 0 is a subsidy, ~1 served at cost, ≫1 is CF margin (your savings). */
  readonly ratio: number
  readonly verdict: 'subsidy' | 'commoditised' | 'margin'
  readonly basis: string
}

/** Map each dimension's price rate to its theoretical floor. */
const PRICE_RATE: Record<string, number> = {
  'workers.requests': DEFAULT_CF_PRICING.workersRequests.rate,
  'workers.cpuMs': DEFAULT_CF_PRICING.workersCpuMs.rate,
  'd1.rowsRead': DEFAULT_CF_PRICING.d1RowsRead.rate,
  'd1.rowsWritten': DEFAULT_CF_PRICING.d1RowsWritten.rate,
  'd1.storageGb': DEFAULT_CF_PRICING.d1StorageGb.rate,
  'r2.storageGb': DEFAULT_CF_PRICING.r2StorageGb.rate,
  'r2.classA': DEFAULT_CF_PRICING.r2ClassA.rate,
  'r2.classB': DEFAULT_CF_PRICING.r2ClassB.rate,
  'r2.egressGb': DEFAULT_CF_PRICING.r2EgressGb.rate,
  'kv.reads': DEFAULT_CF_PRICING.kvReads.rate,
  'kv.writes': DEFAULT_CF_PRICING.kvWrites.rate,
  'vectorize.queriedDims': DEFAULT_CF_PRICING.vectorizeQueriedDims.rate,
  'ai.neurons': DEFAULT_CF_PRICING.aiNeurons.rate,
  'queues.ops': DEFAULT_CF_PRICING.queueOps.rate,
  'durableObjects.gbSeconds': DEFAULT_CF_PRICING.doGbSeconds.rate,
  'analyticsEngine.dataPoints': DEFAULT_CF_PRICING.analyticsDataPoints.rate,
}

/**
 * Replace prices with theorems: per dimension, `price / economic-floor`. The reveal is NOT that they match — it
 * is where they DON'T. A subsidy (egress, ratio→0) is exploited; a margin (ratio≫1) is where CF's markup is, so
 * cutting that dimension saves the most per unit; a commoditised dimension (ratio≈1) is served at cost and not
 * worth fighting. Combine ratio (markup) with volume (telemetry) for true $ leverage.
 */
export function revealBackend(): Divergence[] {
  return Object.entries(THEORETICAL_FLOOR).map(([dimension, floor]) => {
    const price = PRICE_RATE[dimension] ?? 0
    const ratio = floor.usdPerUnit === 0 ? Infinity : exactRound((price / floor.usdPerUnit) * 100) / 100
    const verdict: Divergence['verdict'] = ratio < 0.8 ? 'subsidy' : ratio <= 3 ? 'commoditised' : 'margin'
    return { dimension, priceUsdPerUnit: price, floorUsdPerUnit: floor.usdPerUnit, ratio, verdict, basis: floor.basis }
  }).sort((a, b) => a.ratio - b.ratio)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const reveal = revealBackend()
  console.log('cloudflare/cost — prices replaced with theorems (price / economic floor):\n')
  for (const d of reveal) console.log(`  ${d.verdict.padEnd(12)} ${d.dimension.padEnd(26)} ×${String(d.ratio).padStart(6)}   ${d.basis}`)
  console.log('\n  they do NOT almost-match — and the divergence IS the reveal: subsidy (exploit) · margin (your savings) · commoditised (served at cost).\n')

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

/** @index-cross.foldback child=cloudflare/cost parent=cloudflare — this cross folds back into its parent. */
