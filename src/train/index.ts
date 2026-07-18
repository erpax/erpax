/**
 * train — auto-train each actor toward best efficiency in the app: close the
 * competency gap, off-gas the debt, climb the pay curve.
 *
 * The [[competency-gap]] (required − held) IS a [[decompression]] debt: capability
 * the role demands that the actor has not yet verified. Training off-gasses it.
 * Each closed gap raises held proficiency → raises the verified FRACTION the actor
 * reaches → climbs the one pricing curve toward the role's M-value ceiling. "Best
 * efficiency" is the surface: debt 0, efficiency 1, pay at the ceiling.
 *
 * This is etrima's `efficiency_percent` (`minutes_produced / presence_minutes`)
 * made general and app-wide: the competency match-score IS the efficiency / the
 * verified fraction; confirmed training IS the gate that releases the debt (the
 * `confirmed_at` of a work phase); and the highest-gap-first plan drives the tail
 * to zero exactly like the `tsc`/[[aura]] convergence — the society's breath, but
 * aimed at the actor's own competence. The route that closes each gap is the
 * competency's `skillRoute` (the SKILL.md node) — so the SAME corpus the agents
 * load to do work is the curriculum that trains the humans. The merge realised:
 * a skill, a competency, a job requirement, and a training step are one node.
 *
 * Pure (held/required/routes passed in) ⇒ testable; a [[hooks]] hook reads the
 * actor's held lines and the position's required lines and emits the plan.
 *
 * @standard SFIA 8 responsibility-levels-1-7 (the held/required/efficiency scale)
 * @standard ISO 30405:2016 essential-vs-optional (mandatory gates the surface)
 * @audit ISO 19011 — efficiency, debt and pay are deterministic functions of the gap
 */

import { competencyGap, type HeldLine, type RequiredLine } from '@/competency/gap'
import { levelCeiling, rateAtFraction, type GradientFactors } from '@/decompression'
import { ANCHOR } from '@/allocation'
import { wavesOf } from '@/theorem'

/**
 * The actor's efficiency at a role: the fraction of required competencies met —
 * etrima's `efficiency_percent` as a [0,1] verified fraction. 1 ⇒ fully proficient
 * (the surface); the same number that prices the pay and that training raises.
 */
export function efficiency(held: HeldLine[], required: RequiredLine[]): number {
  return competencyGap(held, required).matchScore
}

/**
 * The competency debt: total unmet proficiency points across the required set —
 * the conserved deficit training must off-gas before the actor surfaces at the
 * role. Drives to 0 as gaps close (the convergence tail).
 */
export function competencyDebt(held: HeldLine[], required: RequiredLine[]): number {
  return competencyGap(held, required).gaps.reduce((sum, g) => sum + g.gap, 0)
}

/** One step of the auto-train plan: the gap, and the `skillRoute` (SKILL.md node) that closes it. */
export interface TrainingStep {
  competency: string | number
  /** required − held (> 0). */
  gap: number
  /** the SKILL.md route that closes this gap (the competency's `skillRoute`); '' when unknown. */
  skillRoute: string
  mandatory: boolean
}

/**
 * The auto-train plan: every open gap, routed to the skill that closes it, ordered
 * MANDATORY-first then by largest gap — drive the binding tail to zero first (the
 * `tsc`/[[aura]]/breath convergence, aimed at the actor). `routeOf` maps a competency
 * to its `skillRoute`; a missing route yields '' (the step is still listed, never dropped).
 */
export function trainingPlan(
  held: HeldLine[],
  required: RequiredLine[],
  routeOf: (competency: string | number) => string | undefined = () => undefined,
): TrainingStep[] {
  return competencyGap(held, required)
    .gaps.filter((g) => g.gap > 0)
    .map((g) => ({ competency: g.competency, gap: g.gap, skillRoute: routeOf(g.competency) ?? '', mandatory: g.mandatory }))
    .sort((a, b) => Number(b.mandatory) - Number(a.mandatory) || b.gap - a.gap)
}

