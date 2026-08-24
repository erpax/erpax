import { describe, expect, it } from 'vitest'

import { faceOf } from '@/rules/face'

// The file that stood here asserted expect(true).toBe(true) — it passed for every
// possible state of country/client and forbade nothing. What client actually owes its
// callers is its FACE: import { X } from '@/country/client' breaks the moment the barrel
// stops offering X, and nothing else in the tree reports that.
const OFFERED = [
  "AccessToken",
  "ApiResult",
  "AspspAccount",
  "AspspConfig",
  "BG_VAT_RATES",
  "BgBankStatement",
  "BgBankStatementParser",
  "BgBankStatementRow",
  "BgHybridInvoiceArtifact",
  "BgHybridInvoiceManifest",
  "BgNapMtlsConfig",
  "BgPadesSignerConfig",
  "BgVatCategoryCode",
  "BgVatLine",
  "BgVatResult",
  "MtlsRequest",
  "PaymentInitiation",
  "PdfTextExtractor",
  "SignedPadesPdf",
  "acquireAspspToken",
  "bgHolidaysForYear",
  "bgVatRateForCategory",
  "buildBgHybridInvoice",
  "buildDefaultSignCms",
  "calculateBgVat",
  "defaultPdfTextExtractor",
  "detectBgBankCode",
  "extractBgIban",
  "fetchAspspAccounts",
  "getBgBankParser",
  "initiateSepaCreditTransfer",
  "isBgBusinessDay",
  "listBgBankParsers",
  "nextBgBusinessDay",
  "parseBgAmount",
  "parseBgBankStatementPdf",
  "parseBgDate",
  "postBgNapMtls",
  "prepareBgPadesSignature",
  "registerBgBankParser",
  "signBgPadesPdf",
  "submitBgSaft",
  "summariseBgVat"
] as const

describe('country/client — the face it owes its callers', () => {
  it('offers every name a caller may import', () => {
    const live = new Set(faceOf('country/client'))
    const lost = OFFERED.filter((n) => !live.has(n))
    expect(lost).toEqual([])
  })

  it('offers 43 name(s) — a silent drop changes the count', () => {
    expect(faceOf('country/client').length).toBeGreaterThanOrEqual(OFFERED.length)
  })

  it('names nothing twice — a duplicated export is an ambiguous import', () => {
    const live = faceOf('country/client')
    expect(new Set(live).size).toBe(live.length)
  })
})
