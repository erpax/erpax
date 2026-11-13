import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { algebraLog2 } from '@/algebra'
import { record } from '@/verify/latex'
import { amortisedBits, coreK, erasedBits, heatLedger, landauerJ, millikelvinK, nonNarrowing } from './index'
import { factor, partition, distribution, ratio } from '@/temperature'

// The Boltzmann distribution over energy levels. Tests assert the RELATIONS —
// normalisation, descending occupancy, detailed-balance ratio, the hot/cold limits.
const rel = (a: number, b: number): number => exactAbs(a - b) / exactAbs(b)
const levels = [0, 1e-21, 2e-21] // ascending energies (J)

describe('temperature: the Boltzmann distribution', () => {
  it('the distribution is normalised, with the ground reference factor = 1', () => {
    expect(factor(0, 100)).toBe(1)
    const p = distribution(levels, 100)
    expect(p.reduce((s, x) => s + x, 0)).toBeCloseTo(1, 12)
    for (const x of p) {
      expect(x).toBeGreaterThan(0)
      expect(x).toBeLessThanOrEqual(1)
    }
  })

  it('higher energy is less occupied (at finite T)', () => {
    const p = distribution(levels, 100)
    expect(p[0]).toBeGreaterThan(p[1]!)
    expect(p[1]!).toBeGreaterThan(p[2]!)
  })

  it('detailed balance: pᵢ/pⱼ = e^(−(Eᵢ−Eⱼ)/kT); equal energies ⇒ ratio 1', () => {
    expect(ratio(5e-21, 5e-21, 100)).toBe(1)
    const p = distribution(levels, 100)
    expect(rel(p[1]! / p[0]!, ratio(levels[1]!, levels[0]!, 100))).toBeLessThan(1e-12)
  })

  it('cold (T→0) freezes into the ground state; hot (T→∞) spreads to uniform', () => {
    const cold = distribution(levels, 1e-3)
    expect(cold[0]).toBeGreaterThan(0.999) // ground dominates
    const hot = distribution(levels, 1e12)
    for (const x of hot) expect(x).toBeCloseTo(1 / levels.length, 6) // all equal = max entropy
  })

  it('the partition function is the sum of the Boltzmann factors', () => {
    const T = 100
    expect(rel(partition(levels, T), levels.reduce((z, e) => z + factor(e, T), 0))).toBeLessThan(1e-12)
  })
})

describe('temperature — Landauer: the heat a computation sheds is the bits it erases, at the core or in the fridge', () => {
  it('one erased bit at 300 K costs k·T·ln2 ≈ 2.87e-21 J, and 20,000× less at 15 mK', () => {
    expect(landauerJ(coreK())).toBeCloseTo(2.87e-21, 23)
    expect(landauerJ(coreK()) / landauerJ(millikelvinK())).toBeCloseTo(20_000, 6)
  })

  it('a step that does not narrow drops nothing; one that narrows drops the difference', () => {
    expect(erasedBits(128, 155)).toBe(0)
    expect(nonNarrowing(128, 155)).toBe(true)
    expect(erasedBits(128, 64)).toBe(64)
    expect(nonNarrowing(128, 64)).toBe(false)
  })

  it('not narrowing is necessary for reversibility, never proof of it', () => {
    // x ↦ 0 written into a wider word: no bits dropped by width, every input sent to one output
    const constant = (_x: number): number => 0
    expect(nonNarrowing(8, 16)).toBe(true)
    expect(new Set([0, 1, 2, 3].map(constant)).size).toBe(1)
  })

  it('the corpus ledger: the split and join drop nothing; the AND-fold, the digital root and the hash drop bits', () => {
    const lines = heatLedger(4096)
    const by = Object.fromEntries(lines.map((l) => [l.op.split(' ')[0], l]))
    expect(by['prime.split']!.nonNarrowing).toBe(true)
    expect(by['prime.join']!.nonNarrowing).toBe(true)
    expect([by['prime.join']!.inBits, by['prime.join']!.outBits]).toEqual([128, 128])
    expect(by['word.interact64']!.erased).toBe(64)
    expect(by['hexbit.digitalRootPacked']!.erased).toBeCloseTo(128 - algebraLog2(9), 9)
    expect(by['uuid']!.erased).toBe(4096 * 8 - 128)
    for (const l of lines) expect(l.coreJ).toBeCloseTo(l.millikelvinJ * 20_000, 25)
  })

  it('one collapse shared by n computations is a share of one number, and no sharing leaves it whole', () => {
    expect(amortisedBits(128, 1)).toBe(128)
    expect(amortisedBits(128, 1024)).toBe(0.125)
    expect(amortisedBits(0, 1024)).toBe(0)
    expect(amortisedBits(128, 0)).toBe(128)
  })

  it('the Lean twin states the fridge ratio and the narrowing rule, and the kernel record holds them', () => {
    const lean = readFileSync(join(process.cwd(), 'src/verify/lean/Landauer.lean'), 'utf8')
    const names = ['core_over_fridge', 'bijection_erases_nothing', 'narrowing_erases_the_difference']
    for (const t of names) expect(lean).toContain(`theorem ${t}`)
    // the source naming a theorem is not evidence; the kernel reporting it is
    const file = record().files.find((f) => f.file === 'Landauer.lean')
    expect(file?.compiled).toBe(true)
    for (const t of names) {
      const entry = file!.entries.find((e) => e.theorem === `Landauer.${t}`)
      expect(entry, t).toBeDefined()
      expect(entry!.stubbed, t).toBe(false)
    }
  })
})
