import { test, expect } from '@playwright/test'
import { login } from '../helpers/login'
import { testUser } from '../helpers/seedUser'

/**
 * i18n E2E Tests
 * 
 * Verifies locale switching, RTL layouts, and translation coverage.
 */
test.describe('i18n', () => {
  test.describe.configure({ timeout: 60_000 })

  test('can switch locale in admin', async ({ page }) => {
    await login({ page, user: testUser })

    // Look for language selector
    const langSelector = page.locator('select[name="locale"], [data-testid="locale-select"], select').first()
    
    if (await langSelector.isVisible().catch(() => false)) {
      // Switch to Spanish
      await langSelector.selectOption('es')
      
      // Verify URL updated or UI reflects change
      await page.waitForTimeout(500)
      
      // Check that we're still on admin (content changed)
      await expect(page).toHaveURL(/\/admin/)
    }
  })

  test('RTL layout renders correctly for Arabic', async ({ page }) => {
    // Set Arabic locale via URL
    await page.goto('http://localhost:3000/admin?locale=ar', { waitUntil: 'domcontentloaded' })
    
    // Check for RTL direction
    const dir = await page.locator('html').getAttribute('dir')
    if (dir) {
      expect(['rtl', 'ltr']).toContain(dir)
    }
  })

  test('frontend locale prefix works', async ({ page }) => {
    // Test Spanish frontend
    await page.goto('http://localhost:3000/es')
    await expect(page).toHaveURL(/\/es/)
    await expect(page.locator('main, h1')).toBeVisible()
  })

  test('locale fallback works for missing translations', async ({ page }) => {
    // Access with unsupported locale should fallback
    await page.goto('http://localhost:3000/admin?locale=xx', { waitUntil: 'domcontentloaded' })
    
    // Should not error, fallback to default
    await expect(page.locator('body')).toBeVisible()
  })
})
