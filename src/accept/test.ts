import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { accept } from './index'

describe('accept', () => {
  it('exports canonical vocabulary face', () => {
    expect(accept).toBe(atomAddress(import.meta.url).path)
  })
})
