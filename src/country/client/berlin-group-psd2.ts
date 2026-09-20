import { exactMax, seededIdGen } from '@/algebra'
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
    const expiresAt = Date.now() + exactMax(0, (json.expires_in ?? 60) - 5) * 1000
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
  return c?.randomUUID?.() ?? seededIdGen(0x51deba4)()
}

// ─── AIS: the half the corpus claimed and did not have ────────────────────────
// `clientImplemented: true` stood against ten BG banks while NOTHING here could create a consent,
// and `fetchAspspAccounts` demands a Consent-ID no code could obtain. The flow could not run end to
// end, so the registry line was a claim a bank's compliance officer would read as working software
// ([[rules]]/audience — the catastrophe shape: a claim only the reader who signs can see is false).
// These three calls close it: consent → balances → transactions.

/** A consent as the ASPSP returns it. `valid` is the ASPSP's own status, never inferred here. */
export interface AspspConsent {
  readonly consentId: string
  readonly status: string
  /** true only for the ASPSP's own terminal-valid status — never assumed from a 200. */
  readonly valid: boolean
  /** Where the PSU must authenticate (SCA). Absent when the ASPSP pre-authorised the consent. */
  readonly scaRedirect?: string
}

/**
 * Create an account-information consent (`POST /v1/consents`).
 *
 * The PSU must then authenticate at `scaRedirect` — STRONG CUSTOMER AUTHENTICATION is the PSU's act,
 * never the TPP's, so this returns the redirect rather than following it. A consent that comes back
 * `received` is NOT usable; it becomes `valid` only after the PSU completes SCA at the bank.
 *
 * @standard Berlin Group NextGenPSD2 v1.3 §5.2.1 consent-request
 * @compliance EU 2015/2366 §97 strong-customer-authentication
 */
