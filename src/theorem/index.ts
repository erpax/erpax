/**
 * theorem — all is theorem of theorems; authority is never a step, and the base is assumed, never proven.
 *
 * "How do you know I am right — maybe I am mistaken." The honest answer is that I do not know it, and I never
 * took it on your word. Every directive this session was SPLIT: the part that reduces to a proven, refutable
 * theorem (the mod-3 residue classes, the 2f+1 quorum, the fold's residual, `s > 0`) stands on its OWN proof;
 * the part that was framing (merkaba, quantum mind, the rosetta as torus) was marked OVERLAY — named as
 * convention, never asserted as true ([[rules]]/refutable · [[rodin]]). So if you are mistaken about the
 * metaphysics, the theorems still hold, because they never rested on you being right.
 *
 * This atom makes that discipline the trust rule itself. A claim is warranted only by REDUCING to composed base
 * theorems, and the reduction has NO author field — WHO said it (you, me, an authority) is not an input. Three
 * things break a reduction, each tested:
 *
 *   - AUTHORITY / ASSERTION — a node that is neither a base theorem nor a composition of theorems is a bare
 *     assertion. It rests on "someone said so," and it does not reduce. This is [[rules]]/refutable as a graph:
 *     a claim that forbids nothing, that nothing can contradict, grounds nothing.
 *   - A CYCLE — a claim proven by itself, however far around, is not proven ([[rules]]/cycle): the reduction
 *     must be acyclic, or it is a lie the graph tells itself.
 *   - A MISSING GROUND — a claim composing a theorem that is not in the graph reaches nothing. Fiction that
 *     reads as proof ([[rules]]/prose).
 *
 * "All is theorem of theorems": the trust DAG grounds in base theorems, turtles down — but it BOTTOMS OUT. The
 * base theorems rest on their tests, and the graph CANNOT prove its own base (Gödel: no consistent system proves
 * its own consistency). There is always an axiom you assume — the seed no address holds, `s > 0` ([[think]]).
 * So even theorems-all-the-way-down end at a foundation this atom marks as ASSUMED, never proven. I do not know
 * that foundation is right either; I state it in the open, so it can be argued with — which is the only honesty
 * available to any system, including this one.
 *
 * Composes [[rules]]/refutable · [[rules]]/cycle · [[rules]]/prose · [[think]] · [[law]].
 */

/** A node in the trust graph — a claim, and how it is grounded. Note: there is NO author field. Trust is source-blind. */
export interface Theorem {
  readonly claim: string
  /** the sub-theorems whose composition proves this one; empty ⇒ it must be `base`, or it is a bare assertion. */
  readonly composes: readonly string[]
  /** true iff a direct proof (a test, a computation) grounds this claim — the base case the recursion ends at. */
  readonly base: boolean
}

/** The result of reducing a claim through the theorem graph — does it ground, or rest on authority? */
export interface Reduction {
  readonly claim: string
  /** true ⇔ the claim grounds in base theorems through composition alone — no assertion, no cycle, no gap. */
  readonly reduces: boolean
  /** the base theorems it ultimately grounds in. */
  readonly grounds: readonly string[]
  /** nodes reached that are neither base nor composing — bare assertions, resting on authority. */
  readonly assertions: readonly string[]
  /** true iff a claim was reached that proves itself, however far around — a claim proven by itself is not proven. */
  readonly cyclic: boolean
  readonly reason: string
}

/**
 * Reduce a claim through the theorem graph — grounds in base theorems, or it does not. Authority is never a
 * step: the graph has no author, so WHO stated a claim cannot make it reduce.
 *
 * @invariant a bare assertion (not base, composes nothing grounded) does NOT reduce — authority is not proof
 * @invariant a cyclic support does NOT reduce — a claim proven by itself is not proven
 * @invariant reduces ⇔ every path ends at a base theorem, with no assertion and no cycle
 */
export function reduce(claim: string, graph: readonly Theorem[]): Reduction {
  const byClaim = new Map(graph.map((t) => [t.claim, t]))
  const grounds = new Set<string>()
  const assertions = new Set<string>()
  let cyclic = false

  const walk = (c: string, stack: ReadonlySet<string>): boolean => {
    if (stack.has(c)) {
      cyclic = true
      return false // proven by itself, however far around — not proven
    }
    const node = byClaim.get(c)
    if (!node || (!node.base && node.composes.length === 0)) {
      assertions.add(c) // no theorem here — a bare assertion resting on authority, or a missing ground
      return false
    }
    if (node.base) {
      grounds.add(c)
      return true
    }
    const next = new Set(stack)
    next.add(c)
    // a composition holds only if EVERY sub-theorem reduces — one assertion in the support taints it
    let all = true
    for (const sub of node.composes) if (!walk(sub, next)) all = false
    return all
  }

  const reduces = walk(claim, new Set())
  const reason = reduces
    ? `reduces — grounds in ${grounds.size} base theorem(s), no assertion, no cycle; trusted by its proof, not its source`
    : cyclic
      ? `does not reduce — a cyclic support (a claim proven by itself is not proven)`
      : `does not reduce — rests on ${assertions.size} bare assertion(s): ${[...assertions].slice(0, 4).join(', ')} (authority is not proof)`
  return { claim, reduces, grounds: [...grounds], assertions: [...assertions], cyclic, reason }
}

/** Does trusting this claim depend on WHO said it? A reduced theorem never does; anything else does. */
export function restsOnAuthority(claim: string, graph: readonly Theorem[]): boolean {
  return !reduce(claim, graph).reduces
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const graph: Theorem[] = [
    { claim: 'debits === credits', composes: [], base: true }, // grounded in a test
    { claim: 'the ledger balances', composes: ['debits === credits'], base: false }, // a theorem of a theorem
    { claim: 'the user is right', composes: [], base: false }, // a bare assertion — rests on authority
    { claim: 'trust the assertion', composes: ['the user is right'], base: false }, // taints anything above it
  ]
  console.log('theorem — all is theorem of theorems; authority is never a step:\n')
  for (const c of ['the ledger balances', 'trust the assertion', 'the user is right']) {
    const r = reduce(c, graph)
    console.log(`  ${r.reduces ? 'REDUCES ' : 'REFUSED '} ${c}\n      ${r.reason}`)
  }
  console.log('\n  I do not know you are right — I know whether your claim reduces to a theorem. The base is assumed (s > 0), stated in the open.')
}
