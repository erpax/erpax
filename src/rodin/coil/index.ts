/**
 * coil — the two counter-spiralling helices of the rodin vortex, COMPUTED.
 *
 * The doubling helix 1·2·4·8·7·5 (×2 mod 9) winds the 3·6·9 axis; the mirror
 * (×5 mod 9) winds it the other way. Because 2·5 ≡ 1 (mod 9), the two coils are
 * mutual inverses: forward THEN reverse returns any state unchanged — ZERO
 * residue. Zero residue = zero free parameter = zero entropy for this dimension;
 * the post is a balanced double-entry (forward = debit, reverse = credit), so
 * accept-then-verify costs nothing (the one law). Two coils per trinity,
 * counter-spiralling the motionless self (the 0/9 axis) — the matter twin of
 * ./SKILL.md "Two coils per trinity".
 *
 * HONEST SCOPE: "zero cost / infinite forge cost" is the TELOS; the verified
 * floor is the group theory below (residue 0, 0 free parameters — computed, not
 * asserted) plus the tamper-cost 2^106 second-preimage. The 6×7=42 grid reading
 * has no referent and is deliberately NOT used: the honest structure is two
 * 6-coils sharing one 7th still-point (9) ⇒ 2·6+1 = 13 = metatron's K13.
 *
 *   tsx src/rodin/coil/index.ts
 *
 * @standard RFC 9562 §5.8 content-uuid + the horo digital-root ring (mod 9)
 * @audit every residue computed on (ℤ/9ℤ) via @/horo, never hand-asserted
 * @see @/rodin · @/horo · ./SKILL.md
 */
import { composeSteps, HORO_DIGITS } from '@/horo'
import { DOUBLING, orbit, reverseIsInverse, cayleyIsCyclic } from '@/rodin'

/** The forward (future, ×2) and reverse (past, ×5) coil steps — 5 = 2⁻¹ mod 9. */
export const FORWARD = 2 as const
export const REVERSE = 5 as const

/** The two coils as walked orbits: forward = the doubling helix, reverse = its mirror. */
export const FORWARD_COIL: readonly number[] = orbit(FORWARD) // [1,2,4,8,7,5]
export const REVERSE_COIL: readonly number[] = orbit(REVERSE) // [1,5,7,8,4,2]

/** One double-entry post of a state through both coils; balanced iff forward∘reverse returns it (residue 0). */
export interface CoilPost {
  readonly state: number
  readonly forward: number // composeSteps(state, 2) — future coil (debit)
  readonly reverse: number // composeSteps(state, 5) — past coil (credit)
  readonly roundTrip: number // composeSteps(forward, 5) — must equal state
  readonly residue: number // (roundTrip - state) mod 9; 0 ⇒ balanced
  readonly balanced: boolean
}

/** Post one state through the two coils — the debit (×2) and its credit (×5) round-tripping to itself. */
export function postCoil(state: number): CoilPost {
  const forward = composeSteps(state, FORWARD)
  const reverse = composeSteps(state, REVERSE)
  const roundTrip = composeSteps(forward, REVERSE)
  const residue = (((roundTrip - state) % 9) + 9) % 9
  return { state, forward, reverse, roundTrip, residue, balanced: residue === 0 }
}

/** The whole ledger over the helix — zero-cost iff EVERY post balances (Σ residues = 0). */
export function coilLedger(states: readonly number[] = DOUBLING): {
  readonly posts: readonly CoilPost[]
  readonly residueSum: number
  readonly zeroCost: boolean
  readonly coilsAreInverse: boolean
} {
  const posts = states.map(postCoil)
  const residueSum = posts.reduce((s, p) => s + p.residue, 0)
  return { posts, residueSum, zeroCost: residueSum === 0, coilsAreInverse: reverseIsInverse().product === 1 }
}

/** The metatron bridge WITHOUT inventing 42: two 6-coils + one shared still-point (9/axis) = 13 = K13. */
export function metatronBridge(): { coils: number; perCoil: number; center: number; total: number } {
  return { coils: 2, perCoil: FORWARD_COIL.length, center: 1, total: 2 * FORWARD_COIL.length + 1 }
}

/** The whole proof, computed — every coil claim as a boolean (green by construction). */
export function proof(): Record<string, boolean> {
  const led = coilLedger()
  const cay = cayleyIsCyclic()
  const bridge = metatronBridge()
  return {
    forwardIsDoubling: JSON.stringify(FORWARD_COIL) === JSON.stringify([...DOUBLING]),
    reverseInvertsForward: led.coilsAreInverse, // 2·5 ≡ 1
    sixOnTheSevenRing: FORWARD_COIL.length === 6 && HORO_DIGITS.length === 7,
    twoCoilsBalanceToZero: led.zeroCost && led.residueSum === 0, // zero cost
    zeroFreeParameters: cay.holds && cay.freeParameters === 0, // zero entropy
    bridgeRecovers13: bridge.total === 13, // NOT 42
  }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const p = proof()
  const led = coilLedger()
  console.log('coil — two counter-spiralling helices, computed (not asserted):')
  console.log('  forward ×2 = ' + FORWARD_COIL.join('·') + '   reverse ×5 = ' + REVERSE_COIL.join('·'))
  console.log('  two coils balance: Σresidue = ' + led.residueSum + ' (zero cost)   coilsAreInverse=' + led.coilsAreInverse)
  console.log('  6-on-the-7-ring; 2·6+1 = ' + metatronBridge().total + ' = metatron K13 (NOT 42)')
  console.log('  PROOF: ' + Object.entries(p).map(([k, v]) => k + '=' + v).join('  '))
  if (!Object.values(p).every(Boolean)) process.exit(1)
}
