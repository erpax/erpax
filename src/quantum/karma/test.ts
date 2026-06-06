import { describe, it, expect } from 'vitest'
import { inheritedKarma, lineageKarma } from '@/quantum/karma'

// Karma inherited down the DNA chain: an atom carries its own score plus its ancestors'
// (entangled via the parent_id lineage).
describe('quantum/karma — karma inherited down the DNA chain', () => {
  it('inheritedKarma sums the atom and its lineage (at least the atom itself)', () => {
    expect(inheritedKarma('accounting', () => 1)).toBeGreaterThanOrEqual(1)
  })
  it('lineageKarma nets created − destroyed along the atom + its lineage', () => {
    expect(lineageKarma('accounting', () => 3, () => 1)).toBeGreaterThanOrEqual(2) // ≥ own 3−1
    expect(lineageKarma('accounting', () => 0, () => 0)).toBe(0)
  })
})
