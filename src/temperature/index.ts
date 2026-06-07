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
export const factor = (energyJ: number, tempK: number): number => Math.exp(-energyJ / (BOLTZMANN_K * tempK))

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
  Math.exp(-(energyI - energyJ) / (BOLTZMANN_K * tempK))

if (import.meta.url === 'file://' + process.argv[1]) {
  const levels = [0, 1e-21, 2e-21]
  console.log('temperature -- Boltzmann distribution over levels [0, 1e-21, 2e-21] J:')
  for (const T of [10, 100, 1000]) {
    console.log('  T=' + String(T).padStart(4) + 'K  p=' + distribution(levels, T).map((p) => p.toFixed(3)).join(', ') + '  Z=' + partition(levels, T).toFixed(3))
  }
}
