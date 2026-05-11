/**
 * НАП (BG tax authority) mTLS dispatcher — generic mutual-TLS POST for
 * the catalogued НАП endpoints (VAT returns, VIES filings, intrastat,
 * SAF-T submission).
 *
 * One client services every НАП endpoint that accepts qualified
 * e-signature mTLS uploads — per-endpoint variation is captured by the
 * `MtlsRequest['endpoint']` arg, certificates come from per-tenant
 * config (never hardcoded).
 *
 * @standard ISO-3166-1:2020 BG country-code
 * @standard OECD SAF-T 2.0 BG-SAF-T submission
 * @standard rfc-5246 tls-1.2
 * @standard rfc-8446 tls-1.3
 * @audit ISO-19011:2018 audit-trail external-system-evidence
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27001 A.8.24 use-of-cryptography
 * @compliance EU 910/2014 eidas qualified-electronic-seal
 * @compliance SOX §404 internal-controls process-walk-through
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
 * Per-tenant mTLS configuration — sourced from
 * `tenant.config.bgNapMtls.{certPem, keyPem, passphrase?}` (or the
 * deployment env when running in single-tenant mode). Never read directly
 * from process.env in this module — callers pass the resolved config.
 */
export interface BgNapMtlsConfig {
  /** PEM-encoded qualified seal certificate (eIDAS-compliant). */
  readonly certPem: string
  /** PEM-encoded private key matching `certPem`. */
  readonly keyPem: string
  /** Optional passphrase for `keyPem`. */
  readonly passphrase?: string
}

export interface MtlsRequest {
  /** Full НАП endpoint URL (catalogued in `COUNTRY_APIS.BG`). */
  readonly endpoint: string
  /** Body — XML for SAF-T / VAT returns, key-value for some legacy paths. */
  readonly body: string
  /** Content-Type — typically `application/xml`. */
  readonly contentType: string
  /**
   * Display name for audit-trail attribution (`source` in ApiResult).
   * Use the catalogued `name` from `COUNTRY_APIS.BG` for traceability.
   */
  readonly source: string
}

/**
 * POST `request.body` to a НАП endpoint over mutual TLS using the
 * per-tenant qualified seal certificate.
 *
 * Runtime note: native mTLS in `fetch` requires either Node ≥ 18 with the
 * `https.Agent({ cert, key })` plumbed via `dispatcher`, or Cloudflare
 * Workers' [`mTLS Certificates`](https://developers.cloudflare.com/workers/runtime-apis/mtls/)
 * binding. The implementation here delegates to the runtime-detected
 * dispatcher so the same call site works in both environments.
 */
export async function postBgNapMtls(
  request: MtlsRequest,
  config: BgNapMtlsConfig,
): Promise<ApiResult<{ status: number; body: string }>> {
  if (!config.certPem || !config.keyPem) {
    return err(request.source, 'mTLS config missing — cert + key required')
  }
  try {
    // Cloudflare Workers path — uses an mtls binding the Worker config
    // exposes as a fetcher. Detect by globalThis availability so the
    // module loads cleanly in non-Worker runtimes.
    const cfMtls = (globalThis as { CF_MTLS_BG_NAP?: { fetch: typeof fetch } }).CF_MTLS_BG_NAP
    if (cfMtls) {
      const r = await cfMtls.fetch(request.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': request.contentType, Accept: 'application/xml' },
        body: request.body,
      })
      const text = await r.text()
      return ok(request.source, { status: r.status, body: text })
    }

    // Node path — undici Agent with cert/key. Imported dynamically so the
    // module doesn't fail to load in Worker runtimes (where `node:https`
    // isn't a thing).
    const { Agent } = await import('node:https')
    const agent = new Agent({
      cert: config.certPem,
      key: config.keyPem,
      ...(config.passphrase ? { passphrase: config.passphrase } : {}),
    })
    // `fetch` in Node 18+ accepts `dispatcher` via undici; cast at the
    // call boundary so TS doesn't complain about a non-WHATWG init field.
    const r = await fetch(request.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': request.contentType, Accept: 'application/xml' },
      body: request.body,
      // @ts-expect-error — undici extension on RequestInit.
      dispatcher: agent,
    })
    const text = await r.text()
    return ok(request.source, { status: r.status, body: text })
  } catch (e) {
    return err(request.source, String(e))
  }
}

/**
 * Submit a SAF-T 2.0 audit file to НАП.
 *
 * @standard OECD SAF-T 2.0 BG variant
 * @compliance EU 2014/55 b2g-e-invoicing-mandate
 */
export async function submitBgSaft(
  xmlBody: string,
  config: BgNapMtlsConfig,
): Promise<ApiResult<{ status: number; body: string }>> {
  return postBgNapMtls(
    {
      endpoint: 'https://inetdec.nra.bg/saf-t',
      body: xmlBody,
      contentType: 'application/xml',
      source: 'НАП SAF-T submission portal',
    },
    config,
  )
}
