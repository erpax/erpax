---
name: load
description: "Use when partitioning work into balanced waves — self-balancing load distribution across the seven horo phases, weighted by comparable units, with the lane-cost and tamper-cost arithmetic the scheduler and session build on."
atomPath: "wave/load"
coordinate: "wave/load · 5/round · 009237b5"
contentUuid: "e9dd35b8-3d8d-5433-8eb8-810651aed1ec"
diamondUuid: "abdc0c4f-686e-8aac-b41e-a43a365a800f"
uuid: "009237b5-b55d-83ea-aced-4de2ad443956"
horo: 5
typography:
  partition: wave
  bondDegree: 19
standards: []
bindings: []
signatures:
  computationUuid: "53649c58-4659-8570-9128-b3543cd028ae"
  stages:
    - stage: path
      stageUuid: "a13b99a9-1f98-88d6-ace7-939793f000de"
    - stage: trinity
      stageUuid: "58c27648-0fd1-836c-aacb-ece6a030d5f5"
    - stage: boundary
      stageUuid: "67e92a1f-14e6-8890-92c6-6d33cff0c535"
    - stage: links
      stageUuid: "b98a3745-333c-850b-921d-2629a3563ce4"
    - stage: horo
      stageUuid: "421d8109-cc90-88c5-833e-bc10b058f9af"
    - stage: seal
      stageUuid: "b9bd9844-8eae-8250-ace4-c2f4679450c6"
    - stage: uuid
      stageUuid: "a10085ec-7b4e-81f6-822d-1092f813097c"
version: 2
---
# wave/load — the partition that balances

`selfBalancingWaveLoad` distributes items across the horo phases so that the spread
between the fullest and emptiest wave stays within one item. Balance is the point: a
wave plan whose phases differ wildly is a schedule in name only — the longest wave
sets the wall clock, and everything else idles.

Weighting is by **comparable units** (`pathComparableUnits`), never raw item count,
because two paths are not equal work. `laneCostAt`, `laneCostSplit` and
`laneSpeedupCeiling` are the arithmetic that says what a partition actually buys, and
`tamperCostForWave` is what [[wave]]/session chains its receipts against.

**Honest boundary.** A balanced partition proves the WORK is evenly divided by the
weight function it was given — never that the weight function models the real cost.
A wrong `weightOf` produces a perfectly balanced, perfectly wrong plan.

Composes: [[wave]] · [[wave]]/horo · [[path]].
