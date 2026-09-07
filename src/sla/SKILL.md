---
name: sla
description: "Use when defining response/resolution guarantees on issues/tickets — SLA definition, breach detection, escalation, customer-impact metric."
atomPath: sla
coordinate: "sla · 1/base · 5aa76b9f"
contentUuid: "6b2d6e3c-9e89-50f0-ab78-2a3adf7ab927"
diamondUuid: "64e28a88-7057-8d10-b042-cc3119ddc121"
uuid: "5aa76b9f-fd19-8e7b-94a5-23c531d39baa"
horo: 1
typography:
  partition: sla
  bondDegree: 31
standards: []
bindings: []
signatures:
  computationUuid: "161a33a0-d7a6-8269-9eda-a9325da9383f"
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
      stageUuid: "1188e453-5939-88b5-afc4-e235767d81eb"
    - stage: seal
      stageUuid: "5d32bb14-71a9-8b94-a131-4ee6daffb9e8"
    - stage: uuid
      stageUuid: "19e0e1aa-1903-80ce-b7cd-13f9eec98e40"
version: 2
---
# sla

Use when defining response/resolution guarantees on issues/tickets — SLA definition, breach detection, escalation, customer-impact metric.

Composes: [[Activities]] · [[Customers]] · [[workflow]] · [[invoices/dunning/cycles]] · [[observability]] · [[resolution]].

**Law — [[law]]: an SLA is a response/resolution guarantee on a ticket whose breach is detected against the clock and drives [[escalation]] — the customer-impact metric the [[resolution]] is measured against.**

## Standards
- ISO-20000
- ITIL
