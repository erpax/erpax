import { describe, it, expect } from 'vitest'
import { CONFIRM_GATE_CHECKS } from './index'
import { randomBytes } from 'node:crypto'
import { toUuid } from '@/uuid/matrix'
import { nameUuid } from '@/integrity/content'
import { ERPAX_DIGEST_BITS, CONTENT_DIGEST_BITS } from './index'

/**
 * THE TOOL THAT FOUND THE DEFECT, KEPT AS THE PROOF.
 *
 * `ERPAX_DIGEST_BITS` was TYPED as 106, with its own arithmetic in the comment — "48 + 12 + 46 bits of
 * SHA-256". The sum is self-consistent, so nothing contradicted it; but v8's last field is 62 bits, not 46.
 * One field, 16 bits short, became a security constant for four consumers and the premise of "the truncated
 * uuid's collision floor is only 2^53".
 *
 * A number you cannot re-derive is a number you cannot trust. This measures the LIVE primitive and pins the
 * derivation to it. It was a throwaway script when it found this; a measurement run once and deleted is a
 * number nobody can re-check — which is how 106 survived in the first place.
 */
const freeBits = (gen: (i: number) => string, N = 20_000): number => {
  const ones = new Array(128).fill(0)
  for (let i = 0; i < N; i++) {
    const b = Buffer.from(gen(i).replace(/-/g, ''), 'hex')
    for (let k = 0; k < 128; k++) if ((b[k >> 3]! >> (7 - (k & 7))) & 1) ones[k]++
  }
  // a bit that NEVER varies across 20k content-distinct inputs carries no content
  return 128 - ones.filter((c) => c === 0 || c === N).length
}

const NS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'

describe('cost/bits — the digest width is derived, and the primitive agrees', () => {
  it('the derivation is the RFC layout: 128 − 4 (version) − 2 (variant)', () => {
    expect(ERPAX_DIGEST_BITS).toBe(122)
    expect(ERPAX_DIGEST_BITS).not.toBe(106) // typed, self-consistent, and 16 bits wrong
  })

  it('uuid/matrix toUuid measures exactly the derived width', () => {
    expect(freeBits(() => toUuid(randomBytes(32)))).toBe(ERPAX_DIGEST_BITS)
  }, 60_000)

  it('integrity/content nameUuid measures the same — one law, two primitives', () => {
    expect(freeBits((i) => nameUuid(NS, `x${i}${randomBytes(8).toString('hex')}`))).toBe(ERPAX_DIGEST_BITS)
  }, 60_000)

  it('the collision floor is 2^61 — the honest tamper-cost of a truncated address', () => {
    expect(ERPAX_DIGEST_BITS / 2).toBe(61) // was claimed 2^53 on the typed 106
  })

  // The truncation, priced. sha256 gives 256 bits; the uuid keeps 122 so the address can LOOK like a UUID.
  it('truncation costs 134 bits — paid for a display format', () => {
    expect(CONTENT_DIGEST_BITS - ERPAX_DIGEST_BITS).toBe(134)
    expect(CONTENT_DIGEST_BITS / 2).toBeGreaterThan(ERPAX_DIGEST_BITS / 2) // why the anchor commits FULL
  })
})

describe('the mirror is PINNED — a typed count that nothing contradicts is how 106 survived', () => {
  it('CONFIRM_GATE_CHECKS equals the axes the gate actually runs', async () => {
    const { CONFIRM_CHECK_AXES } = await import('@/confirm/matter')
    // A TEST may import both; production code may not, because the edge would join the 225-file
    // tangle (rules/cycle). That is what makes this the right place for the pin rather than an
    // argument for deriving the constant across the boundary.
    expect(CONFIRM_GATE_CHECKS).toBe(CONFIRM_CHECK_AXES.length)
  })

  it('and the number is the one the gate reports, not one anyone typed', async () => {
    const { CONFIRM_CHECK_AXES } = await import('@/confirm/matter')
    expect(CONFIRM_CHECK_AXES.length).toBeGreaterThan(0)
    expect(new Set(CONFIRM_CHECK_AXES).size).toBe(CONFIRM_CHECK_AXES.length) // no axis counted twice
  })
})
