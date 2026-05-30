#!/usr/bin/env node
/**
 * run/dev browser driver — drives the RUNNING dev server (pnpm dev) with
 * Playwright's bundled Chromium and writes screenshots to disk.
 *
 * This is the GUI handle for the skill. It does NOT start the server — start
 * `pnpm dev` first (see SKILL.md), then point this at http://localhost:3000.
 *
 * Usage (run from the repo root so node resolves @playwright/test):
 *   node .claude/skills/run/dev/driver.mjs all      # home + admin login + dashboard
 *   node .claude/skills/run/dev/driver.mjs home      # public site (/en)
 *   node .claude/skills/run/dev/driver.mjs admin      # log in, screenshot dashboard
 *   node .claude/skills/run/dev/driver.mjs shot /en/posts [out.png]
 *
 * Env overrides:
 *   BASE_URL        default http://localhost:3000
 *   ADMIN_EMAIL     default dev@payloadcms.com   (the repo's seed/test user)
 *   ADMIN_PASSWORD  default test
 *   SHOT_DIR        default /tmp/erpax-run         (where screenshots land)
 *   HEADED=1        run headed instead of headless
 */
import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000'
const EMAIL = process.env.ADMIN_EMAIL ?? 'dev@payloadcms.com'
const PASSWORD = process.env.ADMIN_PASSWORD ?? 'test'
const SHOT_DIR = process.env.SHOT_DIR ?? '/tmp/erpax-run'
const HEADED = process.env.HEADED === '1'

mkdirSync(SHOT_DIR, { recursive: true })

const log = (...a) => console.log('[driver]', ...a)

/** Navigate, wait for network idle-ish, screenshot full page. */
async function shot(page, urlPath, name) {
  const url = urlPath.startsWith('http') ? urlPath : `${BASE_URL}${urlPath}`
  log(`GET ${url}`)
  const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90_000 })
  // Next dev compiles the route on first hit; give client render a beat.
  await page.waitForLoadState('networkidle', { timeout: 90_000 }).catch(() => {})
  const file = join(SHOT_DIR, name)
  await page.screenshot({ path: file, fullPage: true })
  log(`  -> ${resp?.status()} ${page.url()}  saved ${file}`)
  return { status: resp?.status(), url: page.url(), file }
}

/**
 * Log into the Payload admin. Mirrors tests/helpers/login.ts: /admin redirects
 * to /login (user exists) or /create-first-user (fresh DB); handle both.
 */
async function adminLogin(page) {
  await page.goto(`${BASE_URL}/admin`, { waitUntil: 'domcontentloaded', timeout: 90_000 })
  await page.waitForLoadState('networkidle', { timeout: 90_000 }).catch(() => {})
  const path = new URL(page.url()).pathname

  if (path.includes('/create-first-user')) {
    log('fresh DB -> create-first-user')
    await page.locator('input[name="email"]').fill(EMAIL)
    await page.locator('input[name="password"]').fill(PASSWORD)
    const confirm = page.locator('input[name="confirm-password"]')
    if (await confirm.isVisible().catch(() => false)) await confirm.fill(PASSWORD)
    await page.locator('button[type="submit"]').click()
    await page.waitForURL(`${BASE_URL}/admin`, { timeout: 30_000 }).catch(() => {})
    return
  }
  if (!path.includes('/login')) {
    log('already authenticated')
    return
  }
  log(`login as ${EMAIL}`)
  await page.locator('input[name="email"]').fill(EMAIL)
  await page.locator('input[name="password"]').fill(PASSWORD)
  await page.locator('button[type="submit"]').click()
  await page.waitForURL((u) => !u.pathname.includes('/login'), { timeout: 30_000 }).catch(() => {})
}

async function main() {
  const cmd = process.argv[2] ?? 'all'
  const browser = await chromium.launch({ headless: !HEADED })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  try {
    if (cmd === 'shot') {
      const urlPath = process.argv[3] ?? '/'
      const out = process.argv[4] ?? `shot-${urlPath.replace(/[^\w]+/g, '_')}.png`
      await shot(page, urlPath, out)
    } else if (cmd === 'home') {
      await shot(page, '/', 'home.png')
    } else if (cmd === 'admin') {
      await adminLogin(page)
      await shot(page, '/admin', 'admin-dashboard.png')
    } else if (cmd === 'all') {
      await shot(page, '/', 'home.png')
      await shot(page, '/admin', 'admin-login.png')
      await adminLogin(page)
      await shot(page, '/admin', 'admin-dashboard.png')
    } else {
      throw new Error(`unknown command: ${cmd}`)
    }
    log('done')
  } finally {
    await browser.close()
  }
}

main().catch((e) => {
  console.error('[driver] FAILED:', e?.message ?? e)
  process.exit(1)
})
