/**
 * CustomerSupportAgent — owns customer feedback + comments; subscribes to escalations.
 * Slice HHHHH (2026-05-11).
 *
 * @feature customer_support
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '@/agent/types'
import type { SpecChainStep } from '@/spec/generator'

export const CustomerSupportAgent: DomainAgent = {
  id: 'customer-support',
  ownsCollections: ['comments'],
  subscribesTo: ['escalation:raised', 'customer:complaint', 'sla:breached'],
  emits: ['ticket:opened', 'ticket:resolved'],
  async onChainStep(ctx, step: SpecChainStep) {
    const collection = step.note?.match(/\bcollection=([\w-]+)/)?.[1]
    const action = step.note?.match(/\baction=([\w-]+)/)?.[1]
    if (!collection || !this.ownsCollections.includes(collection)) return []
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: collection, subjectId: 'pending', action: action ?? 'unknown', chainId: step.chainId, chainStepId: `${String(step.stepIndex).padStart(2, '0')}-${collection}-${action ?? 'step'}` } }]
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'customer-support-handled-event' } }]
  },
}
