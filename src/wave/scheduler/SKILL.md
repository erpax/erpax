---
name: scheduler
description: "Use when scheduling corpus paths into balanced waves — turns the max-work/max-tamper policy into concrete wave-schedule options (unit ceiling, items per wave derived from wave depth, weight function) and walks the live path set into a self-balancing plan."
atomPath: "wave/scheduler"
coordinate: "wave/scheduler · 2/share · ac9e4cbb"
contentUuid: "c1d88bc8-c983-559c-8916-b23dbc6130f7"
diamondUuid: "a182fa38-dba7-8e10-9b3a-c85229fc75a4"
uuid: "ac9e4cbb-f54a-824a-b8bc-4e2e80c970ba"
horo: 2
typography:
  partition: wave
  bondDegree: 6
standards: []
bindings: []
signatures:
  computationUuid: "30d1fe71-6c05-8c9d-a817-a4cfaa572843"
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
      stageUuid: "aa30eee5-aa5f-83c2-bb7e-c8663cdec933"
    - stage: seal
      stageUuid: "6f6a8131-82fb-8781-91db-d1f633e88d91"
    - stage: uuid
      stageUuid: "4bb90bde-2e24-833e-8695-cc18fc0890f6"
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
