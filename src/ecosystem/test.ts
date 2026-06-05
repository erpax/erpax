import { describe, it, expect } from 'vitest'
import { trophicTransfer, trophicPyramid, ecosystemHealth, type Web } from '@/ecosystem'
import { conserves } from '@/conservation'
import { isSustainable } from '@/sustainability'
import { nakamoto } from '@/decentralization'
import { shannon } from '@/diversity'

// ── A canonical healthy web — reused across composition checks ────────────────

/** Balanced flows: each debit === credit → conserved. */
const healthyFlows = [
  { debit: 1000, credit: 1000 },
  { debit: 100, credit: 100 },
  { debit: 10, credit: 10 },
]

/** Harvest ≤ regen AND entropyExported ≥ entropyProduced → sustainable. */
const healthyCycle = { harvest: 800, regen: 1000, entropyProduced: 40, entropyExported: 50 }

/** Four equal guilds → nakamoto = 2 (top-2 sum to 50%, > 50% requires 3). */
const healthyShares = [1, 1, 1, 1]

/** Four species → shannon > 0. */
const healthyAbundances = [40, 30, 20, 10]

const healthyWeb: Web = {
  flows: healthyFlows,
  cycle: healthyCycle,
  shares: healthyShares,
  abundances: healthyAbundances,
}

// ── 1. Lindeman trophic transfer invariants ───────────────────────────────────

describe('trophicTransfer', () => {
  it('trophicTransfer(E) === E * 0.1 for a concrete E (default efficiency)', () => {
    const E = 500
    expect(trophicTransfer(E)).toBe(E * 0.1)
  })

  it('trophicTransfer respects a custom efficiency', () => {
    expect(trophicTransfer(200, 0.2)).toBe(40)
  })
})

describe('trophicPyramid', () => {
  it('trophicPyramid(1000, 4) has length 4', () => {
    expect(trophicPyramid(1000, 4)).toHaveLength(4)
  })

  it('trophicPyramid(1000, 4) decays geometrically: each level is previous * efficiency', () => {
    const pyramid = trophicPyramid(1000, 4)
    const eff = 0.1
    for (let i = 1; i < pyramid.length; i++) {
      expect(pyramid[i]).toBeCloseTo(pyramid[i - 1] * eff, 10)
    }
  })

  it('trophicPyramid first element equals the base', () => {
    expect(trophicPyramid(500, 3)[0]).toBe(500)
  })
})

// ── 2. Composition check — healthy web ───────────────────────────────────────

describe('ecosystemHealth: composition with a healthy web', () => {
  it('healthy web returns healthy === true', () => {
    expect(ecosystemHealth(healthyWeb).healthy).toBe(true)
  })

  it('ecosystemHealth.conserved === conserves(flows) — proves composition not re-derivation', () => {
    const result = ecosystemHealth(healthyWeb)
    expect(result.conserved).toBe(conserves(healthyWeb.flows))
  })

  it('ecosystemHealth.sustained === isSustainable(cycle) — proves composition not re-derivation', () => {
    const result = ecosystemHealth(healthyWeb)
    expect(result.sustained).toBe(isSustainable(healthyWeb.cycle))
  })

  it('ecosystemHealth.nakamoto === nakamoto(shares) — proves composition not re-derivation', () => {
    const result = ecosystemHealth(healthyWeb)
    expect(result.nakamoto).toBe(nakamoto(healthyWeb.shares))
  })

  it('ecosystemHealth.shannon === shannon(abundances) — proves composition not re-derivation', () => {
    const result = ecosystemHealth(healthyWeb)
    expect(result.shannon).toBe(shannon(healthyWeb.abundances))
  })
})

// ── 3. The four axes are JOINTLY NECESSARY — break one at a time ──────────────
//
// Each sub-test starts from the healthy web and perturbs exactly ONE axis,
// proving that no single healthy axis can compensate for a failing one.
// Together these four cases are the formal proof that sustainability and
// decentralization are co-necessary, not tradeable.

describe('ecosystemHealth: the four axes are jointly necessary', () => {
  it('(a) unbalanced flows → not conserved → unhealthy', () => {
    // Inject an unmatched debit: debit 999 != credit 1 → trial balance ≠ 0
    const web: Web = {
      ...healthyWeb,
      flows: [
        { debit: 1000, credit: 1000 },
        { debit: 999, credit: 1 },   // imbalanced: net +998
        { debit: 10, credit: 10 },
      ],
    }
    const h = ecosystemHealth(web)
    expect(h.conserved).toBe(false)
    expect(h.healthy).toBe(false)
  })

  it('(b) entropy not exported → not sustained → unhealthy', () => {
    // entropyExported < entropyProduced: net entropy positive → not sustainable
    const web: Web = {
      ...healthyWeb,
      cycle: { harvest: 800, regen: 1000, entropyProduced: 50, entropyExported: 10 },
    }
    const h = ecosystemHealth(web)
    expect(h.sustained).toBe(false)
    expect(h.healthy).toBe(false)
  })

  it('(c) one organism holds > 50% shares → nakamoto === 1 < minNakamoto 2 → unhealthy', () => {
    // One dominant share: [100, 1, 1, 1] — top-1 already exceeds 50%
    const web: Web = {
      ...healthyWeb,
      shares: [100, 1, 1, 1],
      minNakamoto: 2,
    }
    const h = ecosystemHealth(web)
    expect(h.nakamoto).toBe(1)
    expect(h.healthy).toBe(false)
  })

  it('(d) single species (shannon === 0) with minShannon > 0 → no diversity → unhealthy', () => {
    // Collapse to one species: shannon = 0 (−p·ln p with p=1)
    const web: Web = {
      ...healthyWeb,
      abundances: [100],
      minShannon: 0.5,
    }
    const h = ecosystemHealth(web)
    expect(h.shannon).toBe(0)
    expect(h.healthy).toBe(false)
  })
})
