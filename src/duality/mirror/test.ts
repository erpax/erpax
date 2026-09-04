import { describe, expect, it } from 'vitest'
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { atomAddress } from '@/atom/address'
import { anchorMirror, divisorsOf, harmonicCases, harmonicLaw, latex, mirrorReport } from '.'

const here = dirname(fileURLToPath(import.meta.url))
/** Lean lives in one place in this corpus ([[verify]]/lean), not beside each atom that states one. */
const leanDir = join(here, '..', '..', 'verify', 'lean')

describe('duality/mirror', () => {
  it('lives where its name says', () => {
    expect(atomAddress(import.meta.url).path).toBe('duality/mirror')
  })

  it('THE COIN — σ∘σ = id over the whole carrier', () => {
    expect(anchorMirror().isInvolution).toBe(true)
    expect(anchorMirror().closed).toBe(true)
  })

  it('no element is harmonic here — 432 is not a perfect square, so Fix(σ) is empty', () => {
    expect(anchorMirror().fixed).toEqual([])
  })

  it('so all twenty are paired: ten transpositions, in one side and out the other', () => {
    const r = anchorMirror()
    expect(r.pairs).toHaveLength(10)
    expect(r.pairs.every(([a, b]) => a * b === 432)).toBe(true)
  })

  it('NOTHING RESISTS — every element is fixed or paired, never both and never neither', () => {
    expect(anchorMirror().exhaustive).toBe(true)
  })

  it('parity: |S| ≡ |Fix σ| (mod 2)', () => {
    expect(anchorMirror().parityHolds).toBe(true)
  })

  it('THE CONTROL — a carrier that DOES have a fixed point must report one', () => {
    // Without this, `fixed = []` above proves nothing about 432 and everything about a filter that
    // always returns empty. 36 is a perfect square, so 6 is its own reflection.
    const r = mirrorReport(divisorsOf(36), (d) => 36 / d)
    expect(r.isInvolution).toBe(true)
    expect(r.fixed).toEqual([6])
    expect(r.parityHolds).toBe(true) // 9 divisors, 1 fixed — both odd
  })

  it('a NON-involution is reported as one — the check can fail', () => {
    expect(mirrorReport([1, 2, 3], (x) => (x % 3) + 1).isInvolution).toBe(false)
  })

  it('the carrier is computed from the number, never typed beside it', () => {
    expect(divisorsOf(432)).toHaveLength(20)
    expect(divisorsOf(432).every((d) => 432 % d === 0)).toBe(true)
  })

  it('the rendered statement reads its figures from the report, so it cannot drift', () => {
    const tex = latex('divisors of 432', 'D(432)', anchorMirror())
    expect(tex).toContain('|\\mathrm{Fix}(\\sigma)| = 0')
    expect(tex).toContain('$10$ transpositions')
    // no backtick may reach the output: it would have ended the template that builds it
    expect(tex).not.toContain('`')
    // inline math must BALANCE — an odd $ opens math mode over the rest of the document, and the
    // first draft emitted `consists of 10$ transpositions`, which does exactly that
    expect((tex.match(/(?<!\\)\$/g) ?? []).length % 2).toBe(0)
  })

  it('LEAN AGREES — the same statement, kernel-checked, axiom-free', () => {
    // Two instruments, one answer: enumeration in TypeScript and `decide` in the Lean kernel.
    // Skipped rather than faked where no toolchain exists — a green test on a missing checker
    // would be the exact defect this corpus gates ([[rules]]/mirror).
    const lean = ['/opt/homebrew/bin/lean', '/usr/local/bin/lean'].find(existsSync)
    if (!lean) return
    const out = execFileSync(lean, ['Mirror.lean'], { cwd: leanDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
    expect(out.trim()).toBe('')
  }, 120_000)

  it('REFUTES the universal claim — an involution does NOT always leave a harmonic element', () => {
    // 53 of the first 60 carriers fix nothing. The claim is false in the large majority of cases,
    // and 432 is not a freak.
    expect(harmonicLaw(60).withoutHarmonic).toBe(53)
    expect(harmonicCases(60).find((c) => c.n === 432 % 61)).toBeDefined()
  })

  it('ODD CARRIER ⇒ HARMONIC — the true theorem, with its hypothesis', () => {
    // The non-fixed elements pair off, so they are even in number; an odd total cannot be made of
    // pairs alone, and one element is left holding itself.
    expect(harmonicLaw(60).oddIffHarmonic).toBe(true)
  })

  it('three conditions are one condition: τ odd ⟺ harmonic exists ⟺ n is a perfect square', () => {
    const law = harmonicLaw(60)
    expect(law.oddIffHarmonic).toBe(true)
    expect(law.harmonicIffSquare).toBe(true)
    expect(law.parityHolds).toBe(true)
  })

  it('when a harmonic element exists it is UNIQUE — the square root and nothing else', () => {
    expect(harmonicLaw(60).uniqueWhenPresent).toBe(true)
    expect(harmonicCases(60).filter((c) => c.fixed.length > 0).map((c) => c.fixed[0])).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('the Lean development proves the same, including that the universal claim is FALSE', () => {
    const lean = ['/opt/homebrew/bin/lean', '/usr/local/bin/lean'].find(existsSync)
    if (!lean) return
    const out = execFileSync(lean, ['Harmonic.lean'], { cwd: leanDir, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
    expect(out.trim()).toBe('')
  }, 180_000)
})
