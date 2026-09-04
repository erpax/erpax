import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { award } from './index'

describe('award', () => {
  it('exports canonical vocabulary face', () => {
    expect(award).toBe(atomAddress(import.meta.url).path)
  })
})
