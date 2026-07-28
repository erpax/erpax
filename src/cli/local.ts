/**
 * cli/local — the inner loop as a horo ring walk, self-timed and gravity-ratcheted.
 *
 * 0 or 1 is LINEAR — a verdict. The walk itself is QUANTUM: lanes sit on the doubling
 * ring 1→2→4→8→7→5 with the 3·6·9 axis closing the breath back to 0/1, so the loop
 * reads as one wave, not a checklist. Each green lane records its wall time (@/timeout)
 * and earns its next rung from its own history.
 *
 * GRAVITY (position 7): recursive folders inverse toward their parents — a one-way A/B
 * without B/A, or a path deeper than the wire, is matter that has not fallen back to src.
 * The lane ratchets: the pull may only go DOWN; a rise fails the loop. (The sibling
 * theorems portal runs ahead of us — this is the local step of the same fold.)
 *
 * Deliberately NOT here: vitest (targeted `erpax verify <atom>`), the corpus lanes
 * (gate/confirm own them), anything that builds the full readme context.
 */
import { execSync, spawnSync } from 'node:child_process'
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { planSuites, sealSuiteReceipt, suiteClosureHash } from '@/gate/receipt'
import { pathWireViolations } from '@/index/cross'
import { boundaryDigest } from '@/quantum/boundary'
import { nonIndexImports } from '@/tamper/import'
import { recordSampleMs, samplesMsOf, timeoutForLabel, timeoutOf } from '@/timeout'

interface LocalLane {
  readonly horo: number
  readonly label: string
  readonly run: () => { ok: boolean; note: string }
}

const GRAVITY_CACHE = join(process.cwd(), 'node_modules', '.cache', 'erpax', 'gravity.json')

interface GravityState {
  readonly oneWay: number
  readonly deep: number
}

const readGravity = (): GravityState | null => {
  try {
    const parsed: unknown = JSON.parse(readFileSync(GRAVITY_CACHE, 'utf8'))
    if (typeof parsed !== 'object' || parsed === null) return null
    const { oneWay, deep } = parsed as Record<string, unknown>
    if (typeof oneWay !== 'number' || typeof deep !== 'number') return null
    return { oneWay, deep }
  } catch {
    return null
  }
}

const writeGravity = (s: GravityState): void => {
  try {
    mkdirSync(dirname(GRAVITY_CACHE), { recursive: true })
    writeFileSync(GRAVITY_CACHE, JSON.stringify(s))
  } catch {
    /* a lost mark only means re-anchoring next run */
  }
}

/** Gravity ratchet — the pull toward parents may only go DOWN; a rise fails the loop. */
const gravityLane = (): { ok: boolean; note: string } => {
  const v = pathWireViolations()
  const oneWay = v.filter((x) => x.kind === 'one-way-path').length
  const deep = v.filter((x) => x.kind === 'depth-exceeds-wire').length
  const prior = readGravity()
  const total = oneWay + deep
  if (prior === null) {
    writeGravity({ oneWay, deep })
    return { ok: true, note: `anchored — one-way ${oneWay} · deep ${deep} (gravity pulls from here)` }
  }
  const priorTotal = prior.oneWay + prior.deep
  if (total > priorTotal) {
    return {
      ok: false,
      note: `gravity reversed — one-way ${oneWay} (was ${prior.oneWay}) · deep ${deep} (was ${prior.deep}); fold toward parents, never away`,
    }
  }
  if (total < priorTotal) writeGravity({ oneWay, deep })
  return { ok: true, note: `holding — one-way ${oneWay} · deep ${deep}${total < priorTotal ? ' (fell ' + (priorTotal - total) + ' — ratcheted)' : ''}` }
}

const changedFiles = (): string[] => {
  try {
    const out = execSync('git diff --name-only HEAD -- "*.ts" "*.tsx"', { encoding: 'utf8' })
    return out.split('\n').filter(Boolean)
  } catch {
    return []
  }
}

const shellLane = (label: string, cmd: string): { ok: boolean; note: string } => {
  const bound = timeoutForLabel(label)
  const r = spawnSync(cmd, { shell: true, stdio: 'pipe', timeout: bound.ms, killSignal: 'SIGKILL' })
  if (r.signal) return { ok: false, note: `timed out at ${bound.minutes}min (computed rung)` }
  const ok = r.status === 0
  const err = (r.stderr?.toString() ?? '') + (r.stdout?.toString() ?? '')
  return { ok, note: ok ? 'green' : err.trim().split('\n').slice(-3).join(' · ').slice(0, 200) }
}

