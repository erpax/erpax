import { describe, expect, it } from 'vitest'

import { faceOf } from '@/rules/face'

// The file that stood here asserted expect(true).toBe(true) — it passed for every
// possible state of footer and forbade nothing. What footer actually owes its
// callers is its FACE: import { X } from '@/footer' breaks the moment the barrel
// stops offering X, and nothing else in the tree reports that.
const OFFERED = [
  "Footer",
  "FooterGlobal"
] as const

describe('footer — the face it owes its callers', () => {
  it('offers every name a caller may import', () => {
    const live = new Set(faceOf('footer'))
    const lost = OFFERED.filter((n) => !live.has(n))
    expect(lost).toEqual([])
  })

  it('offers 2 name(s) — a silent drop changes the count', () => {
    expect(faceOf('footer').length).toBeGreaterThanOrEqual(OFFERED.length)
  })

  it('names nothing twice — a duplicated export is an ambiguous import', () => {
    const live = faceOf('footer')
    expect(new Set(live).size).toBe(live.length)
  })
})
