# tests/e2e/categories/

Per-UI-category orchestrator specs — one spec per `SeedUiCategory`, each
iterates the seeds registered with that category (`getSeedsByCategory`)
and walks the admin UI surfaces those seeds populate.

```
tests/e2e/categories/
├── admin-data.e2e.spec.ts            # iterates `admin-data` seeds + admin views
├── public-content.e2e.spec.ts        # iterates `public-content` seeds + frontend pages
├── cross-cutting.e2e.spec.ts         # tenants / users surfaces (both UIs)
└── compliance-evidence.e2e.spec.ts   # full-cycle / multi-entity / scenario walk-throughs
```

## Why per-category orchestrators

Adding a new seed (with `registerSeedCategory({ category: 'admin-data', … })`)
automatically extends the matching orchestrator's coverage — no parallel
list of "tests to run" to maintain. The orchestrator + the registry are
the only two surfaces; the spec body is one `for (const seed of …)` loop.

## Pattern

```ts
import { test } from '@playwright/test'
import { getSeedsByCategory } from '@/testing'
// …

const seeds = getSeedsByCategory('admin-data')

test.describe('Category: admin-data', () => {
  for (const seed of seeds) {
    test(`covers ${seed.id} (${seed.description})`, async ({ page }, testInfo) => {
      // walk the admin UI surface that this seed populates
    })
  }
})
```

Run with `pnpm test:e2e:matrix`.
