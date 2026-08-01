---
name: observability
description: "Use when making systems instrumentable — metrics (gauge/counter/histogram/summary), distributed tracing, structured logging, cardinality explosion in high-dimensional metrics, sampling strategies for observability."
atomPath: "vocabulary/observability"
coordinate: "vocabulary/observability · 4/weave · 686d7076"
contentUuid: "84372ac2-bfcb-5251-a816-201fe874ccf8"
diamondUuid: "e3495c91-d77e-88e7-b58b-f3c227ccee2b"
uuid: "686d7076-559d-844f-b560-350d42ac19d8"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "23ce28e0-ceae-865c-8e79-9885ef578206"
  stages:
    - stage: path
      stageUuid: "89e333b9-2ae7-81ad-a74a-cd99cb420152"
    - stage: trinity
      stageUuid: "729ae518-08a5-8cd9-a8e9-bb04fc6e0c3e"
    - stage: boundary
      stageUuid: "15c78626-9989-82be-94ce-f55ffa111bc8"
    - stage: links
      stageUuid: "45ed9431-aee7-8e10-abab-f676dc631762"
    - stage: horo
      stageUuid: "2a6659e6-622f-8854-84be-d6bb5cdbe97b"
    - stage: seal
      stageUuid: "3478c606-dc53-881e-8d6d-da196d39f096"
    - stage: uuid
      stageUuid: "726bc7ba-6d6d-8dca-b5c6-f41edf74a956"
version: 2
---
# observability

Use when making systems instrumentable — metrics (gauge/counter/histogram/summary), distributed tracing, structured logging, cardinality explosion in high-dimensional metrics, sampling strategies for observability.

Composes: [[deploy]] · [[jobs]] · [[audit/events]] · [[metric]] · [[sampling]].

## Standards
- OpenMetrics (CNCF)
- OpenTelemetry
- NIST observability
