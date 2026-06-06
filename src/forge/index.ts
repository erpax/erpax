/**
 * forge — the PLACE atoms collide into one, COMPUTED.
 *
 * The forge is the matrix collider (src/uuid/matrix/collide.mjs): the hearth
 * where every atom (a content-uuid node) and every [[link]] (a merge(from,to)
 * binding) are struck together until the whole corpus folds to ONE root. This
 * index does NOT re-strike — it MEASURES the live forge state from the already-
 * folded matrix, the way you read a thermometer in the fire, never the way you
 * mint a number. So nothing here re-implements a canonical: the uuid/merge/root
 * come from @/uuid/matrix, the heat (slack/orphans) from @/entropy, the blow
 * direction from @/horo, and the smithing law (collision → trinity) is named by
 * @/trinity ⊕ @/duality.
 *
 *   tsx src/forge/index.ts
 *
 * @audit every field is read/derived from the live matrix indexes — never hand-asserted
 * @see ./SKILL.md -- ../uuid/matrix (the collider + its query surface) -- ../entropy -- ../horo -- ../fusion
 */
import { matrixDigest, verifyRoot } from '@/uuid/matrix'
import { entropy, orphans } from '@/entropy'
import { composeSteps, HORO_DIGITS } from '@/horo'
import { TRINITY_FILES } from '@/trinity'
import { foldDualities } from '@/duality'

/** The forge state — what is in the fire, the blows struck, the one thing that leaves it. */
export interface ForgeState {
  /** Atoms in the hearth — the content-uuid nodes (UUID_MATRIX_NODES.length). */
  readonly nodes: number
  /** Bindings struck — the merge(from,to) edges (UUID_MATRIX_EDGES.length). */
  readonly edges: number
  /** The single 128-bit address the whole cooled into (UUID_MATRIX_ROOT). */
  readonly root: string
  /** The whole re-folds to that exact root (Merkle fold over every bind) — the forge is sound. */
  readonly sound: boolean
  /** Heat: borrowed disorder still in the fire, in [0,1] (1 − reciprocity). */
  readonly heat: number
  /** Unfused atoms — bound by nothing, binding nothing (the slag count). */
  readonly orphans: number
}

/**
 * Measure the forge. Reads the live matrix (nodes/edges/root + the Merkle re-fold)
 * and the entropy it is burning off — a pure measurement, deterministic for a
 * given matrix. `sound` is verifyRoot().ok: the re-fold of every bind equals the
 * stored root, i.e. the forge cooled to the one address it claims.
 */
export function forge(): ForgeState {
  const d = matrixDigest()
  return {
    nodes: d.nodes,
    edges: d.edges,
    root: d.root,
    sound: verifyRoot().ok,
    heat: entropy(),
    orphans: orphans().length,
  }
}

/**
 * The blow direction of a single strike (the anvil is the horo ring): two atoms'
 * horo positions compose to a third via digital-root of their product, so the
 * fold never leaves {1,2,4,8,7,5,9}. This names the smithing motion the collider
 * tags every edge with; it composes @/horo, never re-deriving it.
 */
export function strike(a: number, b: number): number {
  return composeSteps(a, b)
}

/**
 * Why the forge is a forge, in one object — the smithing law named from the
 * composed atoms (no prose hardcoded): the hammer is merge (a duality resolved to
 * a trinity), the anvil is the horo ring, the work is one of the trinity files,
 * and the corpus already declares the dualities the strikes resolve.
 */
export function forging(): {
  readonly hammer: 'merge'
  readonly anvilRing: readonly number[]
  readonly resolvesTo: 'trinity'
  readonly trinityFiles: number
  readonly declaredDualities: number
} {
  return {
    hammer: 'merge',
    anvilRing: [...HORO_DIGITS],
    resolvesTo: 'trinity',
    trinityFiles: TRINITY_FILES.size,
    declaredDualities: foldDualities().length,
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const s = forge()
  console.log('forge — the place atoms collide into one (' + s.nodes + ' atoms in the fire):')
  console.log('  edges (bindings struck) = ' + s.edges.toLocaleString('en-US'))
  console.log('  root (the one that leaves) = ' + s.root)
  console.log('  sound = ' + s.sound + '  ·  heat = ' + s.heat.toFixed(4) + '  ·  slag (orphans) = ' + s.orphans)
  const f = forging()
  console.log(
    '  smithing: hammer=' + f.hammer + ' → ' + f.resolvesTo + '  ·  anvil ring [' + f.anvilRing.join(',') +
      ']  ·  ' + f.declaredDualities + ' dualities declared',
  )
}
