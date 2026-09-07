---
name: audit
description: "Use when capturing compliance/evidence metadata — audit fields (createdBy, createdAt, updatedBy, updatedAt, deletedAt), audit trail events, audit evidence, audit finding. Standard immutable history; drives IFRS/SOX compliance. Often shared across all collections via auditFields() helper."
atomPath: audit
coordinate: "audit · 5/round · 0d0d4f13"
contentUuid: "c540bbd6-6703-5594-b19b-4e0f80dd52e9"
diamondUuid: "a9169c37-57ec-81c9-8ba4-21456af8b422"
uuid: "0d0d4f13-780d-8e4c-880f-c682957c431f"
horo: 5
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
  computationUuid: "4e9e050c-b4c8-8803-af17-b3156211519b"
  stages:
    - stage: path
      stageUuid: "5818acc2-eaa3-8ca0-aad3-692b527dd02b"
    - stage: trinity
      stageUuid: "566dd10b-1259-8c9f-948b-3f1d0d00a2dc"
    - stage: boundary
      stageUuid: "a45cf8f6-e344-8ee7-b463-afa693efe2e4"
    - stage: links
      stageUuid: "f7d19d10-3870-85e4-a953-4457e25b4b18"
    - stage: horo
      stageUuid: "64364ad9-ccfb-850b-a598-e9e98f2a4ddf"
    - stage: seal
      stageUuid: "0a271ddf-dec3-8029-9575-b0feb2e7acbf"
    - stage: uuid
      stageUuid: "801a9fc4-43c0-8d02-96f1-f6ef06af5334"
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
