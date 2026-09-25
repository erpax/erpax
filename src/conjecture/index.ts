/**
 * conjecture — the forward dual of [[think]]/refute.
 *
 * `refute` seals an impossibility ALREADY MET and routes it to the dimension where the
 * thing is computable. That is backward-looking: it makes a dead path cheap the second
 * time. Nothing in the corpus was looking forward — formulating a claim BEFORE it is
 * met, and deciding which claim is worth meeting at all.
 *
 * An idea is not invented here. It is TRANSFORMED from something the corpus already
 * holds, by a transform the corpus has already used at least once. That is the whole
 * difference between a conjecture and a forgery ([[rules]]/forge): a forged claim is
 * minted locally and wears an authority nothing conferred; a conjecture names its
 * parent law and the operation applied to it, so a reader can refuse the step itself.
 *
 * @standard Popper — a proposition that forbids nothing explains nothing
 * @standard Shannon (1948) — surprise is −log₂ p, in bits
 * @see ./SKILL.md — ../think — ../rules/refutable — ../rules/slack
 */
import { algebraLog2, exactMax } from '@/algebra'
import { alreadyRefuted } from '@/think'

export const atomPath = 'conjecture' as const

/**
 * The operations that produce a conjecture from a law already held.
 *
 * DECLARED, in the open, and every one of them has produced a real gate in this corpus
 * at least once — a list of transforms nobody has used is a list of wishes.
 */
export const TRANSFORMS = Object.freeze({
  /** Flip the claim's polarity. [[rules]]/slack is [[law]]/folder's ratchet involuted: over-claim ↦ under-claim. */
  involution: 'flip the polarity of the claim',
  /** Swap the two sides of a relation — gap ↔ seal, debit ↔ credit, prose ↔ code. */
  dual: 'exchange the two sides of the relation',
  /** A law proven on one surface, asserted on all of them. [[rules]]/domain was born this way. */
  generalise: 'assert the law on every surface it does not yet reach',
  /** A law carried to another domain. [[rules]]/forge is "a DOI is received" transposed to every registered id. */
  transpose: 'carry the law to a domain that shares its shape',
  /** Two laws conjoined — what must hold when both do. */
  compose: 'conjoin two laws and claim what follows',
} as const)

export type Transform = keyof typeof TRANSFORMS

/** A claim formulated from a law already held, with what would decide it. */
export interface Conjecture {
  /** The claim itself, stated so that evidence could contradict it. */
  readonly claim: string
  /** The law it was transformed from — a conjecture with no parent is a forgery. */
  readonly from: string
  readonly transform: Transform
  /**
   * The command or gate that would return a verdict. EMPTY means nothing here can
   * decide it — which is not a defect in the claim, only in what it is worth testing.
   */
  readonly decidedBy: string
  /** Observations consistent with the claim, as the corpus currently stands. */
  readonly priorFor: number
  /** Observations against it. */
  readonly priorAgainst: number
  /** Seconds the deciding command costs, as measured — never guessed at zero. */
  readonly costSeconds: number
}

/** A conjecture with its surprise, its decidability and what it is worth testing. */
export interface ScoredConjecture extends Conjecture {
  /** −log₂ p, in bits: how much of a surprise the claim being true would be. */
  readonly surpriseBits: number
  /** Laplace-smoothed prior that the claim holds. */
  readonly prior: number
  readonly decidable: boolean
  /** Sealed as already met — never re-probed ([[think]]/alreadyRefuted). */
  readonly refuted: boolean
  /** surprise × decidable × ¬refuted ÷ cost. Zero is not a small number here; it is a refusal. */
  readonly worth: number
}

/**
 * Laplace-smoothed prior: `(for + 1) ÷ (for + against + 2)`.
 *
 * The +1/+2 is not a fudge. A claim with no observations either way must not read as
 * certain in either direction, and `0/0` has no value at all — Laplace's rule of
 * succession gives it exactly ½, which is the honest prior for a claim nobody has
 * looked at.
 */
export function prior(priorFor: number, priorAgainst: number): number {
  return (priorFor + 1) / (priorFor + priorAgainst + 2)
}

