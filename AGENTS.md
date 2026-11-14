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

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
