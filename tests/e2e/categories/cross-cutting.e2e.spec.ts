/**
 * Cross-cutting category orchestrator — tenants + users + suite-level
 * orchestrators surface in both admin and frontend. The walk-through
 * captures the admin side (where these are administered).
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @audit ISO-19011:2018 audit-trail visual-evidence
 * @security ISO-27001 A.5.16 identity-management
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @compliance SOX §404 internal-controls process-walk-through
 * @see src/testing/test-seed-factory.ts (registerSeedCategory)
 */

import { test } from '@playwright/test'
import { login } from '../../helpers/login'
import { testUser } from '../../helpers/seedUser'
import { safeCaptureRoute } from '../../helpers/evidence'
import { getSeedsByCategory } from '@/testing'

import '@/plugins/accounting/seeds'

const CATEGORY = 'cross-cutting' as const
const BASE = 'http://localhost:3000'

const SEED_TO_ADMIN_ROUTE: Record<string, string | null> = {
  'level-1.minimal-tenant': '/admin/collections/tenants',
  'level-1.minimal-users': '/admin/collections/users',
  'level-1.suite': null, // suite touches multiple → captured at /admin
  'level-2.suite': null,
}

const seeds = getSeedsByCategory(CATEGORY)

test.describe(`Category orchestrator: ${CATEGORY}`, () => {
  test.describe.configure({ timeout: 180_000 })

  for (const seed of seeds) {
    test(`captures cross-cutting surface for ${seed.id}`, async ({ page }, testInfo) => {
      await login({ page, user: testUser })
      const route = SEED_TO_ADMIN_ROUTE[seed.id] ?? '/admin'
      await safeCaptureRoute(page, testInfo, `categories/${CATEGORY}`, seed.id,
        `${BASE}${route}`, `${seed.id}: ${seed.description}`)
    })
  }
})
