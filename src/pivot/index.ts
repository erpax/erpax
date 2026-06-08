/**
 * pivot — cross-tab state statistics for folder README models.
 *
 * Pure helpers: fold many `FolderReadmeModel` rows into axis × state count tables
 * and before/after comparison tables for markdown projection ([[readme]] · [[analytics]]).
 *
 *   tsx src/pivot/index.ts
 *
 * @standard ISO/IEC 25010:2023 §5.2.8 modularity — pure fns, no I/O
 * @audit every count is derived from model fields, never hand-set
 * @see ../readme — ../law/folder — ../horo
 */
import { HORO_DIGITS, isHoroStep } from '@/horo'
import { ONE_WORD } from '@/law/folder/constants'

/** Minimal folder fields required for pivot cross-tabs — avoids readme import cycle. */
export interface PivotFolderInput {
  readonly atomPath: string
  readonly form: 0 | 1
  readonly code: 0 | 1
  readonly proof: 0 | 1
  readonly horo: number | null
  readonly sealed: boolean
  readonly statement: { readonly balanced: boolean }
  readonly typography: {
    readonly partition: string
    readonly bondDegree: number
    readonly graphRoot: string
  }
}

/** One cell in an axis × state cross-tab. */
export interface PivotRow {
  readonly state: string
  readonly count: number
  readonly share: number
}

/** A single pivot table — one axis, many states. */
export interface PivotTable {
  readonly title: string
  readonly axis: string
  readonly rows: readonly PivotRow[]
  readonly total: number
}

/** Corpus rollup — many tables, one folder population. */
export interface FolderPivotStats {
  readonly folderCount: number
  readonly tables: readonly PivotTable[]
}

/** One comparison row — before vs after on the same axis × state. */
export interface PivotComparisonRow {
  readonly state: string
  readonly before: number
  readonly after: number
  readonly delta: number
  readonly shareBefore: number
  readonly shareAfter: number
}

/** Before/after comparison across two corpus snapshots. */
export interface FolderPivotComparison {
  readonly beforeCount: number
  readonly afterCount: number
  readonly tables: readonly PivotComparisonTable[]
}

export interface PivotComparisonTable {
  readonly title: string
  readonly axis: string
  readonly rows: readonly PivotComparisonRow[]
}

const pct = (count: number, total: number): number =>
  total > 0 ? Math.round((count * 10000) / total) / 100 : 0

const tally = (models: readonly PivotFolderInput[], key: (m: PivotFolderInput) => string): Map<string, number> => {
  const acc = new Map<string, number>()
  for (const m of models) {
    const k = key(m)
    acc.set(k, (acc.get(k) ?? 0) + 1)
  }
  return acc
}

const tableOf = (title: string, axis: string, buckets: ReadonlyMap<string, number>): PivotTable => {
  const total = [...buckets.values()].reduce((s, n) => s + n, 0)
  const rows = [...buckets.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([state, count]) => ({ state, count, share: pct(count, total) }))
  return { title, axis, rows, total }
}

const FRAMEWORK_SEGMENT = (name: string): boolean =>
  /^\([^)]*\)$/.test(name) ||
  /^\[.*\]$/.test(name) ||
  name.startsWith('@') ||
  /^[0-9]+$/.test(name)

/** Folder path obeys the one-word name law (structural segments exempt). */
export const folderNameValid = (atomPath: string): boolean =>
  atomPath.split('/').every((seg) => FRAMEWORK_SEGMENT(seg) || ONE_WORD.test(seg))

/** Trinity completeness label from trinity legs. */
export const trinityStateOf = (m: PivotFolderInput): string => {
  if (m.code === 0) return m.form === 1 ? 'vocabulary' : 'empty'
  if (m.form === 1 && m.proof === 1) return 'code-complete'
  return 'incomplete'
}

/** Gravity held ⇔ matter complete and bond degree not zeroed by the gravity gate. */
export const gravityHeldOf = (m: PivotFolderInput): boolean => {
  if (m.typography.graphRoot) return m.typography.bondDegree > 0
  if (m.code === 0) return m.form === 1
  return m.form === 1 && m.proof === 1
}

const horoBucket = (m: PivotFolderInput): string => {
  if (m.horo === null) return 'missing'
  return isHoroStep(m.horo) ? `ring·${m.horo}` : `off-ring·${m.horo}`
}

const bondBucket = (degree: number): string => {
  if (degree === 0) return '0'
  if (degree <= 5) return '1–5'
  if (degree <= 10) return '6–10'
  return '11+'
}

