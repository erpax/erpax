/**
 * notary/check/registry — a REAL wired provider: company existence + name/address verification against
 * the EU VIES service, which answers over the national business register in real time. This answers the
 * `company` check of notary/check (provider `registryAgency` — Агенция по вписванията), connected live.
 *
 * Source chain (verified live 2026-07-15): VIES (VAT Information Exchange System), operated by the
 * European Commission, exposes a PUBLIC REST endpoint (VIES_REST below) that validates a VAT number
 * against the member state's authoritative register and returns the registered name and address. For
 * Bulgaria the VAT number is the EIK/ЕИК with a `BG` prefix, so a company's EIK resolves its official
 * Commercial-Register identity. Verified: `BG201230426` → isValid, name "БОРИКА - АД", address in Sofia
 * (HTTP 200); a bogus number → isValid:false. No credential, no API key.
 *
 * HONEST BOUNDARY:
 *  - SCOPE: VIES confirms a company EXISTS and returns its registered name + address — real-time, over the
 *    national register. That is the `company` existence check. It does NOT return representatives, capital,
 *    legal-representation power, or company status/history.
 *  - The provider `registryAgency` (Агенция по вписванията) also owns `title` and `encumbrance` (the
 *    Property Register / Имотен регистър). Those, plus full Commercial-Register detail, require the
 *    deployer's CREDENTIALED access — the RegiX / official register web service under a data-sharing
 *    agreement (portal.registryagency.bg individual lookups are anti-scraping gated). This adapter refuses
 *    `title`/`encumbrance` honestly (they are not VIES-answerable) and leaves the credential as an injected
 *    seam (`RegisterSeam`). No endpoint or token is fabricated.
 *  - VIES availability is member-state dependent; an unreachable/erroring service THROWS — never a
 *    fabricated "company exists". A hit is a positive existence signal, not a full legal-standing opinion.
 *
 * @standard Council Directive 2006/112/EC (VAT) · VIES — cross-border registered-taxpayer validation
 * @standard Bulgarian Commercial Register (Търговски регистър) — EIK/ЕИК company identity
 *
 * Composes [[notary]] · [[law]] · [[standards]].
 */
import type { Check, CheckResult, Provider, ProviderAdapter } from '@/notary/check'

/** The public EU VIES REST base — `/{country}/vat/{number}` validates against the national register. */
export const VIES_REST = 'https://ec.europa.eu/taxation_customs/vies/rest-api/ms'

/** Minimal fetch surface (a Worker's global `fetch` fits) — injectable so tests never touch the network. */
export type Fetcher = (url: string) => Promise<{ readonly ok: boolean; readonly status: number; text(): Promise<string> }>

/** The deploy-time credential seam for the register data NOT public via VIES (Property Register, full CR). */
export interface RegisterSeam {
  readonly endpoint?: string // RegiX / official register web service, from the data-sharing agreement
  readonly credential?: string // injected at deploy from env — NOT stored, NOT defaulted
}

/** A parsed VIES response — the registered identity behind a VAT/EIK number. */
export interface CompanyRecord {
  readonly exists: boolean
  readonly name: string
  readonly address: string
  readonly vat: string
  readonly country: string
}

interface ViesResponse {
  readonly isValid?: boolean
  readonly name?: string
  readonly address?: string
  readonly userError?: string
  readonly vatNumber?: string
}

/** Normalise a Bulgarian EIK/VAT to VIES form — strip a leading country code and any non-digits. */
export function normalizeVat(subject: string): { country: string; number: string } {
  const raw = subject.trim().toUpperCase()
  const country = /^BG/.test(raw) ? 'BG' : /^[A-Z]{2}/.test(raw) ? raw.slice(0, 2) : 'BG'
  const number = raw.replace(/^[A-Z]{2}/, '').replace(/\D/g, '')
  return { country, number }
}

/** Build the VIES REST URL for a country + VAT number. */
export function viesUrl(country: string, number: string): string {
  return `${VIES_REST}/${country}/vat/${number}`
}

/** Fetch a company's registered identity from VIES — real-time over the national register. */
export async function fetchCompany(
  subject: string,
  fetcher: Fetcher = globalThis.fetch as unknown as Fetcher,
): Promise<CompanyRecord> {
  const { country, number } = normalizeVat(subject)
  if (!number) throw new Error('registry: empty VAT/EIK — nothing to verify')
  const res = await fetcher(viesUrl(country, number))
  if (!res.ok) throw new Error(`VIES unreachable: ${res.status}`)
  const body = JSON.parse(await res.text()) as ViesResponse
  return {
    exists: body.isValid === true,
    name: (body.name ?? '').trim(),
    address: (body.address ?? '').replace(/\s+/g, ' ').trim(),
    vat: body.vatNumber ?? number,
    country,
  }
}

/**
 * The real registryAgency ProviderAdapter for notary/check. Answers `company` by verifying existence +
 * registered name/address via VIES over the national register. `ok:true` = the company exists (with its
 * registered name); `ok:false` = no such registered company. `title` and `encumbrance` are NOT VIES-
 * answerable (Property Register, credentialed) — the adapter refuses them honestly rather than fabricate.
 * The fetcher is injectable for tests; an unreachable VIES THROWS — a seal is never issued on a fabrication.
 */
export function registryAdapter(opts: { fetcher?: Fetcher; register?: RegisterSeam } = {}): ProviderAdapter {
  const provider: Provider = 'registryAgency'
  return {
    provider,
    async run(check: Check, subject: string): Promise<CheckResult> {
      if (check === 'title' || check === 'encumbrance') {
        throw new Error(
          `registry adapter: "${check}" needs the credentialed Property Register (Имотен регистър) — configure RegisterSeam; not VIES-answerable`,
        )
      }
      if (check !== 'company') throw new Error(`registry adapter does not answer "${check}"`)
      const company = await fetchCompany(subject, opts.fetcher)
      return {
        ok: company.exists,
        detail: company.exists
          ? `company exists in the register: ${company.name} (${company.country}${company.vat})`
          : `no registered company for "${subject}"`,
        at: new Date().toISOString(),
      }
    },
  }
}
