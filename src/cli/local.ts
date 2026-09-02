import { exactMax } from '@/algebra'
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
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import {
  buildClosureHash,
  lintClosureHash,
  payloadTypesClosureHash,
  planSuites,
  sealSuiteReceipt,
  suiteClosureHash,
  suiteReceiptFresh,
  typecheckClosureHash,
} from '@/gate/receipt'
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
 * `--shard i/n` — the roster split across parallel runners, assigned BY ADDRESS.
 *
 * Receipts answer the steady state: a push that changes three atoms cites the rest and
 * runs in seconds. They cannot help the case where the answer genuinely is not known yet —
 * a first run, a pull request, a change to something everything imports. That case ran the
 * whole roster on ONE runner, serially: measured 56 min and 123 min on main, twice killed
 * at the cap. Recomputing is sometimes unavoidable; recomputing SERIALLY is not.
 *
 * The shard is a function of the suite's PATH, never of its index in the roster. An index
 * shifts every suite after an insertion, which would move suites between shards and strand
 * the receipts each shard has cached; an address does not move when a neighbour appears.
 * Same law as everything else here — the address is the assignment.
 *
 * HONEST BOUNDARY: sharding splits suites that share the live D1, so a suite depending on
 * rows a sibling writes can go red in a shard where that sibling did not run. That is a
 * false RED — the safe direction, and the shard names itself — but it is real, and it is
 * why the serial full roster stays available behind `--all` with no `--shard`.
 */
const shardOf = (args: readonly string[]): { readonly index: number; readonly total: number } | null => {
  const i = args.indexOf('--shard')
  const spec = i >= 0 ? args[i + 1] : undefined
  if (!spec) return null
  const [a, b] = spec.split('/')
  const index = Number.parseInt(a ?? '', 10)
  const total = Number.parseInt(b ?? '', 10)
  if (!Number.isFinite(index) || !Number.isFinite(total) || total < 1 || index < 1 || index > total) return null
  return { index, total }
}

export const shardIndexOf = (suite: string, total: number): number =>
  (Number.parseInt(createHash('sha256').update(suite).digest('hex').slice(0, 8), 16) % total) + 1

/**
 * `erpax test waves` — the vitest roster split by content-addressed receipts (gate/receipt):
 * suites whose closure stands are CITED; only changed suites run, in ≤25-suite batches, each
 * bounded by its own ladder rung; a green batch seals its receipts; a red batch names itself
 * and stops — the failure costs one batch, never the hour. `--all` voids the receipts.
 */