/** Cross-tab corpus statistics from folder README models — pure, deterministic. */
export function pivotFolderStats(models: readonly PivotFolderInput[]): FolderPivotStats {
  const folderCount = models.length
  const tables: PivotTable[] = [
    tableOf('[[seal]]', 'seal', tally(models, (m) => (m.sealed ? 'sealed' : 'unsealed'))),
    tableOf('[[balance]]', 'balance', tally(models, (m) => (m.statement.balanced ? 'balanced' : 'unbalanced'))),
    tableOf('[[gravity]]', 'gravity', tally(models, (m) => (gravityHeldOf(m) ? 'held' : 'not-held'))),
    tableOf('folder law / name', 'name', tally(models, (m) => (folderNameValid(m.atomPath) ? 'valid' : 'invalid'))),
    tableOf('folder law / trinity', 'trinity', tally(models, trinityStateOf)),
    tableOf('[[horo]] ring', 'horo', tally(models, horoBucket)),
    tableOf('typography / bond degree', 'bond-degree', tally(models, (m) => bondBucket(m.typography.bondDegree))),
    tableOf('typography / partition', 'partition', tally(models, (m) => m.typography.partition)),
  ]
  return { folderCount, tables }
}

/** Single-folder gate pivot — same axes, population of one. */
export function pivotSingleFolder(model: PivotFolderInput): FolderPivotStats {
  return pivotFolderStats([model])
}

/** Compare two corpus snapshots axis × state — delta and share shift. */
export function pivotFolderComparison(
  before: readonly PivotFolderInput[],
  after: readonly PivotFolderInput[],
): FolderPivotComparison {
  const beforeStats = pivotFolderStats(before)
  const afterStats = pivotFolderStats(after)
  const tables: PivotComparisonTable[] = []
  const afterByAxis = new Map(afterStats.tables.map((t) => [t.axis, t]))
  for (const bt of beforeStats.tables) {
    const at = afterByAxis.get(bt.axis)
    const states = new Set([...bt.rows.map((r) => r.state), ...(at?.rows.map((r) => r.state) ?? [])])
    const beforeMap = new Map(bt.rows.map((r) => [r.state, r.count]))
    const afterMap = new Map((at?.rows ?? []).map((r) => [r.state, r.count]))
    const rows: PivotComparisonRow[] = [...states]
      .sort((a, b) => a.localeCompare(b))
      .map((state) => {
        const b = beforeMap.get(state) ?? 0
        const a = afterMap.get(state) ?? 0
        return {
          state,
          before: b,
          after: a,
          delta: a - b,
          shareBefore: pct(b, bt.total),
          shareAfter: pct(a, at?.total ?? after.length),
        }
      })
    tables.push({ title: bt.title, axis: bt.axis, rows })
  }
  return { beforeCount: before.length, afterCount: after.length, tables }
}

/** Render one pivot table as a markdown section. */
export function renderPivotTable(table: PivotTable): string {
  const L = [`### ${table.title}`, '', `| state | count | share % |`, '| ----- | ----: | ------: |']
  for (const row of table.rows) {
    L.push(`| ${row.state} | ${row.count} | ${row.share} |`)
  }
  L.push(`| **Σ** | **${table.total}** | **100** |`, '')
  return L.join('\n')
}

/** Render all pivot tables for a corpus rollup. */
export function renderPivotMarkdown(stats: FolderPivotStats): string {
  const L = [
    `Cross-tab of **${stats.folderCount}** folder README models — state × count per axis.`,
    '',
    ...stats.tables.flatMap((t) => [renderPivotTable(t)]),
  ]
  return L.join('\n')
}

/** Render before/after comparison tables. */
export function renderPivotComparisonMarkdown(comparison: FolderPivotComparison): string {
  const L = [
    `Comparison **${comparison.beforeCount}** → **${comparison.afterCount}** folder models.`,
    '',
  ]
  for (const table of comparison.tables) {
    L.push(
      `### ${table.title}`,
      '',
      '| state | before | after | Δ | share before % | share after % |',
      '| ----- | -----: | ----: | -: | -------------: | ------------: |',
    )
    for (const row of table.rows) {
      const delta = row.delta > 0 ? `+${row.delta}` : String(row.delta)
      L.push(
        `| ${row.state} | ${row.before} | ${row.after} | ${delta} | ${row.shareBefore} | ${row.shareAfter} |`,
      )
    }
    L.push('')
  }
  return L.join('\n')
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const demo: PivotFolderInput[] = []
  console.log('pivot demo — empty corpus:')
  console.log(renderPivotMarkdown(pivotFolderStats(demo)))
  console.log('horo ring order:', HORO_DIGITS.join('·'))
}
