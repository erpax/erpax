/**
 * provenance — a chain that must be WALKED, because restatement is not corroboration.
 *
 * THE DEFECT THIS ATOM EXISTS FOR, measured 2026-09-20 in the remediation-cost literature: the
 * per-unit cost advantage of phytoremediation over excavation is stated in dozens of papers, several
 * published in 2024, and every one of them traces to the SAME 1997 report — whose own tables cite a
 * vendor's technical summary and a personal communication. Read as a field it looks corroborated.
 * Walked as a graph it is ONE source, thirty years old, unwalkable at its root.
 *
 * That is not a lie anywhere in the chain. Each paper cited honestly. The failure is emergent: N
 * citations of one root read as N sources unless somebody dedupes by ROOT, and nobody does it by
 * hand. [[rules]]/copy names the same shape in code — one truth at many addresses, where the count
 * of addresses is mistaken for evidence.
 *
 * So the two questions here are: what is at the END of the chain, and how many DISTINCT ends are
 * there? Neither is answerable from a citation count, and both are decidable from a graph.
 *
 * @standard ISO 19011:2018 §6.4 — audit evidence: the citation must lead to the evidence
 * @standard W3C PROV-DM — provenance as a graph of entities and derivations
 */
export const atomPath = 'provenance' as const

/**
 * What a link IS, which decides whether the chain can terminate there. DECLARED, because what
 * counts as a primary source is a judgement about the world and no theorem derives it.
 */
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

/**
 * Every link reachable from the entry points, following citations.
 *
 * Cycles terminate rather than hang: a literature that cites itself in a ring is a real thing and
 * must not take the walker with it.
 */
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

/**
 * The ROOTS: reachable links that cite nothing further. These, and only these, are what the claim
 * actually rests on — however many papers sit above them.
 */
export function roots(chain: Chain): readonly Link[] {
  return walk(chain).filter((l) => l.cites.length === 0)
}

/**
 * How many DISTINCT things the claim rests on.
 *
 * This is the number a citation count is mistaken for. Twenty papers over one root is one.
 */
export function independentRoots(chain: Chain): number {
  return roots(chain).length
}

/** Roots the chain is not allowed to end on — a reader cannot walk past them. */
export function unwalkableRoots(chain: Chain): readonly Link[] {
  return roots(chain).filter((l) => !TERMINAL.has(l.kind))
}

/**
 * The age of the claim, in years, measured at its OLDEST root rather than its newest citation.
 *
 * A 2024 paper resting on a 1997 table is a 1997 claim wearing a 2024 date, and the newest citation
 * is exactly the number a reader takes for freshness.
 */
export function ageAt(chain: Chain, now: number): number {
  const rs = roots(chain)
  if (rs.length === 0) return 0
  return now - Math.min(...rs.map((r) => r.year))
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

/**
 * Judge the chain.
 *
 * `grounded` is deliberately weak: it says the claim reaches at least one root a reader can check,
 * never that the root is CORRECT. A primary source can be wrong, and a peer-reviewed measurement
 * can fail to replicate — this closes the case where there is nothing to check at all.
 */
export function judge(chain: Chain, now: number): Verdict {
  const reached = walk(chain)
  const rs = roots(chain)
  const bad = unwalkableRoots(chain)
  return {
    claim: chain.claim,
    citations: reached.length,
    independentRoots: rs.length,
    unwalkable: bad.map((l) => l.id),
    rootYear: rs.length === 0 ? null : Math.min(...rs.map((r) => r.year)),
    ageYears: ageAt(chain, now),
    grounded: rs.length > 0 && bad.length === 0,
  }
}
