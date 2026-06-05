import { describe, it, expect } from 'vitest'
import { BoardActions } from '@/legal/entities/board/actions'

// Unified-node invariant test for the `board-actions` collection.
describe('board-actions collection node', () => {
  it('exports a valid collection config', () => {
    expect(BoardActions.slug).toBe('board-actions')
    expect(Array.isArray(BoardActions.fields)).toBe(true)
    expect(BoardActions.fields.length).toBeGreaterThan(0)
  })
})
