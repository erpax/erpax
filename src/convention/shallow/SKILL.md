---
name: shallow
description: "Use when reasoning about import discipline — an import must reach an atom's index (the one public door), not a deep internal file past the seal; this names the convention, measures the corpus's live shallowness, and is enforced by the import lint (a ratchet on the non-index count, so shallowness can only get tighter)."
atomPath: convention/shallow
coordinate: convention/shallow · 4/weave · 3ffe927d
contentUuid: "88f6242d-ba63-5b7d-8f16-5da3b6c4810d"
diamondUuid: "99fb2055-0dbb-8169-9c74-c02718d4ac60"
uuid: "3ffe927d-5f8c-8421-8036-eef01380bcd1"
horo: 4
bonds:
  in:
    - convention
    - cost
    - exported
    - law
    - tamper
  out:
    - cost
    - exported
    - law
    - tamper
typography:
  partition: convention
  bondDegree: 14
  neighbors: []
standards:
  - "UBL-2.1"
  - "coverage = importPurity() read live from @/tamper/import; never re-implemented, never defaulted"
  - "the import graph is the config — the public face is index.ts only (shallow, never deep)"
bindings: []
neighbors:
  wikilink:
    - cost
    - exported
    - law
    - tamper
  matrix:
    - cost
    - exported
    - law
    - tamper
  backlinks:
    - cost
    - exported
    - law
    - tamper
signatures:
  computationUuid: "48d5f6d3-6c38-866a-951a-a19db72f6d24"
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
      stageUuid: "0a735cea-8f1f-8a88-be09-34546f1d0b60"
    - stage: seal
      stageUuid: "ba603a6d-9b99-84a0-bac7-6ad060029d17"
    - stage: uuid
      stageUuid: "07b06c8d-fa88-8e9a-b6a8-cdf0062c95a5"
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
