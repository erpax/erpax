---
name: backup
description: "Use when ensuring data recovery — backup strategy (full/incremental/differential), backup retention, restoration procedures, backup encryption, cross-region backups, RTO/RPO targets, backup testing/validation."
atomPath: "vocabulary/backup"
coordinate: "vocabulary/backup · 2/share · 43ece7e0"
contentUuid: "dfb4469f-3343-555a-a8ec-fcd32d7f875d"
diamondUuid: "1bbae232-0283-8fa5-b998-056a9bdfd869"
uuid: "43ece7e0-3a7b-8efc-a0f0-cfa4ddd7628d"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 9
standards: []
bindings: []
signatures:
  computationUuid: "df5eb348-c598-8e6d-af7e-5735bfcba33f"
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
      stageUuid: "e66d468c-2fe8-840e-92c3-46dd43ff2637"
    - stage: seal
      stageUuid: "7c54926e-21e9-8904-8da5-8949800c2300"
    - stage: uuid
      stageUuid: "3f948eb5-9918-8ba5-99b8-49356910f1ff"
version: 2
---
# backup

Use when ensuring data recovery — backup strategy (full/incremental/differential), backup retention, restoration procedures, backup encryption, cross-region backups, RTO/RPO targets, backup testing/validation.

Composes: [[database]] · [[deploy]].

**Law — [[law]]: data recovery is guaranteed by a tested strategy (full/incremental/differential) with retention, encryption, and cross-region copies that meet the RTO/RPO targets — an unvalidated backup does not count.**

## Standards
- ISO 27001 §A.12.3.1 (backup policy)
- Backup retention standards
