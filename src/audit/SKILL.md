---
name: audit
description: "Use when capturing compliance/evidence metadata — audit fields (createdBy, createdAt, updatedBy, updatedAt, deletedAt), audit trail events, audit evidence, audit finding. Standard immutable history; drives IFRS/SOX compliance. Often shared across all collections via auditFields() helper."
atomPath: audit
coordinate: audit · 2/share · 15c9b6da
contentUuid: "98900c6e-8a06-5b16-a9c8-00c50524e97b"
diamondUuid: "9b0dbc27-0e79-83c3-a538-a49154143282"
uuid: "15c9b6da-13f6-8eb5-bdde-16b39325eed3"
horo: 2
bonds:
  in:
    - access
    - accounting
    - anchoring
    - approved
    - attestation
    - by
    - certification
    - chain
    - change
    - closure
    - cloudflare
    - description
    - emitter
    - empirical
    - engineering
    - fields
    - finding
    - media
    - organic
    - pqc
    - provenance
    - reason
    - replay
    - research
    - source
    - timestamp
    - truth
    - types
    - versions
  out:
    - access
    - accounting
    - anchoring
    - approved
    - attestation
    - by
    - certification
    - chain
    - change
    - closure
    - cloudflare
    - description
    - emitter
    - empirical
    - engineering
    - fields
    - finding
    - media
    - organic
    - pqc
    - provenance
    - reason
    - replay
    - research
    - source
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
  - analytics_engine_datasets/ANALYTICS_AI
  - analytics_engine_datasets/ANALYTICS_API
  - analytics_engine_datasets/ANALYTICS_GL
  - analytics_engine_datasets/ANALYTICS_JOBS
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
    - anchoring
    - approved
    - attestation
    - by
    - certification
    - chain
    - change
    - closure
    - cloudflare
    - description
    - emitter
    - empirical
    - engineering
    - fields
    - finding
    - media
    - organic
    - pqc
    - provenance
    - reason
    - replay
    - research
    - source
    - timestamp
    - truth
    - types
    - versions
  backlinks:
    - access
    - accounting
    - anchoring
    - approved
    - attestation
    - by
    - certification
    - chain
    - change
    - closure
    - cloudflare
    - description
    - emitter
    - empirical
    - engineering
    - fields
    - finding
    - media
    - organic
    - pqc
    - provenance
    - reason
    - replay
    - research
    - source
    - timestamp
    - truth
    - types
    - versions
signatures:
  computationUuid: "de6684de-2045-8f3f-be91-5e8338154e41"
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
      stageUuid: "1e89c047-49ad-8829-9948-91502af5f7fa"
    - stage: seal
      stageUuid: "d38004fa-72f9-8270-8ad7-99afc9589ee1"
    - stage: uuid
      stageUuid: "6559978c-9092-85e9-81c2-3e1dd0c5a03a"
version: 2
---
# audit

Use when capturing compliance/evidence metadata — audit fields (createdBy, createdAt, updatedBy, updatedAt, deletedAt), audit trail events, audit evidence, audit finding. Standard immutable history; drives IFRS/SOX compliance. Often shared across all collections via auditFields() helper.

Composes: [[fields]] · [[accounting]] · [[access]] · [[versions]] · [[description]].

## Standards
- ISO-19011:2018
- IFRS-IAS-1
