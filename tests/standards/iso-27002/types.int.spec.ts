/**
 * ISO 27002:2022 — canonical security control catalog tests.
 *
 * Asserts the parser handles the three citation prefixes seen in
 * JSDoc banners (bare, ISO 27001 Annex `A.`, ISO 27002 `§`) and the
 * lookup tables agree with the catalog list.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-27002:2022 information-security-controls
 * @audit ISO-19011:2018 audit-trail
 */

import { describe, it, expect } from 'vitest'
import {
  isIso27002ControlId,
  parseIso27002ControlId,
  iso27002Title,
  iso27002Theme,
  ISO_27002_CATALOG,
  type Iso27002ControlId,
} from '@/standards/iso-27002'

describe('ISO 27002 — id parsing', () => {
  it('accepts the canonical bare form', () => {
    expect(parseIso27002ControlId('5.23')).toBe('5.23')
    expect(parseIso27002ControlId('8.3')).toBe('8.3')
  })

  it('accepts the ISO 27001 Annex A. prefix', () => {
    expect(parseIso27002ControlId('A.5.23')).toBe('5.23')
    expect(parseIso27002ControlId('A.5.4')).toBe('5.4')
  })

  it('accepts the ISO 27002 § prefix', () => {
    expect(parseIso27002ControlId('§5.23')).toBe('5.23')
    expect(parseIso27002ControlId('§8.15')).toBe('8.15')
  })

  it('returns null for unknown ids (signals catalog needs extension)', () => {
    expect(parseIso27002ControlId('5.99')).toBeNull()
    expect(parseIso27002ControlId('A.6.1')).toBeNull() // people controls — not yet cited
    expect(parseIso27002ControlId('not-a-control')).toBeNull()
    expect(parseIso27002ControlId(undefined)).toBeNull()
  })

  it('isIso27002ControlId accepts canonical form only', () => {
    expect(isIso27002ControlId('5.23')).toBe(true)
    expect(isIso27002ControlId('A.5.23')).toBe(false) // strip first
    expect(isIso27002ControlId('§5.23')).toBe(false)
  })
})

describe('ISO 27002 — lookup tables', () => {
  it('iso27002Title returns the canonical control name', () => {
    expect(iso27002Title('5.4')).toBe('Segregation of duties')
    expect(iso27002Title('5.23')).toBe(
      'Information security for use of cloud services',
    )
    expect(iso27002Title('8.15')).toBe('Logging')
  })

  it('iso27002Theme groups controls into the four 2022 themes', () => {
    expect(iso27002Theme('5.4')).toBe('organizational')
    expect(iso27002Theme('5.23')).toBe('organizational')
    expect(iso27002Theme('8.15')).toBe('technological')
  })

  it('ISO_27002_CATALOG enumerates the cited subset with id+title+theme', () => {
    expect(ISO_27002_CATALOG.length).toBeGreaterThanOrEqual(15)
    for (const entry of ISO_27002_CATALOG) {
      expect(typeof entry.id).toBe('string')
      expect(typeof entry.title).toBe('string')
      expect(['organizational', 'people', 'physical', 'technological']).toContain(entry.theme)
    }
  })

  it('every catalog id round-trips through the parser', () => {
    for (const entry of ISO_27002_CATALOG) {
      expect(parseIso27002ControlId(entry.id)).toBe(entry.id)
      expect(parseIso27002ControlId(`A.${entry.id}`)).toBe(entry.id)
      expect(parseIso27002ControlId(`§${entry.id}`)).toBe(entry.id)
    }
  })

  it('contains the heavily-cited tenant-isolation control', () => {
    const ids = ISO_27002_CATALOG.map((c): Iso27002ControlId => c.id)
    expect(ids).toContain('5.23')
  })
})
