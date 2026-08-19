import { describe, it, expect } from 'vitest'
import { sortUnique } from './index'

describe('skill/router/upgrade/graph', () => {
  it('sortUnique de-duplicates, drops empties, and sorts', () => {
    expect(sortUnique(['b', 'a', 'b', '', 'a'])).toEqual(['a', 'b'])
  })
})
