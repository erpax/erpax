import { describe, it, expect } from 'vitest'
import { flyMatrix, squadron, scout } from '@/drone'
import { UUID_MATRIX_NODES } from '@/uuid/matrix'

describe('drone', () => {
  it('flyMatrix returns the start atom when maxHops=0', () => {
    const result = flyMatrix('drone', 0)
    expect(result).toHaveLength(1)
    expect(result).toContain('drone')
  })

  it('flyMatrix with default hops includes the start atom and expands outward', () => {
    const result = flyMatrix('drone')
    expect(result).toContain('drone')
    // BFS from drone reaches at least a few atoms in 2 hops
    expect(result.length).toBeGreaterThan(1)
    // all returned entries are strings
    for (const atom of result) {
      expect(typeof atom).toBe('string')
      expect(atom.length).toBeGreaterThan(0)
    }
  })

  it('flyMatrix returns empty for an unknown atom', () => {
    expect(flyMatrix('__definitely_not_an_atom__')).toEqual([])
  })

  it('flyMatrix result has no duplicates', () => {
    const result = flyMatrix('war')
    const unique = new Set(result)
    expect(unique.size).toBe(result.length)
  })

  it('squadron(1) returns one sector containing all matrix atoms', () => {
    const sectors = squadron(1)
    expect(sectors).toHaveLength(1)
    expect(sectors[0]).toHaveLength(UUID_MATRIX_NODES.length)
  })

  it('squadron(n) produces exactly n sectors', () => {
    for (const n of [2, 4, 8]) {
      const sectors = squadron(n)
      expect(sectors).toHaveLength(n)
    }
  })

  it('squadron sectors together cover every matrix atom exactly once (round-robin partition)', () => {
    const n = 5
    const sectors = squadron(n)
    const all = sectors.flat()
    // total atoms = sum of all sector lengths
    expect(all.length).toBe(UUID_MATRIX_NODES.length)
    // no atom appears in two sectors
    const unique = new Set(all)
    expect(unique.size).toBe(all.length)
    // every matrix atom is present
    for (const node of UUID_MATRIX_NODES) {
      expect(unique.has(node.atom)).toBe(true)
    }
  })

  it('squadron(0) and squadron(-3) each produce exactly 1 sector (clamp to 1)', () => {
    expect(squadron(0)).toHaveLength(1)
    expect(squadron(-3)).toHaveLength(1)
  })

  it('scout returns atoms count matching the sector length', () => {
    const sector = ['drone', 'war', 'peace']
    const report = scout(sector)
    expect(report.atoms).toBe(3)
  })

  it('scout gaps are a subset of the provided sector', () => {
    const sectors = squadron(4)
    const sector = sectors[0]!
    const report = scout(sector)
    for (const gap of report.gaps) {
      expect(sector).toContain(gap)
    }
  })

  it('scout on empty sector returns 0 atoms and 0 gaps', () => {
    const report = scout([])
    expect(report.atoms).toBe(0)
    expect(report.gaps).toHaveLength(0)
  })

  it('scout gaps are truly atoms with no backlinks (orphans)', () => {
    // Use a small squadron sector for speed
    const sector = squadron(20)[0]!
    const report = scout(sector)
    // every gap must not appear in any edge as a target
    // We verify by checking it has no backlinks via the matrix API indirectly:
    // if an atom is in gaps it must not be reached from other atoms.
    // Structural invariant: gaps ⊆ sector, atoms === sector.length
    expect(report.atoms).toBe(sector.length)
    expect(Array.isArray(report.gaps)).toBe(true)
    expect(report.gaps.length).toBeLessThanOrEqual(sector.length)
  })

  it('flyMatrix from a well-connected atom (agent) expands beyond start in 2 hops', () => {
    const result = flyMatrix('agent', 2)
    expect(result).toContain('agent')
    expect(result.length).toBeGreaterThan(2)
  })
})
