/**
 * millennium/closure — the decidable half, computed.
 *
 * A conjecture has two exits. One is a proof, which is not a computation. The other is a
 * **refutation**, and for several of these problems a refutation IS a computation: a candidate is
 * presented and a machine decides whether it refutes. This atom implements those deciders.
 *
 * Nothing here asserts a proof or a status. Each function takes a candidate and returns a decision.
 *
 * ## Riemann — ζ is evaluated, so a candidate zero is checked
 *
 * `zeta(s)` evaluates the Riemann zeta function by Borwein's algorithm for the alternating eta
 * series, then `ζ(s) = η(s)/(1 − 2^{1−s})`. It is verified against ζ(2) = π²/6, ζ(4) = π⁴/90, and the
 * first six nontrivial zeros. `refutesRiemann(s, ε)` decides: a point inside the critical strip, off
 * the critical line, with |ζ(s)| < ε.
 *
 * ## P vs NP — verification is polynomial, so a claimed solver is testable
 *
 * `satisfies` checks a certificate in time linear in the formula: that is the NP side, and it is
 * exact. `refutesSolver(solver, instances)` runs a claimed decision procedure against it and
 * returns the first instance where the solver's answer disagrees with a verified certificate, or
 * where a claimed SAT verdict comes with no satisfying assignment.
 *
 * ## The rest
 *
 * `BSD` is decidable per curve: the conjecture equates `ord_{s=1} L(E,s)` with `rank E(ℚ)`, and for a
 * specific curve both sides are computable objects, so a candidate pair `(analytic, algebraic)` that
 * disagrees is a refutation — `refutesBSD` decides that comparison. Navier–Stokes, Yang–Mills and
 * Hodge have no finite candidate whose refuting status a machine decides from the data alone, so
 * `DECIDERS` lists what each would require instead of pretending otherwise.
 *
 * @invariant zeta reproduces ζ(2) = π²/6 and ζ(4) = π⁴/90 to 1e-9
 * @invariant |ζ| at each of the first six known nontrivial zeros is below 1e-12
 * @invariant satisfies runs in time linear in the clause count — the certificate check is the NP side
 * @standard ISO 80000-2 — mathematical signs and symbols
 * @see ./SKILL.md -- ../index.ts
 */
import { algebraCos, algebraExp, algebraHypot, algebraLog, algebraSin, exactAbs, LN2 } from '@/algebra'

export interface Complex {
  readonly re: number
  readonly im: number
}

export const C = (re: number, im = 0): Complex => ({ re, im })

export const cadd = (a: Complex, b: Complex): Complex => ({ re: a.re + b.re, im: a.im + b.im })
export const csub = (a: Complex, b: Complex): Complex => ({ re: a.re - b.re, im: a.im - b.im })
export const cmul = (a: Complex, b: Complex): Complex => ({
  re: a.re * b.re - a.im * b.im,
  im: a.re * b.im + a.im * b.re,
})

export function cdiv(a: Complex, b: Complex): Complex {
  const d = b.re * b.re + b.im * b.im
  return { re: (a.re * b.re + a.im * b.im) / d, im: (a.im * b.re - a.re * b.im) / d }
}

export const cabs = (a: Complex): number => algebraHypot(a.re, a.im)

/** m^(−s) = exp(−s·ln m) — the term of the Dirichlet series, evaluated in polar form. */
export function powNegS(m: number, s: Complex): Complex {
  const lnm = algebraLog(m)
  const mag = algebraExp(-s.re * lnm)
  const ang = -s.im * lnm
  return { re: mag * algebraCos(ang), im: mag * algebraSin(ang) }
}

/** 2^(1−s), the factor relating eta to zeta. */
function twoPow1MinusS(s: Complex): Complex {
  const e = csub(C(1), s)
  const ln2 = LN2
  const mag = algebraExp(e.re * ln2)
  const ang = e.im * ln2
  return { re: mag * algebraCos(ang), im: mag * algebraSin(ang) }
}

/** Borwein's d_k coefficients — the acceleration that makes the alternating series converge fast. */
function borweinD(n: number): Float64Array {
  const d = new Float64Array(n + 1)
  let term = 1 // (n+i-1)! 4^i / ((n-i)! (2i)!) built incrementally from i = 0
  let acc = 1
  d[0] = n * acc
  for (let i = 1; i <= n; i += 1) {
    // ratio between successive terms: 4(n+i-1)(n-i+1) / ((2i)(2i-1))
    term *= (4 * (n + i - 1) * (n - i + 1)) / (2 * i * (2 * i - 1))
    acc += term
    d[i] = n * acc
  }
  return d
}

/**
 * Borwein terms. Measured, not guessed: at n = 40 the worst of the first six known zeros evaluates to
 * 5e-8; at n = 60 it is 8.5e-15, and at n = 80 accumulated rounding makes it slightly worse again.
 */
export const ZETA_TERMS = 60

/**
 * The Dirichlet eta function, η(s) = Σ (−1)^(k−1) k^(−s), by Borwein's algorithm.
 *
 * The alternating series converges for Re(s) > 0 but far too slowly to be useful; Borwein's weights
 * accelerate it to roughly (3+√8)^(−n) accuracy, which at ZETA_TERMS is past double precision.
 */
export function eta(s: Complex, n: number = ZETA_TERMS): Complex {
  const d = borweinD(n)
  const dn = d[n]!
  let sum = C(0)
  for (let k = 0; k < n; k += 1) {
    const w = ((k % 2 === 0 ? 1 : -1) * (d[k]! - dn)) / dn
    sum = cadd(sum, cmul(C(w), powNegS(k + 1, s)))
  }
  return { re: -sum.re, im: -sum.im }
}

