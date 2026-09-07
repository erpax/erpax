---
name: observability
description: "Use when making systems instrumentable — metrics (gauge/counter/histogram/summary), distributed tracing, structured logging, cardinality explosion in high-dimensional metrics, sampling strategies for observability."
atomPath: "vocabulary/observability"
coordinate: "vocabulary/observability · 5/round · 5f8a6911"
contentUuid: "5dd46577-c4bb-532f-bec4-27c9fa8668d2"
diamondUuid: "cf6cddfe-f2c5-8c18-80fc-d5849116c6df"
uuid: "5f8a6911-b6e0-8827-bc03-aea552f9369e"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "f090e7ff-9c4d-853c-8e10-5d1d90fb0f32"
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
      stageUuid: "cac629f4-85df-8856-a3dc-074006204882"
    - stage: seal
      stageUuid: "163471d8-d193-803f-a130-b351685a6d9d"
    - stage: uuid
      stageUuid: "3ab1423b-cba1-83f2-8162-6357c4b2230a"
version: 2
---
# observability

Use when making systems instrumentable — metrics (gauge/counter/histogram/summary), distributed tracing, structured logging, cardinality explosion in high-dimensional metrics, sampling strategies for observability.

Composes: [[deploy]] · [[jobs]] · [[audit/events]] · [[metric]] · [[sampling]].

## Standards
- OpenMetrics (CNCF)
- OpenTelemetry
- NIST observability
