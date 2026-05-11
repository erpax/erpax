/**
 * MCP i18n resolver tests — Slice GGGGGGGGG (2026-05-11).
 *
 * Pins the resolution order documented in `resolveTranslation`:
 *
 *   1. `translations` row scoped to (tenant, scope, key, status=enabled)
 *   2. `translations` row scoped to (tenant='platform', …)
 *   3. `staticDefault` (code fallback)
 *
 * Also covers `resolveLocalized` BCP-47 region-stripping + `en` fallback,
 * and `makeToolI18n` (desc / err / raw projections).
 *
 * @standard BCP-47 — language tag region stripping
 * @standard W3C HTTP Content-Language (RFC 7231 §3.1.3.2)
 */
import { describe, it, expect, vi } from 'vitest'
import {
  resolveLocalized,
  makeToolI18n,
  resolveTranslation,
  PLATFORM_TENANT_KEY,
} from './i18n'

describe('resolveLocalized', () => {
  it('returns the locale-exact match', () => {
    expect(resolveLocalized({ en: 'Hello', bg: 'Здравей' }, 'bg')).toBe('Здравей')
  })
  it('strips BCP-47 region suffix before lookup', () => {
    expect(resolveLocalized({ en: 'Hi', bg: 'Здр' }, 'bg-BG')).toBe('Здр')
    expect(resolveLocalized({ en: 'Hi', de: 'Hallo' }, 'de_AT')).toBe('Hallo')
  })
  it('falls back to en when the requested locale is missing', () => {
    expect(resolveLocalized({ en: 'Hi', bg: 'Здр' }, 'fr')).toBe('Hi')
  })
  it('falls back to the first available value when even en is missing', () => {
    expect(resolveLocalized({ bg: 'Здр', de: 'Hallo' }, 'fr')).toBe('Здр')
  })
  it('returns empty string when given a null/undefined map', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(resolveLocalized(undefined as any)).toBe('')
  })
})

describe('makeToolI18n', () => {
  const t = makeToolI18n('erpax.consistency.scan')
  it('exposes the toolKey', () => {
    expect(t.toolKey).toBe('erpax.consistency.scan')
  })
  it('desc returns the en string (MCP 0.6 single-string catalog)', () => {
    expect(t.desc({ en: 'EN', bg: 'BG' })).toBe('EN')
  })
  it('err resolves against the requested locale', () => {
    expect(t.err({ en: 'EN-err', bg: 'BG-err' }, 'bg-BG')).toBe('BG-err')
  })
  it('raw returns the locale map untouched', () => {
    const m = { en: 'a', bg: 'b' }
    expect(t.raw(m)).toBe(m)
  })
})

describe('resolveTranslation — 3-layer priority', () => {
  function mkPayload(rows: Array<{ tenant: string; value: string }>) {
    return {
      find: vi.fn(async (args: { where?: Record<string, unknown> }) => {
        const tenantFilter = (args.where?.tenant as { equals?: string })?.equals
        const row = rows.find((r) => r.tenant === tenantFilter)
        return { docs: row ? [{ value: row.value }] : [] }
      }),
    }
  }

  it('prefers a tenant-scoped row over the platform row', async () => {
    const payload = mkPayload([
      { tenant: 'tenant-1', value: 'tenant-override' },
      { tenant: PLATFORM_TENANT_KEY, value: 'platform-default-row' },
    ])
    const out = await resolveTranslation({
      payload, scope: 'mcp-tool', key: 'erpax.x.y',
      staticDefault: 'hardcoded',
      tenantId: 'tenant-1',
    })
    expect(out).toBe('tenant-override')
  })

  it('falls back to the platform row when no tenant override exists', async () => {
    const payload = mkPayload([
      { tenant: PLATFORM_TENANT_KEY, value: 'platform-default-row' },
    ])
    const out = await resolveTranslation({
      payload, scope: 'mcp-tool', key: 'erpax.x.y',
      staticDefault: 'hardcoded',
      tenantId: 'tenant-1',
    })
    expect(out).toBe('platform-default-row')
  })

  it('falls back to staticDefault when payload has no rows', async () => {
    const payload = mkPayload([])
    const out = await resolveTranslation({
      payload, scope: 'mcp-tool', key: 'erpax.x.y',
      staticDefault: 'hardcoded',
      tenantId: 'tenant-1',
    })
    expect(out).toBe('hardcoded')
  })

  it('returns staticDefault when payload is undefined', async () => {
    const out = await resolveTranslation({
      payload: undefined, scope: 'mcp-tool', key: 'erpax.x.y',
      staticDefault: 'hardcoded',
    })
    expect(out).toBe('hardcoded')
  })

  it('treats tenant=platform as a single-lookup case', async () => {
    const payload = mkPayload([
      { tenant: PLATFORM_TENANT_KEY, value: 'platform-only' },
    ])
    await resolveTranslation({
      payload, scope: 'mcp-tool', key: 'erpax.x.y',
      staticDefault: 'hardcoded',
      tenantId: PLATFORM_TENANT_KEY,
    })
    // Only ONE find call — not two — when tenantId === 'platform'.
    expect(payload.find).toHaveBeenCalledTimes(1)
  })

  it('skips empty-string values and continues the lookup chain', async () => {
    const payload = mkPayload([
      { tenant: 'tenant-1', value: '   ' },                  // whitespace-only → ignore
      { tenant: PLATFORM_TENANT_KEY, value: 'platform-good' },
    ])
    const out = await resolveTranslation({
      payload, scope: 'mcp-tool', key: 'erpax.x.y',
      staticDefault: 'hardcoded',
      tenantId: 'tenant-1',
    })
    expect(out).toBe('platform-good')
  })

  it('swallows find() errors and continues to the next tenant in priority', async () => {
    const payload = {
      find: vi.fn(async (args: { where?: Record<string, unknown> }) => {
        const tenantFilter = (args.where?.tenant as { equals?: string })?.equals
        if (tenantFilter === 'tenant-1') throw new Error('rls-blocked')
        return { docs: [{ value: 'platform-row' }] }
      }),
    }
    const out = await resolveTranslation({
      payload, scope: 'mcp-tool', key: 'erpax.x.y',
      staticDefault: 'hardcoded',
      tenantId: 'tenant-1',
    })
    expect(out).toBe('platform-row')
  })
})
