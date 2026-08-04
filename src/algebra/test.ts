import { describe, it, expect } from 'vitest'
import {
  exactTrunc,
  exactFloor,
  exactCeil,
  exactRound,
  exactMaxOf,
  exactMinOf,
  THEOREMS,
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
  CORE_MATH_SPDX,
  isCoreMathPath,
  erpaxLicenseNote,
  SOURCE_URL,
  citation,
  citationComplies,
  type Algebra,
} from './index'
import { FOLD } from './fold'
import { merge } from '@/merge'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

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
    expect(ERPAX_SPDX).toBe('CC-BY-NC-ND-4.0')
    expect(CORE_MATH_SPDX).toBe('MIT')
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

  it('citation carries attribution + SPDX tier + source URL + commercial + uuid, and complies', () => {
    const c = citation({ path: 'src/rules/ask', uuid: '9ed56c0c-52f2-8d11-a64b-9a751bdfdf98' })
    expect(c).toContain('erpax:src/rules/ask')
    expect(c).toContain('content-uuid 9ed56c0c-52f2-8d11-a64b-9a751bdfdf98')
    expect(c).toContain('© erpax')
    expect(c).toContain(ERPAX_SPDX) // BY-NC-ND for non-core matter
    expect(c).toContain(SOURCE_URL) // BY-NC-ND §3(a)(1) attribution source link
    expect(c).toContain(LICENSE_CONTACT) // commercial alternative for the NC tier
    expect(citationComplies(c)).toBe(true)
  })

  it('citation uses the MIT tier for core math and omits the commercial contact', () => {
    const c = citation({ path: 'src/algebra/index.ts' })
    expect(c).toContain(CORE_MATH_SPDX)
    expect(c).not.toContain(ERPAX_SPDX)
    expect(c).not.toContain(LICENSE_CONTACT)
    expect(citationComplies(c)).toBe(true)
  })

  it('citation states the modification when the matter was changed (BY-NC-ND §3(a)(1)(B))', () => {
    const c = citation({ path: 'src/rules/ask', modified: '2026-08-02' })
    expect(c).toContain('modified 2026-08-02')
  })

  it('citationComplies rejects a citation missing the source URL or SPDX', () => {
    expect(citationComplies('erpax:src/rules/ask · © erpax')).toBe(false)
    expect(citationComplies(`© erpax · ${ERPAX_SPDX}`)).toBe(false)
  })

  it('erpaxLicenseNote emits free core + contact for the restricted tier; nothing for permissive', () => {
    const note = erpaxLicenseNote('CC-BY-NC-ND-4.0').join('\n')
    expect(note).toMatch(/free for all/)
    expect(note).toMatch(/src\/algebra\/\*\*/)
    expect(note).toMatch(/@erpax\/algebra/)
    expect(note).toMatch(/license@erpax\.com/)
    expect(erpaxLicenseNote('MIT')).toEqual([])
  })

  it('@erpax/algebra package.json license matches CORE_MATH_SPDX; root stays private', () => {
    const root = join(process.cwd())
    const pkg = JSON.parse(readFileSync(join(root, 'packages/algebra/package.json'), 'utf8'))
    const app = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
    expect(pkg.name).toBe('@erpax/algebra')
    expect(pkg.license).toBe(CORE_MATH_SPDX)
    expect(pkg.private).not.toBe(true)
    expect(app.private).toBe(true)
    expect(app.license).toBe(ERPAX_SPDX)
  })
})

describe('algebra — exactTrunc is exact across the WHOLE double range, not a 32-bit window', () => {
  it('does not wrap above 2³¹ — the money bug: 2.5e9 minor units must not come out negative', () => {
    // `n | 0` coerced to a 32-bit signed int, so an ordinary mid-size ledger amount wrapped:
    //   (2**31)|0 = -2147483648 · (1e10)|0 = 1410065408 · exactRound(2_500_000_000.5) = -1794967295
    expect(exactTrunc(2 ** 31)).toBe(2147483648)
    expect(exactTrunc(1e10)).toBe(1e10)
    expect(exactFloor(3e9)).toBe(3e9)
    expect(exactRound(2_500_000_000.5)).toBe(2_500_000_001)
    expect(exactRound(1e10 + 0.4)).toBe(1e10)
    // the sign is the tell — every one of these was NEGATIVE before
    for (const n of [2 ** 31, 1e10, 3e9, 2_500_000_000.5]) expect(exactRound(n)).toBeGreaterThan(0)
  })

  it('a non-finite value PROPAGATES — it never collapses to a plausible-looking 0', () => {
    expect(exactTrunc(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY)
    expect(exactTrunc(Number.NEGATIVE_INFINITY)).toBe(Number.NEGATIVE_INFINITY)
    expect(Number.isNaN(exactTrunc(Number.NaN))).toBe(true)
    // this is what made an INFINITE tamper cost read as ZERO through exactRound
    expect(exactRound(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY)
    expect(exactCeil(Number.POSITIVE_INFINITY)).toBe(Number.POSITIVE_INFINITY)
  })

  it('the ordinary cases are unchanged — truncation toward zero, ties away from zero', () => {
    expect(exactTrunc(5.7)).toBe(5)
    expect(exactTrunc(-5.7)).toBe(-5)
    expect(exactFloor(-5.7)).toBe(-6)
    expect(exactFloor(5.7)).toBe(5)
    expect(exactCeil(5.2)).toBe(6)
    expect(exactCeil(-5.2)).toBe(-5)
    expect(exactRound(2.5)).toBe(3)
    expect(exactRound(-2.5)).toBe(-3)
    expect(exactRound(2.4)).toBe(2)
    expect(exactRound(-2.4)).toBe(-2)
  })

  it('exactMaxOf / exactMinOf fold a SEQUENCE — the binary spread read only a prefix', () => {
    const xs = [3, 9, 1, 7]
    expect(exactMaxOf(xs)).toBe(9) // exactMax(...xs) returned max(3,9)=9 by luck here …
    expect(exactMinOf(xs)).toBe(1) // … and min(3,9)=3, which is WRONG
    expect(exactMaxOf([1, 2, 100])).toBe(100) // the prefix read would have said 2
    expect(exactMinOf([9, 8, 0])).toBe(0) // the prefix read would have said 8
    // empty throws rather than leaking ±Infinity into a computation
    expect(() => exactMaxOf([])).toThrow(/empty sequence/)
    expect(() => exactMinOf([])).toThrow(/empty sequence/)
  })
})