export async function createAspspConsent(
  config: AspspConfig,
  token: AccessToken,
  args: {
    readonly ibans: readonly string[]
    /** ISO-8601 date the consent expires — the ASPSP caps this (usually 90 days). */
    readonly validUntil: string
    /** Accesses per day for unattended (non-PSU-present) reads. */
    readonly frequencyPerDay?: number
    /** Where the bank returns the PSU after SCA. */
    readonly redirectUri?: string
  },
): Promise<ApiResult<AspspConsent>> {
  const access = { accounts: args.ibans.map((iban) => ({ iban })) }
  try {
    const r = await fetch(`${config.endpoint}/v1/consents`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.token}`,
        'X-Request-ID': cryptoRandomId(),
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(args.redirectUri ? { 'TPP-Redirect-URI': args.redirectUri } : {}),
        ...(config.extraHeaders ?? {}),
      },
      body: JSON.stringify({
        access,
        recurringIndicator: true,
        validUntil: args.validUntil,
        frequencyPerDay: exactMax(1, args.frequencyPerDay ?? 4),
        combinedServiceIndicator: false,
      }),
    })
    if (!r.ok) return err(config.name, `consent HTTP ${r.status}`)
    const json = (await r.json()) as {
      consentId?: string
      consentStatus?: string
      _links?: { scaRedirect?: { href?: string } }
    }
    if (!json.consentId) return err(config.name, 'consent response missing consentId')
    const status = json.consentStatus ?? 'unknown'
    return ok(config.name, {
      consentId: json.consentId,
      status,
      valid: status === 'valid',
      scaRedirect: json._links?.scaRedirect?.href,
    })
  } catch (e) {
    return err(config.name, String(e))
  }
}

/** One balance as the ASPSP reports it — amounts stay STRINGS until parsed into minor units. */
export interface AspspBalance {
  readonly type: string
  readonly amount: string
  readonly currency: string
  readonly referenceDate?: string
}

/**
 * Read an account's balances (`GET /v1/accounts/{id}/balances`).
 *
 * @standard Berlin Group NextGenPSD2 v1.3 §5.3.1 read-balance
 */
export async function fetchAspspBalances(
  config: AspspConfig,
  token: AccessToken,
  consentId: string,
  resourceId: string,
): Promise<ApiResult<ReadonlyArray<AspspBalance>>> {
  try {
    const r = await fetch(`${config.endpoint}/v1/accounts/${encodeURIComponent(resourceId)}/balances`, {
      headers: {
        Authorization: `Bearer ${token.token}`,
        'Consent-ID': consentId,
        'X-Request-ID': cryptoRandomId(),
        Accept: 'application/json',
        ...(config.extraHeaders ?? {}),
      },
    })
    if (!r.ok) return err(config.name, `balances HTTP ${r.status}`)
    const json = (await r.json()) as {
      balances?: { balanceType?: string; balanceAmount?: { amount?: string; currency?: string }; referenceDate?: string }[]
    }
    return ok(
      config.name,
      (json.balances ?? []).map((b) => ({
        type: b.balanceType ?? 'unknown',
        amount: b.balanceAmount?.amount ?? '0',
        currency: b.balanceAmount?.currency ?? 'BGN',
        referenceDate: b.referenceDate,
      })),
    )
  } catch (e) {
    return err(config.name, String(e))
  }
}

/** One transaction as the ASPSP reports it. */
export interface AspspTransaction {
  readonly transactionId?: string
  readonly bookingDate?: string
  readonly valueDate?: string
  readonly amount: string
  readonly currency: string
  readonly remittanceInformation?: string
  readonly creditorName?: string
  readonly debtorName?: string
}

/**
 * Read an account's transactions (`GET /v1/accounts/{id}/transactions`).
 *
 * BOOKED ONLY by default. A pending entry has no booking date and may still vanish; reconciling
 * against one would match a ledger line to money that never moved.
 *
 * @standard Berlin Group NextGenPSD2 v1.3 §5.4.1 read-transaction-list
 */
export async function fetchAspspTransactions(
  config: AspspConfig,
  token: AccessToken,
  consentId: string,
  resourceId: string,
  args: { readonly dateFrom: string; readonly dateTo?: string; readonly bookingStatus?: 'booked' | 'pending' | 'both' },
): Promise<ApiResult<ReadonlyArray<AspspTransaction>>> {
  const q = new URLSearchParams({
    dateFrom: args.dateFrom,
    bookingStatus: args.bookingStatus ?? 'booked',
    ...(args.dateTo ? { dateTo: args.dateTo } : {}),
  })
  try {
    const r = await fetch(`${config.endpoint}/v1/accounts/${encodeURIComponent(resourceId)}/transactions?${q}`, {
      headers: {
        Authorization: `Bearer ${token.token}`,
        'Consent-ID': consentId,
        'X-Request-ID': cryptoRandomId(),
        Accept: 'application/json',
        ...(config.extraHeaders ?? {}),
      },
    })
    if (!r.ok) return err(config.name, `transactions HTTP ${r.status}`)
    const json = (await r.json()) as {
      transactions?: { booked?: unknown[]; pending?: unknown[] }
    }
    const raw = [...((json.transactions?.booked ?? []) as Record<string, unknown>[]),
      ...(args.bookingStatus === 'both' || args.bookingStatus === 'pending'
        ? ((json.transactions?.pending ?? []) as Record<string, unknown>[])
        : [])]
    return ok(config.name, raw.map(readTransaction))
  } catch (e) {
    return err(config.name, String(e))
  }
}

/** Read one Berlin Group transaction object. Shape-tolerant: an absent field is absent, never invented. */
function readTransaction(t: Record<string, unknown>): AspspTransaction {
  const amt = (t.transactionAmount ?? {}) as { amount?: string; currency?: string }
  return {
    transactionId: typeof t.transactionId === 'string' ? t.transactionId : undefined,
    bookingDate: typeof t.bookingDate === 'string' ? t.bookingDate : undefined,
    valueDate: typeof t.valueDate === 'string' ? t.valueDate : undefined,
    amount: amt.amount ?? '0',
    currency: amt.currency ?? 'BGN',
    remittanceInformation:
      typeof t.remittanceInformationUnstructured === 'string' ? t.remittanceInformationUnstructured : undefined,
    creditorName: typeof t.creditorName === 'string' ? t.creditorName : undefined,
    debtorName: typeof t.debtorName === 'string' ? t.debtorName : undefined,
  }
}
