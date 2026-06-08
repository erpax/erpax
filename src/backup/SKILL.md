---
name: backup
description: "Use when ensuring data recovery — backup strategy (full/incremental/differential), backup retention, restoration procedures, backup encryption, cross-region backups, RTO/RPO targets, backup testing/validation."
atomPath: backup
coordinate: backup · 8/crest · 7e61aef7
contentUuid: "973a977d-209e-5eba-bddc-58faec905dc4"
diamondUuid: "47d79b66-2d65-8545-a287-5d8073214e70"
uuid: "7e61aef7-6b82-8df9-889f-920e50048ff0"
horo: 8
bonds:
  in:
    - database
    - deploy
    - law
  out:
    - database
    - deploy
    - law
typography:
  partition: backup
  bondDegree: 9
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - database
    - deploy
    - law
  matrix:
    - database
    - deploy
    - law
  backlinks:
    - database
    - deploy
    - law
signatures:
  computationUuid: "a98896e5-7ff3-894b-960c-e7f30ad53351"
  stages:
    - stage: path
      stageUuid: "5453b72d-75ee-83eb-a36e-c64923a67baa"
    - stage: trinity
      stageUuid: "89fc554b-2a14-820f-9f00-17436819a06f"
    - stage: boundary
      stageUuid: "e17990f8-8dd7-8de9-8355-b3e27265c82a"
    - stage: links
      stageUuid: "675075d8-285d-8323-8aa5-5a9801818189"
    - stage: horo
      stageUuid: "f0921430-bc58-8087-bf4b-3efcd7b6eb0c"
    - stage: seal
      stageUuid: "a5271e2a-3964-84b9-99c9-7b496a6b06a2"
    - stage: uuid
      stageUuid: "720ee0ec-1a03-86e6-8458-c4fb409ae9cd"
version: 2
---
# backup

Use when ensuring data recovery — backup strategy (full/incremental/differential), backup retention, restoration procedures, backup encryption, cross-region backups, RTO/RPO targets, backup testing/validation.

Composes: [[database]] · [[deploy]].

**Law — [[law]]: data recovery is guaranteed by a tested strategy (full/incremental/differential) with retention, encryption, and cross-region copies that meet the RTO/RPO targets — an unvalidated backup does not count.**

## Standards
- ISO 27001 §A.12.3.1 (backup policy)
- Backup retention standards
