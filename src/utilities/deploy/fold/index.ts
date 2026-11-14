import { existsSync, readFileSync, statSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { join } from 'node:path'

/**
 * deploy/fold — the production module swaps, and the proof that each one still bites.
 *
 * The shipped Worker must carry the ERP core, never the dev/meta corpus. next.config
 * swaps each heavy leaf for a stub in production via NormalModuleReplacementPlugin —
 * a REGEX over a module path. A regex over a path is a claim about the tree, and the
 * tree moves: `matrix.generated.ts` became `matrix/generated.ts` in the 49-rename
 * scalpel pass (d828b72d3) and the pattern kept naming the old path. Nothing failed.
 * The fold simply stopped folding, and 4 MiB of corpus matrix shipped until Cloudflare
 * refused the upload — a default-ALLOW by omission, the [[rules]]/unraised shape.
 *
 * So the patterns live HERE, beside the matter they must match, and `staleFolds`
 * re-derives that claim from the filesystem on every test run. The claim is not the
 * fact: `assertNoFoldLeaks` reads the packed bundle for each fold's own content.
 */

export interface Fold {
  /** The matter this fold keeps out of the shipped bundle, repo-relative. */
  readonly target: string
  /** The empty face swapped in, repo-relative. */
  readonly stub: string
  /** What next.config hands NormalModuleReplacementPlugin. */
  readonly pattern: RegExp
  /** `both` = server and client; `client` = browser bundle only (server legitimately runs it). */
  readonly side: 'both' | 'client'
  /** Why this leaf is dead weight on a request path. */
  readonly why: string
}

/**
 * Every production module swap. Server-side folds cut the Worker; client-side folds
 * cut the admin browser bundle (a `createRequire`/`node:fs` leaf that can never run there).
 */
export const PRODUCTION_FOLDS: readonly Fold[] = [
  {
    target: 'src/uuid/matrix/generated.ts',
    stub: '.stubs/matrix.generated.js',
    pattern: /uuid[\\/]matrix[\\/]generated(\.ts)?$/,
    side: 'both',
    why: '~4 MiB content-addressed corpus matrix — a dev/meta index, read on no ERP request path',
  },
  {
    target: 'src/translations/catalogue.ts',
    stub: '.stubs/translations-catalogue.js',
    pattern: /[\\/]translations[\\/]catalogue(\.ts)?$/,
    side: 'both',
    why: '~4.7 MiB of folded per-atom prose — TRANSLATIONS_CATALOGUE has no runtime value consumer',
  },
  {
    target: 'src/agents/mcp/tool-defs.ts',
    stub: '.stubs/tool-defs.js',
    pattern: /agents[\\/]mcp[\\/]tool-defs(\.ts)?$/,
    side: 'both',
    why: 'the corpus MCP tool surface is a dev/agent facet — prod agents use the /api/mcp gateway',
  },
  {
    target: 'src/agents/mcp/atom-catalogue.generated.ts',
    stub: '.stubs/atom-catalogue.js',
    pattern: /agents[\\/]mcp[\\/]atom-catalogue\.generated(\.ts)?$/,
    side: 'both',
    why: 'the per-atom corpus skill index — dev/meta',
  },
  {
    target: 'src/seal/index.ts',
    stub: '.stubs/seal-client.js',
    pattern: /[\\/]src[\\/]seal[\\/]index(\.ts)?$/,
    side: 'client',
    why: 'seal uses createRequire(node:module) — it can never execute in a browser',
  },
  {
    target: 'src/diamond/index.ts',
    stub: '.stubs/diamond-client.js',
    pattern: /[\\/]src[\\/]diamond[\\/]index(\.ts)?$/,
    side: 'client',
    why: 'diamond derives over node:fs — the browser admin reads the precomputed address',
  },
  {
    target: 'src/css/index.ts',
    stub: '.stubs/css-index-client.js',
    pattern: /[\\/]src[\\/]css[\\/]index(\.ts)?$/,
    side: 'client',
    why: 'the @/css barrel exports computeCssDiamond (node:fs + diamond)',
  },
  {
    target: 'src/skill/router/skills.index.ts',
    stub: '.stubs/skills-index.js',
    pattern: /[\\/]src[\\/]skill[\\/]router[\\/]skills\.index(\.ts)?$/,
    side: 'client',
    why: '≈77 MiB skill barrel — agents realise skills lazily from disk, never through it',
  },
]

export interface FoldViolation {
  readonly target: string
  readonly reason: 'target-missing' | 'pattern-misses-target' | 'stub-missing'
  readonly detail: string
}

/** Absolute path a bundler would hand the pattern, in this platform's separators. */
const resourceOf = (cwd: string, repoRelative: string): string => join(cwd, repoRelative)

/**
 * Every fold whose claim no longer holds against the tree.
 *
 * A fold bites only when its pattern matches a module that EXISTS. Both halves are
 * checked: a moved target (the rename that caused this atom) and a pattern edited out
 * of alignment with a target that is still there.
 */
export function staleFolds(
  cwd: string = process.cwd(),
  folds: readonly Fold[] = PRODUCTION_FOLDS,
): FoldViolation[] {
  const out: FoldViolation[] = []
  for (const fold of folds) {
    const resource = resourceOf(cwd, fold.target)
    if (!existsSync(resource)) {
      out.push({ target: fold.target, reason: 'target-missing', detail: `${fold.target} does not exist — the fold swaps nothing` })
      continue
    }
    if (!fold.pattern.test(resource)) {
      out.push({ target: fold.target, reason: 'pattern-misses-target', detail: `${String(fold.pattern)} does not match ${fold.target}` })
    }
    if (!existsSync(resourceOf(cwd, fold.stub))) {
      out.push({ target: fold.target, reason: 'stub-missing', detail: `${fold.stub} does not exist — the swap resolves nowhere` })
    }
  }
  return out
}

/** Bytes each fold keeps out of the bundle, largest first — the cost of one going stale. */
export function foldWeight(cwd: string = process.cwd()): { target: string; bytes: number; gzip: number }[] {
  return PRODUCTION_FOLDS.map((f) => {
    const p = resourceOf(cwd, f.target)
    if (!existsSync(p)) return { target: f.target, bytes: 0, gzip: 0 }
    const buf = readFileSync(p)
    return { target: f.target, bytes: buf.byteLength, gzip: gzipSync(buf).byteLength }
  }).sort((a, b) => b.gzip - a.gzip)
}

/** Fails closed: a fold that no longer matches its matter is a fold that is not folding. */
export function assertFoldsHold(cwd: string = process.cwd()): void {
  const stale = staleFolds(cwd)
  if (stale.length === 0) return
  const lines = stale.map((v) => `  ${v.reason}: ${v.detail}`).join('\n')
  throw new Error(`deploy/fold — ${stale.length} production fold(s) no longer fold:\n${lines}`)
}

/**
 * Cloudflare's paid Workers ceiling for a COMPRESSED script upload.
 * @see https://developers.cloudflare.com/workers/platform/limits/#worker-size
 */
export const WORKER_LIMIT_BYTES = 10 * 1024 * 1024

/** Where `wrangler deploy --dry-run --outdir` puts the exact bundle it would upload; its parent is the OpenNext build. */
export const PACKED_WORKER_DIR = '.open-next/packed'

export interface WorkerBudget {
  /** An OpenNext build is on disk — from then on the pack is required, never optional. */
  readonly built: boolean
  readonly packed: boolean
  /** The pack is older than the build beside it: it weighs a Worker that will not ship. */
  readonly stale: boolean
  readonly bytes: number
  readonly gzip: number
  readonly limit: number
  readonly fits: boolean
  /** Compressed bytes left before Cloudflare refuses the upload; negative when over. */
  readonly headroom: number
  readonly share: number
}

/**
 * The artifact Cloudflare would receive, weighed.
 *
 * wrangler packs every module into ONE `worker.js` and gzips that file — so this reads
 * that same file and gzips it, rather than summing the parts. Measured against a real
 * dry-run: wrangler reported `9021.85 KiB` gz and this reads 9021.86 KiB, a 12-byte
 * difference in gzip settings. The sourcemap beside it is not uploaded and is not counted.
 */
export function workerBudget(cwd: string = process.cwd(), dir: string = PACKED_WORKER_DIR): WorkerBudget {
  const build = join(cwd, dir, '..')
  const built = existsSync(build)
  const packed = join(cwd, dir, 'worker.js')
  if (!existsSync(packed)) {
    return { built, packed: false, stale: false, bytes: 0, gzip: 0, limit: WORKER_LIMIT_BYTES, fits: true, headroom: WORKER_LIMIT_BYTES, share: 0 }
  }
  const entry = join(build, 'worker.js')
  const stale = existsSync(entry) && statSync(packed).mtimeMs < statSync(entry).mtimeMs
  const buf = readFileSync(packed)
  const gzip = gzipSync(buf).byteLength
  return {
    built,
    packed: true,
    stale,
    bytes: buf.byteLength,
    gzip,
    limit: WORKER_LIMIT_BYTES,
    fits: gzip <= WORKER_LIMIT_BYTES,
    headroom: WORKER_LIMIT_BYTES - gzip,
    share: gzip / WORKER_LIMIT_BYTES,
  }
}

/**
 * Fails closed on a packed Worker Cloudflare would refuse — and on a build nobody weighed.
 * It skips only when there is no OpenNext build at all: a build with no pack, or with a pack
 * older than itself, is refused, because nothing weighed is not a Worker that fits.
 * Approaching the ceiling is a WARNING, never a failure: the ceiling is Cloudflare's.
 */
export function assertWorkerFitsBudget(cwd: string = process.cwd(), dir: string = PACKED_WORKER_DIR): void {
  const b = workerBudget(cwd, dir)
  const pack = `wrangler deploy --dry-run --outdir ${dir}`
  if (!b.packed) {
    if (!b.built) return
    throw new Error(`deploy/fold — an OpenNext build is on disk and nothing is packed, so nothing was weighed.\n  pack it: ${pack}`)
  }
  if (b.stale) {
    throw new Error(`deploy/fold — the pack in ${dir} is older than the build beside it; it weighs a Worker that will not ship.\n  re-pack: ${pack}`)
  }
  const kib = (n: number) => `${(n / 1024).toFixed(1)} KiB`
  if (!b.fits) {
    throw new Error(
      `deploy/fold — Worker is ${kib(b.gzip)} gz, over the ${kib(b.limit)} ceiling by ${kib(-b.headroom)}.\n` +
        `  weigh what the folds keep out: pnpm erpax deploy fold`,
    )
  }
}

/** A quoted literal of 24–160 characters; shorter ones are shared vocabulary, longer ones rare. */
const LITERAL = /'((?:[^'\\\n]|\\.){24,160})'|"((?:[^"\\\n]|\\.){24,160})"|`((?:[^`\\$]|\\.){24,160})`/g
/** An atom path is the corpus's shared vocabulary: any sorted path list puts the same two side by side. */
const PATH = /^[\w.@-]+(?:\/[\w.@-]+)+$/
/** Two literals this close in the source form a pair; the bundle must hold both within PAIR_WINDOW. */
const PAIR_GAP = 240
const PAIR_WINDOW = 480
const PAIR_SAMPLE = 64
/** Fewer pairs than this cannot say whether a target shipped. */
const PAIR_MIN = 8
/** Share of a fold's pairs found in order at which its content is in the bundle — measured 0 folded, ≥ 0.92 leaked. */
const LEAK_SHARE = 0.5

