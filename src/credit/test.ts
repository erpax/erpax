import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { credit } from './index'

describe('credit', () => {
  it('exports canonical vocabulary face', () => {
    expect(credit).toBe(atomAddress(import.meta.url).path)
  })
})
