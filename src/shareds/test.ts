import { describe, expect, it } from 'vitest'

import { faceOf } from '@/rules/face'

// The file that stood here asserted expect(true).toBe(true) — it passed for every
// possible state of shareds and forbade nothing. What shareds actually owes its
// callers is its FACE: import { X } from '@/shareds' breaks the moment the barrel
// stops offering X, and nothing else in the tree reports that.
const OFFERED = [
  "defaultVersionedDrafts",
  "documentPreviewAdmin"
] as const

describe('shareds — the face it owes its callers', () => {
  it('offers every name a caller may import', () => {
    const live = new Set(faceOf('shareds'))
    const lost = OFFERED.filter((n) => !live.has(n))
    expect(lost).toEqual([])
  })

  it('offers 2 name(s) — a silent drop changes the count', () => {
    expect(faceOf('shareds').length).toBeGreaterThanOrEqual(OFFERED.length)
  })

  it('names nothing twice — a duplicated export is an ambiguous import', () => {
    const live = faceOf('shareds')
    expect(new Set(live).size).toBe(live.length)
  })
})
