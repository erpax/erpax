import { describe, expect, it } from 'vitest'

import { faceOf } from '@/rules/face'

// The file that stood here asserted expect(true).toBe(true) — it passed for every
// possible state of header and forbade nothing. What header actually owes its
// callers is its FACE: import { X } from '@/header' breaks the moment the barrel
// stops offering X, and nothing else in the tree reports that.
const OFFERED = [
  "Header",
  "HeaderGlobal"
] as const

describe('header — the face it owes its callers', () => {
  it('offers every name a caller may import', () => {
    const live = new Set(faceOf('header'))
    const lost = OFFERED.filter((n) => !live.has(n))
    expect(lost).toEqual([])
  })

  it('offers 2 name(s) — a silent drop changes the count', () => {
    expect(faceOf('header').length).toBeGreaterThanOrEqual(OFFERED.length)
  })

  it('names nothing twice — a duplicated export is an ambiguous import', () => {
    const live = faceOf('header')
    expect(new Set(live).size).toBe(live.length)
  })
})
