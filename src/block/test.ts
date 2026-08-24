import { describe, expect, it } from 'vitest'

import { faceOf } from '@/rules/face'

// The file that stood here asserted expect(true).toBe(true) — it passed for every
// possible state of block and forbade nothing. What block actually owes its
// callers is its FACE: import { X } from '@/block' breaks the moment the barrel
// stops offering X, and nothing else in the tree reports that.
const OFFERED = [
  "RenderBlocks"
] as const

describe('block — the face it owes its callers', () => {
  it('offers every name a caller may import', () => {
    const live = new Set(faceOf('block'))
    const lost = OFFERED.filter((n) => !live.has(n))
    expect(lost).toEqual([])
  })

  it('offers 1 name(s) — a silent drop changes the count', () => {
    expect(faceOf('block').length).toBeGreaterThanOrEqual(OFFERED.length)
  })

  it('names nothing twice — a duplicated export is an ambiguous import', () => {
    const live = faceOf('block')
    expect(new Set(live).size).toBe(live.length)
  })
})
