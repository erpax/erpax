---
name: debit
description: "Use when reasoning about accounting/debit — debit/credit logic — double-entry validation and journal lines."
atomPath: "accounting/debit"
coordinate: "accounting/debit · 2/share · 3f14d604"
contentUuid: "90d83846-9ef9-54d7-9dca-e15bc7c27d91"
diamondUuid: "82f64a3f-d863-8559-b4b5-39206d362795"
uuid: "3f14d604-d73e-858e-88d1-5ca738b654d0"
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
  computationUuid: "2701ecc9-55db-8cda-acf7-4c7ec03461a4"
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
      stageUuid: "f3cdc98b-e0ce-807b-b8cb-9242517d441f"
    - stage: seal
      stageUuid: "ef19d0db-3b7f-894a-8ccf-48c074dd3596"
    - stage: uuid
      stageUuid: "2bc0590c-bd33-832a-a8e5-5f390e672c0f"
version: 2
---
# accounting/debit

Debit/credit logic — double-entry validation and journal lines.

**Law — [[law]]: accounting/debit composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/debit/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]
