/**
 * EN-16931 — semantic-model e-invoice walk-through. EU mandate flows
 * (PEPPOL-BIS-3, ZUGFeRD/XRechnung, FatturaPA, KSeF, ANAF, Hometax,
 * qualified-invoice JP) all derive from the same EN-16931 semantic model;
 * this spec captures the admin surfaces that produce or consume those
 * invoices end-to-end:
 *
 *   - Customer master                        — `customers` (BillTo party)
 *   - Vendor master                          — `vendors` (Supplier party for AP)
 *   - Invoice issued (e-invoice generation)  — `invoices`
 *   - Tax codes / jurisdictions              — `tax-codes` / `tax-jurisdictions`
 *   - Tax calculations                       — `tax-calculations`
 *
 * The spec is country-agnostic — the per-country envelope (PEPPOL doctype
 * / ZUGFeRD profile / FatturaPA SDI dispatch) is selected based on
 * tenant.country via `country-context.helpers.requiresEInvoicing()` and
 * `apisOfKind('e_invoicing')`.
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @standard EN-16931:2017+A1:2019 semantic-model-electronic-invoice
 * @standard Peppol-BIS-3.0 billing
 * @standard UN-CEFACT 5305 duty-tax-fee-category-code
 * @audit ISO-19011:2018 audit-trail visual-evidence
 * @compliance EU 2014/55 b2g-e-invoicing-mandate
 * @compliance SOX §404 internal-controls process-walk-through
 * @see src/standards/en-16931
 * @see src/standards/peppol-bis-3
 * @see src/services/peppol-export.service.ts
 */

import { test } from '@playwright/test'
import { login } from '../../../helpers/login'
import { testUser } from '../../../helpers/seedUser'
import { safeCaptureRoute } from '../../../helpers/evidence'

const STANDARD = 'en-16931/e-invoice'
const BASE = 'http://localhost:3000'

test.describe('Standard: EN-16931 — e-invoice walk-through', () => {
  test.describe.configure({ timeout: 180_000 })

  test('walk-through: parties → tax codes → invoice → tax calculation', async ({
    page,
  }, testInfo) => {
    await login({ page, user: testUser })

    await safeCaptureRoute(page, testInfo, STANDARD, '01-customers',
      `${BASE}/admin/collections/customers`,
      'Customers — BillTo party (EN-16931 BG-7)')

    await safeCaptureRoute(page, testInfo, STANDARD, '02-vendors',
      `${BASE}/admin/collections/vendors`,
      'Vendors — Supplier party for AP-side e-invoice ingestion')

    await safeCaptureRoute(page, testInfo, STANDARD, '03-tax-codes',
      `${BASE}/admin/collections/tax-codes`,
      'Tax codes — UN/CEFACT 5305 duty/tax/fee category code mapping')

    await safeCaptureRoute(page, testInfo, STANDARD, '04-tax-jurisdictions',
      `${BASE}/admin/collections/tax-jurisdictions`,
      'Tax jurisdictions — per-country statutory tax rate registry')

    await safeCaptureRoute(page, testInfo, STANDARD, '05-tax-calculations',
      `${BASE}/admin/collections/tax-calculations`,
      'Tax calculations — line-level VAT/GST per EN-16931 BG-23')

    await safeCaptureRoute(page, testInfo, STANDARD, '06-invoices',
      `${BASE}/admin/collections/invoices`,
      'Invoices — e-invoice issuance surface (PEPPOL / ZUGFeRD / etc. dispatched per tenant.country)')
  })
})
