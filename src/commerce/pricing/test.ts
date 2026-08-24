import { describe, expect, it } from 'vitest'

import { faceOf } from '@/rules/face'

// The file that stood here asserted expect(true).toBe(true) — it passed for every
// possible state of commerce/pricing and forbade nothing. What pricing actually owes its
// callers is its FACE: import { X } from '@/commerce/pricing' breaks the moment the barrel
// stops offering X, and nothing else in the tree reports that.
const OFFERED = [
  "CheckoutRequest",
  "CheckoutSession",
  "ProvisionRequest",
  "ProvisionResult",
  "RoleProfileId",
  "SubscriptionTier",
  "UsageMeter",
  "checkCommerceLifecycle",
  "checkout",
  "listSubscriptions",
  "meterUsage",
  "provisionInstance"
] as const

describe('commerce/pricing — the face it owes its callers', () => {
  it('offers every name a caller may import', () => {
    const live = new Set(faceOf('commerce/pricing'))
    const lost = OFFERED.filter((n) => !live.has(n))
    expect(lost).toEqual([])
  })

  it('offers 12 name(s) — a silent drop changes the count', () => {
    expect(faceOf('commerce/pricing').length).toBeGreaterThanOrEqual(OFFERED.length)
  })

  it('names nothing twice — a duplicated export is an ambiguous import', () => {
    const live = faceOf('commerce/pricing')
    expect(new Set(live).size).toBe(live.length)
  })
})
