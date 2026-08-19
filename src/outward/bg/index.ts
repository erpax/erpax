import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { ContractCheck } from '@/outward/eu/contract'
/**
 * outward/bg — the two Bulgarian rails erpax codes against, contracted.
 *
 * Both are declared `clientImplemented: true` in country/api, so both are
 * promises that erpax parses their answers ([[outward]]/coverage).
 *
 * WHAT THE CLIENT PARSES (the contract, read from the live client code):
 *   БНБ  index.htm?download=xml → <ROW><CODE><REVERSERATE><RATE><CURR_DATE>
 *   TR   /CR/api/Deeds/{eik}/Applications → [{ incomingLinkedDeeds: [{ uic,
 *        companyName, companyFullName, status, legalForm }] }]
 *
 * BOTH ADDRESSES WERE DEAD AND ARE NOW FIXED (2026-08-19). The previous
 * `StERFCDownload.aspx` served HTML and `/api/public/companies/{eik}` served
 * 404, so every lookup through them failed. The fixtures here are now REAL
 * CAPTURES from the working endpoints, not reconstructions.
 *
 * Two live traps this contract exists to pin, because each one turns a
 * working endpoint into a silent "no data":
 *
 *   1. БНБ's WAF answers an HTML error page UNDER A 200 to unrecognised
 *      clients — so the XML check must reject non-XML explicitly.
 *   2. The БНБ feed's FIRST ROW is a header whose values are column labels
 *      (`<CODE>Code</CODE>`), so a first-match parse reads `"Code"` as a
 *      currency.
 *
 * @see ../eu/contract.ts (the pattern) · ../coverage (the ledger) · ./test.ts
 */

const ok = (rail: string, detail: string): ContractCheck => ({ rail, holds: true, detail })
const no = (rail: string, detail: string): ContractCheck => ({ rail, holds: false, detail })

const tag = (block: string, name: string): string | undefined =>
  new RegExp(`<${name}>([\\s\\S]*?)</${name}>`, 'i').exec(block)?.[1]?.trim()

/**
 * БНБ: the client reads CODE · REVERSERATE · RATE off each DATA row.
 *
 * `RATIO` is gone from the feed — Bulgaria adopted the euro and the fixing is
 * now quoted against EUR in both directions. A parser still looking for RATIO
 * reads nothing, which is why this check demands the euro-era columns.
 */
export function checkBnb(xml: string): ContractCheck {
  if (!/<ROWSET/i.test(xml)) return no('bnb', 'response is not the ROWSET XML (WAF error page?)')

  const rows = [...xml.matchAll(/<ROW>([\s\S]*?)<\/ROW>/gi)].map((m) => m[1] ?? '')
  if (rows.length === 0) return no('bnb', 'no <ROW> elements')

  // Only a three-capital code is a datum; row 0 carries the column labels.
  const data = rows.filter((b) => /^[A-Z]{3}$/.test(tag(b, 'CODE') ?? ''))
  if (data.length === 0) return no('bnb', 'no data rows — every CODE is a label (header-only?)')

  const first = data[0]!
  const code = tag(first, 'CODE')!
  const eurPerUnit = Number((tag(first, 'REVERSERATE') ?? '').replace(',', '.'))
  const perEur = Number((tag(first, 'RATE') ?? '').replace(',', '.'))
  if (!(eurPerUnit > 0)) return no('bnb', `REVERSERATE unparseable for ${code} — the euro-era column moved`)
  if (!(perEur > 0)) return no('bnb', `RATE unparseable for ${code}`)
  // The feed dates as DD.MM.YYYY, not ISO — pinning that is the point of this
  // check: an ISO-shaped assumption reads no date and silently substitutes today.
  if (!/^\d{2}\.\d{2}\.\d{4}$/.test(tag(first, 'CURR_DATE') ?? '')) {
    return no('bnb', `CURR_DATE is not DD.MM.YYYY ("${tag(first, 'CURR_DATE') ?? ''}") — the fixing date is what the rate is valid FOR`)
  }
  return ok('bnb', `${data.length} currencies; ${code} = ${eurPerUnit} EUR/unit (${perEur}/EUR)`)
}

/**
 * TR: the client reads the merchant off the дело's linked entries.
 *
 * The register is addressed by **дело**, not by company: the ЗТРРЮЛНЦ keeps a
 * дело in electronic form holding the заявления and the обявени актове, and the
 * company identity travels on each заявление in `incomingLinkedDeeds`.
 */
export function checkTr(body: string): ContractCheck {
  // The portal rewrites unknown paths to its SPA shell — HTML under a 200.
  if (/^\s*</.test(body)) return no('tr', 'response is HTML (portal shell — wrong path?)')
  let apps: unknown
  try {
    apps = JSON.parse(body)
  } catch {
    return no('tr', 'response is not JSON')
  }
  if (!Array.isArray(apps) || apps.length === 0) return no('tr', 'no заявления in the дело')

  const linked = (apps as ReadonlyArray<{ incomingLinkedDeeds?: unknown }>)
    .flatMap((a) => (Array.isArray(a.incomingLinkedDeeds) ? a.incomingLinkedDeeds : []))
  if (linked.length === 0) return no('tr', 'no incomingLinkedDeeds — the merchant identity is carried there')

  const d = linked[0] as Record<string, unknown>
  const missing = (['uic', 'companyName', 'companyFullName'] as const).filter((k) => typeof d[k] !== 'string')
  if (missing.length) return no('tr', `deed entry missing ${missing.join('/')} (keys: ${Object.keys(d).join(', ')})`)
  if (typeof d.status !== 'number') return no('tr', '"status" absent or not a number')
  return ok('tr', `${apps.length} заявления; ${String(d.companyFullName)} status ${String(d.status)}`)
}

const FIXTURES = join(new URL('.', import.meta.url).pathname, 'fixtures')

/** The BG contracts against their frozen fixtures — deterministic, offline, CI-safe. */
export function bgContractOffline(): readonly ContractCheck[] {
  return [
    checkBnb(readFileSync(join(FIXTURES, 'bnb-rate.xml'), 'utf8')),
    checkTr(readFileSync(join(FIXTURES, 'tr-company.json'), 'utf8')),
  ]
}

/**
 * The SAME checks against the LIVE hosts. A disagreement with
 * {@link bgContractOffline} is the finding: the fixture says what erpax was
 * built to read, the live answer says what the world now sends.
 *
 * NETWORK — a CLI lane only, never a gate.
 */
export async function bgContractOnline(): Promise<readonly ContractCheck[]> {
  const out: ContractCheck[] = []
  try {
    const r = await fetch(
      'https://www.bnb.bg/Statistics/StExternalSector/StExchangeRates/StERForeignCurrencies/' +
        'index.htm?download=xml&search=&lang=EN',
      { headers: { Accept: 'application/xml', 'User-Agent': 'curl/8.7.1 (erpax; +https://github.com/erpax/erpax)' } },
    )
    out.push(r.ok ? checkBnb(await r.text()) : no('bnb', `HTTP ${r.status}`))
  } catch (e) {
    out.push(no('bnb', String(e)))
  }
  try {
    const r = await fetch('https://portal.registryagency.bg/CR/api/Deeds/831641791/Applications', {
      headers: { Accept: 'application/json', 'Accept-Language': 'bg-BG,bg;q=0.9' },
    })
    out.push(r.ok ? checkTr(await r.text()) : no('tr', `HTTP ${r.status}`))
  } catch (e) {
    out.push(no('tr', String(e)))
  }
  return out
}
