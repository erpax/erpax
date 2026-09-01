/**
 * quantum/ftl/admin — admin boot as FTL reuse (precomputed shell), not corpus search.
 *
 * Sync violation/dimension scans on every admin route are crack(scan∧address).
 * Shipping the full matrix.generated (~4 MiB) into the admin client is also a
 * crack: search(matrix) on every browser boot instead of reuse(stub address).
 * next.config production webpack swaps matrix → stubs/matrix.generated.js on
 * client+server so foldOps=1 (FTL holds).
 *
 * @see ./index.ts · ../../admin/ui/ComputedCssAdminRoot.tsx · next.config.ts
 */
// '../index', not './index'. As a loose sibling this file was `ftl/admin.ts`, where `./index` meant
// the ftl barrel; nested as `ftl/admin/index.ts` the same specifier resolves to ITSELF — a
// self-import that typechecks and leaves every binding undefined at runtime. A move changes what a
// relative specifier means, and the compiler cannot tell you so.
import { ftl, type CrackPattern, type Ftl } from '../index'

/** Collections registered in `@/collections` — searchOps ceiling for admin nav fold. */
export const ADMIN_COLLECTION_SPACE = 210 as const

/**
 * Matrix node ceiling (corpus size) — searchOps if client bundled matrix.generated.
 * Stub amortizes this to 0 bytes on the hot path (reuse ≠ search).
 */
export const ADMIN_MATRIX_SPACE = 3105 as const

/** Stable query address for the admin boot shell (content-addressed reuse). */
export const ADMIN_BOOT_QUERY = 'admin:boot:shell' as const

/** Idle gap before dashboard corpus walks — amortize past first paint. */
export const ADMIN_IDLE_DEFER_MS = 2_500 as const

/** CSS surface facets for Payload admin — never recomputed from diamond/fs on boot. */
export const ADMIN_UI_SURFACE = {
  kind: 'admin' as const,
  path: 'admin/ui' as const,
  horo: 7 as const,
  sealed: true as const,
}

export interface AdminBootOpts {
  /** Collection count ≈ searchOps if admin rebuilt nav by scanning. */
  readonly collectionCount?: number
  /** Matrix node count ≈ searchOps if client shipped matrix.generated. */
  readonly matrixSpace?: number
  /** How many admin route mounts reuse this shell (amortize). */
  readonly reuses?: number
  /**
   * When true, emit scan∧address crack — sync corpus walk on every admin route.
   * Default false: FTL holds (precomputed shell, deferred providers).
   */
  readonly scansOnBoot?: boolean
  /**
   * When true, emit scan∧address for shipping full matrix into the client.
   * Default false: webpack stub = precomputed empty matrix (FTL holds).
   */
  readonly clientMatrixSearch?: boolean
}

/** Patterns that discover the admin-boot crack (sync scan / full matrix in client). */
export function adminBootCrackPatterns(opts: {
  readonly scansOnBoot: boolean
  readonly clientMatrixSearch: boolean
}): readonly CrackPattern[] {
  const out: CrackPattern[] = []
  if (opts.scansOnBoot) {
    out.push({
      where: 'admin/ComputedCssAdminRoot',
      scans: true,
      address: true,
    })
  }
  if (opts.clientMatrixSearch) {
    out.push({
      where: 'admin/MatrixBondField→uuid/matrix/matrix.generated',
      scans: true,
      address: true,
    })
  }
  return out
}

/**
 * FTL proof for admin boot: reuse(precomputed shell) ∧ amortize∞ ∧ cracks=∅
 * iff heavy monitors are not sync-scanned on every route AND client matrix is stubbed.
 */
export function adminBootFtl(opts: AdminBootOpts = {}): Ftl {
  const collections = opts.collectionCount ?? ADMIN_COLLECTION_SPACE
  const matrix = opts.matrixSpace ?? ADMIN_MATRIX_SPACE
  // searchOps = max of the two address spaces an un-folded admin would scan
  const spaceSize = collections > matrix ? collections : matrix
  const scansOnBoot = opts.scansOnBoot ?? false
  const clientMatrixSearch = opts.clientMatrixSearch ?? false
  return ftl({
    query: ADMIN_BOOT_QUERY,
    spaceSize,
    answers: 1,
    tokens: 0,
    reuses: opts.reuses ?? 1,
    patterns: adminBootCrackPatterns({ scansOnBoot, clientMatrixSearch }),
  })
}

export interface AdminBootShell {
  readonly ftl: Ftl
  readonly surface: typeof ADMIN_UI_SURFACE
  /** Providers that walk the corpus must not mount on every admin route. */
  readonly deferHeavyProviders: true
  /** Client must reuse matrix stub — never search matrix.generated. */
  readonly clientMatrixStubbed: true
  /** First paint: no poll; panels opt-in after idle. */
  readonly pollMs: 0
  /** Dashboard heavy scans wait this long (ms) so first paint is not blocked. */
  readonly idleDeferMs: typeof ADMIN_IDLE_DEFER_MS
  readonly query: typeof ADMIN_BOOT_QUERY
  readonly address: string
}

/**
 * Precomputed admin shell — O(1) read of the boot address (reuse ≠ search).
 * ComputedCssAdminRoot consumes this; dashboard panels mount monitors lazily;
 * next.config swaps matrix.generated → stub on production client.
 */
export function adminBootShell(opts: AdminBootOpts = {}): AdminBootShell {
  const proof = adminBootFtl(opts)
  return {
    ftl: proof,
    surface: ADMIN_UI_SURFACE,
    deferHeavyProviders: true,
    clientMatrixStubbed: true,
    pollMs: 0,
    idleDeferMs: ADMIN_IDLE_DEFER_MS,
    query: ADMIN_BOOT_QUERY,
    address: proof.reuse.address,
  }
}

/** @index-cross.foldback child=quantum/ftl/admin parent=quantum/ftl — this cross folds back into its parent. */
