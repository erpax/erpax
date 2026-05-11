/**
 * Procure-to-Pay (P2P) workflow walk-through — captures the UX gap between
 * the accounting backend (bills / payments / AP / expense) and the ERP
 * front (vendor → PO → goods receipt → bill → payment).
 *
 * Each step uses `safeCaptureRoute` so a missing collection / 404 / admin
 * error state records a `gap:blocker` annotation instead of failing the
 * whole test — the walk-through continues to produce evidence for every
 * later step.
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @standard ISO/IEC-29119-3:2021 test-documentation
 * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
 * @compliance SOX §404 internal-controls process-walk-through
 * @accounting IFRS IAS-1 §54 minimum-line-items
 * @accounting US-GAAP ASC-705 cost-of-sales-and-services
 * @see ../../helpers/evidence.ts
 * @see ./README.md
 */

import { test } from '@playwright/test'
import { login } from '../../helpers/login'
import { testUser } from '../../helpers/seedUser'
import { captureWorkflowStep, recordUxGap, safeCaptureRoute } from '../../helpers/evidence'

const WORKFLOW = 'procure-to-pay'
const BASE = 'http://localhost:3000'

test.describe('ERP workflow: Procure-to-Pay', () => {
  test.describe.configure({ timeout: 180_000 })

  test('walk-through: vendor → PO → receipt → bill → payment', async ({ page }, testInfo) => {
    await login({ page, user: testUser })
    await captureWorkflowStep(page, testInfo, WORKFLOW, '00-dashboard',
      'Admin dashboard after login')

    // Step 1 — Vendors list.
    await safeCaptureRoute(page, testInfo, WORKFLOW, '01-vendors-list',
      `${BASE}/admin/collections/vendors`,
      'Vendors list view (entry point for P2P)')

    // Step 2 — New vendor form.
    await safeCaptureRoute(page, testInfo, WORKFLOW, '02-vendor-create',
      `${BASE}/admin/collections/vendors/create`,
      'New vendor create form')

    // Step 3 — Purchase Orders list.
    const posOk = await safeCaptureRoute(page, testInfo, WORKFLOW, '03-pos-list',
      `${BASE}/admin/collections/purchase-orders`,
      'Purchase Orders list view')
    if (posOk && (await page.getByText('Receipt status').count()) === 0) {
      recordUxGap(testInfo, WORKFLOW, '03-pos-list', 'minor',
        'No "Receipt status" column on PO list — buyers can\'t see at a glance which POs are awaiting goods receipt')
    }

    // Step 4 — Goods Receipts list (3-way match: PO + receipt + bill).
    await safeCaptureRoute(page, testInfo, WORKFLOW, '04-goods-receipts-list',
      `${BASE}/admin/collections/goods-receipts`,
      'Goods receipts list view')

    // Step 5 — Bills (Invoices ingested for AP).
    await safeCaptureRoute(page, testInfo, WORKFLOW, '05-bills-list',
      `${BASE}/admin/collections/invoices`,
      'Bills (vendor invoices) — AP ingest point')
    recordUxGap(testInfo, WORKFLOW, '05-bills-list', 'major',
      'No dedicated "Bills" collection / view — vendor invoices share the same `invoices` collection as customer invoices, forcing role-based filtering instead of a clean P2P workspace')

    // Step 6 — Payment Runs.
    await safeCaptureRoute(page, testInfo, WORKFLOW, '06-payment-runs-list',
      `${BASE}/admin/collections/payment-runs`,
      'Payment runs list view (batched AP disbursement)')

    // Step 7 — Journal entries (the GL impact).
    await safeCaptureRoute(page, testInfo, WORKFLOW, '07-journal-entries',
      `${BASE}/admin/collections/journal-entries`,
      'Journal entries list view (ledger evidence of the P2P cycle)')
  })
})
