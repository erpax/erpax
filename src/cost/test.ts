import { describe, it, expect } from 'vitest'
import { totalOutput, efficiency, moreEfficient, wasteFraction, costEntry, type Ledger } from '@/cost'
import {
  secondPreimageLog2,
  birthdayLog2,
  bhtCollisionLog2,
  groverPreimageLog2,
  quantumFloorLog2,
  harmonicFloors,
  manualDevelopmentPrice,
  promptOnlyOptionVerdict,
  MANUAL_IMPOSSIBLE_RATIO,
  ERPAX_DIGEST_BITS,
} from '@/cost'
import { RODIN_FLOW_RATIO } from '@/rodin'
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

describe('cost — manual development price (forge ≫ verify)', () => {
  it('computed derive path is cheaper to verify than manual forge', () => {
    const derived = manualDevelopmentPrice({ corpusCoverage: 0.99, nodes: 2200, manualPath: false })
    const manual = manualDevelopmentPrice({ corpusCoverage: 0.99, nodes: 2200, manualPath: true })
    expect(derived.verifyCost).toBeLessThan(manual.verifyCost)
    expect(manual.forgeCost).toBeGreaterThan(derived.forgeCost)
    expect(manual.ratio).toBeGreaterThan(derived.ratio)
    expect(manual.forgeCost).toBeGreaterThan(manual.verifyCost)
  })

  it('manual bypass and unsealed work are impossible — infinite forge price', () => {
    expect(manualDevelopmentPrice({ corpusCoverage: 0.5, manualBypass: true }).impossible).toBe(true)
    expect(manualDevelopmentPrice({ corpusCoverage: 0.5, unsealed: true }).forgeCost).toBe(Number.POSITIVE_INFINITY)
    expect(manualDevelopmentPrice({ corpusCoverage: 1, manualPath: true }).impossible).toBe(true)
  })

  it('forge ≫ verify at realistic corpus coverage — digest-floor impossible', () => {
    const p = manualDevelopmentPrice({ corpusCoverage: 0.999, nodes: 2200, checks: 20, manualPath: true })
    expect(p.forgeCost).toBeGreaterThan(p.verifyCost)
    expect(p.forgeCost).toBeGreaterThanOrEqual(MANUAL_IMPOSSIBLE_RATIO)
    expect(p.impossible).toBe(true)
  })

  it('society rodin split — computed verify uses 2/3 flow discount', () => {
    const computed = manualDevelopmentPrice({ corpusCoverage: 0.9, nodes: 100, manualPath: false })
    const manual = manualDevelopmentPrice({ corpusCoverage: 0.9, nodes: 100, manualPath: true })
    expect(computed.verifyCost).toBeCloseTo((Math.log2(100) + 8) * RODIN_FLOW_RATIO, 10)
    expect(manual.forgeCost).toBeGreaterThan(secondPreimageLog2(ERPAX_DIGEST_BITS) / 3)
  })

  it('manual SKILL frontmatter edit raises forge cost — upgrade verify fails without recompute', () => {
    const plain = manualDevelopmentPrice({ corpusCoverage: 0.95, manualPath: true })
    const drifted = manualDevelopmentPrice({ corpusCoverage: 0.95, manualPath: true, manualSkillEdit: true })
    expect(drifted.forgeCost).toBeGreaterThan(plain.forgeCost)
  })
})

describe('cost — promptOnlyOptionVerdict (prompt→erpax when manual impossible)', () => {
  it('when manual forge is impossible, promptOnly is true and viablePath is prompt-erpax', () => {
    const v = promptOnlyOptionVerdict({ corpusCoverage: 0.999, nodes: 2200, checks: 20, manualPath: true })
    expect(v.price.impossible).toBe(true)
    expect(v.promptOnly).toBe(true)
    expect(v.viablePath).toBe('prompt-erpax')
    expect(v.reason).toMatch(/prompt→erpax/)
  })

  it('manual bypass forces prompt-only — unsealed hand-edits never persist', () => {
    const v = promptOnlyOptionVerdict({ corpusCoverage: 0.5, manualBypass: true })
    expect(v.promptOnly).toBe(true)
    expect(v.viablePath).toBe('prompt-erpax')
  })

  it('computed derive path is derive-record — not prompt-only', () => {
    const v = promptOnlyOptionVerdict({ corpusCoverage: 0.99, manualPath: false })
    expect(v.promptOnly).toBe(false)
    expect(v.viablePath).toBe('derive-record')
  })

  it('low-coverage manual forge remains finite — manual-forge still listed', () => {
    const v = promptOnlyOptionVerdict({ corpusCoverage: 0.5, nodes: 10, checks: 4, manualPath: true })
    expect(v.price.impossible).toBe(false)
    expect(v.promptOnly).toBe(false)
    expect(v.viablePath).toBe('manual-forge')
  })
})
