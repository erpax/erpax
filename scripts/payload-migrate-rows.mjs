// The `payload_migrations` rows, as a stable line-per-row digest input.
//
// Hashing the D1 state FILES does not work: opening the database writes WAL/SHM sidecars, so the
// hash changes on every read and the memo can only ever miss — the same "cache that only misses"
// the lazy scan in standards-citation-index.sh turned out to be. The ROWS are what migrate:status
// compares against, and reading them read-only leaves the database byte-identical.
//
// Prints nothing and exits 1 when no local D1 holds the table — no rows, no key, no memo.
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'

const dir = '.wrangler/state/v3/d1/miniflare-D1DatabaseObject'
let files = []
try {
  files = readdirSync(dir).filter((f) => f.endsWith('.sqlite') && f !== 'metadata.sqlite').sort()
} catch {
  process.exit(1)
}

const out = []
for (const f of files) {
  let db
  try {
    db = new DatabaseSync(join(dir, f), { readOnly: true })
    for (const r of db.prepare('select name, batch from payload_migrations order by name, batch').all()) {
      out.push(`${f}\t${r.name}\t${r.batch}`)
    }
  } catch {
    // a database without the table is not this database
  } finally {
    try { db?.close() } catch { /* already closed */ }
  }
}

if (out.length === 0) process.exit(1)
process.stdout.write(out.join('\n') + '\n')
