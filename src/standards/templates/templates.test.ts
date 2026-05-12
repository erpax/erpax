/**
 * Industry-template surface tests — pin the chart-of-accounts shape and
 * compliance posture for every curated template.
 *
 * Mirrors the standards-test layout (`tests/standards/<id>/...`) for the
 * `src/plugins/accounting/seeds/templates/` module that bridges per-tenant
 * compliance to country-context.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO/IEC/IEEE-29119-3:2021 test-documentation
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IAS-1 §54 minimum-line-items
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @audit ISO-19011:2018 audit-trail seed-evidence
 * @see src/plugins/accounting/seeds/templates/templates.ts
 * @see src/plugins/accounting/seeds/templates/compliance.ts
 */

import { describe, expect, it } from 'vitest'
import {
  INDUSTRY_TEMPLATES,
  IFRS_MINIMUM_TEMPLATE,
  IFRS_RETAIL_TEMPLATE,
  IFRS_SAAS_TEMPLATE,
  IFRS_SERVICE_TEMPLATE,
  IFRS_MANUFACTURING_TEMPLATE,
  getCuratedComplianceCountries,
  getEInvoicingMandatedTemplates,
  getIndustryTemplate,
  findTemplateByCountry,
  resolveTenantCompliance,
} from '@/services/accounting/seeds/templates'
import { BG_COUNTRY_BUNDLE } from '@/standards/iso-3166-1/countries'

const ELEMENT_TYPES = ['asset', 'liability', 'equity', 'revenue', 'expense'] as const

describe('industry templates — surface', () => {
  const all = Object.values(INDUSTRY_TEMPLATES)

  it.each(all)(
    '$id has stable id, label, ≥1 standard citation',
    (t) => {
      expect(t.id).toMatch(/^[a-z][a-z0-9-]+$/)
      expect(t.label.length).toBeGreaterThan(0)
      expect(t.description.length).toBeGreaterThan(0)
      expect(t.standards.length).toBeGreaterThan(0)
    },
  )

  it.each(all)(
    '$id chart of accounts covers every IAS-1 §54 element type',
    (t) => {
      const seen = new Set(t.chartOfAccounts.map((a) => a.accountType))
      for (const elementType of ELEMENT_TYPES) {
        expect(seen, `${t.id} missing element ${elementType}`).toContain(elementType)
      }
    },
  )

  it.each(all)(
    '$id chart of accounts has unique accountNumbers',
    (t) => {
      const numbers = t.chartOfAccounts.map((a) => a.accountNumber)
      expect(new Set(numbers).size).toBe(numbers.length)
    },
  )

  it.each(all)(
    '$id tenant currency is a valid ISO-4217 3-letter code',
    (t) => {
      expect(t.tenant.reportingCurrency).toMatch(/^[A-Z]{3}$/)
      expect(t.tenant.reportingCurrency).toBe(t.compliance.reportingCurrency)
    },
  )

  it.each(all)(
    '$id tenant country is a valid ISO-3166-1 alpha-2 code',
    (t) => {
      expect(t.tenant.country).toMatch(/^[A-Z]{2}$/)
      expect(t.tenant.country).toBe(t.compliance.country)
    },
  )

  it.each(all)(
    '$id tenant fiscal-year-start-month is in 1..12',
    (t) => {
      expect(t.tenant.fiscalYearStartMonth).toBeGreaterThanOrEqual(1)
      expect(t.tenant.fiscalYearStartMonth).toBeLessThanOrEqual(12)
    },
  )

  it.each(all)(
    '$id sample transactions reference accounts that exist in the chart',
    (t) => {
      if (!t.sampleTransactions) return
      const names = new Set(t.chartOfAccounts.map((a) => a.accountName))
      for (const tx of t.sampleTransactions) {
        expect(names, `${tx.reference} debit`).toContain(tx.debitAccountName)
        expect(names, `${tx.reference} credit`).toContain(tx.creditAccountName)
      }
    },
  )
})

