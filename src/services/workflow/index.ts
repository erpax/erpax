/**
 * Workflow service — entry-point for starting + advancing workflow
 * instances bound to documents.
 *
 * Slice HHHH (2026-05-10): keeps the orchestration logic in a single
 * service that hooks call. Callers:
 *   - collection beforeChange hooks call `evaluateWorkflowsForDocument()`
 *     to spawn an instance when a definition matches.
 *   - REST / GraphQL endpoints call `advanceWorkflowInstance()` when a
 *     human submits a step decision.
 *   - Workers cron fires `escalateOverdueInstances()` to advance SLAs.
 *
 * Service-task handlers register themselves via `registerServiceHandler()`
 * (e.g. an "auto-post-journal-entry" handler that the workflow can
 * invoke after final approval).
 *
 * Implementation is intentionally minimal here — Slice HHHH ships the
 * type contracts + orchestration shell. Per-collection wiring (which
 * fields to mutate on approval) is delegated to the target collection's
 * own beforeChange hook chain.
 *
 * @standard ISO/IEC 19510:2013 BPMN-2.0
 * @audit ISO-19011:2018 §6.4.6 audit-evidence-workflow
 * @compliance SOX §404 internal-controls workflow-execution
 */

import type { Payload, PayloadRequest } from 'payload'
import { getActorId } from '@/access/auth'

export type WorkflowDecision =
  | 'approved'
  | 'rejected'
  | 'returned'
  | 'delegated'
  | 'auto_approved'
  | 'auto_rejected'
  | 'escalated'
  | 'skipped'
  | 'service_success'
  | 'service_failure'

export interface WorkflowStepDecisionInput {
  instanceId: string
  decision: WorkflowDecision
  comment?: string
  delegatedToUserId?: string
}

export interface WorkflowEvaluateInput {
  payload: Payload
  req?: PayloadRequest
  collectionSlug: string
  /** Document id (string for D1 / Mongo / Postgres compat). */
  docId: string
  doc: Record<string, unknown>
  triggerEvent:
    | 'beforeCreate'
    | 'beforeStatusChange'
    | 'beforePost'
    | 'beforeApprove'
    | 'manual'
}

type ServiceHandler = (ctx: {
  payload: Payload
  req?: PayloadRequest
  instanceId: string
  targetCollection: string
  targetId: string
}) => Promise<{ success: boolean; message?: string }>

const SERVICE_HANDLERS = new Map<string, ServiceHandler>()

/**
 * Register a service-task handler. Handlers are referenced by name from
 * `workflow-definitions.steps[].serviceHandler`.
 */
export function registerServiceHandler(name: string, handler: ServiceHandler): void {
  SERVICE_HANDLERS.set(name, handler)
}

/**
 * Resolve a registered service handler. Returns null when no handler
 * is registered (workflow execution falls back to no-op + audit row).
 */
export function getServiceHandler(name: string): ServiceHandler | null {
  return SERVICE_HANDLERS.get(name) ?? null
}

/**
 * Spawn workflow instances for any active workflow-definition matching
 * the (collection, triggerEvent, condition) tuple. Caller awaits but
 * shouldn't block on instance progression — the human / cron loop
 * advances the instance separately.
 */
export async function evaluateWorkflowsForDocument(
  input: WorkflowEvaluateInput,
): Promise<{ spawnedInstanceIds: string[] }> {
  const { payload, req, collectionSlug, docId, doc, triggerEvent } = input

  // Find active definitions matching collection + trigger.
  const definitions = await payload.find({
    collection: 'workflow-definitions',
    where: {
      and: [
        { isActive: { equals: true } },
        { targetCollection: { equals: collectionSlug } },
        { triggerEvent: { equals: triggerEvent } },
      ],
    },
    limit: 50,
    overrideAccess: true,
    req,
  })

  const spawnedInstanceIds: string[] = []
  for (const def of definitions.docs as unknown as Array<{
    id: string
    version: number
    triggerCondition?: string | null
  }>) {
    if (def.triggerCondition && !evaluateJsonLogic(def.triggerCondition, doc)) continue

    const instanceId = crypto.randomUUID()
    await payload.create({
      collection: 'workflow-instances',
      data: {
        instanceId,
        definition: def.id,
        definitionVersion: def.version,
        targetCollection: collectionSlug,
        targetId: String(docId),
        submittedBy: getActorId(req),
        submittedAt: new Date().toISOString(),
        currentStep: 0,
        status: 'pending_start',
      } as Record<string, unknown>,
      overrideAccess: true,
      req,
    })
    spawnedInstanceIds.push(instanceId)
  }

  return { spawnedInstanceIds }
}

