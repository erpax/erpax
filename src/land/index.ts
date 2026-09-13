/**
 * land — push main, then ask the forge what it did with the commit. A landing is complete when the forge
 * agrees, not when the remote moved.
 *
 * THE BLIND SIDE, measured 2026-09-12 on d5ffea88c7: the pre-push hook green, CI green on every job of the
 * push run, and on the same commit two red checks nobody saw — `Workers Builds: erpax` (a git-connected
 * Cloudflare build, red on 5 of the last 8 main commits) and `Deploy + UI smoke` (red on every run). The hook
 * runs BEFORE the push, so a workflow that fails after it is outside everything it can see.
 *
 * PORTED, NOT RE-DERIVED: the verdict is uuidna's post-push arm (uuidna/uuidna), paid for there by a
 * `security` workflow red on 44 consecutive pushes under a green local gate. Its laws came with it and each is
 * pinned in test.ts. The verdict is PURE; the network lives only in the runner at the bottom of this file.
 *
 * @law a landing is complete when the forge agrees, not when the remote moved
 * @invariant no run for the sha is UNMEASURED and never ok
 * @invariant a run on the sha that is not a push is reported and never judged
 * @invariant an unrostered foreign check is judged normally and named in rosterGaps
 * @invariant a push denial is cured only by a taught cure; an untaught one stops for a human
 * @standard ISO-19011:2018 §6.4 — audit evidence: a check that did not run produced none
 * @see ./SKILL.md
 */
import { execSync, spawnSync } from 'node:child_process'

/** One workflow run for a commit. */
export interface RunRow {
  readonly workflowName: string
  readonly headSha: string
  readonly status: string
  readonly conclusion: string | null
  /** What triggered the run. Required: a scheduled or `workflow_run` job carries the same sha as the push. */
  readonly event: string
  /** The run's id, so a check run can be joined back to it and inherit its event. */
  readonly databaseId?: number
}

/** One check run on a commit — strictly finer than a workflow: every Actions job, plus anything an App posts. */
export interface CheckRow {
  readonly name: string
  readonly status: string
  readonly conclusion: string | null
  readonly appSlug: string
  /** The workflow run this check belongs to, recovered from details_url; null for a foreign app. */
  readonly runId: number | null
}

export interface PushVerdict {
  readonly sha: string
  /** at least one run reached a verdict — false means UNMEASURED, never clean */
  readonly measured: boolean
  /** every push run for this sha has finished */
  readonly settled: boolean
  /** settled AND something judged AND nothing failed */
  readonly ok: boolean
  readonly failing: readonly string[]
  readonly pending: readonly string[]
  /** cancelled or skipped — reported always, because what did not run is the reader's business */
  readonly didNotJudge: readonly string[]
  /** runs on this sha triggered by something other than a push — reported, never judged */
  readonly notThisPush: readonly string[]
  /** checks a roster entry exempts — reported always */
  readonly notJudging: readonly string[]
  /** foreign checks in no roster column: judged normally, and named so someone decides */
  readonly rosterGaps: readonly string[]
  readonly reason: string
}

/**
 * Why a check need not judge a push. `late`: its ABSENCE must not block, but its failure still does.
 * `meaningless`: it can never succeed, so even its failure is ignored — honoured for a foreign app only.
 * DECLARED in the open, because no theorem derives it. `Workers Builds: erpax` is deliberately absent: it
 * is a production build path that fails in zero seconds, and disconnecting or fixing it is a human decision.
 */
export interface Exemption {
  readonly kind: 'late' | 'meaningless'
  readonly why: string
}

export const NEED_NOT_JUDGE: Readonly<Record<string, Exemption>> = {
  'Analyze (actions)': { kind: 'late', why: 'CodeQL default setup; runs under its own event and routinely settles after CI' },
  'Analyze (javascript-typescript)': { kind: 'late', why: 'CodeQL default setup; same run, same lateness' },
}

