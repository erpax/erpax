import { describe, it, expect } from 'vitest'
import { translateField } from './index'
import { defineTranslation } from '@/translation'

const table = [defineTranslation('greet', 'hello world', { bg: 'здравей свят', de: 'hallo welt' })]
const hook = translateField(table)
// Call the field hook with a minimal mock of Payload's args (only value + req.locale are read).
const read = (value: unknown, locale?: string): unknown =>
  (hook as (a: { value: unknown; req: { locale?: string } }) => unknown)({ value, req: { locale } })

describe('translate/field — Payload afterRead hook self-translates via the rosetta pivot', () => {
  it('projects the source into a registered locale through the shared uuid', () => {
    expect(read('hello world', 'bg')).toBe('здравей свят')
    expect(read('hello world', 'de')).toBe('hallo welt')
  })

  it('default locale and missing locale pass the source through unchanged', () => {
    expect(read('hello world', 'en')).toBe('hello world')
    expect(read('hello world', undefined)).toBe('hello world')
  })

  it('an unregistered locale falls back to the SOURCE — never fabricates a translation', () => {
    expect(read('hello world', 'ja')).toBe('hello world') // ja is the seed → honest source fallback
  })

  it('a non-concept value passes through (free text is the model, not the hook)', () => {
    expect(read('some untranslated phrase', 'bg')).toBe('some untranslated phrase')
  })

  it('non-string / empty values pass through untouched', () => {
    expect(read(42, 'bg')).toBe(42)
    expect(read('', 'bg')).toBe('')
    expect(read(null, 'bg')).toBeNull()
  })
})
