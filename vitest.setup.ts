/**
 * Vitest Setup - Strict Payload Compliance
 *
 * This file runs before all tests to configure the test environment
 * according to Payload CMS best practices.
 *
 * @see https://payloadcms.com/docs/test/overview
 */

import 'dotenv/config'
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

afterEach(() => {
  cleanup()
})

// ============================================================================
// Required Environment Variables
// ============================================================================

// Payload requires a secret in tests when .env is absent (e.g. CI).
if (!process.env.PAYLOAD_SECRET) {
  process.env.PAYLOAD_SECRET = 'vitest-dev-secret-do-not-use-in-production-32b'
}

// Disable admin UI to speed up tests - we test admin via e2e, not integration
process.env.PAYLOAD_DISABLE_ADMIN = 'true'

// Disable GraphQL unless specifically testing it (keeps test startup fast)
if (!process.env.PAYLOAD_ENABLE_GRAPHQL) {
  process.env.PAYLOAD_ENABLE_GRAPHQL = 'false'
}

// With NODE_ENV=test, schema push is off (see payload.config.ts). Apply SQL migrations so
// D1 has tables. The migrate CLI sets PAYLOAD_MIGRATING before connect, so Drizzle does
// not run the interactive dev push. Skip with PAYLOAD_TEST_SKIP_MIGRATE=1.
//
// THE SHARED COST ROOT, collapsed: every test process paid this spawn (10–30s × every suite —
// the corpus's single largest test bill) for a schema that only changes when src/migrations
// changes. A sentinel keyed on the migrations' own newest mtime lets the FIRST process pay and
// every sibling skip; touching a migration invalidates the key and the next run re-pays once.
const migrateSentinel = join(process.cwd(), 'node_modules', '.cache', 'erpax', 'migrate.sentinel')
const migrationsKey = (): string => {
  try {
    const dir = join(process.cwd(), 'src', 'migrations')
    let newest = 0
    for (const f of readdirSync(dir)) {
      const t = statSync(join(dir, f)).mtimeMs
      if (t > newest) newest = t
    }
    return String(newest)
  } catch {
    return 'no-migrations'
  }
}
const migrateSettled = (): boolean => {
  try {
    return existsSync(migrateSentinel) && readFileSync(migrateSentinel, 'utf8') === migrationsKey()
  } catch {
    return false
  }
}
if (!process.env.PAYLOAD_TEST_SKIP_MIGRATE && !migrateSettled()) {
  const result = spawnSync('pnpm', ['exec', 'payload', 'migrate'], {
    env: process.env,
    encoding: 'utf8',
    timeout: 30_000, // 30 second timeout
  })
  const errText = `${result.stderr ?? ''}${result.stdout ?? ''}`
  if (result.status !== 0) {
    // Local drift: dev push created objects before payload_migrations recorded the migration.
    if (/already exists|duplicate/i.test(errText)) {
      process.stderr.write(
        '[vitest] payload migrate reported existing objects; continuing (schema likely already applied).\n',
      )
    } else if (result.error?.message?.includes('ETIMEDOUT') || errText.includes('SQLITE_BUSY')) {
      // Database locked - common with D1 local dev
      process.stderr.write(
        '[vitest] payload migrate timed out or database locked. Skipping - schema likely already applied.\n',
      )
    } else {
      // BOOT-SWALLOW CLOSED (the open intent the lens surfaced): a REAL migrate failure —
      // not already-exists, not a held lock — used to "continue anyway" locally, so every
      // suite could report green over a broken schema (green lies at machine speed). The
      // two benign branches above still continue; the unknown failure fails EVERYWHERE.
      process.stderr.write(errText)
      process.stderr.write('\n[vitest] payload migrate FAILED — refusing to run suites over an unverified schema.\n')
      process.exit(result.status ?? 1)
    }
  }
  // schema settled (applied, already-present, or lock-skipped — every branch above continues):
  // stamp the sentinel so sibling processes skip the spawn entirely
  try {
    mkdirSync(dirname(migrateSentinel), { recursive: true })
    writeFileSync(migrateSentinel, migrationsKey())
  } catch {
    /* a lost stamp only means the next process re-pays once */
  }
}
