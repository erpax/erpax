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
