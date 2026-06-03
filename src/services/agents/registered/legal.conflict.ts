/**
 * legal.conflict — the LegalAgent's conflict-of-interest check as a PURE transform.
 *
 * The autonomy half of [[matter]] intake (#3 of go-all): a `matter:opening` event
 * (a client party + the client's related entities + the firm's adverse-party set)
 * becomes the clearance verdict. The check IS the [[merge]]/[[identity]] law —
 * same entity ⇒ same content-uuid — so a collision is an id in
 * {client ∪ related} ∩ {adverse the firm already serves}. Detection, not
 * prevention ([[conflict]]): a collision BARS the matter behind a [[privilege]]
 * wall and routes to the installed `legal:vendor-check` work-skill (investigate the
 * adversity); a clear check PROCEEDS to `legal:review-contract`. Returns
 * emit · audit · route, mirroring `hr.training` — the same pure/injected split.
 *
 * Pure: everything is read from the event payload (the impure hook resolves the
 * party graph), so this is trivially testable. Wiring it live = register the
 * LegalAgent (onEvent → planConflictEffects) + a `matter:opening` projection on
 * transaction intake — the thin glue that mirrors `training-broadcast`.
 *
 * @standard ISO 19011 — the verdict is a deterministic function of the party graph
 * @audit ABA Model Rule 1.7 conflict-of-interest (named; the form is the merge law)
 */
import type { AgentEffect, DomainEvent } from '../types'

/** The event the loop reacts to (a matter is opening for a client party). */
export const CONFLICT_TRIGGER = 'matter:opening'
/** The event the loop broadcasts (the clearance verdict). */
export const CONFLICT_EMIT = 'conflict:checked'

interface ConflictPayload {
  matterId: string
  clientPartyId: string
  clientName?: string
  /** the client's related entities (parents/subsidiaries/principals) — all checked. */
  relatedPartyIds: string[]
  /** parties the firm already serves whose interests would be adverse to this client. */
  adversePartyIds: string[]
  /** the work-skill routes the verdict dispatches to. */
  routes: { vendorCheck: string; reviewContract: string }
}

/** Read the payload defensively; null ⇒ not a conflict event (no client ⇒ nothing to clear). */
function readConflict(ev: DomainEvent): ConflictPayload | null {
  const p = ev.payload as Record<string, unknown> | undefined
  if (!p || !p.clientPartyId) return null
  const ids = (v: unknown): string[] => (Array.isArray(v) ? v.map((x) => String(x)).filter(Boolean) : [])
  const r = (p.routes && typeof p.routes === 'object' ? p.routes : {}) as Record<string, unknown>
  return {
    matterId: String(p.matterId ?? ''),
    clientPartyId: String(p.clientPartyId),
    clientName: p.clientName != null ? String(p.clientName) : undefined,
    relatedPartyIds: ids(p.relatedPartyIds),
    adversePartyIds: ids(p.adversePartyIds),
    routes: {
      vendorCheck: r.vendorCheck != null ? String(r.vendorCheck) : 'legal:vendor-check',
      reviewContract: r.reviewContract != null ? String(r.reviewContract) : 'legal:review-contract',
    },
  }
}

/**
 * The pure agent-effect: a `matter:opening` event → the clearance effects
 * (emit verdict · audit · route). Returns [] for a non-conflict event.
 */
export function planConflictEffects(ev: DomainEvent): AgentEffect[] {
  const c = readConflict(ev)
  if (!c) return []
  // the merge/identity law: a collision = the proposed client (or a related entity)
  // IS a party the firm already serves adversely — same entity, same content-uuid.
  const adverse = new Set(c.adversePartyIds)
  const collisions = [c.clientPartyId, ...c.relatedPartyIds].filter((id) => adverse.has(id))
  const clear = collisions.length === 0
  const subjectId = c.matterId || c.clientPartyId

  const effects: AgentEffect[] = [
    {
      kind: 'emit',
      event: {
        id: CONFLICT_EMIT,
        tenantId: ev.tenantId,
        aggregateId: subjectId, // the event is ABOUT the matter (not a payload hash)
        emittedAt: ev.emittedAt, // reuse the trigger's stamp — keeps this transform pure
        payload: { matterId: c.matterId, clientPartyId: c.clientPartyId, clear, collisions },
      },
    },
    {
      kind: 'audit',
      leaf: {
        tenantId: ev.tenantId,
        subjectCollection: 'transactions', // a matter IS a transaction lifecycle
        subjectId,
        action: clear ? 'conflict-cleared' : 'conflict-found',
      },
    },
  ]
  if (clear) {
    // proceed to engagement — route to the contract review work-skill
    effects.push({
      kind: 'notify',
      channel: 'legal',
      templateKey: 'legal.conflict.clear',
      vars: { matterId: c.matterId, clientPartyId: c.clientPartyId, skillRoute: c.routes.reviewContract },
    })
  } else {
    // barred — wall it (privilege) and route to the adversity-investigation work-skill
    effects.push({
      kind: 'escalate',
      severity: 'blocker',
      templateKey: 'legal.conflict.barred',
      vars: { matterId: c.matterId, clientPartyId: c.clientPartyId, collisions: collisions.join(',') },
    })
    effects.push({
      kind: 'notify',
      channel: 'legal',
      templateKey: 'legal.conflict.wall',
      vars: { matterId: c.matterId, collisions: collisions.join(','), skillRoute: c.routes.vendorCheck },
    })
  }
  return effects
}
