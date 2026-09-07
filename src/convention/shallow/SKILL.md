---
name: shallow
description: "Use when reasoning about import discipline — an import must reach an atom's index (the one public door), not a deep internal file past the seal; this names the convention, measures the corpus's live shallowness, and is enforced by the import lint (a ratchet on the non-index count, so shallowness can only get tighter)."
atomPath: "convention/shallow"
coordinate: "convention/shallow · 7/descent · 20ea61c3"
contentUuid: "62a37ce3-f991-5d6f-ab72-9ef6808183a2"
diamondUuid: "a5c6e564-44a3-851d-b715-e83b8dd5a8fa"
uuid: "20ea61c3-cb79-8707-a7f8-fb48d92678f3"
horo: 7
typography:
  partition: convention
  bondDegree: 16
standards:
  - "UBL-2.1"
  - "the import graph is the config — the public face is index.ts only (shallow, never deep)"
bindings: []
signatures:
  computationUuid: "27560b4b-d455-82d4-ad34-7645f6e319da"
  stages:
    - stage: path
      stageUuid: "b809a38c-8b5b-873a-be5f-a515d158c88e"
    - stage: trinity
      stageUuid: "6b10b01f-f477-8ccb-ba9e-10e8d655fd50"
    - stage: boundary
      stageUuid: "16456211-21bd-8820-9c0d-8b10cdf51a02"
    - stage: links
      stageUuid: "bcb3fcdf-7716-89c4-92b2-825adfb60837"
    - stage: horo
      stageUuid: "c999f3f3-c347-88ba-89f6-a953ecef62e0"
    - stage: seal
      stageUuid: "2f5156ef-115f-8824-b7bc-f6b8d4ecbccc"
    - stage: uuid
      stageUuid: "5f4808bd-4b3f-8002-b064-c4f872ce64d2"
version: 2
---
# convention/shallow — import the index, not a deep file

Each atom's `index.ts` is its **public content-uuid contract** — the one door. An import is **shallow** when it reaches that index (`@/x`, or a sub-atom `@/x/y` that is itself a dir carrying an index) and **deep** when it reaches past the seal to an internal file (`@/x/y.ts`). The convention is one line: **import the index, not a deep file.**

A deep import is not a style nit; it is an **uncovered coupling** — it binds to an internal the atom never promised, so a tamper can change that internal without the public face (or any importer's contract) noticing. Shallow imports keep the import graph **sealed**, which is why shallowness folds into the same coverage law tamper-cost runs: coverage → 1 ⇒ ∞ as the limit. That seal is held by a **gate**, not by assertion — the import lint (`pnpm lint:imports`, wired into `.husky/pre-push` + the `check` chain) is a **ratchet** that fails the build the moment the live non-index count rises above its committed baseline. The corpus is not yet at coverage 1 (~80.7% today); the discipline the gate enforces is that it cannot regress — shallowness only deepens toward the sealed limit, never away from it.

This is the **convention** (named principle) face of the matter-twin [[tamper]]/import, which already computes the price. So this atom does **not** re-scan the tree — it **composes** `importPurity` (DRY: one canonical reader of the import graph). `coverage()` is that index-only fraction — the live shallowness of the whole corpus, in [0,1] by construction, with no default: the value **is** the law, measured.

Matter-twin: `src/convention/shallow/index.ts` (`coverage`) — composes [[tamper]]/import (`importPurity`) · grounded in [[law]] · the importer-side of [[exported]] (shallow forbids reaching PAST the seal; exported obliges the atom to put the consumed surface AT the seal).

**Law — [[law]]: import the index, not a deep file. The index is the atom's public seal; an import past it to a deep internal is an uncovered coupling that lowers tamper-[[cost]]. Import only shallow — every deep import is a measured gap, and the import lint (a ratchet) fails the build when that gap count grows, so the graph can only seal further toward the ∞ limit at coverage 1.**

@audit coverage = importPurity() read live from @/tamper/import; never re-implemented, never defaulted
@standard the import graph is the config — the public face is index.ts only (shallow, never deep)
