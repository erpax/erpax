import { describe, it, expect } from 'vitest'
import { defineTranslation } from '@/translation'
import { messageUuid, splitWords } from '@/message'
import { defaultLocale } from '@/i18n/localization'

// The translation model — green by construction: it is exactly the messaging-uuid
// (../message) applied to a keyed source string, en-sourced + per-locale.
describe('translation model', () => {
  it('ports a message to a content-addressed, word-split, en-sourced entry', () => {
    const t = defineTranslation('description', 'Age is a dimension')
    expect(t.key).toBe('description')
    expect(t.source).toBe('Age is a dimension')
    expect(t.uuid).toBe(messageUuid('Age is a dimension'))
    expect(t.words).toEqual(splitWords('Age is a dimension'))
    expect(t.values[defaultLocale]).toBe('Age is a dimension')
  })

  it('is deterministic and merges locale overrides over the en source', () => {
    const mk = () => defineTranslation('x', 'hello world', { bg: 'здравей свят' })
    expect(mk()).toEqual(mk())
    expect(mk().values.en).toBe('hello world')
    expect(mk().values.bg).toBe('здравей свят')
  })
})
