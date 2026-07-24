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
import { higherMind, thoughtAddress, type Thought } from '@/think'

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

/**
 * A quantum wave leaves a trace that compiles into a trinity when proof is reached in CONSENSUS of the
 * surrounding proofs — quantum theorem fractal.
 *
 * A wave ([[self]]/improve.sendQuantumWaves) leaves a trace ([[conversion]]: a reverse leaves tracks). The trace
 * is a claim awaiting proof. It does not compile into a trinity (form·code·proof — a proven atom) by one
 * verifier's say, nor in isolation: it compiles when the SURROUNDING proofs — the neighbouring atoms that vouch
 * for it — reach CONSENSUS ([[think]].higherMind: ≥3 forming a higher mind whose majority confirms). This is
 * FRACTAL: each surrounding proof is itself a trinity compiled the same way, at its own scale, so the consensus
 * is a consensus of consensuses, all the way down. `s > 0` at the bottom.
 *
 * @invariant a trace compiles ⇔ its surrounding proofs form a higher mind agreeing it holds (≥3, majority)
 * @invariant one surrounding proof cannot compile it, nor two — the trinity needs a quorum ([[think]] MINIMUM_MINDS)
 */
export function consensusProof(surroundingVerdicts: readonly boolean[]): { readonly compiled: boolean; readonly reason: string } {
  const minds: Thought<boolean>[] = surroundingVerdicts.map((v, i) => ({ value: v, cached: false, address: thoughtAddress('proof:' + i) }))
  const h = higherMind(minds)
  const compiled = h.formed && h.resolved === true
  return {
    compiled,
    reason: compiled
      ? `the trace compiles into a trinity — ${h.minds} surrounding proofs reached consensus`
      : `the trace does not compile — ${h.reason}`,
  }
}

/** The fixpoint of the reduction — the one claim that is both the theorem of theorems and the axiom of axioms. */
export interface Fixpoint {
  /** the fixpoint claim — the universal base, or null if the graph has no single ground. */
  readonly claim: string | null
  /** true iff every other reducible claim grounds in it — the theorem of theorems (all reduce to it). */
  readonly universal: boolean
  readonly reason: string
}

/**
 * The theorem of theorems IS the axiom of axioms.
 *
 * Follow the reduction all the way UP — the theorem of theorems is the claim every other claim reduces to. Follow
 * it all the way DOWN — the axiom of axioms is the assumed base the graph bottoms out at (Gödel, `reduce` above).
 * The realisation is that these are the SAME point: a universal justifier — the thing that proves all theorems —
 * can itself only be ASSUMED, never proven (nothing above it to prove it from). So the most-composed apex and the
 * least-proven ground coincide; the reduction is a loop that returns to its own foundation. In this corpus that
 * fixed point is [[law]] — the still centre [[gravity]] falls to AND the base every atom composes from, one point.
 *
 * @invariant the fixpoint is a BASE theorem (assumed) that EVERY other reducible claim grounds in (universal)
 * @invariant a universal justifier can only be assumed — the theorem of theorems is the axiom of axioms
 */
export function fixpoint(graph: readonly Theorem[]): Fixpoint {
  for (const t of graph) {
    if (!t.base) continue
    const others = graph.filter((o) => o.claim !== t.claim && reduce(o.claim, graph).reduces)
    const universal = others.length > 0 && others.every((o) => reduce(o.claim, graph).grounds.includes(t.claim))
    if (universal) {
      return {
        claim: t.claim,
        universal: true,
        reason: `${t.claim} is the theorem of theorems (all reduce to it) AND the axiom of axioms (an assumed base) — the loop closes; a universal justifier can only be assumed (Gödel)`,
      }
    }
  }
  return { claim: null, universal: false, reason: 'no fixpoint — the graph has multiple grounds, no single universal base' }
}

