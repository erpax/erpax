import { OFAC_SDN_HEAD_XML } from './fixtures/ofac/sdn'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { ContractCheck } from '@/outward/eu/contract'
/**
 * outward/world — the public, parser-backed rails beyond the EU four and the BG two,
 * each contracted against a capture taken with the exact request its client makes.
 *
 * The trap it exists for — a 200 carrying a failure in the body — is in ./SKILL.md.
 */

const ok = (rail: string, detail: string): ContractCheck => ({ rail, holds: true, detail })
const no = (rail: string, detail: string): ContractCheck => ({ rail, holds: false, detail })

const asObject = (body: string): Record<string, unknown> | undefined => {
  if (/^\s*</.test(body)) return undefined // HTML under a 200 is not an answer
  try {
    const j: unknown = JSON.parse(body)
    return j && typeof j === 'object' && !Array.isArray(j) ? (j as Record<string, unknown>) : undefined
  } catch {
    return undefined
  }
}

/** Brønnøysundregistrene: the client reads navn · organisasjonsform.kode · MVA flag. */
export function checkBrreg(body: string): ContractCheck {
  const j = asObject(body)
  if (!j) return no('brreg', 'response is not a JSON object')
  if (typeof j.navn !== 'string') return no('brreg', `"navn" absent (keys: ${Object.keys(j).slice(0, 8).join(', ')})`)
  const form = j.organisasjonsform as Record<string, unknown> | undefined
  if (!form || typeof form.kode !== 'string') return no('brreg', '"organisasjonsform.kode" absent — the client reads the NESTED code')
  if (typeof j.registrertIMvaregisteret !== 'boolean') return no('brreg', '"registrertIMvaregisteret" is not a boolean')
  return ok('brreg', `${String(j.navn)} (${String(form.kode)})`)
}

/**
 * OFAC SDN: the client returns the RAW TEXT, so the only thing that can break a
 * downstream reader is the document shape — root element and publication header.
 */
export function checkOfac(body: string): ContractCheck {
  if (!/<sdnList[\s>]/i.test(body)) return no('ofac', 'no <sdnList> root — the SDN export moved or an error page was served')
  const count = /<Record_Count>(\d+)<\/Record_Count>/i.exec(body)?.[1]
  const date = /<Publish_Date>([^<]+)<\/Publish_Date>/i.exec(body)?.[1]
  if (!date) return no('ofac', '<Publish_Date> absent — the list carries no publication date')
  if (!count || Number(count) <= 0) return no('ofac', `<Record_Count> is ${count ?? 'absent'} — an empty sanctions list must never read as clean`)
  return ok('ofac', `SDN published ${date}, ${count} records`)
}

/** SEC EDGAR: the client hands back the whole submissions record. */
export function checkSecEdgar(body: string): ContractCheck {
  const j = asObject(body)
  if (!j) return no('sec', 'response is not a JSON object (403 HTML? SEC requires a contact User-Agent)')
  if (typeof j.cik !== 'string') return no('sec', '"cik" absent or not a string')
  const filings = j.filings as Record<string, unknown> | undefined
  const recent = filings?.recent as Record<string, unknown> | undefined
  if (!recent || !Array.isArray(recent.accessionNumber)) {
    return no('sec', '"filings.recent.accessionNumber" absent — the filings index moved')
  }
  return ok('sec', `CIK ${String(j.cik)}, ${String(j.entityType ?? '?')}, ${recent.accessionNumber.length} recent filing(s)`)
}

/** Frankfurter: the client reads base · date · rates. */
export function checkFrankfurter(body: string): ContractCheck {
  const j = asObject(body)
  if (!j) return no('frankfurter', 'response is not a JSON object')
  if (typeof j.base !== 'string') return no('frankfurter', '"base" absent')
  if (typeof j.date !== 'string') return no('frankfurter', '"date" absent — the rate must carry the day it is valid for')
  const rates = j.rates as Record<string, unknown> | undefined
  const codes = rates ? Object.keys(rates) : []
  if (codes.length === 0) return no('frankfurter', '"rates" is empty')
  const bad = codes.filter((c) => typeof rates![c] !== 'number')
  if (bad.length) return no('frankfurter', `rate not numeric for ${bad.join(', ')}`)
  return ok('frankfurter', `${String(j.base)} on ${String(j.date)}: ${codes.length} rate(s)`)
}

/**
 * ExchangeRate-API: `result` is the real verdict — the API answers **HTTP 200 with
 * `result: "error"`**, so a client trusting the status code reads a failure as data.
 */
export function checkExchangeRateApi(body: string): ContractCheck {
  const j = asObject(body)
  if (!j) return no('erapi', 'response is not a JSON object')
  if (j.result !== 'success') return no('erapi', `"result" is ${JSON.stringify(j.result)} — a 200 can carry an error here`)
  if (typeof j.base_code !== 'string') return no('erapi', '"base_code" absent (the client reads base_code, NOT base)')
  const rates = j.rates as Record<string, unknown> | undefined
  if (!rates || Object.keys(rates).length === 0) return no('erapi', '"rates" absent or empty')
  return ok('erapi', `${String(j.base_code)}: ${Object.keys(rates).length} rate(s)`)
}

