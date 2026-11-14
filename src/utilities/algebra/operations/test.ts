import { describe, it, expect } from 'vitest'
import { THEOREMS } from '@/utilities/algebra/constants'
import { isClosed } from '@/utilities/algebra/operations'

describe('algebra/operations', () => {
  it('doubling is closed', () => {
    expect(isClosed(THEOREMS[0]!)).toBe(true)
  })
})
