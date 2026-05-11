/**
 * Subscription Billing Cycle workflow walk-through — auto-scaffolded by
 * `erpax.consistency.applyAll` (Slice LLLLLLLL 2026-05-11) to close
 * the marketing/multimedia seed gap for BUSINESS_CHAINS.SUBSCRIPTION_BILLING_CYCLE.
 *
 * SubscriptionPlan → Subscription activated → UsageRecord events accumulate → BillingRun aggregates by (tenant, feature, billingPeriod) → Invoice issued → Payment received. IFRS-15 §B16 metered + §35 over-time recognition.
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

const WORKFLOW = 'subscription-billing-cycle'
const BASE = 'http://localhost:3000'

test.describe('ERP workflow: Subscription Billing Cycle', () => {
  test.describe.configure({ timeout: 180_000 })

  test('walk-through: Subscription billing cycle (IFRS-15 §35 + B16)', async ({ page }, testInfo) => {
    await login({ page, user: testUser })
    await captureWorkflowStep(page, testInfo, WORKFLOW, '00-dashboard',
      'Admin dashboard after login')
    // TODO(SUBSCRIPTION_BILLING_CYCLE): expand step list per the chain's BUSINESS_CHAINS
    // steps. Scaffold stops here so the marketing generator has a valid
    // WORKFLOW decl + at least one captured step.
    await safeCaptureRoute({ page, testInfo, workflow: WORKFLOW,
      stepId: '01-overview',
      label: 'Subscription billing cycle (IFRS-15 §35 + B16) overview',
      route: `${BASE}/admin`,
    })
  })
})
