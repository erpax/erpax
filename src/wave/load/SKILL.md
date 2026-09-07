---
name: load
description: "Use when partitioning work into balanced waves — self-balancing load distribution across the seven horo phases, weighted by comparable units, with the lane-cost and tamper-cost arithmetic the scheduler and session build on."
atomPath: "wave/load"
coordinate: "wave/load · 7/descent · 67e175aa"
contentUuid: "d0ae5932-693f-5a12-bfbc-4f9b97bf90f0"
diamondUuid: "1a8223c1-d782-84dc-b98b-d638180aa3fe"
uuid: "67e175aa-8445-87a3-bb9e-9ac87f34bea2"
horo: 7
typography:
  partition: wave
  bondDegree: 19
standards: []
bindings: []
signatures:
  computationUuid: "b1cb6ac5-a0c4-8ea5-bdd8-239ae175925f"
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
      stageUuid: "3a6f6f5b-ca08-87ac-a4cc-c20378c795d6"
    - stage: seal
      stageUuid: "b9bd9844-8eae-8250-ace4-c2f4679450c6"
    - stage: uuid
      stageUuid: "57906693-53b8-8ddd-b708-62cad21ddda5"
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