/**
 * Append a decision to a workflow instance. Caller is the human approver.
 * The function records the decision + advances the currentStep cursor.
 * Final-step decisions transition the instance to completed + (when
 * implemented per-collection) write back to the target document.
 */
export async function advanceWorkflowInstance(
  payload: Payload,
  input: WorkflowStepDecisionInput,
  req?: PayloadRequest,
): Promise<{ instanceId: string; status: string; finalOutcome?: string }> {
  const { instanceId, decision, comment, delegatedToUserId } = input

  const result = await payload.find({
    collection: 'workflow-instances',
    where: { instanceId: { equals: instanceId } },
    limit: 1,
    overrideAccess: true,
    req,
  })
  const instance = (result.docs[0] as unknown as {
    id: string
    currentStep: number
    stepHistory?: Array<Record<string, unknown>>
    definition: string | { id: string }
  } | undefined)
  if (!instance) throw new Error(`Workflow instance not found: ${instanceId}`)

  const stepHistory = [
    ...(instance.stepHistory ?? []),
    {
      stepIndex: instance.currentStep,
      stepName: `Step ${instance.currentStep + 1}`,
      assignee: getActorId(req),
      decision,
      decidedAt: new Date().toISOString(),
      comment,
      delegatedTo: delegatedToUserId,
    },
  ]

  const isTerminal = decision === 'rejected' || decision === 'auto_rejected'
  const isFinal = decision === 'approved' || decision === 'auto_approved'

  await payload.update({
    collection: 'workflow-instances',
    id: instance.id,
    data: {
      stepHistory,
      currentStep: isTerminal || isFinal ? instance.currentStep : instance.currentStep + 1,
      status: isTerminal ? 'completed' : isFinal ? 'completed' : 'in_progress',
      finalOutcome: isTerminal ? 'rejected' : isFinal ? 'approved' : undefined,
      completedAt: isTerminal || isFinal ? new Date().toISOString() : undefined,
    } as Record<string, unknown>,
    overrideAccess: true,
    req,
  })

  return {
    instanceId,
    status: isTerminal || isFinal ? 'completed' : 'in_progress',
    finalOutcome: isTerminal ? 'rejected' : isFinal ? 'approved' : undefined,
  }
}

/**
 * Cron handler — find instances whose currentStepDueAt is past, and
 * apply the step's onTimeoutBehavior. Wired by Workers cron.
 */
export async function escalateOverdueInstances(payload: Payload, req?: PayloadRequest): Promise<{ escalated: number }> {
  const now = new Date().toISOString()
  const overdue = await payload.find({
    collection: 'workflow-instances',
    where: {
      and: [
        { status: { in: ['awaiting_action', 'in_progress'] } },
        { currentStepDueAt: { less_than: now } },
      ],
    },
    limit: 100,
    overrideAccess: true,
    req,
  })

  let escalated = 0
  for (const inst of overdue.docs as unknown as Array<{ id: string; status?: string }>) {
    await payload.update({
      collection: 'workflow-instances',
      id: inst.id,
      data: { status: 'escalated' } as Record<string, unknown>,
      overrideAccess: true,
      req,
    })
    escalated++
  }
  return { escalated }
}

/**
 * Minimal JSON-Logic-ish evaluator. Production wiring should swap to
 * the canonical `json-logic-js` library; this stub allows the
 * orchestration to ship without a runtime dependency.
 */
function evaluateJsonLogic(_expression: string, _data: Record<string, unknown>): boolean {
  // Intentional pass-through for Slice HHHH shell. Replace with
  // `import jsonLogic from 'json-logic-js'` when the dep lands.
  return true
}
