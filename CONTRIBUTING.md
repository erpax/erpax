# Contributing to ERPAX

Thanks for taking the time to contribute. This file is a short, opinionated
walkthrough of the parts of the codebase that aren't obvious. **Read
[`README.md`](./README.md) first** for the project overview and the standards
system links — this file builds on that.

## Setup

```bash
pnpm install
pnpm setup            # one-time: scaffolds .env from .env.example
pnpm dev              # local Payload + Next.js
pnpm test             # vitest integration suite
pnpm check            # the local gate (standards + lint + typecheck + tests)
```

`pnpm check` is the first thing CI runs. Run it locally before pushing —
the pre-push hook runs the same checks but it's faster to fix things on a
clean shell than mid-push.

## Branching

- Branch from `main` (or `master`).
- Use `feature/<short-name>`, `fix/<short-name>`, or `chore/<short-name>`.
- Keep PRs scoped — one slice per PR (see "Slices" below).

## The standards system — what every PR must respect

This codebase is organised around the standards it implements. **Read
[`docs/STANDARDS.md`](./docs/STANDARDS.md) before adding new code.** Three
rules apply to every PR:

### 1. Every standards-bearing file carries a JSDoc banner

Format from [`docs/STANDARDS.md`](./docs/STANDARDS.md) §3:

```ts
/**
 * <one-line summary>
 *
 * @standard ISO-4217:2015 currency-codes
 * @rfc 9110 http-semantics
 * @compliance GDPR Art.6(1)(b) lawful-basis-contract
 * @security ISO-27001 A.5.18 access-rights
 * @see docs/STANDARDS.md §4.1
 */
```

Pure utilities that touch no standard (DOM detection, debouncing, deep
merge, etc.) deliberately do **not** carry a banner. See
[`src/utilities/README.md`](./src/utilities/README.md) for the
implementer-vs-consumer boundary.

### 2. Code that *implements* a standard lives under `src/standards/<id>/`

Code that *uses* a standard (a Payload collection storing ISO 4217 currency
codes) stays in its domain folder and declares the standard via the JSDoc
banner. The `src/standards/<id>/` folder convention plus per-folder README
covers everything currently implemented; see
[`src/standards/README.md`](./src/standards/README.md) for the layout rules.

Tests for `src/standards/<id>/` modules mirror at `tests/standards/<id>/`.

### 3. `pnpm standards:check` must pass

`pnpm standards:check` greps for malformed banners (a tag with no value)
and exits non-zero. It runs:

- as the first step of `pnpm check`
- as the first step of `.husky/pre-push`
- as a dedicated job in `.github/workflows/ci.yml` (blocks the build job)

If you're confused about what's wrong, run `pnpm standards:audit` to see
the full citation index and `pnpm standards:counts` for tag totals.

### 4. `pnpm payload:verify-types` must pass

If you change a Payload collection / global / hook signature, you MUST
regenerate `src/payload-types.ts` and commit it. The
`pnpm payload:verify-types` gate enforces this — it regenerates types
from the live Payload config and exits non-zero if the result differs
from the committed file.

```bash
pnpm generate:types:payload   # writes src/payload-types.ts
git add src/payload-types.ts
```

The gate runs as part of `pnpm check`, the pre-push hook, and the CI
typecheck job. Stale types let `tsc` pass in dev but fail in fresh
checkouts — this prevents that.

## Adding code that touches a standard

### Adding a banner to an existing file

Open the file. If it already has a JSDoc header comment, add the relevant
tags. If it doesn't, write one before the first non-import statement (per
[`docs/STANDARDS.md`](./docs/STANDARDS.md) §6 banner placement rules).
Tag and value go on the same line — no soft wraps.

### Adding a new standard

Follow the recipe in
[`docs/MIGRATION_WORKLIST.md`](./docs/MIGRATION_WORKLIST.md) "Adding a new
slice":

1. Create `src/standards/<id>/` with `README.md` (publisher URL, edition,
   in-scope, out-of-scope, used-by).
2. Add the implementation file(s) with JSDoc banners.
3. Mirror the test folder at `tests/standards/<id>/`.
4. Re-export from `src/standards/index.ts` (master barrel for grep-traceability).
5. Append a row to [`docs/STANDARDS_AUDIT.md`](./docs/STANDARDS_AUDIT.md) §0
   and §9.
6. Append a one-line ledger entry to
   [`docs/MIGRATION_WORKLIST.md`](./docs/MIGRATION_WORKLIST.md).

Composite folders (multiple standards, leading underscore) follow the same
convention — see `_money/` and `_security-headers/`.

### Slices

The standards refactor was executed in lettered slices (A, B, C, …). The
ledger lives at `docs/MIGRATION_WORKLIST.md` §slice-ledger. New work should
follow the same discipline: one PR = one slice = one coherent goal,
verifiable by `pnpm check`. Big restructurings get split.

## Pull request flow

1. Branch, commit, push.
2. Pre-push hook runs the local gate (`pnpm standards:check` then lint /
   typecheck / vitest). Fix anything it surfaces.
3. Open a PR using the [PR template](./.github/pull_request_template.md).
4. Tick the standards checklist items honestly — reviewers will check.
5. CI runs the same gates plus a production build. PRs cannot merge until
   `standards`, `lint`, `typecheck`, `test-int`, and `build` are all green.

## Bug fixes vs. tech debt

Minor bug fixes don't need to introduce new standards citations. Tech debt
that touches standards-bearing code does — if you're refactoring an
encryption helper, the new file inherits the AES-GCM / NIST SP 800-38 / RFC
5116 banners from the old one.

When in doubt, run `pnpm standards:audit` and look at how a comparable file
in the same area is annotated.

## Code review

Reviewers will check:

- [ ] `pnpm standards:check` is green (CI confirms this).
- [ ] New standards-bearing files carry a banner per
      [`docs/STANDARDS.md`](./docs/STANDARDS.md) §3.
- [ ] Pure utilities don't carry an inappropriate banner.
- [ ] If the PR adds a `src/standards/<id>/` folder, it has a README, an
      implementation, a test mirror, a barrel re-export, and audit-doc
      updates.
- [ ] Test files declare the same standards as their subject + ISO/IEC 29119.

## License

Contributions are accepted under the project's MIT license (see
[`README.md`](./README.md)).
