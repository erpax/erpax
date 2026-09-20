import { describe, expect, it } from 'vitest'
import {
  EVIDENCE,
  THRESHOLD,
  diligenceLevel,
  dueDiligenceRequired,
  evidenceMissing,
  identificationComplete,
} from '@/kyc'

describe('kyc — enhanced diligence dominates, and no low-risk finding may cancel it', () => {
  it('mandates enhanced for a politically exposed person, whatever else is true', () => {
    expect(diligenceLevel({ politicallyExposed: true })).toBe('enhanced')
    // The failure a bank is fined for: a lower-risk product cancelling a mandatory trigger.
    expect(diligenceLevel({ politicallyExposed: true, lowRiskProduct: true })).toBe('enhanced')
  })

  it('mandates enhanced for a high-risk third country, low-risk product notwithstanding', () => {
    expect(diligenceLevel({ highRiskThirdCountry: true })).toBe('enhanced')
    expect(diligenceLevel({ highRiskThirdCountry: true, lowRiskProduct: true })).toBe('enhanced')
  })

  it('permits simplified ONLY when no enhanced trigger is present', () => {
    expect(diligenceLevel({ lowRiskProduct: true })).toBe('simplified')
    expect(diligenceLevel({})).toBe('standard')
  })
})

describe('kyc — the bands decide whether diligence is owed at all', () => {
  it('reads a transfer of funds against the transfer band, ABOVE not at', () => {
    expect(dueDiligenceRequired({ amount: THRESHOLD.wireTransfer, wireTransfer: true })).toBe(false)
    expect(dueDiligenceRequired({ amount: THRESHOLD.wireTransfer + 1, wireTransfer: true })).toBe(true)
  })

  it('reads cash against the cash band, AT or above', () => {
    expect(dueDiligenceRequired({ amount: THRESHOLD.cashPayment - 1, cash: true })).toBe(false)
    expect(dueDiligenceRequired({ amount: THRESHOLD.cashPayment, cash: true })).toBe(true)
  })

  it('reads any other movement against the occasional-transaction band', () => {
    expect(dueDiligenceRequired({ amount: THRESHOLD.occasionalTransaction - 1 })).toBe(false)
    expect(dueDiligenceRequired({ amount: THRESHOLD.occasionalTransaction })).toBe(true)
  })

  it('owes diligence on establishing a relationship at any amount, including none', () => {
    expect(dueDiligenceRequired({ ongoingRelationship: true })).toBe(true)
    expect(dueDiligenceRequired({})).toBe(false)
  })

  it('owes diligence on a risk factor even where no money has moved', () => {
    expect(dueDiligenceRequired({ politicallyExposed: true })).toBe(true)
    expect(dueDiligenceRequired({ highRiskThirdCountry: true })).toBe(true)
  })
})

describe('kyc — the file is complete or it names what is missing', () => {
  it('asks strictly more as the level rises', () => {
    expect(EVIDENCE.simplified.length).toBeLessThan(EVIDENCE.standard.length)
    expect(EVIDENCE.standard.length).toBeLessThan(EVIDENCE.enhanced.length)
    for (const e of EVIDENCE.standard) expect(EVIDENCE.enhanced).toContain(e)
    for (const e of EVIDENCE.simplified) expect(EVIDENCE.standard).toContain(e)
  })

  it('names exactly what the level calls for and the file does not hold', () => {
    expect(evidenceMissing('enhanced', ['identity', 'address'])).toEqual([
      'beneficial-owner',
      'purpose',
      'source-of-funds',
      'source-of-wealth',
      'senior-approval',
    ])
    expect(identificationComplete('simplified', ['identity'])).toBe(true)
    expect(identificationComplete('enhanced', ['identity'])).toBe(false)
  })

  it('is complete only on the SET — it cannot judge what an item contains', () => {
    // A forged passport and a real one produce the same 'identity' item. Stated so nobody reads
    // completeness as verification.
    expect(identificationComplete('standard', [...EVIDENCE.standard])).toBe(true)
  })
})
