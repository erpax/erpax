/**
 * Vitest Setup - Strict Payload Compliance
 *
 * This file runs before all tests to configure the test environment
 * according to Payload CMS best practices.
 *
 * @see https://payloadcms.com/docs/test/overview
 */

import 'dotenv/config'
import { spawnSync } from 'node:child_process'

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
// NOTE: For local development, migrations often fail due to D1 locks or existing schema.
// Use PAYLOAD_TEST_SKIP_MIGRATE=1 after initial setup for faster test runs.
if (!process.env.PAYLOAD_TEST_SKIP_MIGRATE) {
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
      process.stderr.write(errText)
      if (process.env.CI === 'true') {
        process.exit(result.status ?? 1)
      }
      process.stderr.write(
        '\n[vitest] payload migrate failed. Continuing anyway - tests may work if schema is already up to date.\n',
      )
      // Don't exit - let tests try to run
    }
  }
}
