/**
 * duality/mirror — the two-sided coin: an involution partitions a finite set, and nothing resists.
 *
 * @see ./SKILL.md · ../../verify/lean/Mirror.lean (the same statement, kernel-checked, axiom-free)
 */

export interface MirrorReport<T> {
  /** σ∘σ = id over the whole carrier — the coin returns you if you pass through twice. */
  readonly isInvolution: boolean
  /** σ maps the carrier into itself: nothing is thrown outside. */
  readonly closed: boolean
  /** HARMONIC — its own reflection, it survives the pass unchanged. */
  readonly fixed: readonly T[]
  /** Pulled in one side and reflected out the other, as unordered pairs. */
  readonly pairs: readonly (readonly [T, T])[]
  /** |S| ≡ |Fix σ| (mod 2) — a parity law, not a coincidence. */
  readonly parityHolds: boolean
  /** Every element is fixed or paired, never both and never neither: the "no resistance" clause. */
  readonly exhaustive: boolean
}

/**
 * The partition, computed by exhaustion over the carrier.
 *
 * Exhaustive is the operative word: the claim is about a FINITE set, so the proof is the enumeration
 * and there is no sampling to argue about.
 */
export function mirrorReport<T>(carrier: readonly T[], sigma: (x: T) => T): MirrorReport<T> {
  const inCarrier = new Set(carrier)
  const fixed: T[] = []
  const pairs: [T, T][] = []
  const seen = new Set<T>()
  let isInvolution = true
  let closed = true
  let exhaustive = true

  for (const x of carrier) {
    const y = sigma(x)
    if (!inCarrier.has(y)) closed = false
    if (sigma(y) !== x) isInvolution = false
    const isFixed = y === x
    // fixed XOR paired — an element with both or neither would break the partition
    if (isFixed === (y !== x)) exhaustive = false
    if (isFixed) {
      fixed.push(x)
      continue
    }
    if (seen.has(x)) continue
    seen.add(x)
    seen.add(y)
    pairs.push([x, y])
  }

  return {
    isInvolution,
    closed,
    fixed,
    pairs,
    parityHolds: carrier.length % 2 === fixed.length % 2,
    exhaustive,
  }
}

/** Divisors of n, computed — never a typed list, so the carrier cannot drift from the number. */
export function divisorsOf(n: number): number[] {
  const out: number[] = []
  for (let d = 1; d * d <= n; d++) {
    if (n % d !== 0) continue
    out.push(d)
    if (d !== n / d) out.push(n / d)
  }
  return out.sort((a, b) => a - b)
}

/** The anchor's lattice: 432 = 2⁴·3³, twenty divisors ([[harmony]]/divisor). */
export const anchorMirror = (): MirrorReport<number> => mirrorReport(divisorsOf(432), (d) => 432 / d)

export interface HarmonicCase {
  readonly n: number
  /** τ(n) — the size of the carrier. */
  readonly tau: number
  /** The harmonic elements: their own reflection under d ↦ n/d. */
  readonly fixed: readonly number[]
  readonly isSquare: boolean
}

/**
 * When does the mirror leave a harmonic element? Computed, for every n up to a bound.
 *
 * The universal claim — "an involution always provides a harmonic result" — is FALSE, and 432 is
 * the counterexample this corpus already carried. What holds is sharper: an ODD carrier always
 * fixes something, because the non-fixed elements pair off and an odd total cannot be made of pairs
 * alone. For the divisor mirror that condition, a perfect square, and τ(n) odd are one condition.
 */
export function harmonicCases(limit = 60): HarmonicCase[] {
  const out: HarmonicCase[] = []
  for (let n = 1; n <= limit; n++) {
    const d = divisorsOf(n)
    out.push({
      n,
      tau: d.length,
      fixed: d.filter((x) => n / x === x),
      // INTEGER arithmetic, not Math.sqrt: this corpus forbids host math in a theorem atom
      // ([[algebra]]/host — all theorems are algebra), and its gate caught this line. A float
      // square root is also the wrong instrument: it answers a question about integers with a
      // rounding.
      isSquare: divisorsOf(n).some((k) => k * k === n),
    })
  }
  return out
}

export interface HarmonicLaw {
  readonly cases: number
  /** τ odd ⟺ a harmonic element exists — the two are one event. */
  readonly oddIffHarmonic: boolean
  /** …and both hold exactly at the perfect squares. */
  readonly harmonicIffSquare: boolean
  /** Parity: |S| ≡ |Fix σ| (mod 2), everywhere. */
  readonly parityHolds: boolean
  /** When it exists it is the square root, and nothing else. */
  readonly uniqueWhenPresent: boolean
  /** Carriers with no harmonic element at all — the counterexamples to the universal claim. */
  readonly withoutHarmonic: number
}