type LiteralPair = readonly [string, string]

/**
 * Consecutive literals of a fold's target that its stub does not carry, sampled evenly. Pairs, never
 * lone strings: a lone description legitimately recurs in the Worker through other modules, while two
 * in their source order a few hundred bytes apart are the target's own text. See ./SKILL.md.
 */
const fingerprintOf = (cwd: string, fold: Fold): LiteralPair[] => {
  const target = resourceOf(cwd, fold.target)
  const stubPath = resourceOf(cwd, fold.stub)
  if (!existsSync(target)) return []
  const stub = existsSync(stubPath) ? readFileSync(stubPath, 'utf8') : ''
  const literals = [...readFileSync(target, 'utf8').matchAll(LITERAL)]
    .map((m) => ({ text: m[1] ?? m[2] ?? m[3] ?? '', at: m.index ?? 0, end: (m.index ?? 0) + m[0].length }))
    .filter((l) => !l.text.includes('\\') && !PATH.test(l.text) && !stub.includes(l.text))
  const pairs: LiteralPair[] = []
  for (let i = 1; i < literals.length; i++) {
    const a = literals[i - 1]!
    const b = literals[i]!
    if (b.at - a.end <= PAIR_GAP && a.text !== b.text) pairs.push([a.text, b.text])
  }
  if (pairs.length <= PAIR_SAMPLE) return pairs
  return Array.from({ length: PAIR_SAMPLE }, (_, i) => pairs[((i * pairs.length) / PAIR_SAMPLE) | 0]!)
}

