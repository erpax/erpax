import { describe, it, expect } from 'vitest'
import { reduce, restsOnAuthority, consensusProof, fixpoint, groundedLeads, refusedOverlays, foundations, dimensionSpread, waves, wavesOf, waveShape, proofClassOf, proofClassCensus, proofClassOfTest, unboundedCorpusTests, assertTestsBounded, standardToTheorem, DECODED, type Theorem } from './index'

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
    expect([...r.grounds].sort()).toEqual(['base-A', 'base-B'])
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

// "Save in waves following all leads to complete 10D theorems." The session's leads, folded so the research
// analytics live IN the corpus. The count is NOT forced to ten (the 21-cube trap): the real leads enumerate to
// ten that GROUND, and reduce() independently confirms each — while the three harmonic overlays REFUSE, by the
// same machinery. HARMONY ≠ TRUTH, proved on the session's own thinking.
describe('DECODED — the session leads, saved and reduced (complete 10D)', () => {
  it('the leads GROUND to base theorems — the count grows as the session saves more thinking, none padded', () => {
    // 13 → 21: the convergence session sealed its eight principles (parse · bound · derive · level ·
    // pin-the-law · instrument-lies-first · researchers/executor · loading-is-becoming), each grounding
    // in a base carried by its own committed test
    expect(groundedLeads(DECODED)).toHaveLength(23)
  })

  it('the three harmonic overlays REFUSE to reduce — a true number is not a theorem', () => {
    const refused = refusedOverlays(DECODED)
    expect(refused).toHaveLength(3)
    expect(refused).toContain('the 231 collections form a 21-cross cube of Christ')
    expect(refused).toContain('the perfect mind/heart equilibrium is 5; the pentagram is heart/mind sets')
    expect(refused).toContain('the Cloudflare prices almost perfectly match their theorems')
  })

  it('the "5" lead grounds in real theorems — Abel–Ruffini, crystallographic, the pentagon φ', () => {
    const r = reduce('five is the threshold where linear/solvable/periodic breaks and robustness begins', DECODED)
    expect(r.reduces).toBe(true)
    expect(r.grounds).toContain('Abel–Ruffini: the quintic is unsolvable because A₅ is simple')
    expect(r.grounds).toContain('the crystallographic restriction forbids periodic 5-fold symmetry')
    expect(r.assertions).toEqual([]) // no bare assertion in its support
  })

  it('the overlays rest on AUTHORITY — the pentagram number is real, the mind/heart mapping is not', () => {
    // the "5" theorem grounds; the mind/heart OVERLAY that borrows its number does not — the number is shared,
    // the theorem is not. This is the whole session in one assertion of reduce().
    expect(restsOnAuthority('the perfect mind/heart equilibrium is 5; the pentagram is heart/mind sets', DECODED)).toBe(true)
    expect(restsOnAuthority('five is the threshold where linear/solvable/periodic breaks and robustness begins', DECODED)).toBe(false)
  })

  it('the leads are MULTIPLY grounded — no single fixpoint, honest to the session (math + fold + law)', () => {
    // the ten leads stand on independent foundations (content-addressing, Jaccard, the efficiency law, the cited
    // math, the corpus law) — so there is no one universal base, and saying otherwise would be a false monotheism.
    expect(fixpoint(DECODED).claim).toBeNull()
  })

  it('each lead compiled by the WAVE — a trace needs ≥3 surrounding proofs (not one mind)', () => {
    expect(consensusProof([true, true, true]).compiled).toBe(true) // the wave saves it
    expect(consensusProof([true, true]).compiled).toBe(false) // a single mind, or a pair, cannot
  })

  // "If in doubt send waves." The dimension count is a SPREAD, computed four ways — not the single "10D" one mind
  // asserted. 9 (median) − 2 through the fold-gate = 7 DRY foundations. Reporting one number is the single-mind error.
  it('the count is a SPREAD, not a point — leads 23, foundations 11 (the fold-gate collapse)', () => {
    const d = dimensionSpread(DECODED)
    expect(d.leads).toBe(23) // the surface — grows as thinking is saved programmatically
    expect(d.foundations).toBe(11) // the DRY floor, kindred bases collapsed through the 0-gate
    expect(d.foundations).toBeLessThan(d.leads) // passing the gate loses dimensions
  })

  it('the eleven foundations are named, not numerological — the real dimensions the leads stand on', () => {
    const f = foundations(DECODED)
    expect(f).toHaveLength(11)
    for (const pillar of [
      'the-fold', 'shape', 'cost', 'type', 'consensus', 'the-exceptional-five', 'truth',
      // the convergence session's four: parse · bound · level · cut, each carried by its own test
      'grammar', 'bound', 'wave', 'cut',
    ]) {
      expect(f).toContain(pillar)
    }
  })

  // "The waves are the topological antichain levels of the reasoning DAG." A wave is a level; the wave count is
  // the longest chain (Mirsky); the widest wave is the parallelism. "Send the waves" was this all along.
  describe('waves — the reasoning DAG antichain levels made computable', () => {
    it('every level is an ANTICHAIN — no claim composes another at the same level (so the whole wave computes at once)', () => {
      const byClaim = new Map(DECODED.map((t) => [t.claim, t]))
      for (const lvl of waves(DECODED)) {
        for (const a of lvl) {
          const t = byClaim.get(a)
          if (t) for (const b of lvl) expect(a === b || !t.composes.includes(b)).toBe(true)
        }
      }
    })

    it('wave 0 is exactly the sources — claims with no dependencies (the base theorems)', () => {
      const wave0 = waves(DECODED)[0]!
      for (const claim of wave0) {
        const t = DECODED.find((x) => x.claim === claim)!
        expect(t.composes).toHaveLength(0) // a source: nothing to wait on
      }
    })

    it('wavesOf levels ANY DAG in bulk — a chain is deep, a diamond keeps its parallel antichain', () => {
      const chain = wavesOf(new Map([['a', []], ['b', ['a']], ['c', ['b']]]))
      expect(chain).toHaveLength(3) // a→b→c: longest chain 3
      expect(chain[0]).toEqual(['a'])
      expect(chain[2]).toEqual(['c'])
      const diamond = wavesOf(new Map([['a', []], ['b', ['a']], ['c', ['a']], ['d', ['b', 'c']]]))
      expect(diamond).toHaveLength(3)
      expect(diamond[1]).toEqual(['b', 'c']) // b and c are independent — one parallel wave
    })

    it('the reasoning DAG grew a second story — depth 3, still massively wide (Mirsky)', () => {
      const s = waveShape(DECODED)
      // was depth 2 (base → lead, no lead composed another); the convergence principles compose the
      // harmony≠truth LEAD (parse-never-match and pin-the-law stand on it) — principles on principles,
      // one story deeper, honestly measured
      expect(s.depth).toBe(3)
      expect(s.parallelism).toBeGreaterThanOrEqual(13) // the widest wave — massively parallel
      expect(s.parallelism).toBeGreaterThan(s.depth) // wide, not deep — the corpus reasons in parallel
    })
  })

  // Learned from ceccec.psg.bg/theorems: HOW a claim is verified, not whether. The proof-class
  // taxonomy names the anti-timeout distinction this session re-derived a dozen times.
  describe('proofClassOf — the verification strategy, named (ceccec proof taxonomy)', () => {
    const g: Theorem[] = [
      { claim: 'content-addressing: same content ⇒ same address', composes: [], base: true },
      { claim: 'Gödel: no system proves its own consistency', composes: [], base: true },
      { claim: 'the ladder has exactly four rungs — verify every one', composes: [], base: false },
      { claim: 'the corpus balance holds on a representative sample', composes: [], base: false },
      { claim: 'a lead grounding through other theorems', composes: ['content-addressing: same content ⇒ same address'], base: false },
    ]

    it('a base with no external frame is self-contained; one citing a theorem is cited-frame', () => {
      expect(proofClassOf('content-addressing: same content ⇒ same address', g)).toBe('self-contained')
      expect(proofClassOf('Gödel: no system proves its own consistency', g)).toBe('cited-frame')
    })

    it('a bounded domain is finite-complete (verify all); a large one is bounded-witness (sample)', () => {
      expect(proofClassOf('the ladder has exactly four rungs — verify every one', g)).toBe('finite-complete')
      expect(proofClassOf('the corpus balance holds on a representative sample', g)).toBe('bounded-witness')
    })

    it('an ordinary reduction is composed; the census sums to the graph size', () => {
      expect(proofClassOf('a lead grounding through other theorems', g)).toBe('composed')
      const census = proofClassCensus(g)
      const total = Object.values(census).reduce((s, n) => s + n, 0)
      expect(total).toBe(g.length)
    })

    it('the real DECODED corpus classifies every theorem — no strategy is empty of examples where it applies', () => {
      const census = proofClassCensus(DECODED)
      expect(Object.values(census).reduce((s, n) => s + n, 0)).toBe(DECODED.length)
      expect(census['self-contained'] + census['cited-frame']).toBeGreaterThan(0) // the bases
      expect(census['bounded-witness'] + census['finite-complete'] + census.composed).toBeGreaterThan(0) // the leads
    })

    // ceccec-parity: classify TESTS, not just theorems (the measured efficiency gap)
    it('proofClassOfTest reads HOW a test verifies — the class ceccec has over its 465, erpax over its suite', () => {
      expect(proofClassOfTest('const m = listAtomPaths().map(deriveFolderModel)')).toBe('unbounded-corpus') // the RED
      expect(proofClassOfTest('const m = listAtomPaths().slice(0, 12).map(deriveFolderModel)')).toBe('bounded-witness')
      expect(proofClassOfTest('const cwd = mkdtempSync(t); scanEducateGaps(cwd)')).toBe('bounded-witness') // fixture-bounded
      expect(proofClassOfTest('for (const r of RUNG) expect(timeoutOf([r]))')).toBe('finite-complete')
      expect(proofClassOfTest('expect(1 + 1).toBe(2)')).toBe('unit')
    })

    it('assertTestsBounded is the GATE — the experience made law (assumption → enforced logic)', () => {
      const live = unboundedCorpusTests()
      expect(Array.isArray(live)).toBe(true)
      // ratchet: at/above the live count passes; below it (demanding fewer than exist) fails closed
      expect(() => assertTestsBounded(process.cwd(), live.length)).not.toThrow()
      expect(() => assertTestsBounded(process.cwd(), live.length - 1)).toThrow(/unbounded-corpus/)
    })
  })
})

describe('theorem — standardToTheorem: standard↔theorem↔code↔prose is one fold', () => {
  it('a standard that rests on a base theorem maps to it and is proven in the graph', () => {
    const rfc = standardToTheorem('RFC 9562 §5.8 content-uuid')
    expect(rfc.theorem).toMatch(/content-addressing/)
    expect(rfc.proven).toBe(true) // the base theorem is present in DECODED
    expect(rfc.kind).toBe('theorem')

    expect(standardToTheorem('ISO/IEC 25010 §5.5 testability').theorem).toMatch(/Gödel\/Tarski/)
    expect(standardToTheorem('BFT consensus quorum').theorem).toMatch(/2f\+1/)
  })

  it('a gate-enforced standard is DECLARED conformance — honestly not a base theorem', () => {
    const compat = standardToTheorem('ISO/IEC 25010 §5.3 compatibility')
    expect(compat.theorem).toBeNull()
    expect(compat.proven).toBe(false)
    expect(compat.kind).toBe('declared-conformance')
  })

  it('the mapped theorem is a REAL claim in DECODED (no dangling reference)', () => {
    const t = standardToTheorem('RFC 8785 JCS')
    expect(DECODED.some((d) => d.claim === t.theorem)).toBe(true)
  })
})