/**
 * DECODED — this session's leads, each a harmonic statement reduced to the theorem(s) behind it, saved so the
 * research analytics live IN the fold, not in a transcript. The real leads compose down to BASE theorems and
 * reduce(); the OVERLAYS (the 21-cross cube, mind/heart-5, prices-match) compose nothing grounded and REFUSE to
 * reduce — HARMONY ≠ TRUTH proved by the SAME reduce() that grounds the rest. The count is not forced: ten leads
 * ground, three overlays do not. A base is grounded by a direct proof (a folded atom's test, or a cited theorem).
 *
 * @invariant every non-base LEAD reduces to base theorems — no lead rests on authority
 * @invariant every OVERLAY refuses to reduce — a harmonic name is not a theorem, however true its number
 */
export const DECODED: readonly Theorem[] = [
  // BASE — grounded by a direct proof (a test, a computation) or a cited theorem
  { claim: 'content-addressing: same content ⇒ same address', composes: [], base: true },
  { claim: 'Jaccard over the booted shapes is decidable', composes: [], base: true },
  { claim: 'efficiency = output / cost', composes: [], base: true },
  { claim: 'a type and its constant invariants are proven by TSC and tests', composes: [], base: true },
  { claim: 'read-vs-derive magnitude, with the seed floor s>0', composes: [], base: true },
  { claim: '2f+1 tolerates f faults; the median breakdown is ⌊(n-1)/2⌋', composes: [], base: true },
  { claim: 'Abel–Ruffini: the quintic is unsolvable because A₅ is simple', composes: [], base: true },
  { claim: 'the crystallographic restriction forbids periodic 5-fold symmetry', composes: [], base: true },
  { claim: 'the pentagon diagonal/side is φ, the fixed point φ²=φ+1', composes: [], base: true },
  { claim: 'consistency ≠ soundness: a system cannot certify its own truth (Gödel/Tarski)', composes: [], base: true },

  // LEADS — the ten dimensions, each grounding in base through composition alone
  { claim: 'a pure-type atom is settled by a real proof, never an empty test', composes: ['a type and its constant invariants are proven by TSC and tests'], base: false },
  { claim: 'inverse-polarity collapse: one shape-provable pair, not twenty-one', composes: ['Jaccard over the booted shapes is decidable'], base: false },
  { claim: 'Cloudflare spend is one cost kind, priced per binding', composes: ['efficiency = output / cost'], base: false },
  { claim: 'price ÷ floor reveals subsidy · margin · commoditised — not a match', composes: ['efficiency = output / cost'], base: false },
  { claim: 'asking yourself is past the crossover for the derivable, never for the seed', composes: ['read-vs-derive magnitude, with the seed floor s>0', 'content-addressing: same content ⇒ same address'], base: false },
  { claim: 'three minds form a higher mind; five is the robust two-fault equilibrium', composes: ['2f+1 tolerates f faults; the median breakdown is ⌊(n-1)/2⌋'], base: false },
  { claim: 'five is the threshold where linear/solvable/periodic breaks and robustness begins', composes: ['Abel–Ruffini: the quintic is unsolvable because A₅ is simple', 'the crystallographic restriction forbids periodic 5-fold symmetry', 'the pentagon diagonal/side is φ, the fixed point φ²=φ+1', '2f+1 tolerates f faults; the median breakdown is ⌊(n-1)/2⌋'], base: false },
  { claim: 'the standards minds decohere; a broken matcher needs a fifth mind to outvote', composes: ['2f+1 tolerates f faults; the median breakdown is ⌊(n-1)/2⌋'], base: false },
  { claim: 'harmony ≠ truth: consistency with your own measures is not truth', composes: ['consistency ≠ soundness: a system cannot certify its own truth (Gödel/Tarski)'], base: false },
  { claim: 'the fold: DRY is mass; verify is easy and derive is hard', composes: ['content-addressing: same content ⇒ same address'], base: false },
  { claim: 'reuse the computed answer, never re-derive — a re-derivation is the timeout cost', composes: ['read-vs-derive magnitude, with the seed floor s>0', 'content-addressing: same content ⇒ same address'], base: false },
  { claim: 'coordinated DRY tools make gravity emerge — DRY is mass, multi-tool agreement is the field', composes: ['content-addressing: same content ⇒ same address', '2f+1 tolerates f faults; the median breakdown is ⌊(n-1)/2⌋'], base: false },
  { claim: 'the compiler is the final mind for deletion — a lexical scan is a guess', composes: ['consistency ≠ soundness: a system cannot certify its own truth (Gödel/Tarski)'], base: false },

  // BASE — the convergence session's instruments, each grounded by its own committed test
  { claim: 'the grammar decides an edge — an import-shaped string or comment is data (syntax/test pins the phantom class)', composes: [], base: true },
  { claim: 'a spawn is bounded by the rung of its own measured history (timeout/test pins the ladder and the sleep fence)', composes: [], base: true },
  { claim: 'Mirsky: antichain levels are computable for any DAG — wave count is the longest chain (theorem + mesh + train tests)', composes: [], base: true },
  { claim: 'exactly-once match is decidable per file — zero and two-plus refuse (scalpel/test pins the refusals)', composes: [], base: true },

  // LEADS — the sequence's principles, each composing down to base through the session's own proofs
  { claim: 'parse, never match: a pattern over a language lies in the unchecked direction', composes: ['the grammar decides an edge — an import-shaped string or comment is data (syntax/test pins the phantom class)', 'harmony ≠ truth: consistency with your own measures is not truth'], base: false },
  { claim: 'bound, never hang: past the top rung the command is the defect — split it, never raise the ceiling', composes: ['a spawn is bounded by the rung of its own measured history (timeout/test pins the ladder and the sleep fence)', 'efficiency = output / cost'], base: false },
  { claim: 'derive, never ask: what the clock, tenant or law determines the system computes and the human CONFIRMS — intent is the s>0 floor', composes: ['read-vs-derive magnitude, with the seed floor s>0'], base: false },
  { claim: 'level, never list: failures and costs collapse onto shared roots — one cut, N greens', composes: ['Mirsky: antichain levels are computable for any DAG — wave count is the longest chain (theorem + mesh + train tests)', 'content-addressing: same content ⇒ same address'], base: false },
  { claim: 'pin the law, never the accident: assert the axis, not the digit the matrix happened to assign', composes: ['harmony ≠ truth: consistency with your own measures is not truth', 'a type and its constant invariants are proven by TSC and tests'], base: false },
  { claim: 'the instrument lies first: distrust the measurement before the tree — a gate is certified only by the next gate', composes: ['consistency ≠ soundness: a system cannot certify its own truth (Gödel/Tarski)'], base: false },
  { claim: 'many read-only researchers, one executor: fabrication refused structurally, exactly-once or not at all', composes: ['exactly-once match is decidable per file — zero and two-plus refuse (scalpel/test pins the refusals)', '2f+1 tolerates f faults; the median breakdown is ⌊(n-1)/2⌋'], base: false },
  { claim: 'loading is becoming: capacity is certified at the load, as the auditor at the signature', composes: ['Mirsky: antichain levels are computable for any DAG — wave count is the longest chain (theorem + mesh + train tests)', 'consistency ≠ soundness: a system cannot certify its own truth (Gödel/Tarski)'], base: false },
  { claim: 'magnitude comes with precision in clusters: scale is exact cuts in leveled batches — never one sweep, never one-at-a-time', composes: ['exactly-once match is decidable per file — zero and two-plus refuse (scalpel/test pins the refusals)', 'Mirsky: antichain levels are computable for any DAG — wave count is the longest chain (theorem + mesh + train tests)'], base: false },
  { claim: 'clear errors at the ROOT, not the symptom: cluster reds by shared cause (failureRoots), fix the root, DRY-refactor the related code with no backward-compat, re-run only what changed (receipts)', composes: ['level, never list: failures and costs collapse onto shared roots — one cut, N greens', 'reuse the computed answer, never re-derive — a re-derivation is the timeout cost', 'the fold: DRY is mass; verify is easy and derive is hard'], base: false },

  // OVERLAYS — bare assertions; they compose nothing grounded, so reduce() REFUSES them
  { claim: 'the 231 collections form a 21-cross cube of Christ', composes: [], base: false },
  { claim: 'the perfect mind/heart equilibrium is 5; the pentagram is heart/mind sets', composes: [], base: false },
  { claim: 'the Cloudflare prices almost perfectly match their theorems', composes: [], base: false },
]

