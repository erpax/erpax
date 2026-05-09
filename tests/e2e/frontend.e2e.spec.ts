/**
 * Frontend e2e — Playwright browser-driven tests against the rendered site.
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @standard W3C WebDriver-BiDi browser-automation
 * @standard W3C HTML5 Living Standard
 * @compliance WCAG-2.1 level-AA accessibility
 * @standard BCP-47 language-tag locale-routing
 * @see docs/STANDARDS.md §3 §7
 */

import { test, expect } from '@playwright/test'

test.describe('Frontend', () => {
  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()

    // Matches default seed hero (`src/endpoints/seed/home.ts`); change if you reseed copy.
    await expect(heading).toContainText('Payload Website Template')
  })
})
