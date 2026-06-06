/**
 * convention/sourced — THE CONVENTION: every atom CITES its `@standard`. An atom (a folder that
 * carries a `SKILL.md`) is sourced when an `@standard <id> …` line names the external standard it
 * realises — schema.org, an ISO/IEC code, a W3C spec, a national regulation. The marker may sit in
 * the `SKILL.md` body OR in the sibling `index.ts` JSDoc (both are the atom's public face). An atom
 * with no `@standard` anywhere is grounded in nothing but itself — the unsourced gap, the convention
 * unmet — and it is exactly that gap which lowers tamper-[[cost]]: a citation borrows the external
 * standard's mass, so forging the atom now means forging the standard too.
 *
 * This atom does NOT re-implement the corpus walk or the SKILL reader — it COMPOSES the canonical
 * ones from [[aura]] (`walkSkills` · `readSkill`) and reports a single live coverage over the real
 * tree (re-deriving the walk would be the very duplication this audit hunts):
 *
 *   coverage = sourced / total
 *     total   = walkSkills('src').length                  (every atom that carries a SKILL.md)
 *     sourced = those whose SKILL.md OR sibling index.ts carries an `@standard` marker
 *
 * Pure math, no default: total > 0 by architecture (the corpus is a non-empty tree — thousands of
 * atoms carry a `SKILL.md`), and `sourced` is a subset count of that same walk, so 0 ≤ sourced ≤
 * total and the ratio is in [0,1] by construction — no clamp, no fallback. coverage → 1 ⟺ every
 * atom cites its standard ⟺ a fully sourced corpus ⟺ infinitely-expanding tamper-[[cost]] ([[law]]).
 *
 *   tsx src/convention/sourced/index.ts    # prints total / sourced / coverage from the live tree
 *
 * Matter-twin: ../../standards (the shared computed standard index — the registry every banner
 *   meets in; this convention measures whether each atom actually CITES one of those standards).
 * @standard schema.org — the type vocabulary, collided to single words
 * @see @/aura (walkSkills · readSkill) · @/convention/honest (sibling self-measuring convention) · @/standards · @/cost · @/law · ./SKILL.md
 */
import { join, dirname } from 'node:path'
import { existsSync } from 'node:fs'
import { walkSkills, readSkill } from '@/aura'

const SRC = 'src'

/** The `@standard <id> …` marker — a JSDoc/prose tag that names the external standard the atom cites. */
export const STANDARD_RE = /@standard\b/

/**
 * An atom is SOURCED iff an `@standard` marker appears in its `SKILL.md` body OR in the sibling
 * `index.ts` JSDoc (the two public faces of the atom). The `@standard` line is prose / a JSDoc tag,
 * never inside a code fence, so it is read raw — no `stripCode`, which would wrongly hide it.
 */
export const isSourced = (skillPath: string): boolean => {
  if (STANDARD_RE.test(readSkill(skillPath))) return true
  const indexPath = join(dirname(skillPath), 'index.ts')
  return existsSync(indexPath) && STANDARD_RE.test(readSkill(indexPath))
}

/** Every atom that carries a SKILL.md — the corpus, via the ONE canonical walk (no duplicated walk). */
export function total(root = SRC): number {
  return walkSkills(root).length
}

/** The atoms that cite their `@standard` (in SKILL.md or sibling index.ts) — the sourced ones. */
export function sourced(root = SRC): number {
  return walkSkills(root).filter(isSourced).length
}

/**
 * Live sourced-citation coverage over the real tree: sourced / total, in [0,1] by construction
 * (0 ≤ sourced ≤ total, total > 0). 1 ⟺ every atom cites an `@standard`. Pure over the same tree —
 * one walk feeds both numerator and denominator, so they can never disagree; no default, no clock.
 */
export function coverage(root = SRC): number {
  const skills = walkSkills(root)
  return skills.filter(isSourced).length / skills.length
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log(
    'convention/sourced: total=' + total() + ' sourced=' + sourced() + ' coverage=' + coverage(),
  )
}
