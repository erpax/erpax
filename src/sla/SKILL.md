---
name: sla
description: "Use when defining response/resolution guarantees on issues/tickets — SLA definition, breach detection, escalation, customer-impact metric."
atomPath: sla
coordinate: "sla · 4/weave · c7bdf0a1"
contentUuid: "205f3184-fde1-5936-8d65-f3154fd302b3"
diamondUuid: "a8851217-afe6-84c4-858c-a8cd91ee5aaa"
uuid: "c7bdf0a1-af7e-8cf8-99ba-d6b9ae844929"
horo: 4
typography:
  partition: sla
  bondDegree: 31
standards: []
bindings: []
signatures:
  computationUuid: "82ca6031-90e8-8979-811f-1d4228f51140"
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
      stageUuid: "2a811c76-fd44-88cb-9228-4a5a6c454108"
    - stage: seal
      stageUuid: "5d32bb14-71a9-8b94-a131-4ee6daffb9e8"
    - stage: uuid
      stageUuid: "82c2b122-2e58-8e8c-ace0-cf4697828881"
version: 2
---
# sla

Use when defining response/resolution guarantees on issues/tickets — SLA definition, breach detection, escalation, customer-impact metric.

Composes: [[Activities]] · [[Customers]] · [[workflow]] · [[invoices/dunning/cycles]] · [[observability]] · [[resolution]].

**Law — [[law]]: an SLA is a response/resolution guarantee on a ticket whose breach is detected against the clock and drives [[escalation]] — the customer-impact metric the [[resolution]] is measured against.**

## Standards
- ISO-20000
- ITIL
