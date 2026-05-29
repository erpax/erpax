/**
 * Safety-mode tests — uuid family self-protection.
 *
 * Slice RRRRRRRRR-cut1 (2026-05-11). Pins the contract that escape
 * hatches refuse to run in production mode and the attack-surface
 * inventory is enumerable.
 *
 *   1. getSafetyMode returns 'production' by default (strict).
 *   2. ERPAX_SAFETY_MODE explicit setting wins.
 *   3. NODE_ENV mapping respected when explicit is unset.
 *   4. requireSafetyMode throws when active mode not in allowed.
 *   5. attackSurfaceReport returns the closed escape-hatch enumeration.
 *   6. assertMinimumMode enforces minimum hardening rank.
 *
 * @audit Conservation Law 58 uuid-self-protection
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  getSafetyMode,
  requireSafetyMode,
  attackSurfaceReport,
  assertMinimumMode,
  UUID_FAMILY_ESCAPE_HATCHES,
} from './index'

/** `NODE_ENV` is a readonly member of `ProcessEnv`; route test mutations through a mutable view. */
const mutableEnv = process.env as Record<string, string | undefined>

describe('safety-mode — env detection', () => {
  const orig = {
    ERPAX: process.env.ERPAX_SAFETY_MODE,
    NODE_ENV: process.env.NODE_ENV,
  }
  beforeEach(() => {
    delete process.env.ERPAX_SAFETY_MODE
    delete mutableEnv.NODE_ENV
  })
  afterEach(() => {
    if (orig.ERPAX === undefined) delete process.env.ERPAX_SAFETY_MODE
    else process.env.ERPAX_SAFETY_MODE = orig.ERPAX
    if (orig.NODE_ENV === undefined) delete mutableEnv.NODE_ENV
    else mutableEnv.NODE_ENV = orig.NODE_ENV
  })

  it("defaults to 'production' when neither env var is set", () => {
    expect(getSafetyMode()).toBe('production')
  })

  it('ERPAX_SAFETY_MODE explicit setting wins', () => {
    process.env.ERPAX_SAFETY_MODE = 'test'
    expect(getSafetyMode()).toBe('test')
    process.env.ERPAX_SAFETY_MODE = 'dev'
    expect(getSafetyMode()).toBe('dev')
    process.env.ERPAX_SAFETY_MODE = 'production'
    expect(getSafetyMode()).toBe('production')
  })

  it('NODE_ENV maps to safety mode when ERPAX_SAFETY_MODE unset', () => {
    mutableEnv.NODE_ENV = 'test'
    expect(getSafetyMode()).toBe('test')
    mutableEnv.NODE_ENV = 'development'
    expect(getSafetyMode()).toBe('dev')
    mutableEnv.NODE_ENV = 'production'
    expect(getSafetyMode()).toBe('production')
  })

  it('unknown NODE_ENV falls back to strict production', () => {
    mutableEnv.NODE_ENV = 'staging'
    expect(getSafetyMode()).toBe('production')
  })
})

describe('requireSafetyMode — escape hatch guard', () => {
  const orig = process.env.ERPAX_SAFETY_MODE
  afterEach(() => {
    if (orig === undefined) delete process.env.ERPAX_SAFETY_MODE
    else process.env.ERPAX_SAFETY_MODE = orig
  })

  it('throws when active mode is not in the allowed list', () => {
    process.env.ERPAX_SAFETY_MODE = 'production'
    expect(() => requireSafetyMode(['test', 'dev'], 'provisionTestSigningKey'))
      .toThrow(/provisionTestSigningKey requires mode/)
    expect(() => requireSafetyMode(['test', 'dev'], 'provisionTestSigningKey'))
      .toThrow(/active mode is 'production'/)
  })

  it('passes when active mode is in the allowed list', () => {
    process.env.ERPAX_SAFETY_MODE = 'test'
    expect(() => requireSafetyMode(['test', 'dev'], 'x')).not.toThrow()
    process.env.ERPAX_SAFETY_MODE = 'dev'
    expect(() => requireSafetyMode(['test', 'dev'], 'x')).not.toThrow()
  })

  it("uses '<unknown>' as the caller label when omitted", () => {
    process.env.ERPAX_SAFETY_MODE = 'production'
    expect(() => requireSafetyMode(['test'])).toThrow(/<unknown> requires/)
  })
})

describe('attackSurfaceReport — closed enumeration of escape hatches', () => {
  it('returns the documented set with their modes', () => {
    const report = attackSurfaceReport()
    expect(report.count).toBeGreaterThan(0)
    expect(report.hatches).toBe(UUID_FAMILY_ESCAPE_HATCHES)
    expect(report.hardenedForProduction).toBe(true)
  })

  it('no hatch admits production mode (hardenedForProduction === true)', () => {
    for (const h of UUID_FAMILY_ESCAPE_HATCHES) {
      expect(h.allowedModes).not.toContain('production')
    }
  })

  it('includes the eight currently-documented hatches', () => {
    const names = UUID_FAMILY_ESCAPE_HATCHES.map((h) => h.fn)
    expect(names).toContain('__resetIdentitySlotRegistryForTests')
    expect(names).toContain('__resetInternalProviderRegistryForTests')
    expect(names).toContain('provisionTestSigningKey')
    expect(names).toContain('provisionTestKek')
    expect(names).toContain('setDefaultKeyResolver')
    expect(names).toContain('setDefaultRateProvider')
    expect(names).toContain('registerIdentitySlot{replace:true}')
    expect(names).toContain('registerInternalProvider{replace:true}')
  })
})

describe('assertMinimumMode — deployment hardening floor', () => {
  const orig = process.env.ERPAX_SAFETY_MODE
  afterEach(() => {
    if (orig === undefined) delete process.env.ERPAX_SAFETY_MODE
    else process.env.ERPAX_SAFETY_MODE = orig
  })

  it("production satisfies every minimum", () => {
    process.env.ERPAX_SAFETY_MODE = 'production'
    expect(() => assertMinimumMode('dev')).not.toThrow()
    expect(() => assertMinimumMode('test')).not.toThrow()
    expect(() => assertMinimumMode('production')).not.toThrow()
  })

  it("dev fails the production floor but passes dev/test", () => {
    process.env.ERPAX_SAFETY_MODE = 'dev'
    expect(() => assertMinimumMode('production')).toThrow(/less strict/)
    expect(() => assertMinimumMode('test')).toThrow(/less strict/)
    expect(() => assertMinimumMode('dev')).not.toThrow()
  })

  it("test fails the production floor but passes its own", () => {
    process.env.ERPAX_SAFETY_MODE = 'test'
    expect(() => assertMinimumMode('production')).toThrow(/less strict/)
    expect(() => assertMinimumMode('test')).not.toThrow()
  })
})
