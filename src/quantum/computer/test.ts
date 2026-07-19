import { describe, it, expect } from 'vitest'
import {
  atomPath,
  wavesOf,
  timeoutOf,
  planScalpel,
  trendOf,
  sequenceOf,
  reduce,
  DECODED,
  TIMEOUT_LADDER_MINUTES,
  SCALPEL_BATCH,
} from '@/quantum/computer'

describe('quantum/computer — one face, seven organs', () => {
  it('names its path and carries every organ as a live binding', () => {
    expect(atomPath).toBe('quantum/computer')
    // one probe per organ family — pure calls, no corpus scan (the census is the CLI's job)
    expect(wavesOf(new Map([['a', ['b']], ['b', []]])).length).toBe(2) // scheduler
    expect(timeoutOf([10_000]).minutes).toBe(1) // bounds
    expect(planScalpel([]).refused).toBe(0) // executor
    expect(trendOf(5, 4)).toBe('improving') // self-measure
    expect(sequenceOf([])).toEqual([]) // self-measure
    expect(reduce('content-addressing: same content ⇒ same address', DECODED).reduces).toBe(true) // certifier
    expect([...TIMEOUT_LADDER_MINUTES]).toEqual([1, 2, 3, 5])
    expect(SCALPEL_BATCH).toBe(30)
  })
})
