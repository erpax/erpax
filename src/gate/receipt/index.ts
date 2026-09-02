/**
 * gate/receipt — the push failure addressed at its core: the vitest lane was a ~1-hour,
 * all-or-nothing, unresumable monolith. A single red — or one killed worker — voided the
 * hour and the push. That is a command past every rung, and the ladder says SPLIT.
 *
 * The split is the corpus's own theorem: SAME CONTENT ⇒ SAME VERDICT. A suite's verdict is
 * a function of its INPUTS — the suite file plus its transitive import closure (edges PARSED
 * by [[rules]]/cycle, never matched) plus the schema surface (payload config + migrations).
 * A green verdict seals a RECEIPT addressed by the closure hash; while the hash stands, the
 * verdict stands, and only CHANGED suites re-run. A push failure now costs one batch, named,
 * not the hour.
 *
 * HONEST BOUNDARY — where the theorem stops: the closure covers code and schema, not DATA.
 * Integration suites share the live D1; a suite whose verdict depends on rows another suite
 * wrote can drift green under an unchanged hash. The receipt layer is therefore the LOCAL
 * incremental gate; a clean-environment full run (CI) remains the final arbiter, and
 * `--all` forces the full roster any time doubt outweighs the hour.
 */
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, type Dirent } from 'node:fs'
import { dirname, join, relative } from 'node:path'
import { importsOf } from '@/rules/cycle'

const RECEIPTS = 'node_modules/.cache/erpax/test-receipts.json'

/** The schema surface every payload-integration suite implicitly depends on. */
const SCHEMA_INPUTS = ['payload.config.ts']

/** Generated DATA derivations — address by path, never by content (a regen/reseal must not invalidate a verdict). */
const GENERATED_CLOSURE = /(\.generated\.[jt]sx?$|(^|\/)(translations|catalogue|skills\.index)\.[jt]sx?$)/i

const sha = (s: string): string => createHash('sha256').update(s).digest('hex').slice(0, 16)

const fileBytes = (p: string): string => {
  try {
    return readFileSync(p, 'utf8')
  } catch {
    return ''
  }
}

/**
 * The migration surface, addressed by CONTENT — every file's name ⊗ bytes, folded in order.
 *
 * It was the newest mtime, and a timestamp is not an address. On this machine that is
 * harmless; on a fresh checkout every file's mtime is the moment git wrote it, so the stamp
 * differs on every run and EVERY receipt is invalidated. The receipts were not wrong in CI —
 * they were unreachable, and this is one of the two reasons why (the other being a store that
 * lived in a directory the runner destroys).
 *
 * Same schema ⇒ same stamp, on any machine, in any checkout order.
 */
const migrationsStamp = (cwd: string): string => {
  try {
    const dir = join(cwd, 'src', 'migrations')
    const h = createHash('sha256')
    for (const f of readdirSync(dir).sort()) h.update(f).update('\u0000').update(fileBytes(join(dir, f)))
    return h.digest('hex').slice(0, 16)
  } catch {
    return 'none'
  }
}

/**
 * The content address of a suite's verdict: suite file + transitive PARSED import closure +
 * schema surface. Bounded traversal; a file outside the repo contributes nothing.
 */
