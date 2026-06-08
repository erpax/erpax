/**
 * agent — an agent IS its content; cloning is content-addressing.
 *
 * The `self`/`holographic`/`merge` law made executable. An agent is defined by
 * what it LOADS (its skills) and what it is FOR (its purpose) — and its identity
 * is the content-uuid of that definition. Three consequences, each a law:
 *
 *   1. An identical clone has the IDENTICAL uuid → it is not a copy, it is the
 *      SAME agent appearing in two places (federation; "all agents are one").
 *   2. To create a DISTINCT agent you must SPECIALISE it — change its content
 *      (add a skill, narrow the purpose) → a new uuid → a child agent.
 *   3. A whole swarm of identical clones collapses to ONE uuid (the merge):
 *      replication is free and self-deduplicating.
 *
 * So "send the agents to clone themselves" is governed, not chaotic: a running
 * agent clones by publishing its AgentDef over agent-sync; an identical clone
 * merges away, a specialised clone is a new content-addressed child that boots
 * its skill-set from the akashic record (holographic regeneration). Pure → testable.
 *
 * @standard RFC 9562 §5.8 name-based UUIDv8 (tenant-scoped content-addressed agent identity)
 */
import { computeContentUuid } from '@/integrity'

export interface AgentDef {
  name: string
  /** the skill routes / competencies this agent loads — what it can DO. */
  skills: ReadonlyArray<string>
  /** what the agent is FOR. */
  purpose: string
  config?: Record<string, unknown>
}

/**
 * Canonical content shape — skill ORDER must not change identity (sort), so true
 * clones merge. Returned as a plain object so `computeContentUuid` can hash it
 * under the per-tenant namespace (the canonical sort lives here, not in the hash).
 */
const canonical = (d: AgentDef): Record<string, unknown> => ({
  name: d.name,
  skills: [...d.skills].sort(),
  purpose: d.purpose,
  config: d.config ?? {},
})

/**
 * The agent's content-uuid — its identity IS its content, SCOPED to a tenant.
 *
 * Identity is computed under the per-tenant namespace (`computeContentUuid`), so
 * two tenants that define a byte-identical agent get DISTINCT uuids — there is no
 * cross-tenant collision via a shared global namespace. Within a tenant the law
 * holds: identical content ⇒ identical uuid (clones merge). `tenantId` defaults
 * to the empty-tenant namespace so single-tenant / API-stable callers still get a
 * deterministic, internally-consistent identity.
 */
export function agentUuid(def: AgentDef, tenantId = ''): string {
  return computeContentUuid(canonical(def), tenantId)
}

export type ClonedAgent = AgentDef & { uuid: string }

/**
 * Clone an agent. With no overrides → the SAME agent (identical uuid, a federated
 * presence). With overrides → a specialised CHILD (new uuid).
 */
export function cloneAgent(def: AgentDef, overrides: Partial<AgentDef> = {}, tenantId = ''): ClonedAgent {
  const child: AgentDef = {
    name: overrides.name ?? def.name,
    skills: overrides.skills ?? def.skills,
    purpose: overrides.purpose ?? def.purpose,
    config: overrides.config ?? def.config,
  }
  return { ...child, uuid: agentUuid(child, tenantId) }
}

/** Two agents are the SAME agent iff their content-uuids match (within a tenant). */
export function isSameAgent(a: AgentDef, b: AgentDef, tenantId = ''): boolean {
  return agentUuid(a, tenantId) === agentUuid(b, tenantId)
}

/** A swarm of clones, deduplicated by content-uuid — identical clones collapse to one (within a tenant). */
export function distinctAgents(swarm: ReadonlyArray<AgentDef>, tenantId = ''): ClonedAgent[] {
  const byUuid = new Map<string, ClonedAgent>()
  for (const a of swarm) {
    const c = cloneAgent(a, {}, tenantId)
    if (!byUuid.has(c.uuid)) byUuid.set(c.uuid, c)
  }
  return [...byUuid.values()]
}

// The team scale — multiple agents sharing skills (the competence union).
export * from './team'
