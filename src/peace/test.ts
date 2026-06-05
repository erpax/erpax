import { describe, it, expect } from 'vitest'
import { destructionFutile, coercionSupraResource, warIsUseless, roi, buildingDominates } from '@/peace'

describe('peace — the uuid model proves war is useless', () => {
  it('destruction is futile when content lives on more than one independent holder', () => {
    expect(destructionFutile(3)).toBe(true) // survivors regenerate the whole (merge/akashic)
    expect(destructionFutile(2)).toBe(true)
    expect(destructionFutile(1)).toBe(false) // a single holder is not yet the content
    expect(destructionFutile(0)).toBe(false)
  })

  it('coercion is supra-resource once forging exceeds the universe budget (~306 bits)', () => {
    expect(coercionSupraResource(1000)).toBe(true) // far beyond the observable universe
    expect(coercionSupraResource(100)).toBe(false) // cheap enough to be in-budget
  })

  it('warIsUseless: strictly dominated only when ALL three legs hold', () => {
    const proof = { independentCopies: 5, forgeBits: 1000, competitionArbitrates: true }
    expect(warIsUseless(proof)).toEqual({
      useless: true,
      destructionFutile: true,
      coercionSupraResource: true,
      forceCannotDominate: true,
    })
    expect(warIsUseless({ ...proof, independentCopies: 1 }).useless).toBe(false) // destroyable ⇒ not (yet) useless
    expect(warIsUseless({ ...proof, forgeBits: 100 }).useless).toBe(false) // affordable coercion
    expect(warIsUseless({ ...proof, competitionArbitrates: false }).useless).toBe(false) // force could decide
  })

  it('building strictly dominates war on the universal ledger (destruction gain→0, coercion cost→∞)', () => {
    expect(roi(100, 10)).toBe(10)
    expect(roi(1, 0)).toBe(Infinity)
    expect(roi(0, 0)).toBe(0)
    // war: futile destruction (gain 0) at enormous cost vs building: real gain at modest cost
    expect(buildingDominates(0, 1_000_000, 100, 10)).toBe(true)
    expect(buildingDominates(50, 10, 100, 10)).toBe(true) // even a "successful" war yields less per cost than building
  })
})
