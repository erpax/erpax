/**
 * ProductivityAgent — owns workflow definitions + instances + activities.
 * Slice IIIII (2026-05-11). Drives WORKFLOW_APPROVAL_CYCLE chain.
 *
 * @feature workflow_engine
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '@/agent'
import type { SpecChainStep } from '@/spec/generator'
import { ownedChainStepAudit } from './step'

export const ProductivityAgent: DomainAgent = {
  id: 'productivity',
  ownsCollections: ['workflow-definitions', 'workflow-instances', 'activities'],
  subscribesTo: ['workflow:started', 'workflow:approved', 'workflow:rejected'],
  emits: ['workflow:started', 'workflow:approved', 'workflow:rejected'],
  async onChainStep(ctx, step: SpecChainStep) {
    return ownedChainStepAudit(ctx, step, this.ownsCollections)
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'productivity-handled-event' } }]
  },
}
