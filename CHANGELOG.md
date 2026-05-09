# Changelog

All notable changes to erpax are recorded here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project
uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- **Backward-compat removal + final DRY merge** (Slice PPP). Per the
  user directive "remove any backward compatibility merging all using
  the standards in complete dry refactor". Eliminated all
  `@deprecated`-tagged code in the active import graph by merging or
  removing:
  - **`ensureHostId` merged into canonical `autoPopulateHost`.** Both
    populated `data.tenant` from `req.user.tenants[0].tenant`. Factory
    at `src/plugins/accounting/factories/collection-factory.ts` rewritten
    to use `beforeValidate: [autoPopulateHost]` (the canonical Payload
    hook lifecycle) instead of an inline `beforeChange` wrapper around
    `ensureHostId`. The `ensureHostId` export removed; file queued for
    deletion.
  - **4 missing-service hooks detached** (`apAgingHook`, `arAgingHook`,
    `cogsHook`, `depreciationHook`). Each delegated to
    `req.payload.services?.X` against a service that doesn't exist in
    `src/services/` (silent no-op since codebase inception). Removed
    from `Payments/index.ts` and `Invoices/index.ts` `afterChange:`
    arrays + `FixedAssets.ts`. Removed from
    `src/plugins/accounting/hooks/index.ts` barrel exports. Files
    queued for deletion in slice script "Slice PPP" block.
  - **`base-accounting-hook.ts` queued for deletion**. After merging
    `ensureHostId`, the file's other exports (`createAccountingHook`,
    `calculateTotal`, `HookHandler`, `GLPostingData`) were already dead
    code per Slice KKK.
  - **`host-scope.ts` middleware queued for deletion**. Slice GGG
    confirmed zero callers; the canonical access predicates in
    `src/access/*.ts` and `@/plugins/auth/access.ts` cover its surface.
    Plus `middleware/index.ts` (the barrel that re-exports it).

  **Net result**: the only `@deprecated` markers left in the active
  tree are on retired Ledger-kernel collection stubs (10 files) and
  retired seeder stubs (3 files) and `tax-automation.service.ts` —
  all already queued for deletion in earlier slice script blocks
  (F + Q + RR). The active import graph is `@deprecated`-free. Hook
  composition in the accounting plugin is now strictly: factory →
  `beforeValidate: [autoPopulateHost]` for tenant population +
  domain-specific hooks call service singletons directly. No more
  service-registry indirection, no more duplicate tenant populators,
  no more middleware that nobody uses.

  All 5 modified files parse `node --check`. Standards gates green.
  Deletion script bumps to ~144 files queued.
- **Service-layer + DTO `hostId` → `tenantId` rename** (Slice OOO).
  Closes the cosmetic residual documented in Slice III as "no
  production impact, deferred". User redirected to "focus on payload
  types and hooks" so I applied the full rename. Mechanical perl
  rewrite across 18 files:
  - 7 DTO type files: `bank-reconciliation`, `events`,
    `financial-statements`, `gl-account`, `host`, `multi-currency`,
    `period-end` — interface fields, method-parameter names, and
    "host id" / "Host ID" prose comments.
  - 11 service files: `bank-reconciliation`, `bank-statement-import`,
    `event-emitter`, `financial-reporting`, `gl-account`, `gl-posting`,
    `host`, `journal-entry`, `multi-currency`,
    `period-end-adjustment`, `tax-automation` — internal field reads,
    log messages, method bodies.
  - Plus `hostIds` → `tenantIds` for the batch-operation type in
    `host.ts`.

  Also audited the 4 root hooks (`enforceDocumentTenantForUser`,
  `ensureUniqueSlugWithinTenant`, `populatePublishedAt`,
  `revalidateRedirects`) and 16 collection hooks: all clean — none use
  the broken `req.user.host` / `req.user.hostId` / `req.payload.services`
  patterns. The accounting plugin was the only place those bugs
  lived.

  After OOO, a grep for `\bhostId\b` across the whole tree returns
  zero matches outside `src/payload-types.ts` (generated; will
  regenerate clean on `pnpm generate:types:payload`) and one prose
  mention in a Tenants JSDoc comment about the HTTP `Host` header
  (unrelated to tenant id). All 18 files parse `node --check`.
  Standards gates green.
- **All-collection access standardization** (Slice NNN — extends MMM
  to the rest of `src/collections/`). Two more inline predicates
  flipped to canonical helpers:
  - `Tenants/index.ts`: `read: ({ req }) => Boolean(req.user)` →
    `read: authenticated`.
  - `SubscriptionPlans/index.ts`: `read: () => true` →
    `read: anyone`.

  After NNN, every collection-level access predicate in
  `src/collections/` is one of the canonical helpers
  (`anyone`, `authenticated`, `multiTenantRead`,
  `tenantScopedCollectionReadAccess`, `tenantScopedPostsReadAccess`,
  `authenticatedOrPublished`, `isSuperAdminAccess`, `adminOnly`,
  `superAdminOrTenantAdminAccess`, `createMembershipAdminMutateAccess`)
  or a per-collection predicate factored into its own file
  (`Tenants/access/updateAndDelete.ts`, `Users/access/{create,read,
  updateAndDelete,isAccessingSelf}.ts`,
  `Pages/access/superAdminOrTenantAdmin.ts`). Field-level access
  (4 remaining inline predicates: 1 in Posts, 3 in Users) remains
  inline as those are fine-grained per-field gates, not
  collection-level patterns.
