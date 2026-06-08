import crypto from 'node:crypto'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import {
  PAYLOAD_SECRET_IDENTITY,
  PLATFORM_TENANT_ID,
  decryptIfUuid,
  identityUuidForContent,
  resolvePayloadSecret,
  resolveSealMasterKey,
  sealSecret,
} from '@/secret'

const TEST_SEAL_KEY = crypto.randomBytes(32)
const opts = { sealKey: TEST_SEAL_KEY }

describe('secret — seal at rest, decrypt iff uuid', () => {
  const priorSealKey = process.env.ERPAX_SEAL_KEY
  const priorPayload = process.env.PAYLOAD_SECRET
  const priorSealed = process.env.PAYLOAD_SECRET_SEALED

  beforeEach(() => {
    Reflect.deleteProperty(process.env, 'ERPAX_SEAL_KEY')
    Reflect.deleteProperty(process.env, 'PAYLOAD_SECRET')
    Reflect.deleteProperty(process.env, 'PAYLOAD_SECRET_SEALED')
  })

  afterEach(() => {
    if (priorSealKey === undefined) Reflect.deleteProperty(process.env, 'ERPAX_SEAL_KEY')
    else process.env.ERPAX_SEAL_KEY = priorSealKey
    if (priorPayload === undefined) Reflect.deleteProperty(process.env, 'PAYLOAD_SECRET')
    else process.env.PAYLOAD_SECRET = priorPayload
    if (priorSealed === undefined) Reflect.deleteProperty(process.env, 'PAYLOAD_SECRET_SEALED')
    else process.env.PAYLOAD_SECRET_SEALED = priorSealed
  })

  it('round-trips when presented uuid matches content identity', () => {
    const contextUuid = identityUuidForContent(PAYLOAD_SECRET_IDENTITY, PLATFORM_TENANT_ID)
    const sealed = sealSecret('vitest-only-secret-not-for-production', contextUuid, opts)
    const plain = decryptIfUuid(sealed, contextUuid, PAYLOAD_SECRET_IDENTITY, opts)
    expect(plain).toBe('vitest-only-secret-not-for-production')
  })

  it('fails closed when presented uuid does not match expected content', () => {
    const contextUuid = identityUuidForContent(PAYLOAD_SECRET_IDENTITY, PLATFORM_TENANT_ID)
    const sealed = sealSecret('vitest-only-secret-not-for-production', contextUuid, opts)
    const wrongUuid = identityUuidForContent({ purpose: 'other' }, PLATFORM_TENANT_ID)
    expect(() =>
      decryptIfUuid(sealed, wrongUuid, PAYLOAD_SECRET_IDENTITY, opts),
    ).toThrow(/uuid does not match expected content identity/)
  })

  it('fails closed when presented uuid does not match sealed contextUuid', () => {
    const contextUuid = identityUuidForContent(PAYLOAD_SECRET_IDENTITY, PLATFORM_TENANT_ID)
    const sealed = sealSecret('vitest-only-secret-not-for-production', contextUuid, opts)
    const otherUuid = identityUuidForContent({ purpose: 'payload-secret', scope: 'other' }, PLATFORM_TENANT_ID)
    expect(() =>
      decryptIfUuid(sealed, otherUuid, { purpose: 'payload-secret', scope: 'other' }, opts),
    ).toThrow(/sealed contextUuid does not match/)
  })

  it('fails when ciphertext is tampered (AES-GCM auth)', () => {
    const contextUuid = identityUuidForContent(PAYLOAD_SECRET_IDENTITY, PLATFORM_TENANT_ID)
    const sealed = sealSecret('vitest-only-secret-not-for-production', contextUuid, opts)
    const tampered = {
      ...sealed,
      ciphertext: sealed.ciphertext[0] === 'a' ? `b${sealed.ciphertext.slice(1)}` : `a${sealed.ciphertext.slice(1)}`,
    }
    expect(() =>
      decryptIfUuid(tampered, contextUuid, PAYLOAD_SECRET_IDENTITY, opts),
    ).toThrow(/AES-GCM authentication failed/)
  })

  it('resolveSealMasterKey requires ERPAX_SEAL_KEY when no test override', () => {
    expect(() => resolveSealMasterKey()).toThrow(/ERPAX_SEAL_KEY/)
  })

  it('identityUuidForContent hashes strings via uuid()', () => {
    const u1 = identityUuidForContent('fixture-string', PLATFORM_TENANT_ID)
    const u2 = identityUuidForContent('fixture-string', PLATFORM_TENANT_ID)
    expect(u1).toBe(u2)
    expect(u1).not.toBe(identityUuidForContent('other-string', PLATFORM_TENANT_ID))
  })

  it('resolvePayloadSecret prefers plain PAYLOAD_SECRET', () => {
    process.env.PAYLOAD_SECRET = 'plain-env-secret'
    expect(resolvePayloadSecret()).toBe('plain-env-secret')
  })

  it('resolvePayloadSecret decrypts PAYLOAD_SECRET_SEALED when identity matches', () => {
    process.env.ERPAX_SEAL_KEY = TEST_SEAL_KEY.toString('hex')
    const contextUuid = identityUuidForContent(PAYLOAD_SECRET_IDENTITY, PLATFORM_TENANT_ID)
    const sealed = sealSecret('sealed-boot-secret-fixture', contextUuid, opts)
    process.env.PAYLOAD_SECRET_SEALED = JSON.stringify(sealed)
    expect(resolvePayloadSecret()).toBe('sealed-boot-secret-fixture')
  })
})
