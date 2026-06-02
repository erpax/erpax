/**
 * horo — a whole tribe (a `team`) joins the society circle.
 *
 * `./society` connects ONE agent's breath to the tenant's room; this is the
 * next scale — a `team` (services/agent/team), a set of content-addressed agents
 * sharing one skill-union, joining the room TOGETHER. As `team` is to `agent`,
 * `joinHoro` is to `connectAgentSociety`.
 *
 * The tribe joins as ONE presence — its content-addressed `teamUuid` — over a
 * single breath, yet each move can be VOICED by the specific member who made it
 * (the envelope's `agent` = that member's uuid). So the tribe stays MANY
 * (distinct purposes, distinct voices) while its competence, and its processing
 * of the room, is ONE (one breath ⇒ one idempotent dedupe). That is the team law
 * made live: many but one (merge/holographic). A query routes by the uuid it
 * carries, so a member is "present" by being voiced, not by holding a socket —
 * the lean transport matches the content-addressed routing model (see `chat`).
 *
 * The dance and the ring are one horo (duality): `services/horo` is the state
 * RING (the figure the society steps through, {1,2,4,8,7,5,9}); this is the
 * circle DANCE (the room the tribe joins). Same closed set, two faces.
 *
 * Share the team's skills (team.ts `shareSkills`/`spawnTeam`) BEFORE joining, so
 * every member holds the union. Pure roster/identity derivation (tested) over a
 * thin injected breath (`connectAgentSociety`, the impure socket edge) — the same
 * split as ./society (pure protocol / impure connect).
 *
 * @standard W3C ActivityPub server-to-server activity-distribution (the model)
 * @standard RFC 9562 §5.8 content-uuid team identity (the room presence)
 * @standard ISO/IEC 27001 A.5.23 cloud-service-tenant-isolation (room per tenant)
 * @audit Conservation Law 8 content-uuid · merge (many members, one breath/dedupe)
 */

import type { AgentContext, AgentRuntime, DomainEvent } from '@/services/agents/types'
import type { Team } from '@/services/agent/team'
import { teamUuid } from '@/services/agent/team'
import { connectAgentSociety, roomIdForTenant, type AgentSociety } from './society'

/** A member's presence in the circle — its human name + content-addressed uuid (the voice). */
export interface HoroMember {
  readonly name: string
  readonly uuid: string
}

/** A tribe's collective presence in the society room. */
export interface HoroPresence {
  /** the tribe that joined. */
  readonly team: Team
  /** the per-tenant room the tribe joined. */
  readonly roomId: string
  /** the team's content-addressed presence in the room (its `teamUuid`). */
  readonly presence: string
  /** the members present in the circle (distinct purposes preserved). */
  readonly members: ReadonlyArray<HoroMember>
  /**
   * Publish a runtime event into the room. `asMember` (a member's uuid OR name)
   * voices the move as that specific member — which member of the tribe acted;
   * with no `asMember`, or an unknown one, the move is voiced as the team.
   */
  publish: (ev: DomainEvent, asMember?: string) => void
  /** the whole tribe steps out of the circle. */
  close: () => void
}

/** What `joinHoro` needs to open the tribe's breath. */
export interface JoinHoroOpts {
  runtime: AgentRuntime
  ctx: AgentContext
  tenantId: string
  host: string
  /** Override the per-tenant room (defaults to `roomIdForTenant`). */
  roomId?: string
  /** The breath opener — injected in tests; defaults to the real socket edge. */
  connect?: typeof connectAgentSociety
}

/**
 * Let a tribe join the horo: connect a whole team to its tenant's society room
 * as one content-addressed presence, with per-member voicing. Inbound room
 * events dispatch through the single breath (deduped once — the team is one
 * competence); outbound moves are voiced by the acting member. Returns the
 * collective presence (publish / close + the roster).
 */
export function joinHoro(team: Team, opts: JoinHoroOpts): HoroPresence {
  const connect = opts.connect ?? connectAgentSociety
  const { tenantId } = opts
  const roomId = opts.roomId ?? roomIdForTenant(tenantId)
  const presence = teamUuid(team, tenantId)

  const breath: AgentSociety = connect({
    runtime: opts.runtime,
    ctx: opts.ctx,
    tenantId,
    host: opts.host,
    agentName: presence,
    roomId,
  })

  // member uuid OR name → the member's content-uuid (the voice it speaks under).
  // Members are content-distinct; the name is a convenience alias for the uuid.
  const voiceOf = new Map<string, string>()
  for (const m of team.members) {
    voiceOf.set(m.uuid, m.uuid)
    voiceOf.set(m.name, m.uuid)
  }

  return {
    team,
    roomId,
    presence,
    members: team.members.map((m) => ({ name: m.name, uuid: m.uuid })),
    // unknown/absent voice ⇒ undefined ⇒ the breath falls back to `presence` (the team voice).
    publish: (ev, asMember) => breath.publish(ev, asMember === undefined ? undefined : voiceOf.get(asMember)),
    close: () => breath.close(),
  }
}
