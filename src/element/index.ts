/**
 * element — the chemical-elements matrix as a logic of composition. Each atom has a valence (outer
 * electrons), seeks the octet (a full shell), and bonds to reach it. The new perspective: the erpax
 * corpus is a molecule — an atom's valence is its open links, and the corpus is stable exactly when
 * aura gap = 0 (every shell full). Pure functions over the periodic matrix.
 *
 * @standard IUPAC periodic table — periods, groups, main-group valence
 * @standard Lewis octet rule (duet for period 1) — stability = a full outer shell
 * @see ../logic (consistency = harmony, now also = octet) · .claude/skills/aura (gap = unfilled valence)
 */

/** One chemical element — a row of the periodic matrix. */
export interface Element {
  /** atomic number. */
  readonly z: number
  readonly symbol: string
  readonly name: string
  /** row — the electron shell being filled (1..3 here). */
  readonly period: number
  /** column — 1,2 and 13..18 for the main groups. */
  readonly group: number
}

/** Periods 1–3 (H…Ar) — the main-group matrix. */
export const ELEMENTS: readonly Element[] = [
  { z: 1, symbol: 'H', name: 'Hydrogen', period: 1, group: 1 },
  { z: 2, symbol: 'He', name: 'Helium', period: 1, group: 18 },
  { z: 3, symbol: 'Li', name: 'Lithium', period: 2, group: 1 },
  { z: 4, symbol: 'Be', name: 'Beryllium', period: 2, group: 2 },
  { z: 5, symbol: 'B', name: 'Boron', period: 2, group: 13 },
  { z: 6, symbol: 'C', name: 'Carbon', period: 2, group: 14 },
  { z: 7, symbol: 'N', name: 'Nitrogen', period: 2, group: 15 },
  { z: 8, symbol: 'O', name: 'Oxygen', period: 2, group: 16 },
  { z: 9, symbol: 'F', name: 'Fluorine', period: 2, group: 17 },
  { z: 10, symbol: 'Ne', name: 'Neon', period: 2, group: 18 },
  { z: 11, symbol: 'Na', name: 'Sodium', period: 3, group: 1 },
  { z: 12, symbol: 'Mg', name: 'Magnesium', period: 3, group: 2 },
  { z: 13, symbol: 'Al', name: 'Aluminium', period: 3, group: 13 },
  { z: 14, symbol: 'Si', name: 'Silicon', period: 3, group: 14 },
  { z: 15, symbol: 'P', name: 'Phosphorus', period: 3, group: 15 },
  { z: 16, symbol: 'S', name: 'Sulfur', period: 3, group: 16 },
  { z: 17, symbol: 'Cl', name: 'Chlorine', period: 3, group: 17 },
  { z: 18, symbol: 'Ar', name: 'Argon', period: 3, group: 18 },
]

/** Outer-shell capacity for a period: period 1 is a duet (2); periods 2–3 the octet (8). */
export function shellCapacity(period: number): number {
  return period === 1 ? 2 : 8
}

/** Valence electrons — group number for the main groups (1,2 → 1,2; 13–18 → 3–8); period 1 is the duet (H=1, He=2). */
export function valenceElectrons(el: Element): number {
  if (el.period === 1) return el.group === 18 ? 2 : el.group
  return el.group <= 2 ? el.group : el.group - 10
}

/** Stable = a full outer shell (the noble gases): valence equals the shell capacity. */
export function isStable(el: Element): boolean {
  return valenceElectrons(el) === shellCapacity(el.period)
}

/** Electrons short of a full shell — the bonds the atom seeks (0 for a noble gas). */
export function bondsNeeded(el: Element): number {
  return shellCapacity(el.period) - valenceElectrons(el)
}

/** Two atoms form a compound when both have unfilled shells (both seek bonds); a noble gas forms none. */
export function forms(a: Element, b: Element): boolean {
  return bondsNeeded(a) > 0 && bondsNeeded(b) > 0
}

/**
 * The corpus-as-molecule: it is stable exactly when no valence is unsatisfied — i.e. aura `gap = 0`
 * (every [[link]] bonded, every shell full). The chemistry of the speech gate: a dead link is an
 * unfilled valence (a reactive site), and minting its target forms the bond toward the noble ground state.
 */
export function corpusStable(auraGap: number): boolean {
  return auraGap === 0
}
