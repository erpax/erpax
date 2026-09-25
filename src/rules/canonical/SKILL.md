---
name: canonical
description: "Use when checking that an installed package is actually used through its own API — a dependency in package.json whose exports are never called in src is dead weight or a hand-roll waiting to happen. Export names are READ from the package (r2Storage is not derivable from @payloadcms/storage-r2), never guessed from the dep name; an import alone is not use, the call site is the evidence. Run: tsx src/rules/canonical/index.ts"
atomPath: "rules/canonical"
coordinate: "rules/canonical · 1/base · ae37c1af"
contentUuid: "04f8f9d3-fe5d-58ce-9c36-d0a833dd3f53"
diamondUuid: "595ca223-3559-8917-ad34-56693202bad9"
uuid: "ae37c1af-1b6f-89a6-af41-25f2dabdded0"
horo: 1
typography:
  partition: rules
  bondDegree: 6
standards:
  - "ISO/IEC 25010:2023 §5.5 reusability — use the dependency or drop it"
bindings: []
signatures:
  computationUuid: "824089c7-f9c3-8480-a7a8-b7d4fc8326b8"
  stages:
    - stage: path
      stageUuid: "e528b63d-cf3f-820b-84cb-079a936e9a0e"
    - stage: trinity
      stageUuid: "0c966ef7-b9f1-862f-923f-78f5f2657ad7"
    - stage: boundary
      stageUuid: "8ce61971-873c-81a2-bb3d-4f12f947822f"
    - stage: links
      stageUuid: "b279fc1e-4e0d-80b6-8f14-7e16854e853e"
    - stage: horo
      stageUuid: "813e3015-cb6f-8315-9a96-6b33eefeea0b"
    - stage: seal
      stageUuid: "14b51cff-c456-8397-89ab-e8e595f6ffdc"
    - stage: uuid
      stageUuid: "ec73da96-d82c-86e5-89ff-a45cb9624f2a"
version: 2
---
# canonical — use the package or drop it

Minimum tokens come from **minimum prose and maximum code**. "Use packages canonically" as prose costs ~550 tokens in every agent's system prompt, on every turn, forever — and still relies on the agent choosing to obey. As a **gate** it costs zero tokens and cannot be violated ([[rules]]: a law is obeyed only when a gate blocks its violation, not when it is written down).

The violation is mechanical: a governed dependency whose exports are never called in hand-written `src/`. It was real three times:

| package | the hand-roll beside it |
| --- | --- |
| `plugin-nested-docs` | 9 collections hand-rolled a self-referential `parent` tree — now wired computed in `payload.config.ts` |
| `plugin-multi-tenant` | *imported* but never called, beside a hand-rolled `tenantCollectionsConfig` |
| `plugin-seo` | installed, never called |

- `exportNamesOf(pkgDir)` — the package's own type face is the authority on its API. `r2Storage` cannot be derived from `@payloadcms/storage-r2`, so the name is never guessed.
- `unwiredPackages(cwd)` — governed deps (`@payloadcms/plugin-*`, `@payloadcms/storage-*`) with no call site. **An import is not use** — the call is. Generated bundles (`skills.index.ts`, `payload-types.ts`) restate every symbol, so they are not evidence.
- `assertPackagesCanonical(cwd, ceiling)` — ratchets: fails on getting worse, the ceiling drops as each is wired or dropped.

**Honest boundary.** This proves a package is *called*, never that it is called *well* — extending through a plugin's override API vs fighting it is beyond the gate. And a package with no readable API face is never judged rather than guessed at.

## Is the installed Payload the newest one published?

Measured 2026-09-25: **no — 135 published versions behind.**

```
payload 4.0.0-internal.38b7f1d (2026-05-12)
newest  4.0.0-canary.37        (2026-09-24)
```

The 4.x line also **moved tag**: `internal` now points at `3.91.0-internal`, and the newest 4.x
builds ship under `canary`. An upgrade is a tag change, not just a version bump.

## Ordering is by publish TIME, never by semver

The 4.x versions are `4.0.0-internal.<git-hash>`. Semver compares pre-release identifiers
alphanumerically, so `…fec2230` sorts above `…38b7f1d` **because of the hash** — a confident,
meaningless verdict. `newestByTime` reads the registry's own `time` map instead, and the hermetic
test pins exactly that case: the semver-preferred answer is asserted to be the wrong one.

