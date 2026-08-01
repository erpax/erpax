---
name: sla
description: "Use when defining response/resolution guarantees on issues/tickets — SLA definition, breach detection, escalation, customer-impact metric."
atomPath: sla
coordinate: "sla · 5/round · 0b49c0e5"
contentUuid: "82c5e5fa-2010-5317-9316-4c3fe4afd3f5"
diamondUuid: "84ec6b9d-5f31-814a-92b2-a9289fdc02d5"
uuid: "0b49c0e5-bdca-8e82-9218-e44575316e44"
horo: 5
typography:
  partition: sla
  bondDegree: 31
standards: []
bindings: []
signatures:
  computationUuid: "7481716e-06a3-8b43-9698-5c40d6b91092"
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
      stageUuid: "f644c86b-02dd-807c-82f3-bd5a0d377433"
    - stage: seal
      stageUuid: "5d32bb14-71a9-8b94-a131-4ee6daffb9e8"
    - stage: uuid
      stageUuid: "fc2ace19-4a63-83e4-a724-68a5284b75ea"
version: 2
---
# sla

Use when defining response/resolution guarantees on issues/tickets — SLA definition, breach detection, escalation, customer-impact metric.

Composes: [[Activities]] · [[Customers]] · [[workflow]] · [[invoices/dunning/cycles]] · [[observability]] · [[resolution]].

**Law — [[law]]: an SLA is a response/resolution guarantee on a ticket whose breach is detected against the clock and drives [[escalation]] — the customer-impact metric the [[resolution]] is measured against.**

## Standards
- ISO-20000
- ITIL
