/**
 * qubit — vortex circuit ⇒ measure ⇒ bit. Algebra only — no host Math.*.
 *
 * Classical bit ∈ {0,1}. Doubling helix ⟨2⟩={1,2,4,8,7,5} ≅ ζ₆^k in ℚ(√3).
 * Slash flows from [[horo]].fullBreath; measure collapses phase index → digit → bit.
 *
 *   tsx src/qubit/index.ts
 *
 * @see ../rodin · ../rodin/coil · ../horo · ../algebra · ./SKILL.md
 */
import { DOUBLING, doublingGroup, reverseIsInverse } from '@/rodin'
import { FORWARD_COIL, REVERSE_COIL } from '@/rodin/coil'
import { fullBreath } from '@/horo'

export const atomPath = 'qubit' as const

export type ClassicalBit = 0 | 1

export const isClassicalBit = (x: unknown): x is ClassicalBit => x === 0 || x === 1

/**
 * Element of ℚ(√3): value = (a + b√3) / den.
 * Sixth roots of unity live exactly here — no PI / cos / sin.
 */
export interface Quad {
  readonly a: number
  readonly b: number
  readonly den: number
}

export interface RootOfUnity {
  readonly k: number
  /** turn fraction k/6 of the circle — rational, never radians */
  readonly turn: { readonly num: number; readonly den: 6 }
  readonly re: Quad
  readonly im: Quad
  readonly digit: number
}

/** Exact ζ₆^k = e^{2πik/6} as (re, im) ∈ ℚ(√3)². */
const SIXTH: readonly { readonly re: Quad; readonly im: Quad }[] = [
  { re: { a: 1, b: 0, den: 1 }, im: { a: 0, b: 0, den: 1 } }, // 1
  { re: { a: 1, b: 0, den: 2 }, im: { a: 0, b: 1, den: 2 } }, // 1/2 + (√3/2)i
  { re: { a: -1, b: 0, den: 2 }, im: { a: 0, b: 1, den: 2 } }, // -1/2 + (√3/2)i
  { re: { a: -1, b: 0, den: 1 }, im: { a: 0, b: 0, den: 1 } }, // -1
  { re: { a: -1, b: 0, den: 2 }, im: { a: 0, b: -1, den: 2 } }, // -1/2 - (√3/2)i
  { re: { a: 1, b: 0, den: 2 }, im: { a: 0, b: -1, den: 2 } }, // 1/2 - (√3/2)i
]

/** ⟨2⟩ digits paired with ζ₆^k ∈ ℚ(√3). */
export function sixthRootsOfUnity(digits: readonly number[] = DOUBLING): readonly RootOfUnity[] {
  return digits.map((digit, k) => {
    const z = SIXTH[k]!
    return { k, turn: { num: k, den: 6 }, re: z.re, im: z.im, digit }
  })
}

/** order-6 helix ≅ 6 roots — computed from doublingGroup + roots length. */
export function doublingIsomorphicToRoots(): boolean {
  const g = doublingGroup()
  return g.order === 6 && g.equalsUnits && g.cyclic && sixthRootsOfUnity().length === 6
}

export const vortexCircuit = (): readonly number[] => fullBreath().map((b) => b.step)

export function slashFlows(): {
  readonly ascending: number
  readonly descending: number
  readonly counterRotates: boolean
} {
  const breath = fullBreath()
  const inv = reverseIsInverse()
  return {
    ascending: breath.filter((b) => b.slope === 'up').length,
    descending: breath.filter((b) => b.slope === 'down').length,
    counterRotates: inv.mirrors && inv.product === 1 && FORWARD_COIL.length === 6 && REVERSE_COIL.length === 6,
  }
}

/** Interference nodes = digits where slope flips. */
export function standingWaveNodes(): readonly number[] {
  const breath = fullBreath()
  const nodes: number[] = []
  for (let i = 1; i < breath.length; i++) {
    if (breath[i]!.slope !== breath[i - 1]!.slope) nodes.push(breath[i]!.step)
  }
  return nodes
}

export interface VortexQubit {
  readonly phases: readonly RootOfUnity[]
  /** |amp|² = 1/n — probability algebra, no host √. */
  readonly ampSq: { readonly num: 1; readonly den: number }
}

export function prepareQubit(): VortexQubit {
  const phases = sixthRootsOfUnity()
  return { phases, ampSq: { num: 1, den: phases.length } }
}

/** Collapse phase index → digit → bit (parity of helix index). */
export function measureQubit(q: VortexQubit = prepareQubit(), index = 0): {
  readonly digit: number
  readonly bit: ClassicalBit
  readonly fromPhases: number
} {
  const k = ((index % 6) + 6) % 6
  const digit = q.phases[k]!.digit
  return { digit, bit: (k % 2 === 0 ? 0 : 1) as ClassicalBit, fromPhases: q.phases.length }
}

export function bitShadow(digit: number, helixIndex?: number): ClassicalBit {
  const k = helixIndex ?? DOUBLING.indexOf(digit as (typeof DOUBLING)[number])
  if (k < 0) return (digit % 2 === 0 ? 0 : 1) as ClassicalBit
  return (k % 2 === 0 ? 0 : 1) as ClassicalBit
}

const EXPECTED = [0, 1, 2, 4, 8, 7, 5, 3, 6, 9, 0, 1] as const

/** Sealed report — holds is purely computed (iso · coils · nodes · circuit · measure). */
export function qubitFromVortex(): {
  readonly circuit: readonly number[]
  readonly doubling: readonly number[]
  readonly isomorphic: boolean
  readonly counterRotates: boolean
  readonly nodes: readonly number[]
  readonly measure: ReturnType<typeof measureQubit>
  readonly holds: boolean
} {
  const circuit = vortexCircuit()
  const isomorphic = doublingIsomorphicToRoots()
  const slashes = slashFlows()
  const nodes = standingWaveNodes()
  const q = prepareQubit()
  const measure = measureQubit(q, 0)
  const holds =
    isomorphic &&
    slashes.counterRotates &&
    nodes.length > 0 &&
    measure.fromPhases === 6 &&
    q.ampSq.den === 6 &&
    q.ampSq.num === 1 &&
    isClassicalBit(measure.bit) &&
    circuit.length === EXPECTED.length &&
    circuit.every((d, i) => d === EXPECTED[i])
  return {
    circuit,
    doubling: [...DOUBLING],
    isomorphic,
    counterRotates: slashes.counterRotates,
    nodes,
    measure,
    holds,
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const q = qubitFromVortex()
  console.log('qubit — vortex ⇒ measure ⇒ bit (ℚ(√3) algebra)')
  console.log(`  holds=${q.holds} iso=${q.isomorphic} coils=${q.counterRotates} nodes=${q.nodes.length}`)
  console.log(`  circuit [${q.circuit.join(',')}]`)
  console.log(`  measure phases=${q.measure.fromPhases} → digit=${q.measure.digit} → bit=${q.measure.bit}`)
}
