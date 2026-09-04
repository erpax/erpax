import { describe, it, expect } from 'vitest'
import { atomAddress } from '@/atom/address'
import { atomPath, wavesOf, timeoutOf } from '@/computer/quantum'

describe('computer/quantum — the reciprocal face', () => {
  it('names its path and reaches the machine in one hop', () => {
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
    expect(wavesOf(new Map([['a', []]])).length).toBe(1)
    expect(timeoutOf().minutes).toBe(3)
  })
})
