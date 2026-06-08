---
name: controls
description: "Use when defining or cataloguing internal controls — preventive, detective, corrective, or compensating — across COSO components (environment, risk assessment, control activities, information, monitoring); owner, frequency, review dates, SOX §404 scope. The internal-controls COSO-2013 register."
atomPath: internal/controls
coordinate: internal/controls · 2/share · 7a89e19c
contentUuid: "bd59c609-6abf-58b4-880d-785f8cfefead"
diamondUuid: "973ec5d7-0608-896b-af49-d280c7c58514"
uuid: "7a89e19c-e7dc-85d4-a58f-7cf8e427beb6"
horo: 2
bonds:
  in:
    - law
    - privilege
    - tests
  out:
    - law
    - privilege
    - tests
typography:
  partition: internal
  bondDegree: 0
  neighbors: []
standards:
  - "COSO-2013"
  - "COSO-2013 internal-control-integrated-framework"
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EU-2017/1132"
  - "EU-2017/828"
  - "EU-2018/1673"
  - "EU-2018/1725"
  - "EU-2018/302"
  - "EU-2018/389-SCA-RTS"
  - "EU-2018/843"
  - "EU-2018/957"
  - "IAS-1"
  - "IFRS-9"
  - "ILO-C105"
  - "ISA-530"
  - "ISO-19011"
  - "ISO/IEC-29119"
  - "PCAOB AS 2201 ICFR-audit"
  - "PCAOB-AS-2201"
  - SOX
  - "SOX §404 internal-controls"
  - "US-GAAP"
  - "W3C-PROV-O"
bindings: []
neighbors:
  wikilink:
    - law
    - tests
  matrix:
    - law
    - privilege
    - tests
  backlinks:
    - law
    - privilege
    - tests
signatures:
  computationUuid: "232110fb-fe2a-8d0d-8106-b0c15aa2f007"
  stages:
    - stage: path
      stageUuid: "6aa7ba77-f04d-85a8-b56d-e8bd815eab58"
    - stage: trinity
      stageUuid: "d79bc6ed-c012-8b98-915e-e55354a35d29"
    - stage: boundary
      stageUuid: "d27b65d5-e9e2-8baf-aed2-7af3fd73d9e8"
    - stage: links
      stageUuid: "b248a285-72cb-8729-9890-012ef923137f"
    - stage: horo
      stageUuid: "785959a4-a3bb-8b36-b78c-3d9e8813d3db"
    - stage: seal
      stageUuid: "107b2037-3742-8f77-85b7-e292ef48b7ca"
    - stage: uuid
      stageUuid: "bcb539cb-5a51-8b0d-aaf9-3959b4d7b6a9"
version: 2
---
# internal-controls

InternalControls.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- COSO-2013 internal-control-integrated-framework
- SOX §404 internal-controls
- PCAOB AS 2201 ICFR-audit
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[internal/controls/control/tests]].

**Law — [[law]]: an internal control is a register entry typed by purpose (preventive/detective/corrective/compensating) and mapped to its COSO-2013 component, carrying owner, frequency, review dates and SOX §404 scope — and proven effective by its [[internal/controls/control/tests|control tests]].**
