---
name: inventory
description: "Use when reasoning about inventory — erpax proves its decisions in Lean. Until this atom, the only way to SEE that was to install Lean 4.33.1 and run it — so every reader who did not met the claim as a sentence…"
atomPath: "verify/inventory"
coordinate: "verify/inventory · 8/crest · cbcd0e73"
contentUuid: "7733f133-64a5-51fa-8ecc-21e424c0c5f0"
diamondUuid: "3d282437-baca-81c2-8f82-541758f95e34"
uuid: "cbcd0e73-652d-853e-bfb2-03093752b61b"
horo: 8
typography:
  partition: verify
  bondDegree: 27
standards: []
bindings: []
signatures:
  computationUuid: "ea419b46-f883-861f-8595-fdbd31b286d3"
  stages:
    - stage: path
      stageUuid: "3b81a920-27b4-8b76-bf60-d1ef1a19d40a"
    - stage: trinity
      stageUuid: "1b360d91-d290-876c-9267-2d25c134c6b4"
    - stage: boundary
      stageUuid: "81c73fe0-dfef-88ab-a056-c4cf0f1f4548"
    - stage: links
      stageUuid: "b06dc464-79f9-8a5a-9f79-3459876554ba"
    - stage: horo
      stageUuid: "e3a198e6-cc4e-89b4-98e9-6eb9221825ee"
    - stage: seal
      stageUuid: "af213eb0-b976-8223-9bd7-86f7fa6b953b"
    - stage: uuid
      stageUuid: "f4c1a898-8261-82b9-96d8-df80381c74c2"
version: 2
---
# verify/inventory — a proof nobody can reach is prose

erpax proves its decisions in Lean. Until this atom, the only way to SEE that was to install Lean
4.33.1 and run it — so every reader who did not met the claim as a sentence, which is the exact
shape [[rules]]/refutable refuses: an assertion with nothing standing beside it that could say no.

The README makes the corpus's strongest claim — *physical FTL on QPU=CPU/GPU* — and carried a table
of numbers under it. Numbers are not evidence of a theorem; they are evidence of a run.

## The block, and why it is structural

A Cloudflare Worker cannot run the kernel. There is no Lean in a Worker and there will not be, so
"just check it at request time" is not a plan. The kernel therefore runs where it can — a developer,
CI — and EMITS what it found; the Worker serves that record at `/api/proof`.

That makes the honesty problem explicit rather than hidden: a record can go stale. `sourcesHash` is
the content address of the `.lean` files the run covered, so a record that no longer matches its
sources is **detectably** stale instead of quietly wrong.

## Parsed from the kernel's own words

`parseAxiomReport` reads `#print axioms` output — `does not depend on any axioms`, or
`depends on axioms: [...]` — and nothing else. A line in neither shape is not an entry, because an
unparsed line must never read as a proof.

It deliberately does NOT read the `.lean` text. Three files in this corpus say "No sorry" in a
comment, and a scan of the source counted those as evidence of no `sorry` while four real stubs sat
in other files ([[rules]]/prose paid for that twice). `sorryAx` in the kernel's answer is the only
thing that settles it, and `proofCensus` counts a stubbed theorem as stubbed, never as proved.

**Honest boundary.** This proves the corpus's theorems were ACCEPTED BY A KERNEL at a stated source
hash. It does not prove they are the right theorems, that they model what their twin does, or that
the twin obeys them — each of those is a per-case read, and the twins carry their own tests. And a
theorem proves its DECISION, never the facts it is fed.

**Law — [[law]]: a proof must be reachable by the reader it is addressed to. Run the kernel where
it can run, emit what it said, serve that — and content-address the sources so a stale record
announces itself.**

Composes: [[rules]]/refutable · [[rules]]/prose · [[verify]] · [[law]].
