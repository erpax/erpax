import { describe, it, expect } from 'vitest'
import {
  detectSelfDealing,
  detectSelfDealingTransitive,
  resolveUltimateOwners,
  detectShellVendor,
  detectDuplicateClaim,
  detectDuplicateClaimByMetadata,
  detectSplitPurchases,
  detectBidRotation,
  detectBidCartelPairs,
} from '@/anti/corruption/cross-entity'

describe('anti-corruption cross-entity — the schemes only the GRAPH + FEDERATION can see', () => {
  it('self-dealing: approver who owns the payee is caught (ACFE conflict of interest)', () => {
    expect(detectSelfDealing('boss', ['boss', 'spouse']).violation).toBe(true)
    expect(detectSelfDealing('clerk', ['owner-x']).violation).toBe(false)
  })

  it('transitive self-dealing: a conflict hidden behind intermediary shells is caught', () => {
    // approver "boss" owns shell-X, shell-X owns the payee — direct check sees nothing
    const ownership = { payee: ['shell-X'], 'shell-X': ['boss'] }
    expect(detectSelfDealing('boss', ['shell-X']).violation).toBe(false) // direct check is blind
    const r = detectSelfDealingTransitive('boss', 'payee', ownership)
    expect(r.violation).toBe(true)
    expect(r.ultimateOwners.sort()).toEqual(['boss', 'shell-X'])
  })

  it('transitive ownership resolution is cycle-safe and depth-bounded', () => {
    const cyclic = { a: ['b'], b: ['a'] }
    expect(resolveUltimateOwners('a', cyclic).sort()).toEqual(['a', 'b']) // no infinite loop
    const deep = { p0: ['p1'], p1: ['p2'], p2: ['p3'], p3: ['p4'] }
    expect(resolveUltimateOwners('p0', deep, 2)).toEqual(['p1', 'p2']) // stops at maxDepth hops
  })

  it('shell vendor: no beneficial owner + no activity is flagged (FATF R.24 / U4)', () => {
    const shell = detectShellVendor({ beneficialOwnerIds: [], hasActivity: false, registeredButHollow: true })
    expect(shell.suspicious).toBe(true)
    expect(shell.reasons.length).toBe(3)
    expect(detectShellVendor({ beneficialOwnerIds: ['real-owner'], hasActivity: true }).suspicious).toBe(false)
  })

  it('multiple-invoicing: the merge law detects ONE invoice claimed by TWO institutions', () => {
    const r = detectDuplicateClaim([
      { contentUuid: 'inv-uuid-1', institution: 'ministry-A' },
      { contentUuid: 'inv-uuid-1', institution: 'municipality-B' }, // same content ⇒ same id ⇒ collision
      { contentUuid: 'inv-uuid-2', institution: 'ministry-A' },
    ])
    expect(r.collisions).toHaveLength(1)
    expect(r.collisions[0].contentUuid).toBe('inv-uuid-1')
    expect(r.collisions[0].institutions.sort()).toEqual(['ministry-A', 'municipality-B'])
  })

  it('multiple-invoicing despite modified content: same vendor+amount+date across institutions is caught', () => {
    const r = detectDuplicateClaimByMetadata([
      { vendor: 'acme', amount: 5000, date: '2026-01-10', institution: 'ministry-A', contentUuid: 'uuid-1' },
      { vendor: 'acme', amount: 5000, date: '2026-01-10', institution: 'municipality-B', contentUuid: 'uuid-2' }, // edited copy, different uuid
      { vendor: 'acme', amount: 5000, date: '2026-02-01', institution: 'ministry-A', contentUuid: 'uuid-3' }, // different date, legit
    ])
    expect(r.collisions).toHaveLength(1)
    expect(r.collisions[0]).toMatchObject({ vendor: 'acme', amount: 5000, date: '2026-01-10' })
    expect(r.collisions[0].institutions.sort()).toEqual(['ministry-A', 'municipality-B'])
  })

  it('split purchases: sub-threshold orders that together breach the gate are flagged', () => {
    const r = detectSplitPurchases(
      [
        { vendorId: 'v1', amount: 9000 },
        { vendorId: 'v1', amount: 9500 }, // both under 10000, together 18500 > threshold
        { vendorId: 'v2', amount: 9000 }, // single order, not split
      ],
      10_000,
    )
    expect(r.flagged).toHaveLength(1)
    expect(r.flagged[0]).toMatchObject({ vendorId: 'v1', total: 18_500, count: 2 })
  })

  it('a single legitimate over-threshold order is NOT a split-purchase', () => {
    expect(detectSplitPurchases([{ vendorId: 'v3', amount: 50_000 }], 10_000).flagged).toHaveLength(0)
  })

  it('bid-rigging: a recurring bidder cartel with a rotating winner is flagged (no single tender looks wrong)', () => {
    const r = detectBidRotation([
      { tenderId: 't1', bidders: ['A', 'B', 'C'], winner: 'A' },
      { tenderId: 't2', bidders: ['A', 'B', 'C'], winner: 'B' }, // same ring, winner rotated
      { tenderId: 't3', bidders: ['A', 'B', 'C'], winner: 'C' },
    ])
    expect(r.rings).toHaveLength(1)
    expect(r.rings[0].bidders).toEqual(['A', 'B', 'C'])
    expect(r.rings[0].winners.sort()).toEqual(['A', 'B', 'C'])
  })

  it('genuine competition (different bidder sets, or one-off tenders) is NOT flagged', () => {
    expect(detectBidRotation([
      { tenderId: 't1', bidders: ['A', 'B'], winner: 'A' },
      { tenderId: 't2', bidders: ['C', 'D'], winner: 'C' }, // different cartel each time
    ]).rings).toHaveLength(0)
  })

  it('drifting cartel: a co-occurring bidder PAIR with a rotating winner is caught even as membership changes', () => {
    // exact-set detector misses this — the third bidder differs each tender
    const tenders = [
      { tenderId: 't1', bidders: ['A', 'B', 'C'], winner: 'A' },
      { tenderId: 't2', bidders: ['A', 'B', 'D'], winner: 'B' }, // C swapped for D, core A+B persists
    ]
    expect(detectBidRotation(tenders).rings).toHaveLength(0) // exact-set blind to the drift
    const r = detectBidCartelPairs(tenders)
    const ab = r.rings.find((g) => g.pair[0] === 'A' && g.pair[1] === 'B')
    expect(ab).toBeDefined()
    expect(ab!.tenders.sort()).toEqual(['t1', 't2'])
    expect(ab!.winners.sort()).toEqual(['A', 'B'])
  })

  it('drift detector does not flag a stable winner or a one-off pair', () => {
    expect(detectBidCartelPairs([
      { tenderId: 't1', bidders: ['A', 'B'], winner: 'A' },
      { tenderId: 't2', bidders: ['A', 'B'], winner: 'A' }, // recurs but winner never rotates
    ]).rings).toHaveLength(0)
    expect(detectBidCartelPairs([
      { tenderId: 't1', bidders: ['A', 'B'], winner: 'A' }, // single co-occurrence
    ]).rings).toHaveLength(0)
  })
})
