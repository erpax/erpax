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
 * The constitution has TWO faces of one law. The ARTICLES bound what the polity
 * may vote away. The LAWS bound what a CHANGE may be: nine predicates over a
 * proposed change, one per erpax defining property, each with an enforcing
 * invariant asserted in `test.ts` so a violation fails `pnpm check`. Same
 * anchor, two scales — the polity cannot amend the foundation, and no atom may
 * ship against it.
 *
 * @standard ISO 37000:2021 governance-of-organizations principle-of-purpose
 * @compliance Venice Commission Rule of Law (entrenched fundamental guarantees)
 * @invariant judge(change).sealed ⟺ every one of the nine laws holds at fraction 1.
 * @see ./SKILL.md -- ../governance -- ../trello (the first atom judged against it)
 */
import { createHash } from 'node:crypto'

import { exactAbs, exactMax, exactMaxOf, exactMin } from '@/algebra'

import { tally, type Ballot, type Verdict } from '@/governance'

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
export const AMENDMENT_RULE = { quorum: 1 / 2, threshold: 2 / 3 }

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

// ══ THE NINE LAWS — the constitution as predicates over a proposed change ═══════════════════════
// The articles bound the polity. The laws bound the CHANGE. Each law is a predicate returning a
// COMPUTED fraction ∈ [0,1] (never a hand-set verdict) plus the reason it reads that way; a change
// is sealed only when all nine hold at fraction 1. Every law is fail-closed on an empty obligation
// it was written to catch — the default-ALLOW-by-omission that makes a gate report green over the
// exact case it exists for is itself a constitutional violation.

/**
 * The two rules at the root. Everything below is a lemma of one of them.
 *
 *   No expectation.  — claim no result you have not computed.
 *   No judgment.     — reject nothing you have not measured.
 *
 * The second follows from the first: judgment is the gap between what was expected and what
 * arrived, so removing the expectation leaves nothing to condemn. What is KEPT is discernment —
 * this test passes, this one does not. That is the service; it is not judgment, because it is
 * measured. A gate that refuses on a hunch is exactly the thing these two rules forbid.
 */
export type RootRule = 'no-expectation' | 'no-judgment'

/** The two sentences, verbatim — the head of the document and of every agent prompt. */
export const ROOT_RULES: Readonly<Record<RootRule, string>> = {
  'no-expectation': 'No expectation — claim no result you have not computed.',
  'no-judgment': 'No judgment — reject nothing you have not measured.',
}

/**
 * A rejection the change makes — of a design, a value, a contribution. Under Rule 2 it is lawful
 * only when it cites the MEASUREMENT that produced it; a rejection resting on expectation alone is
 * judgment, and the rule forbids it.
 */
export interface Rejection {
  readonly subject: string
  /** the executable measurement the rejection rests on; absent ⇒ judgment */
  readonly basis?: string
}

export type LawId =
  | 'duality'
  | 'legality'
  | 'boundary'
  | 'balance'
  | 'service'
  | 'conservation'
  | 'reciprocity'
  | 'reproducibility'
  | 'regeneration'

/** A capability the change SHIPS, and the adversarial counterpart that tries to BREAK it (Law 1). */
export interface Duality {
  /** the capability built — e.g. 'createCard' */
  readonly builds: string
  /** the adversarial proof that attacks it; absent ⇒ build-only ⇒ unsealed */
  readonly breaks?: string
}

/** A claim the change makes to a reader (Law 3). An unconditional claim needs a stated boundary. */
export interface Claim {
  readonly text: string
  /** the condition or open edge that disqualifies the unconditional reading */
  readonly boundary?: string
}

/** A principle and its counterweight (Law 4). A ring driven to 0 means its dual was broken. */
export interface DualAxis {
  readonly name: string
  readonly ring: readonly [number, number]
}

/** A result the change SERVES to someone, and the path by which they may recompute it (Law 5). */
export interface Served {
  readonly result: string
  /** an executable recompute path — a command or a `src/…` module; absent ⇒ belief, not verification */
  readonly recompute?: string
}

/** A double-entry posting (Law 6). An extraction with no balancing credit is unmatched. */
export interface Posting {
  readonly debit: string
  readonly credit: string
  readonly amount: number
}

