---
name: scalpel
description: "Use when many agents must edit in thousands without fabricating — read-only researchers emit op manifests (file · find · replace · reason); one executor cuts in ≤30-file batches, unique-match-or-refuse, ring-verified, red rolls back to the byte."
atomPath: scalpel
coordinate: "scalpel · 1/base · 3fa20e47"
contentUuid: "3844de0c-a57d-5ddc-b6f1-2d9f04755b13"
diamondUuid: "1c52449d-04e3-824b-9326-59552d9feb14"
uuid: "3fa20e47-dc60-809e-8607-b6ce776a3e06"
horo: 1
typography:
  partition: scalpel
  bondDegree: 19
standards: []
bindings: []
signatures:
  computationUuid: "586e1a73-a422-8fbe-9b29-dae26761f0bf"
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
      stageUuid: "524be4d4-5b6a-810c-80b3-2fa50b12a480"
    - stage: seal
      stageUuid: "bba7a9f1-16e2-8479-9f20-3b7be30b92de"
    - stage: uuid
      stageUuid: "8b6af5f2-feea-8373-9693-5ae712744e07"
version: 2
---
# scalpel — coordinated surgical edits in thousands

The coordination law as an engine. Researchers are READ-ONLY — an agent that writes fabricates (measured; the fill-agents lesson), so it emits a **manifest** of operations instead: file · find · replace · **reason** (the evidence a reviewer reads; reasonless ops refuse). `mergeManifests()` joins any number of researchers; `planScalpel()` names every refusal before a byte moves — **a find matching zero times is aimed at matter that is not there, two-plus is ambiguity, both refuse; exactly once cuts**. Two researchers claiming the same bytes is a collision, surfaced, never silently last-wins.

`applyScalpel()` executes sequentially in batches of ≤30 files (the corpus's seal-batch bound), re-verifying uniqueness against the **current** bytes of each file, running the caller's verifier (the [[cli]] ring) after each batch — **a red batch restores every touched file to its pre-batch bytes and stops with the batch named**. Dry-run is the default and the contract.

**Honest boundary.** The scalpel proves each cut landed where it was aimed and that the batch verified — never that the manifest is *wise*: a well-formed op can encode a bad idea, and the reason line is where a human catches it. Moves/renames are git's (`git mv` + [[rules]]/reference followers), not the scalpel's; it cuts bytes in place.

**Law — [[law]]: mass change is many read-only researchers and ONE executor — every cut unique-match-or-refuse with its reason attached, every batch verified or rolled back to the byte, and a collision named before anything is touched.**

Composes: [[mesh]] · [[timeout]] · [[rules]] · [[law]].