// A skipped or cancelled run is NOT a failure and NOT a success: it did not judge.
const PASSED = new Set(['success', 'neutral'])
const DID_NOT_JUDGE = new Set(['skipped', 'cancelled'])

const concluded = (c: string | null): string => c ?? ''
const isFailure = (status: string, conclusion: string | null): boolean =>
  status === 'completed' && !PASSED.has(concluded(conclusion)) && !DID_NOT_JUDGE.has(concluded(conclusion))

/** pushVerdict(sha, runs, checks) → what the forge says about this commit. Pure: the network is the caller's. */
export function pushVerdict(sha: string, rows: readonly RunRow[], checks: readonly CheckRow[] = []): PushVerdict {
  // A prefix matches, because everyone types the short sha; below git's own seven-character floor it is refused.
  if (sha.length < 7) throw new Error(`land: "${sha}" is too short to identify a commit — give at least seven hex characters`)
  const short = sha.slice(0, 9)
  const onSha = rows.filter((r) => r.headSha === sha || r.headSha.startsWith(sha))
  const mine = onSha.filter((r) => r.event === 'push')
  const notThisPush = onSha
    .filter((r) => r.event !== 'push')
    .map((r) => `${r.workflowName} (${r.event}: ${r.conclusion ?? r.status})`)
    .sort()
  const pending = mine.filter((r) => r.status !== 'completed').map((r) => r.workflowName).sort()
  const failing = mine
    .filter((r) => isFailure(r.status, r.conclusion))
    .map((r) => `${r.workflowName} (${r.conclusion ?? 'no conclusion'})`)
    .sort()
  const didNotJudge = mine
    .filter((r) => r.status === 'completed' && DID_NOT_JUDGE.has(concluded(r.conclusion)))
    .map((r) => `${r.workflowName} (${r.conclusion})`)
    .sort()
  const passed = mine.filter((r) => r.status === 'completed' && PASSED.has(concluded(r.conclusion)))
  // A verdict requires a judge: absence-of-failure over a set where nothing judged is not a pass.
  const measured = passed.length > 0 || failing.length > 0
  const settled = mine.length > 0 && pending.length === 0
  const ok = settled && passed.length > 0 && failing.length === 0
  const aside =
    (didNotJudge.length ? ` — and did NOT judge: ${didNotJudge.join(', ')}` : '') +
    (notThisPush.length ? ` — and NOT this push: ${notThisPush.join(', ')}` : '')
  const reason = pending.length
    ? `still running for ${short}: ${pending.join(', ')}${aside}`
    : failing.length
      ? `FAILED for ${short}: ${failing.join(', ')}${aside}`
      : !onSha.length
        ? `UNMEASURED: the forge reports no run at all for ${short} — this is not a pass. It may not be queued yet; ask again.`
        : !mine.length
          ? `UNMEASURED: ${onSha.length} run(s) sit on ${short} and NOT ONE WAS A PUSH — ${notThisPush.join(', ')}.`
          : !passed.length
            ? `UNMEASURED: ${mine.length} push run(s) for ${short} and NOT ONE JUDGED — ${didNotJudge.join(', ') || 'none completed'}. A cancelled scan is not a clean scan.`
            : `${passed.length} workflow(s) passed for ${short}${aside}`

  if (!checks.length) return { sha, measured, settled, ok, failing, pending, didNotJudge, notThisPush, notJudging: [], rosterGaps: [], reason }

  // ── The finer surface. An Actions check inherits its run's event through the join, so the push filter still
  //    holds; a foreign check has no run to join, so the roster decides it, and an unrostered one is judged.
  const eventOf = new Map(rows.filter((r) => r.databaseId !== undefined).map((r) => [r.databaseId!, r.event]))
  const alsoNotThisPush = [...notThisPush]
  const notJudging: string[] = []
  const rosterGaps: string[] = []
  const checkFailing: string[] = []
  const checkPending: string[] = []
  const checkDidNotJudge: string[] = []
  let checkPassed = 0
  let sawCheck = false
  for (const c of checks) {
    const exemption = NEED_NOT_JUDGE[c.name]
    if (exemption !== undefined) {
      const foreign = c.runId === null && c.appSlug !== 'github-actions'
      // an exempt FIRST-PARTY check that failed falls through and is judged: exemption covers lateness, not fault
      if (foreign || !isFailure(c.status, c.conclusion)) {
        notJudging.push(`${c.name} (${c.conclusion ?? c.status})`)
        continue
      }
    }
    if (c.runId !== null) {
      const ev = eventOf.get(c.runId)
      if (ev === undefined) {
        rosterGaps.push(`${c.name} — its workflow run ${c.runId} is not among this sha's runs, so its event is unknown`)
        continue
      }
      if (ev !== 'push') {
        alsoNotThisPush.push(`${c.name} (${ev}: ${c.conclusion ?? c.status})`)
        continue
      }
    } else if (c.appSlug !== 'github-actions') {
      rosterGaps.push(`${c.name} (${c.appSlug}) is in no roster column — judged as a push check until someone decides`)
    }
    sawCheck = true
    if (c.status !== 'completed') checkPending.push(c.name)
    else if (PASSED.has(concluded(c.conclusion))) checkPassed++
    else if (DID_NOT_JUDGE.has(concluded(c.conclusion))) checkDidNotJudge.push(`${c.name} (${c.conclusion})`)
    else checkFailing.push(`${c.name} (${c.conclusion ?? 'no conclusion'})`)
  }
  // The check surface CONTAINS every Actions job, so when present it is the verdict — judging both would count
  // one failure twice, at two granularities.
  const f = checkFailing.sort()
  const pd = checkPending.sort()
  const dj = checkDidNotJudge.sort()
  const ntp = alsoNotThisPush.sort()
  // CodeQL posts the same check names from several runs on one sha; the reader needs each once.
  const nj = [...new Set(notJudging)].sort()
  const meas = checkPassed > 0 || f.length > 0
  const sett = sawCheck && pd.length === 0
  const aside2 =
    (dj.length ? ` — and did NOT judge: ${dj.join(', ')}` : '') +
    (nj.length ? ` — and exempt: ${nj.join(', ')}` : '') +
    (ntp.length ? ` — and NOT this push: ${ntp.join(', ')}` : '') +
    (rosterGaps.length ? ` — UNROSTERED: ${rosterGaps.join('; ')}` : '')
  const why = pd.length
    ? `still running for ${short}: ${pd.join(', ')}${aside2}`
    : f.length
      ? `FAILED for ${short}: ${f.join(', ')}${aside2}`
      : !sawCheck
        ? `UNMEASURED: every check on ${short} is exempt or belongs to another event${aside2}`
        : !meas
          ? `UNMEASURED: ${checks.length} check(s) on ${short} and NOT ONE JUDGED${aside2}`
          : `${checkPassed} check(s) passed for ${short}${aside2}`
  return {
    sha,
    measured: meas,
    settled: sett,
    ok: sett && meas && f.length === 0,
    failing: f,
    pending: pd,
    didNotJudge: dj,
    notThisPush: ntp,
    notJudging: nj,
    rosterGaps,
    reason: why,
  }
}

