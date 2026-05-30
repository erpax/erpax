---
name: dev
description: Use to run, start, launch, boot, dev-serve, smoke-test, or screenshot the erpax app (Payload 4 + Next.js on Cloudflare D1/R2). Drives the running app two ways — a Local API smoke (tsx) for backend/service/collection/hook changes, and a Playwright browser driver for the public frontend + admin. Use when asked to "run erpax", "start the dev server", "screenshot the site", or confirm a change works in the real app.
sessions:
  - 72427c9e-072d-492f-9706-07aeb29724b2
---

# run/dev — launch & drive the app locally

erpax is a multi-tenant accounting platform: **Payload 4 CMS + Next.js 16**, backed
by **Cloudflare D1** (SQLite) and R2, served in prod via OpenNext/workerd. Locally
there is no remote dependency — Payload talks to a **local Miniflare D1 sqlite** under
`.wrangler/state/`.

Two committed harnesses drive it. **Pick by the layer your change touches:**

| Change touches… | Use | Why |
|---|---|---|
| services, collections, hooks, GL, tax, the DB (**most PRs**) | **`smoke.ts`** (Local API) | boots Payload headless, queries the real local DB, no HTTP server |
| public frontend / SSR pages | **`driver.mjs`** (Playwright) | launches Chromium against `pnpm dev`, screenshots to disk |
| the Payload **admin panel** | — | ⚠️ **broken in `next dev`** today — see Gotchas |

> All paths below are relative to the repo root (`/Users/ceci/github/erpax/erpax`).
> The harness lives at `.claude/skills/run/dev/`. Run every command from the repo root.

## Prerequisites

```bash
pnpm install --frozen-lockfile          # Node ^20.9 || >=18.20 ; pnpm 11.x ("Already up to date" if set)
pnpm exec playwright install chromium   # browser for driver.mjs (no-op if already installed)
```

`.env` must hold `PAYLOAD_SECRET` (already present here; `pnpm setup` scaffolds it on a
fresh clone). No Cloudflare account or login is needed for local dev.

## Database / schema (read this before launching)

The local D1 sqlite already has the schema applied. **Launch with dev-push OFF** so
Payload serves against the existing schema instead of re-pushing:

```bash
PAYLOAD_DEV_PUSH=false pnpm dev          # the reliable steady-state launch
```

Plain `pnpm dev` turns dev-push ON, which is **not idempotent** — on an already-created
schema it crashes with `D1_ERROR: index invoices_uuid_idx already exists`. Only use plain
`pnpm dev` when the schema is genuinely missing/stale (it then creates the missing tables
— and may reset some local rows). See Gotchas.

## Run — backend (agent path, covers most PRs)

`smoke.ts` boots Payload via the Local API against the local D1, with **no HTTP server**.
**Stop `pnpm dev` first** — both open the same sqlite and will fight over the lock.

```bash
pnpm exec tsx .claude/skills/run/dev/smoke.ts
```

Verified output (warnings about Durable Object classes are harmless — see Gotchas):

```
[smoke] Payload booted. 219 collections registered.
[smoke] count(tenants) = 11
[smoke] count(users) = 1
[smoke] count(pages) = 0
[smoke] count(posts) = 0
[smoke] users: [ 'dev@payloadcms.com' ]
[smoke] OK
```

**To exercise your own change**, copy the boot block from `smoke.ts` into a scratch
`.ts` and call any service / `payload.find|create|update`. The block order is load-bearing
(an ESM trap — see Gotchas): `createRequire` shim → `dotenv` → set env → **dynamic**-import
`payload` + `@payload-config` → `getPayload`.

## Run — frontend + screenshots (agent path)

Start the dev server (steady-state launch above), then drive Chromium with `driver.mjs`.
Screenshots land in `/tmp/erpax-run/` (override with `SHOT_DIR`).

```bash
PAYLOAD_DEV_PUSH=false pnpm dev &                      # serves http://localhost:3000
node .claude/skills/run/dev/driver.mjs home          # screenshot the public site (/en) -> 200
node .claude/skills/run/dev/driver.mjs shot /en      # any path -> screenshot in SHOT_DIR
node .claude/skills/run/dev/driver.mjs admin         # logs in (dev@payloadcms.com/test); see Gotchas
```

`driver.mjs home` against the running server prints `-> 200 .../en  saved /tmp/erpax-run/home.png`
and writes a real render of the public frontend ("Payload Website Template"). **Look at the
PNG** — a Next.js error overlay there means the page 500'd.

Stop the server when done:

```bash
kill $(lsof -nP -iTCP:3000 -sTCP:LISTEN -t)
```

## Run — human path

```bash
pnpm dev            # http://localhost:3000  (Turbopack; Ctrl-C to stop)
```

Open `http://localhost:3000` → redirects to `/en` (the public site). `http://localhost:3000/admin`
is the Payload admin — **but it currently errors in dev** (Gotchas). The login user is
`dev@payloadcms.com` / `test`.

