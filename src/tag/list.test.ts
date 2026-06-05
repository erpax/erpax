import { describe, it, expect } from 'vitest'
import { parseTagList, toTagListString, cleanTagNames, reconcileTags } from '@/tag/list'

describe('tag/list — TagList + DefaultParser port (the text↔tags bridge)', () => {
  it('parses a delimited string: trims, lower-cases, dedupes (preserving order)', () => {
    expect(parseTagList('One , Two,  Three')).toEqual(['one', 'two', 'three'])
    expect(parseTagList('a, a, A, b')).toEqual(['a', 'b']) // case-insensitive dedupe
    expect(parseTagList('')).toEqual([])
    expect(parseTagList(null)).toEqual([])
    expect(parseTagList('  ,  , ')).toEqual([]) // all blank
  })

  it('keeps an embedded delimiter inside a quoted tag (quoted tags lifted first, per the gem)', () => {
    // The gem's DefaultParser extracts quoted tags FIRST, then splits the rest —
    // so quoted names lead. Order is cosmetic (taggings are a set), the content is what matters.
    expect(parseTagList('Round, "Square,Cube"')).toEqual(['square,cube', 'round'])
    expect(parseTagList("'a,b', c")).toEqual(['a,b', 'c'])
    expect(parseTagList('"a,b","c,d"')).toEqual(['a,b', 'c,d']) // consecutive quoted
    expect([...parseTagList('Round, "Square,Cube"')].sort()).toEqual(['round', 'square,cube'])
  })

  it('accepts an array and custom delimiter', () => {
    expect(parseTagList(['Fun', 'Happy'])).toEqual(['fun', 'happy'])
    expect(parseTagList('a;b;c', { delimiter: ';' })).toEqual(['a', 'b', 'c'])
    expect(parseTagList('A B C', { delimiter: ' ', lowercase: false })).toEqual(['A', 'B', 'C'])
  })

  it('toTagListString is the inverse — joins with ", " and quotes names with a delimiter', () => {
    expect(toTagListString(['round', 'square,cube'])).toBe('round, "square,cube"')
    expect(toTagListString(['a', 'b', 'c'])).toBe('a, b, c')
    // a name with an embedded delimiter survives a full round-trip (as a set)
    const s = 'alpha, "beta,gamma", delta'
    expect([...parseTagList(s)].sort()).toEqual(['alpha', 'beta,gamma', 'delta'])
    expect(toTagListString(['alpha', 'beta,gamma', 'delta'])).toBe('alpha, "beta,gamma", delta')
  })

  it('cleanTagNames is the shared normaliser', () => {
    expect(cleanTagNames([' A ', 'a', '', 'B'])).toEqual(['a', 'b'])
    expect(cleanTagNames(['A', 'a'], { lowercase: false })).toEqual(['A', 'a']) // distinct without folding
  })

  it('reconcileTags is the pure save_tags diff (add new, remove dropped)', () => {
    expect(reconcileTags([1, 2, 3], [2, 3, 4])).toEqual({ add: [4], remove: [1] })
    expect(reconcileTags(['a', 'b'], ['a', 'b'])).toEqual({ add: [], remove: [] }) // no-op
    expect(reconcileTags([], ['x'])).toEqual({ add: ['x'], remove: [] }) // first tagging
    expect(reconcileTags(['x'], [])).toEqual({ add: [], remove: ['x'] }) // cleared
  })
})
