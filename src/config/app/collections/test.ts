import { describe, it, expect } from 'vitest'
import { shapesOf } from '@/rules/collapse'
import { APP_COLLECTION_SLUGS } from './index'

/**
 * This list claimed, in plain prose, to be "the source of truth for which collections the app registers with
 * Payload". It holds 8; Payload boots 231. The sentence was FALSE about a real thing — no `@invariant`, no
 * confessed stub, so rules/audience returns 0 for the file. Unlabelled lies are the hardest class, and the
 * only cure is to make the claim refutable. This is that cure.
 */
describe('APP_COLLECTION_SLUGS — the scaffold scope, and it must be REAL', () => {
  // The bug this test would have caught the day it was typed: `user_roles` vs the slug `user-roles`.
  // A one-character typo naming a collection that does not exist, in a list calling itself the source of truth.
  it('every declared slug is actually booted — no slug may name nothing', () => {
    const booted = new Set(shapesOf().map((s) => s.slug))
    const phantom = APP_COLLECTION_SLUGS.filter((s) => !booted.has(s))
    expect(phantom, `declared but not registered: ${phantom.join(', ')}`).toEqual([])
  })

  // The prose said "IS the source of truth". Asserted the honest way: it is a SUBSET, and a small one.
  it('is a strict SUBSET of the registry — it is scope, not the registry', () => {
    const booted = shapesOf().length
    expect(APP_COLLECTION_SLUGS.length).toBeLessThan(booted)
    expect(booted).toBeGreaterThan(200) // 8 of 231 — the claim was off by two orders of magnitude
  })

  it('holds the CMS scaffold it is actually for', () => {
    for (const s of ['tenants', 'pages', 'users']) expect(APP_COLLECTION_SLUGS).toContain(s)
    expect(new Set(APP_COLLECTION_SLUGS).size).toBe(APP_COLLECTION_SLUGS.length) // no slug twice
  })
})
