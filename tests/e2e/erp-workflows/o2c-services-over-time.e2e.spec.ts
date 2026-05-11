/**
 * O2c Services Over Time workflow walk-through — auto-scaffolded by
 * `erpax.consistency.applyAll` (Slice LLLLLLLL 2026-05-11) to close
 * the marketing/multimedia seed gap for BUSINESS_CHAINS.O2C_SERVICES_OVER_TIME.
 *
 * Opportunity → Contract → PerformanceObligation → Project → ProjectTask + TimeEntry posted → period-end WipSnapshot → MilestoneInvoice → Payment. IFRS-15 §35 over-time + cost-to-cost progress.
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

const WORKFLOW = 'o2c-services-over-time'
const BASE = 'http://localhost:3000'

test.describe('ERP workflow: O2c Services Over Time', () => {
  test.describe.configure({ timeout: 180_000 })

  test('walk-through: Order-to-Cash (services / over-time)', async ({ page }, testInfo) => {
    await login({ page, user: testUser })
    await captureWorkflowStep(page, testInfo, WORKFLOW, '00-dashboard',
      'Admin dashboard after login')
    // TODO(O2C_SERVICES_OVER_TIME): expand step list per the chain's BUSINESS_CHAINS
    // steps. Scaffold stops here so the marketing generator has a valid
    // WORKFLOW decl + at least one captured step.
    await safeCaptureRoute({ page, testInfo, workflow: WORKFLOW,
      stepId: '01-overview',
      label: 'Order-to-Cash (services / over-time) overview',
      route: `${BASE}/admin`,
    })
  })
})
