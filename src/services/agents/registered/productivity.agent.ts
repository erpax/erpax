/**
 * ProductivityAgent — owns workflow definitions + instances + activities.
 * Slice IIIII (2026-05-11). Drives WORKFLOW_APPROVAL_CYCLE chain.
 *
 * @feature workflow_engine
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '@/services/agents/types'
import type { SpecChainStep } from '@/services/spec-generator'

export const ProductivityAgent: DomainAgent = {
  id: 'productivity',
  ownsCollections: ['workflow-definitions', 'workflow-instances', 'activities'],
  subscribesTo: ['workflow:started', 'workflow:approved', 'workflow:rejected'],
  emits: ['workflow:started', 'workflow:approved', 'workflow:rejected'],
  async onChainStep(ctx, step: SpecChainStep) {
    const collection = step.note?.match(/\bcollection=([\w-]+)/)?.[1]
    const action = step.note?.match(/\baction=([\w-]+)/)?.[1]
    if (!collection || !this.ownsCollections.includes(collection)) return []
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: collection, subjectId: 'pending', action: action ?? 'unknown', chainId: step.chainId, chainStepId: `${String(step.stepIndex).padStart(2, '0')}-${collection}-${action ?? 'step'}` } }]
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'productivity-handled-event' } }]
  },
}
