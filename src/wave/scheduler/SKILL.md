---
name: scheduler
description: "Use when scheduling corpus paths into balanced waves — turns the max-work/max-tamper policy into concrete wave-schedule options (unit ceiling, items per wave derived from wave depth, weight function) and walks the live path set into a self-balancing plan."
atomPath: "wave/scheduler"
coordinate: "wave/scheduler · 4/weave · 0d74db50"
contentUuid: "26696803-f7d5-5665-bbbc-5a2f3e150f5f"
diamondUuid: "daaefd6a-0ee5-8db9-b8e1-68631670ffa4"
uuid: "0d74db50-0222-83a7-aba9-193bba2dcd48"
horo: 4
typography:
  partition: wave
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "7a11d281-4315-841d-99bc-8d39be359498"
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
      stageUuid: "3d4e350b-8a3f-8a6e-bbaa-82939b441297"
    - stage: seal
      stageUuid: "6f6a8131-82fb-8781-91db-d1f633e88d91"
    - stage: uuid
      stageUuid: "ebd71630-4c3d-80fe-9391-8e1b89a49545"
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
