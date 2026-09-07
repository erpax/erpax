---
name: audit
description: "Use when capturing compliance/evidence metadata — audit fields (createdBy, createdAt, updatedBy, updatedAt, deletedAt), audit trail events, audit evidence, audit finding. Standard immutable history; drives IFRS/SOX compliance. Often shared across all collections via auditFields() helper."
atomPath: audit
coordinate: "audit · 8/crest · e68bbe88"
contentUuid: "caf89b1b-faee-529d-a14b-c86b98b765cf"
diamondUuid: "69c5cacb-e35e-89e5-a2b4-7324ddad1074"
uuid: "e68bbe88-6a34-83cc-98be-fda21f8ca77e"
horo: 8
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
  computationUuid: "d3ecd00a-b09f-8a07-ae2c-85a8a01a053a"
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
      stageUuid: "574259d7-503b-82d0-b456-4b64997526d8"
    - stage: seal
      stageUuid: "0a271ddf-dec3-8029-9575-b0feb2e7acbf"
    - stage: uuid
      stageUuid: "e4a4299b-e73a-80b1-8094-d5090560e47f"
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
