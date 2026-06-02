/**
 * exchange — a governed cross-domain data exchange with provenance. The holder's grant gates the
 * capability and sanitizes the released fields; the exchange is receipted, so the requester gets the
 * data AND a verifiable provenance chain. Composes the receipt service; no shared trust root needed.
 *
 * @standard ISO/IEC 27001 A.5.14 information-transfer (controlled cross-boundary exchange)
 * @standard GDPR Art.5(1)(c) data-minimisation (release only the granted fields)
 * @see ../receipt (the provenance chain) · ../sandbox (the grant model) · ./SKILL.md
 */
import { issueReceipt, type Decision, type Receipt } from '../receipt'

/** A cross-domain participant — its own domain and content-addressed identity (no shared root). */
export interface Party {
  readonly domain: string
  readonly uuid: string
}

/** A request from one party to another for specific data fields under a capability. */
export interface ExchangeRequest {
  readonly from: Party
  readonly to: Party
  readonly capability: string
  readonly fields: readonly string[]
}

/** The holder's grant toward a requester: the permitted capability + the fields it may release. */
export interface ExchangeGrant {
  readonly capability: string
  readonly releasableFields: readonly string[]
}

export interface ExchangeResult {
  readonly allowed: boolean
  /** the fields actually released — requested ∩ releasable (sanitized at the boundary). */
  readonly released: readonly string[]
  /** the provenance entry (uuid-chained) — what was accessed, by whom, under what authority. */
  readonly receipt: Receipt
}

/**
 * Govern a cross-domain exchange: gate the capability against the holder's grant, sanitize the
 * release to the grant's releasable fields, and receipt the decision as a provenance entry. The
 * requester receives `released` plus a verifiable receipt; data not granted never crosses the edge.
 */
export function exchange(args: {
  request: ExchangeRequest
  grant: ExchangeGrant
  head: { leafUuid: string; seq: number } | null
  timestampIso: string
}): ExchangeResult {
  const allowed = args.request.capability === args.grant.capability
  const released = allowed
    ? args.request.fields.filter((f) => args.grant.releasableFields.includes(f))
    : []
  const decision: Decision = {
    action: `${args.request.capability} ${args.request.from.domain}→${args.request.to.domain}`,
    actor: args.request.from.uuid,
    outcome: allowed ? 'allow' : 'block',
    tier: 'cross-domain',
    capabilities: [args.grant.capability],
  }
  const receipt = issueReceipt({ decision, head: args.head, timestampIso: args.timestampIso })
  return { allowed, released, receipt }
}
