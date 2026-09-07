---
name: elimination
description: "Use when removing intercompany balances, transactions, and profits in consolidation per IFRS-10 and IFRS-3 — consolidation adjustment that nets balances across entities to zero"
atomPath: "vocabulary/elimination"
coordinate: "vocabulary/elimination · 7/descent · fed5167b"
contentUuid: "8eb1a1df-cf63-5c17-84ef-1fa42e0b77ab"
diamondUuid: "a62c0bb1-0e89-8c89-809d-a78a2315f9b8"
uuid: "fed5167b-c82f-81ec-a5db-cf562b3595c6"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "9a6bd49f-843b-808d-94a4-9560ea430cdc"
  stages:
    - stage: path
      stageUuid: "ba6f0730-61f4-8a56-9a7a-898ff01d29bf"
    - stage: trinity
      stageUuid: "28640b56-4f57-894f-b6ea-c8ef08d3fd70"
    - stage: boundary
      stageUuid: "b1476572-941f-8536-8875-ee95a3253bc7"
    - stage: links
      stageUuid: "986c4f21-dc43-8257-9dce-f1e8921219ba"
    - stage: horo
      stageUuid: "e0d90bb5-69dc-82bc-8f52-0b32021b75bb"
    - stage: seal
      stageUuid: "f267b267-51fe-823b-9728-00713bd0d3fa"
    - stage: uuid
      stageUuid: "1d8b7d27-0889-8034-9099-7b1bf3a1ab55"
version: 2
---
# elimination

Use when removing intercompany balances, transactions, and profits in consolidation per IFRS-10 and IFRS-3 — consolidation adjustment that nets balances across entities to zero

Composes: [[Consolidations]] · [[consolidation/eliminations]] · [[legal/entities/intercompany/transactions]] · [[journal/entries]] · [[balance]] · [[transaction]].

**Law — [[law]]: consolidation nets intercompany balances, transactions, and profits to zero — the group reports as one entity, so what one member owes another cancels ([[balance]]).**

## Standards
- IFRS-10 §19-28 (consolidated financial statements mechanics)
- IFRS-3 §52 (elimination in consolidation)
- FASB ASC 810-10-45 (intercompany elimination)
