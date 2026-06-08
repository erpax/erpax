/**
 * DataAgent — owns AI suggestions + currency rates + FX transactions.
 * Slice HHHHH (2026-05-11). Drives metrics + dashboards (downstream).
 *
 * @standard ISO 20022 + ECB FX-rates
 * @feature data_analytics
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '@/agent'
import type { SpecChainStep } from '@/spec/generator'

export const DataAgent: DomainAgent = {
  id: 'data',
  ownsCollections: ['ai-suggestions', 'currency-rates', 'fx-transactions'],
  subscribesTo: ['fx:rate:updated', 'ai:suggestion:generated'],
  emits: ['fx:rate:updated', 'ai:suggestion:generated'],
  cron: '0 6 * * *',  // daily 06:00 UTC FX rate sync
  async onChainStep(ctx, step: SpecChainStep) {
    const collection = step.note?.match(/\bcollection=([\w-]+)/)?.[1]
    const action = step.note?.match(/\baction=([\w-]+)/)?.[1]
    if (!collection || !this.ownsCollections.includes(collection)) return []
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: collection, subjectId: 'pending', action: action ?? 'unknown', chainId: step.chainId, chainStepId: `${String(step.stepIndex).padStart(2, '0')}-${collection}-${action ?? 'step'}` } }]
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'data-handled-event' } }]
  },
  async onSchedule(ctx): Promise<AgentEffect[]> {
    return [{ kind: 'emit', event: { id: 'fx:rate:sync:requested', tenantId: ctx.tenantId, payload: {}, emittedAt: new Date().toISOString() } }]
  },
}
