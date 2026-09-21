import { describe, expect, it } from 'vitest'
import {
  STRUCTURING_BAND,
  STRUCTURING_WINDOW_MS,
  SUSPICION_DELAY_MS,
  assertSuspicionHolds,
  holdBeforeExecuting,
  justBelow,
  reportOwed,
  structuring,
  type Movement,
} from '@/aml'

const T = 10000
const HOUR = 60 * 60 * 1000
const at = (h: number): number => Date.UTC(2026, 8, 20, h)

describe('aml — a suspicion report outranks every amount, because Art. 33 has no de-minimis', () => {
  it('reports a sanctioned counterparty on a trivial amount', () => {
    const m: Movement[] = [{ amount: 12, at: at(9), sanctioned: true }]
    expect(reportOwed({ movements: m, threshold: T })).toBe('suspicious')
  })

  it('reports an analyst’s recorded suspicion — a human finding is an input, not an output', () => {
    const m: Movement[] = [{ amount: 50, at: at(9), flagged: true }]
    expect(reportOwed({ movements: m, threshold: T })).toBe('suspicious')
  })

  it('holds a suspicious movement before executing, and only a suspicious one', () => {
    expect(holdBeforeExecuting('suspicious')).toBe(true)
    expect(holdBeforeExecuting('threshold')).toBe(false)
    expect(holdBeforeExecuting('none')).toBe(false)
  })
})

describe('aml — structuring needs all three conditions, or it is ordinary business', () => {
  it('is just-below only inside the declared band', () => {
    expect(justBelow(T * STRUCTURING_BAND, T)).toBe(true)
    expect(justBelow(T - 1, T)).toBe(true)
    expect(justBelow(T, T)).toBe(false) // at the threshold is over it, not below
    expect(justBelow(T * STRUCTURING_BAND - 1, T)).toBe(false) // outside the band
  })

  it('needs TWO or more — one movement below a threshold is ordinary business', () => {
    expect(structuring([{ amount: 9500, at: at(9) }], T)).toBe(false)
  })

  it('needs the near movements to CLEAR the threshold together', () => {
    // 9,500 alone never clears; two of them do.
    expect(structuring([{ amount: 9500, at: at(9) }, { amount: 9500, at: at(11) }], T)).toBe(true)
  })

  it('needs them inside one window — a pair days apart is not a pattern', () => {
    const outside: Movement[] = [
      { amount: 9500, at: at(9) },
      { amount: 9500, at: at(9) + STRUCTURING_WINDOW_MS + HOUR },
    ]
    expect(structuring(outside, T)).toBe(false)
  })

  it('is measured over real time, never over row order', () => {
    const shuffled: Movement[] = [
      { amount: 9600, at: at(20) },
      { amount: 9600, at: at(2) },
    ]
    // 18h apart, inside the 24h window, whichever order the rows arrive in.
    expect(structuring(shuffled, T)).toBe(true)
  })

  it('classifies structuring as SUSPICIOUS, never as a threshold declaration', () => {
    const m: Movement[] = [{ amount: 9500, at: at(9) }, { amount: 9500, at: at(11) }]
    expect(reportOwed({ movements: m, threshold: T })).toBe('suspicious')
  })
})

describe('aml — what `none` means, stated where it cannot be missed', () => {
  it('declares a plain movement at or over the threshold', () => {
    expect(reportOwed({ movements: [{ amount: T, at: at(9) }], threshold: T })).toBe('threshold')
    expect(reportOwed({ movements: [{ amount: T - 1, at: at(9) }], threshold: T })).toBe('none')
  })

  it('returns none when NO TRIGGER FIRED — which is not a finding that the money is clean', () => {
    const ordinary: Movement[] = [{ amount: 40, at: at(9) }, { amount: 120, at: at(10) }]
    expect(reportOwed({ movements: ordinary, threshold: T })).toBe('none')
    expect(reportOwed({ movements: [], threshold: T })).toBe('none')
  })
})

describe('aml — Art. 33(1) as a fail-closed check', () => {
  it('holds on the live atom, and the delay is zero', () => {
    expect(() => assertSuspicionHolds()).not.toThrow()
    expect(SUSPICION_DELAY_MS).toBe(0)
  })

  it('a THRESHOLD declaration does not hold the payment — and the gate must not demand it', () => {
    // Art. 33(1) asks a firm to refrain from carrying out a transaction it SUSPECTS. A threshold
    // declaration is an obligation to report, not to stop a lawful payment. The first version of
    // the assert demanded a hold for every reporting kind, which would have encoded a false
    // statement about the directive into a gate.
    expect(holdBeforeExecuting('threshold')).toBe(false)
    expect(holdBeforeExecuting('suspicious')).toBe(true)
    expect(holdBeforeExecuting('none')).toBe(false)
  })
})
