import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { atomPath } from './index'

describe('cross/index', () => {
  it('reciprocal cross path', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })
})
