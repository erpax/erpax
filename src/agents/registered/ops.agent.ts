/**
 * OpsAgent — owns vendors + facility maintenance + procurement extensions.
 * Slice GGGGG (2026-05-11). Drives FACILITY_MAINTENANCE_CYCLE chain.
 *
 * @standard ISO 41001 facility-management + ISO 55000 asset-management
 * @feature operations
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '@/agent/types'
import type { SpecChainStep } from '@/spec/generator'

export const OpsAgent: DomainAgent = {
  id: 'ops',
  ownsCollections: ['vendors', 'vendor-quotes', 'vendor-scorecards', 'maintenance-requests', 'maintenance-work-orders', 'quality-inspections', 'warehouse-locations', 'carriers'],
  subscribesTo: ['vendor:onboarded', 'maintenance:scheduled', 'maintenance:completed'],
  emits: ['vendor:onboarded', 'maintenance:scheduled', 'maintenance:completed'],
  async onChainStep(ctx, step: SpecChainStep) {
    const collection = step.note?.match(/\bcollection=([\w-]+)/)?.[1]
    const action = step.note?.match(/\baction=([\w-]+)/)?.[1]
    if (!collection || !this.ownsCollections.includes(collection)) return []
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: collection, subjectId: 'pending', action: action ?? 'unknown', chainId: step.chainId, chainStepId: `${String(step.stepIndex).padStart(2, '0')}-${collection}-${action ?? 'step'}` } }]
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'ops-handled-event' } }]
  },
}
