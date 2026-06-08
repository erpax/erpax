---
name: orders
description: "Use when executing FM work — corrective/preventive/predictive maintenance, statutory inspections, refurbishments — tracking parts issued, labour hours, vendor cost, IAS-16 capex/opex classification, permit-to-work, failure codes, and GL journal-entry on completion. The CMMS work-order execution register per ISO 55000."
atomPath: maintenance/work/orders
coordinate: maintenance/work/orders · 2/share · a42fa201
contentUuid: "b870ddb8-5284-578f-8c8f-cc3720f1cd04"
diamondUuid: "bc8c71e4-8cbf-8850-be71-7e1948efd4f1"
uuid: "a42fa201-77fb-8959-bcde-632c63cc03e0"
horo: 2
bonds:
  in:
    - accounting
    - allocation
    - duality
    - fractal
    - hooks
    - horo
    - law
    - materials
    - orders
    - packs
    - party
    - receipts
    - routings
    - runs
    - shift
    - shifts
    - standard
    - utility
    - variances
    - work
  out:
    - accounting
    - allocation
    - duality
    - fractal
    - hooks
    - horo
    - law
    - materials
    - orders
    - packs
    - party
    - receipts
    - routings
    - runs
    - shift
    - shifts
    - standard
    - utility
    - variances
typography:
  partition: maintenance
  bondDegree: 96
  neighbors: []
standards:
  - "EN-13306:2017 maintenance-terminology"
  - "EU-2014/55"
  - "EU-537/2014"
  - "EU-910/2014"
  - "IFRS IAS-16 §12 §13 capitalisable-vs-expense routine-maintenance"
  - "IFRS IAS-2 §10 cost-of-purchase materials-issued"
  - "ILO-C100"
  - "ISO-14224:2016 reliability-and-maintenance-data"
  - "ISO-19011:2018 audit-trail work-order-evidence"
  - "ISO-41001"
  - "ISO-41001:2018 §8.1 facility-management operational-control"
  - "ISO-55000"
  - "ISO-55000:2014 asset-management work-management"
  - "ISO-55001:2014 asset-management management-systems"
  - "ISO-8601-1:2019 date-time scheduled-actual"
  - "SOX §404 internal-controls capex-vs-opex-classification"
  - "US-GAAP ASC-360 ppe-maintenance"
bindings: []
neighbors:
  wikilink:
    - assets
    - entries
    - entry
    - inspections
    - law
    - movements
    - properties
    - requests
  matrix:
    - accounting
    - allocation
    - duality
    - fractal
    - hooks
    - horo
    - law
    - materials
    - orders
    - packs
    - party
    - receipts
    - routings
    - runs
    - shift
    - shifts
    - standard
    - utility
    - variances
  backlinks:
    - accounting
    - allocation
    - duality
    - fractal
    - hooks
    - horo
    - law
    - materials
    - orders
    - packs
    - party
    - receipts
    - routings
    - runs
    - shift
    - shifts
    - standard
    - utility
    - variances
signatures:
  computationUuid: "8e275220-b1fd-893b-ad01-6f9a3e84e43e"
  stages:
    - stage: path
      stageUuid: "c6a956bb-34cd-84a7-b807-39badf6e89da"
    - stage: trinity
      stageUuid: "75a83c7c-d08c-8e9f-9852-5a6a33b581b8"
    - stage: boundary
      stageUuid: "7d14719f-571c-8ece-8308-3d03f6901764"
    - stage: links
      stageUuid: "afa49f3d-cc19-8e84-99cd-a1f133da0d11"
    - stage: horo
      stageUuid: "6b1f4791-8ee0-83fa-b5eb-eec977f482f1"
    - stage: seal
      stageUuid: "fd8140a2-dc6f-82f2-ae3f-e9d01a693246"
    - stage: uuid
      stageUuid: "20bc4b25-2f55-8153-a67d-77571cff2110"
version: 2
---
# maintenance-work-orders

The executable side of the FM ticket flow. Promoted from [[maintenance/requests]] (or raised pre-emptively for preventive / scheduled work). Tracks parts issued, labour hours, and cost — feeds GL via [[items/inventory/movements]] (parts) + [[employees/time/entries]] (labour) + capitalised work via [[fixed/assets]] (when work is capitalisable per IAS-16 §13).

## Standards

- ISO-41001:2018 §8.1 facility-management operational-control
- ISO-55000:2014 asset-management work-management
- ISO-55001:2014 asset-management management-systems
- ISO-14224:2016 reliability-and-maintenance-data
- EN-13306:2017 maintenance-terminology
- ISO-8601-1:2019 date-time scheduled-actual
- IFRS IAS-16 §12 §13 capitalisable-vs-expense routine-maintenance
- IFRS IAS-2 §10 cost-of-purchase materials-issued
- US-GAAP ASC-360 ppe-maintenance
- ISO-19011:2018 audit-trail work-order-evidence
- SOX §404 internal-controls capex-vs-opex-classification
- ISO-27001 A.5.23 cloud-service-tenant-isolation

## Composition

Composes: [[maintenance/requests]] · [[Properties]] · [[items/inventory/movements]] · [[employees/time/entries]] · [[fixed/assets]] · [[journal/entries]].

## Capitalization Logic

Per IFRS IAS-16 §12–13: routine maintenance (labour, parts, vendor costs) expense to Maintenance Expense; component replacement and improvements capitalise to PPE and depreciate per the asset's schedule. Field `capitalisationTreatment` (expense | capitalise | mixed) drives whether [[journal/entries]] post to OPEX or CAPEX on completion.

## Work-Type Taxonomy

Corrective Maintenance (CM), Preventive Maintenance (PM), Predictive Maintenance (PdM), Inspection / Testing, Improvement / Enhancement, Compliance / Statutory, Refurbishment / Major Overhaul (capex), Cleaning / Janitorial, Move / Setup — each with distinct audit trail and failure-code feedback (ISO 14224) to reliability KPIs.

## Execution Workflow

Status progression: Planned → Scheduled → Dispatched → In Progress → (Awaiting Parts | Awaiting Inspection) → Completed → Closed (cost-posted). `actualStartAt` auto-set when status transitions to `in_progress`; `actualEndAt` auto-set on `completed` or `closed`.

## Safety & Compliance

Optional gates: permit-to-work, LOTO (Lockout-Tagout per OSHA 29 CFR 1910.147 / EN 50110), hot-work flags. Post-work [[journal/entries]] on completion; optional reference to [[items/quality/inspections]] for defect tracking.

**Law — [[law]]: a work order is the executable FM job promoted from a [[maintenance/requests]] request, tracking parts/labour/cost and posting a [[journal/entries]] [[entry]] on completion whose IAS-16 capex-vs-opex split is set by `capitalisationTreatment`.**
