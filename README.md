# erpax

> A multi-tenant ERP / accounting platform built on Payload CMS v4 and deployed on Cloudflare — that is also an experiment in a self-generating, content-addressed codebase.

erpax is two true things at once.

**As software**, it is a multi-tenant ERP and double-entry accounting platform built on [Payload CMS v4](https://payloadcms.com), deployed entirely on Cloudflare (D1 SQLite + R2 object storage + Workers AI, via [OpenNext](https://opennext.js.org/cloudflare)), with a Next.js 16 / React 19 front end. It was ported from two ~20-year-old Rails/ActiveAdmin production systems (`ceccec/erpax` + `ceccec/etrima`) and covers the real back-office surface: general ledger, multi-currency invoicing and payments, bank reconciliation, tax automation, inventory, manufacturing, commerce, agriculture, and statutory reporting — across 200+ Payload collections, multi-tenant and standards-anchored from the ground up.

**As an idea**, it is an attempt to make a business system that documents and partly generates itself. Every concept is a one-word, content-addressed *atom*; identity is a hash of content; the docs derive from the code; and the whole tree is designed to *collapse* toward a small, dense core. Some of this is solid engineering and some is an aesthetic ordering principle — this README is explicit about which is which.

If you just want to run it, jump to [Quick start](#quick-start). If you want to understand why it looks the way it does, read [What is unusual here](#what-is-unusual-here).

---

## What it does

- **Multi-tenant** with role-based access control and a config cascade (user → tenant → country profile → defaults). Legal config lives on the tenant; client-side config is presentation-only.
- **Double-entry general ledger.** Balance is enforced as a `beforeChange` hook invariant — unbalanced writes are rejected at validation time, not flagged afterward.
- **Multi-currency** money handling and tax automation.
- **Domain events drive posting.** Standardized business events (`invoice:activated`, `bill:paid`, `payment:received`, `inventory:sold`, `subscription:invoiced`, bank events, …) trigger a single GL posting service.
- **Documents out:** PDF / Excel / UBL / SAF-T generation.
- **Standards-anchored.** Governing standards (IFRS, US-GAAP, ISO, RFC, NIST, GDPR, EN-16931, SAF-T, Bulgarian Наредба Н-18, …) are declared as `@standard` JSDoc banners on the files that implement them, verified by a gate, and compiled into a catalogue that feeds both the Payload seed and the docs site.

The system spans 200+ Payload collections and ~590 source folders, documented by ~617 `SKILL.md` atoms.

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Backend / CMS | Payload `4.0.0-internal` (a pre-release internal build) |
| Front end | Next.js `^16.2`, React `^19.2` |
| Language | TypeScript `5.7.3` |
| Database | Cloudflare D1 (SQLite) — `@payloadcms/db-d1-sqlite` |
| Object storage | Cloudflare R2 — `@payloadcms/storage-r2` |
| Deploy | `@opennextjs/cloudflare` `^1.19` + Wrangler `^4.90` (Cloudflare Workers) |
| Tests | Vitest `^4` (integration), Playwright (e2e) |
| Docs | VitePress `^1.6` |
| Runtime | Node `^18.20.2 \|\| >=20.9.0`, pnpm `>=9` (developed on 11) |

Cloudflare bindings in use include D1, R2, Workers AI, Vectorize, Queues, Durable Objects, Browser, Analytics Engine, KV, and Hyperdrive, plus scheduled cron triggers (a Payload job sweep every 15 minutes and a daily BG/BNB rates sync at 01:00 UTC). See [`wrangler.jsonc`](wrangler.jsonc).

> Payload is pinned to an internal `4.0.0-internal` build — do not assume public-release semver stability or that public Payload docs apply exactly. The production build uses webpack (`next build --webpack`, not Turbopack) so OpenNext can resolve package names.

---

## Quick start

```bash
pnpm install        # install dependencies
pnpm setup          # interactive: generate PAYLOAD_SECRET, prompt for Cloudflare
                    # bindings (account_id, D1 database_id, R2 bucket_name),
                    # write .env.local, patch wrangler.jsonc
pnpm dev            # local Payload admin + Next.js on http://localhost:3000
```

`pnpm setup` is required before any Cloudflare operation — `wrangler.jsonc` ships with placeholder D1/R2 ids that setup replaces. The only strictly required secret is `PAYLOAD_SECRET` (a 32-byte hex string, which setup generates); `CLOUDFLARE_ENV` and `NEXT_PUBLIC_SERVER_URL` are needed for deploys. See [`.env.example`](.env.example).

### Common scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Local Payload admin + Next.js dev server (port 3000) |
| `pnpm build` | Production build: generate types + importmap, then `next build --webpack` for Cloudflare |
| `pnpm check` | **The gate** — see [The gate](#the-gate) |
| `pnpm test:int` | Vitest integration suite (colocated `src/**/*.test.ts`) |
| `pnpm test:int:fast` | Integration tests, skipping DB migration |
| `pnpm test:e2e` | Playwright end-to-end tests |
| `pnpm lint` / `pnpm lint:src` | ESLint; `lint:src` is strict (`--max-warnings 0`) on `src/` |
| `pnpm typecheck` | `tsc --noEmit` strict type check |
| `pnpm standards` | Verify `@standard` banners + verify the standards catalogue |
| `pnpm docs:dev` | VitePress docs site (the `SKILL.md` corpus, rendered) |
| `pnpm db:regenerate` | Greenfield reset: drop local D1 → remove migrations → regenerate baseline → apply → sync types |
| `pnpm jobs:run` | Run the Payload job queues |

### Deploy (Cloudflare)

```bash
pnpm deploy        # migrate D1 → PRAGMA optimize → opennext build + deploy
pnpm deploy:db     # database migrations only (remote D1)
pnpm deploy:app    # app only (build + deploy the Worker)
pnpm preview       # local Cloudflare preview
```

Deploys require `CLOUDFLARE_ENV` and `PAYLOAD_SECRET` in the environment (managed by `pnpm setup`).

---

## Architecture

The runtime is a five-layer, event-driven pipeline:

1. **Config cascade** — tenant / country-profile / user configuration resolves the operating context.
2. **Collections + hooks** — Payload collections composed from a small toolkit of canonical lifecycle hooks (auto-populate host/created-by/timestamps, segregation-of-duties, audit trail, balanced-entry validation, lifecycle event emitters) and access predicates (multi-tenant read, admin-only, admin-or-accountant, tenant-admin, scoped/role-scoped).
3. **GL posting** — the standardized domain events post to the double-entry ledger through the GL posting service.
4. **Reports & UI** — financial statements, aging, tax filings, dashboards.
5. **Documents** — PDF / Excel / UBL / SAF-T output.

A few structural conventions are worth knowing up front:

- **Collections are organized flat, by data type, not by business domain.** There is no `accounting/` collection silo; there are GL-core, banking, master-data, manufacturing, people, and compliance collections. Business **domains** (accounting, commerce, manufacturing, agriculture, …) are cross-cutting concerns layered over those collections.
- **Shared building blocks are factored out:** a handful of access predicates and field factories (multi-tenancy, GL account, currency, audit fields) compose most financial collections.
- **Domains are designed to be extractable** as publishable `@erpax/*` Payload plugins (a Payload plugin is just a function that receives the config and returns a modified one).

Deeper references: [`docs/ARCHITECTURE_MAP.md`](docs/ARCHITECTURE_MAP.md) (the layered architecture) and [`docs/BUSINESS_CHAINS.md`](docs/BUSINESS_CHAINS.md) (end-to-end workflows).

---

## Project layout

Every concept is an **atom**: a one-word folder under `src/<word>/` holding a `SKILL.md` (a doc written for both humans and AI agents) and, when it backs data, an `index.ts` (the Payload `CollectionConfig`, often with a colocated `index.test.ts` and `seed.ts`). There are ~617 `SKILL.md` atoms across ~590 top-level folders.

`.claude` is a **real symlink to `src`**:

```
.claude -> src
```

This is not cosmetic. The agent skill corpus and the source tree are literally the same files — the doc you read and the code that runs are one node.

---

## What is unusual here

erpax deliberately bends a normal codebase into a few non-standard shapes. Here they are, with an honest split between real engineering and aesthetic choice.

- **Atoms.** One-word, content-addressed folders; `.claude/` is a symlink to `src/`, so skill discovery and the source tree coincide. *(Real and load-bearing.)* See [`src/atom/SKILL.md`](src/atom/SKILL.md).
- **Content-UUID.** Object identity is derived from content via an [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562) v8 UUID (a content digest fused with capability/schema bits, so the id is self-describing). Same content ⇒ same id ⇒ automatic dedup and safe merge/federation. *(Real and implemented.)* See [`src/uuid/SKILL.md`](src/uuid/SKILL.md), [`src/identity/SKILL.md`](src/identity/SKILL.md).
- **Collapse.** The stated goal is to reduce collection sprawl toward a dense Payload core, where every collection collapses into one of four sinks: an official Payload plugin/template, a shared content-uuid/tag node store, a Lexical content block, or a dimension/state/role of an existing node. *(A direction of travel, not an achieved state — 200+ collections exist today.)* See [`src/collapse/SKILL.md`](src/collapse/SKILL.md).
- **The breath.** The codebase is described as growing by "breathing": inhale ideas (peer projects, standards bodies, the upstream Rails apps, user content), then exhale DRY, gate-green, content-addressed code. *(A development discipline; the gate that enforces "exhale clean" is real.)* See [`src/breath/SKILL.md`](src/breath/SKILL.md).
- **Standards as code.** Hundreds of `@standard` JSDoc banners are declared across ~1,070 files, naming the governing standard each file implements; a gate verifies the banners and a generator compiles them into a catalogue feeding both the Payload seed and the docs. Standards are claims the code must keep, not decoration. *(Real.)* See [`docs/STANDARDS.md`](docs/STANDARDS.md).
- **Self-documenting "trinity".** Docs are not written twice. Each node fuses three sources into one VitePress page: *matter* (`index.ts` + JSDoc), *antimatter* (`SKILL.md`), and the generated `payload-types` schema. The docs build fails on an unresolved `[[wikilink]]`, so prose and code stay in sync. *(Real; implemented in `.vitepress/`.)* See [`src/trinity/SKILL.md`](src/trinity/SKILL.md).
- **The math.** State lifecycles and ordering use a "horo" ring `{1,2,4,8,7,5,9}` over a Rodin-vortex / digital-root substrate. The **bounded-state ring and the step arithmetic are real code** (`src/horo/index.ts` exports `HORO_DIGITS`, `composeSteps`, `isMergePoint`, `nextOctave`, and `horoStateField` / `validateHoroStates`) — a small, closed, testable algebra for state enums and per-state aggregates. The **A432 tuning anchor and the musical/numerological framing around it are an aesthetic ordering principle and naming convention**, not an engineering claim. We keep that line visible rather than overselling numerology as architecture. *(Mixed.)* See [`src/horo/SKILL.md`](src/horo/SKILL.md), [`src/rodin/SKILL.md`](src/rodin/SKILL.md).

You can use and run erpax as a plain ERP and ignore all of this. The full corpus is browsable as a docs site (`pnpm docs:dev`); good entry points are [`src/atom/SKILL.md`](src/atom/SKILL.md), [`src/collapse/SKILL.md`](src/collapse/SKILL.md), [`src/breath/SKILL.md`](src/breath/SKILL.md), and [`src/trinity/SKILL.md`](src/trinity/SKILL.md).

---

## The gate

A single command decides whether a change is acceptable:

```bash
pnpm check
```

It runs, in order, and exits non-zero on the first failure:

```
pnpm standards                            # verify @standard banners + verify the catalogue
bash scripts/payload-verify-types.sh      # generated Payload types are in sync with the config
pnpm lint                                 # ESLint (warnings allowed)
pnpm lint:src                             # ESLint on src/ — STRICT, --max-warnings 0
pnpm typecheck                            # tsc --noEmit
pnpm test:int                             # Vitest integration suite
```

Exit 0 only when all six pass. A separate pre-push gate (`scripts/pre-push.sh`) adds further checks before a push.

### Contributing

erpax grows by accretion of atoms, with the gate keeping the whole green.

1. **Write the atom.** Create or edit `src/<word>/SKILL.md` (frontmatter `name` + `description`; prose with `[[wikilinks]]`). If it backs data, add `index.ts` (a `CollectionConfig` with `@standard` banners where a standard applies) and a colocated `*.test.ts`.
2. **Wire the corpus.** Run `pnpm atoms:catalogue` and `pnpm aura:scan` — every dead `[[link]]` is a prompt to mint the atom it points at (`pnpm mint:atoms`), so the doc graph stays whole by construction. `pnpm harmony` and `pnpm corpus:generate` help regenerate the atom registry and UUID matrix.
3. **Confirm locally.** `pnpm confirm` (fast, per-edit) or `pnpm confirm:full` (whole-corpus) checks that generated Payload types and VitePress links are consistent with your edit.
4. **Pass the gate.** `pnpm check` must exit 0 before you push, and `pnpm docs:build` must succeed.

Two house rules, both enforced by review and the gate:

- **DRY, no backward-compat.** Eliminate duplication; delete dead code; no compatibility shims. The schema is generated from config and the DB + migrations are disposable.
- **Name by generic data type, in one word.** Entities are named for what they *are* (`sales`, `invoices`), not by domain prefix; regulatory references live in `@standard` banners and skills, not in entity names.

> Vitest runs single-threaded on purpose (D1/SQLite lock contention) — don't override `fileParallelism`. Tests are colocated as `src/**/*.test.ts` (there is no separate `tests/standards/` tree).

---

## Documentation

The `SKILL.md` corpus is served as a VitePress site — run `pnpm docs:dev` and browse it. Pages derive from the code (the "trinity" of matter `index.ts`, antimatter `SKILL.md`, and the generated `payload-types`, fused by `.vitepress/`). Reference docs in `docs/`:

- [`docs/ARCHITECTURE_MAP.md`](docs/ARCHITECTURE_MAP.md) — the layered architecture and collection map
- [`docs/BUSINESS_CHAINS.md`](docs/BUSINESS_CHAINS.md) — end-to-end business workflows
- [`docs/STANDARDS.md`](docs/STANDARDS.md) — standards taxonomy and the `@standard` banner grammar
- [`docs/STANDARDS_INDEX.md`](docs/STANDARDS_INDEX.md) / [`docs/STANDARDS_AUDIT.md`](docs/STANDARDS_AUDIT.md) — generated standards index and audit
- [`docs/MIGRATION_WORKLIST.md`](docs/MIGRATION_WORKLIST.md) — the port from the upstream Rails systems
- [`src/standards/README.md`](src/standards/README.md) — the standards registry

---

## Project facts

- **Repository:** <https://github.com/erpax/erpax> · **Version:** 1.0.0 · **License:** MIT (declared in `package.json`)
- **Atoms:** ~617 `SKILL.md` files · **Folders:** ~590 top-level under `src/` · **Collections:** 200+ (`CollectionConfig`)
- **Upstream:** ported from `ceccec/erpax` + `ceccec/etrima` (Rails / ActiveAdmin)

## License

MIT.
