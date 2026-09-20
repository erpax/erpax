/**
 * staffing — a position is DECLARED once, and everything a bank needs from it is derived.
 *
 * THE GAP THIS CLOSES: six atoms already computed the five faces of a position — the description
 * ([[position]]), the competency shortfall ([[competency]]/gap), the plan that closes it
 * ([[train]]), the access capability ([[cross]]), the cost ([[allocation]]) — and NOTHING JOINED
 * THEM. So every caller did the join by hand, which means every caller did it slightly differently
 * and no gate could see the difference. A fold nobody performs is not a fold.
 *
 * It also makes [[rules]]/ask true for hiring: the irreducible ask is the POSITION and the bank's
 * own anchor rate. The title, the responsibility, the rate, the missing competencies, the training
 * order and the capability are all determined — by SFIA, by the ledger, by the lattice — so the
 * system computes them and a human confirms. Two inputs, five faces.
 *
 * @standard SFIA 8 — responsibility levels 1..7
 * @standard ESCO v1.2 / ISCO-08 — occupation and competency classification
 * @standard NIST INCITS-359 — role-based access control
 */
import { exactMax } from '@/algebra'
import { jobDescription, positionHourlyRate, type JobDescription, type Position } from '@/position'
import { competencyGap, type GapResult, type HeldLine, type RequiredLine } from '@/competency/gap'
import { isProficient, trainingPlan, type TrainingStep } from '@/train'
import { ANCHOR } from '@/allocation'
import type { AccessRole } from '@/uuid/share'

export const atomPath = 'staffing' as const

/**
 * Hours in a full-time year. DECLARED, because it is a contract term and not a derivation — a
 * bank on a 35-hour week has a different one, and burying it in a formula would make every annual
 * figure a claim nobody could argue with ([[rules]]/drift: state the invariant or date the number).
 */
export const FTE_HOURS = 1720

/** What a position costs, at the anchor the bank supplies. */
export interface PositionCost {
  /** The bank's base rate — its number, never ours. */
  readonly anchor: number
  /** The leverage tier; the rate is anchor × tier. */
  readonly tier: number
  readonly hourly: number
  /** hourly × hours. Excludes employer on-costs, which are a payroll matter and not this one. */
  readonly annual: number
  readonly hours: number
}

/** A position, fully derived: the one object a hiring screen, an RBAC grant and a budget all read. */
export interface StaffedPosition {
  readonly description: JobDescription
  readonly competencies: GapResult
  /** Ordered by mandatory first, then by size of gap — the order training must actually run in. */
  readonly plan: readonly TrainingStep[]
  /** Every mandatory competency met at the required level. */
  readonly proficient: boolean
  readonly capability: AccessRole
  readonly cost: PositionCost
}

export interface StaffArgs {
  readonly position: Position
  /** What the position requires. */
  readonly required: readonly RequiredLine[]
  /** What the candidate or holder already holds. Omitted means nobody is in the seat yet. */
  readonly held?: readonly HeldLine[]
  /** The capability the role confers on the `read < write < sign < admin` lattice; `audit` is incomparable. */
  readonly capability: AccessRole
  readonly anchor?: number
  readonly hours?: number
  /** Maps a competency to the SKILL route that closes it; without one, steps carry an empty route. */
  readonly routeOf?: (competency: string | number) => string | undefined
}

/**
 * The fold. Every face is delegated — this function decides nothing on its own, which is the
 * property that makes it safe to put in front of a bank: a change to the rate law, the gap maths
 * or the lattice reaches here without being restated.
 */
export function staff(args: StaffArgs): StaffedPosition {
  const anchor = typeof args.anchor === 'number' && args.anchor > 0 ? args.anchor : ANCHOR
  const hours = typeof args.hours === 'number' && args.hours > 0 ? args.hours : FTE_HOURS
  const held = [...(args.held ?? [])]
  const required = [...args.required]
  const hourly = positionHourlyRate(args.position, anchor)

  return {
    description: jobDescription(args.position, anchor),
    competencies: competencyGap(held, required),
    plan: trainingPlan(held, required, args.routeOf),
    proficient: isProficient(held, required),
    capability: args.capability,
    cost: {
      anchor,
      tier: exactMax(1, args.position.harmonic),
      hourly,
      annual: hourly * hours,
      hours,
    },
  }
}

/**
 * The competencies a position requires that reach no executable matter — the audit question, asked
 * of a staffed position rather than of the whole tree. A route resolving is not a route that WORKS;
 * this reports reachability only, which is the weaker claim and the true one.
 */
export function unresolvedCompetencies(
  staffed: StaffedPosition,
  resolves: (competency: string | number) => boolean,
): readonly (string | number)[] {
  return staffed.competencies.gaps.map((g) => g.competency).filter((c) => !resolves(c))
}
