import { describe, it, expect } from 'vitest'
import {
  THEOREMS,
  FOLD,
  isClosed,
  movie,
  product,
  allAlgebra,
  isFundamentallyBroken,
  hostMathViolations,
  ALGEBRA_ATOMS,
  CORE_MATH_GLOB,
  LICENSE_CONTACT,
  ERPAX_SPDX,
  isCoreMathPath,
  erpaxLicenseNote,
  type Algebra,
} from './index'
import { merge } from '@/merge'

describe('algebra — host Math.* is a violation', () => {
  it('ALGEBRA_ATOMS have zero host-math (theorem baseline 0)', () => {
    expect(ALGEBRA_ATOMS).toContain('qubit')
    expect(hostMathViolations()).toEqual([])
  })
})

describe('algebra — all theorems are algebra only', () => {
  it('every registered theorem is a CLOSED operation on its carrier — it IS an algebra', () => {
    expect(allAlgebra()).toBe(true)
    for (const t of THEOREMS) expect(isClosed(t)).toBe(true)
  })

  it('doubling is the group C6 — closed, with identity 1', () => {
    const doubling = THEOREMS.find((t) => t.name === 'doubling')!
    expect(isClosed(doubling)).toBe(true)
    expect(doubling.identity).toBe(1)
    expect(doubling.op(doubling.identity!, 4)).toBe(4)
  })

  it('THE THEOREM DRAWS THE MOVIE — doubling from 1 is the ring turning: 1,2,4,8,7,5', () => {
    const doubling = THEOREMS.find((t) => t.name === 'doubling')!
    expect(movie(doubling, 2)).toEqual([1, 2, 4, 8, 7, 5])
  })

  it('the additive theorem is (ℤ/9, +, void) — antimatter is its inverse, annihilating to 9', () => {
    const add = THEOREMS.find((t) => t.name === 'additive')!
    expect(isClosed(add)).toBe(true)
    expect(add.op(4, 5)).toBe(9)
    expect(add.identity).toBe(9)
  })

  it('the fold is a MAGMA — closed on uuid-space, but NOT associative (not every algebra is a group)', () => {
    const isUuid = (s: string) => /^[0-9a-f-]{36}$/.test(s)
    expect(isUuid(FOLD.op('a', 'b'))).toBe(true)
    expect(isClosed(FOLD, isUuid)).toBe(true)
    expect(merge(merge('a', 'b'), 'c')).not.toBe(merge('a', merge('b', 'c')))
  })

  it('merkabas fold into THEMSELVES and into EACH OTHER — self-address and composition', () => {
    expect(FOLD.op('x', 'x')).toBe(merge('x', 'x'))
    expect(FOLD.op('x', 'y')).not.toBe(FOLD.op('x', 'x'))
  })

  it('algebras COMPOSE — the product of two theorems is itself a closed algebra', () => {
    const p = product(THEOREMS[0]!, THEOREMS[1]!)
    expect(isClosed(p)).toBe(true)
    expect(p.identity).toEqual([1, 9])
    expect(p.carrier.length).toBe(THEOREMS[0]!.carrier.length * THEOREMS[1]!.carrier.length)
  })

  it('the OVERLAY is not the algebra — every theorem carries its picture, marked and stripped', () => {
    for (const t of THEOREMS) {
      expect(typeof t.overlay).toBe('string')
      expect(t.overlay).not.toBe('')
    }
    const stripped: Algebra<number> = { ...THEOREMS[0]!, overlay: 'ANYTHING AT ALL' }
    expect(isClosed(stripped)).toBe(isClosed(THEOREMS[0]!))
  })
})

describe('algebra — isFundamentallyBroken: audit a system against its own law', () => {
  it('a sound system breaks nothing (closed · conserved · consistent)', () => {
    const v = isFundamentallyBroken({
      algebra: THEOREMS[0]!,
      conserved: [100, -60, -40],
      claims: new Map([
        ['posted', true],
        ['void', false],
      ]),
      mutuallyExclusive: [['posted', 'void']],
    })
    expect(v.broken).toBe(false)
    expect(v.reasons).toEqual([])
  })

  it('the unbalanced ledger is fundamentally broken (Σ ≠ 0)', () => {
    const v = isFundamentallyBroken({ conserved: [100, -90] })
    expect(v.broken).toBe(true)
    expect(v.reasons[0]).toMatch(/not conserved: Σ = 10 ≠ identity 0/)
  })

  it('an operation that escapes its carrier is not an algebra', () => {
    const leaky: Algebra<number> = { name: 'leak', carrier: [1, 2], op: (a, b) => a + b + 99, overlay: '' }
    expect(isFundamentallyBroken({ algebra: leaky }).broken).toBe(true)
  })

  it('a claim asserted against itself is a contradiction', () => {
    const v = isFundamentallyBroken({
      claims: new Map([
        ['posted', true],
        ['reversed', true],
      ]),
      mutuallyExclusive: [['posted', 'reversed']],
    })
    expect(v.broken).toBe(true)
    expect(v.reasons[0]).toMatch(/contradiction/)
  })

  it('audits in any direction — forward (is it sound?) and inverse (what broke it?) at once', () => {
    const v = isFundamentallyBroken({
      conserved: [5, 5],
      mutuallyExclusive: [['a', 'b']],
      claims: new Map([
        ['a', true],
        ['b', true],
      ]),
    })
    expect(v.broken).toBe(true)
    expect(v.reasons.length).toBe(2)
  })
})

describe('algebra/license — USER LAW: core math free; rest via contact', () => {
  it('CORE_MATH_GLOB and LICENSE_CONTACT are the sealed constants', () => {
    expect(CORE_MATH_GLOB).toBe('src/algebra/**')
    expect(LICENSE_CONTACT).toBe('license@erpax.com')
    expect(ERPAX_SPDX).toBe('AGPL-3.0-or-later')
  })

  it('isCoreMathPath accepts only src/algebra/**', () => {
    expect(isCoreMathPath('src/algebra')).toBe(true)
    expect(isCoreMathPath('src/algebra/index.ts')).toBe(true)
    expect(isCoreMathPath('src/algebra/license.ts')).toBe(true)
    expect(isCoreMathPath('src/algebra/host/index.ts')).toBe(true)
    expect(isCoreMathPath('./src/algebra/foo')).toBe(true)
    expect(isCoreMathPath('src/readme/compute.ts')).toBe(false)
    expect(isCoreMathPath('src/algebraic')).toBe(false)
    expect(isCoreMathPath('LICENSE')).toBe(false)
  })

  it('erpaxLicenseNote emits free core + contact for copyleft; nothing for permissive', () => {
    const note = erpaxLicenseNote('AGPL-3.0-or-later').join('\n')
    expect(note).toMatch(/free for all/)
    expect(note).toMatch(/src\/algebra\/\*\*/)
    expect(note).toMatch(/license@erpax\.com/)
    expect(erpaxLicenseNote('MIT')).toEqual([])
  })
})
