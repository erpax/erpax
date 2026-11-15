# erpax

A Payload CMS application (Next.js, Cloudflare Workers, D1). Everything under `src/` is reached
from `src/payload.config.ts`, the app routes in `src/app`, or the middleware.

## Work the Payload way

- Collections, fields, hooks, access and plugins are configured in `src/payload.config.ts` and the
  folders it imports. Prefer Payload's defaults and official plugins over custom code.
- Data that is not code is a seed. Documents live in `src/seed/content/fixtures/documents.json` and
  load as nested pages: `pnpm seed --url <origin> --documents src/seed/content/fixtures/documents.json`.
- Schema changes go through Payload migrations (`pnpm payload:migrate:create`), never hand-run SQL.
- The MCP gateway at `/api/mcp` is the official `@payloadcms/plugin-mcp` over the collections.

## Commands

| Command | Does |
| --- | --- |
| `pnpm dev` | Next dev server (`PAYLOAD_DEV_PUSH=false pnpm dev` to skip schema push) |
| `pnpm generate:types` · `pnpm generate:importmap` | Payload's generated files |
| `pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm test:e2e` | Checks (CI runs the same) |
| `pnpm build` | Types, import map, production build |
| `pnpm deploy` | Migrate production D1, then build and upload the Worker |

`main` accepts pull requests only (squash), with six required checks.

## Versions

- Change a dependency's version only in the root `package.json` (and an override in
  `pnpm-workspace.yaml`). Every `packages/*/package.json` names its dependencies at the root's range
  (`packages/range.mjs`). The pre-commit hook rewrites the package manifests and the lockfile, and
  `pnpm lint` fails on drift (`node packages/release.mjs --ranges`, with `--write` to fix).
- Payload's own monorepo keeps shared versions in a pnpm `catalog:` and its packages use
  `workspace:*`. Conventions for plugins, hooks and `req.context` are in
  [payloadcms/skills](https://github.com/payloadcms/skills) (`skills/payload/reference/`).
- Majors held back on purpose: `zod` 3 (`@payloadcms/plugin-mcp` pins `^3.25.50`), `typescript` 5,
  `eslint` 9, `recharts` 2, `@types/node` 24. A Dependabot PR that crosses one of these fails CI.
  Land its other bumps by hand.

## Pipelines

| Where | Runs |
| --- | --- |
| pre-commit (`.husky`) | Payload types + import map when `src/**/*.ts` is staged; package ranges + lockfile when `package.json` or `pnpm-workspace.yaml` is staged |
| pre-push | `pnpm lint` · `pnpm typecheck` |
| CI (`.github/workflows/ci.yml`) | standards banner · lint · typecheck · tests ×4 (shard 2 runs `release.mjs --check`) · Playwright smoke · lean build |
| Cloudflare Workers Builds (dashboard) | on `main`: build, `payload migrate` on production D1, deploy. Its check on a PR branch fails at once and is not required |

Gaps found on 2026-11-15:

- Migrations never run in CI (tests set `PAYLOAD_DEV_PUSH=true` and `PAYLOAD_TEST_SKIP_MIGRATE=1`), and
  nothing checks that the schema has a migration (`pnpm payload migrate:create --skip-empty`, then
  `git diff --exit-code src/migrations`). Production D1 is the first place a migration runs.
- The CI build regenerates `src/payload-types.ts` and the import map but never compares them with the commit.
- Deploy is configured in the Cloudflare dashboard: there is no rollback step and no post-deploy smoke check.
- No publish workflow: `packages/released.json` is at 1.0.16, and the last tag is `v1.0.6`.
- No `.github/dependabot.yml`, so held majors arrive inside security PRs.
- Payload is pinned at `4.0.0-internal.38b7f1d`. Upstream `4.0.0-beta.9` ships zod `^4.6.0`, which
  clears GHSA-mrhx-c7xc-m3w5.
- CI runs only `tests/e2e/smoke.e2e.spec.ts` of the Playwright specs, and `pnpm standards:check` is not scheduled.

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