export function closureHashOf(entryFiles: readonly string[], cwd: string = process.cwd()): string {
  const seen = new Set<string>()
  const stack = [...entryFiles]
  const parts: string[] = [migrationsStamp(cwd)]
  for (const s of SCHEMA_INPUTS) parts.push(sha(fileBytes(join(cwd, s))))
  while (stack.length) {
    const f = stack.pop()!
    if (seen.has(f)) continue
    seen.add(f)
    const rel = relative(cwd, f)
    // A verdict depends on logic + schema, NOT on generated DATA (the honest boundary above).
    // The per-atom translation projection, the catalogue aggregate, the ratchet baseline emit, and any
    // `*.generated.*` are derivations that regenerate with the corpus — hashing their CONTENT makes a data
    // regen or a deliberate baseline reseal invalidate every logic suite that merely transits them, so the
    // whole corpus re-runs for a change that cannot alter a verdict. Address them by PATH only (stable) and
    // do not recurse; the suite that genuinely reads the data still re-runs when ITS OWN code moves.
    if (GENERATED_CLOSURE.test(rel)) { parts.push('gen:' + rel); continue }
    const text = fileBytes(f)
    if (!text) continue
    parts.push(sha(rel + ' ' + text))
    for (const dep of importsOf(f, cwd)) if (!seen.has(dep)) stack.push(dep)
  }
  return sha(parts.sort().join('|'))
}

export function suiteClosureHash(suiteFile: string, cwd: string = process.cwd()): string {
  return closureHashOf([join(cwd, suiteFile)], cwd)
}

/**
 * The build's content address — the SAME theorem, pointed at a compile instead of a suite.
 *
 * `next build` in CI is a GATE, not an artifact: its `.next` is thrown away, and the deploy
 * (cloudflare.yml) runs its own OpenNext build. A gate's verdict is a function of its inputs,
 * so once a green build is sealed against an address, the same address is a lookup — and this
 * one build was 345 of the run's 420 seconds, the whole critical path.
 *
 * The entries are what a Next build actually starts from: the Payload config, every route
 * module under `src/app`, and the root config it reads whatever the route graph looks like.
 * The transitive closure comes from the same parsed walk the suite receipts use.
 *
 * HONEST BOUNDARY — this is where a false GREEN could live, so the input set errs wide:
 *   · CSS is folded WHOLESALE (`src/**\/*.css`). A stylesheet enters through
 *     `import './x.css'`, and the resolver answers in TS extensions, so a broken stylesheet
 *     would otherwise be invisible to the address and the gate would cite a build that fails.
 *   · `public/**` is NOT folded, and that is a claim: those files are served, never compiled,
 *     so no byte of them can change whether the app builds.
 *   · A module reached only by a computed specifier is invisible to a lexical walk — the same
 *     boundary `suiteClosureHash` carries, and the reason the deploy still builds for real.
 */
const BUILD_ROOT_INPUTS = [
  'next.config.ts',
  'package.json',
  'pnpm-lock.yaml',
  'tsconfig.json',
  'src/payload.config.ts',
] as const

const filesUnder = (cwd: string, rel: string, match: RegExp): string[] => {
  const out: string[] = []
  const walk = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name === 'node_modules' || e.name.startsWith('.')) continue
      const p = join(dir, e.name)
      if (e.isDirectory()) walk(p)
      else if (match.test(e.name)) out.push(p)
    }
  }
  walk(join(cwd, rel))
  return out
}

export function buildClosureHash(cwd: string = process.cwd()): string {
  const entries = [
    ...BUILD_ROOT_INPUTS.map((r) => join(cwd, r)).filter((p) => existsSync(p)),
    ...filesUnder(cwd, join('src', 'app'), /\.tsx?$/),
    ...filesUnder(cwd, 'src', /\.css$/),
  ]
  return closureHashOf(entries, cwd)
}

/**
 * The typecheck's content address, per tsconfig project.
 *
 * `tsc -p x` is the third verdict on this pipeline that is a pure function of its inputs, and the
 * last one still recomputed from scratch on every push: 202s, the critical path once the shards
 * and the build learned to cite.
 *
 * The inputs are the TypeScript SOURCE under src (never the prose beside it — a SKILL.md edit
 * cannot change a type), every tsconfig (they extend one another, so all three bind), and the
 * dependency surface, addressed by the lockfile because that is what decides which `.d.ts` files
 * `node_modules` holds.
 *
 * HONEST BOUNDARY: the lockfile stands in for thousands of dependency type files. A `node_modules`
 * mutated without the lockfile moving — a patch applied by hand, a linked package — is invisible
 * to this address. That is the same trade `pnpm install --frozen-lockfile` already makes, and CI
 * installs from the lockfile every run.
 */