/**
 * `gh api --paginate --jq '.x[]'` answers one JSON object per line — pagination-safe, where a concatenated
 * multi-page body is not valid JSON. A line that is not an object is refused, never read as "no runs".
 */
export function jsonLines(out: string): Record<string, unknown>[] {
  return out
    .split('\n')
    .filter((l) => l.trim() !== '')
    .map((l) => {
      const o: unknown = JSON.parse(l)
      if (o === null || typeof o !== 'object' || Array.isArray(o))
        throw new Error(`land: the forge answered a line that is not an object — ${l.slice(0, 120)}`)
      return o as Record<string, unknown>
    })
}

const conclusionOf = (v: unknown): string | null => (v === null || v === undefined ? null : String(v))

/**
 * A run as the actions api spells it → RunRow. A row with no event is REFUSED rather than defaulted: "push"
 * would re-admit the schedule bug, and "not push" would drop real runs and read as a pass.
 */
export function runRowOf(o: Readonly<Record<string, unknown>>): RunRow {
  if (o.event === undefined || o.event === null || String(o.event) === '')
    throw new Error('land: a run row carries no `event` — a run that cannot say what triggered it cannot be attributed to a push')
  const id = Number(o.id)
  return {
    workflowName: String(o.name ?? '?'),
    headSha: String(o.head_sha ?? ''),
    status: String(o.status ?? ''),
    conclusion: conclusionOf(o.conclusion),
    event: String(o.event),
    ...(Number.isFinite(id) ? { databaseId: id } : {}),
  }
}

