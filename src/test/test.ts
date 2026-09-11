import { describe, it, expect, afterAll } from 'vitest'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import type { Field } from 'payload'
import { isNamedField, fieldWithValidate, validatorOf, needsPayload } from '@/test'

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

describe('test — which suites need the Payload boot', () => {
  const root = mkdtempSync(join(tmpdir(), 'erpax-suite-'))
  afterAll(() => rmSync(root, { recursive: true, force: true }))
  const put = (rel: string, body: string): void => {
    mkdirSync(join(root, rel, '..'), { recursive: true })
    writeFileSync(join(root, rel), body)
  }
  put('src/boots/test.ts', "import { getPayload } from 'payload'\n")
  put('src/pure/test.ts', "import { add } from './index'\n")
  put('src/pure/index.ts', 'export const add = (a: number, b: number) => a + b\n')
  put('src/indirect/test.ts', "import { bootVerdict } from './index'\n")
  put('src/indirect/index.ts', 'export const bootVerdict = () => req.payload\n')

  it('a suite naming the runtime is integration; a pure one is unit', () => {
    expect(needsPayload('src/boots/test.ts', root)).toBe(true)
    expect(needsPayload('src/pure/test.ts', root)).toBe(false)
  })

  it('a suite whose own atom boots Payload is integration, though the suite never names it', () => {
    expect(needsPayload('src/indirect/test.ts', root)).toBe(true)
  })

  it('an unreadable directory errs toward integration — a starved DB suite is worse than a slow pure one', () => {
    expect(needsPayload('src/missing/test.ts', root)).toBe(true)
  })
})