- **Core-collection access DRY consolidation** (Slice MMM). Three real
  bugs found in the 4 core billing collections via the user's "address
  all in the core DRY" prompt — and the pattern that produced them was
  itself non-DRY. Fixed:
  - `src/collections/Items/index.ts` was filtering by `host: { equals: ... }`
    (broken post-CCC; field is now `tenant`). Same shape as the host/tenant
    cluster fixed in Slices PP/QQ/SS/TT/CCC.
  - `src/collections/Payments/index.ts` was filtering by
    `sender: { equals: req.user.address }` and
    `receiver: { equals: req.user.address }`. `req.user.address` is a
    non-existent field — the User schema has
    `addresses: { docs: [...] }` (paginated join), not a singular
    `address`. Same bug class as `req.user.host` from Slice SS — the
    filter would have always returned no results.
  - `src/collections/Invoices/index.ts` had the same
    `req.user.address` bug for `seller`/`buyer`.
  - `src/collections/InvoiceLines/index.ts` had `return true` (no
    tenant scoping at all — relied on parent invoice access alone).

  **DRY refactor**: replaced every per-collection inline access
  predicate across the 4 files with the canonical helpers from
  `@/plugins/auth` (`multiTenantRead`, `adminOnly`) and `@/access/`
  (`authenticated`). Plus added `beforeValidate: [autoPopulateHost]`
  hook to all 4 (CCC's tenant-population is now consistent across
  core + accounting plugin trees). Net duplication eliminated:
  - 4 collections × 4 predicates = 16 inline async functions →
    4 collections × 4 imports of 3 shared helpers.
  - 4 collections each gain the same hook contract for tenant
    auto-populate.

  All 4 collections parse `node --check`. Converging on identical
  access shape: `read: multiTenantRead, create: authenticated,
  update: authenticated, delete: adminOnly`. The next collection that
  needs tenant-scoped CRUD just imports the same three helpers — no
  more inline-predicate copy-paste with shape drift.

- **Importmap freshness gate** (Slice UUU). Extended Slice TTT's
  `pnpm payload:verify-types` from one target (`src/payload-types.ts`)
  to two: also verifies `src/app/(payload)/admin/importMap.js` is
  fresh. Stale importmap is more dangerous than stale types — it's
  not caught by `tsc` or `vitest`; it manifests as broken custom
  fields/components in the live admin UI at runtime. Now caught at
  the same cheap gate.
  - Script generalised to a `TARGETS` array of
    `path|regenerate-command|label` tuples; mechanically extensible to
    additional artefacts later.
  - Cloudflare env types (`cloudflare-env.d.ts`, 13,570 lines)
    deliberately not added to the gate — `wrangler types` requires
    Cloudflare API plumbing that complicates CI; staleness there is
    indirectly caught by `tsc --noEmit` since it's consumed by typed
    code (less impactful than importmap which has no static catcher).
- **`payload-types.ts` freshness gate** (Slice TTT). Wired
  `pnpm payload:verify-types` into the gate chain so a stale
  generated types file can't slip through. Mirrors the
  `standards:verify-index` pattern (regenerate to a temp location,
  diff against committed file, fail with an instruction to commit).
  - **`scripts/payload-verify-types.sh`** — new script. Stashes the
    committed `src/payload-types.ts`, runs `pnpm exec payload
    generate:types`, diffs, restores. Idempotent and safe — won't
    leave the working tree dirty whether it passes or fails.
  - **`pnpm check`** — runs `payload:verify-types` after the standards
    gates and before lint/typecheck.
  - **`.husky/pre-push`** — same position; cheapest local gate that
    blocks a stale-types push.
  - **`.github/workflows/ci.yml`** — added to the `typecheck` job
    before `tsc --noEmit` runs. Stale types now fail with a clear
    "regenerate and commit" message instead of as a misleading
    "type X has no member Y" tsc error.
  - **`CONTRIBUTING.md`** — added a new "§4. `pnpm payload:verify-types`
    must pass" section so contributors discover the gate.

  Net result: the gate chain on every push is now standards →
  payload-types fresh → lint → typecheck → tests → CI build. All
  Payload commands have to pass before CI can pass before the push
  lands green.

### Pre-`generate:types` validation pass (Slice RRR)

After CCC field renames + PPP collection removals, audited every
caller of `@/payload-types`:

| Check                                                        | Result      |
|--------------------------------------------------------------|-------------|
| Files importing from `@/payload-types`                       | 56 (all canonical types) |
| Imports of retired collection types (TrialBalance, ARAgingReport, etc.) | 0 |
| Index-type access for renamed fields (`User['host']`, etc.) | 0 |
| Direct field-key string-literal references                   | 0 |
| Standards gates (`--check`, `--required`, `--verify-index`)  | green       |

`pnpm payload generate:types` will produce a clean diff (renamed
fields + dropped retired-collection types + added `dunning-cycle`
task slug + extended `User.roles` enum) and no caller breakage.

### Pre-`migrate:create` validation pass (Slice LLL)

Comprehensive sweep checking every class of issue that could cause
`pnpm payload migrate:create` to fail:

| Check                                                | Result   |
|------------------------------------------------------|----------|
| Duplicate slugs across registered collections        | 0 dupes  |
| `useAsTitle` pointing into nested `type: 'group'`    | 0 blockers (LL fix held) |
| Top-level `name:` collisions within a collection     | 0 (nested-level dupes are legal) |
| `relationship` fields missing `relationTo`            | 0 (false positives — wider grep window) |
| `select` fields missing `options`                     | 0 (false positives — wider grep window) |
| `relationTo` targets unregistered                    | 0 (13 plugin-contributed, all valid) |
| Slice ZZ `dunning-cycle` task vs. collection slug    | no collision (different namespaces) |
| All 5 LL-fixed collections: `useAsTitle` at indent ≤ 6 | all 5 at indent 4 (inline top-level) |
| All 47 modified accounting/auth/hooks files parse    | clean `node --check` |
| Standards gates (`--check`, `--required`, `--verify-index`) | all green |

The Payload config side is as ready as static audit can verify. The
remaining migrate:create concerns are dynamic (database-side schema
generation, foreign-key validity post-CCC rename) and only surface when
you run it locally.

### Cleanup pending — to be executed locally

- `bash scripts/slice-f-delete-dead-stubs.sh` deletes ~137 dead files
  (kernel-shaped collections, deprecated re-export shims, retired test
  stubs, and the 10 top-level legacy dev-notes queued in Slice HH).
  Sandbox cannot delete; this script runs locally then is followed
  by `pnpm tsc --noEmit`, `pnpm payload migrate:create`, and
  `pnpm vitest run` per `docs/MIGRATION_WORKLIST.md` §"Pending — local
  execution only".

### Discovered, design decision pending — three field names for the same tenant relationship