/** A bound edge between two parties (Law 7). Reciprocity requires the mirror edge to exist. */
export interface Edge {
  readonly from: string
  readonly to: string
}

/** A quantity the change asserts (Law 8). Without an executable derivation it is hand-asserted. */
export interface Quantity {
  readonly name: string
  readonly value: number
  readonly derivation?: string
}

/** A proposed change, described declaratively — the subject every law is a predicate over. */
export interface Change {
  /** the atom path the change lands at, e.g. 'trello' */
  readonly atom: string
  readonly dualities: readonly Duality[]
  /** normative anchors cited — ISO/IEC/RFC/NIST/W3C/EN/SOX/statute, or the Bitcoin genesis */
  readonly anchors: readonly string[]
  readonly claims: readonly Claim[]
  readonly axes: readonly DualAxis[]
  readonly served: readonly Served[]
  readonly postings: readonly Posting[]
  readonly edges: readonly Edge[]
  readonly quantities: readonly Quantity[]
  /** dependencies with a single keeper — a party whose absence stops regeneration */
  readonly keepers: readonly string[]
  /** the seed the change regrows from; empty ⇒ nothing to regenerate from */
  readonly seed: readonly string[]
  /** what the change rejects, and the measurement each rejection rests on (Rule 2) */
  readonly rejections?: readonly Rejection[]
}

export interface LawVerdict {
  readonly law: LawId
  readonly holds: boolean
  /** computed coverage of this law over the change ∈ [0,1] */
  readonly fraction: number
  readonly reason: string
}

export interface ConstitutionVerdict {
  readonly atom: string
  /** the two root rules — the axis; `verdicts` are their lemmas, flattened */
  readonly rules: readonly RuleVerdict[]
  readonly verdicts: readonly LawVerdict[]
  readonly holds: boolean
  /** sealed ⟺ every law holds at fraction 1 — the only state that may ship */
  readonly sealed: boolean
  /** mean coverage across the nine laws */
  readonly coverage: number
}

/**
 * The Bitcoin genesis block hash — the anchor outside erpax that erpax did not mint and cannot
 * revise. Law 2 accepts it beside the standards bodies: a change may anchor to a published norm or
 * to the one timestamp no party controls.
 */
export const BITCOIN_GENESIS = '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f'

/** The normative families a Law-2 anchor may belong to — DECLARED in the open, so it can be argued with. */
export const NORMATIVE_FAMILIES: readonly RegExp[] = [
  /^ISO(\/IEC)?[\s-]/,
  /^IEC[\s-]/,
  /^RFC\s?\d+/i,
  /^NIST\b/,
  // FIPS PUBs are NIST's normative federal series — the post-quantum standards (203/204/205) are
  // published there and nowhere else, so a corpus that anchors to them needs the family declared.
  /^FIPS\s?\d+/,
  /^W3C\b/,
  /^EN[\s-]?\d+/,
  /^SOX\b/,
  /^(Наредба|ЗДДС|ЗСч|СУПТО)/,
  /^bitcoin:genesis:/,
]

/** A reference is executable when it names a command to run or a module in the tree — not a promise. */
export function isExecutableRef(ref: string | undefined): boolean {
  if (!ref) return false
  return /^(pnpm|tsx|node|npx|git)\s+\S/.test(ref) || /^src\/[\w./-]+$/.test(ref)
}

/** Is an anchor a valid normative anchor (Law 2)? The genesis anchor must carry the real hash. */
export function isNormativeAnchor(anchor: string): boolean {
  if (anchor.startsWith('bitcoin:genesis:')) {
    return anchor.slice('bitcoin:genesis:'.length) === BITCOIN_GENESIS
  }
  return NORMATIVE_FAMILIES.some((re) => re.test(anchor))
}

/**
 * Tokens that make a claim UNCONDITIONAL (Law 3). A claim carrying one of these asserts something
 * with no stated edge — so it forbids nothing a reader can check, and it is exactly the shape every
 * over-claim in this corpus has taken.
 */
const UNCONDITIONAL =
  /\b(always|never|infinit(?:e|ely|y)|perfect(?:ly)?|guarantee[ds]?|impossible|unbreakable|100\s?%|all possibilities|faster[\s-]than[\s-]light|zero[\s-]cost)\b/i