/**
 * Shannon surprise, in bits: `−log₂ p`.
 *
 * This is the half that makes the instrument worth having. A claim everyone already
 * expects carries almost no information if it turns out true — 9 observations for and
 * none against gives a prior of 10/11 and **0.14 bits**. A claim that looks impossible
 * — none for, 9 against — gives 1/11 and **3.46 bits**. The score therefore REWARDS
 * the idea that looks impossible at first glance, rather than penalising it, because
 * the impossible-looking claim is the only one whose answer teaches anything.
 */
export function surpriseBits(priorFor: number, priorAgainst: number): number {
  return -algebraLog2(prior(priorFor, priorAgainst))
}

/**
 * What a conjecture is worth testing: `surprise ÷ cost`, gated by decidability.
 *
 * Two refusals, and both are laws this corpus already paid for:
 *
 *   - **Undecidable is worth ZERO, however surprising.** [[rules]]/refutable: a claim
 *     nothing can contradict forbids nothing, so it asserts nothing — and a ranking
 *     that let an unfalsifiable claim outrank a testable one would promote exactly the
 *     space where a lie is safe. This is that law as an ORDER rather than a gate.
 *   - **Already refuted is worth ZERO.** [[think]]/refute seals the impossibilities
 *     already met so the loop never divides by the same zero twice. Re-probing a
 *     sealed dead path is the slow way, restated.
 *
 * Cost is in seconds and floors at one: a test that costs nothing to run would make
 * every decidable claim infinitely worth testing, which is a scheduler, not a score.
 */
export function score(c: Conjecture, cwd: string = process.cwd()): ScoredConjecture {
  const decidable = c.decidedBy.trim() !== ''
  const refuted = alreadyRefuted(c.claim, cwd) !== undefined
  const bits = surpriseBits(c.priorFor, c.priorAgainst)
  return {
    ...c,
    prior: prior(c.priorFor, c.priorAgainst),
    surpriseBits: bits,
    decidable,
    refuted,
    worth: decidable && !refuted ? bits / exactMax(c.costSeconds, 1) : 0,
  }
}

/**
 * The queue, most worth testing first — and ties broken by the CHEAPER test.
 *
 * A conjecture scoring zero is kept in the list rather than filtered out. It is not
 * noise: an undecidable claim is a standing invitation to build the instrument that
 * would decide it, and dropping it from the report hides that invitation. [[rules]]/slack
 * is the case in point — it was undecidable until somebody wrote the comparison, and
 * then it was a gate.
 */
export function rank(cs: readonly Conjecture[], cwd: string = process.cwd()): ScoredConjecture[] {
  return cs
    .map((c) => score(c, cwd))
    .sort((a, b) => b.worth - a.worth || a.costSeconds - b.costSeconds || a.claim.localeCompare(b.claim))
}

/**
 * The one to do next: the highest-worth conjecture that is decidable and unrefuted.
 *
 * This is the autonomy lever. `autonomy = actions ÷ prompts` ([[agent]]/mortality) rises
 * when the agent derives its own next move instead of asking for one, and an empty
 * answer here is the honest signal that it must ask — never a reason to invent a claim,
 * which would be the forgery this atom exists to avoid.
 */
export function next(cs: readonly Conjecture[], cwd: string = process.cwd()): ScoredConjecture | undefined {
  return rank(cs, cwd).find((c) => c.worth > 0)
}

/** What a conjecture is missing before it can be tested at all. */
export interface Undecided {
  readonly claim: string
  /** The instrument that would have to exist for this claim to have a verdict. */
  readonly needs: string
}

/**
 * The claims nothing here can decide, with what each one would need.
 *
 * The report that matters most over time: every entry is a gate that does not exist
 * yet, named by the claim that wants it.
 */
export function undecided(cs: readonly Conjecture[]): Undecided[] {
  return cs
    .filter((c) => c.decidedBy.trim() === '')
    .map((c) => ({ claim: c.claim, needs: `an instrument that can return a verdict on "${c.claim}"` }))
}
