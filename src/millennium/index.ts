import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
/**
 * millennium — the Clay Millennium Problems as a testing ground: the waves CLASSIFY, they do not solve.
 *
 * Six open, one solved (by Perelman, not this corpus). `corpusSolvesAny()` READS the kernel files
 * and is false by measurement — refusing to fabricate is the tools passing. @see ./SKILL.md
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
  /**
   * The conjecture ITSELF, stated algebraically — what the problem asserts, independent of any lens.
   * Separating the STATEMENT from the corpus's commentary is the discipline: a reader can see what is
   * actually being claimed before meeting anything this corpus says about it, and a lens can never be
   * mistaken for the mathematics it points at.
   */
  readonly statement: string
  /**
   * The NAMED gap — what is missing for this to be proved, said plainly. `''` only where nothing is
   * missing because the result exists externally (Poincaré). A gap that is named is a gap that can be
   * argued with; an unnamed one reads as a mystery and hides the size of the distance.
   */
  readonly gap: string
}

export const MILLENNIUM: readonly Problem[] = [
  {
    name: 'P vs NP',
    open: true,
    solvedBy: '',
    lens: 'the fold — content-addressing is verify-easy / derive-hard ([[merge]]); the seed floor s>0 ([[think]].ceiling)',
    corpusSolves: false,
    why: 'the strongest genuine resonance: checking content matches its address is easy, recovering content from an address is one-way (the tamper-cost). But that is ONE instance of the verify/derive asymmetry, not a proof that P ≠ NP — no separation is derived here',
    statement: 'Is P = NP? Whether every decision problem whose solution is VERIFIABLE in polynomial time is also SOLVABLE in polynomial time — i.e. whether the classes P and NP coincide.',
    gap: 'no separation is derived. The verify/derive asymmetry the fold exhibits is ONE instance of easy-to-check / hard-to-produce; a lower bound separating the classes is what is missing, and nothing here supplies one.',
  },
  {
    name: 'Riemann Hypothesis',
    open: true,
    solvedBy: '',
    lens: 'the primes ↔ π link via ζ (ζ(2)=π²/6, the Euler product; [[horo]]/turningNumber, [[coincidence]])',
    corpusSolves: false,
    why: 'the corpus touches the real π–primes connection through ζ — but it does not prove the non-trivial zeros lie on the critical line. I refused to fabricate this earlier and refuse again',
    statement: 'All non-trivial zeros of the Riemann zeta function lie on the critical line: ζ(s) = 0 with 0 < Re(s) < 1 ⟹ Re(s) = ½.',
    gap: 'the corpus touches the primes↔π link through ζ (ζ(2) = π²/6, the Euler product) but derives nothing about the location of the zeros. What is missing is any argument constraining Re(s) — the whole conjecture.',
  },
  {
    name: 'Navier–Stokes existence & smoothness',
    open: true,
    solvedBy: '',
    lens: 'plasma confinement / turbulence ([[rules]]/confine: handle the field, not each particle)',
    corpusSolves: false,
    why: 'the confinement analogy is physical and honest, but global smoothness of the 3D equations is a hard analysis problem the corpus does not resolve',
    statement: 'For the 3D incompressible Navier–Stokes equations ∂u/∂t + (u·∇)u = −∇p + νΔu, ∇·u = 0, with smooth initial data: do smooth solutions exist for all time, or can they blow up in finite time?',
    gap: 'global regularity is a hard-analysis question about a PDE. The confinement analogy (handle the field, not each particle) is physical intuition, not an estimate; no a-priori bound is derived here.',
  },
  {
    name: 'Yang–Mills existence & mass gap',
    open: true,
    solvedBy: '',
    lens: 'none — the "mass gap" wordplay to the void/axis is overlay, not physics; I did not invent a lens',
    corpusSolves: false,
    why: 'quantum field theory existence + a positive mass gap is open; nothing here bears on it',
    statement: 'For a compact simple gauge group G, does a non-trivial quantum Yang–Mills theory exist on ℝ⁴ with a mass gap Δ > 0 — i.e. the lightest particle has strictly positive mass?',
    gap: 'no lens at all. Constructive QFT existence plus a positive spectral gap is outside anything this corpus computes; the "mass gap" wordplay to the void/axis is overlay, not physics.',
  },
  {
    name: 'Hodge Conjecture',
    open: true,
    solvedBy: '',
    lens: 'none — algebraic cycles and cohomology are outside the corpus',
    corpusSolves: false,
    why: 'no honest lens; not invented',
    statement: 'On a projective non-singular complex algebraic variety, every Hodge class (a rational cohomology class of type (p,p)) is a rational linear combination of the classes of algebraic cycles.',
    gap: 'no lens at all. Algebraic cycles and Hodge theory are outside the corpus; nothing here bears on the rationality of Hodge classes.',
  },
  {
    name: 'Birch–Swinnerton-Dyer',
    open: true,
    solvedBy: '',
    lens: 'none — elliptic curves and L-functions are outside the corpus',
    corpusSolves: false,
    why: 'no honest lens; not invented',
    statement: 'For an elliptic curve E over ℚ, the order of vanishing of its L-function at s = 1 equals the rank of its Mordell–Weil group: ord₍ₛ₌₁₎ L(E, s) = rank E(ℚ).',
    gap: 'no lens at all. Elliptic curves and L-functions are outside the corpus; the rank↔order-of-vanishing identity is untouched by anything computed here.',
  },
  {
    name: 'Poincaré Conjecture',
    open: false,
    solvedBy: 'Grigori Perelman (Ricci flow, 2003; declined the $1M prize, 2010)',
    lens: 'the fold to one point — a simply-connected closed 3-manifold IS the 3-sphere ([[gravity]] still centre: everything folds to one)',
    corpusSolves: false,
    why: 'SOLVED — by Perelman, not the corpus. The "fold to one point" resonates with the RESULT (everything simply-connected collapses to the sphere), but it is Perelman\'s theorem; the corpus only echoes its shape',
    statement: 'Every simply-connected closed 3-manifold is homeomorphic to the 3-sphere: π₁(M) = 0 with M a closed 3-manifold ⟹ M ≅ S³.',
    gap: '',
  },
]