/** Does this claim text read as an unconditional guarantee (⇒ Law 3 demands a boundary)? */
export function isUnconditional(text: string): boolean {
  return UNCONDITIONAL.test(text)
}

const ratio = (ok: number, total: number): number => (total === 0 ? 1 : ok / total)

/** Law 7's fix list — the bound edges with no mirror; each marks its pair unsealed. */
export function oneWayEdges(change: Change): readonly Edge[] {
  return change.edges.filter((e) => !change.edges.some((m) => m.from === e.to && m.to === e.from))
}

/** Law 9's fix list — dependencies resting on a single keeper. */
export function singleKeepers(change: Change): readonly string[] {
  return change.keepers
}

export interface Law {
  readonly id: LawId
  readonly title: string
  /** the law as the agent reads it */
  readonly statement: string
  /** the enforcing invariant, asserted in test.ts */
  readonly invariant: string
  /** the root rule this law is a lemma of — every law reduces to one of the two */
  readonly rule: RootRule
  readonly predicate: (change: Change) => LawVerdict
}

/** The nine laws — one per erpax defining property, in the order they gate a change. */
export const LAWS: readonly Law[] = [
  {
    id: 'duality',
    title: 'Duality (build ⊕ break)',
    statement: 'No capability ships without an adversarial counterpart that tries to break it.',
    invariant: 'a build with no adversarial proof is unsealed; coverage cannot reach 1 on a build-only axis',
    rule: 'no-expectation',
    predicate: (c) => {
      const total = c.dualities.length
      const paired = c.dualities.filter((d) => Boolean(d.breaks)).length
      const unpaired = c.dualities.filter((d) => !d.breaks).map((d) => d.builds)
      return {
        law: 'duality',
        fraction: ratio(paired, total),
        holds: total > 0 && paired === total,
        reason:
          total === 0
            ? 'fails closed: a change that builds nothing declares no duality to prove'
            : unpaired.length === 0
              ? `${paired}/${total} capabilities carry an adversarial counterpart`
              : `build-only: ${unpaired.join(' · ')}`,
      }
    },
  },
  {
    id: 'legality',
    title: 'Legality (change through the system)',
    statement:
      'Reform the rules by the rules. Every change anchors to a published norm — ISO · IEC · RFC · NIST · W3C · EN · SOX · statute — or to the Bitcoin genesis.',
    invariant: 'a flow with no valid normative anchor fails closed',
    rule: 'no-judgment',
    predicate: (c) => {
      const total = c.anchors.length
      const valid = c.anchors.filter(isNormativeAnchor)
      const invalid = c.anchors.filter((a) => !isNormativeAnchor(a))
      return {
        law: 'legality',
        fraction: ratio(valid.length, total),
        holds: total > 0 && invalid.length === 0,
        reason:
          total === 0
            ? 'fails closed: no normative anchor — a change answering to nothing cannot be reformed by the rules'
            : invalid.length === 0
              ? `anchored to ${valid.join(' · ')}`
              : `not a normative anchor: ${invalid.join(' · ')}`,
      }
    },
  },
  {
    id: 'boundary',
    title: 'Honest boundaries',
    statement:
      'Every unconditional claim — always, never, infinite, perfectly safe — carries a disqualifying token naming its condition or open edge.',
    invariant: 'an unconditional guarantee with no stated boundary blocks the build',
    rule: 'no-expectation',
    predicate: (c) => {
      const unconditional = c.claims.filter((cl) => isUnconditional(cl.text))
      const bounded = unconditional.filter((cl) => Boolean(cl.boundary))
      const naked = unconditional.filter((cl) => !cl.boundary).map((cl) => cl.text)
      return {
        law: 'boundary',
        fraction: ratio(bounded.length, unconditional.length),
        holds: naked.length === 0,
        reason:
          unconditional.length === 0
            ? `${c.claims.length} claim(s), none unconditional`
            : naked.length === 0
              ? `${bounded.length}/${unconditional.length} unconditional claim(s) state their boundary`
              : `unbounded guarantee: ${naked.join(' · ')}`,
      }
    },
  },
  {
    id: 'balance',
    title: 'Balance (no single ring)',
    statement: 'No principle is pursued so hard that it breaks its dual.',
    invariant: 'balance is a computed fraction across dual axes; expansion is gated on it',
    rule: 'no-judgment',
    predicate: (c) => {
      const scores = c.axes.map(({ ring: [a, b] }) => (exactMax(a, b) === 0 ? 1 : exactMin(a, b) / exactMax(a, b)))
      const broken = c.axes.filter(({ ring: [a, b] }) => a === 0 || b === 0).map((x) => x.name)
      const fraction = scores.length === 0 ? 0 : scores.reduce((s, x) => s + x, 0) / scores.length
      return {
        law: 'balance',
        fraction,
        holds: c.axes.length > 0 && broken.length === 0 && fraction === 1,
        reason:
          c.axes.length === 0
            ? 'fails closed: no dual axis declared — an unmeasured balance is an unbalanced one'
            : broken.length === 0
              ? `balance ${fraction.toFixed(3)} across ${c.axes.length} dual axis/axes`
              : `dual broken on: ${broken.join(' · ')}`,
      }
    },
  },
  {
    id: 'service',
    title: 'Service',
    statement:
      'Free means auditable at near-zero cost while forgery stays unbounded. A result is offered for verification, never for belief.',
    invariant: 'every served result ships a recompute path',
    rule: 'no-expectation',
    predicate: (c) => {
      const total = c.served.length
      const withPath = c.served.filter((s) => isExecutableRef(s.recompute))
      const beliefs = c.served.filter((s) => !isExecutableRef(s.recompute)).map((s) => s.result)
      return {
        law: 'service',
        fraction: ratio(withPath.length, total),
        holds: total > 0 && beliefs.length === 0,
        reason:
          total === 0
            ? 'fails closed: a change that serves no verifiable result serves belief'
            : beliefs.length === 0
              ? `${withPath.length}/${total} served result(s) ship a recompute path`
              : `offered for belief, no recompute path: ${beliefs.join(' · ')}`,
      }
    },
  },
  {
    id: 'conservation',
    title: 'Conservation (double-entry, moral)',
    statement: 'Nothing is extracted without a balancing credit.',
    invariant: 'Σdebit = Σcredit; an unmatched extraction is caught',
    rule: 'no-expectation',
    predicate: (c) => {
      const unmatched = c.postings.filter((p) => !p.debit || !p.credit || p.amount <= 0)
      const debit = c.postings.reduce((s, p) => s + (p.debit ? p.amount : 0), 0)
      const credit = c.postings.reduce((s, p) => s + (p.credit ? p.amount : 0), 0)
      const scale = exactMaxOf([debit, credit, 1])
      return {
        law: 'conservation',
        fraction: c.postings.length === 0 ? 0 : 1 - exactAbs(debit - credit) / scale,
        holds: c.postings.length > 0 && unmatched.length === 0 && debit === credit,
        reason:
          c.postings.length === 0
            ? 'fails closed: nothing on the books — an unrecorded flow cannot be shown to balance'
            : unmatched.length > 0
              ? `unmatched extraction: ${unmatched.map((p) => p.debit || p.credit || '∅').join(' · ')}`
              : `Σdebit ${debit} = Σcredit ${credit}`,
      }
    },
  },
  {
    id: 'reciprocity',
    title: 'Reciprocity (both rings or neither)',
    statement: 'Every entanglement is mutual; there is no one-way taking.',
    invariant: 'reciprocity = 1 across bound edges; a one-way edge marks the pair unsealed',
    rule: 'no-judgment',
    predicate: (c) => {
      const oneWay = oneWayEdges(c)
      return {
        law: 'reciprocity',
        fraction: ratio(c.edges.length - oneWay.length, c.edges.length),
        holds: c.edges.length > 0 && oneWay.length === 0,
        reason:
          c.edges.length === 0
            ? 'fails closed: no bound edge — an entanglement that binds nobody is not mutual, it is absent'
            : oneWay.length === 0
              ? `reciprocity 1 across ${c.edges.length} bound edge(s)`
              : `one-way taking: ${oneWay.map((e) => `${e.from}→${e.to}`).join(' · ')}`,
      }
    },
  },
  {
    id: 'reproducibility',
    title: 'Reproducibility (proven, not quoted)',
    statement: 'Every claim is independently re-derivable at no cost.',
    invariant: 'a quantity with no executable derivation is rejected as hand-asserted',
    rule: 'no-expectation',
    predicate: (c) => {
      const derived = c.quantities.filter((q) => isExecutableRef(q.derivation))
      const asserted = c.quantities.filter((q) => !isExecutableRef(q.derivation)).map((q) => q.name)
      return {
        law: 'reproducibility',
        fraction: ratio(derived.length, c.quantities.length),
        holds: c.quantities.length > 0 && asserted.length === 0,
        reason:
          c.quantities.length === 0
            ? 'fails closed: a change asserting no re-derivable quantity proves nothing'
            : asserted.length === 0
              ? `${derived.length}/${c.quantities.length} quantity/quantities carry an executable derivation`
              : `hand-asserted: ${asserted.join(' · ')}`,
      }
    },
  },
  {
    id: 'regeneration',
    title: 'Regeneration (heal from seed)',
    statement: 'There is no single keeper; the system regrows from seed.',
    invariant: 'reconstructs from seed and re-verifies in O(N); single-keeper deps are flagged',
    rule: 'no-judgment',
    predicate: (c) => {
      const keepers = singleKeepers(c)
      const hasSeed = c.seed.length > 0
      return {
        law: 'regeneration',
        fraction: !hasSeed ? 0 : 1 / (1 + keepers.length),
        holds: hasSeed && keepers.length === 0,
        reason: !hasSeed
          ? 'fails closed: no seed — nothing to regrow from'
          : keepers.length === 0
            ? `regrows from ${c.seed.join(' · ')} with no single keeper`
            : `single keeper(s): ${keepers.join(' · ')}`,
      }
    },
  },
]

