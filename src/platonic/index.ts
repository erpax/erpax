import { PI, algebraCos, algebraHypot, algebraSin, algebraSqrt, exactAbs } from '@/algebra'
/**
 * platonic — the sphere is formed by the MOVEMENT of the Platonic solids' points, not by fiat.
 *
 * Each of the five solids has a circumsphere: every vertex is the same distance from the centre. And
 * rotation is an ISOMETRY — it preserves distance from the centre — so a vertex in motion never leaves
 * that sphere. The sphere is therefore the INVARIANT of the movement: the surface the vertices sweep
 * under the rotation group. A single vertex rotating about the polar axis traces one latitude circle
 * (its z stays fixed); the full rotation group's orbit fills the sphere; Fuller's geodesic spheres make
 * it constructive — subdivide the icosahedron, project out, and the moving points ARE the sphere.
 *
 * The involved solids on the [[globe]]: the OCTAHEDRON's 6 vertices are the 6 axis directions
 * (±x, ±y, ±z) — the two poles and the four equatorial (N·S·E·W·front·back); the TETRAHEDRON's 4 are
 * the compass folded out of the plane. The globe is the orbit these vertices sweep.
 *
 * HONEST BOUNDARY: the circumsphere, rotation-as-isometry, and geodesic subdivision are rigorous
 * geometry. Which solid maps to which corpus structure (octahedron = the 6 directions, etc.) is the
 * model layer, not a physical law.
 *
 * @standard Euclidean solid geometry — the five regular (Platonic) polyhedra and their circumspheres
 *
 * Composes [[globe]] · [[horo]] · [[merge]] · [[law]].
 */
const PHI = (1 + algebraSqrt(5)) / 2
type V = readonly [number, number, number]
const cube: V[] = [
  [1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1],
  [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1],
]

/** The five regular solids, as their vertex sets (each on a common circumsphere). */
export const PLATONIC: Readonly<Record<string, readonly V[]>> = {
  tetrahedron: [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]],
  octahedron: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]],
  cube,
  icosahedron: [
    [0, 1, PHI], [0, 1, -PHI], [0, -1, PHI], [0, -1, -PHI],
    [1, PHI, 0], [1, -PHI, 0], [-1, PHI, 0], [-1, -PHI, 0],
    [PHI, 0, 1], [PHI, 0, -1], [-PHI, 0, 1], [-PHI, 0, -1],
  ],
  dodecahedron: [
    ...cube,
    [0, 1 / PHI, PHI], [0, 1 / PHI, -PHI], [0, -1 / PHI, PHI], [0, -1 / PHI, -PHI],
    [1 / PHI, PHI, 0], [1 / PHI, -PHI, 0], [-1 / PHI, PHI, 0], [-1 / PHI, -PHI, 0],
    [PHI, 0, 1 / PHI], [PHI, 0, -1 / PHI], [-PHI, 0, 1 / PHI], [-PHI, 0, -1 / PHI],
  ],
}

const mag = (v: V): number => algebraHypot(v[0], v[1], v[2])

/** The circumradius if every vertex is equidistant from the centre (all on ONE sphere) — else null. */
export function circumradius(vertices: readonly V[], eps = 1e-9): number | null {
  if (vertices.length === 0) return null
  const r = mag(vertices[0]!)
  return vertices.every((v) => exactAbs(mag(v) - r) < eps) ? r : null
}

/** Rotate a point about the polar (z) axis by θ radians — the movement that sweeps a latitude circle. */
export function rotateZ(v: V, theta: number): V {
  const c = algebraCos(theta)
  const s = algebraSin(theta)
  return [v[0] * c - v[1] * s, v[0] * s + v[1] * c, v[2]]
}

/** The sphere is the movement-invariant: a rotated vertex is still at the circumradius (never leaves). */
export function staysOnSphere(v: V, r: number, samples = 24, eps = 1e-9): boolean {
  for (let i = 0; i < samples; i++) {
    if (exactAbs(mag(rotateZ(v, (2 * PI * i) / samples)) - r) > eps) return false
  }
  return true
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('platonic — the sphere is swept by the moving vertices:')
  for (const [name, verts] of Object.entries(PLATONIC)) {
    const r = circumradius(verts)
    console.log(`  ${name.padEnd(13)} ${verts.length} vertices · circumradius ${r?.toFixed(4)} · rotation stays on sphere: ${staysOnSphere(verts[0]!, r!)}`)
  }
  console.log('  octahedron 6 vertices = the 6 globe directions (±x ±y ±z = N S E W + 2 poles)')
}
