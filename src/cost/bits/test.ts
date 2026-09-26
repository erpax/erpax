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

/**
 * The tiling laws, and a pin that is REAL.
 *
 * This file's own history records two numbers that survived because nothing contradicted them —
 * a typed 106, and a mirror claiming a pin that did not exist. TORUS_BITS is mirrored rather than
 * imported (the import would add a tangle edge), so the assertion below is the whole of its safety.
 */
describe('cost/bits — the digest tiles the uuid and the torus, wholly', () => {
  it('TORUS_BITS equals the architecture it mirrors — the pin, not a claim of one', async () => {
    const { TORUS_BITS } = await import('@/cost/bits')
    const { architectureBits } = await import('@/quantum/word')
    expect(TORUS_BITS).toBe(architectureBits())
  })

  it('a content digest is exactly two uuids and four boards', async () => {
    const m = await import('@/cost/bits')
    expect(m.DIGEST_IN_UUIDS).toBe(2)
    expect(m.DIGEST_IN_BOARDS).toBe(4)
    expect(Number.isInteger(m.DIGEST_IN_UUIDS)).toBe(true)
    expect(Number.isInteger(m.DIGEST_IN_BOARDS)).toBe(true)
    expect(m.CONTENT_DIGEST_BITS % m.TORUS_BITS).toBe(0)
  })

  it('and one uuid is the DOUBLE torus — which is why the fold has two halves', async () => {
    const m = await import('@/cost/bits')
    const { combineArchitectures, architectureMask } = await import('@/quantum/word')
    expect(m.UUID_IN_BOARDS).toBe(2)
    // the packed word is exactly UUID_IN_BOARDS × TORUS_BITS wide at its maximum
    const full = architectureMask()
    const packed = combineArchitectures(full, full)
    expect(packed.toString(2).length).toBe(m.UUID_IN_BOARDS * m.TORUS_BITS)
  })

  it('truncation costs the difference, and the number is no longer typed', async () => {
    const m = await import('@/cost/bits')
    expect(m.TRUNCATION_COST_BITS).toBe(m.CONTENT_DIGEST_BITS - m.ERPAX_DIGEST_BITS)
    expect(m.TRUNCATION_COST_BITS).toBe(134) // the figure the prose carried, now derived
    // the version and variant bits are exactly what the uuid spends on looking like a uuid
    expect(m.ERPAX_DIGEST_BITS).toBe(122)
    expect(128 - m.ERPAX_DIGEST_BITS).toBe(6)
  })

  it('and the floors follow the commitment, not the address', async () => {
    const m = await import('@/cost/bits')
    // committing the full digest beats the uuid's own second-preimage; truncating halves it and more
    expect(m.secondPreimageLog2(m.CONTENT_DIGEST_BITS)).toBeGreaterThan(m.ERPAX_DIGEST_BITS)
    expect(m.birthdayLog2(m.ERPAX_DIGEST_BITS)).toBe(61)
    expect(m.birthdayLog2(m.CONTENT_DIGEST_BITS)).toBe(128)
  })
})
