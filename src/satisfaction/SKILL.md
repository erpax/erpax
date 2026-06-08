---
name: satisfaction
description: "Use when measuring employee/customer contentment — survey scores, NPS, CSAT, engagement indices. The scalar metric of sentiment toward work, leadership, culture, or service."
atomPath: satisfaction
coordinate: satisfaction · 2/share · 1d564e49
contentUuid: "5b576996-257f-578b-9d84-6607ce3adc90"
diamondUuid: "5a154bc4-9e38-8e2d-ac8a-c3089e4c230e"
uuid: "1d564e49-3d05-8920-b971-4a0e519978d4"
horo: 2
bonds:
  in:
    - attrition
    - comment
    - customers
    - employees
    - engagement
    - feedback
    - reviews
    - sentiment
  out:
    - attrition
    - comment
    - customers
    - employees
    - engagement
    - feedback
    - reviews
    - sentiment
typography:
  partition: satisfaction
  bondDegree: 25
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - comment
    - customers
    - employees
    - reviews
    - sentiment
  matrix:
    - attrition
    - comment
    - customers
    - employees
    - engagement
    - feedback
    - reviews
    - sentiment
  backlinks:
    - attrition
    - comment
    - customers
    - employees
    - engagement
    - feedback
    - reviews
    - sentiment
signatures:
  computationUuid: "e2b0969f-89ee-81b1-8c00-c3722038b871"
  stages:
    - stage: path
      stageUuid: "568b17d7-6ecb-8ba5-8acd-3c86235eda2f"
    - stage: trinity
      stageUuid: "62dd50b7-afd0-8500-b464-8494665bebec"
    - stage: boundary
      stageUuid: "3e6e51cc-9084-88e0-9de3-f11cf1036499"
    - stage: links
      stageUuid: "f08eb388-0e55-8855-af38-007a57c6d0ad"
    - stage: horo
      stageUuid: "7cc265e4-06a4-889e-bfbb-bbc5db6d24df"
    - stage: seal
      stageUuid: "eb19b697-0599-846a-8a84-16b79b9b486f"
    - stage: uuid
      stageUuid: "12bdec17-d069-82b8-aea7-366b1c14491d"
version: 2
---
# satisfaction

Use when measuring employee/customer contentment — survey scores, NPS, CSAT, engagement indices. The scalar metric of sentiment toward work, leadership, culture, or service.

Composes: [[Employees]] · [[Customers]] · [[employees/performance/reviews]] · [[comment]] · [[sentiment]].

## Standards
- SFIA 1-7 for competency satisfaction
- ISO-9126 for quality satisfaction
