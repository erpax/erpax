import { describe, it, expect } from 'vitest'
import { bannerTruthViolations } from '@/standard/truth'

// Banner-truth gate (./index.ts): an @standard/@compliance claim with no computed
// witness is decoration -- a tamperable lie. Ratchet: the decoration set may only
// SHRINK as the self-building matrix adds witnesses (each witness raises tamper-cost;
// decoration -> 0 ⇒ tamper-cost -> ∞). Verified against the audit's two confirmed
// decorations so the gate cannot silently regress to noise.
const BASELINE = 104

describe('standard/truth: banner-truth (decoration -> 0)', () => {
  const v = bannerTruthViolations()

  it('catches the audit-verified decorations (SEPA EPC130-08, KYC ISO-19794)', () => {
    expect(v.some((x) => x.file.includes('sepa'))).toBe(true)
    expect(v.some((x) => x.file.includes('kyc'))).toBe(true)
  })

  it(`no NEW decorative banners (baseline ${BASELINE}; only shrinks)`, () => {
    const concept = v.filter((x) => x.detector === 'concept').length
    const enforcement = v.filter((x) => x.detector === 'enforcement').length
    console.log(`banner-truth: ${v.length} decorations (concept ${concept} / enforcement ${enforcement})`)
    expect(v.length).toBeLessThanOrEqual(BASELINE)
  })

  it.todo('banner-truth -> 0: every @standard carries a computed witness (max tamper-cost)')
})
