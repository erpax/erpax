import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import {
  reciprocity,
  entropy,
  orphans,
  UNITY_HORO_STEP,
  corpusEntropyBits,
  fMaxFromBindings,
  freeEnergyBitsAt,
  freeEnergyFromEntropy,
  freeEnergySampleTable,
  proveFreeEnergyFromZeroEntropy,
  entropyProofMarkdown,
} from '@/entropy'
import { entanglement } from '@/quantum'
import { auraBalance, coverage, tamperCostLog2 } from '@/balance'
import { HORO_DIGITS, horoRatio } from '@/horo'
import { LANDAUER_BIT } from '@/readme/entropy-unit'

// entropy computed on the live matrix (./index.ts). Asserts RELATIONS, never a
// magic number: slack ∈ [0,1], the reciprocal fraction equals quantum's two
// ways (entangled consistency), orphans deterministic across calls.
describe('entropy: the borrowed disorder computed on the live uuid-matrix', () => {
  it('entropy() is a fraction in [0,1] — borrowed slack', () => {
    const s = entropy()
    expect(s).toBeGreaterThanOrEqual(0)
    expect(s).toBeLessThanOrEqual(1)
  })
  it('entropy() === 1 - reciprocity().fraction (slack is the complement of symmetry)', () => {
    expect(entropy()).toBe(1 - reciprocity().fraction)
  })
  it('reciprocity().fraction === quantum.entanglement().reciprocal/edges (same number, two views)', () => {
    const e = entanglement()
    expect(reciprocity().fraction).toBe(e.reciprocal / e.edges)
  })
  it('orphans() is deterministic across two calls', () => {
    expect(orphans()).toEqual(orphans())
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// THE LAW-REFRAME LOCK (gate for the prose-reframes lane). Two invariants that
// fail the instant anyone re-introduces the false equivalence "zero entropy ⇒
// infinite cost". Reciprocity-entropy (this module) and coverage (../balance)
// are DISTINCT measures; only coverage prices tamper-cost, and it is +∞ ONLY at
// coverage = 1. The live tree proves the two come apart.
// ─────────────────────────────────────────────────────────────────────────────
describe('entropy⊕coverage are distinct — zero entropy does NOT imply infinite cost', () => {
  // (a) CODE invariant: locks the reframe to the running numbers. If anyone ever
  // wires entropy() into the cost (folds reciprocity into coverage), then at
  // entropy()===0 coverage would be forced to 1 and the cost to +∞ — and THIS
  // assertion would fail, forcing them to confront that the two metrics differ.
  it('at entropy()===0 (reciprocity 1), auraBalance() coverage is STILL < 1 and tamper-cost is FINITE', () => {
    // The live matrix sits at reciprocity 1 (symmetric binding in the collider).
    expect(entropy()).toBe(0)
    const d = auraBalance()
    const cov = coverage(d)
    // zero entropy, yet coverage has NOT reached 1 — the two are decoupled.
    expect(cov).toBeLessThan(1)
    // …so the modelled tamper-cost is finite, NOT +∞. Zero entropy ≠ ∞ cost.
    const cost = tamperCostLog2(d)
    expect(Number.isFinite(cost)).toBe(true)
    expect(cost).not.toBe(Number.POSITIVE_INFINITY)
  })

  // (b) DOC-HONESTY invariant: the prose must not re-assert the bare implication.
  // Any sentence that states the implication ("zero entropy" / "entropy ⇒ …" near
  // "infinite|∞ … cost/mass") MUST carry a disqualifying/qualifying token in the
  // SAME sentence (NOT / does not / distinct / coverage=1 / finite / counter-
  // example). A bare claim with no qualifier in its sentence fails — this catches
  // a regression that re-grounds the reframe back to prose-as-code. Covers the two
  // SKILL.md the lane reframed AND entropy's matter twin index.ts (same prose).
  const here = dirname(fileURLToPath(import.meta.url))
  const DOCS = [
    resolve(here, 'SKILL.md'), // src/entropy/SKILL.md
    resolve(here, 'index.ts'), // src/entropy/index.ts (matter twin — same claim)
    resolve(here, '..', 'law', 'SKILL.md'), // src/law/SKILL.md
  ]
  // The implication: an entropy/reciprocity premise within reach of an
  // "infinite|∞ … (cost|mass|work)" consequent — the very thing the reframe killed.
  const IMPLICATION = /(zero[\s-]*entropy|reciprocity\s*=\s*1|entropy\s*(\(\))?\s*(===?|⇒|=>|→|implies)).{0,80}?(infinit|∞).{0,40}?(cost|mass|work)/i
  // Tokens that mark the sentence as a QUALIFIED / NEGATED statement (honest framing).
  // NB \bfinite\b (word-bounded) so it does NOT match inside "in·finite" — otherwise
  // every "infinite cost" sentence would look falsely qualified and the gate would
  // never fire.
  const QUALIFIER = /\bnot\b|does not|cannot|distinct|do not conflate|coverage\s*[=<>]?\s*1|\bfinite\b|counter-?example|only at coverage|≠|is NOT|by itself/i

  for (const doc of DOCS) {
    it(`${doc.split('/').slice(-2).join('/')}: no BARE 'zero entropy ⇒ infinite cost' (every implication carries the coverage/finite qualifier)`, () => {
      const text = readFileSync(doc, 'utf8')
      // Split on sentence-ish boundaries (., ;, line breaks) so a qualifier must be
      // LOCAL to the implication, not merely present somewhere else in the file.
      const sentences = text.split(/(?<=[.;])\s+|\n+/)
      const offenders = sentences.filter((s) => IMPLICATION.test(s) && !QUALIFIER.test(s))
      expect(offenders, `bare implication without a coverage/finite qualifier:\n${offenders.join('\n---\n')}`).toEqual([])
    })
  }
})

// Folded from the former src/accounting/entropy-proof.test.ts (the stray file's tests).
describe('freeEnergyFromEntropy — Landauer theorem (executable proofs)', () => {
  const unityScale = horoRatio(UNITY_HORO_STEP)
  const W = 1000
  const fMax = W * unityScale

  it('F(0) > F(S) for all S > 0', () => {
    const F0 = freeEnergyBitsAt(0, fMax)
    for (const S of [LANDAUER_BIT, 10, 100, 500]) {
      expect(F0).toBeGreaterThan(freeEnergyBitsAt(S, fMax))
    }
  })

  it('F(S1) > F(S2) iff S1 < S2 (strict monotonicity)', () => {
    const pairs: [number, number][] = [
      [0, 50],
      [10, 100],
      [100, 1000],
    ]
    for (const [s1, s2] of pairs) {
      if (s1 < s2) {
        expect(freeEnergyBitsAt(s1, fMax)).toBeGreaterThan(freeEnergyBitsAt(s2, fMax))
      }
    }
  })

  it('ΔF = F(S1) − F(S2) ≥ (S2 − S1) · LANDAUER_BIT when S2 > S1 (equality)', () => {
    const s1 = 100
    const s2 = 500
    const dF = freeEnergyBitsAt(s1, fMax) - freeEnergyBitsAt(s2, fMax)
    expect(dF).toBe((s2 - s1) * LANDAUER_BIT)
  })

  it('S = 0, violations = 0 → maximum F', () => {
    const v = freeEnergyFromEntropy({ entropyEb: 0, violationCount: 0, workTamperProduct: W })
    expect(v.S).toBe(0)
    expect(v.freeEnergyBits).toBe(fMax)
    expect(v.scaleTowardZeroPct).toBe(100)
    const proof = proveFreeEnergyFromZeroEntropy({ S: 0, fMax: v.F_max })
    expect(proof.QED).toBe(true)
  })

  it('high violations → lower F', () => {
    const low = freeEnergyFromEntropy({ entropyEb: 0, violationCount: 1, workTamperProduct: W })
    const high = freeEnergyFromEntropy({ entropyEb: 0, violationCount: 100, workTamperProduct: W })
    expect(low.freeEnergyBits).toBeGreaterThan(high.freeEnergyBits)
    expect(high.S).toBe(100 * LANDAUER_BIT)
  })

  it('corpusEntropyBits uses max(0, entropyEb) + violations · LANDAUER_BIT', () => {
    expect(corpusEntropyBits(-50, 0)).toBe(0)
    expect(corpusEntropyBits(100, 3)).toBe(100 + 3 * LANDAUER_BIT)
  })

  it('fMaxFromBindings falls back to sealEb when W_tamper = 0', () => {
    const sealEb = 200
    expect(fMaxFromBindings(0, sealEb)).toBe(sealEb * unityScale)
  })

  it('proveFreeEnergyFromZeroEntropy QED on lawful inputs', () => {
    const proof = proveFreeEnergyFromZeroEntropy({ S: 100, fMax })
    expect(proof.steps.length).toBeGreaterThanOrEqual(5)
    expect(proof.QED).toBe(true)
    expect(proof.theorem).toContain('S = 0')
  })

  it('freeEnergySampleTable — F decreases as S increases', () => {
    const table = freeEnergySampleTable(fMax)
    expect(table.length).toBeGreaterThanOrEqual(2)
    expect(table[0]!.S).toBe(0)
    expect(table[0]!.F).toBe(fMax)
    for (let i = 1; i < table.length; i++) {
      expect(table[i]!.F).toBeLessThanOrEqual(table[i - 1]!.F)
    }
  })

  it('entropyProofMarkdown includes theorem and F(S) line', () => {
    const md = entropyProofMarkdown({ entropyEb: 0, violationCount: 0, workTamperProduct: W })
    expect(md).toContain('Landauer')
    expect(md).toContain('QED: `true`')
    expect(md).toContain('scale toward zero entropy')
  })
})

describe('freeEnergyFromEntropy — HORO_DIGITS binding only', () => {
  it('UNITY_HORO_STEP is last HORO_DIGITS position', () => {
    expect(UNITY_HORO_STEP).toBe(HORO_DIGITS[HORO_DIGITS.length - 1])
  })
})
