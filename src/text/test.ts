import { describe, it, expect, beforeEach } from 'vitest'
import {
  parseText,
  saveTextDiamonds,
  parseSkillText,
  tokenUuidOf,
  getSavedToken,
  clearSavedTokens,
} from '@/text'
import { wordTokenUuid } from '@/word'
import { digitTokenUuid } from '@/digit'

describe('text: words ⊕ digits — parse and save diamonds', () => {
  beforeEach(() => clearSavedTokens())

  it('"hello 42 world" → 3 tokens in order', () => {
    const tokens = parseText('hello 42 world')
    expect(tokens).toHaveLength(3)
    expect(tokens[0]).toMatchObject({ kind: 'word', value: 'hello', index: 0 })
    expect(tokens[1]).toMatchObject({ kind: 'digit', value: '42', index: 1 })
    expect(tokens[2]).toMatchObject({ kind: 'word', value: 'world', index: 2 })
  })

  it('classifies digit-runs vs letter-runs', () => {
    const tokens = parseText('item3 007 beta2')
    expect(tokens.map((t) => `${t.kind}:${t.value}`)).toEqual([
      'word:item',
      'digit:3',
      'digit:007',
      'word:beta',
      'digit:2',
    ])
  })

  it('tokenUuid is deterministic and matches word/digit organs', () => {
    const tokens = parseText('alpha 9')
    expect(tokens[0]!.tokenUuid).toBe(wordTokenUuid('alpha'))
    expect(tokens[1]!.tokenUuid).toBe(digitTokenUuid('9'))
    expect(tokenUuidOf('word', 'alpha')).toBe(tokens[0]!.tokenUuid)
    expect(parseText('alpha 9')).toEqual(tokens)
  })

  it('saveTextDiamonds persists to the in-memory index and folds a stable root', () => {
    const a = saveTextDiamonds('hello 42 world')
    const b = saveTextDiamonds('hello 42 world')
    expect(a.rootUuid).toBe(b.rootUuid)
    expect(a.rootUuid.length).toBeGreaterThan(0)
    for (const t of a.tokens) {
      expect(getSavedToken(t.tokenUuid)).toEqual(t)
    }
  })

  it('saveTextDiamonds with persist:false skips the index', () => {
    const { tokens } = saveTextDiamonds('once', { persist: false })
    expect(tokens).toHaveLength(1)
    expect(getSavedToken(tokens[0]!.tokenUuid)).toBeUndefined()
  })

  it('parseSkillText reads SKILL.md body without frontmatter', () => {
    const tokens = parseSkillText('text')
    expect(tokens.length).toBeGreaterThan(5)
    expect(tokens.some((t) => t.kind === 'word' && t.value.length > 2)).toBe(true)
  })
})