export function runTestWaves(args: readonly string[] = []): number {
  const cwd = process.cwd()
  const shard = shardOf(args)
  const roster = discoverSuites(cwd)
  const all = shard ? roster.filter((f) => shardIndexOf(f, shard.total) === shard.index) : roster
  const force = args.includes('--all')
  const plan = force ? { changed: all, covered: [] as string[] } : planSuites(all, cwd)
  const where = shard ? ` · shard ${shard.index}/${shard.total} of ${roster.length}` : ''
  console.log(`test waves — roster ${all.length}${where} · covered by receipts ${plan.covered.length} · to run ${plan.changed.length}${force ? ' (--all)' : ''}`)
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
      ? { ms: exactMax(timeoutOf(history).ms * 3, 900_000), minutes: exactMax(timeoutOf(history).minutes * 3, 15) }
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
    /*
     * A typecheck is a verdict like any other: same sources, same tsconfig, same lockfile ⇒ same
     * answer. It was the last lane still recomputing from scratch on every push — 202s, and the
     * critical path once the shards and the build learned to cite. Computing the address costs
     * 437ms. `--all` voids it, as everywhere else.
     */
    const address = typecheckClosureHash(w.project, cwd)
    if (!args.includes('--all') && suiteReceiptFresh(label, address, cwd)) {
      console.log(`✓ typecheck wave ${i} — cited at ${address}: these sources already typechecked`)
      continue
    }
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
    sealSuiteReceipt(label, address, cwd)
    console.log(`✓ typecheck wave ${i} — ${w.label}, sealed at ${address}`)
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

/** The build receipt's key in the same store the suites use — one store, one theorem. */
const BUILD_RECEIPT = 'gate:build:next'

/**
 * `erpax test build` — the production build as a CITED verdict.
 *
 * `next build` is the only thing left on this run's critical path: 345 of 420 seconds, while
 * sixteen sharded test lanes finished in two. And in CI it is a GATE, not an artifact — the
 * `.next` output is discarded and the deploy runs its own OpenNext build. A gate's verdict is
 * a function of its inputs, which is the same sentence the suite receipts are built on, so it
 * gets the same treatment and the same store rather than a second mechanism beside the first.
 *
 * Computing the address costs 1.2s against a 345s build.
 *
 * `--all` voids the receipt, exactly as it does for the waves.
 */
export function runBuildGate(args: readonly string[] = []): number {
  const cwd = process.cwd()
  const hash = buildClosureHash(cwd)
  if (!args.includes('--all') && suiteReceiptFresh(BUILD_RECEIPT, hash, cwd)) {
    console.log(`✓ build — cited at ${hash}: this exact content already built green`)
    return 0
  }
  console.log(`build — ${hash} is not sealed; compiling`)
  const started = Date.now()
  const r = spawnSync('pnpm build:next', {
    shell: true,
    stdio: 'inherit',
    cwd,
    env: process.env,
  })
  if ((r.status ?? 1) !== 0) {
    console.error(`✗ build — RED at ${hash}; nothing sealed`)
    return r.status ?? 1
  }
  sealSuiteReceipt(BUILD_RECEIPT, hash, cwd)
  console.log(`✓ build — green in ${Math.round((Date.now() - started) / 1000)}s, sealed at ${hash}`)
  return 0
}

/** The verify-types receipt key — one store for every verdict on this pipeline. */
const TYPES_RECEIPT = 'gate:payload:verify-types'

/**
 * `erpax payload verify-types` — is the COMMITTED payload-types.ts what this config generates?
 *
 * The question is pure: the config's parsed closure on one side, the committed file on the other.
 * Answering it costs 54s because it regenerates the types to compare them; ASKING whether the
 * answer can have changed costs 1s.
 */
export function runVerifyTypes(args: readonly string[] = []): number {
  const cwd = process.cwd()
  const address = payloadTypesClosureHash(cwd)
  if (!args.includes('--all') && suiteReceiptFresh(TYPES_RECEIPT, address, cwd)) {
    console.log(`✓ payload verify-types — cited at ${address}: this config already generates these types`)
    return 0
  }
  const r = spawnSync('bash scripts/payload-verify-types.sh', { shell: true, stdio: 'inherit', cwd, env: process.env })
  if ((r.status ?? 1) !== 0) return r.status ?? 1
  sealSuiteReceipt(TYPES_RECEIPT, address, cwd)
  console.log(`✓ payload verify-types — sealed at ${address}`)
  return 0
}

/** The lint receipt key — one store for every verdict on this pipeline. */
const LINT_RECEIPT = 'gate:eslint:src'

/**
 * `erpax lint src` — the strict, type-aware pass over src, as a CITED verdict.
 *
 * It was the last lane recomputing from scratch: 95s of a 100s run once the shards, the build and
 * the typecheck learned to cite. Same bytes as the typecheck, a different question, so a different
 * address — and the rules, the tsconfigs the type-aware rules resolve through, and the plugin
 * versions all bind, because each of them changes the answer.
 *
 * The 64MB V8 stack stays: type-aware linting recurses deep Payload types, and NODE_OPTIONS
 * forbids --stack-size, so node is invoked directly.
 */
export function runLintSrc(args: readonly string[] = []): number {
  const cwd = process.cwd()
  const address = lintClosureHash(cwd)
  if (!args.includes('--all') && suiteReceiptFresh(LINT_RECEIPT, address, cwd)) {
    console.log(`✓ lint src — cited at ${address}: these sources already linted clean`)
    return 0
  }
  const r = spawnSync(
    'node --stack-size=65536 --max-old-space-size=8000 ./node_modules/eslint/bin/eslint.js ' +
      '"src/**/*.{ts,tsx}" --ignore-pattern "src/migrations/*_*.ts" --max-warnings 0',
    { shell: true, stdio: 'inherit', cwd, env: process.env },
  )
  if ((r.status ?? 1) !== 0) {
    console.error(`✗ lint src — RED at ${address}; nothing sealed`)
    return r.status ?? 1
  }
  sealSuiteReceipt(LINT_RECEIPT, address, cwd)
  console.log(`✓ lint src — clean, sealed at ${address}`)
  return 0
}
