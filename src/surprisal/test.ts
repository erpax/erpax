import { describe, it, expect } from 'vitest'
import { surprisal, nats } from '@/surprisal'

// Self-information in bits. Tests assert the RELATIONS — zero at certainty,
// 1 bit at a coin flip, additivity, the nats conversion — never a magic number.
const rel = (a: number, b: number): number => Math.abs(a - b) / Math.abs(b)

describe('surprisal: I(p) = −log₂ p', () => {
  it('a certainty carries zero bits; a fair coin carries exactly one', () => {
    expect(surprisal(1)).toBe(0)
    expect(surprisal(0.5)).toBe(1)
    expect(surprisal(0.25)).toBe(2)
  })

  it('rarer is more surprising (monotone decreasing in p)', () => {
    expect(surprisal(1e-6)).toBeGreaterThan(surprisal(0.5))
  })

  it('independent improbabilities stack: I(p·q) = I(p) + I(q)', () => {
    expect(rel(surprisal((1 / 8) * (1 / 4)), surprisal(1 / 8) + surprisal(1 / 4))).toBeLessThan(1e-12)
  })

  it('nats is the natural-log form: bits = nats / ln2', () => {
    for (const p of [0.5, 0.1, 0.9]) expect(rel(surprisal(p), nats(p) / Math.LN2)).toBeLessThan(1e-12)
  })

  it('a probability outside (0,1] is not an event', () => {
    expect(() => surprisal(0)).toThrow()
    expect(() => surprisal(1.5)).toThrow()
  })
})
