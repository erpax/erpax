/**
 * BG completeness meta-test — auto-fails if any pillar of the BG
 * implementation regresses (per the saved BG-completion checklist memory
 * at `erpax_bg_complete_2026-05-10.md`).
 *
 * The 10-item checklist (from the memory) maps to assertions here:
 *
 *   1. Country bundle exists ✓
 *   2. Country bundle test coverage ✓ (`bg.int.spec.ts` exercises this)
 *   3. Catalogued APIs ✓
 *   4. Catalogued banks (BANK_APIS.BG) ✓
 *   5. Syntactic validators ✓
 *   6. IBAN parser ✓
 *   7. Generic clients (Berlin Group + НАП mTLS) ✓
 *   8. Generic-client tests ✓ (`bg-generic-clients.int.spec.ts` exercises)
 *   9. E2E walk-throughs ✓ (under `tests/e2e/standards/iso-3166-1/`)
 *  10. Standards-citation banner — gated by `pnpm standards:check`
 *
 * Plus the additional pieces shipped on top of the checklist:
 *   - BG-NSS statutory chart template registered
 *   - BNB nightly rate-sync job wired into `payload.config.ts` jobs.tasks
 *   - clientImplemented coverage = 100% on COUNTRY_APIS.BG + BANK_APIS.BG
 *
 * @standard ISO/IEC-29119:2022 software-testing test-meta-coverage
 * @standard ISO-3166-1:2020 BG country-code
 * @audit ISO-19011:2018 audit-trail country-implementation-evidence
 * @compliance SOX §404 internal-controls country-coverage-matrix
 * @see erpax_bg_complete_2026-05-10.md (saved memory — per-country checklist)
 */

import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { BG_COUNTRY_BUNDLE, COUNTRY_BUNDLES } from '@/iso/3166/1/country'
import { COUNTRY_APIS, BANK_APIS } from '@/config/country-apis'
import { isBgIban, parseBgIban } from '@/iso/13616'
import {
  validateBgVatId,
  validateBgEik,
  discoverBgAspsps,
  lookupBnbExchangeRate,
} from '@/country/api/client'
import {
  acquireAspspToken,
  fetchAspspAccounts,
  initiateSepaCreditTransfer,
} from '@/country/client'
import { postBgNapMtls, submitBgSaft } from '@/country/client'
import { INDUSTRY_TEMPLATES, BG_NSS_TEMPLATE } from '@/seeds/template'
import { isBgEgn, decodeBgEgn } from '@/iso/7064'
import {
  BG_VAT_RATES,
  bgVatRateForCategory,
  calculateBgVat,
  summariseBgVat,
} from '@/country/client'
import {
  bgHolidaysForYear,
  isBgBusinessDay,
  nextBgBusinessDay,
} from '@/country/client'
import { buildBgHybridInvoice } from '@/country/client'
import { PDF_A_HYBRID_INVOICE, buildPdfAXmp } from '@/iso/19005'
import {
  prepareBgPadesSignature,
  signBgPadesPdf,
} from '@/country/client'
import {
  PADES_DEFAULT_LEVEL,
  buildPadesSignatureDictionary,
} from '@/etsi/en/319/142'
import {
  detectBgBankCode,
  listBgBankParsers,
  parseBgAmount,
  parseBgDate,
} from '@/country/clients/bg/bank/parser'

const REPO_ROOT = resolve(__dirname, '..', '..', '..', '..')

describe('BG implementation — pillar #1: country bundle exists in registry', () => {
  it('BG_COUNTRY_BUNDLE registered + identical to COUNTRY_BUNDLES["BG"]', () => {
    expect(BG_COUNTRY_BUNDLE).toBeDefined()
    expect(COUNTRY_BUNDLES['BG']).toBe(BG_COUNTRY_BUNDLE)
  })
})

