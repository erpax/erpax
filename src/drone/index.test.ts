/**
 * drone — the scout's flight over the matrix, green by construction. Pure: no
 * Payload, only the generated matrix. @see ./index.ts, ./SKILL.md
 */
import { describe, it, expect } from 'vitest'

import { flyMatrix, squadron, scout } from '@/drone'
import { UUID_MATRIX_NODES, neighborsOf } from '@/uuid/matrix'

describe('drone flies the matrix — reconnaissance for peace', () => {
  it('flyMatrix covers the connected terrain around a well-linked atom', () => {
    const terrain = flyMatrix('merge', 1)
    expect(terrain).toContain('merge') // the drone starts where it stands
    // one hop reaches at least the atom's own outgoing neighbours
    for (const nb of neighborsOf('merge')) expect(terrain).toContain(nb.atom)
    expect(terrain.length).toBeGreaterThan(1)
  })

  it('flyMatrix on an unknown atom has nowhere to fly', () => {
    expect(flyMatrix('not-an-atom-zzz')).toEqual([])
  })

  it('deeper flights cover at least as much terrain (monotone)', () => {
    const near = flyMatrix('merge', 1).length
    const far = flyMatrix('merge', 3).length
    expect(far).toBeGreaterThanOrEqual(near)
  })

  it('a squadron partitions the whole matrix — every atom in exactly one sector', () => {
    const sectors = squadron(8)
    expect(sectors).toHaveLength(8)
    const covered = sectors.flat()
    expect(covered).toHaveLength(UUID_MATRIX_NODES.length) // no atom dropped, none doubled
    expect(new Set(covered).size).toBe(UUID_MATRIX_NODES.length)
  })

  it('squadron(0) degenerates to a single drone covering the whole matrix', () => {
    const sectors = squadron(0)
    expect(sectors).toHaveLength(1)
    expect(sectors[0]).toHaveLength(UUID_MATRIX_NODES.length)
  })

  it('scout reports a sector size and its orphan gaps (the food for the agents)', () => {
    const sector = squadron(16)[0]!
    const report = scout(sector)
    expect(report.atoms).toBe(sector.length)
    // every reported gap is genuinely in the sector
    for (const g of report.gaps) expect(sector).toContain(g)
  })
})
