/**
 * Public-content category orchestrator — iterates every seed registered
 * with `category: 'public-content'` and walks the rendered frontend pages
 * those seeds populate.
 *
 * Unlike the admin-data spec (which captures /admin/collections/<slug>
 * list views), this one captures the actual frontend rendering — the page
 * the public visitor sees at `/<locale>/<slug>`.
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @standard W3C HTML5 article-section-elements
 * @audit ISO-19011:2018 audit-trail visual-evidence
 * @compliance WCAG-2.1 §1.3.1 info-and-relationships
 * @compliance SOX §404 internal-controls process-walk-through
 * @see src/collections/Pages/index.ts
 * @see src/plugins/accounting/seeds/level-1/minimal-accounting-seeds.ts (MinimalPagesSeed)
 * @see src/plugins/accounting/seeds/level-2/documentation-pages.ts
 */

import { test } from '@playwright/test'
import { safeCaptureRoute } from '../../helpers/evidence'
import { getSeedsByCategory } from '@/testing'

import '@/plugins/accounting/seeds'

const CATEGORY = 'public-content' as const
const BASE = 'http://localhost:3000'

/**
 * Frontend routes each public-content seed renders. The list captures the
 * canonical page paths the seed populates so the walk-through can hit the
 * rendered output (not just the admin edit view).
 */
const SEED_TO_FRONTEND_ROUTES: Record<string, ReadonlyArray<{ path: string; label: string }>> = {
  'level-1.minimal-pages': [
    { path: '/', label: 'home' },
    { path: '/about', label: 'about' },
    { path: '/team', label: 'team' },
  ],
  'level-2.documentation-pages': [
    { path: '/platform', label: 'platform-overview' },
    { path: '/platform/seed-architecture', label: 'seed-architecture' },
    { path: '/platform/industry-templates', label: 'industry-templates' },
    { path: '/platform/per-country-compliance', label: 'per-country-compliance' },
    { path: '/platform/erp-workflows-evidence', label: 'erp-workflows-evidence' },
  ],
}

const seeds = getSeedsByCategory(CATEGORY)

test.describe(`Category orchestrator: ${CATEGORY}`, () => {
  test.describe.configure({ timeout: 180_000 })

  for (const seed of seeds) {
    const routes = SEED_TO_FRONTEND_ROUTES[seed.id] ?? []
    if (routes.length === 0) {
      // Public-content seed with no mapped routes — capture admin list as fallback.
      test(`captures admin fallback for ${seed.id}`, async ({ page }, testInfo) => {
        await safeCaptureRoute(page, testInfo, `categories/${CATEGORY}`, seed.id,
          `${BASE}/admin/collections/pages`,
          `${seed.id}: ${seed.description} (no frontend route mapped)`)
      })
      continue
    }

    for (const route of routes) {
      test(`captures frontend ${route.label} from ${seed.id}`, async ({ page }, testInfo) => {
        await safeCaptureRoute(page, testInfo, `categories/${CATEGORY}`,
          `${seed.id}-${route.label}`, `${BASE}${route.path}`,
          `${seed.id} → ${route.label}`)
      })
    }
  }
})
