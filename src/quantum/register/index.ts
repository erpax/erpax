/**
 * quantum/register — an exact-amplitude register: basis states are integers, amplitudes are
 * integers, normalisation is an integer identity. See SKILL.md.
 *
 * Learned from qpu.uuidna.com and proved in ../../verify/lean/Register.lean: a Float Born rule
 * cannot be decided, an integer one can. Every Hadamard scales the vector by √2 and records one
 * HALVING instead of dividing, so Σ amplitude² = 2^halvings exactly — the books of possibility close
 * at an integer, never at 0.9999999. Measurement is ENUMERATED, never sampled: a shot list is an
 * audit record, not a random draw.
 *
 * Basis convention (shared with the Lean twin): qubit q is bit (1 << q) of the basis index, so
 * |00⟩ → X₀ → |01⟩ = 1 → CNOT₀₁ → |11⟩ = 3.
 *
 *   tsx src/quantum/register/index.ts
 *
 * @see ../../verify/lean/Register.lean — the kernel-checked twin, every theorem axiom-free
 * @see ../../superposition · ../dimension · ../../trading/quantum — the Float carrier, folded onto normaliseAmplitudes
 * @standard Nielsen & Chuang §1.3.6 — the Bell state as H then CNOT
 */
import { algebraSqrt } from '@/algebra'

/** Canonical atom path. */
export const atomPath = 'quantum/register' as const

export interface Register {
  readonly qubits: number
  /** 2^qubits integer amplitudes, scaled by √2^halvings. Index i: qubit q is bit (1 << q). */
  readonly amplitudes: readonly bigint[]
  /** Σ amplitude² = 2^halvings — the integer normalisation identity. */
  readonly halvings: number
}

export type Gate =
  | { readonly name: 'h'; readonly q: number }
  | { readonly name: 'x'; readonly q: number }
  | { readonly name: 'z'; readonly q: number }
  | { readonly name: 'cnot'; readonly c: number; readonly t: number }
  | { readonly name: 'swap'; readonly a: number; readonly b: number }

/** |0…0⟩ on `qubits` qubits: amplitude 1 at index 0, no halvings. */
export function register(qubits: number): Register {
  const amplitudes: bigint[] = []
  for (let i = 0; i < 1 << qubits; i++) amplitudes.push(i === 0 ? 1n : 0n)
  return { qubits, amplitudes, halvings: 0 }
}

/* ── the basis path — qpu's integer form, mirrored by Register.lean `bit` · `x` · `cnot` ── */

/** Is qubit q set in basis index i? */
export const bit = (q: number, i: number): boolean => (i & (1 << q)) !== 0

/** Pauli X on the basis index: flip bit q. */
export const basisX = (q: number, i: number): number => i ^ (1 << q)

/** CNOT on the basis index: flip t when c is set. `basisCnot(0, 1, basisX(0, 0)) === 3` is the Bell path. */
export const basisCnot = (c: number, t: number, i: number): number => (bit(c, i) ? i ^ (1 << t) : i)

/** SWAP on the basis index: exchange bits a and b. */
export const basisSwap = (a: number, b: number, i: number): number =>
  bit(a, i) === bit(b, i) ? i : i ^ (1 << a) ^ (1 << b)

/* ── the amplitudes ── */

/** A basis permutation moves each amplitude with its index: new[i] = old[π(i)] for an involution π. */
function permute(r: Register, pi: (i: number) => number): Register {
  return { ...r, amplitudes: r.amplitudes.map((_, i) => r.amplitudes[pi(i)]!) }
}

/** Apply one gate. H adds a halving; every other gate here is a signed permutation and adds none. */
export function apply(r: Register, gate: Gate): Register {
  switch (gate.name) {
    case 'x':
      return permute(r, (i) => basisX(gate.q, i))
    case 'cnot':
      return permute(r, (i) => basisCnot(gate.c, gate.t, i))
    case 'swap':
      return permute(r, (i) => basisSwap(gate.a, gate.b, i))
    case 'z':
      return { ...r, amplitudes: r.amplitudes.map((a, i) => (bit(gate.q, i) ? -a : a)) }
    case 'h': {
      // Pairs (i, i|bit): sum into the clear index, difference into the set one — Register.lean `h0` · `h1`.
      const mask = 1 << gate.q
      const out = [...r.amplitudes]
      for (let i = 0; i < out.length; i++) {
        if (i & mask) continue
        const lo = r.amplitudes[i]!
        const hi = r.amplitudes[i | mask]!
        out[i] = lo + hi
        out[i | mask] = lo - hi
      }
      return { ...r, amplitudes: out, halvings: r.halvings + 1 }
    }
  }
}

/** Run a circuit. */
export const run = (r: Register, gates: readonly Gate[]): Register => gates.reduce(apply, r)

/** Born weights before the division: amplitude² per basis state. */
export const weights = (r: Register): readonly bigint[] => r.amplitudes.map((a) => a * a)

/** The denominator every weight is over: 2^halvings. */
export const total = (r: Register): bigint => 1n << BigInt(r.halvings)

/** Σ weight === 2^halvings — the identity Float can only approximate. Checked after every gate in the test. */
export const normalised = (r: Register): boolean => weights(r).reduce((s, w) => s + w, 0n) === total(r)

/** Basis indices with non-zero amplitude — qpu's `support`. */
export const support = (r: Register): readonly number[] =>
  r.amplitudes.flatMap((a, i) => (a === 0n ? [] : [i]))

