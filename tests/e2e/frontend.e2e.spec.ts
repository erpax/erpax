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
