import { describe, it, expect } from 'vitest'
import FairValueMeasurements from '@/collections/fair-value-measurements'

// Unified-node invariant test for the `fair-value-measurements` collection.
describe('fair-value-measurements collection node', () => {
  it('exports a valid collection config', () => {
    expect(FairValueMeasurements.slug).toBe('fair-value-measurements')
    expect(Array.isArray(FairValueMeasurements.fields)).toBe(true)
    expect(FairValueMeasurements.fields.length).toBeGreaterThan(0)
  })
  it('names its source by one polymorphic relationship, not a slug and an id as text', () => {
    const names = FairValueMeasurements.fields.flatMap((x) => ('name' in x ? [x.name] : []))
    expect(names).not.toContain('sourceCollection')
    expect(names).not.toContain('sourceId')
    const source = FairValueMeasurements.fields.find((x) => 'name' in x && x.name === 'source') as { type?: string; relationTo?: unknown; required?: boolean }
    expect(source.type).toBe('relationship')
    expect(source.relationTo).toEqual(["fixed-assets","investment-properties","biological-assets","fx-transactions","share-based-payments"])
    expect(source.required).toBe(true)
  })
})
