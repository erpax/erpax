/**
 * EnterpriseSearchAgent — owns api-audit-events (search index of cross-system requests).
 * Slice IIIII (2026-05-11). Subscribes to every emit so the search index stays current.
 *
 * @feature enterprise_search
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '@/agent'
import type { SpecChainStep } from '@/spec/generator'
import { ownedChainStepAudit } from './step'

export const EnterpriseSearchAgent: DomainAgent = {
  id: 'enterprise-search',
  ownsCollections: ['api-audit-events'],
  subscribesTo: ['*'],   // observer of every event for the index — the runtime fan-out filters
  emits: ['search:reindexed'],
  cron: '*/30 * * * *',  // re-index every 30 minutes
  async onChainStep(ctx, step: SpecChainStep) {
    return ownedChainStepAudit(ctx, step, this.ownsCollections)
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'api-audit-events', subjectId: ev.id, action: 'index-event' } }]
  },
  async onSchedule(ctx): Promise<AgentEffect[]> {
    return [{ kind: 'emit', event: { id: 'search:reindexed', tenantId: ctx.tenantId, payload: { at: new Date().toISOString() }, emittedAt: new Date().toISOString() } }]
  },
}
