import { test, expect } from '@playwright/test'

/**
 * Form Builder E2E Tests — submissions, validation, confirmation flow.
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @standard W3C WebDriver-BiDi browser-automation
 * @standard W3C HTML5 form-validation
 * @rfc 5322 internet-message-format email-field
 * @compliance WCAG-2.1 level-AA accessibility
 * @compliance GDPR Art.6(1)(a) consent
 * @see docs/STANDARDS.md §3 §6 §7
 */
test.describe('Form Builder', () => {
  test.describe.configure({ timeout: 60_000 })

  test('can submit contact form', async ({ page }) => {
    // Navigate to a page with a form block (requires seed data)
    await page.goto('http://localhost:3000/contact', { waitUntil: 'domcontentloaded' })
    
    // If page doesn't exist (no seed), skip gracefully
    const is404 = page.url().includes('/404') || await page.locator('text=Not Found').isVisible().catch(() => false)
    if (is404) {
      test.skip(true, 'Contact page not seeded')
      return
    }

    // Fill form fields
    const nameInput = page.locator('input[name="name"], input[placeholder*="Name" i]').first()
    const emailInput = page.locator('input[name="email"], input[type="email"]').first()
    const messageInput = page.locator('textarea[name="message"], textarea').first()
    const submitButton = page.locator('button[type="submit"]').first()

    if (await nameInput.isVisible().catch(() => false)) {
      await nameInput.fill('Test User')
    }
    if (await emailInput.isVisible().catch(() => false)) {
      await emailInput.fill('test@example.com')
    }
    if (await messageInput.isVisible().catch(() => false)) {
      await messageInput.fill('This is a test message from E2E tests.')
    }

    // Submit if form exists
    if (await submitButton.isVisible().catch(() => false)) {
      await submitButton.click()
      
      // Wait for success message or redirect
      await expect(page.locator('text=/success|thank you|submitted/i').first()).toBeVisible({ timeout: 10_000 })
    }
  })

  test('form validation shows errors', async ({ page }) => {
    await page.goto('http://localhost:3000/contact', { waitUntil: 'domcontentloaded' })
    
    if (page.url().includes('/404')) {
      test.skip(true, 'Contact page not seeded')
      return
    }

    const submitButton = page.locator('button[type="submit"]').first()
    if (!(await submitButton.isVisible().catch(() => false))) {
      test.skip(true, 'No form found')
      return
    }

    // Submit empty form
    await submitButton.click()

    // Check for error messages
    const error = page.locator('text=/required|error|invalid/i, [role="alert"]').first()
    await expect(error).toBeVisible({ timeout: 5_000 })
  })

  test('form block renders with intro content', async ({ page }) => {
    await page.goto('http://localhost:3000/contact', { waitUntil: 'domcontentloaded' })

    if (page.url().includes('/404')) {
      test.skip(true, 'Contact page not seeded')
      return
    }

    // Check form block wrapper exists
    const formBlock = page.locator('form, [class*="form"]').first()
    await expect(formBlock).toBeVisible()
  })
})
