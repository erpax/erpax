/**
 * apply/stall-watch — detect long-running erpax processes and recommend action.
 *
 * AGE IS NOT DEATH (measured 2026-07-19): the age-only classifier called a LIVE vitest
 * fork worker (100% CPU, mid-gate) "dead" and its parent a "zombie duplicate" — the kill
 * it recommended poisoned a push verdict. Three truths joined the classifier:
 *   · a process actively burning CPU is SLOW, never dead — %CPU reads from the same ps
 *   · a pid whose ancestor chain holds a live `git push`/pre-push is THE GATE — untouchable
 *   · fork children of a live vitest are its limbs, not duplicates
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
  // Sibling corpus (ceccec.github.io) — its OWN stall/stop law says >3min = hung; observed
  // 2026-07-15: seven theoremWavesVerify at up to 2h56m starving the machine (killed by hand
  // — this rule saves that judgment as the pair: save first, then use).
  { test: /theoremWaves|pair\/enforcement|thunder\/verify/, kind: 'other', slowAfterSec: 180, deadAfterSec: 360 },
]

const ERPAX_MARK = /erpax|theoremWaves|src\/(readme|rules|confirm|apply|cli|pair\/enforcement|thunder)\//

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

/**
 * AGE IS NOT DEATH: activity and ancestry outrank the clock. Exported pure so the
 * three truths are regression-locked without a live process table.
 */
export const statusFor = (
  ageSec: number,
  rule: KindRule,
  duplicate: boolean,
  opts: { readonly cpuPct?: number; readonly gateAncestor?: boolean } = {},
): StallStatus => {
  if (opts.gateAncestor) return 'slow' // the live gate's tree is never a kill candidate
  if ((opts.cpuPct ?? 0) >= 5) return 'slow' // actively computing — long, not dead
  if (duplicate) return 'zombie'
  if (ageSec >= rule.deadAfterSec) return 'dead'
  if (ageSec >= rule.slowAfterSec) return 'slow'
  return 'slow'
}

const recommend = (row: Omit<StalledProcessRow, 'recommendation'>, gateAncestor: boolean): string => {
  if (gateAncestor) return 'THE GATE — a live git push/pre-push tree; never kill'
  if (row.status === 'zombie') return 'kill duplicate (keep newest pid for this kind)'
  if (row.status === 'dead') {
    if (row.kind === 'readme') return 'SIGTERM — likely OOM thrash; run one `pnpm erpax readme check`'
    return 'SIGTERM if no terminal progress; retry single instance'
  }
  if (row.kind === 'confirm') return 'blocked on hooks — wait or inspect confirm gate'
  return 'monitor — legitimate long job if terminal shows waves/phases'
}

/** pids whose ancestor chain holds a live `git push` or pre-push hook — the gate's tree. */
export function gateAncestryPids(psLines: readonly { pid: number; ppid: number; command: string }[]): ReadonlySet<number> {
  const gateRoots = new Set(psLines.filter((p) => /git push|pre-push/.test(p.command)).map((p) => p.pid))
  const byPid = new Map(psLines.map((p) => [p.pid, p]))
  const inGate = new Set<number>()
  for (const p of psLines) {
    let cur: { pid: number; ppid: number } | undefined = p
    for (let hops = 0; cur && hops < 32; hops++) {
      if (gateRoots.has(cur.pid)) {
        inGate.add(p.pid)
        break
      }
      cur = byPid.get(cur.ppid)
    }
  }
  return inGate
}

/** List erpax-related processes with stall classification (conservative kill hints). */
export function detectStalledProcesses(): StalledProcessRow[] {
  let raw = ''
  try {
    raw = execSync('ps -eo pid=,ppid=,pcpu=,etime=,command=', {
      encoding: 'utf8',
      maxBuffer: 8 * 1024 * 1024,
    })
  } catch {
    return []
  }

  const table: { pid: number; ppid: number; cpuPct: number; etime: string; command: string }[] = []
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) continue
    const m = trimmed.match(/^(\d+)\s+(\d+)\s+(\d+[.,]?\d*)\s+(\S+)\s+(.*)$/)
    if (!m) continue
    table.push({ pid: Number(m[1]), ppid: Number(m[2]), cpuPct: Number(String(m[3]).replace(',', '.')), etime: m[4]!, command: m[5] ?? '' })
  }
  const inGate = gateAncestryPids(table)

  const candidates: (Omit<StalledProcessRow, 'status' | 'recommendation'> & { cpuPct: number; gate: boolean })[] = []
  for (const p of table) {
    const rule = classifyKind(p.command)
    if (!rule) continue
    candidates.push({ pid: p.pid, command: p.command, ageSeconds: parsePsEtime(p.etime), kind: rule.kind, cpuPct: p.cpuPct, gate: inGate.has(p.pid) })
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
      const status = statusFor(c.ageSeconds, rule, dup, { cpuPct: c.cpuPct, gateAncestor: c.gate })
      const base = { pid: c.pid, command: c.command, ageSeconds: c.ageSeconds, kind: c.kind, status }
      return { ...base, recommendation: recommend(base, c.gate) }
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

/**
 * The kill face of the stall/stop pair — SIGTERM every dead/zombie row, spare the living.
 * Detection without execution left the machine carrying 9h of hung minds (2026-07-15);
 * the saved pair is used via `erpax doctor stalls --kill`. Never touches `slow` rows —
 * a legitimate long job shows waves in its terminal; death is only for the unaccounted.
 */
export function killStalledProcesses(
  rows: readonly StalledProcessRow[] = detectStalledProcesses(),
): readonly StalledProcessRow[] {
  // Zombies must also be OLD — the duplicate heuristic flags second-old siblings
  // (legitimate concurrent short tasks); death is only for the demonstrably stuck.
  const doomed = rows.filter(
    (r) => (r.status === 'dead' || (r.status === 'zombie' && r.ageSeconds >= 120)) && r.pid !== process.pid,
  )
  for (const r of doomed) {
    try {
      process.kill(r.pid, 'SIGTERM')
    } catch {
      /* already gone */
    }
  }
  return doomed
}
