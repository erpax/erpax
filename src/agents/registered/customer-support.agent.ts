/**
 * CustomerSupportAgent — owns customer feedback + comments; subscribes to escalations.
 * Slice HHHHH (2026-05-11).
 *
 * @feature customer_support
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '@/agent'
import type { SpecChainStep } from '@/spec/generator'
import { ownedChainStepAudit } from './step'

export const CustomerSupportAgent: DomainAgent = {
  id: 'customer-support',
  ownsCollections: ['comments'],
  subscribesTo: ['escalation:raised', 'customer:complaint', 'sla:breached'],
  emits: ['ticket:opened', 'ticket:resolved'],
  async onChainStep(ctx, step: SpecChainStep) {
    return ownedChainStepAudit(ctx, step, this.ownsCollections)
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'customer-support-handled-event' } }]
  },
}
