---
name: elimination
description: "Use when removing intercompany balances, transactions, and profits in consolidation per IFRS-10 and IFRS-3 — consolidation adjustment that nets balances across entities to zero"
atomPath: "vocabulary/elimination"
coordinate: "vocabulary/elimination · 2/share · e80cabd3"
contentUuid: "aaa9ab0e-d325-5eb9-814c-447cb0e4207f"
diamondUuid: "85d588e9-767c-81d6-aff9-832618b276de"
uuid: "e80cabd3-3bb2-8fb1-aac2-d16e5a5bc042"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "4f36ab28-d04a-8f4e-bd01-774023c358fe"
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
      stageUuid: "e274df94-0f34-8c06-9248-c387b99e107c"
    - stage: seal
      stageUuid: "f267b267-51fe-823b-9728-00713bd0d3fa"
    - stage: uuid
      stageUuid: "0115dd29-c549-8e77-9500-39d53cc0c4d7"
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
