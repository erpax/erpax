# public/evidence/

Multimedia evidence pack produced by the e2e suite — screenshots, videos,
Playwright traces, and the navigable HTML report. Lives under `public/` so
the deployed Worker serves the multimedia evidence as **static public
assets** — every captured walk-through is accessible at `/evidence/...` on
the live URL (e.g. `https://erpax.ceci.workers.dev/evidence/_report/`).

Binary artifacts (PNGs, WebMs, traces) are gitignored — regenerate locally.
The folder structure (this README + `.gitignore`) is committed so the
deployed app always has the path even before the first run.

## Layout (after a run)

```
public/evidence/
├── workflows/                       # per-step PNGs from ERP workflow specs
│   ├── order-to-cash/
│   │   ├── 00-dashboard.png
│   │   ├── 01-customers-list.png
│   │   └── …
│   ├── procure-to-pay/…
│   └── record-to-report/…
├── admin-pages/                     # per-admin-page PNGs from admin-evidence spec
│   ├── dashboard.png
│   ├── collections-tenants.png
│   └── …
├── standards/                       # one canonical sample artifact per standard (camt053, saf-t, edifact)
├── test-results/                    # per-test video.webm + trace.zip
└── _report/                         # navigable HTML reporter root (open index.html)
```

## Running

```sh
# Standard e2e (admin walk-through, frontend, etc.)
pnpm test:e2e --project=chromium

# ERP workflow multimedia (UX gap-finding) — produces video + screenshots + traces
pnpm test:e2e:erp
```

## Reviewing as evidence

Locally:
1. Open `public/evidence/_report/index.html`
2. Each test's annotations panel lists `step:` milestones + any `gap:*` flags
3. Open per-test trace: `pnpm exec playwright show-trace public/evidence/test-results/.../trace.zip`

Live (after deploy):
- Visit `https://<worker-url>/evidence/_report/index.html` — same report,
  shareable link, no checkout needed for stakeholders.

## UX gaps recorded by the suite

The workflow specs surface UX gaps via `recordUxGap(testInfo, workflow, step, severity, message)`:

| Severity | Meaning |
|---|---|
| `info` | Architectural choice worth confirming (e.g. "no separate Orders collection — Quote → Invoice direct") |
| `minor` | Missing column / convenience affordance |
| `major` | Missing core CTA / forces multi-step workaround |
| `blocker` | Route 404s / page never renders — workflow can't complete |

Annotations show up grouped in the Playwright HTML report.
