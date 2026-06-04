/**
 * MarketingAgent — owns forms / form-submissions; subscribes to lead lifecycle to drive nurture.
 * Slice GGGGG (2026-05-11).
 *
 * @standard GDPR consent-tracking @feature marketing
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '@/agent/types'
import type { SpecChainStep } from '@/spec/generator'

export const MarketingAgent: DomainAgent = {
  id: 'marketing',
  ownsCollections: ['forms', 'form-submissions'],
  subscribesTo: ['form:submitted', 'lead:qualified', 'opp:won'],
  emits: ['campaign:dispatched', 'form:submitted'],
  async onChainStep(ctx, step: SpecChainStep) {
    const collection = step.note?.match(/\bcollection=([\w-]+)/)?.[1]
    const action = step.note?.match(/\baction=([\w-]+)/)?.[1]
    if (!collection || !this.ownsCollections.includes(collection)) return []
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: collection, subjectId: 'pending', action: action ?? 'unknown', chainId: step.chainId, chainStepId: `${String(step.stepIndex).padStart(2, '0')}-${collection}-${action ?? 'step'}` } }]
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'marketing-handled-event' } }]
  },
}
