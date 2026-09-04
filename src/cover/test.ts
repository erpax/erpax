import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { cover } from './index'

describe('cover', () => {
  it('exports canonical vocabulary face', () => {
    expect(cover).toBe(atomAddress(import.meta.url).path)
  })
})
