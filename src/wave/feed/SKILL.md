---
name: feed
description: "Use when feeding research/develop waves into themselves for endless R&D — each generation's waves become the next asks; corpus may grow; shouldContinue until external stop; maxGenerations bounds one call."
atomPath: "wave/feed"
coordinate: "wave/feed · 5/round · a29a303d"
contentUuid: "8ef37fe0-3164-5395-873d-ee2f631bea40"
diamondUuid: "4f6fad19-ddb4-8ed8-8794-84fa28a6071a"
uuid: "a29a303d-5fa3-8d9c-b068-84f52250d6bc"
horo: 5
typography:
  partition: wave
  bondDegree: 41
standards: []
bindings: []
signatures:
  computationUuid: "44c2a677-df7e-85ae-9767-e2f203ca74b7"
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
      stageUuid: "b2e1f563-eeb6-83ee-ab82-e1d73b59bc10"
    - stage: seal
      stageUuid: "38405e74-ffb2-8bf3-b9d0-03903969a81a"
    - stage: uuid
      stageUuid: "5a8cf265-7a8c-81ff-8b89-fe19c9e56cb9"
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
