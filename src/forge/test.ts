import { describe, it, expect } from 'vitest'
import { forge, strike, forging } from '@/forge'
import { UUID_MATRIX_NODES, UUID_MATRIX_EDGES, UUID_MATRIX_ROOT, matrixDigest } from '@/uuid/matrix'
import { entropy, orphans } from '@/entropy'
import { composeSteps, HORO_DIGITS, isHoroStep } from '@/horo'

// forge() MEASURES the live matrix (./index.ts) — it never mints. So the tests
// assert RELATIONS to the composed atoms (the forge state IS the matrix state),
// never a magic number, and determinism (re-striking the same corpus cools to
// the same root — the law).
describe('forge — the place atoms collide into one (measured, not minted)', () => {
  it('forge() reports the live matrix node/edge counts (what is in the fire)', () => {
    const s = forge()
    expect(s.nodes).toBe(UUID_MATRIX_NODES.length)
    expect(s.edges).toBe(UUID_MATRIX_EDGES.length)
    expect(s.nodes).toBeGreaterThan(0)
    expect(s.edges).toBeGreaterThan(0)
  })

  it('the root that leaves the forge IS UUID_MATRIX_ROOT, and it is sound (the Merkle re-fold matches)', () => {
    const s = forge()
    expect(s.root).toBe(UUID_MATRIX_ROOT)
    expect(s.root).toBe(matrixDigest().root)
    expect(s.sound).toBe(true)
  })

  it('the heat is the borrowed disorder from @/entropy, a fraction in [0,1]', () => {
    const s = forge()
    expect(s.heat).toBe(entropy())
    expect(s.heat).toBeGreaterThanOrEqual(0)
    expect(s.heat).toBeLessThanOrEqual(1)
  })

  it('the slag count is @/entropy orphans (unfused atoms)', () => {
    expect(forge().orphans).toBe(orphans().length)
  })

  it('re-striking the same corpus always cools to the same root (deterministic — the law)', () => {
    expect(forge()).toEqual(forge())
  })
})

describe('forge — the anvil is the horo ring', () => {
  it('strike(a,b) composes on the horo ring (it IS composeSteps — never re-derived)', () => {
    for (const a of HORO_DIGITS) {
      for (const b of HORO_DIGITS) {
        expect(strike(a, b)).toBe(composeSteps(a, b))
      }
    }
  })

  it('every blow lands ON the ring {1,2,4,8,7,5,9} — the fold never escapes', () => {
    for (const a of HORO_DIGITS) {
      for (const b of HORO_DIGITS) {
        expect(isHoroStep(strike(a, b))).toBe(true)
      }
    }
  })
})

describe('forge — the smithing law named from the composed atoms', () => {
  it('the hammer is merge resolving a duality to a trinity; the anvil is the horo ring', () => {
    const f = forging()
    expect(f.hammer).toBe('merge')
    expect(f.resolvesTo).toBe('trinity')
    expect(f.anvilRing).toEqual([...HORO_DIGITS])
  })

  it('it reports real counts from @/trinity and @/duality (positive, not stubbed)', () => {
    const f = forging()
    expect(f.trinityFiles).toBeGreaterThan(0)
    expect(f.declaredDualities).toBeGreaterThan(0)
  })
})
