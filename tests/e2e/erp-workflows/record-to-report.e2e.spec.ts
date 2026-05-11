/**
 * Record-to-Report (R2R) workflow walk-through — period-end close, trial
 * balance, financial statements, audit-file export. This is where
 * accounting and ERP overlap most: the close cadence depends on every
 * upstream ERP cycle (O2C, P2P, payroll, inventory) having posted cleanly.
 *
 * Each step uses `safeCaptureRoute` so a missing collection / 404 / admin
 * error state records a `gap:blocker` annotation instead of failing the
 * whole test — the walk-through continues to produce evidence for every
 * later step.
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @standard OECD SAF-T 2.0 audit-file
 * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
 * @compliance SOX §404 internal-controls process-walk-through
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-7 statement-of-cash-flows
 * @see ../../helpers/evidence.ts
 * @see ./README.md
 */

import { test } from '@playwright/test'
import { login } from '../../helpers/login'
import { testUser } from '../../helpers/seedUser'
import { captureWorkflowStep, recordUxGap, safeCaptureRoute } from '../../helpers/evidence'

const WORKFLOW = 'record-to-report'
const BASE = 'http://localhost:3000'

test.describe('ERP workflow: Record-to-Report', () => {
  test.describe.configure({ timeout: 180_000 })

  test('walk-through: reconcile → close → statements → file', async ({ page }, testInfo) => {
    await login({ page, user: testUser })
    await captureWorkflowStep(page, testInfo, WORKFLOW, '00-dashboard',
      'Admin dashboard after login')

    // Step 1 — Bank reconciliations (close anchor).
    await safeCaptureRoute(page, testInfo, WORKFLOW, '01-reconciliations-list',
      `${BASE}/admin/collections/account-reconciliations`,
      'Account reconciliations list')

    // Step 2 — Fiscal periods.
    const periodsOk = await safeCaptureRoute(page, testInfo, WORKFLOW, '02-fiscal-periods-list',
      `${BASE}/admin/collections/fiscal-periods`,
      'Fiscal periods list view (open / closing / closed status)')
    if (periodsOk && (await page.getByText('Days to close').count()) === 0) {
      recordUxGap(testInfo, WORKFLOW, '02-fiscal-periods-list', 'minor',
        'No "Days to close" / "Close progress" column on fiscal periods list — controllers can\'t see close-cycle KPIs at a glance')
    }

    // Step 3 — Adjusting entries.
    await safeCaptureRoute(page, testInfo, WORKFLOW, '03-adjusting-entries',
      `${BASE}/admin/collections/journal-entries`,
      'Journal entries — period-end adjusting entries (depreciation, accruals, prepaid)')

    // Step 4 — Financial statements.
    const fsOk = await safeCaptureRoute(page, testInfo, WORKFLOW, '04-financial-statements-list',
      `${BASE}/admin/collections/financial-statements`,
      'Financial statements list view (IS / BS / CF)')
    if (fsOk && (await page.getByText('Generate').count()) === 0) {
      recordUxGap(testInfo, WORKFLOW, '04-financial-statements-list', 'major',
        'No "Generate" / "Build from period" CTA on financial statements list — users have to manually create + populate each statement')
    }

    // Step 5 — Tax returns.
    await safeCaptureRoute(page, testInfo, WORKFLOW, '05-tax-returns-list',
      `${BASE}/admin/collections/tax-returns`,
      'Tax returns list view (statutory filing status)')

    // Step 6 — Audit findings.
    await safeCaptureRoute(page, testInfo, WORKFLOW, '06-audit-findings-list',
      `${BASE}/admin/collections/audit-findings`,
      'Audit findings list view (control-test deficiencies + remediation)')
  })
})