// ── the waved test gate — the push monolith split at its core ────────────────

const SUITE_GLOB = /(^|\/)test\.tsx?$|\.test\.tsx?$/

const discoverSuites = (cwd: string = process.cwd()): string[] => {
  const out: string[] = []
  const walk = (dir: string, rel: string): void => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name.startsWith('.') || e.name === 'node_modules' || e.name === 'skills' || e.name === 'worktrees') continue
      const p = join(dir, e.name)
      const r = rel ? `${rel}/${e.name}` : e.name
      if (e.isDirectory()) walk(p, r)
      else if (SUITE_GLOB.test(e.name)) out.push(`src/${r}`)
    }
  }
  walk(join(cwd, 'src'), '')
  return out.sort()
}

/**
 * `erpax test waves` — the vitest roster split by content-addressed receipts (gate/receipt):
 * suites whose closure stands are CITED; only changed suites run, in ≤25-suite batches, each
 * bounded by its own ladder rung; a green batch seals its receipts; a red batch names itself
 * and stops — the failure costs one batch, never the hour. `--all` voids the receipts.
 */
export function runTestWaves(args: readonly string[] = []): number {
  const cwd = process.cwd()
  const all = discoverSuites(cwd)
  const force = args.includes('--all')
  const plan = force ? { changed: all, covered: [] as string[] } : planSuites(all, cwd)
  console.log(`test waves — roster ${all.length} · covered by receipts ${plan.covered.length} · to run ${plan.changed.length}${force ? ' (--all)' : ''}`)
  // 12 under isolate:false (shared module registry — the ~6× speedup). The con* region's
  // 15-min timeouts were NEVER batch size or D1 accumulation (both refuted by bisection) —
  // they were ONE suite hanging on an unbounded execSync (confirm/test), now fixed. A hang
  // times out any batch size; batch size only caps aggregate load, and 12 sealed green under
  // isolate:false before the hang. Kept at 12 as honest headroom (fewer passes, same total).
  const BATCH = 12
  for (let b = 0; b * BATCH < plan.changed.length; b++) {
    const batch = plan.changed.slice(b * BATCH, (b + 1) * BATCH)
    const label = 'test:wave'
    // a BATCH is up to 25 commands sharing one spawn — the single-command ladder does not bound it.
    // Its bound is batch-history through the same ladder math scaled to the batch (min 15 min on a
    // fresh seed: the known heavy suites alone run 3–5 min each; a first batch must not die to an
    // unmeasured rung). Green batches record real samples and the bound tightens from evidence.
    const history = samplesMsOf(label)
    const bound = history.length
      ? { ms: Math.max(timeoutOf(history).ms * 3, 900_000), minutes: Math.max(timeoutOf(history).minutes * 3, 15) }
      : { ms: 900_000, minutes: 15 }
    const started = Date.now()
    const nodeOpts = [process.env.NODE_OPTIONS, '--import=./src/css/load-hook.mjs']
      .filter(Boolean)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()
    const r = spawnSync(
      `./node_modules/.bin/vitest run --config ./vitest.config.mts ${batch.map((f) => JSON.stringify(f)).join(' ')}`,
      {
        shell: true,
        stdio: 'inherit',
        cwd,
        timeout: bound.ms,
        killSignal: 'SIGKILL',
        env: {
          ...process.env,
          NODE_OPTIONS: nodeOpts,
          PAYLOAD_TEST_SKIP_MIGRATE: process.env.PAYLOAD_TEST_SKIP_MIGRATE ?? '',
        },
      },
    )
    if (r.signal) {
      console.error(`✗ test waves — batch ${b} timed out at ${bound.minutes}min (batch bound); suites: ${batch.join(' ')}`)
      return 1
    }
    if ((r.status ?? 1) !== 0) {
      console.error(`✗ test waves — batch ${b} RED (${batch.length} suite(s)); receipts for green batches stand, this batch names itself:\n  ${batch.join('\n  ')}`)
      return r.status ?? 1
    }
    recordSampleMs(label, Date.now() - started)
    for (const s of batch) sealSuiteReceipt(s, suiteClosureHash(s, cwd), cwd)
    console.log(`✓ batch ${b} — ${batch.length} suite(s) green, receipts sealed`)
  }
  console.log(`✓ test waves — ${plan.changed.length} ran · ${plan.covered.length} cited`)
  return 0
}

