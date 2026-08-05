import { describe, it, expect } from 'vitest'
import { isClosed, THEOREMS } from '../constants'

describe('algebra/operations', () => {
  it('doubling is closed', () => {
    expect(isClosed(THEOREMS[0]!)).toBe(true)
  })
})
