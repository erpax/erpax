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
 * Logs the user into the admin panel via the login page.
 */
export async function login({
  page,
  serverURL = 'http://localhost:3000',
  user,
}: LoginOptions): Promise<void> {
  await page.goto(`${serverURL}/admin/login`, { waitUntil: 'domcontentloaded' })

  const email = page.getByRole('textbox', { name: 'Email *', exact: true })
  const password = page.getByRole('textbox', { name: 'Password', exact: true })
  await email.waitFor({ state: 'visible' })
  await password.waitFor({ state: 'visible' })
  await email.fill(user.email)
  await password.fill(user.password)
  await page.getByRole('button', { name: 'Login', exact: true }).click()

  await page.waitForURL(`${serverURL}/admin`)

  const dashboardArtifact = page.locator('span[title="Dashboard"]')
  await expect(dashboardArtifact).toBeVisible()
}
