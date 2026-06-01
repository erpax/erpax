/**
 * Identity-element framework tests.
 *
 * Slice OOOOOOOOO-cut1 (2026-05-11). Pins the abstract Law 54
 * machinery using a test slot (so the test doesn't depend on
 * production registrations) plus a structural-parallel check that
 * the existing locale slot (refactored to delegate to the framework)
 * still satisfies its own contract.
 *
 *   1. `resolveIdentity` returns blank for every blank-equivalent input.
 *   2. `resolveIdentity` normalises non-blank input via the slot's
 *      `normalise` function (trim + slot rule).
 *   3. `identitiesCompatible` treats blank as universal; non-blank
 *      uses the slot's `equality` predicate.
 *   4. `identityDisplayLabel` falls back to em-dash for blank +
 *      `displayBlankAs` override.
 *   5. `computeIdentityUuid` differs by slot AND by tenant; same
 *      (slot, tenant, normalised-code) tuple → same uuid.
 *   6. Duplicate-registration without `replace:true` throws.
 *   7. Unregistered slot lookups throw — programmer error.
 *   8. (Sanity) The production locale slot delegating to the
 *      framework still answers the primary-subtag equality rule.
 *
 * @audit Conservation Law 54 universal-identity-element
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
  registerIdentitySlot,
  resolveIdentity,
  isBlankIdentity,
  identitiesCompatible,
  identityDisplayLabel,
  computeIdentityUuid,
  listIdentitySlots,
  getIdentitySlot,
  __resetIdentitySlotRegistryForTests,
} from './index'
// Top-level import — the locale module's slot registration is a
// module-load side effect; importing here makes sure the production
// slot is registered before ANY test runs, ahead of the framework
// describes that reset the registry. The locale describe below
// re-registers via the module re-import path.
import '../locale-fallback'

describe('production locale slot — delegates to the framework, primary-subtag equality preserved', () => {
  it('still pairs en-GB ↔ en-US as compatible after the framework refactor', async () => {
    const { localesCompatible, isBlankLocale, resolveLocale, BLANK_LOCALE } = await import('../locale-fallback')
    expect(localesCompatible('en-GB', 'en-US')).toBe(true)
    expect(localesCompatible('en', 'fr')).toBe(false)
    expect(localesCompatible('en', 'und')).toBe(true)
    expect(isBlankLocale(null)).toBe(true)
    expect(resolveLocale('   ')).toBe(BLANK_LOCALE)
  })
})

describe('identity-element framework — generic slot', () => {
  beforeEach(() => {
    __resetIdentitySlotRegistryForTests()
    registerIdentitySlot({
      slot: 'unit-of-measure',
      blank: 'dimensionless',
      normalise: (s) => s.trim().toLowerCase(),
      // UOM-specific equality: 'kg' ↔ 'kilogram' would go here in real
      // use; the test just uses string equality on the normalised form.
      equality: (a, b) => a === b,
      displayBlankAs: '—',
      standards: ['ISO-80000-1'],
      description: 'Test UOM slot for the framework integration test.',
    })
  })

  it('resolveIdentity returns blank for every blank-equivalent input', () => {
    expect(resolveIdentity('unit-of-measure', undefined)).toBe('dimensionless')
    expect(resolveIdentity('unit-of-measure', null)).toBe('dimensionless')
    expect(resolveIdentity('unit-of-measure', '')).toBe('dimensionless')
    expect(resolveIdentity('unit-of-measure', '   ')).toBe('dimensionless')
    expect(resolveIdentity('unit-of-measure', 'dimensionless')).toBe('dimensionless')
  })

  it('resolveIdentity normalises non-blank input', () => {
    expect(resolveIdentity('unit-of-measure', '  KG  ')).toBe('kg')   // trim + lower
    expect(resolveIdentity('unit-of-measure', 'Meter')).toBe('meter')
  })

  it('isBlankIdentity detects blanks across input shapes', () => {
    expect(isBlankIdentity('unit-of-measure', null)).toBe(true)
    expect(isBlankIdentity('unit-of-measure', '')).toBe(true)
    expect(isBlankIdentity('unit-of-measure', 'kg')).toBe(false)
  })

  it('identitiesCompatible: blank is universal; non-blank uses equality', () => {
    expect(identitiesCompatible('unit-of-measure', 'kg', null)).toBe(true)
    expect(identitiesCompatible('unit-of-measure', undefined, 'meter')).toBe(true)
    expect(identitiesCompatible('unit-of-measure', 'kg', 'kg')).toBe(true)
    expect(identitiesCompatible('unit-of-measure', 'kg', 'meter')).toBe(false)
  })

  it('identityDisplayLabel uses displayBlankAs override', () => {
    expect(identityDisplayLabel('unit-of-measure', null)).toBe('—')
    expect(identityDisplayLabel('unit-of-measure', 'kg')).toBe('kg')
  })

  it('computeIdentityUuid: stable per (slot, code, tenant); differs by slot AND tenant', () => {
    // Register a second slot so we can demonstrate slot-distinct uuids.
    registerIdentitySlot({
      slot: 'priority',
      blank: 'normal',
      normalise: (s) => s.trim().toLowerCase(),
    })
    const a = computeIdentityUuid('unit-of-measure', 'kg', 't-1')
    const b = computeIdentityUuid('unit-of-measure', 'kg', 't-1')
    expect(a).toBe(b)                                          // deterministic
    expect(a).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-/)

    const aDifferentTenant = computeIdentityUuid('unit-of-measure', 'kg', 't-2')
    expect(a).not.toBe(aDifferentTenant)                       // per-tenant

    const sameCodeDifferentSlot = computeIdentityUuid('priority', 'kg', 't-1')
    expect(a).not.toBe(sameCodeDifferentSlot)                  // slot participates
  })

  it('duplicate registration without replace throws', () => {
    expect(() => registerIdentitySlot({
      slot: 'unit-of-measure', blank: 'other',
    })).toThrow(/already registered/)
    // …unless replace: true is passed.
    registerIdentitySlot({
      slot: 'unit-of-measure', blank: 'other',
    }, { replace: true })
    expect(getIdentitySlot('unit-of-measure')?.blank).toBe('other')
  })

  it('helpers throw on unregistered slot (programmer error)', () => {
    expect(() => resolveIdentity('nope', 'x')).toThrow(/'nope' is not registered/)
    expect(() => isBlankIdentity('nope', null)).toThrow()
    expect(() => identitiesCompatible('nope', 'a', 'b')).toThrow()
    expect(() => identityDisplayLabel('nope', 'x')).toThrow()
    expect(() => computeIdentityUuid('nope', 'x', 't')).toThrow()
  })

  it('listIdentitySlots returns every registered slot', () => {
    registerIdentitySlot({ slot: 'priority', blank: 'normal' })
    const slots = listIdentitySlots().map((d) => d.slot)
    expect(slots).toContain('unit-of-measure')
    expect(slots).toContain('priority')
  })
})

