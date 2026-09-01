import { existsSync, readFileSync } from 'node:fs'
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
 * re-derives that claim from the filesystem on every test run.
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

/** Where `wrangler deploy --dry-run --outdir` puts the exact bundle it would upload. */
export const PACKED_WORKER_DIR = '.open-next/packed'

export interface WorkerBudget {
  readonly packed: boolean
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
 * difference in gzip settings.
 *
 * HONEST BOUNDARY: it weighs what is on disk. A stale pack weighs a stale Worker, which
 * is why the wrangler dry-run pack runs immediately before it. The sourcemap
 * beside it is not uploaded and is not counted.
 */
export function workerBudget(cwd: string = process.cwd(), dir: string = PACKED_WORKER_DIR): WorkerBudget {
  const packed = join(cwd, dir, 'worker.js')
  if (!existsSync(packed)) {
    return { packed: false, bytes: 0, gzip: 0, limit: WORKER_LIMIT_BYTES, fits: true, headroom: WORKER_LIMIT_BYTES, share: 0 }
  }
  const buf = readFileSync(packed)
  const gzip = gzipSync(buf).byteLength
  return {
    packed: true,
    bytes: buf.byteLength,
    gzip,
    limit: WORKER_LIMIT_BYTES,
    fits: gzip <= WORKER_LIMIT_BYTES,
    headroom: WORKER_LIMIT_BYTES - gzip,
    share: gzip / WORKER_LIMIT_BYTES,
  }
}

/**
 * Fails closed on a packed Worker Cloudflare would refuse. Skips when nothing is packed —
 * a missing artifact is not a green one, and the caller says which of the two it has
 * (`workerBudget().packed`). Approaching the ceiling is a WARNING, never a failure: the
 * ceiling is Cloudflare's, and a gate that invents a tighter one blocks honest work.
 */
export function assertWorkerFitsBudget(cwd: string = process.cwd(), dir: string = PACKED_WORKER_DIR): void {
  const b = workerBudget(cwd, dir)
  if (!b.packed) return
  const kib = (n: number) => `${(n / 1024).toFixed(1)} KiB`
  if (!b.fits) {
    throw new Error(
      `deploy/fold — Worker is ${kib(b.gzip)} gz, over the ${kib(b.limit)} ceiling by ${kib(-b.headroom)}.\n` +
        `  weigh what the folds keep out: pnpm erpax deploy fold`,
    )
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const kib = (n: number) => `${(n / 1024).toFixed(1)} KiB`
  try {
    assertFoldsHold()
    const weight = foldWeight()
    const held = weight.reduce((n, w) => n + w.gzip, 0)
    console.log(`✓ deploy/fold — ${PRODUCTION_FOLDS.length} folds hold, keeping ${kib(held)} gz out of the bundle`)
    for (const w of weight) console.log(`  ${kib(w.gzip).padStart(11)} gz  ${w.target}`)
    const b = workerBudget()
    if (!b.packed) {
      console.log(`  (nothing packed to weigh — run \`wrangler deploy --dry-run --outdir ${PACKED_WORKER_DIR}\` after an OpenNext build)`)
    } else {
      assertWorkerFitsBudget()
      console.log(
        `✓ worker ${kib(b.gzip)} gz of the ${kib(b.limit)} ceiling — ${(b.share * 100).toFixed(1)}% used, ${kib(b.headroom)} spare`,
      )
      // 90% of the ceiling: the next heavy leaf is the one that crosses it. Spelled here, once,
      // where it is read — an exported constant with a single caller is seal-debt, not a law.
      if (b.share >= 0.9) {
        console.warn(`! ${(b.share * 100).toFixed(1)}% of the ceiling — the next heavy leaf is the one that crosses it`)
      }
    }
  } catch (e) {
    console.error((e as Error).message)
    process.exit(1)
  }
}

/** @index-cross.foldback child=deploy/fold parent=deploy — this cross folds back into its parent. */
