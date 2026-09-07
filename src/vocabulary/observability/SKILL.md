---
name: observability
description: "Use when making systems instrumentable — metrics (gauge/counter/histogram/summary), distributed tracing, structured logging, cardinality explosion in high-dimensional metrics, sampling strategies for observability."
atomPath: "vocabulary/observability"
coordinate: "vocabulary/observability · 4/weave · 2487a1c8"
contentUuid: "ad093aff-f2ea-5020-9611-1348afe5201f"
diamondUuid: "33ccc396-3e82-8978-a1b9-34d7f2112ee1"
uuid: "2487a1c8-138b-85ad-82c2-e710bd01363f"
horo: 4
typography:
  partition: vocabulary
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "eda38836-1194-8cd2-9e5e-fcd613762def"
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
      stageUuid: "b62eaac5-2f4f-8d11-97dd-4cadf21cfd87"
    - stage: seal
      stageUuid: "163471d8-d193-803f-a130-b351685a6d9d"
    - stage: uuid
      stageUuid: "6f9d79d7-9d03-8039-8051-eda8a4e74f89"
version: 2
---
# observability

Use when making systems instrumentable — metrics (gauge/counter/histogram/summary), distributed tracing, structured logging, cardinality explosion in high-dimensional metrics, sampling strategies for observability.

Composes: [[deploy]] · [[jobs]] · [[audit/events]] · [[metric]] · [[sampling]].

## Standards
- OpenMetrics (CNCF)
- OpenTelemetry
- NIST observability
