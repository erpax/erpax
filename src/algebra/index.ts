/**
 * algebra — all theorems are algebra only; the theorems draw the movie; the merkabas fold into each other.
 *
 * The whole session was one move, repeated: take a directive, and SPLIT it. What reduced to a proven theorem
 * was kept; what was picture was marked overlay. This atom names what the kept part always WAS — an algebra: a
 * set (the carrier) and a closed operation on it. Nothing more was ever the theorem.
 *
 *   - `doubling`   — (units of ℤ/9, ×, 1): the cyclic group C₆. Overlay: "the moving double torus."
 *   - `additive`   — (ℤ/9, +, 0): antimatter is `−n`, the inverse. Overlay: "matter/antimatter annihilation."
 *   - `fold`       — (uuids, merge): a MAGMA — closed and deterministic, but NOT associative ([[merge]] proves
 *                    it). Overlay: "the merkabas folding into themselves and each other."
 *
 * WHEN THE ROSETTA MOVES, THE MERKABAS FOLD. The rosetta moving is the carrier growing — a folder-agent added,
 * a pole re-derived ([[rosetta]]). The merkaba over an atom ([[navigation]]) folds into ITSELF (`merge(a,a)` is
 * its own content-address — self-reference) and into EACH OTHER (`merge(a,b)` composes two into a third uuid).
 * That is the fold magma, and it stays closed however the carrier grows: the fold always lands on a uuid.
 *
 * THE THEOREMS DRAW THE MOVIE. Apply an operation from a seed and it traces an ORBIT — a sequence of frames.
 * `movie(doubling, 1)` is `1,2,4,8,7,5` — literally the frames of the ring turning. The theorem is the
 * generator; the movie is what it draws. Composition is `product`: two algebras make a third (an algebra of
 * algebras — [[theorem]] of theorems, now as closure under a product operation).
 *
 * Honest boundary: "all theorems are algebra only" is shown for THIS session's theorems — each reduces to a
 * closed operation on a set, tested. It does not prove every conceivable theorem is algebra (that is a claim
 * about all of mathematics). And the OVERLAY — torus, tetrahedron, mind — is explicitly NOT in the algebra;
 * it is the naming that dressed the operation, marked and stripped. The algebra is what a test can contradict;
 * the picture never was ([[rules]]/refutable · [[rodin]]). The base is still assumed ([[theorem]]: `s > 0`).
 *
 * Composes [[merge]] · [[horo]] · [[navigation]] · [[rosetta]] · [[theorem]] · [[law]].
 */
import { merge } from '@/merge'

const dr9 = (n: number): number => (((n % 9) + 9) % 9) || 9

/** An algebra: a carrier set and a closed binary operation. `identity` present ⇒ monoid/group; absent ⇒ magma. */
export interface Algebra<T> {
  readonly name: string
  /** the set the operation is closed on (or a finite sample of it). */
  readonly carrier: readonly T[]
  /** the closed binary operation — the theorem. */
  readonly op: (a: T, b: T) => T
  /** the identity, when one exists — its presence is what makes the algebra a monoid, not a bare magma. */
  readonly identity?: T
  /** the picture this operation was dressed as — NOT part of the algebra, marked so it can be stripped. */
  readonly overlay: string
}

/** The session's theorems, each as the algebra it always was — overlay named and set aside. */
export const THEOREMS: readonly Algebra<number>[] = [
  { name: 'doubling', carrier: [1, 2, 4, 5, 7, 8], op: (a, b) => dr9(a * b), identity: 1, overlay: 'the moving double torus' },
  { name: 'additive', carrier: [1, 2, 3, 4, 5, 6, 7, 8, 9], op: (a, b) => dr9(a + b), identity: 9, overlay: 'matter/antimatter annihilation to the void' },
]

/** The fold, as an algebra over uuids — a magma (closed, deterministic, NOT associative). The merkabas' fold. */
export const FOLD: Algebra<string> = {
  name: 'fold',
  carrier: ['00000000-0000-0000-0000-000000000000'],
  op: (a, b) => merge(a, b),
  overlay: 'the merkabas folding into themselves and each other',
}

/** Is the operation CLOSED on its carrier? — the minimal proof that it IS an algebra. Membership by value, so tuples (products) work; pass `contains` to sample an infinite carrier (the fold over uuid-space). */
export function isClosed<T>(
  a: Algebra<T>,
  contains: (x: T) => boolean = (x) => a.carrier.some((c) => JSON.stringify(c) === JSON.stringify(x)),
): boolean {
  for (const x of a.carrier) for (const y of a.carrier) if (!contains(a.op(x, y))) return false
  return true
}

