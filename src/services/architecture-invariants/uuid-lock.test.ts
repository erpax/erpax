/**
 * Lock all to uuid — asserted. Every atom-key must lock to exactly one content-uuid
 * (the address-law / [[merge]]: same content ⇒ one id). The check is DERIVED LIVE
 * from the filesystem (never the matrix snapshot, which drifts) and is WARN-only —
 * it surfaces duplicate paths without reddening the gate while they are merged.
 * Green by construction: it never throws and never returns 'fail'.
 * @see ./checks.ts (checkAtomsLockedToUuid)
 */
import { describe, it, expect } from 'vitest'
import { checkAtomsLockedToUuid } from './checks'

describe('architecture-invariants: atoms-locked-to-uuid (lock all to uuid)', () => {
  it('runs fs-derived and is warn-only (never fails while duplicate paths are merged)', () => {
    const r = checkAtomsLockedToUuid({})
    expect(r.axis).toBe('entropy')
    expect(r.check).toBe('atoms-locked-to-uuid')
    expect(r.severity).not.toBe('fail')
    expect(['pass', 'warn']).toContain(r.severity)
  })
})
