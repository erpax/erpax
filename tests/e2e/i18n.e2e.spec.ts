import { expect, test } from '@playwright/test'

/**
 * i18n E2E tests.
 *
 *   1. **Admin:** Payload resolves UI language via `getRequestLanguage`
 *      (`payload-lng`, `Accept-Language`, fallback). Middleware does **not**
 *      strip `?locale=` on `/admin` (Payload uses it for content locale).
 *   2. **Frontend:** next-intl `/<locale>/...` and `FrontendLocaleSwitcher`.
 */

const BASE_URL = 'http://localhost:3000'

test.describe('i18n: Payload admin (cookie + Accept-Language)', () => {
  test.describe.configure({ timeout: 60_000 })

  test('renders English by default (no cookie, no header)', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'en-US' })
    const page = await context.newPage()
    try {
      await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'domcontentloaded' })
      await expect(page.locator('label[for="field-email"]')).toContainText(/Email/i)
      await expect(page.locator('label[for="field-password"]')).toContainText(/Password/i)
    } finally {
      await context.close()
    }
  })

  test('respects payload-lng cookie (Bulgarian)', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'en-US' })
    await context.addCookies([
      { name: 'payload-lng', value: 'bg', url: BASE_URL, sameSite: 'Lax' },
    ])
    const page = await context.newPage()
    try {
      await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'domcontentloaded' })
      await expect(page.locator('label[for="field-email"]')).toContainText('Имейл')
      await expect(page.locator('label[for="field-password"]')).toContainText('Парола')
    } finally {
      await context.close()
    }
  })

  test('respects Accept-Language header when no cookie is set', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'bg-BG' })
    const page = await context.newPage()
    try {
      await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'domcontentloaded' })
      await expect(page.locator('label[for="field-email"]')).toContainText('Имейл')
    } finally {
      await context.close()
    }
  })

  test('cookie takes precedence over Accept-Language header', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'bg-BG' })
    await context.addCookies([
      { name: 'payload-lng', value: 'en', url: BASE_URL, sameSite: 'Lax' },
    ])
    const page = await context.newPage()
    try {
      await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'domcontentloaded' })
      await expect(page.locator('label[for="field-email"]')).toContainText(/Email/i)
    } finally {
      await context.close()
    }
  })

  test('falls back to English for an unsupported cookie value', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'en-US' })
    await context.addCookies([
      { name: 'payload-lng', value: 'xx-not-a-locale', url: BASE_URL, sameSite: 'Lax' },
    ])
    const page = await context.newPage()
    try {
      const response = await page.goto(`${BASE_URL}/admin/login`, {
        waitUntil: 'domcontentloaded',
      })
      expect(response?.status()).toBeLessThan(500)
      await expect(page.locator('label[for="field-email"]')).toContainText(/Email/i)
    } finally {
      await context.close()
    }
  })

  test('renders an Arabic locale (via cookie)', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'en-US' })
    await context.addCookies([
      { name: 'payload-lng', value: 'ar', url: BASE_URL, sameSite: 'Lax' },
    ])
    const page = await context.newPage()
    try {
      await page.goto(`${BASE_URL}/admin/login`, { waitUntil: 'domcontentloaded' })
      await expect(page.locator('label[for="field-email"]')).toContainText(
        /البريد الإلكتروني|بريد/u,
      )
    } finally {
      await context.close()
    }
  })

  test('deep link keeps ?locale= in URL (middleware does not strip)', async ({ browser }) => {
    const context = await browser.newContext({ locale: 'en-US' })
    const page = await context.newPage()
    try {
      const response = await page.goto(`${BASE_URL}/admin/login?locale=bg`, {
        waitUntil: 'domcontentloaded',
      })
      expect(response?.status()).toBeLessThan(500)
      await expect(page).toHaveURL(/locale=bg/)
      await expect(page.locator('label[for="field-email"]')).toContainText(/Email/i)
    } finally {
      await context.close()
    }
  })
})

test.describe('i18n: frontend (next-intl URL prefix + dropdown)', () => {
  test.describe.configure({ timeout: 60_000 })

  test('serves the configured locale via URL prefix', async ({ page }) => {
    await page.goto(`${BASE_URL}/en`)
    await expect(page).toHaveURL(/\/en\b/)
    const htmlLangEn = await page.locator('html').getAttribute('lang')
    expect(htmlLangEn).toBe('en')

    await page.goto(`${BASE_URL}/bg`)
    await expect(page).toHaveURL(/\/bg\b/)
    const htmlLangBg = await page.locator('html').getAttribute('lang')
    expect(['bg', 'en']).toContain(htmlLangBg)
  })

  test('FrontendLocaleSwitcher in the site header switches locales', async ({ page }) => {
    await page.goto(`${BASE_URL}/en`)

    const switcher = page.getByRole('combobox', { name: /select language/i })
    await expect(switcher).toBeVisible()
    await expect(switcher).toHaveValue('en')

    await switcher.selectOption('bg')

    await page.waitForURL(/\/bg(\/|$|\?)/, { timeout: 10_000 })
    await expect(switcher).toHaveValue('bg')

    await switcher.selectOption('en')
    await page.waitForURL(/\/en(\/|$|\?)/, { timeout: 10_000 })
    await expect(switcher).toHaveValue('en')
  })
})
