/**
 * training-broadcast — the Payload afterChange that arms the auto-train loop.
 *
 * The live breath for [[train]]: when a `job-positions` row changes, this hook
 * measures its incumbent's held competencies against the role's required set,
 * projects a `competency:assessed` event, and dispatches it into the shared
 * society runtime — where `HrAgent` prices the gap on the [[decompression]] curve
 * and BROADCASTS the training plan (its emit becomes the next society row, the
 * same substrate as `chat-broadcast`). Editing a role's requirements, or its
 * incumbent's proficiency, now ripples out as a priced, routed training plan with
 * no human in the loop — the gap-closing breath aimed at the workforce.
 *
 * The schema-aware parts live HERE (the impure edge): the 11-rung org ladder →
 * SFIA 1..7 map, the relationship-id extraction, the skillRoute lookup. The math
 * stays pure in `@/train` / `@/decompression`, and the projection
 * (`buildAssessedEvent`) is pure + tested — the hook is the thin impure glue,
 * guarded so a reaction never breaks the original write.
 *
 * @standard SFIA 8 responsibility-levels (the level → M-value depth)
 * @standard ISO 30405:2016 essential-vs-desirable (mandatory gates the surface)
 * @see ./chat-broadcast (the sibling room breath this mirrors)
 */
import type { CollectionAfterChangeHook } from 'payload'
import type { AgentContext, DomainEvent } from '../types'
import type { HeldLine, RequiredLine } from '@/competency/gap'
import { processEffects } from '../effect-processor'
import { createAgentContext } from '../context'
import { AGENT_RUNTIME_GRANT, defaultAgentLawState } from '../strict-apply'
import { TRAINING_TRIGGER } from '@/agents/registered'
import { chatEmit, type ChatClient } from './payload-chat'

/** The 11-rung org ladder (`job-positions.level`) → SFIA responsibility level 1..7 (the M-value depth). */
export const JOB_LEVEL_TO_SFIA: Readonly<Record<string, number>> = {
  intern: 1, junior: 2, mid: 3, senior: 4, staff: 5, principal: 6,
  manager_m1: 5, manager_m2: 6, director: 6, vp: 7, c_suite: 7,
}

/** Map an org-ladder level to SFIA 1..7; unknown/blank ⇒ 1 (the fundamental — natural default). */
export function sfiaLevelOf(value: unknown): number {
  return (typeof value === 'string' && JOB_LEVEL_TO_SFIA[value]) || 1
}

/** Extract a relationship's id whether it is a raw id or a populated `{ id }` doc. */
const relId = (c: unknown): string =>
  String(c != null && typeof c === 'object' ? ((c as { id?: unknown }).id ?? '') : (c ?? ''))

/** Normalise a doc's `competencies[]` (held) lines to the pure `HeldLine` shape. */
export function normalizeHeld(lines: unknown): HeldLine[] {
  if (!Array.isArray(lines)) return []
  return lines.map((l) => {
    const r = l as Record<string, unknown>
    return { competency: relId(r.competency), proficiency: typeof r.proficiency === 'number' ? r.proficiency : 0 }
  })
}

/** Normalise a doc's `requiredCompetencies[]` lines to the pure `RequiredLine` shape. */
export function normalizeRequired(lines: unknown): RequiredLine[] {
  if (!Array.isArray(lines)) return []
  return lines.map((l) => {
    const r = l as Record<string, unknown>
    return {
      competency: relId(r.competency),
      minProficiency: typeof r.minProficiency === 'number' ? r.minProficiency : 1,
      mandatory: r.mandatory !== false,
    }
  })
}

/** Inputs to the pure projection — already resolved by the impure hook. */
export interface AssessedInput {
  tenantId: string
  actorId: string
  positionId?: string
  level: number
  held: HeldLine[]
  required: RequiredLine[]
  routes: Record<string, string>
  emittedAt: string
}

