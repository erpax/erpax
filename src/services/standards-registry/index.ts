/**
 * Standards-as-live-objects — Slice CCCCCC. Per spec scope expansion #3.
 *
 * Each (body, id, version, paragraph) is a uuid-keyed live object;
 * tenants subscribe by uuid; updates propagate as new uuids; tenants
 * confirm or reject the version pin.
 *
 * @standard W3C Linked Data + JSON-LD (live standards expressed as LD)
 * @standard ISO/IEC 15938-5 (multimedia content description framework)
 */

import { computeContentUuid } from '@/services/integrity'

export interface LiveStandard {
  readonly uuid: string                           // content-derived
  readonly body: string                           // 'IFRS' | 'IAS' | 'ISO' | 'EU' | …
  readonly id: string                             // 'IFRS-15' | '20022:2022' | …
  readonly version: string                        // '2026' | 'v3.1' | …
  readonly paragraph?: string                     // optional sub-citation '§B77-B78'
  readonly bodyText: string                       // canonical normative text
  readonly publishedAt: string
  readonly publisherDid: string                   // who attests this version
  readonly supersedes?: string                    // uuid of the previous version
}

const LIVE_STANDARDS = new Map<string, LiveStandard>()
const SUBSCRIPTIONS = new Map<string, Set<string>>()  // tenantId → set of subscribed uuids

// ── Slice LLLLLL — standards-as-vortices ─────────────────────────────
// Each standard is a vortex; citations + conflicts + supersessions
// are the coupling forces between standard vortices.
const CITATIONS: Map<string, Set<string>> = new Map()        // citerUuid → cited uuids
const CITATIONS_REVERSE: Map<string, Set<string>> = new Map() // citedUuid → citers
const CONFLICTS: Map<string, Set<string>> = new Map()        // uuid → mutually-exclusive uuids

export interface SupersessionEdge {
  readonly oldUuid: string
  readonly newUuid: string
  readonly jurisdiction: string                  // ISO 3166-1 alpha-2 or 'global'
  readonly effectiveDate: string                 // ISO 8601
  readonly notes?: string
}
const SUPERSESSIONS: SupersessionEdge[] = []

export type StandardFamily =
  | 'ifrs-ias' | 'iso' | 'eu-directive' | 'us-fed' | 'w3c-ietf' | 'cloudflare' | 'un-oecd-wco'

export function familyOf(body: string): StandardFamily {
  const b = body.toUpperCase()
  if (['IFRS', 'IAS', 'IASB', 'IFRSB'].includes(b)) return 'ifrs-ias'
  if (b === 'ISO' || b.startsWith('ISO/')) return 'iso'
  if (['EU', 'EBA', 'ECB', 'EIOPA', 'OPENPEPPOL', 'CEN'].includes(b)) return 'eu-directive'
  if (['SOX', 'COSO', 'US', 'USGAAP', 'NIST', 'FATCA', 'FIPS', 'BCBS', 'PCI'].includes(b)) return 'us-fed'
  if (['W3C', 'IETF', 'RFC'].includes(b)) return 'w3c-ietf'
  if (['CLOUDFLARE', 'CF', 'MCP', 'WORKERS'].includes(b)) return 'cloudflare'
  if (['UN', 'OECD', 'WCO', 'UN/CEFACT', 'IMF', 'BERLIN-GROUP'].includes(b)) return 'un-oecd-wco'
  return 'iso'  // safe default for unfamiliar bodies
}

export function addCitation(citerUuid: string, citedUuid: string): void {
  let out = CITATIONS.get(citerUuid); if (!out) { out = new Set(); CITATIONS.set(citerUuid, out) }
  out.add(citedUuid)
  let inc = CITATIONS_REVERSE.get(citedUuid); if (!inc) { inc = new Set(); CITATIONS_REVERSE.set(citedUuid, inc) }
  inc.add(citerUuid)
}

export function listCitations(uuid: string): { outgoing: ReadonlyArray<string>; incoming: ReadonlyArray<string> } {
  return {
    outgoing: [...(CITATIONS.get(uuid) ?? new Set())],
    incoming: [...(CITATIONS_REVERSE.get(uuid) ?? new Set())],
  }
}

export function declareConflict(uuidA: string, uuidB: string, reason?: string): void {
  let a = CONFLICTS.get(uuidA); if (!a) { a = new Set(); CONFLICTS.set(uuidA, a) }
  a.add(uuidB)
  let b = CONFLICTS.get(uuidB); if (!b) { b = new Set(); CONFLICTS.set(uuidB, b) }
  b.add(uuidA)
  void reason   // reason is recorded in audit; placeholder param for caller hint
}

