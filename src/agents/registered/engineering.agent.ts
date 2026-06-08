/**
 * EngineeringAgent — owns SOX control tests + audit findings + audit events.
 * Slice HHHHH (2026-05-11). Subscribes to every conservation-invariant failure.
 *
 * @standard SOX §404 + ISO 19011:2018 §6.4.6 + COSO 2013
 * @feature engineering_quality
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '@/agent'
import type { SpecChainStep } from '@/spec/generator'

export const EngineeringAgent: DomainAgent = {
  id: 'engineering',
  ownsCollections: ['control-tests', 'audit-findings', 'audit-events', 'audit-trail', 'transaction-failures'],
  subscribesTo: ['invariant:failed', 'control:test:run', 'finding:remediated'],
  emits: ['control:test:run', 'finding:filed', 'finding:remediated'],
  async onChainStep(ctx, step: SpecChainStep) {
    const collection = step.note?.match(/\bcollection=([\w-]+)/)?.[1]
    const action = step.note?.match(/\baction=([\w-]+)/)?.[1]
    if (!collection || !this.ownsCollections.includes(collection)) return []
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: collection, subjectId: 'pending', action: action ?? 'unknown', chainId: step.chainId, chainStepId: `${String(step.stepIndex).padStart(2, '0')}-${collection}-${action ?? 'step'}` } }]
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'engineering-handled-event' } }]
  },
}
