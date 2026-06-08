/**
 * convention/folded — the FOLD convention as a computed, self-measuring atom.
 *
 * THE LAW: every atom folds into the matrix — is a node. An atom on disk is a
 * `SKILL.md`; it is FOLDED iff the collided matrix carries a node for it. This
 * atom does not RE-IMPLEMENT the corpus walk or the matrix; it COMPOSES the two
 * canonical surfaces and reports a single live coverage over the real tree:
 *
 *   coverage = folded / total
 *     total  = walkSkills('src').length              (@/aura — every SKILL.md atom on disk)
 *     folded = those whose path is a node in the matrix (@/uuid/matrix — UUID_MATRIX_NODES,
 *              by its own path/members fold-ledger; a leaf-safe membership, not the raw
 *              node count, so numerator ⊆ denominator)
 *
 * Pure math, no default: total > 0 by architecture (the corpus is non-empty — many atoms
 * carry a SKILL.md), and `folded` counts a SUBSET of that very same walk (each SKILL.md is
 * folded or not), so 0 ≤ folded ≤ total and the ratio is in [0,1] BY CONSTRUCTION — no clamp,
 * no `min`, no fallback. (A raw node-count / skill-count would need a cap because the matrix
 * also carries vocabulary word-nodes with no SKILL.md; the subset form makes the cap intrinsic.)
 * coverage → 1 ⟺ every SKILL.md atom is a matrix node ⟺ zero fold-gap ⟺ matrix-complete ⟺
 * infinitely-expanding tamper-[[cost]] ([[law]]). A SKILL.md added since the last
 * `matrix:generate` (the generated matrix is a cache that DRIFTS) is unfolded and is the only
 * thing that pulls coverage below 1.
 *
 *   tsx src/convention/folded/index.ts   # prints total / folded / coverage from the live tree
 *
 * Matter-twin: ../../uuid/matrix (UUID_MATRIX_NODES — the collided node set this convention
 *   measures the fold against); and ../../aura (the one corpus walk — walkSkills — that
 *   enumerates the atoms which must fold).
 * @standard schema.org — the type vocabulary, collided to single words
 * @see @/uuid/matrix (UUID_MATRIX_NODES, nodeOf) · @/aura (walkSkills) · @/convention/complete (sibling self-measuring convention) · ./SKILL.md
 */
import { dirname } from 'node:path'
import { walkSkills } from '@/aura'
import { UUID_MATRIX_NODES } from '@/uuid/matrix'

const SRC = 'src'

/** A SKILL.md path → its atom path (the dir relative to src): src/convention/folded/SKILL.md → convention/folded. */
const skillToPath = (skillPath: string): string => dirname(skillPath).replace(new RegExp('^' + SRC + '/'), '')

/**
 * The matrix's own fold-ledger: every atom path it collided into a node. A node records its
 * path directly, or — when several spellings merged into one account — the merged `members`.
 * This is the collider's record of WHAT it folded, read straight off UUID_MATRIX_NODES (no
 * re-implementation of the collide).
 */
const foldedPaths = (): Set<string> => {
  const s = new Set<string>()
  for (const n of UUID_MATRIX_NODES) {
    if (n.path) s.add(n.path)
  }
  return s
}

/** Every atom that has a SKILL.md — the corpus, via the ONE canonical walk (no parallel walk). */
export function total(root = SRC): number {
  return walkSkills(root).length
}

/** A SKILL.md atom is FOLDED iff its path is a node in the matrix's fold-ledger. */
export const isFolded = (skillPath: string, folded: Set<string> = foldedPaths()): boolean =>
  folded.has(skillToPath(skillPath))

/** The atoms already folded into the matrix — the subset of SKILL.md atoms that are nodes. */
export function folded(root = SRC): number {
  const f = foldedPaths()
  return walkSkills(root).filter((s) => isFolded(s, f)).length
}

/**
 * Live fold coverage over the real tree: folded / total, in [0,1] by construction
 * (0 ≤ folded ≤ total, total > 0). 1 ⟺ every SKILL.md atom is a node in the matrix.
 * Pure over the same tree — no default, no clamp, no clock; one walk filtered, so
 * numerator and denominator can never disagree.
 */
export function coverage(root = SRC): number {
  const f = foldedPaths()
  const skills = walkSkills(root)
  return skills.filter((s) => isFolded(s, f)).length / skills.length
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('convention/folded: total=' + total() + ' folded=' + folded() + ' coverage=' + coverage())
}
