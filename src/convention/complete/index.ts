/**
 * convention/complete — the TRINITY-COMPLETENESS convention as a computed, self-measuring atom.
 *
 * THE LAW: an atom is the trinity {SKILL.md, index.ts, test.ts} — the antimatter (SKILL.md),
 * the matter (index.ts), and the proof (test.ts), told three times and rendered once ([[trinity]]).
 * This atom does not RE-IMPLEMENT the corpus walk; it COMPOSES the canonical one and reports a
 * single live coverage over the real tree:
 *
 *   coverage = complete / total
 *     total    = walkSkills('src').length            (@/aura — every atom that has a SKILL.md)
 *     complete = those whose dir ALSO carries index.ts AND test.ts (the matter-twin + its proof)
 *
 * Pure math, no default: total > 0 by architecture (the corpus is non-empty — many atoms carry a
 * SKILL.md), and complete is a subset count, so 0 ≤ complete ≤ total and the ratio is in [0,1] by
 * construction — no clamp, no fallback. coverage → 1 ⟺ every SKILL.md atom is a full trinity ⟺
 * zero matter-gap ⟺ infinitely-expanding tamper-[[cost]] ([[law]]). A pure-skill atom (a bare
 * schema.org component word with no matter-twin) legitimately lacks index.ts/test.ts and is the
 * only thing that pulls coverage below 1.
 *
 *   tsx src/convention/complete/index.ts   # prints total / complete / coverage from the live tree
 *
 * Matter-twin: ../../aura (the one corpus walk — walkSkills — this convention measures over) ·
 *   ../../trinity (the doc-scale three-told-once law this convention enforces on disk).
 * @standard schema.org — the type vocabulary, collided to single words
 * @see @/aura (walkSkills) · @/convention/dry (the sibling self-measuring convention) · @/trinity · ./SKILL.md
 */
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { walkSkills } from '@/aura'

const SRC = 'src'

/** Every atom that has a SKILL.md — the corpus, via the ONE canonical walk (no duplicated walk). */
export function total(root = SRC): number {
  return walkSkills(root).length
}

/** A SKILL.md atom is COMPLETE iff its dir also carries the matter-twin (index.ts) and its proof (test.ts). */
export const isComplete = (skillPath: string): boolean =>
  existsSync(join(dirname(skillPath), 'index.ts')) && existsSync(join(dirname(skillPath), 'test.ts'))

/** The atoms that are full trinities — SKILL.md ∧ index.ts ∧ test.ts. */
export function complete(root = SRC): number {
  return walkSkills(root).filter(isComplete).length
}

/**
 * Live trinity-completeness coverage over the real tree: complete / total, in [0,1] by
 * construction (0 ≤ complete ≤ total, total > 0). 1 ⟺ every SKILL.md atom is a full
 * {SKILL.md, index.ts, test.ts} trinity. Pure over the same tree — no default, no clock.
 */
export function coverage(root = SRC): number {
  const skills = walkSkills(root)
  return skills.filter(isComplete).length / skills.length
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('convention/complete: total=' + total() + ' complete=' + complete() + ' coverage=' + coverage())
}
