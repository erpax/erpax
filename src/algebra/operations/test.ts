import { describe, it, expect } from 'vitest'
import { THEOREMS } from '../constants'
import { isClosed } from './index'

describe('algebra/operations', () => {
  it('doubling is closed', () => {
    expect(isClosed(THEOREMS[0]!)).toBe(true)
  })
})