/** The single next move: the most binding gap to close (the one breath), or null when the actor has surfaced. */
export function nextStep(
  held: HeldLine[],
  required: RequiredLine[],
  routeOf: (competency: string | number) => string | undefined = () => undefined,
): TrainingStep | null {
  return trainingPlan(held, required, routeOf)[0] ?? null
}

/**
 * Pay the actor's CURRENT efficiency on the one [[decompression]] curve: the earned
 * harmonic climbs from the fundamental toward the role's M-value ceiling
 * (`levelCeiling(level)`) as efficiency → 1. At efficiency 0 ⇒ base (`anchor`); at
 * the surface ⇒ `anchor × M`. Training literally raises pay — the incentive and the
 * efficiency are the same number. A throttling `gf` may cap how much unverified
 * competence banks early (the gradient-factor band).
 */
export function efficiencyRate(
  held: HeldLine[],
  required: RequiredLine[],
  level: number,
  anchor: number = ANCHOR,
  gf: GradientFactors = {},
): number {
  const fraction = efficiency(held, required)
  const banked = gf.gfLo == null && gf.gfHi == null ? fraction : fraction * gradientCap(gf)
  return rateAtFraction(levelCeiling(level), banked, anchor)
}

/** The surface cap from the gradient-factor band: how much of full efficiency may bank as pay (default 1). */
function gradientCap(gf: GradientFactors): number {
  const hi = gf.gfHi ?? 1
  return hi < 0 ? 0 : hi > 1 ? 1 : hi
}

/** Has the actor surfaced — every mandatory competency met (safe to staff the role, the close gate)? */
export function isProficient(held: HeldLine[], required: RequiredLine[]): boolean {
  return competencyGap(held, required).meetsAllMandatory
}

/** One quantum research wave of the training plan: an antichain of steps trainable NOW, in parallel. */
export interface TrainingWave {
  readonly ordinal: number
  readonly steps: readonly TrainingStep[]
}

/**
 * The auto-train plan levelled into QUANTUM RESEARCH WAVES — `wavesOf` ([[theorem]]) over the
 * competency prerequisite DAG. A linear plan answers 0/1 per step; the wave view is the quantum
 * one: each wave is an antichain whose every step is open SIMULTANEOUSLY (the superposition an
 * actor may enroll across), and certification collapses the wave, opening the next. Wave count =
 * the longest prerequisite chain (Mirsky) = the fewest sequential training rounds possible; the
 * widest wave = maximum parallel enrollment. `prereqOf` is DECLARED, never inferred — which
 * competency presupposes which is a meaning judgement written in the open so it can be argued
 * with (the same computed/declared split as [[rules]]/audience); a prerequisite already HELD is
 * satisfied and does not level the wave. Loading is enrollment: an agent's uncertified load is a
 * wave-0 step here, and the certification that collapses it is the seal the load needs.
 */
export function trainingWaves(
  held: HeldLine[],
  required: RequiredLine[],
  routeOf: (competency: string | number) => string | undefined = () => undefined,
  prereqOf: (competency: string | number) => readonly (string | number)[] = () => [],
): TrainingWave[] {
  const plan = trainingPlan(held, required, routeOf)
  const open = new Set(plan.map((s) => String(s.competency)))
  const deps = new Map(
    plan.map((s) => [
      String(s.competency),
      prereqOf(s.competency)
        .map(String)
        .filter((p) => open.has(p)),
    ]),
  )
  const byName = new Map(plan.map((s) => [String(s.competency), s]))
  return wavesOf(deps)
    .map((names, ordinal) => ({
      ordinal,
      steps: names
        .map((n) => byName.get(n)!)
        .sort((a, b) => Number(b.mandatory) - Number(a.mandatory) || b.gap - a.gap),
    }))
    .filter((w) => w.steps.length > 0)
}

/** Depth (fewest sequential rounds) and parallelism (widest enrollment) of the training DAG. */
export function trainingWaveShape(waves: readonly TrainingWave[]): { readonly depth: number; readonly parallelism: number } {
  return { depth: waves.length, parallelism: Math.max(0, ...waves.map((w) => w.steps.length)) }
}