/** A check run → CheckRow. The run id is recovered from details_url; a foreign app's url carries none. */
export function checkRowOf(o: Readonly<Record<string, unknown>>): CheckRow {
  const m = /actions\/runs\/(\d+)/.exec(String(o.details_url ?? ''))
  const app = o.app
  const appSlug = typeof app === 'string' ? app : String((app as { slug?: unknown } | null | undefined)?.slug ?? '?')
  return {
    name: String(o.name ?? '?'),
    status: String(o.status ?? ''),
    conclusion: conclusionOf(o.conclusion),
    appSlug,
    runId: m ? Number(m[1]) : null,
  }
}

/** owner/repo from the tree's own remote, https or ssh — never written inline, and refused when unreadable. */
export const repoSlugOf = (remote: string): string => {
  const m = /(?:github\.com[/:])([^/]+\/[^/]+?)(?:\.git)?$/.exec(String(remote).trim())
  if (!m) throw new Error(`land: cannot read an owner/repo out of the remote ${JSON.stringify(remote)}`)
  return m[1]!
}

/**
 * The forge has not indexed the commit yet (422/404) versus the forge cannot be asked. The first is UNMEASURED;
 * the second stays loud. "Not Found" bare is refused as a pattern: `gh: command not found` contains it.
 */
export const isUnknownCommit = (message: string): boolean => /No commit found for SHA|\(HTTP (?:404|422)\)/i.test(String(message))

/** A taught cure for a push denial. First match wins; a denial no cure matches is a human's decision. */
export interface Cure {
  readonly name: string
  readonly when: RegExp
  readonly cmd: string
}

export const CURES: readonly Cure[] = [
  // Git spells "behind" two ways, and a cure matching one misses the case that fires. It INTEGRATES, never
  // forces: a merge that conflicts aborts itself and leaves the tree exactly as it was found.
  {
    name: 'behind the shared tree',
    when: /\[rejected\][^\n]*\((?:fetch first|non-fast-forward)\)|tip of your current branch is behind/,
    cmd: 'git fetch origin main && { git merge --no-edit origin/main || { git merge --abort; false; }; }',
  },
]

export const cureFor = (pushOutput: string): Cure | undefined => CURES.find((c) => c.when.test(pushOutput))

// ── the runner: the only place the network lives ────────────────────────────────────────────────────────────

const sh = (cmd: string): string =>
  execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024 })

function askForge(cmd: string): string | null {
  try {
    return sh(cmd)
  } catch (e) {
    const err = e as { stderr?: unknown; message?: unknown }
    const msg = [err.stderr, err.message].map((x) => String(x ?? '')).join(' ').trim() || String(e)
    if (isUnknownCommit(msg)) return null
    throw new Error(`land: the forge could not be asked — ${msg.slice(0, 200)}`)
  }
}

function forgeRows(slug: string, sha: string): { runs: RunRow[]; checks: CheckRow[] } {
  const runs = askForge(
    `gh api "repos/${slug}/actions/runs?head_sha=${sha}" --paginate --jq '.workflow_runs[] | {name, head_sha, status, conclusion, event, id}'`,
  )
  const checks = askForge(
    `gh api "repos/${slug}/commits/${sha}/check-runs" --paginate --jq '.check_runs[] | {name, status, conclusion, app: .app.slug, details_url}'`,
  )
  return {
    runs: runs === null ? [] : jsonLines(runs).map(runRowOf),
    checks: checks === null ? [] : jsonLines(checks).map(checkRowOf),
  }
}