/** A literal as a bundle may spell it: raw, or with non-ASCII as `\uXXXX` — esbuild's default when wrangler packs. */
const spellings = (s: string): string[] => {
  const escaped = (upper: boolean): string =>
    s.replace(/[^\x00-\x7f]/g, (c) => {
      const hex = c.charCodeAt(0).toString(16).padStart(4, '0')
      return `\\u${upper ? hex.toUpperCase() : hex}`
    })
  return [...new Set([s, escaped(true), escaped(false)])]
}

/** `b` follows some occurrence of `a` within the window, in any spelling the bundle uses. */
const inOrder = (bundle: string, [a, b]: LiteralPair): boolean => {
  const later = spellings(b)
  return spellings(a).some((sa) =>
    later.some((sb) => {
      for (let i = bundle.indexOf(sa); i >= 0; i = bundle.indexOf(sa, i + 1)) {
        const j = bundle.indexOf(sb, i + sa.length)
        if (j < 0) return false
        if (j - i <= PAIR_WINDOW) return true
      }
      return false
    }),
  )
}

export interface FoldReading {
  readonly target: string
  readonly sampled: number
  readonly present: number
  /** present / sampled — 0 when the fold held. */
  readonly share: number
  /** The share reached LEAK_SHARE: this fold's content is in the bundle. */
  readonly leaked: boolean
}

