import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { contractRows, leadsOf, nextBook, type OutwardRow, type ReceiptBook } from '@/outward'
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

/** Persist the harvest: the book is the memory, the leads file is the release agenda. */
export function writeHarvest(h: LeadHarvest, cwd: string = process.cwd()): void {
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
      },
      null,
      2,
    ) + '\n',
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const h = await harvestLeads()
  for (const r of h.rows) {
    const mark = r.state === 'moved' ? '⇄' : r.state === 'fresh' ? '+' : r.state === 'unreachable' ? '?' : '=';
    console.log(`${mark} ${r.state.padEnd(11)} ${r.name.padEnd(28)} ${r.note?.slice(0, 70) ?? ''}`)
  }
  if (process.argv.includes('--write')) writeHarvest(h)
  console.log(
    `\noutward/leads — asked ${h.rows.length} · leads ${h.leads.length} · unreachable ${h.unreachable.length}` +
      (process.argv.includes('--write') ? ` · wrote ${LEADS_REL}` : ' (dry run; --write to persist)'),
  )
  // A lead is a RELEASE REASON, not a failure. Only a boundary that could not be asked at all is.
  process.exit(h.rows.length > 0 && h.unreachable.length === h.rows.length ? 1 : 0)
}
