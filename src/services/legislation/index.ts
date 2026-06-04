/**
 * legislation — the society enacts its own law, bounded by its constitution.
 *
 * The society already HAS law: the constitution (the supreme articles) and the
 * architecture-invariants (the enforcement statutes). What it lacked was the
 * power to LEGISLATE — to pass ordinary statutes the way it amends the
 * constitution: by the vote. `legislation` supplies the power and the limit in
 * one breath. A statute is enacted by an ordinary majority of the polity
 * (governance `tally`); a constitutional amendment needs the supermajority (the
 * constitution's higher bar) — so ordinary law is easy to make and the
 * foundation is hard to move, the rule of law as a difference of thresholds.
 * No statute may hold constitutional rank or entrenchment, and no majority,
 * however large, repeals an entrenched article: the legislature cannot
 * legislate away the foundation that bounds it — the same limit `separation`
 * puts on the branches and `anti-corruption` puts on the ledger, one law at
 * every scale.
 *
 * Every law is content-addressed: same (rank, title, text) ⇒ same id on every
 * instance, so two societies that pass the same statute hold ONE law (merge),
 * and a tampered statute is a different id (proof). The code is ASSEMBLED, never
 * re-typed — the constitution is read from its module, the statutes from the
 * vote; the filesystem is the only source. Pure → testable.
 *
 * @standard ISO 37000:2021 governance-of-organizations (the body of governing rules)
 * @compliance Venice Commission Rule of Law (law public, prospective, stable, equally applied)
 * @audit ISO-19011:2018 §6.4 audit-evidence (every law content-addressed + citable)
 */
import { uuid } from '@/services/integrity/content-uuid'
import { CONSTITUTION } from '@/services/constitution'
import { tally, type Ballot, type ProposalRule, type Verdict } from '@/services/governance'

export type LawRank = 'constitutional' | 'statutory'

export interface Law {
  /** stable id — `const:<article>` for the supreme law, `stat:<digest>` for a statute. */
  readonly id: string
  readonly rank: LawRank
  readonly title: string
  readonly text: string
  /** perpetual — no vote may repeal it. Only constitutional articles may be entrenched. */
  readonly entrenched: boolean
  /** content-uuid of (rank, title, text) — identity is a projection of content. */
  readonly contentUuid: string
  /** the governance verdict that enacted a statute (absent for constitutional law). */
  readonly ratifiedBy?: Verdict
}

/**
 * Ordinary legislation passes by a simple majority of the polity — a LOWER bar
 * than the constitution's amendment supermajority (`AMENDMENT_RULE`, 2/3). The
 * gap between the two thresholds IS the entrenchment of the foundation.
 */
export const LEGISLATIVE_RULE: ProposalRule = { quorum: 0.5, threshold: 0.5 }

function contentUuidOf(rank: LawRank, title: string, text: string): string {
  return uuid({ rank, title, text })
}

/** The supreme law, derived live from the constitution module (never re-typed). */
export function constitutionalCode(): ReadonlyArray<Law> {
  return CONSTITUTION.map((a): Law => ({
    id: `const:${a.id}`,
    rank: 'constitutional',
    title: a.title,
    text: a.text,
    entrenched: a.entrenched,
    contentUuid: contentUuidOf('constitutional', a.title, a.text),
  }))
}

export interface EnactParams {
  readonly title: string
  readonly text: string
  readonly ballots: ReadonlyArray<Ballot>
  readonly electorate: number
}

export interface EnactResult {
  readonly enacted: boolean
  readonly reason: string
  readonly law?: Law
  readonly verdict: Verdict
}

/**
 * The society enacts an ordinary statute. Ratified iff the polity passes it at
 * the legislative bar; the resulting law is always statutory and never
 * entrenched — the legislature cannot mint constitutional or perpetual law.
 */
export function enact(params: EnactParams): EnactResult {
  const verdict = tally(params.ballots, params.electorate, LEGISLATIVE_RULE)
  if (!verdict.ratified) return { enacted: false, reason: verdict.reason, verdict }
  const contentUuid = contentUuidOf('statutory', params.title, params.text)
  const law: Law = {
    id: `stat:${contentUuid.slice(0, 8)}`,
    rank: 'statutory',
    title: params.title,
    text: params.text,
    entrenched: false,
    contentUuid,
    ratifiedBy: verdict,
  }
  return { enacted: true, reason: 'enacted by the polity', law, verdict }
}

export interface RepealResult {
  readonly repealed: boolean
  readonly reason: string
  readonly verdict?: Verdict
}

/**
 * Repeal an ordinary statute by the polity's vote. An entrenched article can
 * never be repealed (the perpetual limit); a constitutional article is changed
 * through the constitution's amendment (supermajority), not statutory repeal.
 */
export function repeal(law: Law, ballots: ReadonlyArray<Ballot>, electorate: number): RepealResult {
  if (law.entrenched) {
    return { repealed: false, reason: 'entrenched (perpetual) — no majority, however large, may repeal the foundation' }
  }
  if (law.rank === 'constitutional') {
    return { repealed: false, reason: 'constitutional article — change it through constitutional amendment (supermajority), not statutory repeal' }
  }
  const verdict = tally(ballots, electorate, LEGISLATIVE_RULE)
  return { repealed: verdict.ratified, reason: verdict.ratified ? 'repealed by the polity' : verdict.reason, verdict }
}

/**
 * The legal code as it stands: the constitution (supreme) over the enacted
 * statutes (ordinary). A statute that would usurp constitutional rank or
 * entrenchment is dropped — the layering is enforced, not assumed.
 */
export function legislation(statutes: ReadonlyArray<Law> = []): ReadonlyArray<Law> {
  return [...constitutionalCode(), ...statutes.filter((s) => s.rank === 'statutory' && !s.entrenched)]
}

/**
 * The rule of law as a pure predicate, for the gate: the whole constitution is
 * enrolled with its entrenchment intact, and no statute holds constitutional
 * rank or entrenchment. True by construction for the constitution alone; false
 * the moment a statute tries to usurp the foundation.
 */
export function ruleOfLawHolds(statutes: ReadonlyArray<Law> = []): boolean {
  const articles = constitutionalCode()
  if (articles.length !== CONSTITUTION.length) return false
  for (const a of CONSTITUTION) {
    const law = articles.find((l) => l.id === `const:${a.id}`)
    if (!law || law.entrenched !== a.entrenched || law.rank !== 'constitutional') return false
  }
  return statutes.every((s) => s.rank === 'statutory' && !s.entrenched)
}
