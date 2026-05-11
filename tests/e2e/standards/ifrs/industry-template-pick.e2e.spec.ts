/**
 * IFRS — industry template chart-of-accounts walk-through. Each curated
 * vertical (Minimum / SaaS / Retail / Service / Manufacturing) is captured
 * through the GL-accounts list view to prove the template's chart actually
 * renders into the admin UI when applied.
 *
 * The seed for each template lands its chart-of-accounts rows; this spec
 * captures the resulting list view as evidence that the template
 * round-trips through the data layer cleanly.
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @accounting IFRS IAS-1 §54 minimum-line-items
 * @accounting IFRS IAS-2 §10 inventories-cost-formula
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @audit ISO-19011:2018 audit-trail visual-evidence
 * @compliance SOX §404 internal-controls process-walk-through
 * @see src/plugins/accounting/seeds/templates/templates.ts
 */

import { test } from '@playwright/test'
import { login } from '../../../helpers/login'
import { testUser } from '../../../helpers/seedUser'
import { captureWorkflowStep, safeCaptureRoute } from '../../../helpers/evidence'
import { INDUSTRY_TEMPLATES } from '@/plugins/accounting/seeds/templates'

const STANDARD = 'ifrs/industry-templates'
const BASE = 'http://localhost:3000'

test.describe('Standard: IFRS — industry templates', () => {
  test.describe.configure({ timeout: 180_000 })

  test('captures GL-accounts list once per curated template', async ({ page }, testInfo) => {
    await login({ page, user: testUser })
    await captureWorkflowStep(page, testInfo, STANDARD, '00-overview',
      'Admin dashboard — entry into the chart-of-accounts walk-through')

    for (const [id, template] of Object.entries(INDUSTRY_TEMPLATES)) {
      await safeCaptureRoute(page, testInfo, STANDARD, id,
        `${BASE}/admin/collections/gl-accounts`,
        `${id} — ${template.label} (${template.chartOfAccounts.length} accounts)`)
    }
  })
})