const TS_PROJECTS = ['tsconfig.json', 'tsconfig.typecheck.json', 'tsconfig.uuid.json'] as const
const DEP_SURFACE = ['package.json', 'pnpm-lock.yaml'] as const

/**
 * The shared shape: a verdict over the TypeScript sources, keyed by WHICH verdict it is and bound
 * to the config files that decide the answer.
 *
 * `tsc -p x` and `eslint src` ask different questions of the same bytes, so the key is part of the
 * address — two projects, or a typecheck and a lint, are never one receipt.
 */
const sourceVerdictHash = (key: string, binds: readonly string[], cwd: string): string =>
  sha(
    [
      'verdict:' + key,
      'src:' + corpusScanFold(cwd, ['src'], /\.tsx?$/),
      ...binds.map((f) => sha(f + ' ' + fileBytes(join(cwd, f)))),
    ].join('|'),
  )

export function typecheckClosureHash(project: string, cwd: string = process.cwd()): string {
  return sourceVerdictHash('tsc:' + project, [...TS_PROJECTS, ...DEP_SURFACE], cwd)
}

/**
 * `eslint src` — the last lane recomputing from scratch, and 95s of a 100s run once the other
 * three learned to cite.
 *
 * The type-aware pass reads the same sources `tsc` does, so the fold is the same; what changes the
 * answer beyond them is the RULES (`eslint.config.mjs`), the tsconfigs the type-aware rules resolve
 * through, and the plugin versions — addressed by the lockfile, as everywhere else here.
 *
 * HONEST BOUNDARY: only the `src` pass is addressed. The whole-repo pass runs in ~4s and covers a
 * scattered set (scripts, stubs, root config) that no single fold describes honestly — cheaper to
 * run than to characterise, and a lane that always runs cannot cite a stale answer.
 */
export function lintClosureHash(cwd: string = process.cwd()): string {
  return sourceVerdictHash('eslint:src', ['eslint.config.mjs', ...TS_PROJECTS, ...DEP_SURFACE], cwd)
}

/**
 * `payload verify-types` asks one question: are the COMMITTED artefacts what this config
 * generates? Both halves are content — the config's parsed closure, and the files it is compared
 * against — so the answer is addressable like any other.
 *
 * BOTH artefacts bind. The script checks `payload-types.ts` AND the admin `importMap.js`, and an
 * address covering only the first would cite green over a stale importmap — the exact false green
 * a citation must never produce. What the check compares is what the address folds.
 */
const PAYLOAD_ARTEFACTS = [
  ['src', 'payload-types.ts'],
  ['src', 'app', '(payload)', 'admin', 'importMap.js'],
] as const

export function payloadTypesClosureHash(cwd: string = process.cwd()): string {
  return sha(
    [
      closureHashOf([join(cwd, 'src', 'payload.config.ts')], cwd),
      ...PAYLOAD_ARTEFACTS.map((p) => sha(p.join('/') + ' ' + fileBytes(join(cwd, ...p)))),
    ].join('|'),
  )
}

type ReceiptStore = Record<string, string>

const readReceipts = (cwd: string): ReceiptStore => {
  try {
    const parsed: unknown = JSON.parse(readFileSync(join(cwd, RECEIPTS), 'utf8'))
    return typeof parsed === 'object' && parsed !== null ? (parsed as ReceiptStore) : {}
  } catch {
    return {}
  }
}

/** Seal a GREEN verdict — the receipt stands while the closure hash stands. */
export function sealSuiteReceipt(suiteFile: string, hash: string, cwd: string = process.cwd()): void {
  try {
    const store = readReceipts(cwd)
    store[suiteFile] = hash
    mkdirSync(dirname(join(cwd, RECEIPTS)), { recursive: true })
    writeFileSync(join(cwd, RECEIPTS), JSON.stringify(store))
  } catch {
    /* a lost receipt only means the suite re-runs */
  }
}

