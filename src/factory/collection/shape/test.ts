import { describe, it, expect } from 'vitest'
import type { Field } from 'payload'
import { collectionSignature, shapeCatalogue, shapeRatchetVerdict, SHAPE_AXES, ROSETTA_BASELINE } from './index'

const money: Field[] = [{ name: 'amount', type: 'number' } as Field]

describe('factory/collection/shape — a new table needs a new shape', () => {
  it('scores a collection onto the closed basis, never outside it', () => {
    const sig = collectionSignature({ fields: money })
    expect(sig.length).toBeGreaterThan(0)
    for (const axis of sig) expect(SHAPE_AXES).toContain(axis)
  })

  it('two collections of the same shape share ONE signature — that is the collapse candidate', () => {
    const cat = shapeCatalogue([
      { slug: 'a', fields: money },
      { slug: 'b', fields: money },
    ])
    expect(cat.collections).toBe(2)
    expect(cat.basisOccupancy).toBe(1)
    expect([...cat.signatures.values()][0]).toEqual(['a', 'b'])
  })

  it('the ratchet FAILS CLOSED on basis growth — a ceiling that only warns is prose', () => {
    const grown = shapeRatchetVerdict(
      { collections: ROSETTA_BASELINE.collections, basisOccupancy: ROSETTA_BASELINE.signatures + 1 },
      ROSETTA_BASELINE,
    )
    expect(grown.ok).toBe(false)
    const held = shapeRatchetVerdict(
      { collections: ROSETTA_BASELINE.collections, basisOccupancy: ROSETTA_BASELINE.signatures },
      ROSETTA_BASELINE,
    )
    expect(held.ok).toBe(true)
  })
})
