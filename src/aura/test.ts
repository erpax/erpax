import { describe, it, expect } from 'vitest'
import { norm, stripCode, LINK_RE, leafOf, crossSeals } from '@/aura'

describe('aura', () => {
  // norm: lowercase + strip [-_]
  it('norm lowercases and strips hyphens', () => {
    expect(norm('Hello-World')).toBe('helloworld')
  })
  it('norm strips underscores', () => {
    expect(norm('foo_bar_baz')).toBe('foobarbaz')
  })
  it('norm is idempotent on already-clean input', () => {
    expect(norm('aura')).toBe('aura')
  })
  it('norm strips mixed separators', () => {
    expect(norm('A-B_C')).toBe('abc')
  })

  // stripCode: removes fenced and inline code blocks
  it('stripCode removes fenced code blocks', () => {
    const input = 'before\n```\nconst x = [[link]]\n```\nafter'
    const result = stripCode(input)
    expect(result).not.toContain('[[link]]')
    expect(result).toContain('before')
    expect(result).toContain('after')
  })
  it('stripCode removes inline code', () => {
    const input = 'see `[[link]]` for details'
    const result = stripCode(input)
    expect(result).not.toContain('[[link]]')
    expect(result).toContain('see')
    expect(result).toContain('for details')
  })
  it('stripCode leaves plain text untouched', () => {
    const input = '[[aura]] is the whole'
    expect(stripCode(input)).toBe('[[aura]] is the whole')
  })

  // LINK_RE: matches [[word]], [[a/b]], [[word|alias]], not [[_bad]]
  it('LINK_RE matches a simple [[word]]', () => {
    LINK_RE.lastIndex = 0
    const m = '[[aura]] and [[gate]]'.matchAll(new RegExp(LINK_RE.source, LINK_RE.flags))
    const matches = [...m].map((x) => x[1])
    expect(matches).toEqual(['aura', 'gate'])
  })
  it('LINK_RE matches path-form [[a/b]]', () => {
    LINK_RE.lastIndex = 0
    const m = '[[migrate/quaternary]]'.matchAll(new RegExp(LINK_RE.source, LINK_RE.flags))
    const matches = [...m].map((x) => x[1])
    expect(matches).toEqual(['migrate/quaternary'])
  })
  it('LINK_RE matches alias-form [[word|alias]]', () => {
    LINK_RE.lastIndex = 0
    const m = '[[tamper|tamper-cost]]'.matchAll(new RegExp(LINK_RE.source, LINK_RE.flags))
    const matches = [...m].map((x) => x[1])
    expect(matches).toEqual(['tamper'])
  })
  it('LINK_RE does not match a link starting with non-alpha', () => {
    LINK_RE.lastIndex = 0
    const m = '[[_bad]] [[123bad]]'.matchAll(new RegExp(LINK_RE.source, LINK_RE.flags))
    expect([...m]).toHaveLength(0)
  })

  // leafOf: basename of dirname of the SKILL.md path
  it('leafOf returns the atom folder name', () => {
    expect(leafOf('/Users/x/src/aura/SKILL.md')).toBe('aura')
  })
  it('leafOf handles nested path', () => {
    expect(leafOf('/root/src/migrate/quaternary/SKILL.md')).toBe('quaternary')
  })
})

// The cross organ — the third aura completeness axis, derived from the live tree.
// A quantum cross (x · quantum/x · x/quantum · quantum) is sealed iff its two
// diagonals collapse to one canonical. This is THE GATE: no diagonal may duplicate
// its twin (duplication is entropy), so unsealed must be empty.
describe('aura: quantum crosses are sealed (derived from the live tree)', () => {
  const { crosses, unsealed } = crossSeals()

  it('detects the memory cross and finds it sealed', () => {
    const mem = crosses.find((c) => c.base === 'memory')
    expect(mem).toBeDefined()
    expect(mem?.sealed).toBe(true)
  })

  it('every quantum cross is sealed — no diagonal restates its twin', () => {
    expect(unsealed.map((c) => c.base)).toEqual([])
  })
})
