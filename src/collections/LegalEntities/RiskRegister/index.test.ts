import { describe, it, expect } from 'vitest'
import { RiskRegister } from './index'

// Unified-node invariant test for the `risk-register` collection.
describe('risk-register collection node', () => {
  it('exports a valid collection config', () => {
    expect(RiskRegister.slug).toBe('risk-register')
    expect(Array.isArray(RiskRegister.fields)).toBe(true)
    expect(RiskRegister.fields.length).toBeGreaterThan(0)
  })
})
