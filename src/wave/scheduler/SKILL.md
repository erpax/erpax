---
name: scheduler
description: "Use when scheduling corpus paths into balanced waves — turns the max-work/max-tamper policy into concrete wave-schedule options (unit ceiling, items per wave derived from wave depth, weight function) and walks the live path set into a self-balancing plan."
atomPath: "wave/scheduler"
coordinate: "wave/scheduler · 8/crest · c4bb959c"
contentUuid: "dbf33a1c-582f-5e96-b2b3-78646f822c47"
diamondUuid: "737187f1-6497-8eba-b240-71163f624223"
uuid: "c4bb959c-727b-8df9-a529-ddb6c661ec4a"
horo: 8
typography:
  partition: wave
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "68422a65-43c6-8bca-8a76-19483bb99116"
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
      stageUuid: "f3b78e02-1a9b-8fd4-b0b5-91244ad50adf"
    - stage: seal
      stageUuid: "6f6a8131-82fb-8781-91db-d1f633e88d91"
    - stage: uuid
      stageUuid: "a1115f8a-fbd1-8faf-9c32-63ada3fcc5e9"
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
