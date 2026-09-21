/** gate/receipt — the push failure addressed at its core: the vitest lane was a ~1-hour, all-or-nothing, unresumable monolith. See SKILL.md. */
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

/** The migration surface, addressed by CONTENT — every file's name ⊗ bytes, folded in order. It was the newest mtime, and a timestamp is not an address. See SKILL.md. */
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

/** The content address of a suite's verdict: suite file + transitive PARSED import closure + schema surface. See SKILL.md. */
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

/** Suites whose verdict is a function of the WHOLE CORPUS, not of their import closure. See SKILL.md. */
export const CORPUS_WIDE_SUITES: ReadonlySet<string> = new Set([
  // ADDED 2026-09-20, after the same defect the set exists for recurred. Six atoms landed over one
  // session; the vocabulary gate (ceiling 0, a THEOREM), the standards catalogue, the host-math ban
  // and the ungated-standards ratchet all went red in CI while every local lane read green. Each of
  // these scans process.cwd() at runtime, so its import closure never moves when an atom is minted
  // — which is exactly the condition under which a receipt CITES a suite instead of running it.
  'src/proof/replaceable/test.ts',
  'src/standards/emit.test.ts',
  'src/law/folder/test.ts',
  'src/vocabulary/test.ts',
  'src/quantum/vocabulary/test.ts',
  'src/algebra/test.ts',
  'src/matrix/test.ts',
  'src/rules/test.ts',
  'src/rules/drift/test.ts',
  'src/rules/unreached/test.ts',
  'src/seo/test.ts',
  'src/publish/complete/test.ts',
  'src/readme/test.ts',
  'src/translations/collect/test.ts',
  'src/agents/mcp/discovery.test.ts',
  'src/schema/test/test.ts',
  'src/schema/test/index.test.ts',
  'src/uuid/matrix/test.ts',
  'src/uuid/matrix/index.test.ts',
  'src/aura/test.ts',
  'src/gate/parity/test.ts',
  // word-incomplete-diamond, every ratchet axis, host-math: a stale receipt hid 1557 > 1556 for two commits.
  'src/law/folder/word.test.ts',
  'src/law/folder/baseline/test.ts',
  'src/algebra/test.ts',
])

/** Closure — plus, for a corpus-wide suite, the fold of everything its scan can see. */
export function suiteClosureHash(suiteFile: string, cwd: string = process.cwd()): string {
  const closure = closureHashOf([join(cwd, suiteFile)], cwd)
  if (!CORPUS_WIDE_SUITES.has(suiteFile.replace(/\\/g, '/'))) return closure
  return sha(`${closure}|corpus:${corpusScanFold(cwd, ['src'], /\.tsx?$/)}`)
}

/** The build's content address — the SAME theorem, pointed at a compile instead of a suite. See SKILL.md. */
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

/** The typecheck's content address, per tsconfig project. See SKILL.md. */
const TS_PROJECTS = ['tsconfig.json', 'tsconfig.typecheck.json', 'tsconfig.uuid.json'] as const
const DEP_SURFACE = ['package.json', 'pnpm-lock.yaml'] as const

/** The shared shape: a verdict over the TypeScript sources, keyed by WHICH verdict it is and bound to the config files that decide the answer. See SKILL.md. */
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

/** `eslint src` — the last lane recomputing from scratch, and 95s of a 100s run once the other three learned to cite. See SKILL.md. */
export function lintClosureHash(cwd: string = process.cwd()): string {
  return sourceVerdictHash('eslint:src', ['eslint.config.mjs', ...TS_PROJECTS, ...DEP_SURFACE], cwd)
}

/** `payload verify-types` asks one question: are the COMMITTED artefacts what this config generates? See SKILL.md. */
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

/** Content address of everything a scan can see under `roots` — XOR-folded, so order-invariant; each digest binds the PATH too, so a move moves the fold. */
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
