/**
 * SOX §404 — internal-controls evidence trail walk-through. Captures the
 * admin surfaces a SOX auditor would inspect when verifying the project's
 * controls operate as designed:
 *
 *   - Control tests (`control-tests`)               — design + operating effectiveness
 *   - Audit findings (`audit-findings`)             — deficiencies + remediation
 *   - Audit events (`audit-events`)                 — system-recorded actions
 *   - Account reconciliations                       — period-close anchor
 *   - Journal entries — sign-off chain              — segregation of duties (ISO-27002 §5.4)
 *   - Period-end adjustments                        — locked-period overrides
 *
 * If this walk-through succeeds end-to-end, the SOX §404 control surface
 * is provable through the UI alone — no separate unit test required for
 * the auditor evidence path.
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @audit ISO-19011:2018 audit-trail visual-evidence sox-evidence-pack
 * @compliance SOX §404 internal-controls process-walk-through
 * @compliance SOX §302 cfo-certification disclosure-controls
 * @security ISO-27002 §5.4 segregation-of-duties
 * @see src/plugins/accounting/collections/ControlTests.ts
 * @see src/plugins/accounting/collections/AuditFindings.ts
 */

import { test } from '@playwright/test'
import { login } from '../../../helpers/login'
import { testUser } from '../../../helpers/seedUser'
import { safeCaptureRoute } from '../../../helpers/evidence'

const STANDARD = 'compliance/sox-404'
const BASE = 'http://localhost:3000'

test.describe('Standard: SOX §404 — internal-controls evidence trail', () => {
  test.describe.configure({ timeout: 180_000 })

  test('walk-through: control tests → findings → events → period close → JE sign-off', async ({
    page,
  }, testInfo) => {
    await login({ page, user: testUser })

    await safeCaptureRoute(page, testInfo, STANDARD, '01-control-tests',
      `${BASE}/admin/collections/control-tests`,
      'Control tests — design + operating effectiveness samples')

    await safeCaptureRoute(page, testInfo, STANDARD, '02-audit-findings',
      `${BASE}/admin/collections/audit-findings`,
      'Audit findings — deficiencies + remediation tracking')

    await safeCaptureRoute(page, testInfo, STANDARD, '03-audit-events',
      `${BASE}/admin/collections/audit-events`,
      'Audit events — system-recorded actions (immutable trail)')

    await safeCaptureRoute(page, testInfo, STANDARD, '04-account-reconciliations',
      `${BASE}/admin/collections/account-reconciliations`,
      'Account reconciliations — period-close anchor (preparer ≠ reviewer)')

    await safeCaptureRoute(page, testInfo, STANDARD, '05-period-end-adjustments',
      `${BASE}/admin/collections/period-end-adjustments`,
      'Period-end adjustments — locked-period override approvals')

    await safeCaptureRoute(page, testInfo, STANDARD, '06-journal-entries',
      `${BASE}/admin/collections/journal-entries`,
      'Journal entries — segregation of duties (creator ≠ approver per ISO-27002 §5.4)')
  })
})