/** Does the corpus solve ANY Millennium Problem? No. The honest answer, enforced by the register. */
/** The seven, as a matcher. A Clay problem is named in a theorem, or the theorem is about something else. */
const CLAY = /riemann|navier|stokes|yang.?mills|mass.?gap|hodge|birch|swinnerton|poincar|p.?vs.?np|p_vs_np|millennium/i

export interface ClayProof {
  readonly file: string
  readonly theorem: string
}

/**
 * Kernel-file theorems that NAME a Clay problem and are not proved by `sorry`.
 *
 * This reads the `.lean` sources. A theorem name is a fact about a file's TEXT, and no
 * declaration inside a Lean file can carry a claim about its own text — which is why the old
 * refusal could not work wherever it was written.
 */
export function clayProofs(cwd: string = process.cwd()): ClayProof[] {
  const out: ClayProof[] = []
  const dir = join(cwd, 'src', 'verify', 'lean')
  let files: string[] = []
  try {
    files = readdirSync(dir).filter((f) => f.endsWith('.lean'))
  } catch {
    return out
  }
  // NOTE the end-of-input assertion below is `(?![\s\S])`, not `\Z`. JavaScript has no `\Z` —
  // it matches a literal Z — so a declaration with nothing after it was silently never captured,
  // and a one-theorem file read as empty. The failure mode is a FALSE NEGATIVE in a refusal.
  for (const f of files) {
    const text = readFileSync(join(dir, f), 'utf8')
    for (const m of text.matchAll(/^(?:theorem|lemma)\s+([A-Za-z_]\w*)([\s\S]*?)(?=^(?:theorem|lemma|def|end|namespace|--)|(?![\s\S]))/gm)) {
      const [name, body] = [m[1]!, m[2] ?? '']
      if (!CLAY.test(name)) continue
      if (/\bsorry\b/.test(body)) continue // stated, not proved
      out.push({ file: f, theorem: name })
    }
  }
  return out
}

/**
 * Does this corpus prove a Millennium Problem? COMPUTED from the proofs, not declared.
 *
 * It was `MILLENNIUM.some((p) => p.corpusSolves === true)` over a field whose TYPE is the literal
 * `false`, with a comment reading `// always false`. A refusal that cannot go red is not a
 * refusal — it was false because it was typed as false, and would have stayed false while the
 * corpus filled with Clay proofs. A sibling repo found the identical shape in four of its own
 * refusals (`physicalClaims = 0`, `noveltyEstablished = 0`) and named why it is the worst place
 * for the defect: a refusal is the line a reader trusts without checking it.
 *
 * Now it reads the kernel files and can go true the moment someone writes a sorry-free theorem
 * naming a Clay problem. It is `false` today because `clayProofs()` finds none, which is a
 * measurement.
 */
