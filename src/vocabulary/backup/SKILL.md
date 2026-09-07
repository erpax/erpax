---
name: backup
description: "Use when ensuring data recovery — backup strategy (full/incremental/differential), backup retention, restoration procedures, backup encryption, cross-region backups, RTO/RPO targets, backup testing/validation."
atomPath: "vocabulary/backup"
coordinate: "vocabulary/backup · 5/round · 2fc83b58"
contentUuid: "cc6db030-cd55-5765-9e2d-5bbc1541b63c"
diamondUuid: "4b7d8430-fc4f-8a03-9428-e0b5e058dcfe"
uuid: "2fc83b58-0f4c-82a1-91f4-aa40d153142e"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "92d29261-9e65-867b-b0bb-0b3bcff7c0fa"
  stages:
    - stage: path
      stageUuid: "b843c4b7-72c8-8e49-8bad-69faa101bd9c"
    - stage: trinity
      stageUuid: "c1e4e295-aa44-8fb6-8f5d-bfc903bdd136"
    - stage: boundary
      stageUuid: "0c8e1eb1-a0db-818a-ab08-85c5a476cf51"
    - stage: links
      stageUuid: "6dc6616b-709c-8f8e-ab5c-bec8fb75b74b"
    - stage: horo
      stageUuid: "62cc3872-297c-8078-879b-f8440e2243aa"
    - stage: seal
      stageUuid: "7c54926e-21e9-8904-8da5-8949800c2300"
    - stage: uuid
      stageUuid: "cf42cd62-d2bc-8e77-94e5-689e8a0babdc"
version: 2
---
# backup

Use when ensuring data recovery — backup strategy (full/incremental/differential), backup retention, restoration procedures, backup encryption, cross-region backups, RTO/RPO targets, backup testing/validation.

Composes: [[database]] · [[deploy]].

**Law — [[law]]: data recovery is guaranteed by a tested strategy (full/incremental/differential) with retention, encryption, and cross-region copies that meet the RTO/RPO targets — an unvalidated backup does not count.**

## Standards
- ISO 27001 §A.12.3.1 (backup policy)
- Backup retention standards
