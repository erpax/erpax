import { describe, it, expect } from 'vitest'
import {
  COUNTRY_APIS,
  BANK_APIS,
  VIES,
  ECB_RATES,
  getCountryApis,
  getCountryApisByKind,
  hasEInvoicingPortal,
} from '@/country/api'

describe('country/api — official authority catalogue', () => {
  it('getCountryApis returns BG bundle with pan-EU entries', () => {
    const bg = getCountryApis('BG')
    expect(bg.some((a) => a.authority.includes('Агенция'))).toBe(true)
    expect(bg).toContain(VIES)
    expect(bg).toContain(ECB_RATES)
  })

  it('getCountryApisByKind filters within country', () => {
    const vat = getCountryApisByKind('DE', 'vat_validation')
    expect(vat.every((a) => a.kind === 'vat_validation')).toBe(true)
    expect(vat.length).toBeGreaterThan(0)
  })

  it('hasEInvoicingPortal reflects catalogue coverage', () => {
    expect(hasEInvoicingPortal('IT')).toBe(true)
    expect(hasEInvoicingPortal('XX')).toBe(false)
  })

  it('BANK_APIS registers EU and BG open-banking metadata', () => {
    expect(BANK_APIS.BG?.length).toBeGreaterThan(5)
    expect(COUNTRY_APIS.BG?.length).toBeGreaterThan(5)
  })
})
