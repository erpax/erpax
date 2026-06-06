/**
 * convention/triggered — the USE-WHEN-TRIGGER convention as a computed, self-measuring atom.
 *
 * THE LAW: a SKILL description is a Use-when TRIGGER, not a restatement. Its frontmatter
 * `description:` must START with "Use when …" — the condition under which an agent reaches for
 * the skill — so the corpus self-routes by when-to-use, never by what-it-is. A description that
 * merely restates the title (or describes the noun) is the untriggered gap.
 *
 * This atom does NOT re-implement the corpus walk or the SKILL reader — it COMPOSES the canonical
 * ones from [[aura]] (walkSkills · readSkill) and reports a single live coverage over the real
 * tree:
 *
 *   coverage = triggered / total
 *     total     = walkSkills('src').length                 (every atom that has a SKILL.md)
 *     triggered = those whose frontmatter description STARTS WITH "Use when" (quote-stripped)
 *
 * Pure math, no default: total > 0 by architecture (the corpus is non-empty — thousands of atoms
 * carry a SKILL.md), and triggered is a subset count of that very walk, so 0 ≤ triggered ≤ total
 * and the ratio is in [0,1] by construction — no clamp, no fallback. coverage → 1 ⟺ every SKILL.md
 * leads with its Use-when trigger ⟺ a fully self-routing corpus ⟺ infinitely-expanding
 * tamper-[[cost]] ([[law]]). The only thing that pulls coverage below 1 is a SKILL.md whose
 * description restates the title instead of stating when to use the skill.
 *
 *   tsx src/convention/triggered/index.ts   # prints total / triggered / coverage from the live tree
 *
 * Matter-twin: ../link (the sibling self-measuring convention over the same SKILL frontmatter) ·
 *   ../../aura (the one corpus walk — walkSkills · readSkill — this convention measures over).
 * @standard schema.org — the type vocabulary, collided to single words
 * @see @/aura (walkSkills · readSkill) · @/convention/complete (sibling self-measuring convention) · @/convention/link · ./SKILL.md
 */
import { walkSkills, readSkill } from '@/aura'

const SRC = 'src'

/** The Use-when trigger phrase every description must lead with — the routing condition. */
export const TRIGGER = 'Use when'

/** The frontmatter block — the text between the first two `---` fences. */
const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---/

/**
 * The frontmatter `description` value of a SKILL.md, with an opening YAML quote stripped (a
 * description may be written `description: "Use when …"` or bare). `undefined` when the SKILL.md
 * carries no frontmatter description at all — distinct from a present-but-untriggered description.
 */
export const descriptionOf = (skillPath: string): string | undefined => {
  const fm = readSkill(skillPath).match(FRONTMATTER_RE)?.[1]
  if (fm === undefined) return undefined
  const line = fm.match(/^description:[ \t]*(.+?)[ \t]*$/m)?.[1]
  if (line === undefined) return undefined
  return line.replace(/^["']/, '')
}

/** A SKILL.md is TRIGGERED iff its frontmatter description leads with the Use-when trigger. */
export const isTriggered = (skillPath: string): boolean =>
  descriptionOf(skillPath)?.startsWith(TRIGGER) === true

/** Every atom that has a SKILL.md — the corpus, via the ONE canonical walk (no duplicated walk). */
export function total(root = SRC): number {
  return walkSkills(root).length
}

/** The atoms whose SKILL.md description is a Use-when trigger — the triggered ones. */
export function triggered(root = SRC): number {
  return walkSkills(root).filter(isTriggered).length
}

/**
 * Live use-when-trigger coverage over the real tree: triggered / total, in [0,1] by construction
 * (0 ≤ triggered ≤ total, total > 0). 1 ⟺ every SKILL.md description leads with "Use when".
 * Pure over the same tree — no default, no clock.
 */
export function coverage(root = SRC): number {
  const skills = walkSkills(root)
  return skills.filter(isTriggered).length / skills.length
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log(
    'convention/triggered: total=' + total() + ' triggered=' + triggered() + ' coverage=' + coverage(),
  )
}
