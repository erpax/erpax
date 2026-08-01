---
name: elimination
description: "Use when removing intercompany balances, transactions, and profits in consolidation per IFRS-10 and IFRS-3 — consolidation adjustment that nets balances across entities to zero"
atomPath: "vocabulary/elimination"
coordinate: "vocabulary/elimination · 8/crest · 293b1e7b"
contentUuid: "792e72cc-c088-5d5c-9e77-ec91458e2098"
diamondUuid: "fb2f7ab9-1c25-8502-b667-ad5171136f4f"
uuid: "293b1e7b-75c7-8c54-906a-bd4dabdfd82e"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "2828968e-6a44-855d-97b2-34f00761d29f"
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
      stageUuid: "3e19b10f-331c-828d-a411-912d1da2b7db"
    - stage: seal
      stageUuid: "de3fbb3e-12ef-86cd-a2eb-91c7e262d55c"
    - stage: uuid
      stageUuid: "7f615331-de2b-803f-835e-9ea361668772"
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