## Two things the first run corrected

**An unreachable registry is not a pass.** `currencyOf` takes `fetchTime` injected, so the logic is
testable offline, and returns `reachable: false` rather than `behind: 0` — an unasked question
reported as green is the defect named across this corpus.

**"All at one version" was over-strong.** The first run went red on
`@payloadcms/eslint-plugin` at `3.28.0` against everyone else's `4.0.0-internal`. That version **is**
its newest — no 4.x exists and nothing has been published after it. The law is *each package at its
own newest*, which a shared-version check cannot express; the runtime packages are asserted to move
as one line, and the tool packages are not.

## Why the live check ratchets instead of demanding the newest

Payload publishes the 4.x internal line roughly daily — 135 builds in four months. A test demanding
the very newest would go red every morning over something nobody can act on that day. The gap is
**always printed**, and the assertion is that it does not grow. The horizon is 0 and the ceiling is
where the tree actually stands.

## `thinPackages` — the dependency surface, and what a local solution could actually replace

*"Imagine every external dependency consolidated into a local solution."* Measured rather than
imagined, 2026-09-25:

| | count |
| --- | ---: |
| direct dependencies | 81 → **76** |
| platform — payload · next · react · wrangler · drizzle · sharp · graphql | 32 |
| the rest | 44 |
| imported from **at most two** places in `src` | 40 → **35** |
| imported **nowhere** in `src` | 7 → **2** |

The 32 are irreducible and this atom's own law says why: an installed package is used through its
own API **or dropped** — erpax exists to use Payload canonically, so replacing it locally would be
the hand-roll the gate was written to catch. The reducible surface is the other 44, and it is thin:
26 radix primitives carrying 32 call sites between them, and a tail of single-site libraries.

Five were carried for nothing and are now gone — `@hookform/resolvers` (the adapter, while
`react-hook-form` itself has 11 sites), `@stripe/react-stripe-js` and `@stripe/stripe-js` (the
server `stripe` SDK has 7 sites; nothing calls `loadStripe`), `date-fns` (no reference anywhere in
the repo), and `tailwindcss-animate` (absent from a 48-line tailwind config with no `plugins` key).

**The price of the dependency is measured, not asserted.** The same day this was counted, a canary
upgrade was reverted because a 371-line local patch targeted `dist/endpoints/mcp.js` and upstream
had restructured to `dist/endpoint/`. That is what an external dependency costs when it moves: not
the bytes, the patch.

**Honest boundary.** This counts import sites **under `src`**, so a dependency used by a config, a
git hook or a `package.json` script reads as zero. `cross-env` (`.husky/pre-push`) and `dotenv`
(`playwright.config.ts`, `vitest.setup.ts`) are exactly that, and a test pins them as the expected
residue — reporting them as dead would be the false positive this corpus has paid for repeatedly.
Thin is a **candidate**, never a verdict: one call site for a library that does something hard is
a good trade, and `PLATFORM` is DECLARED in the open so the irreducible list can be argued with.

## What counts as use — two allowances the tree forced

The gate reported three unwired packages and **two of them were wired**:

| package | why it read as unwired |
| --- | --- |
| `plugin-multi-tenant` | `multiTenantPlugin<Config>({…})` — a generic call is still a call, and `\bname\s*\(` cannot see past the type arguments. It was fully wired, with a computed collection map and cookie-derived tenant defaults. |
| `plugin-seo` | the plugin's OWN documentation offers direct field use as the alternative to calling it — *"if you need more flexibility you can insert the fields manually"* — and `pages` and `posts` take exactly that path, importing `@payloadcms/plugin-seo/fields`. |

So a documented **subpath import** counts as use, and a call with type arguments counts as a call.
A gate that flags canonical use as a violation teaches people to ignore it.

Only `plugin-import-export` was genuinely unwired: installed, documented in two SKILLs as the import
route, and never registered — so the Admin had no Imports panel at all.

**Law — [[law]]: an installed package is used through its own API or dropped — a dependency whose exports are never called is dead weight or a re-implementation of what it already ships.**

Composes: [[rules]] · [[law]].
