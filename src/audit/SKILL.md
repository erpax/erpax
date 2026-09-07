---
name: audit
description: "Use when capturing compliance/evidence metadata — audit fields (createdBy, createdAt, updatedBy, updatedAt, deletedAt), audit trail events, audit evidence, audit finding. Standard immutable history; drives IFRS/SOX compliance. Often shared across all collections via auditFields() helper."
atomPath: audit
coordinate: "audit · 5/round · 0e9eb7b7"
contentUuid: "63cf1ea4-b663-5eb2-b8c3-9f7852408425"
diamondUuid: "98d75a96-5506-8412-9b7d-4578c066acb6"
uuid: "0e9eb7b7-eb6c-84f0-831a-f0a2044b9b95"
horo: 5
typography:
  partition: audit
  bondDegree: 125
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
  computationUuid: "00c41ddf-27b6-8c45-bfcf-c542b31ca8f1"
  stages:
    - stage: path
      stageUuid: "5818acc2-eaa3-8ca0-aad3-692b527dd02b"
    - stage: trinity
      stageUuid: "566dd10b-1259-8c9f-948b-3f1d0d00a2dc"
    - stage: boundary
      stageUuid: "464d4b00-0192-8287-acb7-f54c508feaa6"
    - stage: links
      stageUuid: "4466dcda-4d56-8a8f-a59c-7bac231d9d9b"
    - stage: horo
      stageUuid: "eec5d057-87fa-8e10-acee-4282162cba25"
    - stage: seal
      stageUuid: "0a271ddf-dec3-8029-9575-b0feb2e7acbf"
    - stage: uuid
      stageUuid: "13216c01-bbbd-8467-ba9d-580f78a766f1"
version: 2
---
# audit

Use when capturing compliance/evidence metadata — audit fields (createdBy, createdAt, updatedBy, updatedAt, deletedAt), audit trail events, audit evidence, audit finding. Standard immutable history; drives IFRS/SOX compliance. Often shared across all collections via auditFields() helper.

Composes: [[field]] · [[accounting]] · [[access]] · [[versions]] · [[description]].

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO-19011`

- ISO-19011:2018
- IFRS-IAS-1
