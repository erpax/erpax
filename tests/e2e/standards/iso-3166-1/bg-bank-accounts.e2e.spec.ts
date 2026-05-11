/**
 * BG bank-account + PSD2 walk-through. Captures the admin surfaces a
 * controller would use for the BG-specific bank flow:
 *
 *   - Bank accounts list (BG-22 IBAN format)               — `bank-accounts`
 *   - Bank statements list (camt.053 ingest)               — `bank-statements`
 *   - Bank transactions list (line-level reconciliation)   — `bank-transactions`
 *   - Account reconciliations (period-close anchor)        — `account-reconciliations`
 *   - SEPA mandates (BG IBAN-based direct debit)           — `sepa-mandates`
 *   - Payments + payment runs (PSD2 PIS dispatch)          — `payments` / `payment-runs`
 *
 * Pinned to BG because the bank registry (BANK_APIS.BG) is the source of
 * truth for which ASPSPs the tenant can authorise — the same flow runs for
 * any other country once its BANK_APIS entry lands.
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @standard ISO-3166-1:2020 BG country-code
 * @standard ISO-13616-1:2020 iban BG-22
 * @standard ISO-20022 camt.053 bank-to-customer-statement
 * @standard PSD2 EU 2015/2366 ais-pis
 * @standard Berlin Group NextGenPSD2 v1.3
 * @audit ISO-19011:2018 audit-trail visual-evidence
 * @compliance SOX §404 internal-controls process-walk-through
 * @compliance EU 2015/2366 strong-customer-authentication
 * @see src/standards/iso-3166-1/countries/bg.ts
 * @see src/config/country-apis.ts (BANK_APIS.BG)
 * @see src/services/bank-statement-import.service.ts
 * @see src/services/camt053-import.service.ts
 */

import { test } from '@playwright/test'
import { login } from '../../../helpers/login'
import { testUser } from '../../../helpers/seedUser'
import { safeCaptureRoute } from '../../../helpers/evidence'

const STANDARD = 'iso-3166-1/bg-bank-accounts'
const BASE = 'http://localhost:3000'

test.describe('Standard: ISO-3166-1 BG — bank-account + PSD2 walk-through', () => {
  test.describe.configure({ timeout: 180_000 })

  test('walk-through: BG IBAN → camt.053 → reconciliation → SEPA → payment run', async ({
    page,
  }, testInfo) => {
    await login({ page, user: testUser })

    await safeCaptureRoute(page, testInfo, STANDARD, '01-bank-accounts',
      `${BASE}/admin/collections/bank-accounts`,
      'Bank accounts — BG-22 IBAN format (ISO-13616-1:2020 + BG country prefix)')

    await safeCaptureRoute(page, testInfo, STANDARD, '02-bank-statements',
      `${BASE}/admin/collections/bank-statements`,
      'Bank statements — ingested via camt.053 (ISO-20022)')

    await safeCaptureRoute(page, testInfo, STANDARD, '03-bank-transactions',
      `${BASE}/admin/collections/bank-transactions`,
      'Bank transactions — line-level evidence for reconciliation')

    await safeCaptureRoute(page, testInfo, STANDARD, '04-account-reconciliations',
      `${BASE}/admin/collections/account-reconciliations`,
      'Account reconciliations — preparer ≠ reviewer (ISO-27002 §5.4)')

    await safeCaptureRoute(page, testInfo, STANDARD, '05-sepa-mandates',
      `${BASE}/admin/collections/sepa-mandates`,
      'SEPA mandates — BG IBAN-based direct debit (UMR, creditor-id)')

    await safeCaptureRoute(page, testInfo, STANDARD, '06-payments',
      `${BASE}/admin/collections/payments`,
      'Payments — individual disbursements')

    await safeCaptureRoute(page, testInfo, STANDARD, '07-payment-runs',
      `${BASE}/admin/collections/payment-runs`,
      'Payment runs — batched dispatch via PSD2 PIS to BG ASPSPs (Berlin Group NextGenPSD2)')
  })
})
