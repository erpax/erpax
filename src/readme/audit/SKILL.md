---
name: audit
description: "Use when reasoning about audit — The root README carries a header saying *do not edit by hand, drift fails closed*."
atomPath: "readme/audit"
coordinate: "readme/audit · 5/round · 563f12f0"
contentUuid: "efbc35f7-d357-5169-9795-2715cbd11be3"
diamondUuid: "ebe38c5f-5178-8701-849f-11cb8ff09d50"
uuid: "563f12f0-31ca-842f-ad54-b5ca94916560"
horo: 5
typography:
  partition: readme
  bondDegree: 138
standards:
  - "ISO 19011:2018 §6.4 — audit evidence: a restated figure must agree with its source"
  - "ISO/IEC 25010:2023 §5.6 — maintainability: a copied answer is a second source of truth"
bindings: []
signatures:
  computationUuid: "cf254d0e-c764-8d98-a2bf-29e48cb1a13d"
  stages:
    - stage: path
      stageUuid: "7bb8ccd2-71fd-89d2-af7e-2c7021ba7691"
    - stage: trinity
      stageUuid: "0d760134-8010-8d68-992e-7dee30d367c9"
    - stage: boundary
      stageUuid: "1e99eb89-2c3d-89f0-8b8c-b3eff858dbd1"
    - stage: links
      stageUuid: "6953933d-0b53-8cc9-b143-c0e3f4526cd0"
    - stage: horo
      stageUuid: "c95aa301-a2f1-8598-98e3-c7098d0bc09a"
    - stage: seal
      stageUuid: "cff425f6-61cc-8a0c-b8c3-782d1d2f9ce1"
    - stage: uuid
      stageUuid: "1611c341-470f-826e-a3cd-3f9a694f61fc"
version: 2
---
# readme/audit — the README is generated, so its redundancy is a bug in the generator

The root README carries a header saying *do not edit by hand, drift fails closed*. It was stale
anyway: it announced version `1.0.5` against a tree at `1.0.7`, and its `## stack` section listed
five dependencies — `@hookform/resolvers`, both `@stripe/*` browser SDKs, `date-fns`,
`tailwindcss-animate` — that [[rules]]/canonical had already removed from `package.json`.

The reason is [[rules]]/command's law, one surface over: **`pnpm readme:check` times out at the
computed rung and exits 1**, so the drift gate never finishes. A check that cannot complete tells
you nothing, and what it was guarding rotted in the open for as long as nobody looked.

## What it measures, and the scope that makes the number honest

Both shapes are scoped to a **structured list** — a `·`-joined run of code spans, which is what a
generator's `.map().join(' · ')` emits. Free prose is not judged, and that scope is the whole
reason this is a wall rather than noise.

| kind | the live defect it was built on |
| --- | --- |
| `item` | the horo ring read `` `identity` · `whole` · … · `whole` `` |
| `echo` | `## payload` printed `4.0.0-internal.38b7f1d` **twenty times** |

**`item` — the facet column was not addressable.** The ranking keyed on `n.atom`, the leaf word, and
a leaf is not unique: horo 9 holds **27** atoms of which **13 are all named `hooks`**
(`posts/hooks`, `invoices/hooks`, `gl/accounts/period/end/adjustments/hooks`…) and 4 named `config`.
So the column printed one word twice while a genuinely distinct facet lost the slot, and a reader
could not tell *which* `hooks` was principal. That is [[path]]'s law — the path IS the message —
broken in the corpus's own face, and [[rules]]/probe's law arriving one atom over: **a list that
selects by name cannot distinguish two things that share one.** The fix is the path, not a dedup;
paths are unique by construction, so the address does the work for free.

**`echo` — a list that states one thing N times.** Twenty `@payloadcms/*` packages all carried the
same version, so the section repeated one string twenty times to say *the runtime line moves as
one* — which is a fact [[rules]]/canonical measured, and which the fold now states in one line
while still **naming** any package off that line. `## stack` went the same way: 56 entries restating
`package.json`, which is [[rules]]/drift's exact class — a copied answer is a second source of
truth, and this one rotted by five entries. The count stays; the list is one `cat` away and cannot
be stale.

## Three refusals, two of them false positives this gate produced

- **A `·` INSIDE a table cell is not a list.** The digit table reads
  ``| 0 | `1` | 0° | `8` | 9 | `1` | C (Do) · 256 Hz | C `#00aeef` |`` — the digit and its own
  reverse coincide, and they must. Splitting the line on `·` read two cells as one list and
  reported a lawful table as duplication. Cells are split on the pipe first.
- **Free prose is not judged.** A first pass hunted the longest fragment repeated anywhere in a line
  and returned six findings against the live README, **all six lawful**: `VERIFIABLE in polynomial
  time` beside `SOLVABLE in polynomial time` *is* the statement of P vs NP, `opennextjs-cloudflare
  build && opennextjs-cloudflare preview` is two commands, and ``[`url`](url)`` is a self-link.
  Separating those from a generator printing one clause twice needs a list of exemptions, and four
  instruments in this corpus have already been retired for a noise floor above their signal.
- **A two-item list cannot echo.** Two entries sharing a suffix is a rhyme, not a restatement;
  `echo` needs three, so the finding is about a list rather than a pair.

`MIN_SHARED` is DECLARED at 12 in the open, so it can be argued with.

## Honest boundary

This judges the **root** README, which is the public face; the same class exists in all 3,563 folder
READMEs and is not covered — their `[[standards]]` sections would legitimately share long prefixes,
so widening needs its own refusals rather than the same threshold. It proves a generated list does
not restate itself, never that the list is **right** — a facet column naming six correct paths in
the wrong order passes, and so does a count that is computed from a wrong arbiter. And the FTL
section's duplicated clause (`holds ⇔ X — X`, where the model assigned a `why` in the holding case
against its own comment saying the holding case has none) is fixed at the generator and **not
gated**, for the reason named above.

Zero is a **theorem**, not a ratchet: a list ranked by a measure has no reason to name one thing
twice, and a generator has no reason to print one fragment N times to say it once.

**Law — [[law]]: a generated face may not restate itself. The README is a projection, so every
repetition in it is a defect in the projector — fix the generator, never the file, and never gate
free prose, where repetition is how meaning is made.**

## Standards

- **ISO/IEC 25010:2023 §5.6** — maintainability: a copied answer is a second source of truth.
- **ISO 19011:2018 §6.4** — audit evidence: a restated figure must agree with its source.

Composes: [[readme]] · [[rules]]/drift · [[rules]]/probe · [[rules]]/command · [[path]] · [[law]].