export function listConflicts(uuid: string): ReadonlyArray<string> {
  return [...(CONFLICTS.get(uuid) ?? new Set())]
}

export function declareSupersession(edge: SupersessionEdge): void {
  SUPERSESSIONS.push(edge)
}

/** Trace a standard's supersession chain in a jurisdiction. */
export function traceSupersession(uuid: string, jurisdiction: string): ReadonlyArray<SupersessionEdge> {
  const chain: SupersessionEdge[] = []
  let current = uuid
  let safety = 0
  while (safety++ < 100) {
    const next = SUPERSESSIONS.find((e) => e.oldUuid === current && (e.jurisdiction === jurisdiction || e.jurisdiction === 'global'))
    if (!next) break
    chain.push(next)
    current = next.newUuid
  }
  return chain
}

/**
 * Conservation Law 27 — `checkStandardCitationsConsistent`. A tenant
 * subscribed to N standards must NOT have any pair in CONFLICTS.
 * (e.g. activating both UK-IFRS-15 and IFRS-EU-15 simultaneously
 * after divergence requires a tenant-role policy decision; the law
 * surfaces the conflict so the maintainer chooses).
 */
export function checkStandardCitationsConsistent(tenantId: string): { ok: boolean; conflicts: ReadonlyArray<{ a: string; b: string }> } {
  const subs = tenantSubscriptions(tenantId)
  const out: { a: string; b: string }[] = []
  for (let i = 0; i < subs.length; i++) {
    const peers = CONFLICTS.get(subs[i]!) ?? new Set()
    for (let j = i + 1; j < subs.length; j++) {
      if (peers.has(subs[j]!)) out.push({ a: subs[i]!, b: subs[j]! })
    }
  }
  return { ok: out.length === 0, conflicts: out }
}

/**
 * Conservation Law 28 — `checkStandardSupersessionsResolved`. Every
 * tenant subscription whose subscribed-uuid has been superseded in
 * the tenant's jurisdiction triggers a rebind proposal (Law 10
 * referential-harmony pattern applied to standards).
 */
export function checkStandardSupersessionsResolved(tenantId: string, jurisdiction: string): {
  ok: boolean
  pending: ReadonlyArray<{ subscribedUuid: string; latestUuid: string; chainLength: number }>
} {
  const subs = tenantSubscriptions(tenantId)
  const pending: { subscribedUuid: string; latestUuid: string; chainLength: number }[] = []
  for (const s of subs) {
    const chain = traceSupersession(s, jurisdiction)
    if (chain.length > 0) {
      pending.push({ subscribedUuid: s, latestUuid: chain[chain.length - 1]!.newUuid, chainLength: chain.length })
    }
  }
  return { ok: pending.length === 0, pending }
}

export function publishStandard(args: {
  body: string; id: string; version: string; paragraph?: string
  bodyText: string; publisherDid: string; supersedes?: string
}): LiveStandard {
  const stamped = {
    body: args.body, id: args.id, version: args.version, paragraph: args.paragraph,
    bodyText: args.bodyText, publishedAt: new Date().toISOString(),
    publisherDid: args.publisherDid, supersedes: args.supersedes,
  }
  const uuid = computeContentUuid(stamped, args.publisherDid)
  const live: LiveStandard = { uuid, ...stamped }
  LIVE_STANDARDS.set(uuid, live)
  return live
}

export function resolveStandard(uuid: string): LiveStandard | undefined {
  return LIVE_STANDARDS.get(uuid)
}

export function subscribeTenant(tenantId: string, standardUuid: string): void {
  let s = SUBSCRIPTIONS.get(tenantId); if (!s) { s = new Set(); SUBSCRIPTIONS.set(tenantId, s) }
  s.add(standardUuid)
}

export function tenantSubscriptions(tenantId: string): ReadonlyArray<string> {
  return [...(SUBSCRIPTIONS.get(tenantId) ?? new Set())]
}

/** When a new version supersedes an old one, propose the rebind (Law 10 referential harmony). */
export function findSupersededSubscriptions(tenantId: string): ReadonlyArray<{ oldUuid: string; newUuid: string }> {
  const subs = tenantSubscriptions(tenantId)
  const proposals: { oldUuid: string; newUuid: string }[] = []
  for (const subUuid of subs) {
    for (const [newUuid, candidate] of LIVE_STANDARDS) {
      if (candidate.supersedes === subUuid) proposals.push({ oldUuid: subUuid, newUuid })
    }
  }
  return proposals
}
