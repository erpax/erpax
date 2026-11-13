---
name: inventory
description: "Use when reasoning about inventory — erpax proves its decisions in Lean. Until this atom, the only way to SEE that was to install Lean 4.33.1 and run it — so every reader who did not met the claim as a sentence…"
atomPath: "verify/inventory"
coordinate: "verify/inventory · 8/crest · cbcd0e73"
contentUuid: "54f43b01-c7ea-5bf5-9bd9-b8a4a5b0fd11"
diamondUuid: "dac8d26f-14cd-894d-b81b-25b7f601cbb0"
uuid: "cbcd0e73-652d-853e-bfb2-03093752b61b"
horo: 8
typography:
  partition: verify
  bondDegree: 16
standards: []
bindings: []
signatures:
  computationUuid: "7a758f94-5dc8-8e88-8313-147661af48b2"
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
      stageUuid: "cd2dbb7c-74e0-8c48-9e89-a9f3d32e4c59"
    - stage: seal
      stageUuid: "ac6772e6-14be-8861-9a54-0798dd4539ae"
    - stage: uuid
      stageUuid: "8970c1ba-5f6a-8063-9726-d86223204ecf"
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
