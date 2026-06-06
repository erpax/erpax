/**
 * convention/addressed — the content-address convention measures itself. coverage = addressed /
 * total must be a real fraction in [0,1] computed live over the tree, and stable across calls (pure
 * over the same tree — no default, no clock).
 */
import { describe, it, expect } from 'vitest'
import { coverage, total, addressed, isAddressed, UUID_V8_RE } from '@/convention/addressed'

describe('convention/addressed — identity is content-addressed (a uuid), measured live', () => {
  it('coverage is a finite fraction in [0,1]', () => {
    const c = coverage()
    expect(Number.isFinite(c)).toBe(true)
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
  })

  it('coverage is deterministic over the same tree (no default, no clock)', () => {
    expect(coverage()).toBe(coverage())
  })

  it('coverage equals addressed / total from the composed corpus walk', () => {
    const t = total()
    const a = addressed()
    expect(t).toBeGreaterThan(0) // the corpus is non-empty by architecture
    expect(a).toBeGreaterThanOrEqual(0) // addressed is a subset count
    expect(a).toBeLessThanOrEqual(t) // …of the same SKILL.md walk
    expect(coverage()).toBe(a / t)
  })

  it('the v8 content-uuid pattern accepts a genuine address and rejects a placeholder', () => {
    expect(UUID_V8_RE.test('00000000-0000-8000-8000-000000000000')).toBe(true)
    expect(UUID_V8_RE.test('not-a-uuid')).toBe(false)
    expect(UUID_V8_RE.test('00000000-0000-4000-8000-000000000000')).toBe(false) // v4, not v8
  })

  it('a known long-lived atom is addressed (its identity is a content-uuid)', () => {
    expect(isAddressed('src/uuid/matrix/SKILL.md')).toBe(true)
    expect(addressed()).toBeGreaterThan(0)
    expect(coverage()).toBeGreaterThan(0)
  })
})
