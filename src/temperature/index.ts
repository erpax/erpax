import { algebraExp, algebraLog2, exactMax } from '@/algebra'
import { landauerJoules, roomKelvin } from '@/floor'
/**
 * temperature -- the EXCHANGE RATE between energy and order: 1/T = ∂S/∂E. It sets
 * how a system populates its energy levels via the Boltzmann factor e^(−E/kT)
 * ([[boltzmann]]'s k), normalised by the partition function Z = Σ e^(−Eₙ/kT). Cold
 * (T→0): the system falls to its ground state ([[hamiltonian]]'s lowest rung). Hot
 * (T→∞): every level equally likely -- maximum [[entropy]]. The equilibrium
 * distribution pᵢ = e^(−Eᵢ/kT)/Z is the MAX-ENTROPY distribution at a fixed average
 * energy: the [[balance]] the ledger settles to, temperature the dial between
 * frozen order and hot disorder.
 *
 *   tsx src/temperature/index.ts
 *
 * @standard SI-2019 k_B (via ../boltzmann); Maxwell–Boltzmann statistics
 * @audit Boltzmann factor e^(−E/kT), partition Z=Σe^(−Eₙ/kT), distribution pᵢ -- computed
 * @see ../boltzmann (k, S=k ln W) -- ../equilibrium -- ../hamiltonian (the energy levels) -- ../entropy
 */
import { BOLTZMANN_K } from '@/boltzmann'

/** The Boltzmann factor e^(−E/kT): the unnormalised weight of a level of energy E at temperature T. */
export const factor = (energyJ: number, tempK: number): number => algebraExp(-energyJ / (BOLTZMANN_K * tempK))

/** The partition function Z = Σ e^(−Eₙ/kT) — the normaliser of the distribution. */
export const partition = (energies: readonly number[], tempK: number): number =>
  energies.reduce((z, e) => z + factor(e, tempK), 0)

/** The equilibrium (Boltzmann) distribution pᵢ = e^(−Eᵢ/kT) / Z over a set of energy levels. */
export function distribution(energies: readonly number[], tempK: number): number[] {
  const z = partition(energies, tempK)
  return energies.map((e) => factor(e, tempK) / z)
}

/** The occupancy ratio of two levels: pᵢ/pⱼ = e^(−(Eᵢ−Eⱼ)/kT) — the detailed-balance ratio. */
export const ratio = (energyI: number, energyJ: number, tempK: number): number =>
  algebraExp(-(energyI - energyJ) / (BOLTZMANN_K * tempK))

// ─── Landauer — erasing a bit of information sheds at least kT ln 2 ───────────────────────────────
// Everything below counts WIDTHS. A step cannot erase more information than the bits it drops, so a
// width difference is the MOST a step can erase and the heat figures are that ceiling priced at the
// Landauer rate. What a step actually erases is the entropy of its input that the output no longer
// determines — for structured input (text, a valid residue tuple) that is less than the width says.

/** The core: a CPU die at room temperature, in kelvin — the corpus's one room temperature ([[floor]]). */
export const coreK = (): number => roomKelvin()

/** The fridge: a dilution refrigerator where a quantum processor runs, in kelvin. */
export const millikelvinK = (): number => 0.015

/** Landauer's bound — the least heat erasing one bit sheds at temperature T: k_B · T · ln 2 joules. */
export const landauerJ = (tempK: number): number => landauerJoules(1, tempK)

/**
 * The bits a step DROPS: its input width minus its output width, never negative. A step whose
 * input is uniformly random erases exactly this many; for any other input it erases at most this.
 */
export const erasedBits = (inBits: number, outBits: number): number => exactMax(0, inBits - outBits)

/**
 * True when a step does not narrow. That is NECESSARY for it to be reversible and not sufficient:
 * a map into a wider space can still send two inputs to one output. A bijection (the CRT split, a
 * unitary, a reversible gate) is non-narrowing; being non-narrowing does not make a step a bijection.
 */
export const nonNarrowing = (inBits: number, outBits: number): boolean => erasedBits(inBits, outBits) === 0

export interface HeatLine {
  readonly op: string
  readonly inBits: number
  readonly outBits: number
  /** the most the step can erase: the bits it drops */
  readonly erased: number
  /** it does not narrow — necessary for reversibility, not proof of it */
  readonly nonNarrowing: boolean
  /** Joules for that ceiling at the core and in the fridge — the same erasure, 20,000× apart. */
  readonly coreJ: number
  readonly millikelvinJ: number
}

/** One step's Landauer line: `inBits` and `outBits` are the widths of what goes in and what comes out. */
export function heatOf(op: string, inBits: number, outBits: number): HeatLine {
  const erased = erasedBits(inBits, outBits)
  return { op, inBits, outBits, erased, nonNarrowing: erased === 0, coreJ: erased * landauerJ(coreK()), millikelvinJ: erased * landauerJ(millikelvinK()) }
}

/**
 * One collapse's dropped bits shared over the computations read out through it: `erased / n`. This
 * is BOOKKEEPING — a share of one number — and holds only when the n computations really do end in
 * a single shared readout. It is not a claim that n independent results can be had for the heat of
 * one: each result that is read out separately is its own collapse.
 */
export const amortisedBits = (erasedAtCollapse: number, computedAtOnce: number): number =>
  computedAtOnce <= 0 ? erasedAtCollapse : erasedAtCollapse / computedAtOnce

/**
 * The corpus's own operations on a 128-bit address, as Landauer lines. The widths are facts of the
 * operations: the split is 128 → 5·31 bits, the join takes those residues back to the 128-bit value,
 * the AND-fold keeps 64 of 128, a digital root keeps log₂ 9 of them, and a content-uuid keeps 128
 * bits of a SKILL's bytes. The join is entered at 128 bits in, because a valid residue tuple carries
 * 128 bits of information however many bits it is written in. The hash line is a ceiling: a SKILL
 * is text, and text carries far less entropy than its width.
 */
export function heatLedger(skillBytes = 4096): HeatLine[] {
  return [
    heatOf('prime.split — 128-bit value → five 31-bit residues (CRT, bijective)', 128, 155),
    heatOf('prime.join — five residues (128 bits of information) → the 128-bit value', 128, 128),
    heatOf('word.interact64 — AND two 64-bit halves', 128, 64),
    heatOf('hexbit.digitalRootPacked — 32 hexits → one of nine', 128, algebraLog2(9)),
    heatOf(`uuid — sha256 of a ${skillBytes}-byte SKILL → 128 bits`, skillBytes * 8, 128),
  ]
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const levels = [0, 1e-21, 2e-21]
  console.log('temperature -- Boltzmann distribution over levels [0, 1e-21, 2e-21] J:')
  for (const T of [10, 100, 1000]) {
    console.log('  T=' + String(T).padStart(4) + 'K  p=' + distribution(levels, T).map((p) => p.toFixed(3)).join(', ') + '  Z=' + partition(levels, T).toFixed(3))
  }
}
