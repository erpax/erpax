/**
 * OECD SAF-T 2.0 — audit-file export walk-through. Captures the admin
 * surfaces a tax authority would expect for the Standard Audit File for
 * Tax submission flow:
 *
 *   - Tenants list (issuer identity)                — `tenants`
 *   - Tax returns list                              — `tax-returns`
 *   - Trial balances (master files / GL entries)    — `trial-balances`
 *   - Journal entries (general-ledger source)       — `journal-entries`
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @standard OECD SAF-T 2.0 audit-file
 * @audit ISO-19011:2018 audit-trail visual-evidence saf-t-evidence-pack
 * @compliance EU 2014/55 b2g-e-invoicing-mandate
 * @see src/services/saf-t-export.service.ts
 * @see src/standards/saf-t/types.ts
 */

import { test } from '@playwright/test'
import { login } from '../../../helpers/login'
import { testUser } from '../../../helpers/seedUser'
import { safeCaptureRoute } from '../../../helpers/evidence'

const STANDARD = 'audit/saf-t'
const BASE = 'http://localhost:3000'

test.describe('Standard: OECD SAF-T 2.0 — audit-file export', () => {
  test.describe.configure({ timeout: 180_000 })

  test('walk-through: issuer identity → tax return → trial balance → GL source', async ({
    page,
  }, testInfo) => {
    await login({ page, user: testUser })

    await safeCaptureRoute(page, testInfo, STANDARD, '01-tenants',
      `${BASE}/admin/collections/tenants`,
      'Tenants — issuer identity (companyID, taxRegistrationNumber)')

    await safeCaptureRoute(page, testInfo, STANDARD, '02-tax-returns',
      `${BASE}/admin/collections/tax-returns`,
      'Tax returns — period filings backed by SAF-T export')

    await safeCaptureRoute(page, testInfo, STANDARD, '03-trial-balances',
      `${BASE}/admin/collections/trial-balances`,
      'Trial balances — SAF-T MasterFiles + GeneralLedgerEntries source')

    await safeCaptureRoute(page, testInfo, STANDARD, '04-journal-entries',
      `${BASE}/admin/collections/journal-entries`,
      'Journal entries — granular SAF-T transaction lines (audit trail evidence)')
  })
})
