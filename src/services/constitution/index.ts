/**
 * constitution — the 0 of the sequence: the supreme law erpax derives from.
 *
 * Society is sovereign over erpax (governance ratifies the rules). But a
 * sovereign majority that could vote away the integrity laws would be able to
 * legalise corruption — so the constitution ENTRENCHES the foundation: the
 * anti-corruption invariants, conservation, one-person-one-vote, and the
 * identity of the typeless person are PERPETUAL — not amendable by any vote.
 * Everything else is amendable by a supermajority of the polity. This is the
 * whole arc resolved: society holds the judgment, the constitution bounds the
 * judgment so the foundation cannot be judged away. Pure → testable.
 *
 * @standard ISO 37000:2021 governance-of-organizations principle-of-purpose
 * @compliance Venice Commission Rule of Law (entrenched fundamental guarantees)
 */
import { tally, type Ballot, type Verdict } from '@/services/governance'

export interface Article {
  id: string
  title: string
  text: string
  /** entrenched = perpetual; no vote can amend it (the limit on the majority). */
  entrenched: boolean
}

export const CONSTITUTION: ReadonlyArray<Article> = [
  {
    id: '0-identity',
    title: 'Identity',
    text: 'Every actor is one typeless person, addressed by content-uuid; one person, one identity. No actor has a type — only relations.',
    entrenched: true,
  },
  {
    id: '1-integrity',
    title: 'Integrity & Anti-corruption',
    text: 'Every act is recorded on the shared ledger. The four invariants — content-uuid immutability, segregation of duties, double-entry balance, and no-delete/reversal-only — are perpetual. Corruption cannot be made lawful.',
    entrenched: true,
  },
  {
    id: '2-conservation',
    title: 'Conservation',
    text: 'Value is conserved. Nothing is created from nothing; every flow has two sides that net to zero.',
    entrenched: true,
  },
  {
    id: '3-sovereignty',
    title: 'Sovereignty & Federation',
    text: 'Each community governs itself and federates by content. No central authority owns the whole.',
    entrenched: false,
  },
  {
    id: '4-governance',
    title: 'Governance',
    text: 'Society governs erpax by ratification; the polity is sovereign over the rules, skills, budgets and config. One person, one vote — perpetual.',
    entrenched: true,
  },
  {
    id: '5-rights',
    title: 'Rights',
    text: 'Privacy by crypto-shred erasure; due process by competing claims adjudicated by the polity; participation by the vote.',
    entrenched: false,
  },
  {
    id: '6-amendment',
    title: 'Amendment',
    text: 'This constitution may be amended by a supermajority of the polity, save the entrenched articles, which are perpetual.',
    entrenched: true,
  },
]

/** Amendment requires a supermajority — a higher bar than ordinary governance. */
export const AMENDMENT_RULE = { quorum: 0.5, threshold: 2 / 3 }

export function getArticle(id: string): Article | undefined {
  return CONSTITUTION.find((a) => a.id === id)
}

export interface AmendmentResult {
  allowed: boolean
  reason: string
  verdict?: Verdict
}

/**
 * Attempt a constitutional amendment. An entrenched article can NEVER be amended
 * (the perpetual limit on the majority); a non-entrenched article is amended iff
 * the polity ratifies at the supermajority bar.
 */
export function amend(articleId: string, ballots: ReadonlyArray<Ballot>, electorate: number): AmendmentResult {
  const art = getArticle(articleId)
  if (!art) return { allowed: false, reason: 'no such article' }
  if (art.entrenched) {
    return { allowed: false, reason: 'article is entrenched (perpetual) — no majority, however large, may amend it' }
  }
  const verdict = tally(ballots, electorate, AMENDMENT_RULE)
  return { allowed: verdict.ratified, reason: verdict.ratified ? 'amended by supermajority of the polity' : verdict.reason, verdict }
}