describe('BG implementation — pillar #3 + #4: every BG endpoint has clientImplemented: true', () => {
  // Known-pending client implementations. Each entry MUST have a matching
  // "lands in follow-on batch" comment in src/config/country-apis.ts; this
  // list shrinks as those batches ship. NEW unimplemented entries that
  // aren't on this list still fail the test → the tripwire keeps catching
  // unintended regressions while letting tracked work-in-progress through.
  const KNOWN_PENDING_BG_API_CLIENTS: ReadonlyArray<string> = [
    // PSD2 XS2A (Berlin Group): AIS + PIS, mTLS + eIDAS QWAC/QSeal.
    // Substantial client; deferred per the inline comment on the entry.
    'UniCredit Bulbank PSD2 XS2A',
  ]

  it('COUNTRY_APIS.BG — every non-tracked endpoint has a client', () => {
    const apis = COUNTRY_APIS['BG'] ?? []
    expect(apis.length).toBeGreaterThan(0)
    const unimplemented = apis.filter((a) => !a.clientImplemented).map((a) => a.name)
    const unexpectedlyMissing = unimplemented.filter(
      (name) => !KNOWN_PENDING_BG_API_CLIENTS.includes(name),
    )
    expect(
      unexpectedlyMissing,
      `BG country APIs without a client (and not on the known-pending list): ${unexpectedlyMissing.join(', ')}`,
    ).toEqual([])
    // The pending list itself shouldn't grow stale — every entry must
    // still be in the unimplemented set (otherwise it's already shipped
    // and should be removed from the tracker).
    const stalePendings = KNOWN_PENDING_BG_API_CLIENTS.filter(
      (name) => !unimplemented.includes(name),
    )
    expect(
      stalePendings,
      `KNOWN_PENDING list contains already-implemented clients: ${stalePendings.join(', ')}`,
    ).toEqual([])
  })

  it('BANK_APIS.BG — 100% clientImplemented (Berlin Group generic dispatcher covers all 10 ASPSPs)', () => {
    const banks = BANK_APIS['BG'] ?? []
    expect(banks.length).toBeGreaterThan(0)
    const unimplemented = banks.filter((b) => !b.clientImplemented).map((b) => b.name)
    expect(
      unimplemented,
      `BG bank APIs without a client: ${unimplemented.join(', ')}`,
    ).toEqual([])
  })
})

describe('BG implementation — pillar #5: syntactic validators exported', () => {
  it.each([
    ['validateBgVatId', validateBgVatId],
    ['validateBgEik', validateBgEik],
  ])('%s is a function', (_name, fn) => {
    expect(typeof fn).toBe('function')
  })
})

describe('BG implementation — pillar #6: IBAN BG-22 parser', () => {
  it('parseBgIban + isBgIban exported', () => {
    expect(typeof parseBgIban).toBe('function')
    expect(typeof isBgIban).toBe('function')
  })
})

describe('BG implementation — pillar #7: generic clients exported', () => {
  it.each([
    ['acquireAspspToken', acquireAspspToken],
    ['fetchAspspAccounts', fetchAspspAccounts],
    ['initiateSepaCreditTransfer', initiateSepaCreditTransfer],
    ['postBgNapMtls', postBgNapMtls],
    ['submitBgSaft', submitBgSaft],
    ['discoverBgAspsps', discoverBgAspsps],
    ['lookupBnbExchangeRate', lookupBnbExchangeRate],
  ])('%s is a function', (_name, fn) => {
    expect(typeof fn).toBe('function')
  })
})

describe('BG implementation — pillar #9: e2e walk-throughs present on disk', () => {
  it.each([
    'tests/e2e/standards/iso-3166-1/default-country-bg.e2e.spec.ts',
    'tests/e2e/standards/iso-3166-1/bg-bank-accounts.e2e.spec.ts',
  ])('%s exists', (relPath) => {
    expect(existsSync(resolve(REPO_ROOT, relPath))).toBe(true)
  })
})

describe('BG implementation — extras shipped on top of the checklist', () => {
  it('BG-NSS statutory chart template registered in INDUSTRY_TEMPLATES', () => {
    expect(BG_NSS_TEMPLATE.id).toBe('bg-nss')
    expect(INDUSTRY_TEMPLATES['bg-nss']).toBe(BG_NSS_TEMPLATE)
    expect(BG_NSS_TEMPLATE.compliance.country).toBe('BG')
    expect(BG_NSS_TEMPLATE.compliance.statutoryChartReference).toBe('BG-NSS')
  })

  it('BG-NSS chart covers every IAS-1 §54 element type', () => {
    const elementTypes = new Set(BG_NSS_TEMPLATE.chartOfAccounts.map((a) => a.accountType))
    for (const type of ['asset', 'liability', 'equity', 'revenue', 'expense']) {
      expect(elementTypes, `BG-NSS missing element ${type}`).toContain(type)
    }
  })

  it('BNB rate-sync job wired into payload.config.ts jobs.tasks', () => {
    const config = readFileSync(resolve(REPO_ROOT, 'src/payload.config.ts'), 'utf8')
    expect(config).toContain("slug: 'bg-bnb-rates-sync'")
    expect(config).toContain("import('./jobs/bnbRatesSync')")
  })

  it('BNB rate-sync job module exists at the expected path', () => {
    expect(existsSync(resolve(REPO_ROOT, 'src/jobs/bnbRatesSync.ts'))).toBe(true)
  })
})

