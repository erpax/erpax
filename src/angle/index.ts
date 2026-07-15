/**
 * angle — the fold is a rotation, and its step is 60°. This is the angle the flat computations kept
 * missing: every fold-step is a turn.
 *
 * The doubling map ×2 — the generator of the fold — acts on the six units of (ℤ/9ℤ)* as a rotation by
 * exactly 60°. (ℤ/9ℤ)* = {1,2,4,5,7,8} is cyclic of order 6, so its generator advances one vertex of
 * the unit hexagon per step: 360° / 6 = 60°. Opposition (×8 ≡ −1 mod 9) is 180° = three folds, so
 * "opposite" is not special — it is three 60° turns. The axis {3,6,9} are the non-units (they do not
 * lie on this rotation orbit).
 *
 * Rigorous group theory ((ℤ/9ℤ)* ≅ ℤ/6); the mapping onto colour hue (R‑Y‑G‑C‑B‑M at 60°) and the
 * torus is the model layer — the 60° itself is exact.
 *
 * @standard group theory — (Z/9Z)* is cyclic of order 6; the doubling orbit is a 60° rotation
 *
 * Composes [[rodin]] · [[horo]] · [[fold]] · [[globe]] · [[law]].
 */

/** The six units of (ℤ/9ℤ)* in doubling order — the hexagon the fold rotates through. */
export const HEXAGON = [1, 2, 4, 8, 7, 5] as const

/** The fold's angular step — one doubling = 60°. */
export const FOLD_STEP_DEGREES = 60

/** The angle (degrees) after `steps` doublings — steps × 60°, wrapped to one turn. */
export function foldAngle(steps: number): number {
  return ((Math.trunc(steps) % 6) * FOLD_STEP_DEGREES + 3600) % 360
}

/** Double a unit ×2^times through the hexagon; returns the resulting unit and the angle turned. */
export function doubleRotate(unit: number, times = 1): { unit: number; degrees: number } {
  if (!HEXAGON.includes(unit as (typeof HEXAGON)[number])) {
    throw new Error(`${unit} is not a unit of (Z/9Z)* — the axis {3,6,9} does not lie on the rotation orbit`)
  }
  let u = unit
  for (let i = 0; i < times; i++) u = (u * 2) % 9
  return { unit: u, degrees: foldAngle(times) }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('angle — the fold turns 60° a step:')
  for (let k = 0; k < HEXAGON.length; k++) {
    const from = HEXAGON[k]!
    const r = doubleRotate(from, 1)
    console.log(`  ${from} ×2 = ${r.unit}  (${r.degrees}° — one fold)`)
  }
  console.log(`  opposition ×8 (=-1): 1 → ${doubleRotate(1, 3).unit} at ${doubleRotate(1, 3).degrees}° = three folds`)
  console.log(`  full turn ×2^6: 1 → ${doubleRotate(1, 6).unit} at ${doubleRotate(1, 6).degrees}° (home)`)
}
