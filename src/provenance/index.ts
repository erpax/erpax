/**
 * provenance — a chain that must be WALKED, because restatement is not corroboration. See SKILL.md.
 *
 * @standard ISO 19011:2018 §6.4 — audit evidence: the citation must lead to the evidence
 * @standard W3C PROV-DM — provenance as a graph of entities and derivations
 */
import { exactMinOf } from '@/algebra'

export const atomPath = 'provenance' as const

/** What a link IS, which decides whether the chain can terminate there. See SKILL.md. */
export type LinkKind =
  /** A measurement, dataset, appropriation or statute — the chain may end here. */
  | 'primary'
  /** Peer-reviewed work reporting its own measurement — the chain may end here. */
  | 'peer-reviewed'
  /** A review, textbook or news report restating someone else's figure. Must cite onward. */
  | 'secondary'
  /** A supplier describing its own product. Must cite onward; a vendor is not disinterested. */
  | 'vendor'
  /** An unpublished conversation. Cannot be checked by a reader, so it can never terminate a chain. */
  | 'personal-communication'
  /** A proprietary projection with undisclosed method. Never terminates a chain. */
  | 'market-projection'

/** Kinds a chain may legitimately END on. Everything else must cite something further back. */
export const TERMINAL: ReadonlySet<LinkKind> = new Set<LinkKind>(['primary', 'peer-reviewed'])

export interface Link {
  readonly id: string
  readonly kind: LinkKind
  /** Publication year of THIS link. */
  readonly year: number
  /** What this link cites. Empty means the chain ends here — legitimately or not. */
  readonly cites: readonly string[]
}

/** A claim, and the links it rests on. */
export interface Chain {
  readonly claim: string
  readonly links: readonly Link[]
  /** Where reading starts — the citation a reader is actually given. */
  readonly entry: readonly string[]
}

const byId = (links: readonly Link[]): ReadonlyMap<string, Link> =>
  new Map(links.map((l) => [l.id, l]))

/** Every link reachable from the entry points, following citations. See SKILL.md. */
export function walk(chain: Chain): readonly Link[] {
  const index = byId(chain.links)
  const seen = new Set<string>()
  const out: Link[] = []
  const queue = [...chain.entry]
  while (queue.length > 0) {
    const id = queue.shift() as string
    if (seen.has(id)) continue
    seen.add(id)
    const link = index.get(id)
    if (!link) continue
    out.push(link)
    for (const next of link.cites) queue.push(next)
  }
  return out
}

/** The ROOTS: reachable links that cite nothing further. See SKILL.md. */
export function roots(chain: Chain): readonly Link[] {
  return walk(chain).filter((l) => l.cites.length === 0)
}

/** How many DISTINCT things the claim rests on. This is the number a citation count is mistaken for. Twenty papers over one root is one. */
export function independentRoots(chain: Chain): number {
  return roots(chain).length
}

/** Roots the chain is not allowed to end on — a reader cannot walk past them. */
export function unwalkableRoots(chain: Chain): readonly Link[] {
  return roots(chain).filter((l) => !TERMINAL.has(l.kind))
}

/** The age of the claim, in years, measured at its OLDEST root rather than its newest citation. See SKILL.md. */
export function ageAt(chain: Chain, now: number): number {
  const rs = roots(chain)
  if (rs.length === 0) return 0
  return now - exactMinOf([...rs.map((r) => r.year)])
}

export interface Verdict {
  readonly claim: string
  readonly citations: number
  readonly independentRoots: number
  readonly unwalkable: readonly string[]
  readonly rootYear: number | null
  readonly ageYears: number
  /** Walkable to a terminal kind, resting on at least one root. */
  readonly grounded: boolean
}

/** Judge the chain. `grounded` is deliberately weak: it says the claim reaches at least one root a reader can check, never that the root is CORRECT. See SKILL.md. */
export function judge(chain: Chain, now: number): Verdict {
  const reached = walk(chain)
  const rs = roots(chain)
  const bad = unwalkableRoots(chain)
  return {
    claim: chain.claim,
    citations: reached.length,
    independentRoots: rs.length,
    unwalkable: bad.map((l) => l.id),
    rootYear: rs.length === 0 ? null : exactMinOf([...rs.map((r) => r.year)]),
    ageYears: ageAt(chain, now),
    grounded: rs.length > 0 && bad.length === 0,
  }
}
