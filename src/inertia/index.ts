/**
 * inertia — the corner bound, and every way out of it, each measured against its own experiment.
 *
 * [[horo]]'s `cornerLimit` gives the kinematics: a turn of radius `r` at speed `v` demands lateral
 * acceleration `v²/r`, unbounded as `r → 0`. That is a statement about geometry. This atom is the
 * statement about **bodies**: `F = m·v²/r`, which has a mass in it, and therefore has candidates.
 *
 * "I will not guess the mechanism" is the right answer to *invent me a propulsion system* and the
 * WRONG answer to *what would have to be true*. The second question is computable, because every
 * route around the bound must change one specific factor in `F = m·v²/r`, and each change is a named
 * physical claim with an existing experimental bound attached to it. Naming the claim and computing
 * its distance from the bound is not speculation — it is the [[duel]]: invert the claim, and see
 * what already stands against it.
 *
 * **What is COMPUTED here:** the forces, the accelerations, the radius a given tolerance implies,
 * and — the number that matters — the factor by which each evasion must exceed its own measured
 * bound. **What is DECLARED:** the experimental bounds themselves, cited to their source, because
 * they come from apparatus this corpus does not own. The split is the same one [[rules]]/audience
 * makes, and it is in the open so a reader can argue with the citation rather than with a vibe.
 *
 * **What is NOT here:** any claim that an observed manoeuvre occurred, any identification of any
 * object, and any mechanism erpax proposes. The atom computes what a hypothesis COSTS. Which
 * hypothesis is true is not decided by arithmetic, and nothing below pretends otherwise.
 *
 * @law a corner at speed is a force claim about a body — name which factor of F = m·v²/r you are
 *      changing and how far that is from its measured bound, or you have not made a claim at all.
 * @invariant every evasion names a refuting experiment; one with none is `lensless`, never `open`
 * @invariant the standard-gravity constant is the SI definition, never a rounded 9.8
 * @standard ISO 80000-4:2019 — quantities and units, mechanics: force, acceleration, mass
 * @standard NIST SP 811 §B.8 — standard acceleration of free fall, 9.80665 m/s² exactly
 * @see ./SKILL.md -- ../horo -- ../duel
 */
import { algebraSqrt } from '@/algebra'

/** Standard gravity, m/s² — the SI-defined value (CGPM 1901), not a rounded constant. */
export const STANDARD_GRAVITY = 9.80665

export interface Turn {
  /** mass of the body, kg */
  readonly mass: number
  /** speed through the corner, m/s */
  readonly speed: number
  /** turn radius, m — 0 is a true vertex */
  readonly radius: number
}

export interface TurnLoad {
  /** lateral acceleration, m/s² — Infinity at a true vertex */
  readonly acceleration: number
  /** the same, in multiples of standard gravity — the number a crew or a structure feels */
  readonly gees: number
  /** lateral force, newtons */
  readonly force: number
}

/** The load a corner imposes on a body. `F = m·v²/r`, with the vertex reported as unbounded. */
export function turnLoad(t: Turn): TurnLoad {
  if (t.mass < 0 || t.speed < 0 || t.radius < 0) throw new Error('turnLoad: negative input')
  const acceleration = t.radius === 0 ? (t.speed === 0 ? 0 : Infinity) : (t.speed * t.speed) / t.radius
  return {
    acceleration,
    gees: acceleration / STANDARD_GRAVITY,
    force: t.mass * acceleration,
  }
}

/** The radius a given g-tolerance forces at a given speed — `r = v²/(g·tolerance)`. */
export function radiusForTolerance(speed: number, gees: number): number {
  if (gees <= 0) return Infinity
  return (speed * speed) / (gees * STANDARD_GRAVITY)
}

/** The speed a given radius and tolerance permit — the same law read the other way. */
export function speedForTolerance(radius: number, gees: number): number {
  return algebraSqrt(gees * STANDARD_GRAVITY * radius)
}

/**
 * A way out of the bound — and what already stands against it.
 *
 * `F = m·v²/r` has exactly four factors a hypothesis can attack: the mass, the speed, the radius,
 * or the claim that a force is felt at all. Everything proposed for a right-angle manoeuvre is one
 * of these, and each one is refutable by an experiment that has already been performed.
 */
export type EvasionStatus =
  /** an experiment bounds it, and the required effect exceeds that bound by `exceedsBoundBy` */
  | 'refuted-at-bound'
  /** an experiment bounds it, and the required effect is INSIDE the bound — not refuted */
  | 'within-bound'
  /** no experiment in this corpus's reach decides it — the duel cannot start */
  | 'lensless'

export interface Evasion {
  readonly id: string
  /** which factor of F = m·v²/r the hypothesis changes */
  readonly changes: 'inertial-mass' | 'proper-acceleration' | 'the-observation' | 'the-body'
  readonly mechanism: string
  /** the experiment that would say no — DECLARED, cited, not computed here */
  readonly refutedBy: string
  /** the tightest published bound on the effect, as a dimensionless fraction; null when none exists */
  readonly bound: number | null
  /** what the manoeuvre requires, same units as `bound`; null when the hypothesis is not quantitative */
  readonly required: number | null
  readonly status: EvasionStatus
  /** required / bound — how many times the mechanism must exceed what measurement allows */
  readonly exceedsBoundBy: number | null
}

