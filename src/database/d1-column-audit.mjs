#!/usr/bin/env node
// d1-column-audit — D1 caps tables at 100 columns. Polymorphic `relationTo:[...all]`
// ("anything is taggable/accountable") materializes as a `<x>_rels` table with one
// FK column per target collection — which blows the cap and makes the schema
// un-creatable on D1 (migration fails: "too many columns on <table>").
//
// This audits the generated migration(s) for over-cap tables and prints the
// punch-list. Reusable guard: exit 1 if any table exceeds the limit.
//
// Usage:  node scripts/d1-column-audit.mjs [--limit=100] [--json]

import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const LIMIT = Number((process.argv.find((a) => a.startsWith('--limit=')) || '').split('=')[1] || 100)
const json = process.argv.includes('--json')
const MIG_DIR = 'src/migrations'

// Find the migration .ts files (skip snapshots/json).
const files = readdirSync(MIG_DIR)
  .filter((f) => f.endsWith('.ts') && /^\d/.test(f))
  .map((f) => join(MIG_DIR, f))

/** Parse `CREATE TABLE \`name\` ( ... );` blocks; count column-definition lines. */
function tablesIn(text) {
  const lines = text.split('\n')
  const out = []
  let cur = null
  for (const raw of lines) {
    const line = raw.trim()
    const m = line.match(/CREATE TABLE\s+\\?`([a-z0-9_]+)\\?`/i)
    if (m) { cur = { name: m[1], cols: 0 }; out.push(cur); continue }
    if (!cur) continue
    // a column-definition line starts with the (escaped) backtick of the column name.
    if (/^\\?`[a-z0-9_]+\\?`\s+(text|integer|numeric|real|blob)/i.test(line)) cur.cols++
    // end of this CREATE TABLE statement.
    if (line.includes(');')) cur = null
  }
  return out
}

const all = new Map() // name -> cols (max across migrations)
for (const f of files) {
  for (const t of tablesIn(readFileSync(f, 'utf8'))) {
    all.set(t.name, Math.max(all.get(t.name) ?? 0, t.cols))
  }
}

const rows = [...all.entries()].map(([name, cols]) => ({ name, cols })).sort((a, b) => b.cols - a.cols)
const over = rows.filter((r) => r.cols > LIMIT)

if (json) {
  console.log(JSON.stringify({ limit: LIMIT, tables: rows.length, over: over.map((o) => o), }, null, 2))
} else {
  const L = []
  L.push(`d1-column-audit — ${rows.length} tables, D1 limit = ${LIMIT} cols/table`)
  L.push(`OVER LIMIT: ${over.length}`)
  if (over.length) {
    L.push('')
    L.push('table                                   cols  over-by   kind')
    for (const r of over) {
      const kind = r.name.endsWith('_rels') ? 'polymorphic _rels (relationTo:[...all])' : 'wide table'
      L.push(`  ${r.name.padEnd(38)} ${String(r.cols).padStart(4)}  ${String(r.cols - LIMIT).padStart(6)}   ${kind}`)
    }
  }
  L.push('')
  L.push('top 8 widest tables:')
  for (const r of rows.slice(0, 8)) L.push(`  ${r.name.padEnd(38)} ${String(r.cols).padStart(4)}`)
  if (over.length === 0) L.push('\nall tables within D1 limit. ✓')
  else L.push(`\nFIX: collapse polymorphic relationTo:[...all] → one content-uuid text column (see identity/tags/all skills).`)
  console.log(L.join('\n'))
}

process.exit(over.length === 0 ? 0 : 1)
