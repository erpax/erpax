import { toUuid } from '@/uuid/matrix'
/**
 * outward — the boundary is content-addressed too. Verify an address, don't re-read the world.
 *
 * erpax leans on rails it does not own: VIES answers whether a VAT number is live,
 * the ECB publishes the rate, the Peppol directory says who can receive an invoice,
 * a standards body moves a clause. Today each is re-fetched on demand and nothing
 * REMEMBERS what it said, so "did the outside change?" is unanswerable — the only
 * options are trust it or ask again, and asking again costs attention every time.
 *
 * A receipt fixes that: fetch once, fold the answer to a content-uuid, and keep the
 * address. Every later pass VERIFIES the address instead of re-reading the world.
 * An unchanged answer costs one comparison; only a MOVED address is news. That is
 * the corpus's own law applied outward — same content, same address ([[identity]]) —
 * and it makes an external fact CHECKABLE evidence rather than a transient scrape.
 *
 * FOUR STATES, and the fourth is the honest one:
 *   fresh        first sighting — the address is now on record
 *   unchanged    the world agrees with the receipt (the cheap, common case)
 *   moved        the answer changed — the ONLY case that deserves attention
 *   unreachable  the boundary is down. NOT a failure: the last receipt still stands.
 *
 * That last state is the point of the design. A gate that goes red because someone
 * else's server is rebooting trains people to ignore it ([[rules]]: a gate that
 * cries wolf is one nobody reads).
 *
 * PURE core (address · diff · verdict); the fetching lives behind an injected thunk,
 * so this atom is provable without a network. Adapted from uuidna's outward pass.
 *
 * @standard RFC 9562 §5.8 — v8 content-uuid (the address)
 * @standard ISO 19011:2018 §6.4 — audit evidence: the receipt IS the evidence
 * @see ./SKILL.md · ../country/api (the rails) · ../match (external answers as evidence)
 */

/** A named external answer and how to obtain it. `run` is injected — never hardcoded I/O. */
export interface OutwardProbe<T = unknown> {
  readonly name: string
  /** The host being asked — recorded so a receipt says WHO answered, not just what. */
  readonly host: string
  readonly run: () => Promise<T>
}

export type OutwardState = 'fresh' | 'unchanged' | 'moved' | 'unreachable'

export interface OutwardRow {
  readonly name: string
  readonly host: string
  /** The content-address of the answer; the PRIOR address when unreachable. */
  readonly address: string
  readonly state: OutwardState
  readonly note?: string
}

/** name → content-address. The whole persisted memory of the outside. */
export type ReceiptBook = Readonly<Record<string, string>>

/**
 * Fold any external answer to its address. Key order must not matter — two servers
 * may serialise the same JSON differently — so objects are canonicalised before
 * folding, which is what makes `unchanged` mean "the same ANSWER", not "the same bytes".
 */
export function receiptAddress(answer: unknown): string {
  return toUuid(Buffer.from(canonical(answer), 'utf8'))
}

/** Deterministic JSON: sorted keys, recursively. */
function canonical(v: unknown): string {
  if (v === null || typeof v !== 'object') return JSON.stringify(v ?? null)
  if (Array.isArray(v)) return `[${v.map(canonical).join(',')}]`
  const o = v as Record<string, unknown>
  return `{${Object.keys(o).sort().map((k) => `${JSON.stringify(k)}:${canonical(o[k])}`).join(',')}}`
}

/** The state of one probe against its prior receipt — pure, no I/O. */
export function receiptState(prior: string | undefined, current: string): OutwardState {
  if (!prior) return 'fresh'
  return prior === current ? 'unchanged' : 'moved'
}

/**
 * Run every probe against the prior book. Failures become `unreachable` rows that
 * KEEP the prior address — a boundary that is down never erases what it last said.
 *
 * @invariant one row per probe, in probe order
 * @invariant an unreachable probe preserves its prior address and never throws
 */
export async function runOutward(
  probes: readonly OutwardProbe[],
  prior: ReceiptBook = {},
): Promise<readonly OutwardRow[]> {
  return Promise.all(
    probes.map(async (p): Promise<OutwardRow> => {
      try {
        const address = receiptAddress(await p.run())
        return { name: p.name, host: p.host, address, state: receiptState(prior[p.name], address) }
      } catch (e) {
        return {
          name: p.name,
          host: p.host,
          address: prior[p.name] ?? '',
          state: 'unreachable',
          note: String((e as Error)?.message ?? e).slice(0, 120),
        }
      }
    }),
  )
}

/**
 * The next book: every fresh/unchanged/moved address recorded, unreachable probes
 * keeping whatever they last said (never dropped — absence would read as "never asked").
 */
export function nextBook(prior: ReceiptBook, rows: readonly OutwardRow[]): ReceiptBook {
  const next: Record<string, string> = { ...prior }
  for (const r of rows) if (r.state !== 'unreachable' && r.address) next[r.name] = r.address
  return next
}

export interface OutwardVerdict {
  readonly rows: readonly OutwardRow[]
  readonly moved: readonly OutwardRow[]
  readonly unreachable: readonly OutwardRow[]
  /** true when nothing MOVED — the outside still agrees with the record. */
  readonly holds: boolean
  readonly summary: string
}

/**
 * The verdict. `holds` ignores unreachable by design: the question is "did the world
 * CHANGE", and a server being down is not an answer to it.
 *
 * @invariant holds ⟺ moved.length === 0
 */
export function outwardVerdict(rows: readonly OutwardRow[]): OutwardVerdict {
  const moved = rows.filter((r) => r.state === 'moved')
  const unreachable = rows.filter((r) => r.state === 'unreachable')
  const fresh = rows.filter((r) => r.state === 'fresh').length
  return {
    rows,
    moved,
    unreachable,
    holds: moved.length === 0,
    summary:
      `outward — ${rows.length} probe(s): ${rows.length - moved.length - unreachable.length - fresh} unchanged · ` +
      `${fresh} fresh · ${moved.length} MOVED · ${unreachable.length} unreachable`,
  }
}
