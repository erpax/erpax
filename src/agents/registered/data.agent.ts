/**
 * DataAgent — owns AI suggestions + currency rates + FX transactions.
 * Slice HHHHH (2026-05-11). Drives metrics + dashboards (downstream).
 *
 * @standard ISO 20022 + ECB FX-rates
 * @feature data_analytics
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '@/agent'
import type { SpecChainStep } from '@/spec/generator'
import { ownedChainStepAudit } from './step'

export const DataAgent: DomainAgent = {
  id: 'data',
  ownsCollections: ['ai-suggestions', 'currency-rates', 'fx-transactions'],
  subscribesTo: ['fx:rate:updated', 'ai:suggestion:generated'],
  emits: ['fx:rate:updated', 'ai:suggestion:generated'],
  cron: '0 6 * * *',  // daily 06:00 UTC FX rate sync
  async onChainStep(ctx, step: SpecChainStep) {
    return ownedChainStepAudit(ctx, step, this.ownsCollections)
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'data-handled-event' } }]
  },
  async onSchedule(ctx): Promise<AgentEffect[]> {
    return [{ kind: 'emit', event: { id: 'fx:rate:sync:requested', tenantId: ctx.tenantId, payload: {}, emittedAt: new Date().toISOString() } }]
  },
}
