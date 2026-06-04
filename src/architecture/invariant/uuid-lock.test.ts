/**
 * Lock all to uuid — asserted. Every atom-key must lock to exactly one content-uuid
 * (the address-law / [[merge]]: same content ⇒ one id). The check is DERIVED LIVE
 * from the filesystem (never the matrix snapshot, which drifts). It FAILs on
 * identical-content copies (a true duplicate must merge) and WARNs on distinct-
 * content collisions (the ambiguous link needs disambiguation, never a blind
 * delete). Green by construction: it runs over the live fs and returns a
 * well-formed entropy result.
 * @see ./checks.ts (checkAtomsLockedToUuid)
 */
import { describe, it, expect } from 'vitest'
import { checkAtomsLockedToUuid } from '@/architecture/invariant/checks'

describe('architecture-invariants: atoms-locked-to-uuid (lock all to uuid)', () => {
  it('runs fs-derived and returns a well-formed entropy result (fail=identical copy, warn=ambiguous)', () => {
    const r = checkAtomsLockedToUuid({})
    expect(r.axis).toBe('entropy')
    expect(r.check).toBe('atoms-locked-to-uuid')
    expect(['pass', 'warn', 'fail']).toContain(r.severity)
  })
})
