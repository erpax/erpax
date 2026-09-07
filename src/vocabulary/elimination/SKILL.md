---
name: elimination
description: "Use when removing intercompany balances, transactions, and profits in consolidation per IFRS-10 and IFRS-3 — consolidation adjustment that nets balances across entities to zero"
atomPath: "vocabulary/elimination"
coordinate: "vocabulary/elimination · 5/round · eef6aa8c"
contentUuid: "cdfdacc9-37ec-5df5-9fe0-24930fc6eba5"
diamondUuid: "32b253db-8646-8538-aa12-16eb8949bc52"
uuid: "eef6aa8c-1d4a-8d5c-b505-6512e632ff93"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "7c7a9e41-79da-8e5e-ad57-85e2b78b4208"
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
      stageUuid: "2fb49194-c8d7-8fa5-9737-c0d8811cb2f8"
    - stage: seal
      stageUuid: "f267b267-51fe-823b-9728-00713bd0d3fa"
    - stage: uuid
      stageUuid: "6c02984b-8fbc-8ece-94bf-5b955a8b42a7"
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
