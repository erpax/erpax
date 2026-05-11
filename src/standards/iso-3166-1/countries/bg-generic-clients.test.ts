/**
 * Generic BG client tests — exercise the Berlin Group PSD2 dispatcher and
 * the НАП mTLS dispatcher with mocked `fetch`. These two generic clients
 * are how *every* BG endpoint marked `clientImplemented: true` actually
 * dispatches; mocking proves the contract surface is honored without
 * needing real ASPSP credentials or qualified seal certificates.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard PSD2 EU 2015/2366 ais-pis
 * @standard Berlin Group NextGenPSD2 v1.3
 * @standard ISO-3166-1:2020 BG country-code
 * @audit ISO-19011:2018 audit-trail external-system-evidence
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27001 A.8.24 use-of-cryptography
 * @compliance EU 910/2014 eidas qualified-electronic-seal
 * @see src/services/country-clients/berlin-group-psd2.ts
 * @see src/services/country-clients/bg-nap-mtls.ts
 */

import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  acquireAspspToken,
  fetchAspspAccounts,
  initiateSepaCreditTransfer,
  type AspspConfig,
} from '@/services/country-clients/berlin-group-psd2'
import { postBgNapMtls, submitBgSaft } from '@/services/country-clients/bg-nap-mtls'

const ASPSP: AspspConfig = {
  name: 'Test BG ASPSP',
  endpoint: 'https://api.test-bank.bg/psd2',
  tokenEndpoint: 'https://api.test-bank.bg/psd2/auth/token',
  clientId: 'test-client',
  clientSecret: 'test-secret',
}

describe('Berlin Group PSD2 — acquireAspspToken (OAuth2 client_credentials)', () => {
  afterEach(() => vi.restoreAllMocks())

  it('refuses to call when client credentials are missing', async () => {
    const result = await acquireAspspToken({ ...ASPSP, clientId: '', clientSecret: '' })
    expect(result.ok).toBe(false)
    expect(result.error).toMatch(/Missing OAuth2 client credentials/)
  })

  it('parses access_token + computes expiry from expires_in', async () => {
    const fixedNow = 1_700_000_000_000
    vi.spyOn(Date, 'now').mockReturnValue(fixedNow)
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({ access_token: 'tok-abc', expires_in: 60, token_type: 'Bearer' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      ),
    )
    const result = await acquireAspspToken(ASPSP)
    expect(result.ok).toBe(true)
    expect(result.data?.token).toBe('tok-abc')
    // 60s − 5s safety margin → 55_000ms ahead.
    expect(result.data?.expiresAt).toBe(fixedNow + 55_000)
  })

  it('returns ok:false on non-200 + missing token', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(new Response('{}', { status: 401 }))
    const result = await acquireAspspToken(ASPSP)
    expect(result.ok).toBe(false)
    expect(result.error).toContain('OAuth2 HTTP 401')
  })
})

describe('Berlin Group PSD2 — fetchAspspAccounts', () => {
  afterEach(() => vi.restoreAllMocks())

  it('returns the accounts array from the response', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          accounts: [
            { resourceId: 'acct-1', iban: 'BG80BNBG96611020345678', currency: 'EUR', name: 'Main' },
          ],
        }),
        { status: 200 },
      ),
    )
    const result = await fetchAspspAccounts(
      ASPSP,
      { token: 'tok', expiresAt: Date.now() + 60_000 },
      'consent-xyz',
    )
    expect(result.ok).toBe(true)
    expect(result.data?.length).toBe(1)
    expect(result.data?.[0].iban).toBe('BG80BNBG96611020345678')
  })

  it('attaches the consent + bearer + X-Request-ID headers', async () => {
    const spy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response('{"accounts":[]}', { status: 200 }),
    )
    await fetchAspspAccounts(ASPSP, { token: 'tok', expiresAt: Date.now() + 60_000 }, 'consent-1')
    const init = spy.mock.calls[0][1] as RequestInit
    const headers = init.headers as Record<string, string>
    expect(headers['Authorization']).toBe('Bearer tok')
    expect(headers['Consent-ID']).toBe('consent-1')
    expect(headers['X-Request-ID']).toBeTruthy()
  })
})

describe('Berlin Group PSD2 — initiateSepaCreditTransfer', () => {
  afterEach(() => vi.restoreAllMocks())

  it('POSTs the SEPA-CT body + parses paymentId / transactionStatus', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({ paymentId: 'pay-9', transactionStatus: 'RCVD' }),
        { status: 201 },
      ),
    )
    const result = await initiateSepaCreditTransfer(
      ASPSP,
      { token: 'tok', expiresAt: Date.now() + 60_000 },
      {
        debtorIban: 'BG80BNBG96611020345678',
        creditorIban: 'DE89370400440532013000',
        creditorName: 'Acme Vendor',
        amount: { value: '123.45', currency: 'EUR' },
      },
    )
    expect(result.ok).toBe(true)
    expect(result.data?.paymentId).toBe('pay-9')
    expect(result.data?.transactionStatus).toBe('RCVD')
  })
})

describe('НАП mTLS dispatcher — postBgNapMtls', () => {
  afterEach(() => vi.restoreAllMocks())

  it('refuses to call when cert / key are missing', async () => {
    const result = await postBgNapMtls(
      {
        endpoint: 'https://inetdec.nra.bg/saf-t',
        body: '<saft />',
        contentType: 'application/xml',
        source: 'TEST',
      },
      { certPem: '', keyPem: '' },
    )
    expect(result.ok).toBe(false)
    expect(result.error).toMatch(/mTLS config missing/)
  })

  it('routes through the Cloudflare CF_MTLS_BG_NAP binding when present', async () => {
    const cfFetch = vi.fn().mockResolvedValue(new Response('<ok />', { status: 200 }))
    ;(globalThis as Record<string, unknown>).CF_MTLS_BG_NAP = { fetch: cfFetch }
    try {
      const result = await postBgNapMtls(
        {
          endpoint: 'https://inetdec.nra.bg/saf-t',
          body: '<saft />',
          contentType: 'application/xml',
          source: 'TEST',
        },
        { certPem: 'CERT', keyPem: 'KEY' },
      )
      expect(result.ok).toBe(true)
      expect(result.data?.status).toBe(200)
      expect(cfFetch).toHaveBeenCalledOnce()
    } finally {
      delete (globalThis as Record<string, unknown>).CF_MTLS_BG_NAP
    }
  })
})

describe('submitBgSaft — convenience wrapper', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    delete (globalThis as Record<string, unknown>).CF_MTLS_BG_NAP
  })

  it('targets the inetdec.nra.bg/saf-t endpoint with XML content-type', async () => {
    const cfFetch = vi.fn().mockResolvedValue(new Response('<receipt />', { status: 202 }))
    ;(globalThis as Record<string, unknown>).CF_MTLS_BG_NAP = { fetch: cfFetch }
    const result = await submitBgSaft('<saft />', { certPem: 'CERT', keyPem: 'KEY' })
    expect(result.ok).toBe(true)
    expect(result.source).toBe('НАП SAF-T submission portal')
    const [url, init] = cfFetch.mock.calls[0]
    expect(url).toBe('https://inetdec.nra.bg/saf-t')
    expect((init as RequestInit).headers).toMatchObject({ 'Content-Type': 'application/xml' })
  })
})
