/**
 * УНП tests — the mirror of the `supto` skill's УНП law (tests mirror skills).
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §СУПТО УНП unique-sales-number
 * @see .claude/skills/supto/SKILL.md
 * @see src/standards/naredba-n-18/unp.ts
 */

import { describe, it, expect } from 'vitest'
import {
  formatUnp,
  parseUnp,
  isValidUnp,
  incrementUnp,
  firstUnp,
  UNP_MAX_SEQUENCE,
} from '@/naredba/n/18/unp'

describe('УНП — Наредба Н-18 unique sales number', () => {
  it('formats parts into XXXXXXXX-ZZZZ-NNNNNNN', () => {
    expect(formatUnp({ fiscalDeviceId: '12345678', operatorCode: '0042', sequence: 1 })).toBe(
      '12345678-0042-0000001',
    )
  })

  it('zero-pads the operator code and the 7-digit sequence', () => {
    expect(formatUnp({ fiscalDeviceId: '00000001', operatorCode: 7, sequence: 123 })).toBe(
      '00000001-0007-0000123',
    )
  })

  it('firstUnp starts the per-device sequence at 0000001', () => {
    expect(firstUnp('12345678', '0001')).toBe('12345678-0001-0000001')
  })

  it('incrementUnp advances gaplessly by exactly 1', () => {
    expect(incrementUnp('12345678-0042-0000001')).toBe('12345678-0042-0000002')
    expect(incrementUnp('12345678-0042-0000999')).toBe('12345678-0042-0001000')
  })

  it('parseUnp (the reverse) decodes the structured id', () => {
    expect(parseUnp('12345678-0042-0000007')).toEqual({
      fiscalDeviceId: '12345678',
      operatorCode: '0042',
      sequence: 7,
    })
  })

  it('round-trips format → parse', () => {
    const unp = formatUnp({ fiscalDeviceId: '87654321', operatorCode: '1234', sequence: 56_789 })
    expect(parseUnp(unp)).toEqual({
      fiscalDeviceId: '87654321',
      operatorCode: '1234',
      sequence: 56_789,
    })
  })

  it('isValidUnp accepts well-formed and rejects every malformed shape', () => {
    expect(isValidUnp('12345678-0042-0000001')).toBe(true)
    expect(isValidUnp('1234567-0042-0000001')).toBe(false) // 7-digit device
    expect(isValidUnp('12345678-042-0000001')).toBe(false) // 3-digit operator
    expect(isValidUnp('12345678-0042-000001')).toBe(false) // 6-digit sequence
    expect(isValidUnp('12345678_0042_0000001')).toBe(false) // wrong delimiter
    expect(isValidUnp('1234567X-0042-0000001')).toBe(false) // non-Arabic
    expect(isValidUnp('12345678-0042-0000000')).toBe(false) // sequence 0 (< 1)
  })

  it('rejects out-of-range input on format', () => {
    expect(() => formatUnp({ fiscalDeviceId: '123', operatorCode: '0042', sequence: 1 })).toThrow()
    expect(() => formatUnp({ fiscalDeviceId: '12345678', operatorCode: '0042', sequence: 0 })).toThrow()
    expect(() =>
      formatUnp({ fiscalDeviceId: '12345678', operatorCode: '0042', sequence: UNP_MAX_SEQUENCE + 1 }),
    ).toThrow()
  })

  it('throws on sequence overflow at increment', () => {
    const atMax = `12345678-0042-${String(UNP_MAX_SEQUENCE).padStart(7, '0')}`
    expect(() => incrementUnp(atMax)).toThrow()
  })

  it('parseUnp throws on a malformed string', () => {
    expect(() => parseUnp('not-a-unp')).toThrow()
  })
})