/** Does a standing green receipt cover this suite's CURRENT closure? */
export function suiteReceiptFresh(suiteFile: string, hash: string, cwd: string = process.cwd()): boolean {
  return readReceipts(cwd)[suiteFile] === hash
}

export interface SuitePlan {
  readonly changed: readonly string[]
  readonly covered: readonly string[]
}

/** Split the roster: suites whose closure moved re-run; standing receipts are cited, not re-derived. */
export function planSuites(suiteFiles: readonly string[], cwd: string = process.cwd()): SuitePlan {
  const changed: string[] = []
  const covered: string[] = []
  for (const s of suiteFiles) {
    ;(suiteReceiptFresh(s, suiteClosureHash(s, cwd), cwd) ? covered : changed).push(s)
  }
  return { changed, covered }
}

/* The SCAN lane — the same theorem pointed at the corpus instead of a suite.
 * Scan 45,950ms · fold 954ms (20,933 files · 67.9 MiB), measured on this tree.
 * Replaces a 60s wall-clock TTL, which served stale for a minute and threw a valid
 * verdict away at 61s. See SKILL.md — why a clock is the wrong key. */

const SCAN_RECEIPTS = 'node_modules/.cache/erpax/scan-receipts.json'

/** A tightened axis reads prose as readily as code. */
const SCANNED = /\.(ts|tsx|md|json|mjs)$/

/** Content address of everything a scan can see under `roots` — XOR-folded, so
 *  order-invariant; each digest binds the PATH too, so a move moves the fold. */
export function corpusScanFold(
  cwd: string = process.cwd(),
  roots: readonly string[] = ['src'],
  match: RegExp = SCANNED,
): string {
  const fold = Buffer.alloc(32)
  const walk = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name === 'node_modules' || e.name.startsWith('.')) continue
      const p = join(dir, e.name)
      if (e.isDirectory()) {
        walk(p)
        continue
      }
      if (!match.test(e.name)) continue
      let bytes: Buffer
      try {
        bytes = readFileSync(p)
      } catch {
        continue
      }
      const d = createHash('sha256').update(relative(cwd, p)).update(' ').update(bytes).digest()
      for (let i = 0; i < 32; i++) fold[i] ^= d[i]
    }
  }
  for (const r of roots) walk(join(cwd, r))
  return createHash('sha256').update(fold).digest('hex').slice(0, 16)
}

interface ScanReceipt {
  readonly fold: string
  readonly value: unknown
}

const readScanReceipts = (cwd: string): Record<string, ScanReceipt> => {
  try {
    const parsed: unknown = JSON.parse(readFileSync(join(cwd, SCAN_RECEIPTS), 'utf8'))
    return typeof parsed === 'object' && parsed !== null
      ? (parsed as Record<string, ScanReceipt>)
      : {}
  } catch {
    return {}
  }
}

/** A standing receipt for `key` at this exact fold, or null — never a stale answer. */
export function sealedScan<T>(key: string, fold: string, cwd: string = process.cwd()): T | null {
  const r = readScanReceipts(cwd)[key]
  return r && r.fold === fold ? (r.value as T) : null
}

/** Seal a scan verdict against the fold it was computed from. */
export function sealScan(key: string, fold: string, value: unknown, cwd: string = process.cwd()): void {
  try {
    const store = readScanReceipts(cwd)
    store[key] = { fold, value }
    mkdirSync(dirname(join(cwd, SCAN_RECEIPTS)), { recursive: true })
    writeFileSync(join(cwd, SCAN_RECEIPTS), JSON.stringify(store))
  } catch {
    /* a lost receipt only means the scan re-runs */
  }
}

/** @index-cross.foldback child=gate/receipt parent=gate — this cross folds back into its parent. */
