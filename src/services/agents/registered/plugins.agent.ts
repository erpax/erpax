/**
 * PluginsAgent — owns industry-templates + per-country-compliance.
 * Slice IIIII (2026-05-11). Manages the plugin marketplace surface (BBBBB future).
 *
 * @feature plugin_marketplace
 */
import type { DomainAgent, AgentEffect, DomainEvent } from '../types'
import type { SpecChainStep } from '@/services/spec-generator'

export const PluginsAgent: DomainAgent = {
  id: 'plugins',
  ownsCollections: ['industry-templates', 'per-country-compliance'],
  subscribesTo: ['plugin:installed', 'plugin:enabled', 'plugin:disabled'],
  emits: ['plugin:installed', 'plugin:enabled', 'plugin:disabled'],
  async onChainStep(ctx, step: SpecChainStep) {
    const collection = step.note?.match(/\bcollection=([\w-]+)/)?.[1]
    const action = step.note?.match(/\baction=([\w-]+)/)?.[1]
    if (!collection || !this.ownsCollections.includes(collection)) return []
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: collection, subjectId: 'pending', action: action ?? 'unknown', chainId: step.chainId, chainStepId: `${String(step.stepIndex).padStart(2, '0')}-${collection}-${action ?? 'step'}` } }]
  },
  async onEvent(ctx, ev: DomainEvent): Promise<AgentEffect[]> {
    return [{ kind: 'audit', leaf: { tenantId: ctx.tenantId, subjectCollection: 'audit-events', subjectId: ev.id, action: 'plugins-handled-event' } }]
  },
}
