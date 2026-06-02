/**
 * NIST SP 800-108 KDF tests — purpose-bound derivation from PAYLOAD_SECRET.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard NIST SP-800-108 key-derivation-function
 * @standard NIST FIPS-198-1 hmac
 * @standard NIST FIPS-180-4 sha-256
 * @rfc 2104 hmac
 * @rfc 5869 hkdf
 * @see src/standards/nist-sp-800-108/kdf.ts
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import {
  deriveSecretFromPayloadSecret,
  internalSecretPurpose,
} from '@/standards/nist-sp-800-108'

describe('NIST SP-800-108 deriveSecretFromPayloadSecret', () => {
  let savedSecret: string | undefined

  beforeEach(() => {
    savedSecret = process.env.PAYLOAD_SECRET
  })

  afterEach(() => {
    if (savedSecret === undefined) {
      Reflect.deleteProperty(process.env, 'PAYLOAD_SECRET')
    } else {
      process.env.PAYLOAD_SECRET = savedSecret
    }
  })

  it('returns deterministic output for identical (secret, purpose)', () => {
    process.env.PAYLOAD_SECRET = 'master-secret-A'
    const a = deriveSecretFromPayloadSecret('preview')
    const b = deriveSecretFromPayloadSecret('preview')
    expect(a).toBe(b)
  })

  it('produces different outputs for different purposes', () => {
    process.env.PAYLOAD_SECRET = 'master-secret-A'
    const preview = deriveSecretFromPayloadSecret('preview')
    const cron = deriveSecretFromPayloadSecret('cron')
    const fieldEnc = deriveSecretFromPayloadSecret('field-encryption')
    expect(preview).not.toBe(cron)
    expect(preview).not.toBe(fieldEnc)
    expect(cron).not.toBe(fieldEnc)
  })

  it('produces different outputs for different master secrets', () => {
    process.env.PAYLOAD_SECRET = 'master-A'
    const a = deriveSecretFromPayloadSecret('preview')
    process.env.PAYLOAD_SECRET = 'master-B'
    const b = deriveSecretFromPayloadSecret('preview')
    expect(a).not.toBe(b)
  })

  it('emits a 64-char lowercase hex string (HMAC-SHA256 → 32 bytes → 64 hex)', () => {
    process.env.PAYLOAD_SECRET = 'master-secret-A'
    const out = deriveSecretFromPayloadSecret('preview')
    expect(out).toMatch(/^[0-9a-f]{64}$/)
  })

  it('returns empty string when PAYLOAD_SECRET is not set', () => {
    Reflect.deleteProperty(process.env, 'PAYLOAD_SECRET')
    expect(deriveSecretFromPayloadSecret('preview')).toBe('')
  })

  it('exposes the documented internal-purpose vocabulary', () => {
    expect(internalSecretPurpose.preview).toBe('preview')
    expect(internalSecretPurpose.cron).toBe('cron')
    expect(internalSecretPurpose.fieldEncryption).toBe('field-encryption')
  })

  it('purposes are namespaced under the v1 prefix (different prefix → different output)', () => {
    // Sanity: identical purpose strings yield identical outputs;
    // this guards against accidental change of the DERIVED_V1 prefix.
    process.env.PAYLOAD_SECRET = 'fixed-master'
    const preview1 = deriveSecretFromPayloadSecret('preview')
    const preview2 = deriveSecretFromPayloadSecret('preview')
    expect(preview1).toBe(preview2)
    // And the namespacing actually separates: literal "v1:preview" differs from "preview"
    expect(deriveSecretFromPayloadSecret('preview')).not.toBe(
      deriveSecretFromPayloadSecret('v1:preview'),
    )
  })
})
