/**
 * hr.training — the HrAgent's auto-train capability as a PURE transform.
 *
 * The live loop's agent-effect half: a `competency:assessed` event (an actor's
 * held competencies measured against a role's required set) becomes the priced
 * training move. It off-gasses the [[train]] way — compute the actor's efficiency
 * (the competency match-score = etrima's `efficiency_percent`), price it on the
 * [[decompression]] curve toward the role's M-value, and return three effects:
 *   - `emit training:planned` — BROADCAST the plan + efficiency + rate over the
 *     society bus (every subscriber sees it; the agent-sync breath);
 *   - `audit` — the priced verification leaf (deterministic, ISO-19011);
 *   - `notify` — route the actor to the next skill to load (its `skillRoute`),
 *     iff a gap remains. Surfaced ⇒ no nudge.
 *
 * Pure: everything is read from the event payload (the impure hook resolved the
 * held/required/routes), so this is a trivially testable function — the same
 * pure/injected split as `chat-broadcast`'s `chatDocToDomainEvent`.
 *
 * @standard SFIA 8 responsibility-levels (the level → M-value depth)
 * @audit ISO 19011 — the plan, the rate and the debt are deterministic functions of the gap
 */
import type { AgentEffect, DomainEvent } from '@/services/agents/types'
import { competencyDebt, efficiency, efficiencyRate, isProficient, nextStep, trainingPlan } from '@/train'
import type { HeldLine, RequiredLine } from '@/services/competency-gap'
import { ANCHOR } from '@/services/allocation'
import { levelCeiling } from '@/decompression'

/** The event the loop reacts to (an actor's competencies assessed against a role). */
export const TRAINING_TRIGGER = 'competency:assessed'
/** The event the loop broadcasts (the priced training plan). */
export const TRAINING_EMIT = 'training:planned'

interface AssessedPayload {
  actorId: string
  positionId?: string
  /** SFIA responsibility level 1..7 (the M-value depth). */
  level: number
  held: HeldLine[]
  required: RequiredLine[]
  /** competency-id → skillRoute (the SKILL.md node that closes that gap). */
  routes: Record<string, string>
}

/** Read the assessed payload defensively; null ⇒ not a training event (no held/required ⇒ nothing to price). */
function readAssessed(ev: DomainEvent): AssessedPayload | null {
  const p = ev.payload as Record<string, unknown> | undefined
  if (!p || !Array.isArray(p.held) || !Array.isArray(p.required)) return null
  return {
    actorId: String(p.actorId ?? ''),
    positionId: p.positionId != null ? String(p.positionId) : undefined,
    level: typeof p.level === 'number' ? p.level : 1, // natural default: the fundamental
    held: p.held as HeldLine[],
    required: p.required as RequiredLine[],
    routes: p.routes && typeof p.routes === 'object' ? (p.routes as Record<string, string>) : {},
  }
}

/**
 * The pure agent-effect: a `competency:assessed` event → the priced training-plan
 * effects (broadcast + audit + nudge). Returns [] for a non-training event.
 */
export function planTrainingEffects(ev: DomainEvent): AgentEffect[] {
  const a = readAssessed(ev)
  if (!a) return []
  const routeOf = (c: string | number): string | undefined => a.routes[String(c)]

  const eff = efficiency(a.held, a.required) // 0..1 — the off-gassed fraction
  const hourlyRate = efficiencyRate(a.held, a.required, a.level) // priced on the decompression curve
  const ceilingRate = ANCHOR * levelCeiling(a.level) // the surface — pay at full proficiency
  const debt = competencyDebt(a.held, a.required)
  const plan = trainingPlan(a.held, a.required, routeOf)
  const next = nextStep(a.held, a.required, routeOf)

  const effects: AgentEffect[] = [
    {
      kind: 'emit',
      event: {
        id: TRAINING_EMIT,
        tenantId: ev.tenantId,
        aggregateId: a.actorId, // the event is ABOUT the actor (not a payload hash)
        emittedAt: ev.emittedAt, // reuse the trigger's stamp — keeps this transform pure
        payload: {
          actorId: a.actorId,
          positionId: a.positionId,
          efficiency: eff,
          hourlyRate,
          ceilingRate,
          debt,
          proficient: isProficient(a.held, a.required),
          nextStep: next,
          plan,
        },
      },
    },
    {
      kind: 'audit',
      leaf: { tenantId: ev.tenantId, subjectCollection: 'employees', subjectId: a.actorId, action: 'training-priced' },
    },
  ]
  if (next) {
    // route the actor to the skill that closes the most-binding gap — auto-training
    effects.push({
      kind: 'notify',
      channel: 'training',
      templateKey: 'training.next',
      vars: {
        actorId: a.actorId,
        competency: String(next.competency),
        gap: next.gap,
        skillRoute: next.skillRoute,
        hourlyRate,
        ceilingRate,
      },
    })
  }
  return effects
}
