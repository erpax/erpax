---
name: satisfaction
description: "Use when measuring employee/customer contentment — survey scores, NPS, CSAT, engagement indices. The scalar metric of sentiment toward work, leadership, culture, or service."
atomPath: satisfaction
coordinate: "satisfaction · 5/round · ff57c7e2"
contentUuid: "b8eed7a6-d66a-5924-b9fb-19f6820058c5"
diamondUuid: "2ea92f68-b361-8d65-bd8c-fe7dba59a1ed"
uuid: "ff57c7e2-b4d8-81e2-a4a2-8efccef58c44"
horo: 5
typography:
  partition: satisfaction
  bondDegree: 25
standards: []
bindings: []
signatures:
  computationUuid: "d8e55da5-5911-84fd-9334-d9e8bfa31c63"
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
      stageUuid: "36939f61-5059-80d7-b0d3-d7483b38190b"
    - stage: seal
      stageUuid: "03f1ed26-8ccf-8dc3-9d0f-fd4ec9bb45c8"
    - stage: uuid
      stageUuid: "b6a4999f-4d77-8598-b40b-b5adb89dee35"
version: 2
---
# satisfaction

Use when measuring employee/customer contentment — survey scores, NPS, CSAT, engagement indices. The scalar metric of sentiment toward work, leadership, culture, or service.

Composes: [[Employees]] · [[Customers]] · [[employees/performance/reviews]] · [[comment]] · [[sentiment]].

## Standards
- SFIA 1-7 for competency satisfaction
- ISO-9126 for quality satisfaction
