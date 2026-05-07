#!/usr/bin/env node
/**
 * Interactive setup: PAYLOAD_SECRET, Cloudflare wrangler bindings (D1, R2, worker),
 * and common optional env vars. Writes `.env.local` and patches `wrangler.jsonc`.
 *
 * Usage:
 *   node scripts/setup-env.mjs              # always interactive
 *   node scripts/setup-env.mjs --if-needed  # first-time / prepare hook (see below)
 */

import fs from 'fs'
import path from 'path'
import readline from 'readline/promises'
import { randomBytes } from 'crypto'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const WRANGLER_PATH = path.join(root, 'wrangler.jsonc')
const ENV_LOCAL = path.join(root, '.env.local')

function readWrangler() {
  if (!fs.existsSync(WRANGLER_PATH)) return ''
  return fs.readFileSync(WRANGLER_PATH, 'utf8')
}

function pick(regex, text, group = 1) {
  const m = text.match(regex)
  return m?.[group] ?? ''
}

function extractFromWrangler(w) {
  return {
    accountId: pick(/"account_id"\s*:\s*"([^"]*)"/, w),
    workerName: pick(/"name"\s*:\s*"([^"]*)"/, w),
    d1Id: pick(/"binding"\s*:\s*"D1"[\s\S]*?"database_id"\s*:\s*"([^"]*)"/, w) || pick(/"database_id"\s*:\s*"([^"]*)"/, w),
    d1Name: pick(/"database_name"\s*:\s*"([^"]*)"/, w),
    r2Bucket: pick(/"bucket_name"\s*:\s*"([^"]*)"/, w),
  }
}

function patchWrangler(content, { accountId, workerName, d1Id, d1Name, r2Bucket }) {
  let c = content
  c = c.replace(/"account_id"\s*:\s*"[^"]*"/, `"account_id": "${accountId}"`)
  c = c.replace(/"name"\s*:\s*"[^"]*"/, `"name": "${workerName}"`)
  c = c.replace(
    /("binding"\s*:\s*"D1"[\s\S]*?"database_id"\s*:\s*)"[^"]*"/,
    `$1"${d1Id}"`,
  )
  c = c.replace(/"database_name"\s*:\s*"[^"]*"/, `"database_name": "${d1Name}"`)
  c = c.replace(/"bucket_name"\s*:\s*"[^"]*"/, `"bucket_name": "${r2Bucket}"`)
  c = c.replace(/"preview_bucket_name"\s*:\s*"[^"]*"/, `"preview_bucket_name": "${r2Bucket}"`)
  c = c.replace(/("binding"\s*:\s*"WORKER_SELF_REFERENCE"[\s\S]*?"service"\s*:\s*)"[^"]*"/, `$1"${workerName}"`)
  return c
}

function hasPayloadSecretInEnvLocal() {
  if (!fs.existsSync(ENV_LOCAL)) return false
  const text = fs.readFileSync(ENV_LOCAL, 'utf8')
  const m = text.match(/^PAYLOAD_SECRET=(.+)$/m)
  return Boolean(m?.[1]?.trim())
}

function shouldSkipIfNeeded() {
  if (process.env.SKIP_SETUP === '1' || process.env.SKIP_SETUP === 'true') return true
  if (process.env.CI === 'true' || process.env.CI === '1') return true
  if (!process.stdin.isTTY) return true
  if (hasPayloadSecretInEnvLocal()) return true
  return false
}

async function question(rl, label, defaultValue = '') {
  const hint = defaultValue !== undefined && defaultValue !== '' ? ` [${defaultValue}]` : ''
  const answer = await rl.question(`${label}${hint}: `)
  const t = answer.trim()
  return t || defaultValue
}

async function main() {
  const ifNeeded = process.argv.includes('--if-needed')
  if (ifNeeded && shouldSkipIfNeeded()) {
    process.exit(0)
  }

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const wranglerText = readWrangler()
  const cur = extractFromWrangler(wranglerText)

  try {
    console.log('\nerpax — configure secrets and Cloudflare bindings.\n')
    console.log('Press Enter to keep [defaults] shown in brackets.\n')

    const suggestedSecret = randomBytes(32).toString('hex')

    const PAYLOAD_SECRET = await question(
      rl,
      'PAYLOAD_SECRET (openssl rand -hex 32)',
      suggestedSecret,
    )

    console.log('\n--- Wrangler / Cloudflare bindings (written to wrangler.jsonc) ---\n')

    const account_id = await question(rl, 'Cloudflare account_id', cur.accountId || '')
    const workerName = await question(rl, 'Worker name (must match deployed Worker)', cur.workerName || 'erpax')
    const d1_id = await question(rl, 'D1 database_id (UUID from dashboard or wrangler)', cur.d1Id || '')
    const d1_name = await question(rl, 'D1 database_name', cur.d1Name || 'erpax')
    const r2_bucket = await question(rl, 'R2 bucket_name (and preview_bucket_name)', cur.r2Bucket || 'erpax')

    console.log(
      '\n--- Optional app environment (.env.local) — Resend/Stripe env vars are dev fallbacks; production uses Tenants ---\n',
    )

    const CLOUDFLARE_ENV = await question(
      rl,
      'CLOUDFLARE_ENV (wrangler --env; empty if default)',
      '',
    )
    const RESEND_API_KEY = await question(rl, 'RESEND_API_KEY (optional dev fallback)', '')
    const STRIPE_SECRET_KEY = await question(rl, 'STRIPE_SECRET_KEY (optional dev fallback)', '')
    const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = await question(
      rl,
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (optional dev fallback)',
      '',
    )

    if (!account_id || !d1_id) {
      console.error('\nError: account_id and D1 database_id are required for a valid wrangler config.\n')
      process.exit(1)
    }

    if (wranglerText) {
      const next = patchWrangler(wranglerText, {
        accountId: account_id,
        workerName,
        d1Id: d1_id,
        d1Name: d1_name,
        r2Bucket: r2_bucket,
      })
      fs.writeFileSync(WRANGLER_PATH, next, 'utf8')
      console.log(`\nUpdated ${path.relative(root, WRANGLER_PATH)}`)
    } else {
      console.warn('\nWarning: wrangler.jsonc not found; skipped wrangler update.\n')
    }

    const lines = [
      '# Generated by `pnpm run setup` — do not commit',
      `PAYLOAD_SECRET=${PAYLOAD_SECRET}`,
    ]
    if (CLOUDFLARE_ENV) lines.push(`CLOUDFLARE_ENV=${CLOUDFLARE_ENV}`)
    if (NEXT_PUBLIC_SERVER_URL) lines.push(`NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}`)
    if (NEXT_PUBLIC_SITE_TENANT_SLUG) lines.push(`NEXT_PUBLIC_SITE_TENANT_SLUG=${NEXT_PUBLIC_SITE_TENANT_SLUG}`)
    if (RESEND_API_KEY) lines.push(`RESEND_API_KEY=${RESEND_API_KEY}`)
    if (STRIPE_SECRET_KEY) lines.push(`STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}`)
    if (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      lines.push(`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`)
    }

    fs.writeFileSync(ENV_LOCAL, `${lines.join('\n')}\n`, 'utf8')
    console.log(`Wrote ${path.relative(root, ENV_LOCAL)}`)

    console.log(
      '\nBindings in wrangler.jsonc: D1, R2, ASSETS, IMAGES, WORKER_SELF_REFERENCE (service name updated).',
    )
    console.log('Next: pnpm wrangler login && pnpm dev\n')
  } finally {
    rl.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
