---
name: controls
description: "Use when defining or cataloguing internal controls — preventive, detective, corrective, or compensating — across COSO components (environment, risk assessment, control activities, information, monitoring); owner, frequency, review dates, SOX §404 scope. The internal-controls COSO-2013 register."
atomPath: "internal/controls"
coordinate: "internal/controls · 1/base · 06664955"
contentUuid: "cc40b287-511b-535c-af2c-f84b618cd88f"
diamondUuid: "90ccd6be-ed40-898f-ac27-1c410401beaa"
uuid: "06664955-eac4-8f29-82dd-0598f69c1ad4"
horo: 1
typography:
  partition: internal
  bondDegree: 9
standards:
  - "COSO-2013"
  - "COSO-2013 internal-control-integrated-framework"
  - "ISA-530"
  - "ISO/IEC-27001:2022`"
  - "PCAOB AS 2201 ICFR-audit"
  - "PCAOB-AS-2201"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "529aa2d6-acf2-8bdd-bf5e-e2ef88eef660"
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
      stageUuid: "53e14901-67ae-848b-aeb8-e21b7d0a1ff6"
    - stage: seal
      stageUuid: "107b2037-3742-8f77-85b7-e292ef48b7ca"
    - stage: uuid
      stageUuid: "3a36a45c-e9e5-8768-8613-838527bddcc8"
version: 2
---
# internal-controls

InternalControls.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO/IEC-27001:2022`

- COSO-2013 internal-control-integrated-framework
- SOX §404 internal-controls
- PCAOB AS 2201 ICFR-audit
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[internal/controls/control/tests]].

**Law — [[law]]: an internal control is a register entry typed by purpose (preventive/detective/corrective/compensating) and mapped to its COSO-2013 component, carrying owner, frequency, review dates and SOX §404 scope — and proven effective by its [[internal/controls/control/tests|control tests]].**
