import { describe, expect, it } from 'vitest'

import { faceOf } from '@/rules/face'

// The file that stood here asserted expect(true).toBe(true) — it passed for every
// possible state of audit/trail and forbade nothing. What trail actually owes its
// callers is its FACE: import { X } from '@/audit/trail' breaks the moment the barrel
// stops offering X, and nothing else in the tree reports that.
const OFFERED = [
  "AuditEventCtx",
  "AuditEventInput",
  "ChainLinkStatus",
  "WriteAuditEventResult",
  "writeAuditEvent"
] as const

describe('audit/trail — the face it owes its callers', () => {
  it('offers every name a caller may import', () => {
    const live = new Set(faceOf('audit/trail'))
    const lost = OFFERED.filter((n) => !live.has(n))
    expect(lost).toEqual([])
  })

  it('offers 5 name(s) — a silent drop changes the count', () => {
    expect(faceOf('audit/trail').length).toBeGreaterThanOrEqual(OFFERED.length)
  })

  it('names nothing twice — a duplicated export is an ambiguous import', () => {
    const live = faceOf('audit/trail')
    expect(new Set(live).size).toBe(live.length)
  })
})
