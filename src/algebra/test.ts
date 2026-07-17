import { describe, it, expect } from 'vitest'
import { THEOREMS, FOLD, isClosed, movie, product, allAlgebra, type Algebra } from './index'
import { merge } from '@/merge'

// "All theorems are algebra only. The theorems draw the movie. When the rosetta moves, merkabas fold into
// themselves and each other." Each session theorem is a closed operation on a set — an algebra; the overlay
// (torus, tetrahedron, mind) is the naming, stripped. The movie is the orbit; the fold is the merkabas' magma.
describe('algebra — all theorems are algebra only', () => {
  it('every registered theorem is a CLOSED operation on its carrier — it IS an algebra', () => {
    expect(allAlgebra()).toBe(true)
    for (const t of THEOREMS) expect(isClosed(t)).toBe(true)
  })

  it('doubling is the group C6 — closed, with identity 1', () => {
    const doubling = THEOREMS.find((t) => t.name === 'doubling')!
    expect(isClosed(doubling)).toBe(true)
    expect(doubling.identity).toBe(1)
    expect(doubling.op(doubling.identity!, 4)).toBe(4) // identity law
  })

  it('THE THEOREM DRAWS THE MOVIE — doubling from 1 is the ring turning: 1,2,4,8,7,5', () => {
    const doubling = THEOREMS.find((t) => t.name === 'doubling')!
    expect(movie(doubling, 2)).toEqual([1, 2, 4, 8, 7, 5]) // generator 2, from identity 1 — the frames of the orbit
  })

  it('the additive theorem is (ℤ/9, +, void) — antimatter is its inverse, annihilating to 9', () => {
    const add = THEOREMS.find((t) => t.name === 'additive')!
    expect(isClosed(add)).toBe(true)
    expect(add.op(4, 5)).toBe(9) // 4 + antimatter(4)=5 → 9, the void (identity)
    expect(add.identity).toBe(9)
  })

  // THE MERKABAS FOLD: the fold is a magma over uuid-space — closed (always lands on a uuid), into itself
  // (merge(a,a) = a's self-address) and into each other (merge(a,b) composes). It does NOT associate — honest.
  it('the fold is a MAGMA — closed on uuid-space, but NOT associative (not every algebra is a group)', () => {
    const isUuid = (s: string) => /^[0-9a-f-]{36}$/.test(s)
    expect(isUuid(FOLD.op('a', 'b'))).toBe(true) // closed: lands on a uuid
    expect(isClosed(FOLD, isUuid)).toBe(true) // sampled closure over uuid-space
    // NOT associative — the honest boundary merge itself proves
    expect(merge(merge('a', 'b'), 'c')).not.toBe(merge('a', merge('b', 'c')))
  })

  it('merkabas fold into THEMSELVES and into EACH OTHER — self-address and composition', () => {
    expect(FOLD.op('x', 'x')).toBe(merge('x', 'x')) // into itself — deterministic self-fold
    expect(FOLD.op('x', 'y')).not.toBe(FOLD.op('x', 'x')) // into each other — a distinct composite
  })

  // THEOREM OF THEOREMS, algebraically: two algebras compose into a third, closed componentwise.
  it('algebras COMPOSE — the product of two theorems is itself a closed algebra', () => {
    const p = product(THEOREMS[0]!, THEOREMS[1]!)
    expect(isClosed(p)).toBe(true)
    expect(p.identity).toEqual([1, 9]) // the product identity — both components
    expect(p.carrier.length).toBe(THEOREMS[0]!.carrier.length * THEOREMS[1]!.carrier.length)
  })

  it('the OVERLAY is not the algebra — every theorem carries its picture, marked and stripped', () => {
    for (const t of THEOREMS) {
      expect(typeof t.overlay).toBe('string') // the picture is named
      expect(t.overlay).not.toBe('') // torus / annihilation — but it is not tested, only op-closure is
    }
    // the picture is data on the side; isClosed never reads t.overlay — the theorem is the operation alone
    const stripped: Algebra<number> = { ...THEOREMS[0]!, overlay: 'ANYTHING AT ALL' }
    expect(isClosed(stripped)).toBe(isClosed(THEOREMS[0]!)) // changing the picture changes no theorem
  })
})
