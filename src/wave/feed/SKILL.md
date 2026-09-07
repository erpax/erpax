---
name: feed
description: "Use when feeding research/develop waves into themselves for endless R&D — each generation's waves become the next asks; corpus may grow; shouldContinue until external stop; maxGenerations bounds one call."
atomPath: "wave/feed"
coordinate: "wave/feed · 1/base · 7bbe506e"
contentUuid: "b284fdda-fdff-53d0-9e86-6b0171752f3e"
diamondUuid: "fc282481-6cbe-818e-80c3-4afa19c11cc0"
uuid: "7bbe506e-3c41-88e4-b4d0-8c0677fcec93"
horo: 1
typography:
  partition: wave
  bondDegree: 41
standards: []
bindings: []
signatures:
  computationUuid: "c5bc7a5a-9bc9-87ca-94d4-6fe5f47d4c60"
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
      stageUuid: "1219d651-e756-8bc9-99b8-38d38b84750a"
    - stage: seal
      stageUuid: "38405e74-ffb2-8bf3-b9d0-03903969a81a"
    - stage: uuid
      stageUuid: "14e0de13-9249-81a5-8d06-9abf36e6068f"
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
