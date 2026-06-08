---
name: pipeline
description: "Use when tracking the progression of deals through sales stages — lead → qualified → proposal → negotiation → won/lost. The sales funnel state at each stage with value, probability, and close date."
atomPath: pipeline
coordinate: pipeline · 5/round · a8e348d6
contentUuid: "966f1f09-9588-5466-9311-160b8481380d"
diamondUuid: "37ccf87b-e7b5-8955-b006-255050ff1a52"
uuid: "a8e348d6-38d9-891a-b1f6-e7496e132a30"
horo: 5
bonds:
  in:
    - forecast
    - funnel
    - law
    - leads
    - opportunities
    - orders
    - positions
  out:
    - forecast
    - funnel
    - law
    - leads
    - opportunities
    - orders
    - positions
typography:
  partition: pipeline
  bondDegree: 22
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - forecast
    - law
    - leads
    - opportunities
    - orders
  matrix:
    - forecast
    - funnel
    - law
    - leads
    - opportunities
    - orders
    - positions
  backlinks:
    - forecast
    - funnel
    - law
    - leads
    - opportunities
    - orders
    - positions
signatures:
  computationUuid: "92a8b7f1-7878-8d66-9343-6b758ca4b3b5"
  stages:
    - stage: path
      stageUuid: "6c2033a3-8760-84e2-b65a-76be612deeb1"
    - stage: trinity
      stageUuid: "a864fe2d-7239-8da7-b105-3ed34bb4aab1"
    - stage: boundary
      stageUuid: "372a60bb-e46a-8616-b347-6e6efae8745f"
    - stage: links
      stageUuid: "2ddeac49-a6b5-8040-864c-b145320c2dc1"
    - stage: horo
      stageUuid: "d5a4889c-5b68-81eb-90d7-5c93579287cd"
    - stage: seal
      stageUuid: "076c5a0a-0501-864e-b048-9a67f84e86b8"
    - stage: uuid
      stageUuid: "a578e49d-5ba1-8e5d-aa66-147e4e21de3f"
version: 2
---
# pipeline

Use when tracking the progression of deals through sales stages — lead → qualified → proposal → negotiation → won/lost. The sales funnel state at each stage with value, probability, and close date.

Composes: [[Opportunities]] · [[Leads]] · [[forecast]] · [[customers/sales/orders]].

## Standards
- CRM-generic

**Law — [[law]]: a pipeline is one deal's monotonic progression through ordered sales stages (lead → qualified → proposal → negotiation → won/lost); the funnel position carries value, probability and close date and is the deal's stage on the ring, never an arbitrary flag.**
