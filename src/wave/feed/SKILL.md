---
name: feed
description: "Use when feeding research/develop waves into themselves for endless R&D — each generation's waves become the next asks; corpus may grow; shouldContinue until external stop; maxGenerations bounds one call."
atomPath: "wave/feed"
coordinate: "wave/feed · 1/base · 1da17cd1"
contentUuid: "3fff1475-f2b0-584a-80c2-3dd2df1c2e71"
diamondUuid: "4df2ac30-9e6f-8382-a636-4714e4133226"
uuid: "1da17cd1-8db1-8616-b4da-27dbee449279"
horo: 1
typography:
  partition: wave
  bondDegree: 41
standards: []
bindings: []
signatures:
  computationUuid: "316015a0-0357-858d-bdb3-e8a6dfeb7d40"
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
      stageUuid: "47c28ee5-505c-80f9-90dc-09644b9528fb"
    - stage: seal
      stageUuid: "38405e74-ffb2-8bf3-b9d0-03903969a81a"
    - stage: uuid
      stageUuid: "91c6542b-4e23-8a84-bc96-62bc12e4f22e"
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
