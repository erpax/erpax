import { createHmac } from 'node:crypto'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { deriveSecretFromPayloadSecret, internalSecretPurpose } from '@/nist/sp/800/108'

// NIST SP 800-108 — HMAC counter-mode KDF. Single-secret custodianship:
// every internal key is HMAC-SHA256(PAYLOAD_SECRET, "erpax:derived:v1:<purpose>").
const DERIVED_V1 = 'erpax:derived:v1:'

describe('nist/sp/800/108 — purpose-bound HMAC-SHA256 key derivation', () => {
  const prior = process.env.PAYLOAD_SECRET

  beforeAll(() => {
    process.env.PAYLOAD_SECRET = 'unit-test-master-secret'
  })
  afterAll(() => {
    if (prior === undefined) delete process.env.PAYLOAD_SECRET
    else process.env.PAYLOAD_SECRET = prior
  })

  it('the named purposes are stable spec constants', () => {
    expect(internalSecretPurpose.preview).toBe('preview')
    expect(internalSecretPurpose.cron).toBe('cron')
    expect(internalSecretPurpose.fieldEncryption).toBe('field-encryption')
  })

  it('derivation is deterministic — same purpose yields the same key', () => {
    expect(deriveSecretFromPayloadSecret('preview')).toBe(deriveSecretFromPayloadSecret('preview'))
  })

  it('output is 64-char lowercase hex (HMAC-SHA256 = 32 bytes)', () => {
    const key = deriveSecretFromPayloadSecret('cron')
    expect(key).toMatch(/^[0-9a-f]{64}$/)
  })

  it('matches the exact HMAC-SHA256 construction over the versioned label', () => {
    const expected = createHmac('sha256', 'unit-test-master-secret')
      .update(DERIVED_V1 + 'field-encryption')
      .digest('hex')
    expect(deriveSecretFromPayloadSecret(internalSecretPurpose.fieldEncryption)).toBe(expected)
  })

  it('distinct purposes derive distinct keys (purpose isolation)', () => {
    const a = deriveSecretFromPayloadSecret('preview')
    const b = deriveSecretFromPayloadSecret('cron')
    const c = deriveSecretFromPayloadSecret('field-encryption')
    expect(new Set([a, b, c]).size).toBe(3)
  })

  it('the versioned prefix isolates the namespace (raw purpose != labelled)', () => {
    expect(deriveSecretFromPayloadSecret('preview')).not.toBe(
      createHmac('sha256', 'unit-test-master-secret').update('preview').digest('hex'),
    )
  })

  it('a rotated master secret changes every derived key', () => {
    const before = deriveSecretFromPayloadSecret('cron')
    process.env.PAYLOAD_SECRET = 'rotated-master-secret'
    try {
      expect(deriveSecretFromPayloadSecret('cron')).not.toBe(before)
    } finally {
      process.env.PAYLOAD_SECRET = 'unit-test-master-secret'
    }
  })

  it('returns empty string when no master secret is set (no insecure fallback)', () => {
    const saved = process.env.PAYLOAD_SECRET
    delete process.env.PAYLOAD_SECRET
    try {
      expect(deriveSecretFromPayloadSecret('preview')).toBe('')
    } finally {
      process.env.PAYLOAD_SECRET = saved
    }
  })
})
