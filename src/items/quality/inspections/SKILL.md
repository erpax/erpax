---
name: inspections
description: "Use when recording incoming, in-process, or final-inspection outcomes — inspected/failed/sample quantities, lot acceptance, calibration checks per ISO 17025, outcome disposition (pass/fail/conditional), and nonconformance evidence that drives inventory write-offs. The ISO 9001 §8.7 quality-inspection collection for manufacturing and vendor receipts."
atomPath: "items/quality/inspections"
coordinate: "items/quality/inspections · 8/crest · 80cdf2a6"
contentUuid: "8fa73565-e469-5c31-9a17-0095b5c6994c"
diamondUuid: "71597b92-a69f-84f0-ab5f-449053b5e96e"
uuid: "80cdf2a6-9ca9-8571-b7c3-ea54f2691626"
horo: 8
typography:
  partition: items
  bondDegree: 33
standards:
  - "ISO 17025:2017 testing-and-calibration-laboratories"
  - "ISO 17025:2017 testing-and-calibration-laboratories`"
  - "ISO 9001:2015 §8.7 control-of-nonconforming-outputs"
  - "ISO 9001:2015 §8.7 control-of-nonconforming-outputs`"
  - "ISO 9001:2015 §8.7 quality-management-system"
  - "ISO 9001:2015 §9.1.3 analysis-and-evaluation"
  - "ISO 9001:2015 §9.1.3 analysis-and-evaluation`"
  - "ISO-8601-1:2019 date-time inspection-date"
  - "ISO-8601-1:2019 date-time inspection-date`"
  - "ISO-9001"
  - "SOX §404 internal-controls quality-control TOM-QC-01"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "059b38ce-1bf8-8693-8b96-ca618939f219"
  stages:
    - stage: path
      stageUuid: "0834a322-004d-889e-b174-a48dca66cacf"
    - stage: trinity
      stageUuid: "877c7fa5-0246-82d1-b1fc-9a9704e0d2b4"
    - stage: boundary
      stageUuid: "bb367aed-8486-80cd-942b-a8e30a9fe55b"
    - stage: links
      stageUuid: "45d31dd3-eb97-8bd8-9a1d-0cb4a715a236"
    - stage: horo
      stageUuid: "b7266488-b12e-8442-8b17-c77be750c736"
    - stage: seal
      stageUuid: "c4b9f3de-9b2f-8be9-ba4d-32b708ca009f"
    - stage: uuid
      stageUuid: "6165666c-3d6f-8d34-9e37-c54c0a40f159"
version: 2
---
# quality-inspections

Quality Inspections — ISO 9001 §8.7 nonconformance + §9.1 measurement.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time inspection-date`
- `@standard ISO 9001:2015 §8.7 control-of-nonconforming-outputs`
- `@standard ISO 9001:2015 §9.1.3 analysis-and-evaluation`
- `@standard ISO 17025:2017 testing-and-calibration-laboratories`

- ISO-8601-1:2019 date-time inspection-date
- ISO 9001:2015 §8.7 control-of-nonconforming-outputs
- ISO 9001:2015 §9.1.3 analysis-and-evaluation
- ISO 17025:2017 testing-and-calibration-laboratories
- ISO-19011:2018 audit-trail inspection-evidence
- SOX §404 internal-controls quality-control TOM-QC-01
- ISO 9001:2015 §8.7 quality-management-system
- ISO-27001 A.5.23 cloud-service-tenant-isolation

**Law — [[law]]: every inspection records an outcome disposition (pass/fail/conditional) with nonconformance evidence that drives the inventory write-off — measurement attested as [[proof]].**

Composes: [[accounting]] · [[transaction]] · [[standard]] · [[proof]] · [[identity]].
