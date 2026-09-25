import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { contractRows, leadsOf, nextBook, type OutwardRow, type ReceiptBook } from '@/outward'
import { coverage, nextAsk } from '@/quantum/chat/coverage'
import { messageUuid } from '@/quantum/chat/merkle'
import { checkEu, readBook, writeBook } from '@/outward/eu'
import { bgContractOnline } from '@/outward/bg'
import { worldContractOnline } from '@/outward/world'

/**
 * outward/leads — every API is a lead source. See ./SKILL.md.
 */

/** The agenda's filename. Internal: the workflow reads the FILE, not this name. */
const LEADS_REL = 'outward-leads.json'

export interface LeadHarvest {
  readonly rows: readonly OutwardRow[]
  readonly leads: readonly OutwardRow[]
  readonly unreachable: readonly OutwardRow[]
  readonly book: ReceiptBook
}

/** Injected so the harvest is testable with the network down. */
export interface LeadSources {
  readonly eu?: () => Promise<{ rows: readonly OutwardRow[] }>
  readonly bg?: () => Promise<readonly { rail: string; holds: boolean; detail: string }[]>
  readonly world?: () => Promise<readonly { rail: string; holds: boolean; detail: string }[]>
}

/**
 * Ask the whole boundary once and report what changed.
 *
 * `eu` is receipt-native; `bg` and `world` emit contract verdicts and are routed through the same
 * receipt machinery by `contractRows`, so one shape covers the boundary instead of two.
 */
export async function harvestLeads(cwd: string = process.cwd(), src: LeadSources = {}): Promise<LeadHarvest> {
  const prior = readBook(cwd)
  const rows: OutwardRow[] = []
  const eu = src.eu ?? (() => checkEu({ cwd }))
  const bg = src.bg ?? bgContractOnline
  const world = src.world ?? worldContractOnline

  try {
    rows.push(...(await eu()).rows)
  } catch (e) {
    rows.push({ name: 'eu', host: 'eu', address: prior.eu ?? '', state: 'unreachable', note: String(e) })
  }
  for (const [source, run] of [['bg', bg], ['world', world]] as const) {
    try {
      rows.push(...contractRows(source, await run(), prior))
    } catch (e) {
      rows.push({ name: source, host: source, address: prior[source] ?? '', state: 'unreachable', note: String(e) })
    }
  }
  return {
    rows,
    leads: leadsOf(rows),
    unreachable: rows.filter((r) => r.state === 'unreachable'),
    book: nextBook(prior, rows),
  }
}

/** Leads already ANSWERED, by coverage key. Seen ≠ acted on: the book records seen. */
export function readAnswered(cwd: string = process.cwd()): string[] {
  try {
    const doc = JSON.parse(readFileSync(join(cwd, LEADS_REL), 'utf8')) as { answered?: string[] }
    return Array.isArray(doc.answered) ? doc.answered : []
  } catch {
    return []
  }
}

/** Persist the harvest: the book is the memory, the leads file is the agenda AND its coverage. */
export function writeHarvest(h: LeadHarvest, cwd: string = process.cwd(), answered: readonly string[] = readAnswered(cwd)): void {
  writeBook(h.book, cwd)
  writeFileSync(
    join(cwd, LEADS_REL),
    JSON.stringify(
      {
        law: 'A MOVED receipt is the world disagreeing with what was last recorded; a FRESH one is a boundary nobody had asked. Both are reasons to cut a release. UNCHANGED is not a lead, and UNREACHABLE is an unanswered question, never evidence of change.',
        asked: h.rows.length,
        leads: h.leads.length,
        unreachable: h.unreachable.length,
        rows: h.leads.map((r) => ({ name: r.name, state: r.state, note: r.note })),
        coverage: leadCoverage(h, answered),
        answered: [...answered],
      },
      null,
      2,
    ) + '\n',
  )
}


/**
 * A lead as a candidate question — the text whose uuid IS its coverage key.
 *
 * `moved` carries the note because the note is what changed; `fresh` does not, so a boundary first
 * seen and later moved are two distinct candidates rather than one.
 */
export const leadCandidate = (r: OutwardRow): string =>
  r.state === 'moved' ? `${r.name}: moved — ${r.note ?? ''}` : `${r.name}: ${r.state}`

/** Every lead this harvest produced, as candidates. */
export const leadCandidates = (h: LeadHarvest): string[] => h.leads.map(leadCandidate)

export interface LeadCoverage {
  /** Leads covered / leads produced, in [0,1]. */
  readonly covered: number
  /** The next lead nothing has answered yet, or undefined when the boundary is fully covered. */
  readonly next: string | undefined
  readonly outstanding: number
}

/**
 * Fuse the boundary to the ASK: the leads ARE the candidate space. See ./SKILL.md § fused to next.
 *
 * `nextAsk` was generic over candidates and `harvestLeads` produced leads, and nothing composed
 * them — so "what is next" could not see the world changing. This is that composition and no new
 * logic: `coverage` and `nextAsk` are [[quantum]]/chat's, unchanged.
 */
export function leadCoverage(h: LeadHarvest, answered: readonly string[]): LeadCoverage {
  const candidates = leadCandidates(h)
  return {
    covered: coverage(answered, candidates),
    next: nextAsk(answered, candidates),
    outstanding: candidates.filter((c) => !answered.includes(messageUuid(c))).length,
  }
}

/** The uuid a covered lead is recorded under — the same address `nextAsk` compares. */
export const leadCoverageKey = (candidate: string): string => messageUuid(candidate)

// The runner LAST: it uses top-level await, which suspends module evaluation — anything declared
// below it would still be in its temporal dead zone when this block runs ([[rules]]/cycle, inside one
// file). It read `leadCandidates` before initialisation until this moved.
if (import.meta.url === `file://${process.argv[1]}`) {
  const h = await harvestLeads()
  for (const r of h.rows) {
    const mark = r.state === 'moved' ? '⇄' : r.state === 'fresh' ? '+' : r.state === 'unreachable' ? '?' : '=';
    console.log(`${mark} ${r.state.padEnd(11)} ${r.name.padEnd(28)} ${r.note?.slice(0, 70) ?? ''}`)
  }
  if (process.argv.includes('--write')) writeHarvest(h)
  const cov = leadCoverage(h, readAnswered())
  console.log(
    `\noutward/leads — asked ${h.rows.length} · leads ${h.leads.length} · unreachable ${h.unreachable.length}` +
      ` · covered ${(cov.covered * 100).toFixed(0)}% · outstanding ${cov.outstanding}` +
      (process.argv.includes('--write') ? ` · wrote ${LEADS_REL}` : ' (dry run; --write to persist)'),
  )
  if (cov.next) console.log(`next → ${cov.next}`)
  // A lead is a RELEASE REASON, not a failure. Only a boundary that could not be asked at all is.
  process.exit(h.rows.length > 0 && h.unreachable.length === h.rows.length ? 1 : 0)
}
