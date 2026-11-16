/**
 * Envelope encryption: a data key per content uuid, derived from the tenant's KEK, never stored.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard RFC 5869 HKDF
 */
import { describe, expect, it } from 'vitest'

import { randomBytes } from '@/utilities/crypto'
import type { ContentUuid } from '@/utilities/integrity/content'
import { decryptEnvelope, encryptEnvelope } from '@/utilities/integrity/envelope'

const uuid = '0f8e9d4a-6b1c-8e2f-9a3b-4c5d6e7f8091' as ContentUuid<{ amount: number }>
const plaintext = { amount: 1250 }

describe('integrity/envelope', () => {
  it('round-trips a record under its KEK', () => {
    const kek = randomBytes(32)
    const envelope = encryptEnvelope({ plaintext, uuid, kek, kid: 'k1' })
    expect(envelope).toMatchObject({ uuid, alg: 'AES-256-GCM', kid: 'k1' })
    expect(decryptEnvelope({ envelope, kek })).toEqual(plaintext)
  })

  it('draws a fresh IV for every seal', () => {
    const kek = randomBytes(32)
    expect(encryptEnvelope({ plaintext, uuid, kek, kid: 'k' }).sealed).not.toBe(encryptEnvelope({ plaintext, uuid, kek, kid: 'k' }).sealed)
  })

  it('refuses another KEK, another uuid, or an altered token', () => {
    const kek = randomBytes(32)
    const envelope = encryptEnvelope({ plaintext, uuid, kek, kid: 'k' })
    expect(() => decryptEnvelope({ envelope, kek: randomBytes(32) })).toThrow()
    const moved = { ...envelope, uuid: '1f8e9d4a-6b1c-8e2f-9a3b-4c5d6e7f8091' as typeof uuid }
    expect(() => decryptEnvelope({ envelope: moved, kek })).toThrow()
    const [iv, body, tag] = envelope.sealed.split('.') as [string, string, string]
    const altered = { ...envelope, sealed: `${iv}.${body.slice(0, -1)}${body.endsWith('A') ? 'B' : 'A'}.${tag}` }
    expect(() => decryptEnvelope({ envelope: altered, kek })).toThrow()
  })
})
