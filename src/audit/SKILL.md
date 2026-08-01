---
name: audit
description: "Use when capturing compliance/evidence metadata — audit fields (createdBy, createdAt, updatedBy, updatedAt, deletedAt), audit trail events, audit evidence, audit finding. Standard immutable history; drives IFRS/SOX compliance. Often shared across all collections via auditFields() helper."
atomPath: audit
coordinate: "audit · 7/descent · bf01c3bf"
contentUuid: "de4efca6-b08a-5334-85af-ffea8d01835b"
diamondUuid: "1e3debb3-4b74-8554-a171-30fe8f2295f5"
uuid: "bf01c3bf-2236-8dc4-afc8-dae80905d4a4"
horo: 7
typography:
  partition: audit
  bondDegree: 0
standards:
  - BEPS
  - "EU-2016/679"
  - "IAS-1"
  - "ISO-19011"
  - "ISO-19011`"
  - "ISO-27001"
  - "ISO-27037"
  - "ISO/IEC-27001:2022"
  - "NIST-FIPS-180-4"
  - "NIST-SP-800-63"
  - "NIST-SP-800-92"
  - "Naredba-N-18"
  - "OECD-Pillar-Two"
  - "OECD-Transfer-Pricing"
  - "RFC-9562"
  - "SAF-T"
  - SOX
  - "US-CTA-2021"
bindings:
  - "analytics_engine_datasets/ANALYTICS_AI"
  - "analytics_engine_datasets/ANALYTICS_API"
  - "analytics_engine_datasets/ANALYTICS_GL"
  - "analytics_engine_datasets/ANALYTICS_JOBS"
signatures:
  computationUuid: "89aa5517-dd20-87c2-b008-80336fe8a5af"
  stages:
    - stage: path
      stageUuid: "5818acc2-eaa3-8ca0-aad3-692b527dd02b"
    - stage: trinity
      stageUuid: "566dd10b-1259-8c9f-948b-3f1d0d00a2dc"
    - stage: boundary
      stageUuid: "464d4b00-0192-8287-acb7-f54c508feaa6"
    - stage: links
      stageUuid: "97d4a2da-7442-87b5-9c28-54ef78283709"
    - stage: horo
      stageUuid: "3af7afe9-a08d-8658-b843-606517bbe35b"
    - stage: seal
      stageUuid: "d38004fa-72f9-8270-8ad7-99afc9589ee1"
    - stage: uuid
      stageUuid: "16903d4e-a1db-8af6-9ae9-049b635081cb"
version: 2
---
# audit

Use when capturing compliance/evidence metadata — audit fields (createdBy, createdAt, updatedBy, updatedAt, deletedAt), audit trail events, audit evidence, audit finding. Standard immutable history; drives IFRS/SOX compliance. Often shared across all collections via auditFields() helper.

Composes: [[fields]] · [[accounting]] · [[access]] · [[versions]] · [[description]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-19011`

- ISO-19011:2018
- IFRS-IAS-1
