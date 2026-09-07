---
name: backup
description: "Use when ensuring data recovery — backup strategy (full/incremental/differential), backup retention, restoration procedures, backup encryption, cross-region backups, RTO/RPO targets, backup testing/validation."
atomPath: "vocabulary/backup"
coordinate: "vocabulary/backup · 1/base · 8e218598"
contentUuid: "265d1425-82ca-514f-885c-6647ea999890"
diamondUuid: "45683cf0-ef59-8738-b2b6-f8202cbd2b08"
uuid: "8e218598-b664-8a0d-be45-15767bcf1049"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "44d08524-f28b-8005-8b67-97c5f5f4d9b5"
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
      stageUuid: "e7c1ef5f-89a5-815a-b395-755ef1ac5836"
    - stage: seal
      stageUuid: "7c54926e-21e9-8904-8da5-8949800c2300"
    - stage: uuid
      stageUuid: "dbf83d21-e9e1-85cd-90c5-f43d63956d00"
version: 2
---
# backup

Use when ensuring data recovery — backup strategy (full/incremental/differential), backup retention, restoration procedures, backup encryption, cross-region backups, RTO/RPO targets, backup testing/validation.

Composes: [[database]] · [[deploy]].

**Law — [[law]]: data recovery is guaranteed by a tested strategy (full/incremental/differential) with retention, encryption, and cross-region copies that meet the RTO/RPO targets — an unvalidated backup does not count.**

## Standards
- ISO 27001 §A.12.3.1 (backup policy)
- Backup retention standards
