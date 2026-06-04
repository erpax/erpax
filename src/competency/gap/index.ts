/**
 * competency-gap — the skill-gap computation: required − held.
 *
 * The merge made executable: the SAME function scores a human hire against a
 * job AND an AI agent against a task — held competencies vs required, on the
 * shared SFIA scale. Pure (no I/O, no persistence) so it is trivially testable
 * and reusable by recruiting, performance review, and agent task-routing.
 *
 * @standard SFIA 8 responsibility-levels-1-7 (the shared held/required scale)
 * @standard ISO 30405:2016 essential-vs-optional (mandatory gating)
 */

export interface HeldLine {
  competency: string | number
  proficiency?: number | null
}

export interface RequiredLine {
  competency: string | number
  minProficiency?: number | null
  mandatory?: boolean | null
}

export interface CompetencyGap {
  competency: string | number
  required: number
  held: number
  /** required − held, clamped to ≥ 0 (0 = met). */
  gap: number
  mandatory: boolean
  met: boolean
}

export interface GapResult {
  gaps: CompetencyGap[]
  /** Every mandatory required competency is met at the required level. */
  meetsAllMandatory: boolean
  /** Fraction of required competencies met (0..1); 1 when nothing is required. */
  matchScore: number
}

const idOf = (c: string | number | { id?: string | number } | null | undefined): string =>
  String(typeof c === 'object' && c !== null ? c.id : c)

/**
 * Compute the gap of `held` competencies against a job/task's `required` set.
 * gap > 0 ⇒ under the required level; mandatory + gap > 0 ⇒ blocks the match.
 */
export function competencyGap(held: HeldLine[], required: RequiredLine[]): GapResult {
  const heldByKey = new Map<string, number>()
  for (const h of held) {
    heldByKey.set(idOf(h.competency), Math.max(heldByKey.get(idOf(h.competency)) ?? 0, h.proficiency ?? 0))
  }

  const gaps: CompetencyGap[] = required.map((r) => {
    const requiredLevel = r.minProficiency ?? 1
    const heldLevel = heldByKey.get(idOf(r.competency)) ?? 0
    const gap = Math.max(0, requiredLevel - heldLevel)
    return {
      competency: r.competency,
      required: requiredLevel,
      held: heldLevel,
      gap,
      mandatory: r.mandatory !== false,
      met: gap === 0,
    }
  })

  const meetsAllMandatory = gaps.every((g) => !g.mandatory || g.met)
  const matchScore = gaps.length === 0 ? 1 : gaps.filter((g) => g.met).length / gaps.length

  return { gaps, meetsAllMandatory, matchScore }
}