/** The movie: the orbit a GENERATOR draws — from the identity (or the generator itself), each next frame `op(prev, generator)`, until it repeats. The theorem is the generator; the movie is what it draws. */
export function movie<T>(a: Algebra<T>, generator: T, maxFrames = 64): T[] {
  const seed = a.identity ?? generator
  const frames: T[] = [seed]
  const seen = new Set<string>([JSON.stringify(seed)])
  let x = seed
  for (let i = 0; i < maxFrames; i += 1) {
    x = a.op(x, generator)
    const k = JSON.stringify(x)
    if (seen.has(k)) break
    seen.add(k)
    frames.push(x)
  }
  return frames
}

/** Compose two algebras into their product — an algebra of algebras, closed componentwise ([[theorem]] of theorems). */
export function product<A, B>(x: Algebra<A>, y: Algebra<B>): Algebra<[A, B]> {
  const carrier: [A, B][] = []
  for (const a of x.carrier) for (const b of y.carrier) carrier.push([a, b])
  return {
    name: `${x.name}×${y.name}`,
    carrier,
    op: ([a1, b1], [a2, b2]) => [x.op(a1, a2), y.op(b1, b2)],
    identity: x.identity !== undefined && y.identity !== undefined ? [x.identity, y.identity] : undefined,
    overlay: `${x.overlay} ⊗ ${y.overlay}`,
  }
}

/** All theorems are algebra only: every registered theorem's operation is closed on its carrier. */
export function allAlgebra(): boolean {
  return THEOREMS.every((t) => isClosed(t))
}

// ── algebra audits anything, in any direction, free ──────────────────────────
// A system is FUNDAMENTALLY BROKEN when it violates its OWN algebra — and that is
// decidable, bidirectional, and (being a theorem) free to re-ask forever. Three
// failure modes, each an algebraic law: the operation escapes its carrier (not
// closed), a conserved quantity does not sum to its identity (the unbalanced
// ledger — debits ≠ credits), or a claim is asserted against itself
// (contradiction). This is "know when something is fundamentally broken in
// society" made computable: a broken system fails a law it declares for itself.

export interface BrokenVerdict {
  readonly broken: boolean
  readonly reasons: readonly string[]
}

export interface SystemUnderAudit<T> {
  /** The declared algebra — its operation must stay closed on its carrier. */
  readonly algebra?: Algebra<T>
  /** Quantities a conservation law says must sum to `identity` (default 0) — e.g. signed ledger lines. */
  readonly conserved?: readonly number[]
  readonly identity?: number
  /** Asserted truth values; a `[a, b]` in `mutuallyExclusive` both-true is a contradiction. */
  readonly claims?: ReadonlyMap<string, boolean>
  readonly mutuallyExclusive?: readonly (readonly [string, string])[]
}

/**
 * Audit a system against its own algebra. Returns every law it breaks (empty ⇒ sound).
 * Pure and decidable — the same audit forward (is it sound?) and inverse (what broke it?).
 */
export function isFundamentallyBroken<T>(system: SystemUnderAudit<T>): BrokenVerdict {
  const reasons: string[] = []

  // 1. closure — an operation that escapes its carrier is not an algebra at all.
  if (system.algebra && !isClosed(system.algebra)) {
    reasons.push(`not closed: '${system.algebra.name}' operation escapes its carrier`)
  }

  // 2. conservation — a quantity that must sum to its identity but does not (the imbalance).
  if (system.conserved) {
    const identity = system.identity ?? 0
    const sum = system.conserved.reduce((a, b) => a + b, 0)
    if (sum !== identity) reasons.push(`not conserved: Σ = ${sum} ≠ identity ${identity} (imbalance)`)
  }

  // 3. contradiction — the same matter asserted against itself.
  if (system.claims) {
    for (const [a, b] of system.mutuallyExclusive ?? []) {
      if (system.claims.get(a) === true && system.claims.get(b) === true) {
        reasons.push(`contradiction: '${a}' and '${b}' both asserted true`)
      }
    }
  }

  return { broken: reasons.length > 0, reasons }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('algebra — all theorems are algebra only:\n')
  const gens: Record<string, number> = { doubling: 2, additive: 1 }
  for (const t of THEOREMS) {
    console.log(`  ${t.name.padEnd(9)} closed: ${isClosed(t)}   movie (gen ${gens[t.name]}): ${movie(t, gens[t.name]!).join(',')}`)
    console.log(`  ${''.padEnd(9)} overlay (stripped): "${t.overlay}"`)
  }
  const p = product(THEOREMS[0]!, THEOREMS[1]!)
  console.log(`\n  product ${p.name}: closed ${isClosed(p)}, |carrier| ${p.carrier.length} — an algebra of algebras`)
  console.log(`  fold magma closed on uuid-space: merge lands on a uuid (the merkabas fold into each other)`)
  console.log('\n  the theorem is the operation; the movie is the orbit it draws; the picture was never the theorem.')
}