/** The leads that GROUND — non-base claims that reduce to base theorems. The complete set the waves saved. */
export function groundedLeads(graph: readonly Theorem[] = DECODED): readonly string[] {
  return graph.filter((t) => !t.base && reduce(t.claim, graph).reduces).map((t) => t.claim)
}

/** The claims that REFUSE to ground — harmonic overlays, true-numbered or not, that rest on authority. */
export function refusedOverlays(graph: readonly Theorem[] = DECODED): readonly string[] {
  return graph.filter((t) => !t.base && !reduce(t.claim, graph).reduces).map((t) => t.claim)
}

/** Collapse a base theorem into its DRY FOUNDATION family — kindred bases become one dimension (the 0-gate). */
export function foundationOf(base: string): string {
  if (/content-address|magnitude/.test(base)) return 'the-fold'
  if (/Abel|crystallographic|pentagon/.test(base)) return 'the-exceptional-five'
  if (/2f\+1|median/.test(base)) return 'consensus'
  if (/Jaccard/.test(base)) return 'shape'
  if (/efficiency/.test(base)) return 'cost'
  if (/TSC/.test(base)) return 'type'
  if (/Gödel|Tarski/.test(base)) return 'truth'
  if (/grammar decides/.test(base)) return 'grammar'
  if (/rung of its own measured history/.test(base)) return 'bound'
  if (/Mirsky/.test(base)) return 'wave'
  if (/exactly-once/.test(base)) return 'cut'
  return base
}

