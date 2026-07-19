import { describe, it, expect } from 'vitest'
import { atomPath, wavesOf, timeoutOf } from '@/computer/quantum'

describe('computer/quantum — the reciprocal face', () => {
  it('names its path and reaches the machine in one hop', () => {
    expect(atomPath).toBe('computer/quantum')
    expect(wavesOf(new Map([['a', []]])).length).toBe(1)
    expect(timeoutOf().minutes).toBe(3)
  })
})
