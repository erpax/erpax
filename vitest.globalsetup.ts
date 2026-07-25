/**
 * vitest globalSetup — greenfield schema pre-push (runs ONCE, before any test file, outside the
 * per-test timeout). No backward compatibility: with PAYLOAD_DEV_PUSH=true the schema is pushed from
 * the live config against a fresh D1, so no test pays the 60s+ push cost lazily (which timed out the
 * first DB-writing test). A no-op unless greenfield push is on; migrations are regenerated only at deploy.
 */
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'

const SENTINEL = join(process.cwd(), 'node_modules/.cache/erpax/schema.pushed')

export async function setup(): Promise<void> {
  if (process.env.PAYLOAD_DEV_PUSH !== 'true') return
  if (!process.env.PAYLOAD_SECRET) process.env.PAYLOAD_SECRET = 'test-greenfield-ephemeral-secret-not-for-prod'
  // fresh run ⇒ no sentinel: the config sees push:true for THIS boot only.
  if (existsSync(SENTINEL)) rmSync(SENTINEL)
  const { getPayload } = await import('payload')
  const config = (await import('./src/payload.config')).default
  // Booting with push:true (see payload.config.ts) creates every table on connect — the one-time cost.
  const payload = await getPayload({ config })
  // drop the sentinel so every worker fork boots with push OFF, reusing this warm schema (no 58s diff).
  mkdirSync(dirname(SENTINEL), { recursive: true })
  writeFileSync(SENTINEL, new Date().toISOString())
  // eslint-disable-next-line no-console
  console.log(`[globalSetup] greenfield schema pushed once from config — ${payload.config.collections.length} collections; workers reuse it`)
}
