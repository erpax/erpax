/**
 * audit/waves — send the waves to audit ALL, in a self-improving sequence.
 *
 * Every cheap gate is one audit DIMENSION with a measured count. Each run is compared to the
 * recorded history (a ring, like [[timeout]]'s samples): a rising axis is a REGRESSION and jumps
 * to wave 0 of the sequence; a stuck axis (no movement across runs) escalates — the current
 * approach is exhausted and needs a new instrument; an improving axis keeps its plan and ranks
 * by remaining debt. The sequence therefore RE-RANKS ITSELF from its own trajectory — the audit
 * that audits its own progress and reorders its next pass accordingly.
 *
 *   tsx src/audit/wave/index.ts        # measure · trend · print the sequence
 *
 * @audit counts measured by the gates' own scans — never transcribed; history is a cache of
 *        measurements (losing it only resets trends to 'new')
 */
import { execSync } from 'node:child_process'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { pathWireViolations } from '@/index/cross'
import { boundaryDigest } from '@/quantum/boundary'
import { bareAsks } from '@/rules/ask'
import { multiSegmentFileViolations, strayTsViolations } from '@/rules/tightened-scans'
import { nonTsLanguageViolations } from '@/law/folder/scan'
import { nonIndexImports } from '@/tamper/import'
import { openIntents } from '@/think'

export type AuditTrend = 'regression' | 'stuck' | 'improving' | 'new'

export interface AuditWaveEntry {
  readonly axis: string
  readonly count: number
  readonly prev: number | null
  readonly trend: AuditTrend
}

/**
 * What a trend is measured AGAINST.
 *
 * The history is a ring in node_modules/.cache, so `prev` is whatever the last
 * person to run this measured — which may be one commit ago or a hundred. A run
 * once reported gravity-oneway at 2251 "was 2202" and the natural reading, +49
 * introduced now, was wrong: the corpus stood at 2591 before that session began
 * and exactly 3 were new. A trend that cannot say what it compares to invites
 * that reading every time.
 *
 * The SHA is recorded beside each measurement so the window is stated rather
 * than assumed. An absent SHA means the snapshot predates this record and the
 * window is genuinely unknown — which is itself the honest answer.
 */
export interface TrendWindow {
  /** the commit the previous measurement was taken at, if it was recorded */
  readonly from: string | null
  /** the commit this measurement is taken at */
  readonly to: string
  /** commits between the two, or null when `from` is unknown */
  readonly commits: number | null
}

export function trendWindow(cwd: string = process.cwd()): TrendWindow {
  const at = (args: string): string | null => {
    try {
      return execSync(args, { cwd, encoding: 'utf8', stdio: 'pipe' }).trim() || null
    } catch {
      return null
    }
  }
  const to = at('git rev-parse HEAD') ?? 'unknown'
  const from = readShaHistory(cwd)
  if (!from) return { from: null, to, commits: null }
  const span = at(`git rev-list --count ${from}..${to}`)
  return { from, to, commits: span === null ? null : Number(span) }
}

const HISTORY_RING = 20
const historyPath = (cwd: string): string =>
  join(cwd, 'node_modules', '.cache', 'erpax', 'audit-waves.json')

type History = Record<string, number[]>

/** The SHA the previous run was taken at — absent in a history written before this. */
const SHA_KEY = '__sha'

const readShaHistory = (cwd: string): string | null => {
  try {
    const parsed: unknown = JSON.parse(readFileSync(historyPath(cwd), 'utf8'))
    if (typeof parsed !== 'object' || parsed === null) return null
    const sha = (parsed as Record<string, unknown>)[SHA_KEY]
    return typeof sha === 'string' && sha.length > 0 ? sha : null
  } catch {
    return null
  }
}

const readHistory = (cwd: string): History => {
  try {
    const parsed: unknown = JSON.parse(readFileSync(historyPath(cwd), 'utf8'))
    if (typeof parsed !== 'object' || parsed === null) return {}
    const out: History = {}
    for (const [k, v] of Object.entries(parsed)) {
      if (k === SHA_KEY) continue
      if (Array.isArray(v)) out[k] = v.filter((n): n is number => typeof n === 'number' && Number.isFinite(n))
    }
    return out
  } catch {
    return {}
  }
}

