import { describe, it, expect } from 'vitest'
import {
  totalOutput,
  efficiency,
  moreEfficient,
  wasteFraction,
  costEntry,
  harmonicFloors,
  bhtCollisionLog2,
  type Ledger,
} from '@/cost'
import { imperialRatio } from '@/horo'
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

  it('harmonic floors use exact rationals — D, D/2, D/3 (third harmonic)', () => {
    const d = 256
    const [preimage, birthday, bht] = harmonicFloors(d)
    expect(preimage).toBe(d)
    expect(birthday).toBe(d / 2)
    expect(bht).toBe(d / 3)
    expect(bhtCollisionLog2(d)).toBe(imperialRatio(d, 3))
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
