/**
 * Tamper-cost — the security math, asserted. Green by construction: these tests
 * ARE the proof that "how much to crack a zero-entropy app" resolves the way the
 * uuid/identity skills claim. @see ./index.ts, src/uuid/SKILL.md
 */
import { describe, it, expect } from 'vitest'
import {
  ERPAX_DIGEST_BITS,
  BITCOIN_HASHRATE_LOG2,
  secondPreimageLog2,
  birthdayLog2,
  birthdayMarginBits,
  bruteYearsLog2,
  tamperEvasionProbability,
  coverageCostLog2,
  crackVerdict,
  replicationChecks,
} from './index'

describe('tamper-cost: NIST SP 800-107 hash strengths', () => {
  it('second-preimage of the erpax digest is 2^106', () => {
    expect(secondPreimageLog2(ERPAX_DIGEST_BITS)).toBe(106)
  })
  it('birthday-collision resistance is half the digest (2^53)', () => {
    expect(birthdayLog2(ERPAX_DIGEST_BITS)).toBe(53)
  })
})

describe('tamper-cost: forging one record is infeasible', () => {
  it('the whole Bitcoin network needs thousands of years for ONE second-preimage', () => {
    const yearsLog2 = bruteYearsLog2(secondPreimageLog2(ERPAX_DIGEST_BITS), BITCOIN_HASHRATE_LOG2)
    // 2^106 ops at ~2^94 hashes/year ⇒ ~2^12 ≈ 4000 years
    expect(yearsLog2).toBeGreaterThan(11)
    expect(2 ** yearsLog2).toBeGreaterThan(1000)
  })
})

describe('tamper-cost: the birthday caveat the audit flagged', () => {
  it('106 bits is SAFE at realistic scale (1e9 uuids/namespace)', () => {
    expect(birthdayMarginBits(ERPAX_DIGEST_BITS, 1e9)).toBeGreaterThan(0)
  })
  it('106 bits is PAST the birthday bound at the comment\'s claimed 1e25 scale', () => {
    // 1e25 ≈ 2^83 ≫ 2^53 ⇒ negative margin. The "1e25 ≪ 2^53" comment is wrong.
    expect(birthdayMarginBits(ERPAX_DIGEST_BITS, 1e25)).toBeLessThan(0)
  })
})

describe('tamper-cost: the anchor is what makes a zero-entropy store tamper-proof', () => {
  it('UN-anchored: a writer rewrites the deterministic whole for free — NOT tamper-evident', () => {
    const v = crackVerdict({ anchored: false })
    expect(v.tamperEvident).toBe(false)
    expect(v.binding).toBe('free-rewrite')
    expect(v.crackCostLog2).toBe(0)
  })
  it('anchored + strong anchor: bound by the digest second-preimage (2^106)', () => {
    const v = crackVerdict({ anchored: true, anchorStrengthBits: 128 })
    expect(v.tamperEvident).toBe(true)
    expect(v.binding).toBe('second-preimage')
    expect(v.crackCostLog2).toBe(106)
  })
  it('weak anchor is the weak link — flagged, not the digest', () => {
    const v = crackVerdict({ anchored: true, anchorStrengthBits: 64 })
    expect(v.binding).toBe('anchor')
    expect(v.crackCostLog2).toBe(64)
    expect(v.note).toMatch(/weaker/)
  })
})

describe('tamper-cost: coverage increases the cost exponentially (Law 62)', () => {
  it('more coverage ⇒ lower evasion probability', () => {
    expect(tamperEvasionProbability(0.99, 10)).toBeLessThan(tamperEvasionProbability(0.9, 10))
  })
  it('the relation is exponential in the number of checks', () => {
    const p = tamperEvasionProbability(0.9, 10)
    // doubling the checks squares the probability
    expect(tamperEvasionProbability(0.9, 20)).toBeCloseTo(p * p, 12)
  })
  it('cost rises without bound as coverage → 1, and more checks cost more', () => {
    expect(coverageCostLog2(0.99, 10)).toBeGreaterThan(coverageCostLog2(0.9, 10))
    expect(coverageCostLog2(0.9, 20)).toBeGreaterThan(coverageCostLog2(0.9, 10))
  })
  it('100% coverage by architecture (all wired in uuid) ⇒ ∞ — uncrackable', () => {
    expect(coverageCostLog2(1, 1)).toBe(Number.POSITIVE_INFINITY)
    expect(tamperEvasionProbability(1, 1)).toBe(0)
    const v = crackVerdict({ coverage: 1 })
    expect(v.crackCostLog2).toBe(Number.POSITIVE_INFINITY)
    expect(v.note).toMatch(/100% coverage by architecture/)
  })
})

describe('tamper-cost: the headline answer', () => {
  it('default erpax verdict — infeasible to crack, digest-bound', () => {
    const v = crackVerdict({ rows: 1e9 })
    expect(v.tamperEvident).toBe(true)
    expect(v.crackCostLog2).toBe(106)
    expect(2 ** v.bruteYearsLog2).toBeGreaterThan(1000) // millennia of global hashpower
  })
})

describe('tamper-cost: 3FS/CRAQ replication multiplies the checks (deepseek inhale, Law 62 amplified)', () => {
  it('strong consistency (CRAQ) multiplies the checks by the replica count', () => {
    expect(replicationChecks(10, 5, true)).toBe(50)
  })
  it('eventual consistency leaves a stale-read window — replicas do NOT all count', () => {
    expect(replicationChecks(10, 5, false)).toBe(10)
  })
  it('a single replica is a no-op under either consistency', () => {
    expect(replicationChecks(10, 1, true)).toBe(10)
    expect(replicationChecks(10, 1, false)).toBe(10)
  })
  it('more CRAQ replicas ⇒ strictly higher coverage-cost (forge ≫ verify widens, verify stays O(N))', () => {
    const one = crackVerdict({ coverage: 0.99, checks: 10, replicas: 1, strongConsistency: true })
    const five = crackVerdict({ coverage: 0.99, checks: 10, replicas: 5, strongConsistency: true })
    expect(five.crackCostLog2).toBeGreaterThan(one.crackCostLog2)
  })
  it('eventual-consistency replicas do NOT raise the cost (no free lunch without CRAQ)', () => {
    const craq = crackVerdict({ coverage: 0.99, checks: 10, replicas: 5, strongConsistency: true })
    const eventual = crackVerdict({ coverage: 0.99, checks: 10, replicas: 5, strongConsistency: false })
    expect(eventual.crackCostLog2).toBeLessThan(craq.crackCostLog2)
  })
  it('100% coverage is already ∞ — replication cannot exceed the architectural ceiling', () => {
    const v = crackVerdict({ coverage: 1, replicas: 9, strongConsistency: true })
    expect(v.crackCostLog2).toBe(Number.POSITIVE_INFINITY)
  })
  it('replicas with no coverage modelled is an honest no-op (nothing to amplify)', () => {
    const base = crackVerdict({ anchored: true, anchorStrengthBits: 128 })
    const repl = crackVerdict({ anchored: true, anchorStrengthBits: 128, replicas: 9, strongConsistency: true })
    expect(repl.crackCostLog2).toBe(base.crackCostLog2)
  })
})
