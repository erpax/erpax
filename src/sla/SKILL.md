---
name: sla
description: "Use when defining response/resolution guarantees on issues/tickets — SLA definition, breach detection, escalation, customer-impact metric."
atomPath: sla
coordinate: sla · 7/descent · 5eff945e
contentUuid: "0c0108d1-afcb-5318-ad17-2f70f0b79642"
diamondUuid: "4d3e28d7-634c-877b-b5ac-5fce9dbb57e1"
uuid: "5eff945e-9880-8d5c-ad58-f057a3e3c8e0"
horo: 7
bonds:
  in:
    - activities
    - customers
    - cycles
    - escalation
    - law
    - observability
    - priority
    - queue
    - resolution
    - workflow
  out:
    - activities
    - customers
    - cycles
    - escalation
    - law
    - observability
    - priority
    - queue
    - resolution
    - workflow
typography:
  partition: sla
  bondDegree: 31
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - activities
    - customers
    - cycles
    - escalation
    - law
    - observability
    - resolution
    - workflow
  matrix:
    - activities
    - customers
    - cycles
    - escalation
    - law
    - observability
    - priority
    - queue
    - resolution
    - workflow
  backlinks:
    - activities
    - customers
    - cycles
    - escalation
    - law
    - observability
    - priority
    - queue
    - resolution
    - workflow
signatures:
  computationUuid: "1957ca07-6662-89ed-b737-cbd20aab3331"
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
      stageUuid: "cb9d7824-8fe1-8f9a-8c87-54917134ef85"
    - stage: seal
      stageUuid: "15f5f997-221c-871b-bee9-b0c6f3a4b2a7"
    - stage: uuid
      stageUuid: "d2435210-ad41-8eb0-80c7-33a17d26d5a6"
version: 2
---
# sla

Use when defining response/resolution guarantees on issues/tickets — SLA definition, breach detection, escalation, customer-impact metric.

Composes: [[Activities]] · [[Customers]] · [[workflow]] · [[invoices/dunning/cycles]] · [[observability]] · [[resolution]].

**Law — [[law]]: an SLA is a response/resolution guarantee on a ticket whose breach is detected against the clock and drives [[escalation]] — the customer-impact metric the [[resolution]] is measured against.**

## Standards
- ISO-20000
- ITIL