/**
 * Is qubit q separable from the rest? Reshape the vector as a 2 × 2^(n−1) matrix with q as the row;
 * the state is a product across that cut exactly when every 2×2 minor vanishes (rank 1). For two
 * qubits that is the single determinant a0·a3 − a1·a2 — Register.lean `determinant`.
 */
export function isProductAt(r: Register, q: number): boolean {
  const mask = 1 << q
  const rest = r.amplitudes.map((_, i) => i).filter((i) => (i & mask) === 0)
  for (let x = 0; x < rest.length; x++) {
    for (let y = x + 1; y < rest.length; y++) {
      const i = rest[x]!
      const j = rest[y]!
      if (r.amplitudes[i]! * r.amplitudes[j | mask]! - r.amplitudes[j]! * r.amplitudes[i | mask]! !== 0n) return false
    }
  }
  return true
}

/** Not a product state across qubit q's cut. qpu's `entangle : 1·1 ≠ 0·0`, with the state attached. */
export const entangled = (r: Register, q = 0): boolean => !isProductAt(r, q)

/** The two-qubit determinant a0·a3 − a1·a2: zero ⇔ separable. */
export function determinant(r: Register): bigint {
  if (r.qubits !== 2) throw new Error(`determinant: a 2-qubit witness, given ${r.qubits} qubits`)
  const [a0, a1, a2, a3] = r.amplitudes as [bigint, bigint, bigint, bigint]
  return a0 * a3 - a1 * a2
}

/** (|00⟩ + |11⟩): H₀ then CNOT₀₁ on |00⟩ — amplitudes [1,0,0,1], support {0,3}, one halving. */
export const bell = (): Register => run(register(2), [{ name: 'h', q: 0 }, { name: 'cnot', c: 0, t: 1 }])

/** (|0…0⟩ + |1…1⟩): H₀ then a CNOT chain — support {0, 2^n − 1}, one halving. */
export function ghz(qubits = 3): Register {
  const gates: Gate[] = [{ name: 'h', q: 0 }]
  for (let q = 1; q < qubits; q++) gates.push({ name: 'cnot', c: q - 1, t: q })
  return run(register(qubits), gates)
}

export interface Shots {
  readonly shots: number
  /** The outcome sequence — one round is every supported index repeated by its weight, in index order. */
  readonly outcomes: readonly number[]
  readonly support: readonly number[]
  /** Integer weight per basis index over `total`. */
  readonly weights: readonly bigint[]
  readonly counts: readonly { readonly i: number; readonly w: bigint }[]
  readonly enumerated: true
  readonly sampled: false
}

/**
 * Measurement ENUMERATED, never sampled — qpu's `shots`. `rounds` repetitions of the exact weight
 * multiset, so the counts ARE the Born weights and the list is an audit record anyone can recompute.
 * Bell for 4 rounds: [0,3,0,3,0,3,0,3]. Nothing random enters, so nothing has to be trusted.
 */
export function shots(r: Register, rounds = 1): Shots {
  const w = weights(r)
  const round: number[] = []
  w.forEach((weight, i) => {
    for (let k = 0n; k < weight; k++) round.push(i)
  })
  const outcomes: number[] = []
  for (let k = 0; k < rounds; k++) outcomes.push(...round)
  return {
    shots: outcomes.length,
    outcomes,
    support: support(r),
    weights: w,
    counts: w.flatMap((weight, i) => (weight === 0n ? [] : [{ i, w: weight }])),
    enumerated: true,
    sampled: false,
  }
}

/* ── the Float carrier, written once ── */

/**
 * The Float Born rule, at ONE address. `superposition`, `quantum/dimension` and `trading/quantum`
 * each carried this body ([[rules]]/copy); each still shapes its own key space (zero-fill a basis,
 * drop non-finite entries) and then calls here. A real amplitude cannot be made exact — √ of a Float
 * is a Float — so this is the honest second carrier, and the register above is the one that can be
 * decided. `label` names the caller in the refusal, because the zero state has no normalisation.
 */
export function normaliseAmplitudes<K extends string | number>(amp: Readonly<Record<K, number>>, label: string): Record<K, number> {
  const keys = Object.keys(amp) as K[]
  const norm = algebraSqrt(keys.reduce((s, k) => s + amp[k] * amp[k], 0))
  if (norm === 0) {
    throw new Error(`${label}: zero superposition — the zero state has no normalisation; give at least one non-zero amplitude`)
  }
  const out = {} as Record<K, number>
  for (const k of keys) out[k] = amp[k] / norm
  return out
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const b = bell()
  const s = shots(b, 4)
  console.log(`quantum/register — exact amplitudes on ${b.qubits} qubits, basis h·cnot`)
  console.log(`  bell  amplitudes [${b.amplitudes.join(',')}] · halvings ${b.halvings} · Σw=${total(b)} normalised=${normalised(b)}`)
  console.log(`  support {${support(b).join(',')}} · determinant ${determinant(b)} · entangled=${entangled(b)}`)
  console.log(`  shots ×${s.shots} enumerated [${s.outcomes.join(',')}] · path cnot(0,1,x(0,0)) = ${basisCnot(0, 1, basisX(0, 0))}`)
  const g = ghz(3)
  console.log(`  ghz   support {${support(g).join(',')}} · entangled at every cut = ${[0, 1, 2].every((q) => entangled(g, q))}`)
}
