import { describe, it, expect } from 'vitest'
import Messages from '@/messages'

// Unified-node invariant test for the `messages` collection.
describe('messages collection node', () => {
  it('exports a valid collection config', () => {
    expect(Messages.slug).toBe('messages')
    expect(Array.isArray(Messages.fields)).toBe(true)
    expect(Messages.fields.length).toBeGreaterThan(0)
  })
})
