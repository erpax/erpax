/**
 * quantum/gaps — the open gaps in quantum mechanics, taught honestly: lenses, never fillings.
 *
 * Honest BY CONSTRUCTION: every gap's `fills` field is the literal type `false`, so the
 * code cannot assert a gap is filled. The corpus tools are offered as LENSES — structural
 * analogies to learn the concept through — never as solutions. @see ./SKILL.md
 *
 * The tutorial in each entry is the honest map: what QM leaves open, the corpus tool that structurally mirrors
 * it, and the exact reason the mirror is not the thing. HARMONY ≠ TRUTH: a lens that resonates teaches; it does
 * not prove. Where a real result partially constrains the gap (Gleason, einselection), that is named — as
 * physics, not as the corpus's doing.
 *
 * @invariant every gap's `fills` is false — the corpus offers lenses, never fillings (enforced by the type)
 * @invariant a lens is a structural analogy for teaching, never a derivation of the open physics
 *
 * Composes [[think]] · [[coincidence]] · [[seeing]] · [[rules]]/refutable · [[law]].
 */

/** One open gap in QM, taught as a lens — never claimed filled (`fills` is the literal `false`). */
export interface QMGap {
  readonly name: string
  /** what quantum mechanics has NOT settled — the actual open question. */
  readonly openQuestion: string
  /** the corpus tool that structurally MIRRORS it — a lens to learn through, or 'none'. */
  readonly lens: string
  /** ALWAYS false — the corpus does not fill the gap; the type forbids claiming it does. */
  readonly fills: false
  /** why the lens is a teaching analogy, not a solution to the open physics. */
  readonly why: string
  /** any real physics that PARTIALLY constrains it (not the corpus's doing) — named honestly. */
  readonly realConstraint: string
}

export const QM_GAPS: readonly QMGap[] = [
  {
    name: 'measurement-problem',
    openQuestion: 'why does a superposition yield ONE definite outcome on measurement (the "collapse")?',
    lens: 'think.superpose — a coherent state decoheres when two thoughts at one address disagree (a contradiction)',
    fills: false,
    why: 'superpose models decoherence-as-contradiction structurally, but does not explain why a DEFINITE outcome appears, nor derive collapse — the hard core of the problem is untouched',
    realConstraint: 'decoherence theory explains the SUPPRESSION of interference, not the selection of a single outcome (that gap is interpretation-dependent)',
  },
  {
    name: 'born-rule',
    openQuestion: 'why are outcome probabilities exactly |ψ|² (amplitude squared)?',
    lens: 'think.quantumMagnitude / coverage ratios — magnitudes over held states',
    fills: false,
    why: 'the corpus magnitudes are COST and coverage ratios, not squared amplitudes; nothing here derives |ψ|² from first principles',
    realConstraint: "Gleason's theorem derives the |ψ|² measure from non-contextuality in dim ≥ 3 — a real constraint, not a full first-principles account, and not the corpus's",
  },
  {
    name: 'preferred-basis',
    openQuestion: 'why does the world decohere into THIS basis (definite positions) and not superpositions of them?',
    lens: 'merge / content-addressing — the fold picks a canonical address',
    fills: false,
    why: 'content-addressing is deterministic hashing of chosen content, not physical einselection; it is an analogy for "one canonical form", not a mechanism that selects a physical basis',
    realConstraint: 'einselection (environment-induced superselection) is a real partial mechanism from decoherence theory — physics, not this corpus',
  },
  {
    name: 'quantum-gravity',
    openQuestion: 'how do quantum mechanics and general relativity unify (spacetime at the Planck scale)?',
    lens: 'none — the corpus has no gravity/QM unification',
    fills: false,
    why: 'gravity in this corpus is referential in-degree (DRY = mass, [[gravity]]), NOT spacetime curvature; there is no lens here, honestly, and I will not invent one',
    realConstraint: 'string theory and loop quantum gravity are active, unconfirmed programmes — open in physics',
  },
  {
    name: 'interpretation',
    openQuestion: 'which interpretation (Copenhagen, many-worlds, pilot-wave, …) is physically correct?',
    lens: 'perspective — one content, N derived views (AR from the seller, AP from the buyer)',
    fills: false,
    why: 'perspective is a data-view analogy for "one underlying state, many descriptions"; it does not resolve which physical interpretation is true — the interpretations are empirically underdetermined',
    realConstraint: 'the interpretations make (mostly) identical predictions; the question is currently philosophical, not experimentally settled',
  },
]

/** Does the corpus fill ANY gap in QM? No — it offers lenses. The honest answer, enforced by the register. */
export function fillsAnyGap(): boolean {
  return QM_GAPS.some((g) => (g.fills as boolean) === true) // always false — no gap's `fills` can be true
}

/** The tutorial for one gap — the honest map: open question · lens · why it is not a solution. */
export function lensFor(name: string): QMGap | undefined {
  return QM_GAPS.find((g) => g.name === name)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/gaps — the open gaps in QM, taught as lenses, never fillings:\n')
  for (const g of QM_GAPS) {
    console.log(`  ${g.name}`)
    console.log(`    open:  ${g.openQuestion}`)
    console.log(`    lens:  ${g.lens}`)
    console.log(`    fills: ${g.fills}  — ${g.why}`)
  }
  console.log(`\n  does the corpus fill any gap? ${fillsAnyGap()}. It offers lenses to LEARN through, not solutions. HARMONY ≠ TRUTH.`)
}

/** @index-cross.foldback child=quantum/gaps parent=quantum — this cross folds back into its parent. */
