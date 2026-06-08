---
name: inspections
description: "Use when recording incoming, in-process, or final-inspection outcomes — inspected/failed/sample quantities, lot acceptance, calibration checks per ISO 17025, outcome disposition (pass/fail/conditional), and nonconformance evidence that drives inventory write-offs. The ISO 9001 §8.7 quality-inspection collection for manufacturing and vendor receipts."
atomPath: items/quality/inspections
coordinate: items/quality/inspections · 1/base · 46c9af13
contentUuid: "442789e0-d71d-557b-b82f-6d9e94a7c2fc"
diamondUuid: "d6905e7d-a4f1-8db9-b459-dd3a07a310ae"
uuid: "46c9af13-f2c1-87a2-bc07-ce274ada67b0"
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
  - "ISO 9001:2015 §8.7 control-of-nonconforming-outputs"
  - "ISO 9001:2015 §8.7 quality-management-system"
  - "ISO 9001:2015 §9.1.3 analysis-and-evaluation"
  - "ISO-19011:2018 audit-trail inspection-evidence"
  - "ISO-8601-1:2019 date-time inspection-date"
  - "ISO-9001"
  - "SOX §404 internal-controls quality-control TOM-QC-01"
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
  computationUuid: "e7416717-39df-8a8d-9fdd-f290ec295b81"
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
      stageUuid: "7ebf30fa-89c4-8f3d-a641-b9d9bed2c0eb"
    - stage: seal
      stageUuid: "c4b9f3de-9b2f-8be9-ba4d-32b708ca009f"
    - stage: uuid
      stageUuid: "a6b3b823-8a41-86e2-9786-9041d2b46dbb"
version: 2
---
# quality-inspections

Quality Inspections — ISO 9001 §8.7 nonconformance + §9.1 measurement.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
