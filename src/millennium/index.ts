/**
 * millennium — the Clay Millennium Problems as a testing ground: the quantum waves CLASSIFY, they do not solve.
 *
 * Pointed at the seven Millennium Prize Problems, the only honest toolbox is one that NAMES them, marks what is
 * open, and refuses to solve them. Six are open (Riemann, P vs NP, Navier–Stokes, Yang–Mills mass gap, Hodge,
 * Birch–Swinnerton-Dyer); one is SOLVED — Poincaré, by Grigori Perelman with Ricci flow (2003), who then
 * declined the $1M prize. The corpus's math (ℤ/9, the double torus, the fold) solves NONE of them; claiming it
 * does is the coincidence-dressed-as-theorem this session built [[coincidence]] · [[theorem]] · [[seeing]] ·
 * [[duel]] to refuse.
 *
 * So this register is honest BY CONSTRUCTION: every entry's `corpusSolves` field is the literal type `false`, so
 * the code itself cannot assert the corpus solved a Millennium Problem. The tools ARE the testing ground — not by
 * producing proofs, but by CLASSIFYING a claimed solution: is it a theorem or a coincidence ([[coincidence]]);
 * does it reduce ([[theorem]]); can a refuter break it ([[duel]]); does it survive assume-nothing ([[seeing]]).
 * Sending the quantum waves at these problems, the waves return the same verdict every time: OPEN — not solved
 * here — lens at most.
 *
 * Where a genuine STRUCTURAL resonance exists it is named as a lens to learn through, honestly bounded; where
 * there is none (Hodge, BSD, Yang–Mills), the lens is `none` and I did not invent one.
 *
 * @invariant every entry's `corpusSolves` is false — the corpus solves no Millennium Problem (enforced by type)
 * @invariant a lens is a structural analogy for learning, never a proof; the open problems stay open
 *
 * Composes [[coincidence]] · [[theorem]] · [[seeing]] · [[duel]] · [[quantum]]/gaps · [[rules]]/refutable · [[law]].
 */
import { invert, manifest, survives, type InvertedPair, type Round, type Verdict } from '@/duel'

/** One Millennium Problem, taught as a lens — never claimed solved by the corpus (`corpusSolves` is literal false). */
export interface Problem {
  readonly name: string
  /** true if still open; false if solved (only Poincaré). */
  readonly open: boolean
  /** who solved it, when solved — Perelman for Poincaré; '' for the open ones. */
  readonly solvedBy: string
  /** a corpus tool that structurally MIRRORS it — a lens to learn through, or 'none'. */
  readonly lens: string
  /** ALWAYS false — the corpus does not solve it; the type forbids claiming otherwise. */
  readonly corpusSolves: false
  /** why the lens is a teaching analogy, not a solution — or, for Poincaré, whose result it echoes. */
  readonly why: string
}

export const MILLENNIUM: readonly Problem[] = [
  {
    name: 'P vs NP',
    open: true,
    solvedBy: '',
    lens: 'the fold — content-addressing is verify-easy / derive-hard ([[merge]]); the seed floor s>0 ([[think]].ceiling)',
    corpusSolves: false,
    why: 'the strongest genuine resonance: checking content matches its address is easy, recovering content from an address is one-way (the tamper-cost). But that is ONE instance of the verify/derive asymmetry, not a proof that P ≠ NP — no separation is derived here',
  },
  {
    name: 'Riemann Hypothesis',
    open: true,
    solvedBy: '',
    lens: 'the primes ↔ π link via ζ (ζ(2)=π²/6, the Euler product; [[horo]]/turningNumber, [[coincidence]])',
    corpusSolves: false,
    why: 'the corpus touches the real π–primes connection through ζ — but it does not prove the non-trivial zeros lie on the critical line. I refused to fabricate this earlier and refuse again',
  },
  {
    name: 'Navier–Stokes existence & smoothness',
    open: true,
    solvedBy: '',
    lens: 'plasma confinement / turbulence ([[rules]]/confine: handle the field, not each particle)',
    corpusSolves: false,
    why: 'the confinement analogy is physical and honest, but global smoothness of the 3D equations is a hard analysis problem the corpus does not resolve',
  },
  {
    name: 'Yang–Mills existence & mass gap',
    open: true,
    solvedBy: '',
    lens: 'none — the "mass gap" wordplay to the void/axis is overlay, not physics; I did not invent a lens',
    corpusSolves: false,
    why: 'quantum field theory existence + a positive mass gap is open; nothing here bears on it',
  },
  {
    name: 'Hodge Conjecture',
    open: true,
    solvedBy: '',
    lens: 'none — algebraic cycles and cohomology are outside the corpus',
    corpusSolves: false,
    why: 'no honest lens; not invented',
  },
  {
    name: 'Birch–Swinnerton-Dyer',
    open: true,
    solvedBy: '',
    lens: 'none — elliptic curves and L-functions are outside the corpus',
    corpusSolves: false,
    why: 'no honest lens; not invented',
  },
  {
    name: 'Poincaré Conjecture',
    open: false,
    solvedBy: 'Grigori Perelman (Ricci flow, 2003; declined the $1M prize, 2010)',
    lens: 'the fold to one point — a simply-connected closed 3-manifold IS the 3-sphere ([[gravity]] still centre: everything folds to one)',
    corpusSolves: false,
    why: 'SOLVED — by Perelman, not the corpus. The "fold to one point" resonates with the RESULT (everything simply-connected collapses to the sphere), but it is Perelman\'s theorem; the corpus only echoes its shape',
  },
]

