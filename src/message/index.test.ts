/**
 * Message — the uuid IS the message, asserted from the code. Green by construction.
 * @see ./index.ts, ../localize (decodeIdentity), ../signal (NOTES)
 */
import { describe, it, expect } from 'vitest'
import { encodeStructured } from '@/uuid/format'
import { HORO_DIGITS } from '@/horo'
import {
  decodeMessage,
  horoStepOf,
  splitWords,
  wordUuid,
  messageUuid,
  messageWords,
} from '@/message'
import { merge } from '@/uuid/matrix'

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

describe('message: encode — words in, uuid out (the messaging-uuid system)', () => {
  it('splits a message into its lowercase word-atoms', () => {
    expect(splitWords('Age IS a Dimension!')).toEqual(['age', 'is', 'a', 'dimension'])
    expect(splitWords('')).toEqual([])
  })
  it('is deterministic — same message ⇒ same uuid (no external state)', () => {
    expect(messageUuid('hello world')).toBe(messageUuid('hello world'))
  })
  it('a single-word message folds to that word\'s uuid', () => {
    expect(messageUuid('age')).toBe(wordUuid('age'))
  })
  it('a message uuid is the left-fold of its word uuids through merge', () => {
    const ids = ['hello', 'world'].map(wordUuid)
    expect(messageUuid('hello world')).toBe(merge(ids[0]!, ids[1]!))
  })
  it('decomposes to per-word uuids + atom-membership (feed for analysis)', () => {
    const parts = messageWords('age dimension')
    expect(parts.map((p) => p.word)).toEqual(['age', 'dimension'])
    expect(parts.every((p) => typeof p.uuid === 'string' && p.uuid.length === 36)).toBe(true)
    expect(parts.every((p) => typeof p.isAtom === 'boolean')).toBe(true)
  })
})
