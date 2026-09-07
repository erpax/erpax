---
name: sla
description: "Use when defining response/resolution guarantees on issues/tickets — SLA definition, breach detection, escalation, customer-impact metric."
atomPath: sla
coordinate: "sla · 8/crest · 4c04e6fc"
contentUuid: "5c91fde8-c198-536e-a196-ac1dc506c2f7"
diamondUuid: "3dcdafd1-d32a-87de-9362-988c3c4dbd5e"
uuid: "4c04e6fc-91c3-81e1-b29c-ae6d7503605c"
horo: 8
typography:
  partition: sla
  bondDegree: 31
standards: []
bindings: []
signatures:
  computationUuid: "05399f22-cabc-8b65-ac81-ce679638270c"
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
      stageUuid: "6c022b06-b18a-800b-b5c0-2ba6511cffd5"
    - stage: seal
      stageUuid: "5d32bb14-71a9-8b94-a131-4ee6daffb9e8"
    - stage: uuid
      stageUuid: "b86d382f-fda3-8b1e-95cb-0ffaa867a34e"
version: 2
---
# sla

Use when defining response/resolution guarantees on issues/tickets — SLA definition, breach detection, escalation, customer-impact metric.

Composes: [[Activities]] · [[Customers]] · [[workflow]] · [[invoices/dunning/cycles]] · [[observability]] · [[resolution]].

**Law — [[law]]: an SLA is a response/resolution guarantee on a ticket whose breach is detected against the clock and drives [[escalation]] — the customer-impact metric the [[resolution]] is measured against.**

## Standards
- ISO-20000
- ITIL
