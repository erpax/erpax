/**
 * GDPR — data-subject-request walk-through. Captures the admin surfaces a
 * data protection officer (DPO) would use to:
 *
 *   - Maintain Records of Processing Activities (Art.30)         — `data-processing-activities`
 *   - Track consent records (Art.6(1)(a) / Art.7)                — `consent-records`
 *   - Process data subject requests (Art.15-22)                  — `data-subject-requests`
 *   - Identify beneficial owners for AML/KYC                     — `beneficial-owners`
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @audit ISO-19011:2018 audit-trail visual-evidence dpo-evidence-pack
 * @compliance GDPR Art.5 principles-of-processing
 * @compliance GDPR Art.15-22 data-subject-rights
 * @compliance GDPR Art.30 records-of-processing
 * @compliance GDPR Art.32 security-of-processing
 * @compliance ISO-27701:2019 §6.3.1 records-of-processing
 * @security ISO-27001 A.5.34 privacy-and-pii
 * @see src/plugins/accounting/collections/DataProcessingActivities.ts
 * @see src/plugins/accounting/collections/DataSubjectRequests.ts
 */

import { test } from '@playwright/test'
import { login } from '../../../helpers/login'
import { testUser } from '../../../helpers/seedUser'
import { safeCaptureRoute } from '../../../helpers/evidence'

const STANDARD = 'compliance/gdpr'
const BASE = 'http://localhost:3000'

test.describe('Standard: GDPR — DPO walk-through', () => {
  test.describe.configure({ timeout: 180_000 })

  test('walk-through: RoPA → consent → DSR → beneficial owners', async ({ page }, testInfo) => {
    await login({ page, user: testUser })

    await safeCaptureRoute(page, testInfo, STANDARD, '01-data-processing-activities',
      `${BASE}/admin/collections/data-processing-activities`,
      'Records of Processing Activities (Art.30)')

    await safeCaptureRoute(page, testInfo, STANDARD, '02-consent-records',
      `${BASE}/admin/collections/consent-records`,
      'Consent records (Art.6(1)(a) / Art.7) — lawful basis evidence')

    await safeCaptureRoute(page, testInfo, STANDARD, '03-data-subject-requests',
      `${BASE}/admin/collections/data-subject-requests`,
      'Data subject requests (Art.15-22) — access / rectification / erasure / portability')

    await safeCaptureRoute(page, testInfo, STANDARD, '04-beneficial-owners',
      `${BASE}/admin/collections/beneficial-owners`,
      'Beneficial owners — AML/KYC linkage to GDPR Art.6(1)(c) lawful basis')
  })
})
