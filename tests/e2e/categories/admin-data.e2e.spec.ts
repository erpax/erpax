/**
 * Admin-data category orchestrator — iterates every seed registered with
 * `category: 'admin-data'` and captures the admin list view it populates.
 *
 * The spec body is registry-driven: adding a new seed with
 * `registerSeedCategory({ category: 'admin-data', … })` extends this
 * walk-through automatically (no parallel list to maintain).
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @standard ISO/IEC-29119-3:2021 test-documentation
 * @audit ISO-19011:2018 audit-trail visual-evidence
 * @compliance SOX §404 internal-controls process-walk-through
 * @see tests/helpers/evidence.ts
 * @see src/testing/test-seed-factory.ts (registerSeedCategory)
 */

import { test } from '@playwright/test'
import { login } from '../../helpers/login'
import { testUser } from '../../helpers/seedUser'
import { safeCaptureRoute } from '../../helpers/evidence'
import { getSeedsByCategory } from '@/testing'

// Force registration side-effects to fire by importing the seed barrels.
import '@/plugins/accounting/seeds'

const CATEGORY = 'admin-data' as const
const BASE = 'http://localhost:3000'

/**
 * Map a seed id to the admin route it most directly populates. When the
 * mapping is `null`, the seed is captured generically via /admin (it
 * touches multiple collections without a single canonical view).
 */
const SEED_TO_ADMIN_ROUTE: Record<string, string | null> = {
  'level-1.minimal-gl-accounts': '/admin/collections/gl-accounts',
  'level-1.minimal-currency-rates': '/admin/collections/currency-rates',
  'level-2.journal-entries': '/admin/collections/journal-entries',
  'level-2.accounting-cycles': '/admin/collections/accounting-cycles',
  'level-2.multi-currency': '/admin/collections/fx-transactions',
  'level-2.role-scoped-access': '/admin/collections/role-scoped-access',
}

const seeds = getSeedsByCategory(CATEGORY)

test.describe(`Category orchestrator: ${CATEGORY}`, () => {
  test.describe.configure({ timeout: 180_000 })

  for (const seed of seeds) {
    test(`captures admin surface for ${seed.id}`, async ({ page }, testInfo) => {
      await login({ page, user: testUser })
      const route = SEED_TO_ADMIN_ROUTE[seed.id]
      if (!route) {
        await safeCaptureRoute(page, testInfo, `categories/${CATEGORY}`, seed.id,
          `${BASE}/admin`, `${seed.id} (no canonical route — admin dashboard)`)
        return
      }
      await safeCaptureRoute(page, testInfo, `categories/${CATEGORY}`, seed.id,
        `${BASE}${route}`, `${seed.id}: ${seed.description}`)
    })
  }
})
