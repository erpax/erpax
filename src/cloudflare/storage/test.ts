import { describe, expect, it } from 'vitest'

import { faceOf } from '@/rules/face'

// The file that stood here asserted expect(true).toBe(true) — it passed for every
// possible state of cloudflare/storage and forbade nothing. What storage actually owes its
// callers is its FACE: import { X } from '@/cloudflare/storage' breaks the moment the barrel
// stops offering X, and nothing else in the tree reports that.
const OFFERED = [
  "auditChainAppend",
  "auditChainAppendLinked",
  "auditChainVerify",
  "counterGet",
  "counterIncrement",
  "kvGet",
  "kvPut",
  "r2Get",
  "r2Put",
  "vectorizeInsert",
  "vectorizeQuery"
] as const

describe('cloudflare/storage — the face it owes its callers', () => {
  it('offers every name a caller may import', () => {
    const live = new Set(faceOf('cloudflare/storage'))
    const lost = OFFERED.filter((n) => !live.has(n))
    expect(lost).toEqual([])
  })

  it('offers 11 name(s) — a silent drop changes the count', () => {
    expect(faceOf('cloudflare/storage').length).toBeGreaterThanOrEqual(OFFERED.length)
  })

  it('names nothing twice — a duplicated export is an ambiguous import', () => {
    const live = faceOf('cloudflare/storage')
    expect(new Set(live).size).toBe(live.length)
  })
})
