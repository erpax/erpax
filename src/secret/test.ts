import crypto from 'node:crypto'
import fsExtra from 'node:fs'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import {
  CROSS_AXIS,
  CROSS_HELIX,
  PAYLOAD_SECRET_IDENTITY,
  PLATFORM_TENANT_ID,
  crossUuid,
  decryptIfUuid,
  dotenvValue,
  payloadSecretFromCross,
  identityDigestForContent,
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

  it('v2: round-trips when the full 256-bit content digest is bound', () => {
    const contextUuid = identityUuidForContent(PAYLOAD_SECRET_IDENTITY, PLATFORM_TENANT_ID)
    const contextDigest = identityDigestForContent(PAYLOAD_SECRET_IDENTITY, PLATFORM_TENANT_ID)
    const sealed = sealSecret('vitest-only-secret-not-for-production', contextUuid, { ...opts, contextDigest })
    expect(sealed.v).toBe(2)
    expect(sealed.contextDigest).toBe(contextDigest)
    expect(sealed.contextDigest!.length).toBe(64) // full 256-bit digest, not the 122-bit uuid
    const plain = decryptIfUuid(sealed, contextUuid, PAYLOAD_SECRET_IDENTITY, opts)
    expect(plain).toBe('vitest-only-secret-not-for-production')
  })

  it('v2: fails closed when the sealed contextDigest is tampered', () => {
    const contextUuid = identityUuidForContent(PAYLOAD_SECRET_IDENTITY, PLATFORM_TENANT_ID)
    const contextDigest = identityDigestForContent(PAYLOAD_SECRET_IDENTITY, PLATFORM_TENANT_ID)
    const sealed = sealSecret('vitest-only-secret-not-for-production', contextUuid, { ...opts, contextDigest })
    const tampered = { ...sealed, contextDigest: `0${sealed.contextDigest!.slice(1)}` }
    expect(() =>
      decryptIfUuid(tampered, contextUuid, PAYLOAD_SECRET_IDENTITY, opts),
    ).toThrow(/contextDigest does not match expected content digest/)
  })

  it('identityDigestForContent is the full 256-bit digest, wider than the uuid', () => {
    const d = identityDigestForContent('fixture-string', PLATFORM_TENANT_ID)
    expect(d).toBe(identityDigestForContent('fixture-string', PLATFORM_TENANT_ID))
    expect(d.length).toBe(64)
    expect(d).not.toBe(identityDigestForContent('other-string', PLATFORM_TENANT_ID))
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

describe('secret — PAYLOAD_SECRET computed from the cross', () => {
  const KEY_A = Buffer.alloc(32, 1)
  const KEY_B = Buffer.alloc(32, 2)

  it('the cross uuid is DERIVED from the axis and the helix, never typed', () => {
    expect([...CROSS_AXIS]).toEqual([3, 6, 9])
    expect([...CROSS_HELIX]).toEqual([1, 2, 4, 8, 7, 5])
    // a uuid, and the same one on every machine and in every checkout
    expect(crossUuid()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    expect(crossUuid()).toBe(crossUuid())
  })

  it('same key + same cross ⇒ same secret, anywhere', () => {
    expect(payloadSecretFromCross({ sealKey: KEY_A })).toBe(payloadSecretFromCross({ sealKey: KEY_A }))
    expect(payloadSecretFromCross({ sealKey: KEY_A })).toHaveLength(64) // 256 bits, hex
  })

  it('THE SECURITY PROPERTY: the cross is public, so the KEY is what makes it a secret', () => {
    // identical corpus, identical cross, different keys — and the secrets must not agree.
    // If they did, the value would be recomputable by anyone holding the repository, and
    // PAYLOAD_SECRET signs auth tokens: a public value there is no authentication at all.
    expect(payloadSecretFromCross({ sealKey: KEY_A })).not.toBe(payloadSecretFromCross({ sealKey: KEY_B }))
  })

  it('fails CLOSED with no key — there is no keyless path to a value', () => {
    const saved = process.env.ERPAX_SEAL_KEY
    delete process.env.ERPAX_SEAL_KEY
    try {
      expect(() => payloadSecretFromCross()).toThrow(/ERPAX_SEAL_KEY is required/)
    } finally {
      if (saved !== undefined) process.env.ERPAX_SEAL_KEY = saved
    }
  })
})

describe('secret — the boot error names a location that is actually read', () => {
  it('reads PAYLOAD_SECRET from .env, ignoring comments and blank lines', () => {
    const tmp = `${process.env.TMPDIR ?? '/tmp'}/erpax-dotenv-${process.pid}.env`
    fsExtra.writeFileSync(tmp, '# a comment\n\nOTHER=x\nPAYLOAD_SECRET=from-the-file\n')
    try {
      expect(dotenvValue('PAYLOAD_SECRET', tmp)).toBe('from-the-file')
      expect(dotenvValue('OTHER', tmp)).toBe('x')
      expect(dotenvValue('ABSENT', tmp)).toBeUndefined()
    } finally {
      fsExtra.unlinkSync(tmp)
    }
  })

  it('a missing file is undefined, never a throw — it is a FALLBACK', () => {
    expect(dotenvValue('PAYLOAD_SECRET', '/no/such/file/.env')).toBeUndefined()
  })

  it('an empty value is undefined — an empty secret is not a secret', () => {
    const tmp = `${process.env.TMPDIR ?? '/tmp'}/erpax-dotenv-empty-${process.pid}.env`
    fsExtra.writeFileSync(tmp, 'PAYLOAD_SECRET=\n')
    try {
      expect(dotenvValue('PAYLOAD_SECRET', tmp)).toBeUndefined()
    } finally {
      fsExtra.unlinkSync(tmp)
    }
  })

  it('the real environment variable WINS over the file — never an override', () => {
    const saved = process.env.PAYLOAD_SECRET
    process.env.PAYLOAD_SECRET = 'from-the-environment'
    try {
      expect(resolvePayloadSecret()).toBe('from-the-environment')
    } finally {
      if (saved === undefined) Reflect.deleteProperty(process.env, 'PAYLOAD_SECRET')
      else process.env.PAYLOAD_SECRET = saved
    }
  })
})

describe('secret — precedence is a security decision', () => {
  it('a SEALED blob beats .env plaintext — encrypted at rest wins over a file', () => {
    const tmp = `${process.env.TMPDIR ?? '/tmp'}/erpax-precedence-${process.pid}.env`
    fsExtra.writeFileSync(tmp, 'PAYLOAD_SECRET=plaintext-loses\n')
    const savedPlain = process.env.PAYLOAD_SECRET
    const savedSealed = process.env.PAYLOAD_SECRET_SEALED
    const savedKey = process.env.ERPAX_SEAL_KEY
    process.env.ERPAX_SEAL_KEY = crypto.randomBytes(32).toString('hex')
    Reflect.deleteProperty(process.env, 'PAYLOAD_SECRET')
    try {
      const contextUuid = identityUuidForContent(PAYLOAD_SECRET_IDENTITY, PLATFORM_TENANT_ID)
      process.env.PAYLOAD_SECRET_SEALED = JSON.stringify(sealSecret('sealed-wins', contextUuid))
      expect(resolvePayloadSecret()).toBe('sealed-wins')
      // and the file is still readable — it simply does not outrank the seal
      expect(dotenvValue('PAYLOAD_SECRET', tmp)).toBe('plaintext-loses')
    } finally {
      fsExtra.unlinkSync(tmp)
      if (savedPlain === undefined) Reflect.deleteProperty(process.env, 'PAYLOAD_SECRET')
      else process.env.PAYLOAD_SECRET = savedPlain
      if (savedSealed === undefined) Reflect.deleteProperty(process.env, 'PAYLOAD_SECRET_SEALED')
      else process.env.PAYLOAD_SECRET_SEALED = savedSealed
      if (savedKey === undefined) Reflect.deleteProperty(process.env, 'ERPAX_SEAL_KEY')
      else process.env.ERPAX_SEAL_KEY = savedKey
    }
  })
})
