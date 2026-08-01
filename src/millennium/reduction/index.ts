/**
 * millennium/reduction — the missing tools: make a Clay attempt CONSTRUCTIBLE and CHECKABLE.
 *
 * [[theorem]]'s `reduce` already answers *does this claim ground out* and returns the bare
 * `assertions` blocking it. What did not exist is everything between that verdict and an attempt:
 *
 *   - a way to PROPOSE a reduction without editing the graph, and see what it would still leave open
 *   - the FRONTIER — the ordered list of links to close, so a claim is a work item rather than a mood
 *   - the bridge from a grounded reduction to a [[duel]] round, so `attempt()` can be fed by proof
 *     rather than by assertion
 *
 * These are tools for CONSTRUCTING an attempt. They do not produce a proof, and nothing here can set
 * `corpusSolves` — that field is the literal type `false` in [[millennium]] and stays so. What they
 * remove is the excuse: a claim that "rests on authority" now comes back with the exact links whose
 * grounding would flip it, so the next move is nameable instead of rhetorical.
 *
 * **Why "solved at once" is the harder claim, computed rather than argued.** Solving the seven
 * together means proving they REDUCE to one result. `jointReduction` builds exactly that node — one
 * claim composing all seven — and reports its frontier. Today that frontier is all seven, because no
 * reduction between any two is known; a single edge closed there would be a landmark, and the tool
 * says which edge rather than leaving it as a feeling.
 *
 * @law a Clay attempt is constructed, not asserted — propose a reduction, read its frontier, close a
 *      link, and only a grounded reduction may become a round the duel can weigh.
 * @invariant a proposal never mutates the graph — it composes a candidate and reports against a copy
 * @invariant roundFromReduction yields proved:true ONLY when the reduction fully grounds
 * @invariant corpusSolves stays false whatever any reduction says — the register is not writable here
 * @see ./SKILL.md -- ../index.ts -- ../../theorem -- ../../duel
 */
import type { Round } from '@/duel'
import { DECODED, reduce, type Reduction, type Theorem } from '@/theorem'

import { MILLENNIUM, resolutionClaim, type Problem } from '../index'

/** A reduction proposed against the graph without joining it — the candidate and what it leaves open. */
export interface Proposal {
  readonly claim: string
  /** the sub-claims the proposer says compose it */
  readonly composes: readonly string[]
  readonly reduction: Reduction
  /** the links still ungrounded — the work, ordered and nameable */
  readonly frontier: readonly string[]
}

/**
 * Propose that `claim` follows from `composes`, against a graph, WITHOUT editing it. Returns what the
 * reduction would say and the frontier still open. Extra nodes may be supplied to declare the
 * sub-claims themselves — that is how a multi-step reduction is built one link at a time.
 */
export function proposeReduction(
  claim: string,
  composes: readonly string[],
  extra: readonly Theorem[] = [],
  graph: readonly Theorem[] = DECODED,
): Proposal {
  const candidate: Theorem = { claim, composes, base: false }
  const merged = [...graph, ...extra.filter((e) => e.claim !== claim), candidate]
  const reduction = reduce(claim, merged)
  return { claim, composes, reduction, frontier: reduction.assertions }
}

/**
 * The frontier of a claim as it stands in the graph — the links whose grounding would close it. This
 * is the fix list `reduce` implies and never enumerated as work.
 */
export function reductionFrontier(claim: string, graph: readonly Theorem[] = DECODED): readonly string[] {
  return reduce(claim, graph).assertions
}

/** Every problem's own resolution claim and its current frontier — seven work items, not a mood. */
export function problemFrontiers(
  graph: readonly Theorem[] = DECODED,
): readonly { readonly problem: Problem; readonly claim: string; readonly frontier: readonly string[] }[] {
  return MILLENNIUM.map((problem) => {
    const claim = resolutionClaim(problem)
    return { problem, claim, frontier: reductionFrontier(claim, graph) }
  })
}

/** The claim that the seven are ONE result — "solved at once", built so it can be measured. */
export const JOINT_CLAIM = 'the seven Millennium Problems reduce to one result'

/**
 * The joint reduction: one claim composing all seven resolution claims. Its frontier is what "at once"
 * would have to close, and today that is all seven — because no reduction between any two of them is
 * known. Naming it does not weaken the claim; it makes it a list.
 */
export function jointReduction(graph: readonly Theorem[] = DECODED): Proposal {
  return proposeReduction(JOINT_CLAIM, MILLENNIUM.map(resolutionClaim), [], graph)
}

/**
 * Bridge a reduction into a [[duel]] round. A FULLY GROUNDED reduction is a proof this round — that is
 * the only thing that sets `proved`. Anything short of grounding is `proved: false`, so an attempt
 * built from an open reduction cannot survive, and `attempt()` will say so.
 *
 * `refuted` is never set from a reduction: refutation is the refuter's move, found by counterexample,
 * not derived from a proof's absence (Popper — failing to prove is not disproving).
 */
export function roundFromReduction(r: Reduction): Round {
  return { proved: r.reduces && !r.cyclic, refuted: false }
}

/** Is this claim ready to be attempted — grounded, acyclic, nothing left on the frontier? */
export function readyToAttempt(claim: string, graph: readonly Theorem[] = DECODED): boolean {
  const r = reduce(claim, graph)
  return r.reduces && !r.cyclic && r.assertions.length === 0
}

/** How far a claim is from an attempt: 0 when ready, otherwise the number of links left to ground. */
export function distanceToAttempt(claim: string, graph: readonly Theorem[] = DECODED): number {
  return reductionFrontier(claim, graph).length
}