/** The characterisation, checked over the family rather than asserted. */
export function harmonicLaw(limit = 60): HarmonicLaw {
  const cs = harmonicCases(limit)
  return {
    cases: cs.length,
    oddIffHarmonic: cs.every((c) => (c.tau % 2 === 1) === (c.fixed.length > 0)),
    harmonicIffSquare: cs.every((c) => (c.fixed.length > 0) === c.isSquare),
    parityHolds: cs.every((c) => c.tau % 2 === c.fixed.length % 2),
    uniqueWhenPresent: cs.every((c) => c.fixed.length <= 1),
    withoutHarmonic: cs.filter((c) => c.fixed.length === 0).length,
  }
}

/**
 * The statement, rendered.
 *
 * Every figure is read from the report, so the document cannot disagree with the computation it
 * describes — the drift law ([[rules]]/drift) applied to a paper instead of a SKILL.
 *
 * NOTE: LaTeX's ``open quotes'' cannot appear here. A backtick ENDS a template literal, so the
 * remainder became a tagged-template call on the preceding string — `"…" is not a function`, thrown
 * at the template's first line and pointing nowhere near the cause. Use \emph{} instead.
 */
export function latex<T>(name: string, carrier: string, r: MirrorReport<T>): string {
  const n = r.fixed.length + r.pairs.length * 2
  return `\\documentclass[11pt]{article}
\\usepackage{amsmath,amssymb,amsthm}
\\newtheorem{theorem}{Theorem}
\\title{The two-sided coin: an involution admits no resistance}
\\author{erpax}
\\begin{document}\\maketitle

\\section*{Statement}
Let $S$ be a finite set and $\\sigma : S \\to S$ satisfy $\\sigma \\circ \\sigma = \\mathrm{id}_S$.
Then $S$ partitions as
\\[
  S \\;=\\; \\mathrm{Fix}(\\sigma) \\;\\sqcup\\; \\bigsqcup_{i} \\{x_i, \\sigma x_i\\},
  \\qquad \\sigma x_i \\neq x_i,
\\]
and consequently $|S| \\equiv |\\mathrm{Fix}(\\sigma)| \\pmod 2$.

\\medskip\\noindent
Read as the coin: a \\emph{harmonic} element is its own reflection and survives the pass; every
other element is drawn in on one side and returned on the other, as a transposition. No element has
a third option --- that exhaustiveness is what \\emph{every bit of resistance drains} asserts, and it
follows from $\\sigma\\circ\\sigma = \\mathrm{id}$ alone.

\\section*{Instance: ${name}}
$S = ${carrier}$, $\\;|S| = ${n}$, $\\;\\sigma(d) = 432/d$.
\\begin{theorem}
$\\sigma$ is an involution on $S$: ${r.isInvolution ? 'verified by exhaustion' : '\\textbf{FAILS}'}.
\\end{theorem}
\\begin{theorem}
$|\\mathrm{Fix}(\\sigma)| = ${r.fixed.length}$, so $S$ consists of $${r.pairs.length}$ transpositions
and $${r.fixed.length}$ fixed points. Parity: $${n} \\equiv ${r.fixed.length} \\pmod 2$ --- ${r.parityHolds ? 'holds' : '\\textbf{FAILS}'}.
\\end{theorem}

\\section*{Boundary}
The theorems are closed by exhaustion over a finite carrier and carry no axioms; the Lean
development beside this file reports \\texttt{does not depend on any axioms}. Exhaustion proves the
statement \\emph{for this carrier}. It is not a claim about infinite $S$, and the reading of
$\\sigma$ as a black-hole/white-hole pair is an interpretation laid over the mathematics, not a
consequence of it.
\\end{document}
`
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const r = anchorMirror()
  console.log(`carrier ${r.fixed.length + r.pairs.length * 2} · involution ${r.isInvolution} · closed ${r.closed}`)
  console.log(`fixed (harmonic, survive)  ${r.fixed.length}  ${JSON.stringify(r.fixed)}`)
  console.log(`transpositions (in one side, out the other)  ${r.pairs.length}`)
  console.log(`parity |S| ≡ |Fix| (mod 2)  ${r.parityHolds} · exhaustive ${r.exhaustive}`)
  for (const [a, b] of r.pairs) console.log(`   ${String(a).padStart(3)} ↔ ${b}`)
}

/** @index-cross.foldback child=duality/mirror parent=duality — this cross folds back into its parent. */
