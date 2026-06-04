/**
 * SalesAgent — owns the lead → quote pipeline (CRM_LEAD_TO_CASH chain).
 * Slice GGGGG (2026-05-11). Hands off to FinanceAgent at invoice activation.
 *
 * @standard IFRS IFRS-15 §9 contract-with-customer
 * @feature crm @role sales — write @role sales-manager — write
 */
import type { DomainAgent, AgentContext, AgentEffect, DomainEvent } from '@/services/agents/types'
import type { SpecChainStep } from '@/services/spec-generator'

export const SalesAgent: DomainAgent = {
  id: 'sales',
  ownsCollections: ['customers', 'customer-segments', 'leads', 'opportunities', 'quotes'],
  subscribesTo: ['lead:qualified', 'opp:won', 'quote:sent', 'contract:signed'],
  emits: ['lead:qualified', 'opp:won', 'quote:sent'],
  async onChainStep(ctx: AgentContext, step: SpecChainStep): Promise<AgentEffect[]> {
    const collection = step.note?.match(/\bcollection=([\w-]+)/)?.[1]
    const action = step.note?.match(/\baction=([\w-]+)/)?.[1]
    if (!collection || !this.ownsCollections.includes(collection)) return []
    return [{
      kind: 'audit',
      leaf: { tenantId: ctx.tenantId, subjectCollection: collection, subjectId: 'pending', action: action ?? 'unknown', chainId: step.chainId, chainStepId: `${String(step.stepIndex).padStart(2, '0')}-${collection}-${action ?? 'step'}` },
    }]
  },
  async onEvent(ctx: AgentContext, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'sales-handled-event' } }]
  },
}
