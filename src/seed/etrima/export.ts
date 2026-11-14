/**
 * Export the etrima database as erpax documents — `pnpm seed:etrima`.
 *
 *   pnpm seed:etrima                       measure only: every row mapped and checked, nothing written
 *   pnpm seed:etrima --write               also write seed/import/<collection>/<n>.json (gitignored; may contain PII)
 *   pnpm seed:etrima --limit 5000          the first N rows of each table
 *   pnpm seed:etrima --only lots,packs     a subset of collections
 *   ETRIMA_DATABASE_URL=postgres://…       another database (default: local etrima_production)
 *
 * Each file is one JSON array of at most 5,000 documents, the shape `@payloadcms/plugin-import-export`
 * imports. It reads etrima read-only and never touches an erpax database; loading the files is a
 * separate, deliberate step. It prints counts and row ids only.
 */
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import type { CollectionConfig } from 'payload'
import pg from 'pg'

import Employees from '@/collections/employees'
import LotVariants from '@/collections/lot-variants'
import LotWorkPhases from '@/collections/lot-work-phases'
import Lots from '@/collections/lots'
import { PackItems } from '@/collections/pack-items'
import { Packs } from '@/collections/packs'
import { Workorders } from '@/collections/work-orders'
import WorkPhases from '@/collections/work-phases'
import { WorkShifts } from '@/collections/work-shifts'
import { itemFields } from '@/components/ecommerce/catalogue'
import { conform, mappers, type Doc, type Row } from '@/seed/etrima'

/** The collections the documents are measured against. `products` is the plugin's, so only the fields erpax adds plus its title are known here. */
const configs: Record<string, Pick<CollectionConfig, 'fields'>> = {
  'work-phases': WorkPhases,
  products: { fields: [{ name: 'title', type: 'text', required: true }, ...itemFields()] },
  employees: Employees,
  lots: Lots,
  'lot-work-phases': LotWorkPhases,
  'lot-variants': LotVariants,
  'work-shifts': WorkShifts,
  'work-orders': Workorders,
  packs: Packs,
  'pack-items': PackItems,
}

const flag = (name: string): string | undefined => {
  const i = process.argv.indexOf(`--${name}`)
  return i > 0 ? (process.argv[i + 1] ?? '') : undefined
}
const WRITE = process.argv.includes('--write')
const LIMIT = flag('limit') ? Number(flag('limit')) : Infinity
const ONLY = flag('only')?.split(',').filter(Boolean)
const OUT = flag('out') ?? 'seed/import'
const PAGE = 5_000

const main = async (): Promise<void> => {
  const db = new pg.Client({ connectionString: process.env.ETRIMA_DATABASE_URL ?? 'postgres:///etrima_production' })
  try {
    await db.connect()
  } catch (error) {
    console.error(`seed:etrima: no etrima database (${(error as Error).message}). Restore the dump or set ETRIMA_DATABASE_URL.`)
    process.exit(2)
  }
  await db.query('set default_transaction_read_only = on')

  const report: Array<Record<string, unknown>> = []
  for (const mapper of mappers) {
    if (ONLY && !ONLY.includes(mapper.collection)) continue
    const config = configs[mapper.collection]
    if (!config) throw new Error(`seed:etrima: no collection config for ${mapper.collection}`)
    const dir = join(OUT, mapper.collection)
    if (WRITE) {
      rmSync(dir, { recursive: true, force: true })
      mkdirSync(dir, { recursive: true })
    }

    const problems = new Map<string, { rows: number; sample: string[] }>()
    let after = 0
    let rows = 0
    let conforming = 0
    let files = 0
    while (rows < LIMIT) {
      const size = Math.min(PAGE, LIMIT - rows)
      const page = await db.query<Row>(`${mapper.sql} and t.id > $1 order by t.id limit ${size}`, [after])
      if (page.rows.length === 0) break
      const docs: Doc[] = []
      for (const row of page.rows) {
        const doc = mapper.map(row)
        const found = conform(config, doc)
        if (found.length === 0) conforming++
        for (const problem of found) {
          const entry = problems.get(problem) ?? { rows: 0, sample: [] }
          entry.rows++
          if (entry.sample.length < 3) entry.sample.push(String(row.id))
          problems.set(problem, entry)
        }
        docs.push(doc)
      }
      if (WRITE) writeFileSync(join(dir, `${String(++files).padStart(5, '0')}.json`), JSON.stringify(docs))
      after = Number(page.rows[page.rows.length - 1]!.id)
      rows += page.rows.length
    }
    report.push({ collection: mapper.collection, rows, conforming, 'conforming %': rows ? `${((conforming / rows) * 100).toFixed(2)}%` : '—', files: WRITE ? files : '—' })
    for (const [problem, { rows: n, sample }] of [...problems].sort((a, b) => b[1].rows - a[1].rows)) {
      console.log(`  ${mapper.collection}: ${problem} — ${n.toLocaleString('en')} row(s), e.g. etrima id ${sample.join(', ')}`)
    }
  }
  await db.end()

  console.log(`\netrima → erpax${Number.isFinite(LIMIT) ? ` (first ${LIMIT} rows per table)` : ''}${WRITE ? ` — written to ${OUT}/` : ' — measured only (--write to emit files)'}`)
  console.table(report)
}

await main()
