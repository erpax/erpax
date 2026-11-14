import type { Field } from 'payload'

/** Named Payload field facet — narrows the Field union for factory tests. */
export type NamedField = Field & { name: string }

export const isNamedField = (f: Field): f is NamedField =>
  'name' in f && typeof (f as { name?: unknown }).name === 'string'

export type FieldWithValidate = Field & { validate?: unknown }

export const fieldWithValidate = (f: Field): FieldWithValidate => f as FieldWithValidate

export type FieldValidator = (value: unknown) => true | string

export const validatorOf = (f: FieldWithValidate): FieldValidator => {
  const v = f.validate
  if (typeof v !== 'function') throw new Error('expected a validate function')
  return (value: unknown) => (v as (val: unknown) => true | string)(value)
}
