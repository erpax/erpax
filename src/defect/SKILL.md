---
name: defect
description: "Use when logging product/service quality problems — manufacturing defects, software bugs, rework triggers, quality inspections results. The non-conformance record."
atomPath: defect
coordinate: defect · 8/crest · 8408d20f
contentUuid: "05a82500-091a-543e-953e-bc1d96d80a77"
diamondUuid: "4a530300-7db4-8422-96ce-5ed8bd9e2d7b"
uuid: "8408d20f-4488-8e50-96e1-c67f443d1cd7"
horo: 8
bonds:
  in:
    - fees
    - incident
    - inspections
    - item
    - label
    - law
    - metric
    - return
    - shipping
    - standard
    - workflow
  out:
    - fees
    - incident
    - inspections
    - item
    - label
    - law
    - metric
    - return
    - shipping
    - standard
    - workflow
typography:
  partition: defect
  bondDegree: 33
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - incident
    - inspections
    - law
    - standard
    - workflow
  matrix:
    - fees
    - incident
    - inspections
    - item
    - label
    - law
    - metric
    - return
    - shipping
    - standard
    - workflow
  backlinks:
    - fees
    - incident
    - inspections
    - item
    - label
    - law
    - metric
    - return
    - shipping
    - standard
    - workflow
signatures:
  computationUuid: "bdd48536-399f-8339-b96b-2b1ae86bda4e"
  stages:
    - stage: path
      stageUuid: "cc02e8bb-7e7d-8f01-bb5e-35c7086acc2f"
    - stage: trinity
      stageUuid: "4a2a1593-7a5e-8e26-8652-dfc3a6b083d0"
    - stage: boundary
      stageUuid: "d127be97-36ca-8fdd-920c-673c3e50686b"
    - stage: links
      stageUuid: "34105585-c2bc-8044-9267-c4da32e53b13"
    - stage: horo
      stageUuid: "daac2e5b-135e-8ded-a6a9-5d8bba83aa82"
    - stage: seal
      stageUuid: "af8aca8c-d7df-8c54-a10f-67429bf8714f"
    - stage: uuid
      stageUuid: "7a9f9b82-052b-85b2-be13-aa37f56eab25"
version: 2
---
# defect

Use when logging product/service quality problems — manufacturing defects, software bugs, rework triggers, quality inspections results. The non-conformance record.

Composes: [[items/quality/inspections]] · [[incident]] · [[workflow]] · [[standard]].

## Standards
- ISO-9001 (quality mgmt)
- Six Sigma DMAIC

**Law — [[law]]: a defect is the non-conformance record — a quality problem captured against a [[standard]] so rework, inspection, and the [[incident]] trace to one accountable entry.**
