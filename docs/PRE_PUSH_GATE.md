# ERPax pre-push gate

> Single command — `bash scripts/pre-push.sh` — that runs every architecture guard the maintainer has built. Exit code 0 iff all 5 gates pass. Aborts on first failure.

## Slice FFFFFF (2026-05-11) — self-healing edition

`.husky/pre-push` now **auto-heals deterministically-regenerable artefacts BEFORE the verify gates run**, then re-runs the gates. The principle:

> **Regenerable artefacts auto-heal at push time. Spec-level drift requires human review.**

| Artefact | Generator | What it walks |
|---|---|---|
| `docs/STANDARDS_INDEX.md` | `bash scripts/standards-citation-index.sh --write-index` | every `@standard` / `@rfc` / `@compliance` JSDoc tag |
| `src/payload-types.ts` | `pnpm exec payload generate:types` | every Payload collection schema |
| `src/app/(payload)/admin/importMap.js` | `pnpm exec payload generate:importmap` | every admin component import |

When `bash scripts/auto-heal-generated-artefacts.sh` (called as the first step of pre-push) detects drift in any of these, it regenerates the file, runs `git add`, and commits a single `chore(auto-heal): pre-push regen — <files>` commit before the verify gates run. The gates then verify the heal worked and the push proceeds — no manual `pnpm standards:write-index && git commit && git push` cycle needed.

**Non-auto-healable failures** (fail the gate, require human review):

- malformed `@standard` banner (missing value, wrong format)
- file under `src/standards/<id>/` without any standards citation
- TypeScript errors
- ESLint errors
- Vitest failures
- Untranslated i18n key (Law 3b strict mode)
- Missing `@summary` on a collection (Law 1)
- Unowned chain step (Law 7)

**Why this matters:** commits made with `--no-verify` (sandbox without `pnpm`, rebase, cherry-pick, amend, batch backfill) bypass the pre-commit auto-regen hook. Without pre-push auto-heal, the gate would force a manual fix-commit-retry cycle. With it, the heal is one self-contained chore commit visible in `git log` (audit-trail compliant per ISO 19011 §6.4.6).

## What runs

| # | Gate | Source | What it catches |
|---|---|---|---|
| 1 | `tsc --noEmit` | TypeScript compiler | Type errors anywhere in the project |
| 2 | Architecture invariants (STRICT) | Slice LLLL — `tests/architecture/invariants.spec.ts` | Any failure in 5 axes (standards / expansion / compression / fallback / entropy) — `STRICT_INVARIANTS=1` is forced so warnings stay warnings but failures abort |
| 3 | Business-chain integration tests | Slices KKKK + MMMM + NNNN — `tests/int/chains/*.int.spec.ts` | A chain's seed walks end-to-end; every emit fires; GL is balanced; audit-row count meets the floor |
| 4 | `docs/BUSINESS_CHAINS.md` in sync | `scripts/generate-business-chains-doc.ts` + `git diff` | Registry edited but generated doc not regenerated — doc would drift from code |
| 5 | Barrel ↔ plugin symmetry | grep on `src/plugins/accounting/collections/index.ts` + `plugin.ts` | New collection added to barrel but not registered in plugin (or vice versa) |

## Wire to git

```bash
echo 'bash scripts/pre-push.sh' > .git/hooks/pre-push
chmod +x .git/hooks/pre-push
```

Or via your hook manager (husky / simple-git-hooks). Either way the gate runs on every `git push` and refuses the push when anything fails.

## When to bypass

Bypass `--no-verify` only when:

- The failing test is a known-flake, you've already filed an issue, AND your push doesn't touch the related area.
- You're explicitly pushing a WIP branch to share for review (consider a `wip/` branch prefix).

Bypassing on `main` is not allowed — the same gate runs in CI.

## Local quick re-runs

```bash
# Just the invariants
STRICT_INVARIANTS=1 pnpm vitest run tests/architecture/

# Just one chain
pnpm vitest run tests/int/chains/p2p-three-way-match.int.spec.ts

# Just the doc check
pnpm exec tsx scripts/generate-business-chains-doc.ts && git diff docs/BUSINESS_CHAINS.md
```

@audit ISO-19011:2018 §6.4 audit-evidence-pre-push
@compliance SOX §404 internal-controls release-gate
