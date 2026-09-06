/**
 * MarketingAgent — owns forms / form-submissions; subscribes to lead lifecycle to drive nurture.
 * Slice GGGGG (2026-05-11).
 *
 * @standard GDPR consent-tracking @feature marketing
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '@/agent'
import type { SpecChainStep } from '@/spec/generator'
import { ownedChainStepAudit } from './step'

export const MarketingAgent: DomainAgent = {
  id: 'marketing',
  ownsCollections: ['forms', 'form-submissions'],
  subscribesTo: ['form:submitted', 'lead:qualified', 'opp:won'],
  emits: ['campaign:dispatched', 'form:submitted'],
  async onChainStep(ctx, step: SpecChainStep) {
    return ownedChainStepAudit(ctx, step, this.ownsCollections)
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'marketing-handled-event' } }]
  },
}