// Bounded polling: CI settles in about thirteen minutes. The bound is the honesty — patience never becomes a
// verdict, and a run slower than it reports STILL RUNNING.
const ROUNDS = 60
const PAUSE_S = 20

function judge(slug: string, sha: string, wait: boolean): PushVerdict {
  let rows = forgeRows(slug, sha)
  let v = pushVerdict(sha, rows.runs, rows.checks)
  for (let i = 0; wait && !v.settled && i < ROUNDS; i++) {
    console.log(`· land — ${v.reason}`)
    sh(`sleep ${PAUSE_S}`)
    rows = forgeRows(slug, sha)
    v = pushVerdict(sha, rows.runs, rows.checks)
  }
  return v
}

function report(v: PushVerdict): number {
  if (v.ok) {
    console.log(`✓ land — ${v.reason}`)
    return 0
  }
  console.error(`✗ land — ${v.reason}`)
  for (const f of v.failing) console.error(`    FAILED  ${f}`)
  for (const p of v.pending) console.error(`    RUNNING ${p}`)
  for (const g of v.rosterGaps) console.error(`    DECIDE  ${g}`)
  console.error(
    v.measured
      ? '    FIX read the failing run (gh run view <id> --log-failed) and land the cure on top — the commit is public.'
      : `    FIX nothing has judged ${v.sha.slice(0, 9)} yet; ask again: pnpm erpax land verdict ${v.sha.slice(0, 9)}`,
  )
  return 1
}

const slugOf = (): string => repoSlugOf(sh('git remote get-url origin'))
const PUSH_ROUNDS = 3

function landMain(): number {
  const branch = sh('git rev-parse --abbrev-ref HEAD').trim()
  if (branch !== 'main') {
    console.error(`✗ land — on ${branch}, not main; land pushes main only`)
    return 1
  }
  for (let round = 1; round <= PUSH_ROUNDS; round++) {
    console.log(`land — round ${round}/${PUSH_ROUNDS}: push main through the hook …`)
    const r = spawnSync('git', ['push', 'origin', 'main'], {
      encoding: 'utf8',
      stdio: ['inherit', 'pipe', 'pipe'],
      maxBuffer: 64 * 1024 * 1024,
    })
    const out = `${r.stdout ?? ''}${r.stderr ?? ''}`
    process.stdout.write(out)
    if (r.status === 0) {
      // "Everything up-to-date" is also a success: the landing is what origin/main now holds, asked of git.
      const head = sh('git rev-parse HEAD').trim()
      const remote = sh('git rev-parse origin/main').trim()
      if (remote !== head) {
        console.log(`· land — origin/main is ${remote.slice(0, 9)} but HEAD is ${head.slice(0, 9)} (the hook committed a heal); pushing again`)
        continue
      }
      console.log(`✓ land — origin/main is ${head.slice(0, 9)}; asking the forge …`)
      return report(judge(slugOf(), head, true))
    }
    const cure = cureFor(out)
    if (!cure) {
      console.error('✗ land — the push was denied with no taught cure; the verdict is above. A human decides here.')
      return 1
    }
    console.log(`· land — taught cure: ${cure.name}`)
    try {
      sh(cure.cmd)
    } catch {
      console.error(`✗ land — the cure itself failed (${cure.name}); a human decides here.`)
      return 1
    }
  }
  console.error(`✗ land — ${PUSH_ROUNDS} rounds without a landing; a human decides here.`)
  return 1
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2)
  if (args.includes('--push')) process.exit(landMain())
  const ref = args.find((a) => !a.startsWith('--')) ?? 'HEAD'
  const sha = sh(`git rev-parse ${JSON.stringify(ref)}`).trim()
  process.exit(report(judge(slugOf(), sha, args.includes('--wait'))))
}
