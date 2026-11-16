# erpax

A Payload CMS application (Next.js, Cloudflare Workers, D1). Everything under `src/` is reached
from `src/payload.config.ts`, the app routes in `src/app`, or the middleware.

## Work the Payload way

- Collections, fields, hooks, access and plugins are configured in `src/payload.config.ts` and the
  folders it imports. Prefer Payload's defaults and official plugins over custom code.
- Data that is not code is a seed. Documents live in `src/seed/content/fixtures/documents.json` and
  load as nested pages: `pnpm seed --url <origin> --documents src/seed/content/fixtures/documents.json`.
- Schema changes go through Payload migrations (`pnpm payload:migrate:create`), never hand-run SQL. The history
  starts at one baseline (`20261115_091414_baseline`, 2026-11-15, applied to
  a new D1 database, `erpax-v4`); CI's Migrations job builds a database from it and fails on an unmigrated
  change. `payload migrate:fresh` cannot reset D1 in beta.9 (its drop step calls `adapter.client.execute`),
  so a reset is a new database plus `payload migrate`. The pre-reset database `erpax` is kept unbound as a
  backup (2 users, 1 job).
- The MCP gateway at `/api/mcp` is the official `@payloadcms/plugin-mcp` over the collections.

## Commands

| Command | Does |
| --- | --- |
| `pnpm erpax login` · `whoami` · `logout` | Sign in to an erpax through its own OAuth (`--local`, or an origin; production by default) |
| `pnpm dev` | Next dev server (`PAYLOAD_DEV_PUSH=false pnpm dev` to skip schema push) |
| `pnpm generate:types` · `pnpm generate:importmap` | Payload's generated files |
| `pnpm generate:repo` | `README.md`, `.github/SPONSORS.md`, the plugin manifests, `.zenodo.json` and the derived fields of `CITATION.cff`, from package.json, CITATION.cff, FUNDING.yml, the types, the migrations and the proof record (`pnpm lint` checks them) |
| `pnpm lint` · `pnpm typecheck` · `pnpm test` · `pnpm test:e2e` | Checks (CI runs the same) |
| `pnpm build` | Types, import map, production build |
| `pnpm deploy` | Migrate production D1, then build and upload the Worker |

`main` accepts pull requests only (squash), with six required checks.

## Versions

- erpax is one Payload app, shaped like Payload's templates (`with-cloudflare-d1`, `website`): it publishes
  no packages. Change a dependency's version in the root `package.json` (and an override in
  `pnpm-workspace.yaml`); the pre-commit hook refreshes the lockfile, and CI installs it frozen.
- Conventions for plugins, hooks and `req.context` are in
  [payloadcms/skills](https://github.com/payloadcms/skills) (`skills/payload/reference/`).
- Payload is `4.0.0-beta.9` on every `payload` and `@payloadcms/*` package, with TypeScript 6 and zod 4 (Payload's
  floors), Next `>=16.4.1` and Node `^24.22.3 || >=26.13.1`. `.node-version` sets Node for CI and Cloudflare Workers Builds.
- `patches/` holds two pnpm patches (`patchedDependencies`), re-checked at every Payload bump: `@payloadcms/drizzle`
  (D1's 100-parameter upsert, upstream payloadcms/payload#18239) and `payload` (password hashing in chained rounds
  of at most 100,000 PBKDF2 iterations, the Workers cap, as `src/utilities/crypto` `stretch` defines and
  `src/collections/users/hashing.test.ts` proves). Every hash, MAC, content uuid, random value and password stretch
  in erpax goes through `src/utilities/crypto`.
- Majors held back on purpose: `eslint` 9, `recharts` 2, `@types/node` 24. A Dependabot PR that crosses one of these fails CI.
  Land its other bumps by hand.

## Agents work through Payload

- An agent is a user. It reaches erpax through the MCP gateway signed in as that user, and
  Payload's access control decides what it may read and write (roles held through `<role>@<app>`
  groups, per tenant). The gateway (`@payloadcms/plugin-mcp`, `src/payload.config.ts`) serves every
  collection through its generic tools (`getConfigInfo`, `getCollectionSchema`, `findDocuments`,
  `createDocuments`, `updateDocument`, `deleteDocuments`); which ones an agent can use is the user's
  roles, never a list in code or an environment flag. Sign in with `pnpm erpax login`, as `wrangler login`
  does: the browser opens that erpax's own sign-in and Allow page (Payload is the OAuth server,
  `@payloadcms/plugin-mcp`'s built-in), and the token is kept per origin in `~/.config/erpax/credentials.json`.
  Development and production are the same command: production by default, `--local` for
  `http://localhost:3000`, or any origin; `ERPAX_MCP_URL` sets the default. The `erpax` connector takes its
  header from `scripts/erpax.mjs headers` at connect time: the sign-in's token for its origin, or nothing,
  and then Claude Code offers its own OAuth sign-in. A machine agent with no browser (CI, the Deployed
  check) uses an API key (`ERPAX_API_KEY`, enabled on its user in the admin), read where it is used and
  never printed. `pnpm erpax whoami` shows who the gateway serves you as.
