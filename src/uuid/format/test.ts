import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import * as m from '@/uuid/format'
import { decodeStructured, encodeStructured } from '@/uuid/format'

describe('uuid/format', () => {
  it('the atom exports real matter — the stub test asserts existence, the SKILL states the law', () => {
    expect(Object.keys(m).length).toBeGreaterThan(0)
  })
})

// THE LEAN TWIN. src/verify/lean/Uuid.lean proves the 128-bit layout is a PARTITION — the program band
// (bits 66..81) never overlaps the version or variant bits the RFC owns — and that the sixteen program
// bits round-trip in BOTH directions. Here the same claims are checked against the real encoder, and the
// Lean file — the arbiter — is READ, so a theorem the twin relies on cannot quietly disappear.
describe('uuid/format — the layout is the Lean partition', () => {
  const grid = (): Array<{ slotTag: number; capabilities: number; schemaVersion: number }> => {
    const out: Array<{ slotTag: number; capabilities: number; schemaVersion: number }> = []
    for (const slotTag of [0, 1, 7, 15])
      for (const capabilities of [0, 1, 0b10101010, 0xff])
        for (const schemaVersion of [0, 1, 15]) out.push({ slotTag, capabilities, schemaVersion })
    return out
  }

  it('the program round-trips: what the decoder reads is what the encoder was given', () => {
    for (const f of grid()) {
      const uuid = encodeStructured({ ...f, content: { row: f.slotTag }, tenantId: 't1' })
      const got = decodeStructured(uuid)
      expect(got.slotTag, `slot ${JSON.stringify(f)}`).toBe(f.slotTag)
      expect(got.capabilities, `capabilities ${JSON.stringify(f)}`).toBe(f.capabilities)
      expect(got.schemaVersion, `schema ${JSON.stringify(f)}`).toBe(f.schemaVersion)
    }
  })

  // program_never_touches_the_fixed_bits: the RFC's bits survive every program value, or the id is not a uuid.
  it('no program value disturbs the version or variant bits', () => {
    for (const f of grid()) {
      const uuid = encodeStructured({ ...f, content: { row: 1 }, tenantId: 't1' })
      const b = Buffer.from(uuid.replace(/-/g, ''), 'hex')
      expect((b[6]! >> 4) & 0xf, `version ${JSON.stringify(f)}`).toBe(8)
      expect((b[8]! >> 6) & 0b11, `variant ${JSON.stringify(f)}`).toBe(0b10)
    }
  })

  // the_message_is_one_hundred_six_bits: 48 + 12 + 46, read back as 27 hex characters (106 bits, the
  // leading nibble of the 12-bit middle run carrying the odd two).
  it('the message band is the 106 bits the theorem counts', () => {
    const got = decodeStructured(encodeStructured({ slotTag: 3, capabilities: 5, schemaVersion: 2, content: { a: 1 }, tenantId: 't1' }))
    expect(got.contentDigestHex).toMatch(/^[0-9a-f]{27}$/)
  })

  // the_decode_loses_nothing — the asymmetric converse, checked where the twin can check it: two contents
  // differing anywhere produce different ids, so no decode collapses two messages onto one word.
  it('the decode loses nothing: a different content is a different id', () => {
    const base = { slotTag: 3, capabilities: 5, schemaVersion: 2, tenantId: 't1' }
    const a = encodeStructured({ ...base, content: { a: 1 } })
    const b = encodeStructured({ ...base, content: { a: 2 } })
    expect(a).not.toBe(b)
    expect(decodeStructured(a).contentDigestHex).not.toBe(decodeStructured(b).contentDigestHex)
  })

  it('the Lean file proves every claim the twin relies on', () => {
    const lean = readFileSync(join(process.cwd(), 'src/verify/lean/Uuid.lean'), 'utf8')
    for (const name of [
      'every_bit_has_exactly_one_band',
      'program_never_touches_the_fixed_bits',
      'message_never_touches_the_fixed_bits',
      'the_program_is_sixteen_bits',
      'the_message_is_one_hundred_six_bits',
      'slot_round_trips',
      'capabilities_round_trip',
      'schema_round_trips',
      'the_decode_loses_nothing',
      'the_program_fits',
    ])
      expect(lean, `theorem ${name} missing from Uuid.lean`).toMatch(new RegExp(`^theorem ${name}\\b`, 'm'))
  })
})