Slice TT audit traced `@/plugins/auth` and `@/plugins/hooks` exports
that the accounting collections import. Both files do exist and parse
cleanly, but their internals share the same broken assumptions as
PP/QQ/SS — and surface a fourth dimension of inconsistency: **the
codebase uses three distinct field names for the same conceptual
"this row's tenant" relationship**.

| Field name | Files                                                             | Used by                          |
|------------|-------------------------------------------------------------------|----------------------------------|
| `host`     | 5 accounting plugin collections + 4 core collections (Payments, Invoices, InvoiceLines, Items) + `accounting/fields.ts` | `multiTenantRead`, `roleScopedAccess`, `autoPopulateHost` (all read `req.user.host`) |
| `hostId`   | 9 accounting plugin collections + `accounting/fields/base-accounting-fields.ts` | `ensureHostId` factory hook + every accounting GL-posting hook |
| `tenant`   | `PaymentMethods`, `Subscriptions` (and the multi-tenant plugin's canonical convention) | `getTenantFromRequest`, the multi-tenant plugin's cookie-driven scoping |

`autoPopulateHost` sets `data.host = req.user.host`. `ensureHostId`
sets `data.hostId = req.payload.requestContext?.hostId`. The two hooks
target different field names on different collections; neither matches
the canonical `tenant` convention used by the rest of the codebase
plus the multi-tenant plugin.

`src/plugins/auth/types.ts` declares:

```ts
export type UserRole = 'admin' | 'accountant' | 'viewer'
export interface UserContext { id: string; host: string; roles: UserRole[] }
```

But `User.roles` is `('super-admin' | 'admin' | 'user' | 'customer')[]`
(no `'accountant'`, no `'viewer'`) and the User schema has no `host`
field at all. So:

- `multiTenantRead` returns `{ host: { equals: undefined } }` —
  matches no rows (or all rows, depending on Payload's filter
  semantics for an `undefined` equals).
- `adminOnly`, `tenantAdmin`, `roleScopedAccess`: `hasRole` works for
  `'admin'` only because that value happens to overlap with the User
  enum. `'accountant'` and `'viewer'` are unreachable in practice.
- `autoPopulateHost` sets `data.host = undefined` on every write.

The PP/QQ/SS/TT findings now share a single root: the accounting
plugin (and its `@/plugins/auth` + `@/plugins/hooks` cousins) were
authored against a user/access/tenant model where User has
`host: string`, `roles: UserRole[]` with `accountant`, and
collections have a `host` field. The actual project's canonical
model is the multi-tenant plugin's `User.tenants[].tenant`
relationship plus the standalone `roles`/`user_roles` collections
(NIST INCITS-359).

**Slice VV positive finding:** the broken pattern is **contained to
the accounting plugin and its `@/plugins/auth` + `@/plugins/hooks`
cousins**. The canonical access layer at `src/access/` (8 files —
`isSuperAdmin`, `tenantScopedRead`, `subscriptionGates`,
`membershipAdminMutateAccess`, `authenticated`,
`authenticatedOrPublished`, `anyone`, `allowPublicReadTenants`) uses
the correct shapes throughout: `roles[]` plural array,
`'super-admin'` from the actual enum, `tenant: { in: ids }`
filtering. Core collections (Tenants, Users, Roles, UserRoles,
Pages, Posts, Media, Categories, etc.) consume these and work
correctly. The systemic remediation only needs to touch the
accounting plugin tree, not the whole app.

Recommended unified fix scope:

1. Rename **every** field across `src/plugins/accounting/` and the
   four core collections (Payments, Invoices, InvoiceLines, Items)
   from `host` / `hostId` to `tenant`. Generates a one-time migration.
2. Rewrite `@/plugins/auth/access.ts` to derive the user's active
   tenant from `req.user.tenants[].tenant` rather than `req.user.host`.
3. Rewrite `@/plugins/hooks/common.ts` `autoPopulateHost` to set
   `data.tenant` from the same source.
4. Replace `req.user.role === 'accountant'` checks with a query
   against the `roles` collection (per `STANDARDS.md` §4.4) or extend
   `User.roles` enum with `'accountant'`.
5. Drop `req.payload.requestContext` and `req.payload.services`
   indirection — direct singleton imports per Slice RR.
6. Fix the test seeds at
   `src/plugins/accounting/seeds/level-{1,2,3}/*.ts` — Slice UU found
   they hand-fabricate User records with `role: 'admin' | 'accountant'
   | 'auditor'` (singular field, undeclared values). They're imported
   by `tests/int/accounting/level-2-integration.int.spec.ts`,
   `level-3-e2e.int.spec.ts`, and `critical-gaps-verification.int.spec.ts`.
   When `pnpm vitest run` finally executes (post deletion-script + post
   role-model fix), these seeds need to align with whichever role model
   step 4 picks.

This is a single-design-pass change touching ~60 source files plus 7
seed files. CHANGELOG already captures the per-finding details under
Slices PP/QQ/SS/TT/UU.

### ~~Discovered, design decision pending~~ — RESOLVED in Slice CCC

The PP/QQ/SS/TT/UU cluster of design-decision-pending findings is
**fully resolved as of Slice CCC** (2026-05-09). The unified 6-step
plan was applied across two slices:

- **Slice BBB**: step 4 (role model — Option A2: extend `User.roles`
  enum + mechanical singular→plural rewrite of 41 predicate sites).
- **Slice CCC**: steps 1+2+3 (rename `host`/`hostId` → `tenant`
  across 20 files; rewrite auth and hooks layers to derive from
  `req.user.tenants[0]?.tenant`).
- **Steps 5+6** (drop service-registry indirection, realign seeds) —
  not yet applied. Step 5 needs each hook to switch from
  `req.payload.services?.glPosting` to a direct singleton import;
  step 6 is mechanical once step 5 lands. Both are tracked in the
  `[Unreleased]` "Cleanup pending" section.

The historical sections that follow are kept for traceability but the
findings they describe have been addressed.

### ~~Discovered, design decision pending~~ — RESOLVED in Slice CCC: `hostId` populator broken end-to-end

Slice SS audit traced `req.user?.hostId` (11 call sites) against the
actual User schema and found that **`hostId` does not exist on
`User`**. The generated `User` interface in `src/payload-types.ts`
declares: `id`, `password`, `name`, `roles[]`, `username`,
`tenants[].tenant`, `orders`, `cart`, `addresses`, `updatedAt`,
`createdAt`, `email`. No `hostId`.

So this fallback chain in `base-accounting-hook.ensureHostId`:

```ts
if (!data.hostId && req.payload.requestContext?.hostId) {
  data.hostId = req.payload.requestContext.hostId;
}
```

is permanently inert. The condition reads:
1. `data.hostId` — undefined on a new document.
2. `req.payload.requestContext?.hostId` — `requestContext` is always
   `undefined` (Slice PP — `hostScopeMiddleware` never wired).

Combined with the fact that **11+ accounting collections declare
`hostId: { type: 'relationship', relationTo: 'tenants', required: true }`**,
every accounting-collection write would be rejected by Payload as
"missing required field" — even before the access-predicate block
from Slice QQ has a chance to deny it.

The canonical multi-tenant model in this project uses
`req.user.tenants[].tenant`. The fix path:

- **Option A**: rewrite `ensureHostId` to derive the tenant from
  `req.user.tenants[]` (typically the first tenant or the active one
  per the multi-tenant plugin's selection cookie). Rename the field
  on accounting collections from `hostId` → `tenant` to match the
  rest of the codebase.
- **Option B**: add an actual `hostId` text/relationship field to the
  User collection. Misaligned with the canonical multi-tenant pattern.
- **Option C**: same as Slice PP/QQ Option C — accept that admin-UI
  writes are gated, defer fixes to a service-layer rewrite that
  derives tenant from request.

Slice PP/QQ/SS share the same root: **the accounting plugin was
authored against a different request/user/role model and never
reconciled with the canonical app**. They should be resolved together.

### Discovered, design decision pending — three incompatible role models in active use

> **Update post-Slice BBB**: the wrong-singular-shape half is fixed
> (41 sites rewritten to `roles?.includes(...)`, `User.roles` enum
> extended with `'accountant'` and `'auditor'`). The remaining work is
> the `req.user.host` cluster (Slices SS+TT) — that field doesn't
> exist regardless of plural/singular and requires Decision B steps
> 1–3 (rename `host`/`hostId` → `tenant`, derive from
> `User.tenants[].tenant`). The remaining content of this section
> documents that residual.

Slice QQ audit traced `req.user?.role === 'admin'` (singular) across 41
call sites in the accounting plugin and found that the field doesn't
exist on the User schema. The project has **three different role models
in simultaneous use**, none of which agree on shape or vocabulary:

1. **Payload User collection** declares `roles: ('super-admin' | 'admin'
   | 'user' | 'customer')[]` — plural array. No `'accountant'` value.
2. **Multi-tenant plugin** declares per-tenant roles as
   `User.tenants[].roles: ('admin' | 'viewer')[]` — also plural, also
   no `'accountant'`.
3. **`roles` collection** (canonical NIST INCITS-359-2012 model — see
   `src/standards/nist-incits-359/` and `src/collections/Roles/`) — role
   definitions as Payload documents with `name`, `binding`,
   `scopedCollection`, `resource`. This is what
   `docs/STANDARDS.md` §4.4 commits to.

The accounting plugin uses **none** of the three. It checks
`req.user?.role === 'admin'` (singular property that doesn't exist) or
`=== 'accountant'` (value not in any of the three enums). Result:
**every accounting-collection access predicate returns `false`**.
Through the admin UI, no user can create, update, or delete in
`tax-jurisdictions`, `journal-entries`, `gl-postings`, `bank-statements`,
`fiscal-periods`, `customers`, `vendors`, `tax-codes`,
`period-end-adjustments`, `budget-planning`, `tax-calculations`,
`currency-rates`, or `fixed-assets`. Combined with the Slice PP DOA
GL-posting finding, the accounting plugin is **doubly broken**:
nothing can write through the UI; even if writes succeeded, hooks
wouldn't post GL entries.

Design decision required:

- **Option A — adopt the canonical `roles` collection.** Replace every
  `req.user?.role === 'X'` with the predicates in `src/access/` (e.g.,
  `isSuperAdmin`, `roleScopedAccess`) that already use
  `nist-incits-359` semantics. Adds `'accountant'` as a Role document
  rather than a string-enum value.
- **Option B — extend the User.roles enum.** Add `'accountant'` to the
  enum at `src/collections/Users/index.ts`, fix the singular/plural
  mismatch via perl rewrite (~41 sites), accept that the plugin uses
  the simpler User.roles model rather than the INCITS-359 documents.
- **Option C — keep current (broken)**: only viable if the accounting
  collections are intentionally write-disabled through the admin UI,
  with all writes going through the planned service layer. Same
  caveats as Slice PP option C.

Affected call sites: `factories/collection-factory.ts` (4),
`PeriodEndAdjustments.ts` (4), `BudgetPlanning.ts` (4),
`JournalEntries.ts` (5), `GLPostings.ts` (4), `BankStatements.ts` (4),
`FinancialStatements.ts` (4), `CurrencyRates.ts` (4),
`TaxCalculations.ts` (4), `FixedAssets.ts` (4) — plus three seed files
that hand-fabricate `User` records with an undeclared `role: 'accountant'`
field that gets silently dropped at write time.

### Discovered, design decision pending — automatic GL-posting hooks are DOA

Slice PP audit found that the entire automatic GL-posting subsystem is
non-functional. README.md still claims "100% GL Automation — Every
transaction creates GL entries" but no transaction creates one. Two
broken contracts:

1. **`req.payload.services` — never wired.** Eight hook implementations
   (`ap-aging`, `ar-aging`, `bill`, `cogs`, `depreciation`, `invoice`,
   `item`, `payment`) all open with `const x = req.payload.services?.<name>`
   then bail with `if (!service) { logger.warn('Service not available');
   return doc; }`. Grep confirms **zero writes to `req.payload.services`
   anywhere in the codebase**. Every hook is a silent no-op on every
   document write.

2. **`hostScopeMiddleware` — exported but never imported as middleware.**
   It's the only thing that populates `req.payload.requestContext.hostId`,
   which 14+ call sites read. Without it wired into Payload's middleware
   chain, `req.payload.requestContext` is `undefined` and every hook
   falls back to `doc.hostId` (which itself depends on
   `autoPopulateHost`). The factory hook `ensureHostId` is wired via
   `createAccountingCollection` but reads the same broken
   `requestContext` the middleware was supposed to populate.

Fixing this is a design decision, not a mechanical edit:

- **Option A — drop the registry**: have each hook directly import its
  service singleton (e.g., `import { glPostingService } from
  '@/services/gl-posting.service'`). Slice RR confirms the services
  exist and are substantively implemented (200–580 lines each, real
  class-based singletons exporting `glPostingService`,
  `glAccountService`, `journalEntryService`, `bankReconciliationService`,
  `bankStatementImportService`, `multiCurrencyService`,
  `financialReportingService`, `periodEndAdjustmentService`, `eventEmitter`,
  `hostService`). Smaller blast radius than Option B; aligns with how
  Payload v3 services typically work.
- **Option B — wire a real registry**: add a `payload.config.ts` `onInit`
  hook that attaches the services map to `payload.services` (Payload v3
  doesn't have a built-in service container; the type would need
  augmentation). Higher complexity, preserves the existing hook code.
- **Option C — accept the no-op**: if GL automation is intentionally
  disabled pending a rewrite, the code should say so explicitly via
  `@deprecated` banners, and the README claim about "100% GL Automation"
  needs adjustment.

Until a decision lands, the hooks fire on every Invoice/Bill/Payment/Item
write but produce no GL entries.

### Discovered, decision pending — `defaultColumns` nested-field references

Slice MM audited every `defaultColumns: [...]` array against actual field
positions and surfaced ~40 entries across 11 collections that point at
fields nested inside `type: 'group'` containers (the same shape as the
Slice LL `useAsTitle` bugs). Unlike `useAsTitle`, this does **not** crash
`migrate:create` — the admin UI silently drops the column or shows a
placeholder. Two fix strategies, requires verification against the
actual Payload version before picking:

1. **Hoist** — same pattern as Slice LL. Pulls each named field out of
   its group to top level. Invasive but matches the existing fix
   convention; preserves any Payload version's column resolution.
2. **Dotted refs** — change `defaultColumns: ['code', ...]` to
   `defaultColumns: ['identity.code', ...]`. Only safe on Payload
   versions that support dotted column references; check before applying.

Affected collections: `Payments`, `Invoices`, `InvoiceLines`, `Items`,
`Customers`, `Vendors`, `TaxCodes`, `TaxJurisdictions`, `FiscalPeriods`,
`FixedAssets`, `FinancialStatements`. Run `bash /tmp/audit-dc.sh` (saved
in `scripts/audit-default-columns.sh` if reused) for the full list with
file:line locations.

## [1.0.0] — 2026-05-09 — Standards taxonomy + enforcement

The codebase is now organised around the standards it implements. Every
governing standard (ISO, RFC, IFRS, US-GAAP, NIST, GDPR, PCI-DSS, SOC 2,
…) is declared via JSDoc banners on the files that implement or use it,
verified by `pnpm standards:check` and gated at five enforcement points.

Executed across Slices A–FF (2026-05-08 / 2026-05-09). For per-slice scope
see [`docs/MIGRATION_WORKLIST.md`](./docs/MIGRATION_WORKLIST.md) §slice-ledger.

### Added

- **`src/standards/<id>/`** — 15 implementation folders, each with
  `README.md` (publisher URL + edition + in-scope/out-of-scope), `index.ts`
  barrel, and pure-function implementation files. Coverage: `iso-4217`,
  `iso-3166-1`, `iso-3166-2`, `iso-8601`, `iso-13616`, `iso-9362`,
  `bcp-47`, `nist-sp-800-38` (AES-GCM), `nist-sp-800-108` (HKDF),
  `nist-incits-359` (RBAC), `rfc-3986` (URI), `rfc-6585` (rate limit),
  `rfc-9110` (HTTP cache adapters), composites `_money` (ISO 4217 +
  integer cents) and `_security-headers` (CSP-3 + HSTS + Permissions-Policy).
- **`tests/standards/<id>/`** — full mirror parity (15 folders, 22
  spec files), all running under the extended vitest glob
  `tests/standards/**/*.int.spec.ts`.
- **JSDoc grammar** (`docs/STANDARDS.md` §3) — seven tags (`@standard`,
  `@rfc`, `@compliance`, `@accounting`, `@security`, `@audit`,
  `@quality`) with parser-readable invariants. 1,926 valid citations
  across `src/`, `tests/`, `docs/` (counts: 745 `@standard`, 291 `@rfc`,
  240 `@compliance`, 298 `@accounting`, 251 `@security`, 101 `@audit`,
  0 `@quality`).
- **`scripts/standards-citation-index.sh`** — citation-index generator
  with three modes: `--audit` (full index), `--counts` (totals),
  `--check` (exit non-zero on malformed banners).
- **pnpm script entries** — `standards:audit`, `standards:counts`,
  `standards:check`. `standards:check` is the first step of `pnpm check`.
- **Five-layer enforcement** — manual (`pnpm standards:check`), local
  gate (`pnpm check`), pre-push (`.husky/pre-push`), CI standards job
  (`.github/workflows/ci.yml`), CI build dependency (`needs: [standards,
  …]`).
- **Reference docs at v1.0.0** — `docs/STANDARDS.md` (taxonomy +
  grammar), `docs/STANDARDS_AUDIT.md` (per-file map + slice ledger +
  dead-trees inventory), `docs/MIGRATION_WORKLIST.md` (pending local
  actions + future-contributor recipe).
- **Onboarding** — root `README.md` rewritten to surface the standards
  system; new `CONTRIBUTING.md` walks contributors through the JSDoc
  banner contract; `.github/pull_request_template.md` adds a four-item
  standards checklist.
- **Reserved future-builder slots** — `saf-t/`, `peppol-bis-3/`,
  `iso-20022/`, `un-edifact/` (folders not yet created; reserved by the
  taxonomy to avoid future churn).

### Changed

- **`src/utilities/`** — pruned to a clean implementer-vs-consumer
  boundary documented in `src/utilities/README.md`. After Slices Q–S, 14
  of 24 surviving top-level files carry standards banners; the remaining
  10 are deliberately pure utilities (`canUseDOM`, `deepMerge`,
  `extractID`, `formatAuthors`, `getCollectionIDType`,
  `tenantLabelForDuplicateAudit`, `toKebabCase`, `ui`, `useClickableCard`,
  `useDebounce`).
- **Original Payload `migrate:create` regression fixed** — the bug that
  triggered this entire effort. `TaxJurisdictions.useAsTitle: 'code'`
  required hoisting `code`, `name`, and `authorityName` out of the
  `identity` group to top-level fields.

### Deprecated

- Legacy import paths under `src/utilities/{encryption, deriveSecret,
  permissions/*, urlUtils, getURL, generatePreviewPath, getDocument,
  getGlobals, getRedirects, securityHeaders, formatDateTime, localeUtils,
  rateLimit, payloadCache}` — replaced by `@/standards/<id>/*` direct
  imports. Re-export shims at the legacy paths are queued for deletion in
  `scripts/slice-f-delete-dead-stubs.sh`.

### Removed (queued — runs locally via deletion script)

- 20 top-level shadow `.ts` in `src/collections/` (each was `export {}`
  with `@deprecated` JSDoc; canonical homes live under
  `src/plugins/accounting/collections/`).
- 5 retired collection-folder stubs (`Customers`, `Vendors`,
  `TaxJurisdictions`, `TaxCodes`, `FiscalPeriods`).
- Retired Ledger kernel (`src/collections/Ledger/`).
- Retired root-level test scaffolding (`src/__tests__/`, `src/lib/`,
  `src/middleware/`, `src/payload/`, `tests/accounting/`).
- Plugin co-located `__tests__/*` (canonical homes under `tests/int/`).
- Deprecated `src/types/{tax,localization}.ts`.
- 10 top-level legacy dev-notes from earlier cleanup passes
  (`CLEANUP_INSTRUCTIONS.md`, `COMPLETE_TEST_IMPLEMENTATION.md`,
  `CONFIG_AWARE_TESTING.md`, `DRY_CLEANUP_SUMMARY.md`,
  `IMPLEMENTATION_SUMMARY.md`, `PLUGIN_REORGANIZATION_SUMMARY.md`,
  `REORGANIZATION_SUMMARY.md`, `SRC_CLEANUP_PLAN.md`,
  `TESTING_ARCHITECTURE.md`, `TEST_SEED_SYSTEM_IMPLEMENTATION.md`) —
  superseded by `CHANGELOG.md` (this file) plus `docs/STANDARDS.md`,
  `docs/STANDARDS_AUDIT.md`, and the per-folder READMEs.

### Fixed

- **Payload `migrate:create` regression** — `TaxJurisdictions` collection
  no longer crashes on `useAsTitle: 'code'` (the bug that triggered this
  entire effort). The fix hoists `code`, `name`, and `authorityName` out
  of the `identity` group to top level.
- **Latent `useAsTitle` bugs in 4 sibling collections** (Slice LL audit) —
  `TaxCodes`, `Customers`, `Vendors`, and `FiscalPeriods` had the same
  nested-group pattern as the original `TaxJurisdictions` bug:
  `useAsTitle` pointing into an `identity` group that Payload does not
  traverse. Each would have failed the next `pnpm payload migrate:create`
  with the same `InvalidConfiguration` error. Same fix applied to all
  four — hoist the title-resolved field (`code` / `label` / `name`) to
  top level while keeping the rest of `identity` intact.
- **Payload v2 import paths in 24 files** (Slices NN + PP) — accounting
  plugin code imported types from v2 paths (`'payload/types'` and
  `'payload/config'`) while the project runs Payload v3
  (`@payloadcms/next: ^3.84.1`). The v3 type exports all moved to the
  package root. Rewritten via `perl -i` across 23 files to
  `import type { ... } from 'payload'`, plus `plugin.ts` fixed manually
  to merge `Plugin` + `CollectionConfig` into one v3 import. Affected: 12
  collection configs (`BankStatements`, `BudgetPlanning`, `CurrencyRates`,
  `FinancialStatements`, `FixedAssets`, `GLAccounts`, `GLPostings`,
  `JournalEntries`, `PeriodEndAdjustments`, `TaxCalculations`), 9 hooks
  (`ap-aging`, `ar-aging`, `bill`, `cogs`, `depreciation`, `invoice`,
  `item`, `payment`, `base-accounting-hook`), `collection-factory.ts`,
  `base-accounting-fields.ts`, `host-scope.ts`, and `plugin.ts`.
- **`FixedAssets.ts` triple-cast hook merge** (Slice NN) — replaced
  `...((createAccountingCollection as any)({} as any, () => []) as any).hooks`
  with a clean two-step `_baseFixedAssets` pattern that merges the
  factory's `beforeChange: [ensureHostId, ...]` with the asset-specific
  `afterChange: [depreciationHook]` without a redundant factory call or
  triple-cast. Same final hook surface, no `as any` markers.
- **Deprecated `src/services/tax-automation.service.ts`** (Slice RR) —
  the file is an explicit `@deprecated` stub with `export {}` body and
  zero importers (verified via grep). It was overlooked by earlier
  cleanup passes. Now queued in `scripts/slice-f-delete-dead-stubs.sh`
  Slice RR block; will be deleted on the next local script run.
  Replacement is to query the Payload `tax-codes` and `tax-jurisdictions`
  collections directly via `req.payload.find({ ... })`.
- **`base-accounting-hook.ts` dead exports** (Slice KKK self-audit).
  Confirmed zero callers across `src/` for `createAccountingHook`,
  `HookHandler`, and `calculateTotal` — they were the abstraction
  layer the 8 domain hooks were intended to be built on, but the
  hooks were written directly without using them. Plus the factory's
  body still references the broken `req.payload.services?.<name>`
  pattern (Slice PP DOA). Marked all three as `@deprecated` with
  precise rationale; the file's `ensureHostId` export remains the
  one real consumer (1 caller at `collection-factory.ts:61`).
- **`hostId` ReferenceError introduced by my own DDD rewrite** (Slice JJJ).
  Slice DDD renamed the local variable `hostId` → `tenant` in 8 hooks
  but missed the **service call sites** — every
  `await someService.method(hostId, data)` still referenced `hostId`,
  which would `ReferenceError: hostId is not defined` the first time
  any of the 8 hooks fired in production. Mechanical perl rewrite
  across the 8 files: `service.method(hostId, ...)` →
  `service.method(tenant, ...)`. All 8 hooks parse `node --check`
  clean afterwards. (The service signatures still receive the value
  as a parameter named `hostId: string` — that's the cosmetic
  vocabulary residual documented in Slice III; values are correct,
  names are not yet renamed.) Self-introduced regression caught by
  spot-reading one of my own outputs in the next slice — argument for
  why `pnpm tsc --noEmit` is the gate that locks this kind of bug.
- **`level-3-e2e.int.spec.ts` CCC fallout** (Slice HHH). The largest
  e2e integration test (`tests/int/accounting/level-3-e2e.int.spec.ts`)
  declared ad-hoc fixture collections with a `hostId` field and used
  `data: { hostId: host.id, ... }` / `where: { hostId: host.id }`
  literals throughout. Both rewritten in one perl pass:
  `name: 'hostId'` → `name: 'tenant'` (5+ fixture schema sites);
  `hostId:` → `tenant:` (20+ data/where literal sites). The local
  variable name `host` (holding a tenant id) preserved for readability;
  only the field-key strings were renamed. Test now aligns with the
  post-CCC canonical schema. Parses clean.
- **`host-scope.ts` middleware perl-mangling cleanup** (Slice GGG —
  CCC fallout). Slice CCC's perl rewrite that removed
  `req.payload.requestContext?.hostId` references left two artifacts
  in `src/plugins/accounting/middleware/host-scope.ts`:
  - Line 25: `const hostId = undefined || (req.user?.tenants?.[0]?.tenant);`
    — same pattern Slice DDD cleaned up in the 8 hooks. Cleaned to
    `const tenantId = req.user?.tenants?.[0]?.tenant;`.
  - Line 37: `undefined = hostId;` — the perl rewrite of
    `req.payload.requestContext.hostId = hostId;` left the `=` operator
    with `undefined` as the LHS. Invalid TypeScript. Removed entirely
    (the requestContext write was never read; Slice PP).
  Also rewrote `validateHostScope` and `enrichGLEntryWithHostContext`
  to use the canonical `tenant` field name. The middleware itself
  remains exported but is marked `@deprecated` in the file's banner —
  Slice PP confirmed it has zero runtime callers; remove once the
  plugin no longer exports it.
- **Decision B step 5a — GL-posting wired + step 5b deprecation
  honesty** (Slice FFF). Two changes:
  - **Step 5a (GL-posting wired)**: added `glPostingService` singleton
    export to `src/services/gl-posting.service.ts` (using the global
    `eventEmitter` from `event-emitter.service.ts`). The 4 GL-posting
    hooks (`item`, `invoice`, `payment`, `bill`) now do
    `import { glPostingService } from '@/services/gl-posting.service'`
    instead of looking up `req.payload.services?.glPosting` (which
    never resolved — Slice PP DOA). The factory
    `initializeGLPosting(emitter)` is preserved for callers that want
    a private EventEmitter.
  - **Step 5b (deprecation honesty)**: the other 4 hooks
    (`ap-aging`, `ar-aging`, `cogs`, `depreciation`) reference services
    (`apAging`, `arAging`, `cogs`, `depreciation`) that **don't exist**
    as service files in `src/services/`. They've been silently no-oping
    in production since the codebase was written. Each hook is now
    marked `@deprecated` with explicit text on what's missing and the
    two ways forward: build the service, or fold the logic into a
    sibling (e.g., COGS into `gl-posting.service.ts`'s invoice handler;
    depreciation into a scheduled job like `dunningJob` in Slices
    ZZ+AAA). The hook bodies still execute the silent-no-op pattern
    rather than throwing, so production behavior is unchanged.

  Net production-behavior change: **GL-posting now actually fires**
  on Invoice / Bill / Payment / Item create+update. Combined with
  Slice CCC (tenant field on accounting collections), the end-to-end
  GL automation chain works for the first time. Hook → service →
  `journalEntryService.createEntry()` is now coherent.
- **Decision B step 6 — seed realignment** (Slice EEE). The 3
  accounting seed files
  (`src/plugins/accounting/seeds/level-{1,2,3}/*.ts`) were imported by
  `tests/int/accounting/{level-2-integration,level-3-e2e,critical-gaps-verification}.int.spec.ts`
  but used the wrong shape for both User records and accounting
  documents. Two mechanical perl rewrites applied:
  - `role: 'X',` (singular field) → `roles: ['X'],` (plural array
    matching the User schema). 7 sites fixed across `level-1` and
    `level-2`.
  - Seed-data field-key `hostId: this.hostId,` → `tenant: this.hostId,`
    matching the post-CCC collection schemas. ~30+ sites across all
    three levels. The class-private `private hostId: string = ''` and
    constructor `hostId: string` parameter names were intentionally
    left as local-variable names — they hold tenant ids but the
    property name doesn't need to match the field key.

  All 3 seed files parse cleanly. When `pnpm vitest run` finally
  executes locally, the integration tests using these seeds will
  produce User records that pass the User.roles enum validation
  (extended in Slice BBB) and accounting documents that satisfy the
  `tenant` required field (renamed in Slice CCC). Decision B step 6
  is now closed.
- **Decision B step 5 partial — `doc.hostId` reads** (Slice DDD).
  Slice CCC renamed the collection field from `hostId` to `tenant`,
  but 8 accounting hooks still read `doc.hostId` (now `undefined`).
  Mechanical perl rewrite of `doc.hostId` → `doc.tenant` across the
  8 hook files (`ap-aging`, `cogs`, `item`, `invoice`, `payment`,
  `ar-aging`, `depreciation`, `bill`) plus cleanup of the
  `const hostId = undefined || doc.tenant;` perl-mangling artifact
  to `const tenant = doc.tenant;`. **Step 5 still partial**: the
  `req.payload.services?.X` lookups in the 8 hooks are still in
  place. Slice DDD discovered that only `gl-posting.service.ts` has
  a corresponding service file (and it requires
  `initializeGLPosting(eventEmitter)` rather than a plain singleton);
  `apAging`, `cogs`, `arAging`, `depreciation` services don't exist
  as files. The full step-5 cleanup needs a design call: build the
  missing service files OR delete the hooks that reference them.
- **Decision B steps 1+2+3 — host/hostId/tenant unification** (Slice CCC).
  - **Step 2** (`src/plugins/auth/access.ts` + `types.ts`): `getUserContext`
    rewritten to derive `tenant` from the canonical
    `req.user.tenants[0]?.tenant` (multi-tenant plugin shape) instead of
    the fictional `req.user.host`. `UserContext.host: string` →
    `UserContext.tenant: string`. `AccessResult.host?` → `AccessResult.tenant?`.
    `UserRole` extended to include `'super-admin' | 'user' | 'customer' |
    'auditor'` (the actual User schema enum + Slice BBB additions).
    All scoped predicates (`multiTenantRead`, `adminOrAccountant`,
    `tenantAdmin`, `scopedAccess`, `roleScopedAccess`) now return
    `{ tenant: { equals: user.tenant } }`.
  - **Step 3** (`src/plugins/hooks/common.ts`): `autoPopulateHost` rewritten
    to set `data.tenant` from `req.user.tenants[0]?.tenant`. Function name
    kept for callsite stability.
  - **Step 1** (20 collection files): mechanical perl rewrite of every
    `name: 'host'` and `name: 'hostId'` field declaration to `name: 'tenant'`.
    Affected: 16 accounting-plugin collections + `Payments`, `Invoices`,
    `InvoiceLines`, `Items` core collections + `accounting/fields.ts` +
    `accounting/fields/base-accounting-fields.ts`.
  - **Cascading rewrites** in 9 accounting-plugin collection files plus
    `collection-factory.ts` + `base-accounting-hook.ts`: every
    `'hostId.id': { equals: req.user?.hostId }` filter rewritten to
    `tenant: { equals: req.user?.tenants?.[0]?.tenant }`; every
    `data.hostId` → `data.tenant`; every dead
    `req.payload.requestContext?.hostId` reference removed (Slice PP
    confirmed it was never wired). `ensureHostId(data, req)` now derives
    from the canonical user.tenants shape.

  Net effect: writes through the admin UI now have a coherent path
  through validation (tenant field exists), access (predicates resolve
  the user's tenant correctly), and hook autoPopulation (data.tenant
  gets set from request user). Combined with Slice BBB (role-shape
  fix), Decision B is fully resolved. Slices PP/QQ/SS/TT/UU/VV/BBB/CCC
  all converge.
- **41 access predicates with non-existent `req.user?.role` shape +
  enum gap** (Slice BBB — Decision B step 4 Option A2). Two changes
  applied together:
  - Added `'accountant'` and `'auditor'` to the `User.roles` enum at
    `src/collections/Users/index.ts:109`. The seeds at
    `src/plugins/accounting/seeds/level-{1,2,3}/*.ts` already create
    users with these role values; before this slice they were
    silently dropped on write.
  - Mechanically rewrote 41 occurrences across 10 files —
    `req.user?.role === 'X'` → `req.user?.roles?.includes('X')`,
    `req.user?.role !== 'X'` → `!req.user?.roles?.includes('X')`,
    and the two factory-internal `=== role` (variable) cases
    rewritten to `roles?.includes(role)`. Affected: factory
    (`collection-factory.ts`), 9 collection configs
    (`PeriodEndAdjustments`, `BudgetPlanning`, `JournalEntries`,
    `GLPostings`, `BankStatements`, `TaxCalculations`,
    `FinancialStatements`, `GLAccounts`, `CurrencyRates`).
  This is half of Slice QQ — the predicates now use the right shape
  AND the right enum values. The other half (`req.user.host` —
  Slices SS+TT) is still pending Decision B steps 1–3 since `host`
  doesn't exist on the User schema regardless of plural/singular.
- **`dunningJob` orphan** (Slices YY+ZZ+AAA) — `src/jobs/dunningJob.ts`
  (275 lines, IFRS 9 / EN 16931 past-due → suspend → cancel cascade)
  was real production code but never registered. `payload.config.ts`
  `tasks: []` was empty; zero importers in `src/`; no wrangler-cron
  trigger. Subscriptions accumulated `past_due` invoices indefinitely
  in production. **Fixed end-to-end:**
  - **Slice ZZ**: registered `'dunning-cycle'` Payload v3 task in
    `payload.config.ts` `jobs.tasks[]` with a dynamic-import handler
    so the 275-line job stays out of the Worker cold-start bundle.
  - **Slice AAA**: added `triggers.crons: ["*/15 * * * *"]` to
    `wrangler.jsonc` so Cloudflare Workers fires the task on a
    15-minute cadence. The Worker's `scheduled()` handler (in
    `.open-next/worker.js`) POSTs to `/api/payload-jobs/run` with the
    Bearer token derived from `PAYLOAD_SECRET` per
    `payload.config.ts` `jobs.access.run`.
  - For long-lived Node deploys, the existing
    `PAYLOAD_JOB_AUTORUN=true` + `autoRun` block (5-minute cron) at
    `payload.config.ts` covers the same task.
- **22 `console.*` calls inside `src/plugins/`** (Slice OO) — replaced
  with `req.payload.logger.{info,warn,error}` across 10 files in the
  accounting plugin: 9 hook implementations (`ap-aging`, `ar-aging`,
  `base-accounting-hook`, `bill`, `cogs`, `depreciation`, `invoice`,
  `item`, `payment`) plus `middleware/host-scope.ts`. The existing
  ESLint rule `payload/proper-payload-logger-usage` is set to `error`
  for `src/plugins/**` (see `eslint.config.mjs:38`), which would have
  failed CI lint as soon as `pnpm lint:src` ran. Error-path calls
  rewritten as `req.payload.logger.error({ err: error }, 'msg')` for
  pino-style structured logging.

[Unreleased]: https://github.com/your-org/erpax/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/your-org/erpax/releases/tag/v1.0.0
