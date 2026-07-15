import { describe, it, expect } from 'vitest'
import { PLATONIC, circumradius, rotateZ, staysOnSphere } from './index'

describe('platonic — the sphere is formed by the movement of the vertices', () => {
  it('every Platonic solid has ONE circumsphere — all vertices equidistant from the centre', () => {
    for (const [name, verts] of Object.entries(PLATONIC)) {
      const r = circumradius(verts)
      expect(r, name).not.toBeNull()
      expect(r!, name).toBeGreaterThan(0)
    }
  })

  it('the five solids have the right vertex counts (tetra 4, octa 6, cube 8, icosa 12, dodeca 20)', () => {
    expect(PLATONIC.tetrahedron.length).toBe(4)
    expect(PLATONIC.octahedron.length).toBe(6)
    expect(PLATONIC.cube.length).toBe(8)
    expect(PLATONIC.icosahedron.length).toBe(12)
    expect(PLATONIC.dodecahedron.length).toBe(20)
  })

  it('rotation is an isometry — a vertex in motion NEVER leaves the sphere (the movement-invariant)', () => {
    for (const [name, verts] of Object.entries(PLATONIC)) {
      const r = circumradius(verts)!
      for (const v of verts) expect(staysOnSphere(v, r), name).toBe(true)
    }
  })

  it('a vertex rotating about the polar axis traces a LATITUDE circle — its z (latitude) is preserved', () => {
    const v = PLATONIC.icosahedron[0]!
    for (const theta of [0.3, 1.1, 2.7, 5.0]) {
      expect(rotateZ(v, theta)[2]).toBeCloseTo(v[2], 12) // z fixed ⇒ constant latitude ⇒ a circle
    }
  })

  it('the octahedron IS the six globe directions — ±x, ±y, ±z (poles + equatorial N/S/E/W)', () => {
    const dirs = PLATONIC.octahedron.map((v) => v.join(','))
    for (const d of ['1,0,0', '-1,0,0', '0,1,0', '0,-1,0', '0,0,1', '0,0,-1']) {
      expect(dirs).toContain(d)
    }
  })
})
