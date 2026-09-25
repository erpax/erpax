/**
 * conjecture — the forward dual of [[think]]/refute: a claim formulated BEFORE it is
 * met, transformed from a law already held, ranked by what its answer would teach.
 *
 * @standard Popper — a proposition that forbids nothing explains nothing
 * @see ./SKILL.md — ../think — ../rules/refutable
 */
import { algebraLog2, exactMax } from '@/algebra'
import { alreadyRefuted } from '@/think'

export const atomPath = 'conjecture' as const

/** The operations that produce a conjecture from a law already held. DECLARED. See SKILL.md. */
export const TRANSFORMS = Object.freeze({
  /** Flip the claim's polarity — gave [[rules]]/slack. */
  involution: 'flip the polarity of the claim',
  dual: 'exchange the two sides of the relation',
  generalise: 'assert the law on every surface it does not yet reach',
  transpose: 'carry the law to a domain that shares its shape',
  compose: 'conjoin two laws and claim what follows',
} as const)

export type Transform = keyof typeof TRANSFORMS

/** A claim from a law already held, with what would decide it. */
export interface Conjecture {
  readonly claim: string
  /** Its parent law — a conjecture with no parent is a forgery. */
  readonly from: string
  readonly transform: Transform
  /** The command that would return a verdict. EMPTY = nothing here can decide it. */
  readonly decidedBy: string
  readonly priorFor: number
  readonly priorAgainst: number
  readonly costSeconds: number
}

/** A conjecture scored. */
export interface ScoredConjecture extends Conjecture {
  readonly surpriseBits: number
  readonly prior: number
  readonly decidable: boolean
  readonly refuted: boolean
  /** surprise ÷ cost, gated. Zero is a refusal, not a small number. */
  readonly worth: number
}

/** Laplace's rule of succession: `(for + 1) ÷ (for + against + 2)`. See SKILL.md. */
export function prior(priorFor: number, priorAgainst: number): number {
  return (priorFor + 1) / (priorFor + priorAgainst + 2)
}

/** Shannon surprise `−log₂ p` — which REWARDS the impossible-looking claim. See SKILL.md. */
export function surpriseBits(priorFor: number, priorAgainst: number): number {
  return -algebraLog2(prior(priorFor, priorAgainst))
}

/** `surprise ÷ cost`, gated: undecidable and already-refuted are both ZERO. See SKILL.md. */
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

/** Most worth first, ties to the cheaper test. A zero is KEPT, never filtered. See SKILL.md. */
export function rank(cs: readonly Conjecture[], cwd: string = process.cwd()): ScoredConjecture[] {
  return cs
    .map((c) => score(c, cwd))
    .sort((a, b) => b.worth - a.worth || a.costSeconds - b.costSeconds || a.claim.localeCompare(b.claim))
}

/** The autonomy lever: the highest-worth decidable claim, or nothing — never an invented one. */
export function next(cs: readonly Conjecture[], cwd: string = process.cwd()): ScoredConjecture | undefined {
  return rank(cs, cwd).find((c) => c.worth > 0)
}

/** What a conjecture is missing before it can be tested at all. */
export interface Undecided {
  readonly claim: string
  readonly needs: string
}

/** The claims nothing can decide — each one a gate that does not exist yet. */
export function undecided(cs: readonly Conjecture[]): Undecided[] {
  return cs
    .filter((c) => c.decidedBy.trim() === '')
    .map((c) => ({ claim: c.claim, needs: `an instrument that can return a verdict on "${c.claim}"` }))
}
