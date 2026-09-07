---
name: sla
description: "Use when defining response/resolution guarantees on issues/tickets — SLA definition, breach detection, escalation, customer-impact metric."
atomPath: sla
coordinate: "sla · 7/descent · 1ed6e492"
contentUuid: "238bbb33-c4ef-52c0-9b31-634e91296305"
diamondUuid: "656ee583-33f7-8a56-8a67-451ddceae5cb"
uuid: "1ed6e492-28af-8564-8d7a-fa1756d8575f"
horo: 7
typography:
  partition: sla
  bondDegree: 31
standards: []
bindings: []
signatures:
  computationUuid: "8acca6b1-5220-8dda-a98b-df9c9fc1841d"
  stages:
    - stage: path
      stageUuid: "5b1084ba-fd4e-8c50-ba77-2b9833aeda3c"
    - stage: trinity
      stageUuid: "88ebce06-04b5-8f92-87cb-383dbd60d1b0"
    - stage: boundary
      stageUuid: "e0e95569-9b9a-8132-86b3-8859ae871631"
    - stage: links
      stageUuid: "3120227f-b0d7-875e-976b-a3674377c034"
    - stage: horo
      stageUuid: "dae98d00-5189-87c1-bde1-3958a3b9971a"
    - stage: seal
      stageUuid: "5d32bb14-71a9-8b94-a131-4ee6daffb9e8"
    - stage: uuid
      stageUuid: "72efffd3-8696-8d12-92a9-5582ba572dc2"
version: 2
---
# sla

Use when defining response/resolution guarantees on issues/tickets — SLA definition, breach detection, escalation, customer-impact metric.

Composes: [[Activities]] · [[Customers]] · [[workflow]] · [[invoices/dunning/cycles]] · [[observability]] · [[resolution]].

**Law — [[law]]: an SLA is a response/resolution guarantee on a ticket whose breach is detected against the clock and drives [[escalation]] — the customer-impact metric the [[resolution]] is measured against.**

## Standards
- ISO-20000
- ITIL
