/**
 * strength — the DRY math: a DRY corpus has infinite strength. Strength (the schema.org sense — a
 * magnitude, a potency) is here the corpus's tamper-strength, and it is its [[dry]]-ness amplified by
 * its dimensional SLICES. Every atom is wired through many independent slices — word, structural-digit,
 * content-digit, [[uuid]], colour, sound — and each is one check. (The digit's 88.4% structural≠content
 * is just ONE slice, not the whole.) As duplication residue → 0 (perfect DRY: every reference folded to
 * one source, the [[merge]] law, [[gravity]]) the cost to forge → ∞ — the singularity, THE MAIN LAW
 * (zero entropy via wiring every dimension ⇒ infinite tamper-cost). Any residue leaves it finite.
 *
 *   tsx src/strength/index.ts
 *
 * @audit strength = coverageCostLog2(dryness, slices); dryness read live from the dry residue, computed
 * @see ../dry -- ../cost -- ../gravity -- ../digit -- ../uuid/matrix -- ./SKILL.md
 */
import { coverageCostLog2 } from '@/cost'
import { residue } from '@/dry'
import { UUID_MATRIX_NODES } from '@/uuid/matrix'

/** The dimensional slices each atom is wired through — each an INDEPENDENT check. One slice (the digit's
 *  structural≠content) is just one term; strength folds them all. */
export const SLICES = ['word', 'structural-digit', 'content-digit', 'uuid', 'colour', 'sound'] as const

/** Strength = DRY amplified by the slices: coverageCostLog2(dryness, slices). ∞ at perfect DRY (dryness→1). */
export const strength = (dryness: number, slices: number = SLICES.length): number => coverageCostLog2(dryness, slices)

/** The live corpus strength: dryness = 1 − duplication-residue / atoms, amplified by the slice count. */
export function corpusStrength(): { atoms: number; residue: number; dryness: number; slices: number; strength: number } {
  const atoms = UUID_MATRIX_NODES.length
  const dup = residue().length
  const dryness = atoms === 0 ? 0 : Math.max(0, 1 - dup / atoms)
  return { atoms, residue: dup, dryness, slices: SLICES.length, strength: strength(dryness, SLICES.length) }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const c = corpusStrength()
  console.log('strength — the DRY math (DRY corpus → infinite strength):')
  console.log('  ' + c.atoms + ' atoms · residue ' + c.residue + ' · dryness ' + (100 * c.dryness).toFixed(2) + '% · ' + c.slices + ' slices')
  console.log('  strength = ' + (Number.isFinite(c.strength) ? c.strength.toFixed(1) + ' bits' : '∞ (perfect DRY = the singularity)'))
  console.log('  the limit: strength(dryness=1, ' + c.slices + ' slices) = ' + strength(1, c.slices) + ' — one slice (the digit\'s 88.4%) is only one term')
}