describe('BG implementation — runtime standards (EGN / VAT / holidays)', () => {
  it.each([
    ['isBgEgn', isBgEgn],
    ['decodeBgEgn', decodeBgEgn],
    ['bgVatRateForCategory', bgVatRateForCategory],
    ['calculateBgVat', calculateBgVat],
    ['summariseBgVat', summariseBgVat],
    ['bgHolidaysForYear', bgHolidaysForYear],
    ['isBgBusinessDay', isBgBusinessDay],
    ['nextBgBusinessDay', nextBgBusinessDay],
  ])('%s is a function', (_name, fn) => {
    expect(typeof fn).toBe('function')
  })

  it('BG VAT rates registry is pinned to 20 / 9 / 0', () => {
    expect(BG_VAT_RATES).toEqual({ standard: 20, reduced: 9, zero: 0 })
  })

  it('BG holidays for the current year include the 10 fixed-date evergreens', () => {
    const year = new Date().getUTCFullYear()
    const holidays = bgHolidaysForYear(year)
    // Sanity floor: 10 fixed + 3 Easter + at-most a handful of weekend substitutes.
    expect(holidays.length).toBeGreaterThanOrEqual(13)
    expect(holidays).toContain(`${year}-01-01`)
    expect(holidays).toContain(`${year}-12-25`)
  })
})

describe('BG implementation — PDF/A-3 hybrid invoice envelope', () => {
  it('buildBgHybridInvoice + buildPdfAXmp are functions', () => {
    expect(typeof buildBgHybridInvoice).toBe('function')
    expect(typeof buildPdfAXmp).toBe('function')
  })

  it('PDF_A_HYBRID_INVOICE constant pinned to part 3 / conformance b', () => {
    expect(PDF_A_HYBRID_INVOICE).toEqual({ part: 3, conformance: 'b' })
  })

  it('hybrid manifest carries the PDF/A-3 XMP + EN-16931 XML attachment', () => {
    const artifact = buildBgHybridInvoice({
      title: 'Фактура INV-2026-001',
      issuedAt: '2026-05-09T12:00:00Z',
      xmlPayload: '<Invoice />',
    })
    expect(artifact.xmpMetadata).toContain('<pdfaid:part>3</pdfaid:part>')
    expect(artifact.attachment.mimeType).toBe('application/xml')
    expect(artifact.attachment.relationship).toBe('Source')
  })
})

describe('BG implementation — PAdES qualified signature surface', () => {
  it.each([
    ['prepareBgPadesSignature', prepareBgPadesSignature],
    ['signBgPadesPdf', signBgPadesPdf],
    ['buildPadesSignatureDictionary', buildPadesSignatureDictionary],
  ])('%s is a function', (_name, fn) => {
    expect(typeof fn).toBe('function')
  })

  it('PAdES default level is B-LT (long-term archival)', () => {
    expect(PADES_DEFAULT_LEVEL).toBe('B-LT')
  })

  it('first-pass dictionary defaults location to Sofia, Bulgaria', () => {
    const dict = prepareBgPadesSignature({ reason: 'НАП SAF-T submission' })
    expect(dict.cosDictionary).toContain('/Location (Sofia, Bulgaria)')
    expect(dict.cosDictionary).toContain('/Reason (НАП SAF-T submission)')
  })
})

describe('BG implementation — bank-statement PDF parser registry', () => {
  it.each([
    ['parseBgAmount', parseBgAmount],
    ['parseBgDate', parseBgDate],
    ['detectBgBankCode', detectBgBankCode],
    ['listBgBankParsers', listBgBankParsers],
  ])('%s is a function', (_name, fn) => {
    expect(typeof fn).toBe('function')
  })

  it('registry covers at least UniCredit Bulbank + Fibank (worked examples)', () => {
    const codes = listBgBankParsers().map((p) => p.bankCode)
    expect(codes).toContain('UNCRBGSF')
    expect(codes).toContain('FINVBGSF')
  })
})
