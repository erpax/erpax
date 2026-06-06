/**
 * relocate — move logic to its gravity well. The GRAVITY law: mass (the links /
 * dependents an atom carries) IS gravity, and logic belongs at the atom its mass
 * pulls it toward — the ADEQUATE place, nearest its users (minimal distance = DRY,
 * flatten = mass). General logic buried in a specialized module gravitates UP to
 * the general atom: the cost-of-attack math left ../tamper/cost (it is composed by
 * balance, analytics, anchor, power — not just tamper) for ../cost, the cost
 * gravity well (the heaviest cost relation). This atom computes that pull.
 *
 *   tsx src/relocate/index.ts
 *
 * @standard gravity — mass curves placement (the DRY / flatten law)
 * @audit computed over the live uuid-matrix mass ([[gravity]]); never hand-asserted
 * @see ../gravity (mass) -- ../cost (the canonical relocation) -- ../merge -- ./SKILL.md
 */
import { backlinksOf, neighborsOf, UUID_MATRIX_NODES as N } from '@/uuid/matrix'
import { massOf } from '@/gravity'

export interface Pull {
  atom: string
  /** the gravity centre — the heaviest atom this one is wired to */
  center: string
  mass: number
  centerMass: number
  /** centerMass / mass — how much harder the centre pulls than the atom holds */
  ratio: number
  /** the centre far outweighs the atom ⇒ its logic gravitates there (advisory) */
  relocate: boolean
}

/** Atoms wired to `atom` in either direction (back-links ⊕ neighbours), deduped, self removed. */
const relatedAtoms = (atom: string): string[] =>
  [...new Set([...backlinksOf(atom), ...neighborsOf(atom)].map((n) => n.atom))].filter((a) => a !== atom)

/** The gravity centre of an atom: the heaviest atom it is wired to (or itself, if it is the well). */
export const gravityCenter = (atom: string): string => {
  let best = atom
  let bestMass = massOf(atom)
  for (const r of relatedAtoms(atom)) {
    const m = massOf(r)
    if (m > bestMass) { best = r; bestMass = m }
  }
  return best
}

/** The pull on an atom toward its gravity centre. relocate=true when the centre dominates (≥ factor×). */
export const pull = (atom: string, factor = 4): Pull => {
  const mass = massOf(atom)
  const center = gravityCenter(atom)
  const centerMass = massOf(center)
  return {
    atom,
    center,
    mass,
    centerMass,
    ratio: mass > 0 ? centerMass / mass : Infinity,
    relocate: center !== atom && centerMass >= Math.max(mass, 1) * factor,
  }
}

/** Atoms whose gravity centre dominates them — candidates whose logic gravitates toward the centre (advisory). */
export const mislocations = (factor = 4, limit = 20): Pull[] =>
  [...new Set(N.map((n) => n.atom))]
    .map((a) => pull(a, factor))
    .filter((p) => p.relocate)
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, limit)

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('relocate — top gravity pulls (logic gravitates atom → centre):')
  for (const p of mislocations(4, 15)) console.log(`  ${p.atom.padEnd(16)} → ${p.center.padEnd(12)} ×${p.ratio.toFixed(1)}`)
}