/** How much of each server fold's content the bundle carries. A `client` fold's target legitimately runs on the server. */
export function foldReadings(
  cwd: string = process.cwd(),
  bundle: string = join(PACKED_WORKER_DIR, 'worker.js'),
  folds: readonly Fold[] = PRODUCTION_FOLDS,
): FoldReading[] {
  const text = readFileSync(join(cwd, bundle), 'utf8')
  return folds
    .filter((f) => f.side === 'both')
    .map((f) => {
      const pairs = fingerprintOf(cwd, f)
      const present = pairs.filter((p) => inOrder(text, p)).length
      const share = pairs.length ? present / pairs.length : 0
      return { target: f.target, sampled: pairs.length, present, share, leaked: share >= LEAK_SHARE }
    })
}

/** Fails closed on a fold whose content is in the bundle, naming it — and on a target too plain to fingerprint. */
export function assertNoFoldLeaks(
  cwd: string = process.cwd(),
  bundle: string = join(PACKED_WORKER_DIR, 'worker.js'),
  folds: readonly Fold[] = PRODUCTION_FOLDS,
): FoldReading[] {
  if (!existsSync(join(cwd, bundle))) throw new Error(`deploy/fold — no server bundle at ${bundle} to read`)
  const readings = foldReadings(cwd, bundle, folds)
  const bad = readings.filter((r) => r.leaked || r.sampled < PAIR_MIN)
  if (bad.length === 0) return readings
  const lines = bad.map((r) =>
    r.sampled < PAIR_MIN
      ? `  unfingerprinted: ${r.target} — ${r.sampled} literal pair(s), under ${PAIR_MIN}; nothing can say whether it shipped`
      : `  leaked: ${r.target} — ${r.present}/${r.sampled} of its literal pairs are in ${bundle}`,
  )
  throw new Error(`deploy/fold — ${bad.length} fold(s) not held by the bundle:\n${lines.join('\n')}`)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const kib = (n: number) => `${(n / 1024).toFixed(1)} KiB`
  try {
    assertFoldsHold()
    const weight = foldWeight()
    const held = weight.reduce((n, w) => n + w.gzip, 0)
    console.log(`✓ deploy/fold — ${PRODUCTION_FOLDS.length} fold patterns match their matter, ${kib(held)} gz of it`)
    for (const w of weight) console.log(`  ${kib(w.gzip).padStart(11)} gz  ${w.target}`)
    const b = workerBudget()
    assertWorkerFitsBudget()
    if (!b.built) {
      console.log('  no OpenNext build on disk — the patterns are all there is to check; build and pack, and the bundle is read')
    } else {
      console.log(`✓ worker ${kib(b.gzip)} gz of the ${kib(b.limit)} ceiling — ${(b.share * 100).toFixed(1)}% used, ${kib(b.headroom)} spare`)
      // 90% of the ceiling: the next heavy leaf is the one that crosses it.
      if (b.share >= 0.9) console.warn(`! ${(b.share * 100).toFixed(1)}% of the ceiling — the next heavy leaf is the one that crosses it`)
      const bundle = join(PACKED_WORKER_DIR, 'worker.js')
      const readings = assertNoFoldLeaks(process.cwd(), bundle)
      console.log(`✓ bundle — no server fold's content in ${bundle}`)
      for (const r of readings) console.log(`  ${`${r.present}/${r.sampled}`.padStart(11)} pairs  ${r.target}`)
    }
  } catch (e) {
    console.error((e as Error).message)
    process.exit(1)
  }
}

/** @index-cross.foldback child=deploy/fold parent=deploy — this cross folds back into its parent. */