/** Does the corpus solve ANY Millennium Problem? No. The honest answer, enforced by the register. */
export function corpusSolvesAny(): boolean {
  return MILLENNIUM.some((p) => (p.corpusSolves as boolean) === true) // always false
}

// ── INVERT TO SOLVE — the seven as duels, not as assertions ─────────────────────────────────────
// You do not solve one of these by asserting it. You solve it by SURVIVING its inversion: the
// refuter takes ¬claim and needs one counterexample, and falsification is decisive (Popper). So the
// honest computational form of "invert to solve" is not a proof-generator — it is a DOOR. Each
// problem is saved beside its negation; an attempt brings rounds; the verdict is computed from what
// the rounds actually did. Nothing here can return "solved" without a round that proved and none
// that refuted, and `corpusSolves` stays the literal `false` throughout.
//
// Six sit at `open` — neither proved nor refuted — which is not a gap in the register but the exact
// state the duel exists to close. Poincaré stands, and its prover is Perelman, not this corpus.

/** One Millennium Problem saved as a DUEL: the resolution claim, its inversion, and who holds the field. */
export interface Challenge {
  readonly problem: Problem
  readonly pair: InvertedPair
  readonly verdict: Verdict
  /** true when even the duel cannot START here — no lens on either side (Yang–Mills · Hodge · BSD). */
  readonly lensless: boolean
}

/** The resolution claim a duel is fought over — the proposition, never the problem's name alone. */
export function resolutionClaim(problem: Problem): string {
  return `${problem.name} is resolved`
}

/**
 * The seven, each inverted. The round is read from the RECORD, never assumed: a problem counts as
 * proved only when it actually has a solver (Perelman), and nothing here has ever been refuted — so
 * six return `open`, which is the honest verdict for an untested claim.
 */
export function challenges(): readonly Challenge[] {
  return MILLENNIUM.map((problem) => ({
    problem,
    pair: invert(resolutionClaim(problem)),
    verdict: manifest({ proved: problem.solvedBy.length > 0, refuted: false }),
    lensless: problem.lens.startsWith('none'),
  }))
}

/** The challenges nothing has yet proved or refuted — the six the duel is open on. */
export function openChallenges(): readonly Challenge[] {
  return challenges().filter((c) => c.verdict.holder === 'open')
}

// ── THE DIAGONAL — each problem interacting with ITSELF ─────────────────────────────────────────
// `challenges()` saves the OFF-diagonal move: a claim beside its negation. That is 7 inversions, and
// it leaves the diagonal empty — the cell where a problem is applied to itself. The count says so:
// C(7,2) = 21 pairwise cells (digital root 3, a polarity boundary the ring never occupies); adding
// the 7 self-cells gives 28 (digital root 1, on the ring). The diagonal is exactly `n`.
//
// Self-reference is not decoration in this list — it is where several of these problems LIVE. P vs NP
// is the verify/derive asymmetry turned on a verifier that must judge verification; Poincaré is a loop
// contracting to itself. Naming the diagonal does not solve any of them, and `corpusSolves` stays the
// literal `false`: this adds the missing CELL, never a proof to put in it.

