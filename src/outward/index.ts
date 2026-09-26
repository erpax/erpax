import { toUuid } from '@/uuid/matrix'
/**
 * outward — the boundary is content-addressed too. Verify an address, don't re-read the world.
 *
 * Four states, and `unreachable` is the honest one: the boundary being down is not a failure and
 * the last receipt still stands. Pure core (address · diff · verdict); fetching is an injected
 * thunk, so this atom is provable without a network. See ./SKILL.md.
 *
 * @standard RFC 9562 §5.8 — v8 content-uuid (the address)
 * @standard ISO 19011:2018 §6.4 — audit evidence: the receipt IS the evidence
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

export * from './coverage'

/** The `{rail, holds, detail}` verdict shape `outward/bg` · `outward/world` · `outward/eu`/contract emit. */
export interface ContractLike {
  readonly rail: string
  readonly holds: boolean
  readonly detail: string
}

/**
 * Fold a contract verdict into a receipt — `{rail, holds}` ONLY. See ./SKILL.md § leads.
 *
 * `detail` is deliberately not folded: `checkFrankfurter`'s success detail reads
 * `"EUR on 2026-09-25: 31 rate(s)"`, so folding it would report `moved` every single day and the
 * lead stream would be pure noise — the failure this corpus has paid for four times. What a
 * release needs to know is that a contract's VERDICT flipped.
 */
const contractAddress = (c: ContractLike): string => receiptAddress({ rail: c.rail, holds: c.holds })

/**
 * Route a contract-check list through the receipt machinery, so `bg` and `world` become lead
 * sources like `eu` — one shape for the whole boundary instead of two.
 */
export function contractRows(source: string, checks: readonly ContractLike[], prior: ReceiptBook): OutwardRow[] {
  return checks.map((c) => {
    const name = `${source}:${c.rail}`
    const address = contractAddress(c)
    return { name, host: source, address, state: receiptState(prior[name], address), note: c.detail }
  })
}

/**
 * The leads. A `moved` receipt is the world disagreeing with what we last recorded; a `fresh` one
 * is a boundary nobody had asked before. Both are reasons to cut a release; `unchanged` is not,
 * and `unreachable` is not a lead but an unanswered question.
 */
export const leadsOf = (rows: readonly OutwardRow[]): OutwardRow[] =>
  rows.filter((r) => r.state === 'moved' || r.state === 'fresh')

/**
 * The lead harvest is a child cross of this atom — the parent offers its face.
 *
 * This edge makes `outward` and `outward/leads` mutually reachable, which is lawful: neither runs
 * a ring-mate at load time ([[rules]]/cycle — entangled is not fatal), and the runner that does sits
 * behind an `import.meta.url` guard.
 */
export * from './leads'