/**
 * Open Food Facts: **`status: 0` under an HTTP 200** is how a missing barcode
 * answers, so success is `status === 1 && product`, never `r.ok`.
 */
export function checkOpenFoodFacts(body: string): ContractCheck {
  const j = asObject(body)
  if (!j) return no('off', 'response is not a JSON object')
  if (j.status !== 1) return no('off', `"status" is ${JSON.stringify(j.status)} — a miss answers 200 with status 0`)
  const p = j.product as Record<string, unknown> | undefined
  if (!p) return no('off', '"product" absent though status is 1')
  if (typeof p.code !== 'string') return no('off', 'product.code absent')
  // `brands` is a comma-separated STRING, not an array — the client's own note.
  if (p.brands !== undefined && typeof p.brands !== 'string') return no('off', 'product.brands is not a string (it is comma-separated, not an array)')
  if (p.categories_tags !== undefined && !Array.isArray(p.categories_tags)) return no('off', 'product.categories_tags is not an array')
  return ok('off', `${String(p.code)} ${String(p.product_name ?? '')}`.trim())
}

const FIXTURES = join(new URL('.', import.meta.url).pathname, 'fixtures')
const fixture = (f: string): string => readFileSync(join(FIXTURES, f), 'utf8')

/** Every world contract against its captured fixture — deterministic, offline, CI-safe. */
export function worldContractOffline(): readonly ContractCheck[] {
  return [
    checkBrreg(fixture('brreg.json')),
    checkOfac(OFAC_SDN_HEAD_XML),
    checkSecEdgar(fixture('sec-edgar.json')),
    checkFrankfurter(fixture('frankfurter.json')),
    checkExchangeRateApi(fixture('erapi.json')),
    checkOpenFoodFacts(fixture('openfoodfacts.json')),
  ]
}

interface LiveRail {
  readonly rail: string
  readonly url: string
  readonly headers?: Record<string, string>
  readonly check: (body: string) => ContractCheck
}

/**
 * The live addresses, with the headers each authority REQUIRES.
 *
 * SEC and Open Food Facts both mandate a descriptive contact User-Agent in their
 * published access policies — sending erpax's identity is the documented way to
 * use them, and SEC answers 403 without it.
 */
const LIVE: readonly LiveRail[] = [
  { rail: 'brreg', url: 'https://data.brreg.no/enhetsregisteret/api/enheter/923609016', check: checkBrreg },
  {
    rail: 'sec',
    url: 'https://data.sec.gov/submissions/CIK0000320193.json',
    headers: { 'User-Agent': 'erpax-country-context-client (compliance@erpax.dev)' },
    check: checkSecEdgar,
  },
  { rail: 'frankfurter', url: 'https://api.frankfurter.dev/v1/latest?base=EUR&symbols=USD', headers: { accept: 'application/json' }, check: checkFrankfurter },
  { rail: 'erapi', url: 'https://open.er-api.com/v6/latest/EUR', check: checkExchangeRateApi },
  {
    rail: 'off',
    url: 'https://world.openfoodfacts.org/api/v2/product/737628064502.json?fields=code,product_name,brands,quantity,categories_tags',
    headers: { 'user-agent': 'erpax-trading-client/1.0 (compliance@erpax.dev)' },
    check: checkOpenFoodFacts,
  },
]

/**
 * The SAME checks against the LIVE hosts. OFAC is fetched by RANGE — the real
 * export is ~28 MB and the shape check reads the header, so pulling the whole file
 * on every run would be waste, not evidence.
 *
 * NETWORK — a CLI lane only, never a gate.
 */
export async function worldContractOnline(): Promise<readonly ContractCheck[]> {
  const out: ContractCheck[] = []
  for (const r of LIVE) {
    try {
      const res = await fetch(r.url, { headers: { 'Accept-Language': 'en', ...(r.headers ?? {}) } })
      out.push(res.ok ? r.check(await res.text()) : no(r.rail, `HTTP ${res.status}`))
    } catch (e) {
      out.push(no(r.rail, String(e)))
    }
  }
  try {
    const res = await fetch('https://www.treasury.gov/ofac/downloads/sdn.xml', {
      headers: { Range: 'bytes=0-4095', 'Accept-Language': 'en' },
    })
    out.push(res.ok ? checkOfac(await res.text()) : no('ofac', `HTTP ${res.status}`))
  } catch (e) {
    out.push(no('ofac', String(e)))
  }
  return out
}

/**
 * CLI — `erpax outward world` (add `--online` for the live hosts).
 *
 * A LANE, never a gate: nothing in the push path may depend on the network. The
 * offline half is what the release gate runs ([[outward]]/gate).
 */
if (import.meta.url === 'file://' + process.argv[1]) {
  const online = process.argv.includes('--online')
  const checks = online ? await worldContractOnline() : worldContractOffline()
  for (const c of checks) console.log(`  ${c.holds ? '✓' : '✗'} ${c.rail.padEnd(12)} ${c.detail}`)
  const broken = checks.filter((c) => !c.holds)
  console.log(
    broken.length
      ? `\n✗ ${broken.length} contract break(s) — ${online ? 'the captures are now stale' : 'the parser disagrees with its own capture'}`
      : `\n✓ all world rails satisfy the contract (${online ? 'live' : 'offline'})`,
  )
  if (broken.length) process.exit(1)
}
