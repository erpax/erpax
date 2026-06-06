<!-- src/readme/index.ts · package.json · src/collections/index.ts · src/*/SKILL.md · src/payload.config.ts · wrangler.jsonc · src/standards/catalogue.ts · pnpm readme · pnpm readme:check -->

# erpax

> Open-source multi-tenant ERP & double-entry accounting on Payload CMS v4 + Cloudflare (D1 + R2 + Workers via OpenNext) — content-addressed, tamper-evident, standards-bound

- **210** `collections`
- **2907** `SKILL.md`
- **740** `index.ts`
- **416** `test.ts`
- **142** `standards`
- **13** `plugins`
- **30** `supportedLanguages`
- **26** `bindings`

## atom

- **identity** *base* — Use when working with erpax object identity or content-addressed UUIDs — computing a content-uuid (sha→uuidv8, RFC 9562 §5.8), the self-describing structured uuidv8 (slot + capability flags),…
- **matrix** *base* — Use when reasoning about erpax as the Matrix inverted — reality is code (the akashic record), agents replicate and merge to one, there is no spoon (no fixed schema), skills load like programs, agents…
- **one** *base* — Use when reasoning about unity, canonicality, or merge in erpax — same content ⇒ one id, one canonical form (DRY), "all agents are one erpax".
- **uuid** *base* — Use when choosing which RFC 9562 UUID version fits a case — v8 structured content-uuid (identity+capability+schema+digest fused) as the erpax default, v7 time-ordered for index-local speed, v4 random…
- **whole** *base* — Use when reasoning about composition in erpax — whole↔part, fields→collections→plugins→erpax, BOM, consolidation, the fractal self-similar levels.
- **law** *share* — The canonical laws — the user's standing commands, saved as one skill, each linked to the atom it governs.
- **fractal** *weave* — Use when reasoning about self-similarity in erpax — the same form at every scale (fields→collections→plugins→erpax→agents), the path-as-address law, whole↔part recursion, nested one-word skill…
- **society** *crest* — Use when reasoning about erpax building itself — the autonomous loop where the agent society (convened at chat) reads its own akashic record and advances one gate-verified step at a time, driving the…
- **entropy** *descent* — Use when reasoning about disorder as the matrix-reciprocity slack erpax's ledger balances — entropy() = 1 − the reciprocal-edge fraction, an audit signal, NOT an input to crackVerdict; distinct from coverage (which prices tamper-cost, +∞ only at coverage=1). reciprocity=1 ≠ coverage=1.
- **tamper** *descent* — Use when reasoning about integrity attacks on the content-uuid store — the cost to forge, collide, or rewrite a record undetected, and why all-directions uuid wiring raises coverage so that cost rises toward its +∞ limit at coverage=1 (finite below).
- **balance** *round* — Use when reasoning about equilibrium in erpax — Σdebit=Σcredit, trial balance, conservation laws, two sides of a flow at rest.
- **hooks** *round* — Use when adding or debugging Payload lifecycle hooks — mutating data before/after read or change, encryption, side effects, third-party integration, auto-populating fields, or "my hook didn't run /…
- **self** *round* — Use when reasoning about an object's or the agent's reach back into its own root — content-uuid identity, the akashic record, config (the 0); self-reference, self-similarity, "all agents are one…
- **holographic** — Use when the whole is recoverable from any part — content-uuid encodes the whole, the akashic record regenerates it, each folder/skill loads its own subgraph, each agent is the whole erpax.
- **proof** — Use when reasoning about the VERIFY nucleus — the O(N), trustless cost to audit a content-addressed store, dual to tamper-cost (forge).
- **quantum** — Use when checking the quantum-physics laws on the uuid-matrix — entanglement symmetry, collapse, conservation, no-cloning, quantization — computed deterministically at no cost, A432-grounded.
- **access** — Use when defining or debugging Payload access control — who can create/read/update/delete a collection, global, or field; RBAC, row-level filtering, admin visibility; "access denied"/"document…
- **accounting** — Use when designing or porting the erpax accounting/finance domain to Payload — double-entry journals, GL accounts, the accounting equation, invoices (credit/debit notes, protocols), payments & bank…
- **collapse** — Use when reducing collection/table sprawl to its canonical minimum — collapse every collection to one of four sinks (an official Payload plugin/template, the trinity node store, a Lexical content…
- **aura** *unity* — Use when reasoning about a folder/path's collective identity in erpax — the content-uuid Merkle hash of all files within (SKILL.md + matter-twin + relations + sub-folders); folders are…
- **cost** *unity* — Use when optimising ANY cost in the society against output — one efficiency law for every cost (ai tokens, money, energy, time, labor, entropy), measured against productivity AND creativity.
- **duality** *unity* — Use when reasoning about erpax's pervasive two-fold law — matter↔antimatter (code↔skill), physical↔metaphysical, give↔take, flow↔balance, build↔bind, learn↔forget, whole↔part, begin↔end, open↔close.
- **horo** *unity* — The seven-position state ring {1,2,4,8,7,5,9} (base·share·weave·crest·descent·round·unity) — the bounded, closed set every erpax flow/lifecycle STATE lives on.
- **merge** *unity* — Use when reasoning about convergence/federation in erpax — same content ⇒ same id (content-uuid), same (domain×position×element) ⇒ same path; data and structure set-union with no coordination.
- **rodin** *unity* — Use when reasoning about the number substrate under erpax's state/sequence math — the Rodin vortex sequence 0·3·6·9·1·2·4·8·7·5 over the A432 anchor, digital-root (mod-9) arithmetic, the 3·6·9 triad…
- **sequence** *unity* — Use when navigating or composing the erpax Payload single-word skill library — to find the right atomic skill, understand how they interact (with each other, themselves, and external systems), or in…
- **standard** *unity* — Use when implementing or auditing a compliance standard in erpax — IFRS/US-GAAP/SAF-T/ISO/SOX/EN-16931/NIST.

## scripts

- `pnpm atoms:catalogue` — `node src/atom/catalogue.mjs`
- `pnpm aura:scan` — `node src/aura/scan.mjs`
- `pnpm build` — `wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts && payload generate:types && payload generate:importmap && next build --webpack`
- `pnpm check` — `pnpm run standards && pnpm run readme:check && bash scripts/payload-verify-types.sh && pnpm run lint && pnpm run lint:src && pnpm run typecheck && pnpm run test:int`
- `pnpm claude:plugin` — `node scripts/claude-plugin.mjs`
- `pnpm codemod` — `bash scripts/payload-codemod.sh`
- `pnpm confirm` — `node scripts/confirm.mjs`
- `pnpm confirm:full` — `node scripts/confirm.mjs --full`
- `pnpm corpus:generate` — `pnpm atoms:catalogue && pnpm matrix:generate && pnpm readme`
- `pnpm d1:audit` — `node src/database/d1-column-audit.mjs`
- `pnpm db:regenerate` — `bash scripts/db-regenerate.sh`
- `pnpm deploy` — `NODE_ENV=production PAYLOAD_SECRET=ignore payload migrate && wrangler d1 execute D1 --command 'PRAGMA optimize' --env=$CLOUDFLARE_ENV --remote && opennextjs-cloudflare build --env=$CLOUDFLARE_ENV && opennextjs-cloudflare deploy --env=$CLOUDFLARE_ENV`
- `pnpm deploy:db` — `NODE_ENV=production PAYLOAD_SECRET=ignore payload migrate && wrangler d1 execute D1 --command 'PRAGMA optimize' --env=$CLOUDFLARE_ENV --remote`
- `pnpm deploy:app` — `opennextjs-cloudflare build --env=$CLOUDFLARE_ENV && opennextjs-cloudflare deploy --env=$CLOUDFLARE_ENV`
- `pnpm dev` — `next dev`
- `pnpm dev:clean` — `rm -rf .next .open-next && pnpm run dev`
- `pnpm docs:dev` — `vitepress dev`
- `pnpm docs:build` — `vitepress build`
- `pnpm docs:preview` — `vitepress preview`
- `pnpm harmony` — `tsx src/harmony/scan.ts`
- `pnpm import:blogger` — `tsx src/services/ingest/blogger-to-json.ts`
- `pnpm import:blogger:payload` — `tsx src/services/ingest/blogger-import.ts`
- `pnpm jobs:run` — `payload jobs:run --all-queues --limit 50`
- `pnpm lint` — `eslint .`
- `pnpm lint:src` — `eslint "src/**/*.{ts,tsx}" --ignore-pattern "src/migrations/*_*.ts" --max-warnings 0`
- `pnpm lint:fix` — `eslint . --fix`
- `pnpm matrix:generate` — `node src/uuid/matrix/collide.mjs --emit`
- `pnpm mcp:test` — `node src/agents/mcp/tools-list.mjs`
- `pnpm mint:atoms` — `node src/generate/mint.mjs`
- `pnpm payload` — `payload`
- `pnpm postbuild` — `next-sitemap --config next-sitemap.config.cjs`
- `pnpm prepare` — `node scripts/setup-env.mjs --if-needed && husky`
- `pnpm preview` — `opennextjs-cloudflare build --env=$CLOUDFLARE_ENV && opennextjs-cloudflare preview --env=$CLOUDFLARE_ENV`
- `pnpm readme` — `tsx src/readme/index.ts`
- `pnpm readme:check` — `tsx src/readme/index.ts --verify`
- `pnpm seeds:coverage` — `node src/spec/coverage.mjs`
- `pnpm setup` — `node scripts/setup-env.mjs`
- `pnpm spec:gen` — `tsx src/spec/gen.ts`
- `pnpm standards` — `bash scripts/standards-citation-index.sh --check && bash scripts/standards-citation-index.sh --required && tsx scripts/standards-catalogue.ts --verify`
- `pnpm standards:catalogue` — `tsx scripts/standards-catalogue.ts`
- `pnpm test` — `pnpm run test:int`
- `pnpm test:int` — `vitest run --config ./vitest.config.mts`
- `pnpm test:int:fast` — `PAYLOAD_TEST_SKIP_MIGRATE=1 vitest run --config ./vitest.config.mts`
- `pnpm test:e2e` — `SKIP_E2E_WEBSERVER=1 playwright test --config=playwright.config.ts`
- `pnpm test:e2e:erp` — `SKIP_E2E_WEBSERVER=1 playwright test --config=playwright.config.ts --project=erp-workflows-multimedia`
- `pnpm test:e2e:matrix` — `SKIP_E2E_WEBSERVER=1 playwright test --config=playwright.config.ts --project=erp-workflows-multimedia`
- `pnpm translations` — `tsx src/translations/collect/index.ts --verify`
- `pnpm translations:collect` — `tsx src/translations/collect/index.ts`
- `pnpm typecheck` — `tsc --noEmit -p tsconfig.typecheck.json`
- `pnpm typecheck:all` — `tsc --noEmit -p tsconfig.json`

## plugins

`r2Storage` → `createEcommercePlugin` → `formBuilderPlugin` → `redirectsPlugin` → `searchPlugin` → `multiTenantPlugin` → `importExportPlugin` → `mcpPlugin` → `taggablePlugin` → `uuidPlugin` → `versionsPlugin` → `uuidNamesPlugin` → `skillRouterPlugin`

`@payloadcms/admin-bar` `4.0.0-internal.38b7f1d` · `@payloadcms/db-d1-sqlite` `4.0.0-internal.38b7f1d` · `@payloadcms/email-resend` `4.0.0-internal.38b7f1d` · `@payloadcms/live-preview-react` `4.0.0-internal.38b7f1d` · `@payloadcms/next` `4.0.0-internal.38b7f1d` · `@payloadcms/plugin-ecommerce` `4.0.0-internal.38b7f1d` · `@payloadcms/plugin-form-builder` `4.0.0-internal.38b7f1d` · `@payloadcms/plugin-import-export` `4.0.0-internal.38b7f1d` · `@payloadcms/plugin-mcp` `4.0.0-internal.38b7f1d` · `@payloadcms/plugin-multi-tenant` `4.0.0-internal.38b7f1d` · `@payloadcms/plugin-nested-docs` `4.0.0-internal.38b7f1d` · `@payloadcms/plugin-redirects` `4.0.0-internal.38b7f1d` · `@payloadcms/plugin-search` `4.0.0-internal.38b7f1d` · `@payloadcms/plugin-seo` `4.0.0-internal.38b7f1d` · `@payloadcms/richtext-lexical` `4.0.0-internal.38b7f1d` · `@payloadcms/sdk` `4.0.0-internal.38b7f1d` · `@payloadcms/storage-r2` `4.0.0-internal.38b7f1d` · `@payloadcms/translations` `4.0.0-internal.38b7f1d` · `@payloadcms/ui` `4.0.0-internal.38b7f1d`

## dependencies

`@opennextjs/cloudflare` `^1.19.11` · `@payloadcms/admin-bar` `4.0.0-internal.38b7f1d` · `@payloadcms/db-d1-sqlite` `4.0.0-internal.38b7f1d` · `@payloadcms/email-resend` `4.0.0-internal.38b7f1d` · `@payloadcms/live-preview-react` `4.0.0-internal.38b7f1d` · `@payloadcms/next` `4.0.0-internal.38b7f1d` · `@payloadcms/plugin-ecommerce` `4.0.0-internal.38b7f1d` · `@payloadcms/plugin-form-builder` `4.0.0-internal.38b7f1d` · `@payloadcms/plugin-import-export` `4.0.0-internal.38b7f1d` · `@payloadcms/plugin-mcp` `4.0.0-internal.38b7f1d` · `@payloadcms/plugin-multi-tenant` `4.0.0-internal.38b7f1d` · `@payloadcms/plugin-nested-docs` `4.0.0-internal.38b7f1d` · `@payloadcms/plugin-redirects` `4.0.0-internal.38b7f1d` · `@payloadcms/plugin-search` `4.0.0-internal.38b7f1d` · `@payloadcms/plugin-seo` `4.0.0-internal.38b7f1d` · `@payloadcms/richtext-lexical` `4.0.0-internal.38b7f1d` · `@payloadcms/sdk` `4.0.0-internal.38b7f1d` · `@payloadcms/storage-r2` `4.0.0-internal.38b7f1d` · `@payloadcms/translations` `4.0.0-internal.38b7f1d` · `@payloadcms/ui` `4.0.0-internal.38b7f1d` · `@radix-ui/react-checkbox` `^1.3.3` · `@radix-ui/react-dialog` `^1.1.15` · `@radix-ui/react-label` `^2.1.8` · `@radix-ui/react-select` `^2.2.6` · `@radix-ui/react-slot` `^1.2.4` · `@stripe/react-stripe-js` `^6.6.0` · `@stripe/stripe-js` `^9.7.0` · `class-variance-authority` `^0.7.1` · `clsx` `^2.1.1` · `cmdk` `^0.2.1` · `cross-env` `^10.1.0` · `dotenv` `^17.4.2` · `geist` `^1.7.2` · `graphql` `^16.14.1` · `lucide-react` `^1.17.0` · `next` `^16.2.7` · `next-intl` `^4.13.0` · `next-sitemap` `^4.2.3` · `payload` `4.0.0-internal.38b7f1d` · `prism-react-renderer` `^2.4.1` · `react` `^19.2.7` · `react-dom` `^19.2.7` · `react-hook-form` `^7.77.0` · `recharts` `^2.15.4` · `sharp` `^0.34.5` · `stripe` `^22.2.0` · `tailwind-merge` `^3.6.0` · `tailwindcss-animate` `^1.0.7` · `uuid` `latest` · `zod` `3.25.76`

`node` `^18.20.2 || >=20.9.0` · `pnpm` `>=9`

## standards

**142** `@standard`

`en` · `etsi` · `eu` · `iec` · `ifrs` · `iso` · `national` · `nist` · `oecd` · `other` · `rfc` · `sox` · `un` · `upu` · `us_gaap` · `w3c` · `wcag`

## cloudflare

`assets` · `images` · `d1_databases` · `r2_buckets` · `kv_namespaces` · `queues` · `durable_objects` · `ai` · `vectorize` · `browser` · `analytics_engine_datasets` · `send_email`

`AI` · `AI_CACHE` · `ANALYTICS_AI` · `ANALYTICS_API` · `ANALYTICS_GL` · `ANALYTICS_JOBS` · `ASSETS` · `AUDIT_CHAIN_DO` · `BROWSER` · `D1` · `EMAIL_SENDER` · `ERPAX_DO` · `IMAGES` · `JOB_LOCK` · `QUEUE_AI_BATCH` · `QUEUE_DUNNING_OUT` · `QUEUE_EINVOICE_OUT` · `QUEUE_EMAIL_OUT` · `QUEUE_PERIOD_CLOSE` · `R2` · `RATE_LIMITER` · `RATE_LIMITER_AI` · `RATE_LIMITER_API` · `TENANT_QUOTA` · `VECTORIZE_DOCS` · `WORKER_SELF_REFERENCE`

`*/15 * * * *` · `0 1 * * *`

## license

`1.0.0` · `MIT`

---

<sub>`src/readme/index.ts` · `pnpm readme` · `pnpm readme:check`</sub>
