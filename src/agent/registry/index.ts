/**
 * In-memory AgentRegistry — single source of truth for the A-vortex.
 *
 * Slice DDDDD task 2 (2026-05-11). Built once at boot from the static
 * list of registered DomainAgent implementations; rejects duplicate
 * ids or shared collection ownership at construction time so the
 * build dies before any drift can land in production.
 *
 * Conservation Law 8 (DRY) is enforced statically here: a collection
 * cannot be owned by two agents — there is exactly one owning service
 * for every chain step's `collection=X` marker.
 *
 * @standard ISO/IEC 25010:2023 §5.4 reusability
 * @standard ISO/IEC 12207 software-life-cycle (single-source-of-truth)
 */

import type { AgentId, AgentRegistry, DomainAgent } from '@/agent/types'

export function createAgentRegistry(agents: ReadonlyArray<DomainAgent>): AgentRegistry {
  const byId = new Map<AgentId, DomainAgent>()
  const byCollection = new Map<string, DomainAgent>()
  const byEvent = new Map<string, DomainAgent[]>()

  for (const a of agents) {
    if (byId.has(a.id)) {
      throw new Error(`duplicate agent id: ${a.id}`)
    }
    byId.set(a.id, a)

    for (const slug of a.ownsCollections) {
      const existing = byCollection.get(slug)
      if (existing) {
        throw new Error(
          `collection '${slug}' is owned by both '${existing.id}' and '${a.id}'`,
        )
      }
      byCollection.set(slug, a)
    }

    for (const ev of a.subscribesTo) {
      let arr = byEvent.get(ev)
      if (!arr) {
        arr = []
        byEvent.set(ev, arr)
      }
      arr.push(a)
    }
  }

  return {
    byId: (id) => byId.get(id),
    byCollection: (slug) => byCollection.get(slug),
    bySubscribedEvent: (id) => byEvent.get(id) ?? [],
    scheduled: () => agents.filter((a) => a.cron),
    all: () => agents,
  }
}
