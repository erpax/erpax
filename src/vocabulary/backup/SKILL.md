---
name: backup
description: "Use when ensuring data recovery — backup strategy (full/incremental/differential), backup retention, restoration procedures, backup encryption, cross-region backups, RTO/RPO targets, backup testing/validation."
atomPath: "vocabulary/backup"
coordinate: "vocabulary/backup · 1/base · 279faa21"
contentUuid: "43e6dcf4-3800-53a0-a86f-d8f21fc33b4b"
diamondUuid: "0d758a03-14e4-827e-874d-d8198b481a71"
uuid: "279faa21-9328-8f8e-bb48-939c60190949"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "73dbfebc-624f-8015-bf83-e75a59483b2c"
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
      stageUuid: "b84481d8-e0af-8434-b30d-8ead4861b6d4"
    - stage: seal
      stageUuid: "7c54926e-21e9-8904-8da5-8949800c2300"
    - stage: uuid
      stageUuid: "5d79996d-6439-8ec6-9448-a8c6bdc583f2"
version: 2
---
# backup

Use when ensuring data recovery — backup strategy (full/incremental/differential), backup retention, restoration procedures, backup encryption, cross-region backups, RTO/RPO targets, backup testing/validation.

Composes: [[database]] · [[deploy]].

**Law — [[law]]: data recovery is guaranteed by a tested strategy (full/incremental/differential) with retention, encryption, and cross-region copies that meet the RTO/RPO targets — an unvalidated backup does not count.**

## Standards
- ISO 27001 §A.12.3.1 (backup policy)
- Backup retention standards
