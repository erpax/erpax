import { describe, it, expect } from 'vitest'
import { wordTokenUuid, wordDiamond } from '@/word'

describe('word: lexical token diamond', () => {
  it('wordTokenUuid is deterministic', () => {
    expect(wordTokenUuid('hello')).toBe(wordTokenUuid('hello'))
    expect(wordTokenUuid('hello')).not.toBe(wordTokenUuid('world'))
  })

  it('wordDiamond carries kind, value, and tokenUuid', () => {
    const d = wordDiamond('erpax')
    expect(d).toEqual({ kind: 'word', value: 'erpax', tokenUuid: wordTokenUuid('erpax') })
  })
})
