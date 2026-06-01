import { describe, it, expect } from 'vitest'
import Batches from './index'

describe('batches collection node', () => {
  it('exports a valid collection config', () => {
    expect(Batches.slug).toBe('batches')
    expect(Array.isArray(Batches.fields)).toBe(true)
    expect(Batches.fields.length).toBeGreaterThan(0)
  })
})