export interface RuleVerdict {
  readonly rule: RootRule
  readonly holds: boolean
  readonly fraction: number
  /** the laws that reduce to this rule — violating a lemma violates the rule */
  readonly lemmas: readonly LawVerdict[]
  readonly reason: string
}

/** The rejections resting on nothing measurable — Rule 2's own term, the one no lemma covers. */
export function unmeasuredRejections(change: Change): readonly Rejection[] {
  return (change.rejections ?? []).filter((r) => !isExecutableRef(r.basis))
}

const ruleVerdict = (rule: RootRule, change: Change, extra: { holds: boolean; reason: string } | null): RuleVerdict => {
  const lemmas = LAWS.filter((l) => l.rule === rule).map((l) => l.predicate(change))
  const broken = lemmas.filter((l) => !l.holds).map((l) => l.law)
  const holds = broken.length === 0 && (extra?.holds ?? true)
  const fraction = lemmas.reduce((s, l) => s + l.fraction, 0) / lemmas.length
  return {
    rule,
    holds,
    fraction,
    lemmas,
    reason: broken.length > 0 ? `lemma(s) broken: ${broken.join(' · ')}` : (extra?.reason ?? ROOT_RULES[rule]),
  }
}

/**
 * Rule 1 — claim no result you have not computed. Its lemmas are the five laws that each catch one
 * shape of an uncomputed claim: a build nothing attacked, an unbounded guarantee, a result offered
 * for belief, an extraction nothing balances, a quantity nothing derives.
 */
