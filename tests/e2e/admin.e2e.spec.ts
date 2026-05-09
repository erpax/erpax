import { test, expect } from '@playwright/test'
import { login } from '../helpers/login'
import { testUser } from '../helpers/seedUser'

/**
 * Admin Panel E2E Tests — Playwright drives the Payload admin UI.
 *
 * Payload convention: each test is independent and performs its own login;
 * avoids `beforeAll`/`afterAll` complexity that can hang or leave dirty state.
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @standard W3C WebDriver-BiDi browser-automation
 * @rfc 6265 cookies session
 * @rfc 7519 jwt session-token
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27001 A.5.17 authentication-information
 * @compliance WCAG-2.1 level-AA accessibility
 * @see docs/STANDARDS.md §4.4 §7
 */
test.describe('Admin Panel', () => {
  test.describe.configure({ timeout: 60_000 })

  test('can login and view dashboard', async ({ page }) => {
    await login({ page, user: testUser })
    
    // Verify on admin dashboard
    await expect(page).toHaveURL(/\/admin\/?$/)
    await expect(page.locator('main')).toBeVisible()
  })

  test('can navigate to users collection', async ({ page }) => {
    await login({ page, user: testUser })
    
    await page.goto('http://localhost:3000/admin/collections/users')
    await expect(page).toHaveURL(/\/admin\/collections\/users/)
    await expect(page.locator('main')).toBeVisible()
  })

  test('can create new user form', async ({ page }) => {
    await login({ page, user: testUser })
    
    await page.goto('http://localhost:3000/admin/collections/users/create')
    await expect(page).toHaveURL(/\/admin\/collections\/users\//)
    await expect(page.locator('input[name="email"]')).toBeVisible()
  })
})
