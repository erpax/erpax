/**
 * OpsAgent — owns vendors + facility maintenance + procurement extensions.
 * Slice GGGGG (2026-05-11). Drives FACILITY_MAINTENANCE_CYCLE chain.
 *
 * @standard ISO 41001 facility-management + ISO 55000 asset-management
 * @feature operations
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '@/agent'
import type { SpecChainStep } from '@/spec/generator'
import { ownedChainStepAudit } from './step'

export const OpsAgent: DomainAgent = {
  id: 'ops',
  ownsCollections: ['vendors', 'vendor-quotes', 'vendor-scorecards', 'maintenance-requests', 'maintenance-work-orders', 'quality-inspections', 'warehouse-locations', 'carriers'],
  subscribesTo: ['vendor:onboarded', 'maintenance:scheduled', 'maintenance:completed'],
  emits: ['vendor:onboarded', 'maintenance:scheduled', 'maintenance:completed'],
  async onChainStep(ctx, step: SpecChainStep) {
    return ownedChainStepAudit(ctx, step, this.ownsCollections)
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'ops-handled-event' } }]
  },
}
