import { exactRound } from '@/algebra'
/**
 * cloudflare/capacity — the production HARDWARE, computed. erpax runs on the Cloudflare edge (Workers ·
 * D1 · R2 · Durable Objects), and that hardware has hard ceilings. This models them at production scale
 * and computes erpax's fit — where its demand sits under the limit, and where it would blow it.
 *
 * The decisive one: the corpus's `skills.index.ts` is ~80MB, against a 3MB gzipped Worker script limit —
 * 27× over. erpax is deployable ONLY because it never bundles it: [[skill]]/router loads sealed excerpts
 * lazily ([[agent]]/skill-context.realiseSkillsForPath), so the 80MB is a BUILD artifact, never shipped.
 * This atom makes that discipline a computed guard: if the worker entry ever imported the index, the
 * bundle would exceed the hardware and the deploy would fail — assertFitsProduction refuses it first.
 *
 *   tsx src/cloudflare/capacity/index.ts        # the fit report over the real limits
 *
 * @standard Cloudflare Workers/D1/R2/Durable Objects platform limits (2025) — the production ceiling
 */
import { statSync, existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export interface D1Table {
  readonly name: string
  readonly columns: number
}

export interface CloudflareLimit {
  readonly resource: string
  readonly limit: number
  readonly unit: 'MB' | 'GB' | 'ms' | 'cols' | 'count'
  /** true ⇒ exceeding it fails the deploy (hard); false ⇒ a soft scaling concern */
  readonly hard: boolean
  readonly source: string
}

/** The Cloudflare edge ceiling — the production hardware, declared with its source (arguable in the open). */
export const CLOUDFLARE_LIMITS: readonly CloudflareLimit[] = [
  { resource: 'worker-script-gzip', limit: 3, unit: 'MB', hard: true, source: 'Workers paid — compressed script size' },
  { resource: 'worker-memory', limit: 128, unit: 'MB', hard: true, source: 'Workers isolate memory' },
  { resource: 'worker-cpu', limit: 30_000, unit: 'ms', hard: false, source: 'Workers paid CPU per request' },
  { resource: 'd1-database', limit: 10, unit: 'GB', hard: false, source: 'D1 paid database size' },
  { resource: 'd1-columns-per-table', limit: 100, unit: 'cols', hard: true, source: 'D1 columns per table' },
  { resource: 'do-memory', limit: 128, unit: 'MB', hard: true, source: 'Durable Object memory' },
  { resource: 'kv-value', limit: 25, unit: 'MB', hard: true, source: 'KV value size' },
]

export interface CapacityFinding {
  readonly resource: string
  readonly demand: number
  readonly limit: number
  readonly unit: string
  readonly fits: boolean
  readonly hard: boolean
  /** limit − demand (same unit); negative ⇒ over the ceiling */
  readonly headroom: number
  readonly note: string
}

const mb = (bytes: number): number => bytes / (1024 * 1024)
const sizeOf = (p: string): number => {
  try {
    return statSync(p).size
  } catch {
    return 0
  }
}

/**
 * erpax's demand on each hardware resource vs its limit. The load-bearing check is the Worker script:
 * the corpus skill index (~80MB) must NEVER be in the shipped bundle — it is measured here as the demand
 * IF it were imported by the worker entry, which is the failure the lazy-load discipline exists to prevent.
 */
export function productionCapacity(cwd: string = process.cwd()): CapacityFinding[] {
  const out: CapacityFinding[] = []
  const push = (resource: string, demand: number, note: string): void => {
    const l = CLOUDFLARE_LIMITS.find((x) => x.resource === resource)!
    out.push({ resource, demand: exactRound(demand * 100) / 100, limit: l.limit, unit: l.unit, hard: l.hard, fits: demand <= l.limit, headroom: exactRound((l.limit - demand) * 100) / 100, note })
  }

  // Worker script: the shipped bundle must exclude the 80MB skill index (lazy-loaded). We report the
  // index's own size as the demand-if-bundled — the ceiling the lazy-load discipline keeps erpax under.
  const idxMb = mb(sizeOf(join(cwd, 'src/skill/router/skills.index.ts')))
  const bundled = workerImportsSkillIndex(cwd)
  push('worker-script-gzip', bundled ? idxMb : 0, bundled ? `worker entry IMPORTS the ${idxMb.toFixed(0)}MB skill index — bundle blows the limit` : `skill index (${idxMb.toFixed(0)}MB) is lazy-loaded, not bundled — the discipline holds`)

  // D1 tables: erpax's collections. D1 allows many tables; the demand is informational (soft).
  const collections = countCollections(cwd)
  out.push({ resource: 'd1-tables', demand: collections, limit: 0, unit: 'count', hard: false, fits: true, headroom: 0, note: `${collections} collections → D1 tables (D1 has no small table cap; the 100-col-per-table cap is the real one)` })

  // D1 columns per table: the SECOND hard D1 cap (100), the one that forced search_rels into a
  // content-uuid group. Measured from the committed drizzle snapshot — the ACTUAL generated schema,
  // where arrays/relations are already their own tables (so an interface's field count over-counts).
  const widest = widestD1Table(cwd)
  if (widest) push('d1-columns-per-table', widest.columns, `widest D1 table '${widest.name}' has ${widest.columns} cols`)

  return out
}

/**
 * The widest real D1 table, read from the committed drizzle snapshot (the actual generated schema —
 * arrays/relations are already split into their own tables, so this is the true per-table column count,
 * not the payload-types interface field count which over-counts). Null when no snapshot is present.
 */
export function widestD1Table(cwd: string = process.cwd()): D1Table | null {
  const dir = join(cwd, 'src/migrations')
  let snap: string | undefined
  try {
    snap = readdirSync(dir)
      .filter((f) => /^\d{8}_\d{6}\.json$/.test(f))
      .sort()
      .at(-1)
  } catch {
    return null
  }
  if (!snap) return null
  let tables: Record<string, { columns?: Record<string, unknown> }>
  try {
    tables = (JSON.parse(readFileSync(join(dir, snap), 'utf8')).tables as typeof tables) ?? {}
  } catch {
    return null
  }
  let widest: D1Table | null = null
  for (const [name, t] of Object.entries(tables)) {
    const columns = Object.keys(t.columns ?? {}).length
    if (!widest || columns > widest.columns) widest = { name, columns }
  }
  return widest
}

/** Does the worker entry (the shipped path) import the 80MB skill index? If so, the bundle exceeds the limit. */
export function workerImportsSkillIndex(cwd: string = process.cwd()): boolean {
  for (const entry of ['src/payload.config.ts', 'next.config.ts', 'open-next.config.ts']) {
    const p = join(cwd, entry)
    if (existsSync(p) && /skill\/router\/skills\.index/.test(readFileSync(p, 'utf8'))) return true
  }
  return false
}

function countCollections(cwd: string): number {
  const slugs = new Set<string>()
  const walk = (dir: string): void => {
    let ents: import('node:fs').Dirent[]
    try {
      ents = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of ents) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue
      const p = join(dir, e.name)
      if (e.isDirectory()) walk(p)
      else if (/\.ts$/.test(e.name) && !/\.test\./.test(e.name)) {
        try {
          for (const m of readFileSync(p, 'utf8').matchAll(/slug:\s*['"]([a-z][a-z0-9-]*)['"]/g)) slugs.add(m[1]!)
        } catch {
          /* skip */
        }
      }
    }
  }
  walk(join(cwd, 'src'))
  return slugs.size
}

/** Fail the deploy if any HARD hardware limit is exceeded — the production-fit gate. */
export function assertFitsProduction(cwd: string = process.cwd()): void {
  const over = productionCapacity(cwd).filter((f) => f.hard && !f.fits)
  if (over.length === 0) return
  throw new Error(
    `✖ cloudflare/capacity — ${over.length} hard hardware limit(s) exceeded: ` +
      `${over.map((f) => `${f.resource} ${f.demand}${f.unit} > ${f.limit}${f.unit} (${f.note})`).join(' · ')} — the deploy will fail on the edge.`,
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  console.log('cloudflare/capacity — erpax on the Cloudflare edge, fit against the production hardware:')
  for (const f of productionCapacity()) {
    const mark = f.hard ? (f.fits ? '✓' : '✗') : '·'
    console.log(`  ${mark} ${f.resource.padEnd(22)} ${String(f.demand).padStart(6)}${f.unit} / ${f.limit}${f.unit}  ${f.note}`)
  }
}

/** @index-cross.foldback child=cloudflare/capacity parent=cloudflare — this cross folds back into its parent. */
