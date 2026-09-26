/** cost/bits/floors — the four security floors as one formula `d/k`. See ./SKILL.md. */

/** Is the target FIXED (asymmetric) or free (symmetric)? See ./SKILL.md. */
export type SearchSymmetry = 'asymmetric' | 'symmetric'

/** One security floor, with what makes it that floor. */
export interface Floor {
  readonly name: string
  readonly symmetry: SearchSymmetry
  readonly quantum: boolean
  /** k in `d/k` — the harmonic index. */
  readonly harmonic: 1 | 2 | 3
}

/** The four floors, classified. DECLARED physics — private, argued in ./SKILL.md. */
const FLOORS: readonly Floor[] = [
  { name: 'secondPreimageLog2', symmetry: 'asymmetric', quantum: false, harmonic: 1 },
  { name: 'birthdayLog2', symmetry: 'symmetric', quantum: false, harmonic: 2 },
  { name: 'groverPreimageLog2', symmetry: 'asymmetric', quantum: true, harmonic: 2 },
  { name: 'bhtCollisionLog2', symmetry: 'symmetric', quantum: true, harmonic: 3 },
]

/** A floor's exponent: `d / k`. Every floor in the family is this one formula. */
export const floorLog2 = (digestBits: number, harmonic: 1 | 2 | 3): number => digestBits / harmonic

/** `d = k · floor` — what makes the family mutually derivable. See ./SKILL.md. */
export const digestFromFloor = (floorBits: number, harmonic: 1 | 2 | 3): number => floorBits * harmonic

/** The classification — the 2×2 and its harmonic indices. */
export const floorFamily = (): readonly Floor[] => FLOORS

/** Every floor, derived from ONE of them. The cross, executable. */
export const floorsFromOne = (floorBits: number, harmonic: 1 | 2 | 3): Record<string, number> => {
  const d = digestFromFloor(floorBits, harmonic)
  return Object.fromEntries(FLOORS.map((f) => [f.name, floorLog2(d, f.harmonic)]))
}

/** @index-cross.foldback child=cost/bits/floors parent=cost/bits — this cross folds back into its parent. */