- The first user is super-admin by definition (`firstUserSuperAdmin`) and brings credentials only: Payload's
  first-register creates with `overrideAccess: true`, so `firstUserCredentials` (a `beforeOperation` hook) keeps
  email and password and drops everything else, and the first-user form shows only those two fields. Set
  `ERPAX_OWNER_EMAIL` (a Worker variable, the Cloudflare account's address) and only that address can be the
  first user. After that, `guardPrivilege` holds every request from outside to two rules: only a super-admin
  makes a super-admin (the `admin` role with no tenant), and a tenant membership changes only by an admin of
  that tenant. `lastLogin` and `passwordChangedAt` are written by the server only.
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
- A prompt is a program (`src/utilities/prompt`, proved in `Prompt.lean`): `run(prompt, lexicon, req, memory)`
  steps each known word over the memory, which hooks reached by the same request read as
  `req.context.prompt`; a word returning `false` halts. An unknown word is researched, never refused:
  the program `search think emote aware` asks Payload's `search`, records an `emerging_gap` memory keyed
  `word:<word>` linked (`relatedTo`) to the documents found, broadcasts it to `chat`, and the prompt
  goes on. The gap hook is the prompt `feel think emote aware`.

## Proofs

- Lean files live in `src/utilities/verify/lean`, each with a TypeScript twin, and `lean-toolchain` pins the
  version. CI's Lean job compiles every file and fails on a refused file, a `sorry`, an axiom outside
  Lean's foundation (`propext`, `Classical.choice`, `Quot.sound`) or a stale `inventory.generated.json`
  (`tsx src/utilities/verify/inventory/index.ts` rewrites it, `--check` verifies).
- Every theorem in the record is checked by the kernel. "Axiom-free" means it uses only the kernel's own
  rules; the others also use the foundation axioms, usually through `simp` or `omega`. A proof by
  `cases`, `rfl` and `decide` stays axiom-free.

## Pipelines

| Where | Runs |
| --- | --- |
| pre-commit (`.husky`) | Payload types + import map when `src/**/*.ts` is staged; the proof record when a `.lean` file is staged (with `lean` on PATH); the README, the sponsor page, the plugin manifests and the citation records on every commit (`scripts/generate-repo.ts`); the standards citation index (`docs/STANDARDS_INDEX.md`) on every commit; the lockfile when `package.json` or `pnpm-workspace.yaml` is staged |
| pre-push | `pnpm lint` · `pnpm typecheck` |
| CI (`.github/workflows/ci.yml`) | standards banners and index · lint · typecheck · tests ×4 · Playwright smoke · Lean proofs · migrations (from empty, no drift) · Worker (OpenNext build served by `wrangler dev --local`; `scripts/smoke.mjs` is a thin MCP client of it: first user, API key, tools/list, a read, a failed call recorded as a gap) · lean build. Work is folded by content key, never recomputed: the database the migrations build is made once per content of `src/migrations` and restored by tests, migrations, Worker and Playwright (`.github/actions/database`); a Lean verdict is reused while the proofs are unchanged; Next keeps its build cache |
| Cloudflare Workers Builds (dashboard) | on `main`: build, `payload migrate` on production D1, deploy. Its check on a PR branch fails at once and is not required |
| Deployed (`.github/workflows/deployed.yml`) | on `main`: waits for Cloudflare's build of the same commit, then `scripts/smoke.mjs --production`: pages answer, the gateway refuses a caller without a key, and with the `ERPAX_API_KEY` repository secret the read-only MCP conversation; a failure turns main red |
| Publish (`.github/workflows/publish.yml`) | on `main`, once CI and Deployed have both succeeded on a commit: when `package.json`'s version has no tag, tags the commit `v<version>` and creates the GitHub Release (Zenodo mints the DOI), with `CITATION.cff` and `zenodo.json` attached. Bump the version in a PR to release; a deploy that keeps it releases nothing. The filename is the one npm trusted publishing is configured against |

Gaps found on 2026-11-15:

- `cloudflare-env.d.ts` is generated by `wrangler types` from `wrangler.jsonc` and the machine's `.dev.vars`, so its
  `PAYLOAD_SECRET` line depends on who generated it; CI compares only Payload's two generated files.
- Deploy is configured in the Cloudflare dashboard and has no rollback step; the Deployed workflow reports a
  broken deploy but does not undo it. A big migration should be applied from a workstation before the merge.
- No `.github/dependabot.yml`, so held majors arrive inside security PRs.
- CI runs only `tests/e2e/smoke.e2e.spec.ts` of the Playwright specs, and `pnpm standards:check` is not scheduled.
- Two mechanisms inject the content-uuid: collections built by `createAccountingCollection` get a
  required `uuid` (`src/utilities/integrity/tamper-proof-uuid-field.ts`), the rest get an optional one from
  the uuid plugin. Folding them into one rebuilds the column on every factory table.
- The demo content behind `/next/seed` and the fallback home page is Lexical JSON written as code
  (`src/seed/home.ts`, `post/*`, `image-*`, `contact/form.ts`), not fixtures loaded as data.
- Session worktrees fail here while the app's worktree location is inside the repo: `.claude` is a
  symlink to `src`. Set Settings → Claude Code → Worktree location to a folder outside the repo.
- `@payloadcms/plugin-sentry` cannot run here: its admin error boundary imports `@sentry/nextjs`, whose
  server SDK needs `require-in-the-middle`, and the OpenNext build cannot bundle that for Workers
  (`Could not resolve "require-in-the-middle"`). It waits for an upstream fix. Every other official plugin
  is registered and derives its collections from the schema; Stripe sync stays off until a key is set,
  because the plugin's hooks fail saves and deletes without one.
- `@payloadcms/plugin-mcp` answers a call for a slug that is unknown or not enabled before any
  handler runs, so `afterToolCall` never sees it and no `emerging_gap` is recorded for it. Only calls
  that reach a handler (a failed query, a refused write) become gaps.

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
