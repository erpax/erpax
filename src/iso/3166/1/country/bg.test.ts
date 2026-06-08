/**
 * Bulgaria (BG) country bundle — pins the canonical merge of profile +
 * specifics + APIs against the registries `bg.ts` consumes.
 *
 * If a registry value drifts (currency rename, fiscal-year shift, API
 * endpoint change), the matching assertion below fails loudly and the
 * code change is forced to update the test alongside.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO-3166-1:2020 BG country-code
 * @standard ISO-4217:2015 EUR reporting-currency
 * @audit ISO-19011:2018 audit-trail country-decision-evidence
 * @see src/standards/iso-3166-1/countries/bg.ts
 */

import { describe, expect, it } from 'vitest'
import { BG_COUNTRY_BUNDLE, COUNTRY_BUNDLES, getCountryBundle } from '@/iso/3166/1/country'
import { COUNTRY_PROFILES } from '@/config/regional-defaults'
import { COUNTRY_SPECIFICS } from '@/config/country-specifics'
import { COUNTRY_APIS, BANK_APIS } from '@/country/api'

describe('BG_COUNTRY_BUNDLE — canonical merge', () => {
  it('exposes the right ISO-3166-1 alpha-2 + display name', () => {
    expect(BG_COUNTRY_BUNDLE.code).toBe('BG')
    expect(BG_COUNTRY_BUNDLE.name).toBe('Bulgaria')
  })

  it('mirrors COUNTRY_PROFILES.BG verbatim', () => {
    expect(BG_COUNTRY_BUNDLE.profile).toBe(COUNTRY_PROFILES['BG'])
  })

  it('mirrors COUNTRY_SPECIFICS.BG verbatim', () => {
    expect(BG_COUNTRY_BUNDLE.specifics).toBe(COUNTRY_SPECIFICS['BG'])
  })

  it('mirrors COUNTRY_APIS.BG verbatim', () => {
    expect(BG_COUNTRY_BUNDLE.apis).toBe(COUNTRY_APIS['BG'])
  })

  it('declares the BG-NSS statutory chart of accounts', () => {
    expect(BG_COUNTRY_BUNDLE.specifics?.statutoryChartOfAccounts).toBe('BG-NSS')
  })

  it('declares the EU 2014/55 §B2G e-invoicing mandate', () => {
    expect(BG_COUNTRY_BUNDLE.specifics?.eInvoicingMandate.scope).toBe('b2g')
    expect(BG_COUNTRY_BUNDLE.specifics?.eInvoicingMandate.standard).toBe('EN-16931')
  })

  it('declares EUR + IFRS at the profile level', () => {
    expect(BG_COUNTRY_BUNDLE.profile.currency).toBe('EUR')
    expect(BG_COUNTRY_BUNDLE.profile.accountingStandard).toBe('IFRS')
  })

  it('catalogues at least the business registry + tax authority APIs', () => {
    const kinds = BG_COUNTRY_BUNDLE.apis.map((api) => api.kind)
    expect(kinds).toContain('business_registry')
    expect(kinds).toContain('tax_authority')
  })

  it('catalogues the BG e-invoicing portal (НАП SAF-T submission)', () => {
    const eInvoicing = BG_COUNTRY_BUNDLE.apis.find((api) => api.kind === 'e_invoicing')
    expect(eInvoicing).toBeDefined()
    expect(eInvoicing?.authority).toContain('Национална агенция')
  })

  it('catalogues the БНБ daily exchange-rate publisher', () => {
    const bnbRates = BG_COUNTRY_BUNDLE.apis.find(
      (api) => api.kind === 'statistics' && api.authority.includes('Българска народна банка'),
    )
    expect(bnbRates, 'BNB statistics endpoint missing — needed for IAS-21 revaluation').toBeDefined()
  })
})

describe('BG_COUNTRY_BUNDLE — bank APIs (PSD2 ASPSPs)', () => {
  it('mirrors BANK_APIS.BG verbatim', () => {
    expect(BG_COUNTRY_BUNDLE.bankApis).toBe(BANK_APIS['BG'])
  })

  it('includes the BNB ASPSP register as the discovery anchor', () => {
    const bnbRegister = BG_COUNTRY_BUNDLE.bankApis.find(
      (api) =>
        api.kind === 'bank_directory' && api.authority.includes('Българска народна банка'),
    )
    expect(bnbRegister, 'BNB ASPSP register missing — PSD2 discovery anchor').toBeDefined()
  })

  it('catalogues the major BG ASPSPs (top-10 by deposits)', () => {
    const aspsps = BG_COUNTRY_BUNDLE.bankApis.filter((api) => api.kind === 'open_banking')
    // Sanity floor: at least the 5 systemic banks should be present.
    expect(aspsps.length).toBeGreaterThanOrEqual(5)
    const names = aspsps.map((a) => a.name).join(' | ')
    expect(names).toContain('UniCredit Bulbank')
    expect(names).toContain('DSK Bank')
    expect(names).toContain('Postbank')
    expect(names).toContain('Fibank')
  })

  it('every BG ASPSP uses the Berlin Group NextGenPSD2 OAuth2 contract', () => {
    const aspsps = BG_COUNTRY_BUNDLE.bankApis.filter((api) => api.kind === 'open_banking')
    for (const aspsp of aspsps) {
      expect(aspsp.auth, `${aspsp.name} should use OAuth 2.0 (Berlin Group)`).toBe('oauth2')
      expect(aspsp.format, `${aspsp.name} should use JSON (Berlin Group)`).toBe('json')
    }
  })
})

describe('COUNTRY_BUNDLES — registry', () => {
  it('includes BG (the default country)', () => {
    expect(COUNTRY_BUNDLES['BG']).toBe(BG_COUNTRY_BUNDLE)
  })

  it('getCountryBundle returns the bundle for a curated code', () => {
    expect(getCountryBundle('BG')).toBe(BG_COUNTRY_BUNDLE)
  })

  it('getCountryBundle returns null for an uncurated code', () => {
    expect(getCountryBundle('ZZ')).toBeNull()
  })
})
