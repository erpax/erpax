---
name: scripts
description: "Scripts are shells; matter lives in src/ — package.json keeps lifecycle + `pnpm erpax`; see LEGACY_ALIASES in src/cli/registry.ts."
---

# scripts

`scripts/` holds **thin entrypoints** (bash hooks, husky wires, `spawn tsx` mjs). Shared logic belongs in `src/<atom>/`. Operational commands route through **`pnpm erpax <domain> [action]`** (`src/cli/index.ts`).

## package.json (14 scripts)

| Script | Aspect |
|--------|--------|
| `dev` / `dev:clean` | Next dev |
| `build` / `postbuild` | Production build + sitemap |
| `preview` / `deploy` | Cloudflare OpenNext |
| `payload` | Payload CLI passthrough |
| `check` | Full CI gate (= `pnpm erpax gate`) |
| `erpax` | Meta CLI — all operational domains |
| `setup` / `prepare` | Env + husky |
| `docs:*` | VitePress |

## Legacy → erpax migration

Run `pnpm erpax aliases` for the full table. Common:

| Was | Now |
|-----|-----|
| `pnpm readme:check` | `pnpm erpax readme check` |
| `pnpm confirm:uuid` | `pnpm erpax confirm uuid` |
| `pnpm rules:ratchet` | `pnpm erpax rules ratchet` |
| `pnpm lint:imports` | `pnpm erpax lint imports` |
| `pnpm test:int` | `pnpm erpax test int` |
| `pnpm skill:index` | `pnpm erpax corpus skill` |
| `pnpm migrate:production` | `pnpm erpax deploy db` |
