/**
 * floor — what the universe charges, at minimum, to search a space.
 *
 * At 300 K: 2^61 costs 6.6 mJ, 2^128 costs 9.8e17 J, 2^256 costs 3.3e56 J. The corpus's 122-bit
 * address collides at 2^61, so thermodynamics is not what protects it.
 *
 * The argument, the boundary and why 2^128 reads INDUSTRIAL rather than impossible: ./SKILL.md.
 *
 * @standard Landauer (1961) · Bérut et al., Nature 483:187 (2012)
 * @standard Bekenstein (1981) · 't Hooft (1993) · Susskind (1995) — the holographic bound
 * @standard CODATA 2022 — Boltzmann constant, Planck length
 */
export const atomPath = 'floor' as const

/** CODATA 2022 values, returned rather than exported as statics. */
function constants(): { k: number; ln2: number; planckLength: number } {
  return { k: 1.380649e-23, ln2: Math.LN2, planckLength: 1.616255e-35 }
}

/** Room temperature in kelvin — the reference this corpus quotes its ladder at. */
export function roomKelvin(): number {
  return 300
}

/** Least energy to erase `bits` at `kelvin`. A floor, not a forecast — see ./SKILL.md. */
export function landauerJoules(bits: number, kelvin: number = roomKelvin()): number {
  const { k, ln2 } = constants()
  if (!(bits > 0) || !(kelvin > 0)) return 0
  return bits * k * kelvin * ln2
}

/** Floor for exhausting `2^bits` candidates, one erasure each — deliberately an under-statement. */
export function searchJoules(bits: number, kelvin: number = roomKelvin()): number {
  if (!(bits > 0)) return 0
  return Math.pow(2, bits) * landauerJoules(1, kelvin)
}

/** Energy scales to read a floor against. DECLARED, order-of-magnitude, in joules. */
function scales(): readonly { readonly name: string; readonly joules: number }[] {
  return [
    { name: 'a household battery', joules: 1e4 },
    { name: 'a year of one nation', joules: 1e19 },
    { name: 'a year of all humanity', joules: 6e20 },
    { name: "the Sun's entire output, once", joules: 1.2e44 },
  ]
}

export type Reach = 'trivial' | 'industrial' | 'civilisational' | 'stellar' | 'beyond-physics'

/** Who could pay it. `trivial` means physics charges nothing — not that an attack is easy to build. */
export function reach(joules: number): Reach {
  const s = scales()
  if (joules < (s[0] as { joules: number }).joules) return 'trivial'
  if (joules < (s[1] as { joules: number }).joules) return 'industrial'
  if (joules < (s[2] as { joules: number }).joules) return 'civilisational'
  if (joules < (s[3] as { joules: number }).joules) return 'stellar'
  return 'beyond-physics'
}

export interface Floor {
  readonly bits: number
  readonly kelvin: number
  readonly joules: number
  readonly reach: Reach
  /** How many times the whole world's annual energy this would take. */
  readonly worldYears: number
}

/** The floor for a space, read against what anyone could pay. */
export function searchFloor(bits: number, kelvin: number = roomKelvin()): Floor {
  const joules = searchJoules(bits, kelvin)
  return { bits, kelvin, joules, reach: reach(joules), worldYears: joules / 6e20 }
}

/** Holographic bound: bits a sphere of `radiusMetres` can hold — boundary AREA over Planck areas. */
export function holographicBits(radiusMetres: number): number {
  const { planckLength, ln2 } = constants()
  if (!(radiusMetres > 0)) return 0
  const area = 4 * Math.PI * radiusMetres * radiusMetres
  return area / (4 * planckLength * planckLength * ln2)
}

/** The radius whose holographic bound just holds `bits` — the smallest region that could store it. */
export function holographicRadius(bits: number): number {
  const { planckLength, ln2 } = constants()
  if (!(bits > 0)) return 0
  return Math.sqrt((bits * 4 * planckLength * planckLength * ln2) / (4 * Math.PI))
}
