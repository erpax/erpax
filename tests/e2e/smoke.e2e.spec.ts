/**
 * UI smoke — homepage + admin shell. Used post-Cloudflare-deploy with
 * PLAYWRIGHT_BASE_URL + SKIP_E2E_WEBSERVER=1, and locally via webServer.
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @standard W3C WebDriver-BiDi browser-automation
 */
import { test, expect } from '@playwright/test'

test.describe('UI smoke', () => {
  test.describe.configure({ timeout: 60_000 })

  test('homepage responds', async ({ page }) => {
    const res = await page.goto('/')
    expect(res?.ok() || res?.status() === 404 || (res?.status() ?? 0) < 500).toBeTruthy()
    await expect(page.locator('body')).toBeVisible()
  })

  test('admin shell loads', async ({ page }) => {
    const res = await page.goto('/admin')
    // Unauthenticated admin may redirect to login — any non-5xx is deploy-healthy.
    expect(res?.status() ?? 0).toBeLessThan(500)
    await expect(page.locator('body')).toBeVisible()
  })
})
