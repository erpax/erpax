import { test, expect } from '@playwright/test'
import { login } from '../helpers/login'
import { testUser } from '../helpers/seedUser'

/**
 * Admin Panel E2E Tests
 * 
 * Payload Convention: Each test is independent and performs its own login.
 * This avoids beforeAll/afterAll complexity that can hang or leave state dirty.
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
