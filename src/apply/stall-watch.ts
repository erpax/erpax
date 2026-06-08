/**
 * apply/stall-watch — detect long-running erpax processes and recommend action.
 */
import { execSync } from 'node:child_process'

export type StallKind = 'readme' | 'rules' | 'vitest' | 'confirm' | 'clean' | 'other'
export type StallStatus = 'slow' | 'blocked' | 'zombie' | 'dead'

export interface StalledProcessRow {
  readonly pid: number
  readonly command: string
  readonly ageSeconds: number
  readonly kind: StallKind
  readonly status: StallStatus
  readonly recommendation: string
}

interface KindRule {
  readonly test: RegExp
  readonly kind: StallKind
  readonly slowAfterSec: number
  readonly deadAfterSec: number
}

const KIND_RULES: readonly KindRule[] = [
  {
    test: /readme\/index\.ts|erpax readme|readme:check|readme:waves/,
    kind: 'readme',
    slowAfterSec: 300,
    deadAfterSec: 600,
  },
  {
    test: /rules\/index\.ts|erpax rules|rules:check/,
    kind: 'rules',
    slowAfterSec: 180,
    deadAfterSec: 600,
  },
  { test: /vitest/, kind: 'vitest', slowAfterSec: 300, deadAfterSec: 1800 },
  { test: /confirm\/matter|confirm:uuid|confirm\.mjs/, kind: 'confirm', slowAfterSec: 600, deadAfterSec: 3600 },
  { test: /apply\/clean|erpax clean|improve:watch|violations\/loop/, kind: 'clean', slowAfterSec: 300, deadAfterSec: 900 },
]

const ERPAX_MARK = /erpax|src\/(readme|rules|confirm|apply|cli)\//

/** Parse `ps` etime ([[dd-]hh:]mm:ss) to seconds. */
export function parsePsEtime(raw: string): number {
  const s = raw.trim()
  if (!s) return 0
  let days = 0
  let rest = s
  if (rest.includes('-')) {
    const [d, r] = rest.split('-', 2)
    days = Number(d) || 0
    rest = r ?? ''
  }
  const parts = rest.split(':').map((p) => Number(p) || 0)
  if (parts.length === 3) {
    const [h, m, sec] = parts
    return days * 86400 + h! * 3600 + m! * 60 + sec!
  }
  if (parts.length === 2) {
    const [m, sec] = parts
    return days * 86400 + m! * 60 + sec!
  }
  return days * 86400 + (parts[0] ?? 0)
}

const classifyKind = (command: string): KindRule | null => {
  for (const rule of KIND_RULES) {
    if (rule.test.test(command)) return rule
  }
  return ERPAX_MARK.test(command)
    ? { test: ERPAX_MARK, kind: 'other', slowAfterSec: 600, deadAfterSec: 1200 }
    : null
}

const statusFor = (ageSec: number, rule: KindRule, duplicate: boolean): StallStatus => {
  if (duplicate) return 'zombie'
  if (ageSec >= rule.deadAfterSec) return 'dead'
  if (ageSec >= rule.slowAfterSec) return 'slow'
  return 'slow'
}

const recommend = (row: Omit<StalledProcessRow, 'recommendation'>): string => {
  if (row.status === 'zombie') return 'kill duplicate (keep newest pid for this kind)'
  if (row.status === 'dead') {
    if (row.kind === 'readme') return 'SIGTERM — likely OOM thrash; run one `pnpm erpax readme check`'
    return 'SIGTERM if no terminal progress; retry single instance'
  }
  if (row.kind === 'confirm') return 'blocked on hooks — wait or inspect confirm gate'
  return 'monitor — legitimate long job if terminal shows waves/phases'
}

/** List erpax-related processes with stall classification (conservative kill hints). */
export function detectStalledProcesses(): StalledProcessRow[] {
  let raw = ''
  try {
    raw = execSync('ps -eo pid=,etime=,command=', {
      encoding: 'utf8',
      maxBuffer: 8 * 1024 * 1024,
    })
  } catch {
    return []
  }

  const candidates: Omit<StalledProcessRow, 'status' | 'recommendation'>[] = []
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) continue
    const m = trimmed.match(/^(\d+)\s+(\S+)\s+(.*)$/)
    if (!m) continue
    const pid = Number(m[1])
    const command = m[3] ?? ''
    const rule = classifyKind(command)
    if (!rule) continue
    const ageSeconds = parsePsEtime(m[2] ?? '')
    candidates.push({ pid, command, ageSeconds, kind: rule.kind })
  }

  const byKind = new Map<StallKind, number>()
  for (const c of candidates) {
    byKind.set(c.kind, (byKind.get(c.kind) ?? 0) + 1)
  }

  const newestByKind = new Map<StallKind, number>()
  for (const c of candidates) {
    const prev = newestByKind.get(c.kind)
    if (prev === undefined || c.pid > prev) newestByKind.set(c.kind, c.pid)
  }

  return candidates
    .map((c) => {
      const rule = KIND_RULES.find((r) => r.kind === c.kind) ?? KIND_RULES[0]!
      const dup = (byKind.get(c.kind) ?? 0) > 1 && newestByKind.get(c.kind) !== c.pid
      const status = statusFor(c.ageSeconds, rule, dup)
      const base = { ...c, status }
      return { ...base, recommendation: recommend(base) }
    })
    .sort((a, b) => b.ageSeconds - a.ageSeconds)
}

export function formatStallTable(rows: readonly StalledProcessRow[]): string {
  if (!rows.length) return 'erpax doctor stalls — no long-running erpax processes detected\n'
  const lines = ['erpax doctor stalls — long-running processes\n']
  lines.push('  pid      age(s)  status   kind      recommendation')
  lines.push('  -------- ------- -------- --------- ----------------')
  for (const r of rows) {
    const age = String(r.ageSeconds).padStart(7)
    const pid = String(r.pid).padStart(8)
    lines.push(`  ${pid} ${age}  ${r.status.padEnd(8)} ${r.kind.padEnd(9)} ${r.recommendation}`)
  }
  return `${lines.join('\n')}\n`
}