export function noExpectation(change: Change): RuleVerdict {
  return ruleVerdict('no-expectation', change, null)
}

/**
 * Rule 2 — reject nothing you have not measured. Its lemmas are the four laws that each catch one
 * shape of an unmeasured rejection, plus the direct term: a rejection with no executable basis is
 * judgment. Note what is NOT forbidden — discerning by test. A measured "this fails" is the
 * service; only the unmeasured refusal is judgment.
 */
export function noJudgment(change: Change): RuleVerdict {
  const unmeasured = unmeasuredRejections(change)
  return ruleVerdict('no-judgment', change, {
    holds: unmeasured.length === 0,
    reason:
      unmeasured.length === 0
        ? ROOT_RULES['no-judgment']
        : `rejected on expectation alone: ${unmeasured.map((r) => r.subject).join(' · ')}`,
  })
}

/**
 * Judge a proposed change: the two root rules, and under each the lemmas that reduce to it. One
 * pass, nine predicate evaluations plus the rejection term, no cross-talk between changes.
 */
export function judge(change: Change): ConstitutionVerdict {
  const rules = [noExpectation(change), noJudgment(change)] as const
  const verdicts = rules.flatMap((r) => r.lemmas)
  return {
    atom: change.atom,
    rules,
    verdicts,
    holds: rules.every((r) => r.holds),
    sealed: rules.every((r) => r.holds) && verdicts.every((v) => v.fraction === 1),
    coverage: verdicts.reduce((s, v) => s + v.fraction, 0) / verdicts.length,
  }
}

