---
name: inspections
description: "Use when recording incoming, in-process, or final-inspection outcomes — inspected/failed/sample quantities, lot acceptance, calibration checks per ISO 17025, outcome disposition (pass/fail/conditional), and nonconformance evidence that drives inventory write-offs. The ISO 9001 §8.7 quality-inspection collection for manufacturing and vendor receipts."
atomPath: "items/quality/inspections"
coordinate: "items/quality/inspections · 1/base · b4adca91"
contentUuid: "c0225fbd-07a9-533d-be51-1d9364b6c217"
diamondUuid: "6b709672-e207-8900-903e-5a986c045a85"
uuid: "b4adca91-b4e0-85f3-b413-ff84b910b8b1"
horo: 1
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
  computationUuid: "1aaf6ecd-0d2d-872d-943a-a35822776428"
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
      stageUuid: "d6467860-3921-8b9f-bd58-47df30328aaa"
    - stage: seal
      stageUuid: "c4b9f3de-9b2f-8be9-ba4d-32b708ca009f"
    - stage: uuid
      stageUuid: "d48431d8-163c-8181-8b1a-67e3ad4098a4"
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
