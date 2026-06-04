/**
 * ProductAgent — owns project work (milestones, tasks, projects).
 * Slice HHHHH (2026-05-11).
 *
 * @standard PMI PMBOK 7th-edition project-management
 * @feature project_management
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '@/agent/types'
import type { SpecChainStep } from '@/spec/generator'

export const ProductAgent: DomainAgent = {
  id: 'product',
  ownsCollections: ['project-milestones', 'project-tasks', 'projects'],
  subscribesTo: ['milestone:reached', 'project:completed'],
  emits: ['milestone:reached', 'project:completed'],
  async onChainStep(ctx, step: SpecChainStep) {
    const collection = step.note?.match(/\bcollection=([\w-]+)/)?.[1]
    const action = step.note?.match(/\baction=([\w-]+)/)?.[1]
    if (!collection || !this.ownsCollections.includes(collection)) return []
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: collection, subjectId: 'pending', action: action ?? 'unknown', chainId: step.chainId, chainStepId: `${String(step.stepIndex).padStart(2, '0')}-${collection}-${action ?? 'step'}` } }]
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'product-handled-event' } }]
  },
}
