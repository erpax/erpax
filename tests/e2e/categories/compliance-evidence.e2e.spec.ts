/**
 * Compliance-evidence category orchestrator — Level-3 e2e seeds whose
 * primary purpose is the SOX §404 / ISO-19011 evidence pack.
 *
 * Each seed produces full-cycle / multi-entity / real-world data; this
 * walk-through captures the canonical admin views where auditors would
 * inspect that evidence (trial balances, financial statements, audit
 * findings, journal entries with sign-off).
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @standard OECD SAF-T 2.0 audit-file
 * @audit ISO-19011:2018 audit-trail visual-evidence
 * @compliance SOX §404 internal-controls process-walk-through
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-810 consolidation
 * @see src/plugins/accounting/seeds/level-3/e2e-accounting-seeds.ts
 */

import { test } from '@playwright/test'
import { login } from '../../helpers/login'
import { testUser } from '../../helpers/seedUser'
import { safeCaptureRoute } from '../../helpers/evidence'
import { getSeedsByCategory } from '@/testing'

import '@/plugins/accounting/seeds'

const CATEGORY = 'compliance-evidence' as const
const BASE = 'http://localhost:3000'

/**
 * Each compliance-evidence seed surfaces in multiple admin views — the
 * walk-through captures the most audit-relevant ones in sequence.
 */
const SEED_TO_EVIDENCE_ROUTES: Record<
  string,
  ReadonlyArray<{ path: string; label: string }>
> = {
  'level-3.full-accounting-cycle': [
    { path: '/admin/collections/journal-entries', label: 'journal-entries' },
    { path: '/admin/collections/trial-balances', label: 'trial-balances' },
    { path: '/admin/collections/financial-statements', label: 'financial-statements' },
    { path: '/admin/collections/account-reconciliations', label: 'reconciliations' },
  ],
  'level-3.multi-entity': [
    { path: '/admin/collections/tenants', label: 'subsidiaries' },
    { path: '/admin/collections/intercompany-transactions', label: 'intercompany' },
    { path: '/admin/collections/consolidation-eliminations', label: 'eliminations' },
  ],
  'level-3.real-world-scenario': [
    { path: '/admin/collections/rounding-adjustments', label: 'rounding-adjustments' },
    { path: '/admin/collections/prior-period-adjustments', label: 'prior-period-adjustments' },
    { path: '/admin/collections/transaction-failures', label: 'transaction-failures' },
  ],
  'level-3.suite': [{ path: '/admin/collections/audit-findings', label: 'audit-findings' }],
}

const seeds = getSeedsByCategory(CATEGORY)

test.describe(`Category orchestrator: ${CATEGORY}`, () => {
  test.describe.configure({ timeout: 240_000 })

  for (const seed of seeds) {
    const routes = SEED_TO_EVIDENCE_ROUTES[seed.id] ?? [
      { path: '/admin/collections/journal-entries', label: 'journal-entries-fallback' },
    ]
    for (const route of routes) {
      test(`captures evidence ${route.label} from ${seed.id}`, async ({ page }, testInfo) => {
        await login({ page, user: testUser })
        await safeCaptureRoute(page, testInfo, `categories/${CATEGORY}`,
          `${seed.id}-${route.label}`, `${BASE}${route.path}`,
          `${seed.id} → ${route.label}`)
      })
    }
  }
})
