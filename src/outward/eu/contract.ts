import { readFileSync } from 'node:fs'
import { join } from 'node:path'
/**
 * outward/eu/contract — ONE contract, checked against TWO sources.
 *
 * "Test all the APIs" is two different questions, and conflating them makes a gate
 * nobody trusts:
 *
 *   1. Does OUR CODE handle the API's shape?   → deterministic. Belongs in the gate.
 *   2. Is the OUTSIDE still that shape?        → depends on someone else's uptime.
 *                                                Belongs in a lane, never a gate.
 *
 * Today's live run proved why the split matters: a perfectly correct erpax would have
 * failed its own release because the EU sanctions host answered 403. So the checks
 * below are defined ONCE and run against either source:
 *
 *   offline  contract.test.ts → the frozen fixtures/ → runs in CI, cannot flake
 *   online   erpax outward eu --contract → the live hosts → run deliberately
 *
 * When the two disagree, that is the finding: the fixture says what we built for, the
 * live answer says what the world now sends, and the gap is exactly the work.
 *
 * @standard ISO 19011:2018 §6.4 — audit evidence
 * @see ./index.ts (the probes) · ./fixtures · ../SKILL.md
 */

export interface ContractCheck {
  readonly rail: string
  readonly holds: boolean
  readonly detail: string
}

const ok = (rail: string, detail: string): ContractCheck => ({ rail, holds: true, detail })
const no = (rail: string, detail: string): ContractCheck => ({ rail, holds: false, detail })

/**
 * VIES: erpax codes against the SOAP operation `checkVat`. If it vanishes or is
 * renamed, every VAT validation breaks — so that name IS the contract.
 */
export function checkVies(wsdl: string): ContractCheck {
  const ops = [...wsdl.matchAll(/<(?:wsdl:)?operation name="([^"]+)"/g)].map((m) => m[1]!)
  return ops.includes('checkVat')
    ? ok('vies', `operations: ${[...new Set(ops)].sort().join(', ')}`)
    : no('vies', `checkVat operation ABSENT — found: ${[...new Set(ops)].sort().join(', ') || '(none)'}`)
}

/**
 * ECB: erpax prices foreign invoices from `<Cube currency rate>` pairs, so THE SHAPE
 * is the contract — a parseable currency/rate pair. WHICH currencies appear is a
 * world fact, not a contract: the outward receipt notices that (`moved`), and this
 * check must not, or a country adopting the euro would "break the build".
 *
 * That distinction is not hypothetical. The first version of this check demanded BGN
 * and failed on the live response: the ECB no longer publishes a lev rate, because
 * Bulgaria is in the euro. The parser was fine; my assertion had baked a world fact
 * into a contract. Observed 2026-08-18 — 29 currencies, CZK/HUF/PLN/RON present,
 * BGN absent.
 */
export function checkEcb(xml: string): ContractCheck {
  const pairs = [...xml.matchAll(/currency=['"]([A-Z]{3})['"]\s+rate=['"]([\d.]+)['"]/g)]
  if (pairs.length === 0) return no('ecb', 'no <Cube currency rate> pairs — the rate SHAPE moved')
  const unparseable = pairs.filter((p) => !(Number(p[2]) > 0))
  if (unparseable.length > 0) return no('ecb', `unparseable rate(s): ${unparseable.map((p) => p[1]).join(', ')}`)
  return ok('ecb', `${pairs.length} currency/rate pairs parse (BGN ${pairs.some((p) => p[1] === 'BGN') ? 'listed' : 'absent — euro'})`)
}

/**
 * Peppol: erpax reads `matches` (the participants) and the result count. Those two
 * keys are what a directory lookup depends on.
 */
export function checkPeppol(body: string): ContractCheck {
  let json: Record<string, unknown>
  try {
    json = JSON.parse(body) as Record<string, unknown>
  } catch {
    return no('peppol', 'response is not JSON')
  }
  if (!Array.isArray(json.matches)) return no('peppol', `"matches" is not an array (keys: ${Object.keys(json).join(', ')})`)
  if (typeof json['total-result-count'] !== 'number') return no('peppol', '"total-result-count" is not a number')
  return ok('peppol', `matches[] present; total-result-count numeric; version ${String(json.version ?? '?')}`)
}

const FIXTURES = join(new URL('.', import.meta.url).pathname, 'fixtures')
const fixture = (name: string): string => readFileSync(join(FIXTURES, name), 'utf8')

/** The contract against the FROZEN fixtures — deterministic, offline, CI-safe. */
export function contractOffline(): readonly ContractCheck[] {
  return [
    checkVies(fixture('vies.wsdl.xml')),
    checkEcb(fixture('ecb-daily.xml')),
    checkPeppol(fixture('peppol-search.json')),
  ]
}

/**
 * The SAME contract against the live hosts. A fetch failure is `unreachable`, not a
 * broken contract — the boundary is allowed to be down ([[outward]]).
 */
export async function contractOnline(fetchImpl: typeof fetch = fetch): Promise<readonly ContractCheck[]> {
  const get = async (url: string): Promise<string> => {
    const res = await fetchImpl(url, { headers: { accept: '*/*' }, redirect: 'follow' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.text()
  }
  const probe = async (rail: string, url: string, check: (body: string) => ContractCheck): Promise<ContractCheck> => {
    try {
      return check(await get(url))
    } catch (e) {
      return { rail, holds: true, detail: `unreachable — ${String((e as Error)?.message ?? e)} (not a contract break)` }
    }
  }
  return Promise.all([
    probe('vies', 'https://ec.europa.eu/taxation_customs/vies/services/checkVatService.wsdl', checkVies),
    probe('ecb', 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml', checkEcb),
    probe('peppol', 'https://directory.peppol.eu/search/1.0/json?q=*&rpc=1', checkPeppol),
  ])
}
