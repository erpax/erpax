---
name: controls
description: "Use when defining or cataloguing internal controls — preventive, detective, corrective, or compensating — across COSO components (environment, risk assessment, control activities, information, monitoring); owner, frequency, review dates, SOX §404 scope. The internal-controls COSO-2013 register."
atomPath: "internal/controls"
coordinate: "internal/controls · 4/weave · 03f4ed85"
contentUuid: "059375f1-98d9-57e5-b4da-4fb3543cea20"
diamondUuid: "1180a523-5601-8364-babb-63ace08b58ec"
uuid: "03f4ed85-10e7-876b-9f54-02e3390fba80"
horo: 4
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
  computationUuid: "f70860c4-3908-86d4-b4d3-1ac0ada8a5a9"
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
      stageUuid: "558a68c5-5f45-8f36-9317-c9fae35aa941"
    - stage: seal
      stageUuid: "107b2037-3742-8f77-85b7-e292ef48b7ca"
    - stage: uuid
      stageUuid: "d82c4d48-d5c2-874d-b307-05505db76fe4"
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
