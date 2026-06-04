import { describe, it, expect } from 'vitest'
import CarbonEmissions from '@/fiscal/periods/carbon/emissions'

// Unified-node invariant test for the `carbon-emissions` collection.
describe('carbon-emissions collection node', () => {
  it('exports a valid collection config', () => {
    expect(CarbonEmissions.slug).toBe('carbon-emissions')
    expect(Array.isArray(CarbonEmissions.fields)).toBe(true)
    expect(CarbonEmissions.fields.length).toBeGreaterThan(0)
  })
})