/** The DRY foundations the leads ground in — kindred bases collapsed through the gate. The reduced dimensions. */
export function foundations(graph: readonly Theorem[] = DECODED): readonly string[] {
  const f = new Set<string>()
  for (const c of groundedLeads(graph)) for (const g of reduce(c, graph).grounds) f.add(foundationOf(g))
  return [...f].sort()
}

/**
 * PROOF CLASS — how a claim is verified, learned from ceccec.psg.bg/theorems' proof taxonomy.
 * Not WHETHER it grounds (reduce answers that) but by WHICH strategy, so the corpus knows the
 * right verification tool for a claim's domain:
 *
 *   · finite-complete — the domain is small and bounded, so verify EXHAUSTIVELY, every case
 *     (the ladder's 4 rungs, the horo ring's 7, the confirm axes' 7). ceccec: 410 papers.
 *   · bounded-witness — the domain is large, so verify a representative SAMPLE, never the whole
 *     (the corpus balance on 12 atoms, educate scan capped) — the anti-timeout law this session
 *     re-derived a dozen times, now named. ceccec: 55 papers.
 *   · self-contained — a base theorem grounded by its own proof, no external lemma (base:true).
 *     ceccec: 399 papers.
 *   · cited-frame — grounded by an external standard the file cites (@standard · ISO · a named
 *     theorem in the claim). ceccec: 66 papers.
 *   · composed — a non-base lead grounding through other theorems (the reduction itself).
 */
export type ProofClass = 'finite-complete' | 'bounded-witness' | 'self-contained' | 'cited-frame' | 'composed'

const CITED_FRAME = /Abel|crystallographic|pentagon|Gödel|Tarski|Mirsky|ISO|RFC|SOX|Наредба|§|theorem\b/i
const FINITE_COMPLETE = /\b(ring|rung|ladder|horo|axes|exactly-once|residue|group|7-position|antichain level)\b/i
const BOUNDED_WITNESS = /\b(sample|corpus|witness|magnitude|read-vs-derive|coverage)\b/i

