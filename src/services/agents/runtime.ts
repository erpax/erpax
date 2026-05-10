/**
 * AgentRuntime — dispatches chain steps + events + scheduled ticks
 * to the owning DomainAgent and processes its returned effects.
 *
 * Slice DDDDD task 4 (2026-05-11). No business logic lives here —
 * it's pure routing. Agents own their own logic; the substrate owns
 * its own side effects; the runtime is the wire.
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability
 */

import type {
  AgentContext, AgentEffect, AgentId, AgentRegistry, AgentRuntime, DomainEvent,
} from './types'
import type { SpecChainStep } from '@/services/spec-generator'
import { processEffects } from './effect-processor'

/**
 * Extract the `collection=<slug>` marker from a chain step's note.
 * Returns undefined when the step lacks the marker — that's a
 * conservation-law violation caught by `checkAgentOwnsEveryStep`
 * (Law 7), not a runtime error.
 */
function collectionFromStep(step: SpecChainStep): string | undefined {
  return step.note?.match(/\bcollection=([\w-]+)/)?.[1]
}

export function createAgentRuntime(registry: AgentRegistry): AgentRuntime {
  return {
    registry,

    async dispatchChainStep(ctx, step) {
      const slug = collectionFromStep(step)
      if (!slug) return []
      const agent = registry.byCollection(slug)
      if (!agent?.onChainStep) return []
      const stepCtx: AgentContext = { ...ctx, chain: { id: step.chainId, step } }
      const effects = await agent.onChainStep(stepCtx, step)
      await processEffects(effects, stepCtx)
      return effects
    },

    async dispatchEvent(ctx, ev: DomainEvent) {
      const subs = registry.bySubscribedEvent(ev.id)
      const all: AgentEffect[] = []
      for (const a of subs) {
        if (!a.onEvent) continue
        const effects = await a.onEvent(ctx, ev)
        await processEffects(effects, ctx)
        all.push(...effects)
      }
      return all
    },

    async dispatchSchedule(ctx, agentId: AgentId) {
      const agent = registry.byId(agentId)
      if (!agent?.onSchedule) return []
      const effects = await agent.onSchedule(ctx)
      await processEffects(effects, ctx)
      return effects
    },
  }
}
