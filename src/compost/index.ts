/**
 * compost -- the CLOSED-LOOP node: decomposed residue returns matter to soil.
 *
 * HONEST SCOPE: the loop is PARTIAL. Microbial decomposition respires
 * ~40–60 % of the initial carbon to CO₂ (entropy export to the atmosphere);
 * only the humified fraction is credited back to soil. This module encodes
 * the algebraic identities of that split — it does NOT simulate microbial
 * kinetics, temperature curves, or actual field turnover rates. C:N numbers
 * (CN_IDEAL, CN_MATURE) are empirical midpoints from composting literature,
 * not derived constants.
 *
 *   tsx src/compost/index.ts
 *
 * @standard US Composting Council — compost maturity/stability (C:N criteria)
 * @standard SARE, Building Soils for Better Crops — organic-matter management
 * @standard USDA NOP 7 CFR §205.203 — compost and raw-manure rules
 * @audit computed, never hand-asserted
 * @see ../conservation ../soil ../sustainability ../ecosystem ../emission ../harvest
 */
import { boundaryConserves } from '@/conservation'

/** Microbial sweet-spot feedstock C:N (~30 by mass). */
export const CN_IDEAL: number = 30

/** Finished/stable compost C:N ceiling (~20 by mass). */
export const CN_MATURE: number = 20

/**
 * cnRatio — carbon-to-nitrogen mass ratio of a material.
 * Returns carbon / nitrogen; caller must ensure nitrogen > 0.
 */
export const cnRatio = (carbon: number, nitrogen: number): number => carbon / nitrogen

/**
 * isMature — true when the C:N has fallen to the stable range (≤ CN_MATURE).
 * A C:N above CN_MATURE indicates active decomposition is still consuming N.
 */
export const isMature = (cn: number): boolean => cn <= CN_MATURE

/**
 * humificationRatio — fraction of initial carbon that ends up as stable humus.
 * humifiedC / initialC ∈ [0, 1] for valid inputs.
 */
export const humificationRatio = (initialC: number, humifiedC: number): number =>
  humifiedC / initialC

/**
 * respiredCarbon — carbon lost as CO₂ during decomposition.
 * initialC − humifiedC: the complement of what was humified.
 */
export const respiredCarbon = (initialC: number, humifiedC: number): number =>
  initialC - humifiedC

/** Result of a decomposition event: residue in, split to soil credit and CO₂ emission. */
export type Decompose = { residue: number; toSoil: number; respired: number }

/**
 * loopBalances — proves the PARTIAL closed loop via conservation.
 * residue (in) === toSoil + respired (out), within optional tolerance.
 * Calls boundaryConserves from @/conservation — do NOT re-derive the math here.
 *
 *   deltaStock=0, inflows=[residue], outflows=[toSoil, respired]
 *   ⟹ 0 = residue − (toSoil + respired)
 *   ⟹ residue = toSoil + respired  ✓
 */
export const loopBalances = (d: Decompose, tol = 0): boolean =>
  boundaryConserves(0, [d.residue], [d.toSoil, d.respired], tol)

if (import.meta.url === 'file://' + process.argv[1]) {
  const initialC = 100
  const humifiedC = 40
  const respired = respiredCarbon(initialC, humifiedC)
  const decompose: Decompose = { residue: initialC, toSoil: humifiedC, respired }
  console.log('compost demo (100 kg C feedstock):')
  console.log('  CN_IDEAL=' + CN_IDEAL + '  CN_MATURE=' + CN_MATURE)
  console.log('  cnRatio(60, 2)=' + cnRatio(60, 2) + '  isMature(15)=' + isMature(15))
  console.log('  humificationRatio=' + humificationRatio(initialC, humifiedC))
  console.log('  respiredCarbon=' + respired + ' kg (CO₂ loss)')
  console.log('  loopBalances:', loopBalances(decompose), '  (residue=toSoil+respired)')
}
