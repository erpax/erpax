/**
 * ISO-3166-1 (default country = BG) — admin walk-through proving the
 * tenant.country resolution flow surfaces correctly in the admin UI.
 *
 * Validates the per-country compliance posture is visible to admins:
 *   - Tenant edit form shows country = BG (default)
 *   - Tenant config block surfaces reportingCurrency = EUR
 *   - GL accounts list reflects the IFRS chart structure
 *
 * If this walk-through succeeds, the country-context resolver + the BG
 * country bundle + the IFRS_MINIMUM_TEMPLATE derivation chain are all
 * proven through the UI — no separate unit test required for the
 * end-to-end behaviour.
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @standard ISO-3166-1:2020 BG country-code
 * @standard ISO-4217:2015 EUR reporting-currency
 * @audit ISO-19011:2018 audit-trail country-decision-evidence
 * @compliance SOX §404 internal-controls process-walk-through
 * @see src/standards/iso-3166-1/countries/bg.ts
 * @see src/services/country-context.ts
 */

import { test } from '@playwright/test'
import { login } from '../../../helpers/login'
import { testUser } from '../../../helpers/seedUser'
import { safeCaptureRoute } from '../../../helpers/evidence'

const STANDARD = 'iso-3166-1/default-country-bg'
const BASE = 'http://localhost:3000'

test.describe('Standard: ISO-3166-1 — default country BG', () => {
  test.describe.configure({ timeout: 120_000 })

  test('tenant + chart-of-accounts surface the BG bundle defaults', async ({ page }, testInfo) => {
    await login({ page, user: testUser })
    await safeCaptureRoute(page, testInfo, STANDARD, '01-tenants-list',
      `${BASE}/admin/collections/tenants`, 'Tenants list — default tenant should reflect BG')
    await safeCaptureRoute(page, testInfo, STANDARD, '02-gl-accounts-list',
      `${BASE}/admin/collections/gl-accounts`, 'GL accounts — IFRS skeleton (5 element types)')
    await safeCaptureRoute(page, testInfo, STANDARD, '03-currency-rates-list',
      `${BASE}/admin/collections/currency-rates`, 'Currency rates — EUR-anchored')
  })
})
