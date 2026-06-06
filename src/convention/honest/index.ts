/**
 * convention/honest — the HONEST-SPLIT convention as a computed, self-measuring atom.
 *
 * THE LAW: metaphysics is NAMED as convention, never ASSERTED as fact. A SKILL.md may
 * mention a metaphysical figure of speech ("free energy", "fingerprint of god") only when it
 * frames it as convention/folklore/not-literal — the honest split the corpus runs on (the math
 * is real; the metaphysics is a named convention, never a claim). An UNMARKED assertion is the
 * dishonest gap.
 *
 * This atom does NOT re-implement the corpus walk or the SKILL reader — it COMPOSES the canonical
 * ones from [[aura]] (walkSkills · readSkill · stripCode) and reports a single live coverage over
 * the real tree:
 *
 *   coverage = honest / total
 *     total  = walkSkills('src').length                      (every atom that has a SKILL.md)
 *     honest = those whose body carries NO UNMARKED assertion (none of the fingerprint phrases
 *              outside code, OR every such phrase sits in a sentence that marks it as a
 *              convention/folklore/not-fact restatement)
 *
 * Pure math, no default: total > 0 by architecture (the corpus is non-empty — thousands of atoms
 * carry a SKILL.md), and honest is a subset count of that very walk, so 0 ≤ honest ≤ total and the
 * ratio is in [0,1] by construction — no clamp, no fallback. coverage → 1 ⟺ no unmarked
 * metaphysical assertion anywhere ⟺ a fully honest corpus ⟺ infinitely-expanding tamper-[[cost]]
 * ([[law]]). The only thing that pulls coverage below 1 is a SKILL.md that ASSERTS metaphysics as
 * fact without naming it as convention.
 *
 *   tsx src/convention/honest/index.ts    # prints total / honest / coverage from the live tree
 *
 * Matter-twin: ../../rodin (the prior-art honest split — vortex arithmetic REAL, the metaphysics
 *   named-not-asserted — this convention generalises across every SKILL.md).
 * @standard schema.org — the type vocabulary, collided to single words
 * @see @/aura (walkSkills · readSkill · stripCode) · @/convention/complete (sibling self-measuring convention) · @/rodin · ./SKILL.md
 */
import { walkSkills, readSkill, stripCode } from '@/aura'

const SRC = 'src'

/**
 * The metaphysical figures of speech the honest split forbids as a bare claim — the fingerprint
 * of a metaphysics-asserted-as-fact SKILL.md. Matched case-insensitively, outside code spans.
 */
export const ASSERTION_RE =
  /fingerprint of god|free energy|is sacred|interdimensional/gi

/**
 * Words that MARK a nearby assertion phrase as a named convention rather than a claim — the
 * honest-split framing (folklore / convention / numerology / metaphor / NOT a fact / not literal).
 */
const MARK_RE =
  /convention|folklore|numerolog|metaphor|figure of speech|so-?called|named|not (?:a )?(?:fact|literal|real|claim)|never assert|not assert|debunk|myth|honest split/i

/** The sentence (between sentence/line breaks) a match sits in — its local frame. */
const sentenceAround = (text: string, at: number): string => {
  const left = Math.max(
    text.lastIndexOf('.', at),
    text.lastIndexOf('\n', at),
    text.lastIndexOf('!', at),
    text.lastIndexOf('?', at),
  )
  const rightDot = text.indexOf('.', at)
  const rightNl = text.indexOf('\n', at)
  const right = Math.min(
    rightDot === -1 ? text.length : rightDot,
    rightNl === -1 ? text.length : rightNl,
  )
  return text.slice(left + 1, right)
}

/**
 * An assertion is UNMARKED iff its phrase appears (outside code) in a sentence that does NOT mark
 * it as a convention/folklore/not-fact restatement. A SKILL.md with zero unmarked assertions is
 * honest.
 */
export const isHonest = (skillPath: string): boolean => {
  const prose = stripCode(readSkill(skillPath))
  ASSERTION_RE.lastIndex = 0
  for (let m = ASSERTION_RE.exec(prose); m !== null; m = ASSERTION_RE.exec(prose)) {
    if (!MARK_RE.test(sentenceAround(prose, m.index))) return false
  }
  return true
}

/** Every atom that has a SKILL.md — the corpus, via the ONE canonical walk (no duplicated walk). */
export function total(root = SRC): number {
  return walkSkills(root).length
}

/** The atoms whose SKILL.md asserts no unmarked metaphysics — the honest ones. */
export function honest(root = SRC): number {
  return walkSkills(root).filter(isHonest).length
}

/**
 * Live honest-split coverage over the real tree: honest / total, in [0,1] by construction
 * (0 ≤ honest ≤ total, total > 0). 1 ⟺ no SKILL.md asserts metaphysics as fact (every such
 * phrase is named as convention). Pure over the same tree — no default, no clock.
 */
export function coverage(root = SRC): number {
  const skills = walkSkills(root)
  return skills.filter(isHonest).length / skills.length
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log(
    'convention/honest: total=' + total() + ' honest=' + honest() + ' coverage=' + coverage(),
  )
}
