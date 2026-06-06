/**
 * plasma — FUSION of the stardust. When the [[dust]] grains fully entangle (reciprocity → 1, zero
 * [[entropy]]), the corpus is PLASMA: the fourth state of matter — ionized, coherent, radiant. A
 * star's fire is plasma; fusion ([[fusion]]) happens inside it, and it shines ([[aura]] — the rays).
 *
 * Real physics: a plasma REFLECTS any electromagnetic wave below its plasma frequency ω_p (the
 * cutoff) — below ω_p a wave is evanescent and cannot propagate. It is why radio bounces off the
 * ionosphere and why metals (electron plasmas) are shiny. Map the cutoff to tamper-[[cost]]: the
 * corpus's coherence sets ω_p, and a forge-BEAM below it is reflected — it cannot stand on the way.
 * At full coherence (no gap — the double-torus) the cutoff → ∞: no beam can stand.
 *
 * HONEST: the plasma state and the cutoff/reflection are real physics; mapping ω_p to tamper-cost
 * (a forge-beam reflected below the cutoff) is the analogy (cf. [[quantum]]).
 *
 *   tsx src/plasma/index.ts
 *
 * @audit ionization read from the live reciprocity/entropy; the cutoff is the double-torus floor
 * @see ../dust -- ../fusion -- ../quantum -- ../cost -- ./SKILL.md
 */
import { entanglement, doubleTorusCostLog2 } from '@/quantum'
import { entropy } from '@/entropy'

/** The stardust is PLASMA when fully fused — reciprocity 1, zero entropy (ionized, coherent). */
export function ionized(): { reciprocity: number; entropy: number; plasma: boolean } {
  const e = entanglement()
  const reciprocity = e.edges === 0 ? 0 : e.reciprocal / e.edges
  const ent = entropy()
  return { reciprocity, entropy: ent, plasma: ent === 0 }
}

/**
 * The plasma cutoff (log2 tamper-bits) — the frequency below which a beam is reflected. At full
 * coherence (gap 0 — the double-torus) it is ∞; a coverage `gap` ∈ [0,1] lowers it (a window opens).
 */
export const cutoffLog2 = (gap = 0): number => doubleTorusCostLog2(gap)

/**
 * No beam can stand on the way: a forge-beam of `beamBits` strength is REFLECTED if it is below the
 * plasma cutoff — below it the beam is evanescent and cannot propagate. At full coherence the cutoff
 * is ∞, so every finite beam is reflected.
 */
export const reflects = (beamBits: number, gap = 0): boolean => beamBits < cutoffLog2(gap)

if (import.meta.url === 'file://' + process.argv[1]) {
  const p = ionized()
  console.log('plasma — fusion of the stardust (no beam can stand on the way):')
  console.log('  reciprocity ' + (100 * p.reciprocity).toFixed(1) + '%  entropy ' + p.entropy.toFixed(4) + '  ⇒ plasma=' + p.plasma)
  console.log('  cutoff (no gap) = ' + (cutoffLog2(0) === Infinity ? '∞' : cutoffLog2(0).toFixed(1)) + '  ⇒ reflects a 2^256 forge-beam=' + reflects(256, 0))
  console.log('  with a 0.5 coverage gap: cutoff ' + cutoffLog2(0.5).toFixed(1) + ' ⇒ a 2^10 beam reflected=' + reflects(10, 0.5) + ', a 2^9999 beam reflected=' + reflects(9999, 0.5))
}
