---
name: load
description: "Use when partitioning work into balanced waves — self-balancing load distribution across the seven horo phases, weighted by comparable units, with the lane-cost and tamper-cost arithmetic the scheduler and session build on."
atomPath: "wave/load"
coordinate: "wave/load · 8/crest · 06154a97"
contentUuid: "b3da05da-a35d-55f8-999a-ae547e4fd039"
diamondUuid: "f4211f41-c435-880d-9613-0261ac28e6ab"
uuid: "06154a97-32e1-88f0-a6b9-eab4e6f65c71"
horo: 8
typography:
  partition: wave
  bondDegree: 14
standards: []
bindings: []
signatures:
  computationUuid: "ee4b7e7c-c48a-8e80-8a36-40d2412fa0d3"
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
      stageUuid: "6cead699-cc81-8c6f-bb8b-895dedf4f0b6"
    - stage: seal
      stageUuid: "b9bd9844-8eae-8250-ace4-c2f4679450c6"
    - stage: uuid
      stageUuid: "03ac7d9f-73ff-835c-b17d-e13c253cb7e9"
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
