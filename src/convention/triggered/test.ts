/**
 * convention/triggered — the triggering convention measures itself. coverage = triggered /
 * total must be a real fraction in [0,1] computed live over the tree, and stable across calls
 * (pure over the same tree — no default, no clock).
 */
import { describe, it, expect } from 'vitest'
import { coverage, total, triggered, isTriggered, descriptionOf, TRIGGER } from '@/convention/triggered'

describe('convention/triggered — every SKILL description is a Use-when trigger, measured live', () => {
  it('coverage is a finite fraction in [0,1]', () => {
    const c = coverage()
    expect(Number.isFinite(c)).toBe(true)
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
  })

  it('coverage is deterministic over the same tree (no default, no clock)', () => {
    expect(coverage()).toBe(coverage())
  })

  it('coverage equals triggered / total from the composed corpus walk', () => {
    const t = total()
    const k = triggered()
    expect(t).toBeGreaterThan(0) // the corpus is non-empty by architecture
    expect(k).toBeGreaterThanOrEqual(0) // triggered is a subset count
    expect(k).toBeLessThanOrEqual(t) // …of the same SKILL.md walk
    expect(coverage()).toBe(k / t)
  })

  it('this very atom is itself triggered (its description starts with "Use when"), so coverage > 0', () => {
    expect(isTriggered('src/convention/triggered/SKILL.md')).toBe(true)
    expect(descriptionOf('src/convention/triggered/SKILL.md')?.startsWith(TRIGGER)).toBe(true)
    expect(triggered()).toBeGreaterThan(0)
    expect(coverage()).toBeGreaterThan(0)
  })
})
