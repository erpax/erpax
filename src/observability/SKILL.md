---
name: observability
description: "Use when making systems instrumentable — metrics (gauge/counter/histogram/summary), distributed tracing, structured logging, cardinality explosion in high-dimensional metrics, sampling strategies for observability."
atomPath: observability
coordinate: observability · 5/round · 3a7bcee7
contentUuid: "55f270a0-caf8-54ce-b6e9-66ddda1b73d6"
diamondUuid: "2139da76-f882-8246-85ce-861e7c8c1e92"
uuid: "3a7bcee7-18de-85c3-9f0b-3044e9b8f7e9"
horo: 5
bonds:
  in:
    - deploy
    - events
    - jobs
    - metric
    - sampling
    - sla
  out:
    - deploy
    - events
    - jobs
    - metric
    - sampling
    - sla
typography:
  partition: observability
  bondDegree: 18
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - deploy
    - events
    - jobs
    - metric
    - sampling
  matrix:
    - deploy
    - events
    - jobs
    - metric
    - sampling
    - sla
  backlinks:
    - deploy
    - events
    - jobs
    - metric
    - sampling
    - sla
signatures:
  computationUuid: "b2194b49-f7c0-86f4-b780-2ca6b6c1326c"
  stages:
    - stage: path
      stageUuid: "0989a2b9-7502-8fab-88c0-0a7b2804f803"
    - stage: trinity
      stageUuid: "51bcfbce-7b59-8ecc-b785-e6554e36e619"
    - stage: boundary
      stageUuid: "0c1ea5c2-20ca-8840-be9b-03b246596120"
    - stage: links
      stageUuid: "7691fc0a-0e32-84be-bb56-f2dd1942a6dd"
    - stage: horo
      stageUuid: "8652881e-c137-8404-8eeb-1cb18958284a"
    - stage: seal
      stageUuid: "b12b72c3-240f-82ba-9521-3fbcdf9f4da3"
    - stage: uuid
      stageUuid: "3583c7c1-5ae9-8260-9628-43aab3b42754"
version: 2
---
# observability

Use when making systems instrumentable — metrics (gauge/counter/histogram/summary), distributed tracing, structured logging, cardinality explosion in high-dimensional metrics, sampling strategies for observability.

Composes: [[deploy]] · [[jobs]] · [[audit/events]] · [[metric]] · [[sampling]].

## Standards
- OpenMetrics (CNCF)
- OpenTelemetry
- NIST observability
