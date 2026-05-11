# ERP Workflow Multimedia Tests

Captures the gap between **accounting** (the backend ledger) and **ERP** (the
operational workflows that produce ledger rows) as durable multimedia evidence.
Each spec walks an end-to-end business workflow through the Payload admin UI
and records:

- **Per-step PNG** at every meaningful UX boundary
  (`tests/evidence/workflows/<workflow>/<step>.png`)
- **Per-test video** (`tests/evidence/test-results/.../video.webm`)
- **Per-test trace** (`tests/evidence/test-results/.../trace.zip`)
- **Per-test annotations** — `step:` for milestones, `gap:<severity>:` for
  UX issues spotted during the walk-through

## Workflows covered

| Spec | Workflow | Cycle |
|---|---|---|
| `order-to-cash.e2e.spec.ts` | O2C | Customer → Quote → Order → Invoice → Payment → AR → Revenue |
| `procure-to-pay.e2e.spec.ts` | P2P | Vendor → Purchase Order → Goods Receipt → Bill → Payment → AP → Expense |
| `record-to-report.e2e.spec.ts` | R2R | Trial Balance → Adjustments → Close → Statements → Filing |

## Running

```sh
pnpm test:e2e --project=erp-workflows-multimedia
```

The `erp-workflows-multimedia` project (`playwright.config.ts`) sets
`video: 'on'`, `screenshot: 'on'`, `trace: 'on'`, and `slowMo: 150` so the
recordings are watchable as walk-through evidence.

## Reviewing the evidence pack

After a run:

1. Open `tests/evidence/_report/index.html` for the navigable report
2. Each test's annotations panel shows the step list + any `gap:*` flags
3. Per-step PNGs live under `tests/evidence/workflows/<workflow>/`
4. Trace files (`.zip`) open in `npx playwright show-trace <path>`

## Recording a UX gap

Use `recordUxGap` from `tests/helpers/evidence.ts` to flag missing or rough
UX during the walk-through without failing the test:

```ts
recordUxGap(testInfo, 'order-to-cash', '03-quote-to-order',
  'major', 'No "Convert to Order" CTA on the Quote edit page')
```

Severity levels: `info`, `minor`, `major`, `blocker`. The HTML report groups
them so the reviewer can scan the artifact pack and see everything flagged.
