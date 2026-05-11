# tests/e2e/standards/

Per-standard end-to-end walk-throughs grouped by standards family. Each spec
exercises a single standard's user-facing surface (the UI flow that produces
or consumes data conforming to the standard) and captures the walk-through
as multimedia evidence under `public/evidence/standards/`.

## Matrix layout

```
tests/e2e/standards/
├── iso-3166-1/                     # country-context UI flows
│   ├── default-country-bg.e2e.spec.ts
│   └── per-tenant-country-override.e2e.spec.ts
├── ifrs/                           # IFRS chart + IAS-1 / IAS-2 / IFRS-15 UI flows
│   ├── industry-template-pick.e2e.spec.ts
│   └── chart-of-accounts-render.e2e.spec.ts
├── compliance/                     # SOX § 404 / ISO-27001 / GDPR
│   ├── sox-404-evidence-trail.e2e.spec.ts
│   └── gdpr-data-subject-request.e2e.spec.ts
└── audit/                          # ISO-19011 / OECD SAF-T
    └── saf-t-export-flow.e2e.spec.ts
```

## Why this structure

The argument made by the project: **if every standard's user-facing surface
has an e2e walk-through that succeeds, the backend behind it cannot be
silently broken** — admin pages that 200 + render structured data are proof
the data layer (validators, hooks, services) all worked.

That doesn't make unit / integration tests obsolete (they're orders of
magnitude faster for tight feedback loops, and they pin contracts the UI
doesn't surface — e.g. cross-field invariants on a registry entry that
never reaches the admin form). What it does is **shift the burden of proof
upward**: every standard with a registry entry, every industry template,
every per-country compliance posture eventually needs a corresponding
walk-through here, otherwise the standard isn't actually proven through the
UI.

## Pattern for a new standards spec

```ts
import { test } from '@playwright/test'
import { login } from '../../helpers/login'
import { testUser } from '../../helpers/seedUser'
import { captureWorkflowStep, recordUxGap, safeCaptureRoute } from '../../helpers/evidence'

const STANDARD = '<standard-id>'  // e.g. 'iso-3166-1' / 'ifrs' / 'sox-404'
const FLOW = '<short-flow-name>'  // e.g. 'tenant-country-override'

test.describe(`Standard: ${STANDARD} — ${FLOW}`, () => {
  test.describe.configure({ timeout: 120_000 })

  test('walk-through', async ({ page }, testInfo) => {
    await login({ page, user: testUser })
    await safeCaptureRoute(page, testInfo, `${STANDARD}/${FLOW}`, '01-…',
      `${BASE}/admin/…`, '…')
    // …more steps, recordUxGap on missing affordances…
  })
})
```

Run with the multimedia project:

```sh
pnpm test:e2e:erp                            # erp-workflows + standards via the same project match
pnpm test:e2e:matrix                         # explicit alias for the full standards × categories matrix
```
