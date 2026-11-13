---
name: observability
description: "Use when making systems instrumentable — metrics (gauge/counter/histogram/summary), distributed tracing, structured logging, cardinality explosion in high-dimensional metrics, sampling strategies for observability."
atomPath: "vocabulary/observability"
coordinate: "vocabulary/observability · 4/weave · f8097271"
contentUuid: "cd0ed045-1a49-5c1d-b8b5-6d17bb015a07"
diamondUuid: "5b99c157-079f-8615-bea8-8cdd6259172d"
uuid: "f8097271-305c-8bc3-a5ac-3e0b4bc2c984"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "6a12991f-0a27-8505-954f-c5ae923f2130"
  stages:
    - stage: path
      stageUuid: "89e333b9-2ae7-81ad-a74a-cd99cb420152"
    - stage: trinity
      stageUuid: "729ae518-08a5-8cd9-a8e9-bb04fc6e0c3e"
    - stage: boundary
      stageUuid: "4a4e9b6c-fd58-88b0-a7b4-333129fe7e64"
    - stage: links
      stageUuid: "6a23c683-b664-8d16-830f-2e77a49aa7f3"
    - stage: horo
      stageUuid: "e1b51c3d-f2bf-87ff-85a0-d91d8fcfd471"
    - stage: seal
      stageUuid: "163471d8-d193-803f-a130-b351685a6d9d"
    - stage: uuid
      stageUuid: "ef256162-419e-80f5-ae7d-ad01a1df18d8"
version: 2
---
# observability

Use when making systems instrumentable — metrics (gauge/counter/histogram/summary), distributed tracing, structured logging, cardinality explosion in high-dimensional metrics, sampling strategies for observability.

Composes: [[deploy]] · [[jobs]] · [[audit/events]] · [[metric]] · sampling.

## Standards
- OpenMetrics (CNCF)
- OpenTelemetry
- NIST observability
