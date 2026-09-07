---
name: elimination
description: "Use when removing intercompany balances, transactions, and profits in consolidation per IFRS-10 and IFRS-3 — consolidation adjustment that nets balances across entities to zero"
atomPath: "vocabulary/elimination"
coordinate: "vocabulary/elimination · 4/weave · 3f19c68e"
contentUuid: "9c4fed7b-05e5-5f3c-9b92-a4081ea6d99e"
diamondUuid: "3418a97e-b8d2-8d8e-b9c1-d9c8528d3417"
uuid: "3f19c68e-602a-8325-bc35-1e22acfb8044"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "ba8bf700-418f-850b-8890-7dad08ad3b8c"
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
      stageUuid: "76c3d445-5fb7-87f5-a25e-75bdda9ccaca"
    - stage: seal
      stageUuid: "f267b267-51fe-823b-9728-00713bd0d3fa"
    - stage: uuid
      stageUuid: "b9436134-ed2e-8081-a3d9-f3eeb63fffbe"
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
