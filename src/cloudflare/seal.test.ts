/**
 * Cloudflare config sealing — uuid-gated decrypt, fail-closed on mismatch.
 *
 * Uses fake `cf-test-*` tokens only; never real Cloudflare credentials.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  sealCloudflareConfig,
  decryptCloudflareIfUuid,
  cloudflareConfigContentUuid,
  wranglerEnvToCloudflareConfig,
  WRANGLER_SECRET_ENV_KEYS,
} from '@/cloudflare'

const CONTEXT = '00000000-0000-5000-8000-context000001'
const FAKE_CONFIG = {
  accountId: '00000000000000000000000000000001',
  apiToken: 'cf-test-token-00000000000000000000000000000001',
  d1DatabaseId: '00000000-0000-0000-0000-000000000001',
  r2BucketName: 'erpax-test-fixture',
  cloudflareEnv: 'test',
}

describe('cloudflare/seal — uuid-sealed config (fail-closed)', () => {
  const prior = process.env.PAYLOAD_SECRET

  beforeEach(() => {
    process.env.PAYLOAD_SECRET = 'unit-test-master-secret-for-cf-seal'
  })

  afterEach(() => {
    if (prior === undefined) Reflect.deleteProperty(process.env, 'PAYLOAD_SECRET')
    else process.env.PAYLOAD_SECRET = prior
  })

  it('seal → decrypt round-trips when presentedUuid matches contentUuid', async () => {
    const sealed = await sealCloudflareConfig(FAKE_CONFIG, CONTEXT)
    expect(sealed.contentUuid).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    )
    expect(sealed.envelope.ciphertext.length).toBeGreaterThan(0)
    const plain = await decryptCloudflareIfUuid(sealed, sealed.contentUuid)
    expect(plain).toEqual(FAKE_CONFIG)
  })

  it('wrong presentedUuid fails closed (null, no plaintext)', async () => {
    const sealed = await sealCloudflareConfig(FAKE_CONFIG, CONTEXT)
    const wrong = '00000000-0000-5000-8000-deadbeef0001'
    expect(wrong).not.toBe(sealed.contentUuid)
    expect(await decryptCloudflareIfUuid(sealed, wrong)).toBeNull()
  })

  it('expectedContent disharmony fails closed', async () => {
    const sealed = await sealCloudflareConfig(FAKE_CONFIG, CONTEXT)
    const tampered = { ...FAKE_CONFIG, apiToken: 'cf-test-token-tampered' }
    expect(
      await decryptCloudflareIfUuid(sealed, sealed.contentUuid, tampered),
    ).toBeNull()
  })

  it('contentUuid is deterministic for the same config + context', () => {
    const a = cloudflareConfigContentUuid(FAKE_CONFIG, CONTEXT)
    const b = cloudflareConfigContentUuid(FAKE_CONFIG, CONTEXT)
    expect(a).toBe(b)
    const otherContext = cloudflareConfigContentUuid(FAKE_CONFIG, CONTEXT + '-other')
    expect(otherContext).not.toBe(a)
  })

  it('wranglerEnvToCloudflareConfig maps env keys without leaking secret names in output', () => {
    const cfg = wranglerEnvToCloudflareConfig({
      CLOUDFLARE_ACCOUNT_ID: FAKE_CONFIG.accountId,
      CLOUDFLARE_API_TOKEN: FAKE_CONFIG.apiToken,
      D1_DATABASE_ID: FAKE_CONFIG.d1DatabaseId,
      R2_BUCKET_NAME: FAKE_CONFIG.r2BucketName,
      CLOUDFLARE_ENV: 'staging',
    })
    expect(cfg.apiToken).toBe(FAKE_CONFIG.apiToken)
    expect(cfg.bindings?.CLOUDFLARE_ENV).toBe('staging')
    expect(WRANGLER_SECRET_ENV_KEYS).toContain('CLOUDFLARE_API_TOKEN')
  })

  it('seal throws when PAYLOAD_SECRET is absent', async () => {
    Reflect.deleteProperty(process.env, 'PAYLOAD_SECRET')
    await expect(sealCloudflareConfig(FAKE_CONFIG, CONTEXT)).rejects.toThrow(/PAYLOAD_SECRET/)
  })
})
