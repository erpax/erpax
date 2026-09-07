---
name: debit
description: "Use when reasoning about accounting/debit — debit/credit logic — double-entry validation and journal lines."
atomPath: "accounting/debit"
coordinate: "accounting/debit · 5/round · 1cd07477"
contentUuid: "bc42ddd0-2176-51c5-842e-089715fc17d8"
diamondUuid: "2a79d773-5712-83cc-bd1a-e790787625dc"
uuid: "1cd07477-b58a-82c7-86d6-6237dbffdd78"
horo: 5
typography:
  partition: accounting
  bondDegree: 47
standards:
  - "IFRS Conceptual-Framework recognition-derecognition"
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "SOX §404 internal-controls"
  - "US-GAAP ASC-105 generally-accepted-accounting-principles"
  - "US-GAAP ASC-810 consolidation"
bindings: []
signatures:
  computationUuid: "e3f34462-866c-8680-926e-f1a48e1d90a0"
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
      stageUuid: "71446c10-041c-8fa2-8e48-0662bec41962"
    - stage: seal
      stageUuid: "ef19d0db-3b7f-894a-8ccf-48c074dd3596"
    - stage: uuid
      stageUuid: "b3bf297f-4b86-8b81-a10e-fab7be7f7d85"
version: 2
---
# accounting/debit

Debit/credit logic — double-entry validation and journal lines.

**Law — [[law]]: accounting/debit composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/debit/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]
