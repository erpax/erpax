---
name: controls
description: "Use when defining or cataloguing internal controls — preventive, detective, corrective, or compensating — across COSO components (environment, risk assessment, control activities, information, monitoring); owner, frequency, review dates, SOX §404 scope. The internal-controls COSO-2013 register."
atomPath: "internal/controls"
coordinate: "internal/controls · 2/share · 4013699c"
contentUuid: "996fb20e-f075-5132-b193-de2fffd8fbcf"
diamondUuid: "f002f414-0a88-819f-b19d-af3c9b964d6a"
uuid: "4013699c-9f2e-86ca-aa45-4390e6b066a8"
horo: 2
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
  computationUuid: "be5b0d9f-6ccf-894f-a4be-73899d3421e2"
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
      stageUuid: "a9344d9e-0a34-860e-be68-c15344fdab7f"
    - stage: seal
      stageUuid: "107b2037-3742-8f77-85b7-e292ef48b7ca"
    - stage: uuid
      stageUuid: "26b1acea-0107-8d74-a0f8-376c72e4872f"
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
