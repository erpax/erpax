/**
 * Mediator uuid-anchored crypto + runQuery — integration round-trip.
 *
 * Slice HHHHHHHHH-cut2 + KKKKKKKKK-cut2 (2026-05-11). Pins the
 * Mediator extensions:
 *
 *   - `m.signUuid(uuid)` resolves the tenant's active signing key,
 *     signs, returns a SignedUuid envelope.
 *   - `m.verifyUuid(signed)` resolves the matching public key + verifies.
 *   - `m.encryptEnvelope(plaintext, uuid)` resolves the tenant's KEK,
 *     produces a CipherEnvelope; `m.decryptEnvelope(env)` recovers
 *     the same plaintext.
 *   - `m.runQuery({ sql, params, exec })` returns queryUuid +
 *     resultUuid + timing.
 *
 * The four crypto wrappers route through `InMemoryKeyResolver` (the
 * default for tests); production wires KV-backed resolution behind
 * the same API.
 *
 * @standard RFC 8032 EdDSA, NIST SP 800-38D AES-GCM, NIST SP 800-57 §5.6
 * @audit Conservation Law 8 + Law 47 (uuid-anchored crypto)
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { makeMediator } from './index'
import type { MediatorContext } from './index'
import {
  InMemoryKeyResolver, setDefaultKeyResolver,
  provisionTestSigningKey, provisionTestKek,
} from '../integrity/tenant-key-registry'

const TENANT = 'tenant-1'
const FAKE_ENV = {} as unknown as MediatorContext['env']

function fakeCtx(): MediatorContext {
  return {
    env: FAKE_ENV,
    tenantId: TENANT,
    // payload not needed for these flows — they touch the resolver,
    // not Payload.
  } as MediatorContext
}

describe('Mediator — uuid-anchored crypto + query fingerprint', () => {
  beforeEach(() => {
    // Isolate state between tests with a fresh resolver.
    setDefaultKeyResolver(new InMemoryKeyResolver())
  })

  it('signUuid → verifyUuid round-trips via the tenant key registry', async () => {
    await provisionTestSigningKey({ tenantId: TENANT, kid: 'tenant-1/signing/2026-05-11' })
    const m = makeMediator(fakeCtx())
    const uuid = '00000000-0000-5000-8000-000000000001'
    const signed = await m.signUuid(uuid) as { uuid: string; alg: string; kid: string; sig: string; signedAt: string }
    expect(signed.uuid).toBe(uuid)
    expect(signed.alg).toBe('EdDSA')
    expect(signed.kid).toBe('tenant-1/signing/2026-05-11')
    expect(signed.sig.length).toBeGreaterThan(0)
    const ok = await m.verifyUuid(signed as never)
    expect(ok).toBe(true)
  })

  it('verifyUuid returns false when the signature is tampered (uuid substitution)', async () => {
    await provisionTestSigningKey({ tenantId: TENANT, kid: 'tenant-1/signing/2026-05-11' })
    const m = makeMediator(fakeCtx())
    const signed = await m.signUuid('00000000-0000-5000-8000-aaaa') as {
      uuid: string; alg: 'EdDSA' | 'PS256' | 'ES256'; kid: string; sig: string; signedAt: string
    }
    const tampered = { ...signed, uuid: '00000000-0000-5000-8000-bbbb' }
    const ok = await m.verifyUuid(tampered)
    expect(ok).toBe(false)
  })

  it('encryptEnvelope → decryptEnvelope round-trips the plaintext', async () => {
    await provisionTestKek({ tenantId: TENANT, kid: 'tenant-1/kek/2026-05-11' })
    const m = makeMediator(fakeCtx())
    const uuid = '00000000-0000-5000-8000-c0ffee'
    const plaintext = { iban: 'BG80BNBG96611020345678', amount: 1234.56 }
    const envelope = await m.encryptEnvelope(plaintext, uuid) as {
      uuid: string; alg: 'AES-GCM-256' | 'AES-GCM-128'; iv: string; ciphertext: string; authTag: string; kid: string
    }
    expect(envelope.uuid).toBe(uuid)
    expect(envelope.alg).toBe('AES-GCM-256')
    expect(envelope.kid).toBe('tenant-1/kek/2026-05-11')
    const recovered = await m.decryptEnvelope(envelope) as typeof plaintext
    expect(recovered).toEqual(plaintext)
  })

  it('signUuid throws cleanly when no active signing key is provisioned', async () => {
    const m = makeMediator(fakeCtx())
    await expect(m.signUuid('00000000-0000-5000-8000-deadbeef')).rejects.toThrow(
      /no active signing key for tenant tenant-1/,
    )
  })

  it('runQuery returns queryUuid + resultUuid + rowCount around an executor', async () => {
    const m = makeMediator(fakeCtx())
    const exec = await m.runQuery({
      sql: 'select id from invoices where tenant = $1 limit 2',
      params: [TENANT],
      exec: async () => ({ docs: [{ id: 'a' }, { id: 'b' }] }),
    })
    expect(exec.queryUuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-/)
    expect(exec.resultUuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-/)
    expect(exec.queryUuid).not.toBe(exec.resultUuid)
    expect(exec.rowCount).toBe(2)
    expect(exec.elapsedMs).toBeGreaterThanOrEqual(0)
  })

  it('runQuery produces the same queryUuid for whitespace-different SQL (canonicalisation kicks in via the wrapper)', async () => {
    const m = makeMediator(fakeCtx())
    const a = await m.runQuery({
      sql: 'select 1',
      exec: async () => ({ rows: [] as unknown[] }),
    })
    const b = await m.runQuery({
      sql: '  SELECT   1  ',
      exec: async () => ({ rows: [] as unknown[] }),
    })
    expect(a.queryUuid).toBe(b.queryUuid)
  })
})
