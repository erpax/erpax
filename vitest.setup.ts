// Any setup scripts you might need go here

// Load .env files
import 'dotenv/config'

import { spawnSync } from 'node:child_process'

// Payload requires a secret in tests when .env is absent (e.g. CI).
if (!process.env.PAYLOAD_SECRET) {
  process.env.PAYLOAD_SECRET = 'vitest-dev-secret-do-not-use-in-production-32b'
}

// With NODE_ENV=test, schema push is off (see payload.config.ts). Apply SQL migrations so
// D1 has tables. The migrate CLI sets PAYLOAD_MIGRATING before connect, so Drizzle does
// not run the interactive dev push. Skip with PAYLOAD_TEST_SKIP_MIGRATE=1.
if (!process.env.PAYLOAD_TEST_SKIP_MIGRATE) {
  const result = spawnSync('pnpm', ['exec', 'payload', 'migrate'], {
    env: process.env,
    encoding: 'utf8',
  })
  const errText = `${result.stderr ?? ''}${result.stdout ?? ''}`
  if (result.status !== 0) {
    // Local drift: dev push created objects before payload_migrations recorded the migration.
    if (/already exists|duplicate/i.test(errText)) {
      process.stderr.write(
        '[vitest] payload migrate reported existing objects; continuing (schema likely already applied).\n',
      )
    } else {
      process.stderr.write(errText)
      if (process.env.CI === 'true') {
        process.exit(result.status ?? 1)
      }
      process.stderr.write(
        '\n[vitest] payload migrate failed. Fix with `pnpm exec payload migrate` or `PAYLOAD_TEST_SKIP_MIGRATE=1` if the DB is already up to date.\n',
      )
      process.exit(result.status ?? 1)
    }
  }
}