describe('industry templates — registry helpers', () => {
  it('getIndustryTemplate returns the matching template', () => {
    expect(getIndustryTemplate('ifrs-minimum')).toBe(IFRS_MINIMUM_TEMPLATE)
    expect(getIndustryTemplate('ifrs-saas')).toBe(IFRS_SAAS_TEMPLATE)
    expect(getIndustryTemplate('ifrs-retail')).toBe(IFRS_RETAIL_TEMPLATE)
    expect(getIndustryTemplate('ifrs-service')).toBe(IFRS_SERVICE_TEMPLATE)
    expect(getIndustryTemplate('ifrs-manufacturing')).toBe(IFRS_MANUFACTURING_TEMPLATE)
  })

  it('getCuratedComplianceCountries lists every template country exactly once', () => {
    const countries = getCuratedComplianceCountries()
    expect(new Set(countries).size).toBe(countries.length)
    expect(countries).toEqual(expect.arrayContaining(['BG', 'US', 'DE', 'GB']))
  })

  it('getEInvoicingMandatedTemplates returns only the mandate-flagged ones', () => {
    const mandated = getEInvoicingMandatedTemplates()
    for (const t of mandated) {
      expect(t.compliance.eInvoicingMandate).toBe(true)
    }
    expect(mandated.map((t) => t.id)).toContain('ifrs-retail')
  })

  it('findTemplateByCountry returns one of the templates for each curated country', () => {
    // Multiple templates may share a country (e.g. SaaS + Manufacturing both
    // anchor to US). `findTemplateByCountry` returns the first match — we
    // assert it's *some* matching template, not a specific one.
    for (const country of new Set(Object.values(INDUSTRY_TEMPLATES).map((t) => t.compliance.country))) {
      const match = findTemplateByCountry(country)
      expect(match).not.toBeNull()
      expect(match?.compliance.country).toBe(country)
    }
    expect(findTemplateByCountry('ZZ')).toBeNull()
  })
})

describe('industry templates — country-bundle derivation (BG default)', () => {
  it('IFRS_MINIMUM_TEMPLATE derives tenant + compliance from BG_COUNTRY_BUNDLE', () => {
    expect(IFRS_MINIMUM_TEMPLATE.tenant.country).toBe(BG_COUNTRY_BUNDLE.code)
    expect(IFRS_MINIMUM_TEMPLATE.tenant.reportingCurrency).toBe(BG_COUNTRY_BUNDLE.profile.reportingCurrency)
    expect(IFRS_MINIMUM_TEMPLATE.tenant.accountingStandard).toBe(BG_COUNTRY_BUNDLE.profile.accountingStandard)
    expect(IFRS_MINIMUM_TEMPLATE.compliance.statutoryChartReference).toBe(
      BG_COUNTRY_BUNDLE.specifics?.statutoryChartOfAccounts ?? null,
    )
  })

  it('IFRS_MINIMUM_TEMPLATE inherits e-invoicing mandate from BG specifics', () => {
    // BG mandates B2G e-invoicing per EU 2014/55 + EN-16931.
    expect(IFRS_MINIMUM_TEMPLATE.compliance.eInvoicingMandate).toBe(true)
  })

  it('IFRS_MINIMUM_TEMPLATE uses underscore API kinds matching the registry', () => {
    // CountryApi['kind'] uses underscores (`business_registry`, not `business-registry`).
    for (const kind of IFRS_MINIMUM_TEMPLATE.compliance.officialApiKinds) {
      expect(kind).toMatch(/^[a-z]+(?:_[a-z]+)*$/)
    }
  })
})

describe('compliance — country resolution via country-context', () => {
  it('returns the curated DE compliance posture (SKR-04 + e-invoicing)', () => {
    const compliance = resolveTenantCompliance({ country: 'DE' })
    expect(compliance.country).toBe('DE')
    expect(compliance.statutoryChartReference).toBe('SKR-04')
    expect(compliance.eInvoicingMandate).toBe(true)
    expect(compliance.officialApiKinds).toEqual(
      expect.arrayContaining(['business-registry', 'tax-authority', 'e-invoicing']),
    )
  })

  it('honors per-tenant currency override over the country default', () => {
    const compliance = resolveTenantCompliance({ country: 'DE', reportingCurrency: 'CHF' })
    expect(compliance.country).toBe('DE')
    expect(compliance.reportingCurrency).toBe('CHF')
  })

  it('falls back to dynamic country-context for uncurated countries', () => {
    const compliance = resolveTenantCompliance({ country: 'ZZ' })
    expect(compliance.country).toBe('ZZ')
    // Dynamic derivation should still produce defined fields.
    expect(typeof compliance.eInvoicingMandate).toBe('boolean')
    expect(Array.isArray(compliance.officialApiKinds)).toBe(true)
  })
})
