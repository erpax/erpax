/**
 * convention/addressed — IDENTITY IS CONTENT-ADDRESSED as a computed, self-measuring atom.
 *
 * THE LAW: every atom's identity is a uuid — a v8 content-uuid derived from what it IS, not an
 * arbitrary external name. An atom is addressed iff the matrix has minted it a valid content-uuid
 * (the v8 form per RFC 9562: version nibble 8, variant 10x). This atom does NOT re-implement the
 * corpus walk OR the uuid coil — it COMPOSES the canonical ones (walkSkills/leafOf from [[aura]],
 * nodeOf from [[matrix]]) and reports a single live coverage over the real tree:
 *
 *   coverage = addressed / total
 *     total      = walkSkills('src').length                    (@/aura — every atom that has a SKILL.md)
 *     addressed  = those whose leaf word resolves through nodeOf to a node carrying a VALID v8 uuid
 *
 * The matrix (`src/uuid/matrix/matrix.generated.ts`) is a generated CACHE that DRIFTS; the live
 * walk is the source of truth. So coverage < 1 exactly when an atom exists in the tree but the
 * matrix has not yet minted (regenerated) its content-uuid — a freshly-added atom is unaddressed
 * until `pnpm matrix:generate`. This warns wide (the gap is visible) without failing narrow.
 *
 * Pure math, no default: total > 0 by architecture (the corpus is non-empty — thousands of atoms
 * carry a SKILL.md), and addressed is a subset count of that very walk, so 0 ≤ addressed ≤ total
 * and the ratio is in [0,1] by construction — no clamp, no fallback. coverage → 1 ⟺ every atom in
 * the tree carries a content-uuid ⟺ identity is fully content-addressed ⟺ infinitely-expanding
 * tamper-[[cost]] ([[law]]).
 *
 *   tsx src/convention/addressed/index.ts   # prints total / addressed / coverage from the live tree
 *
 * Matter-twin: ../../uuid/matrix (nodeOf — the content-uuid coil this convention measures over) ·
 *   ../../coordinate (the path-as-address resolver: a route IS a uuid's name).
 * @standard RFC 9562 §5.8 (uuidv8 content-uuid) + §4.1 variant — identity derived from content
 * @see @/aura (walkSkills · leafOf) · @/uuid/matrix (nodeOf) · @/convention/complete (sibling self-measuring convention) · ./SKILL.md
 */
import { walkSkills, leafOf } from '@/aura'
import { nodeOf } from '@/uuid/matrix'

const SRC = 'src'

/**
 * The v8 content-uuid form (RFC 9562 §5.8 + §4.1): 8-4-4-4-12 hex with the version nibble pinned to
 * 8 and the variant nibble in {8,9,a,b}. The EXACT shape `toUuid` (the matrix coil) emits, so a node
 * "carries a valid uuid" means its identity is a genuine content-address, not a placeholder.
 */
export const UUID_V8_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

/** Every atom that has a SKILL.md — the corpus, via the ONE canonical walk (no duplicated walk). */
export function total(root = SRC): number {
  return walkSkills(root).length
}

/**
 * An atom is ADDRESSED iff its leaf word resolves (via the canonical nodeOf) to a matrix node whose
 * identity is a valid v8 content-uuid. A tree atom the matrix has not yet minted resolves to no node
 * — unaddressed (the drift the coverage surfaces). Composes nodeOf; never re-derives the uuid.
 */
export const isAddressed = (skillPath: string): boolean => {
  const node = nodeOf(leafOf(skillPath))
  return node !== undefined && UUID_V8_RE.test(node.uuid)
}

/** The atoms whose identity is a content-uuid in the matrix — the addressed ones. */
export function addressed(root = SRC): number {
  return walkSkills(root).filter(isAddressed).length
}

/**
 * Live content-address coverage over the real tree: addressed / total, in [0,1] by construction
 * (0 ≤ addressed ≤ total, total > 0). 1 ⟺ every atom in the tree carries a valid content-uuid.
 * Pure over the same tree — no default, no clock; one walk, so numerator and denominator agree.
 */
export function coverage(root = SRC): number {
  const skills = walkSkills(root)
  return skills.filter(isAddressed).length / skills.length
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log(
    'convention/addressed: total=' + total() + ' addressed=' + addressed() + ' coverage=' + coverage(),
  )
}
