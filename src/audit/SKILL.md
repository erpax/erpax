---
name: audit
description: "Use when capturing compliance/evidence metadata — audit fields (createdBy, createdAt, updatedBy, updatedAt, deletedAt), audit trail events, audit evidence, audit finding. Standard immutable history; drives IFRS/SOX compliance. Often shared across all collections via auditFields() helper."
atomPath: audit
coordinate: "audit · 5/round · 645d0b84"
contentUuid: "273c6960-3e41-5c9b-8e80-351fac1afe15"
diamondUuid: "cfd20c38-5c54-81e2-8237-d1848c21f9dd"
uuid: "645d0b84-7c87-8a2d-bfe5-c910a5e4e091"
horo: 5
bonds:
  in:
    - access
    - accounting
    - agent
    - anchoring
    - approved
    - attestation
    - audit
    - by
    - certification
    - chain
    - change
    - closure
    - cloudflare
    - computer
    - coverage
    - description
    - emitter
    - empirical
    - engineering
    - fields
    - finding
    - fixpoint
    - media
    - organic
    - pqc
    - proof
    - provenance
    - reason
    - reference
    - replay
    - research
    - source
    - speed
    - timestamp
    - truth
    - types
    - versions
  out:
    - access
    - accounting
    - agent
    - anchoring
    - approved
    - attestation
    - audit
    - by
    - certification
    - chain
    - change
    - closure
    - cloudflare
    - computer
    - coverage
    - description
    - emitter
    - empirical
    - engineering
    - fields
    - finding
    - fixpoint
    - media
    - organic
    - pqc
    - proof
    - provenance
    - reason
    - reference
    - replay
    - research
    - source
    - speed
    - timestamp
    - truth
    - types
    - versions
typography:
  partition: audit
  bondDegree: 0
  neighbors: []
standards:
  - BEPS
  - "EU-2016/679"
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "IAS-1"
  - "ILO-C001"
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
neighbors:
  wikilink:
    - access
    - accounting
    - description
    - fields
    - versions
  matrix:
    - access
    - accounting
    - agent
    - anchoring
    - approved
    - attestation
    - audit
    - by
    - certification
    - chain
    - change
    - closure
    - cloudflare
    - computer
    - coverage
    - description
    - emitter
    - empirical
    - engineering
    - fields
    - finding
    - fixpoint
    - media
    - organic
    - pqc
    - proof
    - provenance
    - reason
    - reference
    - replay
    - research
    - source
    - speed
    - timestamp
    - truth
    - types
    - versions
  backlinks:
    - access
    - accounting
    - agent
    - anchoring
    - approved
    - attestation
    - audit
    - by
    - certification
    - chain
    - change
    - closure
    - cloudflare
    - computer
    - coverage
    - description
    - emitter
    - empirical
    - engineering
    - fields
    - finding
    - fixpoint
    - media
    - organic
    - pqc
    - proof
    - provenance
    - reason
    - reference
    - replay
    - research
    - source
    - speed
    - timestamp
    - truth
    - types
    - versions
signatures:
  computationUuid: "612ae90a-7d47-8f0c-a1e6-514163688e37"
  stages:
    - stage: path
      stageUuid: "5818acc2-eaa3-8ca0-aad3-692b527dd02b"
    - stage: trinity
      stageUuid: "566dd10b-1259-8c9f-948b-3f1d0d00a2dc"
    - stage: boundary
      stageUuid: "9d7c412c-35f1-8814-be7b-4732a161de54"
    - stage: links
      stageUuid: "a693b788-2547-88db-bf9f-c05891b277f3"
    - stage: horo
      stageUuid: "f4f7f0b1-18c4-8ef8-915f-7d8b0f663d40"
    - stage: seal
      stageUuid: "d38004fa-72f9-8270-8ad7-99afc9589ee1"
    - stage: uuid
      stageUuid: "4fb5edfd-04c1-8b43-a713-e8ed77c1acf4"
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
