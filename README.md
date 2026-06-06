# erpax — multi-tenant ERP & double-entry accounting on Payload CMS + Cloudflare

> Open-source, multi-tenant **ERP and double-entry accounting platform** built on **Payload CMS v4** and deployed serverless on **Cloudflare** (D1 + R2 + Workers) — with a **content-addressed, tamper-evident, standards-bound** architecture.

erpax is a production back-office system — general ledger, multi-currency invoicing, payments, bank reconciliation, tax automation, inventory, manufacturing, commerce, agriculture, and statutory reporting — that is **also** an experiment in a self-generating, content-addressed codebase. You can run it as a plain ERP and ignore the experiment entirely; the [Quick start](#quick-start) is below, and the [Architecture](#architecture) section is explicit about which parts are solid engineering and which are an aesthetic ordering principle.

It was **ported from two ~20-year-old Rails/ActiveAdmin production systems** (`ceccec/erpax` + `ceccec/etrima`), now fully TypeScript on Payload.

---

## What it is

- **Multi-tenant ERP** — role-based access control and a config cascade (user → tenant → country profile → defaults). Legal config lives on the tenant; client-side config is presentation-only.
- **Double-entry general ledger** — `Σdebit = Σcredit` is enforced as a Payload `beforeChange` hook invariant. **Unbalanced writes are rejected at validation time, not flagged after the fact.**
- **Multi-currency** money handling and **tax automation**.
- **Event-driven posting** — standardized business events (`invoice:activated`, `bill:paid`, `payment:received`, `inventory:sold`, `subscription:invoiced`, bank events, …) trigger a single GL posting service.
- **Documents out** — PDF / Excel / **UBL** / **SAF-T** generation.
- **Standards-bound** — governing standards (**IFRS, US-GAAP, ISO, RFC, NIST, GDPR, EN-16931, SAF-T, Bulgarian Наредба Н-18**, …) are declared as `@standard` JSDoc banners on the files that implement them, verified by a gate, and compiled into a queryable catalogue that seeds both the Payload data and the docs site. Compliance is by construction, not post-hoc audit.

The system spans **200+ Payload collections** across a large single-word folder corpus, each folder documented by a `SKILL.md` atom (see [Architecture](#architecture)).

## Why erpax

| You want… | erpax gives you… |
| --- | --- |
| A self-hostable ERP with no VPS | **Serverless on Cloudflare** — D1 (SQLite), R2 (object storage), Workers AI, via OpenNext. D1 is free-tier eligible for test/small deployments. |
| Accounting you can trust | **Double-entry balance enforced as a write precondition** + immutable audit logs on mutable collections. |
| Compliance you can prove | **Standards-as-code** — `@standard` banners link code to the regulation it implements; a gate verifies them; a catalogue indexes them. |
| Composable, no-magic config | **Payload plugins are pure TypeScript** (a function that takes the config and returns a modified one) — domains are designed for extraction as `@erpax/*` plugins. |
| Enterprise from day one | **Multi-tenant** with row-level access scoping baked into the field/access toolkit. |
| Forgery-resistant data | **Content-addressed identity** (RFC 9562 v8 UUID): same content ⇒ same id everywhere ⇒ duplicates dedup and merges are safe; misalignment is detectable. |

**Why Payload:** Payload v4 plugins are composable TypeScript configs with a real ORM, admin UI, auth, and a Local API — erpax extends it with double-entry accounting, multi-tenancy, standards-binding, and content-addressed identity.

> erpax is **both** a full-stack, self-hostable ERP application and a Payload plugin suite in progress. Today it runs as one app; domains (`accounting`, `commerce`, `manufacturing`, …) are factored to be extracted as standalone `@erpax/*` plugins.

## Tech stack

| Layer | Choice |
| --- | --- |
| Backend / CMS | Payload `4.0.0-internal` (a pre-release internal build) |
| Front end | Next.js `^16.2`, React `^19.2` |
| Language | TypeScript `5.7.3` |
| Database | Cloudflare **D1** (SQLite) — `@payloadcms/db-d1-sqlite` |
| Object storage | Cloudflare **R2** — `@payloadcms/storage-r2` |
| Deploy | `@opennextjs/cloudflare` `^1.19` + Wrangler `^4.90` (Cloudflare **Workers**) |
| Tests | Vitest `^4` (integration), Playwright (e2e) |
| Docs | VitePress `^1.6` |
| Runtime | Node `^18.20.2 \|\| >=20.9.0`, pnpm `>=9` (developed on 11) |

Cloudflare bindings in use include D1, R2, Workers AI, Vectorize, Queues, Durable Objects, Browser, Analytics Engine, KV, and Hyperdrive, plus scheduled cron triggers (a Payload job sweep every 15 minutes and a daily BG/BNB rates sync at 01:00 UTC). See [`wrangler.jsonc`](wrangler.jsonc).

> **Heads-up:** Payload is pinned to an internal `4.0.0-internal` build — do not assume public-release semver stability or that public Payload docs apply exactly. The production build uses **webpack** (`next build --webpack`, not Turbopack) so OpenNext can resolve package names. **Vitest runs single-threaded on purpose** (D1/SQLite lock contention) — do not override `fileParallelism`. Tests are colocated as `src/**/*.test.ts`; there is no separate `tests/` tree.

## Quick start

```bash
pnpm install        # install dependencies
pnpm setup          # interactive: generate PAYLOAD_SECRET, prompt for Cloudflare
                    # bindings (account_id, D1 database_id, R2 bucket_name),
                    # write .env.local, patch wrangler.jsonc
pnpm dev            # local Payload admin + Next.js on http://localhost:3000
```

`pnpm setup` is required before any Cloudflare operation — `wrangler.jsonc` ships with placeholder D1/R2 ids that setup replaces. The only strictly required secret is `PAYLOAD_SECRET` (a 32-byte hex string, which setup generates, e.g. `openssl rand -hex 32`); `CLOUDFLARE_ENV` and `NEXT_PUBLIC_SERVER_URL` are needed for deploys. See [`.env.example`](.env.example).

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

## Architecture

The runtime is a five-layer, event-driven pipeline:

1. **Config cascade** — tenant / country-profile / user configuration resolves the operating context.
2. **Collections + hooks** — Payload collections composed from a small toolkit of canonical lifecycle hooks (auto-populate host / created-by / timestamps, segregation-of-duties, audit trail, balanced-entry validation, lifecycle event emitters) and access predicates (multi-tenant read, admin-only, admin-or-accountant, tenant-admin, scoped / role-scoped).
3. **GL posting** — standardized domain events post to the double-entry ledger through the GL posting service.
4. **Reports & UI** — financial statements, aging, tax filings, dashboards.
5. **Documents** — PDF / Excel / UBL / SAF-T output.

A few structural conventions are worth knowing up front:

- **Collections are organized flat, by data type, not by business domain.** There is no `accounting/` collection silo; there are GL-core, banking, master-data, manufacturing, people, and compliance collections. Business **domains** (accounting, commerce, manufacturing, agriculture, …) are cross-cutting concerns layered over those collections.
- **Shared building blocks are factored out** — a handful of access predicates and field factories (multi-tenancy, GL account, currency, audit fields) compose most financial collections.
- **Domains are designed to be extractable** as publishable `@erpax/*` Payload plugins.

### The atom corpus (what is unusual here)

erpax deliberately bends a normal codebase into a few non-standard shapes. Here they are, with an honest split between real engineering and aesthetic choice. **You can use and run erpax as a plain ERP and ignore all of this.**

- **Atoms** — every concept is a one-word, content-addressed folder under `src/<word>/`, holding a `SKILL.md` (a doc for both humans and AI agents) and, when it backs data, an `index.ts` (the Payload `CollectionConfig`, usually with a colocated `test.ts` and `seed.ts`). The corpus is large — **200+ collections** and well over a thousand single-word folders. **`.claude` is a real symlink to `src`**, so the agent skill corpus and the source tree are literally the same files. *(Real and load-bearing.)* See [`src/atom/SKILL.md`](src/atom/SKILL.md).
- **Content-UUID** — object identity is derived from content via an [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562) **v8 UUID** (a content digest fused with capability / schema bits, so the id is self-describing). Same content ⇒ same id ⇒ automatic dedup and safe merge/federation; misalignment is detectable rather than silent. *(Real and implemented.)* See [`src/uuid/SKILL.md`](src/uuid/SKILL.md), [`src/identity/SKILL.md`](src/identity/SKILL.md).
- **Standards as code** — `@standard` JSDoc banners across the codebase name the governing standard each file implements; a gate verifies the banners and a generator compiles them into a catalogue feeding both the Payload seed and the docs. Standards are claims the code must keep, not decoration. *(Real.)* See [`docs/STANDARDS.md`](docs/STANDARDS.md), [`src/standards/SKILL.md`](src/standards/SKILL.md).
- **Self-documenting "trinity"** — docs are not written twice. Each node fuses three sources into one VitePress page: *matter* (`index.ts` + JSDoc), *antimatter* (`SKILL.md`), and the generated `payload-types` schema. The docs build fails on an unresolved `[[wikilink]]`, so prose and code stay in sync. *(Real; implemented in `.vitepress/`.)* See [`src/trinity/SKILL.md`](src/trinity/SKILL.md).
- **Collapse** — the stated goal is to reduce collection sprawl toward a dense Payload core, where every collection collapses into one of four sinks: an official Payload plugin/template, a shared content-uuid/tag node store, a Lexical content block, or a dimension/state/role of an existing node. *(A direction of travel, not an achieved state — 200+ collections exist today.)* See [`src/collapse/SKILL.md`](src/collapse/SKILL.md).
- **The math** — state lifecycles and ordering use a "horo" ring `{1,2,4,8,7,5,9}` over a Rodin-vortex / digital-root substrate. The **bounded-state ring and the step arithmetic are real, tested code** (`src/horo/index.ts` exports `HORO_DIGITS`, `composeSteps`, `isMergePoint`, `nextOctave`, `horoStateField`, `validateHoroStates`) — a small, closed algebra for state enums and per-state aggregates. The **A432 tuning anchor and the musical/numerological framing around it are an aesthetic ordering principle and naming convention**, not an engineering claim. We keep that line visible rather than overselling numerology as architecture. *(Mixed.)* See [`src/horo/SKILL.md`](src/horo/SKILL.md), [`src/rodin/SKILL.md`](src/rodin/SKILL.md).

Deeper references: [`docs/ARCHITECTURE_MAP.md`](docs/ARCHITECTURE_MAP.md) (the layered architecture and collection map) and [`docs/BUSINESS_CHAINS.md`](docs/BUSINESS_CHAINS.md) (end-to-end workflows).

## The gate

A single command decides whether a change is acceptable:

```bash
pnpm check
```

It runs, in order, and exits non-zero on the **first** failure:

```
pnpm standards                            # verify @standard banners + verify the catalogue
bash scripts/payload-verify-types.sh      # generated Payload types are in sync with the config
pnpm lint                                 # ESLint (warnings allowed)
pnpm lint:src                             # ESLint on src/ — STRICT, --max-warnings 0
pnpm typecheck                            # tsc --noEmit
pnpm test:int                             # Vitest integration suite
```

Exit 0 only when all six pass. A separate pre-push gate (`scripts/pre-push.sh`) adds further checks before a push. The gate is the contributor's safety net: if `pnpm check` is green, the change is structurally sound.

### Contributing

erpax grows by accretion of atoms, with the gate keeping the whole green.

1. **Write the atom.** Create or edit `src/<word>/SKILL.md` (frontmatter `name` + `description`; prose with `[[wikilinks]]`). If it backs data, add `index.ts` (a `CollectionConfig` with `@standard` banners where a standard applies) and a colocated `test.ts`.
2. **Wire the corpus.** Run `pnpm atoms:catalogue` and `pnpm aura:scan` — every dead `[[link]]` is a prompt to mint the atom it points at (`pnpm mint:atoms`), so the doc graph stays whole by construction. `pnpm harmony` and `pnpm corpus:generate` regenerate the atom registry and UUID matrix.
3. **Confirm locally.** `pnpm confirm` (fast, per-edit) or `pnpm confirm:full` (whole-corpus) checks that generated Payload types and VitePress links are consistent with your edit.
4. **Pass the gate.** `pnpm check` must exit 0 before you push, and `pnpm docs:build` must succeed.

Two house rules, both enforced by review and the gate:

- **DRY, no backward-compat.** Eliminate duplication; delete dead code; no compatibility shims. The schema is generated from config and the DB + migrations are disposable.
- **Name by generic data type, in one word.** Entities are named for what they *are* (`sales`, `invoices`), not by domain prefix; regulatory references live in `@standard` banners and skills, not in entity names.

## Documentation

The `SKILL.md` corpus is served as a VitePress site — run `pnpm docs:dev` and browse it. Pages derive from the code (the "trinity" of matter `index.ts`, antimatter `SKILL.md`, and the generated `payload-types`, fused by `.vitepress/`). Reference docs in `docs/`:

- [`docs/ARCHITECTURE_MAP.md`](docs/ARCHITECTURE_MAP.md) — the layered architecture and collection map
- [`docs/BUSINESS_CHAINS.md`](docs/BUSINESS_CHAINS.md) — end-to-end business workflows
- [`docs/STANDARDS.md`](docs/STANDARDS.md) — standards taxonomy and the `@standard` banner grammar
- [`src/standards/SKILL.md`](src/standards/SKILL.md) — the standards index, computed from the banners via the catalogue (`pnpm standards:catalogue`)
- [`docs/MIGRATION_WORKLIST.md`](docs/MIGRATION_WORKLIST.md) — the port from the upstream Rails systems

Good entry points into the corpus: [`src/SKILL.md`](src/SKILL.md), [`src/atom/SKILL.md`](src/atom/SKILL.md), [`src/uuid/SKILL.md`](src/uuid/SKILL.md), [`src/trinity/SKILL.md`](src/trinity/SKILL.md), [`src/collapse/SKILL.md`](src/collapse/SKILL.md).

## Project facts

- **Repository:** <https://github.com/erpax/erpax> · **Version:** 1.0.0 · **License:** MIT (declared in `package.json`)
- **Scope:** 200+ Payload `CollectionConfig`s; a large single-word `src/` folder corpus, each folder documented by a `SKILL.md` atom
- **Upstream:** ported from `ceccec/erpax` + `ceccec/etrima` (Rails / ActiveAdmin production systems)
- **Real surface:** general ledger, multi-currency invoicing & payments, bank reconciliation, tax, inventory, manufacturing, commerce, agriculture, statutory reporting

## License

MIT.
