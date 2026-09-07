---
name: observability
description: "Use when making systems instrumentable — metrics (gauge/counter/histogram/summary), distributed tracing, structured logging, cardinality explosion in high-dimensional metrics, sampling strategies for observability."
atomPath: "vocabulary/observability"
coordinate: "vocabulary/observability · 7/descent · b384af4d"
contentUuid: "7a01f2b0-5256-5f72-b864-b665aa6127af"
diamondUuid: "3e6d5b35-262a-8e36-81bd-35cf77380526"
uuid: "b384af4d-f362-8105-b46c-597f06263680"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 18
standards: []
bindings: []
signatures:
  computationUuid: "94fd6b31-8ede-8932-b5eb-8e559dc2f63b"
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
      stageUuid: "df8fc937-e40d-877d-914c-0cbe3da5b64a"
    - stage: seal
      stageUuid: "163471d8-d193-803f-a130-b351685a6d9d"
    - stage: uuid
      stageUuid: "ae9a0996-da82-8a2b-90bf-4f8591d60f22"
version: 2
---
# observability

Use when making systems instrumentable — metrics (gauge/counter/histogram/summary), distributed tracing, structured logging, cardinality explosion in high-dimensional metrics, sampling strategies for observability.

Composes: [[deploy]] · [[jobs]] · [[audit/events]] · [[metric]] · [[sampling]].

## Standards
- OpenMetrics (CNCF)
- OpenTelemetry
- NIST observability
