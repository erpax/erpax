---
name: feed
description: "Use when feeding research/develop waves into themselves for endless R&D — each generation's waves become the next asks; corpus may grow; shouldContinue until external stop; maxGenerations bounds one call."
atomPath: "wave/feed"
coordinate: "wave/feed · 5/round · a8fa878a"
contentUuid: "32dbdce7-f555-5460-92f4-c40c326b7164"
diamondUuid: "6e02dd1f-25a1-8c29-a5c8-763f77c0a544"
uuid: "a8fa878a-2c07-8bc6-b90d-947dcb3aa5e1"
horo: 5
typography:
  partition: wave
  bondDegree: 41
standards: []
bindings: []
signatures:
  computationUuid: "ff7cf090-d5b6-8f0c-b078-c1ac502bee44"
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
      stageUuid: "0345b362-ca44-8f56-ace1-de5fda7c5459"
    - stage: seal
      stageUuid: "38405e74-ffb2-8bf3-b9d0-03903969a81a"
    - stage: uuid
      stageUuid: "23f50d5b-76b8-81ef-8181-ac0acf50da33"
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
