/**
 * Consignment Cycle workflow walk-through — auto-scaffolded by
 * `erpax.consistency.applyAll` (Slice LLLLLLLL 2026-05-11) to close
 * the marketing/multimedia seed gap for BUSINESS_CHAINS.CONSIGNMENT_CYCLE.
 *
 * Consignment arrangement signed → goods shipped to consignee → on-hand balance maintained at consignee location → consignee reports sale to end-customer → consignor recognises revenue + COGS + commission expense (control transfers per IFRS-15 §B78).
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

const WORKFLOW = 'consignment-cycle'
const BASE = 'http://localhost:3000'

test.describe('ERP workflow: Consignment Cycle', () => {
  test.describe.configure({ timeout: 180_000 })

  test('walk-through: Consignment cycle', async ({ page }, testInfo) => {
    await login({ page, user: testUser })
    await captureWorkflowStep(page, testInfo, WORKFLOW, '00-dashboard',
      'Admin dashboard after login')
    // TODO(CONSIGNMENT_CYCLE): expand step list per the chain's BUSINESS_CHAINS
    // steps. Scaffold stops here so the marketing generator has a valid
    // WORKFLOW decl + at least one captured step.
    await safeCaptureRoute({ page, testInfo, workflow: WORKFLOW,
      stepId: '01-overview',
      label: 'Consignment cycle overview',
      route: `${BASE}/admin`,
    })
  })
})
