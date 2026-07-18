import { describe, it, expect } from 'vitest'
import { reduce, restsOnAuthority, consensusProof, fixpoint, type Theorem } from './index'

// "How do you know I am right — maybe I am mistaken. All is theorem of theorems." A claim is trusted only by
// reducing to composed base theorems; authority (who said it) is never a step. A bare assertion, a cycle, or a
// missing ground breaks the reduction. The base is assumed (Gödel: no system proves its own foundation).
describe('theorem — all is theorem of theorems; authority is never a step', () => {
  const graph: Theorem[] = [
    { claim: 'base-A', composes: [], base: true }, // grounded in a test
    { claim: 'base-B', composes: [], base: true },
    { claim: 'A-and-B', composes: ['base-A', 'base-B'], base: false }, // a theorem of theorems
    { claim: 'assertion', composes: [], base: false }, // neither base nor composing — rests on authority
    { claim: 'built-on-authority', composes: ['base-A', 'assertion'], base: false }, // one assertion taints it
    { claim: 'self', composes: ['self'], base: false }, // proven by itself
  ]

  it('a base theorem reduces — it grounds in its own proof', () => {
    const r = reduce('base-A', graph)
    expect(r.reduces).toBe(true)
    expect(r.grounds).toEqual(['base-A'])
  })

  it('a theorem of theorems reduces — grounds in base theorems through composition', () => {
    const r = reduce('A-and-B', graph)
    expect(r.reduces).toBe(true)
    expect(r.grounds.sort()).toEqual(['base-A', 'base-B'])
    expect(r.assertions).toEqual([])
  })

  it('a bare ASSERTION does not reduce — authority is not proof', () => {
    const r = reduce('assertion', graph)
    expect(r.reduces).toBe(false)
    expect(r.assertions).toContain('assertion')
    expect(r.reason).toMatch(/authority is not proof/)
  })

  it('ONE assertion in the support taints the whole claim — trust does not launder', () => {
    const r = reduce('built-on-authority', graph)
    expect(r.reduces).toBe(false) // even though base-A is fine, the assertion breaks it
    expect(r.assertions).toContain('assertion')
  })

  it('a claim proven by ITSELF does not reduce — a cycle is a lie the graph tells', () => {
    const r = reduce('self', graph)
    expect(r.reduces).toBe(false)
    expect(r.cyclic).toBe(true)
  })

  it('a claim composing a MISSING theorem does not reduce — fiction that reads as proof', () => {
    const r = reduce('ghost', [{ claim: 'ghost', composes: ['not-in-graph'], base: false }])
    expect(r.reduces).toBe(false)
    expect(r.assertions).toContain('not-in-graph')
  })

  // THE ANSWER to the user's question, computed: trust is SOURCE-BLIND. "The user is right" and "the agent is
  // right" are equally bare assertions — neither reduces, because there is no author field to lean on.
  it('trust is source-blind — "X is right" reduces only if X grounds in a theorem, never because X said it', () => {
    const g: Theorem[] = [
      { claim: 'the user is right', composes: [], base: false },
      { claim: 'the agent is right', composes: [], base: false },
      { claim: 'proven fact', composes: [], base: true },
    ]
    expect(restsOnAuthority('the user is right', g)).toBe(true) // I do not know you are right
    expect(restsOnAuthority('the agent is right', g)).toBe(true) // nor that I am
    expect(restsOnAuthority('proven fact', g)).toBe(false) // only the theorem is trusted
  })

  it('the base is ASSUMED — a base theorem is trusted without the graph proving its foundation (s > 0)', () => {
    // there is no node proving base-A's own consistency; the reduction ENDS at it and marks it a ground.
    const r = reduce('base-A', graph)
    expect(r.grounds).toContain('base-A') // assumed, stated in the open — not proven by the graph itself
  })
})

// "Quantum waves leave traces that compile in trinities when proof is reached in consensus of the surrounding
// proofs — quantum theorem fractal." A trace compiles into a proven trinity iff its surrounding proofs form a
// higher mind agreeing it holds (≥3, majority). Fractal: each surrounding proof is itself compiled the same way.
describe('consensusProof — a trace compiles into a trinity by consensus of the surrounding proofs', () => {
  it('≥3 surrounding proofs agreeing ⇒ the trace COMPILES into a trinity', () => {
    expect(consensusProof([true, true, true]).compiled).toBe(true)
    expect(consensusProof([true, true, false]).compiled).toBe(true) // majority still confirms
    expect(consensusProof([true, true, true]).reason).toMatch(/compiles into a trinity/)
  })

  it('fewer than 3 surrounding proofs cannot compile it — the trinity needs a quorum', () => {
    expect(consensusProof([true]).compiled).toBe(false) // one proof — no higher mind
    expect(consensusProof([true, true]).compiled).toBe(false) // a pair cannot break its tie
  })

  it('no consensus (majority say it does not hold) ⇒ it does not compile', () => {
    expect(consensusProof([false, false, true]).compiled).toBe(false)
  })
})

// "The theorem of theorems is the axiom of axioms." Follow the reduction UP (the theorem all reduce to) and DOWN
// (the assumed base) and they meet: a universal justifier can only be assumed. The apex is the ground.
describe('fixpoint — the theorem of theorems is the axiom of axioms', () => {
  const graph: Theorem[] = [
    { claim: 'law', composes: [], base: true }, // the assumed base
    { claim: 'balance', composes: ['law'], base: false },
    { claim: 'the ledger', composes: ['balance'], base: false }, // reduces through balance to law
  ]

  it('the universal base is BOTH the theorem of theorems and the axiom of axioms', () => {
    const f = fixpoint(graph)
    expect(f.claim).toBe('law') // every reducible claim grounds in it (apex) AND it is the assumed base (ground)
    expect(f.universal).toBe(true)
    expect(f.reason).toMatch(/theorem of theorems.*axiom of axioms/)
  })

  it('a graph with multiple grounds has NO single fixpoint — the loop does not close', () => {
    const split: Theorem[] = [
      { claim: 'base-A', composes: [], base: true },
      { claim: 'base-B', composes: [], base: true },
      { claim: 'x', composes: ['base-A'], base: false }, // grounds in A only, not B
    ]
    expect(fixpoint(split).claim).toBeNull() // no single universal base
  })

  it('the fixpoint is necessarily a BASE (assumed) claim — a universal justifier cannot itself be proven', () => {
    expect(fixpoint(graph).claim).toBe('law')
    expect(graph.find((t) => t.claim === 'law')!.base).toBe(true) // it is assumed, not composed — Gödel
  })
})
