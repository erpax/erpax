---
name: feed
description: "Use when feeding research/develop waves into themselves for endless R&D — each generation's waves become the next asks; corpus may grow; shouldContinue until external stop; maxGenerations bounds one call."
atomPath: "wave/feed"
coordinate: "wave/feed · 5/round · 09b19f63"
contentUuid: "2b55b696-4d96-59cc-8945-b7f44edd8581"
diamondUuid: "794defa3-0577-8db2-91f2-c69ed9b2b88c"
uuid: "09b19f63-1dc1-8db5-a352-23c11c3eb79b"
horo: 5
typography:
  partition: wave
  bondDegree: 41
standards: []
bindings: []
signatures:
  computationUuid: "cb604079-1f0e-81e4-afa2-c02026da1f54"
  stages:
    - stage: path
      stageUuid: "7afcf7fc-84ac-8ec8-94a9-4f86c8caf5f1"
    - stage: trinity
      stageUuid: "0d7f4f8c-6b9e-89c4-a07b-d360ec9b7147"
    - stage: boundary
      stageUuid: "9247969e-caf0-865e-bf6c-d7c90d68fe3b"
    - stage: links
      stageUuid: "d265ddd9-ea88-8944-abc0-da3bfc97d891"
    - stage: horo
      stageUuid: "a9397bd5-0437-8a58-bdc4-2db7918805a8"
    - stage: seal
      stageUuid: "38405e74-ffb2-8bf3-b9d0-03903969a81a"
    - stage: uuid
      stageUuid: "b6f948c6-454f-867d-b638-de23c2c12207"
version: 2
---
# wave/feed — feed waves into themselves

**Law — [[law]]: research → waves → next asks (+ grow sealed corpus) → develop → research. The loop cannot honestly self-halt while seed/residual remains ([[self]]/improve.`shouldContinue`); only an EXTERNAL stop is sovereign. One invocation is finite via `maxGenerations` — endlessness is the law of the loop, not unbounded CPU.**

| step | atom |
|---|---|
| derive next asks | `asksFromWaveOutput` |
| loop | `feedWavesIntoThemselves` |
| banking endless | `endlessBankResearchDevelop` ([[bank]]/research) |
| standards endless | `endlessStandardsImprove` ([[standards]]/improve) |
| chat | `chatEndlessResearchWaves` ([[quantum]]/chat) |

Cost stays **0** when the researcher is sealed ([[quantum]]/ftl `research`).

Composes [[self]]/improve · [[quantum]]/ftl · [[bank]]/research · [[merge]].
