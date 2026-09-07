---
name: inspections
description: "Use when recording incoming, in-process, or final-inspection outcomes — inspected/failed/sample quantities, lot acceptance, calibration checks per ISO 17025, outcome disposition (pass/fail/conditional), and nonconformance evidence that drives inventory write-offs. The ISO 9001 §8.7 quality-inspection collection for manufacturing and vendor receipts."
atomPath: "items/quality/inspections"
coordinate: "items/quality/inspections · 5/round · a7bce297"
contentUuid: "51dfbdff-672c-5ecb-ac29-f618fe9a06c7"
diamondUuid: "46cf1712-011f-8f4e-a017-3153ef2ba4a2"
uuid: "a7bce297-9ac4-881b-962c-efa756fc6084"
horo: 5
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
  computationUuid: "f5b720c4-cc48-82a7-83ee-7ea62fef9905"
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
      stageUuid: "ffcc6e29-5192-86b0-a28f-e4f1739de44f"
    - stage: seal
      stageUuid: "c4b9f3de-9b2f-8be9-ba4d-32b708ca009f"
    - stage: uuid
      stageUuid: "97f208f9-7088-805d-8c18-4753d7a051ba"
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
