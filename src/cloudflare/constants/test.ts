import { describe, it, expect } from 'vitest'
import { ERPAX_SECRET_ENV_KEYS, ERPAX_BINDING_ENV_KEYS } from './index'
import { WRANGLER_SECRET_ENV_KEYS, WRANGLER_BINDING_ENV_KEYS, CLOUDFLARE_SEAL_KID } from '../seal'
import * as facade from '../index'

/**
 * This test used to assert only `CLOUDFLARE_SEAL_KID).toBeDefined()` — a claim
 * nothing could contradict ([[rules]]/refutable). It passed for as long as the
 * constant carried the WRONG value, while the facade published a kid that disagreed
 * with the one sealing actually stamps.
 */

describe('cloudflare/constants — erpax names, not platform names', () => {
  it('names erpax key material, which is NOT a Cloudflare credential', () => {
    expect(ERPAX_SECRET_ENV_KEYS).toContain('ERPAX_SEAL_KEY')
    expect(ERPAX_BINDING_ENV_KEYS).toContain('ERPAX_DO')
  })

  it('does not overlap the platform sets — two different kinds of secret', () => {
    for (const k of ERPAX_SECRET_ENV_KEYS) expect(WRANGLER_SECRET_ENV_KEYS as readonly string[]).not.toContain(k)
    for (const k of ERPAX_BINDING_ENV_KEYS) expect(WRANGLER_BINDING_ENV_KEYS as readonly string[]).not.toContain(k)
  })
})

describe('cloudflare — the facade publishes what the SEALING CODE uses', () => {
  // The bug this locks: ./constants re-exported different values under the same
  // names, so a caller selecting a key by the facade's kid could never match an
  // envelope, and a caller asking which env vars are secret was told the wrong list.
  it('the facade kid is the kid stamped into envelopes', () => {
    expect(facade.CLOUDFLARE_SEAL_KID).toBe(CLOUDFLARE_SEAL_KID)
  })

  it('the facade secret list is the platform one, and names the CF API token', () => {
    expect(facade.WRANGLER_SECRET_ENV_KEYS).toBe(WRANGLER_SECRET_ENV_KEYS)
    expect(facade.WRANGLER_SECRET_ENV_KEYS as readonly string[]).toContain('CLOUDFLARE_API_TOKEN')
  })

  it('the facade binding list is the platform one', () => {
    expect(facade.WRANGLER_BINDING_ENV_KEYS).toBe(WRANGLER_BINDING_ENV_KEYS)
    expect(facade.WRANGLER_BINDING_ENV_KEYS as readonly string[]).toContain('CLOUDFLARE_ACCOUNT_ID')
  })

  it('still publishes the erpax sets, under their own names', () => {
    expect(facade.ERPAX_SECRET_ENV_KEYS).toBe(ERPAX_SECRET_ENV_KEYS)
    expect(facade.ERPAX_BINDING_ENV_KEYS).toBe(ERPAX_BINDING_ENV_KEYS)
  })
})