/** The trend of one axis against its recorded past — pure, so the sequence law is testable. */
export function trendOf(prev: number | null, count: number): AuditTrend {
  if (prev === null) return 'new'
  if (count > prev) return 'regression'
  if (count < prev) return 'improving'
  return 'stuck'
}

/**
 * The self-improving order: regressions first (a gate that got worse outranks everything),
 * then stuck axes (the approach is exhausted — escalate), then improving ones by remaining
 * debt, then new measurements. Within a class, larger debt first.
 */
export function sequenceOf(entries: readonly AuditWaveEntry[]): AuditWaveEntry[] {
  const rank: Record<AuditTrend, number> = { regression: 0, stuck: 1, improving: 2, new: 3 }
  return [...entries].sort((a, b) => rank[a.trend] - rank[b.trend] || b.count - a.count)
}

/** Measure every cheap audit dimension — each count from the gate's own scan. */
export function measureAuditDimensions(cwd: string = process.cwd()): ReadonlyMap<string, number> {
  const wire = pathWireViolations(cwd)
  return new Map<string, number>([
    ['ask', bareAsks(cwd).bare.length],
    ['imports', nonIndexImports().length],
    ['boundary', boundaryDigest(join(cwd, 'src')).escapes],
    ['gravity-oneway', wire.filter((v) => v.kind === 'one-way-path').length],
    ['gravity-deep', wire.filter((v) => v.kind === 'depth-exceeds-wire').length],
    ['stray-ts', strayTsViolations(cwd).length],
    ['multi-segment', multiSegmentFileViolations(cwd).length],
    ['ts-only', nonTsLanguageViolations(cwd).length],
    // THE COST OF THINKING, measured: every open intent is a thought the next session
    // re-derives from nothing until someone resolves it — thinking debt, trended like
    // any other axis. Resolving intents through the think store (reuse, never re-derive)
    // is the cheapest computation the corpus owns; letting them linger is the dearest.
    ['intents', openIntents(cwd).length],
  ])
}

/** One audit wave: measure all, trend against history, record, return the self-improving sequence. */
export function auditWaves(cwd: string = process.cwd()): AuditWaveEntry[] {
  const history = readHistory(cwd)
  const measured = measureAuditDimensions(cwd)
  const entries: AuditWaveEntry[] = []
  for (const [axis, count] of measured) {
    const past = history[axis] ?? []
    const prev = past.length ? past[past.length - 1]! : null
    entries.push({ axis, count, prev, trend: trendOf(prev, count) })
    history[axis] = [...past, count].slice(-HISTORY_RING)
  }
  try {
    mkdirSync(dirname(historyPath(cwd)), { recursive: true })
    // stamp the commit, so the NEXT run can say what its trend is measured against
    const stamped: Record<string, unknown> = { ...history }
    stamped[SHA_KEY] = trendWindow(cwd).to
    writeFileSync(historyPath(cwd), JSON.stringify(stamped))
  } catch {
    /* lost history only resets trends to 'new' */
  }
  return sequenceOf(entries)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const window = trendWindow()
  const seq = auditWaves()
  console.log('audit/waves — all dimensions, self-improving sequence')
  console.log(
    window.from === null
      ? '  trend window: UNKNOWN — the previous run recorded no commit, so "was" spans an unmeasured stretch\n'
      : `  trend window: ${window.from.slice(0, 9)}..${window.to.slice(0, 9)} (${window.commits ?? '?'} commit(s))\n`,
  )
  const mark: Record<AuditTrend, string> = { regression: '✗↑', stuck: '≍', improving: '✓↓', new: '·' }
  for (const e of seq) {
    const delta = e.prev === null ? '' : ` (was ${e.prev})`
    console.log(`  ${mark[e.trend].padEnd(3)} ${String(e.count).padStart(6)}  ${e.axis}${delta}`)
  }
  console.log('\nsequence law: regressions → stuck (escalate) → improving (largest debt first) → new')
}
