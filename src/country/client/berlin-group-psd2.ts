/**
 * Berlin Group NextGenPSD2 v1.3 — generic ASPSP client.
 *
 * One client services every Berlin-Group-conformant ASPSP — Bulgarian banks
 * (UniCredit Bulbank / DSK / Postbank / Fibank / KBC / ProCredit / Allianz /
 * Investbank / CCB / BACB) all expose the same `/v1/accounts`,
 * `/v1/payments/sepa-credit-transfers`, `/v1/consents` surface. Per-bank
 * variation lives in (a) the OAuth2 token endpoint, (b) the registered
 * client credentials, (c) optional bank-specific headers — captured by the
 * `AspspConfig` argument so the client is shape-agnostic.
 *
 * @standard PSD2 EU 2015/2366 ais-pis
 * @standard Berlin Group NextGenPSD2 v1.3
 * @standard ISO-20022 pain.001 sepa-credit-transfer
 * @rfc 6749 oauth-2.0
 * @rfc 7519 jwt
 * @audit ISO-19011:2018 audit-trail external-system-evidence
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27001 A.5.17 authentication-information
 * @compliance EU 2015/2366 strong-customer-authentication
 * @see ../country-api-clients.ts
 */

export interface ApiResult<T> {
  readonly ok: boolean
  readonly data?: T
  readonly error?: string
  readonly source: string
}

const ok = <T,>(source: string, data: T): ApiResult<T> => ({ ok: true, data, source })
const err = (source: string, error: string): ApiResult<never> => ({ ok: false, error, source })

/**
 * Per-tenant configuration for one ASPSP. Sourced from
 * `tenant.config.bankIntegrations.<aspspId>` at call time — never hardcoded
 * here (every BG ASPSP needs its own client_id / secret registered with
 * the bank's developer portal before the OAuth2 flow can proceed).
 */
export interface AspspConfig {
  /** Display name for audit-trail attribution (`source` in ApiResult). */
  readonly name: string
  /** Berlin Group base URL — typically `https://api.<bank>/psd2`. */
  readonly endpoint: string
  /** OAuth2 token endpoint (per-bank — usually `<endpoint>/auth/token`). */
  readonly tokenEndpoint: string
  /** Bank-issued OAuth2 client id (per-tenant credential). */
  readonly clientId: string
  /** Bank-issued OAuth2 client secret (per-tenant credential). */
  readonly clientSecret: string
  /** Optional bank-specific headers (e.g. `PSU-IP-Address` for some BG banks). */
  readonly extraHeaders?: Readonly<Record<string, string>>
}

/**
 * Resolved OAuth2 access token + expiry. Cached by the caller (token
 * issuance is a hot path; tokens typically last 30-300 seconds).
 */
export interface AccessToken {
  readonly token: string
  readonly expiresAt: number // epoch ms
}

/**
 * Acquire a Berlin Group ASPSP access token via the standard OAuth2
 * client_credentials grant (`scope=AIS PIS PIIS`).
 *
 * @standard rfc-6749 §4.4 client-credentials-grant
 */
export async function acquireAspspToken(config: AspspConfig): Promise<ApiResult<AccessToken>> {
  if (!config.clientId || !config.clientSecret) {
    return err(config.name, 'Missing OAuth2 client credentials (per-tenant config required)')
  }
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    scope: 'AIS PIS PIIS',
    client_id: config.clientId,
    client_secret: config.clientSecret,
  })
  try {
    const r = await fetch(config.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        ...(config.extraHeaders ?? {}),
      },
      body,
    })
    if (!r.ok) return err(config.name, `OAuth2 HTTP ${r.status}`)
    const json = (await r.json()) as { access_token?: string; expires_in?: number }
    if (!json.access_token) return err(config.name, 'OAuth2 response missing access_token')
    const expiresAt = Date.now() + Math.max(0, (json.expires_in ?? 60) - 5) * 1000
    return ok(config.name, { token: json.access_token, expiresAt })
  } catch (e) {
    return err(config.name, String(e))
  }
}

/** Berlin Group `/v1/accounts` row (subset — full schema in spec annex). */
export interface AspspAccount {
  readonly resourceId: string
  readonly iban?: string
  readonly currency: string
  readonly name?: string
  readonly product?: string
}

/**
 * Fetch the consenting PSU's account list (`GET /v1/accounts`).
 *
 * @standard Berlin Group NextGenPSD2 v1.3 §5.1.1 read-account-list
 */
export async function fetchAspspAccounts(
  config: AspspConfig,
  token: AccessToken,
  consentId: string,
): Promise<ApiResult<ReadonlyArray<AspspAccount>>> {
  try {
    const r = await fetch(`${config.endpoint}/v1/accounts`, {
      headers: {
        Authorization: `Bearer ${token.token}`,
        'Consent-ID': consentId,
        'X-Request-ID': cryptoRandomId(),
        Accept: 'application/json',
        ...(config.extraHeaders ?? {}),
      },
    })
    if (!r.ok) return err(config.name, `HTTP ${r.status}`)
    const json = (await r.json()) as { accounts?: AspspAccount[] }
    return ok(config.name, json.accounts ?? [])
  } catch (e) {
    return err(config.name, String(e))
  }
}

/** Berlin Group `/v1/payments/sepa-credit-transfers` initiation result. */
export interface PaymentInitiation {
  readonly paymentId: string
  readonly transactionStatus: string
}

/**
 * Initiate a SEPA Credit Transfer (PIS) — the canonical PSD2 payment flow
 * Bulgarian banks expose for outbound disbursements.
 *
 * @standard Berlin Group NextGenPSD2 v1.3 §5.3.1 payment-initiation
 * @standard ISO-20022 pain.001.001.09 sepa-credit-transfer-initiation
 */
export async function initiateSepaCreditTransfer(
  config: AspspConfig,
  token: AccessToken,
  payload: {
    debtorIban: string
    creditorIban: string
    creditorName: string
    amount: { value: string; currency: string }
    remittanceInformationUnstructured?: string
  },
): Promise<ApiResult<PaymentInitiation>> {
  try {
    const r = await fetch(`${config.endpoint}/v1/payments/sepa-credit-transfers`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.token}`,
        'Content-Type': 'application/json',
        'X-Request-ID': cryptoRandomId(),
        ...(config.extraHeaders ?? {}),
      },
      body: JSON.stringify({
        debtorAccount: { iban: payload.debtorIban },
        creditorAccount: { iban: payload.creditorIban },
        creditorName: payload.creditorName,
        instructedAmount: payload.amount,
        ...(payload.remittanceInformationUnstructured
          ? { remittanceInformationUnstructured: payload.remittanceInformationUnstructured }
          : {}),
      }),
    })
    if (!r.ok && r.status !== 201) return err(config.name, `HTTP ${r.status}`)
    const json = (await r.json()) as PaymentInitiation
    return ok(config.name, json)
  } catch (e) {
    return err(config.name, String(e))
  }
}

// X-Request-ID is required by Berlin Group; UUID v4 keeps it traceable in
// per-bank audit logs (Web Crypto is available on every Cloudflare Worker
// + Node 19+ runtime).
function cryptoRandomId(): string {
  const c = (globalThis as { crypto?: { randomUUID?: () => string } }).crypto
  return c?.randomUUID?.() ?? Math.random().toString(36).slice(2)
}