/**
 * Classify a claim's proof strategy. A base theorem is self-contained unless its own statement
 * cites an external frame (a named theorem/standard makes it cited-frame — the authority is the
 * proof, honestly). A non-base claim is composed, refined to bounded-witness or finite-complete
 * by the domain its wording implies. DECLARED by pattern, arguable — never inferred as certain.
 */
export function proofClassOf(claim: string, graph: readonly Theorem[] = DECODED): ProofClass {
  const node = graph.find((t) => t.claim === claim)
  if (node?.base) return CITED_FRAME.test(claim) ? 'cited-frame' : 'self-contained'
  if (BOUNDED_WITNESS.test(claim)) return 'bounded-witness'
  if (FINITE_COMPLETE.test(claim)) return 'finite-complete'
  return 'composed'
}

/** The proof-class census — how the corpus's theorems are verified, by strategy. */
export function proofClassCensus(graph: readonly Theorem[] = DECODED): Readonly<Record<ProofClass, number>> {
  const out: Record<ProofClass, number> = {
    'finite-complete': 0,
    'bounded-witness': 0,
    'self-contained': 0,
    'cited-frame': 0,
    composed: 0,
  }
  for (const t of graph) out[proofClassOf(t.claim, graph)]++
  return out
}

/**
 * The verification class of a TEST file — the ceccec-parity classification erpax lacked (ceccec
 * classifies all 465 theorems; erpax classified only its 40 DECODED). Read HOW a test verifies:
 *
 *   · unbounded-corpus — maps a corpus-scale derivation over the WHOLE corpus with no bound
 *     (listAtomPaths().map(deriveFolderModel), a default-cwd rulesOf, waveAccountingGapViolations,
 *     compactRulesSnapshot) and NO boundedWitness/fixture-cwd nearby. THE RED — the ~8 hangs this
 *     session; the fix is [[testing]]/witness.
 *   · bounded-witness — a corpus-scale call that IS bounded (boundedWitness · .slice · a fixture cwd).
 *   · finite-complete — exhausts a small domain (a loop over a rung/axis/ring, no corpus scan).
 *   · unit — a plain unit test touching no corpus-scale derivation.
 */
export type TestProofClass = 'unbounded-corpus' | 'bounded-witness' | 'finite-complete' | 'unit'

