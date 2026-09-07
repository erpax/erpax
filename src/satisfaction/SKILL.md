---
name: satisfaction
description: "Use when measuring employee/customer contentment — survey scores, NPS, CSAT, engagement indices. The scalar metric of sentiment toward work, leadership, culture, or service."
atomPath: satisfaction
coordinate: "satisfaction · 5/round · 6e135b1c"
contentUuid: "bf0d71c9-d040-5734-87b2-e7efb7875137"
diamondUuid: "a8d30cdb-b4ea-81fa-902f-bde2ec2295e9"
uuid: "6e135b1c-5a9c-89ac-9bab-48a0af437660"
horo: 5
typography:
  partition: satisfaction
  bondDegree: 25
standards: []
bindings: []
signatures:
  computationUuid: "0fb169af-df05-82a1-a788-cf829b1332f6"
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
      stageUuid: "85bc6b61-f59a-8dad-b7bc-197b4ba42b52"
    - stage: seal
      stageUuid: "03f1ed26-8ccf-8dc3-9d0f-fd4ec9bb45c8"
    - stage: uuid
      stageUuid: "1b272382-4543-8a51-91b7-de0cc7d91316"
version: 2
---
# satisfaction

Use when measuring employee/customer contentment — survey scores, NPS, CSAT, engagement indices. The scalar metric of sentiment toward work, leadership, culture, or service.

Composes: [[Employees]] · [[Customers]] · [[employees/performance/reviews]] · [[comment]] · [[sentiment]].

## Standards
- SFIA 1-7 for competency satisfaction
- ISO-9126 for quality satisfaction
