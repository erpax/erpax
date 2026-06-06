import { describe, it, expect } from 'vitest'
import { collide, pending, fold, DEFERRED } from '@/collide'
import { merge, nodeOf } from '@/uuid/matrix'

// collide — the deferred inhale of development. Asserts the LAW and RELATIONS
// (two into one, the borrowed merge, deferral), never a magic uuid value.
describe('collide — the inhale of development, deferred', () => {
  it('is DEFERRED — defined, not applied', () => {
    expect(DEFERRED).toBe(true)
    expect(pending().deferred).toBe(true)
    expect(fold().deferred).toBe(true)
  })

  it('collide(a, b) folds two into one (cardinality 2 → 1, the inhale)', () => {
    const c = collide('development', 'collide')
    expect(c.from).toBe(2)
    expect(c.to).toBe(1)
    expect(fold().delta).toBe(-1)
    expect(fold().breath).toBe('inhale')
  })

  it('the fold IS the canonical merge of the two atoms\' content-uuids (no re-implementation)', () => {
    // both atoms are minted in the matrix, so their fold must equal merge(uuidA, uuidB) exactly
    const a = nodeOf('development')
    const b = nodeOf('matrix')
    expect(a).toBeDefined()
    expect(b).toBeDefined()
    expect(collide('development', 'matrix').uuid).toBe(merge(a!.uuid, b!.uuid))
  })

  it('is deterministic and order-sensitive exactly as the collider (content-addressed)', () => {
    expect(collide('development', 'collide').uuid).toBe(collide('development', 'collide').uuid)
    // merge concatenates bytes in order, so a↔b differs from b↔a (the collide.mjs reciprocates separately)
    expect(collide('development', 'collide').uuid).not.toBe(collide('collide', 'development').uuid)
  })

  it('an unknown atom still collides deterministically (name fold fallback)', () => {
    const x = collide('totallyunminted', 'alsounminted')
    expect(x.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
    expect(x.uuid).toBe(collide('totallyunminted', 'alsounminted').uuid)
  })

  it('the ring move lands on a valid horo step, and the merge-point flag agrees with it', () => {
    const c = collide('development', 'collide')
    expect([1, 2, 4, 8, 7, 5, 9]).toContain(c.step)
    expect(c.mergePoint).toBe(c.step === 1 || c.step === 9)
  })

  it('pending() reports a slack in [0,1] heading DOWN — what the deferred collapse will fuse out', () => {
    const p = pending()
    expect(p.slackNow).toBeGreaterThanOrEqual(0)
    expect(p.slackNow).toBeLessThanOrEqual(1)
    expect(p.direction).toBe('down')
  })
})