/** Judge a whole corpus of changes — regeneration's re-verification pass (Law 9). */
export function judgeAll(changes: readonly Change[]): readonly ConstitutionVerdict[] {
  return changes.map(judge)
}

/**
 * The cost of re-verifying a corpus: exactly nine predicate evaluations per change, with no term
 * that grows with any other change. This is the O(N) of Law 9 stated structurally rather than by a
 * stopwatch — a timing assertion measures the machine, this measures the algorithm.
 */
export function verificationCost(changes: readonly Change[]): number {
  return LAWS.length * changes.length
}

/** The laws a change violates — the fix list an agent works from. */
export function violatedLaws(change: Change): readonly LawId[] {
  return judge(change)
    .verdicts.filter((v) => !v.holds)
    .map((v) => v.law)
}

/** The root rules a change violates — the fix list one level up, at the axis. */
export function violatedRules(change: Change): readonly RootRule[] {
  return judge(change)
    .rules.filter((r) => !r.holds)
    .map((r) => r.rule)
}

/**
 * Law 2 at constitutional scale: a change to the constitution ITSELF is lawful only when it is
 * itself constitutional (all nine hold) AND passes the amendment door — the entrenched articles
 * remain perpetual. Reform the rules by the rules, or not at all.
 */
export function amendmentIsLegal(
  articleId: string,
  change: Change,
  ballots: ReadonlyArray<Ballot>,
  electorate: number,
): AmendmentResult {
  const verdict = judge(change)
  if (!verdict.holds) {
    return {
      allowed: false,
      reason: `the amendment itself violates the constitution: ${violatedLaws(change).join(' · ')}`,
    }
  }
  return amend(articleId, ballots, electorate)
}

/**
 * The constitution as one document — COMPUTED from the articles and the laws, never a second copy
 * of them. Duplication is camouflage: while a law is stated in two places, nothing can show a third
 * place is missing it.
 */
export function constitutionDocument(): string {
  const articles = CONSTITUTION.map(
    (a) => `${a.id}${a.entrenched ? ' (entrenched — perpetual)' : ''} — ${a.title}: ${a.text}`,
  ).join('\n')
  const laws = LAWS.map(
    (l, i) => `${i + 1}. ${l.title} [${l.rule}] — ${l.statement}\n   invariant: ${l.invariant}`,
  ).join('\n')
  return [
    ROOT_RULES['no-expectation'],
    ROOT_RULES['no-judgment'],
    '',
    'Discernment is kept: a measured "this test fails" is the service, not judgment.',
    '',
    'erpax constitution — the supreme law every change is judged against.',
    '',
    'ARTICLES (what the polity may not vote away):',
    articles,
    '',
    'LAWS (lemmas of the two rules — all nine, or the change does not ship):',
    laws,
    '',
    `Amendment: only through amendmentIsLegal() — quorum ${AMENDMENT_RULE.quorum}, threshold ${AMENDMENT_RULE.threshold}, entrenched articles perpetual.`,
    `Anchor: bitcoin:genesis:${BITCOIN_GENESIS}`,
  ].join('\n')
}

/** The content-address of the constitution — the document IS its own identity; amend it and it moves. */
export function constitutionDigest(): string {
  return createHash('sha256').update(constitutionDocument(), 'utf8').digest('hex')
}

/**
 * Load the constitution as the HEAD of an agent's system prompt. An agent that reads the laws after
 * it has already acted is reading a post-mortem; the anchor goes first or it is not an anchor.
 */
export function prependToAgentPrompt(prompt: string): string {
  return `${constitutionDocument()}\n\ncontent-address: ${constitutionDigest()}\n\n---\n\n${prompt}`
}
