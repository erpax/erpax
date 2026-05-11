/**
 * IFRS-16 — leases walk-through. Captures the admin surfaces a controller
 * would use to maintain the IFRS-16 right-of-use (ROU) asset + lease
 * liability lifecycle:
 *
 *   - Leases register                                 — `leases`
 *   - Lease period postings (per-month decomposition) — `lease-period-postings`
 *   - Depreciation schedules (ROU amortisation)       — `depreciation-schedules`
 *   - Journal entries (interest + ROU amortisation)   — `journal-entries`
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @accounting IFRS IFRS-16 leases lessee-accounting
 * @accounting IFRS IFRS-16 §22 rou-asset-initial-measurement
 * @accounting IFRS IFRS-16 §26 liability-initial-measurement
 * @accounting US-GAAP ASC-842-20 lessee-accounting
 * @audit ISO-19011:2018 audit-trail visual-evidence
 * @compliance SOX §404 internal-controls process-walk-through
 * @see src/services/lease.service.ts
 * @see src/standards/ifrs-16
 */

import { test } from '@playwright/test'
import { login } from '../../../helpers/login'
import { testUser } from '../../../helpers/seedUser'
import { safeCaptureRoute } from '../../../helpers/evidence'

const STANDARD = 'ifrs/ifrs-16-leases'
const BASE = 'http://localhost:3000'

test.describe('Standard: IFRS-16 — leases', () => {
  test.describe.configure({ timeout: 180_000 })

  test('walk-through: leases register → period postings → depreciation → journal', async ({
    page,
  }, testInfo) => {
    await login({ page, user: testUser })

    await safeCaptureRoute(page, testInfo, STANDARD, '01-leases',
      `${BASE}/admin/collections/leases`,
      'Leases register — initial measurement (PV of payments + IDC + prepaid − incentives)')

    await safeCaptureRoute(page, testInfo, STANDARD, '02-lease-period-postings',
      `${BASE}/admin/collections/lease-period-postings`,
      'Lease period postings — per-month interest/principal/ROU amortisation split')

    await safeCaptureRoute(page, testInfo, STANDARD, '03-depreciation-schedules',
      `${BASE}/admin/collections/depreciation-schedules`,
      'Depreciation schedules — straight-line ROU amortisation evidence')

    await safeCaptureRoute(page, testInfo, STANDARD, '04-journal-entries',
      `${BASE}/admin/collections/journal-entries`,
      'Journal entries — IFRS-16 §31/§36/§38 amortisation postings')
  })
})
