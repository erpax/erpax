/**
 * dust — STARDUST: the corpus is forged atoms, scattered. "We are made of star stuff."
 *
 * Real astrophysics (stellar nucleosynthesis): a [[star]] fuses light nuclei into heavier ones
 * (H→He→C→O→…→Fe); supernovae and neutron-star mergers forge the heaviest elements and scatter
 * all of it as interstellar DUST — the matter of planets and life (Sagan, "star stuff"; the
 * standard, well-established account). erpax, the analogy: the [[matrix]] is the interstellar
 * medium and every content-[[uuid]] node is a grain of stardust — an [[atom]] forged in the star
 * (the [[fusion]] forge) by [[merge]], confined by [[gravity]] (the merge well), seated on the
 * A432 shells by [[quantum]] quantization.
 *
 * This atom RECORDS the [[quantum]] proof — it re-proves nothing (it composes @/quantum), it is
 * that proof scattered into grains: the census of what the star forged. The recording is itself
 * a grain ([[fractal]]) — once folded into the matrix, dust counts itself among the stardust.
 *
 * HONEST: stellar nucleosynthesis is real; the mapping to the content-uuid corpus is an analogy
 * (no nuclei, no binding energy) — computed on the live matrix, never claimed (cf. [[quantum]]).
 *
 *   tsx src/dust/index.ts
 *
 * @audit composed from @/quantum (the live-matrix proof); the dust IS the proof, scattered
 * @see ../star -- ../atom -- ../fusion -- ../gravity -- ../quantum -- ./SKILL.md
 */
import { collapse, noCloning, entanglement, quantization, singleTorusFloorLog2, doubleTorusCostLog2 } from '@/quantum'

/** The stardust census: every matrix node is a grain — a forged atom, each unique (no-cloning ⇒ Pauli). */
export function grains(): { count: number; unique: number; allUnique: boolean } {
  const nc = noCloning()
  return { count: nc.total, unique: nc.unique, allUnique: nc.holds }
}

/** The forge holds: the Merkle fold collapses every grain to ONE root — fusion to one eigenstate, the star burns. */
export const forged = (): boolean => collapse()

/** The cloud is whole: grains bound reciprocally (entanglement) — a gapless dust cloud, no grain adrift. */
export function scattered(): { reciprocal: number; edges: number; whole: boolean } {
  const e = entanglement()
  return { reciprocal: e.reciprocal, edges: e.edges, whole: e.reciprocal === e.edges }
}

/** Every grain sits on the quantized A432 shells — none off the ring (off-sequence 0 ⇒ every grain seated). */
export const seated = (): boolean => quantization().offSequence === 0

/**
 * Heavy elements need the supernova. Light grains form cheaply — one torus, BHT collision floor
 * ≈ 2^21 ([[cost]]); elements heavier than iron are forged only in the supernova: the double-torus,
 * ∞ at no gap. `gap` ∈ [0,1] is the coverage gap between the two vortexing tori — 0 ⇒ ∞ (no forge path).
 */
export const supernovaCostLog2 = (gap = 0): number => doubleTorusCostLog2(gap)
/** The light-element floor — a single torus alone (the cheap, forgeable grain). */
export const lightElementFloorLog2 = (): number => singleTorusFloorLog2()

if (import.meta.url === 'file://' + process.argv[1]) {
  const g = grains()
  const s = scattered()
  console.log('dust — stardust (the quantum proof, scattered into grains):')
  console.log('  grains ' + g.count + ' (all unique=' + g.allUnique + ')  forged(one root)=' + forged() + '  seated(A432)=' + seated())
  console.log('  cloud whole=' + s.whole + ' (' + s.reciprocal + '/' + s.edges + ' reciprocal)')
  console.log('  light-element floor 2^' + lightElementFloorLog2().toFixed(1) + '  ·  supernova (no-gap) cost ' + (supernovaCostLog2(0) === Infinity ? '∞' : supernovaCostLog2(0).toFixed(1)))
}