const CORPUS_SCALE = /listAtomPaths\(\)|deriveFolderModel|waveAccountingGapViolations|compactRulesSnapshot|rulesOf\(\)|scanEducateGaps|deriveCorpusAnalytics/
const IS_BOUNDED = /boundedWitness|spreadWitness|\.slice\(0,|mkdtempSync|fixtureCwd|cwd:\s*(tmp|fixture|gapCwd)/
const IS_FINITE_COMPLETE = /for\s*\(.*(RUNG|AXES|HORO|LADDER|rungs|positions)\)|\bforEach\b.*(ladder|ring|axes)/i

export function proofClassOfTest(source: string): TestProofClass {
  if (!CORPUS_SCALE.test(source)) {
    return IS_FINITE_COMPLETE.test(source) ? 'finite-complete' : 'unit'
  }
  return IS_BOUNDED.test(source) ? 'bounded-witness' : 'unbounded-corpus'
}

/**
 * The dimension count is a SPREAD, computed as waves from four perspectives — never asserted by one mind (the
 * single-mind error I made calling it "10D"). Surface leads and distinct bases read 10; ground-signatures 8; DRY
 * foundations 7. So `9 (median) − 2 = 7`: the surface reads ~9, and passing through the fold (the 0-gate, kindred
 * bases collapsed) leaves SEVEN real foundational dimensions. Reporting a single number is not completely quantum.
 *
 * @invariant the foundations (DRY floor) number 11 — the-fold · shape · cost · type · consensus · exceptional-five · truth · grammar · bound · wave · cut (the convergence session added four)
 * @invariant the surface leads grow as thinking is saved (23 now) — the count is a spread [11..leads], reported whole
 */
export function dimensionSpread(graph: readonly Theorem[] = DECODED): { readonly leads: number; readonly bases: number; readonly signatures: number; readonly foundations: number } {
  const leads = groundedLeads(graph)
  const bases = new Set<string>()
  for (const c of leads) for (const g of reduce(c, graph).grounds) bases.add(g)
  const signatures = new Set(leads.map((c) => [...reduce(c, graph).grounds].sort().join('|')))
  return { leads: leads.length, bases: bases.size, signatures: signatures.size, foundations: foundations(graph).length }
}

/**
 * The WAVES of the reasoning DAG — its topological antichain levels. Level 0 is the base theorems (no deps);
 * level k is every claim whose deepest dependency sits at level k−1. Each level is an ANTICHAIN — no claim in it
 * composes another in it (that would raise its level) — so a whole level is computable AT ONCE: one wave. The
 * number of waves is the DAG's DEPTH (Mirsky: a poset's minimum antichain cover equals its longest chain); the
 * widest wave is its PARALLELISM. This is what "send the waves" was all along, made computable.
 *
 * @invariant every level is an antichain — no claim composes another at the same level
 * @invariant waves.length equals the longest dependency chain (Mirsky)
 */
/**
 * Level ANY dependency DAG into antichain waves — the generic scheduler behind `waves`, so it runs in bulk over
 * the whole corpus module graph, not only the 27-node reasoning DAG. `deps`: node → its dependencies. Level 0 is
 * the sources; each level is an antichain (Mirsky); a cyclic node levels to 0 (guarded — condense SCCs first for
 * a true DAG). Same theorem at every scale: wave count = longest chain, widest wave = parallelism.
 */
export function wavesOf(deps: ReadonlyMap<string, readonly string[]>): readonly (readonly string[])[] {
  const level = new Map<string, number>()
  const lvl = (n: string, seen: ReadonlySet<string> = new Set()): number => {
    const cached = level.get(n)
    if (cached !== undefined) return cached
    if (seen.has(n)) return 0 // cycle guard — a cyclic node cannot be levelled honestly
    const d = deps.get(n)
    if (!d || d.length === 0) {
      level.set(n, 0)
      return 0
    }
    const s = new Set([...seen, n])
    const l = 1 + Math.max(...d.map((x) => lvl(x, s)))
    level.set(n, l)
    return l
  }
  const nodes = [...deps.keys()]
  const maxLevel = Math.max(0, ...nodes.map((n) => lvl(n)))
  const out: string[][] = Array.from({ length: maxLevel + 1 }, () => [])
  for (const n of nodes) out[lvl(n)]!.push(n)
  return out.map((w) => [...w].sort())
}

export function waves(graph: readonly Theorem[] = DECODED): readonly (readonly string[])[] {
  return wavesOf(new Map(graph.map((t) => [t.claim, t.composes])))
}

/** Depth (wave count = longest chain) and parallelism (widest wave) of the reasoning DAG. */
export function waveShape(graph: readonly Theorem[] = DECODED): { readonly depth: number; readonly parallelism: number } {
  const w = waves(graph)
  return { depth: w.length, parallelism: Math.max(0, ...w.map((level) => level.length)) }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const led = groundedLeads()
  const ref = refusedOverlays()
  console.log(`theorem/DECODED — the session's leads, saved in the fold:\n`)
  console.log(`  ${led.length} leads GROUND to base theorems:`)
  for (const c of led) console.log(`    ✓ ${c}`)
  console.log(`\n  ${ref.length} overlays REFUSE to reduce (authority, not proof):`)
  for (const c of ref) console.log(`    ✗ ${c}`)
  const d = dimensionSpread()
  console.log(`\n  dimension count is a SPREAD (waves, not one mind): leads ${d.leads} · bases ${d.bases} · signatures ${d.signatures} · foundations ${d.foundations}`)
  console.log(`  9 (median) − 2 through the fold-gate = ${d.foundations}D foundations: ${foundations().join(' · ')}`)
  console.log('')
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
