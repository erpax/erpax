/**
 * quantum — an exact quantum register, limited by the host's memory and by nothing else.
 *
 * Basis states are bigint indices, so a register has as many qubits as a run asks for. Amplitudes are
 * bigints, and a Hadamard records one HALVING instead of dividing by √2, so
 *
 *     Σ amplitude² = 2 ^ halvings
 *
 * is an identity every run checks. Only non-zero amplitudes are held: the limit is the SUPPORT, the
 * number of basis states in superposition, which one Hadamard can at most double. A thousand-qubit
 * GHZ state holds two amplitudes; nineteen Hadamards in a row hold 2^19.
 *
 * The gates are H, X, Z, CNOT and CCX (Toffoli). {H, Toffoli} is universal for quantum computation
 * over real amplitudes (Shi 2003; Aharonov 2003), so any circuit with real amplitudes compiles to them.
 *
 * Twin: Register.lean (the same gates on the basis path and on two-qubit amplitudes, by `decide`,
 * and `flip_involution` for every qubit and every index).
 *
 * WHAT THIS IS NOT: a quantum device. It computes on the host's CPU, and its memory and time grow with
 * the support, which is what every classical simulation pays. No speed-up over classical
 * computation is claimed.
 */

/** A register: its width, the halvings its Hadamards recorded, and its non-zero amplitudes. */
export interface Register {
  readonly qubits: number
  readonly halvings: number
  readonly amp: ReadonlyMap<bigint, bigint>
}

/** A gate and the qubits it acts on: one for h/x/z, control then target for cnot, two controls then target for ccx. */
export interface Gate {
  readonly gate: 'h' | 'x' | 'z' | 'cnot' | 'ccx'
  readonly qubits: readonly number[]
}

const ARITY: Readonly<Record<Gate['gate'], number>> = { h: 1, x: 1, z: 1, cnot: 2, ccx: 3 }

// ── Capacity ──────────────────────────────────────────────────────────────────────────────────────
// A Cloudflare Workers isolate has 128 MiB. A held amplitude (a Map entry, bigint index, bigint
// amplitude) measured 73 bytes in V8 with small values and 108 with a 200-qubit index and a 120-bit
// amplitude; 128 bounds both. The state gets half the isolate, and a gate holds the old and the new
// state at once, so each gets a quarter.

/** The bytes a Workers isolate may use. */
export const ISOLATE_BYTES = 128 * 2 ** 20
/** The bytes one held amplitude costs, at most, in V8. */
export const BYTES_PER_AMPLITUDE = 128
/** The most amplitudes a register may hold in superposition: 2^18. */
export const SUPPORT_LIMIT = ISOLATE_BYTES / 4 / BYTES_PER_AMPLITUDE

const bit = (q: number): bigint => 1n << BigInt(q)

/** |0…0⟩ on `qubits` qubits. */
export const zero = (qubits: number): Register => {
  if (!Number.isInteger(qubits) || qubits < 1) throw new Error(`quantum: a register needs at least one qubit, not ${qubits}`)
  return { qubits, halvings: 0, amp: new Map([[0n, 1n]]) }
}

const checkQubits = (r: Register, g: Gate): void => {
  const arity = ARITY[g.gate]
  if (arity === undefined) throw new Error(`quantum: unknown gate ${String(g.gate)}`)
  if (g.qubits.length !== arity) throw new Error(`quantum: ${g.gate} acts on ${arity} qubit(s), not ${g.qubits.length}`)
  for (const q of g.qubits) if (!Number.isInteger(q) || q < 0 || q >= r.qubits) throw new Error(`quantum: qubit ${q} is outside a ${r.qubits}-qubit register`)
  if (new Set(g.qubits).size !== g.qubits.length) throw new Error(`quantum: ${g.gate} needs distinct qubits`)
}

const add = (into: Map<bigint, bigint>, index: bigint, a: bigint): void => {
  const sum = (into.get(index) ?? 0n) + a
  if (sum === 0n) into.delete(index)
  else into.set(index, sum)
  if (into.size > SUPPORT_LIMIT) throw new Error(`quantum: the support passed ${SUPPORT_LIMIT} amplitudes, the most a Workers isolate's memory holds`)
}

/** A permutation of the basis (X, CNOT, CCX): each amplitude moves to the index `to` gives it. */
const permute = (r: Register, to: (i: bigint) => bigint): Register => ({
  ...r,
  amp: new Map([...r.amp].map(([i, a]) => [to(i), a])),
})

/** One gate applied. */
export const apply = (r: Register, g: Gate): Register => {
  checkQubits(r, g)
  const [p = 0, q = 0, t = 0] = g.qubits
  switch (g.gate) {
    case 'x':
      return permute(r, (i) => i ^ bit(p))
    case 'cnot':
      return permute(r, (i) => (i & bit(p) ? i ^ bit(q) : i))
    case 'ccx':
      return permute(r, (i) => (i & bit(p) && i & bit(q) ? i ^ bit(t) : i))
    case 'z':
      return { ...r, amp: new Map([...r.amp].map(([i, a]) => [i, i & bit(p) ? -a : a])) }
    case 'h': {
      // H|0⟩ = |0⟩ + |1⟩, H|1⟩ = |0⟩ − |1⟩, unscaled: the √2 is the halving.
      const m = bit(p)
      const out = new Map<bigint, bigint>()
      for (const [i, a] of r.amp) {
        add(out, i & ~m, a)
        add(out, i | m, i & m ? -a : a)
      }
      return { ...r, halvings: r.halvings + 1, amp: out }
    }
  }
}

/** Σ amplitude²: equal to 2^halvings for every register a run builds. */
export const weight = (r: Register): bigint => [...r.amp.values()].reduce((s, a) => s + a * a, 0n)

/** Run a circuit from |0…0⟩, checking the normalisation identity at the end. */
export const run = (qubits: number, circuit: readonly Gate[]): Register => {
  const r = circuit.reduce(apply, zero(qubits))
  if (weight(r) !== 1n << BigInt(r.halvings)) throw new Error('quantum: Σ amplitude² ≠ 2^halvings — a gate broke unitarity')
  return r
}

/** The exact distribution: each basis state with probability amplitude² / 2^halvings, likeliest first. */
export const distribution = (r: Register): Array<{ state: bigint; weight: bigint }> =>
  [...r.amp].map(([state, a]) => ({ state, weight: a * a })).sort((x, y) => (y.weight > x.weight ? 1 : y.weight < x.weight ? -1 : x.state < y.state ? -1 : 1))

/** A basis state as a ket, qubit 0 rightmost. */
export const ket = (r: Register, state: bigint): string => `|${state.toString(2).padStart(r.qubits, '0')}⟩`

/**
 * Entangled across qubit `q`'s cut: the state is not a product of qubit q with the rest. A product
 * state has amplitudes a(i) with a(i)·a(j) = a(i ⊕ q)·a(j ⊕ q) for every pair split by q, so one
 * non-vanishing 2×2 minor witnesses entanglement (for two qubits, the determinant a0·a3 − a1·a2).
 */
export const entangled = (r: Register, q: number): boolean => {
  const m = bit(q)
  const rows = new Map<bigint, [bigint, bigint]>()
  for (const [i, a] of r.amp) {
    const rest = i & ~m
    const row = rows.get(rest) ?? [0n, 0n]
    row[i & m ? 1 : 0] = a
    rows.set(rest, row)
  }
  const list = [...rows.values()]
  const [first] = list
  if (!first) return false
  return list.some(([a0, a1]) => a0 * first[1] !== a1 * first[0])
}
