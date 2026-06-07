import { describe, it, expect } from 'vitest'
import {
  ERR,
  GROUP_A,
  GROUP_B,
  CodedError,
  composeErrorCode,
  parseErrorCode,
  parseSupportJson,
  getPayloadErrorCode,
  formatSupportReference,
  formatPayloadSdkUserMessage,
  codedFromRegistry,
  ERROR_REGISTRY,
} from '@/error'

const CODE_RE = /^[A-Z]{2}\d{3}$/

describe('error', () => {
  it('every ERR constant matches the ABCDE mask', () => {
    for (const [name, code] of Object.entries(ERR)) {
      expect(CODE_RE.test(code), `ERR.${name} = "${code}"`).toBe(true)
    }
  })

  it('composeErrorCode produces the correct five-char string', () => {
    expect(composeErrorCode('A', 'C', 1)).toBe('AC001')
    expect(composeErrorCode('P', 'N', 2)).toBe('PN002')
    expect(composeErrorCode('I', 'W', 999)).toBe('IW999')
  })

  it('composeErrorCode throws on out-of-range sequence', () => {
    expect(() => composeErrorCode('A', 'C', 0)).toThrow(RangeError)
    expect(() => composeErrorCode('A', 'C', 1000)).toThrow(RangeError)
    expect(() => composeErrorCode('A', 'C', 1.5)).toThrow(RangeError)
  })

  it('parseErrorCode round-trips composeErrorCode', () => {
    const code = composeErrorCode('T', 'A', 7)
    const parsed = parseErrorCode(code)
    expect(parsed.groupA).toBe('T')
    expect(parsed.groupB).toBe('A')
    expect(parsed.seq).toBe(7)
  })

  it('parseErrorCode rejects invalid masks', () => {
    expect(() => parseErrorCode('AB12')).toThrow(RangeError)   // too short
    expect(() => parseErrorCode('A1001')).toThrow(RangeError)  // digit in pos B
    expect(() => parseErrorCode('ZZ001')).toThrow(RangeError)  // unknown groups
  })

  it('GROUP_A and GROUP_B contain the expected group letters', () => {
    expect('A' in GROUP_A).toBe(true)
    expect('P' in GROUP_A).toBe(true)
    expect('C' in GROUP_B).toBe(true)
    expect('N' in GROUP_B).toBe(true)
  })

  it('CodedError carries code and name', () => {
    const err = new CodedError('AC001', 'test message')
    expect(err).toBeInstanceOf(Error)
    expect(err.code).toBe('AC001')
    expect(err.message).toBe('test message')
    expect(err.name).toBe('CodedError')
  })

  it('CodedError preserves cause', () => {
    const cause = new Error('root')
    const err = new CodedError('AC001', 'wrapped', { cause })
    expect(err.cause).toBe(cause)
  })

  it('codedFromRegistry produces a CodedError with registry message', () => {
    const code = ERR.AUTH_CREDENTIALS_REQUIRED
    const err = codedFromRegistry(code)
    expect(err).toBeInstanceOf(CodedError)
    expect(err.code).toBe(code)
    expect(err.message).toBe(ERROR_REGISTRY[code].message)
  })

  it('ERROR_REGISTRY has an entry for every ERR constant', () => {
    for (const code of Object.values(ERR)) {
      const entry = ERROR_REGISTRY[code]
      expect(entry, `missing registry entry for ${code}`).toBeDefined()
      expect(typeof entry.status).toBe('number')
      expect(typeof entry.message).toBe('string')
      expect(entry.message.length).toBeGreaterThan(0)
    }
  })

  it('parseSupportJson extracts code and message from a plain object', () => {
    expect(parseSupportJson({ code: 'AC001', message: 'bad creds' })).toEqual({ code: 'AC001', message: 'bad creds' })
    expect(parseSupportJson({ error: 'oops' })).toEqual({ code: undefined, message: 'oops' })
    expect(parseSupportJson(null)).toEqual({})
    expect(parseSupportJson('string')).toEqual({})
  })

  it('getPayloadErrorCode extracts code from a Payload-shaped error', () => {
    const shaped = { errors: [{ data: { code: 'TA001' } }] }
    expect(getPayloadErrorCode(shaped)).toBe('TA001')
    expect(getPayloadErrorCode({ errors: [] })).toBeUndefined()
    expect(getPayloadErrorCode(null)).toBeUndefined()
    expect(getPayloadErrorCode({ errors: [{ data: null }] })).toBeUndefined()
  })

  it('formatSupportReference appends code in parens', () => {
    expect(formatSupportReference('Sign-in failed.', 'AL001')).toBe('Sign-in failed. (Code: AL001)')
    expect(formatSupportReference('Sign-in failed.')).toBe('Sign-in failed.')
    expect(formatSupportReference('', 'AL001')).toBe('(Code: AL001)')
    expect(formatSupportReference('')).toBe('')
  })

  it('formatPayloadSdkUserMessage uses errors[0].message over fallback', () => {
    const err = { errors: [{ message: 'from error' }], message: 'top level' }
    expect(formatPayloadSdkUserMessage(err, 'fallback')).toBe('from error')
  })

  it('formatPayloadSdkUserMessage falls back when errors array is empty', () => {
    const err = { errors: [], message: '' }
    expect(formatPayloadSdkUserMessage(err, 'fallback')).toBe('fallback')
  })
})
