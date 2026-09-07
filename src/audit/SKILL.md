---
name: audit
description: "Use when capturing compliance/evidence metadata — audit fields (createdBy, createdAt, updatedBy, updatedAt, deletedAt), audit trail events, audit evidence, audit finding. Standard immutable history; drives IFRS/SOX compliance. Often shared across all collections via auditFields() helper."
atomPath: audit
coordinate: "audit · 1/base · 366edd8b"
contentUuid: "1900e316-b414-54ce-89e1-01e691a77d62"
diamondUuid: "d77fee01-76bc-82ed-bfea-9ee1683238f0"
uuid: "366edd8b-213e-8f53-89b3-3a482a1e4847"
horo: 1
typography:
  partition: audit
  bondDegree: 137
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
  computationUuid: "c443c29a-e123-85ca-bf65-eb9457840c48"
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
      stageUuid: "353228c3-88aa-8308-9d9a-17f38a5b133d"
    - stage: seal
      stageUuid: "0a271ddf-dec3-8029-9575-b0feb2e7acbf"
    - stage: uuid
      stageUuid: "8b77de69-6d06-81d6-acf0-17cca0b9736b"
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
