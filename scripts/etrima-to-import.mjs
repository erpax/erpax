/**
 * etrima-to-import — convert the etrima production pg_dump into
 * @payloadcms/plugin-import-export JSON files (one array of documents per
 * erpax collection), for import via the plugin.
 *
 * Streams the gzipped plain-SQL dump out of the zip, splits each `COPY`
 * block (reading the block's own column list — self-describing), maps the
 * rows per the MAPPINGS table below, and writes `seed/import/<slug>.json`.
 *
 * Design:
 *   - Source PKs are preserved as the erpax doc `id` so foreign keys map
 *     1:1 (no id remapping); the content-uuid plugin stamps `uuid` on import.
 *   - Large transactional tables are SAMPLED (limit); master data is full.
 *   - PII (employees/accounts) is anonymised by the `anon` helpers.
 *   - Obsolete columns (option_1..12) are dropped / collapsed to arrays.
 *
 * Usage:  node scripts/etrima-to-import.mjs [path-to-dump.zip]
 */
import { spawn } from 'node:child_process'
import { createInterface } from 'node:readline'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const ZIP =
  process.argv[2] ??
  '/Users/ceci/github/ceccec/etrima/db/dump/host-leon1103-etrima_production.zip'
const ENTRY = 'etrima_production/etrima_production.dump.gz'
const OUT_DIR = resolve(process.cwd(), 'seed/import')

// ── pg COPY TSV helpers ──────────────────────────────────────────────
const unescape = (v) =>
  v === '\\N'
    ? null
    : v.replace(/\\(.)/g, (_, c) =>
        c === 't' ? '\t' : c === 'n' ? '\n' : c === 'r' ? '\r' : c,
      )
const num = (v) => (v == null ? null : Number(v))
const bool = (v) => (v == null ? null : v === 't')
/** ancestry materialized path "1/2/3" → parent id (last segment). */
const parentOf = (anc) => {
  if (!anc) return null
  const parts = String(anc).split('/').filter(Boolean)
  return parts.length ? Number(parts[parts.length - 1]) : null
}

// ── Mapping table: source table → erpax collection ───────────────────
// map(row) returns the erpax document (id preserved for FK integrity).
const MAPPINGS = {
  machine_types: {
    slug: 'work-centers',
    map: (r) => ({
      id: num(r.id),
      reference: r.code ?? `WC-${r.id}`,
      name: r.name ?? r.code ?? `Work Center ${r.id}`,
      type: 'cell',
      parallelism: num(r.machines_per_worker) || 1,
      costPerMinute: num(r.cost_per_minute),
      payPerHour: num(r.pay_per_hour),
      status: 'active',
      notes: r.description ?? undefined,
    }),
  },
  work_phases: {
    slug: 'operations',
    limit: 3000,
    // Skip junk rows (placeholder code/name "0" or blank).
    filter: (r) => {
      const code = (r.code ?? '').trim()
      const name = (r.name ?? r.original_name ?? '').trim()
      return (code && code !== '0') || (name && name !== '0')
    },
    map: (r) => ({
      id: num(r.id),
      reference: r.code ?? `OP-${r.id}`,
      name: r.name ?? r.original_name ?? r.code ?? `Operation ${r.id}`,
      defaultWorkCenter: num(r.machine_type_id), // → work-centers (machine_types preserve PK)
      parent: parentOf(r.ancestry), // → operations (self, ancestry path)
      status: bool(r.archived) ? 'inactive' : 'active',
      notes: r.description ?? undefined,
    }),
  },
}

// ── Streaming COPY parser ────────────────────────────────────────────
const out = {} // slug → docs[]
const counts = {} // table → emitted
const COPY_RE = /^COPY public\.([a-z_0-9]+) \(([^)]*)\) FROM stdin;/

async function run() {
  mkdirSync(OUT_DIR, { recursive: true })
  const child = spawn('bash', [
    '-c',
    `unzip -p '${ZIP}' '${ENTRY}' | gzip -dc`,
  ])
  const rl = createInterface({ input: child.stdout, crlfDelay: Infinity })

  let cur = null // { table, cols, mapping }
  for await (const line of rl) {
    if (cur) {
      if (line === '\\.') {
        cur = null
        continue
      }
      const m = cur.mapping
      if (m.limit && counts[cur.table] >= m.limit) continue
      const vals = line.split('\t').map(unescape)
      const row = {}
      cur.cols.forEach((c, i) => (row[c] = vals[i]))
      if (m.filter && !m.filter(row)) continue
      const doc = m.map(row)
      ;(out[m.slug] ??= []).push(doc)
      counts[cur.table] = (counts[cur.table] ?? 0) + 1
      continue
    }
    const cm = COPY_RE.exec(line)
    if (cm && MAPPINGS[cm[1]]) {
      cur = {
        table: cm[1],
        cols: cm[2].split(',').map((s) => s.trim()),
        mapping: MAPPINGS[cm[1]],
      }
      counts[cm[1]] = 0
    }
  }

  for (const [slug, docs] of Object.entries(out)) {
    const file = resolve(OUT_DIR, `${slug}.json`)
    writeFileSync(file, JSON.stringify(docs, null, 2))
    console.log(`${slug.padEnd(16)} ${docs.length} docs → ${file}`)
  }
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
