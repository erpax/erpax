---
name: debit
description: "Use when reasoning about accounting/debit — debit/credit logic — double-entry validation and journal lines."
atomPath: "accounting/debit"
coordinate: "accounting/debit · 2/share · ff64499e"
contentUuid: "9244cab9-cd79-5f0b-a720-bf84eabd7cb4"
diamondUuid: "171f942f-cd7b-8211-b7ea-060e621c775b"
uuid: "ff64499e-ace5-8b82-8610-14095728c0cb"
horo: 2
typography:
  partition: accounting
  bondDegree: 43
standards:
  - "IFRS Conceptual-Framework recognition-derecognition"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-105 generally-accepted-accounting-principles"
  - "US-GAAP ASC-810 consolidation"
bindings: []
signatures:
  computationUuid: "231e80b6-718d-8c35-b701-ad159fbc9552"
  stages:
    - stage: path
      stageUuid: "c1db6504-7cdb-8828-a61c-7e57ba59ff08"
    - stage: trinity
      stageUuid: "e7a48095-593b-84fe-99c7-c1ef5c8c56fd"
    - stage: boundary
      stageUuid: "e7431af6-e38b-8420-a27c-cfb317aa4fa9"
    - stage: links
      stageUuid: "25357c22-ef71-89cc-b8dc-a54a81b63394"
    - stage: horo
      stageUuid: "068cfb56-477d-87d2-ad42-e580b0849752"
    - stage: seal
      stageUuid: "ef19d0db-3b7f-894a-8ccf-48c074dd3596"
    - stage: uuid
      stageUuid: "0f0e76c0-5916-83eb-9d04-bf9f8b141844"
version: 2
---
# accounting/debit

Debit/credit logic — double-entry validation and journal lines.

**Law — [[law]]: accounting/debit composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/debit/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]
