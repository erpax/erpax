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
