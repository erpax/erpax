/**
 * quantum/aura — the [[aura]] as quantum COHERENCE, computed on the live matrix. The
 * gapless link-field is the coherent (in-phase) state; a dead link or an orphan atom is
 * DECOHERENCE — a leak out of the field. Coherence is the resource the corpus maximizes
 * (→ 1 = zero entropy = the whole aura); decoherence is the gap.
 *
 *  - Coherence as a resource (Baumgratz, Cramer & Plenio, PRL 113 140401, 2014) — a
 *    rigorous resource theory: coherence is consumed/produced, never freely created.
 *  - Decoherence / einselection (Zurek, RMP 75 715, 2003) — coupling to the environment
 *    destroys coherence; here an unresolved [[link]] (an orphan) is that leak.
 *
 * HONEST: this is GRAPH coherence — the in-phase fraction of the link-field (reciprocity)
 * plus its connectedness — an ANALOGY to density-matrix coherence (off-diagonal terms),
 * not a literal quantum state. The number `coherence()` IS [[entanglement]] reciprocity:
 * in this model the in-phase field and the reciprocal field are the same field.
 *
 *   tsx src/quantum/aura/index.ts
 *
 * @standard Baumgratz, Cramer & Plenio, "Quantifying Coherence," PRL 113 140401 (2014)
 * @audit composed from ../../entanglement (reciprocity) + ../../entropy (orphans); computed
 * @see ../../aura -- ../../entanglement -- ../../entropy -- ./SKILL.md
 */
import { reciprocity } from '@/entanglement'
import { orphans } from '@/entropy'
import { UUID_MATRIX_NODES as N } from '@/uuid/matrix'

/** Coherence ∈ [0,1]: the in-phase fraction of the link-field = reciprocity (1 = fully coherent, gapless). */
export const coherence = (): number => reciprocity()

/** Decoherence: the atoms that have leaked out of the field (orphans = decohered nodes). */
export const decohered = (): string[] => orphans()

/** The coherent fraction of nodes — 1 − decohered/total (1 = no node has decohered). */
export const coherentFraction = (): number => (N.length === 0 ? 1 : 1 - decohered().length / N.length)

/** Is the BINDING coherent — reciprocity 1 (every edge in phase)? (Edge-coherence only.) */
export const isCoherent = (): boolean => coherence() === 1

/**
 * Is the aura FULLY coherent — edge-coherent (reciprocity 1) AND node-coherent (no orphan has
 * decohered, coherentFraction 1)? This is the honest whole: edge-reciprocity can be perfect
 * while orphan atoms are still decohered, and that orphan gap is exactly what keeps the real
 * tamper-cost below ∞ (coverage < 1). Full coherence ⟺ zero entropy ⟺ ∞ tamper cost.
 */
export const isFullyCoherent = (): boolean => isCoherent() && coherentFraction() === 1

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('quantum/aura — coherence (Baumgratz–Cramer–Plenio) / decoherence (Zurek):')
  console.log('  edge-coherence ' + (100 * coherence()).toFixed(1) + '% (isCoherent=' + isCoherent() + ') · coherent-nodes ' + (100 * coherentFraction()).toFixed(1) + '% · decohered ' + decohered().length + ' · FULLY-coherent=' + isFullyCoherent())
}