## Test

Co-located `src/**/*.test.ts`, run via vitest. Scope to a path; `PAYLOAD_TEST_SKIP_MIGRATE=1`
skips the pre-test `payload migrate` (safe once the schema is applied):

```bash
PAYLOAD_TEST_SKIP_MIGRATE=1 pnpm exec vitest run --config ./vitest.config.mts src/standards/iso-4217 src/standards/iso-9362
```

The full suites are `pnpm test:int` (every integration test — boots Payload like `smoke.ts`,
slow) and `pnpm test:e2e` (Playwright; needs a dev server on :3000 — its admin specs hit the
broken-in-dev admin, see Gotchas).

## Gotchas

- **The admin panel does not render in `next dev`.** Both bundlers fail, reproducibly:
  - Turbopack (`pnpm dev`): `chunk.reason.enqueueModel is not a function` in the Payload
    `RootLayout` (`src/app/(payload)/layout.tsx:26`).
  - Webpack (`next dev --webpack`): `Module not found: Can't resolve 'worker_threads'` — a
    `'use client'` component (`src/components/BeforeDashboard/SeedButton/index.tsx`) imports
    the `@/utilities/errors` barrel, which re-exports `createAppApiError` →
    `import { APIError } from 'payload'` (server-only pino logger). The barrel drags server
    code into the client bundle.

  The **public frontend and the Local API/REST both work** — drive those. (`next build`
  uses `--webpack` deliberately; the deployed admin is a separate, unverified path.)
- **dev-push is not idempotent.** `PAYLOAD_DEV_PUSH=false` is the steady-state launch.
  With push ON on an existing schema → `index ... already exists`. With push OFF on a
  *stale* schema → `D1_ERROR: no such table: orders` (the symptom that tells you the config
  gained a collection/global the local DB doesn't have yet).
- **ESM import-order trap (standalone tsx scripts).** Static `import`s hoist above top-level
  code, so `process.env.X = …` and `dotenv` run *after* `@payload-config` already read the
  env. `smoke.ts` works around it with all-dynamic imports. Also: a boot invariant
  (`src/services/agents/mcp/dry-clean.ts`) calls `require('node:crypto')`, which is undefined
  under pure ESM and **crashes the boot** (`payload.config.ts` `onInit` re-throws it) — hence
  the `globalThis.require ??= createRequire(...)` shim at the top of `smoke.ts`.
- **Don't run `smoke.ts` while `pnpm dev` is up.** Same local D1 sqlite → `SQLITE_BUSY`.
- **`workerd … no such Durable Object class is exported` warnings** (AuditChain, JobLock,
  RateLimiter, TenantQuotaCounter, ErpaxStateDO) print on every Local API boot. **Harmless**
  locally — those DO classes live in the deployed worker, not the dev/CLI binding.
- **First `/admin` (or first page) compile is slow** (~30s under dev). The driver allows 90s.

## Troubleshooting

| Symptom | Fix |
|---|---|
| `D1_ERROR: no such table: orders` (or `header`) on every page | Schema is stale. Run plain `pnpm dev` **once** to dev-push the missing tables, then go back to `PAYLOAD_DEV_PUSH=false pnpm dev`. |
| `D1_ERROR: index invoices_uuid_idx already exists` | You launched with dev-push ON over an existing schema. Use `PAYLOAD_DEV_PUSH=false pnpm dev`. |
| `missing secret key` from `getPayload` | `PAYLOAD_SECRET` not loaded. `smoke.ts` loads `.env` via dotenv; for ad-hoc runs `export PAYLOAD_SECRET=$(grep ^PAYLOAD_SECRET .env \| cut -d= -f2)`. |
| `ReferenceError: require is not defined` booting Payload from tsx | Add `globalThis.require ??= createRequire(import.meta.url)` before importing the config (see `smoke.ts`). |
| `cross-env: command not found` | It's a local bin. Set env inline (`NODE_OPTIONS=… pnpm exec next …`) or run via the `pnpm dev` script, not a bare `cross-env`. |
| `driver.mjs` → `ERR_CONNECTION_REFUSED` | Dev server isn't up yet. Wait for `✓ Ready` in the dev log / `curl -s localhost:3000`. |
| admin screenshot shows a runtime error overlay | Expected today — see Gotchas. The public-site screenshot is the working GUI proof. |

## The harnesses

- `driver.mjs` — Playwright browser driver. Commands: `home`, `admin`, `shot <path> [out]`,
  `all`. Env: `BASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SHOT_DIR`, `HEADED=1`.
- `smoke.ts` — Local API headless boot + read smoke. Adapt it to call any service/fn.

Related: [[deploy]] (the prod sibling — `payload migrate`, no dev-push) · [[database]]
(adapter, migrations, the dev-push behaviour) · [[bindings]] (D1/R2/Durable Objects — the
`no such Durable Object class` warnings) · [[api]] (the Local API ops `smoke.ts` calls).
