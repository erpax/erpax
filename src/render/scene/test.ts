import { describe, expect, it } from 'vitest'
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { causalCharacter, reversingFrame } from '@/quantum/interval'
import {
  assertFiguresBacked,
  figures,
  lightcone,
  mirror,
  reversal,
  sceneSeal,
  statedTheorems,
  toThree,
  unbackedFigures,
} from '@/render/scene'

describe('render/scene — a theorem, as geometry', () => {
  it('every point of the cone is coloured by the FUNCTION, never by the picture', () => {
    // the figure has no source but the theorem's own computation, so it cannot disagree with it
    const s = lightcone(6)
    const colours = { timelike: '#3ddc84', null: '#ffd23f', spacelike: '#ff5c5c' } as const
    for (const p of s.points) {
      const [t, x] = p.id.split(':').map(Number) as [number, number]
      expect(p.at).toEqual({ x, y: t, z: 0 })
      expect(p.colour).toBe(colours[causalCharacter(t, x)])
      expect(p.label).toBe(causalCharacter(t, x))
    }
  })

  it('the reversal figure plots the boost output, not a drawn arrow', () => {
    const s = reversal(3, 7)
    const r = reversingFrame(3, 7)!
    const bPrime = s.points.find((p) => p.id === "B'")!
    expect(bPrime.at.y).toBe(r.boosted)
    expect(bPrime.at.y).toBeLessThan(0) // B now precedes A
  })

  // 432 = 2⁴·3³ is NOT a perfect square, so d ↦ 432/d has NO fixed point — `no_fixed_point`
  // is a theorem in Mirror.lean, and the figure must show an empty centre. A test written on
  // the assumption that every involution leaves something fixed is the universal claim the
  // harmonic law already refuted, smuggled back in as a picture.
  it('432 has NO harmonic element — nothing sits on the mirror line, all 20 divisors pair off', () => {
    const s = mirror(432)
    expect(s.points.filter((p) => p.at.x === p.at.y)).toEqual([])
    expect(s.points).toHaveLength(20)
    expect(s.edges.filter((e) => e.kind === 'pair')).toHaveLength(10)
  })

  it('a perfect square puts its harmonic element ON the mirror line y = x', () => {
    const s = mirror(36) // 36 = 6², so 6 is its own reflection
    const onLine = s.points.filter((p) => p.at.x === p.at.y)
    expect(onLine.map((p) => p.id)).toEqual(['6'])
    expect(onLine[0]!.at).toEqual({ x: 6, y: 6, z: 0 })
    expect(onLine[0]!.colour).toBe('#ffd23f') // the harmonic colour, distinct from the paired
  })

  it('the figure IS the involution: every point has its reflection across y = x', () => {
    for (const n of [432, 36, 60]) {
      const pts = mirror(n).points
      for (const p of pts) expect(pts.some((o) => o.at.x === p.at.y && o.at.y === p.at.x)).toBe(true)
      for (const p of pts) expect(p.at.x * p.at.y).toBe(n) // every point is ON the hyperbola
    }
  })

  it('binds to three.js headlessly — one object per point and per edge', () => {
    for (const s of figures()) {
      const g = toThree(s)
      expect(g.children).toHaveLength(s.points.length + s.edges.length)
      expect(g.name).toBe(s.name)
      expect(g.userData.theorem).toBe(s.theorem)
      expect(g.userData.seal).toBe(sceneSeal(s))
      // the boundary travels INSIDE the object, so a figure cannot shed it in transit
      expect(String(g.userData.caption)).toContain('never a proof')
    }
  })

  it('the seal moves when the caption does — an edited boundary is a different figure', () => {
    const s = lightcone(3)
    expect(sceneSeal({ ...s, caption: `${s.caption} ` })).not.toBe(sceneSeal(s))
    expect(sceneSeal({ ...s })).toBe(sceneSeal(s))
  })

  // PLANTED with the exact fabrication that happened: `mirror()` first cited
  // `Mirror.involution_partitions`, a theorem invented minutes after gating that defect in prose.
  it('fires on a figure citing a theorem no kernel file states', () => {
    const root = mkdtempSync(join(tmpdir(), 'erpax-fig-'))
    mkdirSync(join(root, 'src/verify/lean'), { recursive: true })
    writeFileSync(join(root, 'src/verify/lean/M.lean'), 'namespace Duality.Mirror\ntheorem something_else : True := trivial\nend Duality.Mirror\n')
    const stated = statedTheorems(root)
    expect(stated.has('Duality.Mirror.something_else')).toBe(true)
    expect(stated.has('Duality.Mirror.fixed_or_paired')).toBe(false)
    expect(unbackedFigures(root).length).toBe(figures().length)
    expect(() => assertFiguresBacked(root)).toThrow(/cite a theorem no .lean file states/)
  })

  it('every live figure cites a theorem that is actually stated', () => {
    expect(unbackedFigures(process.cwd()).map((f) => f.theorem)).toEqual([])
    expect(() => assertFiguresBacked(process.cwd())).not.toThrow()
  })
})
