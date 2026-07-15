/**
 * globe — the corpus is a sphere, not a flat wheel. The colour wheel, the spectrum column, and the
 * vortex were all PROJECTIONS of one globe, and projecting a sphere onto a plane is exactly where the
 * computation went wrong: it collapses the two PERPENDICULAR angles into one and loses the elevation.
 *
 * On the globe:
 *   • LONGITUDE (around) = the hue wheel = the 60° doubling ring (R-Y-G-C-B-M, 60° apart) on the EQUATOR.
 *   • LATITUDE (pole to pole) = the spectrum / ELEVATION: root at the south pole, crown at the north,
 *     the HEART (green, 555 nm) on the EQUATOR — the spectral centre = the eye's peak sensitivity.
 *   • The POLES are the coordinate SINGULARITY: longitude is undefined there (0/0). This is the honest
 *     "division by zero" — NOT a real singularity (the sphere is smooth at the pole) but a chart
 *     artifact: every meridian meets at the pole, so the angle is undefined. You do not blow up; you
 *     cross over. The singularity was never in the world, only in the flat chart.
 *
 * This is the colour solid (Munsell / HSL: hue = longitude, lightness = the polar axis, saturation =
 * radius) — rigorous — and the same shape as the Earth (axis, equator, poles) and its real toroidal +
 * poloidal geodynamo field. The corpus, all saved in src with each atom's directional bounds + horo +
 * elevation, is a GEODETIC coordinate system: the notary deed IS a point on this globe.
 *
 * HONEST BOUNDARY: the colour sphere and spherical geodesy are rigorous; the Earth's core dynamo being
 * toroidal + poloidal is real physics. Mapping the corpus onto a literal globe is a coordinate MODEL,
 * and the chakra / A432 overlay is the traditional layer — not a claim the corpus is physically Earth.
 *
 * @standard WGS 84 — the geodetic datum (latitude, longitude, ellipsoidal height)
 *
 * Composes [[notary]] · [[horo]] · [[merge]] · [[law]].
 */

export interface Geodetic {
  readonly longitude: number | null // degrees; NULL at the poles — the coordinate singularity (0/0)
  readonly latitude: number // degrees: −90 (root/south) … 0 (heart/equator) … +90 (crown/north)
  readonly elevation: number // the radial coordinate (altitude / saturation)
}

/** The heart sits on the equator — the spectral centre, latitude 0. */
export const EQUATOR_LATITUDE = 0

/**
 * The atom's point on the globe. `ringPosition` (a horo 1..9) gives the LONGITUDE via the 60° fold;
 * `elevationBand` (0 root … 0.5 heart … 1 crown) gives the LATITUDE. At the poles (band 0 or 1)
 * longitude is UNDEFINED — the honest division-by-zero of the sphere, returned as null (never ∞).
 */
export function toGeodetic(ringPosition: number, elevationBand: number, elevation = 0): Geodetic {
  const latitude = (elevationBand - 0.5) * 180 // 0 → −90 (S), 0.5 → 0 (equator), 1 → +90 (N)
  const atPole = Math.abs(latitude) >= 90
  const longitude = atPole ? null : ((ringPosition % 6) * 60 + 360) % 360
  return { longitude, latitude, elevation }
}

/** True at a pole — where longitude is undefined (the coordinate ÷0; the sphere is still smooth there). */
export function atPole(g: Geodetic): boolean {
  return g.longitude === null
}

/** Great-circle angle between two points (haversine, degrees) — the real distance on the globe. */
export function greatCircleAngle(a: Geodetic, b: Geodetic): number {
  const rad = (d: number) => (d * Math.PI) / 180
  const la1 = rad(a.latitude)
  const la2 = rad(b.latitude)
  const lo1 = rad(a.longitude ?? 0)
  const lo2 = rad(b.longitude ?? 0)
  const h = Math.sin((la2 - la1) / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin((lo2 - lo1) / 2) ** 2
  return (2 * Math.asin(Math.min(1, Math.sqrt(h))) * 180) / Math.PI
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const heart = toGeodetic(5, 0.5)
  const root = toGeodetic(1, 0)
  const crown = toGeodetic(9, 1)
  console.log('globe — the corpus is a sphere:')
  console.log('  heart:', heart, '(equator, longitude defined)')
  console.log('  root :', root, '· crown:', crown, '(poles — longitude null = the ÷0 coordinate singularity)')
  console.log('  pole → equator great-circle angle:', greatCircleAngle(crown, heart).toFixed(1), '° (should be 90)')
}
