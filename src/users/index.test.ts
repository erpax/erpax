import { describe, it, expect } from 'vitest'
import { Users } from '@/users'

// Unified-node invariant test for the `users` collection.
describe('users collection node', () => {
  it('exports a valid collection config', () => {
    expect(Users.slug).toBe('users')
    expect(Array.isArray(Users.fields)).toBe(true)
    expect(Users.fields.length).toBeGreaterThan(0)
  })
})