/** Pure: assemble the `competency:assessed` event the runtime dispatches (null when there is nothing to assess). */
export function buildAssessedEvent(input: AssessedInput): DomainEvent | null {
  if (!input.tenantId || !input.actorId || input.required.length === 0) return null
  return {
    id: TRAINING_TRIGGER,
    tenantId: input.tenantId,
    aggregateId: input.actorId,
    emittedAt: input.emittedAt,
    payload: {
      actorId: input.actorId,
      positionId: input.positionId,
      level: input.level,
      held: input.held,
      required: input.required,
      routes: input.routes,
    },
  }
}

const tenantIdOf = (t: unknown): string | null =>
  typeof t === 'string' ? t : t && typeof t === 'object' && typeof (t as { id?: unknown }).id === 'string' ? (t as { id: string }).id : null

/**
 * afterChange on `job-positions` — arm the auto-train loop. Resolves the
 * incumbent's held competencies + each required competency's skillRoute, builds
 * the `competency:assessed` event, dispatches it into the shared runtime, and
 * processes the agents' effects (HrAgent's priced plan broadcasts as the next
 * society row). Vacant role or no requirements ⇒ no-op. Guarded + dynamic-import,
 * mirroring `chatBroadcastAfterChange`.
 */
export function trainingAfterChange(): CollectionAfterChangeHook {
  return async ({ doc, req, operation }) => {
    if (operation !== 'create' && operation !== 'update') return doc
    const row = doc as Record<string, unknown>
    const tenantId = tenantIdOf(row.tenant)
    const incumbentId = relId(row.currentEmployee)
    const required = normalizeRequired(row.requiredCompetencies)
    if (!tenantId || !incumbentId || required.length === 0) return doc // vacant / no requirements ⇒ nothing to train
    try {
      const employee = await req.payload.findByID({ collection: 'employees', id: incumbentId, depth: 0, overrideAccess: true } as never)
      const held = normalizeHeld((employee as unknown as Record<string, unknown> | null)?.competencies)
      const routes = resolveRoutes(required.map((r) => String(r.competency)))
      const ev = buildAssessedEvent({
        tenantId,
        actorId: incumbentId,
        positionId: String(row.id ?? ''),
        level: sfiaLevelOf(row.level),
        held,
        required,
        routes,
        emittedAt: typeof row.updatedAt === 'string' ? row.updatedAt : new Date().toISOString(),
      })
      if (!ev) return doc
      const { agentRuntime } = await import('@/agent/bootstrap')
      const { createInProcessMcpClient } = await import('@/agents/mcp/in-process-client')
      const { buildErpaxMcpTools } = await import('@/agents/mcp/tool-defs')
      const law = defaultAgentLawState({
        depth: 1,
        actor: 'training-broadcast',
        grant: AGENT_RUNTIME_GRANT,
        untrustedPayload: ev.payload,
      })
      const ctx: AgentContext = createAgentContext({
        runtime: agentRuntime,
        payload: req.payload,
        tenantId,
        law,
        mcp: createInProcessMcpClient(buildErpaxMcpTools(agentRuntime.registry as never), req, { law }),
        emit: chatEmit(req.payload as unknown as ChatClient, 1), // the priced plan broadcasts as a society row
      })
      const effects = await agentRuntime.dispatchEvent(ctx, ev)
      await processEffects(effects, ctx)
    } catch (err) {
      req.payload.logger.warn({ err }, `auto-train broadcast failed for job-position ${String(row.id ?? '')}`)
    }
    return doc
  }
}

/**
 * The competency value IS the skillRoute now — the content-address into the corpus
 * (services/skill-router/competencies), not a row id to look up. So the id→route map is identity;
 * no `competencies` collection lookup (the collection collapsed; competencies are computed-on-read).
 */
function resolveRoutes(ids: string[]): Record<string, string> {
  const routes: Record<string, string> = {}
  for (const id of ids) if (id) routes[id] = id
  return routes
}
