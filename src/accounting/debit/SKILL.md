---
name: debit
description: "Use when reasoning about accounting/debit — debit/credit logic — double-entry validation and journal lines."
atomPath: "accounting/debit"
coordinate: "accounting/debit · 5/round · 9dfa0373"
contentUuid: "44f4c306-259f-5792-9f7c-37a56d54df58"
diamondUuid: "678238b8-4320-8022-99fc-9c362c610f7d"
uuid: "9dfa0373-e9e8-89a8-bb0a-9bcaa67e9474"
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
  computationUuid: "5b404185-87db-88a0-88f9-b6948bb5a0df"
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
      stageUuid: "cf99c8cf-18fb-87d3-892d-331c538c07a0"
    - stage: seal
      stageUuid: "ef19d0db-3b7f-894a-8ccf-48c074dd3596"
    - stage: uuid
      stageUuid: "bc6cb3f1-dba2-81f5-a35e-930c11893133"
version: 2
---
# accounting/debit

Debit/credit logic — double-entry validation and journal lines.

**Law — [[law]]: accounting/debit composes under [[accounting]] — path-keyed, content-addressed, no hand-maintained GL catalogue.**

Matter-twin: `src/accounting/debit/index.ts`

Composes [[accounting]] · [[path]] · [[debit]] · [[balance]]
