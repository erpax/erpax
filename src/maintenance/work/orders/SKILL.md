---
name: maintenance-work-orders
description: Use when executing FM work — corrective/preventive/predictive maintenance, statutory inspections, refurbishments — tracking parts issued, labour hours, vendor cost, IAS-16 capex/opex classification, permit-to-work, failure codes, and GL journal-entry on completion. The CMMS work-order execution register per ISO 55000.
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
