---
name: elimination
description: "Use when removing intercompany balances, transactions, and profits in consolidation per IFRS-10 and IFRS-3 — consolidation adjustment that nets balances across entities to zero"
atomPath: elimination
coordinate: elimination · 7/descent · dd922d00
contentUuid: "2378f2f5-604e-5cfb-8eac-ef069c2e74b6"
diamondUuid: "71dcb088-80fc-80b3-8523-8001f284193b"
uuid: "dd922d00-bdfe-85f6-953c-0cdb1ebb7122"
horo: 7
bonds:
  in:
    - accounting
    - balance
    - consolidations
    - eliminations
    - entries
    - law
    - transaction
    - transactions
  out:
    - accounting
    - balance
    - consolidations
    - eliminations
    - entries
    - law
    - transaction
    - transactions
typography:
  partition: elimination
  bondDegree: 24
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - consolidations
    - eliminations
    - entries
    - law
    - transaction
    - transactions
  matrix:
    - accounting
    - balance
    - consolidations
    - eliminations
    - entries
    - law
    - transaction
    - transactions
  backlinks:
    - accounting
    - balance
    - consolidations
    - eliminations
    - entries
    - law
    - transaction
    - transactions
signatures:
  computationUuid: "426f03d3-e186-85ac-9cfb-b77b6f4106dd"
  stages:
    - stage: path
      stageUuid: "e750879c-e90b-8486-a2e6-a4cc2de98d06"
    - stage: trinity
      stageUuid: "8de5b728-71d6-85a6-b1df-ea01dc5344f2"
    - stage: boundary
      stageUuid: "537b4be2-8df3-85c3-9602-54caa4cff474"
    - stage: links
      stageUuid: "9ce70087-9169-8c8a-b314-258489ed6d4d"
    - stage: horo
      stageUuid: "6a6d5038-a25e-85f7-89b5-01e33237d713"
    - stage: seal
      stageUuid: "a1c18a17-77d0-8cf3-a4e4-9a8594bc5113"
    - stage: uuid
      stageUuid: "bc78fb88-bbd6-88d0-967e-8e1ab21f4985"
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
