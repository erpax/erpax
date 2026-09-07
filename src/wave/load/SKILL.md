---
name: load
description: "Use when partitioning work into balanced waves — self-balancing load distribution across the seven horo phases, weighted by comparable units, with the lane-cost and tamper-cost arithmetic the scheduler and session build on."
atomPath: "wave/load"
coordinate: "wave/load · 1/base · d5ce4a3b"
contentUuid: "34131ae3-0c40-50bc-bfdc-691fafecd838"
diamondUuid: "5d3219fc-15ab-8610-8aaa-6434681705ad"
uuid: "d5ce4a3b-874a-8023-a39f-ab5f69768fb4"
horo: 1
typography:
  partition: wave
  bondDegree: 19
standards: []
bindings: []
signatures:
  computationUuid: "3df5cfe5-f3c9-8924-8683-dd7f866e288c"
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
      stageUuid: "6522e1a2-9bc4-811a-8ceb-d13cfbe55a94"
    - stage: seal
      stageUuid: "b9bd9844-8eae-8250-ace4-c2f4679450c6"
    - stage: uuid
      stageUuid: "3a83823f-79d7-80a4-8ebf-7ef0b974877c"
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
