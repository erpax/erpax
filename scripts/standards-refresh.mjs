#!/usr/bin/env node
/**
 * standards-refresh — the editions of the standards erpax cites, read from ISO Open Data.
 *
 * Editions and their status are DATA: this reads ISO's own daily dataset (`iso_deliverables_metadata`,
 * ODC-By) and writes `src/seed/content/fixtures/standards.json`. Nothing about an edition is typed
 * into code; the only choice made here is WHICH standards to watch (`WATCH`), by their reference.
 *
 *   node scripts/standards-refresh.mjs           rewrite the fixture from the feed
 *   node scripts/standards-refresh.mjs --check   exit 1 and list the differences when the fixture is stale
 *
 * A row is one edition: `ISO/IEC 27017:2026`. It is `current` when ISO's stage is published (60.60),
 * to be revised (90.92) or confirmed (90.93), and `superseded` when withdrawn (95.99). Amendments,
 * corrigenda and drafts are not rows. The feed is streamed, never saved.
 *
 * This work is based on the iso_deliverables_metadata dataset from ISO Open Data, licensed under the
 * ODC Attribution License (ODC-By) v1.0 — https://www.iso.org/open-data.html#iso_deliverables_metadata
 *
 * @see src/seed/standards/index.ts (what reads the fixture)
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { createInterface } from 'node:readline'
import { Readable } from 'node:stream'

const FEED = 'https://isopublicstorageprod.blob.core.windows.net/opendata/_latest/iso_deliverables_metadata/json/iso_deliverables_metadata.jsonl'
const FIXTURE = new URL('../src/seed/content/fixtures/standards.json', import.meta.url)

/** The standards watched, by feed reference prefix, with the `compliance-frameworks` category each belongs to. */
const WATCH = {
  'ISO/IEC 27001': 'info-security',
  'ISO/IEC 27002': 'info-security',
  'ISO/IEC 27017': 'info-security',
  'ISO/IEC 27036-4': 'info-security',
  'ISO/IEC 29146': 'info-security',
  'ISO/IEC 29115': 'info-security',
  'ISO/IEC 24760-1': 'info-security',
  'ISO/IEC 24760-2': 'info-security',
  'ISO/IEC 24760-3': 'info-security',
  'ISO/IEC 10181-3': 'info-security',
  'ISO/IEC 27018': 'data-protection',
  'ISO/IEC 27701': 'data-protection',
  'ISO/IEC 29100': 'data-protection',
  'ISO/IEC 29134': 'data-protection',
  'ISO 15489-1': 'other',
  'ISO 23081-1': 'other',
  'ISO/IEC 22123-1': 'other',
  'ISO/IEC 22123-2': 'other',
  'ISO/IEC 22123-3': 'other',
  'ISO/IEC 17789': 'other',
}
/** ISO harmonized stage codes that mean the edition is still in force. */
const IN_FORCE = new Set([6060, 9060, 9092, 9093])

const text = (value) => (typeof value === 'string' ? value : value && typeof value === 'object' ? (value.en ?? Object.values(value)[0] ?? '') : '')

const exact = new Map(Object.keys(WATCH).map((base) => [base, new RegExp(`^${base.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}:(\\d{4})$`)]))

const read = async () => {
  const response = await fetch(FEED)
  if (!response.ok) throw new Error(`ISO Open Data: HTTP ${response.status}`)
  const rows = []
  for await (const line of createInterface({ input: Readable.fromWeb(response.body) })) {
    if (!line.includes('"reference"')) continue
    let record
    try {
      record = JSON.parse(line)
    } catch {
      continue
    }
    for (const [base, pattern] of exact) {
      if (typeof record.reference === 'string' && pattern.test(record.reference)) {
        rows.push({
          reference: record.reference,
          title: text(record.title),
          category: WATCH[base],
          edition: record.edition ?? null,
          publicationDate: record.publicationDate ?? null,
          status: IN_FORCE.has(record.currentStage) ? 'current' : 'superseded',
        })
      }
    }
  }
  return rows.sort((a, b) => a.reference.localeCompare(b.reference, 'en', { numeric: true }))
}

const rows = await read()
const next = `${JSON.stringify(rows, null, 2)}\n`
const check = process.argv.includes('--check')
let stored = ''
try {
  stored = readFileSync(FIXTURE, 'utf8')
} catch {
  /* no fixture yet */
}

if (check) {
  if (stored === next) {
    console.log(`OK — ${rows.length} editions match ISO Open Data.`)
  } else {
    const have = new Map((stored ? JSON.parse(stored) : []).map((row) => [row.reference, JSON.stringify(row)]))
    const want = new Map(rows.map((row) => [row.reference, JSON.stringify(row)]))
    for (const [reference, row] of want) if (have.get(reference) !== row) console.log(`${have.has(reference) ? 'changed' : 'new    '} ${reference}`)
    for (const reference of have.keys()) if (!want.has(reference)) console.log(`gone    ${reference}`)
    console.error('standards.json is stale: run `node scripts/standards-refresh.mjs`.')
    process.exit(1)
  }
} else {
  writeFileSync(FIXTURE, next)
  console.log(`wrote ${rows.length} editions (${rows.filter((row) => row.status === 'current').length} current) to src/seed/content/fixtures/standards.json`)
}
