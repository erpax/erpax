# `tests/`

After **Slice CCCCC-prep (2026-05-11)** every Vitest spec was co-located
next to its source file as `<Name>.test.ts`. This folder now holds only
the test surfaces that legitimately CANNOT co-locate: end-to-end
browser tests (Playwright owns its own dir convention) and run-time
artefacts.

```
tests/
├── e2e/         ← Playwright browser tests (playwright.config.ts owns this)
│                  *.e2e.spec.ts — exercise the full deployed app, not
│                  source files; cannot meaningfully sit next to any
│                  single src/ file.
├── helpers/     ← Playwright fixtures (login, evidence-screenshot,
│                  standards-fixtures) used by tests/e2e/.
├── evidence/    ← Playwright run artefacts: screenshots, traces,
│                  videos. gitignored. Auto-generated.
└── _attic/      ← Empty folders after the CCCCC-prep migration —
                   queued for `scripts/slice-f-delete-dead-stubs.sh`.
```

## How to run tests

```sh
# Vitest unit + integration (every co-located *.test.ts under src/):
pnpm vitest run

# A single co-located test:
pnpm vitest run src/plugins/accounting/seeds/chains/p2p-three-way-match.test.ts

# Playwright end-to-end:
pnpm playwright test
```

## Where did the old layout go?

| Old path                                                   | New path                                                                    |
|------------------------------------------------------------|-----------------------------------------------------------------------------|
| `tests/int/chains/p2p-three-way-match.int.spec.ts`         | `src/plugins/accounting/seeds/chains/p2p-three-way-match.test.ts`           |
| `tests/int/accounting/payroll-run-posting.int.spec.ts`     | `src/plugins/accounting/hooks/payroll-run-posting.test.ts`                  |
| `tests/int/receivables/aging.int.spec.ts`                  | `src/plugins/receivables/aging.test.ts`                                     |
| `tests/int/export/pdf.int.spec.ts`                         | `src/plugins/export/pdf.test.ts`                                            |
| `tests/int/utilities/scopes.int.spec.ts`                   | `src/utilities/scopes.test.ts`                                              |
| `tests/int/parties/aging.int.spec.ts`                      | `src/plugins/parties/aging.test.ts`                                         |
| `tests/int/api.int.spec.ts`                                | `src/payload.config.api.test.ts`                                            |
| `tests/int/tenant.int.spec.ts`                             | `src/payload.config.tenant.test.ts`                                         |
| `tests/standards/iso-19011/types.int.spec.ts`              | `src/standards/iso-19011/types.test.ts`                                     |
| `tests/standards/iso-3166-1/countries/bg-vat.int.spec.ts`  | `src/standards/iso-3166-1/countries/bg-vat.test.ts`                         |
| `tests/access/subscriptionGates.test.ts`                   | `src/access/subscriptionGates.test.ts`                                      |
| `tests/utilities/stripeWebhookHandlers.test.ts`            | `src/utilities/stripeWebhookHandlers.test.ts`                               |
| `tests/jobs/dunningJob.test.ts`                            | `src/jobs/dunningJob.test.ts`                                               |
| `tests/architecture/invariants.spec.ts`                    | `src/services/architecture-invariants/invariants.test.ts`                   |
| `tests/testing/test-setup.test.ts`                         | `src/testing/test-setup.test.ts`                                            |

**Why co-locate?** When `Foo.ts` moves, `Foo.test.ts` moves with it via a
single git rename — the test cannot drift away from its target. When a
file is deleted, its test is deleted in the same commit — no orphans.
When you read a file, its tests are one tab away. The whole convention
sets up the **CCCCC** spec generator (next slice): each `Foo.test.ts`
becomes a generator OUTPUT, derived from `Foo.ts`'s `@invariant` JSDoc
tags — with co-location the pairing is just two files in one folder.
