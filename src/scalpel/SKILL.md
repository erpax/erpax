---
name: scalpel
description: "Use when many agents must edit in thousands without fabricating — read-only researchers emit op manifests (file · find · replace · reason); one executor cuts in ≤30-file batches, unique-match-or-refuse, ring-verified, red rolls back to the byte."
atomPath: scalpel
coordinate: "scalpel · 2/share · a0bca92e"
contentUuid: "53fa78d1-3e1d-59cc-87f8-dd5f99b467d0"
diamondUuid: "63ab5e90-2a91-81ef-bf3c-54d606474925"
uuid: "a0bca92e-a45b-852c-85c4-a2cc5c0b241a"
horo: 2
typography:
  partition: scalpel
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "01425881-7451-8a96-889f-b2f0184ca4ad"
  stages:
    - stage: path
      stageUuid: "6763a441-19e1-80f5-a4d3-fe2eee275050"
    - stage: trinity
      stageUuid: "e5193579-e1c5-8996-8dcf-4c290d55585b"
    - stage: boundary
      stageUuid: "acd0f38e-8c28-8c21-9ad3-72682d576e14"
    - stage: links
      stageUuid: "b84de853-8e45-8ff7-a488-b48f91f12038"
    - stage: horo
      stageUuid: "29af8318-abe2-8f0f-b3ca-09a563e64d14"
    - stage: seal
      stageUuid: "bba7a9f1-16e2-8479-9f20-3b7be30b92de"
    - stage: uuid
      stageUuid: "a81f69b8-7c38-8396-b97e-be91e4cdc8eb"
version: 2
---
# scalpel — coordinated surgical edits in thousands

The coordination law as an engine. Researchers are READ-ONLY — an agent that writes fabricates (measured; the fill-agents lesson), so it emits a **manifest** of operations instead: file · find · replace · **reason** (the evidence a reviewer reads; reasonless ops refuse). `mergeManifests()` joins any number of researchers; `planScalpel()` names every refusal before a byte moves — **a find matching zero times is aimed at matter that is not there, two-plus is ambiguity, both refuse; exactly once cuts**. Two researchers claiming the same bytes is a collision, surfaced, never silently last-wins.

`applyScalpel()` executes sequentially in batches of ≤30 files (the corpus's seal-batch bound), re-verifying uniqueness against the **current** bytes of each file, running the caller's verifier (the [[cli]] ring) after each batch — **a red batch restores every touched file to its pre-batch bytes and stops with the batch named**. Dry-run is the default and the contract.

**Honest boundary.** The scalpel proves each cut landed where it was aimed and that the batch verified — never that the manifest is *wise*: a well-formed op can encode a bad idea, and the reason line is where a human catches it. Moves/renames are git's (`git mv` + [[rules]]/reference followers), not the scalpel's; it cuts bytes in place.

**Law — [[law]]: mass change is many read-only researchers and ONE executor — every cut unique-match-or-refuse with its reason attached, every batch verified or rolled back to the byte, and a collision named before anything is touched.**

Composes: [[mesh]] · [[timeout]] · [[rules]] · [[law]].
