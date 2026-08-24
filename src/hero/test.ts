import { describe, expect, it } from 'vitest'

import { faceOf } from '@/rules/face'

// The file that stood here asserted expect(true).toBe(true) — it passed for every
// possible state of hero and forbade nothing. What hero actually owes its
// callers is its FACE: import { X } from '@/hero' breaks the moment the barrel
// stops offering X, and nothing else in the tree reports that.
const OFFERED = [
  "hero"
] as const

describe('hero — the face it owes its callers', () => {
  it('offers every name a caller may import', () => {
    const live = new Set(faceOf('hero'))
    const lost = OFFERED.filter((n) => !live.has(n))
    expect(lost).toEqual([])
  })

  it('offers 1 name(s) — a silent drop changes the count', () => {
    expect(faceOf('hero').length).toBeGreaterThanOrEqual(OFFERED.length)
  })

  it('names nothing twice — a duplicated export is an ambiguous import', () => {
    const live = faceOf('hero')
    expect(new Set(live).size).toBe(live.length)
  })
})
