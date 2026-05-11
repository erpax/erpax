/**
 * Multi Vendor Pr Split Award workflow walk-through — auto-scaffolded by
 * `erpax.consistency.applyAll` (Slice LLLLLLLL 2026-05-11) to close
 * the marketing/multimedia seed gap for BUSINESS_CHAINS.MULTI_VENDOR_PR_SPLIT_AWARD.
 *
 * Single purchase requisition for 100 units; 3 vendor quotes returned (best price, best lead-time, certified vendor). Award split: 60 units to lowest-price vendor, 40 units to fastest. Two separate POs created. SOX §404 + OECD BEPS Action 13 — split rationale captured per quote.
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

const WORKFLOW = 'multi-vendor-pr-split-award'
const BASE = 'http://localhost:3000'

test.describe('ERP workflow: Multi Vendor Pr Split Award', () => {
  test.describe.configure({ timeout: 180_000 })

  test('walk-through: Multi-vendor PR split award', async ({ page }, testInfo) => {
    await login({ page, user: testUser })
    await captureWorkflowStep(page, testInfo, WORKFLOW, '00-dashboard',
      'Admin dashboard after login')
    // TODO(MULTI_VENDOR_PR_SPLIT_AWARD): expand step list per the chain's BUSINESS_CHAINS
    // steps. Scaffold stops here so the marketing generator has a valid
    // WORKFLOW decl + at least one captured step.
    await safeCaptureRoute({ page, testInfo, workflow: WORKFLOW,
      stepId: '01-overview',
      label: 'Multi-vendor PR split award overview',
      route: `${BASE}/admin`,
    })
  })
})