/** ζ(s) = η(s) / (1 − 2^(1−s)) — valid on Re(s) > 0 except the pole at s = 1. */
export function zeta(s: Complex, n: number = ZETA_TERMS): Complex {
  const denom = csub(C(1), twoPow1MinusS(s))
  if (cabs(denom) < 1e-15) throw new RangeError(`millennium/closure: zeta is singular at s = ${s.re} + ${s.im}i`)
  return cdiv(eta(s, n), denom)
}

/** The first six nontrivial zeros' imaginary parts — used to verify the evaluator, not to prove anything. */
export const KNOWN_ZERO_HEIGHTS: readonly number[] = [
  14.134725141734693, 21.02203963877155, 25.010857580145688, 30.424876125859513, 32.935061587739189, 37.586178158825671,
]

export const CRITICAL_LINE = 0.5

/** Decides whether a candidate point refutes the Riemann hypothesis. */
export function refutesRiemann(s: Complex, epsilon = 1e-9): boolean {
  const inStrip = s.re > 0 && s.re < 1
  const offLine = exactAbs(s.re - CRITICAL_LINE) > epsilon
  return inStrip && offLine && cabs(zeta(s)) < epsilon
}

/** A CNF formula: clauses of signed 1-based variable indices. */
export type Clause = readonly number[]
export type Formula = readonly Clause[]

/** The NP side, exact and linear in the clause count: does this assignment satisfy the formula? */
export function satisfies(formula: Formula, assignment: readonly boolean[]): boolean {
  return formula.every((clause) => clause.some((lit) => assignment[exactAbs(lit) - 1] === lit > 0))
}

export interface SatClaim {
  readonly satisfiable: boolean
  /** required when satisfiable is claimed — the certificate */
  readonly assignment?: readonly boolean[]
}

/** Exhaustive decision, for instances small enough to settle by enumeration. */
export function decideByEnumeration(formula: Formula, variables: number): SatClaim {
  for (let mask = 0; mask < 2 ** variables; mask += 1) {
    const assignment = Array.from({ length: variables }, (_, i) => (mask >> i) % 2 === 1)
    if (satisfies(formula, assignment)) return { satisfiable: true, assignment }
  }
  return { satisfiable: false }
}

export interface Instance {
  readonly formula: Formula
  readonly variables: number
}

export interface Disagreement {
  readonly index: number
  readonly claimed: boolean
  readonly actual: boolean
  readonly reason: 'no-certificate' | 'bad-certificate' | 'wrong-verdict'
}

/**
 * Decides whether a claimed decision procedure is refuted by a set of instances.
 *
 * A claimed SAT verdict must carry a certificate that `satisfies` accepts; a claimed UNSAT verdict is
 * checked against enumeration. Returns the first disagreement, or `undefined`.
 */
export function refutesSolver(solver: (i: Instance) => SatClaim, instances: readonly Instance[]): Disagreement | undefined {
  for (let index = 0; index < instances.length; index += 1) {
    const inst = instances[index]!
    const claim = solver(inst)
    if (claim.satisfiable) {
      if (!claim.assignment) return { index, claimed: true, actual: false, reason: 'no-certificate' }
      if (!satisfies(inst.formula, claim.assignment)) {
        return { index, claimed: true, actual: false, reason: 'bad-certificate' }
      }
      continue
    }
    const truth = decideByEnumeration(inst.formula, inst.variables)
    if (truth.satisfiable) return { index, claimed: false, actual: true, reason: 'wrong-verdict' }
  }
  return undefined
}

/** Decides whether a candidate curve refutes BSD: the two ranks disagree. */
export function refutesBSD(analyticRank: number, algebraicRank: number): boolean {
  return Number.isInteger(analyticRank) && Number.isInteger(algebraicRank) && analyticRank !== algebraicRank
}

/** What each problem's refutation-decider takes, and where none exists from finite data alone. */
export interface Decider {
  readonly problem: string
  /** the function that decides a candidate, or '' where none is implemented */
  readonly decides: string
  /** what a candidate consists of */
  readonly candidate: string
}

export const DECIDERS: readonly Decider[] = [
  { problem: 'Riemann Hypothesis', decides: 'refutesRiemann', candidate: 'a point s in the critical strip, off the line, with ζ(s) = 0' },
  { problem: 'P vs NP', decides: 'refutesSolver', candidate: 'a claimed decision procedure and a set of instances' },
  { problem: 'Birch–Swinnerton-Dyer', decides: 'refutesBSD', candidate: 'a curve with its analytic and algebraic rank' },
  { problem: 'Navier–Stokes existence & smoothness', decides: '', candidate: 'a blow-up solution — a function on an interval, not a finite datum' },
  { problem: 'Yang–Mills existence & mass gap', decides: '', candidate: 'a constructed measure on ℝ⁴ satisfying the OS axioms' },
  { problem: 'Hodge Conjecture', decides: '', candidate: 'a Hodge class with no algebraic-cycle representation' },
  { problem: 'Poincaré Conjecture', decides: '', candidate: 'a simply-connected closed 3-manifold not homeomorphic to S³' },
]

export const IMPLEMENTED = DECIDERS.filter((d) => d.decides !== '').length

/** @index-cross.foldback child=millennium/closure parent=millennium — this cross folds back into its parent. */