/**
 * The bounds, DECLARED with their source. Each is a published experimental limit, restated here so a
 * reader trips over the citation rather than taking a number on trust.
 *
 * - **MICROSCOPE (2022)** — the equivalence principle: the Eötvös parameter η, the fractional
 *   difference between inertial and gravitational mass, is bounded at |η| ≲ 1e-15. Any mechanism
 *   that decouples inertial mass from gravitational mass lives inside that bound or contradicts it.
 * - **Energy conditions** — a metric that moves the frame instead of the body (a geodesic path, no
 *   proper acceleration) requires negative energy density in the known solutions. There is no
 *   measured bound to quote, so it is `lensless` here rather than refuted: an honest gap, not a
 *   verdict. Naming it refuted would be judgment without measurement.
 * - **Range from a single camera** — an angular track alone cannot separate distance from speed, so
 *   an apparent corner is consistent with a slow near object. This one is not a physics bound at all
 *   but a geometry fact, and it is the cheapest hypothesis by a wide margin.
 */
export const EQUIVALENCE_BOUND = 1e-15

export function evasions(turn: Turn, tolerance: number): readonly Evasion[] {
  const load = turnLoad(turn)
  // the fraction of inertial mass that must DISAPPEAR for the load to fall to the tolerance
  const massFractionNeeded = load.gees === 0 || !Number.isFinite(load.gees) ? 1 : 1 - tolerance / load.gees
  const required = massFractionNeeded > 0 ? massFractionNeeded : 0

  return [
    {
      id: 'reduced-inertial-mass',
      changes: 'inertial-mass',
      mechanism: 'the body responds to force as if far less massive — inertial mass decoupled from gravitational mass',
      refutedBy: 'MICROSCOPE (2022) — Eötvös parameter |η| ≲ 1e-15',
      bound: EQUIVALENCE_BOUND,
      required,
      status: required > EQUIVALENCE_BOUND ? 'refuted-at-bound' : 'within-bound',
      exceedsBoundBy: required > 0 ? required / EQUIVALENCE_BOUND : null,
    },
    {
      id: 'no-proper-acceleration',
      changes: 'proper-acceleration',
      mechanism: 'the path is a geodesic in a curved metric — the frame moves, the body feels nothing',
      refutedBy: 'energy conditions on the required stress-energy; no measured bound to cite',
      bound: null,
      required: null,
      status: 'lensless',
      exceedsBoundBy: null,
    },
    {
      id: 'not-a-rigid-body',
      changes: 'the-body',
      mechanism: 'no single rigid object traverses the corner — plasma, separate objects, or a discharge',
      refutedBy: 'simultaneous range measurement (radar, or two separated sensors)',
      bound: null,
      required: null,
      status: 'lensless',
      exceedsBoundBy: null,
    },
    {
      id: 'not-a-corner',
      changes: 'the-observation',
      mechanism: 'the corner is angular, not spatial — a single camera cannot separate range from speed',
      refutedBy: 'any independent range measurement; the hypothesis dies the moment distance is known',
      bound: null,
      required: null,
      status: 'lensless',
      exceedsBoundBy: null,
    },
  ]
}

/**
 * The cheapest hypothesis consistent with the evidence — ordered by what must be ASSUMED, never by
 * what is interesting.
 *
 * An evasion refuted at its bound is ranked last: it requires a measured quantity to be wrong by a
 * computed factor. A lensless one is not thereby true — it is merely undecided, and the ranking says
 * so rather than promoting it.
 */
export function cheapest(es: readonly Evasion[]): readonly Evasion[] {
  const rank = (e: Evasion): number => (e.status === 'refuted-at-bound' ? 2 : e.status === 'within-bound' ? 0 : 1)
  return [...es].sort((a, b) => rank(a) - rank(b) || (b.exceedsBoundBy ?? 0) - (a.exceedsBoundBy ?? 0))
}

/** The report — every number recomputable from the turn it describes. */
export function render(turn: Turn, tolerance: number): readonly string[] {
  const load = turnLoad(turn)
  const fmt = (n: number): string => (Number.isFinite(n) ? n.toExponential(2) : '∞')
  return [
    `turn — ${turn.mass} kg at ${turn.speed} m/s through r = ${turn.radius} m`,
    `  lateral acceleration  ${fmt(load.acceleration)} m/s²  =  ${fmt(load.gees)} g`,
    `  lateral force         ${fmt(load.force)} N`,
    `  radius for ${tolerance} g       ${fmt(radiusForTolerance(turn.speed, tolerance))} m`,
    '',
    ...cheapest(evasions(turn, tolerance)).map(
      (e) =>
        `  ${e.status.padEnd(17)} ${e.id.padEnd(24)} ${
          e.exceedsBoundBy === null ? e.refutedBy : `needs ${fmt(e.exceedsBoundBy)}× its measured bound`
        }`,
    ),
  ]
}
