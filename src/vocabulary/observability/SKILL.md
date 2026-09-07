---
name: observability
description: "Use when making systems instrumentable — metrics (gauge/counter/histogram/summary), distributed tracing, structured logging, cardinality explosion in high-dimensional metrics, sampling strategies for observability."
atomPath: "vocabulary/observability"
coordinate: "vocabulary/observability · 1/base · 2fc23d9b"
contentUuid: "aabe172d-796f-5807-a28f-212cea02bf40"
diamondUuid: "0852f377-e2ed-873d-8ab6-b086063d8c6b"
uuid: "2fc23d9b-c9bf-8b98-a852-04d3e845eab0"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "ccac16f5-bf8c-86e6-b5d8-90a70028effa"
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
      stageUuid: "c43d2e8d-845b-8463-a800-36791ab3f6c6"
    - stage: seal
      stageUuid: "163471d8-d193-803f-a130-b351685a6d9d"
    - stage: uuid
      stageUuid: "aa309e02-9c3b-8f78-8c3f-c7ae585b5a07"
version: 2
---
# observability

Use when making systems instrumentable — metrics (gauge/counter/histogram/summary), distributed tracing, structured logging, cardinality explosion in high-dimensional metrics, sampling strategies for observability.

Composes: [[deploy]] · [[jobs]] · [[audit/events]] · [[metric]] · [[sampling]].

## Standards
- OpenMetrics (CNCF)
- OpenTelemetry
- NIST observability
