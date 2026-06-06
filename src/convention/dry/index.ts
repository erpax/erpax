/**
 * convention/dry — the DRY convention as a computed, self-measuring atom.
 *
 * THE LAW: no duplication — every reference folded to one source. This atom does
 * not RE-IMPLEMENT the dry-clean; it COMPOSES the canonical kernels and reports a
 * single live coverage over the real tree:
 *
 *   coverage = atoms / (atoms + dup)
 *     atoms = UUID_MATRIX_NODES.length   (@/uuid/matrix — every folded-to-one atom)
 *     dup   = residue().length           (@/dry — the un-folded residue still on disk)
 *
 * Pure math, no default: dup ≥ 0 and atoms > 0 by architecture (the corpus is
 * non-empty; the matrix always carries the root), so the ratio is in [0,1] by
 * construction — no clamp, no fallback. coverage → 1 ⟺ zero residue ⟺ perfect DRY
 * ⟺ infinite tamper-cost ([[law]]). A residue file is one un-collided reference;
 * it is the only thing that pulls coverage below 1.
 *
 *   tsx src/convention/dry/index.ts    # prints atoms / dup / coverage from the live tree
 *
 * Matter-twin: ../../dry (the dry-clean kernel this convention measures).
 * @standard schema.org — the type vocabulary, collided to single words
 * @see @/dry (residue) · @/uuid/matrix (UUID_MATRIX_NODES) · ./SKILL.md
 */
import { residue } from '@/dry'
import { UUID_MATRIX_NODES } from '@/uuid/matrix'

/** Un-folded references still on disk — residue is duplication that escaped the collision. */
export function dup(): number {
  return residue().length
}

/** Every reference already folded to one source — the matrix nodes. */
export function atoms(): number {
  return UUID_MATRIX_NODES.length
}

/**
 * Live DRY coverage over the real tree: atoms / (atoms + dup), in [0,1] by
 * construction (dup ≥ 0, atoms > 0). 1 ⟺ no residue ⟺ every reference folded to
 * one source.
 */
export function coverage(): number {
  const folded = atoms()
  return folded / (folded + dup())
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('convention/dry: atoms=' + atoms() + ' dup=' + dup() + ' coverage=' + coverage())
}
