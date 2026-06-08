/**
 * agent/inventory — automatic coordinator task inventory (subagents · terminals).
 *
 * Scans Cursor subagent transcripts + terminal shells; classifies done/active/stale/duplicate;
 * emits speed-up hints for coordinators. Invoked by doctor, gate, and `erpax agent inventory`.
 *
 * @see ../communication/SKILL.md — ./emit.ts — @/apply/stall-watch
 */
import { execSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { homedir } from 'node:os'
import { basename, join } from 'node:path'
import { detectStalledProcesses } from '@/apply/stall-watch'

export type InventoryStatus = 'done' | 'active' | 'stale' | 'duplicate'
export type InventorySource = 'subagent' | 'terminal'

export interface InventoryRow {
  readonly id: string
  readonly ageSeconds: number
  readonly status: InventoryStatus
  readonly title: string
  readonly speedUpHint: string
  readonly source: InventorySource
  readonly startedAtMs: number
  readonly lastActivityMs: number
  readonly paths?: readonly string[]
}

export interface TaskInventoryOpts {
  readonly cwd?: string
  readonly transcriptsRoot?: string
  readonly terminalsDir?: string
  readonly staleAfterSec?: number
  readonly includeDone?: boolean
  readonly limit?: number
  readonly scanLimit?: number
}

export interface TaskInventoryResult {
  readonly rows: readonly InventoryRow[]
  readonly activeCount: number
  readonly staleCount: number
  readonly duplicateCount: number
  readonly warnings: readonly string[]
  readonly scannedAt: string
}

export const INVENTORY_STALE_AFTER_SEC = 30 * 60
export const INVENTORY_MAX_ACTIVE = 3
export const INVENTORY_DOCTOR_SCAN_LIMIT = 80
export const INVENTORY_JSON_REL = join('src', 'apply', 'inventory.generated.json')

const TITLE_PREFIX_LEN = 48
const PATH_RE = /\bsrc\/[\w./-]+/g

/** Cursor project slug from absolute cwd (`/Users/foo/bar` → `Users-foo-bar`). */
export function cursorProjectSlug(cwd: string): string {
  return cwd.replace(/^\//, '').replace(/\//g, '-')
}

/** Resolve subagent transcript glob roots (env override · project slug · broad fallback). */
export function resolveTranscriptRoots(cwd: string, override?: string): string[] {
  if (override) return [override]
  const env = process.env.CURSOR_AGENT_TRANSCRIPTS?.trim()
  if (env) return [env]
  const slug = cursorProjectSlug(cwd)
  const projectRoot = join(homedir(), '.cursor', 'projects', slug, 'agent-transcripts')
  if (existsSync(projectRoot)) return [projectRoot]
  const broad = join(homedir(), '.cursor', 'projects')
  if (!existsSync(broad)) return []
  return readdirSync(broad)
    .map((d) => join(broad, d, 'agent-transcripts'))
    .filter((p) => existsSync(p))
}

export function resolveTerminalsDir(cwd: string, override?: string): string | null {
  if (override) return existsSync(override) ? override : null
  const slug = cursorProjectSlug(cwd)
  const dir = join(homedir(), '.cursor', 'projects', slug, 'terminals')
  return existsSync(dir) ? dir : null
}

const normalizeTitle = (raw: string): string =>
  raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .slice(0, TITLE_PREFIX_LEN)

const formatAge = (sec: number): string => {
  if (sec < 60) return `${sec}s`
  if (sec < 3600) return `${Math.floor(sec / 60)}m`
  return `${Math.floor(sec / 3600)}h${Math.floor((sec % 3600) / 60)}m`
}

const extractTitle = (firstUserText: string, fallbackId: string): string => {
  const goal = firstUserText.match(/\*\*Goal\*\*\s*\n([^*\n][^\n]{0,120})/i)
  if (goal?.[1]) return goal[1].trim()
  const query = firstUserText.match(/<user_query>\s*([\s\S]{0,160})/i)
  if (query?.[1]) {
    const line = query[1].split('\n').find((l) => l.trim())?.trim()
    if (line) return line.slice(0, 120)
  }
  const desc = firstUserText.match(/description:\s*["']?([^"'\n]{8,120})/i)
  if (desc?.[1]) return desc[1].trim()
  return fallbackId.slice(0, 8)
}

const extractPaths = (text: string): Set<string> => {
  const out = new Set<string>()
  for (const m of text.matchAll(PATH_RE)) out.add(m[0]!)
  return out
}

interface ParsedTranscript {
  readonly id: string
  readonly filePath: string
  readonly title: string
  readonly titleKey: string
  readonly paths: Set<string>
  readonly done: boolean
  readonly startedAtMs: number
  readonly lastActivityMs: number
}

const parseTranscriptFile = (filePath: string): ParsedTranscript | null => {
  let raw = ''
  try {
    raw = readFileSync(filePath, 'utf8')
  } catch {
    return null
  }
  if (!raw.trim()) return null
  const stat = statSync(filePath)
  const id = basename(filePath, '.jsonl').slice(0, 8)
  const lines = raw.trim().split('\n')
  let firstUserText = ''
  let done = false
  for (const line of lines) {
    if (!line.trim()) continue
    try {
      const obj = JSON.parse(line) as Record<string, unknown>
      if (obj.type === 'turn_ended') {
        done = true
        continue
      }
      if (!firstUserText && obj.role === 'user') {
        const msg = obj.message as { content?: Array<{ type?: string; text?: string }> } | undefined
        const text = msg?.content?.find((c) => c.type === 'text')?.text ?? ''
        if (text) firstUserText = text
      }
    } catch {
      /* skip malformed tail lines */
    }
  }
  const title = extractTitle(firstUserText, id)
  return {
    id,
    filePath,
    title,
    titleKey: normalizeTitle(title),
    paths: extractPaths(raw),
    done,
    startedAtMs: stat.birthtimeMs || stat.ctimeMs,
    lastActivityMs: stat.mtimeMs,
  }
}

const listSubagentFiles = (roots: readonly string[], scanLimit?: number): string[] => {
  const files: string[] = []
  for (const root of roots) {
    let sessions: string[] = []
    try {
      sessions = readdirSync(root)
    } catch {
      continue
    }
    for (const session of sessions) {
      const subDir = join(root, session, 'subagents')
      if (!existsSync(subDir)) continue
      for (const f of readdirSync(subDir)) {
        if (f.endsWith('.jsonl')) files.push(join(subDir, f))
      }
    }
  }
  if (scanLimit === undefined || files.length <= scanLimit) return files
  return files
    .map((f) => ({ f, mtime: statSync(f).mtimeMs }))
    .sort((a, b) => b.mtime - a.mtime)
    .slice(0, scanLimit)
    .map((x) => x.f)
}

interface ParsedTerminal {
  readonly id: string
  readonly filePath: string
  readonly pid: number | null
  readonly cwd: string
  readonly command: string
  readonly done: boolean
  readonly startedAtMs: number
  readonly lastActivityMs: number
  readonly ageSeconds: number
}

const parseTerminalFile = (filePath: string, nowMs: number): ParsedTerminal | null => {
  let raw = ''
  try {
    raw = readFileSync(filePath, 'utf8')
  } catch {
    return null
  }
  const header = raw.slice(0, 1200)
  const pidMatch = header.match(/^pid:\s*(\d+)/m)
  const cwdMatch = header.match(/^cwd:\s*"([^"]+)"/m)
  const cmdMatch = header.match(/^command:\s*"(.*)"/ms)
  const startedMatch = header.match(/^started_at:\s*(.+)$/m)
  const endedMatch = header.match(/^ended_at:/m)
  const runningMatch = header.match(/^running_for_ms:\s*(\d+)/m)
  const stat = statSync(filePath)
  const startedAtMs = startedMatch?.[1] ? Date.parse(startedMatch[1]) : stat.birthtimeMs
  const runningMs = runningMatch ? Number(runningMatch[1]) : Math.max(0, nowMs - startedAtMs)
  return {
    id: `term-${basename(filePath, '.txt')}`,
    filePath,
    pid: pidMatch ? Number(pidMatch[1]) : null,
    cwd: cwdMatch?.[1] ?? '',
    command: (cmdMatch?.[1] ?? '').slice(0, 100),
    done: Boolean(endedMatch),
    startedAtMs,
    lastActivityMs: stat.mtimeMs,
    ageSeconds: Math.floor(runningMs / 1000),
  }
}

const speedUpFor = (
  status: InventoryStatus,
  row: Pick<InventoryRow, 'id'>,
  youngerDuplicateId?: string,
): string => {
  if (status === 'stale') return 'resume batch commit or publishDirection abort'
  if (status === 'duplicate' && youngerDuplicateId) return `cancel younger agent id ${youngerDuplicateId}`
  if (status === 'duplicate') return `cancel younger agent id ${row.id}`
  return '—'
}

const recentCommitPaths = (cwd: string): Set<string> => {
  if (!existsSync(join(cwd, '.git'))) return new Set()
  try {
    const out = execSync('git log -5 --name-only --pretty=format:', {
      cwd,
      encoding: 'utf8',
      maxBuffer: 512 * 1024,
    })
    return extractPaths(out)
  } catch {
    return new Set()
  }
}

const markDuplicates = (
  rows: InventoryRow[],
  commitPaths: Set<string>,
): InventoryRow[] => {
  const byTitle = new Map<string, InventoryRow[]>()
  for (const row of rows) {
    if (row.status === 'done') continue
    const key = normalizeTitle(row.title)
    if (!key) continue
    const group = byTitle.get(key) ?? []
    group.push(row)
    byTitle.set(key, group)
  }

  const duplicateIds = new Map<string, string>()
  for (const group of byTitle.values()) {
    if (group.length < 2) continue
    const sorted = [...group].sort((a, b) => a.startedAtMs - b.startedAtMs)
    const keeper = sorted[0]!
    for (const younger of sorted.slice(1)) {
      duplicateIds.set(younger.id, keeper.id)
    }
  }

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]!
    if (row.status === 'done') continue
    const paths = row.paths ?? []
    for (let j = 0; j < rows.length; j++) {
      if (i === j) continue
      const other = rows[j]!
      if (other.status === 'done') continue
      if (other.startedAtMs >= row.startedAtMs) continue
      const overlap = paths.some((p) => (other.paths ?? []).includes(p) || commitPaths.has(p))
      if (overlap && row.startedAtMs > other.startedAtMs) {
        duplicateIds.set(row.id, other.id)
      }
    }
  }

  return rows.map((row) => {
    const keeperId = duplicateIds.get(row.id)
    if (!keeperId) return row
    return {
      ...row,
      status: 'duplicate' as const,
      speedUpHint: speedUpFor('duplicate', { id: row.id }),
    }
  })
}

/** Scan subagent transcripts + terminals; classify and sort oldest-first. */
export function taskInventory(opts: TaskInventoryOpts = {}): TaskInventoryResult {
  const cwd = opts.cwd ?? process.cwd()
  const nowMs = Date.now()
  const staleAfterSec = opts.staleAfterSec ?? INVENTORY_STALE_AFTER_SEC
  const includeDone = opts.includeDone ?? false
  const transcriptRoots = resolveTranscriptRoots(cwd, opts.transcriptsRoot)
  const terminalsDir = resolveTerminalsDir(cwd, opts.terminalsDir)
  const commitPaths = recentCommitPaths(cwd)

  const rawRows: InventoryRow[] = []

  for (const file of listSubagentFiles(transcriptRoots, opts.scanLimit)) {
    const parsed = parseTranscriptFile(file)
    if (!parsed) continue
    const idleSec = Math.floor((nowMs - parsed.lastActivityMs) / 1000)
    const ageSeconds = Math.floor((nowMs - parsed.startedAtMs) / 1000)
    let status: InventoryStatus
    if (parsed.done) {
      status = 'done'
    } else if (idleSec >= staleAfterSec) {
      status = 'stale'
    } else {
      status = 'active'
    }
    if (status === 'done' && !includeDone) continue
    rawRows.push({
      id: parsed.id,
      ageSeconds,
      status,
      title: parsed.title,
      speedUpHint: speedUpFor(status, { id: parsed.id }),
      source: 'subagent',
      startedAtMs: parsed.startedAtMs,
      lastActivityMs: parsed.lastActivityMs,
      paths: [...parsed.paths],
    })
  }

  if (terminalsDir) {
    for (const f of readdirSync(terminalsDir)) {
      if (!f.endsWith('.txt')) continue
      const parsed = parseTerminalFile(join(terminalsDir, f), nowMs)
      if (!parsed || parsed.done) continue
      if (parsed.cwd && parsed.cwd !== cwd) continue
      const idleSec = Math.floor((nowMs - parsed.lastActivityMs) / 1000)
      const status: InventoryStatus = idleSec >= staleAfterSec ? 'stale' : 'active'
      rawRows.push({
        id: parsed.id,
        ageSeconds: parsed.ageSeconds,
        status,
        title: parsed.command || parsed.id,
        speedUpHint: speedUpFor(status, { id: parsed.id }),
        source: 'terminal',
        startedAtMs: parsed.startedAtMs,
        lastActivityMs: parsed.lastActivityMs,
      })
    }
  }

  let rows = markDuplicates(rawRows, commitPaths)
  rows.sort((a, b) => a.startedAtMs - b.startedAtMs)

  const activeCount = rows.filter((r) => r.status === 'active').length
  const staleCount = rows.filter((r) => r.status === 'stale').length
  const duplicateCount = rows.filter((r) => r.status === 'duplicate').length
  const warnings: string[] = []
  if (activeCount > INVENTORY_MAX_ACTIVE) warnings.push('queue depth exceeded')
  if (staleCount > 0) {
    const longStale = rows.filter(
      (r) => r.status === 'stale' && r.ageSeconds >= staleAfterSec,
    ).length
    if (longStale > 0) warnings.push(`${longStale} stale >${Math.floor(staleAfterSec / 60)}min`)
  }
  const stalled = detectStalledProcesses()
  if (stalled.length) warnings.push(`${stalled.length} long-running erpax process(es) — erpax doctor stalls`)

  if (opts.limit !== undefined && opts.limit > 0) {
    const staleFirst = rows.filter((r) => r.status === 'stale')
    const rest = rows.filter((r) => r.status !== 'stale')
    rows = [...staleFirst, ...rest].slice(0, opts.limit)
  }

  return {
    rows,
    activeCount,
    staleCount,
    duplicateCount,
    warnings,
    scannedAt: new Date(nowMs).toISOString(),
  }
}

/** Markdown table for doctor / stdout. */
export function inventoryReport(opts: TaskInventoryOpts & { heading?: string } = {}): string {
  const result = taskInventory(opts)
  const lines: string[] = []
  lines.push(opts.heading ?? 'erpax agent inventory — oldest → newest')
  if (result.warnings.length) {
    lines.push(`warnings: ${result.warnings.join(' · ')}`)
  }
  lines.push(
    `active ${result.activeCount} · stale ${result.staleCount} · duplicate ${result.duplicateCount}`,
  )
  lines.push('')
  lines.push('| id | age | status | title | speed-up hint |')
  lines.push('| --- | --- | --- | --- | --- |')
  if (!result.rows.length) {
    lines.push('| — | — | — | (empty) | — |')
  } else {
    for (const r of result.rows) {
      const title = r.title.replace(/\|/g, '\\|').slice(0, 80)
      lines.push(
        `| ${r.id} | ${formatAge(r.ageSeconds)} | ${r.status.toUpperCase()} | ${title} | ${r.speedUpHint} |`,
      )
    }
  }
  lines.push('')
  return lines.join('\n')
}

/** Light doctor section — top stale rows only. */
export function formatDoctorInventorySection(cwd: string = process.cwd()): string {
  const result = taskInventory({
    cwd,
    limit: 10,
    includeDone: false,
    scanLimit: INVENTORY_DOCTOR_SCAN_LIMIT,
  })
  if (!result.rows.length && result.activeCount <= INVENTORY_MAX_ACTIVE) {
    return '  inventory      ok — no stale subagents'
  }
  const parts = [`active ${result.activeCount}/${INVENTORY_MAX_ACTIVE}`]
  if (result.staleCount) parts.push(`stale ${result.staleCount}`)
  if (result.duplicateCount) parts.push(`dup ${result.duplicateCount}`)
  const top = result.rows
    .filter((r) => r.status === 'stale' || r.status === 'duplicate')
    .slice(0, 3)
    .map((r) => `${r.id}:${r.status}`)
  if (top.length) parts.push(top.join(', '))
  return `  inventory      ${parts.join(' · ')} — pnpm erpax agent inventory`
}

/** Gate pre-step — warn (non-fatal) on queue pressure. */
export function inventoryGateWarnings(cwd: string = process.cwd()): readonly string[] {
  const result = taskInventory({ cwd, includeDone: false })
  const out: string[] = []
  if (result.activeCount > INVENTORY_MAX_ACTIVE) {
    out.push(`gate inventory: ${result.activeCount} ACTIVE subagents (max ${INVENTORY_MAX_ACTIVE}) — queue depth exceeded`)
  }
  const staleLong = result.rows.filter(
    (r) => r.status === 'stale' && r.ageSeconds >= INVENTORY_STALE_AFTER_SEC,
  )
  if (staleLong.length) {
    out.push(
      `gate inventory: ${staleLong.length} STALE >${INVENTORY_STALE_AFTER_SEC / 60}min — resume batch commit or publishDirection abort`,
    )
  }
  return out
}
