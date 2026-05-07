import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export interface LoginOptions {
  page: Page
  serverURL?: string
  user: {
    email: string
    password: string
  }
}

/**
 * Logs the user into the admin panel via UI.
 * 
 * Convention: Go to /admin, let Payload redirect to login or create-first-user,
 * then authenticate. Works for both fresh installs and existing users.
 */
export async function login({
  page,
  serverURL = 'http://localhost:3000',
  user,
}: LoginOptions): Promise<void> {
  // Navigate to admin root - Payload redirects to login or create-first-user
  await page.goto(`${serverURL}/admin`, { waitUntil: 'domcontentloaded' })

  const currentPath = new URL(page.url()).pathname

  // Handle create-first-user flow (fresh install)
  if (currentPath.includes('/create-first-user')) {
    await page.locator('input[name="email"]').fill(user.email)
    await page.locator('input[name="password"]').fill(user.password)
    
    const confirmInput = page.locator('input[name="confirm-password"]')
    if (await confirmInput.isVisible().catch(() => false)) {
      await confirmInput.fill(user.password)
    }
    
    await page.locator('button[type="submit"]').click()
    await page.waitForURL(`${serverURL}/admin`, { timeout: 10_000 })
    return
  }

  // Already logged in
  if (!currentPath.includes('/login')) {
    return
  }

  // Handle login form
  await page.locator('input[name="email"]').fill(user.email)
  await page.locator('input[name="password"]').fill(user.password)
  await page.locator('button[type="submit"]').click()

  // Wait for navigation away from login
  await page.waitForURL(`${serverURL}/admin`, { timeout: 10_000 })
  
  // Verify successful login
  await expect(page).toHaveURL(/\/admin\/?$/)
}
