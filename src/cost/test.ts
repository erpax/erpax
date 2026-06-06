import { describe, it, expect } from 'vitest'
import { totalOutput, efficiency, moreEfficient, wasteFraction, costEntry, type Ledger } from '@/cost'
import { secondPreimageLog2, birthdayLog2, bhtCollisionLog2, groverPreimageLog2, quantumFloorLog2, harmonicFloors } from '@/cost'
import { isBalanced, net } from '@/entry'

describe('cost — one efficiency law for every society cost (vs productivity + creativity)', () => {
  it('totalOutput counts both productivity and creativity', () => {
    expect(totalOutput({ productivity: 6, creativity: 4 })).toBe(10)
    expect(totalOutput({ productivity: 0, creativity: 0 })).toBe(0)
  })

  it('efficiency = output / cost — the same law for every cost kind', () => {
    const ai: Ledger = { kind: 'ai', output: { productivity: 6, creativity: 4 }, cost: 2 }
    expect(efficiency(ai)).toBe(5)
    const energy: Ledger = { kind: 'energy', output: { productivity: 10, creativity: 0 }, cost: 5 }
    expect(efficiency(energy)).toBe(2)
    expect(efficiency({ kind: 'money', output: { productivity: 3, creativity: 0 }, cost: 0 })).toBe(0)
  })

  it('moreEfficient compares output-per-cost across any kinds (what competition selects)', () => {
    const cheap: Ledger = { kind: 'ai', output: { productivity: 10, creativity: 0 }, cost: 2 }
    const dear: Ledger = { kind: 'money', output: { productivity: 10, creativity: 0 }, cost: 5 }
    expect(moreEfficient(cheap, dear)).toBe(true)
    // creativity lifts output ⇒ raises efficiency at equal cost
    const creative: Ledger = { kind: 'ai', output: { productivity: 5, creativity: 5 }, cost: 2 }
    const rote: Ledger = { kind: 'ai', output: { productivity: 5, creativity: 0 }, cost: 2 }
    expect(moreEfficient(creative, rote)).toBe(true)
  })

  it('wasteFraction is the spend that produced no output — driven to 0 for every kind', () => {
    expect(wasteFraction(100, 100)).toBe(0)
    expect(wasteFraction(100, 60)).toBeCloseTo(0.4, 10)
    expect(wasteFraction(100, 120)).toBe(0) // clamped — productive cost can't exceed total
    expect(wasteFraction(0, 0)).toBe(0)
  })

  it('costEntry accounts for a cost as a balanced double-entry (resource credited, output debited)', () => {
    const l: Ledger = { kind: 'energy', output: { productivity: 10, creativity: 0 }, cost: 42 }
    const entry = costEntry(l)
    expect(isBalanced(entry)).toBe(true) // Σdebit = Σcredit — accounted in all directions
    expect(net(entry)).toBe(0)
    expect(entry.lines.find((line) => line.accountable === 'resource:energy')?.credit).toBe(42)
    expect(entry.lines.find((line) => line.accountable === 'output')?.debit).toBe(42)
  })
})

describe('cost — the harmonic floors (D · D/2 · D/3, the first three harmonics)', () => {
  it('the floors are the harmonic series of the digest width, strictly descending', () => {
    const [h1, h2, h3] = harmonicFloors(256)
    expect(h1).toBe(256) // 1st harmonic: classical second-preimage
    expect(h2).toBe(128) // 2nd (octave): classical collision = Grover preimage
    expect(h3).toBeCloseTo(256 / 3, 6) // 3rd: BHT quantum collision — the lowest
    expect(h1).toBeGreaterThan(h2)
    expect(h2).toBeGreaterThan(h3)
  })

  it('the 2nd harmonic is the octave (D/2) — classical collision and Grover preimage meet there', () => {
    expect(secondPreimageLog2(106)).toBe(106)
    expect(birthdayLog2(106)).toBe(53)
    expect(groverPreimageLog2(106)).toBe(53) // same value, distinct threat (the merge at the octave)
  })

  it('the quantum (BHT) floor is the lowest — the missing cross, the 3rd harmonic D/3', () => {
    expect(bhtCollisionLog2(106)).toBeCloseTo(106 / 3, 6)
    expect(quantumFloorLog2(256)).toBeCloseTo(256 / 3, 6)
    expect(bhtCollisionLog2(106)).toBeLessThan(birthdayLog2(106)) // D/3 < D/2
  })
})
