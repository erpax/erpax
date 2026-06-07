import { describe, it, expect } from 'vitest'
import { flyMatrix, squadron, scout } from '@/drone'
import { UUID_MATRIX_NODES, backlinksOf } from '@/uuid/matrix'

// drone — a read-only scout over the content-uuid matrix (./index.ts): flyMatrix
// (BFS over both coils), squadron (round-robin partition for parallel coverage),
// scout (a sector's orphans — the gaps the agents eat). Never tampers, only reveals.
const someAtom = UUID_MATRIX_NODES[0]!.atom

describe('drone — reconnaissance over the matrix, never tampering', () => {
  it('flyMatrix from an unknown atom flies nowhere (empty)', () => {
    expect(flyMatrix('::definitely-not-an-atom::')).toEqual([])
  })

  it('flyMatrix includes its start and only grows with more hops (BFS coverage)', () => {
    const near = flyMatrix(someAtom, 1)
    const far = flyMatrix(someAtom, 3)
    expect(near).toContain(someAtom)
    // every atom is unique (the `seen` set) and the wider flight is a superset.
    expect(new Set(near).size).toBe(near.length)
    expect(near.length).toBeLessThanOrEqual(far.length)
    for (const a of near) expect(far).toContain(a)
  })

  it('squadron partitions every matrix atom into n disjoint sectors (parallel coverage)', () => {
    const sectors = squadron(4)
    expect(sectors).toHaveLength(4)
    const all = sectors.flat()
    // a clean partition: total count conserved, no atom in two sectors.
    expect(all).toHaveLength(UUID_MATRIX_NODES.length)
    expect(new Set(all).size).toBe(UUID_MATRIX_NODES.length)
  })

  it('squadron(n < 1) collapses to a single sector holding the whole matrix', () => {
    const sectors = squadron(0)
    expect(sectors).toHaveLength(1)
    expect(sectors[0]).toHaveLength(UUID_MATRIX_NODES.length)
  })

  it('scout reports the orphans of a sector — atoms with no backlink (the gaps)', () => {
    const sector = squadron(1)[0]!
    const report = scout(sector)
    expect(report.atoms).toBe(sector.length)
    // every reported gap is genuinely an orphan (no incoming backlink).
    for (const gap of report.gaps) expect(backlinksOf(gap)).toHaveLength(0)
    // and no non-gap atom in the sector is an orphan.
    const gapSet = new Set(report.gaps)
    for (const atom of sector) {
      if (!gapSet.has(atom)) expect(backlinksOf(atom).length).toBeGreaterThan(0)
    }
  })
})
