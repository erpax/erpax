/**
 * Order-to-Cash (O2C) workflow walk-through — captures the UX gap between
 * the accounting backend (invoices / journal entries) and the ERP front
 * (customer creation, quote → invoice → payment → revenue).
 *
 * Note: this project doesn't have a separate `orders` collection — quotes
 * convert directly to invoices. The workflow walk-through reflects that;
 * the absence of an Orders surface is itself a documented gap (see the
 * `recordUxGap` flag at step 04).
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
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @see ../../helpers/evidence.ts
 * @see ./README.md
 */

import { test } from '@playwright/test'
import { login } from '../../helpers/login'
import { testUser } from '../../helpers/seedUser'
import { captureWorkflowStep, recordUxGap, safeCaptureRoute } from '../../helpers/evidence'

const WORKFLOW = 'order-to-cash'
const BASE = 'http://localhost:3000'

test.describe('ERP workflow: Order-to-Cash', () => {
  test.describe.configure({ timeout: 180_000 })

  test('walk-through: customer → quote → invoice → payment', async ({ page }, testInfo) => {
    await login({ page, user: testUser })
    await captureWorkflowStep(page, testInfo, WORKFLOW, '00-dashboard',
      'Admin dashboard after login')

    // Step 1 — Customers list (entry point for O2C).
    await safeCaptureRoute(page, testInfo, WORKFLOW, '01-customers-list',
      `${BASE}/admin/collections/customers`,
      'Customers list view')

    // Step 2 — New customer form.
    await safeCaptureRoute(page, testInfo, WORKFLOW, '02-customer-create',
      `${BASE}/admin/collections/customers/create`,
      'New customer create form')

    // Step 3 — Quotes list (cross-collection nav from Customers).
    const quotesOk = await safeCaptureRoute(page, testInfo, WORKFLOW, '03-quotes-list',
      `${BASE}/admin/collections/quotes`,
      'Quotes list view')
    if (quotesOk && (await page.getByText('Convert to Invoice').count()) === 0) {
      recordUxGap(testInfo, WORKFLOW, '03-quotes-list', 'major',
        'No "Convert to Invoice" CTA visible from the quotes list — converting requires manual collection-switching')
    }

    // Step 4 — UX gap: no separate `orders` collection in this project.
    // Quote → Invoice is direct (no order stage). Flag it as a documented
    // architectural choice for reviewers.
    recordUxGap(testInfo, WORKFLOW, '04-orders-stage', 'info',
      'No separate `orders` collection — Quote converts directly to Invoice. Reviewer: confirm whether an explicit Order stage is wanted for ERP customers who need PO matching / partial fulfillment')

    // Step 5 — New quote form.
    await safeCaptureRoute(page, testInfo, WORKFLOW, '05-quote-create',
      `${BASE}/admin/collections/quotes/create`,
      'New quote form')

    // Step 6 — Invoices list (the accounting handoff).
    const invoicesOk = await safeCaptureRoute(page, testInfo, WORKFLOW, '06-invoices-list',
      `${BASE}/admin/collections/invoices`,
      'Invoices list view (handoff to accounting)')
    if (invoicesOk && (await page.getByText('Source quote').count()) === 0) {
      recordUxGap(testInfo, WORKFLOW, '06-invoices-list', 'minor',
        'No "Source quote" column on invoices list — operations can\'t see at a glance which invoices originated from quotes')
    }

    // Step 7 — Payments list.
    await safeCaptureRoute(page, testInfo, WORKFLOW, '07-payments-list',
      `${BASE}/admin/collections/payments`,
      'Payments list view (cash leg of revenue cycle)')

    // Step 8 — Journal entries (the GL impact).
    const jeOk = await safeCaptureRoute(page, testInfo, WORKFLOW, '08-journal-entries',
      `${BASE}/admin/collections/journal-entries`,
      'Journal entries list view (ledger evidence of the O2C cycle)')
    if (jeOk && (await page.getByText('Source document').count()) === 0) {
      recordUxGap(testInfo, WORKFLOW, '08-journal-entries', 'minor',
        'No "Source document" column on JE list — auditors can\'t see which invoice / payment generated each entry without opening rows')
    }
  })
})
