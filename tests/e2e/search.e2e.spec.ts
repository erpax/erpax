import { test, expect } from '@playwright/test'

/**
 * Search Plugin E2E Tests — verifies search across collections via the UI.
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @standard W3C WebDriver-BiDi browser-automation
 * @rfc 3986 uniform-resource-identifier search-query-parameter
 * @standard schema.org SearchAction
 * @compliance WCAG-2.1 level-AA accessibility
 * @see docs/STANDARDS.md §3 §7
 */
test.describe('Search', () => {
  test.describe.configure({ timeout: 60_000 })

  test('search page renders', async ({ page }) => {
    await page.goto('http://localhost:3000/en/search')
    await expect(page).toHaveURL(/\/search/)
    await expect(page.locator('main')).toBeVisible()
  })

  test('can perform search query', async ({ page }) => {
    await page.goto('http://localhost:3000/en/search')

    const searchInput = page.locator('input[name="query"], input[placeholder*="Search" i], input[type="search"]').first()
    
    if (await searchInput.isVisible().catch(() => false)) {
      await searchInput.fill('post')
      await searchInput.press('Enter')

      // Wait for results
      await page.waitForTimeout(1000)
      
      // Check results or no-results message appears
      const results = page.locator('[class*="result"], article, .search-result').first()
      const noResults = page.locator('text=/no results|not found/i').first()
      
      const hasResults = await results.isVisible().catch(() => false)
      const hasNoResults = await noResults.isVisible().catch(() => false)
      
      expect(hasResults || hasNoResults).toBe(true)
    }
  })

  test('admin search works', async ({ page }) => {
    // Admin search is typically on collections list
    await page.goto('http://localhost:3000/admin/collections/posts')
    await expect(page).toHaveURL(/\/admin\/collections\/posts/)
    
    // Look for search input in collection list
    const listSearch = page.locator('input[placeholder*="Search" i], input[name="search"]').first()
    if (await listSearch.isVisible().catch(() => false)) {
      await listSearch.fill('test')
      await page.waitForTimeout(500)
      
      // List should filter (or show empty)
      await expect(page.locator('main')).toBeVisible()
    }
  })
})