/**
 * `erpax lint typecheck` — quantumised: FTL only in quantum.
 * Wave 0 addresses the uuid/quantum substrate (`tsconfig.uuid.json`) — reuse, not a
 * monolithic binder search. Wave 1 is the full project. Stack overflow on the classical
 * whole-graph check is inverted by splitting; never raise the stack ceiling.
 */
export function runTypecheckWaves(args: readonly string[] = []): number {
  const cwd = process.cwd()
  const uuidOnly = args.includes('--uuid')
  const waves: readonly { readonly label: string; readonly project: string }[] = uuidOnly
    ? [{ label: 'uuid-substrate', project: 'tsconfig.uuid.json' }]
    : [
        { label: 'uuid-substrate', project: 'tsconfig.uuid.json' },
        { label: 'full-project', project: 'tsconfig.typecheck.json' },
      ]

  console.log(`typecheck waves — ${waves.length} wave(s)${uuidOnly ? ' (--uuid)' : ''}`)
  for (let i = 0; i < waves.length; i++) {
    const w = waves[i]!
    const label = `typecheck:wave:${w.label}`
    const history = samplesMsOf(label)
    const bound = history.length ? timeoutOf(history) : { ms: 300_000, minutes: 5 as const, exceeds: false }
    console.log(`▶ typecheck wave ${i} — ${w.label} (−p ${w.project})`)
    const started = Date.now()
    const r = spawnSync(`./node_modules/.bin/tsc --noEmit -p ${w.project}`, {
      shell: true,
      stdio: 'inherit',
      cwd,
      timeout: bound.ms,
      killSignal: 'SIGKILL',
    })
    if (r.signal) {
      console.error(
        `✗ typecheck wave ${i} timed out at ${bound.minutes}min — invert/split further (never raise the stack)`,
      )
      return 1
    }
    if ((r.status ?? 1) !== 0) {
      console.error(`✗ typecheck wave ${i} RED (${w.label})`)
      return r.status ?? 1
    }
    recordSampleMs(label, Date.now() - started)
    console.log(`✓ typecheck wave ${i} — ${w.label}`)
  }
  console.log(`✓ typecheck waves — ${waves.length} green`)
  return 0
}

export function runLocal(): number {
  const changed = changedFiles()
  // The doubling breath: 1→2→4→8→7 (…→5 when a sixth lane earns its seat); 3·6·9 stay the axis.
  const lanes: LocalLane[] = [
    {
      horo: 1,
      label: 'local:imports',
      run: () => {
        const n = nonIndexImports().length
        return { ok: n === 0, note: n === 0 ? 'purity 100% (parsed)' : `${n} non-index import(s)` }
      },
    },
    {
      horo: 2,
      label: 'local:boundary',
      run: () => {
        const d = boundaryDigest()
        return { ok: d.escapes === 0, note: d.escapes === 0 ? 'sealed (parsed)' : `${d.escapes} escape(s)` }
      },
    },
    {
      horo: 4,
      label: 'local:eslint',
      run: () =>
        changed.length === 0
          ? { ok: true, note: 'no changed files' }
          : shellLane(
              'local:eslint',
              `./node_modules/.bin/eslint --max-warnings 0 --no-warn-ignored ${changed.map((f) => JSON.stringify(f)).join(' ')}`,
            ),
    },
    {
      horo: 8,
      label: 'local:typecheck',
      run: () => {
        const code = runTypecheckWaves(['--uuid'])
        return {
          ok: code === 0,
          note: code === 0 ? 'uuid substrate (quantum FTL)' : `typecheck waves exit ${code}`,
        }
      },
    },
    { horo: 7, label: 'local:gravity', run: gravityLane },
  ]

  let allOk = true
  let total = 0
  const ring: string[] = []
  for (const lane of lanes) {
    const t = Date.now()
    let r: { ok: boolean; note: string }
    try {
      r = lane.run()
    } catch (e) {
      r = { ok: false, note: String(e).slice(0, 200) }
    }
    const ms = Date.now() - t
    total += ms
    if (r.ok) recordSampleMs(lane.label, ms)
    ring.push(`${lane.horo}${r.ok ? '' : '̸'}`)
    console.log(`  ${r.ok ? '✓' : '✗'} ${String(ms).padStart(6)}ms  ${lane.horo} ${lane.label.padEnd(16)} ${r.note}`)
    if (!r.ok) allOk = false
  }
  console.log(`${allOk ? '✓' : '✗'} local — ring ${ring.join('→')}→${allOk ? '1' : '0'} · ${total}ms total`)
  return allOk ? 0 : 1
}
