/**
 * Multi Invoice Payment Allocation workflow walk-through — auto-scaffolded by
 * `erpax.consistency.applyAll` (Slice LLLLLLLL 2026-05-11) to close
 * the marketing/multimedia seed gap for BUSINESS_CHAINS.MULTI_INVOICE_PAYMENT_ALLOCATION.
 *
 * Customer settles 3 outstanding invoices in one wire transfer. PaymentAllocations bridge splits the single payment across the three invoices; each allocation triggers per-invoice `invoice:completed` when its allocated amount fully settles. SOX §404 TOM-AR-02 walks Σ(allocations) → payment.amount.
 *
 * Each step uses `safeCaptureRoute` so a missing collection / 404 /
 * admin error state records a `gap:blocker` annotation instead of
 * failing the whole test — the walk-through continues to produce
 * evidence for every later step.
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @audit ISO-19011:2018 audit-trail visual-evidence ux-gap-finding
 * @see ../../helpers/evidence.ts
 */
import { test } from '@playwright/test'
import { login } from '../../helpers/login'
import { testUser } from '../../helpers/seedUser'
import { captureWorkflowStep, safeCaptureRoute } from '../../helpers/evidence'

const WORKFLOW = 'multi-invoice-payment-allocation'
const BASE = 'http://localhost:3000'

test.describe('ERP workflow: Multi Invoice Payment Allocation', () => {
  test.describe.configure({ timeout: 180_000 })

  test('walk-through: Multi-invoice payment allocation', async ({ page }, testInfo) => {
    await login({ page, user: testUser })
    await captureWorkflowStep(page, testInfo, WORKFLOW, '00-dashboard',
      'Admin dashboard after login')
    // TODO(MULTI_INVOICE_PAYMENT_ALLOCATION): expand step list per the chain's BUSINESS_CHAINS
    // steps. Scaffold stops here so the marketing generator has a valid
    // WORKFLOW decl + at least one captured step.
    await safeCaptureRoute({ page, testInfo, workflow: WORKFLOW,
      stepId: '01-overview',
      label: 'Multi-invoice payment allocation overview',
      route: `${BASE}/admin`,
    })
  })
})
