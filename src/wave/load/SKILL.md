---
name: load
description: "Use when partitioning work into balanced waves — self-balancing load distribution across the seven horo phases, weighted by comparable units, with the lane-cost and tamper-cost arithmetic the scheduler and session build on."
atomPath: "wave/load"
coordinate: "wave/load · 1/base · 58508def"
contentUuid: "478acc55-bd58-586a-aec2-9d9453bce2a9"
diamondUuid: "3b63e63f-6a22-878b-8b65-638e98be6287"
uuid: "58508def-dfb9-8d01-b695-dd97ae4336d0"
horo: 1
typography:
  partition: wave
  bondDegree: 19
standards: []
bindings: []
signatures:
  computationUuid: "6445dc88-f96c-85e8-b6da-6e477edc1d89"
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
      stageUuid: "ccbbcbdb-0347-84df-a369-5690636e93a8"
    - stage: seal
      stageUuid: "b9bd9844-8eae-8250-ace4-c2f4679450c6"
    - stage: uuid
      stageUuid: "9c2b3b68-f023-8d46-a092-08610871ee38"
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
