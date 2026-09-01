import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { VIES, EU_SANCTIONS, PEPPOL_DIRECTORY, ECB_RATES } from '@/country/api'
import { runOutward, nextBook, outwardVerdict, type OutwardProbe, type ReceiptBook } from '@/outward'
/**
 * outward/eu — the four pan-EU authorities erpax stands on, receipted.
 *
 * VIES answers whether a VAT number is live; the sanctions list gates a counterparty;
 * the Peppol directory says who can receive an e-invoice; the ECB fixes the rate a
 * foreign invoice is priced at. All four are PUBLIC, unauthenticated, and none of
 * them is erpax's to control — which is exactly why their answers deserve receipts
 * ([[outward]]).
 *
 * EACH PROBE ASKS A STABLE QUESTION. That is the whole discipline: a receipt is
 * meaningless if the query drifts, and it is NOISE if the answer is expected to
 * change every day. The ECB republishes rates daily, so probing the payload would
 * report `moved` every morning and teach everyone to ignore it. So each probe
 * extracts a projection that changes only when something REAL changes:
 *
 *   vies      the WSDL's declared operations — the API CONTRACT, not a VAT answer
 *   ecb       the SET of published currency codes — not today's rates
 *   peppol    the response envelope's shape for one fixed query
 *   sanctions the list's structural header (root element + declared version)
 *
 * A moved address then means: the contract changed · a currency was added or dropped ·
 * the directory API reshaped · the sanctions schema moved. Each of those is genuine
 * news that should reach a human; a new EUR/USD rate is not.
 *
 * NETWORK, and only on demand: this is a CLI lane (`erpax outward eu`), never a gate.
 * It sends no credential and no tenant data — four unauthenticated GETs to public EU
 * endpoints — and it writes only the addresses, never the payloads.
 *
 * @standard ISO 19011:2018 §6.4 — audit evidence: the receipt IS the evidence
 * @see ../SKILL.md · ../../country/api/eu (the authorities) · ./test.ts
 */

/** Where the receipts live — addresses only, never payloads. */
export const RECEIPTS_REL = 'outward-receipts.json'

const textOf = async (url: string, fetchImpl: typeof fetch): Promise<string> => {
  const res = await fetchImpl(url, { headers: { accept: '*/*' }, redirect: 'follow' })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

/** Sorted, de-duplicated matches — order from a server must never move an address. */
const stable = (xs: readonly string[]): readonly string[] => [...new Set(xs)].sort()

/**
 * The four probes. Each `run` returns a PROJECTION, never the raw body, so the
 * address tracks the contract rather than the traffic.
 */
export function euProbes(fetchImpl: typeof fetch = fetch): readonly OutwardProbe[] {
  return [
    {
      name: 'vies',
      host: new URL(VIES.endpoint).host,
      // The WSDL's operations — the contract erpax codes against.
      run: async () => {
        const wsdl = await textOf(`${VIES.endpoint}.wsdl`, fetchImpl)
        return { operations: stable([...wsdl.matchAll(/<(?:wsdl:)?operation name="([^"]+)"/g)].map((m) => m[1]!)) }
      },
    },
    {
      name: 'ecb',
      host: new URL(ECB_RATES.endpoint).host,
      // The SET of published currencies — not the daily rates (those move by design).
      run: async () => {
        const xml = await textOf(ECB_RATES.endpoint, fetchImpl)
        return { currencies: stable([...xml.matchAll(/currency=['"]([A-Z]{3})['"]/g)].map((m) => m[1]!)) }
      },
    },
    {
      name: 'peppol',
      host: new URL(PEPPOL_DIRECTORY.endpoint).host,
      // The envelope SHAPE for one fixed query — participant counts churn; keys do not.
      run: async () => {
        const body = await textOf(`${PEPPOL_DIRECTORY.endpoint}?q=*&rpc=1`, fetchImpl)
        const json = JSON.parse(body) as Record<string, unknown>
        return { envelope: stable(Object.keys(json)) }
      },
    },
    {
      name: 'sanctions',
      host: new URL(EU_SANCTIONS.endpoint).host,
      // The list's structural header — entries change constantly; the SCHEMA should not.
      run: async () => {
        const xml = (await textOf(EU_SANCTIONS.endpoint, fetchImpl)).slice(0, 4096)
        return {
          root: xml.match(/<([A-Za-z_][\w.:-]*)[\s>]/)?.[1] ?? '',
          namespaces: stable([...xml.matchAll(/xmlns(?::[\w-]+)?="([^"]+)"/g)].map((m) => m[1]!)),
        }
      },
    },
  ]
}

const bookPath = (cwd: string): string => join(cwd, RECEIPTS_REL)

export function readBook(cwd: string = process.cwd()): ReceiptBook {
  const p = bookPath(cwd)
  if (!existsSync(p)) return {}
  try {
    return (JSON.parse(readFileSync(p, 'utf8')) as { receipts?: ReceiptBook }).receipts ?? {}
  } catch {
    return {}
  }
}

export function writeBook(book: ReceiptBook, cwd: string = process.cwd()): void {
  writeFileSync(
    bookPath(cwd),
    JSON.stringify(
      {
        law: 'Each entry is the content-address of one external answer. A later run VERIFIES the address instead of re-reading the world; only a MOVED address costs attention. Unreachable keeps the last receipt — the boundary is allowed to be down.',
        probes: Object.keys(book).length,
        receipts: book,
      },
      null,
      2,
    ) + '\n',
  )
}

/** Run the four probes against the stored book and return the verdict + next book. */
export async function checkEu(opts: { readonly cwd?: string; readonly fetchImpl?: typeof fetch } = {}) {
  const cwd = opts.cwd ?? process.cwd()
  const prior = readBook(cwd)
  const rows = await runOutward(euProbes(opts.fetchImpl ?? fetch), prior)
  return { verdict: outwardVerdict(rows), book: nextBook(prior, rows), prior }
}

/** @index-cross.foldback child=outward/eu parent=outward — this cross folds back into its parent. */
