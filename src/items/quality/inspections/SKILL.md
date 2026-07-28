---
name: inspections
description: "Use when recording incoming, in-process, or final-inspection outcomes — inspected/failed/sample quantities, lot acceptance, calibration checks per ISO 17025, outcome disposition (pass/fail/conditional), and nonconformance evidence that drives inventory write-offs. The ISO 9001 §8.7 quality-inspection collection for manufacturing and vendor receipts."
atomPath: "items/quality/inspections"
coordinate: "items/quality/inspections · 1/base · b5a6afa1"
contentUuid: "48a8f15d-3688-50ce-9537-f4271eab3d0b"
diamondUuid: "d0f33646-d54e-828c-a9be-c25ca5603ebf"
uuid: "b5a6afa1-756d-8072-86f8-0f75253d0241"
horo: 1
bonds:
  in:
    - accounting
    - batches
    - defect
    - identity
    - inspection
    - items
    - law
    - orders
    - proof
    - quality
    - standard
    - transaction
  out:
    - accounting
    - batches
    - defect
    - identity
    - inspection
    - items
    - law
    - orders
    - proof
    - standard
    - transaction
typography:
  partition: items
  bondDegree: 33
  neighbors: []
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
neighbors:
  wikilink:
    - accounting
    - identity
    - law
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - batches
    - defect
    - identity
    - inspection
    - items
    - law
    - orders
    - proof
    - standard
    - transaction
  backlinks:
    - accounting
    - batches
    - defect
    - identity
    - inspection
    - items
    - law
    - orders
    - proof
    - standard
    - transaction
signatures:
  computationUuid: "257ce290-fc24-8481-aa9f-ab847f4a9fda"
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
      stageUuid: "cfb70140-bb63-8d57-9b5a-95db2de6cf35"
    - stage: seal
      stageUuid: "c4b9f3de-9b2f-8be9-ba4d-32b708ca009f"
    - stage: uuid
      stageUuid: "b758099f-672a-89fa-8485-63f8970a4c72"
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
