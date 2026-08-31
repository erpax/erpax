---
name: fold
description: "Use when a heavy dev/meta leaf must not ship in the Cloudflare Worker — the production module swaps live here as data, and their patterns are re-derived against the tree. A NormalModuleReplacement regex is a CLAIM about a path, and the path moves: when the scalpel renamed the matrix data leaf the pattern kept naming its old stem, nothing failed, and ~4 MiB of corpus matrix shipped until Cloudflare refused the upload at 11.5 MiB gz against a 10 MiB ceiling."
atomPath: deploy/fold
---
# deploy/fold — a fold that no longer matches is not folding, and says nothing

The shipped Worker carries the ERP core, never the dev/meta corpus. `next.config` swaps
each heavy leaf for an empty stub in production — one `NormalModuleReplacementPlugin`
per leaf, matched by a **regex over a module path**.

A regex over a path is a claim about the tree, and **the tree moves**:

| | |
| --- | --- |
| `d828b72d3` (2026-08-19) renamed | the matrix data leaf inside `src/uuid/matrix/` — the stem lost its folder-echoing prefix |
| the pattern kept naming | the pre-rename stem (pinned verbatim in this atom's test, where a dead path is a fixture rather than a claim) |
| what failed | **nothing** |
| what shipped | 4.1 MiB of corpus matrix — **1,322 KiB gz** |
| what refused it | Cloudflare, five days later: `11548.19 KiB gz` against a `10 MiB` ceiling |

The build stayed green because a `NormalModuleReplacementPlugin` whose pattern matches
nothing is **silent by design** — there is no such thing as a swap that did not fire.
That is default-ALLOW by omission ([[rules]]/unraised): not a wrong answer, an unasked
question, and the claim *"the corpus is folded out of the bundle"* read as true for as
long as nobody weighed the artifact.

## What is measured

- **`staleFolds`** — for every declared fold: the target **exists**, the pattern
  **matches that target**, and the stub **resolves**. A rename now reddens a test
  instead of quietly adding a megabyte. Zero is a **theorem** here, not a ratchet:
  there is no acceptable number of folds that fold nothing.
- **`foldWeight`** — what each fold keeps out, raw and gzipped, largest first. It is
  what a stale fold costs, in the units Cloudflare bills.
- **`workerBudget` / `assertWorkerFitsBudget`** — the packed artifact against the paid
  `10 MiB` compressed ceiling. Nothing weighed the Worker before; the first measurement
  was the API error. It reads the bundle `PACK_COMMAND` writes and gzips that one file,
  which is why it agrees with wrangler to 12 bytes.

  It is deliberately **NOT** on the deploy chain. Putting it there made the builder bundle
  the Worker twice — a `--dry-run` pack and then the upload — doubling peak memory and disk
  in an environment nothing here can measure. A gate is worth a fast local answer, never a
  second failure mode on the path it is supposed to protect. Run it beside a build:
  `pnpm erpax deploy fold`.

`next.config` imports `PRODUCTION_FOLDS` and drives the swaps from it, so the patterns
have **one home** — the registry the test re-derives, never a second copy in a config.

**Honest boundary.** This proves each pattern **matches real matter**, never that the
matter is **dead on a request path** — a fold swapping out something the Worker actually
needs breaks at runtime, and only a human decides which leaf is dev/meta. `workerBudget`
sums the gzip of each module while wrangler compresses the packed script **once**, so it
is an approximation of that number and not that number: it exists to catch a megabyte
before a ten-minute round trip to a `10027`, not to predict the upload to the byte. And
it judges the src-path folds only — a package-name alias (`typescript`, `next/og`) is not
renamed by the folder law and is left where it is.

**Law — [[law]]: a fold is a claim about a path, and a claim must be refutable. Keep the
pattern beside the matter it swaps and re-derive it against the tree, or a rename turns
the fold off and the bundle grows by megabytes with nothing to say so.**

## Standards

- **ISO/IEC 25010:2023 §5.5** — testability: a swap that cannot fire cannot be tested.
- **ISO/IEC 25010:2023 §5.7.1** — performance/resource utilisation: the artifact has a paid ceiling.

Composes: [[deploy]] · [[rules]]/unraised · [[rules]]/refutable · [[law]].
