---
name: metric
description: "Use when recording a periodic quantitative observation — daily/weekly/monthly snapshot of performance (headcount, utilization %, defect rate, cost-per-unit, customer-satisfaction score). The data point."
atomPath: metric
coordinate: metric · 4/weave · d57f987a
contentUuid: "9ff9131a-6f87-593a-b0da-30ef35932b01"
diamondUuid: "2be35d0b-f604-84af-a6dd-3f47c051eb3f"
uuid: "d57f987a-16a7-868c-8106-e83032e047a3"
horo: 4
bonds:
  in:
    - attrition
    - breed
    - defect
    - distribution
    - kpi
    - law
    - measure
    - observability
    - outlier
    - sampling
    - schedule
    - trend
  out:
    - attrition
    - breed
    - defect
    - distribution
    - kpi
    - law
    - measure
    - observability
    - outlier
    - sampling
    - schedule
    - trend
typography:
  partition: metric
  bondDegree: 37
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - defect
    - kpi
    - law
    - measure
    - schedule
  matrix:
    - attrition
    - breed
    - defect
    - distribution
    - kpi
    - law
    - measure
    - observability
    - outlier
    - sampling
    - schedule
    - trend
  backlinks:
    - attrition
    - breed
    - defect
    - distribution
    - kpi
    - law
    - measure
    - observability
    - outlier
    - sampling
    - schedule
    - trend
signatures:
  computationUuid: "427e3f21-41f3-811d-9ebe-19839a7f8dcb"
  stages:
    - stage: path
      stageUuid: "82395992-1936-8e81-8480-d47406fc8974"
    - stage: trinity
      stageUuid: "03439098-babc-85df-bc72-58f40f980fe5"
    - stage: boundary
      stageUuid: "792437b1-536b-8591-a893-9e1a77bcc6a4"
    - stage: links
      stageUuid: "13fd8a66-507b-8beb-8c1a-fe918e553af8"
    - stage: horo
      stageUuid: "9642c91c-63c0-841e-8a61-00e7e36b8330"
    - stage: seal
      stageUuid: "4698dc3d-611d-87a4-86dd-4a829ddbb829"
    - stage: uuid
      stageUuid: "c0c39d69-1487-8286-9c84-f2b69937f31e"
version: 2
---
# metric

Use when recording a periodic quantitative observation — daily/weekly/monthly snapshot of performance (headcount, utilization %, defect rate, cost-per-unit, customer-satisfaction score). The data point.

Composes: [[kpi]] · [[measure]] · [[schedule]] · [[defect]].

**Law — [[law]]: a metric is one quantitative observation pinned to a period — the dated data point a [[kpi]] aggregates, so performance is a [[measure]] taken on a [[schedule]], not a standing assertion.**

## Standards
- ISO-8402 (quality metrics)
- COBIT (IT governance metrics)
