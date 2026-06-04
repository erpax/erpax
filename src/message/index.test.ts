/**
 * Message — the uuid IS the message, asserted from the code. Green by construction.
 * @see ./index.ts, ../localize (decodeIdentity), ../signal (NOTES)
 */
import { describe, it, expect } from 'vitest'
import { encodeStructured } from '@/uuid/format'
import { HORO_DIGITS } from '@/horo'
import { decodeMessage, horoStepOf } from '@/message'

const mk = (content: unknown, tenantId = 't1') =>
  encodeStructured({ slotTag: 1, capabilities: 0, schemaVersion: 1, content, tenantId })

const uuid = mk({ hello: 'world' })

describe('message: the uuid IS the message — self-decoding, no payload', () => {
  it('decodeMessage takes ONLY the uuid and yields the whole message', () => {
    const m = decodeMessage(uuid)
    expect(m.uuid).toBe(uuid)
    expect(m.oid.startsWith('2.25')).toBe(true) // OID dual (X.667)
    expect(['K', 'C', 'M', 'Y']).toContain(m.cmyk) // colour channel
    expect(m.sound.hz).toBeGreaterThan(0) // sound channel
    expect(HORO_DIGITS).toContain(m.sound.step)
    expect(m.levels).toContain('content-digest') // identity levels
  })
  it('is deterministic — same uuid ⇒ same message (no external state)', () => {
    expect(decodeMessage(uuid)).toEqual(decodeMessage(uuid))
  })
  it('the sound position is deterministic and on the horo ring', () => {
    expect(horoStepOf(uuid)).toBe(horoStepOf(uuid))
    expect(HORO_DIGITS).toContain(horoStepOf(uuid))
  })
})

describe('message: same content ⇒ same uuid ⇒ same message (merge by design)', () => {
  it('two identical-content uuids decode to the identical message', () => {
    const a = mk({ x: 1 }, 't')
    const b = mk({ x: 1 }, 't')
    expect(a).toBe(b)
    expect(decodeMessage(a)).toEqual(decodeMessage(b))
  })
})
