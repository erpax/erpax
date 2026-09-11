import { describe, it, expect } from 'vitest'
import type { Field } from 'payload'
import { isNamedField, fieldWithValidate, validatorOf } from '@/test'

describe('test — the corpus test helpers', () => {
  it('isNamedField narrows to fields that carry a string name', () => {
    expect(isNamedField({ name: 'title', type: 'text' } as Field)).toBe(true)
    expect(isNamedField({ type: 'row', fields: [] } as Field)).toBe(false)
    expect(isNamedField({ name: 42, type: 'text' } as unknown as Field)).toBe(false)
  })

  it('validatorOf wraps a field validate and passes the value through', () => {
    const field = fieldWithValidate({
      name: 'code',
      type: 'text',
      validate: (v: unknown) => (v === 'ok' ? true : 'rejected'),
    } as Field)
    const check = validatorOf(field)
    expect(check('ok')).toBe(true)
    expect(check('anything else')).toBe('rejected')
  })

  // A field with no validate must fail closed — a helper that returned a pass-through here would
  // report every factory field as validated.
  it('validatorOf refuses a field that has no validate', () => {
    expect(() => validatorOf(fieldWithValidate({ name: 'code', type: 'text' } as Field))).toThrow(
      'expected a validate function',
    )
  })
})
