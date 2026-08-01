---
name: backup
description: "Use when ensuring data recovery — backup strategy (full/incremental/differential), backup retention, restoration procedures, backup encryption, cross-region backups, RTO/RPO targets, backup testing/validation."
atomPath: "vocabulary/backup"
coordinate: "vocabulary/backup · 7/descent · 2c672f45"
contentUuid: "d6cc443e-01a0-5006-bb73-a6a3c9afeb18"
diamondUuid: "7bb11f57-afee-8fd5-bb67-f8c5883b5b65"
uuid: "2c672f45-8138-8cf2-912f-38acdb202601"
horo: 7
typography:
  partition: vocabulary
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "ff43cc13-b39e-8c7e-af2d-38a88f7fa2da"
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
      stageUuid: "33e17ece-46ed-8629-921b-d25ed12221ba"
    - stage: seal
      stageUuid: "dce816c4-81af-85b6-993c-772f5d08b085"
    - stage: uuid
      stageUuid: "24339acf-788b-89c9-94d2-d0cdd02c4dbd"
version: 2
---
# backup

Use when ensuring data recovery — backup strategy (full/incremental/differential), backup retention, restoration procedures, backup encryption, cross-region backups, RTO/RPO targets, backup testing/validation.

Composes: [[database]] · [[deploy]].

**Law — [[law]]: data recovery is guaranteed by a tested strategy (full/incremental/differential) with retention, encryption, and cross-region copies that meet the RTO/RPO targets — an unvalidated backup does not count.**

## Standards
- ISO 27001 §A.12.3.1 (backup policy)
- Backup retention standards
