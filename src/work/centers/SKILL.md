---
name: centers
description: "Use when modelling manufacturing capacity — machines, lines, cells, vats, workstations, or crews — with ISA-95 resource hierarchy, throughput rate, parallelism, and IAS-2 cost-of-conversion rates feeding routing and overhead absorption. The work-center capacity-unit collection."
atomPath: work/centers
coordinate: work/centers · 8/crest · f39b0f9c
contentUuid: "5d18149a-6e7f-5002-89b7-c1987cc6a6d5"
diamondUuid: "6046bd1a-958a-81aa-a392-6090ada97a61"
uuid: "f39b0f9c-d334-8b8e-af06-08cbac609c42"
horo: 8
bonds:
  in:
    - access
    - accounting
    - budgetvariance
    - fields
    - hooks
    - identity
    - journals
    - law
    - positions
    - proof
    - runs
    - segment
    - work
  out:
    - access
    - accounting
    - budgetvariance
    - fields
    - hooks
    - identity
    - journals
    - law
    - positions
    - proof
    - runs
    - segment
typography:
  partition: work
  bondDegree: 48
  neighbors: []
standards:
  - "IFRS IAS-2 §12 cost-of-conversion fixed-and-variable-production-overhead"
  - "IFRS IAS-2 §13 normal-capacity-overhead-absorption"
  - "ISA-95"
  - "ISA-95:2013 / IEC-62264-1 §B.5 production-resources equipment-hierarchy"
  - "ISO-19011:2018 audit-trail capacity-resource-changes"
  - "ISO-22400-2"
  - "ISO-22400-2:2014 manufacturing-operations KPIs (capacity, availability, utilization)"
  - "ISO-8601-1:2019 date-time"
  - "SOX §404 internal-controls production-control"
  - "US-GAAP ASC-330-10-30 inventory-cost"
bindings: []
neighbors:
  wikilink:
    - accounting
    - law
    - manufacturing
    - shifts
  matrix:
    - access
    - accounting
    - budgetvariance
    - fields
    - hooks
    - identity
    - journals
    - law
    - positions
    - proof
    - runs
    - segment
  backlinks:
    - access
    - accounting
    - budgetvariance
    - fields
    - hooks
    - identity
    - journals
    - law
    - positions
    - proof
    - runs
    - segment
signatures:
  computationUuid: "93b5cfa6-c3c3-8f0d-9a95-2d260acb3122"
  stages:
    - stage: path
      stageUuid: "6eb6acff-21e6-8f82-bdff-d2c45930309f"
    - stage: trinity
      stageUuid: "c657b476-8566-8c6f-88d0-d19933cac19e"
    - stage: boundary
      stageUuid: "ad62df80-1530-8e7b-9e86-1a968977c6c6"
    - stage: links
      stageUuid: "b1351332-1a0a-85f1-a9b3-72760b6d81ba"
    - stage: horo
      stageUuid: "3221482e-3363-8d07-bc45-d1c59821deb5"
    - stage: seal
      stageUuid: "841d9f8b-53b5-8b2f-be2f-c91d2d98a2a2"
    - stage: uuid
      stageUuid: "4eb5ee3d-f0b7-837b-93e3-2042bb8339b6"
version: 2
---
# work-centers

Work Centers — the capacity unit production flows through.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: a work-center is the capacity unit production flows through (machine · line · cell · vat · workstation · crew) carrying throughput rate, parallelism, and the IAS-2 cost-of-conversion rate that feeds routing and overhead absorption — the ISA-95 resource the [[work/shifts|shift]] runs on.**

## Standards
- ISA-95:2013 / IEC-62264-1 §B.5 production-resources equipment-hierarchy
- ISO-22400-2:2014 manufacturing-operations KPIs (capacity, availability, utilization)
- ISO-8601-1:2019 date-time
- IFRS IAS-2 §12 cost-of-conversion fixed-and-variable-production-overhead
- IFRS IAS-2 §13 normal-capacity-overhead-absorption
- US-GAAP ASC-330-10-30 inventory-cost
- ISO-19011:2018 audit-trail capacity-resource-changes
- SOX §404 internal-controls production-control
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[work/shifts|WorkShifts]] · [[manufacturing]] · [[accounting]].
