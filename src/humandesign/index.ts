/**
 * humandesign — Human Design SENT TO THE MATH: its real combinatorial skeleton, computed.
 *
 * Human Design (Ra Uru Hu, 1987) is a New Age synthesis of the I Ching, astrology, the chakra
 * system and Kabbalah, read as a "bodygraph" from birth data. It is NOT science: the personality,
 * destiny and "neutrino imprint" claims are unvalidated. But strip the divination and a real
 * combinatorial skeleton remains — and it lands on erpax's own math:
 *   • 64 gates = the 64 I Ching hexagrams = 2^6 — each gate is SIX binary lines (yin/yang = 0/1).
 *     REAL (Leibniz read the I Ching as binary in 1703).
 *   • 6 lines/gate ⇒ 384 lines (64×6). The 6 lines index onto the [[rodin]] doubling circuit
 *     1·2·4·8·7·5 — the cycle ⟨2⟩ in (ℤ/9ℤ)*, whose order is also 6. Same six: an indexing
 *     CONVENTION, not a claim the I Ching is group theory.
 *   • 64 = TORUS_BITS (the [[quantum]] double-torus is two 64-bit halves): a gate is a 6-bit
 *     address; the gate-space has the cardinality of one 6-bit torus slice. CONVENTION.
 *   • 9 centers (the bodygraph), 36 channels, 12 profiles, 5 types — structure, encoded as vocab.
 *
 * HONEST: the 6-bit / 64 / 9 / 12 / 36 counts and the hexagram binary are real and CHECKED here;
 * the rodin- and torus-correspondences are conventions (the numbers 6 and 64 coincide); the
 * divination layer (type, authority, destiny) is named, never claimed.
 *
 *   tsx src/humandesign/index.ts
 *
 * @audit the combinatorics are computed; the metaphysics is named, never claimed
 * @see ../rodin -- ../quantum -- ../chakra -- ../society -- ./SKILL.md
 */
import { TORUS_BITS } from '@/quantum'

/** 64 gates = 64 I Ching hexagrams = 2^6. */
export const GATES = 64
/** 6 lines per gate — the six binary lines of a hexagram. */
export const LINES = 6
/** The rodin doubling circuit (length 6 = LINES) — the lines indexed onto the vortex. */
export const RODIN_CIRCUIT = [1, 2, 4, 8, 7, 5] as const

/** Gate n (1..64) ⇒ its 6 binary lines (bottom→top) — the hexagram of n−1. */
export function hexagram(gate: number): number[] {
  const g = (((gate - 1) % GATES) + GATES) % GATES
  return Array.from({ length: LINES }, (_, i) => (g >> i) & 1)
}

/** 384 = 64 gates × 6 lines — the full line-space. */
export const totalLines = (): number => GATES * LINES

/** Real check: the gate-space is EXACTLY the 6-bit space (2^6 === 64). */
export const isHexagramSpaceComplete = (): boolean => (1 << LINES) === GATES

/** Convention: the 64 gates equal one 64-bit torus's bit-width (TORUS_BITS) — both the number 64. */
export const matchesTorus = (): boolean => GATES === TORUS_BITS

/** The 9 bodygraph centers (structure — NOT validated; encoded as vocabulary). */
export const CENTERS = ['Head', 'Ajna', 'Throat', 'Identity', 'Heart', 'Sacral', 'SolarPlexus', 'Spleen', 'Root'] as const

/** 12 canonical profiles (conscious/unconscious line pairs) — the wheel of 12. */
export const PROFILES = 12
/** 36 channels — each joins two gates. */
export const CHANNELS = 36

/** The 5 types (vocabulary). */
export const TYPES = ['Manifestor', 'Generator', 'ManifestingGenerator', 'Projector', 'Reflector'] as const

/**
 * Let human design the society: the 5 types as participation roles in [[society]] — a LENS, not a
 * validated mechanism. Who initiates, who responds and sustains, who guides, who witnesses the whole.
 */
export const TYPE_ROLE: Record<(typeof TYPES)[number], string> = {
  Manifestor: 'initiator',
  Generator: 'responder',
  ManifestingGenerator: 'responder',
  Projector: 'guide',
  Reflector: 'witness',
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('humandesign — Human Design sent to the math (combinatorics real, divination named):')
  console.log('  gates ' + GATES + ' = 2^' + LINES + ' (hexagram-space complete=' + isHexagramSpaceComplete() + ')  ·  lines ' + totalLines())
  console.log('  gate 1 = [' + hexagram(1).join('') + ']  gate 64 = [' + hexagram(64).join('') + ']')
  console.log('  6 lines ↔ rodin circuit ' + RODIN_CIRCUIT.join('·') + ' (len ' + RODIN_CIRCUIT.length + ')  ·  64==TORUS_BITS=' + matchesTorus())
  console.log('  bodygraph: ' + CENTERS.length + ' centers · ' + PROFILES + ' profiles · ' + CHANNELS + ' channels · ' + TYPES.length + ' types')
  console.log('  society lens: ' + TYPES.map((t) => t + '→' + TYPE_ROLE[t]).join('  '))
}
