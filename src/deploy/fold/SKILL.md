---
name: fold
description: "Use when a heavy dev/meta leaf must not ship in the Cloudflare Worker — the production module swaps live here as data, and their patterns are re-derived against the tree. A NormalModuleReplacement regex is a CLAIM about a path, and the path moves: when the scalpel renamed the matrix data leaf the pattern kept naming its old stem, nothing failed, and ~4 MiB of corpus matrix shipped until Cloudflare refused the upload at 11.5 MiB gz against a 10 MiB ceiling."
atomPath: "deploy/fold"
coordinate: "deploy/fold · 2/share · 94897696"
contentUuid: "76cc6d9a-c443-5425-aed1-f23a3116bd19"
diamondUuid: "ec27393b-64ea-8f5a-96ac-d4c8486dd216"
uuid: "94897696-83d1-82ce-acd5-8a091aaac7b9"
horo: 2
typography:
  partition: deploy
  bondDegree: 89
standards: []
bindings: []
signatures:
  computationUuid: "bfb16934-313b-8afa-b149-e5cab747b86a"
  stages:
    - stage: path
      stageUuid: "fcb39dac-361f-8ee3-9f90-2c20b90541f7"
    - stage: trinity
      stageUuid: "6621ffbd-1f0e-8695-892b-57dd152ac035"
    - stage: boundary
      stageUuid: "ff061174-460c-8805-a4b8-f498bec984c0"
    - stage: links
      stageUuid: "93b3f196-6a40-8964-94e5-1d01f22b659c"
    - stage: horo
      stageUuid: "f8fa679e-49a1-8ad8-afd9-7f218c170d46"
    - stage: seal
      stageUuid: "967a5a7e-7eec-8672-95d8-771ce664e03d"
    - stage: uuid
      stageUuid: "eca3420d-94f3-8f85-9cf8-6658fc907046"
version: 2
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
  was the API error. It reads the bundle a wrangler dry-run pack writes and gzips that one file,
  which is why it agrees with wrangler to 12 bytes. **Once an OpenNext build is on disk the pack
  is required**: no pack, or a pack older than the build, fails. It used to print *nothing packed*
  and exit 0 — nothing weighed reading as a Worker that fits.
- **`foldReadings` / `assertNoFoldLeaks`** — the bundle itself, read for each server fold's own
  content. Everything above checks the **config**, and the config held while a Turbopack build
  shipped all four server folds: next.config's patterns still matched their files, and only the
  webpack path applies them. `deploy/fold` printed *8 folds hold* over a 23.4 MB gz Worker.

  The fingerprint is **pairs** of consecutive string literals from the target, absent from its
  stub, and a pair counts only when both strings sit in the bundle in source order, a few hundred
  bytes apart. Three versions were measured and refused before it:

  | tried | refuted by |
  | --- | --- |
  | an exported name | the stub exports the same name — `UUID_MATRIX_NODES` is in the correctly folded Worker twice |
  | lone literals | 56% of the atom catalogue's are in the folded Worker, through other modules |
  | pairs of printable-ASCII literals | the pack escapes non-ASCII as `\uXXXX`, which dropped 805 of the catalogue's 1,136 literals; the 14 pairs left were mostly atom paths, and 5 matched a sorted path list elsewhere |

  So a pair skips atom paths (shared vocabulary), and each string is looked for raw and escaped.
  Measured 2026-09-11 on the folded webpack Worker, pairs present: matrix 0/64, translations 0/64,
  tool-defs 0/64, atom catalogue 0/64. The same targets minified by esbuild with its ASCII charset:
  59–64 of 64. `LEAK_SHARE` sits at half, between the two. A target with too few pairs to say
  anything fails as *unfingerprinted* — unverifiable is not held.

  It runs on the CI deploy lane: `cloudflare.yml` packs with `wrangler deploy --dry-run` and runs
  `pnpm erpax deploy fold` between the build and the D1 migration, and [[deploy]]/pipeline refuses
  any other order. It stays **out** of open-next's `buildCommand`, where it made Cloudflare's builder
  bundle the Worker twice in an environment nothing here can measure.

`next.config` imports `PRODUCTION_FOLDS` and drives the swaps from it, so the patterns
have **one home** — the registry the test re-derives, never a second copy in a config.

**Honest boundary of the bundle read.** It proves a server fold's **text** is absent, never that
nothing heavy shipped — a leak through a module no fold names is caught only by the ceiling. The
translations catalogue carries the atom catalogue's descriptions, so a translations leak names
both folds: that text is in the bundle either way. And it reads `client` folds not at all, since
their targets legitimately run on the server; the admin browser bundle is not read.

**Honest boundary.** This proves each pattern **matches real matter**, never that the
matter is **dead on a request path** — a fold swapping out something the Worker actually
needs breaks at runtime, and only a human decides which leaf is dev/meta. `foldWeight`
gzips each target on its own while wrangler compresses the packed script **once**, so what
a fold keeps out is an approximation in Cloudflare's units, not the upload's own delta;
`workerBudget` gzips the packed script itself, which is the number Cloudflare judges. And
it judges the src-path folds only — a package-name alias (`typescript`, `next/og`) is not
renamed by the folder law and is left where it is.

**Law — [[law]]: a fold is a claim about a path, and a claim must be refutable. Keep the
pattern beside the matter it swaps and re-derive it against the tree, or a rename turns
the fold off and the bundle grows by megabytes with nothing to say so.**

## Standards

- **ISO/IEC 25010:2023 §5.5** — testability: a swap that cannot fire cannot be tested.
- **ISO/IEC 25010:2023 §5.7.1** — performance/resource utilisation: the artifact has a paid ceiling.

Composes: [[deploy]] · [[rules]]/unraised · [[rules]]/refutable · [[law]].
