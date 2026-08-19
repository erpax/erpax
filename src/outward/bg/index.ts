import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { ContractCheck } from '@/outward/eu/contract'
/**
 * outward/bg — the two Bulgarian rails erpax actually codes against, contracted.
 *
 * Both are declared `clientImplemented: true` in country/api, so both are promises
 * that erpax parses their answers — and both were unproven until now
 * ([[outward]]/coverage).
 *
 * WHAT THE CLIENT PARSES (this is the contract, read from the live client code):
 *   БНБ  src/country/api/client#bgBnbRate → <ROW><CODE><RATIO><RATE> from
 *        StERFCDownload.aspx?download=xml
 *   TR   src/country/api/client → GET /api/public/companies/{eik} → JSON {name,status}
 *
 * LIVE STATE, 2026-08-19 — BOTH ENDPOINTS NO LONGER SERVE THAT SHAPE:
 *   БНБ StERFCDownload.aspx answers **HTML**, not XML.
 *   TR  /api/public/companies/{eik} answers **HTTP 404**.
 * So the fixtures here are RECONSTRUCTED from the parser's expectation rather than
 * captured, and each says so in its own header. That is the honest split this layer
 * was built for: the offline contract pins what erpax was built to read; the online
 * lane reports that the world stopped sending it. Marking these "covered" does NOT
 * mean the integration works — it means the parser has a refutable specification.
 *
 * @see ../eu/contract.ts (the pattern) · ../coverage (the ledger) · ./test.ts
 */

const ok = (rail: string, detail: string): ContractCheck => ({ rail, holds: true, detail })
const no = (rail: string, detail: string): ContractCheck => ({ rail, holds: false, detail })

/**
 * БНБ: the client reads CODE · RATIO · RATE and divides by RATIO, so a missing or
 * zero RATIO is a division-by-zero the parser must never be handed silently.
 */
export function checkBnb(xml: string): ContractCheck {
  const code = /<CODE>([\s\S]*?)<\/CODE>/i.exec(xml)?.[1]?.trim()
  const ratio = /<RATIO>([\s\S]*?)<\/RATIO>/i.exec(xml)?.[1]?.trim()
  const rate = /<RATE>([\s\S]*?)<\/RATE>/i.exec(xml)?.[1]?.trim()
  if (!code || !ratio || !rate) {
    return no('bnb', `missing ${[!code && 'CODE', !ratio && 'RATIO', !rate && 'RATE'].filter(Boolean).join('/')} — the XML shape moved (HTML page?)`)
  }
  const r = Number(rate)
  const q = Number(ratio)
  if (!(r > 0)) return no('bnb', `RATE unparseable: ${rate}`)
  if (!(q > 0)) return no('bnb', `RATIO is ${ratio} — the client divides by it`)
  return ok('bnb', `${code} rate ${r} per ${q} unit(s) parses`)
}

/** TR: the client reads `name` and `status` off the company JSON. */
export function checkTr(body: string): ContractCheck {
  let j: Record<string, unknown>
  try {
    j = JSON.parse(body) as Record<string, unknown>
  } catch {
    return no('tr', 'response is not JSON (404 HTML page?)')
  }
  if (typeof j.name !== 'string') return no('tr', `"name" absent/not a string (keys: ${Object.keys(j).join(', ')})`)
  if (typeof j.status !== 'string') return no('tr', '"status" absent or not a string')
  return ok('tr', `name + status parse (${j.status})`)
}

const FIXTURES = join(new URL('.', import.meta.url).pathname, 'fixtures')

/** The BG contracts against their frozen fixtures — deterministic, offline, CI-safe. */
export function bgContractOffline(): readonly ContractCheck[] {
  return [
    checkBnb(readFileSync(join(FIXTURES, 'bnb-rate.xml'), 'utf8')),
    checkTr(readFileSync(join(FIXTURES, 'tr-company.json'), 'utf8')),
  ]
}
