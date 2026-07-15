import { describe, it, expect } from 'vitest'
import { pyramid, courses, tamperShift } from './index'
import { foldToRoot, merkleProof, verifyMerkleProof } from '@/merge'

const base = ['a', 'b', 'c', 'd', 'e']

describe('pyramid — the geometry of the fold', () => {
  it('the apex is the fold root — the single seal every stone rises to', () => {
    expect(pyramid(base).apex).toBe(foldToRoot(base))
  })

  it('height is ⌈log₂ base⌉ courses; faces are base − 1 crosses', () => {
    expect(pyramid(['a', 'b', 'c', 'd']).height).toBe(2) // 4 → 2 → 1
    expect(pyramid(base).height).toBe(3) // 5 → 3 → 2 → 1
    expect(pyramid(base).faces).toBe(4) // n − 1 pairwise merges
    expect(pyramid(['solo']).height).toBe(0) // a single stone is already its own apex
    expect(pyramid(['solo']).faces).toBe(0)
  })

  it('the courses stack base → apex, the last course the lone apex', () => {
    const rows = courses(base)
    expect(rows[0]).toEqual(base) // ground course
    expect(rows[rows.length - 1]).toHaveLength(1) // apex course
    expect(rows[rows.length - 1]![0]).toBe(pyramid(base).apex)
    expect(rows).toHaveLength(pyramid(base).height + 1)
  })

  it('the edge up the pyramid is the inclusion proof — a base stone reaches the apex', () => {
    const apex = pyramid(base).apex
    // an edge from stone 'c' (index 2) climbs height steps to the apex
    expect(verifyMerkleProof('c', merkleProof(base, 2), apex)).toBe(true)
    expect(verifyMerkleProof('z', merkleProof(base, 2), apex)).toBe(false) // a stone not in the base
  })

  it('the tamper law: move one base stone and the apex moves', () => {
    const t = tamperShift(base, 2, 'X')
    expect(t.moved).toBe(true)
    expect(t.was).toBe(foldToRoot(base))
    expect(t.now).not.toBe(t.was)
  })

  it('an unchanged stone does not move the apex (no false tamper)', () => {
    expect(tamperShift(base, 2, 'c').moved).toBe(false) // set 'c' to 'c'
  })
})
