---
name: orders
description: "Use when executing FM work — corrective/preventive/predictive maintenance, statutory inspections, refurbishments — tracking parts issued, labour hours, vendor cost, IAS-16 capex/opex classification, permit-to-work, failure codes, and GL journal-entry on completion. The CMMS work-order execution register per ISO 55000."
atomPath: "maintenance/work/orders"
coordinate: "maintenance/work/orders · 2/share · 469eac73"
contentUuid: "4e983dd7-e9a0-55f2-9dd6-142d09d20862"
diamondUuid: "4eb9c91b-1b39-8e41-8e53-f34b3e67c379"
uuid: "469eac73-3714-836a-880c-88b770f51254"
horo: 2
typography:
  partition: maintenance
  bondDegree: 96
standards:
  - "EN-13306:2017 maintenance-terminology"
  - "EN-13306:2017 maintenance-terminology`"
  - "IFRS IAS-16 §12 §13 capitalisable-vs-expense routine-maintenance"
  - "IFRS IAS-2 §10 cost-of-purchase materials-issued"
  - "ISO-14224:2016 reliability-and-maintenance-data"
  - "ISO-14224:2016 reliability-and-maintenance-data`"
  - "ISO-41001"
  - "ISO-41001:2018 §8.1 facility-management operational-control"
  - "ISO-41001:2018 §8.1 facility-management operational-control`"
  - "ISO-55000"
  - "ISO-55000:2014 asset-management work-management"
  - "ISO-55000:2014 asset-management work-management`"
  - "ISO-55001:2014 asset-management management-systems"
  - "ISO-55001:2014 asset-management management-systems`"
  - "ISO-8601-1:2019 date-time scheduled-actual"
  - "ISO-8601-1:2019 date-time scheduled-actual`"
  - "SOX §404 internal-controls capex-vs-opex-classification"
  - "US-GAAP ASC-360 ppe-maintenance"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "e7279832-7c6d-87a8-a3e9-d1805d341ac2"
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
      stageUuid: "77cef969-8034-87dc-9ace-4db0815fdfb7"
    - stage: seal
      stageUuid: "fd8140a2-dc6f-82f2-ae3f-e9d01a693246"
    - stage: uuid
      stageUuid: "f1ba316f-cf53-84e4-a595-e26b53531948"
version: 2
---
# maintenance-work-orders

The executable side of the FM ticket flow. Promoted from [[maintenance/requests]] (or raised pre-emptively for preventive / scheduled work). Tracks parts issued, labour hours, and cost — feeds GL via [[items/inventory/movements]] (parts) + [[employees/time/entries]] (labour) + capitalised work via [[fixed/assets]] (when work is capitalisable per IAS-16 §13).

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-41001:2018 §8.1 facility-management operational-control`
- `@standard ISO-55000:2014 asset-management work-management`
- `@standard ISO-55001:2014 asset-management management-systems`
- `@standard ISO-14224:2016 reliability-and-maintenance-data`
- `@standard EN-13306:2017 maintenance-terminology`
- `@standard ISO-8601-1:2019 date-time scheduled-actual`


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
