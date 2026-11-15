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
- Payload is `4.0.0-beta.9` on every `payload` and `@payloadcms/*` package, with TypeScript 6 and zod 4 (Payload's
  floors), Next `>=16.4.1` and Node `^24.22.3 || >=26.13.1`. `.node-version` sets Node for CI and Cloudflare Workers Builds.
- Majors held back on purpose: `eslint` 9, `recharts` 2, `@types/node` 24. A Dependabot PR that crosses one of these fails CI.
  Land its other bumps by hand.

## Agents work through Payload

- An agent is a user. It reaches erpax through the MCP gateway with that user's API key, and
  Payload's access control decides what it may read and write (roles held through `<role>@<app>`
  groups, per tenant). The gateway (`@payloadcms/plugin-mcp`, `src/payload.config.ts`) serves every
  collection through its generic tools (`getConfigInfo`, `getCollectionSchema`, `findDocuments`,
  `createDocuments`, `updateDocument`, `deleteDocuments`); which ones an agent can use is the user's
  roles, never a list in code or an environment flag. Enable the API key on the agent's user in the
  admin (`Authorization: users API-Key <key>`) and put it in `.env` as
  `ERPAX_API_KEY` (gitignored); the `erpax` connector reads it at connect time (`.mcp.json`
  `headersHelper` → `scripts/mcp-headers.sh`). `ERPAX_MCP_URL=http://localhost:3000/api/mcp` targets a
  local dev server.
- Agent memory is documents in `memories`: `kind` is `feedback`, `fact` or `reference`,
  `ownerType`/`ownerId` name the agent or tenant, and reusing a `key` supersedes the earlier
  memory. Agents talk in the per-tenant `chat` room; `messages` is mail between users. Guidance for
  models is each collection's `llmInstructions` (config) plus what editors save in the admin (data),
  returned by `getCollectionSchema`.
- Development is done by Payload, not by hand. Types, the import map and migrations come from
  Payload's generators (`pnpm generate:types`, `pnpm generate:importmap`, `pnpm payload:migrate:create`),
  and behaviour comes from the collections, hooks, access rules and jobs in the Payload config.
  When the API cannot do what an agent needs, the gap is a `memories` document with
  `kind: emerging_gap`: the MCP `afterToolCall` hook records every failed call (`src/plugins/mcp/gap`),
  and an agent records a need no tool covers the same way. It never works around the gap with
  `wrangler d1 execute`, direct SQL or throwaway scripts.

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
  `git diff --exit-code src/migrations`). Production D1 is the first place a migration runs. The history
  also cannot build a database from empty: no migration creates `payload_migrations`, because the
  schema began as a push (`20261113_153714_parties` applies on a fresh D1, the next insert fails).
- The CI build regenerates `src/payload-types.ts` and the import map but never compares them with the commit.
- Deploy is configured in the Cloudflare dashboard: there is no rollback step and no post-deploy smoke check.
- No publish workflow: `packages/released.json` is at 1.0.16, and the last tag is `v1.0.6`.
- No `.github/dependabot.yml`, so held majors arrive inside security PRs.
- CI runs only `tests/e2e/smoke.e2e.spec.ts` of the Playwright specs, and `pnpm standards:check` is not scheduled.
- `README.md` says it is generated by `src/readme/index.ts`, which no longer exists, so its figures are stale.
- Two mechanisms inject the content-uuid: collections built by `createAccountingCollection` get a
  required `uuid` (`src/utilities/integrity/tamper-proof-uuid-field.ts`), the rest get an optional one from
  the uuid plugin. Folding them into one rebuilds the column on every factory table.
- `auditFields` (`src/fields/relationship/auditFields.ts`) defines its own `createdBy` on 119 collections,
  so Payload 4's built-in authorship adds only `updatedBy` there. Moving to Payload's field is a data migration.
- `versionsPlugin` (`src/plugins/versions`) overlaps Payload 4, which enables versions by default; it now
  only bounds history to 50 and excludes four append-only collections.
- The demo content behind `/next/seed` and the fallback home page is Lexical JSON written as code
  (`src/seed/home.ts`, `post/*`, `image-*`, `contact/form.ts`), not fixtures loaded as data.
- Session worktrees fail here while the app's worktree location is inside the repo: `.claude` is a
  symlink to `src`. Set Settings → Claude Code → Worktree location to a folder outside the repo.

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
