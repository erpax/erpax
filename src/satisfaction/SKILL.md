---
name: satisfaction
description: "Use when measuring employee/customer contentment — survey scores, NPS, CSAT, engagement indices. The scalar metric of sentiment toward work, leadership, culture, or service."
atomPath: satisfaction
coordinate: "satisfaction · 5/round · 85d966e2"
contentUuid: "c2b5f92b-1fbe-5eda-b7b6-8fe5f3415dc6"
diamondUuid: "9e7bb692-90ba-8aa6-a412-24d9b929c23a"
uuid: "85d966e2-4bf4-8904-9e0d-4779b8875538"
horo: 5
typography:
  partition: satisfaction
  bondDegree: 25
standards: []
bindings: []
signatures:
  computationUuid: "1730d3c4-64a1-8b5f-960b-2bacb34a2adb"
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
      stageUuid: "a03f2c86-8fba-8fb3-bc6b-27ecab6d63dd"
    - stage: seal
      stageUuid: "03f1ed26-8ccf-8dc3-9d0f-fd4ec9bb45c8"
    - stage: uuid
      stageUuid: "734b58c9-612d-82a3-a67a-ee47d5ef3bbd"
version: 2
---
# satisfaction

Use when measuring employee/customer contentment — survey scores, NPS, CSAT, engagement indices. The scalar metric of sentiment toward work, leadership, culture, or service.

Composes: [[Employees]] · [[Customers]] · [[employees/performance/reviews]] · [[comment]] · [[sentiment]].

## Standards
- SFIA 1-7 for competency satisfaction
- ISO-9126 for quality satisfaction
