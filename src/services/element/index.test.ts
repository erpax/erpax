import { describe, it, expect } from 'vitest'
import { ELEMENTS, shellCapacity, valenceElectrons, isStable, bondsNeeded, forms, corpusStable, type Element } from './index'

const el = (symbol: string): Element => ELEMENTS.find((e) => e.symbol === symbol)!

describe('element — the periodic matrix as a logic of composition (corpus = molecule)', () => {
  it('the matrix is periods 1-3 with unique, contiguous atomic numbers', () => {
    expect(ELEMENTS).toHaveLength(18)
    expect(ELEMENTS.map((e) => e.z)).toEqual(Array.from({ length: 18 }, (_, i) => i + 1))
  })

  it('valence electrons: group for main groups, with the period-1 duet (H=1, He=2)', () => {
    expect(valenceElectrons(el('H'))).toBe(1)
    expect(valenceElectrons(el('He'))).toBe(2)
    expect(valenceElectrons(el('C'))).toBe(4)
    expect(valenceElectrons(el('O'))).toBe(6)
    expect(valenceElectrons(el('Ne'))).toBe(8)
    expect(valenceElectrons(el('Na'))).toBe(1)
    expect(shellCapacity(1)).toBe(2)
    expect(shellCapacity(2)).toBe(8)
  })

  it('octet stability: the noble gases are full shells, everything else seeks bonds', () => {
    for (const noble of ['He', 'Ne', 'Ar']) {
      expect(isStable(el(noble))).toBe(true)
      expect(bondsNeeded(el(noble))).toBe(0)
    }
    expect(isStable(el('H'))).toBe(false)
    expect(bondsNeeded(el('H'))).toBe(1)
    expect(bondsNeeded(el('C'))).toBe(4)
    expect(bondsNeeded(el('O'))).toBe(2)
    expect(bondsNeeded(el('N'))).toBe(3)
  })

  it('forms: two reactive atoms bond; a noble gas bonds with nothing', () => {
    expect(forms(el('H'), el('O'))).toBe(true) // water-like
    expect(forms(el('C'), el('O'))).toBe(true)
    expect(forms(el('Ne'), el('O'))).toBe(false) // noble gas is inert
  })

  it('the corpus is a molecule: stable exactly when aura gap = 0 (all shells full)', () => {
    expect(corpusStable(0)).toBe(true)
    expect(corpusStable(1)).toBe(false) // a dead link is an unfilled valence
  })
})
