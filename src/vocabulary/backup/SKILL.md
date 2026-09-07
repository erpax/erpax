---
name: backup
description: "Use when ensuring data recovery — backup strategy (full/incremental/differential), backup retention, restoration procedures, backup encryption, cross-region backups, RTO/RPO targets, backup testing/validation."
atomPath: "vocabulary/backup"
coordinate: "vocabulary/backup · 8/crest · d0b50915"
contentUuid: "f71a9162-c3dd-5c46-968f-8020578378f4"
diamondUuid: "6c22a742-0fa4-845f-a6d8-d539f070af58"
uuid: "d0b50915-5c5e-8e3e-aa78-3dc70c76e9b1"
horo: 8
typography:
  partition: vocabulary
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "8193236f-c46d-820a-970c-f34f036b9805"
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
      stageUuid: "7a281fb5-b429-8d58-9894-7b12a5ca7e05"
    - stage: seal
      stageUuid: "7c54926e-21e9-8904-8da5-8949800c2300"
    - stage: uuid
      stageUuid: "4c78820c-4bbc-8c37-ad76-595b48cb5088"
version: 2
---
# backup

Use when ensuring data recovery — backup strategy (full/incremental/differential), backup retention, restoration procedures, backup encryption, cross-region backups, RTO/RPO targets, backup testing/validation.

Composes: [[database]] · [[deploy]].

**Law — [[law]]: data recovery is guaranteed by a tested strategy (full/incremental/differential) with retention, encryption, and cross-region copies that meet the RTO/RPO targets — an unvalidated backup does not count.**

## Standards
- ISO 27001 §A.12.3.1 (backup policy)
- Backup retention standards
