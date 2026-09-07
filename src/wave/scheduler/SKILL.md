---
name: scheduler
description: "Use when scheduling corpus paths into balanced waves — turns the max-work/max-tamper policy into concrete wave-schedule options (unit ceiling, items per wave derived from wave depth, weight function) and walks the live path set into a self-balancing plan."
atomPath: "wave/scheduler"
coordinate: "wave/scheduler · 2/share · 40922811"
contentUuid: "e246ec93-4f14-527e-b048-eee77440d200"
diamondUuid: "9d5defd4-a8db-83e2-880a-935d5c99fedd"
uuid: "40922811-e23d-8f34-a196-1033eec0fc82"
horo: 2
typography:
  partition: wave
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "e8a028f4-3a0c-8298-8f43-d9430042e9d1"
  stages:
    - stage: path
      stageUuid: "8f8fb6aa-2abf-8113-9b4e-b3cf4526bf1d"
    - stage: trinity
      stageUuid: "dca8e903-a1e6-8e3c-96a3-96ac6a494084"
    - stage: boundary
      stageUuid: "7329bf6e-a36b-8773-86da-f485c00725ed"
    - stage: links
      stageUuid: "9f113210-de3e-8baf-b632-b34e2bdc0ddd"
    - stage: horo
      stageUuid: "a955187f-6a63-8da0-ae03-279ff41e3cd1"
    - stage: seal
      stageUuid: "6f6a8131-82fb-8781-91db-d1f633e88d91"
    - stage: uuid
      stageUuid: "a61f84ae-36ee-87dc-a2f5-521d427377af"
version: 2
---
# wave/scheduler — policy becomes a schedule

The scheduler is the seam where a **policy** ([[wave]]/policy) becomes a **partition**
([[wave]]/load). `corpusWaveOptsFromPolicy` carries the policy's unit ceiling through
untouched and derives items-per-wave from its **depth** — a deeper plan means smaller
waves — so the ceilings live in one place and every schedule inherits them.

`scheduleCorpusPathsInWaves` then walks the live path set and balances it;
`corpusWaveOptsLiteraryPriority` weights by import position so heavily-depended-on
matter is scheduled first, without changing the policy's ceilings.

**Honest boundary.** Its tests pin the DERIVATION — that the policy actually reaches
the schedule — not the resulting wave count, which depends on whatever the corpus
contains today. Asserting a count here would make the test a hostage to the tree, and
a test that must be edited whenever the corpus grows is a test nobody trusts.

Composes: [[wave]] · [[wave]]/policy · [[wave]]/load · [[path]].
