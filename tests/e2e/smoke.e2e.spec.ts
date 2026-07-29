/**
 * UI smoke — homepage + admin shell + health. Used post-Cloudflare-deploy with
 * PLAYWRIGHT_BASE_URL + SKIP_E2E_WEBSERVER=1, and locally via webServer.
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @standard W3C WebDriver-BiDi browser-automation
 */
import { test, expect } from '@playwright/test'

test.describe('UI smoke', () => {
  test.describe.configure({ timeout: 60_000 })

  test('homepage responds with visible UI', async ({ page }) => {
    // Locale middleware 307s `/` → `/en` (or NEXT_LOCALE cookie); follow redirects.
    const res = await page.goto('/', { waitUntil: 'domcontentloaded' })
    expect(res, 'homepage must return a response').toBeTruthy()
    expect(res!.status(), `homepage status ${res!.status()} at ${page.url()}`).toBeLessThan(500)
    await expect(page.locator('body')).toBeVisible()
    const text = (await page.locator('body').innerText()).trim()
    expect(text.length, 'homepage body must not be empty').toBeGreaterThan(0)
    // Soft Worker crash pages often say "Internal Server Error" with an empty app shell.
    expect(text.toLowerCase()).not.toContain('internal server error')
  })

  test('admin shell loads (login or dashboard)', async ({ page }) => {
    const res = await page.goto('/admin', { waitUntil: 'domcontentloaded' })
    expect(res, 'admin must return a response').toBeTruthy()
    expect(res!.status(), `admin status ${res!.status()}`).toBeLessThan(500)
    await expect(page.locator('body')).toBeVisible()
    const shell = page.locator('#app, [data-payload-admin], input[name="email"], input[type="email"], form')
    await expect(shell.first()).toBeVisible({ timeout: 45_000 })
  })

  test('system health endpoint is ok', async ({ request }) => {
    // Prefer unlocalized route; fall back if middleware rewrites.
    let res = await request.get('/next/system/health')
    if (res.status() === 404) res = await request.get('/en/next/system/health')
    expect(res.status(), `health status ${res.status()}`).toBeLessThan(500)
    if (res.ok()) {
      const body = (await res.json()) as { ok?: boolean; service?: string }
      expect(body.ok).toBe(true)
      expect(body.service).toBe('erpax')
    }
  })
})