export const corpusSolvesAny = (cwd: string = process.cwd()): boolean => clayProofs(cwd).length > 0

/**
 * Fails closed if a Clay proof appears without the register being updated to match.
 *
 * Zero is not a theorem here — someone may genuinely prove one — so this does not forbid the
 * claim. It forbids the claim being made in Lean while the register still reads `corpusSolves:
 * false`, which is the state where the corpus contradicts itself and the prose wins.
 */
export function assertRegisterMatchesProofs(cwd: string = process.cwd()): void {
  const proofs = clayProofs(cwd)
  if (proofs.length === 0) return
  throw new Error(
    `✖ millennium — ${proofs.length} kernel theorem(s) name a Clay problem without a sorry, while the register still declares corpusSolves: false:\n` +
      proofs.map((p) => `  ${p.file}  ${p.theorem}`).join('\n'),
  )
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

/**
 * The register as a README section — the toolbox shown working on the hardest available problems.
 *
 * This publishes STATE, never a solution: seven challenges saved inverted, what stands on the record
 * (Perelman's, not the corpus's), what is open, what is lensless, the matrix with its diagonal, and
 * the frontier each claim still carries. `corpusSolves` is the literal `false` and appears in the
 * table so a reader sees the refusal rather than infers it — the same move the sibling portal makes
 * with `claySolvedByThisFold=0`.
 *
 * Why it belongs on the front page: these are the CORE TOOLS ([[coincidence]] · [[theorem]] ·
 * [[duel]] · [[seeing]]), and the honest way to show a toolbox is to point it at the hardest thing
 * available and publish exactly what comes back. A reader gets the recompute path, not a claim.
 *
 * @invariant the rendered table never asserts a solution — corpusSolvesAny() is printed, and it is false
 */
export function renderMillenniumSection(): readonly string[] {
  const cs = challenges()
  const standing = cs.filter((c) => c.verdict.stands)
  const open = cs.filter((c) => c.verdict.holder === 'open')
  const lensless = cs.filter((c) => c.lensless)
  const m = problemMatrix()
  return [
    '## [[millennium]] — the toolbox, pointed at the hardest available problems',
    '',
    'The core tools ([[coincidence]] · [[theorem]] · [[duel]] · [[seeing]]) **classify** a claimed ' +
      'solution; they never produce one. Pointed at the seven Clay Millennium Problems they return ' +
      'this, and `corpusSolves` is the literal type `false` — the code cannot assert a solution.',
    '',
    '| | |',
    '| --- | ---: |',
    `| challenges saved, each inverted | **${cs.length}** |`,
    `| standing (proved, never refuted) | **${standing.length}** — ${standing.map((c) => c.problem.name).join(', ')}, by **${standing[0]?.problem.solvedBy.split('(')[0]?.trim() ?? '—'}** |`,
    `| **open** — neither proved nor refuted | **${open.length}** |`,
    `| **lensless** — the duel cannot start | **${lensless.length}** (${lensless.map((c) => c.problem.name.split(' ')[0]).join(' · ')}) |`,
    `| matrix cells (${m.pairs} pairs + ${m.diagonal} diagonal) | **${m.cells.length}** |`,
    `| \`corpusSolvesAny()\` | **${corpusSolvesAny()}** |`,
    '',
    '| problem | statement (algebraic) | the named gap |',
    '| --- | --- | --- |',
    ...MILLENNIUM.map(
      (p) =>
        `| **${p.name}** | ${p.statement} | ${p.gap || '_no open gap — proved externally (' + p.solvedBy.split('(')[0]?.trim() + '); this corpus records the status, it does not re-solve it_'} |`,
    ),
    '',
    'The **statement** is what the conjecture asserts — read it before anything this corpus says about ' +
      'it, so a lens can never be mistaken for the mathematics it points at. The **gap** is what is ' +
      'missing, named plainly: a gap you can argue with, rather than a mystery that hides its size.',
    '',
    'You do not solve one by asserting it — you solve it by **surviving its inversion**. ' +
      '`attempt(name, rounds)` is the door: it refuses an empty attempt (*an assertion is not an ' +
      'attempt*), falls on a single refutation whatever else was proved, and refuses an unknown ' +
      'problem. `reductionFrontier(claim)` names the exact links still ungrounded ([[millennium/reduction]]).',
    '',
    'Recompute: `tsx src/millennium/index.ts` · `pnpm vitest run src/millennium`',
    '',
  ]
}