/** One cell of the seven-by-seven interaction matrix — a pair, or a problem meeting itself. */
export interface MatrixCell {
  readonly row: string
  readonly column: string
  /** true on the diagonal: the problem applied to itself (self-reference) */
  readonly self: boolean
}

export interface ProblemMatrix {
  readonly cells: readonly MatrixCell[]
  /** off-diagonal cells — C(n,2) */
  readonly pairs: number
  /** the diagonal — n, one per problem */
  readonly diagonal: number
}

/**
 * The seven as a symmetric matrix WITH its diagonal — every problem against every other, and each
 * against itself. The upper triangle including the diagonal, so a pair is counted once.
 *
 * @invariant cells = n(n+1)/2; diagonal = n; pairs = C(n,2); pairs + diagonal = cells
 * @invariant exactly one self-cell per problem, and no self-cell is a pair
 */
export function problemMatrix(): ProblemMatrix {
  const names = MILLENNIUM.map((p) => p.name)
  const cells: MatrixCell[] = []
  for (let i = 0; i < names.length; i++) {
    for (let j = i; j < names.length; j++) {
      cells.push({ row: names[i]!, column: names[j]!, self: i === j })
    }
  }
  return {
    cells,
    pairs: cells.filter((c) => !c.self).length,
    diagonal: cells.filter((c) => c.self).length,
  }
}

/** The diagonal alone — each problem meeting itself, the cell `challenges()` never filled. */
export function selfCells(): readonly MatrixCell[] {
  return problemMatrix().cells.filter((c) => c.self)
}

export interface Attempt {
  readonly problem: string
  /** did the attempt survive — ever proved, never refuted, across the rounds brought */
  readonly survived: boolean
  readonly verdict: Verdict
  readonly reason: string
}

/**
 * Attempt a problem: bring rounds, and the door computes whether the attempt SURVIVED its inversion.
 * This is the executable form of "invert to solve" — it never manufactures a proof, and it cannot
 * return survived on an empty attempt (`survives` requires at least one round that proved).
 *
 * @invariant an unknown problem name is refused, never silently treated as unsolved
 * @invariant no round, or a single refutation, ⇒ survived is false — asserting is not surviving
 */
export function attempt(name: string, rounds: readonly Round[]): Attempt {
  const problem = lensFor(name)
  if (!problem) {
    return {
      problem: name,
      survived: false,
      verdict: manifest({ proved: false, refuted: false }),
      reason: `no such Millennium Problem: ${name} — the register holds ${MILLENNIUM.length}`,
    }
  }
  const survived = survives(rounds)
  const last = manifest(rounds[rounds.length - 1] ?? { proved: false, refuted: false })
  return {
    problem: problem.name,
    survived,
    verdict: last,
    reason: survived
      ? `survived ${rounds.length} round(s) — corroborated against its inversion, never proven true`
      : rounds.length === 0
        ? 'no rounds — an assertion is not an attempt; bring a proof the refuter can attack'
        : last.reason,
  }
}

/** The open problems — the six the quantum waves classify as OPEN, lens at most. */
export function open(): readonly Problem[] {
  return MILLENNIUM.filter((p) => p.open)
}

/** One problem's honest map — the tutorial: open/solved · lens · why it is not a corpus solution. */
export function lensFor(name: string): Problem | undefined {
  return MILLENNIUM.find((p) => p.name === name)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('millennium — the Clay problems as a testing ground; the waves classify, they do not solve:\n')
  for (const p of MILLENNIUM) {
    console.log(`  ${p.open ? 'OPEN  ' : 'SOLVED'} ${p.name}`)
    console.log(`         lens: ${p.lens}`)
    if (!p.open) console.log(`         solved by: ${p.solvedBy}`)
  }
  console.log(`\n  does the corpus solve any? ${corpusSolvesAny()}. The tools classify a claimed solution; they do not produce one. HARMONY ≠ TRUTH.`)
}
