---
name: debit
description: "Use when reasoning about accounting/debit — debit/credit logic — double-entry validation and journal lines."
atomPath: "accounting/debit"
coordinate: "accounting/debit · 5/round · 73eda0a5"
contentUuid: "3556ca30-f262-5d0b-b10d-70fc18f20370"
diamondUuid: "55894a28-7b68-8fc0-b784-56d15f853456"
uuid: "73eda0a5-5622-8246-adea-3d2ac9f9d55b"
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
  computationUuid: "6cee0acb-c88b-8dc3-ac9b-cff1325efc30"
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
      stageUuid: "a87d4764-be7c-8d58-9a3d-2cf4332b27ca"
    - stage: seal
      stageUuid: "ef19d0db-3b7f-894a-8ccf-48c074dd3596"
    - stage: uuid
      stageUuid: "b39e117b-92d4-8e3a-be81-49e178d247e5"
version: 2
---
# accounting/debit

Debit/credit logic — double-entry validation and journal lines.

**Law — [[law]]: accounting/debit composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/debit/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]
