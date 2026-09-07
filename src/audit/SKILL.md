---
name: audit
description: "Use when capturing compliance/evidence metadata — audit fields (createdBy, createdAt, updatedBy, updatedAt, deletedAt), audit trail events, audit evidence, audit finding. Standard immutable history; drives IFRS/SOX compliance. Often shared across all collections via auditFields() helper."
atomPath: audit
coordinate: "audit · 5/round · bedff29e"
contentUuid: "3bd930b2-c785-5de3-bde1-e1b1c2b2d257"
diamondUuid: "0ccdd92a-5b04-8280-a821-8d6f255bb7fa"
uuid: "bedff29e-9225-8e1f-b9e8-e680d752e9c9"
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
  computationUuid: "4213d3c7-c78f-85b9-8e77-2f6e6a63ca17"
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
      stageUuid: "6325418a-39c2-8b6a-b300-e4dd340786e0"
    - stage: seal
      stageUuid: "0a271ddf-dec3-8029-9575-b0feb2e7acbf"
    - stage: uuid
      stageUuid: "ad3bc4fd-007f-81e9-acd6-318414469ac8"
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
